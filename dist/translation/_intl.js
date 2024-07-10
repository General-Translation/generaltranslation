"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = _intl;
const _translate_1 = require("./_translate");
/**
   * Translates a single piece of content and caches for use in a public project.
   * @param {{ baseURL: string, apiKey: string }} gt - The translation service configuration.
   * @param {Content} content - The content to translate.
   * @param {string} targetLanguage - The target language for the translation.
   * @param {string} projectID - The ID of the project
   * @param {{ [key: string]: any }} metadata - Additional metadata for the translation request.
   * @returns {Promise<{ translation: string, error?: Error | unknown }>} - The translated content with optional error information.
*/
function _intl(gt, content, targetLanguage, projectID, metadata) {
    return __awaiter(this, void 0, void 0, function* () {
        const f = (array) => __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${gt.baseURL}/intl`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'gtx-api-key': gt.apiKey,
                },
                body: JSON.stringify({
                    content: array,
                    targetLanguage: targetLanguage,
                    projectID: projectID,
                    metadata: metadata
                })
            });
            if (!response.ok) {
                throw new Error(`${response.status}: ${yield response.text()}`);
            }
            const result = yield response.json();
            return result.translation;
        });
        return (0, _translate_1._createTranslation)(content, f);
    });
}
