import { APIError, type CollectionConfig } from 'payload'

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
      ({ data }) => {
        const fileSize = data?.filesize

        if (typeof fileSize === 'number' && fileSize > MAX_FILE_SIZE_BYTES) {
          throw new APIError('File size exceeds 10MB. Please upload a smaller file.', 400)
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
  upload: {
    mimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml'],
  },
}
