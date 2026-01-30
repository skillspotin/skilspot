document.addEventListener('DOMContentLoaded', () => {
    const footerHTML = `
    <footer class="site-footer">
        <div class="footer-content">
            <!-- Brand -->
            <div class="footer-brand">
                <h3 class="footer-logo">SkillSpot<span>.in</span></h3>
                <p>Empowering the next generation of tech leaders with premium education and digital solutions.</p>
            </div>
    
            <!-- Quick Links -->
            <div class="footer-links">
                <h4>Platform</h4>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="courses.html">Browse Courses</a></li>
                    <li><a href="blog.html">Blog</a></li>
                    <li><a href="services.html">Our Services</a></li>
                    <li><a href="login.html">Login</a></li>
                </ul>
            </div>
    
            <!-- Legal -->
            <div class="footer-links">
                <h4>Legal & Support</h4>
                <ul>
                    <li><a href="legal.html#privacy">Privacy Policy</a></li>
                    <li><a href="legal.html#terms">Terms & Conditions</a></li>
                    <li><a href="legal.html#refund">Refund Policy</a></li>
                    <li><a href="legal.html#shipping">Shipping Policy</a></li>
                    <li><a href="contact.html">Contact Us</a></li>
                </ul>
            </div>
    
            <!-- Contact -->
            <div class="footer-contact">
                <h4>Connect</h4>
                <p><i class="fa-solid fa-envelope"></i> skillspot.in@gmail.com</p>
                <div style="margin: 5px 0;"></div>
                <p><i class="fa-solid fa-phone"></i> +91 90748 54599</p>
                
                <!-- Colored Social Icons -->
                <div class="social-icons-wrapper" style="display: flex; gap: 15px; flex-wrap: wrap; margin-top: 20px;">
                    <a href="https://www.instagram.com/_skillspot.in/" target="_blank" style="background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888, #8a3ab9); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; box-shadow: 0 4px 10px rgba(220, 39, 67, 0.4);"><i class="fab fa-instagram"></i></a>
                    <a href="https://www.linkedin.com/in/skillspot-in-913735393/" target="_blank" style="background: #0077b5; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; box-shadow: 0 4px 10px rgba(0, 119, 181, 0.4);"><i class="fab fa-linkedin-in"></i></a>
                    <a href="https://www.facebook.com/skillspot.in" target="_blank" style="background: #1877f2; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; box-shadow: 0 4px 10px rgba(24, 119, 242, 0.4);"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://www.youtube.com/@skillspot_in" target="_blank" style="background: #ff0000; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; box-shadow: 0 4px 10px rgba(255, 0, 0, 0.4);"><i class="fab fa-youtube"></i></a>
                    <a href="https://wa.me/919074854599" target="_blank" style="background: #25D366; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; box-shadow: 0 4px 10px rgba(37, 211, 102, 0.4);"><i class="fab fa-whatsapp"></i></a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025 SkillSpot.in. All rights reserved.</p>
        </div>
    </footer>
    `;

    // Inject Global Floating Actions (Scroll Top & WhatsApp)
    const floatingActionsHTML = `
    <div class="floating-actions">
        <!-- WhatsApp (Smart Link) -->
        <a href="javascript:void(0)" onclick="openSmartWhatsApp()" class="floating-btn whatsapp-btn" aria-label="WhatsApp">
            <i class="fa-brands fa-whatsapp"></i>
        </a>

        <!-- Scroll to Top (Bottom of Stack - Below Chatbot) -->
        <button id="scrollToTop" class="floating-btn scroll-btn" aria-label="Scroll to top">
            <i class="fa-solid fa-arrow-up"></i>
        </button>
    </div>
    `;

    // Inject New Styles
    const newStyle = document.createElement('style');
    newStyle.textContent = `
        /* ... existing footer styles ... */
        .site-footer {
            background: var(--bg-card);
            border-top: 1px solid var(--glass-border);
            padding: 40px 19px 20px;
            margin-top: 0; /* Removed gap */
            font-family: var(--font-body);
            transition: background 0.3s ease;
        }
        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 3rem;
            max-width: 1400px;
            margin: 0 auto;
        }
        .footer-logo {
            font-family: var(--font-heading);
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
            color: var(--text-main);
        }
        .footer-logo i, .footer-logo span { color: var(--primary); }
        .footer-brand p { color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; max-width: 300px; }
        .footer-links h4, .footer-contact h4 { font-weight: 700; margin-bottom: 1.5rem; color: var(--text-main); text-transform: uppercase; font-size: 0.85rem; letter-spacing: 1px; }
        .footer-links ul { list-style: none; padding: 0; }
        .footer-links li { margin-bottom: 0.8rem; }
        .footer-links a { color: var(--text-muted); text-decoration: none; transition: 0.2s; font-size: 0.95rem; }
        .footer-links a:hover { color: var(--primary); padding-left: 5px; }
        .footer-contact p { color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 10px; }
        .footer-bottom { text-align: center; margin-top: 2.5rem; padding-top: 2rem; border-top: 1px solid var(--glass-border); color: var(--text-muted); font-size: 0.9rem; }
        
        .social-links { display: flex; gap: 1.2rem; margin-top: 1.5rem; }
        .social-links a { color: var(--primary); font-size: 1.3rem; transition: all 0.3s ease; }
        .social-links a:hover { color: var(--text-main); transform: translateY(-3px); }

        /* Floating Buttons Independent Positioning */
        .floating-btn {
            width: 55px;
            height: 55px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: 2000;
            text-decoration: none; /* For link */
        }
        .floating-btn:hover {
            transform: scale(1.1) translateY(-5px);
        }
        
        /* Scroll: Bottom-most */
        .scroll-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--bg-card);
            color: var(--text-main);
            border: 1px solid var(--glass-border);
            opacity: 0;
            visibility: hidden;
        }
        .scroll-btn.show {
            opacity: 1;
            visibility: visible;
        }

        /* WhatsApp: Top-most */
        .whatsapp-btn {
            position: fixed;
            bottom: 90px;
            right: 20px;
            background: #25D366;
        }
        
        @media (max-width: 768px) {
            .scroll-btn { display: none !important; }
            .whatsapp-btn { bottom: 20px !important; } /* Move WhatsApp down since Scroll btn is gone */
        }

        /* Chatbot Window */
        .chatbot-window {
            position: fixed;
            bottom: 100px;
            right: 30px;
            width: 350px;
            height: 500px;
            background: var(--bg-body);
            border-radius: 24px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.3);
            border: 1px solid var(--glass-border);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            transform: translateY(20px) scale(0.9);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 2001;
            backdrop-filter: blur(20px);
        }
        .chatbot-window.active {
            transform: translateY(0) scale(1);
            opacity: 1;
            visibility: visible;
        }
        .chat-header {
            padding: 20px;
            background: var(--primary);
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .chat-header-info {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .chat-avatar {
            width: 40px;
            height: 40px;
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
        }
        .chat-header h4 { margin: 0; font-size: 1rem; }
        .chat-header span { font-size: 0.75rem; opacity: 0.8; }
        .close-chat { background: none; border: none; color: white; cursor: pointer; font-size: 1.2rem; }

        .chat-body {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        .chat-message {
            padding: 12px 16px;
            border-radius: 18px;
            font-size: 0.9rem;
            max-width: 85%;
            line-height: 1.4;
        }
        .chat-message.bot {
            background: var(--bg-card);
            color: var(--text-main);
            border-bottom-left-radius: 4px;
            align-self: flex-start;
        }
        .chat-message.user {
            background: var(--primary);
            color: white;
            border-bottom-right-radius: 4px;
            align-self: flex-end;
        }

        .chat-input-area {
            padding: 20px;
            border-top: 1px solid var(--glass-border);
        }
        .chat-options {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .chat-opt {
            padding: 10px 15px;
            background: var(--primary-light);
            color: var(--primary);
            border: 1px solid var(--primary);
            border-radius: 12px;
            cursor: pointer;
            font-size: 0.85rem;
            font-weight: 600;
            transition: all 0.2s;
            text-align: left;
        }
        .chat-opt:hover {
            background: var(--primary);
            color: white;
        }

        @media (max-width: 480px) {
            .chatbot-window {
                bottom: 0;
                right: 0;
                width: 100%;
                height: 100%;
                border-radius: 0;
            }
            /* Hide floating buttons when mobile menu is open (user request) */
            body.mobile-menu-active .floating-actions {
                display: none !important;
            }
            .floating-actions {
                bottom: 20px;
                right: 20px;
            }
        }
    `;
    document.head.appendChild(newStyle);

    const actionsContainer = document.createElement('div');
    actionsContainer.innerHTML = floatingActionsHTML;
    document.body.appendChild(actionsContainer);

    // Inject the footer into the placeholder or as a fallback to body
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerHTML;
    } else {
        const footerDiv = document.createElement('div');
        footerDiv.innerHTML = footerHTML;
        document.body.appendChild(footerDiv);
    }

    // --- Logic ---

    // Smart WhatsApp Handling
    window.openSmartWhatsApp = function () {
        const phone = '919074854599';
        const message = encodeURIComponent("Hello SkillSpot! 👋 I am interested in your courses and would like to know more.");
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobile) {
            // Attempt 1: Direct App Scheme with Pre-filled Message
            window.location.href = `whatsapp://send?phone=${phone}&text=${message}`;

            // Attempt 2: Fallback to Universal Link
            setTimeout(() => {
                window.location.href = `https://wa.me/${phone}?text=${message}`;
            }, 500);
        } else {
            // Desktop: Force Web Version
            window.open(`https://web.whatsapp.com/send?phone=${phone}&text=${message}`, '_blank');
        }
    };

    // 1. Scroll to Top
    const scrollBtn = document.getElementById('scrollToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) scrollBtn.classList.add('show');
        else scrollBtn.classList.remove('show');
    });
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

});
