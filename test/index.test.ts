import { describe, expect, it } from 'vitest'

import { transformTags } from '../src/helpers/transform'

const clsFixtures = import.meta.glob('./fixtures/cls-tags/*.txt', {
  eager: true,
  as: 'raw',
})

describe('cls-tags', () => {
  Object.entries(clsFixtures)
    .filter(([path]) => {
      return !path.endsWith('.output.txt')
    })
    .forEach(([path, code]) => {
      it(path, () => {
        const expectedOutputCode =
          clsFixtures[path.replace('.txt', '.output.txt')]
        const polishCode = transformTags(code, {
          clsTags: ['cls'],
        })
        expect(expectedOutputCode).equal(polishCode)
      })
    })
})
