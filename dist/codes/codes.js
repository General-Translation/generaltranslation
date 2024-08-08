"use strict";
// ----- IMPORTS ----- //
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._getLanguageCode = exports._getLanguageName = void 0;
exports._standardizeLanguageCode = _standardizeLanguageCode;
exports._isValidLanguageCode = _isValidLanguageCode;
exports._getLanguageObject = _getLanguageObject;
exports._isSameLanguage = _isSameLanguage;
// Import modules for mapping ISO 639 codes to language names and vice versa
const CodeToLanguage_json_1 = __importDefault(require("./639-1/CodeToLanguage.json"));
const LanguageToCode_json_1 = __importDefault(require("./639-1/LanguageToCode.json"));
const CodeToLanguage = CodeToLanguage_json_1.default;
const LanguageToCode = LanguageToCode_json_1.default;
// Import modules for mapping ISO 639-3 codes (for languages without two-letter codes)
const CodeToLanguageTriletter_json_1 = __importDefault(require("./639-3/CodeToLanguageTriletter.json"));
const LanguageToCodeTriletter_json_1 = __importDefault(require("./639-3/LanguageToCodeTriletter.json"));
const CodeToLanguageTriletter = CodeToLanguageTriletter_json_1.default;
const LanguageToCodeTriletter = LanguageToCodeTriletter_json_1.default;
// Import module for mapping ISO 15924 script codes to script names
const ScriptToCode_json_1 = __importDefault(require("./15924/ScriptToCode.json"));
const CodeToScript_json_1 = __importDefault(require("./15924/CodeToScript.json"));
const ScriptToCode = ScriptToCode_json_1.default;
const CodeToScript = CodeToScript_json_1.default;
// Import module for mapping ISO 3166 region codes to region names
const RegionToCode_json_1 = __importDefault(require("./3166/RegionToCode.json"));
const CodeToRegion_json_1 = __importDefault(require("./3166/CodeToRegion.json"));
const RegionToCode = RegionToCode_json_1.default;
const CodeToRegion = CodeToRegion_json_1.default;
// Import predefined common regions
const Predefined_json_1 = __importDefault(require("./predefined/Predefined.json"));
const Predefined = Predefined_json_1.default;
// ----- VALIDITY CHECKS ----- //
/**
 * Ensures correct capitalization and formatting of a language code.
 * @param {string} code - The language-country-script code to standardize.
 * @returns {string} A BCP 47 language tag.
 * @internal
 */
function _standardizeLanguageCode(code) {
    if (!code || typeof code !== 'string')
        return '';
    try {
        const locale = new Intl.Locale(code);
        const { language, script, region } = locale;
        return `${language}${script ? '-' + script : ''}${region ? '-' + region : ''}`;
    }
    catch (error) {
        return '';
    }
}
/**
 * Check if a given language-country-script code is valid.
 * @param {string} code - The language-country-script code to validate.
 * @returns {boolean} - Returns true if valid, false otherwise.
 * @internal
 */
function _isValidLanguageCode(code) {
    if (!code || typeof code !== 'string')
        return false;
    try {
        if (!_mapCodeToLanguage(code.split('-')[0]))
            return false;
        const locale = new Intl.Locale(code);
        const { language, script, region } = locale;
        const constructedCode = `${language}${script ? '-' + script : ''}${region ? '-' + region : ''}`;
        return constructedCode.toLowerCase() === code.toLowerCase();
    }
    catch (error) {
        return false;
    }
}
// ----- FORMATTING HELPER FUNCTIONS ----- //
/**
 * Capitalizes the first letter of a code and converts the rest to lowercase.
 * @param {string} code - The code to capitalize.
 * @returns {string} The capitalized code.
 */
const _capitalize = (code) => {
    if (code.length === 0)
        return code;
    return code.charAt(0).toUpperCase() + code.slice(1).toLowerCase();
};
// ----- MAPPING FUNCTIONS ----- //
/**
 * Returns the name of a language from an ISO 639 code.
 * @param {string} code - The ISO 639 code.
 * @returns {string} The language name.
 */
const _mapCodeToLanguage = (code) => {
    code = code === null || code === void 0 ? void 0 : code.toLowerCase();
    if ((code === null || code === void 0 ? void 0 : code.length) === 2) {
        return CodeToLanguage[code];
    }
    if ((code === null || code === void 0 ? void 0 : code.length) === 3) {
        return CodeToLanguageTriletter[code];
    }
    return '';
};
/**
 * Returns a BCP 47 language tag from a language name.
 * Preferentially returns two-letter codes.
 * @param {string} language - The language name.
 * @returns {string} BCP 47 language tag.
 */
const _mapLanguageToCode = (language) => {
    language = language === null || language === void 0 ? void 0 : language.toLowerCase();
    return LanguageToCode[language] || LanguageToCodeTriletter[language] || '';
};
/**
 * Returns the name of a script from an ISO 15924 code.
 * @param {string} code - The ISO 15924 code.
 * @returns {string} The script name.
 */
const _mapCodeToScript = (code) => {
    code = _capitalize(code);
    return CodeToScript[code] || '';
};
/**
 * Returns an ISO 15924 code from a script name.
 * @param {string} script - The script name.
 * @returns {string} The ISO 15924 code.
 */
const _mapScriptToCode = (script) => {
    script = script === null || script === void 0 ? void 0 : script.toLowerCase();
    return ScriptToCode[script] || '';
};
/**
 * Returns the name of a region from an ISO 3166 code.
 * @param {string} code - The ISO 3166 code.
 * @returns {string} The region name.
 */
const _mapCodeToRegion = (code) => {
    code = code === null || code === void 0 ? void 0 : code.toUpperCase();
    return CodeToRegion[code] || '';
};
/**
 * Returns an ISO 3166 code from a region name.
 * @param {string} region - The region name.
 * @returns {string} The ISO 3166 code.
 */
const _mapRegionToCode = (region) => {
    region = region === null || region === void 0 ? void 0 : region.toLowerCase();
    return RegionToCode[region] || '';
};
function _getLanguageObject(codes) {
    return Array.isArray(codes) ? codes.map(_handleGetLanguageObject) : _handleGetLanguageObject(codes);
}
/**
 * Helper function to create a language object from a code.
 * @param {string} code - The language code.
 * @returns {LanguageObject|null} The language object.
 */
const _handleGetLanguageObject = (code) => {
    var _a, _b;
    try {
        const locale = new Intl.Locale(code);
        let languageObject = {
            language: _mapCodeToLanguage(locale.language) || '',
            script: locale.script ? (_a = _mapCodeToScript(locale.script)) !== null && _a !== void 0 ? _a : '' : '',
            region: locale.region ? (_b = _mapCodeToRegion(locale.region)) !== null && _b !== void 0 ? _b : '' : ''
        };
        return languageObject.language ? languageObject : null;
    }
    catch (error) {
        // If the code is not a valid locale, return null
        return null;
    }
};
// ----- LANGUAGE NAMES FROM CODES ----- //
/**
 * Returns the language name(s) from an array of codes or a single code.
 * @param {string|string[]} codes - The code or array of codes.
 * @returns {string|string[]} The language name(s).
 * @internal
 */
const _getLanguageName = (codes) => {
    return Array.isArray(codes) ? codes.map(_handleGetLanguageName) : _handleGetLanguageName(codes);
};
exports._getLanguageName = _getLanguageName;
/**
 * Helper function to get the language name from a code.
 * @param {string} code - The language code.
 * @returns {string} The language name.
 */
const _handleGetLanguageName = (code) => {
    if (!_isValidLanguageCode(code))
        return '';
    if (Predefined[code])
        return Predefined[code];
    const languageObject = _handleGetLanguageObject(code);
    if (!languageObject)
        return '';
    let result = languageObject.language;
    if (languageObject.script) {
        result += `, ${languageObject.script}`;
    }
    if (languageObject.region) {
        result += `, ${languageObject.region}`;
    }
    return result;
};
// ----- LANGUAGE CODES FROM NAMES ----- //
/**
 * Returns the language code(s) from an array of language names or a single name.
 * @param {string|string[]} languages - The language name or array of language names.
 * @returns {string|string[]} The language code(s).
 * @internal
 */
const _getLanguageCode = (languages) => {
    return Array.isArray(languages) ? languages.map(_handleGetLanguageCode) : _handleGetLanguageCode(languages);
};
exports._getLanguageCode = _getLanguageCode;
/**
 * Helper function to get the language code from a language name.
 * @param {string|LanguageObject} language - The language name or object.
 * @returns {string} The language code.
 */
const _handleGetLanguageCode = (language) => {
    if (typeof language === 'string')
        return _handleGetLanguageCodeFromString(language);
    return _handleGetLanguageCodeFromObject(language);
};
/**
 * Helper function to get the language code from a language name string.
 * @param {string} language - The language name.
 * @returns {string} The language code.
 */
const _handleGetLanguageCodeFromString = (language) => {
    const subtagStrings = language.split(',').map(string => string.trim());
    let code = _mapLanguageToCode(subtagStrings[0]);
    if (code) {
        if (subtagStrings.length === 3) {
            code += `-${_mapScriptToCode(subtagStrings[1])}`;
            code += `-${_mapRegionToCode(subtagStrings[2])}`;
        }
        else if (subtagStrings.length === 2) {
            let tag = _mapScriptToCode(subtagStrings[1]);
            if (!tag)
                tag = _mapRegionToCode(subtagStrings[1]);
            if (tag)
                code += `-${tag}`;
        }
    }
    if (!code) {
        for (const key in Predefined) {
            if (Predefined[key] === language) {
                return key;
            }
        }
    }
    return code;
};
/**
 * Helper function to get the language code from a language object.
 * @param {LanguageObject} languageObject - The language object.
 * @returns {string} The language code.
 */
const _handleGetLanguageCodeFromObject = (languageObject) => {
    if (!(languageObject === null || languageObject === void 0 ? void 0 : languageObject.language))
        return '';
    let code = languageObject.language.toLowerCase();
    if (languageObject.script) {
        code += `-${_capitalize(languageObject.script)}`;
    }
    if (languageObject.region) {
        code += `-${languageObject.region.toUpperCase()}`;
    }
    return _isValidLanguageCode(code) ? code : '';
};
function _isSameLanguage(...codes) {
    // Flatten the array in case the codes are provided as an array
    if (codes.length === 1 && Array.isArray(codes[0])) {
        codes = codes[0];
    }
    if (codes.length < 2)
        return false;
    let language = null;
    for (let i = 0; i < codes.length; i++) {
        if (typeof codes[i] !== 'string')
            return false;
        const languageCode = codes[i].split('-')[0];
        const currentLanguage = _mapCodeToLanguage(languageCode);
        if (language === null) {
            language = currentLanguage;
        }
        else if (language !== currentLanguage) {
            return false;
        }
    }
    return true;
}
