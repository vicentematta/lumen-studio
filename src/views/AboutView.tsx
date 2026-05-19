'use client'

import { motion } from 'framer-motion'
import { PageHero } from '@/components/PageHero'
import { Container } from '@/components/ui/Container'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlassButton } from '@/components/ui/GlassButton'
import { fadeRise, inViewProps, stagger } from '@/lib/motion'
import { VIDEOS } from '@/lib/media'
import { stegaClean } from '@sanity/client/stega'
import type { AboutContent } from '@/lib/queries/aboutPage'

interface Props {
  content: AboutContent
}

export function AboutView({ content }: Props) {
  return (
    <>
      <PageHero
        eyebrow={content.eyebrow ?? undefined}
        title={
          <>
            {content.titlePlain}
            {content.titleItalic ? (
              <>
                {' '}
                <em className="italic text-white/60">{content.titleItalic}</em>
              </>
            ) : null}
            .
          </>
        }
        subtitle={content.subtitle ?? undefined}
        actions={
          <>
            {content.ctaWork ? (
              <GlassButton to="/work" variant="solid" size="lg">
                {content.ctaWork}
              </GlassButton>
            ) : null}
            {content.ctaSee ? (
              <GlassButton to="/work" variant="glass" size="lg">
                {content.ctaSee}
              </GlassButton>
            ) : null}
          </>
        }
      />

      <section className="px-6 py-16 md:py-24">
        <Container width="lg">
          <motion.div
            variants={fadeRise}
            {...inViewProps}
            className="overflow-hidden rounded-3xl"
          >
            <video
              src={stegaClean(content.videoUrl ?? '') || VIDEOS.philosophy.mp4}
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
              className="aspect-[16/9] w-full object-cover"
            />
          </motion.div>
        </Container>
      </section>

      {content.values?.length ? (
        <section className="px-6 pb-32 md:pb-44">
          <Container width="lg">
            {content.valuesHeading ? (
              <motion.h2
                variants={fadeRise}
                initial="hidden"
                animate="show"
                className="mb-14 max-w-3xl font-display text-3xl tracking-tight text-white md:text-5xl"
              >
                {content.valuesHeading}
              </motion.h2>
            ) : null}
            <motion.div
              variants={stagger}
              {...inViewProps}
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              {content.values.map((v, idx) => (
                <motion.div
                  key={v._key}
                  variants={fadeRise}
                  initial="hidden"
                  animate="show"
                  transition={{ delay: 0.05 + idx * 0.12, duration: 0.8 }}
                >
                  <GlassCard rounded="2xl" className="h-full p-8 md:p-10">
                    {v.label ? (
                      <p className="mb-5 text-eyebrow uppercase text-white/40">
                        {v.label}
                      </p>
                    ) : null}
                    {v.body ? (
                      <p className="text-body text-white/80">
                        {v.body}
                      </p>
                    ) : null}
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>
      ) : null}
    </>
  )
}
