/**
 * Helper function to return short form of given phrase.
 * For eg: Hello World => HW
 *
 * @param {string} phrase
 * @param {number} limit
 * @returns {string}
 */
export const getAbbreviation = (phrase, limit = 2) => {
  const splitted = phrase.split(' ');
  splitted.length = limit;

  return splitted.map(string => string[0].toUpperCase()).join('');
};
