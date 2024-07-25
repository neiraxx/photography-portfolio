document.addEventListener('DOMContentLoaded', function () {
    const dropdownMenu = document.getElementById('dropdown-menu');
    const filterButton = document.querySelector('.filter-buttons button');

    // Show dropdown menu on hover
    filterButton.addEventListener('mouseenter', function () {
        dropdownMenu.classList.add('show');
    });

    // Hide dropdown menu when mouse leaves
    filterButton.addEventListener('mouseleave', function () {
        setTimeout(() => {
            if (!dropdownMenu.matches(':hover')) {
                dropdownMenu.classList.remove('show');
            }
        }, 100);
    });

    dropdownMenu.addEventListener('mouseleave', function () {
        dropdownMenu.classList.remove('show');
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

            // Create and style the close button
            const closeButton = document.createElement('button');
            closeButton.innerHTML = '&times;';
            closeButton.classList.add('close-button');

            // Append the image and close button to the overlay
            overlay.appendChild(enlargedImg);
            overlay.appendChild(closeButton);

            document.body.appendChild(overlay);

            // Close the overlay when the close button is clicked
            closeButton.addEventListener('click', function () {
                document.body.removeChild(overlay);
            });

            // Optional: Close the overlay when clicking outside the image
            overlay.addEventListener('click', function (event) {
                if (event.target === overlay) {
                    document.body.removeChild(overlay);
                }
            });
        });
    });

    // Hide dropdown menu on mouseover of gallery items
    const imageGallery = document.querySelector('.image-gallery');
    imageGallery.addEventListener('mouseenter', function () {
        dropdownMenu.classList.remove('show');
    });

    // Detect swipe down to hide the navbar and dropdown menu in the image gallery area
    const navbar = document.querySelector('.navbar');
    let touchstartY = 0;
    let touchendY = 0;

    function handleGesture() {
        if (touchendY > touchstartY + 50) { // Check for significant swipe down
            // Swipe down detected
            navbar.style.display = 'none';
            dropdownMenu.classList.remove('show'); // Hide the dropdown menu on swipe down
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

// Ensure images load with fade-in effect
const images = document.querySelectorAll('.image-item img');
images.forEach(img => {
    img.addEventListener('load', function () {
        img.classList.add('loaded');
    });

    // For cached images
    if (img.complete) {
        img.classList.add('loaded');
    }
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
