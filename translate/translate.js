// ----- TRANSLATION ----- //

// Decides whether an item object should be translated
const _shouldTranslate = item => typeof item?.translate === 'boolean' ? item.translate : true;

// Pre-processes content to send to the API
// Separates out text that shouldn't be translated.
const _processContent = (content) => {
    const processed = [];
    const redacted = [];
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
                redacted.push(item);
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
            redacted.push(content);
        }
    } 
    return {
        processed: processed,
        redacted: redacted.length > 0 ? redacted : null
    }
}

// Build content string from array or single item
const _constructContent = ({translated, redacted = null}) => {
    if (Array.isArray(translated)) {
        let final = '';
        for (const item of translated) {
            if (typeof item === 'string') final += item;
            else if (_shouldTranslate(item)) final += item?.text || '';
            else {
                if (redacted?.length > 0) {
                    final += redacted?.shift().text || '';
                } else {
                    final += item?.text || '';
                }
            }
        }
        return final;
    } else if (typeof translated === 'string') {
        return translated;
    } else {
        return translated?.text || '';
    }
}

// Get a translation via General Translation API
// Returns string
const _translate = async (content, code, defaultLanguage, apiKey) => {
    try {
        if (!apiKey) {
            throw new Error('Missing API Key!')
        }
        if (code === defaultLanguage) {
            return _constructContent(content);
        }
        const { processed, redacted } = _processContent(content);
        const response = await fetch('http://localhost:8787', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'gtx-api-key': apiKey
            },
            body: JSON.stringify({
                content: processed,
                targetLanguage: code,
                defaultLanguage: defaultLanguage
            })
        })
        if (!response.ok) {
            const result = await response.text();
            throw new Error(`${result || response.status}`);
        } else {
            const result = await response.json();
            return _constructContent({translated: result, redacted: redacted});
        }
    } catch (error) {
        console.error(error)
        return _constructContent({ translated: content })
    }
}

module.exports = {
    _translate
}