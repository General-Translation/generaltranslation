export type Update = {
    type: 'react';
    data: {
        children: object | string;
        targetLanguages?: string[];
        metadata: Record<string, any>;
    };
} | {
    type: 'intl';
    data: {
        content: string;
        targetLanguages?: string[];
        metadata: Record<string, any>;
    };
};
