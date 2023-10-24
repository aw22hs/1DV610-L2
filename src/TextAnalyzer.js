/**
 * Module for analyzing text.
 *
 * @author Anja Willsund <aw22hs@student.lnu.se>
 * @version 1.0.0
 */

import { SentenceAnalyzer } from './SentenceAnalyzer.js'
import { WordValidator } from './WordValidator.js'

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
    const sentenceAnalyzer = new SentenceAnalyzer(this.#originalText)

    return Math.round(sentenceAnalyzer.getSentenceCount() /
      this.getParagraphsCount())
  }

  /**
   * Counts the average number of words per sentence in a text.
   *
   * @returns {number} - The average number of words per sentence in the text.
   */
  getAverageNumberOfWordsPerSentence() {
    const sentenceAnalyzer = new SentenceAnalyzer(this.#originalText)

    return Math.round(this.getAllWordsCount() /
      sentenceAnalyzer.getSentenceCount())
  }

  /**
   * Counts the number of words in a text.
   *
   * @returns {number} - The number of words in the text.
   */
  getAllWordsCount() {
    // Regex looks for words that contain at least one letter but can also
    // contain numbers and the characters -, ', ., : and /
    // TODO: Göra en egen metod av detta?
    const words = this.#originalText
      .match(/\b[a-zA-Z0-9-'./:]*[a-zA-Z][a-zA-Z0-9-'./:]*\b/gi)
    // If the text only contains non-alphanumeric characters, match()
    // returns null
    if (words) {
      return words.length
    } else {
      throw new Error('There are no words in the string.')
    }
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
    const letters = textInLowerCase.match(/[a-z]/gi)
    if (!letters) {
      throw new Error('There are no letters in the string.')
    }

    return this.#countAndSortInAlphabeticalOrder(letters)
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

  /**
   * Counts the number of times a certain word appears in a text.
   * The word is case insensitive.
   *
   * @param {string} word - The word to be counted.
   * @returns {number} - The number of times the word appears in the text.
   */
  getSpecificWordCount(word) {
    new WordValidator(word)

    const regex = new RegExp('\\b' + word + '\\b', 'gi')

    // If the word is not found, match() returns null
    return this.#originalText.match(regex) ?
      this.#originalText.match(regex).length : 0
  }

  /**
   * Counts the number of times all different words appear in a text.
   * If the text is empty, returns an empty object.
   *
   * @returns {object} - An object with the words in lower case as keys and the
   * number of times they appear as values.
   * @throws {Error} - If there are no words in the string.
   */
  getWordCountInAlphabeticalOrder() {
    // Make the words lower case and then split the text into words based on one
    // or more non-alphanumeric characters plus the characters -, ', ., : and /
    const words = this.#originalText.toLowerCase().match(/\b[-'.:/a-z]+\b/gi)
    if (!words) {
      throw new Error('There are no words in the string.')
    }

    return this.#countAndSortInAlphabeticalOrder(words)
  }

  /**
   * Gets the first word of each sentence sorted in alphabetical order.
   *
   * @returns {object} - First word of each sentence in alphabetical order.
   */
  getFirstWordsCountInAlphabeticalOrder() {
    if (this.getAllWordsCount() > 0) {
      const sentenceAnalyzer = new SentenceAnalyzer(this.#originalText)
      const firstWords = sentenceAnalyzer.getFirstWordsFromSentences();

      return this.#countAndSortInAlphabeticalOrder(firstWords)
    }
  }

  #countAndSortInAlphabeticalOrder(characters) {
    // Characters can be either letters or words
    const characterCount = {}
    for (const character of characters) {
      if (character === '') {
        return
      }
      if (characterCount[character] === undefined) {
        characterCount[character] = 1
      } else {
        characterCount[character] += 1
      }
    }

    const sortedCharacterCount = {}
    // Sorts the 'characterCount' object in alphabetical order
    Object.keys(characterCount).sort().forEach(key => {
      sortedCharacterCount[key] = characterCount[key]
    })

    return sortedCharacterCount
  }

  #validateTextInput(text) {
    if (!text) {
      throw new Error('Invalid input. There are no characters in the string.')
    }
  }
}
