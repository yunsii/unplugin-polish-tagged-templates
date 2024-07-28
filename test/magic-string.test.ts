/// <reference types="vite/client" />

import path from 'path'

import { describe, expect, it } from 'vitest'

import {
  getTaggedTemplatesRegExp,
  templateRegExp,
} from '../src/helpers/transform/magic-string/helpers'

const templatesFixture = import.meta.glob('./fixtures/magic-string/*.js', {
  eager: true,
  as: 'raw',
})

const config = [
  { file: 'base.js', count: 5, reg: templateRegExp },
  { file: 'cls-tagged.js', count: 5, reg: getTaggedTemplatesRegExp(['cls']) },
]

describe('base', () => {
  config.forEach((item) => {
    const target = Object.entries(templatesFixture).find(([filePath]) => {
      return path.basename(filePath) === item.file
    })

    if (!target) {
      return
    }

    const [filePath, code] = target

    it(filePath, () => {
      const result = code.match(item.reg)
      expect(result).toBeDefined()
      expect(result?.length).equal(item.count)
    })
  })
})

const templatesNestedFixture = import.meta.glob(
  './fixtures/magic-string/cls-tagged-nested/*.js',
  {
    eager: true,
    as: 'raw',
  },
)

describe('nested', () => {
  Object.entries(templatesNestedFixture).forEach(([path, code]) => {
    it(path, () => {
      expect(getTaggedTemplatesRegExp(['cls']).test(code)).equal(true)
    })
  })
})
