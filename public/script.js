// --- LOADING SCREEN ---
const funLoadingTexts = [
    "Preparing something awesome...",
    "Crafting digital magic...",
    "Loading creative pixels...",
    "Brewing fresh ideas...",
    "Assembling cool stuff...",
    "Making things beautiful...",
    "Charging up creativity...",
    "Almost ready to rock...",
    "Fine-tuning perfection...",
    "Just a moment more..."
];

let textIndex = 0;
let textRotationInterval;

function rotateLoadingText() {
    const loadingText = document.getElementById('loading-text');
    if (loadingText) {
        loadingText.style.opacity = '0';
        setTimeout(() => {
            textIndex = (textIndex + 1) % funLoadingTexts.length;
            loadingText.textContent = funLoadingTexts[textIndex];
            loadingText.style.opacity = '1';
        }, 200);
    }
}

window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    
    // Start text rotation
    textRotationInterval = setInterval(rotateLoadingText, 800);
    
    // Minimum loading time for better UX
    setTimeout(() => {
        clearInterval(textRotationInterval);
        loadingScreen.classList.add('hidden');
        mainContent.classList.add('loaded');
        
        // Initialize lucide icons after loading
        lucide.createIcons();
        
        // Start hero animations after loading
        if (typeof anime !== 'undefined') {
            startHeroAnimations();
        }
    }, 3500); // 3.5 seconds to show the full loading animation
});

function startHeroAnimations() {
    const heroTexts = document.querySelectorAll('.hero-text');
    heroTexts.forEach(text => {
        text.innerHTML = text.textContent.trim().split(' ').map(word => `<span class="line">${word}</span>`).join(' ');
        Array.from(text.children).forEach((line, i) => {
            line.innerHTML = line.textContent.split('').map(char => `<span class="word">${char}</span>`).join('');
        });
    });

    const tl = anime.timeline({
        easing: 'easeOutExpo',
        duration: 1000,
    });

    tl.add({
        targets: '.hero-text .word',
        translateY: [100, 0],
        opacity: [0, 1],
        delay: anime.stagger(15, { from: 'center' })
    })
    .add({
        targets: '.hero-subtext, .hero-buttons',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800
    }, '-=800');
}

lucide.createIcons();

// --- THEME TOGGLE ---
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

// Check for saved theme in localStorage
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    sunIcon.classList.remove('hidden');
} else {
    document.body.classList.remove('light-mode');
    moonIcon.classList.remove('hidden');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    sunIcon.classList.toggle('hidden');
    moonIcon.classList.toggle('hidden');

    // Save the current theme to localStorage
    if (document.body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
});


// --- MOBILE MENU ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuIcon = mobileMenuButton.querySelector('i');

let isMenuOpen = false;

mobileMenuButton.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        mobileMenu.classList.remove('hidden');
        // Small delay to ensure the element is rendered before animation
        setTimeout(() => {
            mobileMenu.style.transform = 'translateY(0)';
            mobileMenu.style.opacity = '1';
            mobileMenu.style.visibility = 'visible';
        }, 10);
        mobileMenuIcon.setAttribute('data-lucide', 'x');
    } else {
        mobileMenu.style.transform = 'translateY(-10px)';
        mobileMenu.style.opacity = '0';
        mobileMenu.style.visibility = 'hidden';
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
        mobileMenuIcon.setAttribute('data-lucide', 'menu');
    }
    
    // Recreate icons to update the icon
    lucide.createIcons();
});

const mobileLinks = document.querySelectorAll('#mobile-menu a');
mobileLinks.forEach((link, index) => {
    link.addEventListener('click', () => {
        // Close menu with animation
        isMenuOpen = false;
        mobileMenu.style.transform = 'translateY(-10px)';
        mobileMenu.style.opacity = '0';
        mobileMenu.style.visibility = 'hidden';
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
        mobileMenuIcon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    });
    
    // Add staggered entrance animation
    link.style.transitionDelay = `${index * 50}ms`;
});

// --- SCROLLSPY & HEADER ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const header = document.getElementById('header');
const headerContainer = header.querySelector('.container');
const logo = header.querySelector('a');

let lastScrollY = window.scrollY;
let ticking = false;

function updateHeader() {
    const scrollY = window.scrollY;
    
    
    if (scrollY > 100) {
        header.classList.add('header-scrolled');
        logo.classList.add('logo');
    } else {
        header.classList.remove('header-scrolled');
        logo.classList.remove('logo');
    }
    
    
    header.style.transform = 'translateY(0)';
    
    lastScrollY = scrollY;
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
    }
}

window.addEventListener('scroll', () => {
    // Smooth scrollspy
    let current = 'home';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150 && pageYOffset < sectionTop + sectionHeight - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
    
    requestTick();
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});



document.addEventListener('DOMContentLoaded', () => {
   
});