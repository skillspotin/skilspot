/* 
  SkillSpot.in - Lead Generation Popup Manager
  Version 2.9 - Added Slide-up Animation & 9s Delay
*/
(function () {
    console.log("Lead-Popup.js: Script started");

    const styleTag = document.createElement('style');
    styleTag.textContent = `
        @keyframes popupSlideUp {
            from { opacity: 0; transform: translateY(30px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .lead-popup-content {
            animation: popupSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .lead-popup-input:focus {
            border-color: #6366f1 !important;
            background: rgba(255,255,255,0.06) !important;
            box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
        }
    `;
    document.head.appendChild(styleTag);

    const popupHTML = `
    <div id="leadPopup" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(2, 6, 23, 0.8); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); z-index:999999; justify-content:center; align-items:center; font-family: 'Outfit', sans-serif; transition: all 0.3s ease;">
        <div class="lead-popup-content" style="background:#0f172a; padding:40px; border-radius:28px; text-align:center; max-width:480px; width:92%; position:relative; border:1px solid rgba(255,255,255,0.1); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.8); overflow: hidden;">
            <!-- Decorative gradient blur -->
            <div style="position:absolute; top:-50px; left:-50px; width:150px; height:150px; background:radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%); pointer-events:none;"></div>
            
            <button id="closeLeadPopup" style="position:absolute; top:20px; right:20px; background:rgba(255,255,255,0.05); border:none; color:#94a3b8; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:18px; transition:all 0.2s;">&times;</button>
            
            <div style="margin-bottom: 32px;">
                <div style="width:60px; height:60px; background:linear-gradient(135deg, #6366f1 0%, #a855f7 100%); border-radius:16px; margin:0 auto 20px; display:flex; align-items:center; justify-content:center; box-shadow: 0 10px 20px -5px rgba(99, 102, 241, 0.5);">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path></svg>
                </div>
                <h3 style="color:white; font-size:1.85rem; margin:0 0 10px 0; font-weight:700; letter-spacing:-0.5px;">Unlock Your Potential</h3>
                <p style="color:#94a3b8; margin:0; font-size: 1rem; line-height: 1.5;">Get a Free Career Consultation today!</p>
            </div>
            
            <form id="leadPopupForm">
                <div style="display:flex; flex-direction:column; gap:16px;">
                    <div style="position:relative;">
                        <input type="text" id="pop_name" placeholder="Your Name" required class="lead-popup-input"
                               style="width:100%; padding:14px 16px; border-radius:14px; border:1px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.03); color:white; outline:none; font-size:0.95rem; transition:all 0.3s; box-sizing: border-box;">
                    </div>
                    
                    <div style="position:relative;">
                        <input type="email" id="pop_email" placeholder="Email Address" required class="lead-popup-input"
                               style="width:100%; padding:14px 16px; border-radius:14px; border:1px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.03); color:white; outline:none; font-size:0.95rem; transition:all 0.3s; box-sizing: border-box;">
                    </div>
                    
                    <div style="position:relative;">
                        <input type="tel" id="pop_phone" placeholder="Phone Number" required class="lead-popup-input"
                               style="width:100%; padding:14px 16px; border-radius:14px; border:1px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.03); color:white; outline:none; font-size:0.95rem; transition:all 0.3s; box-sizing: border-box;">
                    </div>
                    
                    <div style="position:relative;">
                        <select id="pop_subject" required class="lead-popup-input"
                                style="width:100%; padding:14px 16px; border-radius:14px; border:1px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.03) url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E') no-repeat right 16px center; background-size: 16px; color:#94a3b8; outline:none; cursor:pointer; appearance: none; -webkit-appearance: none; font-size:0.95rem; transition:all 0.3s; box-sizing: border-box;">
                            <option value="" disabled selected>Select Interest</option>
                            <option value="General Inquiry" style="background:#0f172a; color:white;">General Inquiry</option>
                            <option value="Course Support" style="background:#0f172a; color:white;">Course Support</option>
                            <option value="Business Partnership" style="background:#0f172a; color:white;">Business Partnership</option>
                            <option value="Mentorship Program" style="background:#0f172a; color:white;">Mentorship Program</option>
                        </select>
                    </div>
                    
                    <div style="position:relative;">
                        <textarea id="pop_message" placeholder="Ask us anything..." rows="3" class="lead-popup-input"
                                  style="width:100%; padding:14px 16px; border-radius:14px; border:1px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.03); color:white; outline:none; resize:none; font-size:0.95rem; font-family: inherit; transition:all 0.3s; box-sizing: border-box;"></textarea>
                    </div>
                </div>
                
                <button type="submit" id="popupSubmitBtn" 
                        style="width:100%; margin-top:32px; padding:18px; background:linear-gradient(135deg, #6366f1 0%, #a855f7 100%); color:white; border:none; border-radius:14px; font-weight:600; font-size:1.05rem; cursor:pointer; transition:all 0.3s; box-shadow: 0 10px 20px -5px rgba(99, 102, 241, 0.4); display:flex; align-items:center; justify-content:center; gap:8px;">
                    <span>Book Free Demo</span>
                </button>
            </form>
        </div>
    </div>
    `;

    // Inject immediately
    const inject = () => {
        if (document.getElementById('leadPopup')) return;
        document.body.insertAdjacentHTML('beforeend', popupHTML);

        const popup = document.getElementById('leadPopup');
        const form = document.getElementById('leadPopupForm');
        const submitBtn = document.getElementById('popupSubmitBtn');
        const closeBtn = document.getElementById('closeLeadPopup');

        const showHandler = () => {
            if (localStorage.getItem('leadSubmitted') === 'true') return;
            popup.style.display = 'flex';
        };

        const closeHandler = () => {
            console.log("Lead-Popup.js: Closing popup");
            popup.style.display = 'none';
        };

        closeBtn.onclick = closeHandler;
        closeBtn.onmouseover = () => {
            closeBtn.style.background = 'rgba(255,255,255,0.1)';
            closeBtn.style.color = 'white';
        };
        closeBtn.onmouseout = () => {
            closeBtn.style.background = 'rgba(255,255,255,0.05)';
            closeBtn.style.color = '#94a3b8';
        };

        // Hover effect for button
        submitBtn.onmouseover = () => {
            submitBtn.style.transform = 'translateY(-2px)';
            submitBtn.style.boxShadow = '0 12px 25px -5px rgba(99, 102, 241, 0.5)';
        };
        submitBtn.onmouseout = () => {
            submitBtn.style.transform = 'translateY(0)';
            submitBtn.style.boxShadow = '0 10px 20px -5px rgba(99, 102, 241, 0.4)';
        };

        // Timer - Set to 9 seconds (9000ms) as requested
        setTimeout(showHandler, 9000);

        // Submission
        form.onsubmit = async function (e) {
            e.preventDefault();

            submitBtn.innerHTML = '<span>Sending...</span> <svg class="animate-spin" style="width:18px; height:18px;" viewBox="0 0 24 24"><circle style="opacity:0.25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path style="opacity:0.75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>';
            submitBtn.disabled = true;

            const name = document.getElementById('pop_name').value;
            const email = document.getElementById('pop_email').value;
            const phone = document.getElementById('pop_phone').value;
            const subject = document.getElementById('pop_subject').value;
            const message = document.getElementById('pop_message').value || 'Popup Lead';

            const formData = new URLSearchParams();
            formData.append('entry.2005620554', name);
            formData.append('entry.1045781291', email);
            formData.append('entry.1166974658', phone);
            formData.append('entry.1065046570', subject);
            formData.append('entry.839337160', message);

            formData.append('fvv', '1');
            formData.append('pageHistory', '0');

            try {
                await fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSddAXUmOCsUmtXQLDoYVqojSioUZOLyGif8UxBz7BhYOIrBYQ/formResponse', {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: formData.toString()
                });

                console.log("Lead-Popup.js: Submission successful");
                localStorage.setItem('leadSubmitted', 'true');
                form.reset();

                submitBtn.innerHTML = '<span>Message Sent</span> <i class="fas fa-check" style="margin-left: 8px;"></i>';
                submitBtn.style.background = '#10b981';
                submitBtn.style.boxShadow = '0 10px 20px -5px rgba(16, 185, 129, 0.4)';

                setTimeout(() => {
                    closeHandler();
                    submitBtn.innerHTML = '<span>Book Free Demo</span>';
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 2000);

            } catch (err) {
                console.error("Lead-Popup.js Error:", err);
                submitBtn.innerHTML = '<span>Error Occurred</span>';
                submitBtn.style.background = '#ef4444';

                setTimeout(() => {
                    submitBtn.innerHTML = '<span>Book Free Demo</span>';
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }
        };
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inject);
    } else {
        inject();
    }
})();

