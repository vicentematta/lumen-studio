import { forwardRef } from 'react'
import type { ReactNode, MouseEventHandler } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

type Variant = 'glass' | 'glass-strong' | 'solid' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  glass: 'liquid-glass text-white hover:bg-white/[0.04]',
  'glass-strong': 'liquid-glass-strong text-white hover:bg-white/[0.06]',
  solid: 'bg-white text-black hover:bg-white/90',
  ghost: 'text-white/80 hover:text-white',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-1.5 text-xs',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3 text-sm',
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 ease-glass focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40'

interface CommonProps {
  variant?: Variant
  size?: Size
  pill?: boolean
  className?: string
  children: ReactNode
  icon?: ReactNode
  onClick?: MouseEventHandler<HTMLElement>
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  'aria-label'?: string
}

interface AsLink extends CommonProps {
  to: string
  href?: never
}
interface AsAnchor extends CommonProps {
  href: string
  to?: never
}
interface AsButton extends CommonProps {
  to?: undefined
  href?: undefined
}

type Props = AsLink | AsAnchor | AsButton

export const GlassButton = forwardRef<HTMLElement, Props>(function GlassButton(props, ref) {
  const {
    variant = 'glass',
    size = 'md',
    pill = true,
    className,
    children,
    icon,
    onClick,
    type,
    disabled,
    'aria-label': ariaLabel,
  } = props as CommonProps & { to?: string; href?: string }

  const classes = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    pill ? 'rounded-full' : 'rounded-2xl',
    className,
  )

  const inner = (
    <>
      <span>{children}</span>
      {icon ? <span className="inline-flex">{icon}</span> : null}
    </>
  )

  if ('to' in props && props.to !== undefined) {
    return (
      <motion.span
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex"
      >
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          to={props.to}
          className={classes}
          onClick={onClick as MouseEventHandler<HTMLAnchorElement> | undefined}
          aria-label={ariaLabel}
        >
          {inner}
        </Link>
      </motion.span>
    )
  }

  if ('href' in props && props.href !== undefined) {
    return (
      <motion.span
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex"
      >
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={props.href}
          className={classes}
          onClick={onClick as MouseEventHandler<HTMLAnchorElement> | undefined}
          aria-label={ariaLabel}
        >
          {inner}
        </a>
      </motion.span>
    )
  }

  return (
    <motion.span
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex"
    >
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type ?? 'button'}
        disabled={disabled}
        onClick={onClick as MouseEventHandler<HTMLButtonElement> | undefined}
        aria-label={ariaLabel}
        className={classes}
      >
        {inner}
      </button>
    </motion.span>
  )
})
