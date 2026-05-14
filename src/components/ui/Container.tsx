import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl'

const widths: Record<ContainerSize, string> = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  /** Preferred prop name per BUILD_PROMPT spec. */
  size?: ContainerSize
  /** Legacy alias — kept for backwards compatibility with existing pages. */
  width?: ContainerSize
}

export function Container({ size, width, className, ...rest }: Props) {
  const resolved = size ?? width ?? 'lg'
  return <div className={cn('mx-auto w-full px-6', widths[resolved], className)} {...rest} />
}
