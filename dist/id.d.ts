/**
 * Calculates a unique hash for a given string using xxhash.
 *
 * @param {string} string - The string to be hashed.
 * @returns {string} - The resulting hash as a hexadecimal string.
 */
export declare function hashString(string: string): string;
/**
 * Calculates a unique ID for the given children objects by hashing their sanitized JSON string representation.
 *
 * @param {any} childrenAsObjects - The children objects to be hashed.
 * @returns {string} - The unique has of the children.
 */
export declare function hashJsxChildren(childrenAsObjects: any): string;
