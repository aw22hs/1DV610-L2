/**
 * Module for analyzing the updated text.
 *
 * @author Anja Willsund <aw22hs@student.lnu.se>
 * @version 1.0.0
 */

import { WordValidator } from "./WordValidator.js"

export class UpdatedTextAnalyzer {
  #originalText = ''
  #updatedText = ''

  constructor(text) {
    this.#originalText = text
    this.#updatedText = text
  }

  getLetterCountDifferenceBetweenOriginalAndUpdatedText() {
    let characterDifference = this.#updatedText.length - this.#originalText.length
    let difference = characterDifference.toString()
  
    if (characterDifference < 0) {
      // Removes the dash at the beginning of the negative number
      difference = difference.substring(1)
    }
    return difference
  }

  textHasBeenUpdated() {
    if (this.#updatedText === '' || this.#updatedText === this.#originalText) {
      return false
    }
    return true
  }

  originalTextIsLongerThanUpdatedText() {
    if (this.#originalText.length > this.#updatedText.length) {
      return true
    }
    return false
  }

  replaceWordsWithExactFormatting(wordToReplace, newWord) {
    new WordValidator(wordToReplace)
    new WordValidator(newWord)

    const updatedText = this.#replaceWords(wordToReplace, newWord)

    return updatedText
  }

  /**
   * Replaces a word with a new word and returns the updated text.
   * Replaces all words that has all letters in lower case and all words with
   * the first letter in upper case and the rest of the letters in lower case.
   *
   * @param {string} wordToReplace - The word to be replaced.
   * @param {string} newWord - The word to replace with.
   * @returns {string} - The updated text.
   * @throws {Error} - If the submitted word to replace does not match the correct format.
   */
  replaceLowerCaseAndCapitalizedWord(wordToReplace, newWord) {
    new WordValidator(wordToReplace)
    new WordValidator(newWord)

    const wordsToReplace = this.#getWordInCapitalizedAndLowerCaseFormat(wordToReplace)
    let wordToReplaceMatchesCorrectFormat = false
    for (const word of wordsToReplace) {
      if (word === wordToReplace) {
        wordToReplaceMatchesCorrectFormat = true
      }
    }

    if (!wordToReplaceMatchesCorrectFormat) {
      throw new Error('The word to replace does not match the correct format. All letters need to be lower ' +
        'case or the first letter needs to be upper case and the rest of the letters be lower case.')
    }

    const newWords = this.#getWordInCapitalizedAndLowerCaseFormat(newWord)
    let updatedText
    for (let i = 0; i < wordsToReplace.length; i++) {
      updatedText = this.#replaceWords(wordsToReplace[i], newWords[i])
    }

    return updatedText
  }

  #getWordInCapitalizedAndLowerCaseFormat(word) {
    const wordWithAllLettersLowerCase = word.toLowerCase()
    const wordWithFirstLetterUpperCase = wordWithAllLettersLowerCase.charAt(0).toUpperCase() +
      wordWithAllLettersLowerCase.slice(1)
    const words = [wordWithAllLettersLowerCase, wordWithFirstLetterUpperCase]

    return words
  }

  #replaceWords(wordToReplace, newWord) {
    this.#updatedText = this.#updatedText.replace(new RegExp('\\b' + wordToReplace + '\\b', 'g'), newWord)

    return this.#updatedText
  }
}
