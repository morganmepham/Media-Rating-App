const filterElem = document.querySelector('.filter-select')
filterElem.addEventListener('change', filter)

function filter(){
    wipeBoard()
    const select = document.querySelector('.filter-select')

    if(select.value === 'All'){
        displayAll()
    }else if(select.value === 'Seasons (only)'){
        displaySeasons()
    }else if(select.value === 'Seasons & Episodes'){
        displaySeasonsAndEpisodes()
    }else if(select.value === 'All Movies'){
        displayAllMovies()
    }else if(select.value === 'All Tv'){
        displayAllTv()
    }
}

function wipeBoard(){
    const items = document.querySelectorAll('.review-item')
    items.forEach(item => {
        item.style.display = 'none'
    });
}

import { getReviews } from '../../Search/js/create_review.js'


const test = document.querySelector('.nav-item_watch')
test.addEventListener('click', filter)

function displaySeasons(){
    wipeBoard()
    const items = document.querySelectorAll('.review-item')
    items.forEach(item => {
        let children = item.childNodes
        for(let i = 0; i < children.length - 1; i++){
            if(children[i].classList.contains('review-item-season')){
                item.style.display = 'grid'
            }
            if(children[i].classList.contains('review-item-episode')){
                item.style.display = 'none'
            }
        }
    });
}

function displayAll(){
    const items = document.querySelectorAll('.review-item')
    items.forEach(item => {
        item.style.display = 'grid'
    });
}

function displaySeasonsAndEpisodes(){
    wipeBoard()
    const items = document.querySelectorAll('.review-item')
    items.forEach(item => {
        let children = item.childNodes
        for(let i = 0; i < children.length; i++){
            if(children[i].classList.contains('review-item-season') ){
                item.style.display = 'grid'
            }
        }
    });
}

function displayAllMovies(){
    wipeBoard()
    const items = document.querySelectorAll('.review-item')
    items.forEach(item => {
        let children = item.childNodes
        for(let i = 0; i < children.length; i++){
            if(children[i].classList.contains('review-item-media') ){
                if(children[i].innerHTML === 'Movie'){
                    item.style.display = 'grid'
                }
            }
        }
    });
}

function displayAllTv(){
    wipeBoard()
    const items = document.querySelectorAll('.review-item')
    items.forEach(item => {
        let children = item.childNodes
        for(let i = 0; i < children.length; i++){
            if(children[i].classList.contains('review-item-media') ){
                if(children[i].innerHTML === 'Tv'){
                    item.style.display = 'grid'
                }
            }
        }
    });
}