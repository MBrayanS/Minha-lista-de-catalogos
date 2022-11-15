export default (functions)=>{
    let dataCatalogs = functions.dataCatalogs
    let pageExpanded = functions.pageExpanded
    let pageExpandedClose = functions.pageExpandedClose
    let createDivCatalog = functions.createDivCatalog
    let catalogInteraction = functions.catalogInteraction
    let addCatalogButton = document.querySelector('.add-catalog_btn')

    addCatalogButton.addEventListener('click',searchCatalogExpaned)

    function searchCatalogExpaned(){
        pageExpanded( createDivSearchCatalog() )

        let searchBar = document.querySelector('.search-bar')
        let searchButton = searchBar.querySelector('button')
        let searchInput = searchBar.querySelector('input')
    
        searchButton.addEventListener('click',()=>{ if(searchInput.value != '') handleSearchCatalog(searchInput.value) })
        searchInput.addEventListener('keydown',({ key })=>{ if(key == 'Enter' &&  searchInput.value != '') handleSearchCatalog(searchInput.value) })
    }

    function handleSearchCatalog(text){
        dataCatalogs.searchCatalogs(text)
    
        askForResultOfSearch()
    }
    
    function askForResultOfSearch(){
        let summaryCatalogsList = dataCatalogs.returnSummaryCatalogsList()
    
        if(!summaryCatalogsList){
            setTimeout(askForResultOfSearch, 1)
        }else {
            showFoundCatalogs(summaryCatalogsList)
        }
    }
    
    function showFoundCatalogs(summaryCatalogsList){
        
        for( let id in summaryCatalogsList ){
            let catalog = summaryCatalogsList[id]
            prepareElement(catalog)
        }
    }
    
    function prepareElement(catalog){
        let searchCatalogsResults = document.querySelector('.search-catalog_results')
        let newDivCatalog = createDivCatalog({
            btnText: 'Adicionar',
            catalog
        })

        catalogInteraction({
            div: newDivCatalog,
            handleClickButton: addCatalogForList,
        })
        
        searchCatalogsResults.appendChild(newDivCatalog)
    }
    
    function addCatalogForList(catalog){
        dataCatalogs.addIdCatalog(catalog.id)
        dataCatalogs.updateListCatalogs()
        pageExpandedClose()
    }
    
    function createDivSearchCatalog(){
        let divSearchCatalog = document.createElement('div')
        
        divSearchCatalog.classList.add('search-catalog')
        divSearchCatalog.innerHTML = `
        <h1>Encontre novos catálogos</h1>
        <button class='btn-close'>x</button>
        <div class='search-catalog_top'>
            <label class='search-bar'>
                <input type=text placeholder='Pesquisar'>
                <button>Pesquisar</button>
            </label>
            <div class='search-catalog_results'>
            </div>
        </div>`

        return divSearchCatalog
    }
}


