const { CodeToLanguage } = require('./languages/639-1.js');
const { CodeToLanguageTriletter } = require('./languages/639-3.js');

// Gets the name of a language from an ISO 639 code
function getLanguageName(code) {
    return ((code.length === 2) ? (CodeToLanguage[code]) : (CodeToLanguageTriletter[code])) || '';
}

module.exports = { 
    getLanguageName
}