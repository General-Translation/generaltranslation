import { Content, ContentTranslationResult } from "src/types/types";

/**
 * @internal
**/
export default async function _translate(
    gt: { baseURL: string; apiKey: string },
    content: Content,
    targetLanguage: string,
    metadata: { [key: string]: any }
): Promise<ContentTranslationResult> {
    const controller = new AbortController();
    const signal = controller.signal;
    if (metadata.timeout) {
        setTimeout(() => controller.abort(), metadata.timeout);
    }
    const response = await fetch(`${gt.baseURL}/translate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'gtx-api-key': gt.apiKey,
        },
        body: JSON.stringify({
            content, targetLanguage, metadata
        }),
        signal
    });
    if (!response.ok) {
        throw new Error(`${response.status}: ${await response.text()}`);
    }
    const result = await response.json();
    return result;
}

