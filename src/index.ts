import { createUnplugin } from 'unplugin'
import $ from 'gogocode'
import pathe from 'pathe'

import { polishCssClass } from './presets'
import { IS_DEV, PLUGIN_NAME } from './constants'
import { logger } from './log'

import type { UnpluginFactory } from 'unplugin'
import type { Options, PolishCallback, PolishTag } from './types'

export const unpluginFactory: UnpluginFactory<Options | undefined> = (
  options,
) => {
  const {
    extensions: moreExtensions = [],
    cssTags = [],
    polishTags = [] as PolishTag[],
    debug = false,
  } = options || {}

  if (debug) {
    logger.level = 4
  }

  const mergedPolishTags = [
    ...cssTags.map((tag) => {
      return {
        tag,
        polish: polishCssClass,
      }
    }),
    ...polishTags,
  ].reduce(
    (prev, current) => {
      return { ...prev, [current.tag]: current.polish }
    },
    {} as { [k: string]: PolishCallback },
  )
  const tags = Object.keys(mergedPolishTags)

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

      // demo ref: https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGAbAZwAMALNPPJAHQgAJaBDAlAMxvqqrhoYHc0WaXiyI0xEfMTIVqdRszZyAJMACMAXx79BwoiAA0IXkgBOAa2TosIFjAlwwSOnBMMIBFqYC2AChZg8NABJCE99RigwcKQoBycCAEpaYHZaHHi4WiVaAF4IsAA6AHMkEvT0VPT3TIIkGBMcNFzaf0CQzwLa+sbUkzQ4erolHy6GtATU+gL-CBQfIklOIiUAfSUCFyWiCbkptAYcEh8fMDg0L3DIdAAPJJyAPmTJ+lowFloTs68CrwY4Q86LgKgQgRTgJFoj1USRSuxe9D6AxMEGe9E0cPoVVqgWBpR8AHIiv18Zcvjt4Zj4kgcZQigS-i4Sa8vj8-gCNiYANoABgAuuSKViai5IEVmqdzqz-iRAVy+QUAG4MPAwNDiCnMyV9KB4A5oABCAE95lQQCoOaLOjrTgTOBB8QlWVBPudco8Jd8Rb4Eo7WmcTD59UhqfsII6AFZISAE2gOzQgbbPdQCqYmYNwHwp2jFNAQNCuM6Z1IAemLtERg1ohrqJloLjcHm8aBQaVQTTIfRo6IM4Gg8AAMm4itY4IaoGgCDgTGBYj2SEwAAqIhz5rAsZUENCGAgwABGADUwEIACpjjDYFxoDDqIA
      const ast = $(code)
      try {
        const findTags = ast.find(
          tags.map((tag) => {
            return `${tag}\`$_$str\``
          }),
        )
        if (findTags.length) {
          logger.debug('Transform', pathe.normalize(id))
          logger.debug('With', findTags.length, 'tag(s)')
        }
        const polishCode = findTags
          .each((node) => {
            if (node.match.str.length > 1) {
              return
            }
            const tag = node.attr('tag.name')

            if (typeof tag !== 'string') {
              return
            }

            const polishCallback = mergedPolishTags[tag]

            if (!polishCallback) {
              return
            }

            const str = node.match.str[0].value
            const polishedStr = polishCallback(str)?.trim()

            node.replaceBy(`"${polishedStr || ''}"`)
          })
          .root()
          .generate()
        return polishCode
      } catch (err) {
        logger.debug('polish failed with', pathe.normalize(id))
      }
    },
  }
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
