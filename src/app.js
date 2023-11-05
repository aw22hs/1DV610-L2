/**
 * The starting point of the application.
 *
 * @author Anja Willsund <aw22hs@student.lnu.se>
 * @version 1.0.0
 */

import { TextAnalyzer } from './TextAnalyzer.js'
import { SentenceCounter } from './SentenceCounter.js'
import { UpdatedTextAnalyzer } from './UpdatedTextAnalyzer.js'
import { LineCounter } from './LineCounter.js'
import { WordCounter } from './WordCounter.js'

export function createAnalyzers(text) {
  return {
    textAnalyzer: new TextAnalyzer(text),
    sentenceCounter: new SentenceCounter(text),
    updatedTextAnalyzer: new UpdatedTextAnalyzer(text),
    lineCounter: new LineCounter(text),
    wordCounter: new WordCounter(text)
  }
}
