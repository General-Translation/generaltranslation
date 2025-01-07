declare const defaultCacheUrl: "https://cdn.gtx.dev";
declare const defaultBaseUrl: "https://api.gtx.dev";
declare const defaultRuntimeApiUrl: "https://runtime.gtx.dev";

declare const libraryDefaultLocale: "en-US";
declare const localeCookieName: "generaltranslation.locale";
declare const pluralForms: readonly ["singular", "plural", "dual", "zero", "one", "two", "few", "many", "other"];
declare const localeHeaderName = "x-generaltranslation-locale";
declare function isAcceptedPluralForm(form: string): form is (typeof pluralForms)[number];

export { defaultBaseUrl, defaultCacheUrl, defaultRuntimeApiUrl, isAcceptedPluralForm, libraryDefaultLocale, localeCookieName, localeHeaderName, pluralForms };
