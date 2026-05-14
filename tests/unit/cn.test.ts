import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/cn'

describe('cn', () => {
  it('joins truthy strings with a space', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c')
  })

  it('filters out false values', () => {
    expect(cn('a', false, 'b')).toBe('a b')
  })

  it('filters out null values', () => {
    expect(cn('a', null, 'b')).toBe('a b')
  })

  it('filters out undefined values', () => {
    expect(cn('a', undefined, 'b')).toBe('a b')
  })

  it('filters all falsy types together', () => {
    expect(cn('x', false, null, undefined, 'y')).toBe('x y')
  })

  it('returns empty string when all args are falsy', () => {
    expect(cn(false, null, undefined)).toBe('')
  })

  it('returns empty string with no arguments', () => {
    expect(cn()).toBe('')
  })

  it('returns single class unchanged', () => {
    expect(cn('foo')).toBe('foo')
  })

  it('handles multi-word class strings', () => {
    expect(cn('text-sm font-bold', 'text-white')).toBe('text-sm font-bold text-white')
  })

  it('conditional class: applies when condition is true', () => {
    const active = true
    expect(cn('base', active && 'active')).toBe('base active')
  })

  it('conditional class: omits when condition is false', () => {
    const active = false
    expect(cn('base', active && 'active')).toBe('base')
  })
})
