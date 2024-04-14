// ----- MODEL INFORMATION ----- //

// Get all models
// Returns an array of model names
const _getModelList = async () => {
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
const _getModelInfo = async model => {
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

// Get all languages known to be compatible with a given LLM
// Returns an array of languages codes, or null if unknown
const _getModelLanguages = async model => {
    const modelInfo = await _getModelInfo(model);
    return modelInfo?.languages;
}

// Returns true if a model is known to be compatible with a language
// Returns false otherwise
const _isLanguageSupported = async (model, code) => {
    if (!code) return false;
    const modelLanguages = await _getModelLanguages(model);
    return modelLanguages?.includes(code) ? true : false;
}

module.exports = {
    _getModelList,
    _getModelLanguages,
    _isLanguageSupported
}