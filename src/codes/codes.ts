// ----- IMPORTS ----- //

// Import modules for mapping ISO 639 codes to language names and vice versa
import CodeToLanguageJSON from './639-1/CodeToLanguage.json';
import LanguageToCodeJSON from './639-1/LanguageToCode.json';

const CodeToLanguage: Record<string, string> = CodeToLanguageJSON as Record<string, string>;
const LanguageToCode: Record<string, string> = LanguageToCodeJSON as Record<string, string>;

// Import modules for mapping ISO 639-3 codes (for languages without two-letter codes)
import CodeToLanguageTriletterJSON from './639-3/CodeToLanguageTriletter.json';
import LanguageToCodeTriletterJSON from './639-3/LanguageToCodeTriletter.json';

const CodeToLanguageTriletter: Record<string, string> = CodeToLanguageTriletterJSON as Record<string, string>;
const LanguageToCodeTriletter: Record<string, string> = LanguageToCodeTriletterJSON as Record<string, string>;

// Import module for mapping ISO 15924 script codes to script names
import ScriptToCodeJSON from './15924/ScriptToCode.json';
import CodeToScriptJSON from './15924/CodeToScript.json';

const ScriptToCode: Record<string, string> = ScriptToCodeJSON as Record<string, string>;
const CodeToScript: Record<string, string> = CodeToScriptJSON as Record<string, string>;

// Import module for mapping ISO 3166 region codes to region names
import RegionToCodeJSON from './3166/RegionToCode.json';
import CodeToRegionJSON from './3166/CodeToRegion.json';

const RegionToCode: Record<string, string> = RegionToCodeJSON as Record<string, string>;
const CodeToRegion: Record<string, string> = CodeToRegionJSON as Record<string, string>;

// Import predefined common regions
import PredefinedJSON from './predefined/Predefined.json';

const Predefined: Record<string, string> = PredefinedJSON as Record<string, string>;


// ----- VALIDITY CHECKS ----- //

/**
 * Check if a given language-country-script code is valid.
 * @param {string} code - The language-country-script code to validate.
 * @returns {boolean} - Returns true if valid, false otherwise.
 */
function _isValidLanguageCode(code: string): boolean {
    if (!code || typeof code !== 'string') return false;
    try {
        if (!_mapCodeToLanguage(code.split('-')[0])) return false;
        const locale = new Intl.Locale(code);
        const { language, script, region } = locale;
        const constructedCode = `${language}${script ? '-' + script : ''}${region ? '-' + region : ''}`;
        return constructedCode.toLowerCase() === code.toLowerCase();
    } catch (error) {
        return false;
    }
}

// ----- FORMATTING HELPER FUNCTIONS ----- //

/**
 * Capitalizes the first letter of a code and converts the rest to lowercase.
 * @param {string} code - The code to capitalize.
 * @returns {string} The capitalized code.
 */
const _capitalize = (code: string): string => {
    if (code.length === 0) return code;
    return code.charAt(0).toUpperCase() + code.slice(1).toLowerCase();
}

// ----- MAPPING FUNCTIONS ----- //

/**
 * Returns the name of a language from an ISO 639 code.
 * @param {string} code - The ISO 639 code.
 * @returns {string} The language name.
 */
const _mapCodeToLanguage = (code: string): string => {
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
const _mapLanguageToCode = (language: string): string => {
    language = language?.toLowerCase();
    return LanguageToCode[language] || LanguageToCodeTriletter[language] || '';
}

/**
 * Returns the name of a script from an ISO 15924 code.
 * @param {string} code - The ISO 15924 code.
 * @returns {string} The script name.
 */
const _mapCodeToScript = (code: string): string => {
    code = _capitalize(code);
    return CodeToScript[code] || '';
}

/**
 * Returns an ISO 15924 code from a script name.
 * @param {string} script - The script name.
 * @returns {string} The ISO 15924 code.
 */
const _mapScriptToCode = (script: string): string => {
    script = script?.toLowerCase();
    return ScriptToCode[script] || '';
}

/**
 * Returns the name of a region from an ISO 3166 code.
 * @param {string} code - The ISO 3166 code.
 * @returns {string} The region name.
 */
const _mapCodeToRegion = (code: string): string => {
    code = code?.toUpperCase();
    return CodeToRegion[code] || '';
}

/**
 * Returns an ISO 3166 code from a region name.
 * @param {string} region - The region name.
 * @returns {string} The ISO 3166 code.
 */
const _mapRegionToCode = (region: string): string => {
    region = region?.toLowerCase();
    return RegionToCode[region] || '';
}

// ----- LANGUAGE OBJECTS FROM CODES ----- //

type LanguageObject = {
    language: string;
    script?: string;
    region?: string;
}

/**
 * Returns a language object from an array of codes or a single code.
 * Returns null if there's no matching language.
 * @param {string|string[]} codes - The code or array of codes.
 * @returns {(LanguageObject|null) | (LanguageObject|null)[]} The language object(s).
 */
function _getLanguageObject(codes: string): LanguageObject | null;
function _getLanguageObject(codes: string[]): (LanguageObject | null)[];
function _getLanguageObject(codes: string | string[]): (LanguageObject | null) | (LanguageObject | null)[] {
    return Array.isArray(codes) ? codes.map(_handleGetLanguageObject) : _handleGetLanguageObject(codes);
}

/**
 * Helper function to create a language object from a code.
 * @param {string} code - The language code.
 * @returns {LanguageObject|null} The language object.
 */
const _handleGetLanguageObject = (code: string): LanguageObject | null => {
    try {
        const locale = new Intl.Locale(code);
        let languageObject = {
            language: _mapCodeToLanguage(locale.language) || '',
            script: locale.script ? _mapCodeToScript(locale.script) ?? '' : '',
            region: locale.region ? _mapCodeToRegion(locale.region) ?? '' : ''
        };
        return languageObject.language ? languageObject : null;
    } catch (error) {
        // If the code is not a valid locale, return null
        return null;
    }
}

// ----- LANGUAGE NAMES FROM CODES ----- //

/**
 * Returns the language name(s) from an array of codes or a single code.
 * @param {string|string[]} codes - The code or array of codes.
 * @returns {string|string[]} The language name(s).
 */
const _getLanguageName = (codes: string | string[]): string | string[] => {
    return Array.isArray(codes) ? codes.map(_handleGetLanguageName) : _handleGetLanguageName(codes);
}

/**
 * Helper function to get the language name from a code.
 * @param {string} code - The language code.
 * @returns {string} The language name.
 */
const _handleGetLanguageName = (code: string): string => {
    if (!_isValidLanguageCode(code)) return '';
    if (Predefined[code]) return Predefined[code];
    const languageObject = _getLanguageObject(code);
    if (!languageObject) return '';
    let result = languageObject.language;
    if (languageObject.script) {
        result += `, ${languageObject.script}`;
    }
    if (languageObject.region) {
        result += `, ${languageObject.region}`;
    }
    return result;
}

// ----- LANGUAGE CODES FROM NAMES ----- //

/**
 * Returns the language code(s) from an array of language names or a single name.
 * @param {string|string[]} languages - The language name or array of language names.
 * @returns {string|string[]} The language code(s).
 */
const _getLanguageCode = (languages: string | string[]): string | string[] => {
    return Array.isArray(languages) ? languages.map(_handleGetLanguageCode) : _handleGetLanguageCode(languages);
}

/**
 * Helper function to get the language code from a language name.
 * @param {string|Object} language - The language name or object.
 * @returns {string} The language code.
 */
const _handleGetLanguageCode = (language: string | LanguageObject): string => {
    if (typeof language === 'string') return _handleGetLanguageCodeFromString(language);
    return _handleGetLanguageCodeFromObject(language);
}

/**
 * Helper function to get the language code from a language name string.
 * @param {string} language - The language name.
 * @returns {string} The language code.
 */
const _handleGetLanguageCodeFromString = (language: string): string => {
    const subtagStrings = language.split(',').map(string => string.trim());
    let code = _mapLanguageToCode(subtagStrings[0]);
    if (code) {
        if (subtagStrings.length === 3) {
            code += `-${_mapScriptToCode(subtagStrings[1])}`;
            code += `-${_mapRegionToCode(subtagStrings[2])}`;
        } else if (subtagStrings.length === 2) {
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
 * @param {LanguageObject} languageObject - The language object.
 * @returns {string} The language code.
 */
const _handleGetLanguageCodeFromObject = (languageObject: LanguageObject): string => {
    if (!languageObject?.language) return '';
    let code = languageObject.language.toLowerCase();
    if (languageObject.script) {
        code += `-${_capitalize(languageObject.script)}`;
    }
    if (languageObject.region) {
        code += `-${languageObject.region.toUpperCase()}`;
    }
    return _isValidLanguageCode(code) ? code : '';
}

// ----- COMPARISON FUNCTION ----- //

/**
 * Determines if all provided language codes represent the same language.
 * Can take either an array of codes or a plain set of parameters.
 * @param codes - The language codes, either as separate arguments or as an array.
 * @returns {boolean} True if all codes represent the same language, false otherwise.
 */
// Function overloads
function _isSameLanguage(...codes: string[]): boolean;
function _isSameLanguage(codes: string[]): boolean;
function _isSameLanguage(...codes: (string | string[])[]): boolean {
    // Flatten the array in case the codes are provided as an array
    if (codes.length === 1 && Array.isArray(codes[0])) {
        codes = codes[0] as string[];
    }

    if (codes.length < 2) return false;

    let language: string | null = null;
    for (let i = 0; i < codes.length; i++) {
        if (typeof codes[i] !== 'string') return false;

        const languageCode = (codes[i] as string).split('-')[0];
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
export {
    _isValidLanguageCode,
    _getLanguageObject,
    _getLanguageName,
    _getLanguageCode,
    _isSameLanguage
};