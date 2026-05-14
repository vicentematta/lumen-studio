import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeRise, fadeRiseSmall, inViewProps } from '@/lib/motion'
import { cn } from '@/lib/cn'

interface Props {
  eyebrow?: string
  children: ReactNode
  className?: string
  align?: 'left' | 'center'
  size?: 'md' | 'lg' | 'xl'
}

const sizes = {
  md: 'text-3xl md:text-5xl',
  lg: 'text-4xl md:text-6xl lg:text-7xl',
  xl: 'text-5xl md:text-7xl lg:text-8xl',
}

export function SectionHeading({
  eyebrow,
  children,
  className,
  align = 'left',
  size = 'lg',
}: Props) {
  return (
    <div className={cn(align === 'center' ? 'text-center' : 'text-left', className)}>
      {eyebrow ? (
        <motion.p
          variants={fadeRiseSmall}
          {...inViewProps}
          className="mb-5 text-xs uppercase tracking-[0.2em] text-white/40"
        >
          {eyebrow}
        </motion.p>
      ) : null}
      <motion.h2
        variants={fadeRise}
        {...inViewProps}
        className={cn(
          'font-display leading-[1.05] tracking-tight text-white',
          sizes[size],
        )}
      >
        {children}
      </motion.h2>
    </div>
  )
}
