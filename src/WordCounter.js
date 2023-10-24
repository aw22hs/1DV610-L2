/**
 * Module for counting words.
 *
 * @author Anja Willsund <aw22hs@student.lnu.se>
 * @version 1.0.0
 */

import { CharacterCounterAndSorter } from "./CharacterCounterAndSorter.js"
import { WordValidator } from "./WordValidator.js"

export class WordCounter {
  #words = []

  /**
   * Initializes a new instance of the WordCounter class.
   *
   * @param {string} text - The text input.
   */
  constructor(text) {
    // Regex looks for words that contain at least one letter but can also
    // contain numbers and the characters -, ', ., : and /
    this.#words = text.toLowerCase()
      .match(/\b[a-z0-9-'./:]*[a-z][a-z0-9-'./:]*\b/gi)
  }

  /**
   * Counts the number of words in a text.
   *
   * @returns {number} - The number of words in the text.
   */
  getAllWordsCount() {
    return this.#words ? this.#words.length : 0
  }

  /**
   * Counts the number of times a certain word appears in a text.
   * The word is case insensitive.
   *
   * @param {string} word - The word to be counted.
   * @returns {number} - The number of times the word appears in the text.
   */
  getSpecificWordCount(wordInput) {
    if (this.getAllWordsCount() === 0) {
      return 0
    }
    new WordValidator(wordInput)
    const lowerCaseWord = wordInput.toLowerCase()
    
    let count = 0
    for (const word of this.#words) {
      if (lowerCaseWord === word) {
        count++
      }
    }

    return count
  }

  /**
   * Counts and sorts all words in alphabetical order.
   *
   * @returns The words sorted in alphabetical order.
   */
  getWordCountInAlphabeticalOrder() {
    if (!this.#words) {
      return {}
    }

    const wordCounterAndSorter = new CharacterCounterAndSorter(this.#words)
    return wordCounterAndSorter.getSortedCharacters()
  }
}