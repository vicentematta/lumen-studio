import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Container } from '@/components/ui/Container'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlassButton } from '@/components/ui/GlassButton'
import { VideoBackground } from '@/components/ui/VideoBackground'
import { fadeRise, fadeRiseSmall, blurIn, inViewProps, stagger } from '@/lib/motion'
import {
  adjacentProjects,
  findProject,
  loc,
  type Block,
  type Project,
} from '@/data/projects'
import NotFound from '@/pages/NotFound'
import { Seo, SITE_URL } from '@/components/Seo'
import { useProject, useProjects } from '@/hooks/useProjects'
import { stegaClean } from '@sanity/client/stega'
import { VIDEOS } from '@/lib/media'

const aspectClass: Record<NonNullable<Extract<Block, { kind: 'media' }>['aspect']>, string> = {
  '16/9': 'aspect-video',
  '4/3': 'aspect-[4/3]',
  '1/1': 'aspect-square',
}

function TextBlock({ block }: { block: Extract<Block, { kind: 'text' }> }) {
  return (
    <motion.div
      variants={stagger}
      {...inViewProps}
      className="grid grid-cols-1 gap-10 md:grid-cols-12"
    >
      <motion.div variants={fadeRiseSmall} className="md:col-span-4">
        {block.eyebrow ? (
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">{block.eyebrow}</p>
        ) : null}
      </motion.div>
      <motion.div variants={fadeRise} className="md:col-span-8">
        <h2 className="font-display text-3xl leading-tight tracking-tight text-white md:text-5xl">
          {block.title}
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
          {block.body}
        </p>
      </motion.div>
    </motion.div>
  )
}

function MediaBlock({ block }: { block: Extract<Block, { kind: 'media' }> }) {
  const aspect = aspectClass[block.aspect ?? '16/9']
  return (
    <motion.figure variants={fadeRise} {...inViewProps}>
      <GlassCard rounded="3xl" className="overflow-hidden">
        <div className={`relative ${aspect}`}>
          <video
            src={block.src}
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />
        </div>
      </GlassCard>
      {block.caption ? (
        <figcaption className="mt-4 max-w-xl text-xs uppercase tracking-[0.2em] text-white/40">
          {block.caption}
        </figcaption>
      ) : null}
    </motion.figure>
  )
}

function SplitBlock({ block }: { block: Extract<Block, { kind: 'split' }> }) {
  const reverse = block.reverse ?? false
  return (
    <motion.div
      variants={stagger}
      {...inViewProps}
      className={`grid grid-cols-1 items-center gap-10 md:grid-cols-2 ${
        reverse ? 'md:[&>*:first-child]:order-2' : ''
      }`}
    >
      <motion.div variants={fadeRise}>
        <GlassCard rounded="3xl" className="overflow-hidden">
          <div className="relative aspect-[4/3]">
            <video
              src={block.src}
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />
          </div>
        </GlassCard>
      </motion.div>
      <motion.div variants={fadeRise}>
        {block.eyebrow ? (
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">{block.eyebrow}</p>
        ) : null}
        <h3 className="mt-4 font-display text-3xl leading-tight tracking-tight text-white md:text-4xl">
          {block.title}
        </h3>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70">{block.body}</p>
      </motion.div>
    </motion.div>
  )
}

function QuoteBlock({ block }: { block: Extract<Block, { kind: 'quote' }> }) {
  return (
    <motion.blockquote
      variants={blurIn}
      {...inViewProps}
      className="mx-auto max-w-3xl text-center"
    >
      <p className="font-display text-3xl italic leading-tight tracking-tight text-white md:text-5xl">
        &ldquo;{block.body}&rdquo;
      </p>
      <footer className="mt-8 text-xs uppercase tracking-[0.2em] text-white/40">
        — {block.attribution}
      </footer>
    </motion.blockquote>
  )
}

function StatsBlock({ block }: { block: Extract<Block, { kind: 'stats' }> }) {
  return (
    <motion.div
      variants={stagger}
      {...inViewProps}
      className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-white/5 sm:grid-cols-3"
    >
      {block.items.map((item) => (
        <motion.div
          key={item.label}
          variants={fadeRiseSmall}
          className="bg-black/40 p-8 text-center md:p-12"
        >
          <p className="font-display text-4xl tracking-tight text-white md:text-6xl">
            {item.value}
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/40">{item.label}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}

function renderBlock(block: Block, i: number) {
  switch (block.kind) {
    case 'text':
      return <TextBlock key={i} block={block} />
    case 'media':
      return <MediaBlock key={i} block={block} />
    case 'split':
      return <SplitBlock key={i} block={block} />
    case 'quote':
      return <QuoteBlock key={i} block={block} />
    case 'stats':
      return <StatsBlock key={i} block={block} />
  }
}

interface NavCardProps {
  project: Project
  direction: 'prev' | 'next'
}

function ProjectNavCard({ project, direction }: NavCardProps) {
  const isNext = direction === 'next'
  return (
    <Link to={`/work/${project.slug}`} className="group block">
      <GlassCard rounded="3xl" className="overflow-hidden">
        <div className="relative aspect-[16/9] overflow-hidden">
          <video
            src={project.hero.mp4}
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover transition-transform duration-700 ease-glass group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>
        <div className="flex items-center justify-between p-6 md:p-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">
              {isNext ? 'Siguiente caso' : 'Caso anterior'}
            </p>
            <p className="mt-2 font-display text-2xl tracking-tight text-white md:text-3xl">
              {project.client}
            </p>
          </div>
          <span className="liquid-glass flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:rotate-45">
            {isNext ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
          </span>
        </div>
      </GlassCard>
    </Link>
  )
}

function adaptSanityProject(p: any): Project {
  const cleanText = (v: any) => (typeof v === 'string' ? (stegaClean(v) ?? v) : v)
  const cleanLoc = (l: any) => ({
    en: cleanText(l?.en) ?? '',
    es: cleanText(l?.es) ?? '',
  })
  const fallbackHero = { mp4: VIDEOS.heroLoop?.mp4 ?? '' }
  return {
    slug: p.slug?.current ?? p.slug,
    client: cleanText(p.client) ?? p.client,
    year: cleanText(p.year) ?? p.year,
    role: cleanText(p.role) ?? p.role,
    duration: cleanText(p.duration) ?? p.duration,
    category: cleanLoc(p.category),
    title: cleanLoc(p.title),
    subtitle: cleanLoc(p.subtitle),
    overview: cleanLoc(p.overview),
    hero: fallbackHero,
    meta: (p.meta ?? []).map((m: any) => ({
      label: cleanLoc(m.label),
      value: cleanText(m.value) ?? m.value,
    })),
    blocks: (p.blocks ?? [])
      .filter((b: any) => b?.kind || b?._type === 'textBlock' || b?._type === 'quoteBlock' || b?._type === 'statsBlock')
      .map((b: any) => ({
        ...b,
        kind: b.kind ?? (b._type === 'textBlock' ? 'text' : b._type === 'quoteBlock' ? 'quote' : b._type === 'statsBlock' ? 'stats' : 'text'),
        eyebrow: cleanText(b.eyebrow),
        title: cleanText(b.title),
        body: cleanText(b.body),
      })),
    outcomes: (p.outcomes ?? []).map((o: any) => ({
      value: cleanText(o.value) ?? o.value,
      label: cleanLoc(o.label),
    })),
    seo: { description: cleanText(p.seoDescription) ?? p.seoDescription },
  } as Project
}

export default function WorkDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const { project: sanityProject, loading } = useProject(slug)
  const { projects: sanityProjects } = useProjects()

  let project: Project | null = null
  let prev: Project | null = null
  let next: Project | null = null

  if (sanityProject) {
    project = adaptSanityProject(sanityProject)
    const arr = sanityProjects ?? []
    const idx = arr.findIndex((s: any) => s.slug?.current === sanityProject.slug?.current)
    if (arr.length >= 2 && idx !== -1) {
      prev = adaptSanityProject(arr[(idx - 1 + arr.length) % arr.length])
      next = adaptSanityProject(arr[(idx + 1) % arr.length])
    } else {
      prev = project
      next = project
    }
  } else if (!loading) {
    const staticProject = findProject(slug)
    if (staticProject) {
      project = staticProject
      const adj = adjacentProjects(staticProject.slug)
      prev = adj.prev
      next = adj.next
    }
  }

  if (loading && !project) return null
  if (!project || !prev || !next) return <NotFound />

  const creativeWorkJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: loc(project.title, lang),
    description: loc(project.overview, lang),
    dateCreated: project.year,
    url: `${SITE_URL}/work/${project.slug}`,
    creator: {
      '@type': 'Organization',
      name: 'Liquid Glass Studio',
      url: SITE_URL,
    },
  }

  return (
    <>
      <Seo
        title={`${project.client} — ${loc(project.category, lang)}`}
        description={project.seo?.description ?? loc(project.overview, lang)}
        image={project.seo?.ogImage}
        url={`/work/${project.slug}`}
        type="article"
        jsonLd={creativeWorkJsonLd}
      />
      <section className="relative h-[80vh] min-h-[560px] w-full overflow-hidden">
        <VideoBackground
          video={project.hero}
          eager
          overlayClassName="bg-gradient-to-b from-black/40 via-black/20 to-black"
        />
        <div className="relative z-10 flex h-full items-end px-6 pb-16 md:pb-24">
          <Container width="lg">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xs uppercase tracking-[0.2em] text-white/60"
            >
              {project.client} · {loc(project.category, lang)} · {project.year}
            </motion.p>
            <motion.h1
              variants={blurIn}
              initial="hidden"
              animate="show"
              className="mt-6 max-w-4xl font-display text-4xl leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl"
            >
              {loc(project.title, lang)}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg"
            >
              {loc(project.subtitle, lang)}
            </motion.p>
          </Container>
        </div>
      </section>

      <section className="px-6 py-24 md:py-32">
        <Container width="lg">
          <motion.div
            variants={stagger}
            {...inViewProps}
            className="grid grid-cols-1 gap-10 md:grid-cols-12"
          >
            <motion.div variants={fadeRiseSmall} className="md:col-span-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                {t('work.overview_label')}
              </p>
            </motion.div>
            <motion.div variants={fadeRise} className="md:col-span-8">
              <p className="text-lg leading-relaxed text-white/80 md:text-xl">
                {loc(project.overview, lang)}
              </p>
              <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/5 md:grid-cols-4">
                {project.meta.map((m) => (
                  <div key={m.label.en} className="bg-black/40 p-5">
                    <dt className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                      {loc(m.label, lang)}
                    </dt>
                    <dd className="mt-2 text-sm text-white/85">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <section className="space-y-24 px-6 pb-24 md:space-y-32 md:pb-32">
        <Container width="lg" className="space-y-24 md:space-y-32">
          {project.blocks.map((b, i) => renderBlock(b, i))}
        </Container>
      </section>

      {project.outcomes && project.outcomes.length > 0 ? (
        <section className="px-6 pb-24 md:pb-32">
          <Container width="lg">
            <motion.div variants={stagger} {...inViewProps} className="mb-12">
              <motion.p
                variants={fadeRiseSmall}
                className="text-xs uppercase tracking-[0.2em] text-white/40"
              >
                {t('work.outcomes_label')}
              </motion.p>
              <motion.h2
                variants={fadeRise}
                className="mt-4 font-display text-3xl leading-tight tracking-tight text-white md:text-5xl"
              >
                {t('work.what_moved')}
              </motion.h2>
            </motion.div>
            <motion.div
              variants={stagger}
              {...inViewProps}
              className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-white/5 sm:grid-cols-3"
            >
              {project.outcomes.map((o) => (
                <motion.div
                  key={o.label.en}
                  variants={fadeRiseSmall}
                  className="bg-black/40 p-8 text-center md:p-12"
                >
                  <p className="font-display text-4xl tracking-tight text-white md:text-6xl">
                    {o.value}
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/40">
                    {loc(o.label, lang)}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>
      ) : null}

      {project.gallery && project.gallery.length > 0 ? (
        <section className="px-6 pb-24 md:pb-32">
          <Container width="lg">
            <motion.div variants={stagger} {...inViewProps} className="mb-12">
              <motion.p
                variants={fadeRiseSmall}
                className="text-xs uppercase tracking-[0.2em] text-white/40"
              >
                {t('work.gallery_label')}
              </motion.p>
            </motion.div>
            <motion.div
              variants={stagger}
              {...inViewProps}
              className="grid grid-cols-1 gap-6 md:grid-cols-3"
            >
              {project.gallery.map((entry, i) => (
                <motion.div key={`${entry.mp4}-${i}`} variants={fadeRise}>
                  <GlassCard rounded="2xl" className="overflow-hidden">
                    <div className="relative aspect-[4/5]">
                      <video
                        src={entry.mp4}
                        muted
                        autoPlay
                        loop
                        playsInline
                        preload="metadata"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>
      ) : null}

      <section className="border-t border-white/5 px-6 py-24 md:py-32">
        <Container width="lg">
          <motion.div variants={stagger} {...inViewProps} className="mb-12 text-center">
            <motion.p
              variants={fadeRiseSmall}
              className="text-xs uppercase tracking-[0.2em] text-white/40"
            >
              {t('work.keep_reading')}
            </motion.p>
            <motion.h2
              variants={fadeRise}
              className="mt-4 font-display text-3xl leading-tight tracking-tight text-white md:text-5xl"
            >
              {t('work.more_archive')}
            </motion.h2>
          </motion.div>
          <motion.div
            variants={stagger}
            {...inViewProps}
            className="grid grid-cols-1 gap-8 md:grid-cols-2"
          >
            <motion.div variants={fadeRise}>
              <ProjectNavCard project={prev} direction="prev" />
            </motion.div>
            <motion.div variants={fadeRise}>
              <ProjectNavCard project={next} direction="next" />
            </motion.div>
          </motion.div>
          <div className="mt-16 flex justify-center">
            <GlassButton to="/work" variant="ghost" icon={<ArrowUpRight className="h-4 w-4" />}>
              {t('work.all_work')}
            </GlassButton>
          </div>
        </Container>
      </section>
    </>
  )
}
