// ===================================
// ADVANCED PARALLAX & SCROLL ANIMATIONS
// Schulzke Bau & Industriemontagen
// ===================================

document.addEventListener('DOMContentLoaded', function() {

    let scrollPosition = 0;
    let lastScrollPosition = 0;
    let scrollVelocity = 0;
    let ticking = false;

    // ===================================
    // 1. MULTI-LAYER PARALLAX BACKGROUNDS
    // ===================================
    function initBackgroundParallax() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        // Create multiple parallax layers
        const layers = [
            { speed: 0.2, opacity: 0.3, class: 'parallax-bg-layer-1' },
            { speed: 0.4, opacity: 0.2, class: 'parallax-bg-layer-2' },
            { speed: 0.6, opacity: 0.1, class: 'parallax-bg-layer-3' }
        ];

        layers.forEach((layer, index) => {
            const div = document.createElement('div');
            div.className = `absolute inset-0 ${layer.class} depth-layer-${index + 1}`;
            div.style.cssText = `
                opacity: ${layer.opacity};
                background: radial-gradient(circle at 50% 50%, rgba(224, 79, 15, 0.1), transparent);
                pointer-events: none;
            `;
            div.dataset.speed = layer.speed;
            hero.insertBefore(div, hero.firstChild);
        });
    }

    initBackgroundParallax();

    // ===================================
    // 2. HORIZONTAL SCROLL ON VERTICAL
    // ===================================
    function initHorizontalScroll() {
        const containers = document.querySelectorAll('.horizontal-scroll-trigger');

        containers.forEach(container => {
            const content = container.querySelector('.horizontal-scroll-content');
            if (!content) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        container.dataset.scrollActive = 'true';
                    } else {
                        container.dataset.scrollActive = 'false';
                    }
                });
            }, { threshold: [0, 0.5, 1] });

            observer.observe(container);
        });
    }

    initHorizontalScroll();

    // ===================================
    // 3. MAIN SCROLL HANDLER
    // ===================================
    function handleScroll() {
        scrollPosition = window.pageYOffset;
        scrollVelocity = Math.abs(scrollPosition - lastScrollPosition);

        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
                updateHorizontalScroll();
                updateZoomEffects();
                updateTextSlide();
                updateRevealEffects();
                updateColorShifts();
                updateSectionProgress();

                ticking = false;
            });
            ticking = true;
        }

        lastScrollPosition = scrollPosition;

        // Fast scrolling detection
        if (scrollVelocity > 10) {
            document.body.classList.add('scrolling-fast');
        } else {
            document.body.classList.remove('scrolling-fast');
        }
    }

    // ===================================
    // 4. PARALLAX LAYER MOVEMENT
    // ===================================
    function updateParallax() {
        // Background layers
        document.querySelectorAll('[data-speed]').forEach(element => {
            const speed = parseFloat(element.dataset.speed) || 0.5;
            const yPos = -(scrollPosition * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });

        // Depth layers
        const depthLayers = document.querySelectorAll('.depth-layer-1, .depth-layer-2, .depth-layer-3');
        depthLayers.forEach((layer, index) => {
            const depth = (index + 1) * 0.3;
            const yPos = scrollPosition * depth;
            layer.style.transform = `translateY(${yPos}px)`;
        });

        // Image parallax
        document.querySelectorAll('.image-parallax').forEach(img => {
            const rect = img.getBoundingClientRect();
            const elementTop = rect.top + scrollPosition;
            const elementHeight = rect.height;
            const viewportHeight = window.innerHeight;

            if (rect.top < viewportHeight && rect.bottom > 0) {
                const scrollPercent = (scrollPosition + viewportHeight - elementTop) / (viewportHeight + elementHeight);
                const movement = (scrollPercent - 0.5) * 100; // -50 to +50
                img.style.transform = `translateY(${movement}px)`;
            }
        });
    }

    // ===================================
    // 5. HORIZONTAL SCROLL EFFECT
    // ===================================
    function updateHorizontalScroll() {
        document.querySelectorAll('[data-scroll-active="true"]').forEach(container => {
            const content = container.querySelector('.horizontal-scroll-content');
            if (!content) return;

            const rect = container.getBoundingClientRect();
            const progress = 1 - (rect.top / window.innerHeight);
            const maxScroll = content.scrollWidth - content.clientWidth;
            const scrollAmount = progress * maxScroll * 2; // Multiply for faster scroll

            content.style.transform = `translateX(-${Math.max(0, Math.min(scrollAmount, maxScroll))}px)`;
        });
    }

    // ===================================
    // 6. ZOOM ON SCROLL
    // ===================================
    function updateZoomEffects() {
        document.querySelectorAll('.zoom-on-scroll').forEach(element => {
            const rect = element.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            if (rect.top < viewportHeight && rect.bottom > 0) {
                const progress = 1 - (rect.top / viewportHeight);
                const scale = 1 + (progress * 0.2); // Scale from 1 to 1.2
                element.style.transform = `scale(${Math.min(scale, 1.2)})`;
            }
        });
    }

    // ===================================
    // 7. TEXT SLIDE HORIZONTAL
    // ===================================
    function updateTextSlide() {
        document.querySelectorAll('.text-slide-left, .text-slide-right').forEach(element => {
            const rect = element.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            if (rect.top < viewportHeight && rect.bottom > 0) {
                const progress = (viewportHeight - rect.top) / viewportHeight;
                const maxMove = 100;
                const moveAmount = progress * maxMove;

                if (element.classList.contains('text-slide-left')) {
                    element.style.transform = `translateX(-${moveAmount}px)`;
                } else {
                    element.style.transform = `translateX(${moveAmount}px)`;
                }
            }
        });
    }

    // ===================================
    // 8. REVEAL ANIMATIONS
    // ===================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');

                // Stagger children if present
                const children = entry.target.querySelectorAll('.stagger-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('revealed');
                    }, index * 100);
                });
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    });

    function updateRevealEffects() {
        document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up, .reveal-down, .clip-reveal, .clip-reveal-center').forEach(element => {
            revealObserver.observe(element);
        });
    }

    updateRevealEffects();

    // ===================================
    // 9. COLOR SHIFT ON SCROLL
    // ===================================
    function updateColorShifts() {
        document.querySelectorAll('.color-shift').forEach(element => {
            const rect = element.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            if (rect.top < viewportHeight / 2) {
                element.style.backgroundColor = '#e14f0f';
                element.style.color = 'white';
            } else {
                element.style.backgroundColor = '';
                element.style.color = '';
            }
        });
    }

    // ===================================
    // 10. SECTION PROGRESS INDICATOR
    // ===================================
    function updateSectionProgress() {
        const sections = document.querySelectorAll('section[id]');
        const dots = document.querySelectorAll('.section-progress-dot');

        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const dot = dots[index];

            if (dot && rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                dot.classList.add('active');
            } else if (dot) {
                dot.classList.remove('active');
            }
        });
    }

    // ===================================
    // 11. CREATE SECTION PROGRESS DOTS
    // ===================================
    function createSectionProgress() {
        const sections = document.querySelectorAll('section[id]');
        if (sections.length === 0) return;

        const progressContainer = document.createElement('div');
        progressContainer.className = 'section-progress hidden md:block';

        sections.forEach((section, index) => {
            const dot = document.createElement('div');
            dot.className = 'section-progress-dot';
            dot.dataset.section = section.id;
            dot.addEventListener('click', () => {
                section.scrollIntoView({ behavior: 'smooth' });
            });
            progressContainer.appendChild(dot);
        });

        document.body.appendChild(progressContainer);
    }

    createSectionProgress();

    // ===================================
    // 12. SPLIT TEXT FOR ANIMATION
    // ===================================
    function splitText() {
        document.querySelectorAll('[data-split="words"]').forEach(element => {
            const text = element.textContent;
            const words = text.split(' ');
            element.innerHTML = '';

            words.forEach((word, index) => {
                const span = document.createElement('span');
                span.className = 'split-text-word';
                span.textContent = word + ' ';
                span.style.transitionDelay = `${index * 0.05}s`;
                element.appendChild(span);
            });
        });

        document.querySelectorAll('[data-split="chars"]').forEach(element => {
            const text = element.textContent;
            const chars = text.split('');
            element.innerHTML = '';

            chars.forEach((char, index) => {
                const span = document.createElement('span');
                span.className = 'split-text-char';
                span.textContent = char;
                span.style.transitionDelay = `${index * 0.02}s`;
                element.appendChild(span);
            });
        });

        // Reveal split text when in view
        const splitObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.split-text-word, .split-text-char').forEach(span => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0) rotate(0)';
                    });
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('[data-split]').forEach(el => {
            splitObserver.observe(el);
        });
    }

    splitText();

    // ===================================
    // 13. ROTATE ELEMENTS ON SCROLL
    // ===================================
    function updateRotation() {
        document.querySelectorAll('.scroll-rotate').forEach(element => {
            const rect = element.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            if (rect.top < viewportHeight && rect.bottom > 0) {
                const progress = (viewportHeight - rect.top) / viewportHeight;
                const rotation = progress * 360; // Full rotation
                element.style.transform = `rotate(${rotation}deg)`;
            }
        });
    }

    // ===================================
    // 14. MOUSE PARALLAX (Subtle)
    // ===================================
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
    });

    function updateMouseParallax() {
        document.querySelectorAll('.mouse-parallax').forEach(element => {
            const speed = parseFloat(element.dataset.mouseSpeed) || 0.1;
            const x = mouseX * speed * 50;
            const y = mouseY * speed * 50;
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    // ===================================
    // 15. STICKY SECTIONS
    // ===================================
    function initStickySections() {
        document.querySelectorAll('.sticky-scroll-section').forEach(section => {
            const content = section.querySelector('.sticky-content');
            if (!content) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        content.style.transform = 'scale(1)';
                        content.style.opacity = '1';
                    } else {
                        content.style.transform = 'scale(0.9)';
                        content.style.opacity = '0.5';
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(section);
        });
    }

    initStickySections();

    // ===================================
    // 16. SCROLL VELOCITY EFFECTS
    // ===================================
    function updateVelocityEffects() {
        document.querySelectorAll('.velocity-scale').forEach(element => {
            const velocityFactor = Math.min(scrollVelocity / 20, 1);
            const scale = 1 + (velocityFactor * 0.05);
            element.style.transform = `scale(${scale})`;
        });
    }

    // ===================================
    // 17. WAVE EFFECT FOR LISTS
    // ===================================
    function initWaveEffect() {
        document.querySelectorAll('.wave-container').forEach(container => {
            const items = container.children;
            Array.from(items).forEach((item, index) => {
                item.classList.add('wave-element');
                item.style.animationDelay = `${index * 0.1}s`;
            });
        });
    }

    initWaveEffect();

    // ===================================
    // 18. MAIN ANIMATION LOOP
    // ===================================
    function animate() {
        updateMouseParallax();
        updateRotation();
        updateVelocityEffects();
        requestAnimationFrame(animate);
    }

    animate();

    // ===================================
    // 19. ATTACH SCROLL LISTENER
    // ===================================
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial update
    handleScroll();

    // ===================================
    // 20. DEBUG MODE (optional)
    // ===================================
    if (window.location.search.includes('debug=scroll')) {
        document.body.classList.add('debug-mode');
        const debugDiv = document.createElement('div');
        debugDiv.className = 'debug-scroll-position';
        document.body.appendChild(debugDiv);

        function updateDebug() {
            debugDiv.innerHTML = `
                Scroll: ${Math.round(scrollPosition)}px<br>
                Velocity: ${Math.round(scrollVelocity)}<br>
                Viewport: ${window.innerHeight}px
            `;
            requestAnimationFrame(updateDebug);
        }
        updateDebug();
    }

    // ===================================
    // 21. RESIZE HANDLER
    // ===================================
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            handleScroll();
        }, 250);
    });

    // ===================================
    // 22. CONSOLE OUTPUT
    // ===================================
    console.log('🎢 Advanced Parallax & Scroll Effects loaded!');
    console.log('📊 Active Features:');
    console.log('  ✓ Multi-layer Parallax');
    console.log('  ✓ Horizontal Scroll on Vertical');
    console.log('  ✓ Zoom Effects');
    console.log('  ✓ Text Slide');
    console.log('  ✓ Reveal Animations');
    console.log('  ✓ Color Shifts');
    console.log('  ✓ Section Progress');
    console.log('  ✓ Mouse Parallax');
    console.log('  ✓ Velocity Effects');
    console.log('  ✓ Wave Animations');
});

// ===================================
// UTILITY: Throttle
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
// UTILITY: Debounce
// ===================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
