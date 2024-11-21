export const libraryDefaultLocale = "en-US" as const;
export const localeCookieName = "generaltranslation.locale" as const;
export const pluralForms = ["singular", "plural", "dual", "zero", "one", "two", "few", "many", "other"] as const;
export const defaultCacheURL = "https://cache.gtx.dev" as const;
export const defaultAPIURL = "https://prod.gtx.dev" as const;
export function isAcceptedPluralForm(
    form: string
  ): form is (typeof pluralForms)[number] {
    return pluralForms.includes(form as (typeof pluralForms)[number]);
}