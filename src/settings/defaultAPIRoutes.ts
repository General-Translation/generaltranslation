const defaultAPIRoutes = {
    "translateBatch": "/v1/translate/batch",
    "translateReact": "/v1/translate/react",
    "translateContent": "/v1/translate/content",
    "updateProjectDictionary": "/v1/project/dictionary/update",
    "getProjectLocales": "/v1/project/locales"
} as const;

export default defaultAPIRoutes;