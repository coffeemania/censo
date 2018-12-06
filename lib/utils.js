
/**
 * Convert array to object using array.id as an object key
 * @param arr {Array}
 * @return {Object}
 */
export const normalize = (arr) => arr.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {});
