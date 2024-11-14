import libraryDefaultLanguage from "../settings/libraryDefaultLanguage";

/**
 * Checks if a given BCP 47 language code is valid.
 * @param {string} code - The BCP 47 language code to validate.
 * @returns {boolean} True if the BCP 47 code is valid, false otherwise.
 * @internal
 */
export const _isValidLanguageCode = (code: string): boolean => {
    try {
        const { language, region, script } = new Intl.Locale(code).maximize();
        const displayLanguageNames = new Intl.DisplayNames([libraryDefaultLanguage], { type: 'language' });
        if (displayLanguageNames.of(language) === language) return false;
        if (region) {
            const displayRegionNames = new Intl.DisplayNames([libraryDefaultLanguage], { type: 'region' });
            if (displayRegionNames.of(region) === region) return false;
        }
        if (script) {
            const displayScriptNames = new Intl.DisplayNames([libraryDefaultLanguage], { type: 'script' });
            if (displayScriptNames.of(script) === script) return false;
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
    try {
        return new Intl.Locale(code).toString();
    } catch {
        // Return empty string instead of throwing an error
        return '';
    }
};

/**
 * Retrieves the display name(s) of language code(s) using Intl.DisplayNames.
 *
 * @param {string | string[]} code - A language code or an array of codes.
 * @param {string} [defaultLanguage=libraryDefaultLanguage] - The language for display names.
 * @returns {string | string[]} The display name(s) corresponding to the code(s), or empty string(s) if invalid.
 * @internal
 */
export function _getLanguageName(code: string | string[], defaultLanguage: string = libraryDefaultLanguage): string | string[] {
    try {
        const displayNames = new Intl.DisplayNames([defaultLanguage, libraryDefaultLanguage], { type: 'language' });
        if (typeof code === 'string') {
            // Handle the case where it's a single language code
            const name = displayNames.of(code);
            return name || '';
        } else if (Array.isArray(code)) {
            // Handle the case where it's an array of language codes
            return code.map((c) => displayNames.of(c) || '');
        }
        // If code is neither string nor array, return empty string
        return '';
    } catch {
        // In case Intl.DisplayNames construction fails, return empty string(s)
        if (typeof code === 'string') {
            return '';
        } else if (Array.isArray(code)) {
            return code.map(() => '');
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
