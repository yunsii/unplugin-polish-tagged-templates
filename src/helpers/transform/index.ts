import { polishClsString } from '../../presets'

import {
  checkTemplateNested,
  containsTaggedTemplate,
} from './magic-string/helpers'
import { transformByMagicString } from './magic-string'
import { transformByAst } from './ast'

import type { PolishTag } from '../../types'

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
  ]
  const tagNames = mergedPolishTags.map((item) => item.tag)

  if (!containsTaggedTemplate(tagNames, code)) {
    return code
  }

  if (checkTemplateNested(code)) {
    return transformByAst(code, mergedPolishTags, { beforeTransform })
  }

  return transformByMagicString(code, mergedPolishTags, { beforeTransform })
}
