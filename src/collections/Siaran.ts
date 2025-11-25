import type { CollectionConfig } from 'payload'

export const Siaran: CollectionConfig = {
  slug: 'siaran',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        required: true,
      },
      {
        name: 'description',
        type: 'richText',
        required: true,
      },
      {
        name: 'tags',
        type: 'select',
        options: [
          {
            label: 'Pengumuman',
            value: 'pengumuman',
          },
          {
            label: 'Berita',
            value: 'berita',
          },
        ],
      },
  ],
  timestamps: true,
  upload: false, 
}
