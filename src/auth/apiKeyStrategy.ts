import type { Access, AuthStrategy } from 'payload'

/**
 * API Key Authentication Strategy
 *
 * Flow:
 * 1. Extract Authorization header
 * 2. Parse Bearer token
 * 3. Compare with PAYLOAD_API_KEY
 * 4. Return service user if valid, null otherwise
 */
export const apiKeyStrategy: AuthStrategy = {
  name: 'api-key',
  authenticate: async ({ payload, headers }) => {
    const authHeader = headers.get('authorization') ?? ''

    const token =
      typeof authHeader === 'string' && authHeader.startsWith('Bearer ')
        ? authHeader.slice('Bearer '.length)
        : undefined

    if (!token) {
      return { user: null }
    }

    const expectedApiKey = process.env.PAYLOAD_API_KEY

    if (!expectedApiKey) {
      console.error('PAYLOAD_API_KEY not configured in environment variables')
      return { user: null }
    }

    if (token !== expectedApiKey) {
      return { user: null }
    }

    try {
      const serviceUsers = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: 'api-service@system.local',
          },
        },
        limit: 1,
      })

      if (serviceUsers.docs.length > 0) {
        return {
          user: {
            collection: 'users',
            ...serviceUsers.docs[0],
          },
        }
      }

      return { user: null }
    } catch (error) {
      console.error('Error during API key authentication:', error)
      return { user: null }
    }
  },
}

export const isAuthenticated: Access = ({ req: { user } }) => {
  return !!user
}
