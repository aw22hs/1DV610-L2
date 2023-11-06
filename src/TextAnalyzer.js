/**
 * Module for analyzing text.
 *
 * @author Anja Willsund <aw22hs@student.lnu.se>
 * @version 2.0.0
 */

import { CharacterCounterAndSorter } from './CharacterCounterAndSorter.js'
import { SentenceCounter } from './SentenceCounter.js'
import { WordCounter } from './WordCounter.js'

export class TextAnalyzer {
  #originalText = ''

  constructor(text) {
    this.#originalText = text

    this.#validateTextInput(text)
  }

  getAverageNumberOfSentencesPerParagraph() {
    const sentenceCounter = new SentenceCounter(this.#originalText)
    const average = Math.round(sentenceCounter.getSentenceCount() / this.getParagraphsCount())

    return average ? average : 0
  }

  getAverageNumberOfWordsPerSentence() {
    const sentenceCounter = new SentenceCounter(this.#originalText)
    const wordCounter = new WordCounter(this.#originalText)
    const average = Math.round(wordCounter.getAllWordsCount() / sentenceCounter.getSentenceCount())

    return average ? average : 0
  }

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
   * the number of times they appear as values sorted in alphabetical order.
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
    } else if (this.getCharacterCount() > 10000) {
      throw new Error('There are more than 10 000 characters in the string.')
    }
  }
}
