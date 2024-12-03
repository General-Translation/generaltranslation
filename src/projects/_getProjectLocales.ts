import defaultAPIRoutes from '../settings/defaultAPIRoutes';

/**
 * @internal
 */
export default async function _getProjectLocales(
    gt: { baseURL: string, apiKey: string },
    projectId: string
): Promise<{ locales: string[] }> {
    const response = await fetch(`${gt.baseURL}${defaultAPIRoutes.getProjectLocales}?projectId=${projectId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'gtx-api-key': gt.apiKey,
        }
    });
    if (!response.ok) {
        throw new Error(`${response.status}: ${await response.text()}`);
    }
    const result = await response.json() as any;
    return result;
}