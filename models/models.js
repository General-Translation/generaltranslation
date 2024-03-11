// ----- MODEL INFORMATION ----- //

// Get all info about a given model
// Returns an object or null if invalid
const getModelInfo = async model => {
    model = model?.toLowerCase();
    const result = await fetch(`https://gtx.dev/model/${model}`);
    const modelInfo = await result.json();
    return modelInfo;
}

// Get all languages known to be compatible with a given LLM
// Returns an array of languages codes, [] if unknown
const getModelLanguages = async model => {
    return (await getModelInfo(model))?.languages || [];
}

// Returns true if a model is known to be compatible with a language
// Returns false otherwise
const isLanguageSupported = async (model, code) => {
    return (await getModelLanguages(model))?.includes(code);
}

module.exports = {
    getModelInfo,
    getModelLanguages,
    isLanguageSupported
}