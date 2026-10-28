import { describe, expect, it } from 'vitest'
import { GET } from '../../src/app/api/health/route'

describe('health check endpoint', () => {
  it('returns 200 so the ALB and ECS health checks pass', async () => {
    const response = await GET()

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({ status: 'ok' })
  })
})
