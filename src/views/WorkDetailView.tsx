'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlassButton } from '@/components/ui/GlassButton'
import {
  fadeRise,
  fadeRiseSmall,
  blurIn,
  inViewProps,
  stagger,
} from '@/lib/motion'
import type { ProjectBlock, ProjectDoc, ProjectListItem } from '@/lib/queries/projects'

const STORAGE_KEY = 'rh_seen_work'

function useSuggestions(currentSlug: string, allProjects: ProjectListItem[]) {
  const [suggestions, setSuggestions] = useState<ProjectListItem[]>([])
  const projectsRef = useRef(allProjects)
  projectsRef.current = allProjects

  useEffect(() => {
    const all = projectsRef.current
    const others = all.filter((p) => p.slug !== currentSlug)
    if (others.length === 0) return

    // "Seen" = visitado O mostrado como sugerencia. Una vez visto, no vuelve.
    let seen: string[]
    try {
      seen = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
      if (!Array.isArray(seen)) seen = []
    } catch {
      seen = []
    }

    // Marcar página actual como vista
    if (!seen.includes(currentSlug)) seen = [...seen, currentSlug]

    // Proyectos que el visitante aún no ha visto ni le hemos sugerido
    const seenSet = new Set(seen)
    const fresh = others.filter((p) => !seenSet.has(p.slug ?? ''))

    let next: ProjectListItem[]
    if (fresh.length >= 2) {
      next = fresh.slice(0, 2)
    } else {
      // Quedan 0 o 1 — reset y vuelve desde cero para siempre mostrar 2
      seen = [currentSlug]
      next = others.slice(0, 2)
    }

    // Marcar los que vamos a mostrar como "vistos" ya en este momento
    next.forEach((p) => { if (p.slug && !seen.includes(p.slug)) seen = [...seen, p.slug] })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seen))

    setSuggestions(next)
  }, [currentSlug])

  return suggestions
}

interface Props {
  project: ProjectDoc
  allProjects: ProjectListItem[]
}

export function WorkDetailView({ project, allProjects }: Props) {
  const suggestions = useSuggestions(project.slug ?? '', allProjects)
  return (
    <>
      {/* Hero — text-only (schema sin imagen/video) */}
      <section className="relative w-full overflow-hidden bg-black pb-20 pt-32 md:pb-28 md:pt-44">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
        <div className="relative z-10 px-6">
          <Container width="lg">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="mb-6 flex flex-wrap items-center gap-3"
            >
              {project.category ? (
                <span className="text-eyebrow uppercase text-white/40">
                  {project.category}
                </span>
              ) : null}
              {project.year ? (
                <>
                  <span className="text-white/20">·</span>
                  <span className="text-eyebrow uppercase tabular-nums text-white/30">
                    {project.year}
                  </span>
                </>
              ) : null}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-body text-h1 font-normal uppercase !tracking-[0.05em] text-white md:text-display-md"
            >
              {project.client}
            </motion.p>

            {project.title ? (
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-3 font-display text-h2 italic text-white/70 md:text-h1"
              >
                {project.title}
              </motion.h1>
            ) : null}

            {project.subtitle ? (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 max-w-2xl text-body text-white/60"
              >
                {project.subtitle}
              </motion.p>
            ) : null}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <GlassButton to="/contact" variant="solid" size="lg">
                Agenda diagnóstico
              </GlassButton>
              <GlassButton to="/work" variant="glass" size="lg">
                Ver proyectos
              </GlassButton>
            </motion.div>
          </Container>
        </div>
      </section>

      {/* Meta row */}
      {(project.role || project.duration || project.meta?.length) ? (
        <section className="px-6 py-16 md:py-20">
          <Container width="lg">
            <motion.div
              variants={stagger}
              {...inViewProps}
              className="flex flex-wrap gap-x-12 gap-y-6"
            >
              {project.role ? (
                <motion.div variants={fadeRiseSmall}>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">Rol</p>
                  <p className="mt-1 text-body text-white">{project.role}</p>
                </motion.div>
              ) : null}
              {project.duration ? (
                <motion.div variants={fadeRiseSmall}>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">Duración</p>
                  <p className="mt-1 text-body text-white">{project.duration}</p>
                </motion.div>
              ) : null}
              {project.meta?.map((m, i) =>
                m.label && m.value ? (
                  <motion.div key={i} variants={fadeRiseSmall}>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                      {m.label}
                    </p>
                    <p className="mt-1 text-body text-white">{m.value}</p>
                  </motion.div>
                ) : null,
              )}
            </motion.div>
          </Container>
        </section>
      ) : null}

      {/* Overview */}
      {project.overview ? (
        <section className="px-6 pb-24 md:pb-32">
          <Container width="lg">
            <motion.div
              variants={stagger}
              {...inViewProps}
              className="grid grid-cols-1 gap-10 md:grid-cols-12"
            >
              <motion.div variants={fadeRiseSmall} className="md:col-span-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Resumen
                </p>
              </motion.div>
              <motion.div variants={fadeRise} className="md:col-span-8">
                <p className="text-lead text-white/80 md:text-h4">
                  {project.overview}
                </p>
              </motion.div>
            </motion.div>
          </Container>
        </section>
      ) : null}

      {/* Content blocks */}
      {project.blocks?.map((block) => (
        <BlockRenderer key={block._key} block={block} />
      ))}

      {/* Suggested projects */}
      {suggestions.length > 0 ? (
        <section className="px-6 pb-24 md:pb-32">
          <Container width="lg">
            <motion.div variants={stagger} {...inViewProps} className="mb-10">
              <motion.p
                variants={fadeRiseSmall}
                className="text-xs uppercase tracking-[0.2em] text-white/40"
              >
                Otros proyectos
              </motion.p>
            </motion.div>
            <motion.div
              variants={stagger}
              {...inViewProps}
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              {suggestions.map((p) => (
                <motion.div key={p._id} variants={fadeRise}>
                  <ProjectNavCard project={p} />
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>
      ) : null}
    </>
  )
}

// ─── Block renderer ───────────────────────────────────────────────────────────

interface BlockProps {
  block: ProjectBlock
}

function BlockRenderer({ block }: BlockProps) {
  switch (block._type) {
    case 'textBlock':
      return <TextBlock block={block} />
    case 'quoteBlock':
      return <QuoteBlock block={block} />
    case 'statsBlock':
      return <StatsBlock block={block} />
    default:
      return null
  }
}

function TextBlock({ block }: BlockProps) {
  return (
    <section className="px-6 pb-24 md:pb-32">
      <Container width="lg">
        <motion.div variants={stagger} {...inViewProps}>
          {block.eyebrow ? (
            <motion.p
              variants={fadeRiseSmall}
              className="text-xs uppercase tracking-[0.2em] text-white/40"
            >
              {block.eyebrow}
            </motion.p>
          ) : null}
          {block.title ? (
            <motion.h2
              variants={fadeRise}
              className="mt-4 font-display text-3xl italic leading-tight tracking-tight text-white md:text-5xl"
            >
              {block.title}
            </motion.h2>
          ) : null}
          {block.body ? (
            <motion.p
              variants={fadeRise}
              className="mt-6 max-w-3xl text-body text-white/70"
            >
              {block.body}
            </motion.p>
          ) : null}
        </motion.div>
      </Container>
    </section>
  )
}

function QuoteBlock({ block }: BlockProps) {
  return (
    <section className="px-6 pb-24 md:pb-32">
      <Container width="md">
        <motion.div variants={stagger} {...inViewProps}>
          <GlassCard rounded="2xl" className="p-10 md:p-14">
            {block.body ? (
              <motion.blockquote
                variants={blurIn}
                className="font-display text-2xl italic leading-relaxed text-white md:text-3xl"
              >
                "{block.body}"
              </motion.blockquote>
            ) : null}
            {block.attribution ? (
              <motion.p
                variants={fadeRiseSmall}
                className="mt-6 text-eyebrow uppercase text-white/40"
              >
                — {block.attribution}
              </motion.p>
            ) : null}
          </GlassCard>
        </motion.div>
      </Container>
    </section>
  )
}

function StatsBlock({ block }: BlockProps) {
  if (!block.items?.length) return null
  const N = block.items.length
  const colsClass =
    N === 4
      ? 'grid-cols-2 lg:grid-cols-4'
      : N === 3
        ? 'grid-cols-1 sm:grid-cols-3'
        : 'grid-cols-2 md:grid-cols-3'
  return (
    <section className="px-6 pb-24 md:pb-32">
      <Container width="lg">
        <motion.div
          variants={stagger}
          {...inViewProps}
          className={`grid ${colsClass} gap-px overflow-hidden rounded-3xl bg-white/5`}
        >
          {block.items.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeRiseSmall}
              className="bg-black/40 p-8 md:p-10"
            >
              {item.value ? (
                <p className="tabular-nums font-display text-h1 text-white">
                  {item.value}
                </p>
              ) : null}
              {item.label ? (
                <p className="mt-2 text-eyebrow uppercase text-white/40">
                  {item.label}
                </p>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

// ─── Nav card ─────────────────────────────────────────────────────────────────

interface NavCardProps {
  project: ProjectListItem
}

function ProjectNavCard({ project }: NavCardProps) {
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <GlassCard rounded="3xl" className="overflow-hidden">
        <div className="flex items-center justify-between gap-4 px-6 py-8 md:px-8 md:py-10">
          <div className="min-w-0">
            {project.category ? (
              <p className="text-[11px] uppercase tracking-[0.15em] text-white/30">
                {project.category}
              </p>
            ) : null}
            <p className="mt-3 font-body text-h4 font-normal uppercase !tracking-[0.05em] text-white">
              {project.client}
            </p>
            {project.title ? (
              <p className="mt-1 font-display text-body italic text-white/60">
                {project.title}
              </p>
            ) : null}
          </div>
          <span className="liquid-glass flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:rotate-45 md:h-11 md:w-11">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </GlassCard>
    </Link>
  )
}
