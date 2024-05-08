// `generaltranslation` language toolkit
// © 2024, General Translation, Inc.

// ----- IMPORTS ----- //

const { _getLanguageName, _getLanguageCode } = require('./codes/codes.js');
const { _getModelList, _getModelInfo, _getAllModelInfo, _getModelLanguages, _isLanguageSupported, _getModelsByDeveloper, _getModelsByLanguage, } = require('./models/models.js');
const { _translatePrompt } = require('./prompts/translate.js');

// ----- CORE CLASS ----- // 

class GT {

    constructor({
        apiKey = '', 
        defaultLanguage = 'en',
        baseURL = 'https://translate.gtx.dev'
    } = {}) {
        this.apiKey = apiKey;
        this.defaultLanguage = defaultLanguage;
        this.baseURL = baseURL;
    }

    // Language code functions
    getLanguageName = _getLanguageName; // e.g. 'en' => 'English'
    getLanguageCode = _getLanguageCode; // e.g. 'English' => 'en'

    // Model information functions
    getModelList = _getModelList; // returns array of supported model names
    getModelInfo = _getModelInfo; // returns model object
    getAllModelInfo =  _getAllModelInfo; // returns all info on all models
    getModelLanguages = _getModelLanguages; // e.g. 'mistral-7b' => ['en']
    isLanguageSupported = _isLanguageSupported; // e.g. ('mistral-7b', 'en') => true
    getModelsByLanguage = _getModelsByLanguage; // returns array of model names
    getModelsByDeveloper = _getModelsByDeveloper; // returns array of model names

    // Prompt I18N
    translatePrompt = async (prompt, language) => {
        return await _translatePrompt({
            content: prompt, language: language, context: this
        });
    }

}

// ----- EXPORTS ----- //

module.exports = GT;
module.exports.getLanguageCode = _getLanguageCode;
module.exports.getLanguageName = _getLanguageName;
module.exports.getModelList = _getModelList;
module.exports.getModelInfo = _getModelInfo;
module.exports.getAllModelInfo = _getAllModelInfo;
module.exports.getModelLanguages = _getModelLanguages;
module.exports.isLanguageSupported = _isLanguageSupported;
module.exports.getModelsByDeveloper = _getModelsByDeveloper;
module.exports.getModelsByLanguage = _getModelsByLanguage;