// `generaltranslation` language toolkit
// © 2024, General Translation, Inc.

// ----- IMPORTS ----- //

const { _getLanguageCode, _getLanguageName } = require('./codes/codes.js');
const { _translate, _translateMany } = require('./translate/translate.js');
const _translateHTML = require('./translate/html.js');

// TO DO
// - Times/dates?
// - Currency conversion?
// - Regions (e.g. en-GB)

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
        baseURL = 'https://translate.gtx.dev'
    } = {}) {
        this.apiKey = apiKey || getDefaultFromEnv('GT_API_KEY');
        this.projectID = projectID || getDefaultFromEnv('GT_PROJECT_ID');
        this.defaultLanguage = defaultLanguage?.toLowerCase();
        this.baseURL = baseURL;
    }

    // Site I18N
    async translateHTML({ page, userLanguage, defaultLanguage, content, ...metadata }) {
        return await _translateHTML({
            page: page,
            userLanguage: userLanguage,
            defaultLanguage: defaultLanguage,
            content: content,
            config: this,
            ...metadata
        });
    }

    // String translation
    async translate(content, language, { ... options }) {
        return await _translate({
            content: content, language: language, config: this, ...options,
        });
    }

    // String translation, of an array of strings
    async translateMany(contentArray, language, { ... options }) {
        return await _translateMany({
            contentArray: contentArray, language: language, config: this, ...options,
        });
    }

}

// ----- SECONDARY EXPORTS ----- //

// Export the class
module.exports = GT;

// Export the functions 
module.exports.getLanguageCode = _getLanguageCode;
module.exports.getLanguageName = _getLanguageName;