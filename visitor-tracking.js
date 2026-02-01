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

            // 4. Construct entry
            const ssUser = JSON.parse(localStorage.getItem('ss_user') || '{}');
            const contactData = JSON.parse(localStorage.getItem('contact_form_data') || '{}');
            const dev = getDeviceInfo();

            const logEntry = {
                id: 'v_' + Date.now(),
                fingerprint: fingerprint,
                timestamp: new Date().toISOString(),
                ip: geoData.ip,
                city: geoData.city,
                org: geoData.org || 'Unknown ISP',
                device: dev.os + ' (' + dev.type + ')',
                browser: dev.browser,
                referrer: referrer,
                page: path,
                action: action, // Action: PAGE_VIEW, HEARTBEAT, or CLICK
                meta: meta,
                name: ssUser.name || contactData.name || fingerprint,
                email: ssUser.email || contactData.email || 'N/A',
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

    // Start tracking when page loads
    if (document.readyState === 'complete') {
        trackVisitor();
    } else {
        window.addEventListener('load', trackVisitor);
    }

})();
