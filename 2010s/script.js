// Comments data
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

// DOM Elements
const commentTitle = document.getElementById('commentTitle');
const commentText = document.getElementById('commentText');
const commentIndicators = document.getElementById('commentIndicators');
const prevCommentBtn = document.getElementById('prevCommentBtn');
const nextCommentBtn = document.getElementById('nextCommentBtn');
const submitRatingBtn = document.getElementById('submitRatingBtn');
const ratingConfirmation = document.getElementById('ratingConfirmation');

// Current comment index
let currentCommentIndex = 0;
let autoRotateInterval;

// Initialize comment indicators
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

// Show specific comment
function showComment(index) {
    currentCommentIndex = index;
    const comment = comments[index];
    
    commentTitle.textContent = comment.title;
    commentText.textContent = comment.content;
    
    // Update indicators
    const indicators = document.querySelectorAll('.comment-indicator');
    indicators.forEach((indicator, i) => {
        if (i === index) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Auto-rotate comments
function startAutoRotate() {
    autoRotateInterval = setInterval(() => {
        currentCommentIndex = (currentCommentIndex + 1) % comments.length;
        showComment(currentCommentIndex);
    }, 5000);
}

// Reset auto-rotate timer
function resetAutoRotate() {
    clearInterval(autoRotateInterval);
    startAutoRotate();
}

// Event Listeners
prevCommentBtn.addEventListener('click', () => {
    currentCommentIndex = (currentCommentIndex - 1 + comments.length) % comments.length;
    showComment(currentCommentIndex);
    resetAutoRotate();
});

nextCommentBtn.addEventListener('click', () => {
    currentCommentIndex = (currentCommentIndex + 1) % comments.length;
    showComment(currentCommentIndex);
    resetAutoRotate();
});

submitRatingBtn.addEventListener('click', () => {
    const selectedRating = document.querySelector('input[name="rating"]:checked');
    if (selectedRating) {
        ratingConfirmation.style.display = 'block';
        setTimeout(() => {
            ratingConfirmation.style.display = 'none';
        }, 3000);
    } else {
        // Add shake animation to indicate selection is required
        submitRatingBtn.classList.add('shake');
        setTimeout(() => {
            submitRatingBtn.classList.remove('shake');
        }, 500);
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set current date
    document.getElementById('currentDate').textContent = new Date().toLocaleDateString();
    
    // Initialize comment slider
    initCommentIndicators();
    showComment(0);
    startAutoRotate();
});