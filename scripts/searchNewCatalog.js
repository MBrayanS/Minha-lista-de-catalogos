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
        dataCatalogs.clearSummaryCatalogsList()
        document.querySelector('.search-catalog_results').innerHTML = ''
        dataCatalogs.searchCatalogs(text)
        
        askForResultOfSearch()
    }
    
    function askForResultOfSearch(){

        if(!dataCatalogs.returnSummaryCatalogsList()){
           requestAnimationFrame(askForResultOfSearch)
        }else{
            showFoundCatalogs()
        }
    }
    
    function showFoundCatalogs(){
        let searchCatalogsResults = document.querySelector('.search-catalog_results')
        let summaryCatalogsList = dataCatalogs.returnSummaryCatalogsList()

        for( let catalog of summaryCatalogsList ){
            if(!searchCatalogsResults.querySelector(`#${catalog.catalogId}`)) prepareElement(catalog)
        }

        if(summaryCatalogsList.lenght > 0) requestAnimationFrame(showFoundCatalogs)
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
        let id = clearId(catalog.id)
        dataCatalogs.addIdCatalog(id)
        dataCatalogs.updateListCatalogs()
        pageExpandedClose()
    }

    function clearId(id){
        return id.slice(3,id.lenght)
    }
    
    function createDivSearchCatalog(){
        let divSearchCatalog = document.createElement('div')
        
        divSearchCatalog.classList.add('search-catalog')
        divSearchCatalog.innerHTML = `
        <h1>Encontre novos catálogos</h1>
        <img class='btn-close' src='./img/close.png'>
        <div class='search-catalog_top'>
            <label class='search-bar'>
                <input type=text placeholder='Pesquisar' autofocus>
                <button>Pesquisar</button>
            </label>
            <div class='search-catalog_results'>
            </div>
        </div>`

        return divSearchCatalog
    }
}


