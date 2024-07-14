# General Translation

<a href='https://www.generaltranslation.com' target="_blank">generaltranslation.com</a>

A language toolkit for AI developers. Used in `gt-react`.

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

Returns a language name from an ISO-639 language code, or an array of codes. Compatible with ISO-3166 regions and ISO-15924 scripts common in browser languages.

```
const language1 = getLanguageName('en');
console.log(language1) // 'English'

const language2 = getLanguageName('en-GB');
console.log(language2) // 'British English'

const languages = getLanguageName(['fr', 'zh-Hans'])
console.log(languages) // ['French', 'Mandarin Chinese']
```

### getLanguageObject(codes)

Returns a language object, or array of language objects, each containing a language, script, and region from an ISO-639 language code, or an array of codes. Compatible with ISO-3166 regions and ISO-15924 scripts common in browser languages.

```
const languageObject = getLanguageCode('en');
console.log(languageObject) // { "language": "English", "script": "", "region": "" }

const languageObjects = getLanguageObject(['zh-Hans', 'en-US'])
console.log(codes) // [{ "language": "Chinese", "script": "Han (simplified)", "region": "" }, { "language": "English", "script": "", "region": "United States" }]
```

### getLanguageCode(languages)

Returns an ISO-639 code from a language name or an array of language names.

```
const code = getLanguageCode('English');
console.log(code) // 'en'

const codes = getLanguageCode(['French', 'Spanish'])
console.log(codes) // ['fr', 'es']
```

### isSameLanguage(...codes)

Checks if a given set of codes are all equivalent to the same language. Returns a boolean.

```
const same = isSameLanguage('en', 'en-US', 'en-GB');
console.log(same) // true
```