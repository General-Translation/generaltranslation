const defaultAPIRoutes = {
    "translateBatch": "/v1/translate/batch",
    "translateReact": "/v1/translate/react",
    "translateContent": "/v1/translate/content",
    "updateProjectDictionary": "/v1/project/dictionary/update",
    "getProjectLanguages": "/v1/project/languages"
} as const;

export default defaultAPIRoutes;