/**
 * Check if the given object is empty or not.
 *
 * @param {object} obj
 * @returns {boolean}
 */
export function isObjectEmpty(obj) {
  if (!obj) {
    return true;
  }

  return Object.entries(obj).length === 0 && obj.constructor === Object;
}
