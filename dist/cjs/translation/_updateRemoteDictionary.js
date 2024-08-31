"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = _updateRemoteDictionary;
async function _updateRemoteDictionary(gt, updates, languages, projectID, replace) {
    try {
        const response = await fetch(`${gt.baseURL}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'gtx-api-key': gt.apiKey,
            },
            body: JSON.stringify({
                updates, languages, projectID, replace
            })
        });
        if (!response.ok) {
            throw new Error(`${response.status}: ${await response.text()}`);
        }
        const result = await response.json();
        return result.languages;
    }
    catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            console.error('Request timed out');
            return [];
        }
        console.error(error);
        return [];
    }
}
