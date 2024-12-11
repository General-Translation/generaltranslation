import { ContentTranslationResult, JsxTranslationResult, Request } from '../../types/types';
/**
 * Translates where a translation already exists in another language, used for updating websites with a new language in real-time.
 */
export declare function _translateJsxBatchFromClient(requests: Request[], baseURL?: string): Promise<Array<JsxTranslationResult | ContentTranslationResult>>;
