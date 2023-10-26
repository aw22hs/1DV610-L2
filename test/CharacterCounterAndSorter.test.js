/**
 * Tests for CharacterCounterAndSorter.
 *
 * @author Anja Willsund <aw22hs@lnu.student.se>
 * @version 1.0.0
 */

import { CharacterCounterAndSorter } from '../src/CharacterCounterAndSorter.js'

// -------------------------------------------------
// Get sorted characters
// -------------------------------------------------

describe('get sorted characters', () => {
  function isObjectSorted(obj) {
    const keys = Object.keys(obj);
    const sortedKeys = [...keys].sort();
    return JSON.stringify(keys) === JSON.stringify(sortedKeys);
  }

  test('should return an object with one character plus character count when ' +
    'there is one character', () => {
    const characterCounterAndSorter = new CharacterCounterAndSorter(['A'])
    expect(characterCounterAndSorter.getSortedCharacters())
      .toEqual({ A: 1 })
  })

  test('should return false if object is not sorted in alphabetical order',
  () => {
    const wrongOrder = {
      yet: 1,
      a: 1,
      and: 1,
      another: 1,
      is: 3,
      one: 1,
      sentence: 2,
      this: 3
    }
    expect(isObjectSorted(wrongOrder)).toBe(false)
  })

  test('should return an objects of words sorted in alphabetical order plus ' +
    'word count when there are several words', () => {
    const characterCounterAndSorter = new CharacterCounterAndSorter(['This',
      'is', 'a', 'sentence', 'This', 'is', 'yet', 'another', 'sentence', 'And',
      'this', 'is', 'a', 'third', 'one'])
    const result = characterCounterAndSorter.getSortedCharacters()
    expect(isObjectSorted(result)).toBe(true)
  })
})