// ===================================
// MODERNE MICROINTERACTIONS & EFFECTS
// Schulzke Bau & Industriemontagen
// ===================================

document.addEventListener('DOMContentLoaded', function() {

    // ===================================
    // 1. GLASSMORPHISM NAVBAR
    // ===================================
    const navbar = document.getElementById('navbar');
    if (navbar) {
        navbar.classList.add('glass-navbar');
    }

    // ===================================
    // 2. LIQUID BUTTONS
    // ===================================
    function applyLiquidEffect() {
        const buttons = document.querySelectorAll('.btn-primary, .bg-primary-600, button[type="submit"]');
        buttons.forEach(btn => {
            btn.classList.add('liquid-button');

            // Vibration on click
            btn.addEventListener('click', function(e) {
                this.style.animation = 'vibrate 0.3s';
                setTimeout(() => {
                    this.style.animation = '';
                }, 300);
            });
        });
    }

    applyLiquidEffect();

    // ===================================
    // 3. INTERACTIVE CARDS mit Glassmorphism
    // ===================================
    function enhanceCards() {
        const cards = document.querySelectorAll('.service-card, .reference-card, .job-card');
        cards.forEach(card => {
            card.classList.add('interactive-card');

            // Mouse move 3D effect
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                this.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-8px)
                    scale(1.02)
                `;
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }

    enhanceCards();

    // ===================================
    // 4. SKELETON LOADING SIMULATION
    // ===================================
    function createSkeletons() {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            const skeleton = document.createElement('div');
            skeleton.className = 'skeleton skeleton-card';
            img.parentElement.insertBefore(skeleton, img);
            img.style.display = 'none';

            // Simulate loading
            setTimeout(() => {
                skeleton.remove();
                img.style.display = 'block';
                img.src = img.dataset.src;
                img.style.animation = 'fadeInUp 0.5s';
            }, Math.random() * 1000 + 500);
        });
    }

    // ===================================
    // 5. HOVER SHINE EFFECT
    // ===================================
    function addShineEffect() {
        const shineElements = document.querySelectorAll('.gallery-item, .reference-card img');
        shineElements.forEach(el => {
            el.classList.add('hover-shine');
        });
    }

    addShineEffect();

    // ===================================
    // 6. MAGNETIC BUTTONS (Desktop only)
    // ===================================
    function magneticButtons() {
        if (window.innerWidth > 768) {
            const buttons = document.querySelectorAll('.btn-primary, .nav-cta');
            buttons.forEach(btn => {
                btn.classList.add('magnetic');

                btn.addEventListener('mousemove', function(e) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;

                    this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
                });

                btn.addEventListener('mouseleave', function() {
                    this.style.transform = 'translate(0, 0)';
                });
            });
        }
    }

    magneticButtons();

    // ===================================
    // 7. PROGRESS BARS mit Animation
    // ===================================
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const value = bar.dataset.value || 75;
            bar.innerHTML = `
                <div class="progress-bar-animated">
                    <div class="progress-bar-fill" style="width: ${value}%"></div>
                </div>
            `;
        });
    }

    animateProgressBars();

    // ===================================
    // 8. TOOLTIP SYSTEM
    // ===================================
    function initTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        tooltipElements.forEach(el => {
            el.classList.add('tooltip');
        });
    }

    initTooltips();

    // ===================================
    // 9. GRADIENT BORDERS für Hero-Elements
    // ===================================
    function addGradientBorders() {
        const heroButtons = document.querySelector('.hero-buttons');
        if (heroButtons) {
            const primaryBtn = heroButtons.querySelector('.btn-primary');
            if (primaryBtn) {
                primaryBtn.classList.add('gradient-border-animated');
            }
        }
    }

    addGradientBorders();

    // ===================================
    // 10. PARTICLE BACKGROUND für Hero
    // ===================================
    function createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        hero.appendChild(particlesContainer);

        // Create 15 particles
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    createParticles();

    // ===================================
    // 11. FLOATING ELEMENTS
    // ===================================
    function addFloatingEffect() {
        const badges = document.querySelectorAll('.hero .inline-flex, .experience-badge');
        badges.forEach((badge, index) => {
            badge.classList.add('float-element');
            badge.style.animationDelay = `${index * 0.5}s`;
        });
    }

    addFloatingEffect();

    // ===================================
    // 12. STAGGER REVEAL für Listen
    // ===================================
    function staggerReveal() {
        const lists = document.querySelectorAll('.services-grid, .jobs-grid, .references-grid');
        lists.forEach(list => {
            list.classList.add('stagger-reveal');
        });
    }

    staggerReveal();

    // ===================================
    // 13. SMOOTH PAGE LOAD ANIMATION
    // ===================================
    function pageLoadAnimation() {
        document.body.style.opacity = '0';
        document.body.style.transform = 'translateY(20px)';

        setTimeout(() => {
            document.body.style.transition = 'opacity 0.6s, transform 0.6s';
            document.body.style.opacity = '1';
            document.body.style.transform = 'translateY(0)';
        }, 100);
    }

    pageLoadAnimation();

    // ===================================
    // 14. GOOEY EFFECT SVG FILTER
    // ===================================
    function injectGooeyFilter() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.display = 'none';
        svg.innerHTML = `
            <defs>
                <filter id="gooey-effect">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="
                        1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 18 -7
                    " result="gooey" />
                    <feBlend in="SourceGraphic" in2="gooey" />
                </filter>
            </defs>
        `;
        document.body.appendChild(svg);
    }

    injectGooeyFilter();

    // ===================================
    // 15. VIBRATE BUTTONS on Error
    // ===================================
    function vibrateOnError(element) {
        element.classList.add('vibrate-on-hover');
        element.style.animation = 'vibrate 0.5s';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    }

    // Expose globally
    window.vibrateOnError = vibrateOnError;

    // ===================================
    // 16. INTERSECTION OBSERVER für lazy effects
    // ===================================
    const effectsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');

                // Add specific animations based on element
                if (entry.target.classList.contains('stat-item')) {
                    entry.target.style.animation = 'bounceIn 0.6s';
                }

                if (entry.target.classList.contains('service-card')) {
                    entry.target.style.animation = 'scaleIn 0.5s';
                }
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements
    document.querySelectorAll('.service-card, .stat-item, .reference-card, .job-card').forEach(el => {
        effectsObserver.observe(el);
    });

    // ===================================
    // 17. CURSOR TRAIL EFFECT (Desktop only)
    // ===================================
    if (window.innerWidth > 1024) {
        let cursorTrail = [];
        const maxTrail = 10;

        document.addEventListener('mousemove', function(e) {
            // Create trail dot
            const dot = document.createElement('div');
            dot.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: rgba(224, 79, 15, 0.5);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                animation: fade-out 0.5s forwards;
            `;

            document.body.appendChild(dot);

            setTimeout(() => dot.remove(), 500);
        });
    }

    // ===================================
    // 18. TOUCH FEEDBACK für Mobile
    // ===================================
    if ('ontouchstart' in window) {
        const touchElements = document.querySelectorAll('button, a, .service-card, .gallery-item');
        touchElements.forEach(el => {
            el.classList.add('touch-feedback');
        });
    }

    // ===================================
    // 19. MORPHING LOADER
    // ===================================
    function showMorphingLoader() {
        const loader = document.createElement('div');
        loader.id = 'morphing-loader';
        loader.innerHTML = `
            <div class="morphing-loader" style="
                border: 4px solid #e14f0f;
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 10000;
            "></div>
        `;
        return loader;
    }

    window.showLoader = showMorphingLoader;

    // ===================================
    // 20. SCROLL-TRIGGERED TEXT GRADIENT
    // ===================================
    window.addEventListener('scroll', throttle(() => {
        const heroTitle = document.querySelector('.hero-title .text-transparent');
        if (heroTitle) {
            const scrollPercent = window.scrollY / window.innerHeight;
            if (scrollPercent < 0.5) {
                heroTitle.classList.add('text-gradient-animated');
            }
        }
    }, 100));

    // ===================================
    // 21. ADVANCED LINK HOVER
    // ===================================
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.style.position = 'relative';

        const underline = document.createElement('span');
        underline.style.cssText = `
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, #e14f0f, #f38b40);
            transition: width 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        `;
        link.appendChild(underline);

        link.addEventListener('mouseenter', function() {
            underline.style.width = '100%';
        });

        link.addEventListener('mouseleave', function() {
            underline.style.width = '0';
        });
    });

    // ===================================
    // 22. PULSE EFFECT on CTA Buttons
    // ===================================
    const ctaButtons = document.querySelectorAll('.hero-buttons .btn-primary');
    ctaButtons.forEach(btn => {
        btn.classList.add('pulse-button');
    });

    // ===================================
    // 23. PERFORMANCE MONITORING
    // ===================================
    console.log('✨ Moderne Interaktionen geladen!');
    console.log('🎨 Aktive Effekte:');
    console.log('  - Glassmorphism ✓');
    console.log('  - Liquid Buttons ✓');
    console.log('  - 3D Card Effects ✓');
    console.log('  - Magnetic Buttons ✓');
    console.log('  - Particle Background ✓');
    console.log('  - Floating Elements ✓');
    console.log('  - Stagger Reveal ✓');
    console.log('  - Touch Feedback ✓');
});

// ===================================
// UTILITY: Throttle Function
// ===================================
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===================================
// CSS KEYFRAMES via JS
// ===================================
const fadeOutKeyframes = `
    @keyframes fade-out {
        to {
            opacity: 0;
            transform: scale(0);
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = fadeOutKeyframes;
document.head.appendChild(styleSheet);
