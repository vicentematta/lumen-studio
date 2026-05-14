'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { blurIn, fadeRise } from '@/lib/motion'
import { Container } from '@/components/ui/Container'

interface Props {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  actions?: ReactNode
}

export function PageHero({ eyebrow, title, subtitle, actions }: Props) {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-32 md:pb-24 md:pt-44">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.05)_0%,_transparent_70%)]" />
      <Container width="lg" className="relative">
        {eyebrow ? (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 text-xs uppercase tracking-[0.2em] text-white/40"
          >
            {eyebrow}
          </motion.p>
        ) : null}
        <motion.h1
          variants={blurIn}
          initial="hidden"
          animate="show"
          className="font-display text-5xl leading-[1.05] tracking-tight text-white md:text-7xl lg:text-8xl"
        >
          {title}
        </motion.h1>
        {subtitle ? (
          <motion.p
            variants={fadeRise}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.2 }}
            className="mt-8 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg"
          >
            {subtitle}
          </motion.p>
        ) : null}
        {actions ? (
          <motion.div
            variants={fadeRise}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.35 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            {actions}
          </motion.div>
        ) : null}
      </Container>
    </section>
  )
}
