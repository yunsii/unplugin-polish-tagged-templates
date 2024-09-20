import $ from 'gogocode'

import { logger } from '../../../log'

import type { TransformFn } from '../../../types'

export interface TransformByAstOptions {
  beforeTransform?: () => void
}

export const transformByAst: TransformFn = (code, polishTags, options = {}) => {
  const { beforeTransform } = options

  // demo ref: https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGAbAZwAMALNPPJAHQgAJaBDAlAMxvqqrhoYHc0WaXiyI0xEfMTIVqdRszZyAJMACMAXx79BwoiAA0IXkgBOAa2TosIFjAlwwSOnBMMIBFqYC2AChZg8NABJCE99RigwcKQoBycCAEpaYHZaHHi4WiVaAF4IsAA6AHMkEvT0VPT3TIIkGBMcNFzaf0CQzwLa+sbUkzQ4erolHy6GtATU+gL-CBQfIklOIiUAfSUCFyWiCbkptAYcEh8fMDg0L3DIdAAPJJyAPmTJ+lowFloTs68CrwY4Q86LgKgQgRTgJFoj1USRSuxe9D6AxMEGe9E0cPoVVqgWBpR8AHIiv18Zcvjt4Zj4kgcZQigS-i4Sa8vj8-gCNiYANoABgAuuSKViai5IEVmqdzqz-iRAVy+QUAG4MPAwNDiCnMyV9KB4A5oABCAE95lQQCoOaLOjrTgTOBB8QlWVBPudco8Jd8Rb4Eo7WmcTD59UhqfsII6AFZISAE2gOzQgbbPdQCqYmYNwHwp2jFNAQNCuM6Z1IAemLtERg1ohrqJloLjcHm8aBQaVQTTIfRo6IM4Gg8AAMm4itY4IaoGgCDgTGBYj2SEwAAqIhz5rAsZUENCGAgwABGADUwEIACpjjDYFxoDDqIA
  const ast = $(code)
  const targetTagNodes = ast.find(
    polishTags.map((item) => {
      return `${item.tag}\`$_$str\``
    }),
  )

  if (!targetTagNodes.length) {
    return code
  }

  beforeTransform?.()
  logger.debug('With', targetTagNodes.length, 'tag(s)')

  const polishCode = targetTagNodes
    .each((node) => {
      if (node.match.str.length > 1) {
        return
      }
      const tag = node.attr('tag.name')

      if (typeof tag !== 'string') {
        return
      }

      const polishCallback = polishTags.find((item) => item.tag === tag)?.polish

      if (!polishCallback) {
        return
      }

      const str = node.match.str[0].value

      // TODO process single/double quotes
      if (str.includes('"')) {
        return
      }

      const polishedStr = polishCallback(str)?.trim() || ''

      node.replaceBy(`"${polishedStr}"`)
    })
    .root()
    .generate()
  return polishCode
}
