import { ContentTranslationResult, ReactTranslationResult, Request } from '../../types/types';
/**
 * Translates where a translation already exists in another language, used for updating websites with a new language in real-time.
 */
export declare function _translateReactBatchFromClient(requests: Request[], baseURL?: string): Promise<Array<ReactTranslationResult | ContentTranslationResult>>;
