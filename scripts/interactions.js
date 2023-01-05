import { databaseCatalogs } from "./database.js"
import { expandCatalog } from "./expand-catalog.js"

export function cardButtonClickEvent( element ){
    element.click(({ target })=>{
        const catalog = databaseCatalogs[target.id]

        expandCatalog(catalog)
    })
}