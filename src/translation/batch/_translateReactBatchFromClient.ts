import { ContentTranslationResult, ReactTranslationResult, Request } from '../../types/types'
import { defaultBaseURL, maxTimeout } from '../../settings/settings';
import { _translateReactBatchFromClientURL } from 'src/settings/defaultURLs';

/**
 * Translates where a translation already exists in another language, used for updating websites with a new language in real-time.
 */
export async function _translateReactBatchFromClient(
    requests: Request[],
    baseURL: string = defaultBaseURL,
): Promise<Array<ReactTranslationResult | ContentTranslationResult>> {
    
    const controller = new AbortController();
    const signal = controller.signal;

    // timeout with the lowest request
    const timeout = Math.min(...requests.map(request => request?.data?.metadata?.timeout || maxTimeout))
    if (timeout) setTimeout(() => controller.abort(), timeout);

    const response = await fetch(`${baseURL}${_translateReactBatchFromClientURL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requests),
        signal
    });

    if (!response.ok) {
        throw new Error(`${response.status}: ${await response.text()}`);
    }

    const resultArray = await response.json();
    return resultArray as Array<ReactTranslationResult | ContentTranslationResult>;
}