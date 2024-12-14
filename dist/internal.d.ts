import { RenderSettings } from 'src/types';

declare const libraryDefaultLocale: "en-US";
declare const localeCookieName: "generaltranslation.locale";
declare const pluralForms: readonly ["singular", "plural", "dual", "zero", "one", "two", "few", "many", "other"];
declare const defaultCacheUrl: "https://cache.gtx.dev";
declare const defaultBaseUrl: "https://prod.gtx.dev";
declare const defaultRenderSettings: RenderSettings;
declare const localeHeaderName = "x-generaltranslation-locale";
declare function isAcceptedPluralForm(form: string): form is (typeof pluralForms)[number];

export { defaultBaseUrl, defaultCacheUrl, defaultRenderSettings, isAcceptedPluralForm, libraryDefaultLocale, localeCookieName, localeHeaderName, pluralForms };
