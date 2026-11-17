import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, ArrowRight, FileText, Sparkles } from 'lucide-react'
import { getAllProjects, getProjectBySlug, getProjectNavigation } from '@/lib/projects'
import { getProjectArticle } from '@/lib/markdown'
import ProjectGallery from './ProjectGallery'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((p) => ({
    slug: p.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return {
      title: 'Project Not Found — Naveed',
      description: 'The requested project could not be found.',
    }
  }

  const article = await getProjectArticle(project)
  const subtitle = article.metadata.subtitle || project.description

  return {
    title: `${project.title} — Case Study & Project Details | Naveed`,
    description: subtitle,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const article = await getProjectArticle(project)
  const { prevProject, nextProject } = getProjectNavigation(project.slug)
  const allProjects = getAllProjects()
  const projectIdx = allProjects.findIndex((p) => p.slug === project.slug)
  const indexFormatted = String(Math.max(1, projectIdx + 1)).padStart(2, '0')
  const liveLink = project.liveUrl || project.livePreviewUrl
  const repoLink = project.repoUrl || project.githubUrl
  const subtitle = article.metadata.subtitle || project.description

  return (
    <main className="relative min-h-screen bg-black font-sans text-white selection:bg-accent selection:text-white">
      {/* ===== Sticky Top Navigation Bar ===== */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 sm:px-10">
          {/* Logo & Back Link */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              aria-label="Naveed — home"
              className="relative block size-8 transition-transform hover:scale-105"
            >
              <span className="absolute left-0 top-0 size-6 rounded-[3px] bg-accent" />
              <span className="absolute bottom-0 right-0 size-4 rounded-[3px] bg-white/90 ring-2 ring-black" />
            </Link>

            <Link
              href="/#projects"
              className="group inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-white/60 transition hover:text-white"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1 text-accent" />
              <span>Back to portfolio</span>
            </Link>
          </div>

          {/* Project Breadcrumb / Category Tag */}
          <div className="hidden sm:flex items-center gap-3 font-mono text-xs text-white/40">
            <span className="text-accent">•</span>
            <span className="font-semibold uppercase text-white/70">
              {project.category || 'CASE STUDY'}
            </span>
            {project.year && <span>• {project.year}</span>}
          </div>
        </div>
      </header>

      {/* ===== Hero Title & Meta Header ===== */}
      <section className="relative px-6 pt-12 pb-16 sm:px-10 sm:pt-20 sm:pb-24">
        <div className="mx-auto w-full max-w-5xl">
          {/* Category Tag */}
          <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">
            <span className="mr-2.5 inline-block size-1.5 rounded-full bg-accent align-middle animate-pulse" />
            {indexFormatted} / Case Study
            {project.year && (
              <span className="ml-3 text-white/40">• {project.year}</span>
            )}
          </p>

          {/* Huge Display Title */}
          <h1 className="mt-6 font-display font-extrabold uppercase leading-[0.9] tracking-[-0.02em] text-[clamp(2.75rem,7vw,6.5rem)] text-white break-words [overflow-wrap:anywhere]">
            <span>{project.title}</span>
            <span className="ml-3 inline-block size-[0.16em] bg-accent align-baseline" />
          </h1>

          {/* Lead Subtitle / Summary */}
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/70 sm:text-xl">
            {subtitle}
          </p>

          {/* Tags Pills & Action Links */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-8">
            {/* Tech Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 font-mono text-xs text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* External Links */}
            {(liveLink || repoLink) && (
              <div className="flex flex-wrap items-center gap-3">
                {liveLink && (
                  <a
                    href={liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-accent/20 transition hover:brightness-110 active:scale-95"
                  >
                    <span>Live Preview</span>
                    <ArrowUpRight className="size-4" strokeWidth={2.5} />
                  </a>
                )}

                {repoLink && (
                  <a
                    href={repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-wider text-white/80 transition hover:border-white/40 hover:bg-white/10 hover:text-white active:scale-95"
                  >
                    <svg
                      className="size-4 fill-current"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      />
                    </svg>
                    <span>Repository</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== Main Gallery Showcase ===== */}
      {project.images && project.images.length > 0 && (
        <section className="relative px-6 pb-16 sm:px-10 sm:pb-24">
          <div className="mx-auto w-full max-w-5xl">
            <ProjectGallery images={project.images} title={project.title} />
          </div>
        </section>
      )}

      {/* ===== Article Body Section ===== */}
      <section className="relative border-t border-white/10 px-6 py-16 sm:px-10 sm:py-24">
        <div className="mx-auto w-full max-w-4xl">
          {/* Section Indicator */}
          <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
              <FileText className="size-4" />
              <span>Project Article & Breakdown</span>
            </div>
            {article.filePath && (
              <span className="font-mono text-[11px] text-white/40">
                content/projects/{project.slug}.md
              </span>
            )}
          </div>

          {/* Render Markdown Content if file exists and is not empty */}
          {!article.isEmpty && (
            <article
              className="article-body selection:bg-accent selection:text-white"
              dangerouslySetInnerHTML={{ __html: article.html }}
            />
          )}

          {/* Fallback structured overview if markdown file is empty */}
          {article.isEmpty && (
            <div className="space-y-10">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 sm:p-10">
                <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-white">
                  Overview
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
                  {project.description}
                </p>

                {project.tags && project.tags.length > 0 && (
                  <div className="mt-8 border-t border-white/10 pt-6">
                    <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                      Tech Stack & Ecosystem
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-white/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Informative Editor Card */}
              <div className="rounded-2xl border border-accent/30 bg-accent/[0.04] p-8 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-accent">
                  <Sparkles className="size-5" />
                  <h3 className="font-mono text-sm font-bold uppercase tracking-wider">
                    Article Ready for Content
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  You can add an in-depth article for this project by creating or writing in{' '}
                  <code className="rounded bg-white/10 px-2 py-0.5 font-mono text-xs text-accent">
                    content/projects/{project.slug}.md
                  </code>
                  .
                </p>
                <div className="mt-4 space-y-1 font-mono text-xs text-white/50">
                  <p>✓ Supports Markdown headings, lists, and code blocks</p>
                  <p>✓ Supports Markdown annotations and callouts with <code className="text-white/70">&gt; Note:</code></p>
                  <p>✓ Supports embedded images with <code className="text-white/70">![Alt text](/projects/...)</code></p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== Bottom Navigation: Prev / Next Projects ===== */}
      <section className="relative border-t border-white/10 px-6 py-20 sm:px-10 sm:py-28 bg-zinc-950/60">
        <div className="mx-auto w-full max-w-5xl">
          <div className="flex items-center justify-between mb-8">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-white/40">
              Browse More Projects
            </p>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-accent hover:underline"
            >
              <span>View all projects</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {prevProject && (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-accent/50 hover:bg-white/[0.06]"
              >
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-white/40">
                    <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1 text-accent" />
                    <span>Previous Project</span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-bold uppercase text-white transition group-hover:text-accent">
                    {prevProject.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-white/50">
                    {prevProject.description}
                  </p>
                </div>
                {prevProject.images[0] && (
                  <div className="relative mt-4 h-28 w-full overflow-hidden rounded-xl border border-white/10">
                    <Image
                      src={prevProject.images[0]}
                      alt={prevProject.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 400px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
              </Link>
            )}

            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-accent/50 hover:bg-white/[0.06]"
              >
                <div>
                  <div className="flex items-center justify-end gap-2 font-mono text-xs text-white/40">
                    <span>Next Project</span>
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1 text-accent" />
                  </div>
                  <h3 className="mt-3 text-right font-display text-2xl font-bold uppercase text-white transition group-hover:text-accent">
                    {nextProject.title}
                  </h3>
                  <p className="mt-1 text-right line-clamp-2 text-sm text-white/50">
                    {nextProject.description}
                  </p>
                </div>
                {nextProject.images[0] && (
                  <div className="relative mt-4 h-28 w-full overflow-hidden rounded-xl border border-white/10">
                    <Image
                      src={nextProject.images[0]}
                      alt={nextProject.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 400px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
