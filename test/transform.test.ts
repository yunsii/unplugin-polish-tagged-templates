/// <reference types="vite/client" />

import { describe, expect, it } from 'vitest'

import { transformTags } from '../src/helpers/transform'
import { checkTaggedTemplatesNested } from '../src/helpers/transform/magic-string/helpers'

const baseFixtures = import.meta.glob('./fixtures/transform/base/*.*', {
  eager: true,
  as: 'raw',
})
const nestedFixures = import.meta.glob('./fixtures/transform/nested/*.*', {
  eager: true,
  as: 'raw',
})

const allFixtures = { ...baseFixtures, ...nestedFixures }

describe('base', () => {
  Object.entries(baseFixtures)
    .filter(([path]) => {
      return path.includes('.output.')
    })
    .forEach(([outputPath]) => {
      const inputPath = outputPath.replace('.output.', '.')
      const inputCode = allFixtures[inputPath]
      it(inputPath, () => {
        expect(checkTaggedTemplatesNested(['cls'], inputCode)).equal(false)
      })
    })
})

describe('nested', () => {
  Object.entries(nestedFixures)
    .filter(([path]) => {
      return path.includes('.output.')
    })
    .forEach(([outputPath]) => {
      const inputPath = outputPath.replace('.output.', '.')
      const inputCode = allFixtures[inputPath]
      it(inputPath, () => {
        expect(checkTaggedTemplatesNested(['cls'], inputCode)).equal(true)
      })
    })
})

describe('all', () => {
  Object.entries(allFixtures)
    .filter(([path]) => {
      return path.includes('.output.')
    })
    .forEach(([outputPath, expectedOutputCode]) => {
      const inputPath = outputPath.replace('.output.', '.')
      it(inputPath, () => {
        const inputCode = allFixtures[inputPath]
        const polishResult = transformTags(inputCode, {
          clsTags: ['cls'],
        })
        expect(polishResult?.code).equal(expectedOutputCode)
      })
    })
})
