/**
 * Tests for WordCounter.
 *
 * @author Anja Willsund <aw22hs@lnu.student.se>
 * @version 1.0.0
 */

import { WordCounter } from '../src/WordCounter.js'
import fs from 'fs'

const filePathLoremIpsum = 'test/testdata/loremIpsum.md'

function readFile (filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8')
  return fileContent
}

const textLoremIpsum = readFile(filePathLoremIpsum)
const wordCounterBlankSpace = new WordCounter(' ')
const wordCounterDot = new WordCounter('.')
const wordCounterLoremIpsum = new WordCounter(textLoremIpsum)
const wordCounterNumbers = new WordCounter('123')
const wordCounterSeveralSentences = new WordCounter('This is a sentence. ' +
  'This is yet another sentence. And this is a third one.')
const wordCounterOneWord = new WordCounter('Word.')


// -------------------------------------------------
// Get all words count
// -------------------------------------------------

describe('count all words', () => {
  test('should return 1 when there is one word', () => {
    expect(wordCounterOneWord.getAllWordsCount()).toBe(1)
  })

  test('should return 224 when using text from loremIpsum file as input', () => {
    expect(wordCounterLoremIpsum.getAllWordsCount()).toBe(224)
  })

  test('should throw an error when there are not words', () => {
    expect(wordCounterDot.getAllWordsCount()).toBe(0)
  })

  test('should throw an error when the input text contains only numbers', () => {
    expect(wordCounterNumbers.getAllWordsCount()).toBe(0)
  })
})

// -------------------------------------------------
// Get specific word count
// -------------------------------------------------

describe('count specific word', () => {
  test('should return 1 when there is one word', () => {
    expect(wordCounterOneWord.getSpecificWordCount('word')).toBe(1)
  })

  test('should return 4 when using text from loremIpsum file as input and looking for word "cu"', () => {
    expect(wordCounterLoremIpsum.getSpecificWordCount('cu')).toBe(4)
  })

  test('should return 0 when word is not found', () => {
    expect(wordCounterLoremIpsum.getSpecificWordCount('hello')).toBe(0)
  })

  test('should return 0 when word is not found', () => {
    expect(wordCounterDot.getSpecificWordCount('word')).toBe(0)
  })

  test('should return 0 when the input text is a blank space', () => {
    expect(wordCounterBlankSpace.getSpecificWordCount('word')).toBe(0)
  })

  test('should throw an error when the word does not contain any letters', () => {
    expect(() => wordCounterLoremIpsum.getSpecificWordCount('123'))
      .toThrowError('The submitted word does not have the right format.')
  })

  test('should throw an error when the word contains unallowed characters', () => {
    expect(() => wordCounterLoremIpsum.getSpecificWordCount('a!c'))
      .toThrowError('The submitted word does not have the right format.')
  })

  test('should throw an error when the input text is null', () => {
    expect(() => wordCounterLoremIpsum.getSpecificWordCount(null)) .toThrowError('The submitted word is empty.')
  })

  test('should throw an error when the input text is undefined', () => {
    expect(() => wordCounterLoremIpsum.getSpecificWordCount(undefined)) .toThrowError('The submitted word is empty.')
  })
})


// -------------------------------------------------
// Get word count in alphabetical order
// -------------------------------------------------

describe('count words frequency alphabetical order', () => {
  function isObjectSorted(obj) {
    const keys = Object.keys(obj);
    const sortedKeys = [...keys].sort();
    return JSON.stringify(keys) === JSON.stringify(sortedKeys);
  }

  test('should return single word count in lower case when there is a word that starts with an upper case letter',
    () => {
    expect(wordCounterOneWord.getWordCountInAlphabeticalOrder()).toEqual({ word: 1 })
  })

  test('should return true if object is sorted in alphabetical order', () => {
    const result = wordCounterSeveralSentences.getWordCountInAlphabeticalOrder()
    expect(isObjectSorted(result)).toBe(true)
  })

  test('should return an empty object when there are only numbers', () => {
    expect(wordCounterNumbers.getWordCountInAlphabeticalOrder()).toEqual({})
  })

  test('should return an empty object when there are no alpha-numeric characters', () => {
    expect(wordCounterDot.getWordCountInAlphabeticalOrder()).toEqual({})
  })
})
