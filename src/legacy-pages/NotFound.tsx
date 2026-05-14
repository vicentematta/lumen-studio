import { useTranslation } from 'react-i18next'
import { GlassButton } from '@/components/ui/GlassButton'
import { Container } from '@/components/ui/Container'
import { Seo } from '@/components/Seo'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <>
      <Seo title="404 — Page not found" noindex />
    <section className="flex min-h-[70vh] items-center justify-center px-6 py-32">
      <Container width="md" className="text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-white/40">{t('notfound.eyebrow')}</p>
        <h1 className="mt-4 font-display text-5xl text-white md:text-7xl">
          {t('notfound.title_plain')}{' '}
          <em className="italic text-white/60">{t('notfound.title_italic')}</em>.
        </h1>
        <p className="mt-6 text-base text-white/60">{t('notfound.subtitle')}</p>
        <div className="mt-10 flex justify-center gap-3">
          <GlassButton to="/" variant="solid" size="lg">
            {t('notfound.go_home')}
          </GlassButton>
          <GlassButton to="/contact" variant="glass" size="lg">
            {t('notfound.contact_us')}
          </GlassButton>
        </div>
      </Container>
    </section>
    </>
  )
}
