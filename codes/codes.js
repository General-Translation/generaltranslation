// ----- IMPORTS ----- //

// Import modules for mapping ISO 639 codes to language names and vice versa
const CodeToLanguage = require('./639-1/CodeToLanguage.js');
const LanguageToCode = require('./639-1/LanguageToCode.js');

// Import modules for mapping ISO 639-3 codes (for languages without two-letter codes)
const CodeToLanguageTriletter = require('./639-3/CodeToLanguageTriletter.js');
const LanguageToCodeTriletter = require('./639-3/LanguageToCodeTriletter.js');

// Import module for mapping ISO 15924 script codes to script names
const ScriptToCode = require('./15924/ScriptToCode.js');
const CodeToScript = require('./15924/CodeToScript.js');

// Import module for mapping ISO 3166 region codes to region names
const RegionToCode = require('./3166/RegionToCode.js');
const CodeToRegion = require('./3166/CodeToRegion.js');

// Import predefined common regions
const Predefined = require('./predefined/Predefined.js')

// ----- FORMATTING HELPER FUNCTIONS ----- //

/**
 * Capitalizes the first letter of a code and converts the rest to lowercase.
 * @param {string} code - The code to capitalize.
 * @returns {string} The capitalized code.
 */
const _capitalize = (code) => {
    if (code.length === 0) return code;
    return code.charAt(0).toUpperCase() + code.slice(1).toLowerCase();
}

// ----- MAPPING FUNCTIONS ----- //

/**
 * Returns the name of a language from an ISO 639 code.
 * @param {string} code - The ISO 639 code.
 * @returns {string} The language name.
 */
const _mapCodeToLanguage = code => {
    code = code?.toLowerCase();
    if (code?.length === 2) {
        return CodeToLanguage[code];
    } 
    if (code?.length === 3) {
        return CodeToLanguageTriletter[code];
    }
    return '';
}

/**
 * Returns an ISO 639 code from a language name.
 * Preferentially returns two-letter codes.
 * @param {string} language - The language name.
 * @returns {string} The ISO 639 code.
 */
const _mapLanguageToCode = language => {
    language = language?.toLowerCase();
    return LanguageToCode[language] || LanguageToCodeTriletter[language] || '';
}

/**
 * Returns the name of a script from an ISO 15924 code.
 * @param {string} code - The ISO 15924 code.
 * @returns {string} The script name.
 */
const _mapCodeToScript = code => {
    code = _capitalize(code);
    return CodeToScript[code] || '';
}

/**
 * Returns an ISO 15924 code from a script name.
 * @param {string} script - The script name.
 * @returns {string} The ISO 15924 code.
 */
const _mapScriptToCode = script => {
    script = script?.toLowerCase();
    return ScriptToCode[script] || '';
}
/**
 * Returns the name of a region from an ISO 3166 code.
 * @param {string} code - The ISO 3166 code.
 * @returns {string} The region name.
 */
const _mapCodeToRegion = code => {
    code = code?.toUpperCase();
    return CodeToRegion[code] || '';
}

/**
 * Returns an ISO 3166 code from a region name.
 * @param {string} region - The region name.
 * @returns {string} The ISO 3166 code.
 */
const _mapRegionToCode = region => {
    region = region?.toLowerCase();
    return RegionToCode[region] || '';
}

// ----- LANGUAGE OBJECTS FROM CODES ----- //

/**
 * Returns a language object from an array of codes or a single code.
 * @param {string|string[]} codes - The code or array of codes.
 * @returns {Object|Object[]} The language object(s).
 */
const _getLanguageObject = codes => {
    return Array.isArray(codes) ? codes.map(_handleGetLanguageObject) : _handleGetLanguageObject(codes);
}

/**
 * Helper function to create a language object from a code.
 * @param {string} code - The language code.
 * @returns {Object|null} The language object.
 */
const _handleGetLanguageObject = code => {
    if (!code) return null;
    let languageObject = {
        language: '',
        script: '',
        region: ''
    };
    const subtags = code.split('-');
    // Look for language
    const languageCode = subtags[0];
    languageObject.language = _mapCodeToLanguage(languageCode);
    // Look for script and region
    if (subtags.length === 3) { // language-script-region
        languageObject.script = _mapCodeToScript(subtags[1]);
        languageObject.region = _mapCodeToRegion(subtags[2]);
    }
    else if (subtags.length === 2) { // either language-script or language-region
        if (_isScriptCode(subtags[1])) {
            languageObject.script = _mapCodeToScript(subtags[1]);
        } else {
            languageObject.region = _mapCodeToRegion(subtags[1]);
        }
    }
    return languageObject.language ? languageObject : null;
}

/**
 * Helper function to determine if a code is a script code.
 * @param {string} code - The code to check.
 * @returns {boolean} True if the code is a script code, false otherwise.
 */
const _isScriptCode = (code) => { // if not assume region
    if (code.length !== 4) return false;
    return true;
}

// ----- LANGUAGE NAMES FROM CODES ----- //

/**
 * Returns the language name(s) from an array of codes or a single code.
 * @param {string|string[]} codes - The code or array of codes.
 * @returns {string|string[]} The language name(s).
 */
const _getLanguageName = (codes) => {
    return Array.isArray(codes) ? codes.map(_handleGetLanguageName) : _handleGetLanguageName(codes);
}

/**
 * Helper function to get the language name from a code.
 * @param {string} code - The language code.
 * @returns {string} The language name.
 */
const _handleGetLanguageName = code => {
    if (!code) return '';
    if (Predefined[code]) return Predefined[code];
    const languageObject = _getLanguageObject(code);
    if (!languageObject) return '';
    let result = languageObject.language;
    if (languageObject.script) {
        result += `, ${languageObject.script}`
    }
    if (languageObject.region) {
        result += `, ${languageObject.region}`
    }
    return result;
}

// ----- LANGUAGE CODES FROM NAMES ----- //

/**
 * Returns the language code(s) from an array of language names or a single name.
 * @param {string|string[]} languages - The language name or array of language names.
 * @returns {string|string[]} The language code(s).
 */
const _getLanguageCode = languages => {
    return Array.isArray(languages) ? languages.map(_handleGetLanguageCode) : _handleGetLanguageCode(languages);
}

/**
 * Helper function to get the language code from a language name.
 * @param {string|Object} language - The language name or object.
 * @returns {string} The language code.
 */
const _handleGetLanguageCode = language => {
    if (typeof language === 'string') return _handleGetLanguageCodeFromString(language);
    return _handleGetLanguageCodeFromObject(language);
}

/**
 * Helper function to get the language code from a language name string.
 * @param {string} language - The language name.
 * @returns {string} The language code.
 */
const _handleGetLanguageCodeFromString = language => {
    const subtagStrings = language.split(',').map(string => string.trim());
    let code = _mapLanguageToCode(subtagStrings[0]);
    if (code) {
        if (subtagStrings.length === 3) {
            code += `-${_mapScriptToCode(subtagStrings[1])}`
            code += `-${_mapRegionToCode(subtagStrings[2])}`
        }
        else if (subtagStrings.length === 2) {
            let tag = _mapScriptToCode(subtagStrings[1]);
            if (!tag) tag = _mapRegionToCode(subtagStrings[1]);
            if (tag) code += `-${tag}`;
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
}

/**
 * Helper function to get the language code from a language object.
 * @param {Object} languageObject - The language object.
 * @returns {string} The language code.
 */
const _handleGetLanguageCodeFromObject = languageObject => {
    if (!languageObject?.language) return '';
    let code = languageObject.language.toLowerCase();
    if (languageObject.script) {
        code += `-${_capitalize(languageObject.script)}`
    }
    if (languageObject.region) {
        code += `-${languageObject.region.toUpperCase()}`
    }
    return code;
}

// ----- COMPARISON FUNCTION ----- //

/**
 * Determines if all provided language codes represent the same language.
 * Can take either an array of codes or a plain set of parameters.
 * @param {...(string|string[])} codes - The language codes, either as separate arguments or as an array.
 * @returns {boolean} True if all codes represent the same language, false otherwise.
 */
const _isSameLanguage = (...codes) => {
    // Flatten the array in case the codes are provided as an array
    if (codes.length === 1 && Array.isArray(codes[0])) {
        codes = codes[0];
    }

    if (codes.length < 2) return false;

    let language = null;
    for (let i = 0; i < codes.length; i++) {
        if (typeof codes[i] !== 'string') return false;

        const languageCode = codes[i].split('-')[0];
        const currentLanguage = _mapCodeToLanguage(languageCode);

        if (language === null) {
            language = currentLanguage;
        } else if (language !== currentLanguage) {
            return false;
        }
    }
    return true;
}

// ----- EXPORTS ----- //

// Export functions for external use
module.exports = {
    _getLanguageObject,
    _getLanguageName,
    _getLanguageCode,
    _isSameLanguage
};
