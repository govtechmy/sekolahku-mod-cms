import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { resolveEnvFromSecretsManager } from './config/env.config'

await resolveEnvFromSecretsManager()

import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { ArticlesMedia } from './collections/ArticlesMedia'
import { Takwim } from './collections/Takwim'
import { Siaran } from './collections/Siaran'
import { Categories } from './collections/Categories'

import { s3Storage } from '@payloadcms/storage-s3'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    dateFormat: 'dd/MM/yyyy',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, ArticlesMedia, Takwim, Siaran, Categories],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET ?? '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI ?? '',
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: { media: true, 'articles-media': true },
      bucket: process.env.S3_BUCKET_NAME ?? '',
      config: {},
    }),
  ],
})
