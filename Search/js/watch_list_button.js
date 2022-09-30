const watchListButton = document.querySelector('.watch-list-check_span')
watchListButton.addEventListener('click', watchList)




function watchList(){
    const isAdded = checkIfAdded()
    if(isAdded === false){
        addToWatchListStorage()
        watchListButton.style.backgroundColor = 'green'
    }else{
        removeFromWatchListStorage()
        watchListButton.style.backgroundColor = '#FFF'
    }
}

export function checkIfAdded(){
    const data = getData()
    let isAdded = false
    const watch_later = data.watch_later
    const itemTitle = document.querySelector('.item-title').innerHTML
    for(let i = 0; i < watch_later.length; i++){
        if(watch_later[i].title === itemTitle){
            isAdded = true
        }
    }
    return isAdded
}

function addToWatchListStorage(){
    const data = getData()
    const watchList = data.watch_later
    const newWatchLater = new WatchLater(getTitle(), getMediaType(), getGenres(), getImgPath())
    watchList.push(newWatchLater)
    console.log(data)
    const returnData = JSON.stringify(data)
    localStorage.setItem('data', returnData)
}

function removeFromWatchListStorage(){
    const data = getData()
    const watchList = data.watch_later
    const itemTitle = document.querySelector('.item-title').innerHTML
    for(let i = 0; i < watchList.length; i++){
        if(watchList[i].title === itemTitle){
            watchList.splice([i], 1)
        }
    }
    const returnData = JSON.stringify(data)
    localStorage.setItem('data', returnData)
}

function getData(){
    let data = localStorage.getItem('data')
    let dataParse = JSON.parse(data)
    let reviews = dataParse
    return reviews
}

class WatchLater{
    constructor(title, mediaType, genres, imgPath){
        this.title = title
        this.mediaType = mediaType
        this.genres = genres
        this.imgPath = imgPath
    }
}


function getTitle(){
    const itemTitle = document.querySelector('.item-title')
    const title = itemTitle.innerHTML
    return title
}
function getMediaType(){
    let mediaType = null
    if(document.querySelector('.item-seasons').style.display === 'block'){
        mediaType = 'TV'
    }else{
        mediaType = 'Movie'
    }
    return mediaType
}

function getGenres(){
    const genresElem = document.querySelector('.item-genres')
    const genres = genresElem.innerHTML
    return genres
}
function getImgPath(){
    const imgPath = document.querySelector('.item-img').src
    return imgPath
}