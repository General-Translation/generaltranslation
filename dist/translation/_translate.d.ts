type ContentObject = {
    text: string;
    exclude?: boolean;
    cache?: boolean;
    label?: string;
};
type ContentItem = string | ContentObject;
export type Content = ContentItem | ContentItem[];
export declare function _translateMany(gt: {
    baseURL: string;
    apiKey: string;
}, array: Content[], targetLanguage: string, metadata: {
    [key: string]: any;
}): Promise<{
    translation: string;
    error: unknown;
}[] | {
    translation: string;
}[]>;
export default function _translate(gt: {
    baseURL: string;
    apiKey: string;
}, content: Content, targetLanguage: string, metadata: {
    [key: string]: any;
}): Promise<{
    translation: string;
    error?: Error | unknown;
}>;
export {};
