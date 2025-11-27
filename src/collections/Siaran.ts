import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

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
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      hasMany: false,
      admin: {
        description: 'Select a category for this article',
      },
    },
  ],
  timestamps: true,
  upload: false, 
}
