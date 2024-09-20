import { polishClsString } from '../../presets'
import { transformByAst } from './ast'
import { transformByMagicString } from './magic-string'
import {
  checkTemplateNested,
  containsTaggedTemplate,
} from './magic-string/helpers'

import type { PolishTag, ProcessorType } from '../../types'

export interface ITransformOptions {
  processor?: ProcessorType
  clsTags?: string[]
  polishTags?: PolishTag[]
  beforeTransform?: () => void
}

export function transformTags(code: string, options: ITransformOptions = {}) {
  const {
    clsTags = [],
    polishTags = [],
    beforeTransform,
    processor = 'auto',
  } = options

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
    return
  }

  const processorType
    = processor === 'auto'
      ? checkTemplateNested(code)
        ? 'ast'
        : 'string'
      : processor

  if (processorType === 'ast') {
    return {
      type: processorType,
      code: transformByAst(code, mergedPolishTags, { beforeTransform }),
    }
  }

  return {
    type: processorType,
    code: transformByMagicString(code, mergedPolishTags, { beforeTransform }),
  }
}
