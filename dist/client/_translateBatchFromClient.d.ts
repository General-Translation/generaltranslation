import { ContentTranslationResult, JsxTranslationResult, Request, TranslationError } from '../types';
/**
 * Translates where a translation already exists in another language, used for updating websites with a new language in real-time.
 */
export declare function _translateBatchFromClient({ requests, projectId, url, devApiKey }: {
    requests: Request[];
    projectId: string;
    url?: string;
    devApiKey?: string;
}): Promise<Array<JsxTranslationResult | ContentTranslationResult | TranslationError>>;
