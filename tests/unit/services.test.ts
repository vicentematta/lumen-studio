import { describe, it, expect } from 'vitest'
import { SERVICES, findService, adjacentServices } from '@/data/services'

describe('SERVICES', () => {
  it('exports a non-empty array', () => {
    expect(Array.isArray(SERVICES)).toBe(true)
    expect(SERVICES.length).toBeGreaterThan(0)
  })

  it('each service has required fields', () => {
    for (const s of SERVICES) {
      expect(s.slug).toBeTruthy()
      expect(s.name).toBeTruthy()
      expect(s.short).toBeTruthy()
      expect(Array.isArray(s.deliverables)).toBe(true)
      expect(Array.isArray(s.process)).toBe(true)
    }
  })

  it('contains the strategy service', () => {
    expect(SERVICES.some((s) => s.slug === 'strategy')).toBe(true)
  })

  it('each process step has a step number, title, and body', () => {
    for (const s of SERVICES) {
      for (const step of s.process) {
        expect(typeof step.step).toBe('number')
        expect(step.title).toBeTruthy()
        expect(step.body).toBeTruthy()
      }
    }
  })
})

describe('findService', () => {
  it('returns the correct service by slug', () => {
    const first = SERVICES[0]
    const found = findService(first.slug)
    expect(found).toBeDefined()
    expect(found?.slug).toBe(first.slug)
  })

  it('returns undefined for an unknown slug', () => {
    expect(findService('does-not-exist')).toBeUndefined()
  })

  it('returns undefined when slug is undefined', () => {
    expect(findService(undefined)).toBeUndefined()
  })

  it('returns undefined for empty string', () => {
    expect(findService('')).toBeUndefined()
  })

  it('can find every service in SERVICES', () => {
    for (const s of SERVICES) {
      expect(findService(s.slug)?.slug).toBe(s.slug)
    }
  })
})

describe('adjacentServices — cyclic wrap', () => {
  it('first service: prev wraps to last', () => {
    const first = SERVICES[0]
    const { prev } = adjacentServices(first.slug)
    expect(prev.slug).toBe(SERVICES[SERVICES.length - 1].slug)
  })

  it('first service: next is second', () => {
    const first = SERVICES[0]
    const { next } = adjacentServices(first.slug)
    expect(next.slug).toBe(SERVICES[1].slug)
  })

  it('last service: next wraps to first', () => {
    const last = SERVICES[SERVICES.length - 1]
    const { next } = adjacentServices(last.slug)
    expect(next.slug).toBe(SERVICES[0].slug)
  })

  it('last service: prev is second-to-last', () => {
    const last = SERVICES[SERVICES.length - 1]
    const { prev } = adjacentServices(last.slug)
    expect(prev.slug).toBe(SERVICES[SERVICES.length - 2].slug)
  })

  it('middle service: prev and next are adjacent items', () => {
    const mid = SERVICES[1]
    const { prev, next } = adjacentServices(mid.slug)
    expect(prev.slug).toBe(SERVICES[0].slug)
    expect(next.slug).toBe(SERVICES[2].slug)
  })
})
