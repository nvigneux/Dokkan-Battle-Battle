/**
 * Converts an array to a string by joining its elements with newline characters.
 *
 * @param {Array} array - The array to be converted.
 * @returns {string} The resulting string.
 */
export const arrayToString = (array) => array.join('\n');

/**
 * Converts a string to an array by splitting it into elements at newline characters.
 *
 * @param {string} string - The string to be converted.
 * @returns {Array} The resulting array.
 */
export const stringToArray = (string) => string.split('\n');
