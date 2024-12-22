import { ContentTranslationResult, JsxTranslationResult, Request, TranslationError } from '../../types';
/**
 * Translates where a translation already exists in another language, used for updating websites with a new language in real-time.
 */
export declare function _translateBatchFromClient(gt: {
    baseUrl: string;
    devApiKey?: string;
}, requests: Request[]): Promise<Array<JsxTranslationResult | ContentTranslationResult | TranslationError>>;
