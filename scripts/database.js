export const listOfCatalogsIds = [ 'tt0120737','tt0330373','tt0167260','tt0137523','tt5311514','tt0434409','tt0107120','tt0816692','tt0299172','tt0241527','tt0409459','tt1877830','tt0499549','tt2543164','tt0245429','tt0347149','tt0133093','tt5323662','tt4972582','tt1569923' ]

export const databaseCatalogs = {}

export function registerCatalog( catalog ){
    databaseCatalogs[catalog.catalogId] = catalog
}