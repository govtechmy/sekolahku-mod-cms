import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { isAuthenticated } from '../auth/apiKeyStrategy'

export const Siaran: CollectionConfig = {
  slug: 'siaran',
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
        description: 'The title of the article',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'articles-media',
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
        description: 'Additional images files attached to the article',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'articles-media',
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
      editor: lexicalEditor(),
      admin: {
        description: 'Main content of the article',
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
