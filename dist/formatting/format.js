"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._formatNum = _formatNum;
exports._formatDateTime = _formatDateTime;
exports._formatCurrency = _formatCurrency;
exports._formatList = _formatList;
exports._formatRelativeTime = _formatRelativeTime;
var libraryDefaultLanguage_1 = __importDefault(require("../settings/libraryDefaultLanguage"));
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
function _formatNum(_a) {
    var value = _a.value, _b = _a.languages, languages = _b === void 0 ? [libraryDefaultLanguage_1.default] : _b, _c = _a.options, options = _c === void 0 ? {} : _c;
    return new Intl.NumberFormat(languages, __assign({ numberingSystem: 'latn' }, options)).format(value);
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
function _formatDateTime(_a) {
    var value = _a.value, _b = _a.languages, languages = _b === void 0 ? [libraryDefaultLanguage_1.default] : _b, _c = _a.options, options = _c === void 0 ? {} : _c;
    return new Intl.DateTimeFormat(languages, __assign({ calendar: "gregory", numberingSystem: "latn" }, options)).format(value);
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
function _formatCurrency(_a) {
    var value = _a.value, _b = _a.languages, languages = _b === void 0 ? [libraryDefaultLanguage_1.default] : _b, _c = _a.currency, currency = _c === void 0 ? 'USD' : _c, _d = _a.options, options = _d === void 0 ? {} : _d;
    return new Intl.NumberFormat(languages, __assign({ style: 'currency', currency: currency, numberingSystem: 'latn' }, options)).format(value);
}
/**
 * Formats a list of items according to the specified languages and options.
 *
 * @param {Object} params - The parameters for the list formatting.
 * @param {Array<string | number>} params.value - The list of items to format.
 * @param {string | string[]} [params.languages=['en']] - The languages to use for formatting.
 * @param {Intl.ListFormatOptions} [params.options={}] - Additional options for list formatting.
 *
 * @returns {string} The formatted list.
 * @internal
 */
function _formatList(_a) {
    var value = _a.value, _b = _a.languages, languages = _b === void 0 ? [libraryDefaultLanguage_1.default] : _b, _c = _a.options, options = _c === void 0 ? {} : _c;
    return new Intl.ListFormat(languages, __assign({ type: 'conjunction', style: 'long' }, options)).format(value);
}
/**
 * Formats a relative time value according to the specified languages and options.
 *
 * @param {Object} params - The parameters for the relative time formatting.
 * @param {number} params.value - The relative time value to format.
 * @param {Intl.RelativeTimeFormatUnit} params.unit - The unit of time (e.g., 'second', 'minute', 'hour', 'day', 'week', 'month', 'year').
 * @param {string | string[]} [params.languages=['en']] - The languages to use for formatting.
 * @param {Intl.RelativeTimeFormatOptions} [params.options={}] - Additional options for relative time formatting.
 *
 * @returns {string} The formatted relative time string.
 * @internal
 */
function _formatRelativeTime(_a) {
    var value = _a.value, unit = _a.unit, _b = _a.languages, languages = _b === void 0 ? [libraryDefaultLanguage_1.default] : _b, _c = _a.options, options = _c === void 0 ? {} : _c;
    return new Intl.RelativeTimeFormat(languages, __assign({ style: "long", numeric: 'auto' }, options)).format(value, unit);
}
