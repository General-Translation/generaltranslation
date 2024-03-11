// ----- MODEL INFORMATION ----- //

// Get all info about a given model
// Returns an object or null if invalid
const getModelInfo = async model => {
    if (!model) return null;
    model = model?.toLowerCase();
    try {
        const result = await fetch(`https://gtx.dev/model/${model}`);
        const modelInfo = await result.json();
        return modelInfo;
    } catch {
        return null;
    }
}

// Get all languages known to be compatible with a given LLM
// Returns an array of languages codes, or [] if unknown
const getModelLanguages = async model => {
    const modelInfo = await getModelInfo(model);
    return modelInfo?.languages || [];
}

// Returns true if a model is known to be compatible with a language
// Returns false otherwise
const isLanguageSupported = async (model, code) => {
    const modelLanguages = await getModelLanguages(model);
    return modelLanguages?.includes(code) ? true : false;
}

module.exports = {
    getModelInfo,
    getModelLanguages,
    isLanguageSupported
}