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

// ==========================================
// NEW INTERACTIVE FEATURES
// ==========================================

// ===== Interactive Terminal Command System =====
const commandInput = document.querySelector('.typing-cursor');
let isInputMode = false;
let currentInput = '';
const commandHistory = [];
let historyIndex = -1;

const commands = {
    help: () => `Available commands:
    help          - Show this help message
    about         - About Dennis Liu
    skills        - List technical skills
    experience    - Show work history
    contact       - Get contact information
    matrix on/off - Toggle matrix effect
    theme         - Change color theme
    clear         - Clear terminal
    joke          - Get a programming joke
    date          - Show current date`,

    about: () => `Dennis Liu - Backend Engineer
Specializing in distributed systems, API architecture, and scalable e-commerce solutions.
Currently architecting merchant-centric platforms at Shoalter Technology.`,

    skills: () => `Core Technologies:
• Java, Spring Boot, Spring Cloud
• MySQL, Redis, Oracle
• Docker, Kubernetes, AWS
• API Gateway, Microservices
• Grafana, Glowroot`,

    experience: () => `Work History:
[CURRENT] Shoalter Technology - Senior Software Engineer (2024.10 - Present)
[2022-2024] Gogoro - Software Engineer
[2019-2021] Galaxy Software Services - Java Program Analyst`,

    contact: () => `LinkedIn: linkedin.com/in/dennis-liu-89b502188
Feel free to connect for opportunities or tech discussions!`,

    date: () => new Date().toLocaleString(),

    joke: () => {
        const jokes = [
            "Why do Java developers wear glasses? Because they don't C#!",
            "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
            "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
            "Why did the developer go broke? Because he used up all his cache!",
            "There are 10 types of people: those who understand binary and those who don't."
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
    }
};

// Activate terminal input on click
if (commandInput) {
    const terminalHint = document.querySelector('.terminal-hint');
    commandInput.parentElement.style.cursor = 'text';

    commandInput.parentElement.addEventListener('click', () => {
        isInputMode = true;
        commandInput.textContent = currentInput + '_';
        commandInput.style.animation = 'blink 1s infinite';

        // Hide hint when terminal is activated
        if (terminalHint) {
            terminalHint.classList.add('hidden');
        }
    });

    // Add hover effect to the terminal line
    commandInput.parentElement.addEventListener('mouseenter', () => {
        if (terminalHint && !isInputMode) {
            terminalHint.style.opacity = '1';
        }
    });

    commandInput.parentElement.addEventListener('mouseleave', () => {
        if (terminalHint && !isInputMode) {
            terminalHint.style.opacity = '0.6';
        }
    });
}

// Handle keyboard input for terminal
document.addEventListener('keydown', (e) => {
    if (!isInputMode) return;

    if (e.key === 'Enter') {
        e.preventDefault();
        executeCommand(currentInput.trim());
        currentInput = '';
        commandHistory.unshift(currentInput);
        historyIndex = -1;
    } else if (e.key === 'Backspace') {
        e.preventDefault();
        currentInput = currentInput.slice(0, -1);
        commandInput.textContent = currentInput + '_';
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            currentInput = commandHistory[historyIndex] || '';
            commandInput.textContent = currentInput + '_';
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > -1) {
            historyIndex--;
            currentInput = historyIndex === -1 ? '' : commandHistory[historyIndex];
            commandInput.textContent = currentInput + '_';
        }
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        currentInput += e.key;
        commandInput.textContent = currentInput + '_';
    }
});

function executeCommand(cmd) {
    const [command, ...args] = cmd.toLowerCase().split(' ');

    // Special handling for clear command
    if (command === 'clear') {
        const outputs = document.querySelectorAll('.command-output');
        outputs.forEach(output => output.remove());

        // Show brief confirmation then remove it
        const clearMsg = document.createElement('div');
        clearMsg.className = 'command-output';
        clearMsg.style.cssText = 'margin: 10px 0; color: #00ff9f; white-space: pre-wrap; opacity: 1; transition: opacity 0.5s ease;';
        clearMsg.textContent = 'Terminal cleared.';
        commandInput.parentElement.parentElement.appendChild(clearMsg);

        setTimeout(() => {
            clearMsg.style.opacity = '0';
            setTimeout(() => clearMsg.remove(), 500);
        }, 800);
        return;
    }

    // Create output element
    const outputDiv = document.createElement('div');
    outputDiv.className = 'command-output';
    outputDiv.style.cssText = 'margin: 10px 0; color: #8892b0; white-space: pre-wrap;';

    if (command === 'matrix') {
        if (args[0] === 'off') {
            canvas.style.opacity = '0';
            outputDiv.textContent = 'Matrix effect disabled';
        } else {
            canvas.style.opacity = '1';
            outputDiv.textContent = 'Matrix effect enabled';
        }
    } else if (command === 'theme') {
        cycleTheme();
        outputDiv.textContent = 'Theme changed!';
    } else if (commands[command]) {
        const result = commands[command]();
        outputDiv.textContent = result;
    } else if (command) {
        outputDiv.textContent = `Command not found: ${command}\nType 'help' for available commands.`;
    }

    if (outputDiv.textContent) {
        commandInput.parentElement.parentElement.appendChild(outputDiv);
    }
}

// ===== Copy Code Block Feature =====
const codeBlocks = document.querySelectorAll('.code-block');
codeBlocks.forEach(block => {
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-code-btn';
    copyBtn.innerHTML = '📋 Copy';
    copyBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(0, 255, 159, 0.1);
        border: 1px solid #00ff9f;
        color: #00ff9f;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer;
        font-family: 'JetBrains Mono', monospace;
        font-size: 12px;
        transition: all 0.3s ease;
        z-index: 10;
    `;

    block.style.position = 'relative';
    block.appendChild(copyBtn);

    copyBtn.addEventListener('click', () => {
        const code = block.querySelector('code').textContent;
        navigator.clipboard.writeText(code).then(() => {
            copyBtn.innerHTML = '✓ Copied!';
            copyBtn.style.background = 'rgba(0, 255, 159, 0.3)';
            setTimeout(() => {
                copyBtn.innerHTML = '📋 Copy';
                copyBtn.style.background = 'rgba(0, 255, 159, 0.1)';
            }, 2000);
        });
    });

    copyBtn.addEventListener('mouseenter', () => {
        copyBtn.style.background = 'rgba(0, 255, 159, 0.2)';
        copyBtn.style.transform = 'scale(1.05)';
    });

    copyBtn.addEventListener('mouseleave', () => {
        copyBtn.style.background = 'rgba(0, 255, 159, 0.1)';
        copyBtn.style.transform = 'scale(1)';
    });
});

// ===== Konami Code Easter Egg =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateKonamiEasterEgg();
    }
});

function activateKonamiEasterEgg() {
    // Create epic effect
    document.body.style.animation = 'rainbow 2s ease infinite';

    // Show message
    const easterEgg = document.createElement('div');
    easterEgg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.95);
        border: 2px solid #00ff9f;
        padding: 30px;
        border-radius: 10px;
        z-index: 10000;
        text-align: center;
        color: #00ff9f;
        font-family: 'JetBrains Mono', monospace;
        box-shadow: 0 0 30px rgba(0, 255, 159, 0.5);
    `;
    easterEgg.innerHTML = `
        <h2 style="margin: 0 0 10px 0; font-size: 24px;">🎮 KONAMI CODE ACTIVATED! 🎮</h2>
        <p style="margin: 10px 0;">You've unlocked the secret developer mode!</p>
        <p style="font-size: 12px; color: #8892b0; margin-top: 15px;">Click anywhere to close</p>
    `;

    document.body.appendChild(easterEgg);

    easterEgg.addEventListener('click', () => {
        easterEgg.remove();
        document.body.style.animation = '';
    });

    // Add rainbow animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        if (document.body.contains(easterEgg)) {
            easterEgg.remove();
            document.body.style.animation = '';
        }
    }, 5000);
}

// ===== Theme Switcher =====
const themes = [
    { name: 'Terminal Elegance', primary: '#00ff9f', secondary: '#00d4ff', accent: '#ff0080' },
    { name: 'Cyberpunk Red', primary: '#ff0055', secondary: '#ffaa00', accent: '#00ffff' },
    { name: 'Ocean Blue', primary: '#00b4d8', secondary: '#0077b6', accent: '#90e0ef' },
    { name: 'Purple Haze', primary: '#b026ff', secondary: '#7209b7', accent: '#f72585' },
    { name: 'Retro Green', primary: '#39ff14', secondary: '#00ff00', accent: '#ccff00' }
];
let currentThemeIndex = 0;

function cycleTheme() {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    const theme = themes[currentThemeIndex];

    document.documentElement.style.setProperty('--neon-green', theme.primary);
    document.documentElement.style.setProperty('--neon-cyan', theme.secondary);
    document.documentElement.style.setProperty('--neon-pink', theme.accent);

    // Show theme name
    const themeNotif = document.createElement('div');
    themeNotif.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: rgba(0, 0, 0, 0.9);
        border: 2px solid ${theme.primary};
        padding: 15px 20px;
        border-radius: 8px;
        color: ${theme.primary};
        font-family: 'JetBrains Mono', monospace;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    themeNotif.textContent = `Theme: ${theme.name}`;
    document.body.appendChild(themeNotif);

    setTimeout(() => themeNotif.remove(), 2000);
}

// Add theme toggle button
const themeToggle = document.createElement('button');
themeToggle.innerHTML = '🎨';
themeToggle.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgba(0, 255, 159, 0.1);
    border: 2px solid #00ff9f;
    color: #00ff9f;
    font-size: 24px;
    cursor: pointer;
    z-index: 1000;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
`;
document.body.appendChild(themeToggle);

themeToggle.addEventListener('click', cycleTheme);
themeToggle.addEventListener('mouseenter', () => {
    themeToggle.style.transform = 'scale(1.1) rotate(180deg)';
    themeToggle.style.background = 'rgba(0, 255, 159, 0.3)';
});
themeToggle.addEventListener('mouseleave', () => {
    themeToggle.style.transform = 'scale(1) rotate(0deg)';
    themeToggle.style.background = 'rgba(0, 255, 159, 0.1)';
});

// Add slideIn animation
const themeStyle = document.createElement('style');
themeStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(themeStyle);

console.log('%c🎮 New Interactive Features Loaded!', 'color: #00ff9f; font-size: 14px; font-weight: bold;');
console.log('%c• Click the typing cursor and type "help" to see available commands', 'color: #00d4ff; font-size: 12px;');
console.log('%c• Try the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A', 'color: #ff0080; font-size: 12px;');
console.log('%c• Click the 🎨 button to change themes', 'color: #b026ff; font-size: 12px;');
