/**
 * Module for analyzing text.
 *
 * @author Anja Willsund <aw22hs@student.lnu.se>
 * @version 1.0.0
 */

import { CharacterCounterAndSorter } from './CharacterCounterAndSorter.js'
import { SentenceCounter } from './SentenceCounter.js'
import { WordCounter } from './WordCounter.js'

// TODO: Ändra ordning på metoderna

/**
 * Represents a card table.
 */
export class TextAnalyzer {
  #originalText = ''

  /**
   * Initializes a new instance of the TextAnalyzer class.
   *
   * @param {string} text - The text input.
   */
  constructor(text) {
    this.#validateTextInput(text)

    this.#originalText = text
  }

  /**
   * Counts the average number of sentences per paragraph in a text.
   *
   * @returns {number} - The average number of sentences per paragraph in
   * the text.
   */
  getAverageNumberOfSentencesPerParagraph() {
    const sentenceCounter = new SentenceCounter(this.#originalText)
    
    const average = Math.round(sentenceCounter.getSentenceCount() / 
      this.getParagraphsCount())

    return average ? average : 0
  }

  /**
   * Counts the average number of words per sentence in a text.
   *
   * @returns {number} - The average number of words per sentence in the text.
   */
  getAverageNumberOfWordsPerSentence() {
    const sentenceCounter = new SentenceCounter(this.#originalText)
    const wordCounter = new WordCounter(this.#originalText)

    const average = Math.round(wordCounter.getAllWordsCount() / 
      sentenceCounter.getSentenceCount())

    return average ? average : 0
  }

    /**
     * Counts the number of characters in a text.
     *
     * @returns {number} - The number of characters in the text.
     */
    getCharacterCount() {
      const countableCharacters = []
      for (const character of this.#originalText) {
        if (!character.match(/[\n]/)) {
          countableCharacters.push(character)
        }
      }

      return countableCharacters.length
    }

    /**
     * Counts the number of times all different letters appear in a text.
     * Case insensitive.
     *
     * @returns {object} - An object with the letters in lower case as keys and
     * the number of times they appear as values.
     * @throws {Error} - If there are no letters in the string.
     */
    getLetterCountInAlphabeticalOrder() {
      const textInLowerCase = this.#originalText.toLowerCase()
      const letters = textInLowerCase.match(/\p{L}/gu)
      if (!letters) {
        throw new Error('There are no letters in the string.')
      }

      const letterCounterAndSorter = new CharacterCounterAndSorter(letters)
      return letterCounterAndSorter.getSortedCharacters()
    }

    /**
     * Counts the paragraphs in a text.
     *
     * @returns {number} - The number of paragraphs in the text.
     */
    getParagraphsCount() {
      const paragraphs = this.#originalText.split(/\n\n/)
      for (const paragraph of paragraphs) {
        if (paragraph === '') {
          paragraphs.splice(paragraphs.indexOf(paragraph), 1)
        }
      }

      return paragraphs.length
    }

    #validateTextInput(text) {
      if (!text) {
        throw new Error('There are no characters in the string.')
      }
    }
  }
