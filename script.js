import dataCatalogs from './list-movie.js'

let divCatalog = document.querySelector('.page__movie')

updateListCatalogs()

function updateListCatalogs(){
    let listIdCatalogs = dataCatalogs.returnListIdCatalogs()
    let nMovies = listIdCatalogs.length
    let updateList = []
    
    
    for( let catalogId of listIdCatalogs ){
        let catalog = dataCatalogs.returnCatalog(catalogId)
        if(!document.querySelector(`#${catalogId}`)){
            if(catalog) updateList.push(catalog)
        }else {
            updateList.push(catalog)
            nMovies--
        }
    }
    
    divCatalog.innerHTML = ''

    for(let catalog of updateList){
        addCatalogsMovie(catalog)
    }

    sweepElementCatalogs()

    if(nMovies > 1){
        setTimeout(updateListCatalogs,1)
    }else{
        setTimeout(updateListCatalogs,10000)
        console.log('Update list')
    }
}

function addCatalogsMovie(catalog){
    divCatalog.innerHTML += `
    <div class='movie__catalog' id='${catalog.catalogId}'>
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
    let listElementCatalogs = document.querySelectorAll('.movie__catalog')

    listElementCatalogs.forEach(( catalog )=>{
        let catalogButton = catalog.querySelector('.catalog__button')

        catalogButton.addEventListener('click', ()=>{ handleClickButton(catalog) } )
        catalog.addEventListener('mouseover', ()=>{ handleOverCatalog(catalog) } )
        catalog.addEventListener('mouseout', ()=>{ handleOutCatalog(catalog) } )
    })
}

function handleOverCatalog(catalog){
    let catalogImg = catalog.querySelector('img')
    let catalogButton = catalog.querySelector('button')

    catalogImg.classList.add('catalog__img--blur')
    catalogButton.classList.add('catalog__button--visible')
}

function handleOutCatalog(catalog){
    let catalogImg = catalog.querySelector('img')
    let catalogButton = catalog.querySelector('button')

    catalogImg.classList.remove('catalog__img--blur')
    catalogButton.classList.remove('catalog__button--visible')
}

function handleClickButton( catalog ){
    let catalogId = catalog.querySelector('img').id
    let movie = dataCatalogs.returnCatalog(catalogId)

    catalogExpanded(movie)
}

function catalogExpanded(catalog){
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
