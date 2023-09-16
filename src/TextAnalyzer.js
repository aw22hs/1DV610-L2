/**
 * Module for analyzing text.
 *
 * @author Anja Willsund <aw22hs@student.lnu.se>
 * @version 1.0.0
 */

// TODO: Lägg till undantagshantering

/**
 * Represents a card table.
 */
export class TextAnalyzer {
  /**
   * The original text.
   *
   * @type {string}
   */
  #originalText

  /**
   * The sorted letter count.
   *
   * @type {object}
   */
  #sortedLetterCount = {}

  /**
   * Initializes a new instance of the TextAnalyzer class.
   *
   * @param {string} text - The text input.
   */
  constructor (text) {
    this.#originalText = text
  }

  /**
   * Checks if the original text is empty.
   *
   * @returns {boolean} - True if the original text is not empty, otherwise false.
   */
  #isOriginalTextEmpty () {
    if (this.#originalText.length === 0) {
      return true
    } else {
      return false
    }
  }

  /**
   * Counts the number of words in a text.
   *
   * @returns {number} - The number of words in the text.
   */
  #countWords () {
    if (this.#isOriginalTextEmpty) {
      return 0
    } else {
      return this.#originalText.split(' ').length
    }
  }

  /**
   * Counts the number of characters in a text.
   *
   * @returns {number} - The number of characters in the text.
   */
  countCharacters () {
    if (this.#isOriginalTextEmpty()) {
      return 0
    } else {
      return this.#originalText.length
    }
  }

  /**
   * Counts the number of times a certain word appears in a text.
   * The word is case insensitive.
   *
   * @param {string} word - The word to be counted.
   * @returns {number} - The number of times the word appears in the text.
   */
  #countWord (word) {
    if (this.#isOriginalTextEmpty()) {
      return 0
    }
    const regex = new RegExp('\\b' + word + '\\b', 'gi')
    return this.#originalText.match(regex) ? this.#originalText.match(regex).length : 0
  }

  /**
   * Counts the number of times all different letters appear in a text.
   * Only includes lower case letters.
   * If the text is empty, returns an empty object.
   *
   * @returns {object} - An object with the letters in lower case as keys and the number of times they appear as values.
   */
  countLettersFrequencyAlphabeticalOrder () {
    if (this.#originalText === '') {
      return {}
    }
    // Make the letters lower case
    const textInLowerCase = this.#originalText.toLowerCase()
    const regex = /[a-z]/gi
    const letters = textInLowerCase.match(regex)
    const letterCount = {}
    letters.forEach(letter => {
      if (letterCount[letter] === undefined) {
        letterCount[letter] = 1
      } else {
        letterCount[letter] += 1
      }
    })

    // Return the object sorted in alphabetical order
    Object.keys(letterCount).sort().forEach(key => {
      this.#sortedLetterCount[key] = letterCount[key]
    })
    return this.#sortedLetterCount
  }

  /**
   * Counts the number of times all different words appear in a text.
   * If the text is empty, returns an empty object.
   *
   * @param {string} text - The text to be analyzed.
   * @returns {object} - An object with the words in lower case as keys and the number of times they appear as values.
   */
  countWordsFrequency (text) {
    if (text === '') {
      return {}
    }

    // Make the words lower case and then split the text into words based on one or more non-alphanumeric characters
    const words = text.toLowerCase().split(/\W+/)

    const wordCount = {}
    words.forEach(word => {
      if (word === '') {
        return
      }
      if (wordCount[word] === undefined) {
        wordCount[word] = 1
      } else {
        wordCount[word] += 1
      }
    })

    // Return the object sorted in alphabetical order
    const sortedWordCount = {}
    // Sorts the 'wordCount' object in alphabetical order and puts the sorted key-value pairs in the 'sortedWordCount' object
    Object.keys(wordCount).sort().forEach(key => {
      sortedWordCount[key] = wordCount[key]
    })

    return sortedWordCount
  }

  /**
   * Replaces a word with another word in a text and returns the new text.
   * Replaces all words that has all letters in lower case, all letters in upper case and with
   * the first letter in upper case the rest of the letters in lower case.
   *
   * @param {string} text - The text to be analyzed.
   * @param {string} wordToReplace - The word to be replaced.
   * @param {string} newWord - The word to replace with.
   * @returns {string} - The new text.
   */
  replaceWordsWithThreeDifferentFormattings (text, wordToReplace, newWord) {
    if (text === '') {
      return ''
    }

    // Update formatting of the words to be replaced and the new words to replace with
    const wordToReplaceWithAllLettersLowerCase = wordToReplace.toLowerCase()
    const wordToReplaceWithFirstLetterUpperCase = wordToReplaceWithAllLettersLowerCase.charAt(0).toUpperCase() + wordToReplaceWithAllLettersLowerCase.slice(1)
    const wordToReplaceWithAllLettersUpperCase = wordToReplace.toUpperCase()
    const newWordWithAllLettersLowerCase = newWord.toLowerCase()
    const newWordWithFirstLetterUpperCase = newWordWithAllLettersLowerCase.charAt(0).toUpperCase() + newWordWithAllLettersLowerCase.slice(1)
    const newWordWithAllLettersUpperCase = newWord.toUpperCase()

    const wordsToReplace = [wordToReplaceWithAllLettersLowerCase, wordToReplaceWithFirstLetterUpperCase, wordToReplaceWithAllLettersUpperCase]
    const newWords = [newWordWithAllLettersLowerCase, newWordWithFirstLetterUpperCase, newWordWithAllLettersUpperCase]

    let updatedTextWithReplacedWords = text

    // Replace the words in the original text
    for (let i = 0; i < wordsToReplace.length; i++) {
    // Replace the words with the exact same formatting as one of the words in wordsToReplace
      updatedTextWithReplacedWords = updatedTextWithReplacedWords.replace(new RegExp('\\b' + wordsToReplace[i] + '\\b', 'g'), newWords[i])
    }

    return updatedTextWithReplacedWords
  }

  /**
   * Counts the percentage of times a certain word appears in a text.
   *
   * @param {string} text - The text to be analyzed.
   * @param {string} word - The word to be counted.
   * @returns {number} - The percentage of times the word appears in the text.
   */
  countWordPercentageFrequency (text, word) {
    if (text === '') {
      return 0
    }
    const numberOfTimesWordOccurs = this.#countWord(text, word)
    const numberOfWords = this.#countWords(text)
    return Math.round((numberOfTimesWordOccurs / numberOfWords) * 100)
  }
}
