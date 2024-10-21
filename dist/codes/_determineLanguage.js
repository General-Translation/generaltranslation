import isSameLanguage from './_isSameLanguage';
/**
 * Given a list of language and a list of approved language, sorted in preference order
 * Determines which language of the given languages is the best match in the approvedLanguages, prioritizing exact matches and falling back to dialects of the same language
* @internal
*/
export default function _determineLanguage(languages, approvedLanguages) {
    if (typeof languages === 'string')
        languages = [languages];
    if (!approvedLanguages)
        return languages[0];
    var _loop_1 = function (language) {
        var exactMatch = approvedLanguages.find(function (approvedLanguage) { return approvedLanguage === language; });
        if (exactMatch)
            return { value: exactMatch };
        var sameLanguage = approvedLanguages.find(function (approvedLanguage) { return isSameLanguage(approvedLanguage, language); });
        if (sameLanguage)
            return { value: sameLanguage };
    };
    for (var _i = 0, languages_1 = languages; _i < languages_1.length; _i++) {
        var language = languages_1[_i];
        var state_1 = _loop_1(language);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    return undefined;
}
