import { APIError, type CollectionConfig } from 'payload'
import { apiKeyStrategy } from '../auth/apiKeyStrategy'
import {
  PASSWORD_POLICY_ERROR_MESSAGE,
  PASSWORD_POLICY_UI_DESCRIPTION,
  validatePasswordComplexity,
} from '../utils/password-policy.util'

const DEFAULT_TOKEN_EXPIRATION_SECONDS = 60 * 60

const parsedTokenExpirationSeconds = Number.parseInt(process.env.PAYLOAD_TOKEN_EXPIRATION_SECONDS ?? '', 10)
const tokenExpirationSeconds =
  Number.isFinite(parsedTokenExpirationSeconds) && parsedTokenExpirationSeconds > 0
    ? parsedTokenExpirationSeconds
    : DEFAULT_TOKEN_EXPIRATION_SECONDS

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Pengguna',
    plural: 'Pengguna',
  },
  admin: {
    useAsTitle: 'email',
    description: `Password policy: ${PASSWORD_POLICY_UI_DESCRIPTION}`,
  },
  auth: {
    tokenExpiration: tokenExpirationSeconds,
    useSessions: true,
    cookies: {
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
    },
    strategies: [apiKeyStrategy],
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        const password = data?.password

        if (typeof password === 'string' && !validatePasswordComplexity(password)) {
          throw new APIError(PASSWORD_POLICY_ERROR_MESSAGE, 400)
        }

        return data
      },
    ],
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
