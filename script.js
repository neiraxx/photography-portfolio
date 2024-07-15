document.addEventListener('DOMContentLoaded', function () {
    const dropdownMenu = document.getElementById('dropdown-menu');
    const filterButton = document.querySelector('.filter-buttons button');
    const navbar = document.querySelector('.navbar');
    const imageGallery = document.querySelector('.image-gallery');

    // Hide dropdown menu by default
    dropdownMenu.style.display = 'none';

    // Show dropdown menu on hover
    filterButton.addEventListener('mouseenter', function () {
        dropdownMenu.style.display = 'block';
    });

    // Hide dropdown menu when mouse leaves
    dropdownMenu.addEventListener('mouseleave', function () {
        dropdownMenu.style.display = 'none';
    });

    // Initialize with default category
    filterImages('street'); // Initial filter

    // Handle image click to show overlay
    const imageItems = document.querySelectorAll('.image-item');

    imageItems.forEach(item => {
        item.addEventListener('click', function () {
            const imgSrc = this.querySelector('img').src;
            const imgAlt = this.querySelector('img').alt;

            const enlargedImg = document.createElement('img');
            enlargedImg.src = imgSrc;
            enlargedImg.alt = imgAlt;

            const overlay = document.createElement('div');
            overlay.classList.add('image-overlay');
            overlay.appendChild(enlargedImg);

            document.body.appendChild(overlay);

            overlay.addEventListener('click', function () {
                document.body.removeChild(overlay);
            });
        });
    });

    // Hide dropdown menu on mouseover of gallery items
    imageGallery.addEventListener('mouseenter', function () {
        dropdownMenu.style.display = 'none';
    });

    // Detect swipe down to hide the navbar and dropdown menu in the image gallery area
    let touchstartY = 0;
    let touchendY = 0;

    function handleGesture() {
        if (touchendY > touchstartY + 50) { // Check for significant swipe down
            // Swipe down detected
            navbar.style.display = 'none';
            dropdownMenu.style.display = 'none'; // Hide the dropdown menu on swipe down
        }
    }

    imageGallery.addEventListener('touchstart', function (event) {
        touchstartY = event.changedTouches[0].screenY;
    });

    imageGallery.addEventListener('touchend', function (event) {
        touchendY = event.changedTouches[0].screenY;
        handleGesture();
    });

    // Optional: Re-show the navbar on swipe up
    function handleSwipeUp() {
        if (touchendY < touchstartY - 50) { // Check for significant swipe up
            navbar.style.display = 'flex';
        }
    }

    imageGallery.addEventListener('touchend', function (event) {
        touchendY = event.changedTouches[0].screenY;
        handleSwipeUp();
    });
});

// Filter images based on category
function filterImages(category) {
    const images = document.querySelectorAll('.image-item');

    images.forEach(img => {
        if (category === 'all' || img.classList.contains(category)) {
            img.style.display = 'block';
        } else {
            img.style.display = 'none';
        }
    });
}
