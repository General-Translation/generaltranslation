// ----- IMPORTS ----- //

const CodeToLanguage = require('./639-1/CodeToLanguage.json');
const LanguageToCode = require('./639-1/LanguageToCode.json');

// only for languages which have no two-letter code
const CodeToLanguageTriletter = require('./639-3/CodeToLanguageTriletter.json');
const LanguageToCodeTriletter = require('./639-3/LanguageToCodeTriletter.json');

// ----- LANGUAGE CODES ----- //

// Returns the name of a language from an ISO 639 code or an array of codes
const _mapCodeToLanguage = code => {
    if (code.length === 2) {
        return CodeToLanguage[code]
    } 
    if (code.length === 3) {
        CodeToLanguageTriletter[code]
    }
    else {
        return CodeToLanguage[code.slice(0, 2)] || '';
    }
}
const _getLanguageName = codes => {
    return Array.isArray(codes) ? codes.map(_mapCodeToLanguage) : _mapCodeToLanguage(codes);
}

// Returns an ISO 639 code from a language name or an array of language names
// Preferentially returns two-letter codes
const _mapLanguageToCode = language => {
    const lowerCaseLanguage = language.toLowerCase();
    return LanguageToCode[lowerCaseLanguage] || LanguageToCodeTriletter[lowerCaseLanguage] || '';
}
const _getLanguageCode = languages => {
    return Array.isArray(languages) ? languages.map(_mapLanguageToCode) : _mapLanguageToCode(languages);
}

module.exports = {
    _getLanguageName, _getLanguageCode
}