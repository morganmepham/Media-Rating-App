const filterElem = document.querySelector('.filter-select')
filterElem.addEventListener('change', filter)

function filter(){
    wipeBoard()
    const select = document.querySelector('.filter-select')

    if(select.value === 'All'){
        displayAll()
    }else if(select.value === 'Tv'){
        displayTv()
    }else if(select.value === 'Movies'){
        displayMovie()
    }
}

function displayAll(){
    const items = document.querySelectorAll('.watchlist-item')
    items.forEach(item => {
        item.style.display = 'grid'
    });
}
function displayTv(){
    const items = document.querySelectorAll('.watchlist-item')
    items.forEach(item => {
        let children = item.childNodes
        for(let i = 0; i < children.length - 1; i++){
            if(children[i].innerHTML === '(TV)'){
                item.style.display = 'grid'
            }
        }
    });
}

function displayMovie(){
    const items = document.querySelectorAll('.watchlist-item')
    items.forEach(item => {
        let children = item.childNodes
        for(let i = 0; i < children.length - 1; i++){
            if(children[i].innerHTML === '(Movie)'){
                item.style.display = 'grid'
            }
        }
    });
}

function wipeBoard(){
    const items = document.querySelectorAll('.watchlist-item')
    items.forEach(item => {
        item.style.display = 'none'
    });
}