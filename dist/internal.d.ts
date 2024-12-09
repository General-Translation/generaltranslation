declare const libraryDefaultLocale: "en-US";
declare const localeCookieName: "generaltranslation.locale";
declare const pluralForms: readonly ["singular", "plural", "dual", "zero", "one", "two", "few", "many", "other"];
declare const defaultCacheURL: "https://cache.gtx.dev";
declare const defaultBaseURL: "https://prod.gtx.dev";
declare const localeHeaderName = "x-generaltranslation-locale";
declare function isAcceptedPluralForm(form: string): form is (typeof pluralForms)[number];

type VariableObject = {
    variable?: string;
    key: string;
};
type Content = string | Array<string | VariableObject>;
type ElementAsObject = {
    type: string;
    props: {
        'data-_gt'?: {
            id: number;
            [key: string]: any;
        };
        children?: ReactChildrenAsObject;
        [key: string]: any;
    };
};
type ReactChildAsObject = string | ElementAsObject | VariableObject;
type ReactChildrenAsObject = ReactChildAsObject | ReactChildAsObject[];
type Request = {
    type: 'string';
    data: {
        content: Content;
        targetLocale: string;
        metadata: Record<string, any>;
    };
} | {
    type: 'react';
    data: {
        children: any;
        targetLocale: string;
        metadata: Record<string, any>;
    };
};
type ContentTranslationResult = {
    translation: Content;
    locale: string;
    reference?: {
        id: string;
        key: string;
    };
};
type ReactTranslationResult = {
    translation: ReactChildrenAsObject;
    locale: string;
    reference?: {
        id: string;
        key: string;
    };
};

/**
 * Translates where a translation already exists in another language, used for updating websites with a new language in real-time.
 */
declare function _translateReactBatchFromClient(requests: Request[], baseURL?: string): Promise<Array<ReactTranslationResult | ContentTranslationResult>>;

export { defaultBaseURL, defaultCacheURL, isAcceptedPluralForm, libraryDefaultLocale, localeCookieName, localeHeaderName, pluralForms, _translateReactBatchFromClient as translateReactBatchFromClient };
