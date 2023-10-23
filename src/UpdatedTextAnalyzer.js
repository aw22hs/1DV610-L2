/**
 * Module for analyzing the updated text..
 *
 * @author Anja Willsund <aw22hs@student.lnu.se>
 * @version 1.0.0
 */

export class UpdatedTextAnalyzer {
  #originalText = ''
  #updatedText = ''

  /**
   * Initializes a new instance of the SentenceAnalyzer class.
   *
   * @param {string} text - The text input.
   */
  constructor(text) {
    this.#originalText = text
    this.#updatedText = text
  }

  /**
   * Checks letter count difference between the original text and the updated
   * text.
   *
   * @returns {string} - The character count difference.
   */
  getLetterCountDifferenceBetweenOriginalAndUpdatedText() {
    let characterDifference =
      this.#updatedText.length - this.#originalText.length

    let difference = characterDifference.toString()
    if (characterDifference < 0) {
      // Removes the dash at the beginning of the negative number
      difference = difference.substring(1)
    }
    return difference
  }

  /**
   * Checks if the text has been updated.
   *
   * @returns {boolean} True if the text has been updated, otherwise false.
   */
  textHasBeenUpdated() {
    if (this.#updatedText === '' || this.#updatedText === this.#originalText) {
      return false
    }
    return true
  }

  /**
   * Checks if the original text is longer than the updated text.
   *
   * @returns {boolean} True if the original text is longer, otherwise false.
   */
  originalTextIsLongerThanUpdatedText() {
    if (this.#originalText.length > this.#updatedText.length) {
      return true
    }
    return false
  }

  /**
   * Replaces words with exact matching in the updated text.
   *
   * @param {string} wordToReplace - The word to be replaced.
   * @param {string} newWord - The new word.
   * @returns The updated text with words replaced.
   */
  replaceWords(wordToReplace, newWord) {
    this.#updatedText = this.#updatedText
      .replace(new RegExp('\\b' + wordToReplace + '\\b', 'g'), newWord)

    return this.#updatedText
  }
}
