# General Translation

<a href='https://www.generaltranslation.com' target="_blank">generaltranslation.com</a>

A language toolkit for AI developers. Used in `gt-react`.

Full documentation: <a href='https://docs.generaltranslation.com'>docs.generaltranslation.com</a>.

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

### getLanguageDirection(code)

Returns the text direction ('rtl' for right-to-left or 'ltr' for left-to-right) for a given language code.

```
const direction = getLanguageDirection('ar');
console.log(direction) // 'rtl'

const direction = getLanguageDirection('en');
console.log(direction) // 'ltr'
```

### isValidLanguageCode(code)

Checks if a given language-country-script code is valid. Returns a boolean indicating validity.

```javascript
const isValid = isValidLanguageCode('en-US');
console.log(isValid) // true

const isValid = isValidLanguageCode('invalid-code');
console.log(isValid) // false
```

## `GT` Class

The `GT` class is the core driver for the General Translation library. It provides various methods for translating content, handling internationalization, and managing translation requests.

### Constructor

The `GT` class constructor initializes an instance of the GT class with optional parameters.

```javascript
const gt = new GT({
    apiKey: 'your-api-key',
    defaultLanguage: 'en',
    projectID: 'your-project-id',
    baseURL: 'https://prod.gtx.dev'
});
```

#### Parameters

- `apiKey` (string): The API key for accessing the translation service. Defaults to an empty string.
- `defaultLanguage` (string): The default language for translations. Defaults to 'en'.
- `projectID` (string): The project ID for the translation service. Defaults to an empty string.
- `baseURL` (string): The base URL for the translation service. Defaults to 'https://prod.gtx.dev'.

### Methods

#### `translate(content: string, targetLanguage: string, metadata?: { notes?: string, [key: string]: any }): Promise<{ translation: string, error?: Error | unknown }>`

Translates a string into a target language.

```javascript
const result = await gt.translate('Hello', 'es');
console.log(result.translation); // 'Hola'
```

#### Parameters

- `content` (string): The string to translate.
- `targetLanguage` (string): The target language for the translation.
- `metadata` (object): Additional metadata for the translation request.

#### Returns

- A promise that resolves to an object containing the translated content and optional error information.

#### `intl(content: string, targetLanguage: string, projectID?: string, metadata?: { dictionaryName?: string, notes?: string, [key: string]: any }): Promise<{ translation: string, error?: Error | unknown }>`

Translates a string and caches it for use in a public project.

```javascript
const result = await gt.intl('Hello', 'es', 'your-project-id');
console.log(result.translation); // 'Hola'
```

#### Parameters

- `content` (string): The string to translate.
- `targetLanguage` (string): The target language for the translation.
- `projectID` (string): The ID of the project. Defaults to the instance's projectID.
- `metadata` (object): Additional metadata for the translation request.

#### Returns

- A promise that resolves to an object containing the translated content and optional error information.

#### `translateReactChildren(content: any, targetLanguage: string, metadata?: { [key: string]: any }): Promise<{ translation: any | null, error?: Error | unknown }>`

Translates the content of React children elements.

```javascript
const result = await gt.translateReactChildren(<div>Hello</div>, 'es');
console.log(result.translation); // <div>Hola</div>
```

#### Parameters

- `content` (any): The React children content to be translated.
- `targetLanguage` (string): The target language for the translation.
- `metadata` (object): Additional metadata for the translation process.

#### Returns

- A promise that resolves to an object containing the translated content and optional error information.

#### `bundleRequests(requests: any[]): Promise<Array<any | null>>`

Bundles multiple requests and sends them to the server.

```javascript
const requests = [
    { content: 'Hello', targetLanguage: 'es' },
    { content: 'World', targetLanguage: 'fr' }
];
const results = await gt.bundleRequests(requests);
console.log(results); // ['Hola', 'Monde']
```

#### Parameters

- `requests` (array): Array of requests to be processed and sent.

#### Returns

- A promise that resolves to an array of processed results.