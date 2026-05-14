import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '@/components/PageHero'
import { Container } from '@/components/ui/Container'
import { GlassCard } from '@/components/ui/GlassCard'
import { fadeRise, inViewProps, stagger } from '@/lib/motion'
import { SERVICES } from '@/data/services'
import { Seo } from '@/components/Seo'
import { stegaClean } from '@sanity/client/stega'
import { useServices } from '@/hooks/useServices'

export default function Services() {
  const { services: sanityServices } = useServices()
  const services = sanityServices.length > 0 ? sanityServices : SERVICES

  return (
    <>
      <Seo title="Servicios" description="Tres puertas a tu categoría: estrategia comercial, identidad digital y producción continua." url="/services" />
      <PageHero
        eyebrow="Servicios"
        title={<>Tres puertas a tu <em className="italic text-white/60">categoría</em>.</>}
        subtitle="Estrategia comercial, identidad digital y producción creativa — un solo método. Cobramos primero por el ángulo; la aplicación táctica viene después, siempre amarrada al diagnóstico."
      />
      <section className="px-6 pb-32 md:pb-44">
        <Container width="lg">
          <motion.div variants={stagger} {...inViewProps} className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {services.map((s: any, idx: number) => {
              const slug = s.slug?.current ?? s.slug
              const videoSrc = stegaClean(s.videoUrl) || s.hero?.mp4
              return (
                <motion.div
                  key={slug}
                  variants={fadeRise}
                  initial="hidden"
                  animate="show"
                  transition={{ delay: 0.05 + idx * 0.12, duration: 0.8 }}
                >
                  <Link to={`/services/${slug}`} className="group block">
                    <GlassCard rounded="3xl" className="h-full overflow-hidden">
                      <div className="relative aspect-video overflow-hidden">
                        <video src={videoSrc} muted autoPlay loop playsInline preload="metadata"
                          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <div className="p-6 md:p-8">
                        <div className="mb-5 flex items-start justify-between">
                          <span className="text-xs uppercase tracking-[0.2em] text-white/40">{s.eyebrow}</span>
                          <span className="liquid-glass flex h-8 w-8 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:rotate-45">
                            <ArrowUpRight className="h-4 w-4" />
                          </span>
                        </div>
                        <h3 className="mb-3 font-display text-2xl tracking-tight text-white md:text-3xl">{s.name}</h3>
                        <p className="text-sm leading-relaxed text-white/55">{s.short}</p>
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
