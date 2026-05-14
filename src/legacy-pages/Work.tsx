import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '@/components/PageHero'
import { Container } from '@/components/ui/Container'
import { GlassCard } from '@/components/ui/GlassCard'
import { fadeRise, inViewProps, stagger } from '@/lib/motion'
import { PROJECTS, loc } from '@/data/projects'
import { Seo } from '@/components/Seo'
import { stegaClean } from '@sanity/client/stega'
import { useProjects } from '@/hooks/useProjects'
import { VIDEOS } from '@/lib/media'

export default function Work() {
  const { projects: sanityProjects } = useProjects()
  const useSanity = sanityProjects.length > 0
  const lang = 'es'

  const items = useSanity
    ? sanityProjects.map(p => ({
        slug: p.slug.current,
        client: p.client,
        year: p.year,
        title: stegaClean(p.title?.es) || stegaClean(p.title?.en) || p.client,
        category: stegaClean(p.category?.es) || stegaClean(p.category?.en) || '',
        videoSrc: VIDEOS.heroLoop.mp4,
      }))
    : PROJECTS.map(p => ({
        slug: p.slug,
        client: p.client,
        year: p.year,
        title: loc(p.title, lang),
        category: loc(p.category, lang),
        videoSrc: p.hero?.mp4 ?? '',
      }))

  return (
    <>
      <Seo title="Trabajos" description="Casos reales: del entorno físico al ángulo comunicacional, del track record consolidado al refresh competitivo." url="/work" />
      <PageHero
        eyebrow="Trabajos"
        title={<>Diseño con foco en el <em className="italic text-white/60">negocio</em>.</>}
        subtitle="Cada caso parte del mismo lugar: el diagnóstico comercial. Lo que viene a continuación no es portafolio de diseño; es evidencia de cómo la posición competitiva se materializó en piezas concretas — digitales y físicas."
      />
      <section className="px-6 pb-32 md:pb-44">
        <Container width="lg">
          <motion.div variants={stagger} {...inViewProps} className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {items.map((p, idx) => (
              <motion.div
                key={p.slug}
                variants={fadeRise}
                initial="hidden"
                animate="show"
                transition={{ delay: 0.05 + idx * 0.12, duration: 0.8 }}
              >
                <Link to={`/work/${p.slug}`} className="group block">
                  <GlassCard rounded="3xl" className="overflow-hidden">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <video src={p.videoSrc} muted autoPlay loop playsInline preload="metadata"
                        className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 md:p-8">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-white/60">{p.client} · {p.year}</p>
                          <h3 className="mt-2 max-w-md font-display text-2xl leading-snug tracking-tight text-white md:text-3xl">{p.title}</h3>
                        </div>
                        <span className="liquid-glass flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:rotate-45">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-5 text-xs uppercase tracking-[0.2em] text-white/40">
                      <span>{p.category}</span>
                      <span>Case study →</span>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>
    </>
  )
}
