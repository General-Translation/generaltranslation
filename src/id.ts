// Functions provided to other GT libraries

import XXH from 'xxhashjs';
import { JsxChild, JsxChildren, Variable } from './types';

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
 * @returns {string} - The unique has of the children.
 */
export function hashJsxChildren(childrenAsObjects: JsxChildren | [JsxChildren, string]): string {
    if (Array.isArray(childrenAsObjects)) {
        const [children, context] = childrenAsObjects;
        const sanitizedChildren = sanitizeJsxChildren(children);
        const unhashedKey = JSON.stringify([sanitizedChildren, context]);
        return hashString(unhashedKey);
    }
    const unhashedKey = JSON.stringify(sanitizeJsxChildren(childrenAsObjects));
    return hashString(unhashedKey);
}

type SanitizedElement = {
    branches?: {
        [k: string]: SanitizedChildren
    },
    children?: SanitizedChildren
};
type SanitizedChild = SanitizedElement | Variable | string;
type SanitizedChildren = SanitizedChild | SanitizedChild[];

function sanitizeJsxChildren(childrenAsObjects: JsxChildren): SanitizedChild[] | SanitizedChild {
    const sanitizeChild = (child: JsxChild) => {
        if (child && typeof child === 'object' && 'props' in child) {
            const newChild: SanitizedChild = {};
            const dataGt = child?.props?.['data-_gt'];
            if (dataGt?.branches) {
                newChild.branches = Object.fromEntries(
                    Object.entries(dataGt.branches).map(([key, value]) => 
                        [key, sanitizeChildren(value as JsxChildren)]
                    )
                );
            }
            if (child?.props?.children) {
                newChild.children = 
                    sanitizeChildren(child.props.children)
            }
            return newChild;
        }
        return child;
    }
    const sanitizeChildren = (children: JsxChildren) => {
        return Array.isArray(children) ? children.map(sanitizeChild) : sanitizeChild(children)
    }
    return sanitizeChildren(childrenAsObjects);
}
