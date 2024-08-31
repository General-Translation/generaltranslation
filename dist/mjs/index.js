// `generaltranslation` language toolkit
// © 2024, General Translation, Inc.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// ----- IMPORTS ----- //
import { _isValidLanguageCode, _standardizeLanguageCode, _getLanguageObject, _getLanguageCode, _getLanguageName, _isSameLanguage } from './codes/codes';
import _getLanguageDirection from './codes/getLanguageDirection';
import _bundleTranslation from './translation/_bundleTranslation';
import _intl from './translation/_intl';
import _translate from './translation/_translate';
import _translateReactChildren from './translation/_translateReactChildren';
import _updateRemoteDictionary from './translation/_updateRemoteDictionary';
// ----- CORE CLASS ----- // 
const getDefaultFromEnv = (VARIABLE) => {
    if (typeof process !== 'undefined' && process.env) {
        return process.env[VARIABLE] || '';
    }
    return '';
};
/**
 * GT is the core driver for the General Translation library.
 */
class GT {
    /**
     * Constructs an instance of the GT class.
     *
     * @param {GTConstructorParams} [params] - The parameters for initializing the GT instance.
     * @param {string} [params.apiKey=''] - The API key for accessing the translation service.
     * @param {string} [params.defaultLanguage='en'] - The default language for translations.
     * @param {string} [params.projectID=''] - The project ID for the translation service.
     * @param {string} [params.baseURL='https://prod.gtx.dev'] - The base URL for the translation service.
     */
    constructor({ apiKey = '', defaultLanguage = 'en', projectID = '', baseURL = 'https://prod.gtx.dev' } = {}) {
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
    translate(content, targetLanguage, metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield _translate(this, content, targetLanguage, Object.assign({ projectID: this.projectID, defaultLanguage: this.defaultLanguage }, metadata));
        });
    }
    /**
    * Translates a string and caches for use in a public project.
    * @param {string} content - A string to translate.
    * @param {string} targetLanguage - The target language for the translation.
    * @param {string} projectID - The ID of the project.
    * @param {dictionaryName?: string, context?: string, [key: string]: any }} metadata - Additional metadata for the translation request.
    * @returns {Promise<{ translation: string, error?: Error | unknown }>} The translated content with optional error information.
    */
    intl(content, targetLanguage, projectID, metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield _intl(this, content, targetLanguage, projectID || this.projectID, Object.assign({ projectID: projectID || this.projectID, defaultLanguage: this.defaultLanguage }, metadata));
        });
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
    translateReactChildren(content, targetLanguage, metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield _translateReactChildren(this, content, targetLanguage, Object.assign({ projectID: this.projectID, defaultLanguage: this.defaultLanguage }, metadata));
        });
    }
    /**
    * Bundles multiple translation requests and sends them to the server.
    * @param requests - Array of requests to be processed and sent.
    * @returns A promise that resolves to an array of processed results.
    */
    bundleTranslation(requests) {
        return __awaiter(this, void 0, void 0, function* () {
            return _bundleTranslation(this, requests);
        });
    }
    /**
    * Pushes updates to a remotely cached translation dictionary.
    * @param {Update[]} updates - Array of updates with optional targetLanguage.
    * @param {string[]} [languages] - Array of languages to be updated.
    * @param {string} [projectID=this.projectID] - The ID of the project. Defaults to the instance's projectID.
    * @param {boolean} [replace=false] - Whether to replace the existing dictionary. Defaults to false.
    * @returns {Promise<string[]>} A promise that resolves to an array of strings indicating the languages which have been updated.
    */
    updateRemoteDictionary(updates_1) {
        return __awaiter(this, arguments, void 0, function* (updates, languages = [], projectID = this.projectID, replace = false) {
            return _updateRemoteDictionary(this, updates, languages, projectID, replace);
        });
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
export const getLanguageDirection = (code) => _getLanguageDirection(code);
/**
 * Checks if a given BCP 47 language code is valid.
 * @param {string} code - The BCP 47 language code to validate.
 * @returns {boolean} True if the BCP 47 code is valid, false otherwise.
 */
export const isValidLanguageCode = (code) => _isValidLanguageCode(code);
/**
 * Standardizes a BCP 47 language code to ensure correct formatting.
 * @param {string} code - The BCP 47 language code to standardize.
 * @returns {string} The standardized BCP 47 language code.
 */
export const standardizeLanguageCode = (code) => _standardizeLanguageCode(code);
export function getLanguageObject(codes) {
    return Array.isArray(codes) ? _getLanguageObject(codes) : _getLanguageObject(codes);
}
export function getLanguageCode(languages) {
    return _getLanguageCode(languages);
}
export function getLanguageName(codes) {
    return _getLanguageName(codes);
}
/**
 * Checks if multiple BCP 47 language codes represent the same language.
 * @param {string[]} codes - The BCP 47 language codes to compare.
 * @returns {boolean} True if all BCP 47 codes represent the same language, false otherwise.
 */
export function isSameLanguage(...codes) {
    return _isSameLanguage(...codes);
}
;
