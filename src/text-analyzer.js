/**
 * Module for analyzing text.
 *
 * @author Anja Willsund <aw22hs@student.lnu.se>
 * @version 1.0.0
 */

// TODO: Lägg till undantagshantering

/**
 * Counts the number of words in a text.
 *
 * @param {string} text - The text to be analyzed.
 * @returns {number} - The number of words in the text.
 */
export function countWords (text) {
  if (text === '') {
    return 0
  }
  return text.split(' ').length
}

/**
 * Counts the number of characters in a text.
 *
 * @param {string} text - The text to be analyzed.
 * @returns {number} - The number of characters in the text.
 */
export function countCharacters (text) {
  if (text === '') {
    return 0
  }
  return text.length
}

/**
 * Counts the number of times a certain word appears in a text.
 * The word is case insensitive.
 *
 * @param {string} text - The text to be analyzed.
 * @param {string} word - The word to be counted.
 * @returns {number} - The number of times the word appears in the text.
 */
export function countWord (text, word) {
  if (text === '') {
    return 0
  }
  const regex = new RegExp(word, 'gi')
  return text.match(regex).length
}

/**
 * Counts the number of times all different letters appear in a text.
 * Only includes lower case letters.
 * If the text is empty, returns an empty object.
 *
 * @param {string} text - The text to be analyzed.
 * @returns {object} - An object with the letters in lower case as keys and the number of times they appear as values.
 */
export function countLettersFrequency (text) {
  if (text === '') {
    return {}
  }

  // Make the letters lower case
  text = text.toLowerCase()
  const regex = /[a-z]/gi
  const letters = text.match(regex)
  const letterCount = {}
  letters.forEach(letter => {
    if (letterCount[letter] === undefined) {
      letterCount[letter] = 1
    } else {
      letterCount[letter] += 1
    }
  })

  // Return the object sorted in alphabetical order
  const sortedLetterCount = {}
  Object.keys(letterCount).sort().forEach(key => {
    sortedLetterCount[key] = letterCount[key]
  })
  return sortedLetterCount
}
