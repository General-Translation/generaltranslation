// `generaltranslation` language toolkit
// © 2024, General Translation, Inc.

// ----- IMPORTS ----- //

const { _getLanguageName, _getLanguageCode } = require('./codes/codes.js');
const { _getModelList, _getModelInfo, _getModelLanguages, _isLanguageSupported } = require('./models/models.js');
const { _translate } = require('./translate/translate.js');

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
    getModelInfo = _getModelInfo; // returns model object
    getModelLanguages = _getModelLanguages; // e.g. 'mistral-7b' => ['en']
    isLanguageSupported = _isLanguageSupported; // e.g. ('mistral-7b', 'en') => true

    // Prompt internationalization
    getPrompt = async (prompt, code) => {
        return await _translate(prompt, code, this.defaultLanguage, this.apiKey);
    }
    // Translation (same as prompt internationalization)
    translate = async (content, code) => {
        return await _translate(content, code, this.defaultLanguage, this.apiKey);
    }
    

}

// ----- EXPORTS ----- //

module.exports = GT;
module.exports.getLanguageCode = _getLanguageCode;
module.exports.getLanguageName = _getLanguageName;
module.exports.getModelList = _getModelList;
module.exports.getModelInfo = _getModelInfo;
module.exports.getModelLanguages = _getModelLanguages;
module.exports.isLanguageSupported = _isLanguageSupported;