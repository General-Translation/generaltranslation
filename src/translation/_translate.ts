type ContentObject = {
    text: string,
    exclude?: boolean,
    cache?: boolean,
    label?: string
};
type ContentItem = string | ContentObject;
export type Content = ContentItem | ContentItem[];

// also handles errors
const _combine = (contentArray: ContentItem[], redactedArray?: ContentObject[]): string => {
    let result = '';
    const _handleItem = (contentItem: ContentItem) => {
        if (typeof contentItem === 'string') result += contentItem;
        else if (contentItem?.text && typeof contentItem.text === 'string') result += contentItem.text;
        else if (contentItem?.exclude && redactedArray && redactedArray.length > 0) {
            const redactedItem = redactedArray.shift();
            if (redactedItem && redactedItem?.text) {
                result += redactedItem.text;
            }
        }
    }
    contentArray.forEach(item => _handleItem(item));
    return result;
}

const _redact = (content: Content): { contentArray: ContentObject[], redactedArray: ContentObject[] } => {
    
    let contentArray: ContentObject[] = [];
    let redactedArray: ContentObject[] = [];

    const _handleItem = (contentItem: ContentItem) => {
        if (typeof contentItem === 'string') contentArray.push({
            text: contentItem
        });
        else {
            if (contentItem.exclude) {
                contentArray.push({ ...contentItem, text: '', exclude: true })
                redactedArray.push(contentItem)
            }
            else {
                contentArray.push(contentItem)
            }
        }
    }

    if (Array.isArray(content)) content.forEach(item => _handleItem(item))
    else _handleItem(content);

    return {
        contentArray, redactedArray
    }

}

export async function _translateMany(
    gt: { baseURL: string; apiKey: string },
    array: Content[],
    targetLanguage: string,
    metadata: { [key: string]: any }
) {

    const processed = array.map(_redact);

    try {
        const response = await fetch(`${gt.baseURL}/text`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'gtx-api-key': gt.apiKey,
            },
            body: JSON.stringify({
                contentArray: processed.map(item => item.contentArray),
                targetLanguage: targetLanguage,
                metadata: metadata
            })
        });
        if (!response.ok) {
            throw new Error(`${response.status}: ${await response.text()}`);
        }
        const resultArray = await response.json();
        let finalArray = [];
        for (const [index, item] of resultArray.entries()) {
            finalArray.push({
                translation: _combine(item.translation, processed[index].redactedArray)
            })
        }
        return finalArray;
    } catch (error) {
        console.error(error);
        return processed.map(item => ({
            translation: _combine(item.contentArray, item.redactedArray),
            error: error
        }));
    }
    
}

export default async function _translate(
    gt: { baseURL: string; apiKey: string },
    content: Content,
    targetLanguage: string,
    metadata: { [key: string]: any }
): Promise<{ translation: string, error?: Error | unknown }> {

    const finalArray = await _translateMany(gt, [content], targetLanguage, metadata);
    return finalArray[0];
    
}