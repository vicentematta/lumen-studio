import { useReducer, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { ZodIssue } from 'zod'
import { VideoBackground } from '@/components/ui/VideoBackground'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlassButton } from '@/components/ui/GlassButton'
import { blurIn } from '@/lib/motion'
import { VIDEOS } from '@/lib/media'
import { LoginSchema, SignupSchema } from '@/lib/validation'
import { api } from '@/lib/api'
import { Seo } from '@/components/Seo'

interface Props {
  mode: 'login' | 'signup'
}

type Status = 'idle' | 'loading' | 'success' | 'error'

interface FormState {
  status: Status
  errors: ZodIssue[]
}

type Action =
  | { type: 'submit' }
  | { type: 'success' }
  | { type: 'error'; errors: ZodIssue[] }
  | { type: 'api_error' }

function reducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case 'submit':
      return { status: 'loading', errors: [] }
    case 'success':
      return { status: 'success', errors: [] }
    case 'error':
      return { status: 'idle', errors: action.errors }
    case 'api_error':
      return { status: 'error', errors: [] }
    default:
      return state
  }
}

function fieldError(errors: ZodIssue[], path: string): string | undefined {
  return errors.find((e) => e.path[0] === path)?.message
}

export default function Auth({ mode }: Props) {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [{ status, errors }, dispatch] = useReducer(reducer, {
    status: 'idle',
    errors: [],
  })

  const isSignup = mode === 'signup'
  const { t } = useTranslation()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const raw = {
      name: fd.get('name') as string,
      email: fd.get('email') as string,
      password: fd.get('password') as string,
    }

    const schema = isSignup ? SignupSchema : LoginSchema
    const result = schema.safeParse(raw)

    if (!result.success) {
      dispatch({ type: 'error', errors: result.error.issues })
      return
    }

    dispatch({ type: 'submit' })
    try {
      if (isSignup) {
        await api.signup(result.data as { name: string; email: string; password: string })
      } else {
        await api.login(result.data)
      }
      dispatch({ type: 'success' })
    } catch {
      dispatch({ type: 'api_error' })
    }
  }

  if (status === 'success') {
    return (
      <section className="relative -mt-[88px] flex min-h-screen items-center justify-center overflow-hidden px-6 pt-32 pb-20">
        <VideoBackground
          video={VIDEOS.philosophy}
          position="object-center"
          overlayClassName="bg-gradient-to-b from-black/70 via-black/60 to-black/90"
        />
        <motion.div
          variants={blurIn}
          initial="hidden"
          animate="show"
          className="relative z-10 w-full max-w-md"
        >
          <GlassCard rounded="3xl" variant="glass-strong" className="p-8 md:p-10">
            <div className="flex flex-col items-center py-6 text-center">
              <span className="liquid-glass mb-6 flex h-14 w-14 items-center justify-center rounded-full text-white">
                <CheckCircle2 className="h-6 w-6" />
              </span>
              <h2 className="font-display text-3xl text-white md:text-4xl">
                {isSignup ? "You're in." : 'Welcome back.'}
              </h2>
              <p className="mt-4 text-sm text-white/60">
                {isSignup
                  ? 'Your account has been created.'
                  : "You've been logged in successfully."}
              </p>
              <GlassButton
                variant="solid"
                size="md"
                className="mt-8"
                onClick={() => navigate('/')}
                icon={<ArrowRight className="h-4 w-4" />}
              >
                {t('notfound.go_home')}
              </GlassButton>
            </div>
          </GlassCard>
        </motion.div>
      </section>
    )
  }

  return (
    <>
      <Seo
        title={isSignup ? 'Create account' : 'Sign in'}
        description={isSignup ? 'Crea tu cuenta Riverhaus.' : 'Ingresa a tu cuenta Riverhaus.'}
        url={isSignup ? '/signup' : '/login'}
        noindex
      />
    <section className="relative -mt-[88px] flex min-h-screen items-center justify-center overflow-hidden px-6 pt-32 pb-20">
      <VideoBackground
        video={VIDEOS.philosophy}
        position="object-center"
        overlayClassName="bg-gradient-to-b from-black/70 via-black/60 to-black/90"
      />

      <motion.div
        variants={blurIn}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-md"
      >
        <GlassCard rounded="3xl" variant="glass-strong" className="p-8 md:p-10">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">
            {isSignup ? 'Get started' : 'Welcome back'}
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-white md:text-5xl">
            {isSignup ? (
              <>
                {t('auth.signup_title_plain')}{' '}
                <em className="italic text-white/60">{t('auth.signup_title_italic')}</em>.
              </>
            ) : (
              <>
                {t('auth.login_title_plain')}{' '}
                <em className="italic text-white/60">{t('auth.login_title_italic')}</em>.
              </>
            )}
          </h1>

          {status === 'error' && (
            <p className="mt-4 rounded-xl bg-red-500/10 px-4 py-3 text-xs text-red-400/80">
              Something went wrong. Please try again.
            </p>
          )}

          <form onSubmit={onSubmit} noValidate className="mt-8 flex flex-col gap-4">
            {isSignup && (
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs uppercase tracking-[0.2em] text-white/40">
                  {t('auth.field_name')}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue=""
                  autoComplete="name"
                  className="input-glass"
                />
                {fieldError(errors, 'name') && (
                  <p className="text-xs text-red-400/80">{fieldError(errors, 'name')}</p>
                )}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs uppercase tracking-[0.2em] text-white/40">
                {t('auth.field_email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={params.get('email') ?? ''}
                autoComplete="email"
                className="input-glass"
              />
              {fieldError(errors, 'email') && (
                <p className="text-xs text-red-400/80">{fieldError(errors, 'email')}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-xs uppercase tracking-[0.2em] text-white/40"
              >
                {t('auth.field_password')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                defaultValue=""
                autoComplete={isSignup ? 'new-password' : 'current-password'}
                className="input-glass"
              />
              {fieldError(errors, 'password') && (
                <p className="text-xs text-red-400/80">{fieldError(errors, 'password')}</p>
              )}
            </div>

            <GlassButton
              type="submit"
              variant="solid"
              size="md"
              className="mt-2 w-full"
              icon={<ArrowRight className="h-4 w-4" />}
              disabled={status === 'loading'}
            >
              {status === 'loading'
                ? 'Please wait…'
                : isSignup
                  ? t('auth.btn_signup')
                  : t('auth.btn_login')}
            </GlassButton>
          </form>

          <p className="mt-6 text-center text-xs text-white/50">
            {isSignup ? (
              <>
                {t('auth.already_account')}{' '}
                <Link to="/login" className="text-white hover:underline">
                  {t('auth.link_login')}
                </Link>
              </>
            ) : (
              <>
                {t('auth.new_here')}{' '}
                <Link to="/signup" className="text-white hover:underline">
                  {t('auth.link_signup')}
                </Link>
              </>
            )}
          </p>
        </GlassCard>
      </motion.div>
    </section>
    </>
  )
}
