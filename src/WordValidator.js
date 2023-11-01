/**
 * Module for validating words.
 *
 * @author Anja Willsund <aw22hs@student.lnu.se>
 * @version 1.0.0
 */

export class WordValidator {

  /**
   * Initializes a new instance of the WordValidator class.
   *
   * @param {string} text - The text input.
   */
  constructor(word) {
    this.#validateWord(word)
  }

  #validateWord(word) {
    if (!word) {
      throw new Error('The submitted word is empty.')
    }
    // Regex looks for words that contain at least one letter but can also 
    // contain numbers and the characters -, ', ., : and /
    if (!word.match(/^[\p{L}0-9.'/:-]*[\p{L}][\p{L}0-9.'/:-]*$/gu)) {
      throw new Error('The submitted word does not have the right format.')
    }
  }
}