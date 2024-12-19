import { ContentTranslationResult, JsxTranslationResult, TranslationError } from "src/types";

/**
 * @internal
 */
export default function _isResultError(result: JsxTranslationResult | ContentTranslationResult | TranslationError): result is TranslationError {
    return 'error' in result;
}