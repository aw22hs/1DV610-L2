/**
 * Test for TextAnalyzer
 *
 * @author Anja Willsund <aw22hs@lnu.student.se>
 * @version 1.0.0
 */

import { TextAnalyzer } from '../src/TextAnalyzer.js'
import fs from 'fs'

function readFile () {
  const filePath = 'test/loremIpsum.test.md'
  const fileContent = fs.readFileSync(filePath, 'utf8')
  return fileContent
}

const text = readFile()
const textAnalyzerLoremIpsum = new TextAnalyzer(text)
const textAnalyzerDot = new TextAnalyzer('.')
const textAnalyzerOneWord = new TextAnalyzer('Word.')
const textAnalyzerOneSentence = new TextAnalyzer('This is a sentence.')

// -------------------------------------------------
// Create TextAnalyzer instance with empty string
// -------------------------------------------------

describe('instantiating TextAnalyzer', () => {
  test('should throw an error when input is empty', () => {
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
