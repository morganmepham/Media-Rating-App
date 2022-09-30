const viewAllHistory = document.querySelector('.history-all-button')
viewAllHistory.addEventListener('click', fillHistoryPopUp)

function fillHistoryPopUp(){
    setHistoryTitle()
    displayReviews()
}
function setHistoryTitle(){
    const itemTitle = document.querySelector('.item-title').innerHTML
    const historyTitle = document.querySelector('.review-grid-title')
    historyTitle.innerHTML = `${itemTitle} Review History`
}
import { getReviews } from './create_review.js'
import { formatDate } from './resources.js';

const test = document.querySelector('.review-grid-title')
test.addEventListener('click', fillHistoryPopUp)


function displayReviews(){
    console.log('m')
    let reviews = getReviews()
    if(reviews.reviews){
        reviews = reviews.reviews
    }
    for(let i = reviews.length - 1; i >= 0; i--){
        console.log(reviews[i])
        if(reviews[i].title === document.querySelector('.item-title').innerHTML){
            const noReviews = document.querySelector('.no-reviews')
            noReviews.style.display = 'none'
            const entryDiv = document.createElement('div')

            if(reviews[i].season){
                const season = document.createElement('h3')
                season.innerHTML = `Season: ${reviews[i].season}`
                season.classList.add('review-item-season')
                season.classList.add('review-item-piece')
                entryDiv.appendChild(season)
            }

            if(reviews[i].episode){
                const episode = document.createElement('h3')
                episode.innerHTML = `Episode: ${reviews[i].episode}`
                episode.classList.add('review-item-episode')
                episode.classList.add('review-item-piece')
                entryDiv.appendChild(episode)
            }

            const score = document.createElement('h3')
            score.innerHTML = `Score: ${reviews[i].score}/100`
            score.classList.add('review-item-score')
            score.classList.add('review-item-piece')
            entryDiv.appendChild(score)

            const date = document.createElement('h3')
            let dateData = reviews[i].date
            let formattedDate = formatDate(dateData)
            date.innerHTML = formattedDate
            date.classList.add('review-item-date')
            date.classList.add('review-item-piece')
            entryDiv.appendChild(date)


            const note = document.createElement('p')
            note.innerHTML = `Note: ${reviews[i].note}`
            note.classList.add('review-item-note')
            note.classList.add('review-item-piece')
            entryDiv.appendChild(note)
            entryDiv.classList.add('review-grid-item')

            const reviewGrid = document.querySelector('.review-grid')
            reviewGrid.appendChild(entryDiv)
        }
    }
    const historyPopUp = document.querySelector('.item-review-pop-up')
    historyPopUp.style.display = 'flex'
}

const closeHistoryButton = document.querySelector('.exit-history-button')
closeHistoryButton.addEventListener('click', closeHistory)
function closeHistory(){
    const historyTab = document.querySelector('.item-review-pop-up')
    historyTab.style.display = 'none'

    const noReviews = document.querySelector('.no-reviews')
    noReviews.style.display = 'block'

    const reviews = document.querySelectorAll('.review-grid-item')
    reviews.forEach(review => {
        const reviewGrid = document.querySelector('.review-grid')
        reviewGrid.removeChild(review)
    });
}