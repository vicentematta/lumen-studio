import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { sanityServer } from '@/lib/sanity-server'

export const { GET } = defineEnableDraftMode({
  client: sanityServer.withConfig({
    token: process.env.SANITY_API_READ_TOKEN,
  }),
})
