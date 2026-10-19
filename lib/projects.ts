import projectsRaw from '@/data/projects.json'

export interface Project {
  id: string
  slug: string
  title: string
  category?: string
  year?: string
  description: string
  liveUrl?: string
  livePreviewUrl?: string
  repoUrl?: string
  githubUrl?: string
  tags?: string[]
  images: string[]
  articleFile?: string
}

function getNonEmptyUrl(val: unknown): string | undefined {
  if (typeof val !== 'string') return undefined
  const trimmed = val.trim()
  if (!trimmed || trimmed === '#') return undefined
  return trimmed
}

/**
 * Converts a string into a clean, URL-friendly slug.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Validates and filters raw project data from JSON.
 * Only complete projects with a title, description, and at least one image are included.
 */
export function getValidProjects(rawProjects: unknown): Project[] {
  if (!Array.isArray(rawProjects)) {
    return []
  }

  return rawProjects
    .map((item, index): Project | null => {
      if (!item || typeof item !== 'object') return null

      const raw = item as Record<string, unknown>

      const title = typeof raw.title === 'string' ? raw.title.trim() : ''
      const description =
        typeof raw.description === 'string' ? raw.description.trim() : ''

      const rawImages = Array.isArray(raw.images) ? raw.images : []
      const images = rawImages
        .filter((img): img is string => typeof img === 'string' && img.trim().length > 0)
        .map((img) => img.trim())

      if (!title || !description || images.length === 0) {
        return null
      }

      const id =
        typeof raw.id === 'string' && raw.id.trim()
          ? raw.id.trim()
          : `project-${index + 1}`

      const rawSlug =
        typeof raw.slug === 'string' && raw.slug.trim()
          ? raw.slug.trim()
          : ''
      const slug = rawSlug ? slugify(rawSlug) : slugify(title) || id

      const articleFile =
        typeof raw.articleFile === 'string' && raw.articleFile.trim()
          ? raw.articleFile.trim()
          : typeof raw.article === 'string' && raw.article.trim()
          ? raw.article.trim()
          : undefined

      const category =
        typeof raw.category === 'string' ? raw.category.trim() : undefined
      const year =
        typeof raw.year === 'string' ? raw.year.trim() : undefined

      const rawLive =
        getNonEmptyUrl(raw.liveUrl) ||
        getNonEmptyUrl(raw.livePreviewUrl) ||
        getNonEmptyUrl(raw.liveLink) ||
        getNonEmptyUrl(raw.livePreview) ||
        getNonEmptyUrl(raw.previewUrl) ||
        getNonEmptyUrl(raw.preview) ||
        getNonEmptyUrl(raw.live)

      const rawRepo =
        getNonEmptyUrl(raw.repoUrl) ||
        getNonEmptyUrl(raw.githubUrl) ||
        getNonEmptyUrl(raw.repoLink) ||
        getNonEmptyUrl(raw.repo) ||
        getNonEmptyUrl(raw.repository)

      const tags = Array.isArray(raw.tags)
        ? raw.tags.filter((t): t is string => typeof t === 'string' && t.trim().length > 0)
        : undefined

      return {
        id,
        slug,
        title,
        category,
        year,
        description,
        liveUrl: rawLive,
        livePreviewUrl: rawLive,
        repoUrl: rawRepo,
        githubUrl: rawRepo,
        tags,
        images,
        articleFile,
      }
    })
    .filter((p): p is Project => p !== null)
}

/**
 * Returns all valid projects loaded from data/projects.json
 */
export function getAllProjects(): Project[] {
  return getValidProjects(projectsRaw)
}

/**
 * Retrieves a single project by its slug, id, or slugified title.
 */
export function getProjectBySlug(slug: string): Project | undefined {
  const projects = getAllProjects()
  const normalized = decodeURIComponent(slug).toLowerCase().trim()
  return projects.find((p) => {
    return (
      p.slug.toLowerCase() === normalized ||
      p.id.toLowerCase() === normalized ||
      slugify(p.title) === normalized
    )
  })
}

/**
 * Returns the previous and next projects relative to the given slug.
 */
export function getProjectNavigation(currentSlug: string): {
  prevProject: Project | null
  nextProject: Project | null
} {
  const projects = getAllProjects()
  if (projects.length <= 1) {
    return { prevProject: null, nextProject: null }
  }

  const normalized = decodeURIComponent(currentSlug).toLowerCase().trim()
  const currentIndex = projects.findIndex(
    (p) =>
      p.slug.toLowerCase() === normalized ||
      p.id.toLowerCase() === normalized ||
      slugify(p.title) === normalized
  )

  if (currentIndex === -1) {
    return { prevProject: null, nextProject: null }
  }

  const prevIndex = (currentIndex - 1 + projects.length) % projects.length
  const nextIndex = (currentIndex + 1) % projects.length

  return {
    prevProject: projects[prevIndex],
    nextProject: projects[nextIndex],
  }
}
