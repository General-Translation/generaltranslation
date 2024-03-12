# General Translation

<a href='https://www.generaltranslation.com' target="_blank">generaltranslation.com</a>

A language toolkit for AI developers. 

Note: this package is in active development.

## Getting Started

```
npm i generaltranslation
```

## Toolkit Functions

### getLanguageName(codes)

Returns a language name from a two or three-letter ISO-639 language code, or an array of codes.

```
import { getLanguageName } from 'generaltranslation'

const language = getLanguageName('en');
console.log(language) // 'English'

const languages = getLanguageName(['fr', 'es'])
console.log(languages) // ['French', 'Spanish']
```

### getLanguageCode(languages)

Returns an ISO-639 code from a language name or an array of language names.

```
import { getLanguageCode } from 'generaltranslation'

const code = getLanguageCode('English');
console.log(language) // 'en'

const codes = getLanguageCodes(['French', 'Spanish'])
console.log(codes) // ['fr', 'es']
```

## Async Toolkit Functions

As language models are continuously benchmarked, we update our data in real time. Calling these async functions is completely free and requires no API key.

### async getModelList()

Get the latest list of models for which there is data. Returns an array of model names.
```
import { getModelList } from 'generaltranslation'

async function main() {
    const models = await getModelList();
    console.log(models) // ['gpt-4', ... ]
}

main();
```

### async getModelLanguages(model)

Get all languages known to be compatible with a given LLM. Returns an array of languages codes, [] if the model is unknown.

```
import { getModelLanguages } from 'generaltranslation'

async function main() {
    const languages = await getModelLanguages('mixtral-8x7b')
    console.log(languages) // ['en', 'fr', 'de', 'es', 'it']
}

main();
```

### async isSupportedLanguage(model, language)

Returns true if a model is known to be compatible with a given language, represented by an ISO-639 language code. Returns false otherwise.

```
import { isSupportedLanguage } from 'generaltranslation'

async function main() {
    const supported = await isSupportedLanguage('gpt-4', 'fr')
    console.log(supported) // true
}

main();
```

## API

Coming soon!
