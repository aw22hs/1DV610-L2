/**
 * Tests for LineCounter.
 *
 * @author Anja Willsund <aw22hs@lnu.student.se>
 * @version 1.0.0
 */

import { LineCounter } from '../src/LineCounter.js'
import fs from 'fs'

const filePathLoremIpsum = 'test/testdata/loremIpsum.md'
const filePathExampleCode = 'test/testdata/exampleCode.js'

function readFile (filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8')
  return fileContent
}

const textExampleCode = readFile(filePathExampleCode)
const textLoremIpsum = readFile(filePathLoremIpsum)
const lineCounterBlankSpace = new LineCounter(' ')
const lineCounterDot = new LineCounter('.')
const lineCounterExampleCode = new LineCounter(textExampleCode)
const lineCounterLoremIpsum = new LineCounter(textLoremIpsum)
const lineCounterOneSentence = new LineCounter('This is a sentence.')
const lineCounterOneWord = new LineCounter('Word.')

// -------------------------------------------------
// Get all lines count
// -------------------------------------------------

describe('count all lines', () => {
  test('should return 1 when there is one word', () => {
    expect(lineCounterOneWord.getAllLinesCount()).toBe(1)
  })

  test('should return 1 when there is one sentence on one line', () => {
    expect(lineCounterOneSentence.getAllLinesCount()).toBe(1)
  })

  test('should return 9 when using text from loremIpsum file as input', () => {
    expect(lineCounterLoremIpsum.getAllLinesCount()).toBe(9)
  })

  test('should return 1 when the input text is a dot', () => {
    expect(lineCounterDot.getAllLinesCount()).toBe(1)
  })

  test('should return 1 when the input text is a blank space', () => {
    expect(lineCounterBlankSpace.getAllLinesCount()).toBe(1)
  })
})

// -------------------------------------------------
// Get non empty lines count
// -------------------------------------------------

describe('count not empty lines', () => {
  test('should return 1 when there is one word', () => {
    expect(lineCounterOneWord.getNonEmptyLinesCount()).toBe(1)
  })

  test('should return 1 when there is one sentence on one line', () => {
    expect(lineCounterOneSentence.getNonEmptyLinesCount()).toBe(1)
  })

  test('should return 5 when using text from loremIpsum file as input', () => {
    expect(lineCounterLoremIpsum.getNonEmptyLinesCount()).toBe(5)
  })

  test('should return 1 when only one character input', () => {
    expect(lineCounterDot.getNonEmptyLinesCount()).toBe(1)
  })

  test('should return 0 when the input text is a blank space', () => {
    expect(lineCounterBlankSpace.getNonEmptyLinesCount()).toBe(0)
  })
})

// -------------------------------------------------
// Get non empty lines without JS comments count
// -------------------------------------------------

describe('count non empty lines without JS comments', () => {
  test('should return 5 as the number of non empty lines without JS comments when using text from loremIpsum file as input',
    () => {
    expect(lineCounterLoremIpsum.getNonEmptyLinesWithoutJSCommentsCount()).toBe(5)
  })

  test('should return 1 as the number of non empty lines without JS comments when only one character input', () => {
    expect(lineCounterDot.getNonEmptyLinesWithoutJSCommentsCount()).toBe(1)
  })

  test('should return 0 as the number of non empty lines without JS comments when the input is a blank space', () => {
    expect(lineCounterBlankSpace.getNonEmptyLinesWithoutJSCommentsCount()).toBe(0)
  })

  test('should return 3 as the number of non empty lines without JS comments when using text from exampleCode file as input', () => {
    expect(lineCounterExampleCode.getNonEmptyLinesWithoutJSCommentsCount()).toBe(3)
  })
})

