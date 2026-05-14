import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { api } from '@/lib/api'
import type { ApiResponse } from '@/lib/api'

describe('api', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('api.login resolves with success:true after delay', async () => {
    const promise = api.login({ email: 'user@example.com', password: 'password123' })
    vi.advanceTimersByTime(800)
    const result: ApiResponse<{ token: string }> = await promise
    expect(result.success).toBe(true)
    expect(result.error).toBeNull()
  })

  it('api.signup resolves with success:true after delay', async () => {
    const promise = api.signup({ name: 'Bob', email: 'bob@example.com', password: 'password123' })
    vi.advanceTimersByTime(800)
    const result = await promise
    expect(result.success).toBe(true)
    expect(result.error).toBeNull()
  })

  it('api.contact resolves with success:true after delay', async () => {
    const promise = api.contact({
      name: 'Alice',
      email: 'alice@example.com',
      message: 'Hello there, this is a test message.',
    })
    vi.advanceTimersByTime(800)
    const result = await promise
    expect(result.success).toBe(true)
    expect(result.data).toBeNull()
  })

  it('api.contact accepts optional company field', async () => {
    const promise = api.contact({
      name: 'Alice',
      email: 'alice@example.com',
      company: 'Acme',
      message: 'Hello there, this is a test message.',
    })
    vi.advanceTimersByTime(800)
    const result = await promise
    expect(result.success).toBe(true)
  })
})
