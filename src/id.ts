// Functions provided to other GT libraries

import XXH from "xxhashjs";
import { JsxChild, JsxChildren, Variable } from "./types";
import stringify from "fast-json-stable-stringify";

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
export function hashJsxChildren({
  source,
  context,
}: {
  source: JsxChildren;
  context?: string;
}): string {
  if (context) {
    const sanitizedChildren = sanitizeJsxChildren(source);
    const unhashedKey = stringify([sanitizedChildren, context]);
    return hashString(unhashedKey);
  }
  const unhashedKey = stringify(sanitizeJsxChildren(source));
  return hashString(unhashedKey);
}

type DataGT = {
  transformation?: string;
  branches?: Record<string, SanitizedChildren>;
};

type SanitizedVariable = Omit<Variable, "id">;
type SanitizedElement = {
  props?: {
    "data-_gt"?: DataGT;
    children?: SanitizedChildren;
  };
};
type SanitizedChild = SanitizedElement | SanitizedVariable | string;
type SanitizedChildren = SanitizedChild | SanitizedChild[];

function sanitizeJsxChildren(
  childrenAsObjects: JsxChildren
): SanitizedChildren {
  if (!childrenAsObjects) {
    return childrenAsObjects;
  }

  // Handle array of children
  if (Array.isArray(childrenAsObjects)) {
    return childrenAsObjects.map(
      (child) => sanitizeJsxChildren(child) as SanitizedChild
    );
  }

  // Handle string literals
  if (typeof childrenAsObjects === "string") {
    return childrenAsObjects;
  }

  // Handle Variable objects
  if ("variable" in childrenAsObjects) {
    const { id, ...sanitizedVar } = childrenAsObjects;
    return sanitizedVar;
  }

  // Handle JsxElement objects
  if ("props" in childrenAsObjects) {
    const { type, ...rest } = childrenAsObjects;
    const sanitizedElement: SanitizedElement = {};
    const props: any = {};

    // Copy all props except type
    if (rest.props) {
      if (rest.props.children) {
        props.children = sanitizeJsxChildren(rest.props.children);
      }

      if (rest.props["data-_gt"]) {
        const dataGt: DataGT = {};

        if (rest.props["data-_gt"].transformation) {
          dataGt.transformation = rest.props["data-_gt"].transformation;
        }

        if (rest.props["data-_gt"].branches) {
          dataGt.branches = Object.fromEntries(
            Object.entries(rest.props["data-_gt"].branches).map(
              ([key, value]) => [key, sanitizeJsxChildren(value)]
            )
          );
        }

        // Only include data-_gt if it has properties
        if (Object.keys(dataGt).length > 0) {
          props["data-_gt"] = dataGt;
        }
      }

      if (Object.keys(props).length > 0) {
        sanitizedElement.props = props;
      }
    }

    return sanitizedElement;
  }

  return childrenAsObjects;
}
