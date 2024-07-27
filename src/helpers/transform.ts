import MagicString from 'magic-string'

import { polishClsString } from '../presets'

import type { PolishCallback, PolishTag } from '../types'

// toString(): /(?<!\\)`((\r\n|\r|\n|.)*?)(?<!\\)`/gm
// source: (?<!\\)`((\r\n|\r|\n|.)*?)(?<!\\)`
export const templateRegExp = /(?<!\\)`((\r\n|\r|\n|.)*?)(?<!\\)`/gm

export function getTaggedTemplatesRegExp(tags: string[]) {
  return new RegExp(`(${tags.join('|')})${templateRegExp.source}`, 'gm')
}

export function templateStringContainsExpression(str: string) {
  const reg = /(?<!\\)\${.*}/gm
  return reg.test(str)
}

export function unescapeTemplateString(str: string) {
  const reg = /\\(.)/gm
  return str.replace(reg, '$1')
}

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

  const ms = new MagicString(code)

  let transformed = false

  ms.replace(getTaggedTemplatesRegExp(tags), (raw, tag, str) => {
    const polishCallback = mergedPolishTags[tag]

    if (!polishCallback) {
      return raw
    }

    if (templateStringContainsExpression(str)) {
      return raw
    }

    if (!transformed) {
      beforeTransform?.()
      transformed = true
    }

    const polishedStr = polishCallback(unescapeTemplateString(str.trim()))
    const result = polishedStr ? `"${polishedStr}"` : raw
    return result
  })

  return ms.toString()
}
