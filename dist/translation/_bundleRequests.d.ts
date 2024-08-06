type Request = {
    type: 'translate' | 'intl' | 'react';
    data: any;
};
/**
 * Bundles multiple requests and sends them to the server.
 * @param gt - Contains the baseURL and apiKey for the server request.
 * @param requests - Array of requests to be processed and sent.
 * @returns A promise that resolves to an array of processed results.
 */
export default function _bundleRequests(gt: {
    baseURL: string;
    apiKey: string;
}, requests: Request[]): Promise<Array<any | null>>;
export {};
