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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSameLanguage = exports.getLanguageName = exports.getLanguageCode = exports.getLanguageObject = void 0;
// ----- IMPORTS ----- //
const codes_1 = require("./codes/codes");
const _translateReactChildren_1 = __importDefault(require("./translation/_translateReactChildren"));
// TO DO
// - Translation API
// - Times/dates?
// - Currency conversion?
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
    * Translates the content of React children elements.
    *
    * @param {Object} params - The parameters for the translation.
    * @param {any} params.content - The React children content to be translated.
    * @param {string} params.targetLanguage - The target language for the translation.
    * @param {Object} params.metadata - Additional metadata for the translation process.
    *
    * @returns {Promise<any>} - A promise that resolves to the translated content.
    */
    translateReactChildren(_a) {
        return __awaiter(this, void 0, void 0, function* () {
            var { content, targetLanguage } = _a, metadata = __rest(_a, ["content", "targetLanguage"]);
            return yield _translateReactChildren_1.default.call(this, content, targetLanguage, metadata);
        });
    }
}
// ----- EXPORTS ----- //
// Export the class
exports.default = GT;
// Export the functions 
exports.getLanguageObject = codes_1._getLanguageObject;
exports.getLanguageCode = codes_1._getLanguageCode;
exports.getLanguageName = codes_1._getLanguageName;
exports.isSameLanguage = codes_1._isSameLanguage;
