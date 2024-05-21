// ----- TRANSLATION ----- //

// Decides whether an item object should be translated
const _shouldTranslate = item => typeof item?.translate === 'boolean' ? item.translate : true;

// Pre-processes content to send to the API
// Separates out text that shouldn't be translated.
const _processContent = ({ content }) => {
    const processed = [];
    const untranslated = [];
    if (Array.isArray(content)) {
        for (const item of content) {
            if (typeof item === 'string') {
                processed.push({
                    text: item
                });
            } else if (_shouldTranslate(item)) {
                processed.push(item);
            } else {
                processed.push({text: '', translate: false});
                untranslated.push(item);
            }
        }
    } else {
        if (typeof content === 'string') {
            processed.push({
                text: content
            });
        } else if (_shouldTranslate(content)) {
            processed.push(content);
        } else {
            processed.push({text: '', translate: false});
            untranslated.push(content);
        }
    } 
    return {
        processed: processed,
        untranslated: untranslated.length > 0 ? untranslated : null
    }
}

// Build content string from array or single item
const _constructContent = ({ content, untranslated = null}) => {
    if (Array.isArray(content)) {
        let final = '';
        for (const item of content) {
            if (typeof item === 'string') final += item;
            else if (_shouldTranslate(item)) final += item?.text || '';
            else {
                if (untranslated?.length > 0) {
                    final += untranslated?.shift().text || '';
                } else {
                    final += item?.text || '';
                }
            }
        }
        return final;
    } else if (typeof content === 'string') {
        return content;
    } else {
        return content?.text || '';
    }
}

// Get a translation via General Translation API
// Returns string
const _translate = async ({
    content, language, config, ...options
}) => {
    
    const apiKey = config?.apiKey;
    if (!apiKey) {
        throw new Error('Missing API Key!')
    };

    const defaultLanguage = config?.defaultLanguage;
    if (language === defaultLanguage) {
        return _constructContent({ content: content });
    };

    const { processed, untranslated } = _processContent({ content });
    
    try {
        const response = await fetch(`${config?.baseURL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'gtx-api-key': apiKey,
            },
            body: JSON.stringify({
                content: processed,
                targetLanguage: language,
                defaultLanguage: defaultLanguage,
                options: { ...options }
            })
        })
        if (!response.ok) {
            const result = await response.text();
            throw new Error(`${result || response.status}`);
        } else {
            const result = await response.json();
            return _constructContent({content: result, untranslated: untranslated });
        }
    } catch (error) {
        console.error(error)
        return _constructContent({ content: content })
    }

}

const constructAll = (contentArray) => {
    const returnArray = [];
    for (const item of contentArray) {
        returnArray.push(_constructContent({ content: item }))
    }
    return returnArray;
}

// Get a translation of multiple strings via General Translation API
// Returns array of strings
const _translateMany = async ({
    requestArray, config
}) => {
    
    const apiKey = config?.apiKey;
    if (!apiKey) {
        throw new Error('Missing API Key!')
    };

    const processedRequests = [];
    const untranslatedArray = [];

    for (const item of requestArray) {
        const { processed, untranslated } = _processContent({ content: item?.content });
        processedRequests.push({ content: processed, language: item.language, options: { ...item.options } });
        untranslatedArray.push(untranslated);
    };
    
    try {
        const response = await fetch(`${config?.baseURL}/many`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'gtx-api-key': apiKey,
            },
            body: JSON.stringify({
                processedRequests: processedRequests,
                targetLanguage: language,
                defaultLanguage: defaultLanguage,
                options: { ...options }
            })
        })
        if (!response.ok) {
            const result = await response.text();
            throw new Error(`${result || response.status}`);
        } else {
            const result = await response.json();
            if (!Array.isArray(result)) {
                throw new Error(`${result || response.status}`);
            }
            const returnArray = []
            for (const [index, item] of result.entries()) {
                returnArray.push(_constructContent({content: item, untranslated: untranslatedArray[index] }));
            }
            return returnArray;
        }
    } catch (error) {
        console.error(error)
        return constructAll(requestArray.map(item => item.content));
    }

}

module.exports = { _translate, _translateMany };
