# General Translation

<a href='https://www.generaltranslation.com' target="_blank">generaltranslation.com</a>

A language toolkit for AI developers.

Full documentation coming soon!

## Getting Started

<b>In your terminal:</b>

```
npm i generaltranslation
```

<b>In your code, import functions directly</b>

```
import { getLanguageName } from 'generaltranslation'
```

or, to initialize a GT API client:

```
import GT from 'generaltranslation'

const gt = new GT()
```

## Convert between languages and ISO-639 codes

### getLanguageName(codes)

Returns a language name from a two or three-letter ISO-639 language code, or an array of codes.

```
const language = getLanguageName('en');
console.log(language) // 'English'

const languages = getLanguageName(['fr', 'es'])
console.log(languages) // ['French', 'Spanish']
```

### getLanguageCode(languages)

Returns an ISO-639 code from a language name or an array of language names.

```
const code = getLanguageCode('English');
console.log(language) // 'en'

const codes = getLanguageCodes(['French', 'Spanish'])
console.log(codes) // ['fr', 'es']
```

## Translation API

For this function, you need to sign up for an API key at <a href='https://generaltranslation.com' target='_blank'>generaltranslation.com</a>.

There's a small, free allowance to let you test out the API without payment details.

Add the API key to your code like this:

```
import GT from 'generaltranslation'

const gt = new GT({
    apiKey: process.env.GT_API_KEY // looks like 'gtx-XXX'
});
```

### async translate(content, language)

Translates content into the language represented by an ISO-639 language code. Caches by default. Just wrap `translate` around your content and go.

All of the following are valid:

```
const translation = await gt.translate('Tell me a story', 'es'); // returns a string
```

```
const first = 'Tell me a story';
const second = ' about a cat'

const translated = await gt.translate([
    first, second
], 'es');
```

To mark text that shouldn't be translated, wrap it in `{ text: "", translate: false }`. Items marked as `translate: false` are never sent to our API. For example:

```
const prompt = 'Tell me a story about ';
const input = 'gatos con espadas'

const translatedPrompt = await gt.translate([
    prompt, { text: input, translate: false }
], 'es');
```

For type consistency, you can also make everything in the content parameter an object:

```
const prompt = 'Tell me a story about ';
const input = 'gatos con espadas'

const translatedPrompt = await gt.translate([
    { text: prompt }, 
    { text: input, translate: false }
], 'es');
```

This also works:

```
const translatedPrompt = await gt.translate({ text: 'Tell me a story' }, 'es');
```

### async translateMany(contentArray, language)

Translates multiple items of content into the language represented by an ISO-639 language code. Caches by default. Just wrap `translateMany` around an array of what you want to translate and specify a language. For example:

```
const requests = [
    {
        content: "You say goodbye",
        language: "es"
    },
    {
        content: "And I say hello.",
        language: "de"
    }
];
const translationArray = await gt.translateMany(requests) // returns an array
```