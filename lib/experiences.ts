export interface ExperienceLink {
  label: string
  url: string
}

export interface Experience {
  id: string
  company: string
  role: string
  period: string
  location?: string
  logo?: string
  logoBg?: string
  initial?: string
  description: string[]
  skills?: string[]
  links?: ExperienceLink[]
}
