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

## Convert between languages and BCP 47 language tags

### getLanguageName(codes)

Returns a language name from a BCP 47 language tag, or an array of tags.

```javascript
const language1 = getLanguageName('en');
console.log(language1); // 'English'

const language2 = getLanguageName('en-GB');
console.log(language2); // 'British English'

const languages = getLanguageName(['fr', 'zh-Hans']);
console.log(languages); // ['French', 'Mandarin Chinese']
```

### getLanguageObject(codes)

Returns a language object, or array of language objects, each containing the English name of a language, script, and region.

```javascript
const languageObject = getLanguageObject('en');
console.log(languageObject); // { "language": "English", "script": "", "region": "" }

const languageObjects = getLanguageObject(['zh-Hans', 'en-US']);
console.log(languageObjects); // [{ "language": "Chinese", "script": "Han (simplified)", "region": "" }, { "language": "English", "script": "", "region": "United States" }]
```

### getLanguageCode(languages)

Returns a BCP 47 language tag from a language name or an array of language names.

```javascript
const code = getLanguageCode('English');
console.log(code); // 'en'

const codes = getLanguageCode(['French', 'Spanish']);
console.log(codes); // ['fr', 'es']
```

### isSameLanguage(...codes)

Checks if a given set of codes are all equivalent to the same language. Returns a boolean.

```javascript
const same = isSameLanguage('en', 'en-US', 'en-GB');
console.log(same); // true
```

### getLanguageDirection(code)

Returns the text direction ('rtl' for right-to-left or 'ltr' for left-to-right) for a given language code.

```javascript
const direction = getLanguageDirection('ar');
console.log(direction); // 'rtl'

const direction2 = getLanguageDirection('en');
console.log(direction2); // 'ltr'
```

### isValidLanguageCode(code)

Checks if a given language-country-script code is valid. Returns a boolean indicating validity.

```javascript
const isValid = isValidLanguageCode('en-US');
console.log(isValid); // true

const isValid2 = isValidLanguageCode('invalid-code');
console.log(isValid2); // false
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
const result = await gt.translateReactChildren({ "type": "div", "props": { "children": "Hello, world" }}, 'es');
console.log(result.translation); // { "type": "div", "props": { "children": "Hola, mundo" } }
```

#### Parameters

- `requests` (Request[]): An array of request objects. Each request can be of type `translate`, `intl`, or `react`.

- **Translate Request**:
  - `type`: `'translate'`
  - `data`: An object containing:
    - `content` (string): The string content to be translated.
    - `targetLanguage` (string): The target language for the translation.
    - `metadata` (Record<string, any>): Additional metadata for the translation process.

- **Intl Request**:
  - `type`: `'intl'`
  - `data`: An object containing:
    - `content` (string): The string content to be translated.
    - `targetLanguage` (string): The target language for the translation.
    - `metadata` (Record<string, any>): Additional metadata for the translation process.

- **React Request**:
  - `type`: `'intl'`
  - `data`: An object containing:
    - `children` (object | string): The React children content to be translated.
    - `targetLanguage` (string): The target language for the translation.
    - `metadata` (Record<string, any>): Additional metadata for the translation process.

#### Returns

- A promise that resolves to an object containing the translated content, optional error information, and dictionary information for react and intl requests.

#### `bundleTranslation(requests: any[]): Promise<Array<any | null>>`

Bundles multiple requests and sends them to the server.

```javascript
const requests = [
    {
        type: "translate"
        data: {
            content: 'Hello', targetLanguage: 'es'
        }
    }
    {
        type: "translate"
        data: {
            content: 'Hello', targetLanguage: 'de'
        }
    }
    
];
const results = await gt.bundleTranslation(requests);
console.log(results); // [{ translation: "Hola", language: "es" }, { translation: "Hallo", language: "de" }]
```

#### Parameters

- `requests` (array): Array of requests to be processed and sent.

#### Returns

- A promise that resolves to an array of processed results.

## Utility Functions

### getLanguageDirection

Gets the writing direction for a given BCP 47 language code.

```javascript
import { getLanguageDirection } from 'generaltranslation';

const direction = getLanguageDirection('ar');
console.log(direction); // 'rtl'
```

#### Parameters

- `code` (string): The BCP 47 language code to check.

#### Returns

- The language direction ('ltr' for left-to-right or 'rtl' for right-to-left).

### isValidLanguageCode

Checks if a given BCP 47 language code is valid.

```javascript
import { isValidLanguageCode } from 'generaltranslation';

const isValid = isValidLanguageCode('en-US');
console.log(isValid); // true
```

#### Parameters

- `code` (string): The BCP 47 language code to validate.

#### Returns

- True if the BCP 47 code is valid, false otherwise.

### standardizeLanguageCode

Standardizes a BCP 47 language code to ensure correct formatting.

```javascript
import { standardizeLanguageCode } from 'generaltranslation';

const standardizedCode = standardizeLanguageCode('en-us');
console.log(standardizedCode); // 'en-US'
```

#### Parameters

- `code` (string): The BCP 47 language code to standardize.

#### Returns

- The standardized BCP 47 language code.

### getLanguageObject

Gets a language object from a BCP 47 language code.

```javascript
import { getLanguageObject } from 'generaltranslation';

const languageObject = getLanguageObject('en');
console.log(languageObject); // { language: 'English', script: '', region: '' }
```

#### Parameters

- `code` (string): The BCP 47 language code to convert.

#### Returns

- The language object or null if the BCP 47 code is invalid.

### getLanguageCode

Gets a BCP 47 language code from a language name.

```javascript
import { getLanguageCode } from 'generaltranslation';

const languageCode = getLanguageCode('English');
console.log(languageCode); // 'en'
```

#### Parameters

- `language` (string): The language name to convert.

#### Returns

- The corresponding BCP 47 language code.

### getLanguageName

Gets a language name from a BCP 47 language code.

```javascript
import { getLanguageName } from 'generaltranslation';

const languageName = getLanguageName('en');
console.log(languageName); // 'English'
```

#### Parameters

- `code` (string): The BCP 47 language code to convert.

#### Returns

- The corresponding language name.

### isSameLanguage

Checks if multiple BCP 47 language codes represent the same language.

```javascript
import { isSameLanguage } from 'generaltranslation';

const same = isSameLanguage('en', 'en-US', 'en-GB');
console

.log(same); // true
```

#### Parameters

- `codes` (string[]): The BCP 47 language codes to compare.

#### Returns

- True if all BCP 47 codes represent the same language, false otherwise.