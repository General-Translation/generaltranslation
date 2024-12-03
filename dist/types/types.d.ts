export type VariableObject = {
    variable?: string;
    key: string;
};
export type Content = string | Array<string | VariableObject>;
export type ElementAsObject = {
    type: string;
    props: {
        'data-_gt'?: {
            id: number;
            [key: string]: any;
        };
        children?: ReactChildrenAsObject;
        [key: string]: any;
    };
};
export type ReactChildAsObject = string | ElementAsObject | VariableObject;
export type ReactChildrenAsObject = ReactChildAsObject | ReactChildAsObject[];
export type Update = {
    type: 'react';
    data: {
        children: any;
        metadata: Record<string, any>;
    };
} | {
    type: 'string';
    data: {
        content: Content;
        metadata: Record<string, any>;
    };
};
export type Request = {
    type: 'string';
    data: {
        content: Content;
        targetLocale: string;
        metadata: Record<string, any>;
    };
} | {
    type: 'react';
    data: {
        children: any;
        targetLocale: string;
        metadata: Record<string, any>;
    };
};
export type ContentTranslationResult = {
    translation: Content;
    locale: string;
    reference?: {
        id: string;
        key: string;
    };
};
export type ReactTranslationResult = {
    translation: ReactChildrenAsObject;
    locale: string;
    reference?: {
        id: string;
        key: string;
    };
};
