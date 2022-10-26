import ApiConfig from './apiConfig.js'

function funcListCatalogs() {
    let listIdCatalogs = []
    let listCatalogs = {}
    let apiConfig = ApiConfig()
    
    function updateListCatalogs() {
        listIdCatalogs.forEach( ( catalogId ) => {
            let catalog = returnCatalog(catalogId)
            if( !catalog ){
                let apiKey = apiConfig.apiKey
                let urlMovie = `https://api.themoviedb.org/3/movie/${catalogId}?api_key=${apiKey}&language=pt-BR`
                
                getApiData(urlMovie,( dataCatalog )=>{
                    let urlCredits = `https://api.themoviedb.org/3/movie/${dataCatalog.imdb_id}/credits?api_key=${apiKey}&language=pt-BR`
                    
                    getApiData(urlCredits,( credits )=>{
                        dataCatalog.casts = credits.cast
                        dataCatalog.crews = credits.crew
                        
                        createCatalog(dataCatalog)
                    })
                })
            }
        })
    }

    function toExtractData(data){
        let poster = `https://image.tmdb.org/t/p/w500${data.poster_path}`
        let backdrop = `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
        let stars = data.vote_average.toFixed(1)
        let releaseDate = data.release_date
        let runtime = treatTime(data.runtime)
        let genres = ''
        let directors = ''
        let cast = ''
        
        for(let id = 0; id < data.genres.length; id++){
            let genre = data.genres[id]
            
            genres += `${genre.name}`
            if(id < data.genres.length-1) genres += ', '
        }
        
        let directorsList = data.crews.filter(crew => crew.job == 'Director')
        
        for(let id = 0; id < directorsList.length; id++){
            let person = directorsList[id]
            
            directors += person.name
            if(id < directorsList.length-1) directors += ', '
        }
        
        for(let id = 0; id < 10; id++ ){
            let actor = data.casts[id]
            cast += `${actor.name}`
            if(id < 9) cast += ', '
        }

        return {
            catalogId: data.imdb_id,
            title: data.title,
            overview: data.overview,
            poster,
            backdrop,
            stars,
            releaseDate,
            runtime,
            directors,
            cast,
            genres,
        }
    }
    
    function createCatalog(data){
        let catalog = toExtractData(data)

        addCatalog(catalog)
    }
    
    function treatTime(time){
        let hours = Math.trunc(time/60)
        let minutes = Math.trunc(time - hours*60)
        
        return `${hours} h ${minutes} min`
    }
    
    function addIdCatalog(catalogId){
        listIdCatalogs.push(catalogId)
    }
    
    function addCatalog(catalog){
        listCatalogs[`${catalog.catalogId}`] = catalog
    }
    
    function returnListCatalogs(){
        return listCatalogs
    }
    
    function returnListIdCatalogs(){
        return listIdCatalogs
    }
    
    function returnCatalog(catalogId){
        return listCatalogs[catalogId] || false
    }

    function getApiData(url,func){
        fetch(url)
        .catch( error => { console.error(error)} )
        .then(response => { return response.json() })
        .then(data => { if(data.success != false) func(data) })
    }
    
    return {
        returnCatalog,
        returnListCatalogs,
        returnListIdCatalogs,
        addIdCatalog,
        addCatalog,
        updateListCatalogs,
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


























function getApiDatas(catalogId){
    let apiKey = apiConfig.apiKey
    let url = `https://api.themoviedb.org/3/movie/${catalogId}/credits?api_key=${apiKey}&language=pt-BR`
    //let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${string}`
    
    fetch(url)
    .then(response => { return response.json() })
    .then(data => {
        for(let id of data.crew){
            if(id.job.includes('Write')) console.log(id)
        }
    })
    .catch( error => alert(error))
}

//getApiData('tt0133093')