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
// also handles errors
const _combine = (contentArray, redactedArray) => {
    let result = '';
    const _handleItem = (contentItem) => {
        if (typeof contentItem === 'string')
            result += contentItem;
        else if ((contentItem === null || contentItem === void 0 ? void 0 : contentItem.text) && typeof contentItem.text === 'string')
            result += contentItem.text;
        else if ((contentItem === null || contentItem === void 0 ? void 0 : contentItem.exclude) && redactedArray && redactedArray.length > 0) {
            const redactedItem = redactedArray.shift();
            if (redactedItem && (redactedItem === null || redactedItem === void 0 ? void 0 : redactedItem.text)) {
                result += redactedItem.text;
            }
        }
    };
    contentArray.forEach(item => _handleItem(item));
    return result;
};
const _redact = (content) => {
    let contentArray = [];
    let redactedArray = [];
    const _handleItem = (contentItem) => {
        if (typeof contentItem === 'string')
            contentArray.push({
                text: contentItem
            });
        else {
            if (contentItem.exclude) {
                contentArray.push(Object.assign(Object.assign({}, contentItem), { text: '', exclude: true }));
                redactedArray.push(Object.assign({}, contentItem));
            }
            else {
                contentArray.push(contentItem);
            }
        }
    };
    if (Array.isArray(content))
        content.forEach(item => _handleItem(item));
    else
        _handleItem(content);
    return {
        contentArray, redactedArray
    };
};
function _translate(gt, content, targetLanguage, metadata) {
    return __awaiter(this, void 0, void 0, function* () {
        const { contentArray, redactedArray } = _redact(content);
        try {
            const response = yield fetch(`${gt.baseURL}/text`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'gtx-api-key': gt.apiKey,
                },
                body: JSON.stringify({
                    content: content,
                    targetLanguage: targetLanguage,
                    metadata: metadata
                })
            });
            if (!response.ok) {
                throw new Error(`${response.status}: ${yield response.text()}`);
            }
            const resultArray = yield response.json();
            return {
                translation: _combine(resultArray, redactedArray)
            };
        }
        catch (error) {
            console.error(error);
            return {
                translation: _combine(contentArray, redactedArray),
                error: error
            };
        }
    });
}
