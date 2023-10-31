/**
 * Tests for UpdatedTextAnalyzer.
 *
 * @author Anja Willsund <aw22hs@lnu.student.se>
 * @version 1.0.0
 */

import { UpdatedTextAnalyzer } from '../src/UpdatedTextAnalyzer.js'

// ------------------------------------------------------------------
// Get letter count difference between original and updated text
// ------------------------------------------------------------------

describe('get letter count difference between original and updated text',
  () => {
  test('should return the difference in letter count between the original and' +
    ' updated text', () => {
    const updatedTextAnalyzerOneSentence =
      new UpdatedTextAnalyzer('This is a sentence.')
    updatedTextAnalyzerOneSentence
      .replaceLowerCaseAndCapitalizedWord('is', 'was')
    expect(updatedTextAnalyzerOneSentence
      .getLetterCountDifferenceBetweenOriginalAndUpdatedText()).toBe('1')
  })

  test('should return the difference in letter count between the original and' +
    ' updated text', () => {
    const updatedTextAnalyzerOneSentence =
      new UpdatedTextAnalyzer('This is a sentence.')
    updatedTextAnalyzerOneSentence
      .replaceLowerCaseAndCapitalizedWord('this', 'that')
    expect(updatedTextAnalyzerOneSentence
      .getLetterCountDifferenceBetweenOriginalAndUpdatedText()).toBe('0')
  })

  test('should return the difference in letter count between the original and' +
   ' updated text', () => {
    const updatedTextAnalyzerOneSentence =
      new UpdatedTextAnalyzer('This is a sentence.')
    updatedTextAnalyzerOneSentence
      .replaceLowerCaseAndCapitalizedWord('sentence', 'word')
    expect(updatedTextAnalyzerOneSentence
      .getLetterCountDifferenceBetweenOriginalAndUpdatedText()).toBe('4')
  })
})

//---------------------------------------
// Text has been updated
//---------------------------------------

describe('text has been updated', () => {
  test('should return true when the text has been updated', () => {
    const updatedTextAnalyzerOneSentence = 
      new UpdatedTextAnalyzer('This is a sentence.')
    updatedTextAnalyzerOneSentence
      .replaceLowerCaseAndCapitalizedWord('is', 'was')
    expect(updatedTextAnalyzerOneSentence.textHasBeenUpdated()).toBe(true)
  })

  test('should return true when the text has been updated', () => {
    const updatedTextAnalyzerOneSentence =
      new UpdatedTextAnalyzer('This is a sentence.')
    expect(updatedTextAnalyzerOneSentence.textHasBeenUpdated()).toBe(false)
  })
})

// -------------------------------------------------
// Original text is longer than updated text
// -------------------------------------------------

describe('original text is longer than updated text', () => {
  test('should return true when the original text is longer than the updated ' +
    'text', () => {
    const updatedTextAnalyzerOneSentence =
      new UpdatedTextAnalyzer('This is a sentence.')
    updatedTextAnalyzerOneSentence
      .replaceLowerCaseAndCapitalizedWord('is', 'was')
    expect(updatedTextAnalyzerOneSentence
      .originalTextIsLongerThanUpdatedText()).toBe(false)
  })

  test('should return true when the original text is longer than the updated ' +
    'text', () => {
    const updatedTextAnalyzerOneSentence =
      new UpdatedTextAnalyzer('This is a sentence.')
    updatedTextAnalyzerOneSentence
      .replaceLowerCaseAndCapitalizedWord('sentence', 'word')
    expect(updatedTextAnalyzerOneSentence
      .originalTextIsLongerThanUpdatedText()).toBe(true)
  })
})

// -------------------------------------------------
// Replace words with exact formatting
// -------------------------------------------------

describe('replace words with exact formatting', () => {
  const updatedTextAnalyzerOneSentence =
  new UpdatedTextAnalyzer('This is a sentence.')
  const updatedTextAnalyzerTwoSentences =
  new UpdatedTextAnalyzer('This is a sentence. This is yet another sentence.')
  const updatedTextAnalyzerSeveralSentences = 
    new UpdatedTextAnalyzer('This is a sentence. This is yet another sentence. '
      + 'And this is a third one.')
  test('should only replace words with exact formatting, case sensitive',
    () => {
    expect(updatedTextAnalyzerSeveralSentences
      .replaceWordsWithExactFormatting('This', 'That'))
      .toBe('That is a sentence. That is yet another sentence. And this is a ' +
       'third one.')
  })

  test('should replace words with exact formatting and not words that ' +
    'partially matches the word', () => {
    expect(updatedTextAnalyzerOneSentence
      .replaceWordsWithExactFormatting('is', 'was'))
      .toBe('This was a sentence.')
  })

  test('should throw an error when the word contains unallowed characters',
    () => {
    const updatedTextAnalyzerOneSentence =
    new UpdatedTextAnalyzer('This is a sentence.')
    expect(() => updatedTextAnalyzerOneSentence
      .replaceWordsWithExactFormatting('is', '!s'))
      .toThrowError('The submitted word does not have the right format.')
  })

  test('should throw an error when wordToReplace does not contain any ' +
    'characters', () => {
    expect(() => updatedTextAnalyzerTwoSentences
      .replaceWordsWithExactFormatting('', 'at'))
      .toThrowError('The submitted word is empty.')
  })

  test('should throw an error when newWord does not contain any characters',
    () => {
    expect(() => updatedTextAnalyzerTwoSentences
      .replaceWordsWithExactFormatting('at', ''))
      .toThrowError('The submitted word is empty.')
  })

  test('should throw an error when wordToReplace contains unallowed characters',
    () => {
    expect(() => updatedTextAnalyzerTwoSentences
      .replaceWordsWithExactFormatting('a!c', 'at'))
      .toThrowError('The submitted word does not have the right format.')
  })

  test('should throw an error when newWord contains unallowed characters',
    () => {
    expect(() => updatedTextAnalyzerTwoSentences
      .replaceWordsWithExactFormatting('at', 'a!c'))
      .toThrowError('The submitted word does not have the right format.')
  })

  test('should throw an error when wordToReplace is null', () => {
    expect(() => updatedTextAnalyzerTwoSentences
      .replaceWordsWithExactFormatting(null, 'at'))
      .toThrowError('The submitted word is empty.')
  })

  test('should throw an error when newWord is null', () => {
    expect(() => updatedTextAnalyzerTwoSentences
      .replaceWordsWithExactFormatting('at', null))
      .toThrowError('The submitted word is empty.')
  })

  test('should throw an error when wordToReplace is undefined', () => {
    expect(() => updatedTextAnalyzerTwoSentences
      .replaceWordsWithExactFormatting(undefined, 'at'))
      .toThrowError('The submitted word is empty.')
  })

  test('should throw an error when newWord is undefined', () => {
    expect(() => updatedTextAnalyzerTwoSentences
      .replaceWordsWithExactFormatting('at', undefined))
      .toThrowError('The submitted word is empty.')
  })
})

// -------------------------------------------------
// Replace lower case and capitalized word
// -------------------------------------------------

describe('replace lower case and capitalized word', () => {
  const updatedTextAnalyzerTwoSentences =
    new UpdatedTextAnalyzer('This is a sentence. And this is another sentence.')
  test('should replace words with two different formattings, case sensitive',
    () => {
    const updatedTextAnalyzerSeveralSentences =
    new UpdatedTextAnalyzer('This is a sentence. This is yet another sentence. '
    + 'And this is a third one.')
    expect(updatedTextAnalyzerSeveralSentences
      .replaceLowerCaseAndCapitalizedWord('This', 'that'))
      .toBe('That is a sentence. That is yet another sentence. And that is a ' +
        'third one.')
  })

  test('should replace words with two different formattings and not words ' +
    'that partially matches the word', () => {
    const updatedTextAnalyzerOneSentence =
    new UpdatedTextAnalyzer('This is a sentence.')
    expect(updatedTextAnalyzerOneSentence
        .replaceLowerCaseAndCapitalizedWord('is', 'was'))
        .toBe('This was a sentence.')
  })

  test('should replace words when newWord is all upper case, but keep ' + 
    'formatting from wordToReplace', () => {
    expect(updatedTextAnalyzerTwoSentences
      .replaceLowerCaseAndCapitalizedWord('this', 'THAT'))
      .toBe('That is a sentence. And that is another sentence.')
  })

  test('should throw error when trying to replace word with all upper case' +
    'letters', () => {
      const updatedTextAnalyzerOneSentence =
      new UpdatedTextAnalyzer('This is a sentence.')
    expect(() => updatedTextAnalyzerOneSentence
    .replaceLowerCaseAndCapitalizedWord('THIS', 'That'))
    .toThrowError('The word to replace does not match the correct format. '
      + 'All letters need to be lower case or the first letter needs to be '
      + 'upper case and the rest of the letters be lower case.')
  })

  test('should throw an error when wordToReplace does not contain any ' +
    'characters', () => {
    expect(() => updatedTextAnalyzerTwoSentences
      .replaceLowerCaseAndCapitalizedWord('', 'at'))
      .toThrowError('The submitted word is empty.')
  })

  test('should throw an error when newWord does not contain any characters',
    () => {
    expect(() => updatedTextAnalyzerTwoSentences
      .replaceLowerCaseAndCapitalizedWord('at', ''))
      .toThrowError('The submitted word is empty.')
  })

  test('should throw an error when wordToReplace contains unallowed characters',
    () => {
    expect(() => updatedTextAnalyzerTwoSentences
      .replaceLowerCaseAndCapitalizedWord('a!c', 'at'))
      .toThrowError('The submitted word does not have the right format.')
  })

  test('should throw an error when newWord contains unallowed characters',
    () => {
    expect(() => updatedTextAnalyzerTwoSentences
      .replaceLowerCaseAndCapitalizedWord('at', 'a!c'))
      .toThrowError('The submitted word does not have the right format.')
  })

  test('should throw an error when wordToReplace is null', () => {
    expect(() => updatedTextAnalyzerTwoSentences
      .replaceLowerCaseAndCapitalizedWord(null, 'at'))
      .toThrowError('The submitted word is empty.')
  })

  test('should throw an error when newWord is null', () => {
    expect(() => updatedTextAnalyzerTwoSentences
      .replaceLowerCaseAndCapitalizedWord('at', null))
      .toThrowError('The submitted word is empty.')
  })

  test('should throw an error when wordToReplace is undefined', () => {
    expect(() => updatedTextAnalyzerTwoSentences
      .replaceLowerCaseAndCapitalizedWord(undefined, 'at'))
      .toThrowError('The submitted word is empty.')
  })
})
