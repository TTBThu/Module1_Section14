const ratingInputs = document.querySelectorAll('input[type="radio"]');
const reviewInput = document.querySelector('input[type="text"]');
const submitButton = document.querySelector('.btn');
const closeButtons = document.querySelectorAll('.close');
const editButtons = document.querySelectorAll('.edit');

let editingReview = null; // Biến lưu đánh giá đang được chỉnh sửa

function createReview(rating, text) {
    const reviewContainer = document.createElement('div');
    reviewContainer.classList.add('review');

    const ratingDisplay = document.createElement('div');
    ratingDisplay.classList.add('num-display');
    ratingDisplay.textContent = rating;
    reviewContainer.appendChild(ratingDisplay);

    const reviewTextElement = document.createElement('div');
    reviewTextElement.classList.add('text-display');
    reviewTextElement.textContent = text;
    reviewContainer.appendChild(reviewTextElement);

    const closeBtn = document.createElement('button');
    closeBtn.classList.add('close');
    closeBtn.innerHTML = '&#x2716;';
    closeBtn.addEventListener('click', () => {
        reviewContainer.style.display = 'none';
    });
    reviewContainer.appendChild(closeBtn);

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.innerHTML = `
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z">
        </svg>
    `;
    reviewContainer.appendChild(editBtn);
    editBtn.style.display = 'block';
    // Thêm đánh giá vào phần "reviews"
    document.querySelector('.reviews').appendChild(reviewContainer);
    editBtn.addEventListener('click', () => {
        const reviewContainer = editBtn.parentElement;
        //.parentElement dùng để truy cập đối tượng cha của editBtn
        const oldReviewText = reviewContainer.querySelector('.text-display').textContent;
        reviewInput.value = oldReviewText;
        editingReview = reviewContainer;
        editingReview.style.display = 'none';
    });

    return reviewContainer;
}

ratingInputs.forEach((input) => {
    input.addEventListener('change', () => {
        submitButton.removeAttribute('disabled');
    });
});

editButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const reviewContainer = button.parentElement;
        const oldReviewText = reviewContainer.querySelector('.text-display').textContent;
        reviewInput.value = oldReviewText;
        editingReview = reviewContainer;
        editingReview.style.display = 'none';
    });
});

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const selectedRating = document.querySelector('input[type="radio"]:checked');
    const reviewText = reviewInput.value;

    if (selectedRating && reviewText) {
        if (editingReview) {
            const reviewTextElement = editingReview.querySelector('.text-display');
            reviewTextElement.textContent = reviewText;
            const numDisplay = editingReview.querySelector('.num-display');
            numDisplay.textContent = selectedRating.value;
            editingReview.style.display = 'block';
            editingReview = null;
        } else {
            const reviewContainer = createReview(selectedRating.value, reviewText);
            document.querySelector('.reviews').appendChild(reviewContainer);
        }
        selectedRating.checked = false;
        reviewInput.value = '';
        submitButton.disabled = true;
    }
});

closeButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        const card = event.target.closest('.card');
        card.style.display = 'none';
    });
});
