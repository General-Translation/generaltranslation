// ----- IMPORTS ----- //

import CodeToLanguage from './639-1/CodeToLanguage.js'
import LanguageToCode from './639-1/LanguageToCode.js'

// only for languages which have no two-letter code
import CodeToLanguageTriletter from './639-3/CodeToLanguageTriletter.js'
import LanguageToCodeTriletter from './639-3/LanguageToCodeTriletter.js'

// ----- LANGUAGE CODES ----- //

// Returns the name of a language from an ISO 639 code or an array of codes
const _mapCodeToLanguage = code => {
    code = code?.toLowerCase();
    if (code?.length === 2) {
        return CodeToLanguage[code]
    } 
    if (code?.length === 3) {
        return CodeToLanguageTriletter[code]
    }
    else {
        return CodeToLanguage[code?.slice(0, 2)] || '';
    }
}
export const _getLanguageName = codes => {
    return Array.isArray(codes) ? codes.map(_mapCodeToLanguage) : _mapCodeToLanguage(codes);
}

// Returns an ISO 639 code from a language name or an array of language names
// Preferentially returns two-letter codes
const _mapLanguageToCode = language => {
    const lowerCaseLanguage = language?.toLowerCase();
    return LanguageToCode[lowerCaseLanguage] || LanguageToCodeTriletter[lowerCaseLanguage] || '';
}
export const _getLanguageCode = languages => {
    return Array.isArray(languages) ? languages.map(_mapLanguageToCode) : _mapLanguageToCode(languages);
}