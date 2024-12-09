import { Content, ContentTranslationResult } from "src/types/types";
import { maxTimeout } from "../../settings/settings";
import { translateContentURL } from "src/settings/defaultURLs";

/**
 * @internal
**/
export default async function _translate(
    gt: { baseURL: string; apiKey: string },
    content: Content,
    targetLocale: string,
    metadata: { [key: string]: any }
): Promise<ContentTranslationResult> {
    const controller = new AbortController();
    const signal = controller.signal;
    
    const timeout = metadata?.timeout || maxTimeout;
    if (timeout) setTimeout(() => controller.abort(), timeout);

    const response = await fetch(`${gt.baseURL}${translateContentURL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'gtx-api-key': gt.apiKey,
        },
        body: JSON.stringify({
            content, targetLocale, metadata
        }),
        signal
    });
    if (!response.ok) {
        throw new Error(`${response.status}: ${await response.text()}`);
    }
    const result = await response.json();
    return result as ContentTranslationResult;
}

