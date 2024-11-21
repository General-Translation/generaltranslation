import { ReactChildrenAsObject, ReactTranslationResult } from "src/types/types";
import defaultAPIRoutes from "../../settings/defaultAPIRoutes";

/**
 * @internal
**/
export default async function _translateReact(
    gt: { baseURL: string, apiKey: string },
    content: ReactChildrenAsObject,
    targetLocale: string,
    metadata: { [key: string]: any }
): Promise<ReactTranslationResult> {
    const controller = new AbortController();
    const signal = controller.signal;
    if (metadata.timeout) {
        setTimeout(() => controller.abort(), metadata.timeout);
    }
    const response = await fetch(`${gt.baseURL}${defaultAPIRoutes.translateReact}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'gtx-api-key': gt.apiKey,
        },
        body: JSON.stringify({
            children: content,
            targetLocale,
            metadata: metadata
        }),
        signal
    });
    if (!response.ok) {
        throw new Error(`${response.status}: ${await response.text()}`);
    }
    return await response.json() as ReactTranslationResult;
}