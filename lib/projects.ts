export interface Project {
  id: string
  title: string
  category?: string
  year?: string
  description: string
  liveUrl?: string
  githubUrl?: string
  tags?: string[]
  images: string[]
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
      const category =
        typeof raw.category === 'string' ? raw.category.trim() : undefined
      const year =
        typeof raw.year === 'string' ? raw.year.trim() : undefined
      const liveUrl =
        typeof raw.liveUrl === 'string' && raw.liveUrl.trim()
          ? raw.liveUrl.trim()
          : undefined
      const githubUrl =
        typeof raw.githubUrl === 'string' && raw.githubUrl.trim()
          ? raw.githubUrl.trim()
          : undefined
      const tags = Array.isArray(raw.tags)
        ? raw.tags.filter((t): t is string => typeof t === 'string' && t.trim().length > 0)
        : undefined

      return {
        id,
        title,
        category,
        year,
        description,
        liveUrl,
        githubUrl,
        tags,
        images,
      }
    })
    .filter((p): p is Project => p !== null)
}
