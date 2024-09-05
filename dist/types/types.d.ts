export type Variable = {
    variable?: string;
    key: string;
};
export type Content = string | Array<string | Variable>;
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
        targetLanguage: string;
        metadata: Record<string, any>;
    };
} | {
    type: 'react';
    data: {
        children: any;
        targetLanguage: string;
        metadata: Record<string, any>;
    };
};
