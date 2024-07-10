export type ContentObject = {
    text: string;
    exclude?: boolean;
    cache?: boolean;
};
type ContentItem = ContentObject | string;
export type Content = ContentItem | ContentItem[];
export declare const _process: (content: Content) => {
    array: ContentObject[];
    excludedArray: string[];
};
export declare const _recombine: (translatedContent: ContentObject[], excludedArray: string[]) => string;
export declare const _createTranslation: (content: Content, f: Function) => Promise<{
    translation: string;
    error?: undefined;
} | {
    translation: string;
    error: unknown;
}>;
/**
 * Translates a single piece of content.
 * @param {{ baseURL: string, apiKey: string }} gt - The translation service configuration.
 * @param {Content} content - The content to translate.
 * @param {string} targetLanguage - The target language for the translation.
 * @param {{ [key: string]: any }} metadata - Additional metadata for the translation request.
 * @returns {Promise<{ translation: string, error?: Error | unknown }>} - The translated content with optional error information.
 */
export default function _translate(gt: {
    baseURL: string;
    apiKey: string;
}, content: Content, targetLanguage: string, metadata: {
    [key: string]: any;
}): Promise<{
    translation: string;
    error?: Error | unknown;
}>;
export {};
