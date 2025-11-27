import type { CollectionConfig } from 'payload'
import { isAuthenticated } from '../auth/apiKeyStrategy'

export const Acara: CollectionConfig = {
  slug: 'acara',
  access: {
    read: isAuthenticated,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
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
        description: 'The title of the event',
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
        description: 'Main image for the event',
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
        description: 'Date of the event',
      },
    },
    {
      name: 'attachments',
      type: 'array',
      required: false,
      admin: {
        description: 'Additional media files attached to the event',
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
        description: 'Main content of the event',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      admin: {
        description: 'Brief description or summary of the event',
      },
    },
    {
      name: 'category',
      type: 'text',
      required: true,
      admin: {
        description: 'Add a category for this event (will be automatically formatted)',
      },
      hooks: {
        beforeChange: [
          ({ value }) => {
            if (typeof value === 'string' && value.length > 0) {
              // Convert to title case: capitalize first letter of each word
              return value
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ')
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
