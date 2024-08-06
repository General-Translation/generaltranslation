/**
 * Translates a string.
 * @param {{ baseURL: string, apiKey: string }} gt - The translation service configuration.
 * @param {string} content - The content to translate.
 * @param {string} targetLanguage - The target language for the translation.
 * @param {{ notes?: string, [key: string]: any }} metadata - Additional metadata for the translation request.
 * @returns {Promise<{ translation: string, error?: Error | unknown }>} - The translated content with optional error information.
 */
export default function _translate(gt: {
    baseURL: string;
    apiKey: string;
}, content: string, targetLanguage: string, metadata: {
    notes?: string;
    [key: string]: any;
}): Promise<{
    translation: string;
    error?: Error | unknown;
}>;
