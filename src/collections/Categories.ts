import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'value'],
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.name) {
          // Capitalize first letter for name
          data.name = data.name.charAt(0).toUpperCase() + data.name.slice(1)
          // Generate lowercase, kebab-case value for database/backend
          data.value = data.name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        }
        return data
      },
    ],
  },
  fields: [
   {
     name: 'name',
     type: 'text',
     required: true,
     unique: true,
     minLength: 1,
     maxLength: 100,
     admin: {
        description: 'Enter category name (max 100 character)',
     },
    },
    {
      name: 'value',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        hidden: true,
        description: 'Auto-generated slug from category name',
      },
    },
  ],
  timestamps: true,
}
