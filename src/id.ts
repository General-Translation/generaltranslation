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

/**
 * Calculates a unique ID for the given children objects by hashing their sanitized JSON string representation.
 * 
 * @param {any} childrenAsObjects - The children objects to be hashed.
 * @returns {string} - A promise that resolves to the unique ID.
 */
export function hashJsxChildren(childrenAsObjects: any): string {
    const unhashedKey = JSON.stringify(sanitizeJsxChildren(childrenAsObjects));
    return hashString(unhashedKey);
}

function sanitizeJsxChildren(childrenAsObjects: any) {
    const sanitizeChild = (child: any): any => {
        if (child && typeof child === 'object' && child.props) {
            if (child?.props?.['data-_gt']?.branches) {
                child.props['data-_gt'].branches = Object.fromEntries(
                    Object.entries(child.props['data-_gt'].branches).map(([key, value]) => [key, sanitizeChildren(value)])
                );
            }
            if (child?.props?.children) {
                const { type, ...rest } = child;
                return {
                    ...rest,
                    props: {
                        ...child.props,
                        children: sanitizeChildren(child.props.children)
                    }
                }
            } else {
                const { type, ...rest } = child;
                return rest;
            }
        }
        return child;
    }
    const sanitizeChildren = (children: any): any => {
        return Array.isArray(children) ? children.map(sanitizeChild) : sanitizeChild(children)
    }
    return sanitizeChildren(childrenAsObjects);
}
