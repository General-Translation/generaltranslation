// ----- IMPORTS ----- //

const AliasToModel = require('./data/AliasToModel.json');
const Models = require('./data/Models.json')

// ----- MODEL INFORMATION ----- //

// Get all info about a given model
// Returns an object or null if invalid
const getModelInfo = model => {
    model = model?.toLowerCase();
    modelName = AliasToModel[model] ? AliasToModel[model] : model;
    return Models[modelName];
}

// Get all languages known to be compatible with a given LLM
// Returns an array of languages codes, [] if unknown
const getModelLanguages = model => {
    return getModelInfo(model)?.languages || [];
}

// Returns true if a model is known to be compatible with a language
// Returns false otherwise
const isLanguageSupported = (model, code) => {
    return getModelLanguages(model)?.includes(language);
}

module.exports = {
    getModelInfo,
    getModelLanguages,
    isLanguageSupported
}