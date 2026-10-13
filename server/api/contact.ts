import { z } from 'zod'

// In-memory rate limiting map (IP -> timestamps)
const rateLimitMap = new Map<string, number[]>()

const ContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(80),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(3000),
  honeypot: z.string().max(0, 'Spam detected').optional().default(''),
})

export default defineEventHandler(async (event) => {
  // Only accept POST
  assertMethod(event, 'POST')

  // Rate Limiting by client IP
  const clientIp = getRequestHeader(event, 'x-forwarded-for') || getRequestIP(event) || '127.0.0.1'
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute window
  const maxRequests = 4 // max 4 submissions per minute

  const userRequests = rateLimitMap.get(clientIp) || []
  const recentRequests = userRequests.filter(ts => now - ts < windowMs)

  if (recentRequests.length >= maxRequests) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Too many contact requests. Please wait a minute and try again.',
    })
  }

  recentRequests.push(now)
  rateLimitMap.set(clientIp, recentRequests)

  const body = await readBody(event)
  const validation = ContactSchema.safeParse(body)

  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: validation.error.errors[0]?.message || 'Invalid form input',
    })
  }

  const { name, email, message, honeypot } = validation.data

  // Honeypot check
  if (honeypot && honeypot.length > 0) {
    // Silently succeed for bots
    return { success: true, message: 'Message sent successfully.' }
  }

  const resendApiKey = process.env.RESEND_API_KEY
  if (resendApiKey) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: ['ashlyomanada.dev@gmail.com'],
          reply_to: email,
          subject: `✨ New Portfolio Inquiry from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        }),
      })

      if (!response.ok) {
        console.error('Resend delivery failed:', await response.text())
      }
    } catch (err) {
      console.error('Error invoking Resend email service:', err)
    }
  } else {
    // Development / Local mode log
    console.log(`[Contact Form Received] Name: ${name} <${email}>: "${message}"`)
  }

  return {
    success: true,
    message: `Thank you, ${name}! Your message has been received. Ashly will respond shortly.`,
  }
})
