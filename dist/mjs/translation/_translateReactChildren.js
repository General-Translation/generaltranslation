var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
export default function _translateReactChildren(gt, content, targetLanguage, metadata) {
    return __awaiter(this, void 0, void 0, function* () {
        const controller = new AbortController();
        const signal = controller.signal;
        if (metadata.timeout) {
            setTimeout(() => controller.abort(), metadata.timeout);
        }
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
                }),
                signal
            });
            if (!response.ok) {
                throw new Error(`${response.status}: ${yield response.text()}`);
            }
            return yield response.json();
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
    });
}
