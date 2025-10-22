// ===========================
// Navbar Scroll Effect
// ===========================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===========================
// Smooth Scroll for Navigation
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Intersection Observer for Animations
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
const animateElements = document.querySelectorAll(
    '.timeline-item, .skill-category, .achievement-card, .about-text, .stat-card'
);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ===========================
// Active Navigation Link
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
    const scrollPosition = window.pageYOffset + navbar.offsetHeight + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ===========================
// Skill Tag Hover Effect
// ===========================
const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });

    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// ===========================
// Stats Counter Animation
// ===========================
function animateCounter(element, target, duration = 2000) {
    const isInfinity = target === '∞';
    if (isInfinity) return; // Skip animation for infinity

    const start = 0;
    const increment = target / (duration / 16); // 60 FPS
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Observe stat cards for counter animation
const statCards = document.querySelectorAll('.stat-card');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const numberElement = entry.target.querySelector('.stat-number');
            const targetText = numberElement.textContent;
            const target = parseInt(targetText);

            if (!isNaN(target)) {
                numberElement.textContent = '0+';
                animateCounter(numberElement, target);
                entry.target.dataset.animated = 'true';
            }
        }
    });
}, { threshold: 0.5 });

statCards.forEach(card => {
    statsObserver.observe(card);
});

// ===========================
// Timeline Item Stagger Animation
// ===========================
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100); // Stagger by 100ms
        }
    });
}, { threshold: 0.1 });

timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    timelineObserver.observe(item);
});

// ===========================
// Achievement Cards Hover Effect
// ===========================
const achievementCards = document.querySelectorAll('.achievement-card');

achievementCards.forEach((card, index) => {
    // Alternate border colors
    const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
    card.style.borderTopColor = colors[index % colors.length];
});

// ===========================
// Scroll to Top on Logo Click
// ===========================
const navBrand = document.querySelector('.nav-brand');

navBrand.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

navBrand.style.cursor = 'pointer';

// ===========================
// Parallax Effect for Hero Section
// ===========================
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;

    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// ===========================
// Add Loading Animation
// ===========================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// ===========================
// External Links - Open in New Tab
// ===========================
document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
});

// ===========================
// Keyboard Navigation
// ===========================
document.addEventListener('keydown', (e) => {
    // Press 'h' to go to top
    if (e.key === 'h' || e.key === 'H') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// ===========================
// Add Easter Egg
// ===========================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated!
        const hero = document.querySelector('.hero-title .highlight');
        if (hero) {
            hero.textContent = 'Backend Ninja';
            setTimeout(() => {
                hero.textContent = 'Dennis';
            }, 3000);
        }

        // Add confetti effect
        for (let i = 0; i < 50; i++) {
            createConfetti();
        }
    }
});

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981'][Math.floor(Math.random() * 4)];
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-10px';
    confetti.style.opacity = '1';
    confetti.style.transition = 'all 3s ease-out';
    confetti.style.zIndex = '9999';
    confetti.style.pointerEvents = 'none';

    document.body.appendChild(confetti);

    setTimeout(() => {
        confetti.style.top = window.innerHeight + 'px';
        confetti.style.opacity = '0';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    }, 10);

    setTimeout(() => {
        confetti.remove();
    }, 3000);
}

// ===========================
// Console Message
// ===========================
console.log('%c👋 Hi there!', 'font-size: 20px; font-weight: bold; color: #3b82f6;');
console.log('%cLooking at the code, are we? I like your style!', 'font-size: 14px; color: #64748b;');
console.log('%cIf you want to chat about backend architecture or why microservices are both a blessing and a curse, feel free to reach out on LinkedIn!', 'font-size: 12px; color: #64748b;');
console.log('%c🎮 Easter egg hint: Try the Konami Code!', 'font-size: 11px; color: #8b5cf6; font-style: italic;');
