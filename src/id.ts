// Functions provided to other GT libraries

import XXH from 'xxhashjs';

/**
 * Calculates a unique hash for a given string using xxhash.
 * 
 * @param {string} string - The string to be hashed.
 * @returns {string} - The resulting hash as a hexadecimal string.
 */
export function hashString(string: string): string {
    return XXH.h64().update(string).digest().toString(16);
}
