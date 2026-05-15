'use client'

import { usePathname } from 'next/navigation'
import { GlassButton } from '@/components/ui/GlassButton'

interface Props {
  label: string
}

export function WorkCTAButton({ label }: Props) {
  const pathname = usePathname()
  return (
    <GlassButton
      to="/work"
      variant="glass"
      size="lg"
      onClick={
        pathname === '/work'
          ? () => window.scrollTo({ top: 0, behavior: 'smooth' })
          : undefined
      }
    >
      {label}
    </GlassButton>
  )
}
