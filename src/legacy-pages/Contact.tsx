import { useReducer, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import type { ZodIssue } from 'zod'
import { PageHero } from '@/components/PageHero'
import { Container } from '@/components/ui/Container'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlassButton } from '@/components/ui/GlassButton'
import { fadeRise, inViewProps } from '@/lib/motion'
import { ContactSchema } from '@/lib/validation'
import { api } from '@/lib/api'
import { trackEvent } from '@/lib/analytics'
import { Seo } from '@/components/Seo'
import { stegaClean } from '@sanity/client/stega'
import { useContactPage } from '@/hooks/useContactPage'

type Status = 'idle' | 'loading' | 'success' | 'error'
interface FormStatus { status: Status; errors: ZodIssue[]; submittedName: string; submittedEmail: string }
type Action = { type: 'submit' } | { type: 'success'; name: string; email: string } | { type: 'error'; errors: ZodIssue[] } | { type: 'api_error' }

function reducer(state: FormStatus, action: Action): FormStatus {
  switch (action.type) {
    case 'submit': return { ...state, status: 'loading', errors: [] }
    case 'success': return { status: 'success', errors: [], submittedName: action.name, submittedEmail: action.email }
    case 'error': return { ...state, status: 'idle', errors: action.errors }
    case 'api_error': return { ...state, status: 'error', errors: [] }
    default: return state
  }
}

const INITIAL: FormStatus = { status: 'idle', errors: [], submittedName: '', submittedEmail: '' }
const BUDGETS = ['<$10k', '$10k–$25k', '$25k–$75k', '$75k+']

function fieldError(errors: ZodIssue[], path: string): string | undefined {
  return errors.find((e) => e.path[0] === path)?.message
}

export default function Contact() {
  const [{ status, errors, submittedName, submittedEmail }, dispatch] = useReducer(reducer, INITIAL)
  const [budget, setBudget] = useState('')
  const { content } = useContactPage()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    if (fd.get('_hp')) return
    const raw = { name: fd.get('name') as string, email: fd.get('email') as string, company: (fd.get('company') as string) || undefined, message: fd.get('message') as string }
    const result = ContactSchema.safeParse(raw)
    if (!result.success) { dispatch({ type: 'error', errors: result.error.issues }); return }
    dispatch({ type: 'submit' })
    try {
      await api.contact({ ...result.data, company: result.data.company })
      dispatch({ type: 'success', name: result.data.name, email: result.data.email })
      trackEvent({ name: 'form_submitted', form_id: 'contact', budget: budget || undefined })
    } catch { dispatch({ type: 'api_error' }) }
  }

  return (
    <>
      <Seo title="Contact" description={stegaClean(content.subtitle)} url="/contact" />
      <PageHero
        eyebrow={content.eyebrow}
        title={<>{content.titlePlain} <em className="italic text-white/60">{content.titleItalic}</em>.</>}
        subtitle={content.subtitle}
      />
      <section className="px-6 pb-32 md:pb-44">
        <Container width="md">
          <motion.div variants={fadeRise} {...inViewProps}>
            <GlassCard rounded="3xl" className="p-8 md:p-12">
              {status === 'success' ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <span className="liquid-glass mb-6 flex h-14 w-14 items-center justify-center rounded-full text-white">
                    <CheckCircle2 className="h-6 w-6" />
                  </span>
                  <h3 className="font-display text-3xl text-white md:text-4xl">
                    {content.successTitle} {submittedName.split(' ')[0] || ''}
                  </h3>
                  <p className="mt-4 max-w-md text-sm text-white/60">
                    {content.successBody} <span className="text-white">{submittedEmail}</span>.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <input type="text" name="_hp" tabIndex={-1} aria-hidden="true" style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }} />
                  {status === 'error' && (
                    <div className="md:col-span-2">
                      <p className="rounded-xl bg-red-500/10 px-4 py-3 text-xs text-red-400/80">Something went wrong. Please try again.</p>
                    </div>
                  )}
                  <Field label={content.fieldName} required error={fieldError(errors, 'name')}>
                    <input type="text" name="name" autoComplete="name" className="input-glass" />
                  </Field>
                  <Field label={content.fieldEmail} required error={fieldError(errors, 'email')}>
                    <input type="email" name="email" autoComplete="email" className="input-glass" />
                  </Field>
                  <Field label={content.fieldCompany} className="md:col-span-2" error={fieldError(errors, 'company')}>
                    <input type="text" name="company" autoComplete="organization" className="input-glass" />
                  </Field>
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <span className="text-xs uppercase tracking-[0.2em] text-white/40">{content.fieldBudget}</span>
                    <div className="flex flex-wrap gap-2">
                      {BUDGETS.map((b) => {
                        const active = budget === b
                        return (
                          <GlassButton key={b} type="button" variant={active ? 'solid' : 'glass'} size="sm" onClick={() => setBudget(active ? '' : b)}>{b}</GlassButton>
                        )
                      })}
                    </div>
                  </div>
                  <Field label={content.fieldMessage} className="md:col-span-2" error={fieldError(errors, 'message')}>
                    <textarea name="message" rows={5} className="input-glass resize-none" />
                  </Field>
                  <div className="md:col-span-2 mt-2 flex items-center justify-between gap-4">
                    <p className="text-xs text-white/40">{content.respondNote}</p>
                    <GlassButton type="submit" variant="solid" size="md" disabled={status === 'loading'} icon={<ArrowRight className="h-4 w-4" />}>
                      {status === 'loading' ? 'Sending…' : content.sendBtn}
                    </GlassButton>
                  </div>
                </form>
              )}
            </GlassCard>
          </motion.div>
        </Container>
      </section>
    </>
  )
}

function Field({ label, required, children, className, error }: { label: string; required?: boolean; children: React.ReactNode; className?: string; error?: string }) {
  return (
    <div className={className}>
      <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/40">
        {label}{required && <span className="ml-1 text-white/30">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-400/80">{error}</p>}
    </div>
  )
}
