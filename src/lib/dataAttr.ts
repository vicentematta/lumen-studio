import { createDataAttribute } from '@sanity/visual-editing/create-data-attribute'

export function homeAttr(id: string, path: string): string {
  return createDataAttribute({ id, type: 'homePage', path }).toString()
}

export function serviceAttr(id: string, path: string): string {
  return createDataAttribute({ id, type: 'service', path }).toString()
}

export function projectAttr(id: string, path: string): string {
  return createDataAttribute({ id, type: 'project', path }).toString()
}
