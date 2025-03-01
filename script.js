// Menu data
const menuData = {
    starters: [
        {
            title: "Spring Rolls",
            price: "$8.99",
            description: "Crispy vegetable spring rolls served with sweet chili sauce",
            image: "https://example.com/spring-rolls.jpg",
            tags: ["Vegetarian", "Popular"]
        },
        // Add more starters
    ],
    "main-courses": [
        {
            title: "Taiwanese Beef Noodle Soup",
            price: "$16.99",
            description: "Traditional beef noodle soup with tender braised beef",
            image: "https://example.com/beef-noodle.jpg",
            tags: ["Signature", "Spicy"]
        },
        // Add more main courses
    ],
    // Add more categories
};

// DOM Elements
const header = document.querySelector('header');
const nav = document.querySelector('nav ul');
const hamburger = document.querySelector('.hamburger');
const reservationBtns = document.querySelectorAll('.reservation-btn');
const modal = document.querySelector('.reservation-modal');
const closeModal = document.querySelector('.close-modal');
const menuTabs = document.querySelectorAll('.menu-tab');
const testimonialDots = document.querySelectorAll('.dot');
const testimonials = document.querySelectorAll('.testimonial');

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu functionality
const navMenu = document.querySelector('.nav-menu');

function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
}

hamburger.addEventListener('click', toggleMenu);

// Close menu when clicking links
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
});

// Modal functionality
reservationBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modal on outside click
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Menu tabs
menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        menuTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        // Load menu items for selected category
        loadMenuItems(tab.dataset.category);
    });
});

// Load menu items
function loadMenuItems(category) {
    const menuContent = document.querySelector('.menu-content');
    const items = menuData[category] || [];
    
    menuContent.innerHTML = `
        <div class="menu-category active">
            <h3 class="menu-category-title">${category.replace('-', ' ').toUpperCase()}</h3>
            <div class="menu-items">
                ${items.map(item => `
                    <div class="menu-item fade-in">
                        <div class="menu-item-image">
                            <img src="${item.image}" alt="${item.title}">
                        </div>
                        <div class="menu-item-info">
                            <div class="menu-item-header">
                                <h4 class="menu-item-title">${item.title}</h4>
                                <span class="menu-item-price">${item.price}</span>
                            </div>
                            <p class="menu-item-desc">${item.description}</p>
                            <div class="menu-item-tags">
                                ${item.tags.map(tag => `
                                    <span class="menu-item-tag">${tag}</span>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Testimonials slider
let currentTestimonial = 0;
const testimonialInterval = 5000; // 5 seconds

function showTestimonial(index) {
    testimonials.forEach(t => t.classList.remove('active'));
    testimonialDots.forEach(d => d.classList.remove('active'));
    
    testimonials[index].classList.add('active');
    testimonialDots[index].classList.add('active');
}

testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Auto advance testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, testimonialInterval);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        if (this.getAttribute('href') === '#') return;
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 50) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Remove or comment out the centerNav function and its event listeners
// const centerNav = () => { ... };
// window.addEventListener('load', centerNav);
// window.addEventListener('resize', centerNav);
