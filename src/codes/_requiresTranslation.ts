import { _standardizeLanguageCode } from "./codes";
import _isSameLanguage from "./_isSameLanguage";

/**
 * Given a target language and a source language, determines whether a translation is required
 * If the target language and the source language are the same, returns false, otherwise returns true
 * If a translation is not possible due to the target language being outside of the optional approvedLanguages scope, also returns false
* @internal
*/
export default function _requiresTranslation(
    sourceLanguage: string, targetLanguage: string, approvedLanguages?: string[]
): boolean {

    // if no target
    if (!targetLanguage) return false;

    // if the codes are exactly the same
    if (_standardizeLanguageCode(targetLanguage) === _standardizeLanguageCode(sourceLanguage)) return false;

    // if the codes are more/less specific versions of each other, e.g. en and en-US
    const { language: sourceLanguageCode, region: sourceRegion } = new Intl.Locale(sourceLanguage);
    const { language: targetLanguageCode, region: targetRegion } = new Intl.Locale(targetLanguage);
    if ((!sourceRegion || !targetRegion) && _isSameLanguage(sourceLanguageCode, targetLanguageCode)) return false;

    // if no translation is possible
    if (approvedLanguages && !approvedLanguages.some(approvedLanguage => _isSameLanguage(targetLanguage, approvedLanguage))) return false;
    
    // otherwise, a translation is required!
    return true;
}