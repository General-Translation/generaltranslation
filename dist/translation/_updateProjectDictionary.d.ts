export type Update = {
    type: 'react';
    data: {
        children: object | string;
        metadata: Record<string, any>;
    };
} | {
    type: 'string';
    data: {
        content: string;
        metadata: Record<string, any>;
    };
};
export default function _updateProjectDictionary(gt: {
    baseURL: string;
    apiKey: string;
}, updates: Update[], languages: string[], projectID: string, replace: boolean): Promise<string[]>;