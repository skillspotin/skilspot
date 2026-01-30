/**
 * Social Feed Manager
 * Optimized for Static Grid & Gallery
 */

const FEED_CONFIG = {
    basePath: 'assets/social_feed/',
    items: [
        { type: 'image', src: 'post_23.png' }, // Robot/Tech prioritized (guessed)
        { type: 'image', src: 'post_24.png' }, // Tech prioritized
        { type: 'image', src: 'post_25.png' },
        { type: 'image', src: 'post_22.png' },
        { type: 'image', src: 'post_1.jpeg' },
        { type: 'image', src: 'post_2.jpeg' },
        { type: 'image', src: 'post_3.jpeg' },
        { type: 'image', src: 'post_4.jpeg' },
        { type: 'image', src: 'post_5.jpeg' },
        { type: 'image', src: 'post_6.jpeg' },
        { type: 'image', src: 'post_7.jpeg' },
        { type: 'image', src: 'post_8.jpeg' },
        { type: 'image', src: 'post_9.jpeg' },
        { type: 'image', src: 'post_10.jpeg' },
        { type: 'image', src: 'post_11.jpeg' },
        { type: 'image', src: 'post_12.jpeg' },
        { type: 'image', src: 'post_13.jpeg' },
        { type: 'image', src: 'post_14.jpeg' },
        { type: 'image', src: 'post_15.jpeg' },
        { type: 'image', src: 'post_16.jpeg' },
        { type: 'image', src: 'post_17.jpeg' },
        { type: 'image', src: 'post_18.jpeg' },
        { type: 'image', src: 'post_19.jpeg' },
        { type: 'image', src: 'post_20.png' },
        { type: 'image', src: 'post_21.jpeg' },
        { type: 'image', src: 'post_26.png' },
        { type: 'image', src: 'post_27.png' },
        { type: 'image', src: 'post_28.png' },
        { type: 'image', src: 'post_29.png' }
    ]
};

function createFeedItem(item) {
    const feedItem = document.createElement('div');
    feedItem.className = 'feed-item';

    const img = document.createElement('img');
    img.src = FEED_CONFIG.basePath + item.src;
    img.loading = 'lazy';
    img.alt = 'SkillSpot Social Post';

    feedItem.appendChild(img);

    feedItem.addEventListener('click', () => {
        openLightbox(FEED_CONFIG.basePath + item.src);
    });

    return feedItem;
}

// Helper for Skeleton Effect
function getSkeletonGrid(count) {
    let html = '';
    for (let i = 0; i < count; i++) {
        html += `<div class="skeleton-square"><div class="skeleton-shimmer"></div></div>`;
    }
    return html;
}

function loadHomeGrid() {
    const grid = document.getElementById('homeSocialGrid');
    if (!grid) return;

    // 1. Skeleton Loading State
    grid.innerHTML = getSkeletonGrid(4);

    // 2. Simulate Loading Delay
    setTimeout(() => {
        grid.innerHTML = '';

        const featuredNames = [
            'post_15.jpeg',
            'post_17.jpeg',
            'post_25.png',
            'post_18.jpeg'
        ];

        const displayItems = featuredNames.map(name => {
            return FEED_CONFIG.items.find(item => item.src === name) || { type: 'image', src: name };
        });

        displayItems.forEach(item => {
            const el = createFeedItem(item);
            grid.appendChild(el);
        });
    }, 1200);
}

function loadGalleryGrid() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    // 1. Skeleton Loading State
    grid.innerHTML = getSkeletonGrid(8);

    // 2. Simulate Loading Delay
    setTimeout(() => {
        grid.innerHTML = '';
        // Show all items in gallery
        FEED_CONFIG.items.forEach(item => {
            const el = createFeedItem(item);
            el.style.animation = 'fadeIn 0.5s ease-out';
            grid.appendChild(el);
        });
    }, 1200);
}

// Lightbox Logic
function openLightbox(src) {
    let lightbox = document.getElementById('lightboxModal');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'lightboxModal';
        lightbox.className = 'lightbox-modal';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <img id="lightboxImg" src="" alt="">
            </div>
        `;
        document.body.appendChild(lightbox);

        const closeMod = () => lightbox.classList.remove('active');

        lightbox.querySelector('.lightbox-close').addEventListener('click', closeMod);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeMod();
        });

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMod();
        });
    }

    const lightboxImg = document.getElementById('lightboxImg');
    lightboxImg.src = src;

    // Slight delay to ensure transition works
    setTimeout(() => {
        lightbox.classList.add('active');
    }, 10);
}

document.addEventListener('DOMContentLoaded', () => {
    // Lazy Loading via Intersection Observer
    const lazyObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.id;

                if (targetId === 'homeSocialGrid') {
                    loadHomeGrid();
                } else if (targetId === 'galleryGrid') {
                    loadGalleryGrid();
                }

                // Stop observing once triggered
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '150px', threshold: 0.05 }); // Start loading slightly before element apppears

    const homeGrid = document.getElementById('homeSocialGrid');
    if (homeGrid) lazyObserver.observe(homeGrid);

    const galleryGrid = document.getElementById('galleryGrid');
    if (galleryGrid) lazyObserver.observe(galleryGrid);
});
