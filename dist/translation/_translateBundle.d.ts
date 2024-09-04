export type Request = {
    type: 'string';
    data: {
        content: string;
        targetLanguage: string;
        metadata: Record<string, any>;
    };
} | {
    type: 'react';
    data: {
        content: string;
        targetLanguage: string;
        metadata: Record<string, any>;
    };
};
