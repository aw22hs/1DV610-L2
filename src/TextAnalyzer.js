/**
 * Module for analyzing text.
 *
 * @author Anja Willsund <aw22hs@student.lnu.se>
 * @version 1.0.0
 */

/**
 * Represents a card table.
 */
export class TextAnalyzer {
  #letterCountAlphabeticalOrder = {}
  #originalText = ''
  #sentences = []
  #trimmedLines = []
  #updatedTextWithReplacedWords = ''
  #wordCountAlphabeticalOrder = {}

  /**
   * Initializes a new instance of the TextAnalyzer class.
   *
   * @param {string} text - The text input.
   */
  constructor (text) {
    this.#validateTextInput(text)

    this.#originalText = text
  }

  /**
   * Counts the average number of sentences per paragraph in a text.
   *
   * @returns {number} - The average number of sentences per paragraph in the text.
   */
  averageNumberOfSentencesPerParagraph () {
    if (this.#sentences.length === 0) {
      this.#getAndTrimSentences()
    }
    return Math.round(this.#sentences.length / this.countParagraphs())
  }

  /**
   * Counts the average number of words per sentence in a text.
   *
   * @returns {number} - The average number of words per sentence in the text.
   */
  averageNumberOfWordsPerSentence () {
    if (this.#sentences.length === 0) {
      this.#getAndTrimSentences()
    }
    return Math.round(this.countAllWords() / this.#sentences.length)
  }

  /**
   * Counts all the lines in a text, including empty lines.
   *
   * @returns {number} - The number of lines in a text.
   */
  countAllLines () {
    if (this.#trimmedLines.length === 0) {
      this.#splitTextIntoTrimmedLines()
    }
    return this.#trimmedLines.length
  }

  /**
   * Counts the number of words in a text.
   *
   * @returns {number} - The number of words in the text.
   */
  countAllWords () {
    // Regex looks for words that contain at least one letter but can also contain numebrs and the characters -, ', ., : and /
    const words = this.#originalText.match(/\b[a-zA-Z0-9-'./:]*[a-zA-Z][a-zA-Z0-9-'./:]*\b/gi)
    // If the text only contains non-alphanumeric characters, match() returns null
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
  countCharacters () {
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
   * @returns {object} - An object with the letters in lower case as keys and the number of times they appear as values.
   * @throws {Error} - If there are no letters in the string.
   */
  countLettersFrequencyAlphabeticalOrder () {
    const textInLowerCase = this.#originalText.toLowerCase()
    const letters = textInLowerCase.match(/[a-z]/gi)
    if (!letters) {
      throw new Error('There are no letters in the string.')
    }

    this.#letterCountAlphabeticalOrder = this.#countAndSortInAlphabeticalOrder(letters)

    return this.#letterCountAlphabeticalOrder
  }

  /**
   * Counts all the lines in a text, excluding empty lines.
   *
   * @returns {number} - The number of not empty lines in a text.
   */
  countNotEmptyLines () {
    if (this.#trimmedLines.length === 0) {
      this.#splitTextIntoTrimmedLines()
    }
    let count = 0
    for (const line of this.#trimmedLines) {
      if (line !== '') {
        count++
      }
    }
    return count
  }

  /**
   * Counts line that could be interpreted as JavaScript code. 
   * Excludes empty lines and lines that start with / or *.
   *
   * @returns {number} - Number of lines that are not empty or that does not start with / or *.
   */
  countNonEmptyLinesWithoutJSComments () {
    if (this.#trimmedLines.length === 0) {
      this.#splitTextIntoTrimmedLines()
    }
    let count = 0
    for (const line of this.#trimmedLines) {
      if (line !== '' && !line.startsWith('/') && !line.startsWith('*')) {
        count++
      }
    }
    return count
  }

  /**
   * Counts the paragraphs in a text.
   *
   * @returns {number} - The number of paragraphs in the text.
   */
  countParagraphs () {
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
  countSpecificWord (word) {
    this.#validateWordInput(word)
    const regex = new RegExp('\\b' + word + '\\b', 'gi')

    // If the word is not found, match() returns null
    return this.#originalText.match(regex) ? this.#originalText.match(regex).length : 0
  }

  /**
   * Counts the number of times all different words appear in a text.
   * If the text is empty, returns an empty object.
   *
   * @returns {object} - An object with the words in lower case as keys and the number of times they appear as values.
   * @throws {Error} - If there are no words in the string.
   */
  countWordsFrequencyAlphabeticalOrder () {
    // Make the words lower case and then split the text into words based on one or more non-alphanumeric characters plus the characters -, ', ., : and /
    const words = this.#originalText.toLowerCase().match(/\b[-'.:/a-z]+\b/gi)

    if (!words) {
      throw new Error('There are no words in the string.')
    }

    this.#wordCountAlphabeticalOrder = this.#countAndSortInAlphabeticalOrder(words)

    return this.#wordCountAlphabeticalOrder
  }


  /**
   * Gets the first word of each sentence sorted in alphabetical order.
   *
   * @returns {string[]} - First word of each sentence in alphabetical order.
   */
  getFirstWordsInAlphabeticalOrder () {
    return this.#countAndSortInAlphabeticalOrder(this.#getFirstWordsFromSentences())
  }

  /**
   * Checks if the updated text is longer or shorter than the original text.
   * If there is a difference, returns a string with information about the difference.
   * If there is no difference, returns a string with information about that.
   * If no words have been replaced, returns a string with information about that.
   *
   * @returns {string} - A string with information about the difference in length between the original text and the updated text.
   */
  getLetterCountDifferenceBetweenOriginalAndUpdatedText () {
      if (this.#updatedTextWithReplacedWords === '') {
        return 'The original text has not been updated.'
      }
      const characterDifference = this.#updatedTextWithReplacedWords.length - this.#originalText.length
      if (characterDifference === 0) {
        if (this.#updatedTextWithReplacedWords === this.#originalText) {
          return 'No words have been replaced.'
        }
        return 'The original text and the updated text are the same length.'
      }
      let longerText = 'updated text'
      let shorterText = 'original text'
      let difference = characterDifference
      if (characterDifference < 0) {
        // Removes the dash at the beginning of the negative number
        difference = characterDifference.toString().substring(1)
        longerText = 'original text'
        shorterText = 'updated text'
      }
      return `The ${longerText} is ${difference} character(s) longer than the ${shorterText}.`
    }

  /**
   * Gets the number of sentences.
   *
   * @returns {number} - The number of sentences.
   */
  getSentenceCount () {
    this.#getAndTrimSentences()
    return this.#sentences.length
  }

  /**
   * Replaces all words that has the exact same formatting as the word to replace.
   *
   * @param {string} wordToReplace - The word to be replaced.
   * @param {string} newWord - The word to replace with.
   * @returns {string} - The new text.
   */
  replaceWordsWithExactFormatting (wordToReplace, newWord) {
    this.#validateWordInput(wordToReplace)
    this.#validateWordInput(newWord)

    if (this.#updatedTextWithReplacedWords === '') {
      this.#updatedTextWithReplacedWords = this.#originalText
    }

    this.#updatedTextWithReplacedWords = this.#updatedTextWithReplacedWords.replace(new RegExp('\\b' + wordToReplace + '\\b', 'g'), newWord)

    return this.#updatedTextWithReplacedWords
  }

  /**
   * Replaces a word with another word in a text and returns the new text.
   * Replaces all words that has all letters in lower case and all words with
   * the first letter in upper case and the rest of the letters in lower case.
   *
   * @param {string} wordToReplace - The word to be replaced.
   * @param {string} newWord - The word to replace with.
   * @returns {string} - The new text.
   * @throws {Error} - If the word to replace does not match the correct format.
   */
  replaceWordsWithTwoDifferentFormattings (wordToReplace, newWord) {
    this.#validateWordInput(wordToReplace)
    this.#validateWordInput(newWord)

    // Update formatting of the words to be replaced and the new words to replace with
    const wordToReplaceWithAllLettersLowerCase = wordToReplace.toLowerCase()
    const wordToReplaceWithFirstLetterUpperCase = wordToReplaceWithAllLettersLowerCase.charAt(0).toUpperCase() + wordToReplaceWithAllLettersLowerCase.slice(1)

    const wordsToReplace = [wordToReplaceWithAllLettersLowerCase, wordToReplaceWithFirstLetterUpperCase]

    // Checks if wordToReplace matches the exact format of any of the words in wordsToReplace
    let wordToReplaceMatchesExactFormat = false
    for (const word of wordsToReplace) {
      if (word === wordToReplace) {
        wordToReplaceMatchesExactFormat = true
      }
    }

    if (!wordToReplaceMatchesExactFormat) {
      throw new Error('The word to replace does not match the correct format. All letters need to be lower case or the first letter needs to be upper case and the rest of the letters need to be lower case.')
    }

    const newWordWithAllLettersLowerCase = newWord.toLowerCase()
    const newWordWithFirstLetterUpperCase = newWordWithAllLettersLowerCase.charAt(0).toUpperCase() + newWordWithAllLettersLowerCase.slice(1)

    const newWords = [newWordWithAllLettersLowerCase, newWordWithFirstLetterUpperCase]

    if (this.#updatedTextWithReplacedWords === '') {
      this.#updatedTextWithReplacedWords = this.#originalText
    }

    for (let i = 0; i < wordsToReplace.length; i++) {
    // Replace the words in the original text with the exact same formatting as one of the words in wordsToReplace
      this.#updatedTextWithReplacedWords = this.#updatedTextWithReplacedWords.replace(new RegExp('\\b' + wordsToReplace[i] + '\\b', 'g'), newWords[i])
    }

    return this.#updatedTextWithReplacedWords
  }

  #countAndSortInAlphabeticalOrder (characters) {
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

  /**
   * Call methods to get sentences from text and trim sentences.
   */
  #getAndTrimSentences () {
    this.#getSentencesFromText()
    this.#trimSentences()
  }

  #getFirstWordsFromSentences () {
    this.#getAndTrimSentences()
    return this.#splitSentencesIntoWordsAndKeepFirstWord()
  }

  /**
   * Splits the original text into an array with the different sentences.
   */
  #getSentencesFromText () {
    if (this.countAllWords() > 0) {
      this.#sentences = this.#originalText.split(/[.!?]+/)
    }
  }

  /**
   * Splits the sentences into separate words and save the forst
   * words in each sentence in a new array.
   *
   * @returns {string[]} - First word of each sentence.
   */
  #splitSentencesIntoWordsAndKeepFirstWord () {
    const firstWords = []
    for (const sentence of this.#sentences) {
      const words = sentence.match(/\b[-'.:/a-zA-Z]+\b/gi)
      firstWords.push(words[0])
    }
    return firstWords
  }

  /**
   * Splits text into lines. Trims the lines.
   */
  #splitTextIntoTrimmedLines () {
    const lines = this.#originalText.split('\n')
    this.#trimmedLines = lines.map(line => line.trim())
  }

  /**
   * Trim sentences from whitespace.
   */
  #trimSentences () {
    this.#sentences = this.#sentences.map(sentence => sentence.trim())
    for (let i = 0; i < this.#sentences.length; i++) {
      if (this.#sentences[i] === '') {
        this.#sentences.splice(i, 1)
      }
    }
  }

  /**
   * Throws exception if there are no characters in the string input.
   *
   * @param {string} text - The text input.
   * @throws {Error} - If there are no characters in the string.
   */
  #validateTextInput (text) {
    if (!text) {
      throw new Error('Invalid input. There are no characters in the string.')
    }
  }

  /**
   * Checks if the submitted word has the right format.
   * The word can contain letters, numbers, -, ', ., : and /.
   * The word must contain at least one letter.
   *
   * @param {string} word - The word to be checked.
   * @throws {Error} - If the submitted word does not have the right format.
   * @returns {boolean} - True if the word has the right format, otherwise false.
   */
  #validateWordInput (word) {
    if (!word) {
      throw new Error('Invalid input. The submitted word is empty.')
    }
    if (!word.match(/\b[a-zA-Z0-9.'/:-]*[a-zA-Z][a-zA-Z0-9.'/:-]\b/gi)) {
      throw new Error('The submitted word does not have the right format.')
    }
    return true
  }
}
