import { Content, Update, Request, ReactChildrenAsObject, ReactTranslationResult, ContentTranslationResult } from './types/types';
/**
 * Type representing the constructor parameters for the GT class.
 */
type GTConstructorParams = {
    apiKey?: string;
    defaultLanguage?: string;
    projectID?: string;
    baseURL?: string;
};
/**
 * GT is the core driver for the General Translation library.
 */
declare class GT {
    apiKey: string;
    defaultLanguage: string;
    projectID: string;
    baseURL: string;
    /**
     * Constructs an instance of the GT class.
     *
     * @param {GTConstructorParams} [params] - The parameters for initializing the GT instance.
     * @param {string} [params.apiKey=''] - The API key for accessing the translation service.
     * @param {string} [params.defaultLanguage='en-US'] - The default language for translations.
     * @param {string} [params.projectID=''] - The project ID for the translation service.
     * @param {string} [params.baseURL='https://prod.gtx.dev'] - The base URL for the translation service.
     */
    constructor({ apiKey, defaultLanguage, projectID, baseURL }?: GTConstructorParams);
    /**
     * Translates a string or an array of strings/variables into a target language.
     * If `metadata.save` is provided, the translation is cached for use in a public project.
     *
     * @param {Content} content - The string or array of strings/variables to be translated.
     * @param {string} language - The target language code (e.g., 'en-US', 'fr') for the translation.
     * @param {{ context?: string, save?: boolean, [key: string]: any }} [metadata] - Additional metadata for the translation request.
     * @param {string} [metadata.context] - Contextual information to assist with the translation.
     * @param {boolean} [metadata.save] - Whether to cache the translation for use in a public project.
     *
     * @returns {Promise<ContentTranslationResult>} A promise that resolves to the translated content, or an error if the translation fails.
     */
    translate(content: Content, language: string, metadata?: {
        context?: string;
        save?: boolean;
        [key: string]: any;
    }): Promise<{
        translation: Content;
        language: string;
    }>;
    /**
    * Translates the content of React children elements.
    *
    * @param {Object} params - The parameters for the translation.
    * @param {ReactChildrenAsObject} params.children - The React children content to be translated.
    * @param {string} params.language - The target language for the translation.
    * @param {Object} params.metadata - Additional metadata for the translation process.
    *
    * @returns {Promise<ReactTranslationResult>} - A promise that resolves to the translated content.
    */
    translateReact(children: ReactChildrenAsObject, language: string, metadata?: {
        context?: string;
        save?: boolean;
        [key: string]: any;
    }): Promise<ReactTranslationResult>;
    /**
    * Batches multiple translation requests and sends them to the server.
    * @param requests - Array of requests to be processed and sent.
    * @returns A promise that resolves to an array of processed results.
    */
    translateBatch(requests: Request[]): Promise<Array<ReactTranslationResult | ContentTranslationResult>>;
    /**
    * Pushes updates to a remotely cached translation dictionary.
    * @param {Update[]} updates - Array of updates.
    * @param {string[]} [languages] - Array of languages to be updated.
    * @param {string} [projectID=this.projectID] - The ID of the project. Defaults to the instance's projectID.
    * @param {Record<string, any>} [object] - Options, such as whether to replace the existing dictionary. Defaults to false.
    * @returns {Promise<string[]>} A promise that resolves to an array of strings indicating the languages which have been updated.
    */
    updateProjectDictionary(updates: Update[], languages?: string[], options?: {
        replace?: boolean;
        retranslate?: boolean;
        projectID?: string;
        [key: string]: any;
    }): Promise<string[]>;
    /**
    * Retrieves the languages for a GT project as BCP 47 language tags.
    * @param projectID - The project ID to retrieve languages for. If not provided, `this.projectID` should be set.
    * @returns A promise that resolves with an array of languages.
    */
    getProjectLanguages(projectID?: string): Promise<string[]>;
}
/**
 * Get the text direction for a given language code using the Intl.Locale API.
 *
 * @param {string} code - The language code to check.
 * @returns {string} - 'rtl' if the language is right-to-left, otherwise 'ltr'.
 */
export declare function getLanguageDirection(code: string): string;
/**
 * Retrieves the display name of language code using Intl.DisplayNames.
 *
 * @param {string} code - A BCP-47 language code.
 * @param {string} [language = 'en-US'] - The language for display names.
 * @returns {string} The display name corresponding to the code.
 */
export declare function getLanguageName(code: string, language?: string): string;
/**
 * Generates language details for a given locale code, providing various language-related properties.
 *
 * This function returns information about the language,
 * script, and region of a given language code both in a standard form and in a maximized form (with likely script and region).
 * The function provides these names in both your default language and native forms, and an associated emoji.
 *
 * @param {string} code - The locale code to get language names for (e.g., "de-AT").
 * @param {string} [defaultLanguage=libraryDefaultLanguage] - The default language code for display names.
 * @returns {LanguageNames} - An object containing detailed information about the language.
 *
 * @property {string} code - The full locale code, e.g., "de-AT".
 * @property {string} name - Language name in the default display language, e.g., "Austrian German".
 * @property {string} nativeName - Language name in the locale's native language, e.g., "Österreichisches Deutsch".
 * @property {string} languageCode - The base language code, e.g., "de".
 * @property {string} languageName - The language name in the default display language, e.g., "German".
 * @property {string} nativeLanguageName - The language name in the native language, e.g., "Deutsch".
 * @property {string} nameWithRegionCode - Language name with region in the default language, e.g., "German (AT)".
 * @property {string} nativeNameWithRegionCode - Language name with region in the native language, e.g., "Deutsch (AT)".
 * @property {string} regionCode - The region code from maximization, e.g., "AT".
 * @property {string} regionName - The region name in the default display language, e.g., "Austria".
 * @property {string} nativeRegionName - The region name in the native language, e.g., "Österreich".
 * @property {string} scriptCode - The script code from maximization, e.g., "Latn".
 * @property {string} scriptName - The script name in the default display language, e.g., "Latin".
 * @property {string} nativeScriptName - The script name in the native language, e.g., "Lateinisch".
 * @property {string} maximizedCode - The maximized locale code, e.g., "de-Latn-AT".
 * @property {string} maximizedName - Maximized language name with likely script in the default language, e.g., "Austrian German (Latin)".
 * @property {string} nativeMaximizedName - Maximized language name in the native language, e.g., "Österreichisches Deutsch (Lateinisch)".
 * @property {string} minimizedCode - Minimized locale code, e.g., "de-AT" (or "de" for "de-DE").
 * @property {string} minimizedName - Minimized language name in the default language, e.g., "Austrian German".
 * @property {string} nativeMinimizedName - Minimized language name in the native language, e.g., "Österreichisches Deutsch".
 * @property {string} emoji - The emoji associated with the locale's region, if applicable.
*/
export declare function getLanguageNames(code: string, language?: string): {
    code: string;
    name: string;
    nativeName: string;
    languageCode: string;
    languageName: string;
    nativeLanguageName: string;
    nameWithRegionCode: string;
    nativeNameWithRegionCode: string;
    regionCode: string;
    regionName: string;
    nativeRegionName: string;
    scriptCode: string;
    scriptName: string;
    nativeScriptName: string;
    maximizedCode: string;
    maximizedName: string;
    nativeMaximizedName: string;
    minimizedCode: string;
    minimizedName: string;
    nativeMinimizedName: string;
    emoji: string;
};
/**
 * Retrieves an emoji based on a given language code, taking into account region, language, and specific exceptions.
 * This function uses the language's region (if present) to select an emoji or falls back on default emojis for certain languages.
 *
 * @param code - A string representing the language code (e.g., 'en-US', 'fr-CA').
 * @param custom - An optional custom mapping of language codes to emojis.
 * @returns The emoji representing the language or its region, or a default emoji if no specific match is found.
*/
export declare function getLanguageEmoji(code: string, custom?: Record<string, string>): string;
/**
 * Checks if a given BCP 47 language code is valid.
 * @param {string} code - The BCP 47 language code to validate.
 * @returns {boolean} True if the BCP 47 code is valid, false otherwise.
 */
export declare function isValidLanguageCode(code: string): boolean;
/**
 * Standardizes a BCP 47 language code to ensure correct formatting.
 * @param {string} code - The BCP 47 language code to standardize.
 * @returns {string} The standardized BCP 47 language code.
 */
export declare function standardizeLanguageCode(code: string): string;
/**
 * Checks if multiple BCP 47 language codes represent the same dialect.
 *
 * For example, `"en-US"` and `"en-GB"` are the same language, but different dialects.
 * `isSameDialect("en-US", "en-GB")` would return `false`.
 *
 * For checking if two codes represent the same language, see `isSameLanguage()`.
 *
 * Note that `isSameDialect("en", "en-US")` and `isSameDialect("en", "en-GB")` would both return true.
 *
 * @param {string[]} codes - The BCP 47 language codes to compare.
 * @returns {boolean} True if all BCP 47 codes represent the same dialect, false otherwise.
 */
export declare function isSameDialect(...codes: (string | string[])[]): boolean;
/**
 * Checks if multiple BCP 47 language codes represent the same language.
 *
 * For example, `"en-US"` and `"en-GB"` are the same language, English.
 * `isSameDialect("en-US", "en-GB")` would return `true`.
 *
 * For checking if two codes represent the exact same dialect, see `isSameDialect()`.
 *
 * @param {string[]} codes - The BCP 47 language codes to compare.
 * @returns {boolean} True if all BCP 47 codes represent the same language, false otherwise.
*/
export declare function isSameLanguage(...codes: (string | string[])[]): boolean;
/**
 * Formats a number according to the specified languages and options.
 * @param {Object} params - The parameters for the number formatting.
 * @param {number} params.value - The number to format.
 * @param {string | string[]} [params.languages=['en-US']] - The languages to use for formatting.
 * @param {Intl.NumberFormatOptions} [params.options={}] - Additional options for number formatting.
 * @returns {string} The formatted number.
 */
export declare function formatNum(params: {
    value: number;
    languages?: string | string[];
    options?: Intl.NumberFormatOptions;
}): string;
/**
 * Formats a date according to the specified languages and options.
 * @param {Object} params - The parameters for the date formatting.
 * @param {Date} params.value - The date to format.
 * @param {string | string[]} [params.languages=['en-US']] - The languages to use for formatting.
 * @param {Intl.DateTimeFormatOptions} [params.options={}] - Additional options for date formatting.
 * @returns {string} The formatted date.
 */
export declare function formatDateTime(params: {
    value: Date;
    languages?: string | string[];
    options?: Intl.DateTimeFormatOptions;
}): string;
/**
 * Formats a currency value according to the specified languages, currency, and options.
 * @param {Object} params - The parameters for the currency formatting.
 * @param {number} params.value - The currency value to format.
 * @param {string} params.currency - The currency code (e.g., 'USD').
 * @param {string | string[]} [params.languages=['en-US']] - The languages to use for formatting.
 * @param {Intl.NumberFormatOptions} [params.options={}] - Additional options for currency formatting.
 * @returns {string} The formatted currency value.
 */
export declare function formatCurrency(params: {
    value: number;
    currency: string;
    languages?: string | string[];
    options?: Intl.NumberFormatOptions;
}): string;
/**
 * Formats a list of items according to the specified languages and options.
 * @param {Object} params - The parameters for the list formatting.
 * @param {Array<string | number>} params.value - The list of items to format.
 * @param {string | string[]} [params.languages=['en-US']] - The languages to use for formatting.
 * @param {Intl.ListFormatOptions} [params.options={}] - Additional options for list formatting.
 * @returns {string} The formatted list.
 */
export declare function formatList(params: {
    value: Array<string | number>;
    languages?: string | string[];
    options?: Intl.ListFormatOptions;
}): string;
/**
 * Formats a relative time value according to the specified languages and options.
 * @param {Object} params - The parameters for the relative time formatting.
 * @param {number} params.value - The relative time value to format.
 * @param {Intl.RelativeTimeFormatUnit} params.unit - The unit of time (e.g., 'second', 'minute', 'hour', 'day', 'week', 'month', 'year').
 * @param {string | string[]} [params.languages=['en-US']] - The languages to use for formatting.
 * @param {Intl.RelativeTimeFormatOptions} [params.options={}] - Additional options for relative time formatting.
 * @returns {string} The formatted relative time string.
 */
export declare function formatRelativeTime(params: {
    value: number;
    unit: Intl.RelativeTimeFormatUnit;
    languages?: string | string[];
    options?: Intl.RelativeTimeFormatOptions;
}): string;
/**
 * Splits a string into an array of text and variable objects.
 * @param {string} string - The input string to split.
 * @returns {Content} - An array containing strings and VariableObjects.
 */
export declare function splitStringToContent(string: string): Content;
/**
 * Renders content to a string by replacing variables with their formatted values.
 * @param {Content} content - The content to render.
 * @param {string | string[]} [languages='en-US'] - The language(s) to use for formatting.
 * @param {Record<string, any>} [variables={}] - An object containing variable values.
 * @param {Record<string, any>} [variableOptions={}] - An object containing options for formatting variables.
 * @returns {string} - The rendered string with variables replaced by their formatted values.
 */
export declare function renderContentToString(content: Content, languages?: string | string[], variables?: Record<string, any>, variableOptions?: Record<string, any>): string;
/**
 * Determines the best matching language from the approved languages list based on a provided list of preferred languages.
 * @param {string | string[]} languages - A single language or an array of languages sorted in preference order.
 * @param {string[]} approvedLanguages - An array of approved languages, also sorted by preference.
 * @returns {string | undefined} - The best matching language from the approvedLanguages list, or undefined if no match is found.
 */
export declare function determineLanguage(languages: string | string[], approvedLanguages: string[]): string | undefined;
/**
 * Determines whether a translation is required based on the source and target language.
 *
 * - If the target language is not specified, the function returns `false`, as translation is not needed.
 * - If the source and target language are the same, returns `false`, indicating that no translation is necessary.
 * - If the `approvedLanguages` array is provided, and the target language is not within that array, the function also returns `false`.
 * - Otherwise, it returns `true`, meaning that a translation is required.
 *
 * @param {string} sourceLanguage - The language of the original content (BCP 47 language code).
 * @param {string} targetLanguage - The language to translate the content into (BCP 47 language code).
 * @param {string[]} [approvedLanguages] - An optional array of approved target languages.
 *
 * @returns {boolean} - Returns `true` if translation is required, otherwise `false`.
 */
export declare function requiresTranslation(sourceLanguage: string, targetLanguage: string, approvedLanguages?: string[]): boolean;
export default GT;
