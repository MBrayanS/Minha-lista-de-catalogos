import { treateData } from './catalog-constructor.js'

const API_KEY = '2300200a67b8a2d25b4c537363aeee61'

export function collectCatalog( id ){
    const urlCatalog = gerateUrlForInfo(id)
    
    requestApi( urlCatalog ).then(data => {
        const urlCredits = gerateUrlCredits(data)

        requestApi( urlCredits ).then( credits => {
            data.credits = credits

            treateData(data)
        })
    })
}

async function requestApi( url ){
    try {
        const response = await fetch(url)
        return await response.json()
    } 
    catch { error => console.error(error) }
}

function gerateUrlForInfo( id ){
    return `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`
}

function gerateUrlCredits({ imdb_id }){
    return `https://api.themoviedb.org/3/movie/${imdb_id}/credits?api_key=${API_KEY}&language=pt-BR`
} 