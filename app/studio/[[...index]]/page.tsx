'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/lib/studio-embedded-config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
