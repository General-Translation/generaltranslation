// Define the Request type to specify the expected structure of input requests.
type Request = {
    type: 'translate' | 'intl' | 'react';
    data: any;
};

/**
 * Bundles multiple requests and sends them to the server.
 * @param {{ baseURL: string, apiKey: string }} gt - Contains the baseURL and apiKey for the server request.
 * @param {Request[]} requests - Array of requests to be processed and sent.
 * @param {{ timeout?: number }} options - Additional options for the request, including timeout.
 * @returns {Promise<Array<any | null>>} A promise that resolves to an array of processed results.
 * @internal
 */
export default async function _bundleRequests(
    gt: { baseURL: string, apiKey: string },
    requests: Request[],
    options: { timeout?: number } = {}
): Promise<Array<any | null>> {
    const controller = new AbortController();
    const signal = controller.signal;

    if (options.timeout) {
        setTimeout(() => controller.abort(), options.timeout);
    }

    try {
        const response = await fetch(`${gt.baseURL}/bundle`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'gtx-api-key': gt.apiKey,
            },
            body: JSON.stringify(requests),
            signal
        });
        if (!response.ok) {
            throw new Error(`${response.status}: ${await response.text()}`);
        }
        const resultArray = await response.json();
        return resultArray;
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            console.error('Request timed out');
            return Array.from(requests, () => ({ translation: null, error: 'Request timed out' }));
        }
        console.error(error);
        return Array.from(requests, () => ({ translation: null, error: error }));
    }
}