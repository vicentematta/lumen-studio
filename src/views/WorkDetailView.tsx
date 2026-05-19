'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Maximize2 } from 'lucide-react'
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
const HISTORY_KEY = 'rh_work_history' // últimos 2 slugs realmente visitados

function useSuggestions(currentSlug: string, allProjects: ProjectListItem[]) {
  const [suggestions, setSuggestions] = useState<ProjectListItem[]>([])
  const projectsRef = useRef(allProjects)
  projectsRef.current = allProjects

  useEffect(() => {
    const all = projectsRef.current
    const others = all.filter((p) => p.slug !== currentSlug)
    if (others.length === 0) return

    // Historial de navegación real — nunca sugerir los últimos 2 visitados
    let history: string[]
    try {
      history = JSON.parse(localStorage.getItem(HISTORY_KEY) ?? '[]')
      if (!Array.isArray(history)) history = []
    } catch { history = [] }
    history = [currentSlug, ...history.filter((s) => s !== currentSlug)].slice(0, 2)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
    const neverSuggest = new Set(history)

    // Lista de vistos (visitados + mostrados como sugerencia)
    let seen: string[]
    try {
      seen = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
      if (!Array.isArray(seen)) seen = []
    } catch { seen = [] }
    if (!seen.includes(currentSlug)) seen = [...seen, currentSlug]

    const seenSet = new Set(seen)
    const fresh = others.filter(
      (p) => !seenSet.has(p.slug ?? '') && !neverSuggest.has(p.slug ?? ''),
    )

    let next: ProjectListItem[]
    if (fresh.length >= 2) {
      next = fresh.slice(0, 2)
    } else {
      // Reset del seen — pero los últimos 2 visitados siguen excluidos siempre
      seen = [currentSlug]
      const resetPool = others.filter((p) => !neverSuggest.has(p.slug ?? ''))
      next = resetPool.slice(0, 2)
    }

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
    case 'imageBlock':
      return <ImageBlock block={block} />
    case 'videoBlock':
      return <VideoBlock block={block} />
    case 'videoRowBlock':
      return <VideoRowBlock block={block} />
    case 'mediaColumnsBlock':
      return <MediaColumnsBlock block={block} />
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

function ImageBlock({ block }: BlockProps) {
  if (!block.image?.url) return null
  const contained = block.layout === 'contained'
  return (
    <section className="px-6 pb-24 md:pb-32">
      <Container width="lg">
        <img
          src={block.image.url}
          alt={block.image.alt ?? ''}
          loading="lazy"
          className={`w-full object-cover ${block.layout === 'contained' ? 'rounded-2xl' : ''}`}
        />
        {block.image.caption ? (
          <p className="mt-3 text-xs text-white/30">{block.image.caption}</p>
        ) : null}
      </Container>
    </section>
  )
}

function VideoWithUnmute({ src, poster, rounded }: { src: string; poster?: string; rounded?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  function toggleMute() {
    if (!videoRef.current) return
    const next = !muted
    videoRef.current.muted = next
    setMuted(next)
  }

  return (
    <div className="relative">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        style={{ maxHeight: '80vh', maxWidth: '100%' }}
        className={`h-auto w-auto ${rounded ? 'rounded-2xl' : ''}`}
      />
      <button
        onClick={() => videoRef.current?.requestFullscreen().catch(() => {})}
        aria-label="Pantalla completa"
        className="absolute right-4 top-4 liquid-glass flex h-9 w-9 items-center justify-center rounded-full text-white transition-opacity hover:opacity-80"
      >
        <Maximize2 className="h-4 w-4" />
      </button>
      <button
        onClick={toggleMute}
        aria-label={muted ? 'Activar audio' : 'Silenciar'}
        className="absolute bottom-4 right-4 liquid-glass flex items-center rounded-full px-3 py-1.5 text-white transition-opacity hover:opacity-80"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.15em]">
          {muted ? 'Sound Off' : 'Sound On'}
        </span>
      </button>
    </div>
  )
}

function VideoBlock({ block }: BlockProps) {
  if (!block.url) return null
  const contained = block.layout === 'contained'
  return (
    <section className="px-6 pb-24 md:pb-32">
      <Container width={contained ? 'md' : 'lg'}>
        <div className="flex justify-center">
          <VideoWithUnmute
            src={block.url}
            poster={block.posterUrl ?? block.poster?.url ?? undefined}
            rounded={contained}
          />
        </div>
      </Container>
    </section>
  )
}

function RightColumnVideo({ src, alt }: { src: string; alt?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  function toggleMute() {
    if (!videoRef.current) return
    const next = !muted
    videoRef.current.muted = next
    setMuted(next)
  }

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <video
        ref={videoRef}
        src={src}
        aria-label={alt || undefined}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="h-auto w-full"
      />
      <button
        onClick={() => videoRef.current?.requestFullscreen().catch(() => {})}
        aria-label="Pantalla completa"
        className="absolute right-3 top-3 liquid-glass flex h-8 w-8 items-center justify-center rounded-full text-white transition-opacity hover:opacity-80"
      >
        <Maximize2 className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={toggleMute}
        aria-label={muted ? 'Activar audio' : 'Silenciar'}
        className="absolute bottom-3 right-3 liquid-glass flex items-center rounded-full px-3 py-1.5 text-white transition-opacity hover:opacity-80"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.15em]">
          {muted ? 'Sound Off' : 'Sound On'}
        </span>
      </button>
    </div>
  )
}

function MediaColumnsBlock({ block }: BlockProps) {
  const leftUrl = block.leftImageUrl ?? block.colImage?.url
  const leftAlt = block.leftImageAlt ?? block.colImage?.alt ?? ''
  const items = block.rightItems ?? []
  const legacyUrls = [block.url1, block.url2].filter((u): u is string => Boolean(u))

  return (
    <section className="px-6 pb-24 md:pb-32">
      <Container width="lg">
        <div className={`grid gap-6 ${leftUrl ? 'grid-cols-[1fr_2fr]' : 'grid-cols-1'}`}>
          {/* Columna izquierda — imagen a altura natural */}
          {leftUrl ? (
            <div className="overflow-hidden rounded-2xl">
              <img
                src={leftUrl}
                alt={leftAlt}
                className="h-auto w-full"
                loading="lazy"
              />
            </div>
          ) : null}

          {/* Columna derecha — items flexibles, se estiran hasta el final */}
          <div className="flex h-full flex-col gap-6">
            {items.length > 0
              ? items.map((item) => {
                  if (item._type === 'videoItem' && item.url) {
                    return <RightColumnVideo key={item._key} src={item.url} alt={item.alt ?? ''} />
                  }
                  if (item._type === 'imageItem' && item.url) {
                    const w = item.widthPct && item.widthPct < 100 ? `${item.widthPct}%` : undefined
                    return (
                      <div
                        key={item._key}
                        style={w ? { width: w } : undefined}
                        className={`overflow-hidden rounded-2xl${w ? ' mx-auto' : ''}`}
                      >
                        <img
                          src={item.url}
                          alt={item.alt ?? ''}
                          className="w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )
                  }
                  if (item._type === 'spacerItem') {
                    return <div key={item._key} aria-hidden="true" style={{ flexGrow: 1 }} />
                  }
                  return null
                })
              : legacyUrls.map((url, i) => (
                  <RightColumnVideo key={i} src={url} />
                ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function VideoRowBlock({ block }: BlockProps) {
  const urls = [block.url1, block.url2, block.url3].filter(Boolean) as string[]
  if (urls.length === 0) return null
  const cols = urls.length === 1 ? 'grid-cols-1' : urls.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
  return (
    <section className="px-6 pb-24 md:pb-32">
      <Container width="lg">
        <div className={`grid ${cols} gap-4`}>
          {urls.map((url, i) => (
            <VideoWithUnmute key={i} src={url} rounded />
          ))}
        </div>
      </Container>
    </section>
  )
}

// ─── Nav card ─────────────────────────────────────────────────────────────────

interface NavCardProps {
  project: ProjectListItem
}

function ProjectNavCard({ project }: NavCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const startTimeRef = useRef(0)

  function onEnter() {
    const v = videoRef.current
    if (!v || !project.heroVideoUrl) return
    const startPlay = () => {
      const t = project.slug === 'undurraga-wines' ? 5 : (v.duration && isFinite(v.duration) ? v.duration / 2 : 0)
      startTimeRef.current = t
      v.currentTime = t
      v.play().catch(() => {})
    }
    if (v.readyState >= 1) startPlay()
    else v.addEventListener('loadedmetadata', startPlay, { once: true })
  }

  function onLeave() {
    videoRef.current?.pause()
  }

  return (
    <div onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <Link href={`/work/${project.slug}`} className="group block">
        <GlassCard rounded="3xl" className="relative overflow-hidden">
          {project.heroVideoUrl ? (
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ clipPath: 'inset(0 round 1.5rem)' }}
            >
              <video
                ref={videoRef}
                src={project.heroVideoUrl}
                muted
                playsInline
                preload="metadata"
                onTimeUpdate={(e) => {
                  const v = e.currentTarget
                  if (v.currentTime >= startTimeRef.current + 8) v.currentTime = startTimeRef.current
                }}
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                  transform: 'scale(1.3)',
                  transformOrigin: 'center center',
                  opacity: 0.27,
                  filter: 'contrast(1.15) brightness(0.82) saturate(0.72) sepia(0.12)',
                }}
              />
              <div
                className="film-grain pointer-events-none absolute inset-[-20%] h-[140%] w-[140%]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
                  backgroundSize: '180px 180px',
                  opacity: 0.09,
                  mixBlendMode: 'overlay',
                }}
              />
            </div>
          ) : null}
          <div className="relative z-10 flex items-center justify-between gap-4 px-6 py-8 md:px-8 md:py-10">
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
                <p className="mt-1 font-body text-body italic text-white/60">
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
    </div>
  )
}
