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
    expect(updatedTextAnalyzerOneSentence.getLetterCountDifferenceBetweenOriginalAndUpdatedText()).toBe('1')
  })

  test('should return the difference in letter count between the original and' +
    ' updated text', () => {
    const updatedTextAnalyzerOneSentence =
      new UpdatedTextAnalyzer('This is a sentence.')
    updatedTextAnalyzerOneSentence
      .replaceLowerCaseAndCapitalizedWord('this', 'that')
    expect(updatedTextAnalyzerOneSentence.getLetterCountDifferenceBetweenOriginalAndUpdatedText()).toBe('0')
  })

  test('should return the difference in letter count between the original and' +
   ' updated text', () => {
    const updatedTextAnalyzerOneSentence =
      new UpdatedTextAnalyzer('This is a sentence.')
    updatedTextAnalyzerOneSentence
      .replaceLowerCaseAndCapitalizedWord('sentence', 'word')
    expect(updatedTextAnalyzerOneSentence.getLetterCountDifferenceBetweenOriginalAndUpdatedText()).toBe('4')
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
  const updatedTextAnalyzerSeveralSentences = 
    new UpdatedTextAnalyzer('This is a sentence. This is yet another sentence. '
      + 'And this is a third one.')
  const updatedTextAnalyzerOneSentence =
    new UpdatedTextAnalyzer('This is a sentence.')
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
})

// -------------------------------------------------
// Replace lower case and capitalized word
// -------------------------------------------------

describe('replace lower case and capitalized word', () => {
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
    const updatedTextAnalyzerTwoSentences =
    new UpdatedTextAnalyzer('This is a sentence. And this is another sentence.')
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

  test('should throw error when trying to replace word with all upper case' +
    'letters', () => {
      const updatedTextAnalyzerOneSentence =
      new UpdatedTextAnalyzer('This is a sentence.')
    expect(() => updatedTextAnalyzerOneSentence
    .replaceLowerCaseAndCapitalizedWord('ThiS', 'That'))
    .toThrowError('The word to replace does not match the correct format. '
      + 'All letters need to be lower case or the first letter needs to be '
      + 'upper case and the rest of the letters be lower case.')
  })
})
