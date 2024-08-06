type LanguageObject = {
    language: string;
    script?: string;
    region?: string;
};
declare function _getLanguageObject(codes: string[]): (LanguageObject | null)[];
declare function _isSameLanguage(codes: string[]): boolean;
export { _isValidLanguageCode, _standardizeLanguageCode, _getLanguageObject, _getLanguageName, _getLanguageCode, _isSameLanguage };
