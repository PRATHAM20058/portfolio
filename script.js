// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Typed.js for dynamic role text
document.addEventListener('DOMContentLoaded', function() {
    if(document.querySelector('.typing')) {
        new Typed('.typing', {
            strings: ['Cybersecurity Enthusiast', 'Computer Engineering Student', 'Ethical Hacker', 'Web Developer'],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true,
            backDelay: 2000
        });
    }
});

// Intersection Observer for scroll animations (fade in elements)
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Select all glass cards and section titles to animate
document.querySelectorAll('.glass-card, .section-title').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Animated Counters for Stat Boxes
const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseFloat(counter.getAttribute('data-target'));
            const decimals = parseInt(counter.getAttribute('data-decimals') || '0', 10);
            const duration = 1600;
            let startTimestamp = null;

            function step(timestamp) {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                const current = target * easeOut;

                counter.textContent = current.toFixed(decimals);

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    counter.textContent = target.toFixed(decimals);
                }
            }

            window.requestAnimationFrame(step);
            obs.unobserve(counter);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

// Sticky Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(5, 5, 5, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.4)';
    } else {
        navbar.style.background = 'rgba(5, 5, 5, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// Matrix Rain Effect (0s and 1s)
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = '01';
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function drawMatrix() {
    // Translucent black background to create trail effect
    ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff41'; // Bright terminal green
    ctx.font = fontSize + 'px "Fira Code", monospace';
    ctx.textAlign = 'center';

    for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly to stagger them, or when it reaches bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Handle window resize for canvas
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

setInterval(drawMatrix, 50);

// Custom Cyber Cursor Follower Logic
const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');

if (cursorDot && cursorOutline && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = -100;
    let mouseY = -100;
    let outlineX = -100;
    let outlineY = -100;
    let isInitialMove = true;

    // Linear interpolation speed for buttery smooth trailing
    const speed = 0.18;

    function animateCursor() {
        outlineX += (mouseX - outlineX) * speed;
        outlineY += (mouseY - outlineY) * speed;

        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;

        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;

        requestAnimationFrame(animateCursor);
    }
    requestAnimationFrame(animateCursor);

    // Track mouse coordinates
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (isInitialMove) {
            outlineX = mouseX;
            outlineY = mouseY;
            isInitialMove = false;
            cursorDot.classList.add('cursor-visible');
            cursorOutline.classList.add('cursor-visible');
        }
    });

    // Hide/show cursor on viewport boundaries
    document.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('cursor-visible');
        cursorOutline.classList.remove('cursor-visible');
        cursorDot.classList.add('cursor-hidden');
        cursorOutline.classList.add('cursor-hidden');
    });

    document.addEventListener('mouseenter', () => {
        cursorDot.classList.remove('cursor-hidden');
        cursorOutline.classList.remove('cursor-hidden');
        cursorDot.classList.add('cursor-visible');
        cursorOutline.classList.add('cursor-visible');
    });

    // Click effect (tactile feedback)
    window.addEventListener('mousedown', () => {
        cursorDot.classList.add('cursor-active');
        cursorOutline.classList.add('cursor-active');
    });

    window.addEventListener('mouseup', () => {
        cursorDot.classList.remove('cursor-active');
        cursorOutline.classList.remove('cursor-active');
    });

    // Interactive element hover expansion
    const interactiveSelector = 'a, button, .btn, .btn-project, .timeline-cert-btn, .glass-card, .cert-card, .skill-card, .project-card, .experience-card, .hamburger, input, textarea, .profile-img-container, .social-icons a, .tech-pill, .thm-badge-card, .timeline-score-badge, .stat-box, .cyber-pill-inline, .nav-eyes-wrapper';

    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactiveSelector)) {
            cursorDot.classList.add('cursor-hover');
            cursorOutline.classList.add('cursor-hover');
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(interactiveSelector)) {
            cursorDot.classList.remove('cursor-hover');
            cursorOutline.classList.remove('cursor-hover');
        }
    });
}

// ==========================================================================
// Cyber Watcher Eyes (Navbar Cursor Tracking & Eye Physics)
// ==========================================================================
const leftEye = document.getElementById('leftEye');
const rightEye = document.getElementById('rightEye');
const leftPupil = document.getElementById('leftPupil');
const rightPupil = document.getElementById('rightPupil');
const navEyesWrapper = document.getElementById('navEyes');

if (leftEye && rightEye && leftPupil && rightPupil) {
    function trackSingleEye(eye, pupil, x, y) {
        const rect = eye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const deltaX = x - eyeCenterX;
        const deltaY = y - eyeCenterY;
        const angle = Math.atan2(deltaY, deltaX);

        const distance = Math.hypot(deltaX, deltaY);
        const maxRadius = 3.6; // max distance pupil can travel
        const moveDist = Math.min(distance / 25, maxRadius);

        const pupilX = Math.cos(angle) * moveDist;
        const pupilY = Math.sin(angle) * moveDist;

        pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    }

    // Track mouse coordinates for both eyes
    window.addEventListener('mousemove', (e) => {
        trackSingleEye(leftEye, leftPupil, e.clientX, e.clientY);
        trackSingleEye(rightEye, rightPupil, e.clientX, e.clientY);
    });

    // Auto-blink logic (natural random intervals)
    function triggerBlink() {
        leftEye.classList.add('blinking');
        rightEye.classList.add('blinking');

        setTimeout(() => {
            leftEye.classList.remove('blinking');
            rightEye.classList.remove('blinking');
        }, 150);

        // Schedule next blink randomly between 3.5s and 6.5s
        const nextBlinkDelay = Math.random() * 3000 + 3500;
        setTimeout(triggerBlink, nextBlinkDelay);
    }
    setTimeout(triggerBlink, 3000);

    // Interactive Click: Playful Wink / Surprise reaction
    if (navEyesWrapper) {
        let isWinking = false;
        navEyesWrapper.addEventListener('click', () => {
            if (isWinking) return;
            isWinking = true;

            // Wink right eye, surprise left eye
            leftEye.classList.add('surprised');
            rightEye.classList.add('blinking');

            setTimeout(() => {
                leftEye.classList.remove('surprised');
                rightEye.classList.remove('blinking');
                isWinking = false;
            }, 500);
        });
    }

    // Idle scanning animation for mobile/touch devices
    if (!window.matchMedia('(pointer: fine)').matches) {
        let scanStep = 0;
        setInterval(() => {
            scanStep = (scanStep + 1) % 4;
            const offsets = [
                { x: -3, y: 0 },
                { x: 0, y: 1 },
                { x: 3, y: 0 },
                { x: 0, y: -1 }
            ];
            const cur = offsets[scanStep];
            leftPupil.style.transform = `translate(${cur.x}px, ${cur.y}px)`;
            rightPupil.style.transform = `translate(${cur.x}px, ${cur.y}px)`;
        }, 1800);
    }
}

// ==========================================================================
// Liquid Glass Interactive Spotlight Tracker
// ==========================================================================
const liquidCards = document.querySelectorAll('.glass-card, .btn, .btn-project, .timeline-cert-btn, .stat-box, .thm-badge-card, .resume-card, .project-card, .cert-card, .about-text, .skills-bars, .skills-categories');

liquidCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

