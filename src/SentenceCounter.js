/**
 * Module for analyzing sentences.
 *
 * @author Anja Willsund <aw22hs@student.lnu.se>
 * @version 1.0.0
 */

import { CharacterCounterAndSorter } from "./CharacterCounterAndSorter.js"

export class SentenceCounter {
  #sentences = []

  constructor(text) {
    this.#getSentencesFromText(text)
    this.#trimSentencesFromWhitespace()
  }

  #getSentencesFromText(text) {
    const words = text.toLowerCase().match(/\b[\p{L}0-9-'./:]*[\p{L}][\p{L}0-9-'./:]*\b/gu)
    if (words) {
      // Regex looks for sentences that end with ., ! or ? and are followed by a blank space or is
      // the end of the string. It also looks for sentences that end with a new line that might be
      // followed by a blank space or is the end of the string.
      this.#sentences = text.split(/(?:[.!?]+\s+|\n\s*|$)/g)
    } else {
      this.#sentences = []
    }
  }

  #trimSentencesFromWhitespace() {
    for (let i = 0; i < this.#sentences.length; i++) {
      this.#sentences[i] = this.#sentences[i].trim()
      if (this.#sentences[i] === '') {
        this.#sentences.splice(i, 1)
      }
    }
  }

  getSentenceCount() {
    return this.#sentences ? this.#sentences.length : 0
  }

  getFirstWordOfSentencesCountInAlphabeticalOrder() {
    if (!this.#sentences) {
      return {}
    }

    const firstWords = []
    for (const sentence of this.#sentences) {
      const words = sentence.match(/\b[\p{L}0-9-'./:]*[\p{L}][\p{L}0-9-'./:]*\b/gu)
      if (words) {
        firstWords.push(words[0])
      }
    }

    const firstWordsCounterAndSorter = new CharacterCounterAndSorter(firstWords)
    return firstWordsCounterAndSorter.getSortedCharacters()
  }
}