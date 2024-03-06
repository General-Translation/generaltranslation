# General Translation

<a href='https://www.generaltranslation.com' target="_blank">generaltranslation.com</a>

A language toolkit for AI developers

## Getting Started

```
npm i generaltranslation
```

## Toolkit

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

### getModelLanguages(model)

<i>in beta!</i>

Get all languages known to be compatible with a given LLM. Returns an array of languages codes, [] if the model is unknown.

```
import { getModelLanguages } from 'generaltranslation'

const languages = getModelLanguages('mixtral-8x7b')
console.log(languages) // ['en', 'fr', 'de', 'es', 'it']
```

### isSupportedLanguage(model, language)

<i>in beta!</i>

Returns true if a model is known to be compatible with a given language, represented by an ISO-639 language code. Returns false otherwise.

```
import { isSupportedLanguage } from 'generaltranslation'

const supported = isSupportedLanguage('gpt-4', 'fr')
console.log(supported) // true
```

## API

Coming soon!
