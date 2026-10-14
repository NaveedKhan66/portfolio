/**
 * Work Experiences Data File
 * 
 * You can add, edit, or remove experiences here.
 * Changes in this file will automatically reflect on the portfolio timeline.
 * 
 * Fields for each experience entry:
 * - id: Unique string identifier (e.g., 'exp-tintash-senior')
 * - company: Company or organization name (e.g., 'Tintash')
 * - role: Job title / position (e.g., 'Senior Software Engineer')
 * - period: Duration / timeframe (e.g., '2023 — Present')
 * - location: Location or work format (e.g., 'Lahore, Pakistan • Hybrid')
 * - logo: Path to company logo or image in public/ (e.g., '/companies/tintash.svg')
 * - logoBg: Optional background color for the logo container (e.g., '#E81C5A')
 * - description: Array of bullet points describing your impact and responsibilities
 * - skills: Array of technologies or skills used
 * - links: Optional array of related links (label and url)
 */

export const experiences = [
  {
    id: 'exp-tintash-senior',
    company: 'Tintash',
    role: 'Senior Software Engineer',
    period: '2023 — Present',
    location: 'Lahore, Pakistan • Hybrid',
    logo: '/companies/tintash.svg',
    logoBg: '#E81C5A',
    description: [
      'Architecting and building production-grade web systems, high-concurrency services, and real-time interactive interfaces.',
      'Spearheading modern AI integration workflows, LLM orchestration harnesses, and autonomous agent systems across client initiatives.',
      'Mentoring engineers, establishing code quality standards, and driving end-to-end feature delivery from discovery to deployment.'
    ],
    skills: ['Next.js', 'TypeScript', 'Node.js', 'AI Agents', 'System Architecture', 'PostgreSQL'],
    links: [
      { label: 'Tintash', url: 'https://tintash.com/' }
    ]
  },
  {
    id: 'exp-tintash-se',
    company: 'Tintash',
    role: 'Software Engineer',
    period: '2021 — 2023',
    location: 'Lahore, Pakistan • On-site',
    logo: '/companies/tintash.svg',
    logoBg: '#E81C5A',
    description: [
      'Engineered responsive full-stack applications with high performance benchmarks and seamless cross-platform user experiences.',
      'Collaborated closely with US and international product managers, designers, and cross-functional engineering squads.',
      'Designed modular frontend design systems and resilient API contracts, reducing tech debt and speeding up sprint velocity.'
    ],
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'REST / GraphQL', 'Docker', 'Jest'],
    links: [
      { label: 'Company Overview', url: 'https://tintash.com/' }
    ]
  },
  {
    id: 'exp-agentic-systems',
    company: 'AI & Systems Research',
    role: 'Agentic Systems & Core Contributor',
    period: '2023 — Present',
    location: 'Open Source & Independent',
    logo: '/companies/agentic.svg',
    logoBg: '#18181B',
    description: [
      'Researching and experimenting with autonomous coding agents, multi-agent coordination loops, and LLM reasoning pipelines.',
      'Developing low-latency event streams and streaming tool execution environments for autonomous pair-programming.'
    ],
    skills: ['Python', 'LangChain', 'FastAPI', 'Vector Databases', 'Prompt Engineering'],
    links: [
      { label: 'GitHub Profile', url: 'https://github.com/' }
    ]
  },
  {
    id: 'exp-freelance',
    company: 'Independent Engineer',
    role: 'Full Stack Product Engineer',
    period: '2020 — 2021',
    location: 'Remote • Global Clients',
    logo: '/companies/freelance.svg',
    logoBg: '#0A0A0A',
    description: [
      'Partnered directly with founders to ideate, prototype, and ship early MVPs to validate product-market fit.',
      'Delivered end-to-end web applications with custom animations, authentication, payments, and automated deployment pipelines.'
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Tailwind CSS', 'Stripe API'],
    links: []
  }
]

export default experiences
