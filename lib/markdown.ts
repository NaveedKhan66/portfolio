import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked, Renderer } from 'marked'
import { Project, slugify } from './projects'

export interface ArticleMetadata {
  title?: string
  subtitle?: string
  date?: string
  author?: string
  bannerImage?: string
  tags?: string[]
  [key: string]: unknown
}

export interface ProjectArticle {
  exists: boolean
  isEmpty: boolean
  rawContent: string
  html: string
  metadata: ArticleMetadata
  filePath: string | null
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Searches candidate filesystem paths for a project's markdown article.
 */
export function findArticleFilePath(project: Project): string | null {
  const rootDir = process.cwd()
  const candidates: string[] = []

  // 1. Explicit articleFile if specified in project JSON
  if (project.articleFile) {
    const safeFile = path.basename(project.articleFile)
    candidates.push(
      path.join(rootDir, 'content', 'projects', safeFile),
      path.join(rootDir, 'data', 'articles', safeFile)
    )
  }

  // 2. Slug and ID based names in standard folders
  const baseNames = [project.slug, project.id, slugify(project.title)]
  for (const name of baseNames) {
    if (!name) continue
    candidates.push(
      path.join(rootDir, 'content', 'projects', `${name}.md`),
      path.join(rootDir, 'data', 'articles', `${name}.md`)
    )
  }

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate
    }
  }

  return null
}

/**
 * Creates and configures a marked instance with portfolio-themed styling.
 */
function createCustomRenderer(): Renderer {
  const renderer = new Renderer()

  // Headings
  renderer.heading = function ({ tokens, depth }) {
    const text = this.parser.parseInline(tokens)
    const id = slugify(text)

    if (depth === 1) {
      return `
        <h1 id="${id}" class="group relative mt-14 mb-6 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          <span class="mr-3 inline-block h-6 w-1 rounded-full bg-accent align-middle"></span>
          <span>${text}</span>
        </h1>
      `
    }

    if (depth === 2) {
      return `
        <h2 id="${id}" class="group relative mt-12 mb-5 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
          <span class="mr-2.5 inline-block size-2 rounded-full bg-accent align-middle"></span>
          <span>${text}</span>
        </h2>
      `
    }

    if (depth === 3) {
      return `
        <h3 id="${id}" class="mt-8 mb-3 font-display text-xl font-bold tracking-tight text-white/95 sm:text-2xl">
          ${text}
        </h3>
      `
    }

    return `
      <h4 id="${id}" class="mt-6 mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
        ${text}
      </h4>
    `
  }

  // Images with dark frame, border and caption
  renderer.image = function ({ href, text }) {
    let resolvedHref = href
    // Normalize relative image paths without leading slash
    if (resolvedHref && !resolvedHref.startsWith('/') && !resolvedHref.startsWith('http')) {
      resolvedHref = `/projects/${resolvedHref}`
    }

    const captionHtml = text
      ? `<figcaption class="flex items-center gap-2 border-t border-white/10 bg-black/60 px-5 py-3 font-mono text-xs text-white/60 backdrop-blur-sm">
          <span class="size-1.5 rounded-full bg-accent"></span>
          <span>${text}</span>
        </figcaption>`
      : ''

    return `
      <figure class="my-10 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 shadow-2xl transition hover:border-white/20">
        <div class="relative w-full overflow-hidden">
          <img src="${resolvedHref}" alt="${text || 'Project preview'}" class="h-auto w-full max-h-[650px] object-cover transition-transform duration-500 hover:scale-[1.01]" loading="lazy" />
        </div>
        ${captionHtml}
      </figure>
    `
  }

  // Blockquotes / Annotations / Callouts
  renderer.blockquote = function ({ tokens }) {
    const body = this.parser.parse(tokens)
    return `
      <blockquote class="my-8 rounded-r-2xl border-l-4 border-accent border-y border-r border-white/5 bg-accent/[0.05] p-6 font-mono text-sm leading-relaxed text-white/80 shadow-lg backdrop-blur-sm">
        ${body}
      </blockquote>
    `
  }

  // Code blocks
  renderer.code = function ({ text, lang }) {
    const escaped = escapeHtml(text)
    return `
      <div class="my-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0e] shadow-2xl">
        <div class="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-2.5 font-mono text-xs text-white/40">
          <div class="flex items-center gap-2">
            <span class="size-2 rounded-full bg-accent/70"></span>
            <span class="font-semibold uppercase tracking-wider">${lang || 'CODE'}</span>
          </div>
          <span class="text-[10px] text-white/30">TERMINAL</span>
        </div>
        <pre class="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-white/90 sm:text-sm"><code>${escaped}</code></pre>
      </div>
    `
  }

  // Inline code
  renderer.codespan = function ({ text }) {
    return `<code class="rounded-md border border-white/10 bg-white/[0.08] px-1.5 py-0.5 font-mono text-[0.88em] font-medium text-accent">${text}</code>`
  }

  // Links
  renderer.link = function ({ href, tokens }) {
    const text = this.parser.parseInline(tokens)
    const isExternal = href.startsWith('http://') || href.startsWith('https://')
    return `<a href="${href}" ${isExternal ? 'target="_blank" rel="noopener noreferrer"' : ''} class="inline-flex items-center gap-0.5 text-accent underline decoration-accent/40 underline-offset-4 transition hover:text-white hover:decoration-white">${text}</a>`
  }

  // Paragraphs
  renderer.paragraph = function ({ tokens }) {
    const text = this.parser.parseInline(tokens)
    // If paragraph contains only a figure, do not wrap in <p>
    if (text.trim().startsWith('<figure') && text.trim().endsWith('</figure>')) {
      return text
    }
    return `<p class="my-5 font-sans text-base leading-[1.8] text-white/70 sm:text-lg">${text}</p>`
  }

  // Lists
  renderer.list = function ({ items, ordered }) {
    let body = ''
    for (const item of items) {
      body += this.listitem(item)
    }

    if (ordered) {
      return `<ol class="my-6 space-y-3 pl-6 font-sans text-base leading-relaxed text-white/70 sm:text-lg list-decimal marker:text-accent">${body}</ol>`
    }
    return `<ul class="my-6 space-y-3 pl-6 font-sans text-base leading-relaxed text-white/70 sm:text-lg list-disc marker:text-accent">${body}</ul>`
  }

  // List item
  renderer.listitem = function (item) {
    const text = this.parser.parse(item.tokens)
    return `<li class="pl-1">${text}</li>`
  }

  // Horizontal Rule
  renderer.hr = function () {
    return `<hr class="my-12 border-t border-white/10" />`
  }

  // Tables
  renderer.table = function ({ header, rows }) {
    let headerHtml = ''
    for (const cell of header) {
      headerHtml += `<th class="border-b border-white/10 bg-white/[0.03] px-4 py-3 text-left font-mono text-xs font-semibold uppercase tracking-wider text-white/60">${this.parser.parseInline(cell.tokens)}</th>`
    }

    let rowsHtml = ''
    for (const row of rows) {
      let rowCells = ''
      for (const cell of row) {
        rowCells += `<td class="border-b border-white/10 px-4 py-3 font-sans text-sm text-white/80">${this.parser.parseInline(cell.tokens)}</td>`
      }
      rowsHtml += `<tr class="transition hover:bg-white/[0.02]">${rowCells}</tr>`
    }

    return `
      <div class="my-8 overflow-x-auto rounded-xl border border-white/10">
        <table class="w-full border-collapse">
          <thead><tr>${headerHtml}</tr></thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>
    `
  }

  return renderer
}

/**
 * Loads and processes a project's markdown article.
 * Safely handles empty files, non-existent files, and custom frontmatter.
 */
export async function getProjectArticle(project: Project): Promise<ProjectArticle> {
  const filePath = findArticleFilePath(project)

  if (!filePath) {
    return {
      exists: false,
      isEmpty: true,
      rawContent: '',
      html: '',
      metadata: {},
      filePath: null,
    }
  }

  try {
    const rawFile = fs.readFileSync(/*turbopackIgnore: true*/ filePath, 'utf-8')
    const trimmed = rawFile.trim()

    // Handle completely empty file
    if (trimmed.length === 0) {
      return {
        exists: true,
        isEmpty: true,
        rawContent: '',
        html: '',
        metadata: {},
        filePath,
      }
    }

    const { data, content } = matter(rawFile)
    const trimmedContent = content.trim()

    // Handle file with only frontmatter or whitespace
    if (trimmedContent.length === 0) {
      return {
        exists: true,
        isEmpty: true,
        rawContent: '',
        html: '',
        metadata: data as ArticleMetadata,
        filePath,
      }
    }

    // Configure marked with custom renderer
    const renderer = createCustomRenderer()
    const html = await marked.parse(trimmedContent, { renderer, async: true })

    return {
      exists: true,
      isEmpty: false,
      rawContent: trimmedContent,
      html,
      metadata: data as ArticleMetadata,
      filePath,
    }
  } catch (error) {
    console.error(`Error reading article file for project ${project.id}:`, error)
    return {
      exists: true,
      isEmpty: true,
      rawContent: '',
      html: '',
      metadata: {},
      filePath,
    }
  }
}
