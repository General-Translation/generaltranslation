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
const _redactPrompt = (prompt) => {
    if (Array.isArray(prompt)) {
        const processed = [];
        const redacted = [];
        for (const item of prompt) {
            if (typeof item === 'string' || !item?.redacted) {
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
    } 
    return {
        processed: prompt
    };
}

const _getPrompt = async (prompt, language, defaultLanguage, apiKey) => {
    if (!apiKey) {
        throw new Error('Missing API Key!')
    }
    if (language === defaultLanguage) {
        return _constructPrompt(prompt);
    }
    const { processed, redacted } = _redactPrompt(prompt);
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
        const result = await response.json();
        throw new Error(`${result?.error || response.status}`);
    }
    const result = Array.isArray(prompt) ? await response.json() : await response.text();
    return _constructPrompt(result, redacted);
}

module.exports = {
    _getPrompt
}