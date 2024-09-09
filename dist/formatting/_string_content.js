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
Object.defineProperty(exports, "__esModule", { value: true });
exports._splitStringToContent = _splitStringToContent;
exports._renderContentToString = _renderContentToString;
var _format_1 = require("./_format");
// Variable types mapping
var variableTypeMap = {
    var: "variable",
    num: "number",
    datetime: "datetime",
    currency: "currency"
};
/**
* @internal
*/
/**
 * @internal
 */
function _splitStringToContent(string) {
    var result = [];
    var regex = /{([^}]+)}/g;
    var lastIndex = 0;
    var match;
    while ((match = regex.exec(string)) !== null) {
        var fullMatch = match[0], content = match[1];
        var startIndex = match.index;
        // Check for escaped braces with '^' right before the opening brace
        if (string[startIndex - 1] === "^") {
            // Add text before the escape sequence
            if (startIndex - 1 > lastIndex) {
                result.push(string.slice(lastIndex, startIndex - 1));
            }
            // Add the escaped content as literal text
            result.push(fullMatch);
            lastIndex = startIndex + fullMatch.length;
            continue;
        }
        // Add text before the match
        if (startIndex > lastIndex) {
            result.push(string.slice(lastIndex, startIndex));
        }
        // Handle the variable substitution inside the braces
        var parts = content.split(",").map(function (part) { return part.trim(); });
        var key = parts[0];
        var variableType = parts[1] ? variableTypeMap[parts[1]] : undefined;
        var variableObject = __assign({ key: key }, (variableType && { variable: variableType }));
        result.push(variableObject);
        lastIndex = startIndex + fullMatch.length;
    }
    // Add the remaining part of the string after the last match
    if (lastIndex < string.length) {
        result.push(string.slice(lastIndex));
    }
    return result;
}
/**
* @internal
*/
function _renderContentToString(content, languages, variables, variableOptions) {
    if (languages === void 0) { languages = 'en'; }
    if (variables === void 0) { variables = {}; }
    if (variableOptions === void 0) { variableOptions = {}; }
    if (typeof content === 'string') {
        content = _splitStringToContent(content);
    }
    if (typeof content === 'string') {
        return content;
    }
    return content.map(function (item) {
        var _a;
        if (typeof item === 'string')
            return item;
        if (typeof item === 'object') {
            var value = variables[item.key];
            if (!item.variable)
                return value;
            if (item.variable === "number") {
                return (0, _format_1._formatNum)({
                    value: value,
                    languages: languages,
                    options: variableOptions[item.key]
                });
            }
            if (item.variable === "currency") {
                return (0, _format_1._formatCurrency)(__assign(__assign({ value: value, languages: languages }, (variableOptions[item.key] && { options: variableOptions[item.key] })), (((_a = variableOptions[item.key]) === null || _a === void 0 ? void 0 : _a.currency) && { currency: variableOptions[item.key].currency })));
            }
            if (item.variable === "datetime") {
                return (0, _format_1._formatDateTime)(__assign({ value: value, languages: languages }, (variableOptions[item.key] && { options: variableOptions[item.key] })));
            }
            return value;
        }
    }).join('');
}
