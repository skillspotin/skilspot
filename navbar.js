document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject FontAwesome if missing
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fa = document.createElement('link');
        fa.rel = 'stylesheet';
        fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(fa);
    }

    // Inject Favicon dynamically if needed
    if (!document.querySelector("link[rel*='icon']")) {
        const link = document.createElement('link');
        link.type = 'image/png';
        link.rel = 'icon';
        link.href = 'favicon.png';
        document.head.appendChild(link);
    }

    // 2. Define Navbar HTML
    const navbarHTML = `
    <div class="navbar-container">
        <nav class="main-nav">
            <!-- Mobile Toggle - Left on mobile -->
            <button class="mobile-toggle" aria-label="Toggle Menu">
                <i class="fa-solid fa-bars"></i>
            </button>

            <!-- Logo - Left on Web, Center on Mobile -->
            <a href="index.html" class="nav-logo">
                <div class="logo-text">Skillspot<span>.in</span></div>
            </a>
            
            <!-- Menu - Center on Web -->
            <ul class="nav-menu">
                <li><a href="index.html">Home</a></li>
                <li><a href="courses.html">Courses</a></li>
                <li class="nav-item-dropdown">
                    <a href="services.html" class="nav-link-dropdown">Services <i class="fa-solid fa-chevron-down"></i></a>
                    <div class="mega-menu mega-menu-wide">
                        <div class="mega-column">
                            <h3>For Schools</h3>
                            <a href="services.html#schools">LMS Implementation</a>
                            <a href="services.html#curriculum">Coding Curriculum</a>
                            <a href="services.html#labs">AI Labs Setup</a>
                        </div>
                        <div class="mega-column">
                            <h3>For Companies</h3>
                            <a href="services.html#corporate">Corporate Training</a>
                            <a href="services.html#hiring">Tech Hiring</a>
                            <a href="services.html#consulting">Consulting</a>
                        </div>
                        <div class="mega-feature">
                            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Feature">
                            <p>Partner with SkillSpot to transform your organization.</p>
                            <a href="contact.html" class="feature-link">Get in Touch &rarr;</a>
                        </div>
                    </div>
                </li>
                <li><a href="payment.html" class="nav-accent-link">Subscribe</a></li>
                <li><a href="blog.html">Blog</a></li>
                <li><a href="contact.html">Contact Us</a></li>
            </ul>

            <!-- Icons and Buttons - Right -->
            <div class="nav-right">
                <div class="nav-icons">
                    <!-- Expanding Search -->
                    <div class="nav-search-wrapper" id="searchWrapper">
                        <input type="text" class="nav-search-input" id="inlineSearchInput" placeholder="Search..." aria-label="Search">
                        <button class="nav-icon-btn search-trigger" id="searchTrigger" aria-label="Toggle Search">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                        <div class="inline-search-results" id="inlineSearchResults"></div>
                    </div>

                    <!-- Cart Removed -->
                    <!-- Theme Toggle Removed -->
                    
                </div>
                <div class="nav-buttons desktop-only">
                    <a href="login.html" class="btn btn-secondary">Login</a>
                    <a href="register.html" class="btn btn-primary">Register</a>
                </div>
            </div>
        </nav>
    </div>
    
    <!-- No Search Modal -->
    `;

    // 3. Function to initialize navbar once CSS is ready
    function initNavbar() {
        const navPlaceholder = document.getElementById('navbar-placeholder');
        if (navPlaceholder) {
            navPlaceholder.innerHTML = navbarHTML;
        } else {
            const div = document.createElement('div');
            div.id = 'navbar-placeholder';
            div.innerHTML = navbarHTML;
            document.body.insertBefore(div, document.body.firstChild);
        }
        setupNavbarLogic();
    }

    // 4. Load CSS and then Init
    const navStyle = document.createElement('link');
    navStyle.rel = 'stylesheet';
    navStyle.href = 'navbar.css';
    navStyle.onload = initNavbar;
    document.head.appendChild(navStyle);

    function setupNavbarLogic() {
        const toggle = document.querySelector('.mobile-toggle');
        const menu = document.querySelector('.nav-menu');
        const themeToggles = document.querySelectorAll('.theme-toggle');

        function applyTheme(theme) {
            const body = document.body;
            const logoText = document.querySelector('.logo-text');

            if (theme === 'dark') {
                body.classList.add('dark', 'dark-mode');
                document.documentElement.style.setProperty('--nav-bg', 'rgba(10, 10, 15, 0.95)');
                document.documentElement.style.setProperty('--nav-text', '#f3f4f6');
                if (logoText) logoText.style.color = '#fff';

                // themeToggles.forEach(btn => {
                //     const icon = btn.querySelector('i');
                //     if (icon) {
                //         icon.classList.remove('fa-moon');
                //         icon.classList.add('fa-sun');
                //     }
                // });
            } else {
                body.classList.remove('dark', 'dark-mode');
                document.documentElement.style.setProperty('--nav-bg', 'rgba(255, 255, 255, 0.95)');
                document.documentElement.style.setProperty('--nav-text', '#1f2937');
                if (logoText) logoText.style.color = '#1f2937';

                // themeToggles.forEach(btn => {
                //     const icon = btn.querySelector('i');
                //     if (icon) {
                //         icon.classList.remove('fa-sun');
                //         icon.classList.add('fa-moon');
                //     }
                // });
            }
        }

        const savedTheme = localStorage.getItem('theme') || 'light';
        applyTheme(savedTheme);

        // Theme Toggle Listener Removed
        /*
        themeToggles.forEach(btn => {
            btn.addEventListener('click', () => {
                const currentTheme = localStorage.getItem('theme') || 'light';
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                applyTheme(newTheme);
                localStorage.setItem('theme', newTheme);
            });
        });
        */

        // Search Logic
        const searchWrapper = document.getElementById('searchWrapper');
        const searchTrigger = document.getElementById('searchTrigger');
        const searchInput = document.getElementById('inlineSearchInput');
        const searchResults = document.getElementById('inlineSearchResults');

        if (searchTrigger) {
            searchTrigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                searchWrapper.classList.toggle('active');
                if (searchWrapper.classList.contains('active')) {
                    searchInput.focus();
                } else {
                    searchResults.classList.remove('visible');
                }
            });
        }

        // Mock Search Data
        const searchData = [
            { title: 'Home', url: 'index.html', type: 'Page' },
            { title: 'Courses', url: 'courses.html', type: 'Page' },
            { title: 'Services', url: 'services.html', type: 'Page' },
            { title: 'Contact Us', url: 'contact.html', type: 'Page' },
            { title: 'Blog', url: 'blog.html', type: 'Page' },
            { title: 'Python for AI', url: 'learning.html?course=python', type: 'Course' },
            { title: 'Web Development', url: 'learning.html?course=webdev', type: 'Course' },
            { title: 'Data Science', url: 'learning.html?course=datascience', type: 'Course' },
            { title: 'Corporate Training', url: 'services.html#corporate', type: 'Service' },
            { title: 'Schools Partnership', url: 'services.html#schools', type: 'Service' }
        ];

        if (searchInput) {
            searchInput.addEventListener('click', (e) => e.stopPropagation()); // Prevent close on click

            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                if (query.length < 2) {
                    searchResults.innerHTML = '';
                    searchResults.classList.remove('visible');
                    return;
                }

                const results = searchData.filter(item => item.title.toLowerCase().includes(query));

                if (results.length > 0) {
                    searchResults.innerHTML = results.map(item => `
                        <a href="${item.url}" class="search-result-item">
                            <div class="result-icon"><i class="fa-solid fa-magnifying-glass"></i></div>
                            <div class="result-info">
                                <h4>${item.title}</h4>
                                <p style="font-size: 0.8rem; color: var(--text-muted); margin:0;">${item.type}</p>
                            </div>
                        </a>
                    `).join('');
                    searchResults.classList.add('visible');
                } else {
                    searchResults.innerHTML = '<div class="empty-state" style="padding:15px; text-align:center;">No results found</div>';
                    searchResults.classList.add('visible');
                }
            });
        }

        // Close on click outside (Search & Mobile Menu)
        document.addEventListener('click', (e) => {
            // Search Close
            if (searchWrapper && !searchWrapper.contains(e.target)) {
                searchWrapper.classList.remove('active');
                if (searchResults) searchResults.classList.remove('visible');
            }

            // Mobile Menu Close
            if (menu && menu.classList.contains('active')) {
                if (!menu.contains(e.target) && (!toggle || !toggle.contains(e.target))) {
                    menu.classList.remove('active');
                    document.body.classList.remove('mobile-menu-active');
                    if (toggle) {
                        const icon = toggle.querySelector('i');
                        if (icon) icon.classList.replace('fa-xmark', 'fa-bars');
                    }
                }
            }
        });

        if (toggle && menu) {
            toggle.addEventListener('click', () => {
                menu.classList.toggle('active');
                document.body.classList.toggle('mobile-menu-active'); // Toggle body class for floating button control
                const icon = toggle.querySelector('i');
                if (menu.classList.contains('active')) {
                    icon.classList.replace('fa-bars', 'fa-xmark');
                } else {
                    icon.classList.replace('fa-xmark', 'fa-bars');
                }
            });
        }

        // Mobile Menu Customization (Uniformity Update)
        if (window.innerWidth <= 900 && !menu.querySelector('.mobile-custom-setup')) {
            menu.classList.add('mobile-custom-setup');

            // 1. Hide Desktop Services
            const desktopServices = menu.querySelector('.nav-item-dropdown');
            if (desktopServices) desktopServices.style.display = 'none';

            // Shared Style for Uniformity (Matches navbar.css .nav-menu li a)
            const linkStyle = 'display: block; padding: 0.8rem 1.2rem; width: 100%; font-size: 0.85rem; border-radius: 12px; font-weight: 600; color: var(--nav-text); text-decoration: none; transition: all 0.2s;';
            const registerStyle = 'display: block; padding: 0.8rem 1.2rem; width: 100%; font-size: 0.85rem; border-radius: 12px; font-weight: 600; color: #3b82f6 !important; text-decoration: none; transition: all 0.2s;';

            // 2. Insert Login & Register (Stacked for Uniformity)
            // Login
            const loginLi = document.createElement('li');
            loginLi.innerHTML = `<a href="login.html" style="${linkStyle}">Login</a>`;
            menu.insertBefore(loginLi, menu.firstChild);

            // Register
            const regLi = document.createElement('li');
            regLi.innerHTML = `<a href="register.html" style="${registerStyle}">Register</a>`;
            menu.insertBefore(regLi, menu.children[1]); // After Login

            // 3. Services Accordion (Uniform Header)
            const servicesLi = document.createElement('li');
            servicesLi.className = 'mobile-services-acc';

            servicesLi.innerHTML = `
                <div class="mob-acc-header" style="${linkStyle} display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
                    <a href="services.html" style="color: inherit; text-decoration: none; flex: 1; display: flex; align-items: center;">Services</a>
                    <div class="mob-acc-arrow" style="padding: 10px; margin: -10px;">
                        <i class="fa-solid fa-chevron-down" style="font-size: 0.8rem; transition: transform 0.3s; opacity: 0.7;"></i>
                    </div>
                </div>
                <div class="mob-acc-content" style="display: none; flex-direction: column; gap: 8px; padding: 5px 0 15px 20px;">
                    <!-- New Services -->
                    <a href="services.html#web" style="${linkStyle} font-size: 0.8rem; font-weight: 500; opacity: 0.9;">Web & App Development</a>
                    <a href="services.html#marketing" style="${linkStyle} font-size: 0.8rem; font-weight: 500; opacity: 0.9;">Digital Marketing</a>
                    <a href="services.html#crm" style="${linkStyle} font-size: 0.8rem; font-weight: 500; opacity: 0.9;">CRM & ERP Solutions</a>
                    <a href="services.html#lms" style="${linkStyle} font-size: 0.8rem; font-weight: 500; opacity: 0.9;">LMS Software</a>
                    
                    <!-- Older Services -->
                    <a href="services.html#schools" style="${linkStyle} font-size: 0.8rem; font-weight: 500; opacity: 0.9;">LMS Implementation</a>
                    <a href="services.html#curriculum" style="${linkStyle} font-size: 0.8rem; font-weight: 500; opacity: 0.9;">Coding Curriculum</a>
                    <a href="services.html#corporate" style="${linkStyle} font-size: 0.8rem; font-weight: 500; opacity: 0.9;">Corporate Training</a>
                    <a href="services.html#hiring" style="${linkStyle} font-size: 0.8rem; font-weight: 500; opacity: 0.9;">Tech Hiring</a>
                    <a href="services.html#consulting" style="${linkStyle} font-size: 0.8rem; font-weight: 500; opacity: 0.9;">Consulting</a>
                </div>
            `;

            // Insert after 'Courses' (Index 4 now: Login(0), Register(1), Home(2), Courses(3))
            // Wait, Home is moved down.
            // Original HTML: Home, Courses, Services(Hidden), Subscribe...
            // Inserted 2 items at top.
            // Home is index 2. Courses is index 3.

            const coursesItem = menu.children[3];
            if (coursesItem) {
                coursesItem.after(servicesLi);
            } else {
                menu.appendChild(servicesLi);
            }

            // Toggle Logic
            const header = servicesLi.querySelector('.mob-acc-header');
            const content = servicesLi.querySelector('.mob-acc-content');
            const icon = servicesLi.querySelector('i');

            header.addEventListener('click', (e) => {
                // If the user clicked the link specifically, let it navigate
                if (e.target.tagName === 'A') return;

                e.preventDefault();
                e.stopPropagation();
                const isOpen = content.style.display === 'flex';
                content.style.display = isOpen ? 'none' : 'flex';
                icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
                // Highlight active
                if (!isOpen) {
                    header.style.color = 'var(--primary)';
                    header.style.background = 'rgba(99, 102, 241, 0.1)';
                } else {
                    header.style.color = 'var(--nav-text)';
                    header.style.background = 'transparent';
                }
            });

            // 4. Contact Details at Bottom (Centered)
            const contactLi = document.createElement('li');
            contactLi.className = 'mobile-contact-bottom';
            contactLi.style.cssText = 'margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); width: 100%;';
            contactLi.innerHTML = `
                <div style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; text-align: center;">
                    <div style="margin-bottom:5px;">skillspot.in@gmail.com</div>
                    <div>+91 90748 54599</div>
                </div>
            `;
            menu.appendChild(contactLi);
        }

        const dropdownGroups = document.querySelectorAll('.nav-item-dropdown');
        dropdownGroups.forEach(group => {
            const link = group.querySelector('.nav-link-dropdown');
            link.addEventListener('click', (e) => {
                // If it's desktop view (width > 900), allow navigation by NOT preventing default
                if (window.innerWidth > 900) {
                    // Just close other active dropdowns if any
                    dropdownGroups.forEach(other => {
                        if (other !== group) other.classList.remove('active');
                    });
                    return; // Allow navigation
                }

                e.preventDefault();
                e.stopPropagation();
                dropdownGroups.forEach(other => {
                    if (other !== group) other.classList.remove('active');
                });
                group.classList.toggle('active');
                const mega = group.querySelector('.mega-menu');
                if (window.innerWidth <= 900) {
                    mega.style.display = group.classList.contains('active') ? 'block' : 'none';
                }
            });
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-item-dropdown')) {
                dropdownGroups.forEach(group => {
                    group.classList.remove('active');
                    if (window.innerWidth <= 900) {
                        const mega = group.querySelector('.mega-menu');
                        if (mega) mega.style.display = 'none';
                    }
                });
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                dropdownGroups.forEach(group => {
                    group.classList.remove('active');
                    if (window.innerWidth <= 900) {
                        const mega = group.querySelector('.mega-menu');
                        if (mega) mega.style.display = 'none';
                    }
                });

                // Close search too
                if (searchWrapper) {
                    searchWrapper.classList.remove('active');
                    if (searchResults) searchResults.classList.remove('visible');
                }
            }
        });
        // ---------------------------------------------------------
        // AUTO-REFRESH ON VIEW SWITCH (Nuclear Fix for Navbar Glitch)
        // ---------------------------------------------------------
        let lastWidth = window.innerWidth;
        const MOBILE_BREAKPOINT = 900;

        window.addEventListener('resize', () => {
            const currentWidth = window.innerWidth;

            // Check if we crossed the breakpoint
            const wasMobile = lastWidth <= MOBILE_BREAKPOINT;
            const isMobile = currentWidth <= MOBILE_BREAKPOINT;

            if (wasMobile !== isMobile) {
                // Debounce reload to prevent loops during slow drag
                clearTimeout(window.resizeTimer);
                window.resizeTimer = setTimeout(() => {
                    // console.log('View switched (Mobile <> Desktop). Refreshing for clean layout...');
                    window.location.reload();
                }, 250);
            }

            lastWidth = currentWidth;
        });
    }
});
