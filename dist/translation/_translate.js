"use strict";
// TYPE DEFINITIONS
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
exports._createTranslation = exports._recombine = exports._process = void 0;
exports.default = _translate;
// PROCESSING
const _process = (content) => {
    let array = [];
    let excludedArray = [];
    const handleSingleItem = (contentItem) => {
        if (typeof contentItem === 'string') {
            array.push({ text: contentItem });
        }
        else if (typeof contentItem === 'object' && contentItem.exclude) {
            array.push(Object.assign(Object.assign({}, contentItem), { text: '' }));
            excludedArray.push(contentItem.text);
        }
        else if (typeof contentItem === 'object' && contentItem.text) {
            array.push(contentItem);
        }
    };
    if (Array.isArray(content))
        content.map(handleSingleItem);
    else
        handleSingleItem(content);
    return { array, excludedArray };
};
exports._process = _process;
const _recombine = (translatedContent, excludedArray) => {
    let result = '';
    for (const object of translatedContent) {
        if (object.exclude && excludedArray.length < 0) {
            result += excludedArray.shift();
        }
        else if (object.text) {
            result += object.text;
        }
    }
    return result;
};
exports._recombine = _recombine;
// REQUEST
const _createTranslation = (content, f) => __awaiter(void 0, void 0, void 0, function* () {
    const { array, excludedArray } = (0, exports._process)(content);
    try {
        const result = yield f(content);
        return {
            translation: (0, exports._recombine)(result, excludedArray)
        };
    }
    catch (error) {
        console.error(error);
        return {
            translation: (0, exports._recombine)(array, excludedArray),
            error: error
        };
    }
});
exports._createTranslation = _createTranslation;
/**
 * Translates a single piece of content.
 * @param {{ baseURL: string, apiKey: string }} gt - The translation service configuration.
 * @param {Content} content - The content to translate.
 * @param {string} targetLanguage - The target language for the translation.
 * @param {{ [key: string]: any }} metadata - Additional metadata for the translation request.
 * @returns {Promise<{ translation: string, error?: Error | unknown }>} - The translated content with optional error information.
 */
function _translate(gt, content, targetLanguage, metadata) {
    return __awaiter(this, void 0, void 0, function* () {
        const f = (array) => __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${gt.baseURL}/text`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'gtx-api-key': gt.apiKey,
                },
                body: JSON.stringify({
                    content: array,
                    targetLanguage: targetLanguage,
                    metadata: metadata
                })
            });
            if (!response.ok) {
                throw new Error(`${response.status}: ${yield response.text()}`);
            }
            const result = yield response.json();
            return result.translation;
        });
        return (0, exports._createTranslation)(content, f);
    });
}
