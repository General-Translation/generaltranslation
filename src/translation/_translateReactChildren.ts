/**
 * Translates the given content into the target language using a specified API.
 * 
 * @param {Object} gt - An object containing baseURL and apiKey for the API.
 * @param {JSON} content - The content to be translated. This can be of any type.
 * @param {string} targetLanguage - The target language code (e.g., 'en', 'fr') for the translation.
 * @param {Object} metadata - Additional metadata to be sent with the translation request.
 * 
 * @returns {Promise<any | null>} - A promise that resolves to the translated content as an object, or null if an error occurs.
 * 
 * @throws {Error} - Throws an error if the response from the API is not ok (status code not in the range 200-299).
 * @internal
**/
export default async function _translateReactChildren(
    gt: { baseURL: string, apiKey: string },
    content: any,
    targetLanguage: string,
    metadata: { [key: string]: any }
): Promise<{ translation: any | null, error?: Error | unknown }> {
    try {
        const response = await fetch(`${gt.baseURL}/react`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'gtx-api-key': gt.apiKey,
            },
            body: JSON.stringify({
                content: content,
                targetLanguage: targetLanguage,
                metadata: metadata
            })
        });
        if (!response.ok) {
            throw new Error(`${response.status}: ${await response.text()}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return {
            translation: null,
            error: error
        };
    }
}
