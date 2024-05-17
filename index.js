// `generaltranslation` language toolkit
// © 2024, General Translation, Inc.

// ----- IMPORTS ----- //

import { _getLanguageCode, _getLanguageName } from "./codes/codes.js"
import _translatePrompt from "./translate/prompts.js"
import _translateHTML from "./translate/html.js";

// ----- CORE CLASS ----- // 

export default class GT {

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
    async translateHTML({ projectID, defaultLanguage, userLanguage, content }) {
        return await _translateHTML({
           projectID: projectID,
           defaultLanguage: defaultLanguage,
           userLanguage: userLanguage,
           content: content,
           config: this
        });
    }

}

// ----- SECONDARY EXPORTS ----- //

export {
    _getLanguageCode as getLanguageCode,
    _getLanguageName as getLanguageName
};