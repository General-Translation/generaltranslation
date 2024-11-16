import libraryDefaultLanguage from "../settings/libraryDefaultLanguage";

const scriptExceptions = [
    "Cham",
    "Jamo",
    "Kawi",
    "Lisu",
    "Toto",
    "Thai"
];

/**
 * Checks if a given BCP 47 language code is valid.
 * @param {string} code - The BCP 47 language code to validate.
 * @returns {boolean} True if the BCP 47 code is valid, false otherwise.
 * @internal
 */
export const _isValidLanguageCode = (code: string): boolean => {
    try {
        const { language, region, script } = new Intl.Locale(code);
        const displayLanguageNames = new Intl.DisplayNames([libraryDefaultLanguage], { type: 'language' });
        if (displayLanguageNames.of(language) === language) return false;
        if (region) {
            const displayRegionNames = new Intl.DisplayNames([libraryDefaultLanguage], { type: 'region' });
            if (displayRegionNames.of(region) === region) return false;
        }
        if (script) {
            const displayScriptNames = new Intl.DisplayNames([libraryDefaultLanguage], { type: 'script' });
            if (displayScriptNames.of(script) === script && !scriptExceptions.includes(script)) return false;
        }
        return true;
    } catch {
        return false;
    }
};

/**
 * Standardizes a BCP 47 language code to ensure correct formatting.
 * @param {string} code - The BCP 47 language code to standardize.
 * @returns {string} The standardized BCP 47 language code, or an empty string if invalid.
 * @internal
 */
export const _standardizeLanguageCode = (code: string): string => {
    if (_isValidLanguageCode(code)) return Intl.getCanonicalLocales(code)[0];
    return '';
};

/**
 * Retrieves the display name(s) of language code(s) using Intl.DisplayNames.
 *
 * @param {string} code - A language code.
 * @param {string} [defaultLanguage=libraryDefaultLanguage] - The language for display names.
 * @returns {string} The display name(s) corresponding to the code(s), or empty string(s) if invalid.
 * @internal
*/
export function _getLanguageName(code: string, defaultLanguage: string = libraryDefaultLanguage): string {
    try {
        const displayNames = new Intl.DisplayNames([defaultLanguage, libraryDefaultLanguage], { type: 'language' });
        return displayNames.of(code) || '';
    } catch {
        // In case Intl.DisplayNames construction fails, return empty string(s)
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
export function _getLanguageDirection(code: string): string {
    try {
        const locale = new Intl.Locale(code);
        // Return 'rtl' if the text direction of the language is right-to-left, otherwise 'ltr'
        return (locale as any)?.textInfo?.direction === 'rtl' ? 'rtl' : 'ltr';
    } catch {
        // If the code is invalid or causes an error, fallback to 'ltr'
        return 'ltr';
    }
}
