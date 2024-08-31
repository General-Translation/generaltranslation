"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = _translate;
/**
 * Translates a string.
 * @param {{ baseURL: string, apiKey: string }} gt - The translation service configuration.
 * @param {string} content - The content to translate.
 * @param {string} targetLanguage - The target language for the translation.
 * @param {{ notes?: string, timeout?: number, [key: string]: any }} metadata - Additional metadata for the translation request.
 * @returns {Promise<{ translation: string, error?: Error | unknown }>} - The translated content with optional error information.
 * @internal
 */
async function _translate(gt, content, targetLanguage, metadata) {
    const controller = new AbortController();
    const signal = controller.signal;
    if (metadata.timeout) {
        setTimeout(() => controller.abort(), metadata.timeout);
    }
    try {
        const response = await fetch(`${gt.baseURL}/translate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'gtx-api-key': gt.apiKey,
            },
            body: JSON.stringify({
                content, targetLanguage, metadata
            }),
            signal
        });
        if (!response.ok) {
            throw new Error(`${response.status}: ${await response.text()}`);
        }
        const result = await response.json();
        return result;
    }
    catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            console.error('Request timed out');
            return {
                translation: content,
                error: 'Request timed out'
            };
        }
        console.error(error);
        return {
            translation: content,
            error: error
        };
    }
}
