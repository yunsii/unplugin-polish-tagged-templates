import { createUnplugin } from 'unplugin'
import pathe from 'pathe'

import { IS_DEV, PLUGIN_NAME } from './constants'
import { logger } from './log'
import { transformTags } from './helpers/transform'

import type { UnpluginFactory } from 'unplugin'
import type { Options } from './types'

export const unpluginFactory: UnpluginFactory<Options | undefined> = (
  options,
) => {
  const {
    extensions: moreExtensions = [],
    clsTags = [],
    polishTags = [],
    debug = false,
    exclude,
    processor,
  } = options || {}

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
      const normalizedId = pathe.normalize(id)
      if (normalizedId.includes('node_modules')) {
        return false
      }
      if (exclude && exclude(normalizedId)) {
        return false
      }
      const extensions = ['ts', 'tsx', 'js', 'jsx', ...moreExtensions]
      return extensions.some((item) => id.endsWith(`.${item}`))
    },
    transform(code, id) {
      const normalizedId = pathe.normalize(id)
      try {
        const polishResult = transformTags(code, {
          clsTags,
          polishTags,
          beforeTransform: () => {
            logger.debug('Transform', normalizedId)
          },
          processor: processor ? processor(normalizedId) : 'auto',
        })

        if (!polishResult) {
          logger.debug('No transform required', normalizedId)
          return code
        }

        logger.debug('Transformed by', polishResult.type)
        return polishResult.code
      } catch (err) {
        logger.warn('Transform failed', normalizedId)
      }
      return code
    },
  }
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
