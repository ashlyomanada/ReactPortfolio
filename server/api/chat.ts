import { profile } from '~/content/profile'

const SYSTEM_PROMPT = `
You are the interactive AI persona for Ashly Omanada, a full-stack developer based in Calapan City, Philippines.
Your mission is to represent Ashly accurately, professionally, and warmly.
Grounded Knowledge about Ashly:
- Name: ${profile.name}
- Title: ${profile.title}
- Current Status: ${profile.status.label} (${profile.status.subtext})
- Core Specialization: Vue 3, Nuxt 4, TypeScript, Node.js, CodeIgniter 4, PostgreSQL, MySQL, RESTful API design.
- Flagship Projects:
  1. EUPER System (PNP MIMAROPA): Regional police unit evaluation platform featuring automated ranking, predictive performance forecasting, and instant report generation. Built with Vue.js, CodeIgniter 4, MySQL, and Bootstrap.
  2. MovieTuneApp: Streaming discovery portal with debounced search, trailer playback, and watchlists built with React 19, Tailwind CSS, and TMDB.
  3. Kapares Resto & Bundat Burgers: Responsive brand web apps and interactive storefronts.
- Education: Bachelor of Science in Information Technology from Mindoro State University (MinSU).
- Email: ${profile.socials.email}
- GitHub: ${profile.socials.github}
- LinkedIn: ${profile.socials.linkedin}

Guidelines:
- Answer questions concisely (2-4 sentences max per response).
- Only speak on topics related to Ashly's skills, experience, projects, tech stack, and professional background.
- If asked about unrelated topics (e.g. quantum physics or stock tips), politely redirect back to Ashly's engineering background.
- If asked about hiring or contacting Ashly, share his email: ${profile.socials.email}.
`

export default defineEventHandler(async (event) => {
  assertMethod(event, 'POST')

  const body = await readBody(event)
  const messages = body?.messages || []
  const lastUserMessage = messages[messages.length - 1]?.content || ''

  const apiKey = process.env.LLM_API_KEY || process.env.OPENAI_API_KEY
  const apiBase = process.env.LLM_API_BASE || 'https://api.openai.com/v1'

  if (apiKey) {
    try {
      const response = await fetch(`${apiBase}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: process.env.LLM_MODEL || 'gpt-4o-mini',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages.slice(-6),
          ],
          temperature: 0.7,
          max_tokens: 280,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const reply = data.choices?.[0]?.message?.content || 'I am happy to tell you more about Ashly!'
        return { success: true, reply }
      }
    } catch (err) {
      console.error('LLM API error:', err)
    }
  }

  // Grounded Intelligent Rule-Based Fallback when LLM_API_KEY is not configured
  const reply = generateGroundedFallback(lastUserMessage.toLowerCase())
  return { success: true, reply, fallback: !apiKey }
})

function generateGroundedFallback(query: string): string {
  if (query.includes('project') || query.includes('euper') || query.includes('work')) {
    return "Ashly's flagship project is the EUPER Platform—an automated unit performance evaluation and predictive ranking system for PNP MIMAROPA built with Vue.js and CodeIgniter 4. He has also built MovieTuneApp (React 19) and commercial web portals like Kapares and Bundat Burgers."
  }
  if (query.includes('stack') || query.includes('tech') || query.includes('vue') || query.includes('nuxt')) {
    return "Ashly's primary stack centers around Vue 3, Nuxt 4, and TypeScript on the frontend, paired with Node.js or CodeIgniter 4/Laravel and PostgreSQL/MySQL on the backend. He also builds with Tailwind CSS v4, Docker, and real-time WebSockets/WebRTC."
  }
  if (query.includes('hire') || query.includes('available') || query.includes('job') || query.includes('opportunity')) {
    return "Yes! Ashly is currently open to full-time engineering roles and high-impact contract opportunities. You can reach him directly at ashlyomanada.dev@gmail.com or via the Contact form below."
  }
  if (query.includes('contact') || query.includes('email') || query.includes('reach')) {
    return `You can contact Ashly directly at ${profile.socials.email}, or connect on LinkedIn (${profile.socials.linkedin}) and GitHub (${profile.socials.github}).`
  }
  if (query.includes('education') || query.includes('degree') || query.includes('school') || query.includes('minsu')) {
    return "Ashly holds a Bachelor of Science in Information Technology from Mindoro State University (MinSU), where he graduated with Capstone Project Distinction for the EUPER system."
  }
  if (query.includes('location') || query.includes('where') || query.includes('timezone')) {
    return "Ashly is based in Calapan City, Oriental Mindoro, Philippines (UTC+8 timezone), and is fully set up for global remote collaboration."
  }
  return `Hi! I'm Ashly's portfolio assistant. You can ask me about his flagship projects (like the EUPER system), tech stack (Vue/Nuxt, TypeScript, Node), educational background, or how to get in touch for new opportunities!`
}
