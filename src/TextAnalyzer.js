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
   * The letter count sorted in alphabetical order.
   *
   * @type {object}
   */
  #letterCountAlphabeticalOrder = {}

  /**
   * The original text.
   *
   * @type {string}
   */
  #originalText

  /**
   * The word count sorted in alphabetical order.
   *
   * @type {object}
   */
  #wordCountAlphabeticalOrder = {}

  /**
   * Initializes a new instance of the TextAnalyzer class.
   *
   * @param {string} text - The text input.
   */
  constructor (text) {
    this.#checkLengthOfTextInput(text)

    this.#originalText = text
  }

  /**
   * Throws exception if there are no characters in the string input.
   *
   * @param {string} text - The text input.
   * @throws {Error} - If there are no characters in the string.
   */
  #checkLengthOfTextInput (text) {
    if (text.length === 0) {
      throw new Error('There are no characters in the string.')
    }
  }

  /**
   * Counts the number of words in a text.
   *
   * @returns {number} - The number of words in the text.
   */
  countWords () {
    // Regex looks for words that contain at least one letter
    const regex = /\w*[a-zA-Z]+\w*/
    const words = this.#originalText.match(regex)
    // If the text only contains non-alphanumeric characters, match() returns null
    return words ? words.length : 0
  }

  /**
   * Counts the number of characters in a text.
   *
   * @returns {number} - The number of characters in the text.
   */
  countCharacters () {
    if (this.#originalText.length === 0) {
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
    if (this.countCharacters === 0) {
      return 0
    }
    const regex = new RegExp('\\b' + word + '\\b', 'gi')

    // If the word is not found, match() returns null
    return this.#originalText.match(regex) ? this.#originalText.match(regex).length : 0
  }

  /**
   * Counts the number of times all different characters appear in a text.
   * The characters are sorted in frequency order.
   * If the text is empty, returns an empty object.
   *
   * @param {object} characterCountAlphabeticalOrder - An object with the characters in lower case as keys and the number of times they appear as values.
   * @param {Function} countCharactersFrequencyAlphabeticalOrder - A function that counts the number of times all different characters appear in a text.
   * @returns {object} - An object with the characters in lower case as keys and the number of times they appear as values.
   */
  #countCharactersFrequencyOccuranceOrder (characterCountAlphabeticalOrder, countCharactersFrequencyAlphabeticalOrder) {
    if (Object.keys(characterCountAlphabeticalOrder).length === 0) {
      countCharactersFrequencyAlphabeticalOrder()
    }

    const characterCountOccuranceOrder = this.#changeToOccuranceOrder(characterCountAlphabeticalOrder)

    return characterCountOccuranceOrder
  }

  /**
   * Changes an object with key-value pairs to an object with key-value pairs sorted in descending order based on the value.
   *
   * @param {object} elementsSortedInAlphabeticalOrder - An object with key-value pairs sorted in alphabetical order based on the key.
   * @returns {object} - An object with key-value pairs sorted in descending order based on the value.
   */
  #changeToOccuranceOrder (elementsSortedInAlphabeticalOrder) {
    // Object.entries() returns an array of a given object's own key/value pairs
    // map() destructures each key-value pair using [key, value] to extract the key and value.
    // It then constructs a new object using object literal notation { key, value }.
    // This creates an object with two properties: key and value, where the values for these
    // properties are taken from the destructured variables. map() returns an array of these objects.
    const elementsToBeSortedInOccuranceOrder = Object.entries(elementsSortedInAlphabeticalOrder).map(([key, value]) => ({ key, value }))
    // Sorts the array in descending order based on the value property
    elementsToBeSortedInOccuranceOrder.sort((a, b) => b.value - a.value)
    const elementsInOccuranceOrder = {}
    // Puts the sorted key-value pairs in the 'letterCountOccuranceOrder' object by using the original key as the key and the original value as the value
    elementsToBeSortedInOccuranceOrder.forEach(({ key, value }) => {
      elementsInOccuranceOrder[key] = value
    })

    return elementsInOccuranceOrder
  }

  /**
   * Counts the number of times all different characters appear in a text.
   * If the text is empty, returns an empty object.
   * The characters are sorted in alphabetical order.
   *
   * @param {string} characters - The characters to be counted.
   * @returns {object} - An object with the characters in lower case as keys and the number of times they appear as values.
   */
  #countAndSortInAlphabeticalOrder (characters) {
    const characterCount = {}
    characters.forEach(character => {
      if (character === '') {
        return
      }
      if (characterCount[character] === undefined) {
        characterCount[character] = 1
      } else {
        characterCount[character] += 1
      }
    })

    // Return the object sorted in alphabetical order
    const sortedCharacterCount = {}
    // Sorts the 'wordCount' object in alphabetical order and puts the sorted key-value pairs in the 'sortedWordCount' object
    Object.keys(characterCount).sort().forEach(key => {
      sortedCharacterCount[key] = characterCount[key]
    })

    return sortedCharacterCount
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

    this.#letterCountAlphabeticalOrder = this.#countAndSortInAlphabeticalOrder(letters)

    return this.#letterCountAlphabeticalOrder
  }

  /**
   * Counts the number of times all different letters appear in a text.
   * The letters are sorted in frequency order.
   *
   * @returns {object} - An object with the letters in lower case as keys and the number of times they appear as values.
   */
  countLettersFrequencyOccuranceOrder () {
    return this.#countCharactersFrequencyOccuranceOrder(this.#letterCountAlphabeticalOrder, this.countLettersFrequencyAlphabeticalOrder)
  }

  /**
   * Counts the number of times all different words appear in a text.
   * If the text is empty, returns an empty object.
   *
   * @returns {object} - An object with the words in lower case as keys and the number of times they appear as values.
   */
  countWordsFrequencyAlphabeticalOrder () {
    if (this.#originalText === '') {
      return {}
    }

    // Make the words lower case and then split the text into words based on one or more non-alphanumeric characters
    const wordsInLowerCase = this.#originalText.toLowerCase().split(/\W+/)

    this.#wordCountAlphabeticalOrder = this.#countAndSortInAlphabeticalOrder(wordsInLowerCase)

    return this.#wordCountAlphabeticalOrder
  }

  /**
   * Counts the number of times all different words appear in a text.
   * The words are sorted in frequency order.
   * If the text is empty, returns an empty object.
   *
   * @returns {object} - An object with the words in lower case as keys and the number of times they appear as values.
   */
  countWordsFrequencyOccuranceOrder () {
    return this.#countCharactersFrequencyOccuranceOrder(this.#wordCountAlphabeticalOrder, this.countWordsFrequencyAlphabeticalOrder)
  }

  // TODO: // Kolla att formatteringen på ord som ska ersättas stämmer dvs att det inte är ett ord med stora bokstäver i mitten av order
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
    const numberOfWords = this.countWords(text)
    return Math.round((numberOfTimesWordOccurs / numberOfWords) * 100)
  }
}

// Räkna stycken och ta fram medelvärde på antal tecken
// Räkna antal ord och ta fram medelvärde på antal tecken
// Byt ut ord med exakt case-sensitivity
