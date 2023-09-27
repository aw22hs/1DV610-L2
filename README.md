# 1DV610-L2
The Text Analyzer is a JavaScript class designed to analyze text and provide various text statistics and manipulation functions. It can help you perform a range of tasks, from counting words and characters to analyzing sentence and paragraph structures within the text.

## Installation
You can use the Text Analyzer class by including it in your JavaScript project. Here's how you can import it:
```
// Replace 'text-analyzer' with the actual path to the file
import { TextAnalyzer } from 'text-analyzer' 

const analyzer = new TextAnalyzer('Your text goes here.')
```

## Usage
### Constructor
To initialize the Text Analyzer, create an instance of the class by providing the text you want to analyze:
```
const analyzer = new TextAnalyzer('Your text goes here.')
```

### Methods
The Text Analyzer provides various methods to analyze and manipulate text. All methods in the module (except for the replace methods) will use the original text as its reference. In other words, even if the text has been updated and words have changed, the counting and analyzing will still refer to the data in the original text.  
These are the available methods:

`averageNumberOfSentencesPerParagraph()`  
Calculates and returns the average number of sentences per paragraph in the text.  
An error will be thrown if there are no words in the text.
```
const averageSentencesPerParagraph = analyzer.averageNumberOfSentencesPerParagraph()
console.log(`Average number of sentences per paragraph: ${averageSentencesPerParagraph}`)
```

`averageNumberOfWordsPerSentence()`  
Calculates and returns the average number of words per sentence in the text.  
An error will be thrown if there are no words in the text.
```
const averageWordsPerSentence = analyzer.averageNumberOfWordsPerSentence()
console.log(`Average number of words per sentence: ${averageWordsPerSentence}`)
```

`countAllLines()`  
Counts and returns the total number of lines in the text.
```
const totalLines = analyzer.countAllLines()
console.log(`Total number of lines: ${totalLines}`)
```

`countAllWords()`  
Counts and returns the total number of words in the text.  
An error will be thrown if there are no words in the text.
```
const totalWords = analyzer.countAllWords()
console.log(`Total number of words: ${totalWords}`)
```

`countCharacters()`  
Counts and returns the total number of characters in the text, excluding newline characters.
```
const totalCharacters = analyzer.countCharacters()
console.log(`Total number of characters: ${totalCharacters}`)
```

`countLettersFrequencyAlphabeticalOrder()`  
Counts the frequency of each letter in the text and returns an object with the letters as keys, sorted in alphabetical order.  
An error will be thrown if there are no letters in the text.
```
const letterFrequency = analyzer.countLettersFrequencyAlphabeticalOrder()
console.log('Letter frequency (alphabetical order):', letterFrequency)
```

`countNotEmptyLines()`  
Counts and returns the number of not empty lines in the text.
```
const nonEmptyLines = analyzer.countNotEmptyLines()
console.log(`Number of not empty lines: ${nonEmptyLines}`)
```

`countNonEmptyLinesWithoutJSComments()`  
Counts and returns the number of not empty lines in the text that doesn't start with `*` or `/`.
```
const nonEmptyLinesWithoutComments = analyzer.countNonEmptyLinesWithoutJSComments()
console.log(`Number of not empty lines excluding JavaScript comments: ${nonEmptyLinesWithoutComments}`)
```

`countParagraphs()`  
Counts and returns the number of paragraphs in the text.
```
const totalParagraphs = analyzer.countParagraphs()
console.log(`Total number of paragraphs: ${totalParagraphs}`)
```

`countSpecificWord(word)`  
Counts and returns the number of occurrences of a specific word in the text.
```
const word = 'example'
const wordCount = analyzer.countSpecificWord(word)
console.log(`Occurrences of '${word}': ${wordCount}`)
```

`countWordsFrequencyAlphabeticalOrder()`  
Counts the frequency of each word in the text and returns an object with the words as keys, sorted in alphabetical order.  
An error will be thrown if there are no words in the text.
```
const wordFrequency = analyzer.countLettersFrequencyAlphabeticalOrder()
console.log('Word frequency (alphabetical order):', wordFrequency)
```

`getFirstWordsInAlphabeticalOrder()`  
Counts the frequency of the first words of the sentences in the text and returns an object with the words as keys, sorted in alphabetical order.  
An error will be thrown if there are no words in the text.
```
const firstWords = analyzer.getFirstWordsInAlphabeticalOrder()
console.log('First words (alphabetical Ooder):', firstWords)
```

`getLetterCountDifferenceBetweenOriginalAndUpdatedText()`  
Calculates the character count difference between the original text and any updated text (after using the replace methods). Returns a string that either states the character count difference between the two texts or if the text has not been updated.
```
const difference = analyzer.getLetterCountDifferenceBetweenOriginalAndUpdatedText()
console.log(`How is the original text different from the updated text? ${difference}`)
```

`getSentenceCount()`  
Counts and returns the total number of sentences in the text.
An error will be thrown if there are no words in the text.

```
const totalSentences = analyzer.getSentenceCount()
console.log(`Total number of sentences: ${totalSentences}`)
```

`replaceWordsWithExactFormatting(wordToReplace, newWord)`  
Replaces all occurrences of a word with the exact formatting of the submitted `wordToReplace` with the exact formatting of the submitted `newWord`. The updated text will be saved as a new field in the class and will not change the original text. 
```
const analyzer('This is a sentence, but this is not. THIS IS.')
const replacedText = analyzer.replaceWordsWithExactFormatting('This', 'THAT')
console.log(replacedText) // 'THAT is a sentence, but this is not. THIS IS.'
```

`replaceWordsWithTwoDifferentFormattings(wordToReplace, newWord)`  
Replaces all occurrences of a word (in either lower case och capitalized format) with a new word. The new word will get the same format as the word it is replacing. If `wordToReplace` has the wrong format, for example all capital letters or a capital letter in the middle, an error will be thrown.
```
const analyzer('This is a sentence, but this is not. THIS IS.')
const replacedText = analyzer.replaceWordsWithExactFormatting('This', 'THAT')
console.log(replacedText) // 'That is a sentence, but that is not. THIS IS.'
```

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