type Variable = {
    variable?: string;
    id?: string | number;
    key: string;
};
type Content = string | Array<string | Variable>;
type JsxElement = {
    type: string;
    props: {
        'data-_gt'?: {
            id: number;
            [key: string]: any;
        };
        children?: JsxChildren;
        [key: string]: any;
    };
};
type JsxChild = string | JsxElement | Variable;
type JsxChildren = JsxChild | JsxChild[];
type Metadata = {
    [key: string]: any;
};
type Request = {
    type: 'content';
    data: {
        source: Content;
        targetLocale: string;
        metadata: Metadata;
    };
} | {
    type: 'jsx';
    data: {
        source: JsxChildren;
        targetLocale: string;
        metadata: Metadata;
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
type JsxTranslationResult = {
    translation: JsxChildren;
    locale: string;
    reference?: {
        id: string;
        key: string;
    };
};
type TranslationError = {
    error: string;
    code: number;
    reference?: {
        id: string;
        key: string;
    };
};

/**
 * Translates where a translation already exists in another language, used for updating websites with a new language in real-time.
 */
declare function _translateFromClient({ requests, projectId, url, devApiKey }: {
    requests: Request[];
    projectId: string;
    url?: string;
    devApiKey?: string;
}): Promise<Array<JsxTranslationResult | ContentTranslationResult | TranslationError>>;

declare const defaultCacheUrl: "https://cache.gtx.dev";
declare const defaultBaseUrl: "https://prod.gtx.dev";
declare const defaultClientApiUrl: "https://client.gtx.dev";

declare const libraryDefaultLocale: "en-US";
declare const localeCookieName: "generaltranslation.locale";
declare const pluralForms: readonly ["singular", "plural", "dual", "zero", "one", "two", "few", "many", "other"];
declare const localeHeaderName = "x-generaltranslation-locale";
declare function isAcceptedPluralForm(form: string): form is (typeof pluralForms)[number];

export { _translateFromClient, defaultBaseUrl, defaultCacheUrl, defaultClientApiUrl, isAcceptedPluralForm, libraryDefaultLocale, localeCookieName, localeHeaderName, pluralForms };
