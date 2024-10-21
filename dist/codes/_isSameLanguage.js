/**
 * @internal
 */
export default function _isSameLanguage() {
    var codes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        codes[_i] = arguments[_i];
    }
    try {
        var flattenedCodes = codes.flat();
        // Get the language for each code
        var languages_1 = flattenedCodes.map(function (code) { return new Intl.Locale(code).language; });
        return languages_1.every(function (language) { return language === languages_1[0]; });
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
