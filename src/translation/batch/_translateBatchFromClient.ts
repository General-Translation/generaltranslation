import { ContentTranslationResult, JsxTranslationResult, Request, TranslationError } from '../../types'
import { maxTimeout } from '../../settings/settings';
import { _translateJsxBatchFromClientUrl } from 'src/settings/defaultURLs';

/**
 * Translates where a translation already exists in another language, used for updating websites with a new language in real-time.
 */
export async function _translateBatchFromClient(
    gt: { baseUrl: string, devApiKey?: string },
    requests: Request[],
): Promise<Array<
    JsxTranslationResult | ContentTranslationResult | TranslationError
>> {
    
    const controller = new AbortController();
    const signal = controller.signal;

    // timeout with the lowest request
    const timeout = Math.min(...requests.map(request => request?.data?.metadata?.timeout || maxTimeout))
    if (timeout) setTimeout(() => controller.abort(), timeout);

    const response = await fetch(`${gt.baseUrl}${_translateJsxBatchFromClientUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(gt.devApiKey && { 'x-gt-dev-api-key': gt.devApiKey })
        },
        body: JSON.stringify(requests),
        signal
    });

    if (!response.ok) {
        throw new Error(`${response.status}: ${await response.text()}`);
    }

    const resultArray = await response.json();
    return resultArray as Array<JsxTranslationResult | ContentTranslationResult | TranslationError>;
}