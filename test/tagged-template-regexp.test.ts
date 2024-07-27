/// <reference types="vite/client" />

import path from 'path'

import { describe, expect, it } from 'vitest'

import {
  getTaggedTemplatesRegExp,
  templateRegExp,
} from '../src/helpers/transform'

const templatesFixture = import.meta.glob('./fixtures/templates/*.txt', {
  eager: true,
  as: 'raw',
})

const config = [
  { file: 'base.txt', count: 6, reg: templateRegExp },
  { file: 'cls-tagged.txt', count: 6, reg: getTaggedTemplatesRegExp(['cls']) },
]

describe('templates', () => {
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
