import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { simplerColorInput } from 'sanity-plugin-simpler-color-input'



export default defineConfig({
  name: 'default',
  title: 'offbeat-website',
  projectId: '1kau33ay',
  dataset: 'production',
  basePath: "/studio",
 plugins: [structureTool(), visionTool(),simplerColorInput()],
  schema: {
    types: schemaTypes,
  },
})
