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
 * - period: Duration / timeframe (e.g., 'August 2022 — Present')
 * - location: Location or work format (e.g., 'Lahore, Pakistan • Hybrid')
 * - logo: Path to company logo or image in public/ (e.g., '/companies/tintash.svg')
 * - logoBg: Optional background color for the logo container (e.g., '#E81C5A')
 * - initial: Optional letter initial to show when logo is not available
 * - description: Array of bullet points describing your impact and responsibilities
 * - skills: Array of technologies or skills used
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
      'Architected and Scaled Backend Ecosystems: Led the end-to-end design and development of high-concurrency SaaS architectures using Javascript, Python and PostgreSQL.',
      'Engineered Scalable Cloud Infrastructure: Designed and managed robust cloud environments, implementing automated scaling and disaster recovery protocols that maintained 99.9% uptime for mission-critical services.',
      'Full-Stack & Systems Integration: Drove the integration of complex financial and subscription logic.',
      'Observability & Performance Optimization: Spearheaded the implementation of comprehensive monitoring frameworks using New Relic, Sentry and Posthog, reducing API latency and identifying bottlenecks before they impacted production.',
      'Technical Leadership & Mentorship: Acted as a primary mentor for junior engineers, establishing high-quality code standards and training.',
      'Cross-Functional Stakeholder Management: Orchestrated technical delivery across distributed teams, managing project lifecycles and architectural pivots during asynchronous US/Global collaboration hours.'
    ],
    skills: ['JavaScript', 'Python', 'PostgreSQL', 'AWS', 'New Relic', 'Sentry', 'PostHog', 'System Architecture'],
    links: [
      { label: 'Tintash', url: 'https://tintash.com' }
    ]
  },
  {
    id: 'exp-transform2scale-lead',
    company: 'Transform2Scale',
    role: 'Technical Lead (Contract)',
    period: 'Sept 2026 — Present',
    location: 'Remote • Contract',
    initial: 'T',
    logoBg: '#131318',
    description: [
      'System Architecture & Solution Design: Architected end-to-end multi-agent pipelines and retrieval systems, driving high-level technical decisions, database schema design, and cloud infrastructure scalability.',
      'Requirements Discovery & Scope Management: Interfaced directly with stakeholders to translate business workflows into technical specifications, scoping sprints, defining milestones, and mitigating delivery bottlenecks.',
      'Technical Leadership & Execution: Spearheaded development sprints, established coding standards, conducted architectural reviews, and guided team members across implementation, testing, and continuous deployment.'
    ],
    skills: ['Multi-Agent Systems', 'System Architecture', 'Database Design', 'Cloud Scalability', 'Team Leadership'],
    links: [
      { label: 'Transform 2 Scale', url: 'https://www.ab-alpha.de/en/portfolio-item/transform2scale/' }
    ]
  },
  {
    id: 'exp-transform2scale-se',
    company: 'Transform2Scale',
    role: 'Software Engineer (Contract)',
    period: 'June 2026 — Sept 2026',
    location: 'Remote • Contract',
    initial: 'T',
    logoBg: '#131318',
    description: [
      'Core Agent Platform Engineering: Built scalable backend services and execution engines to support autonomous AI agent lifecycle management, dynamic state persistence, and inter-service messaging.',
      'Security & Governance Enforcement: Implemented granular RBAC, execution guardrails, and audit logging to ensure secure API integrations and compliant tool calling across runtime environments.',
      'API Development & Integration: Designed high-throughput RESTful endpoints and asynchronous worker pipelines to facilitate low-latency agent orchestration and real-time monitoring.'
    ],
    skills: ['Autonomous AI Agents', 'RBAC Guardrails', 'REST APIs', 'Async Worker Pipelines', 'State Persistence'],
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
      'Led backend development for Infinity Table, a cloud-hosted AR tabletop RPG SaaS platform.',
      'Integrated OpenAI APIs (ChatGPT) for LLM-powered real-time narrative responses and voice-guided gameplay.',
      'Architected scalable backend logic using Django and FastAPI, optimized for low-latency multiplayer experiences.',
      'Collaborated closely with US-based leadership and design teams during overlapping night hours.',
      'Delivered critical features with tight deadlines and led code reviews for backend modules.'
    ],
    skills: ['Python', 'Django', 'FastAPI', 'OpenAI API', 'WebSockets', 'AWS', 'Real-Time Multiplayer'],
    links: [
      { label: 'Robot Sea Monster Games', url: 'https://rsm-studio.com/#case-studies' }
    ]
  },
  {
    id: 'exp-knowledge-streams',
    company: 'Knowledge Streams',
    role: 'Technical Instructor Python/Django',
    period: 'August 2023 — Feb 2025',
    location: 'Lahore, Pakistan',
    initial: 'K',
    logoBg: '#131318',
    description: [
      'Trained 100+ university grads on Django, REST APIs, database modeling, and cloud deployment.',
      'Mentored students through SaaS-style capstone projects including billing, authentication, and cloud hosting.'
    ],
    skills: ['Python', 'Django', 'REST APIs', 'Database Modeling', 'Cloud Deployment', 'Mentorship'],
    links: [
      { label: 'Knowledge Streams', url: 'https://knowledge.tech' }
    ]
  }
]

export default experiences
