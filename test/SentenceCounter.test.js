/**
 * Tests for SentenceCounter.
 *
 * @author Anja Willsund <aw22hs@lnu.student.se>
 * @version 1.0.0
 */

import { SentenceCounter } from '../src/SentenceCounter.js'
import fs from 'fs'

const filePathLoremIpsum = 'test/testdata/loremIpsum.md'

function readFile (filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8')
  return fileContent
}

const textLoremIpsum = readFile(filePathLoremIpsum)
const sentenceCounterBlankSpace = new SentenceCounter(' ')
const sentenceCounterDot = new SentenceCounter('.')
const sentenceCounterLoremIpsum = new SentenceCounter(textLoremIpsum)
const sentenceCounterNumbers = new SentenceCounter('123')
const sentenceCounterOneLetter = new SentenceCounter('A')

// -------------------------------------------------
// Get sentence count
// -------------------------------------------------

describe('get sentence count', () => {
  test('should return the number of sentences when using text from loremIpsum file as input', () => {
    expect(sentenceCounterLoremIpsum.getSentenceCount()).toBe(25)
  })

  test('should return the number of sentences when using text from loremIpsum file as input', () => {
    expect(sentenceCounterOneLetter.getSentenceCount()).toBe(1)
  })

  test('should return the number of sentences when only one character input', () => {
    expect(sentenceCounterDot.getSentenceCount()).toBe(0)
  })

  test('should return the number of sentences when the input is a blank space', () => {
    expect(sentenceCounterBlankSpace.getSentenceCount()).toBe(0)
  })

  test('should throw an error when there are only numbers', () => {
    expect(sentenceCounterNumbers.getSentenceCount()).toBe(0)
  })
})

// --------------------------------------------------------------
// Get first words of sentences count in alphabetical order
// --------------------------------------------------------------

describe('get first words in alphabetical order', () => {
  test('should return the first words in alphabetical order when using text from loremIpsum file as input', () => {
    expect(sentenceCounterLoremIpsum.getFirstWordOfSentencesCountInAlphabeticalOrder()).toEqual({
      An: 2,
      At: 2,
      Cu: 2,
      Est: 1,
      Eu: 3,
      Eum: 1,
      Harum: 1,
      Has: 1,
      Iisque: 1,
      Iudico: 1,
      Lorem: 1,
      Ne: 1,
      Quo: 1,
      Sit: 1,
      Tale: 1,
      Ut: 1,
      Vim: 1,
      Vitae: 1,
      Vituperata: 1,
      Vix: 1
    })
  })

  test('should return the first word in alphabetical order when only one character input', () => {
    expect(sentenceCounterDot.getFirstWordOfSentencesCountInAlphabeticalOrder()).toEqual({})
  })

  test('should return the first word in alphabetical order when the input is a blank space', () => {
    expect(sentenceCounterBlankSpace.getFirstWordOfSentencesCountInAlphabeticalOrder()).toEqual({})
  })

  test('should throw an error when there are only numbers', () => {
    expect(sentenceCounterNumbers.getFirstWordOfSentencesCountInAlphabeticalOrder()).toEqual({})
  })
})
