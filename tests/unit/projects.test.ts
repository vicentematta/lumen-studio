import { describe, it, expect } from 'vitest'
import { PROJECTS, findProject, adjacentProjects } from '@/data/projects'

describe('PROJECTS', () => {
  it('exports a non-empty array', () => {
    expect(Array.isArray(PROJECTS)).toBe(true)
    expect(PROJECTS.length).toBeGreaterThan(0)
  })

  it('each project has required fields', () => {
    for (const p of PROJECTS) {
      expect(p.slug).toBeTruthy()
      expect(p.client).toBeTruthy()
      expect(p.title).toBeTruthy()
      expect(Array.isArray(p.blocks)).toBe(true)
    }
  })

  it('contains the asme project', () => {
    expect(PROJECTS.some((p) => p.slug === 'asme')).toBe(true)
  })
})

describe('findProject', () => {
  it('returns the correct project by slug', () => {
    const p = findProject('asme')
    expect(p).toBeDefined()
    expect(p?.slug).toBe('asme')
  })

  it('returns undefined for an unknown slug', () => {
    expect(findProject('does-not-exist')).toBeUndefined()
  })

  it('returns undefined when slug is undefined', () => {
    expect(findProject(undefined)).toBeUndefined()
  })

  it('returns undefined for empty string', () => {
    expect(findProject('')).toBeUndefined()
  })

  it('can find every project in PROJECTS', () => {
    for (const p of PROJECTS) {
      expect(findProject(p.slug)?.slug).toBe(p.slug)
    }
  })
})

describe('adjacentProjects — cyclic wrap', () => {
  it('returns prev and next for a middle project', () => {
    const mid = PROJECTS[1]
    const { prev, next } = adjacentProjects(mid.slug)
    expect(prev.slug).toBe(PROJECTS[0].slug)
    expect(next.slug).toBe(PROJECTS[2].slug)
  })

  it('first project: prev wraps to last', () => {
    const first = PROJECTS[0]
    const { prev } = adjacentProjects(first.slug)
    expect(prev.slug).toBe(PROJECTS[PROJECTS.length - 1].slug)
  })

  it('first project: next is second', () => {
    const first = PROJECTS[0]
    const { next } = adjacentProjects(first.slug)
    expect(next.slug).toBe(PROJECTS[1].slug)
  })

  it('last project: next wraps to first', () => {
    const last = PROJECTS[PROJECTS.length - 1]
    const { next } = adjacentProjects(last.slug)
    expect(next.slug).toBe(PROJECTS[0].slug)
  })

  it('last project: prev is second-to-last', () => {
    const last = PROJECTS[PROJECTS.length - 1]
    const { prev } = adjacentProjects(last.slug)
    expect(prev.slug).toBe(PROJECTS[PROJECTS.length - 2].slug)
  })

  it('returned projects are valid Project objects', () => {
    const { prev, next } = adjacentProjects(PROJECTS[0].slug)
    expect(prev.slug).toBeTruthy()
    expect(next.slug).toBeTruthy()
  })
})
