/**
 * Test for TextAnalyzer
 *
 * @author Anja Willsund <aw22hs@lnu.student.se>
 * @version 1.0.0
 */

import { TextAnalyzer } from '../src/TextAnalyzer.js'
import fs from 'fs'

/**
 *
 */
function readFile () {
  const filePath = 'test/loremIpsum.test.md'
  const fileContent = fs.readFileSync(filePath, 'utf8')
  return fileContent
}

const text = readFile()
const textAnalyzerLoremIpsum = new TextAnalyzer(text)
const textAnalyzerDot = new TextAnalyzer('.')
const textAnalyzerNumbers = new TextAnalyzer('123')
const textAnalyzerOneLetter = new TextAnalyzer('A')
const textAnalyzerOneSentence = new TextAnalyzer('This is a sentence.')
const textAnalyzerOneWord = new TextAnalyzer('Word.')

// -------------------------------------------------
// Create TextAnalyzer instance with empty string
// -------------------------------------------------

describe('instantiating TextAnalyzer', () => {
  test('should throw an error when input is empty', () => {
    /**
     *
     */
    const createTextAnalyzerWithEmptyText = () => {
      new TextAnalyzer('')
    }
    expect(createTextAnalyzerWithEmptyText).toThrowError('There are no characters in the string.')
  })
})

// -------------------------------------------------
// Average number of sentences per paragraph
// -------------------------------------------------

describe('average number of sentences per paragraph', () => {
  test('should throw an error when there are no sentences', () => {
    expect(() => textAnalyzerDot.averageNumberOfSentencesPerParagraph()).toThrowError('There are no words in the string.')
  })

  test('should return 1 when there is one sentence', () => {
    expect(textAnalyzerOneSentence.averageNumberOfSentencesPerParagraph()).toBe(1)
  })

  test('should return 5 when using text from loremIpsum file as input', () => {
    expect(textAnalyzerLoremIpsum.averageNumberOfSentencesPerParagraph()).toBe(5)
  })
})

// -------------------------------------------------
// Average number of words per sentence
// -------------------------------------------------

describe('average number of words per sentence', () => {
  test('should throw an error when there are no words', () => {
    expect(() => textAnalyzerDot.averageNumberOfWordsPerSentence()).toThrowError('There are no words in the string.')
  })

  test('should return 1 when there is one word', () => {
    expect(textAnalyzerOneWord.averageNumberOfWordsPerSentence()).toBe(1)
  })

  test('should return 5 when using text from loremIpsum file as input', () => {
    expect(textAnalyzerLoremIpsum.averageNumberOfWordsPerSentence()).toBe(9)
  })
})

// -------------------------------------------------
// Count all lines
// -------------------------------------------------

describe('count all lines', () => {
  test('should return 1 when there is one word', () => {
    expect(textAnalyzerOneWord.countAllLines()).toBe(1)
  })

  test('should return 1 when there is one sentence on one line', () => {
    expect(textAnalyzerOneSentence.countAllLines()).toBe(1)
  })

  test('should return 5 when using text from loremIpsum file as input', () => {
    expect(textAnalyzerLoremIpsum.countAllLines()).toBe(9)
  })

  test('should return 1 when only one character input', () => {
    expect(textAnalyzerDot.countAllLines()).toBe(1)
  })
})

// -------------------------------------------------
// Count all words
// -------------------------------------------------

describe('count all words', () => {
  test('should return 1 when there is one word', () => {
    expect(textAnalyzerOneWord.countAllWords()).toBe(1)
  })

  test('should return 224 when using text from loremIpsum file as input', () => {
    expect(textAnalyzerLoremIpsum.countAllWords()).toBe(224)
  })

  test('should throw an error when there are no words', () => {
    expect(() => textAnalyzerDot.countAllWords()).toThrowError('There are no words in the string.')
  })
})

// -------------------------------------------------
// Count letters frequency alphabetical order
// -------------------------------------------------

describe('count letters frequency alphabetical order', () => {
  test('should return letter count in alphabetical order when there is one word', () => {
    expect(textAnalyzerOneWord.countLettersFrequencyAlphabeticalOrder()).toEqual({ d: 1, o: 1, r: 1, w: 1 })
  })

  test('should return single letter count in lower case when there is one upper case letter', () => {
    expect(textAnalyzerOneLetter.countLettersFrequencyAlphabeticalOrder()).toEqual({ a: 1 })
  })

  test('should return letter count in alphabetical order when there is input from loremIpsum file', () => {
    expect(textAnalyzerLoremIpsum.countLettersFrequencyAlphabeticalOrder()).toEqual({
      a: 112,
      b: 12,
      c: 38,
      d: 36,
      e: 150,
      f: 10,
      g: 6,
      h: 11,
      i: 128,
      l: 40,
      m: 67,
      n: 63,
      o: 46,
      p: 38,
      q: 15,
      r: 71,
      s: 94,
      t: 94,
      u: 104,
      v: 28,
      x: 6,
      z: 1
    })
  })

  test('should throw an error when there are only numbers', () => {
    expect(() => textAnalyzerNumbers.countLettersFrequencyAlphabeticalOrder()).toThrowError('There are no letters in the string.')
  })

  test('should throw an error when there are no alpha-numeric characters', () => {
    expect(() => textAnalyzerDot.countLettersFrequencyAlphabeticalOrder()).toThrowError('There are no letters in the string.')
  })
})
