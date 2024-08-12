/**
    * Translates a single piece of content and caches for use in a public project.
    * @param {{ baseURL: string, apiKey: string }} gt - The translation service configuration.
    * @param {string} content - The content to translate.
    * @param {string} targetLanguage - The target language for the translation.
    * @param {string} projectID - The ID of the project
    * @param {{ dictionaryName?: string, notes?: string, timeout?: number, [key: string]: any }} metadata - Additional metadata for the translation request.
    * @returns {Promise<{ translation: string, error?: Error | unknown }>} - The translated content with optional error information.
    * @internal
*/
export default async function _translate(
    gt: { baseURL: string; apiKey: string },
    content: string,
    targetLanguage: string,
    projectID: string,
    metadata: { dictionaryName?: string, context?: string, timeout?: number, [key: string]: any }
): Promise<{ translation: string, error?: Error | unknown }> {
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
                content, targetLanguage, projectID, metadata
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