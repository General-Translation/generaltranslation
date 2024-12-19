import { ContentTranslationResult, JsxTranslationResult, TranslationError } from "src/types";

/**
 * @internal
 */
export default function _isResultSuccessful(result: JsxTranslationResult | ContentTranslationResult | TranslationError): result is TranslationError {
    return 'translation' in result;
}