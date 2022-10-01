import { setElements } from './resources.js'
import { displayLastReview, wipeLastReview } from './create_review.js'

const searchBar = document.querySelector('.search-input_bar')

searchBar.addEventListener('input', getOptions)
    

window.addEventListener('load', () => searchBar.value = '')
// api 

async function getData(query){
    const apiKey = 'fe04b6e96b0d5acb257458f989b43f0b'
    const fullRequestKey = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`

    try{
        const response = await fetch(fullRequestKey)
        if(response.ok){
            let result = await response.json()
            return result
        }
    }catch(err){
        console.log(err)
    }
}

function getOptions(){
    let currentSearch = searchBar.value
    if(currentSearch == ''){
        removeOptions()
        return
    }else{
        getData(currentSearch).then(res => showOptions(res)).then(() => checkResults()).then(() => add())
    }
}

function removeOptions(){
    let items = document.querySelectorAll('.result-div')
    let count = items.length
    for(let i = 0; i < count; i++){
        items[i].remove()
    }
}

function showOptions(res){
    document.querySelector('.results-display_grid').style.display = 'grid'
    let items = document.querySelectorAll('.result-div')
    if(items.length > 0){
        removeOptions()
    }
    let results = res.results
    let count = (results.length < 5) ? results.length : 5
    for(let i = 0; i < count; i++){
        if(results[i]){

            if(results[i].media_type === 'person'){
                count++
                continue;
            }
            let mediaType = results[i].media_type
            let div = document.createElement('div')
            div.classList.add('result-div')
            document.querySelector('.results-display_grid').appendChild(div)
    
            let img = document.createElement('img')
            let posterPath = results[i].poster_path;
            let imgPath = `https://image.tmdb.org/t/p/original/${posterPath}`
            img.src = imgPath
            img.classList.add('poster-img')
            img.classList.add(mediaType)
            img.classList.add(results[i].id)
            img.classList.add('clickable')
            if(posterPath != null){
                div.appendChild(img)
            }
    
            let titleElem = document.createElement('h3')
            titleElem.classList.add('title-elem')
            titleElem.classList.add(mediaType)
            titleElem.classList.add(results[i].id)
            titleElem.classList.add('clickable')
            if(results[i].title){
                let titleText = results[i].title
                let date = results[i].release_date
                let year = date.substring(0, 4)
                let dateText = `(${year})`
                let fullText = titleText + ' ' + dateText
                titleElem.innerHTML = fullText
            }else if(!results[i].title){
                let titleText = results[i].name
                let date = results[i].first_air_date
                let year = date.substring(0, 4)
                let dateText = `(${year})`
                let fullText = titleText + ' ' + dateText
                titleElem.innerHTML = fullText
            }
            div.appendChild(titleElem)
    
            
    
            let type = mediaType.charAt(0).toUpperCase() + mediaType.slice(1)
            let mediaElem = document.createElement('h3')
            mediaElem.classList.add('media-elem')
            mediaElem.classList.add(mediaType)
            mediaElem.classList.add(results[i].id)
            mediaElem.classList.add('clickable')
            mediaElem.innerHTML = type
            div.classList.add(mediaType)
            div.classList.add(results[i].id)
            div.classList.add('clickable')
            div.appendChild(mediaElem)
        }
    }

}


async function checkResults(){
    const resultDisplays = document.querySelectorAll('.result-div')
    if(resultDisplays.length < 5){
        let results2 = await backUpData()
        results2 = results2.results
        let difference = 5 - resultDisplays.length
        for(let i = 0; i < difference; i++){
            if(results2[i].media_type === 'person'){
                count++
                continue;
            }
            let mediaType = results2[i].media_type
            let div = document.createElement('div')
            div.classList.add('result-div')
            document.querySelector('.results-display_grid').appendChild(div)
    
            let img = document.createElement('img')
            let posterPath = results2[i].poster_path;
            let imgPath = `https://image.tmdb.org/t/p/original/${posterPath}`
            img.src = imgPath
            img.classList.add('poster-img')
            img.classList.add(mediaType)
            img.classList.add(results2[i].id)
            img.classList.add('clickable')
            if(posterPath != null){
                div.appendChild(img)
            }
    
            let titleElem = document.createElement('h3')
            titleElem.classList.add('title-elem')
            titleElem.classList.add(mediaType)
            titleElem.classList.add(results2[i].id)
            titleElem.classList.add('clickable')
            if(results2[i].title){
                let titleText = results2[i].title
                let date = results2[i].release_date
                let year = date.substring(0, 4)
                let dateText = `(${year})`
                let fullText = titleText + ' ' + dateText
                titleElem.innerHTML = fullText
            }else if(!results2[i].title){
                let titleText = results2[i].name
                let date = results2[i].first_air_date
                let year = date.substring(0, 4)
                let dateText = `(${year})`
                let fullText = titleText + ' ' + dateText
                titleElem.innerHTML = fullText
            }
            div.appendChild(titleElem)
    
            
    
            let type = mediaType.charAt(0).toUpperCase() + mediaType.slice(1)
            let mediaElem = document.createElement('h3')
            mediaElem.classList.add('media-elem')
            mediaElem.classList.add(mediaType)
            mediaElem.classList.add(results2[i].id)
            mediaElem.classList.add('clickable')
            mediaElem.innerHTML = type
            div.classList.add(mediaType)
            div.classList.add(results2[i].id)
            div.classList.add('clickable')
            div.appendChild(mediaElem)
        }
    }
}

async function backUpData(){
    let query2 = document.querySelector('.search-input_bar').value
    const apiKey = 'fe04b6e96b0d5acb257458f989b43f0b'
    const fullRequestKey = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${query2}&page=2&include_adult=false`

    try{
        const response = await fetch(fullRequestKey)
        if(response.ok){
            let result = await response.json()
            return result
        }
    }catch(err){
        console.log(err)
    }
}


function add(){
    const results = document.querySelectorAll('.clickable')
    results.forEach(result => {
        result.addEventListener('click', master)
    });
}

function openInfo(){
    document.querySelector('section').style.display = 'none'
    document.querySelector('.item-pop-up').style.display = 'flex'

}
function closeInfo(){
    document.querySelector('section').style.display = 'flex'
    document.querySelector('nav').style.display = 'flex'
    document.querySelector('.item-pop-up').style.display = 'none'
    document.querySelector('.review-rating').value = ''
    document.querySelector('.review-notes ').value = ''
    wipeLastReview()
}
document.querySelector('.exit-button').addEventListener('click', closeInfo)


// populate item page

function master(e){
    openInfo()
    getItemData(e).then(itemData => setElements(itemData)).then(() => displayLastReview())
    e.preventDefault()
}

async function getItemData(e){
    const api1 = 'https://api.themoviedb.org/3/'
    const mediaType = e.target.classList[1]
    const id = e.target.classList[2]
    const api2 = '?api_key=fe04b6e96b0d5acb257458f989b43f0b&language=en-US'
    const apiFull = `${api1}${mediaType}/${id}${api2}`
    const itemResp = await fetch(apiFull)

    if(itemResp.ok){
       const itemData = await itemResp.json()

       return itemData
    }
}


