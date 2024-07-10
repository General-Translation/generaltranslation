import { Content } from "./_translate";
/**
   * Translates a single piece of content and caches for use in a public project.
   * @param {{ baseURL: string, apiKey: string }} gt - The translation service configuration.
   * @param {Content} content - The content to translate.
   * @param {string} targetLanguage - The target language for the translation.
   * @param {string} projectID - The ID of the project
   * @param {{ [key: string]: any }} metadata - Additional metadata for the translation request.
   * @returns {Promise<{ translation: string, error?: Error | unknown }>} - The translated content with optional error information.
*/
export default function _intl(gt: {
    baseURL: string;
    apiKey: string;
}, content: Content, targetLanguage: string, projectID: string, metadata: {
    [key: string]: any;
}): Promise<{
    translation: string;
    error?: Error | unknown;
}>;
