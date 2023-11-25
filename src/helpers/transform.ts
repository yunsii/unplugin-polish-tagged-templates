import $ from 'gogocode'

import { logger } from '../log'
import { polishClsString } from '../presets'

import type { PolishCallback, PolishTag } from '../types'

export interface ITransformOptions {
  clsTags?: string[]
  polishTags?: PolishTag[]
  beforeTransform?: () => void
}

export function transformTags(code: string, options: ITransformOptions = {}) {
  const { clsTags = [], polishTags = [], beforeTransform } = options

  const mergedPolishTags = [
    ...clsTags.map((tag) => {
      return {
        tag,
        polish: polishClsString,
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

  // demo ref: https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGAbAZwAMALNPPJAHQgAJaBDAlAMxvqqrhoYHc0WaXiyI0xEfMTIVqdRszZyAJMACMAXx79BwoiAA0IXkgBOAa2TosIFjAlwwSOnBMMIBFqYC2AChZg8NABJCE99RigwcKQoBycCAEpaYHZaHHi4WiVaAF4IsAA6AHMkEvT0VPT3TIIkGBMcNFzaf0CQzwLa+sbUkzQ4erolHy6GtATU+gL-CBQfIklOIiUAfSUCFyWiCbkptAYcEh8fMDg0L3DIdAAPJJyAPmTJ+lowFloTs68CrwY4Q86LgKgQgRTgJFoj1USRSuxe9D6AxMEGe9E0cPoVVqgWBpR8AHIiv18Zcvjt4Zj4kgcZQigS-i4Sa8vj8-gCNiYANoABgAuuSKViai5IEVmqdzqz-iRAVy+QUAG4MPAwNDiCnMyV9KB4A5oABCAE95lQQCoOaLOjrTgTOBB8QlWVBPudco8Jd8Rb4Eo7WmcTD59UhqfsII6AFZISAE2gOzQgbbPdQCqYmYNwHwp2jFNAQNCuM6Z1IAemLtERg1ohrqJloLjcHm8aBQaVQTTIfRo6IM4Gg8AAMm4itY4IaoGgCDgTGBYj2SEwAAqIhz5rAsZUENCGAgwABGADUwEIACpjjDYFxoDDqIA
  const ast = $(code)
  const findTags = ast.find(
    tags.map((tag) => {
      return `${tag}\`$_$str\``
    }),
  )

  if (!findTags.length) {
    return
  }

  beforeTransform?.()
  logger.debug('With', findTags.length, 'tag(s)')

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
}
