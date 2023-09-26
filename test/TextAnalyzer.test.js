/**
 * Test for TextAnalyzer
 *
 * @author Anja Willsund <aw22hs@lnu.student.se>
 * @version 1.0.0
 */

import { TextAnalyzer } from '../src/TextAnalyzer.js'
import fs from 'fs'

const filePathLoremIpsum = 'test/testdata/loremIpsum.md'
const filePathExampleCode = 'test/testdata/exampleCode.js'

function readFile (filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8')
  return fileContent
}

const textExampleCode = readFile(filePathExampleCode)
const textLoremIpsum = readFile(filePathLoremIpsum)
const textAnalyzerBlankSpace = new TextAnalyzer(' ')
const textAnalyzerDot = new TextAnalyzer('.')
const textAnalyzerExampleCode = new TextAnalyzer(textExampleCode)
const textAnalyzerLoremIpsum = new TextAnalyzer(textLoremIpsum)
const textAnalyzerNumbers = new TextAnalyzer('123')
const textAnalyzerOneLetter = new TextAnalyzer('A')
const textAnalyzerOneSentence = new TextAnalyzer('This is a sentence.')
const textAnalyzerSeveralSentences = new TextAnalyzer('This is a sentence. This is yet another sentence. And this is a third one.')
const textAnalyzerOneWord = new TextAnalyzer('Word.')

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

  test('should throw an error when input is null', () => {
    const createTextAnalyzerWithEmptyText = () => {
      new TextAnalyzer(null)
    }
    expect(createTextAnalyzerWithEmptyText).toThrowError('Invalid input. There are no characters in the string.')
  })

  test('should throw an error when input is undefined', () => {
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
// Count non empty lines without JS comments
// -------------------------------------------------

describe('count non empty lines without JS comments', () => {
  test('should return the number of non empty lines without JS comments when using text from loremIpsum file as input', () => {
    expect(textAnalyzerLoremIpsum.countNonEmptyLinesWithoutJSComments()).toBe(5)
  })

  test('should return the number of non empty lines without JS comments when only one character input', () => {
    expect(textAnalyzerDot.countNonEmptyLinesWithoutJSComments()).toBe(1)
  })

  test('should return the number of non empty lines without JS comments when the input is a blank space', () => {
    expect(textAnalyzerBlankSpace.countNonEmptyLinesWithoutJSComments()).toBe(0)
  })

  test('should throw an error when there are only numbers', () => {
    expect(textAnalyzerExampleCode.countNonEmptyLinesWithoutJSComments()).toBe(3)
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
      and: 1,
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
// Get character count
// -------------------------------------------------

describe('get character count', () => {
  test('should return the number of characters in a text', () => {
    expect(textAnalyzerSeveralSentences.countCharacters()).toBe(74)
  })

  test('should return the number of characters when using text from loremIpsum file as input', () => {
    expect(textAnalyzerLoremIpsum.countCharacters()).toBe(1439)
  })

  test('should return 1 when only one character input', () => {
    expect(textAnalyzerDot.countCharacters()).toBe(1)
  })

  test('should return 1 when the input is a blank space', () => {
    expect(textAnalyzerBlankSpace.countCharacters()).toBe(1)
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

// --------------------------------------------------------------
// Get letter count difference between original and updated text
// --------------------------------------------------------------

describe('get letter count difference between original and updated text', () => {
  const textAnalyzerLoremIpsum = new TextAnalyzer(textLoremIpsum)
  const textAnalyzerOneSentence = new TextAnalyzer('This is a sentence.')
  test('should return that the updated text is longer than the original text', () => {
    textAnalyzerLoremIpsum.replaceWordsWithExactFormatting('at', 'attans')
    expect(textAnalyzerLoremIpsum.getLetterCountDifferenceBetweenOriginalAndUpdatedText()).toBe('The updated text is 20 character(s) longer than the original text.')
  })

  test('should return that the original text is longer than the updated text', () => {
    textAnalyzerOneSentence.replaceWordsWithExactFormatting('sentence', 'sent')
    expect(textAnalyzerOneSentence.getLetterCountDifferenceBetweenOriginalAndUpdatedText()).toBe('The original text is 4 character(s) longer than the updated text.')
  })

  test('should return that the text has not been updated if it has not been', () => {
    expect(textAnalyzerSeveralSentences.getLetterCountDifferenceBetweenOriginalAndUpdatedText()).toBe('The original text has not been updated.')
  })

  test('should return a string that says "No words have been replaced." when changing the words back in the original text string', () => {
    textAnalyzerLoremIpsum.replaceWordsWithExactFormatting('attans', 'at')
    expect(textAnalyzerLoremIpsum.getLetterCountDifferenceBetweenOriginalAndUpdatedText()).toBe('No words have been replaced.')
  })

  test('should return a string that says that the original text and the updated text are the same length', () => {
    textAnalyzerLoremIpsum.replaceWordsWithExactFormatting('est', 'ett')
    expect(textAnalyzerLoremIpsum.getLetterCountDifferenceBetweenOriginalAndUpdatedText()).toBe('The original text and the updated text are the same length.')
  })
})

// -------------------------------------------------
// Get sentence count
// -------------------------------------------------

describe('get sentence count', () => {
  test('should return the number of sentences when using text from loremIpsum file as input', () => {
    expect(textAnalyzerLoremIpsum.getSentenceCount()).toBe(25)
  })

  test('should return the number of sentences when using text from loremIpsum file as input', () => {
    expect(textAnalyzerOneLetter.getSentenceCount()).toBe(1)
  })

  test('should return the number of sentences when only one character input', () => {
    expect(() => textAnalyzerDot.getSentenceCount()).toThrowError('There are no words in the string.')
  })

  test('should return the number of sentences when the input is a blank space', () => {
    expect(() => textAnalyzerBlankSpace.getSentenceCount()).toThrowError('There are no words in the string.')
  })

  test('should throw an error when there are only numbers', () => {
    expect(() => textAnalyzerNumbers.getSentenceCount()).toThrowError('There are no words in the string.')
  })
})

// -------------------------------------------------
// Replace words with exact formatting
// -------------------------------------------------

describe('replace words with exact formatting', () => {
  const textAnalyzerSeveralSentences = new TextAnalyzer('This is a sentence. This is yet another sentence. And this is a third one.')
  const textAnalyzerOneSentence = new TextAnalyzer('This is a sentence.')
  test('should only replace words with exact formatting, case sensitive', () => {
    expect(textAnalyzerSeveralSentences.replaceWordsWithExactFormatting('This', 'That')).toBe('That is a sentence. That is yet another sentence. And this is a third one.')
  })

  test('should replace words with exact formatting and not words that partially matches the word', () => {
    expect(textAnalyzerOneSentence.replaceWordsWithExactFormatting('is', 'was')).toBe('This was a sentence.')
  })

  test('should throw an error when wordToReplace does not contain any characters', () => {
    expect(() => textAnalyzerLoremIpsum.replaceWordsWithExactFormatting('', 'at')).toThrowError('Invalid input. The submitted word is empty.')
  })

  test('should throw an error when newWord does not contain any characters', () => {
    expect(() => textAnalyzerLoremIpsum.replaceWordsWithExactFormatting('at', '')).toThrowError('Invalid input. The submitted word is empty.')
  })

  test('should throw an error when wordToReplace contains unallowed characters', () => {
    expect(() => textAnalyzerLoremIpsum.replaceWordsWithExactFormatting('a!c', 'at')).toThrowError('The submitted word does not have the right format.')
  })

  test('should throw an error when newWord contains unallowed characters', () => {
    expect(() => textAnalyzerLoremIpsum.replaceWordsWithExactFormatting('at', 'a!c')).toThrowError('The submitted word does not have the right format.')
  })

  test('should throw an error when wordToReplace is null', () => {
    expect(() => textAnalyzerLoremIpsum.replaceWordsWithExactFormatting(null, 'at')).toThrowError('Invalid input. The submitted word is empty.')
  })

  test('should throw an error when newWord is null', () => {
    expect(() => textAnalyzerLoremIpsum.replaceWordsWithExactFormatting('at', null)).toThrowError('Invalid input. The submitted word is empty.')
  })

  test('should throw an error when wordToReplace is undefined', () => {
    expect(() => textAnalyzerLoremIpsum.replaceWordsWithExactFormatting(undefined, 'at')).toThrowError('Invalid input. The submitted word is empty.')
  })

  test('should throw an error when newWord is undefined', () => {
    expect(() => textAnalyzerLoremIpsum.replaceWordsWithExactFormatting('at', undefined)).toThrowError('Invalid input. The submitted word is empty.')
  })
})

// -------------------------------------------------
// Replace words with two different formattings
// -------------------------------------------------

describe('replace words with two different formattings', () => {
  const textAnalyzerOneSentence = new TextAnalyzer('This is a sentence.')
  const textAnalyzerTwoSentences = new TextAnalyzer('This is a sentence. And this is another sentence.')
  const textAnalyzerSeveralSentences = new TextAnalyzer('This is a sentence. This is yet another sentence. And this is a third one.')
  const textAnalyzerLoremIpsum = new TextAnalyzer(textLoremIpsum)
  test('should replace words with two different formattings, case sensitive', () => {
    expect(textAnalyzerSeveralSentences.replaceWordsWithTwoDifferentFormattings('This', 'that')).toBe('That is a sentence. That is yet another sentence. And that is a third one.')
  })

  test('should replace words with two different formattings and not words that partially matches the word', () => {
    expect(textAnalyzerOneSentence.replaceWordsWithTwoDifferentFormattings('is', 'was')).toBe('This was a sentence.')
  })

  test('should replace words when newWord is all upper case, but keep formatting from wordToReplace', () => {
    expect(textAnalyzerTwoSentences.replaceWordsWithTwoDifferentFormattings('this', 'THAT')).toBe('That is a sentence. And that is another sentence.')
  })

  test('should throw error when trying to replace word with all upper case letters', () => {
    expect(() => textAnalyzerLoremIpsum.replaceWordsWithTwoDifferentFormattings('LOREM', 'Laura')).toThrowError('The word to replace does not match the correct format. All letters need to be lower case or the first letter needs to be upper case and the rest of the letters need to be lower case.')
  })

  test('should throw an error when wordToReplace does not contain any characters', () => {
    expect(() => textAnalyzerLoremIpsum.replaceWordsWithTwoDifferentFormattings('', 'at')).toThrowError('Invalid input. The submitted word is empty.')
  })

  test('should throw an error when newWord does not contain any characters', () => {
    expect(() => textAnalyzerLoremIpsum.replaceWordsWithTwoDifferentFormattings('at', '')).toThrowError('Invalid input. The submitted word is empty.')
  })

  test('should throw an error when wordToReplace contains unallowed characters', () => {
    expect(() => textAnalyzerLoremIpsum.replaceWordsWithTwoDifferentFormattings('a!c', 'at')).toThrowError('The submitted word does not have the right format.')
  })

  test('should throw an error when newWord contains unallowed characters', () => {
    expect(() => textAnalyzerLoremIpsum.replaceWordsWithTwoDifferentFormattings('at', 'a!c')).toThrowError('The submitted word does not have the right format.')
  })

  test('should throw an error when wordToReplace is null', () => {
    expect(() => textAnalyzerLoremIpsum.replaceWordsWithTwoDifferentFormattings(null, 'at')).toThrowError('Invalid input. The submitted word is empty.')
  })

  test('should throw an error when newWord is null', () => {
    expect(() => textAnalyzerLoremIpsum.replaceWordsWithTwoDifferentFormattings('at', null)).toThrowError('Invalid input. The submitted word is empty.')
  })

  test('should throw an error when wordToReplace is undefined', () => {
    expect(() => textAnalyzerLoremIpsum.replaceWordsWithTwoDifferentFormattings(undefined, 'at')).toThrowError('Invalid input. The submitted word is empty.')
  })
})
