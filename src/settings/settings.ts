export const libraryDefaultLocale = "en-US" as const;
export const localeCookieName = "generaltranslation.locale" as const;
export const pluralForms = ["singular", "plural", "dual", "zero", "one", "two", "few", "many", "other"] as const;
export const defaultCacheUrl = "https://cache.gtx.dev" as const;
export const defaultBaseUrl = "https://prod.gtx.dev" as const;
export const defaultClientBaseUrl = "https://prod.gtx.dev" as const; // TODO: update this
export const localeHeaderName = "x-generaltranslation-locale";
export const maxTimeout = 60000;
export function isAcceptedPluralForm(
    form: string
  ): form is (typeof pluralForms)[number] {
    return pluralForms.includes(form as (typeof pluralForms)[number]);
}