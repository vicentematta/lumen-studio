'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { PageHero } from '@/components/PageHero'
import { Container } from '@/components/ui/Container'
import { GlassCard } from '@/components/ui/GlassCard'
import { fadeRise, inViewProps, stagger } from '@/lib/motion'
import type { ProjectListItem } from '@/lib/queries/projects'

interface Props {
  projects: ProjectListItem[]
}

function ProjectCard({ p }: { p: ProjectListItem }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const startTimeRef = useRef(0)

  function onEnter() {
    if (overlayRef.current) overlayRef.current.style.opacity = '1'
    const v = videoRef.current
    if (!v || !p.heroVideoUrl) return
    const startPlay = () => {
      const t = p.slug === 'undurraga-wines' ? 7 : (v.duration && isFinite(v.duration) ? v.duration / 2 : 0)
      startTimeRef.current = t
      v.currentTime = t
      v.play().catch(() => {})
    }
    if (v.readyState >= 1) startPlay()
    else v.addEventListener('loadedmetadata', startPlay, { once: true })
  }

  function onLeave() {
    if (overlayRef.current) overlayRef.current.style.opacity = '0'
    videoRef.current?.pause()
  }

  return (
    <motion.div variants={fadeRise} className="group" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <Link href={`/work/${p.slug}`} className="block h-full">
        <GlassCard rounded="3xl" className="relative flex h-full flex-col overflow-hidden">

          {/* Video — film filter + grain overlay */}
          {p.heroVideoUrl ? (
            <div
              ref={overlayRef}
              className="absolute inset-0 transition-opacity duration-500"
              style={{ clipPath: 'inset(0 round 1.5rem)', opacity: 0 }}
            >
              {/* Video con color grade cinemático */}
              <video
                ref={videoRef}
                muted
                playsInline
                src={p.heroVideoUrl ?? undefined}
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
              {/* Capa de grano — film texture animada */}
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

          {/* Contenido encima del video */}
          <div className="relative z-10 flex flex-1 items-start justify-between gap-4 p-7 md:p-9">
            <div className="min-w-0">
              {p.category ? (
                <span className="text-eyebrow uppercase text-white/40">
                  {p.category}
                </span>
              ) : null}
              <p className="mt-3 font-body text-h4 font-normal uppercase !tracking-[0.05em] text-white">
                {p.client}
              </p>
              {p.title ? (
                <p className="mt-1 font-display text-h3 italic text-white/70">
                  {p.title}
                </p>
              ) : null}
            </div>
            <span className="liquid-glass flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:rotate-45 md:h-11 md:w-11">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>

          {p.year ? (
            <div className="relative z-10 border-t border-white/5 px-7 py-4 md:px-9">
              <span className="text-[11px] uppercase tracking-[0.15em] tabular-nums text-white/30">
                {p.year}
              </span>
            </div>
          ) : null}

        </GlassCard>
      </Link>
    </motion.div>
  )
}

export function WorkView({ projects }: Props) {
  return (
    <>
      <PageHero
        eyebrow="Trabajo"
        title={
          <>
            Problemas reales,{' '}
            <em className="italic text-white/60">resultados concretos</em>.
          </>
        }
        subtitle="Cada proyecto parte de un diagnóstico. Cada resultado se mide contra el problema original."
      />

      <section className="px-6 pb-32 md:pb-44">
        <Container width="lg">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
          >
            {projects.map((p) => {
              if (!p.slug) return null
              return <ProjectCard key={p._id} p={p} />
            })}
          </motion.div>
        </Container>
      </section>
    </>
  )
}
