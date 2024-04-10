# General Translation

<a href='https://www.generaltranslation.com' target="_blank">generaltranslation.com</a>

A language toolkit for AI developers. 

Note: this package is in active development.

## Getting Started

In your terminal:

```
npm i generaltranslation
```

In your code:

```
import GT from 'generaltranslation'
// or const GT = require('generaltranslation')

const gt = new GT()
```

## Language Codes

### getLanguageName(codes)

Returns a language name from a two or three-letter ISO-639 language code, or an array of codes.

```
const language = gt.getLanguageName('en');
console.log(language) // 'English'

const languages = gt.getLanguageName(['fr', 'es'])
console.log(languages) // ['French', 'Spanish']
```

### getLanguageCode(languages)

Returns an ISO-639 code from a language name or an array of language names.

```
const code = gt.getLanguageCode('English');
console.log(language) // 'en'

const codes = gt.getLanguageCodes(['French', 'Spanish'])
console.log(codes) // ['fr', 'es']
```

## Which AI models are compatible with which languages?

We continually benchmark AI models and add new models as they are released. That means these functions have to be <code>async</code>. This information is provided as a public service. It's completely free and requires no API key.

### async getModelList()

Get the latest list of models for which there is data. Returns an array of model names.

```
async function main() {
    const models = await gt.getModelList();
    console.log(models) // ['gpt-4', ... ]
}

main();
```

### async getModelLanguages(model)

Get all languages known to be compatible with a given AI model. Returns an array of languages codes, or [] if the model is unknown.

```
async function main() {
    const languages = await gt.getModelLanguages('mixtral-8x7b')
    console.log(languages) // ['en', 'fr', 'de', 'es', 'it']
}

main();
```

### async isSupportedLanguage(model, language)

Returns true if a model is known to be compatible with a given language, represented by an ISO-639 language code. Returns false otherwise.

```
async function main() {
    const supported = await gt.isSupportedLanguage('gpt-4', 'fr')
    console.log(supported) // true
}

main();
```

## API

Coming soon!
