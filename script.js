// Simple interactive elements for the landing page
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effect to cards using JS for smoother tilt (optional, but nice)
    console.log('SkillSpot.in initialized');

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

/* FAQ Dropdown Logic */
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            faqItems.forEach(other => {
                if (other !== item) other.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });

    // Udemy-style Slider Logic
    const slider = document.getElementById('udemy-slider');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');

    if (slider && prevBtn && nextBtn) {
        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: 300, behavior: 'smooth' });
        });
        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -300, behavior: 'smooth' });
        });
    }

    // Tab Switching Logic
    const tabs = document.querySelectorAll('.udemy-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            // Here you could fetch/filter content based on data-category
        });
    });
    // Business Services Slider - Infinite Loop Logic
    const bizSlider = document.getElementById('biz-slider-track');
    if (bizSlider) {
        // Clone for infinite scroll
        const cards = Array.from(bizSlider.children);
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            bizSlider.appendChild(clone);
        });

        // The animation is handled by CSS (scrolling-track)
        bizSlider.classList.add('scrolling-track');

        // Optional: Pause on hover
        bizSlider.addEventListener('mouseenter', () => {
            bizSlider.style.animationPlayState = 'paused';
        });
        bizSlider.addEventListener('mouseleave', () => {
            bizSlider.style.animationPlayState = 'running';
        });
    }
});

/* Contact Form Handling - Auto Close Modal (Step 2063) */
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');

    // 1. Force Hide Modal on Load
    if (successModal) {
        successModal.style.display = 'none';
        successModal.classList.remove('active');
    }

    // 2. Handle Form Submission
    if (contactForm && successModal) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Stop page reload

            // Show Modal
            successModal.style.display = 'flex';
            successModal.classList.add('active');

            // Auto Close after 2.5 seconds
            setTimeout(() => {
                successModal.style.display = 'none';
                successModal.classList.remove('active');
                contactForm.reset(); /* Clear form */
            }, 2500);
        });
    }


    const whyGrid = document.querySelector('#why-us .grid-4');
    if (whyGrid) {
        // Clone for infinite scroll on mobile
        // We only want these visible on mobile (handled by CSS .mobile-clone)
        const items = Array.from(whyGrid.children);
        items.forEach(item => {
            const clone = item.cloneNode(true);
            clone.classList.add('mobile-clone');
            whyGrid.appendChild(clone);
        });

        let whyScrollPos = 0;
        const whyCardWidth = 300; // Approx width + gap on mobile
        let whyPaused = false;

        const whyAutoLoop = () => {
            // Only run on mobile
            if (whyPaused || window.innerWidth > 900) return;

            // Scroll Logic
            const maxScroll = whyGrid.scrollWidth / 2;

            if (whyGrid.scrollLeft >= maxScroll - 20) {
                whyGrid.style.scrollBehavior = 'auto';
                whyGrid.scrollLeft = 0;
                setTimeout(() => {
                    whyGrid.style.scrollBehavior = 'smooth';
                    whyPerformScroll();
                }, 50);
            } else {
                whyPerformScroll();
            }
        };

        const whyPerformScroll = () => {
            whyGrid.scrollBy({ left: whyCardWidth, behavior: 'smooth' });
            // Slow Start (move) -> Stop -> Loop
            setTimeout(whyAutoLoop, 3000);
        }

        // Initialize
        setTimeout(whyAutoLoop, 3000);

        // Touch/Hover Pause
        whyGrid.addEventListener('touchstart', () => whyPaused = true, { passive: true });
        whyGrid.addEventListener('touchend', () => {
            whyPaused = false;
            setTimeout(whyAutoLoop, 2000);
        });
    }

    // 3. Handle Manual Close Button
    const closeBtn = document.querySelector('.modal-close-btn');
    if (closeBtn && successModal) {
        closeBtn.addEventListener('click', () => {
            successModal.style.display = 'none';
            successModal.classList.remove('active');
        });
    }
});

