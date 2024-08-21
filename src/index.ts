// `generaltranslation` language toolkit
// © 2024, General Translation, Inc.

// ----- IMPORTS ----- //

import { LanguageObject, _isValidLanguageCode, _standardizeLanguageCode, _getLanguageObject, _getLanguageCode, _getLanguageName, _isSameLanguage } from './codes/codes';
import _getLanguageDirection from './codes/getLanguageDirection';
import _bundleTranslation, { Request } from './translation/_bundleTranslation';
import _intl from './translation/_intl';
import _translate from './translation/_translate';
import _translateReactChildren from './translation/_translateReactChildren';
import _updateRemoteDictionary, { Update } from './translation/_updateRemoteDictionary';

// ----- CORE CLASS ----- // 

const getDefaultFromEnv = (VARIABLE: string): string => {
    if (typeof process !== 'undefined' && process.env) {
        return process.env[VARIABLE] || '';
    }
    return '';
}

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
class GT {
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
    constructor({
        apiKey = '',
        defaultLanguage = 'en',
        projectID = '',
        baseURL = 'https://prod.gtx.dev'
    }: GTConstructorParams = {}) {
        this.apiKey = apiKey || getDefaultFromEnv('GT_API_KEY');
        this.projectID = projectID || getDefaultFromEnv('GT_PROJECT_ID');
        this.defaultLanguage = defaultLanguage.toLowerCase();
        this.baseURL = baseURL;
    }

    /**
    * Translates a string into a target language.
    * @param {string} content - A string to translate.
    * @param {string} targetLanguage - The target language for the translation.
    * @param {{ notes?: string, [key: string]: any }} metadata - Additional metadata for the translation request.
    * @returns {Promise<{ translation: string, error?: Error | unknown }>} - The translated content with optional error information.
    */
    async translate(content: string, targetLanguage: string, metadata?: { notes?: string, [key: string]: any }): Promise<{ translation: string, error?: Error | unknown }> {
        return await _translate(this, content, targetLanguage, { projectID: this.projectID, defaultLanguage: this.defaultLanguage, ...metadata})
    }

    /**
    * Translates a string and caches for use in a public project.
    * @param {string} content - A string to translate.
    * @param {string} targetLanguage - The target language for the translation.
    * @param {string} projectID - The ID of the project.
    * @param {dictionaryName?: string, context?: string, [key: string]: any }} metadata - Additional metadata for the translation request.
    * @returns {Promise<{ translation: string, error?: Error | unknown }>} The translated content with optional error information.
    */
    async intl(content: string, targetLanguage: string, projectID?: string, metadata?: { dictionaryName?: string, context?: string, [key:string]: any }): Promise<{ translation: string; error?: Error | unknown; }> {
        return await _intl(this, content, targetLanguage, projectID || this.projectID, { projectID: projectID || this.projectID, defaultLanguage: this.defaultLanguage, ...metadata })
    }
   
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
    async translateReactChildren(content: any, targetLanguage: string, metadata?: { [key: string]: any }): Promise<{ translation: any | null, error?: Error | unknown }> {
        return await _translateReactChildren(this, content, targetLanguage, { projectID: this.projectID, defaultLanguage: this.defaultLanguage, ...metadata });
    }

    /**
    * Bundles multiple translation requests and sends them to the server.
    * @param requests - Array of requests to be processed and sent.
    * @returns A promise that resolves to an array of processed results.
    */
    async bundleTranslation(requests: Request[]): Promise<Array<any | null>> {
        return _bundleTranslation(this, requests);
    }

    /**
    *Pushes updates to a remotely cached translation dictionary.
    * @param updates - Array of updates with optional targetLanguage.
    * @returns A promise that resolves to a boolean indicating success or failure.
    */
    async updateRemoteDictionary(updates: Update[]): Promise<boolean> {
        return _updateRemoteDictionary(this, updates);
    }

}


// ----- EXPORTS ----- //

// Export the class
export default GT;

// Export the functions 

/**
 * Gets the writing direction for a given BCP 47 language code.
 * @param {string} code - The BCP 47 language code to check.
 * @returns {string} The language direction ('ltr' for left-to-right or 'rtl' for right-to-left).
 */
export const getLanguageDirection = (code: string): string => _getLanguageDirection(code);

/**
 * Checks if a given BCP 47 language code is valid.
 * @param {string} code - The BCP 47 language code to validate.
 * @returns {boolean} True if the BCP 47 code is valid, false otherwise.
 */
export const isValidLanguageCode = (code: string): boolean => _isValidLanguageCode(code);

/**
 * Standardizes a BCP 47 language code to ensure correct formatting.
 * @param {string} code - The BCP 47 language code to standardize.
 * @returns {string} The standardized BCP 47 language code.
 */
export const standardizeLanguageCode = (code: string): string => _standardizeLanguageCode(code);

/**
 * Gets a language object from a BCP 47 language code.
 * @param {string} code - The BCP 47 language code to convert.
 * @returns {LanguageObject | null} The language object or null if the BCP 47 code is invalid.
 */
export function getLanguageObject(code: string): LanguageObject | null;

/**
 * Gets language objects from multiple BCP 47 language codes.
 * @param {string[]} codes - The BCP 47 language codes to convert.
 * @returns {(LanguageObject | null)[]} An array of language objects or null for each invalid BCP 47 code.
 */
export function getLanguageObject(codes: string[]): (LanguageObject | null)[];
export function getLanguageObject(codes: string | string[]): LanguageObject | null | (LanguageObject | null)[] {
    return Array.isArray(codes) ? _getLanguageObject(codes) : _getLanguageObject(codes);
}

/**
 * Gets a BCP 47 language code from a language name.
 * @param {string} language - The language name to convert.
 * @returns {string} The corresponding BCP 47 language code.
 */
export function getLanguageCode(language: string): string;
/**
 * Gets BCP 47 language codes from multiple language names.
 * @param {string[]} languages - The language names to convert.
 * @returns {string[]} The corresponding BCP 47 language codes.
 */
export function getLanguageCode(languages: string[]): string[];
export function getLanguageCode(languages: string | string[]): string | string[] {
    return _getLanguageCode(languages);
}

/**
 * Gets a language name from a BCP 47 language code.
 * @param {string} code - The BCP 47 language code to convert.
 * @returns {string} The corresponding language name.
 */
export function getLanguageName(code: string): string;
/**
 * Gets language names from multiple BCP 47 language codes.
 * @param {string[]} codes - The BCP 47 language codes to convert.
 * @returns {string[]} The corresponding language names.
 */
export function getLanguageName(codes: string[]): string[];
export function getLanguageName(codes: string | string[]): string | string[] {
    return _getLanguageName(codes);
}

/**
 * Checks if multiple BCP 47 language codes represent the same language.
 * @param {string[]} codes - The BCP 47 language codes to compare.
 * @returns {boolean} True if all BCP 47 codes represent the same language, false otherwise.
 */
export function isSameLanguage(...codes: string[]): boolean {
    return _isSameLanguage(...codes);
};