/* =====================================================
   SCHULZKE PREMIUM INTERACTIONS
   Award-Winning Construction Company Website
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all premium interactions
    initScrollReveal();
    initParallax();
    initNavigation();
    initCounterAnimation();
    initMagneticButtons();
    initSmoothScroll();
    initProjectFilter();
    initMultiStepForm();
    initVideoBackground();
    initGalleryLightbox();
    initTypingEffect();
});

/* ========== Scroll Reveal Animation ========== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-stagger');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: unobserve after revealing
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

/* ========== Advanced Parallax ========== */
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    if (parallaxElements.length === 0) return;

    let ticking = false;

    function updateParallax() {
        const scrollY = window.pageYOffset;

        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.5;
            const rect = el.getBoundingClientRect();
            const elementTop = rect.top + scrollY;
            const viewportCenter = scrollY + window.innerHeight / 2;
            const elementCenter = elementTop + rect.height / 2;
            const distance = viewportCenter - elementCenter;

            el.style.transform = `translateY(${distance * speed * 0.1}px)`;
        });

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
}

/* ========== Navigation ========== */
function initNavigation() {
    const nav = document.querySelector('.nav-premium, #navbar');
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    // Scroll effect for nav
    if (nav) {
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }

            // Hide/show on scroll direction (optional)
            if (currentScroll > lastScroll && currentScroll > 500) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
            lastScroll = currentScroll;
        }, { passive: true });
    }

    // Mobile menu toggle
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileToggle.classList.toggle('active');

            // Animate hamburger to X
            const spans = mobileToggle.querySelectorAll('span');
            if (mobileToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '1';
                spans[2].style.transform = '';
            }
        });

        // Close mobile menu on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileToggle.classList.remove('active');
            });
        });
    }
}

/* ========== Animated Counter ========== */
function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-counter]');

    if (counters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.dataset.counter);
    const duration = 2000;
    const suffix = element.dataset.suffix || '';
    const prefix = element.dataset.prefix || '';
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOutQuart * target);

        element.textContent = prefix + current.toLocaleString('de-DE') + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/* ========== Magnetic Buttons ========== */
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-premium, .magnetic-btn');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

/* ========== Smooth Scroll ========== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ========== Project Filter ========== */
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const projectItems = document.querySelectorAll('[data-category]');

    if (filterButtons.length === 0) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter items
            projectItems.forEach(item => {
                const category = item.dataset.category;

                if (filter === 'all' || category === filter) {
                    item.style.display = '';
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

/* ========== Multi-Step Form ========== */
function initMultiStepForm() {
    const forms = document.querySelectorAll('.multi-step-form');

    forms.forEach(form => {
        const steps = form.querySelectorAll('.form-step');
        const progressDots = form.querySelectorAll('.form-progress-dot');
        const nextBtns = form.querySelectorAll('.form-next');
        const prevBtns = form.querySelectorAll('.form-prev');
        let currentStep = 0;

        function showStep(stepIndex) {
            steps.forEach((step, i) => {
                step.classList.toggle('active', i === stepIndex);
            });

            progressDots.forEach((dot, i) => {
                dot.classList.remove('active', 'completed');
                if (i === stepIndex) {
                    dot.classList.add('active');
                } else if (i < stepIndex) {
                    dot.classList.add('completed');
                }
            });

            // Update button visibility
            prevBtns.forEach(btn => {
                btn.style.display = stepIndex === 0 ? 'none' : '';
            });
        }

        nextBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Validate current step
                const currentStepEl = steps[currentStep];
                const inputs = currentStepEl.querySelectorAll('input[required], textarea[required], select[required]');
                let valid = true;

                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        valid = false;
                        input.classList.add('error');
                        input.addEventListener('input', () => input.classList.remove('error'), { once: true });
                    }
                });

                if (valid && currentStep < steps.length - 1) {
                    currentStep++;
                    showStep(currentStep);
                }
            });
        });

        prevBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (currentStep > 0) {
                    currentStep--;
                    showStep(currentStep);
                }
            });
        });

        // Initial state
        showStep(0);
    });
}

/* ========== Video Background ========== */
function initVideoBackground() {
    const videoContainer = document.querySelector('.hero-video-container');
    if (!videoContainer) return;

    const video = videoContainer.querySelector('video');
    if (!video) return;

    // Pause video when out of view for performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        });
    }, { threshold: 0 });

    observer.observe(videoContainer);
}

/* ========== Gallery Lightbox ========== */
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item-premium, [data-lightbox]');

    if (galleryItems.length === 0) return;

    // Create lightbox container
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-overlay"></div>
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <button class="lightbox-prev">&lsaquo;</button>
            <button class="lightbox-next">&rsaquo;</button>
            <img class="lightbox-image" src="" alt="">
            <div class="lightbox-caption"></div>
        </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxOverlay = lightbox.querySelector('.lightbox-overlay');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');

    let currentIndex = 0;
    const images = Array.from(galleryItems).map(item => ({
        src: item.querySelector('img')?.src || item.dataset.src,
        caption: item.dataset.caption || ''
    }));

    function openLightbox(index) {
        currentIndex = index;
        lightboxImage.src = images[index].src;
        lightboxCaption.textContent = images[index].caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImage.src = images[currentIndex].src;
        lightboxCaption.textContent = images[currentIndex].caption;
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImage.src = images[currentIndex].src;
        lightboxCaption.textContent = images[currentIndex].caption;
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', nextImage);
    lightboxPrev.addEventListener('click', prevImage);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });

    // Add lightbox styles
    const style = document.createElement('style');
    style.textContent = `
        .lightbox {
            position: fixed;
            inset: 0;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        .lightbox.active {
            opacity: 1;
            visibility: visible;
        }
        .lightbox-overlay {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.95);
        }
        .lightbox-content {
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
        }
        .lightbox-image {
            max-width: 100%;
            max-height: 85vh;
            object-fit: contain;
            border-radius: 8px;
        }
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            font-size: 2rem;
            color: white;
            background: none;
            border: none;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.2s;
        }
        .lightbox-close:hover { opacity: 1; }
        .lightbox-prev, .lightbox-next {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            font-size: 3rem;
            color: white;
            background: rgba(0,0,0,0.5);
            border: none;
            padding: 1rem;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.2s;
        }
        .lightbox-prev { left: -60px; }
        .lightbox-next { right: -60px; }
        .lightbox-prev:hover, .lightbox-next:hover { opacity: 1; }
        .lightbox-caption {
            text-align: center;
            color: white;
            margin-top: 1rem;
            font-size: 1rem;
        }
    `;
    document.head.appendChild(style);
}

/* ========== Typing Effect ========== */
function initTypingEffect() {
    const typingElements = document.querySelectorAll('[data-typing]');

    typingElements.forEach(el => {
        const text = el.dataset.typing;
        const speed = parseInt(el.dataset.typingSpeed) || 100;
        let index = 0;

        el.textContent = '';

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                type();
                observer.disconnect();
            }
        });

        observer.observe(el);

        function type() {
            if (index < text.length) {
                el.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        }
    });
}

/* ========== Scroll Progress Indicator ========== */
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #E85A1E, #F5A623);
        z-index: 9999;
        transition: width 0.1s linear;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    }, { passive: true });
}

// Initialize scroll progress
initScrollProgress();

/* ========== Tilt Effect on Cards ========== */
document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

/* ========== Form Validation ========== */
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');

                // Show error message
                let errorMsg = field.parentElement.querySelector('.error-message');
                if (!errorMsg) {
                    errorMsg = document.createElement('span');
                    errorMsg.className = 'error-message';
                    errorMsg.style.cssText = 'color: #ff4444; font-size: 0.875rem; margin-top: 0.25rem; display: block;';
                    errorMsg.textContent = 'Dieses Feld ist erforderlich';
                    field.parentElement.appendChild(errorMsg);
                }
            } else {
                field.classList.remove('error');
                const errorMsg = field.parentElement.querySelector('.error-message');
                if (errorMsg) errorMsg.remove();
            }
        });

        // Email validation
        const emailFields = this.querySelectorAll('input[type="email"]');
        emailFields.forEach(field => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (field.value && !emailRegex.test(field.value)) {
                isValid = false;
                field.classList.add('error');
            }
        });

        if (!isValid) {
            e.preventDefault();
        }
    });
});

/* ========== Lazy Loading Images ========== */
document.querySelectorAll('img[data-src]').forEach(img => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.disconnect();
            }
        });
    });
    observer.observe(img);
});

console.log('Premium Interactions initialized');
