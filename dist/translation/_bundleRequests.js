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
 * @param {{ baseURL: string, apiKey: string }} gt - Contains the baseURL and apiKey for the server request.
 * @param {Request[]} requests - Array of requests to be processed and sent.
 * @param {{ timeout?: number }} options - Additional options for the request, including timeout.
 * @returns {Promise<Array<any | null>>} A promise that resolves to an array of processed results.
 * @internal
 */
function _bundleRequests(gt_1, requests_1) {
    return __awaiter(this, arguments, void 0, function* (gt, requests, options = {}) {
        const controller = new AbortController();
        const signal = controller.signal;
        if (options.timeout) {
            setTimeout(() => controller.abort(), options.timeout);
        }
        try {
            const response = yield fetch(`${gt.baseURL}/bundle`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'gtx-api-key': gt.apiKey,
                },
                body: JSON.stringify(requests),
                signal
            });
            if (!response.ok) {
                throw new Error(`${response.status}: ${yield response.text()}`);
            }
            const resultArray = yield response.json();
            return resultArray;
        }
        catch (error) {
            if (error instanceof Error && error.name === 'AbortError') {
                console.error('Request timed out');
                return Array.from(requests, () => ({ translation: null, error: 'Request timed out' }));
            }
            console.error(error);
            return Array.from(requests, () => ({ translation: null, error: error }));
        }
    });
}
