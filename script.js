/* FUNCTION: Hamburger Menu Toggle
    Description: Opens/Closes the mobile navigation drawer
*/
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if(hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

/* FUNCTION: Smart Navbar Scroll Effect
    Description: Hides navbar on scroll down, shows on scroll up.
    Stays visible at the top and when mobile menu is open.
*/
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
const scrollThreshold = 10; 

window.addEventListener('scroll', () => {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // 1. If at the very top, always show navbar
    if (currentScroll <= 0) {
        navbar.classList.remove('nav-hidden');
        return;
    }

    // 2. Don't hide if the mobile menu is currently open
    if (navMenu && navMenu.classList.contains('active')) {
        return;
    }

    // 3. Ignore small scroll movements
    if (Math.abs(lastScrollTop - currentScroll) <= scrollThreshold) return;

    if (currentScroll > lastScrollTop) {
        // Scrolling Down - Hide
        navbar.classList.add('nav-hidden');
    } else {
        // Scrolling Up - Show
        navbar.classList.remove('nav-hidden');
    }

    lastScrollTop = currentScroll;
});


/* FUNCTION: Live Resource Search
    Description: Filters resource cards based on user input in the search bar
*/
const searchInput = document.getElementById('resourceSearch');
const resourceCards = document.querySelectorAll('.resource-card');

if(searchInput) {
    searchInput.addEventListener('keyup', () => {
        const query = searchInput.value.toLowerCase();
        
        resourceCards.forEach(card => {
            const title = card.getAttribute('data-title').toLowerCase();
            card.style.display = title.includes(query) ? "block" : "none";
        });
    });
}

/* FUNCTION: Resource Category Filter
    Description: Shows/Hides cards based on the selected module category
*/
function filterResources(category) {
    const cards = document.querySelectorAll('.resource-card');
    const buttons = document.querySelectorAll('.filter-btn');

    // Update button styling
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText === category || (category === 'all' && btn.innerText === 'All')) {
            btn.classList.add('active');
        }
    });

    // Filter cards
    cards.forEach(card => {
        const cardCategory = card.querySelector('.res-tag').innerText;
        if (category === 'all' || cardCategory === category) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

/* FUNCTION: Focused Cambridge Book Slider
    Description: Moves slider and scales the center book
*/
let currentIndex = 0;
const slider = document.getElementById('bookSlider');
const books = document.querySelectorAll('.book-item');

function moveSlider(direction) {
    const nextIndex = currentIndex + direction;

    if (nextIndex < 0 || nextIndex >= books.length) {
        return; 
    }

    currentIndex = nextIndex;

    books.forEach((book, index) => {
        if (index === currentIndex) {
            book.classList.add('active');
        } else {
            book.classList.remove('active');
        }
    });

    const moveAmount = -currentIndex * 200; 
    slider.style.transform = `translateX(${moveAmount}px)`;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    if(books.length > 0) {
        books[0].classList.add('active');
    }
});

/* FUNCTION: Scroll Reveal Logic
   Description: Animates elements into view as the user scrolls.
*/
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1 // Trigger when 10% of the element is visible
});

// Start observing all elements with the 'reveal' class
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));
});

/* --- PRACTICE HUB LOGIC --- */

document.addEventListener('DOMContentLoaded', () => {
    // Check if we just came back from a specific lab (using localStorage or URL)
    const urlParams = new URLSearchParams(window.location.search);
    const completed = urlParams.get('completed');
    const progressBar = document.getElementById('exam-progress');
    const statusHeading = document.getElementById('status-heading');

    if (completed === 'listening') {
        progressBar.style.width = '25%';
        statusHeading.innerText = "লিসনিং সম্পন্ন হয়েছে! পরবর্তী ধাপ রিডিং।";
    } else if (completed === 'reading') {
        progressBar.style.width = '50%';
        statusHeading.innerText = "রিডিং সম্পন্ন হয়েছে! এবার রাইটিং প্র্যাকটিস করুন।";
    } else if (completed === 'writing') {
        progressBar.style.width = '75%';
        statusHeading.innerText = "দারুণ! এবার শেষ ধাপ স্পিকিং শুরু করুন।";
    } else if (completed === 'speaking') {
        progressBar.style.width = '100%';
        statusHeading.innerText = "অভিনন্দন! আপনি আজকের সব ধাপ সম্পন্ন করেছেন।";
    }
});