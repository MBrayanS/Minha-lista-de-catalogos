import { registerCatalog } from "./database.js"

function factoryCatalog(data){
    this.catalogId = data.imdb_id
    this.title = data.title
    this.releaseDate = data.release_date
    this.overview = data.overview
    this.runtime = treateTime(data.runtime)
    this.genres = getGenres(data)
    this.directors = getDirectors(data.credits) 
    this.cast = getCast(data.credits)
    this.poster = getImage(data.poster_path)
    this.backdrop = getImage(data.backdrop_path)
    this.stars = data.vote_average.toFixed(1)
    this.wasRead = false
}

export function treateData( data ){
    const catalog = new factoryCatalog(data)

    registerCatalog(catalog)
}

function treateTime( time ){
    const hours = Math.trunc(time/60)
    const minutes = Math.trunc(time - hours*60)
    
    return `${hours}h ${minutes}min`
}

function getGenres({ genres }){
    return assembleString(genres)
}

function getDirectors({ crew }){
    const directors = crew.filter( ({ job }) => job == 'Director')
    
    return assembleString(directors)
}

function assembleString( array ){
    let string = ''

    array.forEach( ( { name }, index ) => {
        string += index < array.length-1? `${name}, ` : name
    })

    return string
}

function getCast({ cast }){
    const reduceCast = cast.slice(0, 10)

    return assembleString(reduceCast)
}

function getImage( path ){
    return `https://image.tmdb.org/t/p/w500${path}`
}