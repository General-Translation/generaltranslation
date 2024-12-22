import { ContentTranslationResult, JsxTranslationResult, Request, TranslationError } from '../types'
import { defaultClientApiUrl, maxTimeout } from '../settings/settings';

/**
 * Translates where a translation already exists in another language, used for updating websites with a new language in real-time.
 */
export async function _translateBatchFromClient({
    requests,
    projectId,
    url = defaultClientApiUrl, 
    devApiKey
}: {
    requests: Request[],
    projectId: string,
    url?: string,
    devApiKey?: string
}): Promise<Array<
    JsxTranslationResult | ContentTranslationResult | TranslationError
>> {
    
    const controller = new AbortController();
    const signal = controller.signal;

    // timeout with the lowest request
    const timeout = Math.min(...requests.map(request => request?.data?.metadata?.timeout || maxTimeout), maxTimeout)
    if (timeout) setTimeout(() => controller.abort(), timeout);

    const response = await fetch(`${url}/${projectId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(devApiKey && { 'x-gt-dev-api-key': devApiKey })
        },
        body: JSON.stringify(requests),
        signal
    });

    if (!response.ok) {
        throw new Error(`${response.status}: ${await response.text()}`);
    }

    const resultArray = await response.json()
    return resultArray as Array<JsxTranslationResult | ContentTranslationResult | TranslationError>;
}