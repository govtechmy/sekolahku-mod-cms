import type { CollectionConfig } from 'payload'

export const ArticlesMedia: CollectionConfig = {
  slug: 'articles-media',
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
    mimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif', 'image/svg+xml'],
  },
}
