export type Variable = {
    variable?: string;
    id?: string | number;
    key: string
}

export type Content = string | Array<string | Variable>;

export type JsxElement = {
    type: string,
    props: {
        'data-_gt'?: {
            id: number
            [key: string]: any
        }
        children?: JsxChildren
        [key: string]: any
    }
}

export type JsxChild = string | JsxElement | Variable;

export type JsxChildren = JsxChild | JsxChild[];

export type Update = {
    type: 'content';
    data: {
        source: Content,
        metadata: Record<string, any>
    };
} | {
    type: 'jsx';
    data: {
        source: JsxChildren,
        metadata: Record<string, any>
    };
};

export type Request = {
    type: 'content';
    data: {
        source: Content;
        targetLocale: string;
        metadata: Record<string, any>
    }
} | {
    type: 'jsx';
    data: {
        source: JsxChildren;
        targetLocale: string;
        metadata: Record<string, any>
    }
};

export type ContentTranslationResult = {
    translation: Content,
    locale: string,
    reference?: {
        id: string,
        key: string
    }
}

export type JsxTranslationResult = {
    translation: JsxChildren,
    locale: string,
    reference?: {
        id: string,
        key: string
    }
}

export type TranslationError = {
    error: string,
    code: 400 | 403 | 408 | 500
}