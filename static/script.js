// ===================================
// SCHULZKE WEBSITE - ADVANCED ANIMATIONS
// ===================================

document.addEventListener('DOMContentLoaded', function() {

    // ===================================
    // 1. MOBILE MENU
    // ===================================
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const navbar = document.getElementById('navbar');

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');

            // Animate hamburger
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (mobileMenu.classList.contains('hidden')) {
                spans[0].style.transform = 'rotate(0)';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'rotate(0)';
            } else {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            }
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'rotate(0)';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'rotate(0)';
            });
        });
    }

    // ===================================
    // 2. SMOOTH SCROLLING
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===================================
    // 3. NAVBAR SCROLL EFFECT
    // ===================================
    let lastScroll = 0;
    window.addEventListener('scroll', throttle(function() {
        const currentScroll = window.pageYOffset;

        // Navbar shadow
        if (currentScroll <= 0) {
            navbar.classList.remove('shadow-md');
            navbar.classList.add('shadow-sm');
        } else {
            navbar.classList.remove('shadow-sm');
            navbar.classList.add('shadow-md');
        }

        // Keep navbar always visible
        // if (currentScroll > lastScroll && currentScroll > 100) {
        //     navbar.style.transform = 'translateY(-100%)';
        // } else {
        //     navbar.style.transform = 'translateY(0)';
        // }
        navbar.style.transform = 'translateY(0)';

        lastScroll = currentScroll;
    }, 100));

    navbar.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';

    // ===================================
    // 4. ACTIVE NAVIGATION HIGHLIGHTING
    // ===================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavigation() {
        const scrollPosition = window.pageYOffset + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('text-primary-600', 'font-bold');
                    link.classList.add('text-gray-700');

                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.remove('text-gray-700');
                        link.classList.add('text-primary-600', 'font-bold');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', debounce(highlightNavigation, 100));
    highlightNavigation();

    // ===================================
    // 5. SCROLL REVEAL ANIMATIONS
    // ===================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                // Add staggered animation to children
                const children = entry.target.querySelectorAll('.stagger-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all scroll-reveal elements
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });

    // Service cards animation
    document.querySelectorAll('.service-card, .reference-card, .job-card, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // ===================================
    // 6. PARALLAX EFFECT
    // ===================================
    window.addEventListener('scroll', throttle(function() {
        const scrolled = window.pageYOffset;

        // Parallax on hero section
        const heroElements = document.querySelectorAll('.parallax');
        heroElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });

        // Parallax on images
        const parallaxImages = document.querySelectorAll('.parallax-image');
        parallaxImages.forEach(img => {
            const rect = img.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                const yOffset = (scrollPercent - 0.5) * 50;
                img.style.transform = `translateY(${yOffset}px) scale(1.1)`;
            }
        });
    }, 10));

    // ===================================
    // 7. COUNTER ANIMATION (Stats)
    // ===================================
    function animateCounter(element, target, duration = 2000, suffix = '') {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 16);
    }

    // Stats counter observer
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';

                // Animate number
                const numberElement = entry.target.querySelector('.font-bold, [data-count]');
                if (numberElement) {
                    const text = numberElement.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    const suffix = text.includes('+') ? '+' : (text.includes('%') ? '%' : '');

                    numberElement.textContent = '0' + suffix;
                    setTimeout(() => {
                        animateCounter(numberElement, number, 2000, suffix);
                    }, 200);
                }
            }
        });
    }, { threshold: 0.5 });

    // Observe stats sections
    document.querySelectorAll('.stat-item, .grid.grid-cols-3 > div').forEach(stat => {
        statsObserver.observe(stat);
    });

    // ===================================
    // 8. IMAGE TILT EFFECT (3D)
    // ===================================
    const tiltElements = document.querySelectorAll('.tilt-effect, .service-card, .reference-card');
    tiltElements.forEach(element => {
        element.style.transition = 'transform 0.3s ease';

        element.addEventListener('mousemove', function(e) {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale3d(1.02, 1.02, 1.02)`;
        });

        element.addEventListener('mouseleave', function() {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // ===================================
    // 9. PROGRESS BAR ON SCROLL
    // ===================================
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #e14f0f, #f38b40, #f7b577);
        z-index: 9999;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px rgba(224, 79, 15, 0.5);
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', throttle(function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    }, 50));

    // ===================================
    // 10. GALLERY ANIMATIONS
    // ===================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        item.style.transition = 'all 0.6s ease';
        item.style.transitionDelay = `${index * 0.05}s`;

        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });

        // Hover effect
        item.addEventListener('mouseenter', function() {
            this.querySelector('.gallery-overlay')?.classList.add('opacity-100');
        });

        item.addEventListener('mouseleave', function() {
            this.querySelector('.gallery-overlay')?.classList.remove('opacity-100');
        });
    });

    // Reveal gallery items
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }
        });
    }, { threshold: 0.1 });

    galleryItems.forEach(item => galleryObserver.observe(item));

    // ===================================
    // 11. FORM ANIMATIONS
    // ===================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.transform = 'scale(1.02)';
                this.style.boxShadow = '0 0 0 3px rgba(224, 79, 15, 0.1)';
            });

            input.addEventListener('blur', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '';
            });

            // Floating label effect
            input.addEventListener('input', function() {
                if (this.value) {
                    this.classList.add('has-value');
                } else {
                    this.classList.remove('has-value');
                }
            });
        });

        contactForm.addEventListener('submit', function(e) {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                e.preventDefault();

                // Shake animation
                contactForm.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    contactForm.style.animation = '';
                }, 500);

                alert('Bitte füllen Sie alle Pflichtfelder aus.');
                return false;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
                return false;
            }

            // Loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.innerHTML = `
                <svg class="inline w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Wird gesendet...
            `;
            submitButton.disabled = true;
        });
    }

    // ===================================
    // 12. BUTTON HOVER EFFECTS
    // ===================================
    const buttons = document.querySelectorAll('.btn-primary, .bg-primary-600');
    buttons.forEach(btn => {
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.style.transition = 'all 0.3s ease';

        // Ripple effect
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });

        // Hover glow
        btn.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 20px rgba(224, 79, 15, 0.5)';
            this.style.transform = 'translateY(-2px)';
        });

        btn.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
            this.style.transform = 'translateY(0)';
        });
    });

    // ===================================
    // 13. TEXT REVEAL ANIMATION
    // ===================================
    const headings = document.querySelectorAll('h1:not(.hero-title), h2.section-title');
    headings.forEach(heading => {
        const text = heading.textContent;
        const words = text.split(' ');
        heading.innerHTML = '';

        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.opacity = '0';
            span.style.display = 'inline-block';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `all 0.5s ease ${index * 0.05}s`;
            heading.appendChild(span);
        });
    });

    const headingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const spans = entry.target.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0)';
                });
            }
        });
    }, { threshold: 0.3 });

    headings.forEach(h => headingObserver.observe(h));

    // ===================================
    // 14. IMAGE ZOOM ON HOVER
    // ===================================
    const zoomContainers = document.querySelectorAll('.image-zoom-container, .reference-card, .gallery-item');
    zoomContainers.forEach(container => {
        container.style.overflow = 'hidden';

        const img = container.querySelector('img, .reference-image, .gallery-overlay');
        if (img) {
            img.style.transition = 'transform 0.6s ease';
        }

        container.addEventListener('mouseenter', function() {
            if (img) {
                img.style.transform = 'scale(1.15)';
            }
        });

        container.addEventListener('mouseleave', function() {
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // ===================================
    // 15. SCROLL TO TOP BUTTON
    // ===================================
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
    `;
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #e14f0f, #f38b40);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        transform: scale(0);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(224, 79, 15, 0.4);
    `;
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', throttle(function() {
        if (window.pageYOffset > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.transform = 'scale(1)';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.transform = 'scale(0)';
        }
    }, 100));

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 20px rgba(224, 79, 15, 0.6)';
    });

    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 15px rgba(224, 79, 15, 0.4)';
    });

    // ===================================
    // SUCCESS!
    // ===================================
    console.log('🎨 Advanced animations loaded successfully!');
});

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Debounce function
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

// Throttle function
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
// CSS ANIMATIONS
// ===================================
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
