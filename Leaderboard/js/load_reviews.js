

import { getReviews } from '../../Search/js/create_review.js';
import { formatDate } from '../../Search/js/resources.js';
function displayReviews(e) {
	let reviews = getReviews();
	if (reviews.reviews) {
		reviews = reviews.reviews;
	}
	console.log(reviews)
	for (let i = reviews.length - 1; i >= 0; i--) {
        const entryDiv = document.createElement('div')

		const title = document.createElement('h3')
		title.innerHTML = reviews[i].title
		title.classList.add('review-item-title')
		entryDiv.appendChild(title)

		if (reviews[i].season) {
			const season = document.createElement('h3');
			season.innerHTML = `Season: ${reviews[i].season}`;
			season.classList.add('review-item-season')
			entryDiv.appendChild(season);
		}

		if (reviews[i].episode) {
			const episode = document.createElement('h3');
			episode.innerHTML = `Episode: ${reviews[i].episode}`;
			episode.classList.add('review-item-episode')
			entryDiv.appendChild(episode);
		}

		const score = document.createElement('h3');
		score.innerHTML = `Score: ${reviews[i].score}/100`;
		score.classList.add('review-item-score')
		entryDiv.appendChild(score);

		const date = document.createElement('h3');
		let dateData = reviews[i].date;
		let formattedDate = formatDate(dateData);
		date.innerHTML = formattedDate;
		date.classList.add('review-item-date')
		entryDiv.appendChild(date);

		const media = document.createElement('h3')
		if(reviews[i].mediaType != undefined){
			let mediaType = reviews[i].mediaType
			console.log(mediaType)
			media.innerHTML = mediaType
			media.classList.add('review-item-piece')
			media.classList.add('review-item-media')
			entryDiv.appendChild(media)
		}

		const note = document.createElement('p');
		if(reviews[i].note === ''){
			note.style.display = 'none'
		}
		note.innerHTML = `Note: ${reviews[i].note}`;
		note.classList.add('review-item-note')
		entryDiv.appendChild(note);

		const reviewGrid = document.querySelector('.leaderboard-div');
		entryDiv.classList.add('review-item')
		entryDiv.style.order = 100 - reviews[i].score 
		reviewGrid.appendChild(entryDiv);
	}
	e.preventDefault()
}


window.addEventListener('load', displayReviews)