import { merge } from '../src/utils'
describe('Utils', () => {
  test('merge of 2 objects', () => {
    const a = { a: 1, b: { ba: 1, bb: 1 }, c: {}, d: 1, e: { ea: 1 } }
    const b = { a: 2, b: { ba: 2, bc: { bca: 2 } }, c: 3, f: { fa: 1 } }
    expect(merge(a, b)).toEqual({ a: 2, b: { ba: 2, bb: 1, bc: { bca: 2 } }, c: 3, d: 1, e: { ea: 1 }, f: { fa: 1 } })
  })
})

describe('Book', () => {
  // TODO test useBook
})

describe('Chapter', () => {
  // TODO test useChapter
})
