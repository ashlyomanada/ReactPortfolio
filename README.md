# Ashly Omanada — Full-Stack Portfolio

A high-performance personal portfolio website built with **Nuxt 4**, **Tailwind CSS v4**, **TypeScript strict mode**, **Motion**, and **Nuxt SEO**.

---

## ⚡ Quick Start

### 1. Requirements
- Node.js `^22.21.0` or `>=22`
- `pnpm` (`^9.x` or latest)

### 2. Installation & Development

```bash
# Install dependencies
pnpm install

# Start local development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build

```bash
# Build production bundle
pnpm build

# Preview locally
node .output/server/index.mjs
```

---

## 🔐 Environment Variables (`.env`)

Create a `.env` file in the root directory:

```env
# Optional: GitHub token to increase API rate limits for live contribution stats
GITHUB_TOKEN=ghp_your_github_personal_access_token

# Optional: Resend API key for delivering contact form inquiries directly to your inbox
RESEND_API_KEY=re_your_resend_api_key

# Optional: LLM API key for powering the "Ask Ashly" streaming AI assistant
LLM_API_KEY=sk-your_openai_or_compatible_api_key
LLM_API_BASE=https://api.openai.com/v1
LLM_MODEL=gpt-4o-mini
```

> **Note**: If any environment variable is unset, the portfolio runs with built-in fallbacks (cached GitHub statistics, simulation contact logger, and grounded profile assistant replies).

---

## ✍️ How to Edit Personal Content

All profile data, bios, stats, social links, and experiences are centralized in:

📁 [`content/profile.ts`](./content/profile.ts)

Every editable placeholder is marked with a clear `// TODO:` comment.

### Blog Posts & Markdown Projects
- **Blog Articles**: Place `.md` files in [`content/blog/`](./content/blog/)
- **Projects**: Place case study `.md` files in [`content/projects/`](./content/projects/)
- **Images**: Place screenshots in [`public/projects/`](./public/projects/) and your résumé in [`public/resume.pdf`](./public/resume.pdf).

---

## 🚀 Deployment

### Vercel (Zero Config)
1. Push repository to GitHub.
2. Import project into Vercel.
3. Framework preset: **Nuxt.js**.
4. Configure environment variables (`GITHUB_TOKEN`, `RESEND_API_KEY`, `LLM_API_KEY`).
5. Deploy!

### Netlify (Zero Config)
1. Import repository into Netlify.
2. Build command: `pnpm build`
3. Publish directory: `.output/public`
4. Set environment variables.
5. Deploy!

---

## 🏛️ Project Architecture

```
ReactPortfolio/
├── app.vue                      # Root layout, Command Palette, AI Assistant & Toast
├── assets/
│   └── css/main.css             # Tailwind CSS v4 @theme design tokens & glass styles
├── components/
│   ├── interactive/             # CommandPalette.vue (Cmd+K), AskAshlyChat.vue
│   ├── layout/                  # AppHeader, AppFooter, MobileMenu, ScrollProgress
│   ├── sections/                # 01 Hero, 02 Stats, 03 Experience, 04 Education,
│   │                            # 05 Projects, 06 Tech, 07 Certs, 08 Blog, 09 GitHub, 10 Contact
│   └── ui/                      # SectionHeader, Toast
├── content/
│   ├── profile.ts               # Single source of truth with TODO markers
│   ├── blog/                    # Markdown articles
│   └── projects/                # Case study markdowns
├── pages/
│   ├── index.vue                # Home page (01-10 numbered sections)
│   ├── projects/                # /projects & /projects/[slug]
│   ├── blog/                    # /blog & /blog/[slug]
│   ├── tech-stack.vue           # /tech-stack interactive matrix
│   ├── certifications.vue       # /certifications credentials catalog
│   ├── gallery.vue              # /gallery lightbox visual gallery
│   └── uses.vue                 # /uses developer setup & hardware
├── server/
│   └── api/                     # /api/github-stats, /api/contact, /api/chat
└── types/profile.ts             # Strict TypeScript definitions
```
