type ContentObject = {
    text: string;
    exclude?: boolean;
    cache?: boolean;
    label?: string;
};
type ContentItem = string | ContentObject;
export type Content = ContentItem | ContentItem[];
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
