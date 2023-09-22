/**
 * Test for TextAnalyzer
 *
 * @author Anja Willsund <aw22hs@lnu.student.se>
 * @version 1.0.0
 */

import { TextAnalyzer } from '../src/TextAnalyzer.js'
import fs from 'fs'

function readFile () {
  const filePath = 'test/loremIpsum.test.md'
  const fileContent = fs.readFileSync(filePath, 'utf8')
  return fileContent
}

const text = readFile()
const textAnalyzer = new TextAnalyzer(text)

// -------------------------------------------------
// Create TextAnalyzer instance with empty string
// -------------------------------------------------

describe('instantiating TextAnalyzer', () => {
  test('should throw an error when input is empty', () => {
    // Use a function to create an instance to ensure that the constructor throws an error
    const createTextAnalyzerWithEmptyText = () => {
      new TextAnalyzer('')
    }
    expect(createTextAnalyzerWithEmptyText).toThrowError('There are no characters in the string.')
  })
})

// -------------------------------------------------
// Average number of sentences per paragraph
// -------------------------------------------------

describe('average number of sentences per paragraph', () => {
  test('should throw an error when there are no sentences', () => {
    const textAnalyzer = new TextAnalyzer('.')
    expect(() => textAnalyzer.averageNumberOfWordsPerSentence()).toThrowError('There are no sentences in the string.')
  })

  test('should return 1 when there is one sentence', () => {
    const textAnalyzer = new TextAnalyzer('This is a sentence.')
    expect(textAnalyzer.averageNumberOfSentencesPerParagraph()).toBe(1)
  })
})
