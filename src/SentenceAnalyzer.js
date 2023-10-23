/**
 * Module for analyzing sentences.
 *
 * @author Anja Willsund <aw22hs@student.lnu.se>
 * @version 1.0.0
 */

export class SentenceAnalyzer {
  #originalText = ''
  #sentences = []

  /**
   * Initializes a new instance of the SentenceAnalyzer class.
   *
   * @param {string} text - The text input.
   */
  constructor(text) {
    this.#originalText = text
    this.#getAndTrimSentences()
  }

  #getAndTrimSentences() {
    this.#getSentencesFromText()
    this.#trimSentencesFromWhitespace()
  }

  #getSentencesFromText() {
    this.#sentences = this.#originalText.split(/[.!?]+/)
  }

  #trimSentencesFromWhitespace() {
    for (let i = 0; i < this.#sentences.length; i++) {
      this.#sentences[i] = this.#sentences[i].trim()
      if (this.#sentences[i] === '') {
        this.#sentences.splice(i, 1)
      }
    }
  }

  /**
   * Gets the number of sentences.
   *
   * @returns {number} - The number of sentences.
   */
  getSentenceCount() {
    return this.#sentences.length
  }

  /**
   * Gets the first word of each sentence.
   * 
   * @returns {string[]} - The first word of each sentence in an array.
   */
  getFirstWordsFromSentences() {
    const firstWords = []
    for (const sentence of this.#sentences) {
      const words = sentence.match(/\b[-'.:/a-zA-Z]+\b/gi)
      firstWords.push(words[0])
    }
    return firstWords
  }
}