// `generaltranslation` language toolkit
// © 2024, General Translation, Inc.

// ----- IMPORTS ----- //

const { getLanguageName, getLanguageCode } = require('./codes/codes.js');

const { getModelList, getModelLanguages, isLanguageSupported } = require('./models/models.js');

class GT {

    constructor({
        apiKey = '', 
        defaultLanguage = 'en'
    } = {}) {
        this.apiKey = apiKey;
        this.defaultLanguage = defaultLanguage;
    }

    // Language code functions
    getLanguageName = getLanguageName; // e.g. 'en' => 'English'
    getLanguageCode = getLanguageCode; // e.g. 'English' => 'en'

    // Model information functions
    getModelList = getModelList; // returns array of supported model names
    getModelLanguages = getModelLanguages; // e.g. 'mistral-7b' => ['en']
    isLanguageSupported = isLanguageSupported; // e.g. ('mistral-7b', 'en') => true

}

// ----- EXPORTS ----- //

module.exports = GT;
module.exports.getLanguageCode = getLanguageCode;
module.exports.getLanguageName = getLanguageName;
module.exports.getModelList = getModelList;
module.exports.getModelLanguages = getModelLanguages;
module.exports.isLanguageSupported = isLanguageSupported;