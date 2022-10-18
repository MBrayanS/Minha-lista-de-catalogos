import dataCatalogs from './list-movie.js'

let divCatalog = document.querySelector('.page__movie')

setTimeout(()=>{
    updateListCatalogs()
    sweepElementCatalogs()
},150)

function updateListCatalogs(){
    let listCatalogs = dataCatalogs.returnListCatalogs()

    divCatalog.innerHTML = ''

    for( let movieId in listCatalogs ){
        addCatalogsMovie(listCatalogs[movieId])
    }
}

function addCatalogsMovie(catalog){
    divCatalog.innerHTML += `
    <div class='movie__catalog'>
        <div class='catalog__img'>
            <img id='${catalog.movieId}' src='${catalog.poster}' alt='${catalog.title}'>
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
    let movieId = catalog.querySelector('img').id
    let movie = dataCatalogs.returnCatalog(movieId)

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









function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


