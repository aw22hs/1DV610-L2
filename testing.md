# Testing

All the classes have been tested with automated tests. Testing has been performed using Jest v29.7.0. To run the tests, the following script has been specified inside the `scripts` section of `package.json`:

```json
"test": "npx --node-options=--experimental-vm-modules jest --setupFiles"
```

To start the tests, use the command:
```bash
npm run test
```

The tests consist of seven test suites with a total of 105 subtests, divided according to the 19 public methods and 2 constructors called by the tests, see below. All tests are approved in v.1.0.0 of the classes (v.2.0.0 of class TextAnalyzer).

In the folder `testdata`, there are three files; `exampleCode.js`, `loremIpsum.md` and `tenThousandOneLetters.md`. The contents of these files are used as arguments when creating three different instances of the class used during testing.

## Test Report v.2.0.0

### CharacterCounterAndSorter

**getSortedCharacters()**  
✓ should return an object with one character plus character count when there is one character  
✓ should return an objects of words sorted in alphabetical order plus word count when there are several words

### LineCounter

**getAllLinesCount()**  
✓ should return 1 when there is one word  
✓ should return 1 when there is one sentence on one line  
✓ should return 9 when using text from loremIpsum file as input  
✓ should return 1 when the input text is a dot  
✓ should return 1 when the input text is a blank space

**getNonEmptyLinesCount()**  
✓ should return 1 when there is one word  
✓ should return 1 when there is one sentence on one line  
✓ should return 5 when using text from loremIpsum file as input  
✓ should return 1 when only one character input  
✓ should return 0 when the input text is a blank space  

**getNonEmptyLinesWithoutJSCommentsCount()**  
✓ should return 5 as the number of non empty lines without JS comments when using text from loremIpsum file as input  
✓ should return 1 as the number of non empty lines without JS comments when only one character input  
✓ should return 0 as the number of non empty lines without JS comments when the input is a blank space  
✓ should return 3 as the number of non empty lines without JS comments when using text from exampleCode file as input  

### SentenceCounter

**getSentenceCount()**  
✓ should return 25 when using text from loremIpsum file as input  
✓ should return 1 when using one letter as input  
✓ should return 0 when only one dot input  
✓ should return 0 when the input is a blank space  
✓ should return 0 when there are only numbers

**getFirstWordOfSentencesCountInAlphabeticalOrder()**  
✓ should return the first words in alphabetical order when using text from loremIpsum file as input  
✓ should return an empty object when only one dot input  
✓ should return an empty object when the input is a blank space  
✓ should return an empty object when there are only numbers

### TextAnalyzer

**Instantiating TextAnalyzer with invalid input**  
✓ should throw an error when input is empty  
✓ should throw an error when input is null  
✓ should throw an error when input is longer than 10,000 characters  
✓ should throw an error when input is undefined  

**getAverageNumberOfSentencesPerParagraph()**  
✓ should return 0 when the input text is a dot  
✓ should return 0 when the input text is a blank space  
✓ should return 1 when there is one sentence  
✓ should return the average number of sentences when using text from loremIpsum file as input  

**getAverageNumberOfWordsPerSentence()**  
✓ should return 0 when the input text is a dot  
✓ should return 0 when the input text is a blank space  
✓ should return 1 when there is one word  
✓ should return the average number of words when using text from loremIpsum file as input  

**getLetterCountInAlphabeticalOrder()**  
✓ should return a sorted object with letter counts from loremIpsum file input  
✓ should confirm that the object with letter counts is sorted alphabetically  
✓ should throw an error when there are only numbers in the input  
✓ should throw an error when there are no alphanumeric characters in the input  
✓ should throw an error when the input text is a blank space  

**getParagraphsCount()**  
✓ should return 1 when there is one word  
✓ should return 1 when there is one sentence in one paragraph  
✓ should return the number of paragraphs when using text from loremIpsum file as input  
✓ should return 1 when only one character input  
✓ should return 1 when the input text is a blank space  

**getCharacterCount()**  
✓ should return the number of characters when there are several sentences  
✓ should return the number of characters when using text from loremIpsum file as input  
✓ should return 1 when only one character input  
✓ should return 1 when the input is a blank space  

### UpdatedTextAnalyzer

**getLetterCountDifferenceBetweenOriginalAndUpdatedText()**  
✓ should return 1 when the word "is" is replaced with "was"  
✓ should return 0 when the word "this" is replaced with "that"  
✓ should return 4 when the word "sentence" is replaced with "word"  

**textHasBeenUpdated()**  
✓ should return true after replacing "is" with "was"  
✓ should return false when no replacements have been made  

**originalTextIsLongerThanUpdatedText()**  
✓ should return false when "is" is replaced with "was"  
✓ should return true when "sentence" is replaced with "word"  

**replaceWordsWithExactFormatting()**  
✓ should only replace words with exact formatting, case sensitive  
✓ should replace words with exact formatting and not partially matching words  
✓ should throw an error when the word contains unallowed characters  
✓ should throw an error when wordToReplace does not contain any characters  
✓ should throw an error when newWord does not contain any characters  
✓ should throw an error when wordToReplace contains unallowed characters  
✓ should throw an error when newWord contains unallowed characters  
✓ should throw an error when wordToReplace is null  
✓ should throw an error when newWord is null  
✓ should throw an error when wordToReplace is undefined  
✓ should throw an error when newWord is undefined  

**replaceLowerCaseAndCapitalizedWord()**  
✓ should replace words with two different formattings, case sensitive  
✓ should replace words with two different formattings and not partially matching words  
✓ should replace words when newWord is all upper case, keeping the formatting from wordToReplace  
✓ should throw an error when trying to replace a word with all uppercase letters  
✓ should throw an error when wordToReplace does not contain any characters  
✓ should throw an error when newWord does not contain any characters  
✓ should throw an error when wordToReplace contains unallowed characters  
✓ should throw an error when newWord contains unallowed characters  
✓ should throw an error when wordToReplace is null  
✓ should throw an error when newWord is null  
✓ should throw an error when wordToReplace is undefined  

### WordCounter

**getAllWordsCount()**  
✓ should return 1 when there is one word  
✓ should return 224 when using text from loremIpsum file as input  
✓ should return 0 when there are not words  
✓ should return 0 when the input text contains only numbers  

**getSpecificWordCount()**  
✓ should return 1 when there is one word and that word is the one being counted  
✓ should return 4 when using text from loremIpsum file as input and looking for word "cu"  
✓ should return 0 when word is not found in loremIpsum text  
✓ should return 0 when word is not found in text that is just a dot  
✓ should return 0 when the input text is a blank space  
✓ should throw an error when the word does not contain any letters  
✓ should throw an error when the word contains unallowed characters  
✓ should throw an error when the input text is null  
✓ should throw an error when the input text is undefined  

**getWordCountInAlphabeticalOrder()**  
✓ should return single word count in lower case when there is a word that starts with an upper case letter  
✓ should return true if object is sorted in alphabetical order  
✓ should return an empty object when there are only numbers  
✓ should return an empty object when there are no alpha-numeric characters  

### WordValidator

**Instantiating WordValidator**  
✓ should throw an error for empty input  
✓ should throw an error for null input  
✓ should throw an error for a word without any letters  
✓ should throw an error for a word with too many letters  
✓ should not throw an error for a valid word  
✓ should not throw an error for a word with numbers and special characters  
✓ should throw an error for a word without letters but with special characters    
✓ should throw an error for a word with unallowed characters  
