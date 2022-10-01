import { getReviews } from '../../Search/js/create_review.js'

function addEventListeners(){
    const removeButtons = document.querySelectorAll('.remove-from-watchlist')
    removeButtons.forEach(button => {
        button.addEventListener('click', removeButton)
    });
}
function displayWatchList(){
    const data = getReviews()
    let watchList = data.watch_later
    for(let i = watchList.length -1 ; i >= 0 ; i--){
        const watchListDiv = document.querySelector('.watchlist-div')

        const entryDiv = document.createElement('div')
        entryDiv.classList.add('watchlist-item')

        const image = document.createElement('img')
        image.src = watchList[i].imgPath
        image.classList.add('watchlist-img')
        entryDiv.appendChild(image)

        const title = document.createElement('h3')
        title.innerHTML = `${watchList[i].title}`
        title.classList.add('watchlist-title')
        entryDiv.appendChild(title)

        const mediaType = document.createElement('h3')
        mediaType.innerHTML = `(${watchList[i].mediaType})`
        mediaType.classList.add('watchlist-media')
        entryDiv.appendChild(mediaType)

        const genres = document.createElement('h3')
        genres.innerHTML = watchList[i].genres
        genres.classList.add('watchlist-genres')
        entryDiv.appendChild(genres)

        const buttonDiv = document.createElement('div')
        buttonDiv.classList.add('exit-div')
        const button = document.createElement('div')
        button.classList.add('exit-button')
        button.classList.add('remove-from-watchlist')
        buttonDiv.appendChild(button)
        entryDiv.appendChild(buttonDiv)

        watchListDiv.appendChild(entryDiv)
    }
    addEventListeners()
}


window.addEventListener('load', displayWatchList)


function removeButton(e){
    removeFromWatchList(e)
    const item = e.target.parentNode
    const container = item.parentNode
    const grid = container.parentNode
    grid.removeChild(container)
}


function removeFromWatchList(e){
    const targetParent = e.target.parentNode
    const container = targetParent.parentNode 
    const children = container.children
    
    const title = children[1].innerHTML
    const data = getReviews()
    const watchList = data.watch_later
    for(let i = 0; i <= watchList.length - 1; i++){
        if(watchList[i].title === title){
            watchList.splice([i], 1)
        }
    }
    const returnData = JSON.stringify(data)
    localStorage.setItem('data', returnData)
}