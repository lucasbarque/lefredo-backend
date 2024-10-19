module.exports = {
    printWidth: 80,
    tabWidth: 2,
    trailingComma: 'all',
    singleQuote: true,
    semi: true,
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
    importOrder: [
        '^@controllers/(.*)$',
        '^@services/(.*)$',
        '^@models/(.*)$',
        '^@inputs/(.*)$',
        '^[./]',
    ],
    importOrderParserPlugins: ['typescript', 'decorators-legacy'],
};
