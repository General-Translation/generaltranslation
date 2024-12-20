export declare const libraryDefaultLocale: "en-US";
export declare const localeCookieName: "generaltranslation.locale";
export declare const pluralForms: readonly ["singular", "plural", "dual", "zero", "one", "two", "few", "many", "other"];
export declare const defaultCacheUrl: "https://cache.gtx.dev";
export declare const defaultBaseUrl: "https://prod.gtx.dev";
export declare const localeHeaderName = "x-generaltranslation-locale";
export declare const maxTimeout = 60000;
export declare function isAcceptedPluralForm(form: string): form is (typeof pluralForms)[number];
