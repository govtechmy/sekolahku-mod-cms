import { describe, expect, it } from 'vitest'
import {
  PASSWORD_POLICY_ERROR_MESSAGE,
  validatePasswordComplexity,
} from '../../src/utils/password-policy.util'

describe('password complexity policy', () => {
  it('accepts a strong password', () => {
    expect(validatePasswordComplexity('Str0ng!Passw0rd')).toBe(true)
  })

  it('rejects password shorter than 12 characters', () => {
    expect(validatePasswordComplexity('Aa1!short')).toBe(false)
  })

  it('rejects password without uppercase letter', () => {
    expect(validatePasswordComplexity('lowercase12!')).toBe(false)
  })

  it('rejects password without lowercase letter', () => {
    expect(validatePasswordComplexity('UPPERCASE12!')).toBe(false)
  })

  it('rejects password without number', () => {
    expect(validatePasswordComplexity('NoNumber!Pass')).toBe(false)
  })

  it('rejects password without special character', () => {
    expect(validatePasswordComplexity('NoSpecial12Pass')).toBe(false)
  })

  it('rejects password with spaces but no special character', () => {
    expect(validatePasswordComplexity('Password12   ')).toBe(false)
  })

  it('keeps policy message stable', () => {
    expect(PASSWORD_POLICY_ERROR_MESSAGE).toBe(
      'Password must be at least 12 characters long and include uppercase, lowercase, number, and special character.',
    )
  })
})
