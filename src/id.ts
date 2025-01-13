// Functions provided to other GT libraries

import XXH from 'xxhashjs';
import { JsxChildren } from './types';

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

function sanitizeJsxChildren(childrenAsObjects: any) {
    const sanitizeChild = (child: any): any => {
        if (child && typeof child === 'object' && child.props) {
            const newChild: {
                'data-_gt'?: {
                    branches?: Record<string, any>,
                    id?: number
                },
                children?: any
            } = {};
            const dataGt = child?.props?.['data-_gt'];
            if (dataGt?.id) {
                newChild['data-_gt'] = {
                    id: dataGt.id
                }
            }
            if (dataGt?.branches) {
                newChild['data-_gt'] = {
                    ...newChild['data-_gt'],
                    branches: Object.fromEntries(
                        Object.entries(dataGt.branches).map(([key, value]) => [key, sanitizeChildren(value)])
                    )
                }
            }
            if (child?.props?.children) {
                newChild.children = sanitizeChildren(child.props.children)
            }
            return newChild;
        }
        return child;
    }
    const sanitizeChildren = (children: any): any => {
        return Array.isArray(children) ? children.map(sanitizeChild) : sanitizeChild(children)
    }
    return sanitizeChildren(childrenAsObjects);
}
