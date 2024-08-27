export type Update = {
    type: 'react';
    data: {
        children: object | string,
        targetLanguages?: string[];
        metadata: Record<string, any>
    };
} | {
    type: 'intl';
    data: {
        content: string,
        targetLanguages?: string[];
        metadata: Record<string, any>
    };
}

/**
 * Pushes updates to a remotely cached translation dictionary.
 * @param {{ baseURL: string, apiKey: string }} gt - Contains the baseURL and apiKey for the server request.
 * @param {Update[]} updates - Array of requests to be processed and sent.
 * @returns {Promise<boolean>} A promise that resolves to an array of processed results.
 * @internal
 */
export default async function _updateRemoteDictionary(
    gt: { baseURL: string, apiKey: string },
    updates: Update[],
    projectID: string,
    replace: boolean
): Promise<string[]> {

    try {
        const response = await fetch(`${gt.baseURL}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'gtx-api-key': gt.apiKey,
            },
            body: JSON.stringify({
                updates, projectID, replace
            })
        });
        if (!response.ok) {
            throw new Error(`${response.status}: ${await response.text()}`);
        }
        const result = await response.json();
        return result.languages;
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            console.error('Request timed out');
            return [];
        }
        console.error(error);
        return [];
    }
}