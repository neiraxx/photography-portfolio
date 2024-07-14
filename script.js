
function toggleNavbarOnScroll() {
    var navbar = document.querySelector('nav');
    var lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        var scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Downscroll
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Upscroll
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });
}

// Call toggleNavbarOnScroll function when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    filterImages('street'); // Initial filter example
    toggleNavbarOnScroll();
});

function toggleDropdown() {
    var dropdownMenu = document.getElementById('dropdown-menu');
    if (dropdownMenu.style.display === 'block') {
        dropdownMenu.style.display = 'none';
    } else {
        dropdownMenu.style.display = 'block';
    }
}

function filterImages(category) {
    var images = document.getElementsByClassName('image-item');
    if (category === 'all') {
        for (var i = 0; i < images.length; i++) {
            images[i].style.display = 'block';
        }
    } else {
        for (var i = 0; i < images.length; i++) {
            if (images[i].classList.contains(category)) {
                images[i].style.display = 'block';
            } else {
                images[i].style.display = 'none';
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Hide dropdown menu initially
    var dropdownMenu = document.getElementById('dropdown-menu');
    dropdownMenu.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function () {
    filterImages('street');
});

// Get all image items
const imageItems = document.querySelectorAll('.image-item');

// Add click event listener to each image item
imageItems.forEach(item => {
    item.addEventListener('click', function () {
        // Create a new image element to display in overlay
        const imgSrc = this.querySelector('img').src;
        const imgAlt = this.querySelector('img').alt;

        const enlargedImg = document.createElement('img');
        enlargedImg.src = imgSrc;
        enlargedImg.alt = imgAlt;

        // Create overlay div
        const overlay = document.createElement('div');
        overlay.classList.add('image-overlay');
        overlay.appendChild(enlargedImg);

        // Append overlay to body
        document.body.appendChild(overlay);

        // Add event listener to close overlay when clicking on it
        overlay.addEventListener('click', function () {
            document.body.removeChild(overlay);
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Hide dropdown menu initially
    var dropdownMenu = document.getElementById('dropdown-menu');
    dropdownMenu.style.display = 'none';

    // Get all image items
    const imageItems = document.querySelectorAll('.image-item');

    // Add mouseover event listener to each image item to close dropdown
    imageItems.forEach(item => {
        item.addEventListener('mouseover', function () {
            dropdownMenu.style.display = 'none';
        });
    });
});

function toggleDropdown() {
    var dropdownMenu = document.getElementById('dropdown-menu');
    if (dropdownMenu.style.display === 'block') {
        dropdownMenu.style.display = 'none';
    } else {
        dropdownMenu.style.display = 'block';
    }
}
