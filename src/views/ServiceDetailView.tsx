'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlassButton } from '@/components/ui/GlassButton'
import { VideoBackground } from '@/components/ui/VideoBackground'
import {
  fadeRise,
  fadeRiseSmall,
  blurIn,
  inViewProps,
  stagger,
} from '@/lib/motion'
import { VIDEOS } from '@/lib/media'
import { stegaClean } from '@sanity/client/stega'
import type {
  ServiceDoc,
  ServiceListItem,
} from '@/lib/queries/services'

interface Props {
  service: ServiceDoc
  prev: ServiceListItem
  next: ServiceListItem
}

export function ServiceDetailView({ service, prev, next }: Props) {
  const heroVideo = {
    mp4: stegaClean(service.videoUrl ?? '') || VIDEOS.serviceStrategy.mp4,
    webm: '',
    poster: '',
    mobile: '',
  }

  return (
    <>
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[560px] w-full overflow-hidden">
        <VideoBackground
          video={heroVideo}
          eager
          overlayClassName="bg-gradient-to-b from-black/40 via-black/20 to-black"
        />
        <div className="relative z-10 flex h-full items-end px-6 pb-16 md:pb-24">
          <Container width="lg">
            {service.eyebrow ? (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-xs uppercase tracking-[0.2em] text-white/60"
              >
                {service.eyebrow}
              </motion.p>
            ) : null}
            <motion.h1
              variants={blurIn}
              initial="hidden"
              animate="show"
              className="mt-6 max-w-4xl font-display text-4xl leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl"
            >
              {service.name}
            </motion.h1>
            {service.short ? (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg"
              >
                {service.short}
              </motion.p>
            ) : null}
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
      {service.summary ? (
        <section className="px-6 py-24 md:py-32">
          <Container width="lg">
            <motion.div
              variants={stagger}
              {...inViewProps}
              className="grid grid-cols-1 gap-10 md:grid-cols-12"
            >
              <motion.div
                variants={fadeRiseSmall}
                className="md:col-span-4"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Resumen
                </p>
              </motion.div>
              <motion.div variants={fadeRise} className="md:col-span-8">
                <p className="text-lg leading-relaxed text-white/80 md:text-xl">
                  {service.summary}
                </p>
              </motion.div>
            </motion.div>
          </Container>
        </section>
      ) : null}

      {/* Process */}
      {service.process?.length ? (
        <section className="px-6 pb-24 md:pb-32">
          <Container width="lg">
            <motion.div
              variants={stagger}
              {...inViewProps}
              className="mb-12"
            >
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
                <motion.div key={p.step ?? p.title} variants={fadeRise}>
                  <GlassCard rounded="2xl" className="h-full p-8">
                    {p.step !== null ? (
                      <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/40">
                        0{p.step}
                      </p>
                    ) : null}
                    {p.title ? (
                      <h3 className="font-display text-xl tracking-tight text-white">
                        {p.title}
                      </h3>
                    ) : null}
                    {p.body ? (
                      <p className="mt-3 text-sm leading-relaxed text-white/60">
                        {p.body}
                      </p>
                    ) : null}
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>
      ) : null}

      {/* Deliverables */}
      {service.deliverables?.length ? (
        <section className="px-6 pb-24 md:pb-32">
          <Container width="lg">
            <motion.div
              variants={stagger}
              {...inViewProps}
              className="mb-12"
            >
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
      ) : null}

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

interface NavCardProps {
  service: ServiceListItem
  direction: 'prev' | 'next'
}

function ServiceNavCard({ service, direction }: NavCardProps) {
  const isNext = direction === 'next'
  const slug = service.slug
  const videoSrc =
    stegaClean(service.videoUrl ?? '') || VIDEOS.serviceStrategy.mp4
  return (
    <Link href={`/services/${slug}`} className="group block">
      <GlassCard rounded="3xl" className="overflow-hidden">
        <div className="relative aspect-[16/9] overflow-hidden">
          <video
            src={videoSrc}
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>
        <div className="flex items-center justify-between gap-4 px-6 py-6 md:px-8 md:py-7">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
              {isNext ? 'Siguiente' : 'Anterior'}
            </p>
            <p className="mt-2 font-display text-2xl leading-tight tracking-tight text-white md:text-3xl">
              {service.name}
            </p>
          </div>
          <span className="liquid-glass flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:rotate-45 md:h-11 md:w-11">
            {isNext ? (
              <ArrowRight className="h-4 w-4" />
            ) : (
              <ArrowLeft className="h-4 w-4" />
            )}
          </span>
        </div>
      </GlassCard>
    </Link>
  )
}
