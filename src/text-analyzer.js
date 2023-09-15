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
