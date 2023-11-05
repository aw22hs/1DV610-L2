/**
 * Tests for WordValidator.
 *
 * @author Anja Willsund <aw22hs@lnu.student.se>
 * @version 1.0.0
 */

import { WordValidator } from '../src/WordValidator.js'

// -------------------------------------------------
// Create WordValidator instance
// -------------------------------------------------
describe('WordValidator', () => {

  describe('constructor', () => {

    test('should throw an error for empty input', () => {
      expect(() => new WordValidator()).toThrowError('The submitted word is empty.')
    })

    test('should throw an error for null input', () => {
      expect(() => new WordValidator(null)).toThrowError('The submitted word is empty.')
    })

    test('should throw an error for a word without any letters', () => {
      expect(() => new WordValidator('12345')).toThrowError('The submitted word does not have the right format.')
    })

    test('should throw an error for a word with too many letters', () => {
      expect(() => new WordValidator('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'))
        .toThrowError('The submitted word is too long.')
    })

    test('should not throw an error for a valid word', () => {
      expect(() => new WordValidator('test')).not.toThrow()
    })

    test('should not throw an error for a word with numbers and special characters', () => {
      expect(() => new WordValidator("test-1.2:3/4'5")).not.toThrow()
    })

    test('should throw an error for a word without letters but with special characters', () => {
      expect(() => new WordValidator("-.:/'")).toThrowError('The submitted word does not have the right format.')
    })

    test('should throw an error for a word without letters but with special characters', () => {
      expect(() => new WordValidator('a!c')).toThrowError('The submitted word does not have the right format.')
    })
  })
})
