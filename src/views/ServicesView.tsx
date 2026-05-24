'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { PageHero } from '@/components/PageHero'
import { Container } from '@/components/ui/Container'
import { GlassCard } from '@/components/ui/GlassCard'
import { fadeRise, inViewProps, stagger } from '@/lib/motion'
import { VIDEOS } from '@/lib/media'
import { stegaClean } from '@sanity/client/stega'
import type { ServiceListItem } from '@/lib/queries/services'

interface Props {
  services: ServiceListItem[]
}

export function ServicesView({ services }: Props) {
  return (
    <>
      <PageHero
        eyebrow="Servicios"
        title={
          <>
            Tres puertas a tu{' '}
            <em className="italic text-white/60">categoría</em>.
          </>
        }
        subtitle="Estrategia comercial, identidad digital y producción creativa — un solo método. Cobramos primero por el ángulo; la aplicación táctica viene después, siempre amarrada al diagnóstico."
      />
      <section className="px-6 pb-32 md:pb-44">
        <Container width="lg">
          <motion.div
            variants={stagger}
            {...inViewProps}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
          >
            {services.map((s, idx) => {
              const slug = s.slug
              if (!slug) return null
              const videoSrc =
                stegaClean(s.videoUrl ?? '') || VIDEOS.serviceStrategy.mp4
              return (
                <motion.div
                  key={s._id}
                  variants={fadeRise}
                  initial="hidden"
                  animate="show"
                  transition={{ delay: 0.05 + idx * 0.12, duration: 0.8 }}
                >
                  <Link href={`/services/${slug}`} className="group block">
                    <GlassCard
                      rounded="3xl"
                      className="h-full overflow-hidden"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <video
                          src={videoSrc}
                          muted
                          autoPlay
                          loop
                          playsInline
                          preload="metadata"
                          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <div className="p-7 md:p-9">
                        <div className="mb-6 flex items-start justify-between gap-4">
                          {s.eyebrow ? (
                            <span className="text-eyebrow uppercase text-white/40">
                              {s.eyebrow}
                            </span>
                          ) : (
                            <span />
                          )}
                          <span className="liquid-glass flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:-rotate-45">
                            <ArrowUpRight className="h-4 w-4" />
                          </span>
                        </div>
                        {s.name ? (
                          <h3 className="mb-4 font-body text-h4 font-normal uppercase !tracking-[0.05em] text-white">
                            {s.name}
                          </h3>
                        ) : null}
                        {s.short ? (
                          <p className="text-body text-white/65">
                            {s.short}
                          </p>
                        ) : null}
                      </div>
                    </GlassCard>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </Container>
      </section>
    </>
  )
}
