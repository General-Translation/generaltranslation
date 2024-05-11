const _createI18N = async ({
    projectID,
    html,
    strings,
    defaultLanguage,
    userLanguage,
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
        const response = await fetch(`${config?.baseURL}/site`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'gtx-api-key': apiKey
            },
            body: JSON.stringify({
                projectID: projectID,
                html: html,
                strings: strings,
                defaultLanguage: defaultLanguage,
                userLanguage: userLanguage
            })
        })
        if (!response.ok) {
            const result = await response.text();
            throw new Error(`${result || response.status}`);
        } else {
            const result = await response.json();
            return result;
        }
    } catch (error) {
        console.error(error)
        return content;
    }
    
}
export default _createI18N;