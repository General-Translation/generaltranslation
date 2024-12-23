import { ContentTranslationResult, JsxTranslationResult, Request, TranslationError } from '../types'
import { maxTimeout } from '../settings/settings';
import { defaultClientApiUrl } from '../settings/settingsUrls';

/**
 * Translates where a translation already exists in another language, used for updating websites with a new language in real-time.
 */
export async function _translateFromClient({
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

    let response;
    try {
        response = await fetch(`${url}/${projectId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(devApiKey && { 'x-gt-dev-api-key': devApiKey })
            },
            body: JSON.stringify(requests),
            signal
        });
    } catch (error: any) {
        if (error?.name === 'AbortError') {
            throw new Error('Translation request timed out. This has either occured due to the translation of an unusually large request or a translation failure in the API.');
        }
        throw error;
    }

    if (!response.ok) {
        throw new Error(`${response.status}: ${await response.text()}`);
    }

    const resultArray = await response.json()
    return resultArray as Array<JsxTranslationResult | ContentTranslationResult | TranslationError>;
}