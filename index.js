// `generaltranslation` language toolkit
// © 2024, General Translation, Inc.

// ----- IMPORTS ----- //

import _getUserLanguage from "./client/getUserLanguage.js";
import { _getLanguageCode, _getLanguageName } from "./codes/codes.js"
import { _getModelInfo, _getModelList, _getModelLanguages, _isLanguageSupported, _getModelsByDeveloper, _getModelsByLanguage } from "./models/models.js"
import _translatePrompt from "./prompts/translate.js"

// ----- CORE CLASS ----- // 

export default class GT {

    constructor({
        apiKey = '', 
        defaultLanguage = 'en',
        baseURL = 'https://translate.gtx.dev'
    } = {}) {
        this.apiKey = apiKey || (typeof process !== 'undefined' ? process.env.GT_API_KEY : '');
        this.defaultLanguage = defaultLanguage;
        this.baseURL = baseURL;
    }

    // Prompt I18N
    translatePrompt = async (prompt, language) => {
        return await _translatePrompt({
            content: prompt, language: language, context: this
        });
    }

}

// ----- SECONDARY EXPORTS ----- //

export {
    _getLanguageCode as getLanguageCode,
    _getLanguageName as getLanguageName,
    _getModelList as getModelList,
    _getModelInfo as getModelInfo,
    _getModelLanguages as getModelLanguages,
    _isLanguageSupported as isLanguageSupported,
    _getModelsByDeveloper as getModelsByDeveloper,
    _getModelsByLanguage as getModelsByLanguage,
    _getUserLanguage as getUserLanguage
};