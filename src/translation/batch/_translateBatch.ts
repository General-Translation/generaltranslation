import { ContentTranslationResult, JsxTranslationResult, Request } from '../../types'
import { translateBatchUrl } from '../../settings/defaultURLs';
import { maxTimeout } from '../../settings/settings';

/**
 * @internal
 */
export default async function _translateBatch(
    gt: { baseUrl: string, apiKey?: string, devApiKey?: string },
    requests: Request[]
): Promise<Array<JsxTranslationResult | ContentTranslationResult>> {

    const controller = new AbortController();
    const signal = controller.signal;

    // timeout with the lowest request
    const timeout = Math.min(...requests.map(request => request?.data?.metadata?.timeout || maxTimeout))
    if (timeout) setTimeout(() => controller.abort(), timeout);

    const response = await fetch(`${gt.baseUrl}${translateBatchUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(gt.apiKey && { 'x-gt-api-key': gt.apiKey }),
            ...(gt.devApiKey && { 'x-gt-dev-api-key': gt.devApiKey })
        },
        body: JSON.stringify(requests),
        signal
    });

    if (!response.ok) {
        throw new Error(`${response.status}: ${await response.text()}`);
    }

    const resultArray = await response.json();
    return resultArray as Array<JsxTranslationResult | ContentTranslationResult>;
}