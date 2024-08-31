"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = _translateReactChildren;
/**
 * Translates the given content into the target language using a specified API.
 *
 * @param {{ baseURL: string, apiKey: string }} gt - An object containing baseURL and apiKey for the API.
 * @param {any} content - The content to be translated. This can be of any type.
 * @param {string} targetLanguage - The target language code (e.g., 'en', 'fr') for the translation.
 * @param {{ [key: string]: any }} metadata - Additional metadata to be sent with the translation request.
 *
 * @returns {Promise<{ translation: any | null, error?: Error | unknown }>} - A promise that resolves to the translated content as an object, or null if an error occurs.
 *
 * @throws {Error} - Throws an error if the response from the API is not ok (status code not in the range 200-299).
 * @internal
**/
async function _translateReactChildren(gt, content, targetLanguage, metadata) {
    const controller = new AbortController();
    const signal = controller.signal;
    if (metadata.timeout) {
        setTimeout(() => controller.abort(), metadata.timeout);
    }
    try {
        const response = await fetch(`${gt.baseURL}/react`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'gtx-api-key': gt.apiKey,
            },
            body: JSON.stringify({
                content: content,
                targetLanguage: targetLanguage,
                metadata: metadata
            }),
            signal
        });
        if (!response.ok) {
            throw new Error(`${response.status}: ${await response.text()}`);
        }
        return await response.json();
    }
    catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            console.error('Request timed out');
            return {
                translation: null,
                error: 'Request timed out'
            };
        }
        console.error(error);
        return {
            translation: null,
            error: error
        };
    }
}
