import { afterEach, describe, expect, it } from 'vitest'
import { isLogoutOnCloseEnabled } from '../../src/utils/logout-on-close.util'

const ENV_KEY = 'PAYLOAD_LOGOUT_ON_CLOSE'

afterEach(() => {
  delete process.env[ENV_KEY]
})

describe('logout-on-close flag', () => {
  it('is disabled when the env var is unset', () => {
    delete process.env[ENV_KEY]
    expect(isLogoutOnCloseEnabled()).toBe(false)
  })

  it('is disabled when explicitly set to "false"', () => {
    process.env[ENV_KEY] = 'false'
    expect(isLogoutOnCloseEnabled()).toBe(false)
  })

  it('is enabled only when explicitly set to "true"', () => {
    process.env[ENV_KEY] = 'true'
    expect(isLogoutOnCloseEnabled()).toBe(true)
  })

  it('does not treat other truthy-looking values as enabled', () => {
    for (const value of ['1', 'yes', 'TRUE', 'on', '']) {
      process.env[ENV_KEY] = value
      expect(isLogoutOnCloseEnabled()).toBe(false)
    }
  })

  it('reads the env var at call time, not module load', () => {
    delete process.env[ENV_KEY]
    expect(isLogoutOnCloseEnabled()).toBe(false)

    process.env[ENV_KEY] = 'true'
    expect(isLogoutOnCloseEnabled()).toBe(true)
  })
})
