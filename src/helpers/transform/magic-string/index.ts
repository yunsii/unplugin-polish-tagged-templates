import MagicString from 'magic-string'

import {
  getTaggedTemplatesRegExp,
  templateStringContainsExpression,
} from './helpers'

import type { TransformFn } from '../../../types'

export const transformByMagicString: TransformFn = (
  code,
  polishTags,
  options = {},
) => {
  const { beforeTransform } = options

  const ms = new MagicString(code)

  let transformed = false

  const tagNames = polishTags.map((item) => item.tag)

  ms.replace(getTaggedTemplatesRegExp(tagNames), (raw, tag, str) => {
    const polishCallback = polishTags.find((item) => item.tag === tag)?.polish

    if (!polishCallback) {
      return raw
    }

    if (templateStringContainsExpression(str)) {
      return raw
    }

    // TODO process single/double quotes
    if (str.includes('"')) {
      return raw
    }

    if (!transformed) {
      beforeTransform?.()
      transformed = true
    }

    const polishedStr = polishCallback(str.trim())
    const result = typeof polishedStr === 'string' ? `"${polishedStr}"` : raw
    return result
  })

  return ms.hasChanged() ? ms.toString() : code
}
