import { Content, Update } from '../../types/types'

/**
 * @internal
 */
export default async function _updateProjectDictionary(
    gt: { baseURL: string, apiKey: string },
    updates: Update[],
    languages: string[],
    replace: boolean
): Promise<string[]> {
    const response = await fetch(`${gt.baseURL}/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'gtx-api-key': gt.apiKey,
        },
        body: JSON.stringify({
            updates, languages, replace
        })
    });
    if (!response.ok) {
        throw new Error(`${response.status}: ${await response.text()}`);
    }
    const result = await response.json();
    return (result as { languages: string[] })?.languages;
}