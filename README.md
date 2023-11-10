# TextAnalyzer
The TextAnalyzer is a JavaScript module designed to analyze text and provide various text statistics and manipulation functions. It can help you perform a range of tasks, from counting words and characters to analyzing sentence and paragraph structures within the text.

## Example
To use the module, call on the method `createAnalyzer()` and provide the text you want to analyze. The text used in this example will be reused when displaying examples of the different methods further down in this document.
```javascript
import { createAnalyzers } from 'text-analyzer'

const analyzer = createAnalyzers('This is a sentence, but this is not. THIS IS.')

const textAnalyzer = analyzers.textAnalyzer
const sentenceCounter = analyzers.sentenceCounter
const updatedTextAnalyzer = analyzers.updatedTextAnalyzer
const lineCounter = analyzers.lineCounter
const wordCounter = analyzers.wordCounter

const wordCount = wordCounter.getAllWordsCount()
console.log(`Number of words in the text: ${wordCount}`) // 'Number of words in the text: 10'
```

## Installation
You can use the module by including it in your JavaScript project. 

1. Add the module as a dependency in your `package.json`.
```json
  "dependencies": {
    "text-analyzer": "aw22hs/1DV610-L2#main"
  }
```
2. In the terminal, run:
```bash 
npm install
```

3. Import the method that creates the different analyzers.
```javascript
import { createAnalyzers } from 'text-analyzer' 

const analyzers = createAnalyzers('Your text goes here.')
```
4. Choose which analyzer to use.
```javascript
      const textAnalyzer = analyzers.textAnalyzer
      const sentenceCounter = analyzers.sentenceCounter
      const updatedTextAnalyzer = analyzers.updatedTextAnalyzer
      const lineCounter = analyzers.lineCounter
      const wordCounter = analyzers.wordCounter
```

## Usage
The module is separated into five different analyzers with various methods to analyze and manipulate text. All the public methods are listed under each analyzer in the chapter below.

### Methods
All methods in the module (except for the replace methods) will use the original text as its reference. In other words, even if the text has been updated and words have changed, the counting and analyzing will still refer to the data in the original text.  

The module does not validate the text input more than check that the input is not empty or does not exceed the character limit 10 000 characters. Neither does it escape output. This requires the user of this class to take measures against potential risks.  

### 1. `textAnalyzer`

**`getAverageNumberOfSentencesPerParagraph()`**  
Calculates and returns the average number of sentences per paragraph in the text.  
```javascript
const averageSentencesPerParagraph = textAnalyzer.getAverageNumberOfSentencesPerParagraph()
console.log(averageSentencesPerParagraph) // 2
```

**`getAverageNumberOfWordsPerSentence()`**  
Calculates and returns the average number of words per sentence in the text.  
```javascript
const averageWordsPerSentence = textAnalyzer.getAverageNumberOfWordsPerSentence()
console.log(averageWordsPerSentence) // 5
```

**`getCharacterCount()`**  
Counts and returns the total number of characters in the text, excluding newline characters.
```javascript
const totalCharacters = textAnalyzer.getCharacterCount()
console.log(totalCharacters) // 45
```

**`getLetterCountInAlphabeticalOrder()`**  
Counts the frequency of each letter in the text and returns an object with the letters as keys, sorted in alphabetical order.  
An error will be thrown if there are no letters in the text.
```javascript
const letterFrequency = textAnalyzer.getLetterCountInAlphabeticalOrder()
console.log(letterFrequency) // { a: 1, b: 1, c: 1, e: 3, h: 3, i: 6, n: 3, o: 1, s: 7, t: 6, u: 1 }
```

**`getParagraphsCount()`**  
Counts and returns the number of paragraphs in the text.

```javascript
const totalParagraphs = textAnalyzer.getParagraphsCount()
console.log(totalParagraphs) // 1
```

### 2. `sentenceCounter`

**`getSentenceCount()`**  
Counts and returns the total number of sentences in the text.  

```javascript
const totalSentences = sentenceCounter.getSentenceCount()
console.log(totalSentences) // 2
```

**`getFirstWordOfSentencesCountInAlphabeticalOrder()`**  
Counts the frequency of the first words of the sentences in the text and returns an object with the words as keys, sorted in alphabetical order.  

```javascript
const firstWords = sentenceCounter.getFirstWordOfSentencesCountInAlphabeticalOrder()
console.log(firstWords) // { THIS: 1, This: 1 }
```

### 3. `updatedTextAnalyzer`

**`getLetterCountDifferenceBetweenOriginalAndUpdatedText()`**  
Calculates and returns the character count difference between the original text and any updated text (after using the replace methods).
```javascript
const difference = updatedTextAnalyzer.getLetterCountDifferenceBetweenOriginalAndUpdatedText()
console.log(difference) // '0'
```

**`textHasBeenUpdated()`**  
Checks if the original text has been updated and if the updated text is the same as the original text. Returns boolean.
```javascript
console.log(updatedTextAnalyzer.textHasBeenUpdated()) // false
```

**`originalTextIsLongerThanUpdatedText()`**  
Checks if the original text is longer than the updated text. Returns boolean.
```javascript
console.log(updatedTextAnalyzer.originalTextIsLongerThanUpdatedText()) // true
```

**`replaceWordsWithExactFormatting(wordToReplace, newWord)`**  
Replaces all occurrences of a word with the exact formatting of the submitted `wordToReplace` with the exact formatting of the submitted `newWord`. The updated text will be saved as a new field in the class and will not change the original text. 
```javascript
const replacedText = updatedTextAnalyzer.replaceWordsWithExactFormatting('This', 'THAT')
console.log(replacedText) // 'THAT is a sentence, but this is not. THIS IS.'
```

**`replaceLowerCaseAndCapitalizedWord(wordToReplace, newWord)`**  
Replaces all occurrences of a word (in either lower case 'word' or capitalized 'Word') with a new word. The new word will get the same format as the word it is replacing. If `wordToReplace` has the wrong format, for example all capital letters or a capital letter in the middle, an error will be thrown.
```javascript
const replacedText = updatedTextAnalyzer.replaceLowerCaseAndCapitalizedWord('This', 'THAT')
console.log(replacedText) // 'That is a sentence, but that is not. THIS IS.'
```

### 4. `lineCounter`

**`getAllLinesCount()`**  
Counts and returns the total number of lines in the text.

```javascript
const totalLines = lineCounter.getAllLinesCount()
console.log(totalLines) // 1
```

**`getNonEmptyLinesCount()`**  
Counts and returns the number of not empty lines in the text.

```javascript
const nonEmptyLines = lineCounter.getNonEmptyLinesCount()
console.log(nonEmptyLines) // 1
```

**`getNonEmptyLinesWithoutJSCommentsCount()`**  
Counts and returns the number of not empty lines in the text that doesn't start with `*` or `/`.

```javascript
const nonEmptyLinesWithoutComments = lineCounter.getNonEmptyLinesWithoutJSCommentsCount()
console.log(nonEmptyLinesWithoutComments) // 1
```

### 5. `wordCounter`

**`getAllWordsCount()`**  
Counts and returns the total number of words in the text.  

```javascript
const totalWords = wordCounter.getAllWordsCount()
console.log(totalWords) // 10
```

**`getSpecificWordCount(word)`**  
Counts and returns the number of occurrences of a specific word in the text.

```javascript
const word = 'is'
const wordCount = wordCounter.getSpecificWordCount(word)
console.log(wordCount) // 3
```

**`getWordCountInAlphabeticalOrder()`**  
Counts the frequency of each word in the text and returns an object with the words as keys, sorted in alphabetical order.  
An error will be thrown if there are no words in the text.
```javascript
const wordFrequency = wordCounter.getWordCountInAlphabeticalOrder()
console.log(wordFrequency) // { a: 1, but: 1, is: 3, not: 1, sentence: 1, this: 3 }
```

## Testing
Test instructions and the test report for v2.0.0 of the module is available [here](testing.md).

## License terms - MIT License
Copyright (c) 2023 Anja Willsund

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.