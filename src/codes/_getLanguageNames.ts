import libraryDefaultLanguage from "../settings/libraryDefaultLanguage"
import { _isValidLanguageCode, _standardizeLanguageCode } from "./codes";
import _getLanguageEmoji from "./emojis";

type LanguageNames = {
    
    // assume code = "de-AT", defaultLanguage = "en-US"

    code: string; // "de-AT"
    name: string; // "Austrian German"
    nativeName: string; // "Österreichisches Deutsch"

    languageCode: string; // "de"
    languageName: string; // "German"
    nativeLanguageName: string; // "Deutsch"

    // note that maximize() is NOT called here!
    
    nameWithRegionCode: string // "German (AT)"
    nativeNameWithRegionCode: string // "Deutsch (AT)"

    // for most likely script and region, maximize() is called
 
    regionCode: string // "AT"
    regionName: string // "Austria"
    nativeRegionName: string // Österreich

    scriptCode: string; // "Latn"
    scriptName: string; // "Latin"
    nativeScriptName: string; // "Lateinisch"

    maximizedCode: string // "de-Latn-AT"
    maximizedName: string // "Austrian German (Latin)"
    nativeMaximizedName: string; // Österreichisches Deutsch (Lateinisch)

    minimizedCode: string; // "de-AT", but for "de-DE" it would just be "de"
    minimizedName: string; // ""Austrian German";
    nativeMinimizedName: string; // "Österreichisches Deutsch"

    // Emoji depending on region code
    // In order not to accidentally spark international conflict, some emojis are hard-coded
    emoji: string; 
}

/**
* @internal
*/
export default function _getLanguageNames(
    code: string, defaultLanguage: string = libraryDefaultLanguage
): LanguageNames {
    try {

        const locale = new Intl.Locale(code); 
        code = locale.toString(); // "de-AT"
        const languageCode = locale.language; // "de"
        const baseRegion = locale.region; // "AT"
        
        const maximizedLocale = new Intl.Locale(code).maximize(); 
        const maximizedCode = maximizedLocale.toString(); // "de-Latn-AT"
        const regionCode = maximizedLocale.region || ''; // "AT"
        const scriptCode = maximizedLocale.script || ''; // "Latn"
        
        const minimizedLocale = new Intl.Locale(code).minimize();
        const minimizedCode = minimizedLocale.toString(); // "de-AT"

        // Language names (default and native)

        const languageNames = new Intl.DisplayNames([defaultLanguage, code, libraryDefaultLanguage], { type: 'language' });
        const nativeLanguageNames = new Intl.DisplayNames([code, defaultLanguage, libraryDefaultLanguage], { type: 'language' });

        const name = languageNames.of(code) || code; // "Austrian German"
        const nativeName = nativeLanguageNames.of(code) || code; // "Österreichisches Deutsch"
        
        const maximizedName = languageNames.of(maximizedCode) || code; // "Austrian German (Latin)"
        const nativeMaximizedName = nativeLanguageNames.of(maximizedCode) || code; // "Österreichisches Deutsch (Lateinisch)"
        
        const minimizedName = languageNames.of(minimizedCode) || code; // "Austrian German", but for "de-DE" would just be "German"
        const nativeMinimizedName = nativeLanguageNames.of(minimizedCode) || code; // "Österreichisches Deutsch", but for "de-DE" would just be "Deutsch"
        
        const languageName = languageNames.of(languageCode) || code; // "German"
        const nativeLanguageName = nativeLanguageNames.of(languageCode) || code; // "Deutsch"

        const nameWithRegionCode = baseRegion ? `${languageName} (${baseRegion})`: languageName; // German (AT)
        const nativeNameWithRegionCode = baseRegion ? `${nativeLanguageName} (${baseRegion})`: nativeLanguageName; // "Deutsch (AT)"

        // Region names (default and native)

        const regionNames = new Intl.DisplayNames([defaultLanguage, code, libraryDefaultLanguage], { type: 'region' });
        const nativeRegionNames = new Intl.DisplayNames([code, defaultLanguage, libraryDefaultLanguage], { type: 'region' });

        const regionName = regionNames.of(regionCode) || ''; // "Austria"
        const nativeRegionName = nativeRegionNames.of(regionCode) || ''; // "Österreich"

        // Script names (default and native)

        const scriptNames = new Intl.DisplayNames([defaultLanguage, code, libraryDefaultLanguage], { type: 'script' }); 
        const nativeScriptNames = new Intl.DisplayNames([code, defaultLanguage, libraryDefaultLanguage], { type: 'script' }); 

        const scriptName = scriptNames.of(scriptCode) || ''; // "Latin"
        const nativeScriptName = nativeScriptNames.of(scriptCode) || ''; // "Lateinisch"

        // Emoji 

        const emoji = _getLanguageEmoji(code);

        return {
            code, name, nativeName,
            maximizedCode, maximizedName, nativeMaximizedName,
            minimizedCode, minimizedName, nativeMinimizedName,
            languageCode, languageName, nativeLanguageName,
            nameWithRegionCode, nativeNameWithRegionCode,
            regionCode, regionName, nativeRegionName,
            scriptCode, scriptName, nativeScriptName,
            emoji
        }
    } catch (error) {
        
        code ||= '';
        const codeParts = code?.split('-');
        const languageCode = codeParts?.[0] || code || '';
        const regionCode = codeParts.length > 2 ? codeParts?.[2] : codeParts?.[1] || '';
        const scriptCode = codeParts?.[3] || '';
        const nameWithRegionCode = languageCode ? (regionCode ? `${languageCode} (${regionCode})` : languageCode) : '';
        
        return {
            code, name: code, nativeName: code, 
            maximizedCode: code, maximizedName: code, nativeMaximizedName: code,
            minimizedCode: code, minimizedName: code, nativeMinimizedName: code,
            languageCode, languageName: languageCode, nativeLanguageName: languageCode,
            regionCode, regionName: regionCode, nativeRegionName: regionCode,
            scriptCode, scriptName: scriptCode, nativeScriptName: scriptCode,
            nameWithRegionCode, nativeNameWithRegionCode: code,
            emoji: _getLanguageEmoji(code)
        }
    }

}