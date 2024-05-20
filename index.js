// `generaltranslation` language toolkit
// © 2024, General Translation, Inc.

// ----- IMPORTS ----- //

const { _getLanguageCode, _getLanguageName } = require('./codes/codes.js');
const _translatePrompt = require('./translate/prompts.js');
const _translateHTML = require('./translate/html.js');

// ----- CORE CLASS ----- // 

class GT {

    constructor({
        apiKey = '', 
        defaultLanguage = 'en',
        baseURL = 'https://translate.gtx.dev'
    } = {}) {
        this.apiKey = apiKey || (typeof process !== 'undefined' ? process.env.GT_API_KEY : '');
        this.defaultLanguage = defaultLanguage?.toLowerCase();
        this.baseURL = baseURL;
    }

    // Prompt I18N
    async translatePrompt(prompt, language) {
        return await _translatePrompt({
            content: prompt, language: language, config: this
        });
    }

    // Site I18N
    async translateHTML({ projectID, page, userLanguage, defaultLanguage, content, ...metadata }) {
        return await _translateHTML({
           projectID: projectID,
           page: page,
           userLanguage: userLanguage,
           defaultLanguage: defaultLanguage,
           content: content,
           config: this,
           ...metadata
        });
    }

}

// ----- SECONDARY EXPORTS ----- //

// Export the class
module.exports = GT;

// Export the functions 
module.exports.getLanguageCode = _getLanguageCode;
module.exports.getLanguageName = _getLanguageName;