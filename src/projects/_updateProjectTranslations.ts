import { Content, Update } from '../types/types'
import defaultAPIRoutes from '../settings/defaultAPIRoutes';

/**
 * @internal
 */
export default async function _updateProjectTranslations(
    gt: { baseURL: string, apiKey: string },
    updates: Update[],
    locales: string[],
    options: Record<string, any>
): Promise<{ locales?: string[] }> {
    const response = await fetch(`${gt.baseURL}${defaultAPIRoutes.updateProjectTranslations}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'gtx-api-key': gt.apiKey,
        },
        body: JSON.stringify({
            updates, locales, options
        })
    });
    if (!response.ok) {
        throw new Error(`${response.status}: ${await response.text()}`);
    }
    const result = await response.json();
    return result as any;
}