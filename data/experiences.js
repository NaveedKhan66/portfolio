/**
 * Work Experiences Data File
 * 
 * Concise, high-impact career timeline entries.
 * 
 * Fields for each experience entry:
 * - id: Unique string identifier (e.g., 'exp-tintash-senior')
 * - company: Company or organization name (e.g., 'Tintash')
 * - role: Job title / position (e.g., 'Senior Software Engineer')
 * - subtitle: Optional promotion or progression note (e.g., 'Promoted from Software Engineer')
 * - period: Duration / timeframe (e.g., 'August 2022 — Present')
 * - location: Location or work format (e.g., 'Lahore, Pakistan • Hybrid')
 * - logo: Path to company logo or image in public/ (e.g., '/companies/tintash.svg')
 * - logoBg: Optional background color for the logo container (e.g., '#E81C5A')
 * - initial: Optional letter initial to show when logo is not available
 * - description: Array of concise, high-impact bullet points focusing on engineering outcomes
 * - skills: Array of core technologies or competencies
 * - links: Optional array of related links (label and url)
 */

export const experiences = [
  {
    id: 'exp-tintash-senior',
    company: 'Tintash',
    role: 'Senior Software Engineer',
    period: 'August 2022 — Present',
    location: 'Lahore, Pakistan • Hybrid',
    logo: '/companies/tintash.svg',
    logoBg: '#E81C5A',
    description: [
      'Architected and scaled high-concurrency SaaS backends and subscription engines with Python, Node.js, and PostgreSQL, maintaining 99.9% uptime for client systems.',
      'Implemented full-stack observability with New Relic, Sentry, and PostHog, proactively identifying bottlenecks and significantly reducing p99 API latencies.',
      'Mentored engineering teams and established architectural standards, CI/CD automation, and rigorous code reviews across US and global client projects.'
    ],
    skills: ['Python', 'PostgreSQL', 'Node.js', 'AWS', 'System Architecture', 'Observability'],
    links: [
      { label: 'Tintash', url: 'https://tintash.com' }
    ]
  },
  {
    id: 'exp-transform2scale',
    company: 'Transform2Scale',
    role: 'Technical Lead (Contract)',
    subtitle: 'Promoted from Software Engineer',
    period: 'June 2026 — Present',
    location: 'Remote • Contract',
    initial: 'T',
    logoBg: '#131318',
    description: [
      'Promoted from Software Engineer to Tech Lead to guide sprint architecture, technical roadmap, and system scalability for autonomous AI systems.',
      'Architected production multi-agent pipelines and asynchronous execution engines supporting dynamic state persistence and low-latency tool orchestration.',
      'Engineered granular RBAC governance, execution sandboxes, and audit logging layers to enforce compliant runtime operations.'
    ],
    skills: ['Multi-Agent Systems', 'Autonomous AI', 'Python / FastAPI', 'RBAC Guardrails', 'System Architecture'],
    links: [
      { label: 'Transform 2 Scale', url: 'https://www.ab-alpha.de/en/portfolio-item/transform2scale/' }
    ]
  },
  {
    id: 'exp-robot-sea-monster',
    company: 'Robot Sea Monster',
    role: 'Backend Engineer (Contract)',
    period: 'January 2025 — March 2025',
    location: 'Remote • Contract',
    logo: '/companies/robotseamonster.svg',
    logoBg: '#13202B',
    description: [
      'Architected low-latency backend services with Django, FastAPI, and WebSockets for Infinity Table, a cloud-hosted AR tabletop RPG SaaS platform.',
      'Integrated OpenAI APIs to deliver sub-second, real-time LLM narrative generation and voice-guided interactive gameplay.'
    ],
    skills: ['Python', 'FastAPI / Django', 'OpenAI API', 'WebSockets', 'AWS'],
    links: [
      { label: 'Case Study', url: '/projects/infinity-table' },
      { label: 'Robot Sea Monster Games', url: 'https://rsm-studio.com/#case-studies' }
    ]
  },
  {
    id: 'exp-knowledge-streams',
    company: 'Knowledge Streams',
    role: 'Technical Instructor (Python & Django)',
    period: 'August 2023 — Feb 2025',
    location: 'Lahore, Pakistan',
    initial: 'K',
    logoBg: '#131318',
    description: [
      'Trained and mentored 100+ engineers in production Python, Django REST Framework, database modeling, and AWS cloud deployment.',
      'Guided cohorts through shipping full-stack SaaS capstones featuring end-to-end authentication, Stripe billing, and CI/CD pipelines.'
    ],
    skills: ['Python', 'Django REST', 'Database Modeling', 'AWS', 'Mentorship'],
    links: [
      { label: 'Knowledge Streams', url: 'https://knowledge.tech' }
    ]
  }
]

export default experiences
