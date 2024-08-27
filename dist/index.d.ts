import { LanguageObject } from './codes/codes';
import { Request } from './translation/_bundleTranslation';
import { Update } from './translation/_updateRemoteDictionary';
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
    * Bundles multiple translation requests and sends them to the server.
    * @param requests - Array of requests to be processed and sent.
    * @returns A promise that resolves to an array of processed results.
    */
    bundleTranslation(requests: Request[]): Promise<Array<any | null>>;
    /**
    *Pushes updates to a remotely cached translation dictionary.
    * @param updates - Array of updates with optional targetLanguage.
    * @returns A promise that resolves to a boolean indicating success or failure.
    */
    updateRemoteDictionary(updates: Update[], projectID?: string, replace?: boolean): Promise<string[]>;
}
export default GT;
/**
 * Gets the writing direction for a given BCP 47 language code.
 * @param {string} code - The BCP 47 language code to check.
 * @returns {string} The language direction ('ltr' for left-to-right or 'rtl' for right-to-left).
 */
export declare const getLanguageDirection: (code: string) => string;
/**
 * Checks if a given BCP 47 language code is valid.
 * @param {string} code - The BCP 47 language code to validate.
 * @returns {boolean} True if the BCP 47 code is valid, false otherwise.
 */
export declare const isValidLanguageCode: (code: string) => boolean;
/**
 * Standardizes a BCP 47 language code to ensure correct formatting.
 * @param {string} code - The BCP 47 language code to standardize.
 * @returns {string} The standardized BCP 47 language code.
 */
export declare const standardizeLanguageCode: (code: string) => string;
/**
 * Gets a language object from a BCP 47 language code.
 * @param {string} code - The BCP 47 language code to convert.
 * @returns {LanguageObject | null} The language object or null if the BCP 47 code is invalid.
 */
export declare function getLanguageObject(code: string): LanguageObject | null;
/**
 * Gets language objects from multiple BCP 47 language codes.
 * @param {string[]} codes - The BCP 47 language codes to convert.
 * @returns {(LanguageObject | null)[]} An array of language objects or null for each invalid BCP 47 code.
 */
export declare function getLanguageObject(codes: string[]): (LanguageObject | null)[];
/**
 * Gets a BCP 47 language code from a language name.
 * @param {string} language - The language name to convert.
 * @returns {string} The corresponding BCP 47 language code.
 */
export declare function getLanguageCode(language: string): string;
/**
 * Gets BCP 47 language codes from multiple language names.
 * @param {string[]} languages - The language names to convert.
 * @returns {string[]} The corresponding BCP 47 language codes.
 */
export declare function getLanguageCode(languages: string[]): string[];
/**
 * Gets a language name from a BCP 47 language code.
 * @param {string} code - The BCP 47 language code to convert.
 * @returns {string} The corresponding language name.
 */
export declare function getLanguageName(code: string): string;
/**
 * Gets language names from multiple BCP 47 language codes.
 * @param {string[]} codes - The BCP 47 language codes to convert.
 * @returns {string[]} The corresponding language names.
 */
export declare function getLanguageName(codes: string[]): string[];
/**
 * Checks if multiple BCP 47 language codes represent the same language.
 * @param {string[]} codes - The BCP 47 language codes to compare.
 * @returns {boolean} True if all BCP 47 codes represent the same language, false otherwise.
 */
export declare function isSameLanguage(...codes: string[]): boolean;
