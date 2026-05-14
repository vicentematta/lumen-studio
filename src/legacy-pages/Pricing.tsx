import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/PageHero'
import { Container } from '@/components/ui/Container'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlassButton } from '@/components/ui/GlassButton'
import { fadeRise, inViewProps, stagger } from '@/lib/motion'
import { cn } from '@/lib/cn'
import { Seo } from '@/components/Seo'
import { stegaClean } from '@sanity/client/stega'
import { usePricingPage } from '@/hooks/usePricingPage'

export default function Pricing() {
  const { content } = usePricingPage()

  return (
    <>
      <Seo title="Pricing" description={stegaClean(content.subtitle)} url="/pricing" />
      <PageHero
        eyebrow={content.eyebrow}
        title={<>{content.titlePlain} <em className="italic text-white/60">{content.titleItalic}</em>.</>}
        subtitle={content.subtitle}
      />
      <section className="px-6 pb-32 md:pb-44">
        <Container width="lg">
          <motion.div variants={stagger} {...inViewProps} className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {content.tiers.map((tier) => (
              <motion.div key={tier._key} variants={fadeRise}>
                <GlassCard rounded="3xl" variant={tier.highlight ? 'glass-strong' : 'glass'}
                  className={cn('flex h-full flex-col p-8', tier.highlight && 'md:scale-[1.02]')}>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40">{tier.name}</p>
                  <p className="mt-4 font-display text-4xl text-white md:text-5xl">{tier.price}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/40">{tier.cadence}</p>
                  <p className="mt-5 text-sm leading-relaxed text-white/70">{tier.tagline}</p>
                  <ul className="mt-7 flex-1 space-y-3">
                    {tier.features?.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-white/80">
                        <Check className="mt-[3px] h-4 w-4 shrink-0 text-white/50" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <GlassButton to={`/contact?tier=${stegaClean(tier.slug)}`}
                      variant={tier.highlight ? 'solid' : 'glass'} size="md" className="w-full justify-center">
                      {tier.cta}
                    </GlassButton>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>
    </>
  )
}
