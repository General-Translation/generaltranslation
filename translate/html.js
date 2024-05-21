const _translateHTML = async ({
    page,
    userLanguage,
    defaultLanguage,
    content,
    config,
    ...metadata
}) => {

    const apiKey = config?.apiKey;
    if (!apiKey) {
        throw new Error('Missing API Key!')
    };

    const projectID = config?.projectID;
    if (!projectID) {
        throw new Error('Missing Project ID!')
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
                page: page,
                userLanguage: userLanguage,
                defaultLanguage: defaultLanguage,
                content: content,
                metadata: { ...metadata }
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
