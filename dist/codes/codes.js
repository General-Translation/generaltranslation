"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._getLanguageCode = exports._getLanguageName = void 0;
exports._standardizeLanguageCode = _standardizeLanguageCode;
exports._isValidLanguageCode = _isValidLanguageCode;
exports._getLanguageObject = _getLanguageObject;
exports._isSameLanguage = _isSameLanguage;
// ----- IMPORTS ----- //
// Import modules for mapping ISO 639 codes to language names and vice versa
var CodeToLanguage_json_1 = __importDefault(require("./639-1/CodeToLanguage.json"));
var LanguageToCode_json_1 = __importDefault(require("./639-1/LanguageToCode.json"));
var CodeToLanguage = CodeToLanguage_json_1.default;
var LanguageToCode = LanguageToCode_json_1.default;
// Import modules for mapping ISO 639-3 codes (for languages without two-letter codes)
var CodeToLanguageTriletter_json_1 = __importDefault(require("./639-3/CodeToLanguageTriletter.json"));
var LanguageToCodeTriletter_json_1 = __importDefault(require("./639-3/LanguageToCodeTriletter.json"));
var CodeToLanguageTriletter = CodeToLanguageTriletter_json_1.default;
var LanguageToCodeTriletter = LanguageToCodeTriletter_json_1.default;
// Import module for mapping ISO 15924 script codes to script names
var ScriptToCode_json_1 = __importDefault(require("./15924/ScriptToCode.json"));
var CodeToScript_json_1 = __importDefault(require("./15924/CodeToScript.json"));
var ScriptToCode = ScriptToCode_json_1.default;
var CodeToScript = CodeToScript_json_1.default;
// Import module for mapping ISO 3166 region codes to region names
var RegionToCode_json_1 = __importDefault(require("./3166/RegionToCode.json"));
var CodeToRegion_json_1 = __importDefault(require("./3166/CodeToRegion.json"));
var RegionToCode = RegionToCode_json_1.default;
var CodeToRegion = CodeToRegion_json_1.default;
// Import predefined common regions
var Predefined_json_1 = __importDefault(require("./predefined/Predefined.json"));
var Predefined = Predefined_json_1.default;
// ----- VALIDITY CHECKS ----- //
/**
 * Ensures correct capitalization and formatting of a language code.
 * @param {string} code - The language-country-script code to standardize.
 * @returns {string} A BCP 47 language tag.
 * @internal
 */
function _standardizeLanguageCode(code) {
    if (!_isValidLanguageCode(code))
        return '';
    var codeParts = code.split('-');
    var result = "".concat(codeParts[0].toLowerCase());
    if (codeParts[1]) {
        if (codeParts[1].length === 4) {
            result += "-".concat(_capitalize(codeParts[1]));
            if (codeParts[2] && codeParts[2].length === 2) {
                result += "-".concat(codeParts[2].toUpperCase());
            }
        }
        else if (codeParts[1].length === 2) {
            result += "-".concat(codeParts[1].toUpperCase());
        }
    }
    return result;
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
    var codeParts = code.split('-');
    if (!_mapCodeToLanguage(codeParts[0]))
        return false;
    if (codeParts[1]) {
        if (codeParts[1].length === 4) {
            if (!_mapCodeToScript(codeParts[1]))
                return false;
            if (codeParts[2] && codeParts[2].length === 2) {
                if (!_mapCodeToRegion(codeParts[2]))
                    return false;
            }
        }
        else if (codeParts[1].length === 2) {
            if (!_mapCodeToRegion(codeParts[1]))
                return false;
        }
    }
    return true;
}
// ----- FORMATTING HELPER FUNCTIONS ----- //
/**
 * Capitalizes the first letter of a code and converts the rest to lowercase.
 * @param {string} code - The code to capitalize.
 * @returns {string} The capitalized code.
 */
var _capitalize = function (code) {
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
var _mapCodeToLanguage = function (code) {
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
var _mapLanguageToCode = function (language) {
    language = language === null || language === void 0 ? void 0 : language.toLowerCase();
    return LanguageToCode[language] || LanguageToCodeTriletter[language] || '';
};
/**
 * Returns the name of a script from an ISO 15924 code.
 * @param {string} code - The ISO 15924 code.
 * @returns {string} The script name.
 */
var _mapCodeToScript = function (code) {
    code = _capitalize(code);
    return CodeToScript[code] || '';
};
/**
 * Returns an ISO 15924 code from a script name.
 * @param {string} script - The script name.
 * @returns {string} The ISO 15924 code.
 */
var _mapScriptToCode = function (script) {
    script = script === null || script === void 0 ? void 0 : script.toLowerCase();
    return ScriptToCode[script] || '';
};
/**
 * Returns the name of a region from an ISO 3166 code.
 * @param {string} code - The ISO 3166 code.
 * @returns {string} The region name.
 */
var _mapCodeToRegion = function (code) {
    code = code === null || code === void 0 ? void 0 : code.toUpperCase();
    return CodeToRegion[code] || '';
};
/**
 * Returns an ISO 3166 code from a region name.
 * @param {string} region - The region name.
 * @returns {string} The ISO 3166 code.
 */
var _mapRegionToCode = function (region) {
    region = region === null || region === void 0 ? void 0 : region.toLowerCase();
    return RegionToCode[region] || '';
};
/**
 * @internal
 */
function _getLanguageObject(codes) {
    return Array.isArray(codes) ? codes.map(_handleGetLanguageObject) : _handleGetLanguageObject(codes);
}
/**
 * Helper function to create a language object from a code.
 * @param {string} code - The language code.
 * @returns {LanguageObject|null} The language object.
 */
var _handleGetLanguageObject = function (code) {
    if (!_isValidLanguageCode(code))
        return null;
    var codeParts = code.split('-');
    var languageObject = {
        language: _mapCodeToLanguage(codeParts[0]),
    };
    if (codeParts[1]) {
        if (codeParts[1].length === 4) {
            languageObject.script = _mapCodeToScript(codeParts[1]);
            if (codeParts[2] && codeParts[2].length === 2) {
                languageObject.region = _mapCodeToRegion(codeParts[2]);
            }
        }
        else if (codeParts[1].length === 2) {
            languageObject.region = _mapCodeToRegion(codeParts[1]);
        }
    }
    return languageObject;
};
// ----- LANGUAGE NAMES FROM CODES ----- //
/**
 * Returns the language name(s) from an array of codes or a single code.
 * @param {string|string[]} codes - The code or array of codes.
 * @returns {string|string[]} The language name(s).
 * @internal
 */
var _getLanguageName = function (codes) {
    return Array.isArray(codes) ? codes.map(_handleGetLanguageName) : _handleGetLanguageName(codes);
};
exports._getLanguageName = _getLanguageName;
/**
 * Helper function to get the language name from a code.
 * @param {string} code - The language code.
 * @returns {string} The language name.
 */
var _handleGetLanguageName = function (code) {
    if (!_isValidLanguageCode(code))
        return '';
    if (Predefined[code])
        return Predefined[code];
    var languageObject = _handleGetLanguageObject(code);
    if (!languageObject)
        return '';
    var result = languageObject.language;
    if (languageObject.script) {
        result += ", ".concat(languageObject.script);
    }
    if (languageObject.region) {
        result += ", ".concat(languageObject.region);
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
var _getLanguageCode = function (languages) {
    return Array.isArray(languages) ? languages.map(_handleGetLanguageCode) : _handleGetLanguageCode(languages);
};
exports._getLanguageCode = _getLanguageCode;
/**
 * Helper function to get the language code from a language name.
 * @param {string|LanguageObject} language - The language name or object.
 * @returns {string} The language code.
 */
var _handleGetLanguageCode = function (language) {
    if (typeof language === 'string')
        return _handleGetLanguageCodeFromString(language);
    return _handleGetLanguageCodeFromObject(language);
};
/**
 * Helper function to get the language code from a language name string.
 * @param {string} language - The language name.
 * @returns {string} The language code.
 */
var _handleGetLanguageCodeFromString = function (language) {
    var subtagStrings = language.split(',').map(function (string) { return string.trim(); });
    var code = _mapLanguageToCode(subtagStrings[0]);
    if (code) {
        if (subtagStrings.length === 3) {
            code += "-".concat(_mapScriptToCode(subtagStrings[1]));
            code += "-".concat(_mapRegionToCode(subtagStrings[2]));
        }
        else if (subtagStrings.length === 2) {
            var tag = _mapScriptToCode(subtagStrings[1]);
            if (!tag)
                tag = _mapRegionToCode(subtagStrings[1]);
            if (tag)
                code += "-".concat(tag);
        }
    }
    if (!code) {
        for (var key in Predefined) {
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
var _handleGetLanguageCodeFromObject = function (languageObject) {
    if (!(languageObject === null || languageObject === void 0 ? void 0 : languageObject.language))
        return '';
    var code = languageObject.language.toLowerCase();
    if (languageObject.script) {
        code += "-".concat(_capitalize(languageObject.script));
    }
    if (languageObject.region) {
        code += "-".concat(languageObject.region.toUpperCase());
    }
    return _isValidLanguageCode(code) ? code : '';
};
/**
 * @internal
 */
function _isSameLanguage() {
    var codes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        codes[_i] = arguments[_i];
    }
    // Flatten the array in case the codes are provided as an array
    if (codes.length === 1 && Array.isArray(codes[0])) {
        codes = codes[0];
    }
    if (codes.length < 2)
        return false;
    var language = null;
    for (var i = 0; i < codes.length; i++) {
        if (typeof codes[i] !== 'string')
            return false;
        var languageCode = codes[i].split('-')[0];
        var currentLanguage = _mapCodeToLanguage(languageCode);
        if (language === null) {
            language = currentLanguage;
        }
        else if (language !== currentLanguage) {
            return false;
        }
    }
    return true;
}
