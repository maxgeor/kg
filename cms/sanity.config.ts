import {defineConfig, isDev} from 'sanity'
import {visionTool} from '@sanity/vision'
import {deskTool} from 'sanity/desk'
import {schemaTypes} from './schemas'
import {getStartedPlugin} from './plugins/sanity-plugin-tutorial'

const devOnlyPlugins = [getStartedPlugin()]

export default defineConfig([
  {
    projectId: 'yjqbprae',
    dataset: 'production',
    basePath: '/production',

    name: 'production',
    title: 'KG Handcrafted (Production)',

    plugins: [deskTool(), visionTool(), ...(isDev ? devOnlyPlugins : [])],

    schema: {
      types: schemaTypes,
    },
  }, {
    projectId: 'yjqbprae',
    dataset: 'development',
    basePath: '/development',

    name: 'development',
    title: 'KG Handcrafted (Development)',
    
    plugins: [deskTool(), visionTool()],

    schema: {
      types: schemaTypes,
    },
  },
])

