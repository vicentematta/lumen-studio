import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlassButton } from '@/components/ui/GlassButton'
import { VideoBackground } from '@/components/ui/VideoBackground'
import { fadeRise, fadeRiseSmall, blurIn, inViewProps, stagger } from '@/lib/motion'
import { adjacentServices, findService, type Service } from '@/data/services'
import NotFound from '@/pages/NotFound'
import { Seo } from '@/components/Seo'
import { useService, useServices } from '@/hooks/useServices'
import { stegaClean } from '@sanity/client/stega'
import { VIDEOS } from '@/lib/media'

interface NavCardProps {
  service: Service
  direction: 'prev' | 'next'
}

function ServiceNavCard({ service, direction }: NavCardProps) {
  const isNext = direction === 'next'
  return (
    <Link to={`/services/${service.slug}`} className="group block">
      <GlassCard rounded="3xl" className="overflow-hidden">
        <div className="relative aspect-[16/9] overflow-hidden">
          <video
            src={service.hero.mp4}
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
              {isNext ? 'Siguiente' : 'Anterior'}
            </p>
            <p className="mt-1 font-display text-base tracking-tight text-white">
              {service.name}
            </p>
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:rotate-45">
            {isNext ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
          </span>
        </div>
      </GlassCard>
    </Link>
  )
}

function adaptSanityService(s: any): Service {
  const mp4 = stegaClean(s?.videoUrl) || VIDEOS.serviceStrategy.mp4
  return {
    slug: s.slug?.current ?? s.slug,
    name: stegaClean(s.name) ?? s.name,
    eyebrow: stegaClean(s.eyebrow) ?? s.eyebrow,
    short: stegaClean(s.short) ?? s.short,
    summary: stegaClean(s.summary) ?? s.summary,
    hero: { mp4 },
    process: (s.process ?? []).map((p: any) => ({
      step: p.step,
      title: stegaClean(p.title) ?? p.title,
      body: stegaClean(p.body) ?? p.body,
    })),
    deliverables: (s.deliverables ?? []).map((d: any) => stegaClean(d) ?? d),
    seo: { description: stegaClean(s.seoDescription) ?? s.seoDescription },
  } as Service
}

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { service: sanityService, loading } = useService(slug)
  const { services: sanityServices } = useServices()

  // Prefer Sanity, fall back to static data (e.g. legacy slugs).
  let service: Service | null = null
  let prev: Service | null = null
  let next: Service | null = null

  if (sanityService) {
    service = adaptSanityService(sanityService)
    const arr = sanityServices ?? []
    const idx = arr.findIndex((s) => s.slug?.current === sanityService.slug?.current)
    if (arr.length >= 2 && idx !== -1) {
      prev = adaptSanityService(arr[(idx - 1 + arr.length) % arr.length])
      next = adaptSanityService(arr[(idx + 1) % arr.length])
    } else {
      prev = service
      next = service
    }
  } else if (!loading) {
    const staticService = findService(slug)
    if (staticService) {
      service = staticService
      const adj = adjacentServices(staticService.slug)
      prev = adj.prev
      next = adj.next
    }
  }

  if (loading && !service) return null
  if (!service || !prev || !next) return <NotFound />

  return (
    <>
      <Seo
        title={service.name}
        description={service.seo?.description ?? service.summary}
        image={service.seo?.ogImage}
        url={`/services/${service.slug}`}
      />
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[560px] w-full overflow-hidden">
        <VideoBackground
          video={service.hero}
          eager
          overlayClassName="bg-gradient-to-b from-black/40 via-black/20 to-black"
        />
        <div className="relative z-10 flex h-full items-end px-6 pb-16 md:pb-24">
          <Container width="lg">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xs uppercase tracking-[0.2em] text-white/60"
            >
              {service.eyebrow}
            </motion.p>
            <motion.h1
              variants={blurIn}
              initial="hidden"
              animate="show"
              className="mt-6 max-w-4xl font-display text-4xl leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl"
            >
              {service.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg"
            >
              {service.short}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <GlassButton to="/contact" variant="solid" size="lg">
                Agenda diagnóstico
              </GlassButton>
              <GlassButton to="/services" variant="glass" size="lg">
                Ver servicios
              </GlassButton>
            </motion.div>
          </Container>
        </div>
      </section>

      {/* Summary */}
      <section className="px-6 py-24 md:py-32">
        <Container width="lg">
          <motion.div
            variants={stagger}
            {...inViewProps}
            className="grid grid-cols-1 gap-10 md:grid-cols-12"
          >
            <motion.div variants={fadeRiseSmall} className="md:col-span-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/40">Resumen</p>
            </motion.div>
            <motion.div variants={fadeRise} className="md:col-span-8">
              <p className="text-lg leading-relaxed text-white/80 md:text-xl">
                {service.summary}
              </p>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Process */}
      <section className="px-6 pb-24 md:pb-32">
        <Container width="lg">
          <motion.div variants={stagger} {...inViewProps} className="mb-12">
            <motion.p
              variants={fadeRiseSmall}
              className="text-xs uppercase tracking-[0.2em] text-white/40"
            >
              Proceso
            </motion.p>
            <motion.h2
              variants={fadeRise}
              className="mt-4 font-display text-3xl leading-tight tracking-tight text-white md:text-5xl"
            >
              Cómo trabajamos.
            </motion.h2>
          </motion.div>
          <motion.div
            variants={stagger}
            {...inViewProps}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {service.process.map((p) => (
              <motion.div key={p.step} variants={fadeRise}>
                <GlassCard rounded="2xl" className="h-full p-8">
                  <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/40">
                    0{p.step}
                  </p>
                  <h3 className="font-display text-xl tracking-tight text-white">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{p.body}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Deliverables */}
      <section className="px-6 pb-24 md:pb-32">
        <Container width="lg">
          <motion.div variants={stagger} {...inViewProps} className="mb-12">
            <motion.p
              variants={fadeRiseSmall}
              className="text-xs uppercase tracking-[0.2em] text-white/40"
            >
              Entregables
            </motion.p>
            <motion.h2
              variants={fadeRise}
              className="mt-4 font-display text-3xl leading-tight tracking-tight text-white md:text-5xl"
            >
              Qué obtienes.
            </motion.h2>
          </motion.div>
          <motion.div
            variants={stagger}
            {...inViewProps}
            className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-white/5 sm:grid-cols-2 md:grid-cols-3"
          >
            {service.deliverables.map((d, i) => (
              <motion.div
                key={d}
                variants={fadeRiseSmall}
                className="bg-black/40 p-7"
              >
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/40">
                  0{i + 1}
                </p>
                <p className="text-base leading-relaxed text-white">{d}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Prev / Next nav */}
      <section className="px-6 pb-24 md:pb-32">
        <Container width="lg">
          <motion.div variants={stagger} {...inViewProps} className="mb-10">
            <motion.p
              variants={fadeRiseSmall}
              className="text-xs uppercase tracking-[0.2em] text-white/40"
            >
              Otros servicios
            </motion.p>
          </motion.div>
          <motion.div
            variants={stagger}
            {...inViewProps}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            <motion.div variants={fadeRise}>
              <ServiceNavCard service={prev} direction="prev" />
            </motion.div>
            <motion.div variants={fadeRise}>
              <ServiceNavCard service={next} direction="next" />
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
