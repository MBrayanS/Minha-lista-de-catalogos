import { databaseCatalogs, listOfCatalogsIds } from './database.js'
import { collectCatalog } from './api.js'
import { createCard } from './create-element-card.js'

export function loadCatalogs(){
    listOfCatalogsIds.forEach( id =>{ collectCatalog(id) })
    observerDatabaseCatalogs()
}

export function observerDatabaseCatalogs(){
    let catalogNotRead = listOfCatalogsIds.length

    for(let id in databaseCatalogs){
        const catalog = databaseCatalogs[id]

        if(!catalog.wasRead){
            catalog.wasRead = true
            createCard(catalog)
        } else catalogNotRead--
    }

    if(catalogNotRead > 0) requestAnimationFrame(observerDatabaseCatalogs)
}