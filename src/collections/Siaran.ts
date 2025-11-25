import type { CollectionConfig } from 'payload'

export const Siaran: CollectionConfig = {
  slug: 'siaran',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'articleDate', 'readTime'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'The title of the article',
      },
    },
    {
      name: 'image alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Alternative text for the image (for accessibility)',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Main image for the article',
      },
    },
    {
      name: 'readTime',
      type: 'number',
      required: true,
      admin: {
        description: 'Estimated read time in minutes',
      },
    },
    {
      name: 'articleDate',
      type: 'date',
      required: true,
      admin: {
        description: 'Date of the article',
      },
    },
    {
      name: 'attachments',
      type: 'array',
      required: false,
      admin: {
        description: 'Additional media files attached to the article',
      },
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: false,
          admin: {
            description: 'Upload additional files or images',
          },
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description: 'Main content of the article',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      admin: {
        description: 'Brief description or summary of the article',
      },
    },
    {
      name: 'category',
      type: 'text',
      required: true,
      admin: {
        description: 'Add a category for this article (will be automatically formatted)',
      },
      hooks: {
        beforeChange: [
          ({ value }) => {
            if (typeof value === 'string' && value.length > 0) {
              return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
            }
            return value
          },
        ],
      },
    },
  ],
  timestamps: true,
  upload: false, 
}
