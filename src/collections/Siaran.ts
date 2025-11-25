import type { CollectionConfig } from 'payload'

export const Siaran: CollectionConfig = {
  slug: 'siaran',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
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
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'category',
      type: 'text',
      required: true,
      admin: {
        description: 'Add a category for this article (first letter capital, rest lowercase)',
      },
      validate: (value: string | null | undefined) => {
        if (!value) return true // Allow empty if not required
        const regex = /^[A-Z][a-z]*$/
        if (!regex.test(value)) {
          return 'Category must start with a capital letter followed by lowercase letters only'
        }
        return true
      },
    },
  ],
  timestamps: true,
  upload: false, 
}
