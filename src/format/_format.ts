/**
 * Formats a number according to the specified languages and options.
 * 
 * @param {Object} params - The parameters for the number formatting.
 * @param {number} params.value - The number to format.
 * @param {string | string[]} [params.languages=['en']] - The languages to use for formatting.
 * @param {Intl.NumberFormatOptions} [params.options={}] - Additional options for number formatting.
 * 
 * @returns {string} The formatted number.
 * @internal
 */
export function _num({
    value,
    languages = ['en'],
    options = {}
}: {
    value: number, languages?: string | string[]
    options?: Intl.NumberFormatOptions
}) {
    return new Intl.NumberFormat(languages, { numberingSystem: 'latn', ...options }).format(value);
}

/**
 * Formats a date according to the specified languages and options.
 * 
 * @param {Object} params - The parameters for the date formatting.
 * @param {Date} params.value - The date to format.
 * @param {string | string[]} [params.languages=['en']] - The languages to use for formatting.
 * @param {Intl.DateTimeFormatOptions} [params.options={}] - Additional options for date formatting.
 * 
 * @returns {string} The formatted date.
 * @internal
 */
export function _datetime({
    value,
    languages = ['en'],
    options = {}
}: {
    value: Date, languages?: string | string[]
    options?: Intl.DateTimeFormatOptions
}) {
    return new Intl.DateTimeFormat(languages, { calendar: "gregory", numberingSystem: "latn", ...options }).format(value);
}

/**
 * Formats a currency value according to the specified languages, currency, and options.
 * 
 * @param {Object} params - The parameters for the currency formatting.
 * @param {number} params.value - The currency value to format.
 * @param {string} params.currency - The currency code (e.g., 'USD').
 * @param {string | string[]} [params.languages=['en']] - The languages to use for formatting.
 * @param {Intl.NumberFormatOptions} [params.options={}] - Additional options for currency formatting.
 * 
 * @returns {string} The formatted currency value.
 * @internal
 */
export function _currency({
    value,
    languages = ['en'],
    currency = 'USD',
    options = {}
}: {
    value: number, 
    currency?: string,
    languages?: string | string[]
    options?: Intl.NumberFormatOptions
}) {
    return new Intl.NumberFormat(languages, { style: 'currency', currency, numberingSystem: 'latn', ...options }).format(value);
}