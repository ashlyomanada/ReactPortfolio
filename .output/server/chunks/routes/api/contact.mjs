import { d as defineEventHandler, a as assertMethod, g as getRequestHeader, b as getRequestIP, c as createError, r as readBody } from '../../nitro/nitro.mjs';
import { z } from 'zod';
import 'unhead/server';
import 'vue';
import 'unhead/legacy';
import 'unhead/plugins';
import 'mdream';
import 'process';
import 'buffer';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'lru-cache';
import 'node:crypto';
import 'node:async_hooks';
import '@mdream/js/negotiate';
import 'consola';
import 'node:url';
import '@iconify/utils';
import 'fast-xml-parser';
import 'ipx';

const rateLimitMap = /* @__PURE__ */ new Map();
const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(3e3),
  honeypot: z.string().max(0, "Spam detected").optional().default("")
});
const contact = defineEventHandler(async (event) => {
  var _a;
  assertMethod(event, "POST");
  const clientIp = getRequestHeader(event, "x-forwarded-for") || getRequestIP(event) || "127.0.0.1";
  const now = Date.now();
  const windowMs = 60 * 1e3;
  const maxRequests = 4;
  const userRequests = rateLimitMap.get(clientIp) || [];
  const recentRequests = userRequests.filter((ts) => now - ts < windowMs);
  if (recentRequests.length >= maxRequests) {
    throw createError({
      statusCode: 429,
      statusMessage: "Too many contact requests. Please wait a minute and try again."
    });
  }
  recentRequests.push(now);
  rateLimitMap.set(clientIp, recentRequests);
  const body = await readBody(event);
  const validation = ContactSchema.safeParse(body);
  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: ((_a = validation.error.errors[0]) == null ? void 0 : _a.message) || "Invalid form input"
    });
  }
  const { name, email, message, honeypot } = validation.data;
  if (honeypot && honeypot.length > 0) {
    return { success: true, message: "Message sent successfully." };
  }
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: ["ashlyomanada.dev@gmail.com"],
          reply_to: email,
          subject: `\u2728 New Portfolio Inquiry from ${name}`,
          text: `Name: ${name}
Email: ${email}

Message:
${message}`
        })
      });
      if (!response.ok) {
        console.error("Resend delivery failed:", await response.text());
      }
    } catch (err) {
      console.error("Error invoking Resend email service:", err);
    }
  } else {
    console.log(`[Contact Form Received] Name: ${name} <${email}>: "${message}"`);
  }
  return {
    success: true,
    message: `Thank you, ${name}! Your message has been received. Ashly will respond shortly.`
  };
});

export { contact as default };
//# sourceMappingURL=contact.mjs.map
