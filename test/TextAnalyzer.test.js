/**
 * Tests for TextAnalyzer.
 *
 * @author Anja Willsund <aw22hs@lnu.student.se>
 * @version 1.0.0
 */

import { TextAnalyzer } from '../src/TextAnalyzer.js'
import fs from 'fs'

const filePathLoremIpsum = 'test/testdata/loremIpsum.md'

function readFile (filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8')
  return fileContent
}

const textLoremIpsum = readFile(filePathLoremIpsum)
const textAnalyzerBlankSpace = new TextAnalyzer(' ')
const textAnalyzerDot = new TextAnalyzer('.')
const textAnalyzerLoremIpsum = new TextAnalyzer(textLoremIpsum)
const textAnalyzerNumbers = new TextAnalyzer('123')
const textAnalyzerOneSentence = new TextAnalyzer('This is a sentence.')
const textAnalyzerSeveralSentences = new TextAnalyzer('This is a sentence. ' +
  'This is yet another sentence. And this is a third one.')
const textAnalyzerOneWord = new TextAnalyzer('Word.')

// -------------------------------------------------
// Create TextAnalyzer instance with invalid input
// -------------------------------------------------

describe('instantiating TextAnalyzer', () => {
  test('should throw an error when input is empty', () => {
    const createTextAnalyzerWithEmptyText = () => {
      new TextAnalyzer('')
    }
    expect(createTextAnalyzerWithEmptyText).toThrowError('There are no ' +
      'characters in the string.')
  })

  test('should throw an error when input is null', () => {
    const createTextAnalyzerWithEmptyText = () => {
      new TextAnalyzer(null)
    }
    expect(createTextAnalyzerWithEmptyText).toThrowError('There are no characters in the string.')
  })

  test('should throw an error when input is undefined', () => {
    const createTextAnalyzerWithEmptyText = () => {
      new TextAnalyzer(undefined)
    }
    expect(createTextAnalyzerWithEmptyText).toThrowError('There are no characters in the string.')
  })
})

// -------------------------------------------------
// Average number of sentences per paragraph
// -------------------------------------------------

describe('average number of sentences per paragraph', () => {
  test('should throw an error when the input text is a dot', () => {
    expect(textAnalyzerDot.getAverageNumberOfSentencesPerParagraph()).toBe(0)
  })

  test('should throw an error when the input text is a blank space', () => {
    expect(textAnalyzerBlankSpace.getAverageNumberOfSentencesPerParagraph())
      .toBe(0)
  })

  test('should return 1 when there is one sentence', () => {
    expect(textAnalyzerOneSentence.getAverageNumberOfSentencesPerParagraph())
      .toBe(1)
  })

  test('should return 5 when using text from loremIpsum file as input', () => {
    expect(textAnalyzerLoremIpsum.getAverageNumberOfSentencesPerParagraph())
      .toBe(5)
  })
})

// -------------------------------------------------
// Average number of words per sentence
// -------------------------------------------------

describe('average number of words per sentence', () => {
  test('should return 0 when the input text is a dot', () => {
    expect(textAnalyzerDot.getAverageNumberOfWordsPerSentence()).toBe(0)
  })

  test('should return 0 when input text is a blank space', () => {
    expect(textAnalyzerBlankSpace.getAverageNumberOfWordsPerSentence()).toBe(0)
  })

  test('should return 1 when there is one word', () => {
    expect(textAnalyzerOneWord.getAverageNumberOfWordsPerSentence()).toBe(1)
  })

  test('should return 5 when using text from loremIpsum file as input', () => {
    expect(textAnalyzerLoremIpsum.getAverageNumberOfWordsPerSentence()).toBe(9)
  })
})

// -------------------------------------------------
// Count letters frequency alphabetical order
// -------------------------------------------------

describe('count letters frequency alphabetical order', () => {
  function isObjectSorted(obj) {
    const keys = Object.keys(obj);
    const sortedKeys = [...keys].sort();
    return JSON.stringify(keys) === JSON.stringify(sortedKeys);
  }

  test('should return letter count when there is input from loremIpsum file',
    () => {
    expect(textAnalyzerLoremIpsum.getLetterCountInAlphabeticalOrder()).toEqual({
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

  test('should return letter count in alphabetical order when there is input ' +
    'from loremIpsum file', () => {
    const result = textAnalyzerLoremIpsum.getLetterCountInAlphabeticalOrder()
    expect(isObjectSorted(result)).toBe(true)
  })

  test('should throw an error when there are only numbers', () => {
    expect(() => textAnalyzerNumbers.getLetterCountInAlphabeticalOrder())
      .toThrowError('There are no letters in the string.')
  })

  test('should throw an error when there are no alpha-numeric characters',
    () => {
    expect(() => textAnalyzerDot.getLetterCountInAlphabeticalOrder())
      .toThrowError('There are no letters in the string.')
  })

  test('should throw an error when the input text is a blank space', () => {
    expect(() => textAnalyzerBlankSpace.getLetterCountInAlphabeticalOrder())
      .toThrowError('There are no letters in the string.')
  })
})

// -------------------------------------------------
// Count paragraphs
// -------------------------------------------------

describe('count paragraphs', () => {
  test('should return 1 when there is one word', () => {
    expect(textAnalyzerOneWord.getParagraphsCount()).toBe(1)
  })

  test('should return 1 when there is one sentence in one paragraph', () => {
    expect(textAnalyzerOneSentence.getParagraphsCount()).toBe(1)
  })

  test('should return 5 when using text from loremIpsum file as input', () => {
    expect(textAnalyzerLoremIpsum.getParagraphsCount()).toBe(5)
  })

  test('should return 1 when only one character input', () => {
    expect(textAnalyzerDot.getParagraphsCount()).toBe(1)
  })

  test('should return 1 when the input text is a blank space', () => {
    expect(textAnalyzerBlankSpace.getParagraphsCount()).toBe(1)
  })
})

// -------------------------------------------------
// Get character count
// -------------------------------------------------

describe('get character count', () => {
  test('should return the number of characters in a text', () => {
    expect(textAnalyzerSeveralSentences.getCharacterCount()).toBe(74)
  })

  test('should return the number of characters when using text from ' +
    'loremIpsum file as input', () => {
    expect(textAnalyzerLoremIpsum.getCharacterCount()).toBe(1439)
  })

  test('should return 1 when only one character input', () => {
    expect(textAnalyzerDot.getCharacterCount()).toBe(1)
  })

  test('should return 1 when the input is a blank space', () => {
    expect(textAnalyzerBlankSpace.getCharacterCount()).toBe(1)
  })
})
