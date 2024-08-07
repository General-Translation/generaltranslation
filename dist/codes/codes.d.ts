type LanguageObject = {
    language: string;
    script?: string;
    region?: string;
};
export declare function _getLanguageObject(codes: string[]): (LanguageObject | null)[];
export declare function _isSameLanguage(codes: string[]): boolean;
export {};
