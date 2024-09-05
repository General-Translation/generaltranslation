export type StringWithVariables = string | {
    variable?: string,
    key: string
} | Array<string | {
    variable?: string,
    key: string
}>

/**
 * Translates the given string into the target language using a specified API.
 * 
 * @param {{ baseURL: string, apiKey: string }} gt - An object containing baseURL and apiKey for the API.
 * @param {any} content - The string to be translated.
 * @param {string} targetLanguage - The target language code (e.g., 'en', 'fr') for the translation.
 * @param {{ [key: string]: any }} metadata - Additional metadata to be sent with the translation request.
 * 
 * @returns {Promise<{ translation: any | null, error?: Error | unknown }>} - A promise that resolves to the translated content as an object, or null if an error occurs.
 * 
 * @throws {Error} - Throws an error if the response from the API is not ok (status code not in the range 200-299).
 * @internal
**/
export default async function _translate(
    gt: { baseURL: string; apiKey: string },
    content: StringWithVariables,
    targetLanguage: string,
    metadata: { 
        notes?: string, 
        timeout?: number, 
        store?: boolean,
        projectID?: string,
        [key: string]: any
    }
): Promise<{ translation: StringWithVariables, error?: Error | unknown }> {
    
    const controller = new AbortController();
    const signal = controller.signal;
    if (metadata.timeout) {
        setTimeout(() => controller.abort(), metadata.timeout);
    }
    
    try {
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
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            console.error('Request timed out');
            return {
                translation: content,
                error: 'Request timed out'
            };
        }
        console.error(error);
        return {
            translation: content,
            error: error
        };
    }
}

