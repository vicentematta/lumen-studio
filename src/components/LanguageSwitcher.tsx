import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/cn'
import { LANG_KEY } from '@/lib/i18n'

const LANGS = ['en', 'es'] as const

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const current = i18n.language === 'es' ? 'es' : 'en'

  const switchTo = (lang: (typeof LANGS)[number]) => {
    void i18n.changeLanguage(lang)
    localStorage.setItem(LANG_KEY, lang)
  }

  return (
    <div className="liquid-glass flex items-center rounded-full p-0.5">
      {LANGS.map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => switchTo(lang)}
          className={cn(
            'rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider transition-all',
            current === lang
              ? 'bg-white/15 text-white'
              : 'text-white/40 hover:text-white/70',
          )}
        >
          {lang}
        </button>
      ))}
    </div>
  )
}
