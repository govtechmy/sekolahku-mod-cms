import { APIError, type CollectionConfig } from 'payload'
import { getAltFromFilename } from '../utils/alt.util'

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024

export const ArticlesMedia: CollectionConfig = {
  slug: 'articles-media',
  labels: {
    singular: 'Media Artikel',
    plural: 'Media Artikel',
  },
  admin: {
    description: 'Maximum file size: 10MB',
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [
      ({ data, operation, req }) => {
        const fileSize = data?.filesize

        if (typeof fileSize === 'number' && fileSize > MAX_FILE_SIZE_BYTES) {
          throw new APIError('File size exceeds 10MB. Please upload a smaller file.', 400)
        }

        const originalFilename =
          typeof req.file?.name === 'string'
            ? req.file.name
            : operation === 'create' && typeof data?.filename === 'string'
              ? data.filename
              : undefined

        if (originalFilename) {
          data.alt = getAltFromFilename(originalFilename)
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
      admin: {
        hidden: true,
      },
    },
  ],
  upload: {
    mimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml'],
  },
}
