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
const textAnalyzerBlankSpace = new TextAnalyzer(' ')
const textAnalyzerDot = new TextAnalyzer('.')
const textAnalyzerLoremIpsum = new TextAnalyzer(text)
const textAnalyzerNumbers = new TextAnalyzer('123')
const textAnalyzerOneLetter = new TextAnalyzer('A')
const textAnalyzerOneSentence = new TextAnalyzer('This is a sentence.')
const textAnalyzerSeveralSentences = new TextAnalyzer('This is a sentence. This is yet another sentence. This is a third one.')
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

  test('should throw an error when input is null', () => {
    /**
     *
     */
    const createTextAnalyzerWithEmptyText = () => {
      new TextAnalyzer(null)
    }
    expect(createTextAnalyzerWithEmptyText).toThrowError('Invalid input. There are no characters in the string.')
  })

  test('should throw an error when input is undefined', () => {
    /**
     *
     */
    const createTextAnalyzerWithEmptyText = () => {
      new TextAnalyzer(undefined)
    }
    expect(createTextAnalyzerWithEmptyText).toThrowError('Invalid input. There are no characters in the string.')
  })
})

// -------------------------------------------------
// Average number of sentences per paragraph
// -------------------------------------------------

describe('average number of sentences per paragraph', () => {
  test('should throw an error when the input text is a dot', () => {
    expect(() => textAnalyzerDot.averageNumberOfSentencesPerParagraph()).toThrowError('There are no words in the string.')
  })

  test('should throw an error when the input text is a blank space', () => {
    expect(() => textAnalyzerBlankSpace.averageNumberOfSentencesPerParagraph()).toThrowError('There are no words in the string.')
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
  test('should throw an error when the input text is a dot', () => {
    expect(() => textAnalyzerDot.averageNumberOfWordsPerSentence()).toThrowError('There are no words in the string.')
  })

  test('should throw an error when the input text is a blank space', () => {
    expect(() => textAnalyzerBlankSpace.averageNumberOfWordsPerSentence()).toThrowError('There are no words in the string.')
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

  test('should return 1 when the input text is a dot', () => {
    expect(textAnalyzerDot.countAllLines()).toBe(1)
  })

  test('should return 1 when the input text is a blank space', () => {
    expect(textAnalyzerBlankSpace.countAllLines()).toBe(1)
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

  test('should throw an error when there are not words', () => {
    expect(() => textAnalyzerDot.countAllWords()).toThrowError('There are no words in the string.')
  })

  test('should throw an error when the input text is a blank space', () => {
    expect(() => textAnalyzerBlankSpace.countAllWords()).toThrowError('There are no words in the string.')
  })

  test('should throw an error when the input text contains only numbers', () => {
    expect(() => textAnalyzerNumbers.countAllWords()).toThrowError('There are no words in the string.')
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

  test('should throw an error when the input text is a blank space', () => {
    expect(() => textAnalyzerBlankSpace.countLettersFrequencyAlphabeticalOrder()).toThrowError('There are no letters in the string.')
  })
})

// -------------------------------------------------
// Count letters frequency occurance order
// -------------------------------------------------

describe('count letters frequency occurance order', () => {
  test('should return letter count in occurance order when there is one word', () => {
    expect(textAnalyzerOneWord.countLettersFrequencyOccuranceOrder()).toEqual({ w: 1, o: 1, r: 1, d: 1 })
  })

  test('should return single letter count in lower case when there is one upper case letter', () => {
    expect(textAnalyzerOneLetter.countLettersFrequencyOccuranceOrder()).toEqual({ a: 1 })
  })

  test('should return letter count in occurance order when there is input from loremIpsum file', () => {
    expect(textAnalyzerLoremIpsum.countLettersFrequencyOccuranceOrder()).toEqual({
      e: 150,
      i: 128,
      a: 112,
      u: 104,
      t: 94,
      s: 94,
      r: 71,
      m: 67,
      n: 63,
      o: 46,
      l: 40,
      c: 38,
      p: 38,
      d: 36,
      v: 28,
      q: 15,
      b: 12,
      h: 11,
      f: 10,
      g: 6,
      x: 6,
      z: 1
    })
  })

  test('should throw an error when there are only numbers', () => {
    expect(() => textAnalyzerNumbers.countLettersFrequencyOccuranceOrder()).toThrowError('There are no letters in the string.')
  })

  test('should throw an error when there are no alpha-numeric characters', () => {
    expect(() => textAnalyzerDot.countLettersFrequencyOccuranceOrder()).toThrowError('There are no letters in the string.')
  })

  test('should throw an error when the input text is a blank space', () => {
    expect(() => textAnalyzerBlankSpace.countLettersFrequencyOccuranceOrder()).toThrowError('There are no letters in the string.')
  })
})

// -------------------------------------------------
// Count not empty lines
// -------------------------------------------------

describe('count not empty lines', () => {
  test('should return 1 when there is one word', () => {
    expect(textAnalyzerOneWord.countNotEmptyLines()).toBe(1)
  })

  test('should return 1 when there is one sentence on one line', () => {
    expect(textAnalyzerOneSentence.countNotEmptyLines()).toBe(1)
  })

  test('should return 5 when using text from loremIpsum file as input', () => {
    expect(textAnalyzerLoremIpsum.countNotEmptyLines()).toBe(5)
  })

  test('should return 1 when only one character input', () => {
    expect(textAnalyzerDot.countNotEmptyLines()).toBe(1)
  })

  test('should return 0 when the input text is a blank space', () => {
    expect(textAnalyzerBlankSpace.countNotEmptyLines()).toBe(0)
  })
})

// -------------------------------------------------
// Count paragraphs
// -------------------------------------------------

describe('count paragraphs', () => {
  test('should return 1 when there is one word', () => {
    expect(textAnalyzerOneWord.countParagraphs()).toBe(1)
  })

  test('should return 1 when there is one sentence in one paragraph', () => {
    expect(textAnalyzerOneSentence.countParagraphs()).toBe(1)
  })

  test('should return 5 when using text from loremIpsum file as input', () => {
    expect(textAnalyzerLoremIpsum.countParagraphs()).toBe(5)
  })

  test('should return 1 when only one character input', () => {
    expect(textAnalyzerDot.countParagraphs()).toBe(1)
  })

  test('should return 1 when the input text is a blank space', () => {
    expect(textAnalyzerBlankSpace.countParagraphs()).toBe(1)
  })
})

// -------------------------------------------------
// Count specific word
// -------------------------------------------------

describe('count specific word', () => {
  test('should return 1 when there is one word', () => {
    expect(textAnalyzerOneWord.countSpecificWord('word')).toBe(1)
  })

  test('should return 4 when using text from loremIpsum file as input and looking for word "cu"', () => {
    expect(textAnalyzerLoremIpsum.countSpecificWord('cu')).toBe(4)
  })

  test('should return 0 when word is not found', () => {
    expect(textAnalyzerLoremIpsum.countSpecificWord('hello')).toBe(0)
  })

  test('should return 0 when word is not found', () => {
    expect(textAnalyzerDot.countSpecificWord('word')).toBe(0)
  })

  test('should return 0 when the input text is a blank space', () => {
    expect(textAnalyzerBlankSpace.countSpecificWord('word')).toBe(0)
  })

  test('should throw an error when the word does not contain any letters', () => {
    expect(() => textAnalyzerLoremIpsum.countSpecificWord('123')).toThrowError('The submitted word does not have the right format.')
  })

  test('should throw an error when the word contains unallowed characters', () => {
    expect(() => textAnalyzerLoremIpsum.countSpecificWord('a!c')).toThrowError('The submitted word does not have the right format.')
  })

  test('should throw an error when the input text is null', () => {
    expect(() => textAnalyzerLoremIpsum.countSpecificWord(null)).toThrowError('Invalid input. The submitted word is empty.')
  })

  test('should throw an error when the input text is undefined', () => {
    expect(() => textAnalyzerLoremIpsum.countSpecificWord(undefined)).toThrowError('Invalid input. The submitted word is empty.')
  })
})

// -------------------------------------------------
// Count words frequency alphabetical order
// -------------------------------------------------

describe('count words frequency alphabetical order', () => {
  test('should return single word count in lower case when there is a word that starts with an upper case letter', () => {
    expect(textAnalyzerOneWord.countWordsFrequencyAlphabeticalOrder()).toEqual({ word: 1 })
  })

  test('should return word count in alphabetical order when there are several sentences', () => {
    expect(textAnalyzerSeveralSentences.countWordsFrequencyAlphabeticalOrder()).toEqual({
      a: 2,
      another: 1,
      is: 3,
      one: 1,
      sentence: 2,
      third: 1,
      this: 3,
      yet: 1
    })
  })

  test('should throw an error when there are only numbers', () => {
    expect(() => textAnalyzerNumbers.countWordsFrequencyAlphabeticalOrder()).toThrowError('There are no words in the string.')
  })

  test('should throw an error when there are no alpha-numeric characters', () => {
    expect(() => textAnalyzerDot.countWordsFrequencyAlphabeticalOrder()).toThrowError('There are no words in the string.')
  })

  test('should throw an error when the input text is a blank space', () => {
    expect(() => textAnalyzerBlankSpace.countWordsFrequencyAlphabeticalOrder()).toThrowError('There are no words in the string.')
  })
})

// -------------------------------------------------
// Count words frequency occurance order
// -------------------------------------------------

describe('count words frequency occurance order', () => {
  test('should return single word count in lower case when there is a word that starts with an upper case letter', () => {
    expect(textAnalyzerOneWord.countWordsFrequencyOccuranceOrder()).toEqual({ word: 1 })
  })

  test('should return word count in occurance order when there are several sentences', () => {
    expect(textAnalyzerSeveralSentences.countWordsFrequencyAlphabeticalOrder()).toEqual({
      is: 3,
      this: 3,
      a: 2,
      sentence: 2,
      another: 1,
      one: 1,
      third: 1,
      yet: 1
    })
  })

  test('should throw an error when there are only numbers', () => {
    expect(() => textAnalyzerNumbers.countWordsFrequencyOccuranceOrder()).toThrowError('There are no words in the string.')
  })

  test('should throw an error when there are no alpha-numeric characters', () => {
    expect(() => textAnalyzerDot.countWordsFrequencyOccuranceOrder()).toThrowError('There are no words in the string.')
  })

  test('should throw an error when the input text is a blank space', () => {
    expect(() => textAnalyzerBlankSpace.countWordsFrequencyOccuranceOrder()).toThrowError('There are no words in the string.')
  })
})

// -------------------------------------------------
// Get character count
// -------------------------------------------------

describe('get character count', () => {
  test('should return the number of characters in a text', () => {
    expect(textAnalyzerSeveralSentences.getCharacterCount()).toBe(70)
  })

  test('should return the number of characters when using text from loremIpsum file as input', () => {
    expect(textAnalyzerLoremIpsum.getCharacterCount()).toBe(1439)
  })

  test('should return 1 when only one character input', () => {
    expect(textAnalyzerDot.getCharacterCount()).toBe(1)
  })

  test('should return 1 when the input is a blank space', () => {
    expect(textAnalyzerBlankSpace.getCharacterCount()).toBe(1)
  })
})

// -------------------------------------------------
// Get first words in alphabetical order
// -------------------------------------------------

describe('get first words in alphabetical order', () => {
  test('should return the first words in alphabetical order when using text from loremIpsum file as input', () => {
    expect(textAnalyzerLoremIpsum.getFirstWordsInAlphabeticalOrder()).toEqual({
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
    expect(() => textAnalyzerDot.getFirstWordsInAlphabeticalOrder()).toThrowError('There are no words in the string.')
  })

  test('should return the first word in alphabetical order when the input is a blank space', () => {
    expect(() => textAnalyzerBlankSpace.getFirstWordsInAlphabeticalOrder()).toThrowError('There are no words in the string.')
  })

  test('should throw an error when there are only numbers', () => {
    expect(() => textAnalyzerNumbers.getFirstWordsInAlphabeticalOrder()).toThrowError('There are no words in the string.')
  })
})

// -------------------------------------------------
// Get first words in occurance order
// -------------------------------------------------

describe('get first words in occurance order', () => {
  test('should return the first words in occurance order when using text from loremIpsum file as input', () => {
    expect(textAnalyzerLoremIpsum.getFirstWordsInOccuranceOrder()).toEqual({
      Eu: 3,
      An: 2,
      At: 2,
      Cu: 2,
      Est: 1,
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

  test('should return the first word in occurance order when only one character input', () => {
    expect(() => textAnalyzerDot.getFirstWordsInOccuranceOrder()).toThrowError('There are no words in the string.')
  })

  test('should return the first word in occurance order when the input is a blank space', () => {
    expect(() => textAnalyzerBlankSpace.getFirstWordsInOccuranceOrder()).toThrowError('There are no words in the string.')
  })

  test('should throw an error when there are only numbers', () => {
    expect(() => textAnalyzerNumbers.getFirstWordsInOccuranceOrder()).toThrowError('There are no words in the string.')
  })
})
