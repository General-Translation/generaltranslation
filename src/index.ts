// `generaltranslation` language toolkit
// © 2024, General Translation, Inc.

// ----- IMPORTS ----- //

import { _getLanguageObject, _getLanguageCode, _getLanguageName, _isSameLanguage } from './codes/codes';
import _translateReactChildren from './translation/_translateReactChildren';

// TO DO
// - Translation API
// - Times/dates?
// - Currency conversion?

// ----- CORE CLASS ----- // 

const getDefaultFromEnv = (VARIABLE: string): string => {
    if (typeof process !== 'undefined' && process.env) {
        return process.env[VARIABLE] || '';
    }
    return '';
}

/**
 * Interface representing the constructor parameters for the GT class.
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
    * Translates the content of React children elements.
    * 
    * @param {Object} params - The parameters for the translation.
    * @param {any} params.content - The React children content to be translated.
    * @param {string} params.targetLanguage - The target language for the translation.
    * @param {Object} params.metadata - Additional metadata for the translation process.
    * 
    * @returns {Promise<any>} - A promise that resolves to the translated content.
    */
    async translateReactChildren({ content, targetLanguage, metadata }: { content: any; targetLanguage: string; metadata: { [key: string]: any } }): Promise<any> {
        return await _translateReactChildren.call(this, content, targetLanguage, { projectID: this.projectID, defaultLanguage: this.defaultLanguage, ...metadata });
    }
}


// ----- EXPORTS ----- //

// Export the class
export default GT;

// Export the functions 
export const getLanguageObject = _getLanguageObject;
export const getLanguageCode = _getLanguageCode;
export const getLanguageName = _getLanguageName;
export const isSameLanguage = _isSameLanguage;
