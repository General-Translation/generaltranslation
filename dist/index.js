"use strict";
// `generaltranslation` language toolkit
// © 2024, General Translation, Inc.
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currency = exports.datetime = exports.num = exports.standardizeLanguageCode = exports.isValidLanguageCode = exports.getLanguageDirection = void 0;
exports.getLanguageObject = getLanguageObject;
exports.getLanguageCode = getLanguageCode;
exports.getLanguageName = getLanguageName;
exports.isSameLanguage = isSameLanguage;
// ----- IMPORTS ----- //
var codes_1 = require("./codes/codes");
var getLanguageDirection_1 = __importDefault(require("./codes/getLanguageDirection"));
var _translateBundle_1 = __importDefault(require("./translation/_translateBundle"));
var _translate_1 = __importDefault(require("./translation/_translate"));
var _translateReact_1 = __importDefault(require("./translation/_translateReact"));
var _updateProjectDictionary_1 = __importDefault(require("./translation/_updateProjectDictionary"));
var _format_1 = require("./format/_format");
// ----- CORE CLASS ----- // 
var getDefaultFromEnv = function (VARIABLE) {
    if (typeof process !== 'undefined' && process.env) {
        return process.env[VARIABLE] || '';
    }
    return '';
};
/**
 * GT is the core driver for the General Translation library.
 */
var GT = /** @class */ (function () {
    /**
     * Constructs an instance of the GT class.
     *
     * @param {GTConstructorParams} [params] - The parameters for initializing the GT instance.
     * @param {string} [params.apiKey=''] - The API key for accessing the translation service.
     * @param {string} [params.defaultLanguage='en'] - The default language for translations.
     * @param {string} [params.projectID=''] - The project ID for the translation service.
     * @param {string} [params.baseURL='https://prod.gtx.dev'] - The base URL for the translation service.
     */
    function GT(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.apiKey, apiKey = _c === void 0 ? '' : _c, _d = _b.defaultLanguage, defaultLanguage = _d === void 0 ? 'en' : _d, _e = _b.projectID, projectID = _e === void 0 ? '' : _e, _f = _b.baseURL, baseURL = _f === void 0 ? 'https://prod.gtx.dev' : _f;
        this.apiKey = apiKey || getDefaultFromEnv('GT_API_KEY');
        this.projectID = projectID || getDefaultFromEnv('GT_PROJECT_ID');
        this.defaultLanguage = defaultLanguage.toLowerCase();
        this.baseURL = baseURL;
    }
    /**
     * Translates a string into a target language.
     * If `metadata.store` is provided, the translation is cached for use in a public project.
     *
     * @param {string} content - The string to be translated.
     * @param {string} targetLanguage - The target language code (e.g., 'en', 'fr') for the translation.
     * @param {{ context?: string, store?: boolean, [key: string]: any }} [metadata] - Additional metadata for the translation request.
     * @param {string} [metadata.context] - Contextual information to assist with the translation.
     * @param {boolean} [metadata.store] - Whether to cache the translation for use in a public project.
     *
     * @returns {Promise<{ translation: string, error?: Error | unknown }>} - A promise that resolves to the translated content, or an error if the translation fails.
     */
    GT.prototype.translate = function (content, targetLanguage, metadata) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, _translate_1.default)(this, content, targetLanguage, __assign({ projectID: this.projectID, defaultLanguage: this.defaultLanguage }, metadata))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
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
    GT.prototype.translateReact = function (content, targetLanguage, metadata) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, _translateReact_1.default)(this, content, targetLanguage, __assign({ projectID: this.projectID, defaultLanguage: this.defaultLanguage }, metadata))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
    * Bundles multiple translation requests and sends them to the server.
    * @param requests - Array of requests to be processed and sent.
    * @returns A promise that resolves to an array of processed results.
    */
    GT.prototype.translateBundle = function (requests) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, _translateBundle_1.default)(this, requests)];
            });
        });
    };
    /**
    * Pushes updates to a remotely cached translation dictionary.
    * @param {Update[]} updates - Array of updates with optional targetLanguage.
    * @param {string[]} [languages] - Array of languages to be updated.
    * @param {string} [projectID=this.projectID] - The ID of the project. Defaults to the instance's projectID.
    * @param {boolean} [replace=false] - Whether to replace the existing dictionary. Defaults to false.
    * @returns {Promise<string[]>} A promise that resolves to an array of strings indicating the languages which have been updated.
    */
    GT.prototype.updateProjectDictionary = function (updates_1) {
        return __awaiter(this, arguments, void 0, function (updates, languages, projectID, replace) {
            if (languages === void 0) { languages = []; }
            if (projectID === void 0) { projectID = this.projectID; }
            if (replace === void 0) { replace = false; }
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, _updateProjectDictionary_1.default)(this, updates, languages, projectID, replace)];
            });
        });
    };
    return GT;
}());
// ----- EXPORTS ----- //
// Export the class
exports.default = GT;
// Export the functions 
/**
 * Gets the writing direction for a given BCP 47 language code.
 * @param {string} code - The BCP 47 language code to check.
 * @returns {string} The language direction ('ltr' for left-to-right or 'rtl' for right-to-left).
 */
var getLanguageDirection = function (code) { return (0, getLanguageDirection_1.default)(code); };
exports.getLanguageDirection = getLanguageDirection;
/**
 * Checks if a given BCP 47 language code is valid.
 * @param {string} code - The BCP 47 language code to validate.
 * @returns {boolean} True if the BCP 47 code is valid, false otherwise.
 */
var isValidLanguageCode = function (code) { return (0, codes_1._isValidLanguageCode)(code); };
exports.isValidLanguageCode = isValidLanguageCode;
/**
 * Standardizes a BCP 47 language code to ensure correct formatting.
 * @param {string} code - The BCP 47 language code to standardize.
 * @returns {string} The standardized BCP 47 language code.
 */
var standardizeLanguageCode = function (code) { return (0, codes_1._standardizeLanguageCode)(code); };
exports.standardizeLanguageCode = standardizeLanguageCode;
function getLanguageObject(codes) {
    return Array.isArray(codes) ? (0, codes_1._getLanguageObject)(codes) : (0, codes_1._getLanguageObject)(codes);
}
function getLanguageCode(languages) {
    return (0, codes_1._getLanguageCode)(languages);
}
function getLanguageName(codes) {
    return (0, codes_1._getLanguageName)(codes);
}
/**
 * Checks if multiple BCP 47 language codes represent the same language.
 * @param {string[]} codes - The BCP 47 language codes to compare.
 * @returns {boolean} True if all BCP 47 codes represent the same language, false otherwise.
 */
function isSameLanguage() {
    var codes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        codes[_i] = arguments[_i];
    }
    return codes_1._isSameLanguage.apply(void 0, codes);
}
;
/**
 * Formats a number according to the specified languages and options.
 * @param {Object} params - The parameters for the number formatting.
 * @param {number} params.value - The number to format.
 * @param {string | string[]} [params.languages=['en']] - The languages to use for formatting.
 * @param {Intl.NumberFormatOptions} [params.options={}] - Additional options for number formatting.
 * @returns {string} The formatted number.
 */
exports.num = _format_1._num;
/**
 * Formats a date according to the specified languages and options.
 * @param {Object} params - The parameters for the date formatting.
 * @param {Date} params.value - The date to format.
 * @param {string | string[]} [params.languages=['en']] - The languages to use for formatting.
 * @param {Intl.DateTimeFormatOptions} [params.options={}] - Additional options for date formatting.
 * @returns {string} The formatted date.
 */
exports.datetime = _format_1._datetime;
/**
 * Formats a currency value according to the specified languages, currency, and options.
 * @param {Object} params - The parameters for the currency formatting.
 * @param {number} params.value - The currency value to format.
 * @param {string} params.currency - The currency code (e.g., 'USD').
 * @param {string | string[]} [params.languages=['en']] - The languages to use for formatting.
 * @param {Intl.NumberFormatOptions} [params.options={}] - Additional options for currency formatting.
 * @returns {string} The formatted currency value.
 */
exports.currency = _format_1._currency;
