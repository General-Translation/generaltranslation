# General Translation

<a href='https://www.generaltranslation.com' target="_blank">generaltranslation.com</a>

A language toolkit for AI developers.

Full documentation coming soon!

## Getting Started

<b>In your terminal:</b>

```
npm i generaltranslation
```

<b>In your code:</b>

```
import GT from 'generaltranslation'
// or const GT = require('generaltranslation')

const gt = new GT()
```

or, import functions directly:

```
import { getLanguageName } from 'generaltranslation'
```

## Convert between languages and ISO-639 codes

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

## Which languages do AI models understand?

We continually benchmark AI models and add new models as they are released. That means these functions have to be <code>async</code>. This information is provided as a public service. It's completely free and requires no API key.

### async getModelList()

Get the latest list of models for which there is data. Returns an array of model names.

```
const models = await gt.getModelList();
console.log(models) // ['gpt-4', ... ]
```

### async getModelLanguages(model)

Get all languages known to be compatible with a given AI model. Returns an array of languages codes, or null if the model is unknown.

```
const languages = await gt.getModelLanguages('mixtral-8x7b')
console.log(languages) // ['en', 'fr', 'de', 'es', 'it']
```

### async isSupportedLanguage(model, code)

Returns true if a model is known to be compatible with a given language, represented by an ISO-639 language code. Returns false otherwise.

```
const supported = await gt.isSupportedLanguage('gpt-4', 'fr')
console.log(supported) // true
```

## Prompt Internationalization API

For this function, you need to sign up for an API key at <a href='https://generaltranslation.com' target='_blank'>generaltranslation.com</a>.

There's a small, free allowance to let you test out the API without payment details.

Add the API key to your code like this:

```
import GT from 'generaltranslation'

const gt = new GT({
    apiKey: process.env.GT_API_KEY // looks like 'gtx-XXX'
});
```

### async getPrompt(prompt, code)

Translates prompt into the language represented by an ISO-639 language code. Designed for translating prompts into other languages, to internationalize responses from AI models.

Just wrap `getPrompt` around your prompt and go. 

All of the following are valid:

```
const translatedPrompt = await gt.getPrompt('Tell me a story', 'es');
```

```
const first = 'Tell me a story ';
const second = 'about a cat'

const translatedPrompt = await gt.getPrompt([
    first, second
], 'es');
```

To mark text that shouldn't be translated, wrap it in `{ text: "", translate: false }`. Items marked as `translate: false` are never sent to our API. For example:

```
const prompt = 'Tell me a story about ';
const input = 'gatos con espadas'

const translatedPrompt = await gt.getPrompt([
    prompt, { text: input, translate: false }
], 'es');
```

For type consistency, you can also make everything in the prompt parameter an object:

```
const prompt = 'Tell me a story about ';
const input = 'gatos con espadas'

const translatedPrompt = await gt.getPrompt([
    { text: prompt }, 
    { text: input, translate: false }
], 'es');
```

This also works:

```
const translatedPrompt = await gt.getPrompt({ text: 'Tell me a story' }, 'es');
```