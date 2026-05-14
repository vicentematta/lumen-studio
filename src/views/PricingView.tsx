'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/PageHero'
import { Container } from '@/components/ui/Container'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlassButton } from '@/components/ui/GlassButton'
import { fadeRise, inViewProps, stagger } from '@/lib/motion'
import { cn } from '@/lib/cn'
import { stegaClean } from '@sanity/client/stega'
import type { PricingContent } from '@/lib/queries/pricingPage'

interface Props {
  content: PricingContent
}

export function PricingView({ content }: Props) {
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
      />

      {content.tiers?.length ? (
        <section className="px-6 pb-32 md:pb-44">
          <Container width="lg">
            <motion.div
              variants={stagger}
              {...inViewProps}
              className="grid grid-cols-1 gap-6 md:grid-cols-3"
            >
              {content.tiers.map((tier) => (
                <motion.div key={tier._key} variants={fadeRise}>
                  <GlassCard
                    rounded="3xl"
                    variant={tier.highlight ? 'glass-strong' : 'glass'}
                    className={cn(
                      'flex h-full flex-col p-8',
                      tier.highlight && 'md:scale-[1.02]',
                    )}
                  >
                    {tier.name ? (
                      <p className="text-eyebrow uppercase text-white/40">
                        {tier.name}
                      </p>
                    ) : null}
                    {tier.price ? (
                      <p className="mt-5 font-display text-display-md text-white">
                        {tier.price}
                      </p>
                    ) : null}
                    {tier.cadence ? (
                      <p className="mt-2 text-eyebrow uppercase text-white/40">
                        {tier.cadence}
                      </p>
                    ) : null}
                    {tier.tagline ? (
                      <p className="mt-6 text-body text-white/75">
                        {tier.tagline}
                      </p>
                    ) : null}
                    {tier.features?.length ? (
                      <ul className="mt-8 flex-1 space-y-4">
                        {tier.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-3 text-body-sm text-white/85"
                          >
                            <Check className="mt-[5px] h-4 w-4 shrink-0 text-white/50" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {tier.cta && tier.slug ? (
                      <div className="mt-8">
                        <GlassButton
                          to={`/contact?tier=${stegaClean(tier.slug)}`}
                          variant={tier.highlight ? 'solid' : 'glass'}
                          size="md"
                          className="w-full justify-center"
                        >
                          {tier.cta}
                        </GlassButton>
                      </div>
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
