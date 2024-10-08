import { ContentTranslationResult, ReactTranslationResult, Request } from '../../types/types'

/**
 * @internal
 */
export default async function _translateBundle(
    gt: { baseURL: string, apiKey: string },
    requests: Request[]
): Promise<Array<ReactTranslationResult | ContentTranslationResult>> {
    const controller = new AbortController();
    const signal = controller.signal;
    if (requests[0]?.data?.metadata?.timeout) {
        setTimeout(() => controller.abort(), requests[0].data.metadata.timeout);
    }
    const response = await fetch(`${gt.baseURL}/bundle`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'gtx-api-key': gt.apiKey,
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