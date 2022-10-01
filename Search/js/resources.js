import { checkIfAdded } from "./watch_list_button.js"
export function setElements(itemData){
    const isAdded = checkIfAdded()
    if(isAdded){
        document.querySelector('.watch-list-check_span').style.backgroundColor = 'green'
    }else{
        document.querySelector('.watch-list-check_span').style.backgroundColor = '#fff'
    }

    //Title
    displayTitle(itemData)
    //Image
    displayImg(itemData)
    //Rating
    displayRating(itemData)
    //Genres
    displayGenres(itemData)
    //Disc
    displayDisc(itemData)
    // Status
    displayStatus(itemData)

    //TV or movie
    //run time
    displayRuntime(itemData)
    //Seasons
    displaySeasons(itemData)
    //Episodes
    displayEpisodes(itemData)
    //first air date
    displayFirstAir(itemData)
    // last air date
    displayLastAir(itemData)

    //Movie
    //budget
    displayBudget(itemData)
    //revenue
    displayRevenue(itemData)
    //release date
    displayReleaseDate(itemData)
    //tagline
    displayTagline(itemData)
    //review
    displayReview(itemData)
    document.querySelector('.review-date').valueAsDate = new Date();
}



function displayTitle(itemData){
    let title = document.querySelector('.item-title')
    if(itemData.title){
        title.innerHTML = itemData.title
    }else{
        title.innerHTML = itemData.name
    }
}

function displayImg(itemData){
    let image = document.querySelector('.item-img')
    let posterPath = itemData.poster_path
    image.src = `https://image.tmdb.org/t/p/original/${posterPath}`
}

function displayRating(itemData){
    let rating = document.querySelector('.item-average-rating')
    let score = itemData.vote_average
    score = score.toFixed(2)
    rating.innerHTML = `${score}/10 Ave. Rating`
}

function displayGenres(itemData){
    const genres = document.querySelector('.item-genres')
    let genreArray = []
    for(let genre of itemData.genres){
        genreArray.push(genre.name)
    }
    let genreString = ''
    for(let i = 0; i < genreArray.length; i++){
        genreString += ', ' + genreArray[i]
    }
    genreString = genreString.substring(1)
    genres.innerHTML = genreString
}
function displayDisc(itemData){
    const disc = document.querySelector('.item-disc')
    disc.innerHTML = itemData.overview
}

function displayStatus(itemData){
    const status = document.querySelector('.item-status')
    status.innerHTML = `Status: ${itemData.status}`
}

function displayRuntime(itemData){
    const runTime = document.querySelector('.item-runtime')
    if(itemData.episode_run_time){
        runTime.innerHTML = `Ave. Runtime: ${itemData.episode_run_time} Minutes`
    }else if(itemData.runtime){
        runTime.innerHTML = `Runtime: ${itemData.runtime} Minutes`
    }
}

function displaySeasons(itemData){
    const seasonsEps = document.querySelector('.item-seasons')
    if(itemData.number_of_seasons){
        seasonsEps.style.display = 'block'
        let seasons = itemData.number_of_seasons
        seasonsEps.innerHTML = `Seasons: ${seasons}`
    }else{
        seasonsEps.style.display = 'none'
    }
}

function displayEpisodes(itemData){
    const episodesNum = document.querySelector('.item-episodes')
    if(itemData.number_of_episodes){
        episodesNum.style.display = 'block'
        let episodes = itemData.number_of_episodes
        episodesNum.innerHTML = `Total Episodes: ${episodes}`
    }else{
        episodesNum.style.display = 'none'
    }
}

function displayFirstAir(itemData){
    const firstAir = document.querySelector('.item-first-airdate')
    if(itemData.first_air_date){
        firstAir.style.display = 'block'
        firstAir.innerHTML = `First aired: ${itemData.first_air_date}`
    }else{
        firstAir.style.display = 'none'
    }
}

function displayLastAir(itemData){
    const lastAir = document.querySelector('.item-last-airdate')
    if(itemData.last_air_date){
        lastAir.style.display = 'block'
        lastAir.innerHTML = `Last aired: ${itemData.last_air_date}`
    }else{
        lastAir.style.display = 'none'
    }

}

function displayBudget(itemData){
    const budget = document.querySelector('.item-budget')
    if(itemData.budget){
        budget.style.display = 'block'
        budget.innerHTML = `Budget: $${itemData.budget.toLocaleString()}`
    }else{
        budget.style.display = 'none'
    }
}

function displayRevenue(itemData){
    const revenue = document.querySelector('.item-revenue')
    if(itemData.revenue){
        revenue.style.display = 'block'
        revenue.innerHTML = `Revenue: $${itemData.revenue.toLocaleString()}`
    }else{
        revenue.style.display = 'none'
    }
}

function displayReleaseDate(itemData){
    const releaseDate = document.querySelector('.item-release-date')
    if(itemData.release_date){
        releaseDate.style.display = 'block'
        releaseDate.innerHTML = `Release: ${itemData.release_date}`
    }else{
        releaseDate.style.display = 'none'
    }
}

function displayTagline(itemData){
    const tagline = document.querySelector('.item-tagline')
    if(itemData.title && !itemData.title.length === ''){
        tagline.style.display = 'block'
        tagline.innerHTML = `Tag: ${itemData.tagline}`
    }
    else{
        tagline.style.display = 'none'
    }
}

function displayReview(itemData){
    const seasonOpt = document.querySelector('.review-season')
    const episodeOpt = document.querySelector('.review-episode')
    if(itemData.title){
        seasonOpt.style.display = 'none'
        episodeOpt.style.display = 'none'
    }else{
        seasonOpt.style.display = 'block'
        episodeOpt.style.display = 'block'
    }
}

export function formatDate(date){
    let year = date.substring(0, 4)
    let month = date.substring(5, 7)
    let day = date.substring(8, 10)
    let formattedDate = `${day}/${month}/${year}`
    return formattedDate
}