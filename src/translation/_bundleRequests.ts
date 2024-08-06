// Define the Request type to specify the expected structure of input requests.
type Request = {
    type: 'translate' | 'intl' | 'react';
    data: any;
};

/**
 * Bundles multiple requests and sends them to the server.
 * @param gt - Contains the baseURL and apiKey for the server request.
 * @param requests - Array of requests to be processed and sent.
 * @returns A promise that resolves to an array of processed results.
 * @internal
*/
export default async function _bundleRequests(
    gt: { baseURL: string, apiKey: string },
    requests: Request[]
): Promise<Array<any | null>> {
    try {
        // Send the processed requests to the server as a bundled request.
        const response = await fetch(`${gt.baseURL}/bundle`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'gtx-api-key': gt.apiKey,
            },
            body: JSON.stringify(requests)
        });
        // Check for response errors.
        if (!response.ok) {
            throw new Error(`${response.status}: ${await response.text()}`);
        }
        const resultArray = await response.json();
        return resultArray;
    } catch (error) {
        console.error(error);
        return Array.from(requests, () => ({ translation: null, error: error }));
    }
}
