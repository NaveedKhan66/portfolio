import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import ProjectsSection from './components/ProjectsSection'
import projectsRaw from '@/data/projects.json'
import { getValidProjects } from '@/lib/projects'

export default function Home() {
  const validProjects = getValidProjects(projectsRaw)

  return (
    <main className="relative isolate overflow-hidden bg-black font-sans text-white">
      {/* ===== Hero ===== */}
      <section className="relative flex min-h-svh flex-col">
        <div className="pointer-events-none absolute left-1/2 top-[12.7vh] -z-10 h-[74.5vh] w-full max-w-[1140px] -translate-x-1/2 scale-[0.8]">
          <Image
            src="/naveed.jpg"
            alt="Portrait of Naveed"
            fill
            priority
            sizes="1140px"
            className="object-contain object-[50%_50%] opacity-95 [filter:grayscale(1)_contrast(1.05)] [mask-image:radial-gradient(85%_90%_at_50%_50%,#000_60%,transparent_100%)]"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(75%_75%_at_50%_45%,transparent_45%,#000_95%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[125px] bg-gradient-to-t from-black/20 to-transparent" />

        <header className="relative z-10 flex items-start justify-between p-10">
          <Link
            href="/"
            aria-label="Naveed — home"
            className="relative block size-[33px]"
          >
            <span className="absolute left-0 top-0 size-[26px] rounded-[3px] bg-accent" />
            <span className="absolute bottom-0 right-0 size-[18px] rounded-[3px] bg-white/90 ring-[3px] ring-black" />
          </Link>
          <div className="text-right">
            <p className="text-sm font-bold leading-[1.3] text-white/90">
              Based in Lahore, Pakistan
            </p>
            <p className="mt-0.5 font-mono text-xs font-medium leading-[1.3] text-white/40">
              20:08 GMT+5 • LHE
            </p>
          </div>
        </header>

        <div className="relative z-10 flex flex-1 items-center justify-center px-6">
          <div className="w-fit translate-y-[8.7vh]">
            <h1 className="w-fit text-left font-display font-extrabold tracking-[-0.01em]">
              <span className="block bg-[linear-gradient(180deg,#e5e5e5_0%,#505050_100%)] bg-clip-text text-[clamp(3.25rem,11.1vw,10rem)] leading-[0.9] text-transparent">
                Hi there
              </span>
              <span className="block w-fit text-[clamp(3.25rem,11.1vw,10rem)] leading-[0.9] text-[#e5e5e5]">
                I am Naveed
                <span className="ml-[0.12em] inline-block size-[0.18em] bg-accent" />
              </span>
            </h1>

            <div className="mt-[5.15vw] text-left text-[clamp(1.125rem,1.53vw,1.375rem)] leading-[1.27]">
              <p className="text-white/40">
                Building stuff since <span className="text-white/90">2021</span>
              </p>
              <p className="mt-1 text-white/40">
                <span className="text-white/90">Senior Software Engineer</span> at{' '}
                <a
                  href="https://tintash.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
                >
                  Tintash
                  <ArrowUpRight
                    className="ml-1 inline-block size-4 -translate-y-px"
                    strokeWidth={2.5}
                  />
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="absolute left-[61%] top-[17%] z-20 hidden animate-pill-float sm:block">
          <div className="relative rounded-[4px] bg-accent px-2.5 py-1.5 text-[13px] font-bold text-white shadow-lg shadow-accent/20">
            Naveed
            <span className="absolute -bottom-[3px] left-2.5 size-2 rotate-45 rounded-[2px] bg-accent" />
          </div>
        </div>
      </section>

      {/* ===== About ===== */}
      <section className="relative border-t border-white/10 px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto w-full max-w-5xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">
            <span className="mr-2.5 inline-block size-1.5 rounded-full bg-accent align-middle" />
            01 / About me
          </p>

          <h2 className="mt-8 font-display font-extrabold leading-[0.95] tracking-[-0.01em]">
            <span className="block bg-[linear-gradient(180deg,#e5e5e5_0%,#505050_100%)] bg-clip-text text-[clamp(2.5rem,7vw,5rem)] text-transparent">
              A little about me
            </span>
          </h2>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-2xl border-l-2 border-accent/60 pl-6 text-[clamp(1.125rem,1.5vw,1.375rem)] leading-[1.6] text-white/50">
              <p>
                <span className="font-bold text-white/90">Hi, I&apos;m Naveed</span> — a
                senior software engineer based in Lahore who loves turning fuzzy
                ideas into fast, elegant products. I spend most of my days
                designing systems, writing code, and obsessing over the details
                that make software feel effortless.
              </p>
              <p className="mt-6">
                These days I&apos;m mostly tinkering with AI — agent orchestrations,
                harnesses, and wiring up cool stuff across different projects. I
                love breaking new things and putting them back together better,
                and when I&apos;m not doing that, I&apos;m probably gaming.
              </p>
            </div>

            <div className="flex flex-col gap-3 font-mono text-sm font-medium text-white/40 lg:text-right">
              <p>Shipping since 2022</p>
              <p>Senior Software Engineer</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Projects ===== */}
      <ProjectsSection projects={validProjects} />
    </main>
  )
}
