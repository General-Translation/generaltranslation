export {
  defaultBaseUrl,
  defaultCacheUrl,
  defaultRuntimeApiUrl
} from './settings/settingsUrls'
export {
  libraryDefaultLocale, 
  localeCookieName,
  localeHeaderName,
} from './settings/settings';
export {
  pluralForms,
  isAcceptedPluralForm
} from './settings/plurals'
import _getPluralForm from './locales/getPluralForm';
export { _getPluralForm as getPluralForm };