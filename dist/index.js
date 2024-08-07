"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.standardizeLanguageCode = exports.isValidLanguageCode = exports.getLanguageDirection = void 0;
exports.getLanguageObject = getLanguageObject;
exports.getLanguageCode = getLanguageCode;
exports.getLanguageName = getLanguageName;
exports.isSameLanguage = isSameLanguage;
// ----- IMPORTS ----- //
const codes_1 = require("./codes/codes");
const getLanguageDirection_1 = __importDefault(require("./codes/getLanguageDirection"));
const _bundleRequests_1 = __importDefault(require("./translation/_bundleRequests"));
const _intl_1 = __importDefault(require("./translation/_intl"));
const _translate_1 = __importDefault(require("./translation/_translate"));
const _translateReactChildren_1 = __importDefault(require("./translation/_translateReactChildren"));
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
            return yield (0, _translate_1.default)(this, content, targetLanguage, Object.assign({ projectID: this.projectID, defaultLanguage: this.defaultLanguage }, metadata));
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
            return yield (0, _intl_1.default)(this, content, targetLanguage, projectID || this.projectID, Object.assign({ projectID: projectID || this.projectID, defaultLanguage: this.defaultLanguage }, metadata));
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
            return yield (0, _translateReactChildren_1.default)(this, content, targetLanguage, Object.assign({ projectID: this.projectID, defaultLanguage: this.defaultLanguage }, metadata));
        });
    }
    /**
    * Bundles multiple requests and sends them to the server.
    * @param requests - Array of requests to be processed and sent.
    * @returns A promise that resolves to an array of processed results.
    */
    bundleRequests(requests) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, _bundleRequests_1.default)(this, requests);
        });
    }
}
// ----- EXPORTS ----- //
// Export the class
exports.default = GT;
// Export the functions 
/**
 * Gets the writing direction for a given BCP 47 language code.
 * @param {string} code - The BCP 47 language code to check.
 * @returns {string} The language direction ('ltr' for left-to-right or 'rtl' for right-to-left).
 */
const getLanguageDirection = (code) => (0, getLanguageDirection_1.default)(code);
exports.getLanguageDirection = getLanguageDirection;
/**
 * Checks if a given BCP 47 language code is valid.
 * @param {string} code - The BCP 47 language code to validate.
 * @returns {boolean} True if the BCP 47 code is valid, false otherwise.
 */
const isValidLanguageCode = (code) => (0, codes_1._isValidLanguageCode)(code);
exports.isValidLanguageCode = isValidLanguageCode;
/**
 * Standardizes a BCP 47 language code to ensure correct formatting.
 * @param {string} code - The BCP 47 language code to standardize.
 * @returns {string} The standardized BCP 47 language code.
 */
const standardizeLanguageCode = (code) => (0, codes_1._standardizeLanguageCode)(code);
exports.standardizeLanguageCode = standardizeLanguageCode;
function getLanguageObject(codes) {
    return Array.isArray(codes) ? (0, codes_1._getLanguageObject)(codes) : (0, codes_1._getLanguageObject)([codes]);
}
function getLanguageCode(languageOrLanguages) {
    return (0, codes_1._getLanguageCode)(languageOrLanguages);
}
function getLanguageName(codes) {
    return (0, codes_1._getLanguageName)(codes);
}
/**
 * Checks if multiple BCP 47 language codes represent the same language.
 * @param {string[]} codes - The BCP 47 language codes to compare.
 * @returns {boolean} True if all BCP 47 codes represent the same language, false otherwise.
 */
function isSameLanguage(...codes) {
    return (0, codes_1._isSameLanguage)(...codes);
}
;
