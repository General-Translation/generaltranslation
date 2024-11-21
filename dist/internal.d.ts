declare const libraryDefaultLocale: "en-US";
declare const localeCookieName: "generaltranslation.locale";
declare const pluralForms: readonly ["singular", "plural", "dual", "zero", "one", "two", "few", "many", "other"];
declare const defaultCacheURL: "https://cache.gtx.dev";
declare const defaultAPIURL: "https://prod.gtx.dev";
declare function isAcceptedPluralForm(form: string): form is (typeof pluralForms)[number];

export { defaultAPIURL, defaultCacheURL, isAcceptedPluralForm, libraryDefaultLocale, localeCookieName, pluralForms };
