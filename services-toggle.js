/**
 * Business Services & Udemy Tabs Toggle Script
 * Handles tab switching with skeleton loading effect.
 */

document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.skill-tab');
    const slider = document.getElementById('skill-slider');

    // Capture all cards initially present in the slider
    // We assume the slider starts with SOME cards. 
    // If cards are dynamically loaded, this script should run AFTER loading.
    // Index.html has static cards now, so this is fine.
    let allCards = Array.from(document.querySelectorAll('.skill-card'));

    if (!tabs.length || !slider) return;

    // Helper: Create Skeletons HTML
    function getSkeletons(count) {
        let html = '';
        for (let i = 0; i < count; i++) {
            html += `
            <div class="skeleton-card">
                <div class="skeleton-shimmer"></div>
                <div class="skeleton-img"></div>
                <div class="skeleton-block">
                    <div class="skeleton-text long" style="margin-top:10px;"></div>
                    <div class="skeleton-text short"></div>
                    <div class="skeleton-text medium" style="margin-top:auto;"></div>
                </div>
            </div>`;
        }
        return html;
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 1. Update Active State
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.getAttribute('data-category');

            // 2. Show Skeletons (Loading State)
            slider.innerHTML = getSkeletons(3);
            // 3 skeletons to fill the view

            // 3. Wait for effect then Render Data
            setTimeout(() => {
                slider.innerHTML = ''; // Clear skeletons

                // Filter Logic
                // If category is 'all' (not currently used but good to have) or matches data-category
                const filtered = (category === 'all')
                    ? allCards
                    : allCards.filter(card => {
                        const cardCat = card.getAttribute('data-category');
                        // Use accurate matching. 
                        // Note: Some cards might not have data-category if I missed one.
                        return cardCat === category;
                    });

                if (filtered.length === 0) {
                    // If no specific cards, maybe show all or empty state
                    // For now, let's show all if empty so it doesn't look broken
                    // Or show a message
                    if (category === 'ai' && allCards.length > 0) {
                        // Ensure AI card is found. In Step 2353 I added data-category="ai".
                    }

                    if (filtered.length === 0) {
                        slider.innerHTML = '<div style="padding:40px; text-align:center; width:100%; color: var(--text-muted);">No courses available in this category.</div>';
                    }
                } else {
                    filtered.forEach(card => {
                        slider.appendChild(card);
                    });
                }
            }, 800); // 800ms delay for smooth skeleton visual
        });
    });
});
