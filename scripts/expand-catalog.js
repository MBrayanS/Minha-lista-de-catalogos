import { closeButtonClickEvent } from "./interactions.js"

export function expandCatalog( catalog ){
    createDivExtendCatalog(catalog)
    toggleDivBackgroundVisibility()
}

export function closeExpandCatalog(){
    $('.extend-catalog').remove()
    toggleDivBackgroundVisibility()
}

function toggleDivBackgroundVisibility(){
    $('.background').toggleClass('background--visible')
    $('body').toggleClass('body--scroll-disable')
}

function createDivExtendCatalog( catalog ){
    const divExtendCatalog = $('<div class="extend-catalog"></div>')
    
    divExtendCatalog.append(
        createSection(catalog),
        createBtnClose()
        )
    
        $('.background').append(divExtendCatalog)
    }

function createImg( image, title, imgClass ){
    return $(`<img class='${imgClass}' src='${image}' alt='${title}'>`)
}

function createSection( catalog ){
    const infoOfCatalog = $(`<div class='info'>`).append(
        createOverview(catalog),
        createDescription(catalog),
        createRemoveCatalog(catalog)
    )

    return $(`<section>`).append(
        infoOfCatalog,
        createImg( catalog.poster, catalog.title, 'poster' )
    )
}

function createOverview({ overview }){
    return $(`<div class='overview'>
        <h2>Sinopse:</h2>
        <p>${overview}</p>
    </div>`)
}

function createDescription({ runtime, genres, directors, releaseDate, cast }){
    return $(`<div class='description'>
        <li>
            <h3>Duração:</h3>
            <p>${runtime}</p>
        </li>
        <li>
            <h3>Gênero:</h3>
            <p>${genres}</p>
        </li>
        <li>
            <h3>Direção:</h3>
            <p>${directors}</p>
        </li>
        <li>
            <h3>Lançamento:</h3>
            <p>${releaseDate}</p>
        </li>
        <li>
            <h3>Elenco principal:</h3>
            <p>${cast}</p>
        </li>
    </div>`)
}

function createRemoveCatalog({ catalogId }){
    return $(`<button class="remove-catalog" id='${catalogId}'>Remover</button>`)
}

function createBtnClose(){
    const closeBtn = $('<button class="btn-close">')

    closeButtonClickEvent(closeBtn)

    return closeBtn
}