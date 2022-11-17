import ApiConfig from './apiConfig.js'

function funcListCatalogs() {
    let listIdWaitMovies = {}
    let listCatalogs = {}
    let apiConfig = ApiConfig()
    let resultOfSearch = {}
    
    function updateListCatalogs() {
        for( let id in listIdWaitMovies){
            let catalog = returnCatalog(id)

            if( !catalog ){
                let apiKey = apiConfig.apiKey
                let urlMovie = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR`
                
                getApiData(urlMovie,( date )=>{
                    let urlCredits = `https://api.themoviedb.org/3/movie/${date.imdb_id}/credits?api_key=${apiKey}&language=pt-BR`
                    
                    getApiData(urlCredits,( credits )=>{
                        removeMovieWaiting(id)
                        let catalog = createCatalog(date, credits)

                        addCatalog(catalog)
                    })
                })
            }
        }
        if(moviesOnHold) setTimeout(updateListCatalogs,500)
    }

    function removeMovieWaiting(id){
        delete listIdWaitMovies[id]
    }

    function createCatalog(date, credits){
        let poster = `https://image.tmdb.org/t/p/w500${date.poster_path}`
        let backdrop = `https://image.tmdb.org/t/p/w500${date.backdrop_path}`
        let stars = date.vote_average.toFixed(1)
        let releaseDate = date.release_date
        let runtime = treatTime(date.runtime)
        let catalog =  {
            catalogId: date.imdb_id,
            title: date.title,
            overview: date.overview,
            genres: returnGenres(date),
            directors: returnDirectors(credits),
            cast: returnCast(credits),
            poster,
            backdrop,
            stars,
            releaseDate,
            runtime,
        }

        return catalog
    }

    function returnGenres(date){
        let genres = ''

        for(let id = 0; id < date.genres.length; id++){
            let genre = date.genres[id]
            
            genres += `${genre.name}`
            if(id < date.genres.length-1) genres += ', '
        }

        return genres
    }

    function returnDirectors(credits){
        let directors = ''
        let directorsList = credits.crew.filter(crew => crew.job == 'Director')

        for(let id = 0; id < directorsList.length; id++){
            let person = directorsList[id]
            
            directors += person.name
            if(id < directorsList.length-1) directors += ', '
        }

        return directors
    }

    function returnCast(credits){
        let cast = ''

        for(let id = 0; id < credits.cast.length; id++ ){
            if(id > 10) continue
            let actor = credits.cast[id]
            cast += `${actor.name} (${actor.character})`
            if(id < 9) cast += ', '
        }

        return cast
    }

    function treatTime(time){
        let hours = Math.trunc(time/60)
        let minutes = Math.trunc(time - hours*60)
        
        return `${hours} h ${minutes} min`
    }
    
    function addIdCatalog(catalogId){
        if(!listIdWaitMovies.id){
            listIdWaitMovies[catalogId] = catalogId
        }else alert()
    }
    
    function addCatalog(catalog){
        listCatalogs[`${catalog.catalogId}`] = catalog
    }

    function removeCatalog(id){
        delete listCatalogs[id]
    }
    
    function returnListCatalogs(){
        return listCatalogs
    }
    
    function returnListIdCatalogs(){
        return Object.keys(listCatalogs)
    }

    function returnCatalog(catalogId){
        return listCatalogs[catalogId] || false
    }

    function moviesOnHold(){
        if (Object.keys(listIdWaitMovies).length > 0){
            return true
        }
        return false
    }

    function getApiData(url,func){
        fetch(url)
        .catch( error => { console.error(error) } )
        .then(response => { return response.json() })
        .then(date => { if(date.success != false) func(date) })
    }
    
    function searchCatalogs(text){
        let apiKey = apiConfig.apiKey
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${text}&language=pt-BR`

        getApiData(url, updateResultOfSearch)
    }
    
    function updateResultOfSearch({ results }){
        resultOfSearch = {}

        results.forEach( result => {
            let id = `id_${result.id}`
            result.id = id
            resultOfSearch[id] = result 
        })
    }

    function returnSummaryCatalogsList(){
        let summaryCatalogsList = []

        for(let id in resultOfSearch){
            let result = resultOfSearch[id]
            let catalog = returnSummaryCatalog(result)

            if(!validationSummanyCatalog(catalog)) continue
            summaryCatalogsList.push(catalog)
        }

        if(Object.keys(summaryCatalogsList).length == 0) return false
        return summaryCatalogsList
    }

    function validationSummanyCatalog(catalog){
        if(catalog.poster.includes(null)) return false
        return true
    }

    function returnSummaryCatalog(result){
        return {
            catalogId: result.id,
            title: result.title,
            poster: `https://image.tmdb.org/t/p/w500${result.poster_path} `,
            stars: result.vote_average.toFixed(1)
        }
    }

    function clearSummaryCatalogsList(){
        resultOfSearch = {}
    }

    return {
        returnCatalog,
        returnListCatalogs,
        returnListIdCatalogs,
        returnSummaryCatalogsList,
        clearSummaryCatalogsList,
        updateListCatalogs,
        addIdCatalog,
        addCatalog,
        removeCatalog,
        searchCatalogs,
        moviesOnHold
    }    
}    

let dataCatalogs = funcListCatalogs()

dataCatalogs.addIdCatalog('tt0120737')
dataCatalogs.addIdCatalog('tt0330373')
dataCatalogs.addIdCatalog('tt0167260')
dataCatalogs.addIdCatalog('tt0137523')
dataCatalogs.addIdCatalog('tt5311514')
dataCatalogs.addIdCatalog('tt0434409')
dataCatalogs.addIdCatalog('tt0107120')
dataCatalogs.addIdCatalog('tt0816692')
dataCatalogs.addIdCatalog('tt0299172')
dataCatalogs.addIdCatalog('tt0241527')
dataCatalogs.addIdCatalog('tt0409459')
dataCatalogs.addIdCatalog('tt1877830')
dataCatalogs.addIdCatalog('tt0499549')
dataCatalogs.addIdCatalog('tt2543164')
dataCatalogs.addIdCatalog('tt0245429')
dataCatalogs.addIdCatalog('tt0347149')
dataCatalogs.addIdCatalog('tt0133093')
dataCatalogs.addIdCatalog('tt5323662')
dataCatalogs.addIdCatalog('tt4972582')
dataCatalogs.addIdCatalog('tt1569923')

dataCatalogs.updateListCatalogs()

export default dataCatalogs