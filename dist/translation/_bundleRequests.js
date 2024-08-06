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
exports.default = _bundleRequests;
/**
 * Bundles multiple requests and sends them to the server.
 * @param gt - Contains the baseURL and apiKey for the server request.
 * @param requests - Array of requests to be processed and sent.
 * @returns A promise that resolves to an array of processed results.
 
*/
/** @internal */
function _bundleRequests(gt, requests) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Send the processed requests to the server as a bundled request.
            const response = yield fetch(`${gt.baseURL}/bundle`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'gtx-api-key': gt.apiKey,
                },
                body: JSON.stringify(requests)
            });
            // Check for response errors.
            if (!response.ok) {
                throw new Error(`${response.status}: ${yield response.text()}`);
            }
            const resultArray = yield response.json();
            return resultArray;
        }
        catch (error) {
            console.error(error);
            return Array.from(requests, () => ({ translation: null, error: error }));
        }
    });
}
