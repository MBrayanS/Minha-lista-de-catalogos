import dataCatalogs from './list-catalogs.js'

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
        </div>
    </div>
    `
}

function sweepElementCatalogs(){
    let listElementCatalogs = document.querySelectorAll('.div__catalog')

    listElementCatalogs.forEach(( catalog )=>{
        let catalogButton = catalog.querySelector('.catalog__button')

        catalogButton.addEventListener('click', ()=>{ handleClickButton(catalog) } )
        catalog.addEventListener('mouseover', ()=>{ handleOverCatalog(catalog) } )
        catalog.addEventListener('mouseout', ()=>{ handleOutCatalog(catalog) } )
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

    catalogExpanded(movie)
}

function catalogExpanded( catalog ){
    document.body.classList.add('body--scroll-disable')
    document.querySelector('.page-background').classList.add('page-background--visible')
    document.querySelector('.page-background').innerHTML = `
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
    document.querySelector('.btn-close').addEventListener('click',catalogExpandedClose)
}

function catalogExpandedClose(){
    document.querySelector('.page-background').classList.remove('page-background--visible')
    document.body.classList.remove('body--scroll-disable')
    document.querySelector('.page-background').innerHTML = ''
}

