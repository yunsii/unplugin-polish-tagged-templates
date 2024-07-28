/// <reference types="vite/client" />

import { describe, expect, it } from 'vitest'

import { transformTags } from '../src/helpers/transform'

const clsFixtures = import.meta.glob('./fixtures/cls-tags/*.*', {
  eager: true,
  as: 'raw',
})

describe('cls-tags', () => {
  Object.entries(clsFixtures)
    .filter(([path]) => {
      return path.includes('.output.')
    })
    .forEach(([outputPath, expectedOutputCode]) => {
      const inputPath = outputPath.replace('.output.', '.')
      it(inputPath, () => {
        const inputCode = clsFixtures[inputPath]
        const polishCode = transformTags(inputCode, {
          clsTags: ['cls'],
        })
        expect(polishCode).equal(expectedOutputCode)
      })
    })
})
