"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = _translateReactChildren;
/**
 * Translates the given content into the target language using a specified API.
 *
 * @param {Object} gt - An object containing baseURL and apiKey for the API.
 * @param {JSON} content - The content to be translated. This can be of any type.
 * @param {string} targetLanguage - The target language code (e.g., 'en', 'fr') for the translation.
 * @param {Object} metadata - Additional metadata to be sent with the translation request.
 *
 * @returns {Promise<any | null>} - A promise that resolves to the translated content as an object, or null if an error occurs.
 *
 * @throws {Error} - Throws an error if the response from the API is not ok (status code not in the range 200-299).
 * @internal
**/
function _translateReactChildren(gt, content, targetLanguage, metadata) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${gt.baseURL}/react`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'gtx-api-key': gt.apiKey,
                },
                body: JSON.stringify({
                    content: content,
                    targetLanguage: targetLanguage,
                    metadata: metadata
                })
            });
            if (!response.ok) {
                throw new Error(`${response.status}: ${yield response.text()}`);
            }
            return yield response.json();
        }
        catch (error) {
            console.error(error);
            return {
                translation: null,
                error: error
            };
        }
    });
}
