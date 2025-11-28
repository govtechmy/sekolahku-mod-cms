import type { Access, AuthStrategy } from 'payload'
import { timingSafeEqual } from 'crypto'

/**
 * API Key Authentication Strategy
 *
 * Flow:
 * 1. Extract X-API-Key header
 * 2. Compare with PAYLOAD_API_KEY using constant-time comparison
 * 3. Return service user if valid, null otherwise
 */
export const apiKeyStrategy: AuthStrategy = {
  name: 'api-key',
  authenticate: async ({ payload, headers }) => {
    const apiKey = headers.get('x-api-key') ?? ''

    if (!apiKey) {
      return { user: null }
    }

    const expectedApiKey = process.env.PAYLOAD_API_KEY

    if (!expectedApiKey) {
      console.error('PAYLOAD_API_KEY not configured in environment variables. Please set PAYLOAD_API_KEY in your .env file.')
      return { user: null }
    }

    const isValidKey =
      apiKey.length === expectedApiKey.length &&
      timingSafeEqual(Buffer.from(apiKey), Buffer.from(expectedApiKey))

    if (!isValidKey) {
      console.error('API key authentication failed: Invalid token')
      return { user: null }
    }

    try {
      const serviceUserEmail = process.env.SERVICE_USER_EMAIL
      if (!serviceUserEmail) {
        console.error('SERVICE_USER_EMAIL not configured in environment variables. Please set SERVICE_USER_EMAIL in your .env file.')
        return { user: null }
      }

      const serviceUsers = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: serviceUserEmail,
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
