export type StringWithVariables = string | {
    variable?: string;
    key: string;
} | Array<string | {
    variable?: string;
    key: string;
}>;
