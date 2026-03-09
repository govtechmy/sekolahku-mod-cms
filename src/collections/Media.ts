import type { CollectionConfig } from 'payload'
import { APIError } from 'payload'

const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Media',
  },
  admin: {
    description: 'Maximum file size: 50MB',
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        const fileSize = data?.filesize

        if (typeof fileSize === 'number' && fileSize > MAX_FILE_SIZE_BYTES) {
          throw new APIError('File size exceeds 50MB. Please upload a smaller file.', 400)
        }

        return data
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
