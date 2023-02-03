/**
 *
 * @param {string} name
 * @param {Object} params
 */
export function navigate(navigationRef, name, params) {
  if (!navigationRef.isReady()) {
    return;
  }

  navigationRef.navigate(name, params);
}
