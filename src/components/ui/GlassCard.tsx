import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'glass' | 'glass-strong'
type Rounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'

interface Props extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant
  rounded?: Rounded
}

const radius: Record<Rounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
}

export function GlassCard({ variant = 'glass', rounded = 'lg', className, ...rest }: Props) {
  return (
    <div
      className={cn(
        variant === 'glass-strong' ? 'liquid-glass-strong' : 'liquid-glass',
        radius[rounded],
        className,
      )}
      {...rest}
    />
  )
}
