import { createUnplugin } from 'unplugin'
import pathe from 'pathe'

import { IS_DEV, PLUGIN_NAME } from './constants'
import { logger } from './log'
import { transformTags } from './helpers/transform'

import type { UnpluginFactory } from 'unplugin'
import type { Options, PolishTag } from './types'

export const unpluginFactory: UnpluginFactory<Options | undefined> = (
  options,
) => {
  const {
    extensions: moreExtensions = [],
    clsTags = [],
    polishTags = [] as PolishTag[],
    debug = false,
  } = options || {}

  const processTags = [...clsTags, ...polishTags.map((item) => item.tag)]

  if (debug) {
    logger.level = 4
  }

  return {
    name: PLUGIN_NAME,
    /** In next.js without the config, the plugin can not transform origin source code */
    enforce: 'pre',
    transformInclude(id) {
      /** Transform only in non-development env */
      if (IS_DEV) {
        return false
      }
      const extensions = ['ts', 'tsx', 'js', 'jsx', ...moreExtensions]
      return extensions.some((item) => id.endsWith(`.${item}`))
    },
    transform(code, id) {
      if (pathe.normalize(id).includes('node_modules')) {
        return
      }
      try {
        const polishCode = transformTags(code, {
          clsTags,
          polishTags,
          beforeTransform: () => {
            logger.debug('Transform', pathe.normalize(id))
          },
        })

        return polishCode
      } catch (err) {
        logger.debug('polish failed with', pathe.normalize(id))
      }
    },
  }
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
