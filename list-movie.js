import ApiConfig from './apiConfig.js'

function funcListCatalogs() {
    let listMovies = []
    let listCatalogs = {}
    let apiConfig = ApiConfig()
    
    function addMovie(movieId){
        listMovies.push(movieId)
    }

    function updateListCatalogs() {
        listMovies.forEach( ( movieId ) => {
            let movie = returnCatalog(movieId)
            if( !movie ){
                let apiKey = apiConfig.apiKey
                let urlMovie = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR`

                getApiData(urlMovie,( dataMovie )=>{
                    let urlCredits = `https://api.themoviedb.org/3/movie/${dataMovie.imdb_id}/credits?api_key=${apiKey}&language=pt-BR`
                
                    getApiData(urlCredits,( credits )=>{
                        dataMovie.casts = credits.cast
                        dataMovie.crews = credits.crew

                        createCatalog(dataMovie)
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
            movieId: data.id,
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
    
    function addCatalog(catalog){
        listCatalogs[`${catalog.movieId}`] = catalog
    }
    
    function returnListCatalogs(){
        return listCatalogs
    }
    
    function returnCatalog(movieId){
        return listCatalogs[movieId] || false
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
        addMovie,
        updateListCatalogs,
    }
}

let dataCatalogs = funcListCatalogs()

dataCatalogs.addMovie('tt0120737')
dataCatalogs.addMovie('tt0330373')
dataCatalogs.addMovie('tt0167260')
dataCatalogs.addMovie('tt0137523')
dataCatalogs.addMovie('tt5311514')
dataCatalogs.addMovie('tt0434409')
dataCatalogs.addMovie('tt0472181')
dataCatalogs.addMovie('tt0816692')
dataCatalogs.addMovie('tt0299172')
dataCatalogs.addMovie('tt0241527')
dataCatalogs.addMovie('tt0409459')
dataCatalogs.addMovie('tt1877830')
dataCatalogs.addMovie('tt0499549')
dataCatalogs.addMovie('tt2543164')
dataCatalogs.addMovie('tt0245429')
dataCatalogs.addMovie('tt0347149')
dataCatalogs.addMovie('tt0133093')
dataCatalogs.addMovie('tt5323662')
dataCatalogs.addMovie('tt4972582')
dataCatalogs.addMovie('tt1569923')

dataCatalogs.updateListCatalogs()

export default dataCatalogs


























function getApiDatas(movieId){
    let apiKey = apiConfig.apiKey
    let url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=pt-BR`
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
















//dataCatalogs.createCatalogMovie({
//    name: 'Meu malvado favorito',
//    year: 2010,
//    img: 'https://m.media-amazon.com/images/I/61-8UaTgUGL._AC_SL1000_.jpg',
//    synopsis: 'Um homem que adora todas as coisas diabólicas, o supervilão Gru traça um plano para roubar a lua. Rodeado de um exército de pequenos ajudantes e seu arsenal de armas e máquinas de guerra, Gru se prepara para destruir quem atravessar seu caminho. Mas ele não esperava pelo seu maior desafio: três adoráveis órfãs que querem ter Gru como pai.',
//    stars: 10,
//})
//
//dataCatalogs.createCatalogMovie({
//    name: 'Your name',
//    year: 2016,
//    img: 'https://br.web.img3.acsta.net/pictures/17/10/04/19/01/4966397.jpg',
//    synopsis: 'Mitsuha é a filha do prefeito de uma pequena cidade, mas sonha em tentar a sorte em Tóquio. Taki trabalha em um restaurante em Tóquio e deseja largar o seu emprego. Os dois não se conhecem, mas estão conectados pelas imagens de seus sonhos.',
//    stars: 10,
//})
//
//dataCatalogs.createCatalogMovie({
//    name: 'Avatar',
//    year: 2009,
//    img: 'https://upload.wikimedia.org/wikipedia/pt/b/b0/Avatar-Teaser-Poster.jpg?20100903190501',
//    synopsis: 'No exuberante mundo alienígena de Pandora vivem os Na"vi, seres que parecem ser primitivos, mas são altamente evoluídos. Como o ambiente do planeta é tóxico, foram criados os avatares, corpos biológicos controlados pela mente humana que se movimentam livremente em Pandora. Jake Sully, um ex-fuzileiro naval paralítico, volta a andar através de um avatar e se apaixona por uma Na"vi. Esta paixão leva Jake a lutar pela sobrevivência de Pandora.',
//    stars: 10,
//})
//
//dataCatalogs.createCatalogMovie({
//    name: 'Smarf',
//    year: 2011,
//    img: 'http://2.bp.blogspot.com/-XKrpqbke-uc/TlWJorQ1xjI/AAAAAAAAG4g/P1rU_unjDJA/s1600/thesmurfs_02.jpg',
//    synopsis: 'Gargamel quer capturar os Smurfs para tê-los como amuletos. Assustados, liderados pelo Smurf Desastrado, os pequeninos entram numa gruta proibida. Como é Lua cheia, eles acabam transportados por um portal para o Central Park, em Nova York. Lá, Desastrado, Ranzinza, Smurfette, Gênio, Papai Smurf e Valente encontram refúgio com um casal.',
//    stars: 8,
//})
//
//dataCatalogs.createCatalogMovie({
//    name: 'Watchmen',
//    year: 2009,
//    img: 'https://upload.wikimedia.org/wikipedia/pt/b/b7/Watchmen_poster.jpg',
//    synopsis: 'Quando um de seus antigos colegas é assassinado, o vigilante mascarado Rorschach descobre um plano para matar e desacreditar todos os super-heróis do passado e do presente. À medida que ele se reconecta com sua antiga legião de combate ao crime, um grupo desorganizado de super-heróis aposentados, dentre os quais somente um possui verdadeiros poderes, Rorschach vislumbra uma ampla e perturbadora conspiração que está ligada ao passado deles e a catastróficas consequências para o futuro.',
//    stars: 10,
//})
//
//dataCatalogs.createCatalogMovie({
//    name: 'Harry potter',
//    year: 2001,
//    img: 'https://br.web.img3.acsta.net/medias/nmedia/18/95/59/60/20417256.jpg',
//    synopsis: 'Harry Potter é um garoto órfão que vive infeliz com seus tios, os Dursleys. Ele recebe uma carta contendo um convite para ingressar em Hogwarts, uma famosa escola especializada em formar jovens bruxos. Inicialmente, Harry é impedido de ler a carta por seu tio, mas logo recebe a visita de Hagrid, o guarda-caça de Hogwarts, que chega para levá-lo até a escola. Harry adentra um mundo mágico que jamais imaginara, vivendo diversas aventuras com seus novos amigos, Rony Weasley e Hermione Granger.',
//    stars: 10,
//})
//
//dataCatalogs.createCatalogMovie({
//    name: 'The Batman',
//    year: 2022,
//    img: 'https://br.web.img3.acsta.net/pictures/22/03/02/19/26/3666027.jpg',
//    synopsis: 'Após dois anos espreitando as ruas como Batman, Bruce Wayne se encontra nas profundezas mais sombrias de Gotham City. Com poucos aliados confiáveis, o vigilante solitário se estabelece como a personificação da vingança para a população.',
//    stars: 10,
//})
//
//dataCatalogs.createCatalogMovie({
//    name: 'Nem que a vaca tussa',
//    year: 2004,
//    img: 'https://br.web.img3.acsta.net/medias/nmedia/18/87/12/14/19872231.jpg',
//    synopsis: 'Após um aviso de despejo, três vacas tentam capturar um bandido para receber a recompensa e, assim, ajudar a dona da fazenda.',
//    stars: 10,
//})
//
//dataCatalogs.createCatalogMovie({
//    name: 'Bela e a fera',
//    year: 2017,
//    img: 'https://br.web.img3.acsta.net/pictures/17/01/09/12/22/442219.jpg',
//    synopsis: 'Moradora de uma pequena aldeia francesa, Bela tem o pai capturado pela Fera e decide entregar sua vida ao estranho ser em troca da liberdade do progenitor. No castelo, ela conhece objetos mágicos e descobre que a Fera é na verdade um príncipe que precisa de amor para voltar à forma humana.',
//    stars: 9.5,
//})
//
//dataCatalogs.createCatalogMovie({
//    name: 'O senhor dos aneis',
//    year: 2001,
//    img: 'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/92/91/32/20224832.jpg',
//    synopsis: 'Em uma terra fantástica e única, um hobbit recebe de presente de seu tio um anel mágico e maligno que precisa ser destruído antes que caia nas mãos do mal. Para isso, o hobbit Frodo tem um caminho árduo pela frente, onde encontra perigo, medo e seres bizarros. Ao seu lado para o cumprimento desta jornada, ele aos poucos pode contar com outros hobbits, um elfo, um anão, dois humanos e um mago, totalizando nove seres que formam a Sociedade do Anel.',
//    stars: 10,
//})
//
//dataCatalogs.createCatalogMovie({
//    name: 'V de vingança',
//    year: 2005,
//    img: 'https://br.web.img2.acsta.net/pictures/210/506/21050637_20131017235623573.jpg',
//    synopsis: 'Após uma guerra mundial, a Inglaterra é ocupada por um governo fascista e vive sob um regime totalitário. Na luta pela liberdade, um vigilante, conhecido apenas como V, utiliza-se de táticas terroristas para enfrentar os opressores da sociedade. V salva uma jovem chamada Evey da polícia secreta e encontra nela uma nova aliada em busca de liberdade e justiça para o seu país.',
//    stars: 10,
//})
//
//dataCatalogs.createCatalogMovie({
//    name: 'Interestelar',
//    year: 2014,
//    img: 'https://upload.wikimedia.org/wikipedia/pt/3/3a/Interstellar_Filme.png',
//    synopsis: 'As reservas naturais da Terra estão chegando ao fim e um grupo de astronautas recebe a missão de verificar possíveis planetas para receberem a população mundial, possibilitando a continuação da espécie. Cooper é chamado para liderar o grupo e aceita a missão sabendo que pode nunca mais ver os filhos. Ao lado de Brand, Jenkins e Doyle, ele seguirá em busca de um novo lar.',
//    stars: 10,
//})