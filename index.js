// `generaltranslation` language toolkit
// © 2024, General Translation, Inc.

// ----- IMPORTS ----- //

const { _getLanguageObject, _getLanguageCode, _getLanguageName, _isSameLanguage } = require('./codes/codes.js');

// TO DO
// - Translation API
// - Times/dates?
// - Currency conversion?

// ----- CORE CLASS ----- // 

const getDefaultFromEnv = (VARIABLE) => {
    if (typeof process !== 'undefined') {
        if (process?.env?.[VARIABLE]) {
            return process.env[VARIABLE];
        }
    }
    return '';
}

class GT {

    constructor({
        apiKey = '', 
        defaultLanguage = 'en',
        projectID = '',
        baseURL = 'https://prod.gtx.dev'
    } = {}) {
        this.apiKey = apiKey || getDefaultFromEnv('GT_API_KEY');
        this.projectID = projectID || getDefaultFromEnv('GT_PROJECT_ID');
        this.defaultLanguage = defaultLanguage?.toLowerCase();
        this.baseURL = baseURL;
    }

    // TBD

}

// ----- SECONDARY EXPORTS ----- //

// Export the class
module.exports = GT;

// Export the functions 
module.exports.getLanguageObject = _getLanguageObject;
module.exports.getLanguageCode = _getLanguageCode;
module.exports.getLanguageName = _getLanguageName;
module.exports.isSameLanguage= _isSameLanguage;