export type Request = {
    type: 'translate';
    data: {
        content: string;
        targetLanguage: string;
        metadata: Record<string, any>;
    };
} | {
    type: 'intl';
    data: {
        content: string;
        targetLanguage: string;
        metadata: Record<string, any>;
    };
} | {
    type: 'react';
    data: {
        children: object | string;
        targetLanguage: string;
        metadata: Record<string, any>;
    };
};
