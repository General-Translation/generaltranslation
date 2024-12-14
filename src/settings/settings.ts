import { RenderSettings } from "src/types";
import getDefaultFromEnv from "src/utils/getDefaultFromEnvs";
export const libraryDefaultLocale = "en-US" as const;
export const localeCookieName = "generaltranslation.locale" as const;
export const pluralForms = ["singular", "plural", "dual", "zero", "one", "two", "few", "many", "other"] as const;
export const defaultCacheUrl = "https://cache.gtx.dev" as const;
export const defaultBaseUrl = "https://prod.gtx.dev" as const;
export const defaultRenderSettings: RenderSettings = {
  method: "skeleton",
  timeout: (() => { 
    const NODE_ENV = getDefaultFromEnv('NODE_ENV'); 
    return NODE_ENV === "development" || NODE_ENV === "test"; 
  })() ? null : 8000
};
export const localeHeaderName = "x-generaltranslation-locale";
export const maxTimeout = 60000;
export function isAcceptedPluralForm(
    form: string
  ): form is (typeof pluralForms)[number] {
    return pluralForms.includes(form as (typeof pluralForms)[number]);
};