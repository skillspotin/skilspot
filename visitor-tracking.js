/**
 * Visitor Tracking System for SkillSpot.in
 * Automatically detects IP, Location, and User Details
 */

(function () {
    // Configuration
    const STORAGE_KEY = 'skillspot_visitor_logs';
    const SESSION_KEY = 'skillspot_session_tracked';
    const IP_API = 'https://ipapi.co/json/';

    async function trackVisitor(action = 'PAGE_VIEW', meta = {}) {
        const path = window.location.pathname;
        const referrer = document.referrer || 'Direct / Bookmark';

        try {
            // 1. Shadow ID
            let fingerprint = localStorage.getItem('ss_shadow_id');
            if (!fingerprint) {
                fingerprint = 'SHADOW_' + Math.random().toString(36).substring(2, 9).toUpperCase();
                localStorage.setItem('ss_shadow_id', fingerprint);
            }

            // 2. Geo Cache
            let geoData = JSON.parse(sessionStorage.getItem('ss_geo_cache'));
            if (!geoData) {
                const response = await fetch(IP_API);
                geoData = await response.json();
                sessionStorage.setItem('ss_geo_cache', JSON.stringify(geoData));
            }

            // 3. Competitor Check
            const org = (geoData.org || "").toLowerCase();
            const isSuspicious = org.includes('amazon') || org.includes('google') ||
                org.includes('microsoft') || org.includes('hosting') ||
                org.includes('vpn') || org.includes('data center');

            let pageCount = parseInt(sessionStorage.getItem('ss_page_count') || '0');
            if (action === 'PAGE_VIEW') {
                pageCount++;
                sessionStorage.setItem('ss_page_count', pageCount);
            }

            let identityType = 'VISITOR';
            if (isSuspicious) identityType = 'BOT/COMPETITOR';
            else if (pageCount > 5) identityType = 'RESEARCHER/COMPETITOR';

            // 4. Construct entry (Deep Identity Search)
            const ssUser = JSON.parse(localStorage.getItem('ss_user') || '{}');
            const contactData = JSON.parse(localStorage.getItem('contact_form_data') || '{}');
            const userRegistry = JSON.parse(localStorage.getItem('ss_user_registry') || '[]');
            const dev = getDeviceInfo();

            // Try to find identity in registry if not found in current session
            let foundName = ssUser.name || contactData.name;
            let foundEmail = ssUser.email || contactData.email;

            if (!foundName && userRegistry.length > 0) {
                // Heuristic: check if any registered user has ever used this IP (not perfect but helpful)
                const matchedUser = userRegistry.find(u => u.ip === geoData.ip);
                if (matchedUser) {
                    foundName = matchedUser.name + ' (?)';
                    foundEmail = matchedUser.email;
                }
            }

            const logEntry = {
                id: 'v_' + Date.now(),
                fingerprint: fingerprint,
                timestamp: new Date().toISOString(),
                ip: geoData.ip,
                city: geoData.city,
                org: geoData.org || 'Unknown ISP',
                device: dev.os + ' (' + dev.type + ')',
                browser: dev.browser,
                screen: `${window.screen.width}x${window.screen.height}`,
                lang: navigator.language,
                tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
                referrer: referrer,
                page: path,
                action: (typeof action === 'string') ? action : 'PAGE_VIEW',
                meta: meta,
                name: foundName || fingerprint,
                email: foundEmail || 'N/A',
                type: identityType,
                visitDepth: pageCount
            };

            // 5. Save/Sync
            if (action !== 'HEARTBEAT') saveLocalLog(logEntry);
            sendDataToBackend(logEntry);

            // Cloud sync only for page views or significant actions
            if (action === 'PAGE_VIEW' && !sessionStorage.getItem('ss_cloud_synced')) {
                syncToCloud(logEntry);
                sessionStorage.setItem('ss_cloud_synced', 'true');
            }

        } catch (error) {
            console.error('Tracking Error:', error);
        }
    }

    // CLICK STREAM: Track all button and link clicks
    document.addEventListener('click', (e) => {
        const target = e.target.closest('button, a, .clickable');
        if (target) {
            const actionLabel = target.innerText.trim().substring(0, 30) || target.id || 'Unknown Element';
            trackVisitor('CLICK', { element: actionLabel, url: target.href || 'none' });
        }
    }, true);

    // LIVE PULSE: Send heartbeat every 30 seconds
    setInterval(() => trackVisitor('HEARTBEAT'), 30000);

    async function syncToCloud(log) {
        const googleFormUrl = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSddAXUmOCsUmtXQLDoYVqojSioUZOLyGif8UxBz7BhYOIrBYQ/formResponse';
        const formData = new URLSearchParams();
        const details = `IP: ${log.ip}\nCity: ${log.city}\nAction: ${log.action}\nMeta: ${JSON.stringify(log.meta)}\nDevice: ${log.device}`;

        formData.append('entry.2005620554', 'LIVE_INTELLIGENCE');
        formData.append('entry.1045781291', log.email || 'no-email');
        formData.append('entry.1166974658', log.ip);
        formData.append('entry.1065046570', `INTEL: ${log.type}`);
        formData.append('entry.839337160', details);

        try { fetch(googleFormUrl, { method: 'POST', mode: 'no-cors', body: formData }); } catch (e) { }
    }

    function getDeviceInfo() {
        const ua = navigator.userAgent;
        let browser = "Unknown Browser";
        let os = "Unknown OS";
        let type = "Desktop";

        // Browser Detection
        if (ua.indexOf("Firefox") > -1) browser = "Firefox";
        else if (ua.indexOf("Chrome") > -1) browser = "Chrome";
        else if (ua.indexOf("Safari") > -1) browser = "Safari";
        else if (ua.indexOf("Edge") > -1) browser = "Edge";

        // OS Detection
        if (ua.indexOf("Windows") > -1) os = "Windows";
        else if (ua.indexOf("Mac OS") > -1 || ua.indexOf("Macintosh") > -1) os = "Mac OS";
        else if (ua.indexOf("Android") > -1) { os = "Android"; type = "Mobile"; }
        else if (ua.indexOf("iPhone") > -1) { os = "iOS"; type = "Mobile"; }
        else if (ua.indexOf("Linux") > -1) os = "Linux";

        return { browser, os, type };
    }

    function saveLocalLog(entry) {
        let logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        logs.unshift(entry);
        // Keep last 100 logs
        if (logs.length > 100) logs = logs.slice(0, 100);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    }

    async function sendDataToBackend(data) {
        // This is where you'd send data to a real server.
        // For SkillSpot, we'll try to hit a local endpoint if it exists
        try {
            await fetch('http://localhost:3001/api/log-visitor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } catch (e) {
            // Fail silently if no backend
        }
    }

    // START TRACKING
    if (document.readyState === 'complete') {
        trackVisitor('PAGE_VIEW');
        initLeadPopup();
    } else {
        window.addEventListener('load', () => {
            trackVisitor('PAGE_VIEW');
            initLeadPopup();
        });
    }

    // LEAD POPUP LOGIC: Trigger after 9 seconds if identity is unknown
    function initLeadPopup() {
        const isKnown = localStorage.getItem('ss_user') || localStorage.getItem('contact_form_data') || localStorage.getItem('ss_lead_submitted');

        if (!isKnown) {
            setTimeout(showLeadPopup, 9000); // 9 Seconds
        }
    }

    function showLeadPopup() {
        // Double check in case they signed in/contacted while waiting
        if (localStorage.getItem('ss_user') || localStorage.getItem('contact_form_data')) return;

        const overlay = document.createElement('div');
        overlay.id = 'ss-lead-overlay';
        overlay.style = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.7); backdrop-filter: blur(8px);
            z-index: 10000; display: flex; align-items: center; justify-content: center;
            opacity: 0; transition: opacity 0.5s ease;
        `;

        const modal = document.createElement('div');
        modal.style = `
            background: white; padding: 35px; border-radius: 24px; width: 90%; max-width: 400px;
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); text-align: center;
            position: relative; transform: translateY(20px); transition: transform 0.5s ease;
        `;

        modal.innerHTML = `
            <div style="background: #6366f1; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: -65px auto 20px; box-shadow: 0 10px 15px -3px rgba(99,102,241,0.5);">
                <i class="fas fa-gift" style="color: white; font-size: 1.5rem;"></i>
            </div>
            <h2 style="font-family: 'Inter', sans-serif; font-weight: 800; color: #1e293b; margin-bottom: 10px;">Get Free Syllabus!</h2>
            <p style="color: #64748b; font-size: 0.95rem; margin-bottom: 25px;">Enter your details to receive the complete course curriculum and expert guidance.</p>
            <form id="ss-lead-form">
                <input type="text" id="lp-name" placeholder="Full Name" required style="width: 100%; padding: 12px 15px; border-radius: 10px; border: 1px solid #e2e8f0; margin-bottom: 15px; outline: none;">
                <input type="email" id="lp-email" placeholder="Email Address" required style="width: 100%; padding: 12px 15px; border-radius: 10px; border: 1px solid #e2e8f0; margin-bottom: 15px; outline: none;">
                <button type="submit" style="width: 100%; padding: 14px; background: #6366f1; color: white; border: none; border-radius: 10px; font-weight: 700; cursor: pointer; transition: background 0.3s;">Receive Now <i class="fas fa-arrow-right" style="margin-left: 8px;"></i></button>
            </form>
            <button id="ss-close-lp" style="margin-top: 15px; background: none; border: none; color: #94a3b8; font-size: 0.85rem; cursor: pointer; text-decoration: underline;">Maybe later</button>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Animation
        setTimeout(() => {
            overlay.style.opacity = '1';
            modal.style.transform = 'translateY(0)';
        }, 10);

        // Submit Handler
        document.getElementById('ss-lead-form').onsubmit = function (e) {
            e.preventDefault();
            const name = document.getElementById('lp-name').value;
            const email = document.getElementById('lp-email').value;

            localStorage.setItem('ss_lead_submitted', 'true');
            localStorage.setItem('contact_form_data', JSON.stringify({ name, email, phone: 'POPUP_LEAD' }));

            trackVisitor('LEAD_CAPTURE', { name, email, source: '9s_Popup' });

            modal.innerHTML = `
                <div style="background: #10b981; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: -65px auto 20px;">
                    <i class="fas fa-check" style="color: white; font-size: 1.5rem;"></i>
                </div>
                <h2 style="color: #1e293b; margin-bottom: 10px;">Thank You!</h2>
                <p style="color: #64748b;">The syllabus has been sent to your email.</p>
            `;

            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => overlay.remove(), 500);
            }, 2000);
        };

        document.getElementById('ss-close-lp').onclick = () => {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 500);
        };
    }

})();
