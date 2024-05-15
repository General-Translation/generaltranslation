// Returns a user's default browser language
// e.g. 'en-US', not necessarily 'en'
// generaltranslation handles this well, but other libraries may not
// (it's a skill issue I'm afraid) 
export default function _getUserLanguage({ defaultLanguage = '' } = {}) {
    if (typeof window !== 'undefined' && window?.navigator) {
        return (navigator?.language || navigator?.userLanguage || defaultLanguage || '').toLowerCase();
    } else if (defaultLanguage) {
        return defaultLanguage.toLowerCase();
    } else {
        console.error("getUserLanguage error. It's likely you've called getUserLanguage() on the server. This is inadvisable and without a default language will return an empty string.")
        return ''
    }
}