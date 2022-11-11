import dataCatalogs from './list-catalogs.js'

<<<<<<< HEAD
let divCatalogs = document.querySelector('.page__center')
let addCatalogButton = document.querySelector('.add-catalog_btn')

addCatalogButton.addEventListener('click',searchCatalogExpaned)

function searchCatalogExpaned(){
    pageExpanded( createDivSearchCatalog() )

    let searchButton = document.querySelector('.search-bar').querySelector('button')
    let searchInput = document.querySelector('.search-bar').querySelector('input')

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

    let elementDiv = document.querySelector('.search-catalog_results')

    elementDiv.innerHTML = ''

    for( let id in summaryCatalogsList ){
        let catalog = summaryCatalogsList[id]
        createDivCatalog({
            div: elementDiv,
            btnText: 'Adicionar',
            catalog
        })
    }

    sweepElementCatalogs({
        elementDiv,
        handleClickButton: addCatalogForList,
        handleOverCatalog,
        handleOutCatalog
    })

}

function addCatalogForList(catalog){
    dataCatalogs.addIdCatalog(catalog.id)
    dataCatalogs.updateListCatalogs()
    pageExpandedClose()
    checkListCatalogs()
}

function createDivSearchCatalog(){
    return `
    <div class='search-catalog'>
        <h1>Encontre novos catálogos</h1>
        <button class='btn-close'>x</button>
        <div class='search-catalog_top'>
            <label class='search-bar'>
                <input type=text placeholder='Pesquisar'>
                <button>Pesquisar</button>
            </label>
            <div class='search-catalog_results'>
            </div>
=======
let divCatalog = document.querySelector('.page__center')

let buttonAddNewCatalog = document.querySelector('.add-catalog_btn')

buttonAddNewCatalog.addEventListener('click',addNewCatalog)

function addNewCatalog(){
    document.body.classList.add('body--scroll-disable')
    document.querySelector('.page-background').classList.add('page-background--visible')
    document.querySelector('.page-background').innerHTML = `
    <div class='search-new-catalog'>
        <h1>Encontre novos catálogos</h1>
        <div class='search-new-catalog_top'>
            <input type=text placeholder='Pesquisar'>
            <div class='search-new-catalog_result'>
            </div>
        </div>
    </div>
    `
}

checkListCatalogs()

function checkListCatalogs(){
    let listIdCatalogs = dataCatalogs.returnListIdCatalogs()
    let nCatalogNotFound = 0
    let addCatalogsList = []
    
    for( let id of listIdCatalogs ){
        let catalog = dataCatalogs.returnCatalog(id)

        if(!document.querySelector(`#${id}`) && !catalog){
            nCatalogNotFound ++
        }else addCatalogsList.push(catalog)
    }

    updateDivCatalogs(addCatalogsList)

    if(nCatalogNotFound > 0){
        setTimeout(checkListCatalogs,1)
    }else{
        //setTimeout(checkListCatalogs,10000)
        console.log('Update list')
    }
}

function updateDivCatalogs(listCatalogs){
    divCatalog.innerHTML = ''

    listCatalogs.forEach( catalog => addDivCatalog(catalog) )

    sweepElementCatalogs()
}

function addDivCatalog(catalog){
    divCatalog.innerHTML += `
    <div class='div__catalog' id='${catalog.catalogId}'>
        <div class='catalog__img'>
            <img id='img_${catalog.catalogId}' src='${catalog.poster}' alt='${catalog.title}'>
            <button class='catalog__button'>Ver mais</button>
        </div>
        <div class='catalog__bottom'>
            <p class='catalog__bottom__title'>${catalog.title}</p>
            <p class='catalog__bottom__stars'>${catalog.stars}<span> / 10</span></p>
>>>>>>> a797ed4b05874ac4397acba1d71317148ed0f36b
        </div>
    </div>
    `
}

<<<<<<< HEAD
checkListCatalogs()

function checkListCatalogs(){
    let listIdCatalogs = dataCatalogs.returnListIdCatalogs()
    let moviesOnHold = dataCatalogs.moviesOnHold()
    let nCatalogNotFound = 0
    let addCatalogsList = []

    for( let id of listIdCatalogs ){
        let catalog = dataCatalogs.returnCatalog(id)
        
        if(!document.querySelector(`#${id}`) && !catalog){
            nCatalogNotFound ++
        }else addCatalogsList.push(catalog)
    }

    updateDivCatalogs(addCatalogsList)

    if(nCatalogNotFound > 0 || moviesOnHold){
        setTimeout(checkListCatalogs,1)
    }else{
        setTimeout(checkListCatalogs,10000)
        console.log('Update list')
    }
}

function updateDivCatalogs(listCatalogs){
    divCatalogs.innerHTML = ''

    listCatalogs.forEach( catalog => {
        createDivCatalog({
            div: divCatalogs,
            btnText: 'Ver mais',
            catalog
        })
    })

    sweepElementCatalogs({
        elementDiv: divCatalogs,
        handleClickButton,
        handleOverCatalog,
        handleOutCatalog
    })
}

function createDivCatalog(params){
    let elementDiv = params.div
    let catalog = params.catalog
    let btnText = params.btnText

    elementDiv.innerHTML += `
    <div class='div__catalog' id='${catalog.catalogId}'>
        <div class='catalog__img'>
            <img id='img_${catalog.catalogId}' src='${catalog.poster}' alt='${catalog.title}'>
            <button class='catalog__button'>${btnText}</button>
        </div>
        <div class='catalog__bottom'>
            <p class='catalog__bottom__title'>${catalog.title}</p>
            <p class='catalog__bottom__stars'>${catalog.stars}<span> / 10</span></p>
        </div>
    </div>`
}

function sweepElementCatalogs(params){

    let listElementCatalogs = params.elementDiv.querySelectorAll('.div__catalog')
=======
function sweepElementCatalogs(){
    let listElementCatalogs = document.querySelectorAll('.div__catalog')
>>>>>>> a797ed4b05874ac4397acba1d71317148ed0f36b

    listElementCatalogs.forEach(( catalog )=>{
        let catalogButton = catalog.querySelector('.catalog__button')

        catalogButton.addEventListener('click', ()=> params.handleClickButton(catalog) )
        catalog.addEventListener('mouseover', ()=> params.handleOverCatalog(catalog) )
        catalog.addEventListener('mouseout', ()=> params.handleOutCatalog(catalog) )
    })
}

function handleOverCatalog( catalog ){
    let catalogImg = catalog.querySelector('img')
    let catalogButton = catalog.querySelector('button')

    catalogImg.classList.add('catalog__img--blur')
    catalogButton.classList.add('catalog__button--visible')
}

function handleOutCatalog( catalog ){
    let catalogImg = catalog.querySelector('img')
    let catalogButton = catalog.querySelector('button')

    catalogImg.classList.remove('catalog__img--blur')
    catalogButton.classList.remove('catalog__button--visible')
}

function handleClickButton( catalog ){
    let catalogId = catalog.id
    let movie = dataCatalogs.returnCatalog(catalogId)

    pageExpanded( catalogExpanded(movie) ) 
}

function catalogExpanded( catalog ){
<<<<<<< HEAD
    return `
=======
    document.body.classList.add('body--scroll-disable')
    document.querySelector('.page-background').classList.add('page-background--visible')
    document.querySelector('.page-background').innerHTML = `
>>>>>>> a797ed4b05874ac4397acba1d71317148ed0f36b
        <div class='catalog-expanded'>
            <div class='catalog-expanded__top'>
                <img src='${catalog.backdrop}' alt='${catalog.title}'>
                <button class='btn-close'>x</button>
                <div class='top__title'>
                    <h1>${catalog.title}</h1>
                </div>
            </div>
            <div class='catalog-expanded__description'>
                <div class='description__overview'>
                    <span>Overview:</span>
                    <p>${catalog.overview}</p>
                </div>
                <div class='description__info'>
                    <h1>Detalhes:</h1>
                    <span>Duração:</span> <p>${catalog.runtime}</p>
                    <span>Gênero:</span> <p>${catalog.genres}</p>
                    <span>Direção:</span> <p>${catalog.directors}</p>
                    <span>Data de lançamento:</span> <p>${catalog.releaseDate}</p>
                    <span>Elenco:</span> <p>${catalog.cast}</p>
                    <p></p>
                </div>
            </div>
        </div>
    `
}

function pageExpanded(content){
    let pageBackground = document.querySelector('.page-background')

    document.body.classList.add('body--scroll-disable')
    pageBackground.classList.add('page-background--visible')
    pageBackground.innerHTML = content
    pageBackground.querySelector('.btn-close').addEventListener('click',pageExpandedClose)
}

function pageExpandedClose(){
    document.querySelector('.page-background').classList.remove('page-background--visible')
    document.body.classList.remove('body--scroll-disable')
    document.querySelector('.page-background').innerHTML = ''
}

<<<<<<< HEAD
function treatId(id){
    return id.slice(3,id.lenght)
}


//@import url('https://fonts.googleapis.com/css2?family=Concert+One&display=swap');
=======
>>>>>>> a797ed4b05874ac4397acba1d71317148ed0f36b
