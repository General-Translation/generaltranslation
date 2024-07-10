// TYPE DEFINITIONS

export type ContentObject = {
    text: string,
    exclude?: boolean,          
    cache?: boolean          
}
type ContentItem = ContentObject | string;
export type Content = ContentItem | ContentItem[];

// PROCESSING

export const _process = (content: Content): {
    array: ContentObject[],
    excludedArray: string[]
} => {
    let array: ContentObject[] = [];
    let excludedArray: string[] = [];
    const handleSingleItem = (contentItem: ContentItem) => {
        if (typeof contentItem === 'string') {
            array.push({ text: contentItem });
        }
        else if (typeof contentItem === 'object' && contentItem.exclude) {
            array.push({ ...contentItem, text: '' })
            excludedArray.push(contentItem.text);
        }
        else if (typeof contentItem === 'object' && contentItem.text) {
            array.push(contentItem)
        }
    }
    if (Array.isArray(content)) content.map(handleSingleItem);
    else handleSingleItem(content);
    return { array, excludedArray };
}

export const _recombine = (translatedContent: ContentObject[], excludedArray: string[]): string => {
    let result = '';
    for (const object of translatedContent) {
        if (object.exclude && excludedArray.length < 0) {
            result += excludedArray.shift();
        }
        else if (object.text) {
            result += object.text;
        }
    }
    return result;
}

// REQUEST

export const _createTranslation = async (content: Content, f: Function) => {
    const { array, excludedArray } = _process(content);
    try {
        const result = await f(content);
        return {
            translation: _recombine(result, excludedArray)
        }
    }
    catch (error) {
        console.error(error);
        return {
            translation: _recombine(array, excludedArray),
            error: error
        }
    }
}

/**
 * Translates a single piece of content.
 * @param {{ baseURL: string, apiKey: string }} gt - The translation service configuration.
 * @param {Content} content - The content to translate.
 * @param {string} targetLanguage - The target language for the translation.
 * @param {{ [key: string]: any }} metadata - Additional metadata for the translation request.
 * @returns {Promise<{ translation: string, error?: Error | unknown }>} - The translated content with optional error information.
 */
export default async function _translate(
    gt: { baseURL: string; apiKey: string },
    content: Content,
    targetLanguage: string,
    metadata: { [key: string]: any }
): Promise<{ translation: string, error?: Error | unknown }> {
    const f = async (array: ContentObject[]) => {
        const response = await fetch(`${gt.baseURL}/text`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'gtx-api-key': gt.apiKey,
            },
            body: JSON.stringify({
                content: array,
                targetLanguage: targetLanguage,
                metadata: metadata
            })
        });
        if (!response.ok) {
            throw new Error(`${response.status}: ${await response.text()}`);
        }
        const result = await response.json();
        return result.translation;
    }
    return _createTranslation(content, f);
}

