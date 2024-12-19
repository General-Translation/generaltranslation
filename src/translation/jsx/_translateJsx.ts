import { JsxChildren, JsxTranslationResult, TranslationError } from "src/types";
import { maxTimeout } from "../../settings/settings";
import { translateJsxUrl } from "../../settings/defaultURLs";

/**
 * @internal
**/
export default async function _translateJsx(
    gt: { baseUrl: string; apiKey?: string, devApiKey?: string },
    source: JsxChildren,
    targetLocale: string,
    metadata: { [key: string]: any }
): Promise<JsxTranslationResult | TranslationError> {
    const controller = new AbortController();
    const signal = controller.signal;

    const timeout = metadata?.timeout || maxTimeout;
    if (timeout) setTimeout(() => controller.abort(), timeout);
    let response;
    try {
        response = await fetch(`${gt.baseUrl}${translateJsxUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(gt.apiKey && { 'x-gt-api-key': gt.apiKey }),
                ...(gt.devApiKey && { 'x-gt-dev-api-key': gt.devApiKey })
            },
            body: JSON.stringify({
                source, targetLocale, metadata
            }),
            signal
        });
    } catch (error: any) {
        if (error?.name === 'AbortError') {
            console.error('Translation request timed out');
            return { error: 'Translation request timed out', code: 408 };
        }
        throw error;
    }

    if (!response.ok) {
        throw new Error(`${response.status}: ${await response.text()}`);
    }
    return await response.json() as JsxTranslationResult | TranslationError;
}