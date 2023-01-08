import { cardButtonClickEvent } from "./interactions.js"

const sectionCatalogList = $('.catalog-list')

export function createCard( catalog ){
    const card = $(`<div class='card-catalog'>`)
    const img = $(`<img src='${catalog.poster}'>`)
    const button = $(`<button id='${catalog.catalogId}' class="card__button">Ver mais</button>`)
    const div = $('<div class="card__bottom">')

    div.append($(`<h2 class="bottom__title">${catalog.title}</h2>`))
    div.append($(`<p class="bottom__stars">${catalog.stars}<span> / 10 TMDB</span></p>`))

    card.append(img, button, div)

    cardButtonClickEvent(button)

    sectionCatalogList.append(card)
}
