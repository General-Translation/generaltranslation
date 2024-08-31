var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default function _updateRemoteDictionary(gt, updates, languages, projectID, replace) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${gt.baseURL}/update`, {
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
                throw new Error(`${response.status}: ${yield response.text()}`);
            }
            const result = yield response.json();
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
    });
}
