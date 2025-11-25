// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { PayloadRequest } from 'payload'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Siaran } from './collections/Siaran'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const API_KEY = process.env.PAYLOAD_API_KEY;

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Siaran],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
  // ============== THIS IS EXAMPLE FOR PUBLIC ROUTE WITH API KEY PROTECTION USING PYLOAD ==============
  // endpoints: [
  //   {
  //     path: "/my-secure-route",
  //     method: "get",
  //     handler: async (req: PayloadRequest, res) => {
  //       if (req.headers['x-api-key'] !== API_KEY) {
  //         return res.status(401).json({ error: "Invalid API key" });
  //       }

  //       return res.json({ ok: true });
  //     },
  //   },
  // ],
})
