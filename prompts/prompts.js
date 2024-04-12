// ----- PROMPT INTERNATIONALIZATION ----- //

// Decides whether a prompt object should be translated
const _shouldTranslate = item => typeof item?.translate === 'boolean' ? item.translate : true;

// Pre-processes prompt to send to the API
// Separates out text that shouldn't be translated.
const _processPrompt = (prompt) => {
    const processed = [];
    const redacted = [];
    if (Array.isArray(prompt)) {
        for (const item of prompt) {
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
        return {
            processed: processed,
            redacted: redacted.length > 0 ? redacted : null
        }
    } else {
        if (typeof prompt === 'string') {
            processed.push({
                text: prompt
            });
        } else if (_shouldTranslate(prompt)) {
            processed.push(prompt);
        } else {
            processed.push({text: '', translate: false});
            redacted.push(prompt);
        }
    } 
    return {
        processed: processed,
        redacted: redacted.length > 0 ? redacted : null
    }
}

// Build prompt string from array or single item
const _constructPrompt = (translated, redacted = null) => {
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

// Get a translated prompt via General Translation API
// Returns prompt string
const _getPrompt = async (prompt, language, defaultLanguage, apiKey) => {
    if (!apiKey) {
        throw new Error('Missing API Key!')
    }
    if (language === defaultLanguage) {
        return _constructPrompt(prompt);
    }
    const { processed, redacted } = _processPrompt(prompt);
    const response = await fetch('https://api.gtx.dev/prompt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'gtx-api-key': apiKey
        },
        body: JSON.stringify({
            prompt: processed,
            language: language,
            defaultLanguage: defaultLanguage
        })
    })
    if (!response.ok) {
        const result = await response.text();
        throw new Error(`${result || response.status}`);
    } else {
        const result = await response.json();
        return _constructPrompt(result, redacted);
    }
}

module.exports = {
    _getPrompt
}