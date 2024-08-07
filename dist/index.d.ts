import { _isValidLanguageCode, _standardizeLanguageCode, _getLanguageObject, _isSameLanguage } from './codes/codes';
import _getLanguageDirection from './codes/getLanguageDirection';
/**
 * Type representing the constructor parameters for the GT class.
 */
type GTConstructorParams = {
    apiKey?: string;
    defaultLanguage?: string;
    projectID?: string;
    baseURL?: string;
};
/**
 * GT is the core driver for the General Translation library.
 */
declare class GT {
    apiKey: string;
    defaultLanguage: string;
    projectID: string;
    baseURL: string;
    /**
     * Constructs an instance of the GT class.
     *
     * @param {GTConstructorParams} [params] - The parameters for initializing the GT instance.
     * @param {string} [params.apiKey=''] - The API key for accessing the translation service.
     * @param {string} [params.defaultLanguage='en'] - The default language for translations.
     * @param {string} [params.projectID=''] - The project ID for the translation service.
     * @param {string} [params.baseURL='https://prod.gtx.dev'] - The base URL for the translation service.
     */
    constructor({ apiKey, defaultLanguage, projectID, baseURL }?: GTConstructorParams);
    /**
    * Translates a string into a target language.
    * @param {string} content - A string to translate.
    * @param {string} targetLanguage - The target language for the translation.
    * @param {{ notes?: string, [key: string]: any }} metadata - Additional metadata for the translation request.
    * @returns {Promise<{ translation: string, error?: Error | unknown }>} - The translated content with optional error information.
    */
    translate(content: string, targetLanguage: string, metadata?: {
        notes?: string;
        [key: string]: any;
    }): Promise<{
        translation: string;
        error?: Error | unknown;
    }>;
    /**
    * Translates a string and caches for use in a public project.
    * @param {string} content - A string to translate.
    * @param {string} targetLanguage - The target language for the translation.
    * @param {string} projectID - The ID of the project.
    * @param {dictionaryName?: string, context?: string, [key: string]: any }} metadata - Additional metadata for the translation request.
    * @returns {Promise<{ translation: string, error?: Error | unknown }>} The translated content with optional error information.
    */
    intl(content: string, targetLanguage: string, projectID?: string, metadata?: {
        dictionaryName?: string;
        context?: string;
        [key: string]: any;
    }): Promise<{
        translation: string;
        error?: Error | unknown;
    }>;
    /**
    * Translates the content of React children elements.
    *
    * @param {Object} params - The parameters for the translation.
    * @param {any} params.content - The React children content to be translated.
    * @param {string} params.targetLanguage - The target language for the translation.
    * @param {Object} params.metadata - Additional metadata for the translation process.
    *
    * @returns {Promise<any>} - A promise that resolves to the translated content.
    */
    translateReactChildren(content: any, targetLanguage: string, metadata?: {
        [key: string]: any;
    }): Promise<{
        translation: any | null;
        error?: Error | unknown;
    }>;
    /**
    * Bundles multiple requests and sends them to the server.
    * @param requests - Array of requests to be processed and sent.
    * @returns A promise that resolves to an array of processed results.
    */
    bundleRequests(requests: any[]): Promise<Array<any | null>>;
}
export default GT;
/**
 * Gets the writing direction for a given language code.
 * @param {string} languageCode - The language code to check.
 * @returns {string} The language direction ('ltr' or 'rtl').
 */
export declare const getLanguageDirection: typeof _getLanguageDirection;
/**
 * Checks if a given language code is valid.
 * @param {string} code - The language code to validate.
 * @returns {boolean} True if the code is valid, false otherwise.
 */
export declare const isValidLanguageCode: typeof _isValidLanguageCode;
/**
 * Standardizes a language code to ensure correct formatting.
 * @param {string} code - The language code to standardize.
 * @returns {string} The standardized language code.
 */
export declare const standardizeLanguageCode: typeof _standardizeLanguageCode;
/**
 * Gets a language object from a language code.
 * @param {string|string[]} codes - The language code(s) to convert.
 * @returns {LanguageObject|null|(LanguageObject|null)[]} The language object(s) or null if invalid.
 */
export declare const getLanguageObject: typeof _getLanguageObject;
/**
 * Gets a language code from a language name.
 * @param {string|string[]} languages - The language name(s) to convert.
 * @returns {string|string[]} The corresponding language code(s).
 */
export declare const getLanguageCode: (languages: string | string[]) => string | string[];
/**
 * Gets a language name from a language code.
 * @param {string|string[]} codes - The language code(s) to convert.
 * @returns {string|string[]} The corresponding language name(s).
 */
export declare const getLanguageName: (codes: string | string[]) => string | string[];
/**
 * Checks if multiple language codes represent the same language.
 * @param {...string|string[]} codes - The language codes to compare.
 * @returns {boolean} True if all codes represent the same language, false otherwise.
 */
export declare const isSameLanguage: typeof _isSameLanguage;
