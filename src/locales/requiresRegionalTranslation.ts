import _isSameDialect from "./isSameDialect";
import _isSameLanguage from "./isSameLanguage";
import { _isValidLocale } from "./isValidLocale";

/**
 * Given a target locale and a source locale, determines whether a regional translation is required
 * This is the case when the target locale is the same language as the source locale, but a different dialect (e.g. en-US and en-GB)
 * If languages are different, returns false (e.g. en-US and fr-FR)
 * @internal 
*/
export function _requiresRegionalTranslation(
    sourceLocale: string, targetLocale: string, approvedLocales?: string[]
): boolean {

    // If codes are invalid
    if (!_isValidLocale(sourceLocale) ||
        !_isValidLocale(targetLocale) || 
        (approvedLocales && approvedLocales.some(approvedLocale => !_isValidLocale(approvedLocale)))
    ) return false;

    // Check that the target locale is within the approvedLocales scope, if not, a translation is not required
    // Accept languages that are the same, even if they are not in the approvedLocales (ie if regions differ)
    if (approvedLocales && !approvedLocales.some(approvedLocale => _isSameLanguage(targetLocale, approvedLocale))) return false;

    // Check languages are the same, but region is different
    return _isSameLanguage(sourceLocale, targetLocale) && !_isSameDialect(sourceLocale, targetLocale);
}
