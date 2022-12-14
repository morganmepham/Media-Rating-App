
import { getReviews } from '../../Search/js/create_review.js';
import { formatDate } from '../../Search/js/resources.js';

function addEventListeners(){
	const removeButtons = document.querySelectorAll('.remove-review-button')
	removeButtons.forEach(button => {
    button.addEventListener('click', removeItemFromGrid)
});


function removeItemFromGrid(e){
	removeFromData(e)
	const item = e.target.parentNode
	const grid = item.parentNode
	grid.removeChild(item)
}
function removeFromData(e){
	const itemID = e.target.parentNode.id
	let data = getReviews()
	let reviews = data.reviews
	let count = 0
	for(let i = 0; i <= reviews.length - 1; i++){
		console.log(count)
		count++
		if(reviews[i].id == itemID){
			reviews.splice([i], 1)
		}
	}
    const returnData = JSON.stringify(data)
    localStorage.setItem('data', returnData)
}

}
function displayReviews(e) {
	let reviews = getReviews();
	if (reviews.reviews) {
		reviews = reviews.reviews;
	}
	for (let i = reviews.length - 1; i >= 0; i--) {
        const entryDiv = document.createElement('div')

		const title = document.createElement('h3')
		title.innerHTML = reviews[i].title
		title.classList.add('review-item-title')
		title.classList.add('leader-info')
		entryDiv.appendChild(title)

		if (reviews[i].season) {
			const season = document.createElement('h3');
			season.innerHTML = `Season: ${reviews[i].season}`;
			season.classList.add('review-item-season')
			season.classList.add('leader-info')
			entryDiv.appendChild(season);
		}

		if (reviews[i].episode) {
			const episode = document.createElement('h3');
			episode.innerHTML = `Episode: ${reviews[i].episode}`;
			episode.classList.add('review-item-episode')
			episode.classList.add('leader-info')
			entryDiv.appendChild(episode);
		}

		const score = document.createElement('h3');
		score.innerHTML = `Score: ${reviews[i].score}/100`;
		score.classList.add('review-item-score')
		score.classList.add('leader-info')
		entryDiv.appendChild(score);

		const date = document.createElement('h3');
		let dateData = reviews[i].date;
		let formattedDate = formatDate(dateData);
		date.innerHTML = formattedDate;
		date.classList.add('review-item-date')
		date.classList.add('leader-info')
		entryDiv.appendChild(date);

		const media = document.createElement('h3')
		if(reviews[i].mediaType != undefined){
			let mediaType = reviews[i].mediaType
			media.innerHTML = mediaType
			media.classList.add('review-item-piece')
			media.classList.add('review-item-media')
			media.classList.add('leader-info')
			entryDiv.appendChild(media)
		}

		const note = document.createElement('p');
		if(reviews[i].note === ''){
			note.style.display = 'none'
		}
		note.innerHTML = `Note: ${reviews[i].note}`;
		note.classList.add('review-item-note')
		note.classList.add('leader-info')
		entryDiv.appendChild(note);

		const button = document.createElement('h3')
		button.classList.add('remove-review-button')
		button.classList.add('leader-info')
		button.innerHTML = 'Delete'
		entryDiv.appendChild(button)

		const reviewGrid = document.querySelector('.leaderboard-div');
		entryDiv.classList.add('review-item')
		entryDiv.style.order = 100 - reviews[i].score 

		entryDiv.id = reviews[i].id
		reviewGrid.appendChild(entryDiv);
	}
	e.preventDefault()
	addEventListeners()
}


window.addEventListener('load', displayReviews)