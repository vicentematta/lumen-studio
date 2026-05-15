'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { PageHero } from '@/components/PageHero'
import { Container } from '@/components/ui/Container'
import { GlassCard } from '@/components/ui/GlassCard'
import { fadeRise, inViewProps, stagger } from '@/lib/motion'
import type { ProjectListItem } from '@/lib/queries/projects'

interface Props {
  projects: ProjectListItem[]
}

export function WorkView({ projects }: Props) {
  return (
    <>
      <PageHero
        eyebrow="Trabajo"
        title={
          <>
            Problemas reales,{' '}
            <em className="italic text-white/60">resultados concretos</em>.
          </>
        }
        subtitle="Cada proyecto parte de un diagnóstico. Cada resultado se mide contra el problema original."
      />

      <section className="px-6 pb-32 md:pb-44">
        <Container width="lg">
          <motion.div
            variants={stagger}
            {...inViewProps}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
          >
            {projects.map((p) => {
              if (!p.slug) return null
              return (
                <motion.div key={p._id} variants={fadeRise}>
                  <Link href={`/work/${p.slug}`} className="group block h-full">
                    <GlassCard rounded="3xl" className="flex h-full flex-col overflow-hidden">
                      <div className="flex flex-1 items-start justify-between gap-4 p-7 md:p-9">
                        <div className="min-w-0">
                          {p.category ? (
                            <span className="text-eyebrow uppercase text-white/40">
                              {p.category}
                            </span>
                          ) : null}
                          <p className="mt-3 font-body text-h4 font-normal uppercase !tracking-[0.05em] text-white">
                            {p.client}
                          </p>
                          {p.title ? (
                            <p className="mt-1 font-display text-h3 italic text-white/70">
                              {p.title}
                            </p>
                          ) : null}
                        </div>
                        <span className="liquid-glass flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:rotate-45 md:h-11 md:w-11">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </div>
                      {p.year ? (
                        <div className="border-t border-white/5 px-7 py-4 md:px-9">
                          <span className="text-[11px] uppercase tracking-[0.15em] tabular-nums text-white/30">
                            {p.year}
                          </span>
                        </div>
                      ) : null}
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
