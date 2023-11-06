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

  constructor(text) {
    // Regex looks for words that contain at least one letter but can also
    // contain numbers and the characters -, ', ., : and /
    this.#words = text.toLowerCase().match(/\b[\p{L}0-9.'/:-]*[\p{L}][\p{L}0-9.'/:-]*\b/gu)
  }

  getAllWordsCount() {
    return this.#words ? this.#words.length : 0
  }

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

  getWordCountInAlphabeticalOrder() {
    if (!this.#words) {
      return {}
    }

    const wordCounterAndSorter = new CharacterCounterAndSorter(this.#words)
    return wordCounterAndSorter.getSortedCharacters()
  }
}