import { describe, it, expect } from 'vitest'
import { LoginSchema, SignupSchema, ContactSchema } from '@/lib/validation'

describe('LoginSchema', () => {
  it('accepts valid credentials', () => {
    const result = LoginSchema.safeParse({ email: 'user@example.com', password: 'pass1234' })
    expect(result.success).toBe(true)
  })

  it('rejects invalid email', () => {
    const result = LoginSchema.safeParse({ email: 'not-an-email', password: 'pass1234' })
    expect(result.success).toBe(false)
  })

  it('rejects password shorter than 8 characters', () => {
    const result = LoginSchema.safeParse({ email: 'user@example.com', password: 'short' })
    expect(result.success).toBe(false)
  })

  it('rejects missing email', () => {
    const result = LoginSchema.safeParse({ password: 'pass1234' })
    expect(result.success).toBe(false)
  })

  it('rejects missing password', () => {
    const result = LoginSchema.safeParse({ email: 'user@example.com' })
    expect(result.success).toBe(false)
  })

  it('accepts password of exactly 8 characters', () => {
    const result = LoginSchema.safeParse({ email: 'user@example.com', password: 'eightchr' })
    expect(result.success).toBe(true)
  })
})

describe('SignupSchema', () => {
  // password must be min 12 chars, have uppercase, have a number
  const valid = { name: 'Jane Doe', email: 'jane@example.com', password: 'SecurePass123' }

  it('accepts valid signup data', () => {
    const result = SignupSchema.safeParse(valid)
    expect(result.success).toBe(true)
  })

  it('rejects empty name', () => {
    const result = SignupSchema.safeParse({ ...valid, name: '' })
    expect(result.success).toBe(false)
  })

  it('rejects invalid email', () => {
    const result = SignupSchema.safeParse({ ...valid, email: 'bad-email' })
    expect(result.success).toBe(false)
  })

  it('rejects password shorter than 12 characters', () => {
    const result = SignupSchema.safeParse({ ...valid, password: 'Short1' })
    expect(result.success).toBe(false)
  })

  it('rejects password without uppercase letter', () => {
    const result = SignupSchema.safeParse({ ...valid, password: 'nouppercase1' })
    expect(result.success).toBe(false)
  })

  it('rejects password without a number', () => {
    const result = SignupSchema.safeParse({ ...valid, password: 'NoNumberHere' })
    expect(result.success).toBe(false)
  })

  it('accepts password with uppercase and number', () => {
    const result = SignupSchema.safeParse({ ...valid, password: 'ValidPassword1' })
    expect(result.success).toBe(true)
  })
})

describe('ContactSchema', () => {
  const valid = {
    name: 'Alice',
    email: 'alice@example.com',
    message: 'This message is definitely longer than twenty characters.',
  }

  it('accepts valid contact data', () => {
    expect(ContactSchema.safeParse(valid).success).toBe(true)
  })

  it('accepts valid data with optional company', () => {
    expect(ContactSchema.safeParse({ ...valid, company: 'Acme Corp' }).success).toBe(true)
  })

  it('accepts valid data without company (optional)', () => {
    const { company: _, ...noCompany } = { ...valid, company: undefined }
    expect(ContactSchema.safeParse(noCompany).success).toBe(true)
  })

  it('rejects empty name', () => {
    expect(ContactSchema.safeParse({ ...valid, name: '' }).success).toBe(false)
  })

  it('rejects invalid email', () => {
    expect(ContactSchema.safeParse({ ...valid, email: 'not-email' }).success).toBe(false)
  })

  it('rejects message shorter than 20 characters', () => {
    expect(ContactSchema.safeParse({ ...valid, message: 'Too short' }).success).toBe(false)
  })

  it('accepts message of exactly 20 characters', () => {
    expect(ContactSchema.safeParse({ ...valid, message: 'Exactly twenty chars' }).success).toBe(true)
  })
})
