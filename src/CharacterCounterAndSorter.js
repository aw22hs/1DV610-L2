/**
 * Module for counting and sorting characters.
 *
 * @author Anja Willsund <aw22hs@student.lnu.se>
 * @version 1.0.0
 */

export class CharacterCounterAndSorter {
  #sortedCharacters

  constructor(characters) {
    this.#countAndSortInAlphabeticalOrder(characters)
  }

  #countAndSortInAlphabeticalOrder(characters) {
    const characterCount = this.#countCharacters(characters)
    this.#sortedCharacters = this.#sortCharactersAlphabetically(characterCount)
  }

  #countCharacters(characters) {
    if (!characters) {
      return {}
    }
    // Characters can be either letters or words
    const characterCount = {}
    for (const character of characters) {
      if (character === '') {
        return
      }
      if (characterCount[character] === undefined) {
        characterCount[character] = 1
      } else {
        characterCount[character] += 1
      }
    }

    return characterCount
  }

  #sortCharactersAlphabetically(characters) {
    const sortedCharacters = {}
    // Sorts the 'characterCount' object in alphabetical order
    Object.keys(characters).sort().forEach(key => {
      sortedCharacters[key] = characters[key]
    })

    return sortedCharacters
  }

  getSortedCharacters() {
    return this.#sortedCharacters
  }
}