// ----- PROMPT INTERNATIONALIZATION ----- //

// Turn a prompt (which could be a string, array, or object) into a string
const _constructPrompt = (prompt, redacted = null) => {
    if (Array.isArray(prompt)) {
        let final = '';
        for (const item of prompt) {
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
    } else if (typeof prompt === 'string') {
        return prompt;
    } else {
        return prompt?.text || '';
    }
}

const _shouldTranslate = item => typeof item?.translate === 'boolean' ? item.translate : true;
// Redacted items are not sent in the API call
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