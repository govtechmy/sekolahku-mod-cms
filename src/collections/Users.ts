import type { CollectionConfig } from 'payload'
import { apiKeyStrategy } from '../auth/apiKeyStrategy'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Pengguna',
    plural: 'Pengguna',
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    strategies: [apiKeyStrategy],
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
