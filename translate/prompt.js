// ----- TRANSLATION ----- //

// Decides whether an item object should be translated
const _shouldTranslate = item => typeof item?.translate === 'boolean' ? item.translate : true;

// Pre-processes content to send to the API
// Separates out text that shouldn't be translated.
const _processPrompt = ({ content }) => {
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
const _constructPrompt = ({ content, untranslated = null}) => {
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
const _translatePrompt = async ({
    content, language, config
}) => {
    
    const apiKey = config?.apiKey;
    if (!apiKey) {
        throw new Error('Missing API Key!')
    };

    const defaultLanguage = config?.defaultLanguage;
    if (language === defaultLanguage) {
        return _constructPrompt({ content: content });
    };

    const { processed, untranslated } = _processPrompt({ content });
    
    try {
        const response = await fetch(`${config?.baseURL}/prompt`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'gtx-api-key': apiKey
            },
            body: JSON.stringify({
                content: processed,
                targetLanguage: language,
                defaultLanguage: defaultLanguage
            })
        })
        if (!response.ok) {
            const result = await response.text();
            throw new Error(`${result || response.status}`);
        } else {
            const result = await response.json();
            return _constructPrompt({content: result, untranslated: untranslated });
        }
    } catch (error) {
        console.error(error)
        return _constructPrompt({ content: content })
    }

}

export default _translatePrompt;