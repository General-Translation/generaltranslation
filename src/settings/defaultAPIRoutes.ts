const defaultAPIRoutes = {
    "translateBatch": "/v1/translate/batch",
    "translateReact": "/v1/translate/react",
    "translateContent": "/v1/translate/content",
    "updateProjectTranslations": "/v1/project/translations/update",
    "getProjectLocales": "/v1/project/locales"
} as const;

export default defaultAPIRoutes;