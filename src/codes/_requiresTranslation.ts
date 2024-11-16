import _isSameLanguage from "./_isSameLanguage";
import { _standardizeLanguageCode, _isValidLanguageCode } from "./codes";

function areTwoCodesIdentical(codeA: string, codeB: string) {
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
export function _isSameDialect(...codes: (string | string[])[]): boolean {
    try {

        // standardize codes
        const flattenedCodes = codes.flat().map(_standardizeLanguageCode);
        
        for (let i = 0; i < flattenedCodes.length; i++) {
            for (let j = i + 1; j < flattenedCodes.length; j++) {
                if (!areTwoCodesIdentical(flattenedCodes[i], flattenedCodes[j])) return false;
            } 
        }

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}


/**
 * Given a target language and a source language, determines whether a translation is required
 * If the target language and the source language are the same, returns false, otherwise returns true
 * If a translation is not possible due to the target language being outside of the optional approvedLanguages scope, also returns false
* @internal
*/
export default function _requiresTranslation(
    sourceLanguage: string, targetLanguage: string, approvedLanguages?: string[]
): boolean {

    // If codes are invalid
    if (!_isValidLanguageCode(sourceLanguage) ||
        !_isValidLanguageCode(targetLanguage) || 
        (approvedLanguages && approvedLanguages.some(approvedLanguage => !_isValidLanguageCode(approvedLanguage)))
    ) return false;

    // Check if the languages are identical, if so, a translation is not required
    if (_isSameDialect(sourceLanguage, targetLanguage)) return false;
    
    // if no translation is possible
    // isSameLanguage rather than isIdenticalDialect so we can show different dialects as a fallback
    if (approvedLanguages && !approvedLanguages.some(approvedLanguage => _isSameLanguage(targetLanguage, approvedLanguage))) return false;
    
    // otherwise, a translation is required!
    return true;
}