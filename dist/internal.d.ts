/**
 * Calculates a unique hash for a given string using xxhash.
 *
 * @param {string} string - The string to be hashed.
 * @returns {string} - The resulting hash as a hexadecimal string.
 */
declare function hashString(string: string): string;

export { hashString };
