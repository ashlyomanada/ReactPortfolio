import type { ProfileData } from '~/types/profile'

export const profile: ProfileData = {
  name: 'Ashly Omañada',
  title: 'Full-Stack Developer',
  // TODO: Replace with your actual City & Country (e.g., "Manila, Philippines")
  location: 'Makati City, Philippines',
  timezone: 'Asia/Manila (UTC+8)',
  status: {
    available: true,
    label: 'Open to Opportunities',
    // TODO: Customize your current availability statement
    subtext: 'Available for full-time engineering roles & high-impact contracts',
  },
  roles: [
    'Software Developer',
    'Web Developer',
    'AI Engineer',
    'Software Engineer',
    'Full-Stack Developer',
    'Vue & Nuxt Specialist',
    'TypeScript & Node.js Engineer',
    'Real-Time & WebRTC Explorer',
    'API & System Architect',
  ],
  bio: {
    // TODO: Customize your 2-3 sentence hero bio
    short:
      'Passionate full-stack developer dedicated to building high-performance, resilient web applications with modern architectures. I transform complex operational challenges into elegant, intuitive digital experiences.',
    full: [
      'With a solid engineering foundation across modern frontend frameworks and robust backend services, I specialize in crafting full-cycle web applications that balance speed, accessibility, and visual precision.',
      'From mission-critical institutional dashboards to consumer-facing mobile platforms, I bridge the gap between user-first visual polish and hardened server-side architecture.',
    ],
    valueStatement:
      'Building performant, scalable web applications with pixel perfection, resilient APIs, and thoughtful developer ergonomics.',
  },
  avatar: '/images/portrait.png',
  aboutImage: '/images/about.jpg',
  // TODO: Place your resume PDF in /public/resume.pdf or update with your live resume link
  resumeUrl: '/resume.pdf',
  socials: {
    // TODO: Update your actual GitHub profile link
    github: 'https://github.com/ashlyomanada',
    // TODO: Update your actual LinkedIn profile URL
    linkedin: 'https://linkedin.com/in/ashly-omanada',
    // TODO: Update with your primary contact email
    email: 'ashlyomanada.dev@gmail.com',
    // TODO: Optional - Update or remove Twitter/X handle
    twitter: 'https://x.com/ashlyomanada',
    // TODO: Optional - Update or remove Instagram URL
    instagram: 'https://instagram.com/ashlyomanada',
  },
  bento: [
    {
      id: 'current-focus',
      type: 'focus',
      title: 'Current Focus',
      content: 'Nuxt 4, Distributed Systems & Edge Functions',
      detail: 'Architecting ultra-low latency real-time interfaces with WebRTC and PostgreSQL.',
      icon: 'heroicons:sparkles',
    },
    {
      id: 'location-time',
      type: 'location',
      title: 'Based In',
      // TODO: Update with your exact location
      content: 'Calapan City, PH',
      detail: 'UTC+8 timezone • Remote ready globally',
      icon: 'heroicons:map-pin',
    },
    {
      id: 'stack-highlight',
      type: 'stack',
      title: 'Core Philosophy',
      content: 'Speed, Type-Safety & User Empathy',
      detail: 'Zero compromise on web vitals, keyboard ergonomics, and design craft.',
      icon: 'heroicons:code-bracket',
    },
    {
      id: 'fun-fact',
      type: 'funFact',
      title: 'Beyond the Screen',
      // TODO: Replace with your favorite hobbies or fun facts
      content: 'Espresso brewer & mechanical keyboard enthusiast',
      detail: 'Believes great software is as much about taste as it is about clean tests.',
      icon: 'heroicons:heart',
    },
  ],
  stats: [
    {
      label: 'Years Building',
      value: 3,
      suffix: '+',
      description: 'Hands-on production & freelance engineering experience',
    },
    {
      label: 'Projects Delivered',
      value: 12,
      suffix: '+',
      description: 'From enterprise evaluation portals to interactive apps',
    },
    {
      label: 'Technologies Mastered',
      value: 18,
      suffix: '+',
      description: 'Full-stack languages, libraries, databases & cloud tools',
    },
    {
      label: 'Code Quality Score',
      value: 99,
      suffix: '%',
      description: 'Consistently high Lighthouse performance & accessibility marks',
    },
  ],
  experiences: [
    {
      id: 'exp-1',
      // TODO: Update with your actual latest position / company
      role: 'Full-Stack Developer (Contract / Capstone Lead)',
      company: 'PNP MIMAROPA — Regional Evaluation Unit',
      location: 'Calapan City / Hybrid',
      period: '2024 — 2025',
      current: true,
      description:
        'Led the architectural design and full-stack development of the EUPER (Unit Performance Evaluation) system, supporting data-driven rank forecasting across provincial police divisions.',
      impactBullets: [
        'Designed dual admin & client evaluation portals servicing hundreds of officer rating submissions with sub-100ms response times.',
        'Engineered automated ranking calculations and predictive score models, reducing manual report compilation overhead by 70%.',
        'Implemented interactive visualization dashboards with Vue.js, dynamic charts, and audit-compliant report generation.',
      ],
      technologies: ['Vue.js', 'CodeIgniter 4', 'MySQL', 'Bootstrap', 'REST APIs'],
      metrics: { label: 'Evaluation speedup', value: '70%' },
    },
    {
      id: 'exp-2',
      // TODO: Update with previous internship, freelance, or engineering role
      role: 'Frontend & Full-Stack Freelance Engineer',
      company: 'Independent Engineering',
      location: 'Remote',
      period: '2023 — Present',
      current: false,
      description:
        'Delivered bespoke web solutions, responsive client storefronts, and web portals for small business clients and digital startups.',
      impactBullets: [
        'Developed tailored brand web applications (Kapares Resto, Bundat Burgers) featuring interactive menu navigators and streamlined order inquiry paths.',
        'Built MovieTuneApp, integrating third-party movie metadata APIs and dynamic watchlists with responsive mobile layouts.',
        'Maintained 100% mobile responsiveness and cross-browser stability across all delivered client web properties.',
      ],
      technologies: ['Vue.js', 'React', 'Tailwind CSS', 'TypeScript', 'Node.js'],
      metrics: { label: 'Client satisfaction', value: '100%' },
    },
  ],
  education: [
    {
      id: 'edu-1',
      // TODO: Update with your actual Bachelor degree title & University name
      degree: 'Bachelor of Science in Information Technology',
      institution: 'Mindoro State University (MinSU)',
      period: '2021 — 2025',
      location: 'Oriental Mindoro, Philippines',
      description:
        'Focused on Software Engineering, Database Systems, Web Architectures, and Human-Computer Interaction.',
      honors: 'Capstone Project Distinction',
      highlights: [
        'Capstone Lead for the PNP MIMAROPA Regional Evaluation platform',
        'Top project recognition for operational utility and data visualization excellence',
        'Active mentor in collegiate programming circles and web workshops',
      ],
    },
  ],
  projects: [
    {
      slug: 'euper-system',
      title: 'EUPER Police Evaluation Platform',
      tagline: 'Automated ranking, predictive performance scoring, and institutional intelligence for PNP MIMAROPA.',
      summary:
        'A mission-critical evaluation platform enabling senior commanding officers to assess police units across municipal and provincial levels with real-time analytics and predictive performance analytics.',
      coverImage: '/projects/capstone1.png',
      featured: true,
      category: 'Full-Stack',
      technologies: ['Vue.js', 'CodeIgniter 4', 'MySQL', 'Bootstrap 5', 'REST APIs'],
      liveUrl: 'https://euper.netlify.app/',
      repoUrl: 'https://github.com/ashlyomanada',
      problem:
        'Regional police evaluation historically relied on fragmented paper scorecards and delayed spreadsheet submissions, causing significant review lag and human collation error.',
      role: 'Full-Stack Architect & Lead Developer',
      architecture:
        'Modular Vue.js SPA frontend consuming normalized REST endpoints via a secure CodeIgniter 4 backend with role-based access control (RBAC) and indexed MySQL tables.',
      outcome:
        'Reduced report turnaround time from weeks to seconds, providing real-time ranking transparency and automated deadline enforcement across all participating units.',
      keyFeatures: [
        'Dual-portal architecture: Granular admin evaluation management + public unit rating viewer',
        'Real-time automated score weighting and predictive performance categorization',
        'One-click audit report export and compliance dashboard visualizations',
      ],
    },
    {
      slug: 'movietune-app',
      title: 'MovieTune Streaming Discovery',
      tagline: 'High-speed movie exploration, dynamic filtering, and curated watchlist management.',
      summary:
        'A sleek entertainment catalog web application that enables users to discover trending releases, preview trailers, inspect cast filmographies, and organize personalized watchlists.',
      coverImage: '/projects/movietune.png',
      featured: false,
      category: 'Frontend',
      technologies: ['React 19', 'Tailwind CSS', 'TMDB API', 'Vite'],
      liveUrl: 'https://movietuneapp4u.netlify.app/',
      repoUrl: 'https://github.com/ashlyomanada/movietuneapp',
      problem:
        'Modern streaming viewers struggle with discovery fatigue across fragmented movie catalogs without quick access to trailers and ratings.',
      role: 'Frontend Engineer',
      architecture:
        'React client with asynchronous data fetching, client-side caching, fluid debounced search, and responsive grid layouts.',
      outcome:
        'Achieved sub-100ms search interactions and an intuitive, mobile-friendly browsing experience.',
      keyFeatures: [
        'Real-time debounced movie and actor querying',
        'Interactive trailer player modals and rating breakdowns',
        'Local storage persistence for offline watchlist tracking',
      ],
    },
    {
      slug: 'kapares-resto',
      title: 'Kapares Comfort Dining',
      tagline: 'Warm culinary showcase and digital storefront for authentic Filipino cuisine.',
      summary:
        'A warm, appetizing brand website designed for a specialty pares house, presenting signature items, combo promotions, and inquiry pathways.',
      coverImage: '/projects/kapares.png',
      featured: false,
      category: 'Frontend',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI'],
      liveUrl: 'https://ashlyomanada.github.io/kapares-resto/',
      repoUrl: 'https://github.com/ashlyomanada/kapares-resto',
      problem:
        'Local food businesses need immediate visual appeal and simple mobile menus without relying exclusively on third-party delivery apps.',
      role: 'UI Designer & Web Developer',
      architecture:
        'Lightweight semantic HTML5 structure with hand-crafted CSS variables and smooth interactive navigation.',
      outcome:
        'Delivered a 100/100 Lighthouse performance rating with instant load times on low-bandwidth mobile connections.',
      keyFeatures: [
        'Mouthwatering visual menu showcases with pricing tiers',
        'Location and operating hour indicators with direct message links',
        'Mobile-first responsive layout optimized for smartphone browsing',
      ],
    },
    {
      slug: 'bundat-burger-shop',
      title: 'Bundat Street Burgers',
      tagline: 'Bold, street-style burger shop website with dynamic combo menus and punchy brand visuals.',
      summary:
        'An energetic showcase for an artisanal burger brand, combining punchy typography, combo cards, and direct order engagement.',
      coverImage: '/projects/bundat.png',
      featured: false,
      category: 'Frontend',
      technologies: ['HTML5', 'CSS3', 'Modern Typography', 'Mobile UI'],
      liveUrl: 'https://ashlyomanada.github.io/bundat-burger-shop/',
      repoUrl: 'https://github.com/ashlyomanada/bundat-burger-shop',
      problem:
        'Street-food brands require high-impact visual identity to stand out from generic food court options.',
      role: 'Frontend Developer',
      architecture:
        'Minimalist, zero-framework architecture ensuring maximum reliability and zero maintenance overhead.',
      outcome:
        'Elevated the shop’s local brand presence and streamlined menu browsing for hungry patrons.',
      keyFeatures: [
        'High-contrast street-aesthetic layout with prominent calls to action',
        'Categorized signature burgers, sides, and beverage sections',
        'Instant mobile touch target optimization for quick navigation',
      ],
    },
  ],
  techStack: [
    // Languages
    { name: 'TypeScript', category: 'Languages', proficiency: 'Advanced', icon: 'logos:typescript-icon', highlight: true },
    { name: 'JavaScript (ESNext)', category: 'Languages', proficiency: 'Expert', icon: 'logos:javascript', highlight: true },
    { name: 'PHP 8+', category: 'Languages', proficiency: 'Advanced', icon: 'logos:php', highlight: true },
    { name: 'SQL', category: 'Languages', proficiency: 'Advanced', icon: 'carbon:sql', highlight: false },
    { name: 'HTML5 & Semantic Web', category: 'Languages', proficiency: 'Expert', icon: 'logos:html-5', highlight: false },
    { name: 'CSS3 / Modern Layouts', category: 'Languages', proficiency: 'Expert', icon: 'logos:css-3', highlight: false },

    // Frontend
    { name: 'Vue.js (Vue 3 / Composition)', category: 'Frontend', proficiency: 'Expert', icon: 'logos:vue', highlight: true },
    { name: 'Nuxt 4 / Nuxt 3', category: 'Frontend', proficiency: 'Advanced', icon: 'logos:nuxt-icon', highlight: true },
    { name: 'React 19', category: 'Frontend', proficiency: 'Advanced', icon: 'logos:react', highlight: true },
    { name: 'Tailwind CSS v4', category: 'Frontend', proficiency: 'Expert', icon: 'logos:tailwindcss-icon', highlight: true },
    { name: 'Vite', category: 'Frontend', proficiency: 'Advanced', icon: 'logos:vitejs', highlight: false },
    { name: 'Pinia / State Management', category: 'Frontend', proficiency: 'Advanced', icon: 'logos:pinia', highlight: false },

    // Backend
    { name: 'Node.js', category: 'Backend', proficiency: 'Advanced', icon: 'logos:nodejs-icon', highlight: true },
    { name: 'CodeIgniter 4', category: 'Backend', proficiency: 'Advanced', icon: 'logos:codeigniter-icon', highlight: true },
    { name: 'Laravel', category: 'Backend', proficiency: 'Intermediate', icon: 'logos:laravel', highlight: true },
    { name: 'RESTful API Architecture', category: 'Backend', proficiency: 'Advanced', icon: 'carbon:api', highlight: true },
    { name: 'Sequelize / ORMs', category: 'Backend', proficiency: 'Intermediate', icon: 'logos:sequelize', highlight: false },

    // Database
    { name: 'PostgreSQL', category: 'Database', proficiency: 'Advanced', icon: 'logos:postgresql', highlight: true },
    { name: 'MySQL / MariaDB', category: 'Database', proficiency: 'Advanced', icon: 'logos:mysql-icon', highlight: true },
    { name: 'Redis (Caching)', category: 'Database', proficiency: 'Intermediate', icon: 'logos:redis', highlight: false },

    // DevOps / Cloud / Real-Time
    { name: 'Docker & Containers', category: 'DevOps/Cloud', proficiency: 'Intermediate', icon: 'logos:docker-icon', highlight: true },
    { name: 'WebRTC / Real-Time Audio-Video', category: 'DevOps/Cloud', proficiency: 'Intermediate', icon: 'logos:webrtc', highlight: true },
    { name: 'Capacitor (Mobile Apps)', category: 'DevOps/Cloud', proficiency: 'Intermediate', icon: 'logos:capacitorjs-icon', highlight: true },
    { name: 'Git & GitHub Actions', category: 'DevOps/Cloud', proficiency: 'Advanced', icon: 'logos:git-icon', highlight: false },
    { name: 'Netlify & Vercel Deployments', category: 'DevOps/Cloud', proficiency: 'Advanced', icon: 'logos:netlify-icon', highlight: false },

    // Tools
    { name: 'VS Code & Ergonomics', category: 'Tools', proficiency: 'Expert', icon: 'logos:visual-studio-code', highlight: false },
    { name: 'Postman & Hoppscotch', category: 'Tools', proficiency: 'Advanced', icon: 'logos:postman-icon', highlight: false },
    { name: 'Figma (UI Design & Specs)', category: 'Tools', proficiency: 'Intermediate', icon: 'logos:figma', highlight: false },
    { name: 'Zod & Schema Validation', category: 'Tools', proficiency: 'Advanced', icon: 'carbon:data-structured', highlight: false },
  ],
  certifications: [
    {
      id: 'cert-1',
      // TODO: Replace with your actual certificate titles
      title: 'Full-Stack Web Development Specialization',
      issuer: 'DICT / National ICT Competency Certification',
      issueDate: '2024',
      // TODO: Add your verification URL
      credentialUrl: 'https://example.com/certificate/fullstack',
      badgeIcon: 'heroicons:academic-cap',
      skillsCovered: ['Vue.js', 'REST Architecture', 'Database Normalization', 'Application Security'],
    },
    {
      id: 'cert-2',
      // TODO: Replace with your actual certificate titles
      title: 'Modern Frontend Engineering with Vue & TypeScript',
      issuer: 'Vue Mastery / Frontend Academy',
      issueDate: '2024',
      credentialUrl: 'https://example.com/certificate/vue-ts',
      badgeIcon: 'heroicons:check-badge',
      skillsCovered: ['Composition API', 'Nuxt SSR', 'Pinia', 'TypeScript Generics'],
    },
    {
      id: 'cert-3',
      // TODO: Replace with your actual certificate titles
      title: 'Relational Database Design & Query Optimization',
      issuer: 'Oracle Academy / University Certification',
      issueDate: '2023',
      credentialUrl: 'https://example.com/certificate/databases',
      badgeIcon: 'heroicons:server-stack',
      skillsCovered: ['PostgreSQL', 'MySQL', 'Indexing Strategies', 'ACID Transactions'],
    },
  ],
}
