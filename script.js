document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetSection = document.querySelector(this.getAttribute('href'));
        document.querySelector('main').scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
    });
});

const sectionRevealElements = document.querySelectorAll('.section-reveal');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        } else {
            entry.target.classList.remove('is-visible');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

sectionRevealElements.forEach(element => {
    observer.observe(element);
});

function toggleExpand(element) {
    const content = element.querySelector('.expandable-content');
    const icon = element.querySelector('.expand-toggle-icon');

    if (content.classList.contains('expanded')) {
        content.classList.remove('expanded');
        icon.classList.remove('rotate-90');
    } else {
        content.classList.add('expanded');
        icon.classList.add('rotate-90');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const projectsCarousel = document.getElementById('projects-carousel');
    const nextProjectBtn = document.getElementById('nextProjectBtn');
    const prevProjectBtn = document.getElementById('prevProjectBtn');

    function updateCarouselButtons() {
        const scrollThreshold = 5;

        if (projectsCarousel.scrollLeft <= scrollThreshold) {
            prevProjectBtn.classList.add('opacity-50', 'cursor-not-allowed');
            prevProjectBtn.disabled = true;
        } else {
            prevProjectBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            prevProjectBtn.disabled = false;
        }

        if (projectsCarousel.scrollLeft + projectsCarousel.clientWidth >= projectsCarousel.scrollWidth - scrollThreshold) {
            nextProjectBtn.classList.add('opacity-50', 'cursor-not-allowed');
            nextProjectBtn.disabled = true;
        } else {
            nextProjectBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            nextProjectBtn.disabled = false;
        }
    }

    nextProjectBtn.addEventListener('click', () => {
        projectsCarousel.scrollBy({
            left: projectsCarousel.clientWidth,
            behavior: 'smooth'
        });
        setTimeout(updateCarouselButtons, 600);
    });

    prevProjectBtn.addEventListener('click', () => {
        projectsCarousel.scrollBy({
            left: -projectsCarousel.clientWidth,
            behavior: 'smooth'
        });
        setTimeout(updateCarouselButtons, 600);
    });

    updateCarouselButtons();
    projectsCarousel.addEventListener('scroll', updateCarouselButtons);
    window.addEventListener('resize', () => {
        projectsCarousel.scrollTo({ left: 0, behavior: 'smooth' });
        updateCarouselButtons();
    });
    projectsCarousel.scrollLeft = 0;
});

document.getElementById('current-year').textContent = new Date().getFullYear();

document.querySelector('#contact form').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Form submitted!');
    console.log('Name:', this.elements.name.value);
    console.log('Email:', this.elements.email.value);
    console.log('Message:', this.elements.message.value);

    const submitButton = this.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Message Sent! ✨ Thank You!';
    submitButton.disabled = true;
    submitButton.classList.remove('bg-accent-color', 'hover:bg-indigo-600');
    submitButton.classList.add('bg-green-600');

    setTimeout(() => {
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        submitButton.classList.remove('bg-green-600');
        submitButton.classList.add('bg-accent-color', 'hover:bg-indigo-600');
        this.reset();
    }, 3000);
});

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let W, H;
    let particles = [];
    const particleCount = 100;
    const maxRadius = 2.5;
    const minRadius = 0.5;
    const colors = [
        'rgba(100, 100, 200, 0.4)',
        'rgba(150, 80, 150, 0.4)',
        'rgba(80, 120, 180, 0.4)'
    ];

    function Particle(x, y, radius, color, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = dx;
        this.dy = dy;

        this.draw = function() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        };

        this.update = function() {
            if (this.x + this.radius > W || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }
            if (this.y + this.radius > H || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }

            this.x += this.dx;
            this.y += this.dy;

            this.draw();
        };
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            const radius = Math.random() * (maxRadius - minRadius) + minRadius;
            const x = Math.random() * W;
            const y = Math.random() * H;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const dx = (Math.random() - 0.5) * 0.8;
            const dy = (Math.random() - 0.5) * 0.8;
            particles.push(new Particle(x, y, radius, color, dx, dy));
        }
    }

    function animateParticles() {
        requestAnimationFrame(animateParticles);
        ctx.clearRect(0, 0, W, H);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
        }
    }

    function resizeParticleCanvas() {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
        initParticles();
    }

    resizeParticleCanvas();
    animateParticles();
});