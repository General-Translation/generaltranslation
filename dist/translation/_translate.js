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
exports.default = _translate;
/**
 * Translates a string.
 * @param {{ baseURL: string, apiKey: string }} gt - The translation service configuration.
 * @param {string} content - The content to translate.
 * @param {string} targetLanguage - The target language for the translation.
 * @param {{ notes?: string, [key: string]: any }} metadata - Additional metadata for the translation request.
 * @returns {Promise<{ translation: string, error?: Error | unknown }>} - The translated content with optional error information.
 */
/** @internal */
function _translate(gt, content, targetLanguage, metadata) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${gt.baseURL}/translate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'gtx-api-key': gt.apiKey,
                },
                body: JSON.stringify({
                    content, targetLanguage, metadata
                })
            });
            if (!response.ok) {
                throw new Error(`${response.status}: ${yield response.text()}`);
            }
            const result = yield response.json();
            return result;
        }
        catch (error) {
            console.error(error);
            return {
                translation: content,
                error: error
            };
        }
    });
}
