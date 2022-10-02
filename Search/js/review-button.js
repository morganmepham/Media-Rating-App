const reviewButton = document.querySelector('.review-button')
reviewButton.addEventListener('click', displayReviewSection)

function displayReviewSection(){
    const reviewSection = document.querySelector('.right-side')
    reviewSection.style.display = 'flex'
    const itemDisplay = document.querySelector('.outer-popup')
    itemDisplay.style.display = 'none'
}



const reviewExitButton = document.querySelector('.review-exit-button')
reviewExitButton.addEventListener('click', exitReview)
function exitReview(){
    const reviewSection = document.querySelector('.right-side')
    reviewSection.style.display = 'none'
    const itemDisplay = document.querySelector('.outer-popup')
    itemDisplay.style.display = 'flex'
}