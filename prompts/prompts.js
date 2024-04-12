// ----- PROMPT INTERNATIONALIZATION ----- //

// Turn a prompt (which could be a string, array, or object) into a string
const _constructPrompt = (prompt, redacted = null) => {
    if (Array.isArray(prompt)) {
        let final = '';
        for (const item of prompt) {
            if (typeof item === 'string') final += item;
            else if (!item?.redacted) final += item?.text || '';
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
            } else if (!item?.redacted) {
                processed.push(item);
            } else {
                processed.push({text: '', redacted: true});
                redacted.push(item);
            }
        }
        return {
            processed: processed,
            redacted: redacted.length > 0 ? redacted : null
        }
    } else {
        if (typeof item === 'string') {
            processed.push({
                text: item
            });
        } else if (!item?.redacted) {
            processed.push(item);
        } else {
            processed.push({text: '', redacted: true});
            redacted.push(item);
        }
    } 
    return {
        processed: processed,
        redacted: redacted
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
    const result = await response.json();
    if (!response.ok) {
        throw new Error(`${result?.error || response.status}`);
    }
    return _constructPrompt(result, redacted);
}

module.exports = {
    _getPrompt
}