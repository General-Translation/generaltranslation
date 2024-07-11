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
const _translate_1 = require("./_translate");
/**
 * Preprocesses the request based on its type.
 * For 'intl' and 'translate' types, it processes the content and extracts arrays for further use.
 * @param request - The request to be processed.
 * @returns An object containing the processed request and any additional data.
 */
const _preprocess = (request) => {
    const { type, data } = request;
    let processedData = data;
    let additional = {};
    if (type === 'intl' || type === 'translate') {
        const { array, excludedArray } = (0, _translate_1._process)(data.content);
        processedData.content = array;
        additional.excludedArray = excludedArray;
        additional.type = type;
    }
    if (Object.keys(additional).length > 0) {
        return {
            processed: {
                type: type,
                data: processedData
            },
            additional: additional
        };
    }
    return { processed: { type: type, data: processedData } };
};
/**
 * Postprocesses the result based on additional data.
 * If the type is 'translate' or 'intl', it recombines the excluded array with the translation.
 * If there is an error, it attaches the error to the result.
 * @param result - The result to be postprocessed.
 * @param additional - Additional data from preprocessing.
 * @returns The postprocessed result.
 */
const _postprocess = (result, additional) => {
    if ((additional === null || additional === void 0 ? void 0 : additional.type) === "translate" || (additional === null || additional === void 0 ? void 0 : additional.type) === "intl") {
        if (additional === null || additional === void 0 ? void 0 : additional.excludedArray) {
            result.translation = (0, _translate_1._recombine)(result.translation, additional.excludedArray);
        }
    }
    if (additional === null || additional === void 0 ? void 0 : additional.error) {
        if (!additional)
            return null;
        result.error = additional.error;
    }
    return result;
};
/**
 * Bundles multiple requests and sends them to the server.
 * @param gt - Contains the baseURL and apiKey for the server request.
 * @param requests - Array of requests to be processed and sent.
 * @returns A promise that resolves to an array of processed results.
 */
function _bundleRequests(gt, requests) {
    return __awaiter(this, void 0, void 0, function* () {
        let processedArray = [];
        let additionalArray = [];
        // Preprocess each request and store the processed request and additional data.
        requests.forEach(request => {
            const { processed, additional } = _preprocess(request);
            processedArray.push(processed);
            additionalArray.push(additional || {});
        });
        try {
            // Send the processed requests to the server as a bundled request.
            const response = yield fetch(`${gt.baseURL}/bundle`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'gtx-api-key': gt.apiKey,
                },
                body: JSON.stringify(processedArray)
            });
            // Check for response errors.
            if (!response.ok) {
                throw new Error(`${response.status}: ${yield response.text()}`);
            }
            // Parse the response and postprocess each result.
            const resultArray = yield response.json();
            return resultArray.map((item, index) => _postprocess(item, additionalArray[index]));
        }
        catch (error) {
            console.error(error);
            // If there is an error, postprocess each request with the error information.
            return processedArray.map((item, index) => _postprocess(item, Object.assign({ error: error }, additionalArray[index])));
        }
    });
}
