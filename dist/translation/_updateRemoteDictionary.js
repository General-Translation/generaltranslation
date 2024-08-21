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
exports.default = _updateRemoteDictionary;
/**
 * Pushes updates to a remotely cached translation dictionary.
 * @param {{ baseURL: string, apiKey: string }} gt - Contains the baseURL and apiKey for the server request.
 * @param {Update[]} updates - Array of requests to be processed and sent.
 * @returns {Promise<boolean>} A promise that resolves to an array of processed results.
 * @internal
 */
function _updateRemoteDictionary(gt, updates) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${gt.baseURL}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'gtx-api-key': gt.apiKey,
                },
                body: JSON.stringify(updates)
            });
            if (!response.ok) {
                throw new Error(`${response.status}: ${yield response.text()}`);
            }
            const result = yield response.json();
            return result.success;
        }
        catch (error) {
            if (error instanceof Error && error.name === 'AbortError') {
                console.error('Request timed out');
                return false;
            }
            console.error(error);
            return false;
        }
    });
}
