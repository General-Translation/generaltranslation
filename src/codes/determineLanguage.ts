import { _isSameLanguage } from './codes'

/**
 * Given a list of language and a list of approved language, sorted in preference order
 * Determines which language of the given languages is the best match in the approvedLanguages, prioritizing exact matches and falling back to dialects of the same language
* @internal
*/
export default function _determineLanguage(
    languages: string | string[], approvedLanguages: string[]
): string | undefined {
    if (typeof languages === 'string')
        languages = [languages];
    if (!approvedLanguages) return languages[0];
    for (const language of languages) {
        const exactMatch = approvedLanguages.find(approvedLanguage => approvedLanguage === language)
        if (exactMatch) return exactMatch;
        const sameLanguage = approvedLanguages.find(approvedLanguage => _isSameLanguage(approvedLanguage, language));
        if (sameLanguage) return sameLanguage;
    }
    return undefined;
}