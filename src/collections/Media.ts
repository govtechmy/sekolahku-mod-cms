import type { CollectionConfig } from 'payload'
import { APIError } from 'payload'
import { getAltFromFilename } from '../utils/alt.util'

const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024
const ALLOWED_MIME_TYPES = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Media',
  },
  admin: {
    description: 'Accepted formats: PDF, PNG, JPEG, and JPG. Maximum file size: 50MB. Invalid uploads will be rejected automatically.',
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [
      ({ data, operation, req }) => {
        const fileSize = data?.filesize
        const mimeType = typeof req.file?.mimetype === 'string' ? req.file.mimetype.toLowerCase() : undefined

        if (typeof fileSize === 'number' && fileSize > MAX_FILE_SIZE_BYTES) {
          throw new APIError('File size exceeds 50MB. Please upload a smaller file.', 400)
        }

        if (mimeType && !ALLOWED_MIME_TYPES.includes(mimeType)) {
          throw new APIError('Only PDF, PNG, JPEG, and JPG files are allowed.', 400)
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
    mimeTypes: ALLOWED_MIME_TYPES,
  },
}
