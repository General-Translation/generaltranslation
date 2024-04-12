// `generaltranslation` language toolkit
// © 2024, General Translation, Inc.

// ----- IMPORTS ----- //

const { _getLanguageName, _getLanguageCode } = require('./codes/codes.js');
const { _getModelList, _getModelLanguages, _isLanguageSupported } = require('./models/models.js');
const { _getPrompt } = require('./prompts/prompts.js');

// ----- CORE CLASS ----- // 

class GT {

    constructor({
        apiKey = '', 
        defaultLanguage = 'en'
    } = {}) {
        this.apiKey = apiKey;
        this.defaultLanguage = defaultLanguage;
    }

    // Language code functions
    getLanguageName = _getLanguageName; // e.g. 'en' => 'English'
    getLanguageCode = _getLanguageCode; // e.g. 'English' => 'en'

    // Model information functions
    getModelList = _getModelList; // returns array of supported model names
    getModelLanguages = _getModelLanguages; // e.g. 'mistral-7b' => ['en']
    isLanguageSupported = _isLanguageSupported; // e.g. ('mistral-7b', 'en') => true

    // Prompt internationalization
    getPrompt = async (prompt, language) => {
        return await _getPrompt(prompt, language, this.defaultLanguage, this.apiKey);
    }

}

// ----- EXPORTS ----- //

module.exports = GT;
module.exports.getLanguageCode = _getLanguageCode;
module.exports.getLanguageName = _getLanguageName;
module.exports.getModelList = _getModelList;
module.exports.getModelLanguages = _getModelLanguages;
module.exports.isLanguageSupported = _isLanguageSupported;