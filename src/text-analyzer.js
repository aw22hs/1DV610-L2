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

/**
 * Counts the number of times all different words appear in a text.
 * If the text is empty, returns an empty object.
 *
 * @param {string} text - The text to be analyzed.
 * @returns {object} - An object with the words in lower case as keys and the number of times they appear as values.
 */
export function countWordsFrequency (text) {
  if (text === '') {
    return {}
  }

  // Make the words lower case and then split the text into words based on one or more non-alphanumeric characters
  const words = text.toLowerCase().split(/\W+/)

  const wordCount = {}
  words.forEach(word => {
    if (word === '') {
      return
    }
    if (wordCount[word] === undefined) {
      wordCount[word] = 1
    } else {
      wordCount[word] += 1
    }
  })

  // Return the object sorted in alphabetical order
  const sortedWordCount = {}
  Object.keys(wordCount).sort().forEach(key => {
    sortedWordCount[key] = wordCount[key]
  })
  return sortedWordCount
}

// A function that replaces a word with another word in a text and returns the new text.
// The function converts the text to lower case and finds the words to replace. When replacing the words, the function uses the original text to keep the original casing.
// If the text is empty, returns an empty string.
// If the word to replace is not found, returns the original text.
/**
 * Replaces a word with another word in a text and returns the new text.
 *
 * @param {string} text - The text to be analyzed.
 * @param {string} wordToReplace - The word to be replaced.
 * @param {string} newWord - The word to replace with.
 * @returns {string} - The new text.
 */
export function replaceWord (text, wordToReplace, newWord) {
  if (text === '') {
    return ''
  }

  // Make the words lower case and then split the text into words based on one or more non-alphanumeric characters
  const wordsFromOriginalTextOriginalCasing = text.split(/\W+/)
  const wordsFromOriginalTextLowerCase = text.toLowerCase().split(/\W+/)
  const wordsFromOriginalTextIncludingNonAlphanumericCharacters = text.split(' ')

  // Find the words to replace
  const indexesOfWordsToReplace = []
  wordsFromOriginalTextLowerCase.forEach((word, index) => {
    if (word === wordToReplace.toLowerCase()) {
      indexesOfWordsToReplace.push(index)
    }
  })

  // If the word to replace is not found, return the original text
  if (indexesOfWordsToReplace.length === 0) {
    return text
  }

  let newWordWithCorrectCasing
  const wordsInUpdatedTextCorrectCasing = [...wordsFromOriginalTextOriginalCasing]
  // Replace the words but keep the original casing
  indexesOfWordsToReplace.forEach(index => {
    const word = wordsFromOriginalTextOriginalCasing[index]
    const firstLetterUpperCase = word.charAt(0).toUpperCase()

    if (firstLetterUpperCase === word.charAt(0)) {
      newWordWithCorrectCasing = newWord[0].toUpperCase() + newWord.slice(1)
    } else {
      newWordWithCorrectCasing = newWord
    }
    wordsInUpdatedTextCorrectCasing[index] = newWordWithCorrectCasing

    console.log(newWordWithCorrectCasing)
  })

  // // Replace the words
  // let newText = ''
  // let wordIndex = 0
  // wordsFromOriginalTextOriginalCasing.forEach((word, index) => {
  //   if (index === indexesOfWordsToReplace[wordIndex]) {
  //     newText += text.substring(index, index + wordToReplace.length)
  //     wordIndex += 1
  //   } else {
  //     newText += word
  //   }
  //   // Add a space between words (except after the last word)
  //   if (index !== wordsFromOriginalTextLowerCase.length - 1) {
  //     newText += ' '
  //   }
  // })

  for (let i = 0; i < wordsInUpdatedTextCorrectCasing.length; i++) {
    console.log(wordsFromOriginalTextIncludingNonAlphanumericCharacters)
    wordsFromOriginalTextIncludingNonAlphanumericCharacters[i] = wordsInUpdatedTextCorrectCasing[i]
  }

  // Replace the words in the original text
  const updatedText = text.replace(new RegExp('\\b' + wordToReplace + '\\b', 'g'), newWord)
  const newWordWithFirstLetterUpperCase = newWord.charAt(0).toUpperCase() + newWord.slice(1)
  const wordToReplaceWithFirstLetterUpperCase = wordToReplace.charAt(0).toUpperCase() + wordToReplace.slice(1)
  const updatedTextWithFirstLetterUpperCase = updatedText.replace(new RegExp('\\b' + wordToReplaceWithFirstLetterUpperCase + '\\b', 'g'), newWordWithFirstLetterUpperCase)
  const newWordWithAllLettersUpperCase = newWord.toUpperCase()
  const wordToReplaceWithAllLettersUpperCase = wordToReplace.toUpperCase()
  const updatedTextWithAllLettersUpperCase = updatedTextWithFirstLetterUpperCase.replace(new RegExp('\\b' + wordToReplaceWithAllLettersUpperCase + '\\b', 'g'), newWordWithAllLettersUpperCase)
  return updatedTextWithAllLettersUpperCase
  // return wordsInUpdatedTextCorrectCasing
}

// /**
//  *
//  * @param inputString
//  * @param targetWord
//  * @param replacementWord
//  */
// export function replaceWord (inputString, targetWord, replacementWord) {
//   // Create a regular expression with the "g" flag for global matching
//   const regex = new RegExp(targetWord, 'g')

//   // Use the replace() method with a callback function
//   return inputString.replace(regex, function (match) {
//     // Determine the case of the matched word and replace accordingly
//     if (match === targetWord) {
//       // Exact match (case-sensitive)
//       return replacementWord
//     } else if (match.toLowerCase() === targetWord.toLowerCase()) {
//       // Case-insensitive match
//       return replacementWord.toLowerCase()
//     } else {
//       // Return the original case if no match is found
//       return match
//     }
//   })
// }

// Hur många procent av texten som ett visst ord utgör
