import { APIError, type CollectionConfig } from 'payload'
import { apiKeyStrategy } from '../auth/apiKeyStrategy'
import {
  PASSWORD_POLICY_ERROR_MESSAGE,
  PASSWORD_POLICY_UI_DESCRIPTION,
  validatePasswordComplexity,
} from '../utils/password-policy.util'

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
    useSessions: true,
    cookies: {
      sameSite: 'Strict',
      secure: true,
    },
    strategies: [apiKeyStrategy],
    maxLoginAttempts: 5, // Lock account after 5 failed attempts
    lockTime: 15 * 60 * 1000, // Lock account for 15 minutes
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (!data.password) return data // Skip if password unchanged
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
