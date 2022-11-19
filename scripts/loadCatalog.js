import dataCatalogs from './list-catalogs.js'
import searchNewCatalog from './searchNewCatalog.js'

searchNewCatalog({
    pageExpanded,
    pageExpandedClose,
    createDivCatalog,
    catalogInteraction,
    dataCatalogs
})

let divCatalogs = document.querySelector('.page__center')

checkListCatalogs()

function checkListCatalogs(){
    let listCatalogs = dataCatalogs.returnListCatalogs()
    
    for( let id in listCatalogs ){
        let catalog = listCatalogs[id]

        if(!document.querySelector(`#${id}`)) prepareElement(catalog)
    }

    requestAnimationFrame(checkListCatalogs)
}

function prepareElement(catalog){
    let newDivCatalog = createDivCatalog({
        btnText: 'Ver mais',
        catalog
    })

    catalogInteraction({ div: newDivCatalog })

    divCatalogs.appendChild(newDivCatalog)
}

function createDivCatalog(params){
    let catalog = params.catalog
    let btnText = params.btnText
    let newDivCatalog = document.createElement('div')

    newDivCatalog.classList.add('div__catalog')
    newDivCatalog.id = catalog.catalogId
    newDivCatalog.innerHTML += `
    <div class='catalog__img'>
        <img id='img_${catalog.catalogId}' src='${catalog.poster}' alt='${catalog.title}'>
        <button class='catalog__button'>${btnText}</button>
    </div>
    <div class='catalog__bottom'>
        <p class='catalog__bottom__title'>${catalog.title}</p>
        <p class='catalog__bottom__stars'>${catalog.stars}<span> / 10</span></p>
    </div>`

    return newDivCatalog
}

function catalogInteraction(params){
    let funcClickButton = params.handleClickButton || handleClickButton 
    let funcOverCatalog = params.handleOverCatalog || handleOverCatalog 
    let funcOutCatalog = params.handleOutCatalog || handleOutCatalog 
    let divCatalog = params.div
    let catalogButton = divCatalog.querySelector('.catalog__button')
    
    catalogButton.addEventListener('click', ()=> funcClickButton(divCatalog) )
    divCatalog.addEventListener('mouseover', ()=> funcOverCatalog(divCatalog) )
    divCatalog.addEventListener('mouseout', ()=> funcOutCatalog(divCatalog) )
}

function handleOverCatalog( divCatalog ){
    let catalogImg = divCatalog.querySelector('img')
    let catalogButton = divCatalog.querySelector('button')

    catalogImg.classList.add('catalog__img--blur')
    catalogButton.classList.add('catalog__button--visible')
}

function handleOutCatalog( divCatalog ){
    let catalogImg = divCatalog.querySelector('img')
    let catalogButton = divCatalog.querySelector('button')

    catalogImg.classList.remove('catalog__img--blur')
    catalogButton.classList.remove('catalog__button--visible')
}

function handleClickButton( divCatalog ){
    let catalogId = divCatalog.id
    let catalog = dataCatalogs.returnCatalog(catalogId)

    pageExpanded( catalogExpanded(catalog), true ) 
}

function catalogExpanded( catalog ){
    let divCatalogExpaned = document.createElement('div')

    divCatalogExpaned.classList.add('catalog-expanded')
    divCatalogExpaned.innerHTML = `
        <div class='catalog-expanded'>
            <div class='catalog-expanded__top'>
                <img class='top__img' src='${catalog.backdrop}' alt='${catalog.title}'>
                <div class='top__title'>
                    <h1>${catalog.title}</h1>
                </div>
                <img class='btn-close' src='./img/close.png'>
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
                <div class='description__remove'>
                    <button id='${catalog.catalogId}' class='description__btn-remove'>Remover</button>
                </div>
            </div>
        </div>
    `

    return divCatalogExpaned
}

function pageExpanded(content,btnRemove){
    let pageBackground = document.querySelector('.page-background')

    document.body.classList.add('body--scroll-disable')
    pageBackground.classList.add('page-background--visible')
    pageBackground.appendChild(content)
    pageBackground.querySelector('.btn-close').addEventListener('click',pageExpandedClose)

    if(btnRemove) pageBackground.querySelector('.description__btn-remove').addEventListener('click',removeCatalog)
}

function pageExpandedClose(){
    document.querySelector('.page-background').classList.remove('page-background--visible')
    document.body.classList.remove('body--scroll-disable')
    document.querySelector('.page-background').innerHTML = ''
}

function removeCatalog({ target }){
    let id = target.id
    let divCatalog = document.querySelector(`#${id}`)

    pageExpandedClose()

    dataCatalogs.removeCatalog(id)

    divCatalogs.removeChild(divCatalog)
}
