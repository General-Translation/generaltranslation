import { _getLanguageObject, _isSameLanguage } from './codes/codes';
import { Content } from './translation/_translate';
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
    * Translates a string, caching it for re-use.
    * @param {Content} content - The content to translate.
    * @param {string} targetLanguage - The target language for the translation.
    * @param {{ [key: string]: any }} metadata - Additional metadata for the translation request.
    * @returns {Promise<{ translation: string, error?: Error | unknown }>} - The translated content with optional error information.
    */
    translate(content: Content, targetLanguage: string, metadata?: {
        [key: string]: any;
    }): Promise<{
        translation: string;
        error?: Error | unknown;
    }>;
    /**
    * Translates a single piece of content and caches for use in a public project.
    * @param {Content} content - The content to translate.
    * @param {string} targetLanguage - The target language for the translation.
    * @param {string} projectID - The ID of the project
    * @param {{ [key: string]: any }} metadata - Additional metadata for the translation request.
    * @returns {Promise<{ translation: string, error?: Error | unknown }>} The translated content with optional error information.
    */
    intl(content: Content, targetLanguage: string, projectID?: string, metadata?: {
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
export declare const getLanguageObject: typeof _getLanguageObject;
export declare const getLanguageCode: (languages: string | string[]) => string | string[];
export declare const getLanguageName: (codes: string | string[]) => string | string[];
export declare const isSameLanguage: typeof _isSameLanguage;
