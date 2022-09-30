// Collect form data
export function displayLastReview(){
    let reviews = getReviews()
    if(reviews.length === undefined){
        reviews = reviews.reviews
    }
    for(let i = reviews.length -1; i >= 0; i--){
        let title = document.querySelector('.item-title').innerHTML
        if(reviews[i].title === title){
            let lastReviewDate = document.querySelector('.last-review-date')
            lastReviewDate.innerHTML = `Date: ${reviews[i].date}`

            let lastReviewSeason = document.querySelector('.last-review-season')
            if(reviews[i].season != '' && reviews[i].season != undefined){
                lastReviewSeason.style.display = 'block'
                lastReviewSeason.innerHTML = `Season: ${reviews[i].season}`
            }else{
                lastReviewSeason.style.display = 'none'
            }

            let lastReviewEpisode = document.querySelector('.last-review-episode')
            if(reviews[i].episode != '' && reviews[i].episode != undefined){
                lastReviewEpisode.style.display = 'block'
                lastReviewEpisode.innerHTML = `Episode: ${reviews[i].episode}`
            }else{
                lastReviewEpisode.style.display = 'none'
            }
            
            let lastReviewScore = document.querySelector('.last-review-score')
            lastReviewScore.innerHTML = `Score: ${reviews[i].score}/100`
            
            break;
        }
    }
}

export function wipeLastReview(){
    let date = document.querySelector('.last-review-date')
    date.innerHTML = ''

    let score = document.querySelector('.last-review-score')
    score.innerHTML = ''

    let note = document.querySelector('.last-review-note')
    note.innerHTML = ''

    let season = document.querySelector('.last-review-season')
    season.innerHTML = ''

    let episode = document.querySelector('.last-review-episode')
    episode.innerHTML = ''
}

if(localStorage.getItem('data') === null){
    function start(){
        let data = {
            reviews:[]
        }
        data = JSON.stringify(data)
        localStorage.setItem('data', data)
    }
    start()
}

let log = console.log
const submitButton = document.querySelector('.review-submit')
if(submitButton){
    submitButton.addEventListener('click', createReview)
}

class Review{
    constructor(title, date, score, note){
        this.title = title
        this.date = date
        this.score = score
        this.note = note
    }
}

class TvReview extends Review{
    constructor (title, date, score, note, season, episode){
        super(title, date, score, note)
        this.season = season
        this.episode = episode
    }
}
function createReview(){
    const seasonDisplay = document.querySelector('.review-season')
    let review
    if(seasonDisplay.style.display === 'block'){
        review = new TvReview(getTitle(), getDate(), getScore(), getNotes(), getSeason(), getEpisode())
    }else{
        review = new Review(getTitle(), getDate(), getScore(), getNotes())
    }
    let reviews = getReviews()
    console.log(reviews)
    if(!reviews.reviews){
        reviews.push(review)
    }else{
        reviews.reviews.push(review)
    }
    const returnData = JSON.stringify(reviews)
    localStorage.setItem('data', returnData)
    displayLastReview()
}
export function getReviews(){
    let data = localStorage.getItem('data')
    let dataParse = JSON.parse(data)
    let reviews = dataParse
    return reviews
}


function getTitle(){
    const itemTitle = document.querySelector('.item-title')
    const title = itemTitle.innerHTML
    return title
}
function getDate(){
    const reviewDate = document.querySelector('.review-date')
    const date = reviewDate.value
    return date
}
function getSeason(){
    const seasonInput = document.querySelector('.review-season')
    const season = seasonInput.value
    return season
}
function getEpisode(){
    const episodeInput = document.querySelector('.review-episode')
    const episode = episodeInput.value
    return episode
}
function getScore(){
    const scoreInput = document.querySelector('.review-rating')
    const score = scoreInput.value
    return score
}
function getNotes(){
    const notesInput = document.querySelector('.review-notes')
    const note = notesInput.value
    return note
}


