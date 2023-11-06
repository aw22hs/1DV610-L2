/**
 * Module for counting lines.
 *
 * @author Anja Willsund <aw22hs@student.lnu.se>
 * @version 1.0.0
 */

export class LineCounter {
  #trimmedLines = []

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

  getAllLinesCount() {
    return this.#trimmedLines.length
  }

  getNonEmptyLinesCount() {
    let count = 0
    for (const line of this.#trimmedLines) {
      if (line !== '') {
        count++
      }
    }
    return count
  }

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