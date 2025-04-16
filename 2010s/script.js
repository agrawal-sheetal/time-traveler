const comments = [
    {
        title: "Comment 1",
        content: '"Now I\'m on the other side guys, love is beautiful," reads one comment, on "Poison Oak," by Bright Eyes.'
    },
    {
        title: "Comment 2",
        content: '"sitting in Union Station at the end of summer and realizing that everything is going to change very soon," on "Friendships and Love," by Rocketship.'
    },
    {
        title: "Comment 3",
        content: '"The same guy who has loved me since I was 16 years old dedicated this song to me. I\'m 43 now and no one will ever love me or understand me the way he does," someone writes about "Pictures of You," by the Cure.'
    }
];

const commentTitle = document.getElementById('commentTitle');
const commentText = document.getElementById('commentText');
const commentIndicators = document.getElementById('commentIndicators');
const submitRatingBtn = document.getElementById('submitRatingBtn');
const ratingConfirmation = document.getElementById('ratingConfirmation');

let currentCommentIndex = 0;
let autoRotateInterval;

function initCommentIndicators() {
    commentIndicators.innerHTML = '';
    
    comments.forEach((comment, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'comment-indicator';
        if (index === currentCommentIndex) {
            indicator.classList.add('active');
        }
        
        indicator.addEventListener('click', () => {
            showComment(index);
            resetAutoRotate();
        });
        
        commentIndicators.appendChild(indicator);
    });
}

function showComment(index) {
    currentCommentIndex = index;
    const comment = comments[index];
    
    commentTitle.textContent = comment.title;
    commentText.textContent = comment.content;
    const indicators = document.querySelectorAll('.comment-indicator');
    indicators.forEach((indicator, i) => {
        if (i === index) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function startAutoRotate() {
    autoRotateInterval = setInterval(() => {
        currentCommentIndex = (currentCommentIndex + 1) % comments.length;
        showComment(currentCommentIndex);
    }, 5000);
}

function resetAutoRotate() {
    clearInterval(autoRotateInterval);
    startAutoRotate();
}

submitRatingBtn.addEventListener('click', () => {
    const selectedRating = document.querySelector('input[name="rating"]:checked');
    if (selectedRating) {
        ratingConfirmation.style.display = 'block';
        setTimeout(() => {
            ratingConfirmation.style.display = 'none';
        }, 3000);
    } else {
        submitRatingBtn.classList.add('shake');
        setTimeout(() => {
            submitRatingBtn.classList.remove('shake');
        }, 500);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('currentDate').textContent = new Date().toLocaleDateString();
    initCommentIndicators();
    showComment(0);
    startAutoRotate();
});