/* eslint-disable no-console */
/// <reference types="vite/client" />

import { describe, expect, it } from 'vitest'

import { transformTags, transformTagsNext } from '../src/helpers/transform'

const clsFixtures = import.meta.glob('./fixtures/cls-tags/*.txt', {
  eager: true,
  as: 'raw',
})

describe('cls-tags', () => {
  console.time('old')
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
        expect(polishCode).equal(expectedOutputCode)
      })
    })
  console.timeEnd('old')
})

describe('cls-tags next', () => {
  console.time('next')
  Object.entries(clsFixtures)
    .filter(([path]) => {
      return !path.endsWith('.output.txt')
    })
    .forEach(([path, code]) => {
      it(path, () => {
        const expectedOutputCode =
          clsFixtures[path.replace('.txt', '.output.txt')]
        const polishCode = transformTagsNext(code, {
          clsTags: ['cls'],
        })
        expect(polishCode).equal(expectedOutputCode)
      })
    })
  console.timeEnd('next')
})
