"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._standardizeLanguageCode = exports._isValidLanguageCode = void 0;
exports._getLanguageName = _getLanguageName;
exports._getLanguageDirection = _getLanguageDirection;
var libraryDefaultLanguage_1 = __importDefault(require("../settings/libraryDefaultLanguage"));
/**
 * Checks if a given BCP 47 language code is valid.
 * @param {string} code - The BCP 47 language code to validate.
 * @returns {boolean} True if the BCP 47 code is valid, false otherwise.
 * @internal
 */
var _isValidLanguageCode = function (code) {
    try {
        var displayNames = new Intl.DisplayNames([libraryDefaultLanguage_1.default], { type: 'language' });
        return displayNames.of(code) !== code.toLowerCase();
    }
    catch (_a) {
        return false;
    }
};
exports._isValidLanguageCode = _isValidLanguageCode;
/**
 * Standardizes a BCP 47 language code to ensure correct formatting.
 * @param {string} code - The BCP 47 language code to standardize.
 * @returns {string} The standardized BCP 47 language code, or an empty string if invalid.
 * @internal
 */
var _standardizeLanguageCode = function (code) {
    try {
        return new Intl.Locale(code).toString();
    }
    catch (_a) {
        // Return empty string instead of throwing an error
        return '';
    }
};
exports._standardizeLanguageCode = _standardizeLanguageCode;
/**
 * Retrieves the display name(s) of language code(s) using Intl.DisplayNames.
 *
 * @param {string | string[]} code - A language code or an array of codes.
 * @param {string} [defaultLanguage=libraryDefaultLanguage] - The language for display names.
 * @returns {string | string[]} The display name(s) corresponding to the code(s), or empty string(s) if invalid.
 * @internal
 */
function _getLanguageName(code, defaultLanguage) {
    if (defaultLanguage === void 0) { defaultLanguage = libraryDefaultLanguage_1.default; }
    try {
        var displayNames_1 = new Intl.DisplayNames([defaultLanguage], { type: 'language' });
        if (typeof code === 'string') {
            // Handle the case where it's a single language code
            var name = displayNames_1.of(code);
            return name || '';
        }
        else if (Array.isArray(code)) {
            // Handle the case where it's an array of language codes
            return code.map(function (c) { return displayNames_1.of(c) || ''; });
        }
        // If code is neither string nor array, return empty string
        return '';
    }
    catch (_a) {
        // In case Intl.DisplayNames construction fails, return empty string(s)
        if (typeof code === 'string') {
            return '';
        }
        else if (Array.isArray(code)) {
            return code.map(function () { return ''; });
        }
        return '';
    }
}
/**
 * Get the text direction for a given language code using the Intl.Locale API.
 *
 * @param {string} code - The language code to check.
 * @returns {string} - 'rtl' if the language is right-to-left, otherwise 'ltr'.
 * @internal
 */
function _getLanguageDirection(code) {
    var _a;
    try {
        var locale = new Intl.Locale(code);
        // Return 'rtl' if the text direction of the language is right-to-left, otherwise 'ltr'
        return ((_a = locale === null || locale === void 0 ? void 0 : locale.textInfo) === null || _a === void 0 ? void 0 : _a.direction) === 'rtl' ? 'rtl' : 'ltr';
    }
    catch (_b) {
        // If the code is invalid or causes an error, fallback to 'ltr'
        return 'ltr';
    }
}
