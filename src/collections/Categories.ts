import { APIError, type CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Kategori',
    plural: 'Kategori',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'value'],
  },
  hooks: {
    beforeChange: [
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
    beforeDelete: [
      async ({ id, req }) => {
        const [siaranUsage, takwimUsage] = await Promise.all([
          req.payload.find({
            collection: 'siaran',
            where: {
              category: {
                equals: id,
              },
            },
            limit: 1,
            depth: 0,
          }),
          req.payload.find({
            collection: 'takwim',
            where: {
              category: {
                equals: id,
              },
            },
            limit: 1,
            depth: 0,
          }),
        ])

        if (siaranUsage.totalDocs > 0 || takwimUsage.totalDocs > 0) {
          throw new APIError('This category is still being used and cannot be deleted.', 400)
        }
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
      maxLength: 50,
      admin: {
        description: 'Enter category name (max 50 characters)',
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
    {
      name: 'colors',
      type: 'select',
      required: false,
      defaultValue: '#2563EB',
      validate: (value: unknown) => {
        if (!value || typeof value !== 'string') return true
        return /^#[0-9A-Fa-f]{6}$/.test(value)
          ? true
          : 'Color must be a valid hex color code of the form #RRGGBB (e.g., #2563EB).'
      },
      options: [
        {
          label: 'Green',
          value: '#10B981',
        },
        {
          label: 'Blue',
          value: '#2563EB',
        },
      ],
      admin: {
        description: 'Insert hex color code (e.g., #2563EB)',
      },
    },
  ],
  timestamps: true,
}
