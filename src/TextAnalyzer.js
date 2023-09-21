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
   * An array of the sentences in the original text.
   *
   * @type {string}
   */
  #sentences = []

  /**
   * An array of the trimmed lines from the original text.
   *
   * @type {string[]}
   */
  #trimmedLines = []

  /**
   * The updated text with replaced words.
   *
   * @type {string}
   */
  #updatedTextWithReplacedWords = ''

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
  countAllWords () {
    // Regex looks for words that contain at least one letter but can also contain the characters -, ', ., : and /
    const words = this.#originalText.match(/\b[-'.:/a-zA-Z]+\b/gi)
    // If the text only contains non-alphanumeric characters, match() returns null
    return words ? words.length : 0
  }

  /**
   * Gets the number of characters in the text.
   *
   * @returns {number} - The number of characters in the text.
   */
  getCharacterCount () {
    return this.#countCharacters()
  }

  /**
   * Counts the number of characters in a text.
   *
   * @returns {number} - The number of characters in the text.
   */
  #countCharacters () {
    const countableCharacters = []
    for (const character of this.#originalText) {
      if (!character.match(/[\n]/)) {
        countableCharacters.push(character)
      }
    }

    return countableCharacters.length
  }

  /**
   * Counts the number of times a certain word appears in a text.
   * The word is case insensitive.
   *
   * @param {string} word - The word to be counted.
   * @returns {number} - The number of times the word appears in the text.
   */
  countSpecificWord (word) {
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
   * @returns {object} - An object with the characters as keys and the number of times they appear as values.
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
    const textInLowerCase = this.#originalText.toLowerCase()
    const letters = textInLowerCase.match(/[a-z]/gi)

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
    // Update formatting of the words to be replaced and the new words to replace with
    const wordToReplaceWithAllLettersLowerCase = wordToReplace.toLowerCase()
    const wordToReplaceWithFirstLetterUpperCase = wordToReplaceWithAllLettersLowerCase.charAt(0).toUpperCase() + wordToReplaceWithAllLettersLowerCase.slice(1)

    const wordsToReplace = [wordToReplaceWithAllLettersLowerCase, wordToReplaceWithFirstLetterUpperCase]

    // Check if wordToReplace matches the exact format of any of the words in wordsToReplace
    let wordToReplaceMatchesExactFormat = false
    wordsToReplace.forEach(word => {
      if (word === wordToReplace) {
        wordToReplaceMatchesExactFormat = true
      }
    })

    if (!wordToReplaceMatchesExactFormat) {
      throw new Error('The word to replace does not match the correct format. All letters need to be lower case or the first letter needs to be upper case and the rest of the letters need to be lower case.')
    }

    const newWordWithAllLettersLowerCase = newWord.toLowerCase()
    const newWordWithFirstLetterUpperCase = newWordWithAllLettersLowerCase.charAt(0).toUpperCase() + newWordWithAllLettersLowerCase.slice(1)

    const newWords = [newWordWithAllLettersLowerCase, newWordWithFirstLetterUpperCase]

    if (this.#updatedTextWithReplacedWords === '') {
      this.#updatedTextWithReplacedWords = this.#originalText
    }

    // Replace the words in the original text
    for (let i = 0; i < wordsToReplace.length; i++) {
    // Replace the words with the exact same formatting as one of the words in wordsToReplace
      this.#updatedTextWithReplacedWords = this.#updatedTextWithReplacedWords.replace(new RegExp('\\b' + wordsToReplace[i] + '\\b', 'g'), newWords[i])
    }

    return this.#updatedTextWithReplacedWords
  }

  /**
   * Replaces all words that has the exact same formatting as the word to replace.
   *
   * @param {string} wordToReplace - The word to be replaced.
   * @param {string} newWord - The word to replace with.
   * @returns {string} - The new text.
   */
  replaceWordsWithExactFormatting (wordToReplace, newWord) {
    if (this.#updatedTextWithReplacedWords === '') {
      this.#updatedTextWithReplacedWords = this.#originalText
    }

    this.#updatedTextWithReplacedWords = this.#updatedTextWithReplacedWords.replace(new RegExp('\\b' + wordToReplace + '\\b', 'g'), newWord)

    return this.#updatedTextWithReplacedWords
  }

  /**
   * Counts the percentage of times a certain word appears in a text.
   *
   * @param {string} word - The word to be counted.
   * @returns {number} - The percentage of times the word appears in the text.
   */
  countWordPercentageFrequency (word) {
    const numberOfTimesWordOccurs = this.countSpecificWord(word)
    const numberOfWords = this.countAllWords()
    return Math.round((numberOfTimesWordOccurs / numberOfWords) * 100)
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
    return this.#checkLetterCountDifference()
  }

  /**
   * Checks if the original text has been updated. If yes, counts
   * the difference between the length of the original text
   * and the updated text.
   *
   * @returns {string} - A string that states the letter count
   * difference between the two strings, if there is a difference.
   */
  #checkLetterCountDifference () {
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
      // Remove the dash at the beginning of the negative number
      difference = characterDifference.toString().substring(1)
      longerText = 'original text'
      shorterText = 'updated text'
    }
    return `The ${longerText} is ${difference} character(s) longer than the ${shorterText}.`
  }

  /**
   * Splits the original text into an array with the different sentences.
   */
  #getSentencesFromText () {
    if (this.countAllWords() > 0) {
      this.#sentences = this.#originalText.split(/[.!?]+/)
    } else {
      throw new Error('There are no sentences in the string.')
    }
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
   * Call methods to get sentences from text and trim sentences.
   */
  #getAndTrimSentences () {
    this.#getSentencesFromText()
    this.#trimSentences()
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
   * Gets the first word of each sentence.
   *
   * @returns {string[]} - First word of each sentence.
   */
  #getFirstWordsFromSentences () {
    this.#getAndTrimSentences()
    return this.#splitSentencesIntoWordsAndKeepFirstWord()
  }

  /**
   * Gets the first word of each sentence sorted in aplhabetical order.
   *
   * @returns {string[]} - First word of each sentence in aplhabetical order.
   */
  getFirstWordsInAlphabeticalOrder () {
    return this.#countAndSortInAlphabeticalOrder(this.#getFirstWordsFromSentences())
  }

  /**
   * Gets the first word of each sentence sorted in occurance order.
   *
   * @returns {string[]} - First word of each sentence in occurance order.
   */
  getFirstWordsInOccuranceOrder () {
    return this.#changeToOccuranceOrder(this.getFirstWordsInAlphabeticalOrder())
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
    console.log('Number of sentences: ' + this.#sentences.length)
    // const numberOfSentences = this.#originalText.split(/[.!?]+/).length
    const numberOfWords = this.countAllWords()
    return Math.round(numberOfWords / this.#sentences.length)
  }

  /**
   * Counts the average number of sentences per paragraph in a text.
   *
   * @returns {number} - The average number of sentences per paragraph in the text.
   */
  averageNumberOfSentencesPerParagraph () {
    const numberOfParagraphs = this.#originalText.split(/\n+/).length
    const numberOfSentences = this.#originalText.split(/[.!?]+/).length
    return Math.round(numberOfSentences / numberOfParagraphs)
  }

  /**
   * Counts the paragraphs in a text.
   *
   * @returns {number} - The number of paragraphs in the text.
   */
  countParagraphs () {
    return this.#originalText.split(/\n\n/).length
  }

  /**
   * Splits text into lines. Trims the lines.
   */
  #splitTextIntoTrimmedLines () {
    const lines = this.#originalText.split('\n')
    this.#trimmedLines = lines.map(line => line.trim())
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
   * Counts all the lines in a text, excluding empty lines.
   *
   * @returns {number} - The number of lines in a text.
   */
  countNotEmptyLines () {
    let count = 0
    for (const line of this.#trimmedLines) {
      if (line !== '') {
        count++
      }
    }
    return count
  }
}

// Count paragraphs and sentences per paragraph
// Räkna antal ord och ta fram medelvärde på antal tecken
// Kapa av texten efter ett visst antal tecken och returnera den nya texten
// KOlla vilken början av mening/Stycke som är vanligast
// Lägg publika metoder överst
// Behövs mer validering?
