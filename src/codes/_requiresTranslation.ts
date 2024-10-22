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
    if (!targetLanguage) return false;
    if (_standardizeLanguageCode(targetLanguage) === _standardizeLanguageCode(sourceLanguage)) return false;
    if (approvedLanguages && !approvedLanguages.some(approvedLanguage => _isSameLanguage(targetLanguage, approvedLanguage))) return false;
    return true;
}