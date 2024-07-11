import { _recombine as recombineTranslationContent, _process as processTranslationContent } from "./_translate";

// Define the Request type to specify the expected structure of input requests.
type Request = {
    type: 'translate' | 'intl' | 'react';
    data: any;
};

// Define the Additional type to manage additional data generated during preprocessing.
type Additional = {
    excludedArray?: any[];
    type?: string;
    error?: any;
};

/**
 * Preprocesses the request based on its type.
 * For 'intl' and 'translate' types, it processes the content and extracts arrays for further use.
 * @param request - The request to be processed.
 * @returns An object containing the processed request and any additional data.
 */
const _preprocess = (request: Request): { processed: Request; additional?: Additional } => {
    const { type, data } = request;
    let processedData: any = data;
    let additional: Additional = {};

    if (type === 'intl' || type === 'translate') {
        const { array, excludedArray } = processTranslationContent(data.content);
        processedData.content = array;
        additional.excludedArray = excludedArray;
        additional.type = type;
    }

    if (Object.keys(additional).length > 0) {
        return {
            processed: {
                type: type,
                data: processedData
            },
            additional: additional
        };
    }
    return { processed: { type: type, data: processedData } };
};

/**
 * Postprocesses the result based on additional data.
 * If the type is 'translate' or 'intl', it recombines the excluded array with the translation.
 * If there is an error, it attaches the error to the result.
 * @param result - The result to be postprocessed.
 * @param additional - Additional data from preprocessing.
 * @returns The postprocessed result.
 */
const _postprocess = (result: any, additional?: Additional): any => {
    if (additional?.type === "translate" || additional?.type === "intl") {
        if (additional?.excludedArray) {
            result.translation = recombineTranslationContent(result.translation, additional.excludedArray);
        }
    }
    if (additional?.error) {
        if (!additional) return null;
        result.error = additional.error;
    }
    return result;
};

/**
 * Bundles multiple requests and sends them to the server.
 * @param gt - Contains the baseURL and apiKey for the server request.
 * @param requests - Array of requests to be processed and sent.
 * @returns A promise that resolves to an array of processed results.
 */
export default async function _bundleRequests(
    gt: { baseURL: string, apiKey: string },
    requests: Request[]
): Promise<Array<any | null>> {

    let processedArray: Request[] = [];
    let additionalArray: Additional[] = [];

    // Preprocess each request and store the processed request and additional data.
    requests.forEach(request => {
        const { processed, additional } = _preprocess(request);
        processedArray.push(processed);
        additionalArray.push(additional || {});
    });

    try {
        // Send the processed requests to the server as a bundled request.
        const response = await fetch(`${gt.baseURL}/bundle`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'gtx-api-key': gt.apiKey,
            },
            body: JSON.stringify(processedArray)
        });

        // Check for response errors.
        if (!response.ok) {
            throw new Error(`${response.status}: ${await response.text()}`);
        }

        // Parse the response and postprocess each result.
        const resultArray = await response.json();
        return resultArray.map((item: any, index: number) => _postprocess(item, additionalArray[index]));
    } catch (error) {
        console.error(error);
        // If there is an error, postprocess each request with the error information.
        return processedArray.map((item, index) => _postprocess(item, { error: error, ...additionalArray[index] }));
    }
}
