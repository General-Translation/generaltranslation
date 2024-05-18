const _translateHTML = async ({
    projectID,
    defaultLanguage,
    userLanguage,
    content,
    config
}) => {

    const apiKey = config?.apiKey;
    if (!apiKey) {
        throw new Error('Missing API Key!')
    };

    if (!projectID) {
        throw new Error('Missing project ID!')
    };

    try {
        const response = await fetch('https://html.gtx.dev', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'gtx-api-key': apiKey,
            },
            body: JSON.stringify({
                projectID: projectID,
                defaultLanguage: defaultLanguage,
                userLanguage: userLanguage,
                content: content
            })
        });
        if (!response.ok) {
            const result = await response.text();
            throw new Error(`${result || response.status}`);
        } else {
            const result = await response.json();
            return result;
        }
    } catch (error) {
        console.error(error);
        return {};
    }
    
}

module.exports = _translateHTML;
