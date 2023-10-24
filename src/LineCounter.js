/**
 * Module for counting lines.
 *
 * @author Anja Willsund <aw22hs@student.lnu.se>
 * @version 1.0.0
 */

export class LineCounter {
  #trimmedLines = []

  /**
   * Initializes a new instance of the LineCounter class.
   *
   * @param {string} text - The text input.
   */
  constructor(text) {
    this.#splitTextIntoTrimmedLines(text)
  }

  #splitTextIntoTrimmedLines(text) {
    const lines = text.split('\n')
    this.#trimmedLines = []
    for (const line of lines) {
      this.#trimmedLines.push(line.trim())
    }
  }

  /**
   * Counts all the lines in a text, including empty lines.
   *
   * @returns {number} - The number of lines in a text.
   */
  getAllLinesCount() {
    return this.#trimmedLines.length
  }

  /**
   * Counts all the lines in a text, excluding empty lines.
   *
   * @returns {number} - The number of not empty lines in a text.
   */
  getNonEmptyLinesCount() {
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
   * @returns {number} - Number of lines that are not empty or that does not
   * start with / or *.
   */
  getNonEmptyLinesWithoutJSCommentsCount() {
    let count = 0
    for (const line of this.#trimmedLines) {
      if (line !== '' && !line.startsWith('/') && !line.startsWith('*')) {
        count++
      }
    }
    return count
  }
}