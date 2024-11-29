import _isSameLanguage from "./_isSameLanguage";
import { _isValidLocale, _standardizeLocale } from "./_isValidLocale";

function checkTwoLocalesAreSameDialect(codeA: string, codeB: string) {
    const { language: languageA, region: regionA, script: scriptA } = new Intl.Locale(codeA);
    const { language: languageB, region: regionB, script: scriptB } = new Intl.Locale(codeB);
    if (languageA !== languageB) return false;
    if (regionA && regionB && regionA !== regionB) return false;
    if (scriptA && scriptB && scriptA !== scriptB) return false;
    return true;
}

/**
 * Test two or more language codes to determine if they are exactly the same
 * e.g. "en-US" and "en" would be exactly the same.
 * "en-GB" and "en" would be exactly the same.
 * "en-GB" and "en-US" would be different.
 * @internal
*/
export function _isSameDialect(...locales: (string | string[])[]): boolean {
    try {

        // standardize codes
        const flattenedCodes = locales.flat().map(_standardizeLocale);
        
        for (let i = 0; i < flattenedCodes.length; i++) {
            for (let j = i + 1; j < flattenedCodes.length; j++) {
                if (!checkTwoLocalesAreSameDialect(flattenedCodes[i], flattenedCodes[j])) return false;
            } 
        }

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}


/**
 * Given a target locale and a source locale, determines whether a translation is required
 * If the target locale and the source locale are the same, returns false, otherwise returns true
 * If a translation is not possible due to the target locale being outside of the optional approvedLanguages scope, also returns false
* @internal
*/
export default function _requiresTranslation(
    sourceLocale: string, targetLocale: string, approvedLocales?: string[]
): boolean {

    // If codes are invalid
    if (!_isValidLocale(sourceLocale) ||
        !_isValidLocale(targetLocale) || 
        (approvedLocales && approvedLocales.some(approvedLocale => !_isValidLocale(approvedLocale)))
    ) return false;

    // Check if the languages are identical, if so, a translation is not required
    if (_isSameDialect(sourceLocale, targetLocale)) return false;
    
    // if no translation is possible
    // isSameLanguage rather than isIdenticalDialect so we can show different dialects as a fallback
    if (approvedLocales && !approvedLocales.some(approvedLocale => _isSameLanguage(targetLocale, approvedLocale))) return false;
    
    // otherwise, a translation is required!
    return true;
}