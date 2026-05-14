'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { VideoBackground } from '@/components/ui/VideoBackground'
import { GlassButton } from '@/components/ui/GlassButton'
import { GlassCard } from '@/components/ui/GlassCard'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { VIDEOS } from '@/lib/media'
import {
  fadeRise,
  blurIn,
  stagger,
  inViewProps,
  slideFromLeft,
  slideFromRight,
} from '@/lib/motion'
import type { HomeContent } from '@/lib/queries/homePage'
import { stegaClean } from '@sanity/client/stega'

interface Props {
  content: HomeContent
}

// ── Sub-component types (Sanity puede devolver null en cualquier campo) ──────

type S = string | null

// ════════════════════════════════════════════════════════════════════════════
// ROOT
// ════════════════════════════════════════════════════════════════════════════

export function HomeView({ content }: Props) {
  return (
    <>
      <Hero content={content} />
      <About content={content} />
      <Featured content={content} />
      <Philosophy content={content} />
      <Services content={content} />
      <ClientsStrip content={content} />
      <Cta content={content} />
    </>
  )
}

// ════════════════════════════════════════════════════════════════════════════
// HERO
// ════════════════════════════════════════════════════════════════════════════

function Hero({ content }: { content: HomeContent }) {
  const router = useRouter()
  const [email, setEmail] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    router.push(`/contact?email=${encodeURIComponent(email)}`)
  }

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Video background con mask que se desvanece al negro abajo */}
      <div
        className="absolute inset-0"
        style={{
          WebkitMaskImage:
            'linear-gradient(to bottom, black 0%, black 20%, transparent 95%)',
          maskImage:
            'linear-gradient(to bottom, black 0%, black 20%, transparent 95%)',
        }}
      >
        <VideoBackground
          video={{
            ...VIDEOS.heroLoop,
            mp4: stegaClean(content.videoHero ?? '') || VIDEOS.heroLoop.mp4,
          }}
          eager
          position="object-[center_-110px]"
          overlayClassName="bg-gradient-to-b from-black/50 via-transparent to-black"
        />
      </div>

      {/* Contenido — no fade */}
      <div className="relative z-10 flex min-h-screen flex-1 flex-col items-center justify-center px-6 pt-32 text-center">
        <motion.h1
          variants={blurIn}
          initial="hidden"
          animate="show"
          className="font-display text-5xl leading-[1.02] tracking-tight text-white sm:text-7xl md:text-[clamp(3.5rem,11vw,9rem)] md:leading-[0.95] md:whitespace-nowrap"
        >
          {content.heroTitle}
        </motion.h1>
        {content.heroSubtitle ? (
          <motion.p
            variants={fadeRise}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.3 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:mt-8 md:text-lg lg:text-xl"
          >
            {content.heroSubtitle}
          </motion.p>
        ) : null}
        <motion.form
          variants={fadeRise}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.5 }}
          onSubmit={onSubmit}
          className="mt-10 w-full max-w-xl"
        >
          <div className="liquid-glass flex items-center gap-3 rounded-full py-2 pl-6 pr-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="flex-1 bg-transparent py-2 text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
            <GlassButton
              type="submit"
              variant="solid"
              size="sm"
              aria-label="Enviar"
              className="h-11 w-11 !px-0"
            >
              <ArrowRight className="h-5 w-5" />
            </GlassButton>
          </div>
        </motion.form>
        <motion.div
          variants={fadeRise}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.8 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {content.heroPrimaryLabel ? (
            <GlassButton to="/about" variant="glass" size="lg">
              {content.heroPrimaryLabel}
            </GlassButton>
          ) : null}
          {content.heroSecondaryLabel ? (
            <GlassButton
              to="/work"
              variant="glass-strong"
              size="lg"
              icon={<ArrowUpRight className="h-4 w-4" />}
            >
              {content.heroSecondaryLabel}
            </GlassButton>
          ) : null}
        </motion.div>
      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════════════════════════
// ABOUT (post-hero empathetic)
// ════════════════════════════════════════════════════════════════════════════

function About({ content }: { content: HomeContent }) {
  if (!content.aboutTitle && !content.aboutBody) return null
  return (
    <section className="relative bg-black px-6 pb-12 pt-24 md:pt-32">
      <Container width="lg" className="relative">
        <SectionHeading eyebrow={content.aboutEyebrow ?? undefined} size="lg">
          {content.aboutTitle}
        </SectionHeading>
        {content.aboutBody ? (
          <motion.p
            variants={fadeRise}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.15, duration: 0.8 }}
            className="mt-8 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg"
          >
            {content.aboutBody}
          </motion.p>
        ) : null}
      </Container>
    </section>
  )
}

// ════════════════════════════════════════════════════════════════════════════
// FEATURED (large landscape video + method card)
// ════════════════════════════════════════════════════════════════════════════

function Featured({ content }: { content: HomeContent }) {
  return (
    <section className="bg-black px-6 pb-24 pt-12 md:pt-16">
      <Container width="lg">
        <motion.div
          variants={blurIn}
          {...inViewProps}
          className="relative aspect-video overflow-hidden rounded-3xl"
        >
          <video
            src={stegaClean(content.videoFeatured ?? '') || VIDEOS.featured.mp4}
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 p-6 md:flex-row md:items-end md:justify-between md:p-10">
            {content.featuredMethodLabel || content.featuredMethodBody ? (
              <GlassCard className="max-w-md p-7 md:p-9">
                {content.featuredMethodLabel ? (
                  <p className="mb-4 text-eyebrow uppercase text-white/50">
                    {content.featuredMethodLabel}
                  </p>
                ) : null}
                {content.featuredMethodBody ? (
                  <p className="text-body text-white">
                    {content.featuredMethodBody}
                  </p>
                ) : null}
              </GlassCard>
            ) : null}
            {content.featuredExploreLabel ? (
              <GlassButton
                to="/services"
                variant="glass-strong"
                size="lg"
                icon={<ArrowUpRight className="h-4 w-4" />}
              >
                {content.featuredExploreLabel}
              </GlassButton>
            ) : null}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

// ════════════════════════════════════════════════════════════════════════════
// PHILOSOPHY (split layout: video left, two text blocks right)
// ════════════════════════════════════════════════════════════════════════════

function Philosophy({ content }: { content: HomeContent }) {
  if (!content.philosophyTitle) return null
  return (
    <section className="bg-black px-6 py-28 md:py-40">
      <Container width="lg">
        <SectionHeading className="mb-16 md:mb-24" size="xl">
          {content.philosophyTitle}
        </SectionHeading>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <motion.div
            variants={slideFromLeft}
            {...inViewProps}
            className="aspect-[4/3] overflow-hidden rounded-3xl"
          >
            <video
              src={
                stegaClean(content.videoPhilosophy ?? '') ||
                VIDEOS.philosophy.mp4
              }
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <motion.div
            variants={slideFromRight}
            {...inViewProps}
            className="flex flex-col justify-center gap-8"
          >
            {(content.philosophyDisciplineLabel ||
              content.philosophyDisciplineBody) && (
              <div>
                {content.philosophyDisciplineLabel ? (
                  <p className="mb-5 text-eyebrow uppercase text-white/40">
                    {content.philosophyDisciplineLabel}
                  </p>
                ) : null}
                {content.philosophyDisciplineBody ? (
                  <p className="text-lead text-white/75">
                    {content.philosophyDisciplineBody}
                  </p>
                ) : null}
              </div>
            )}
            <div className="glass-divider" />
            {(content.philosophyStandardLabel ||
              content.philosophyStandardBody) && (
              <div>
                {content.philosophyStandardLabel ? (
                  <p className="mb-5 text-eyebrow uppercase text-white/40">
                    {content.philosophyStandardLabel}
                  </p>
                ) : null}
                {content.philosophyStandardBody ? (
                  <p className="text-lead text-white/75">
                    {content.philosophyStandardBody}
                  </p>
                ) : null}
              </div>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

// ════════════════════════════════════════════════════════════════════════════
// SERVICES (3 cards)
// ════════════════════════════════════════════════════════════════════════════

const FALLBACK_SERVICES = [
  {
    _id: 'fs-estrategia',
    tag: '01 · Comunicación estratégica' as S,
    title: 'Estrategia Comercial' as S,
    description: 'Claridad sobre tu diferenciador.' as S,
    videoSrc: VIDEOS.serviceStrategy.mp4,
    to: '/services/estrategia-comercial',
  },
  {
    _id: 'fs-identidad',
    tag: '02 · Marca, web y contenido' as S,
    title: 'Identidad Digital' as S,
    description: 'Tu portada competitiva en digital.' as S,
    videoSrc: VIDEOS.serviceCraft.mp4,
    to: '/services/identidad-digital',
  },
  {
    _id: 'fs-negocio',
    tag: '03 · Producción continua' as S,
    title: 'Negocio + Diseño' as S,
    description: 'Producción que refuerza tu posición.' as S,
    videoSrc: VIDEOS.serviceCraft.mp4,
    to: '/services/negocio-diseno',
  },
]

function Services({ content }: { content: HomeContent }) {
  const serviceCards = content.featuredServices?.length
    ? content.featuredServices.map((s) => ({
        _id: s._id,
        tag: s.eyebrow,
        title: s.name,
        description: s.short,
        videoSrc:
          stegaClean(s.videoUrl ?? '') || VIDEOS.serviceStrategy.mp4,
        to: `/services/${s.slug}`,
      }))
    : FALLBACK_SERVICES

  if (!content.servicesTitle) return null

  return (
    <section className="relative overflow-hidden bg-black px-6 py-28 md:py-40">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.025)_0%,_transparent_60%)]" />
      <Container width="lg" className="relative">
        <motion.div
          variants={fadeRise}
          {...inViewProps}
          className="mb-12 flex items-end justify-between md:mb-16"
        >
          <h2 className="font-display text-3xl tracking-tight text-white md:text-5xl">
            {content.servicesTitle}
          </h2>
          {content.servicesSubtitle ? (
            <p className="hidden text-sm text-white/40 md:block">
              {content.servicesSubtitle}
            </p>
          ) : null}
        </motion.div>
        <motion.div
          variants={stagger}
          {...inViewProps}
          className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6 lg:gap-8"
        >
          {serviceCards.map((card, idx) => (
            <motion.a
              key={card._id}
              variants={fadeRise}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.05 + idx * 0.12, duration: 0.8 }}
              href={card.to}
              className="group block"
            >
              <GlassCard rounded="3xl" className="overflow-hidden">
                <div className="relative aspect-video overflow-hidden">
                  <video
                    src={card.videoSrc}
                    muted
                    autoPlay
                    loop
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover transition-transform duration-700 ease-glass group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-7 md:p-9">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <span className="text-eyebrow uppercase text-white/40">
                      {card.tag}
                    </span>
                    <span className="liquid-glass flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                  <h3 className="mb-4 font-display text-h2 italic text-white">
                    {card.title}
                  </h3>
                  {card.description ? (
                    <p className="text-body text-white/65">
                      {card.description}
                    </p>
                  ) : null}
                </div>
              </GlassCard>
            </motion.a>
          ))}
        </motion.div>
        {content.servicesAllLabel ? (
          <motion.div
            variants={fadeRise}
            {...inViewProps}
            className="mt-12 flex justify-center"
          >
            <GlassButton
              to="/services"
              variant="glass-strong"
              size="lg"
              icon={<ArrowUpRight className="h-4 w-4" />}
            >
              {content.servicesAllLabel}
            </GlassButton>
          </motion.div>
        ) : null}
      </Container>
    </section>
  )
}

// ════════════════════════════════════════════════════════════════════════════
// CLIENTS STRIP (marquee logos)
// ════════════════════════════════════════════════════════════════════════════

const LOGO_SCALE: Record<string, number> = {
  sodapoptv: 1.35,
  sernatur: 1.3,
  'the national gallery': 1.15,
  'sala sur': 1.15,
  'honesto mike': 1.15,
  'dg medios': 1.1,
}

function ClientsStrip({ content }: { content: HomeContent }) {
  const logos = content.clientLogos?.filter((l) => l?.logoUrl) ?? []
  if (logos.length === 0) return null
  // Duplicate so the translateX(-50%) loop is seamless
  const loop = [...logos, ...logos]
  return (
    <section className="bg-black py-16 md:py-20">
      <Container width="lg">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10 lg:gap-16">
          <p className="shrink-0 font-display text-base italic text-white/45 md:text-lg">
            {content.clientLogosEyebrow || 'Confiaron en nosotros'}
          </p>
          <div
            className="relative flex-1 overflow-hidden"
            style={{
              WebkitMaskImage:
                'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
              maskImage:
                'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            }}
          >
            <div
              className="flex w-max animate-marquee items-center gap-20 pr-20 md:gap-24 md:pr-24"
              style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
            >
              {loop.map((l, i) => {
                const cleanName = stegaClean(l.name ?? '') || l.name || ''
                const scale = LOGO_SCALE[cleanName.toLowerCase().trim()] ?? 1
                return (
                  <div
                    key={`${l.name}-${i}`}
                    className="flex h-20 w-36 shrink-0 items-center justify-center md:h-24 md:w-40"
                  >
                    <img
                      src={stegaClean(l.logoUrl ?? '') || l.logoUrl || ''}
                      alt={cleanName}
                      loading="lazy"
                      aria-hidden={i >= logos.length ? 'true' : undefined}
                      style={
                        scale !== 1
                          ? { transform: `scale(${scale})` }
                          : undefined
                      }
                      className="max-h-10 max-w-full object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 md:max-h-12"
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

// ════════════════════════════════════════════════════════════════════════════
// BOTTOM CTA
// ════════════════════════════════════════════════════════════════════════════

function Cta({ content }: { content: HomeContent }) {
  if (!content.ctaTitle) return null
  return (
    <section className="bg-black px-6 py-28 md:py-40">
      <Container width="md" className="text-center">
        <motion.h2
          variants={fadeRise}
          {...inViewProps}
          className="font-display text-4xl tracking-tight text-white md:text-6xl"
        >
          {content.ctaTitle}
        </motion.h2>
        {content.ctaSubtitle ? (
          <motion.p
            variants={fadeRise}
            {...inViewProps}
            className="mt-6 whitespace-pre-line text-base text-white/50 md:text-lg"
          >
            {content.ctaSubtitle}
          </motion.p>
        ) : null}
        {content.ctaLabel ? (
          <motion.div
            variants={fadeRise}
            {...inViewProps}
            className="mt-10"
          >
            <GlassButton
              to="/contact"
              variant="solid"
              size="lg"
              icon={<ArrowUpRight className="h-4 w-4" />}
            >
              {content.ctaLabel}
            </GlassButton>
          </motion.div>
        ) : null}
      </Container>
    </section>
  )
}
