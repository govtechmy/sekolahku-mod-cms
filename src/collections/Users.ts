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
