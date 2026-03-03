import type { CollectionConfig } from 'payload'

export const ArticlesMedia: CollectionConfig = {
  slug: 'articles-media',
  labels: {
    singular: 'Media Artikel',
    plural: 'Media Artikel',
  },
  access: {
    read: () => true,
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
