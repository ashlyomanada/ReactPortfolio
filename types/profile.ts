export interface StatItem {
  label: string
  value: number
  suffix?: string
  description: string
}

export interface ExperienceItem {
  id: string
  role: string
  company: string
  location: string
  period: string
  current?: boolean
  description: string
  impactBullets: string[]
  technologies: string[]
  metrics?: { label: string; value: string }
}

export interface EducationItem {
  id: string
  degree: string
  institution: string
  period: string
  location: string
  description: string
  honors?: string
  highlights: string[]
}

export interface ProjectItem {
  slug: string
  title: string
  tagline: string
  summary: string
  coverImage: string
  featured: boolean
  category: 'Full-Stack' | 'Frontend' | 'Mobile & Real-Time' | 'Open Source'
  technologies: string[]
  liveUrl?: string
  repoUrl?: string
  problem: string
  role: string
  architecture: string
  outcome: string
  keyFeatures: string[]
}

export interface TechItem {
  name: string
  category: 'Languages' | 'Frontend' | 'Backend' | 'Database' | 'DevOps/Cloud' | 'Tools'
  proficiency: 'Expert' | 'Advanced' | 'Intermediate'
  icon: string
  description?: string
  highlight?: boolean
}

export interface CertificationItem {
  id: string
  title: string
  issuer: string
  issueDate: string
  credentialUrl?: string
  badgeIcon: string
  skillsCovered: string[]
}

export interface BentoItem {
  id: string
  type: 'focus' | 'location' | 'stack' | 'funFact' | 'music'
  title: string
  content: string
  detail?: string
  icon?: string
}

export interface ProfileData {
  name: string
  title: string
  location: string
  timezone: string
  status: {
    available: boolean
    label: string
    subtext: string
  }
  bio: {
    short: string
    full: string[]
    valueStatement: string
  }
  roles: string[]
  avatar: string
  aboutImage: string
  resumeUrl: string
  socials: {
    github: string
    linkedin: string
    email: string
    twitter?: string
    instagram?: string
  }
  bento: BentoItem[]
  stats: StatItem[]
  experiences: ExperienceItem[]
  education: EducationItem[]
  projects: ProjectItem[]
  techStack: TechItem[]
  certifications: CertificationItem[]
}
