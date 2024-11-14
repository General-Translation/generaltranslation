import defaultAPIRoutes from '../settings/defaultAPIRoutes';

/**
 * @internal
 */
export default async function _getProjectLanguages(
    gt: { baseURL: string, apiKey: string },
    projectID: string
): Promise<string[]> {
    const response = await fetch(`${gt.baseURL}${defaultAPIRoutes.getProjectLanguages}?projectID=${projectID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'gtx-api-key': gt.apiKey,
        }
    });
    if (!response.ok) {
        throw new Error(`${response.status}: ${await response.text()}`);
    }
    const result = await response.json();
    return (result as { languages: string[] })?.languages;
}