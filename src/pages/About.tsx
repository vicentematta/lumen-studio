import { motion } from 'framer-motion'
import { PageHero } from '@/components/PageHero'
import { Container } from '@/components/ui/Container'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlassButton } from '@/components/ui/GlassButton'
import { fadeRise, inViewProps, stagger } from '@/lib/motion'
import { VIDEOS } from '@/lib/media'
import { Seo } from '@/components/Seo'
import { stegaClean } from '@sanity/client/stega'
import { useAboutPage } from '@/hooks/useAboutPage'

export default function About() {
  const { content } = useAboutPage()

  return (
    <>
      <Seo title="About" description={stegaClean(content.subtitle)} url="/about" />
      <PageHero
        eyebrow={content.eyebrow}
        title={<>{content.titlePlain} <em className="italic text-white/60">{content.titleItalic}</em>.</>}
        subtitle={content.subtitle}
        actions={
          <>
            <GlassButton to="/contact" variant="solid" size="lg">{content.ctaWork}</GlassButton>
            <GlassButton to="/work" variant="glass" size="lg">{content.ctaSee}</GlassButton>
          </>
        }
      />

      <section className="px-6 py-16 md:py-24">
        <Container width="lg">
          <motion.div variants={fadeRise} {...inViewProps} className="overflow-hidden rounded-3xl">
            <video
              src={stegaClean(content.videoUrl) || VIDEOS.philosophy.mp4}
              muted autoPlay loop playsInline preload="metadata"
              className="aspect-[16/9] w-full object-cover"
            />
          </motion.div>
        </Container>
      </section>

      <section className="px-6 pb-32 md:pb-44">
        <Container width="lg">
          <motion.h2
            variants={fadeRise}
            initial="hidden"
            animate="show"
            className="mb-14 max-w-3xl font-display text-3xl tracking-tight text-white md:text-5xl">
            {content.valuesHeading}
          </motion.h2>
          <motion.div variants={stagger} {...inViewProps} className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {content.values.map((v, idx) => (
              <motion.div
                key={v._key}
                variants={fadeRise}
                initial="hidden"
                animate="show"
                transition={{ delay: 0.05 + idx * 0.12, duration: 0.8 }}
              >
                <GlassCard rounded="2xl" className="h-full p-7">
                  <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/40">{v.label}</p>
                  <p className="text-base leading-relaxed text-white/75">{v.body}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>
    </>
  )
}
