import { addVitePlugin, addWebpackPlugin, defineNuxtModule } from '@nuxt/kit'

import vite from './vite'
import webpack from './webpack'

import type { Options } from './types'

import '@nuxt/schema'

export interface ModuleOptions extends Options {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-unplugin-polish-tagged-templates',
    configKey: 'unpluginStarter',
  },
  defaults: {
    // ...default options
  },
  setup(options, nuxt) {
    addVitePlugin(() => vite(options))
    addWebpackPlugin(() => webpack(options))

    // ...
  },
})
