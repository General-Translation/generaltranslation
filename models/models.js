// ----- MODEL INFORMATION ----- //

// Get all info on all models
export const _getAllModelInfo = async () => {
    try {
        const result = await fetch(`https://models.gtx.dev/all`);
        return await result.json();
    } catch (error) {
        console.error(error)
        return null;
    }
}

// Get all models by a given developer
// Returns an empty array if none
export const _getModelsByDeveloper = async developer => {
    if (!developer) return null;
    developer = developer?.toLowerCase();
    try {
        const result = await fetch(`https://models.gtx.dev/developer/${developer}`);
        const models = await result.json();
        return models;
    } catch (error) {
        console.error(error)
        return [];
    }
}

// Get all models certified for a given language
// Returns an empty array if none
export const _getModelsByLanguage = async language => {
    if (!language) return null;
    language = language?.toLowerCase();
    try {
        const result = await fetch(`https://models.gtx.dev/language/${language}`);
        const models = await result.json();
        return models;
    } catch (error) {
        console.error(error)
        return [];
    }
}

// Get all models
// Returns an array of model names
export const _getModelList = async () => {
    try {
        const result = await fetch(`https://models.gtx.dev/models`);
        const models = await result.json();
        return models;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Get all info about a given model
// Returns an object or null if invalid
export const _getModelInfo = async model => {
    if (!model) return null;
    model = model?.toLowerCase();
    try {
        const result = await fetch(`https://models.gtx.dev/model/${model}`);
        const modelInfo = await result.json();
        return modelInfo;
    } catch (error) {
        console.error(error)
        return null;
    }
}

// ----- FUNCTIONS FROM MODEL INFO ----- //

// Get all languages known to be compatible with a given LLM
// Returns an array of languages codes, or null if unknown
export const _getModelLanguages = async model => {
    const modelInfo = await _getModelInfo(model);
    return modelInfo?.languages;
}

// Returns true if a model is known to be compatible with a language
// Returns false otherwise
export const _isLanguageSupported = async (model, code) => {
    if (!code) return false;
    const modelLanguages = await _getModelLanguages(model);
    return modelLanguages?.includes(code) ? true : false;
}