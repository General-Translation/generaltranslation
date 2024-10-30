import { Content, Update } from '../types/types'
import defaultAPIRoutes from '../settings/defaultAPIRoutes';

/**
 * @internal
 */
export default async function _updateDictionary(
    gt: { baseURL: string, apiKey: string },
    updates: Update[],
    languages: string[],
    options: Record<string, any>
): Promise<string[]> {
    const response = await fetch(`${gt.baseURL}${defaultAPIRoutes.updateDictionary}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'gtx-api-key': gt.apiKey,
        },
        body: JSON.stringify({
            updates, languages, options
        })
    });
    if (!response.ok) {
        throw new Error(`${response.status}: ${await response.text()}`);
    }
    const result = await response.json();
    return (result as { languages: string[] })?.languages;
}