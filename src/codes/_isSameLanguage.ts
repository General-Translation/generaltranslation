/**
 * @internal
 */
export default function _isSameLanguage(...codes: (string | string[])[]): boolean {
    try {
        const flattenedCodes = codes.flat();
        // Get the language for each code
        const languages = flattenedCodes.map(code => new Intl.Locale(code).language);
        return languages.every(language => language === languages[0]);
    } catch (error) {
        console.error(error);
        return false;
    }
}
