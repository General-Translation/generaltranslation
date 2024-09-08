/**
 * Translates the given React children into the target language using a specified API.
 * 
 * @param {{ baseURL: string, apiKey: string }} gt - An object containing baseURL and apiKey for the API.
 * @param {any} children - The React children to be translated.
 * @param {string} targetLanguage - The target language code (e.g., 'en', 'fr') for the translation.
 * @param {{ [key: string]: any }} metadata - Additional metadata to be sent with the translation request.
 * 
 * @returns {Promise<{ translation: any | null, error?: Error | unknown }>} - A promise that resolves to the translated content as an object, or null if an error occurs.
 * 
 * @throws {Error} - Throws an error if the response from the API is not ok (status code not in the range 200-299).
 * @internal
**/
export default async function _translateReact(
    gt: { baseURL: string, apiKey: string },
    content: any,
    targetLanguage: string,
    metadata: { [key: string]: any }
): Promise<{ translation: any | null, error?: Error | unknown }> {
    const controller = new AbortController();
    const signal = controller.signal;

    if (metadata.timeout) {
        setTimeout(() => controller.abort(), metadata.timeout);
    }

    try {
        const response = await fetch(`${gt.baseURL}/react`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'gtx-api-key': gt.apiKey,
            },
            body: JSON.stringify({
                children: content,
                targetLanguage: targetLanguage,
                metadata: metadata
            }),
            signal
        });
        if (!response.ok) {
            throw new Error(`${response.status}: ${await response.text()}`);
        }
        return await response.json();
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error('Error: Request timed out.');
        }
        throw new Error(`${error}`);
    }
}