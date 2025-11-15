// ==========================================
// Terminal Elegance - Interactive Features
// ==========================================

// ===== Matrix Rain Background Effect =====
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Matrix characters
const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-={}[]|:;<>?";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

// Initialize drops
for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100;
}

// Draw matrix rain
function drawMatrix() {
    // Semi-transparent background for trail effect
    ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Matrix text
    ctx.fillStyle = '#00ff9f';
    ctx.font = fontSize + 'px JetBrains Mono, monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = matrix.charAt(Math.floor(Math.random() * matrix.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Reset drop to top randomly
        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Animate matrix at 30 FPS for better performance
setInterval(drawMatrix, 33);

// ===== Custom Cursor =====
const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// Only show custom cursor on desktop
if (window.innerWidth > 768) {
    cursor.style.display = 'block';

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    // Smooth follow effect for outline
    function animateCursor() {
        const speed = 0.2;
        outlineX += (mouseX - outlineX) * speed;
        outlineY += (mouseY - outlineY) * speed;

        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .terminal-btn, .nav-cmd');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '50px';
            cursorOutline.style.height = '50px';
            cursorOutline.style.borderColor = '#00d4ff';
        });

        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '32px';
            cursorOutline.style.height = '32px';
            cursorOutline.style.borderColor = '#00ff9f';
        });
    });
}

// ===== Navigation Functionality =====
const nav = document.querySelector('.terminal-nav');
const navLinks = document.querySelectorAll('.nav-cmd');
const sections = document.querySelectorAll('section[id]');

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const navHeight = nav.offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active nav link on scroll
function updateActiveNavLink() {
    const scrollPosition = window.pageYOffset + nav.offsetHeight + 100;

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

// ===== Terminal Command Typing Effect =====
function initTypingCursor() {
    const typingCursor = document.querySelector('.typing-cursor');
    if (typingCursor) {
        const commands = [
            'view-experience',
            'cat skills.txt',
            'connect --linkedin',
            'git status',
            'docker ps',
            'help'
        ];
        let currentCommandIndex = 0;

        setInterval(() => {
            currentCommandIndex = (currentCommandIndex + 1) % commands.length;
            // This would require animation implementation
        }, 4000);
    }
}
initTypingCursor();

// ===== Intersection Observer for Fade-in Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with stagger effect
const animateElements = document.querySelectorAll(
    '.log-entry, .stack-category, .code-block, .education-card, .contact-window'
);

animateElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
});

// Section titles animation
const sectionHeaders = document.querySelectorAll('.section-header');
sectionHeaders.forEach((header, index) => {
    header.style.opacity = '0';
    header.style.transform = 'translateX(-30px)';
    header.style.transition = `opacity 0.5s ease ${index * 0.15}s, transform 0.5s ease ${index * 0.15}s`;
    observer.observe(header);
});

// ===== Terminal Window Effects =====
const terminalButtons = document.querySelectorAll('.terminal-buttons span');
terminalButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Add click animation
        e.target.style.transform = 'scale(0.8)';
        setTimeout(() => {
            e.target.style.transform = 'scale(1)';
        }, 100);
    });
});

// ===== Button Hover Effects =====
const buttons = document.querySelectorAll('.terminal-btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===== Stack Item Progress Bar Animation =====
const stackItems = document.querySelectorAll('.stack-item');
const stackObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Trigger bar animation by adding a class
            const bar = entry.target.querySelector('.item-bar');
            if (bar) {
                bar.style.opacity = '1';
            }
        }
    });
}, { threshold: 0.5 });

stackItems.forEach(item => {
    stackObserver.observe(item);
});

// ===== Capability Hover Sound Effect (Visual) =====
const capabilities = document.querySelectorAll('.capability');
capabilities.forEach(cap => {
    cap.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(5px) scale(1.02)';
    });

    cap.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0) scale(1)';
    });
});

// ===== Tech Tag Interactions =====
const techTags = document.querySelectorAll('.tech-tag');
techTags.forEach(tag => {
    tag.addEventListener('click', function() {
        // Add pulse animation
        this.style.animation = 'pulse 0.3s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 300);
    });
});

// ===== Glitch Effect Trigger =====
const glitchText = document.querySelector('.glitch-text');
if (glitchText) {
    // Trigger intense glitch on hover
    glitchText.addEventListener('mouseenter', function() {
        this.style.animation = 'glitchFloat 0.3s ease, glitch1 0.3s infinite';
        setTimeout(() => {
            this.style.animation = 'glitchFloat 3s ease-in-out infinite';
        }, 1000);
    });
}

// ===== Log Entry Expand/Collapse =====
const logEntries = document.querySelectorAll('.log-entry');
logEntries.forEach(entry => {
    entry.addEventListener('click', function() {
        // Toggle expanded state
        this.classList.toggle('expanded');
    });
});

// ===== Scroll to Top on Logo Click =====
const navPrompt = document.querySelector('.nav-prompt');
if (navPrompt) {
    navPrompt.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    navPrompt.style.cursor = 'pointer';
}

// ===== External Links =====
document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
});

// ===== Keyboard Shortcuts =====
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search or navigate
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Navigate to next section
        const currentScroll = window.pageYOffset;
        let nextSection = null;

        sections.forEach(section => {
            if (section.offsetTop > currentScroll + 100 && !nextSection) {
                nextSection = section;
            }
        });

        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Escape to scroll to top
    if (e.key === 'Escape') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// ===== Performance: Reduce animations on low-power devices =====
if (navigator.deviceMemory && navigator.deviceMemory < 4) {
    // Reduce matrix rain complexity
    ctx.globalAlpha = 0.3;
}

// ===== Initial Page Load Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';

    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Trigger initial scroll check
    updateActiveNavLink();
});

// ===== Console Easter Egg =====
console.log(`
%c╔═══════════════════════════════════════════╗
║  Welcome to Dennis Liu's Portfolio        ║
║  Backend Engineer | System Architect      ║
╚═══════════════════════════════════════════╝

%cInterested in the code? Check out the repo!
%cBuilt with Terminal Elegance design system
`,
'color: #00ff9f; font-family: monospace; font-size: 12px;',
'color: #00d4ff; font-family: monospace;',
'color: #8892b0; font-family: monospace; font-size: 10px;'
);

// ===== Parallax Effect for Terminal Window =====
const heroTerminal = document.querySelector('.terminal-window');
if (heroTerminal && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        heroTerminal.style.transform = `translateY(${rate}px)`;
    });
}

// ===== Code Block Syntax Highlighting Enhancement =====
const codeElements = document.querySelectorAll('.code-block code');
codeElements.forEach(code => {
    // Add line numbers if not present
    if (!code.querySelector('.line-numbers')) {
        const lines = code.textContent.split('\n').length;
        // Could add line numbers here if needed
    }
});

// ===== Terminal Typing Sound (Visual Feedback) =====
const typingElements = document.querySelectorAll('.typing-text');
typingElements.forEach((el, index) => {
    el.addEventListener('animationend', () => {
        // Flash cursor at end
        const cursor = el.querySelector('.cursor-blink');
        if (cursor) {
            cursor.style.opacity = '1';
        }
    });
});

// ===== Cleanup on Page Unload =====
window.addEventListener('beforeunload', () => {
    // Clear intervals and observers
    observer.disconnect();
    stackObserver.disconnect();
});

// ===== Debug Mode (Only in development) =====
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('%cDebug Mode: ON', 'color: #ffeb3b; font-size: 16px; font-weight: bold;');

    // Add FPS counter
    let fps = 0;
    let lastTime = performance.now();

    function updateFPS() {
        const currentTime = performance.now();
        fps = Math.round(1000 / (currentTime - lastTime));
        lastTime = currentTime;

        // Could display FPS in UI if needed
        requestAnimationFrame(updateFPS);
    }
    requestAnimationFrame(updateFPS);
}
