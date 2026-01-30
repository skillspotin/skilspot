/* 
  SkillSpot.in - Minimalist AI Chat Assistant
  Integrated with FAQ and Google Gemini
*/

(function () {
    // 1. Create the Styles
    const styles = `
        .ss-chatbot-bubble {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #6366f1 0%, #a435f0 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
            z-index: 10000;
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .ss-chatbot-bubble:hover {
            transform: scale(1.1) rotate(5deg);
        }

        .ss-chatbot-window {
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 350px;
            height: 500px;
            background: white;
            border-radius: 20px;
            box-shadow: 0 15px 50px rgba(0,0,0,0.15);
            display: none;
            flex-direction: column;
            overflow: hidden;
            z-index: 10000;
            border: 1px solid rgba(0,0,0,0.05);
            font-family: 'Inter', sans-serif;
        }

        .dark-mode .ss-chatbot-window {
            background: #0f172a;
            border-color: rgba(255,255,255,0.1);
        }

        .ss-chatbot-header {
            background: linear-gradient(135deg, #6366f1 0%, #a435f0 100%);
            color: white;
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .ss-chatbot-header h3 {
            margin: 0;
            font-size: 1rem;
            font-weight: 700;
        }

        .ss-chatbot-messages {
            flex-grow: 1;
            padding: 15px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 10px;
            background: #f8fafc;
        }

        .dark-mode .ss-chatbot-messages {
            background: #1e293b;
        }

        .ss-msg {
            max-width: 80%;
            padding: 10px 14px;
            border-radius: 15px;
            font-size: 0.9rem;
            line-height: 1.4;
        }

        .ss-msg-bot {
            align-self: flex-start;
            background: white;
            color: #1e293b;
            border-bottom-left-radius: 2px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }

        .dark-mode .ss-msg-bot {
            background: #334155;
            color: #f1f5f9;
        }

        .ss-msg-user {
            align-self: flex-end;
            background: #6366f1;
            color: white;
            border-bottom-right-radius: 2px;
        }

        .ss-chatbot-input-area {
            padding: 15px;
            display: flex;
            gap: 10px;
            background: white;
            border-top: 1px solid #e2e8f0;
        }

        .dark-mode .ss-chatbot-input-area {
            background: #0f172a;
            border-color: #334155;
        }

        .ss-chatbot-input {
            flex-grow: 1;
            border: 1px solid #e2e8f0;
            border-radius: 10px;
            padding: 8px 12px;
            outline: none;
            font-family: inherit;
        }

        .dark-mode .ss-chatbot-input {
            background: #1e293b;
            border-color: #334155;
            color: white;
        }

        .ss-chatbot-send {
            background: #6366f1;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 10px;
            cursor: pointer;
        }

        .ss-quick-options {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 10px;
        }

        .ss-btn-quick {
            background: rgba(99, 102, 241, 0.1);
            color: #6366f1;
            border: 1px solid rgba(99, 102, 241, 0.2);
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 0.75rem;
            cursor: pointer;
            transition: all 0.2s;
        }

        .ss-btn-quick:hover {
            background: #6366f1;
            color: white;
        }
    `;

    // 2. Knowledge Base (FAQ)
    const knowledgeBase = {
        "courses": "We offer courses in Web Development, Python, AI, Robotics, and more. Check our Courses page!",
        "pricing": "Our basic courses start at just ₹499. Specialized certification paths vary.",
        "location": "Our office is in Malappuram, Kerala, but all our courses are available online globally.",
        "contact": "You can reach us at skillspot.in@gmail.com or call +91 90748 54599.",
        "haris": "Haris Ali P is the founder and CEO of SkillSpot.in.",
        "whatsapp": "You can chat with us on WhatsApp at +91 90748 54599 for instant support.",
        "certificates": "Yes! We provide industry-recognized certificates upon completion of our courses.",
        "job": "We provide placement support and internship opportunities for our premium students.",
        "services": "SkillSpot Digital provides professional App Development, AI Solutions, Web Development, and Automated Marketing services. Let's build your project!",
        "app development": "We specialize in modern App Development using Flutter and React Native. Need a mobile app? Let's talk!",
        "marketing": "Our AI-powered Marketing services help businesses find and convert leads automatically. Check our Marketing solutions!",
        "digital": "We help businesses undergo Digital Transformation with LMS portals, AI automation, and custom software."
    };

    // 3. Render Elements
    const styleEl = document.createElement('style');
    styleEl.innerHTML = styles;
    document.head.appendChild(styleEl);

    const bubble = document.createElement('div');
    bubble.className = 'ss-chatbot-bubble';
    bubble.innerHTML = '<i class="fa-solid fa-comment-dots"></i>';
    document.body.appendChild(bubble);

    const window = document.createElement('div');
    window.className = 'ss-chatbot-window';
    window.innerHTML = `
        <div class="ss-chatbot-header">
            <h3>SkillSpot Assistant 🤖</h3>
            <i class="fa-solid fa-xmark" style="cursor: pointer;" id="ss-chatbot-close"></i>
        </div>
        <div class="ss-chatbot-messages" id="ss-chat-msgs">
            <div class="ss-msg ss-msg-bot">
                Hi! Welcome to SkillSpot. How can I help you today?
                <div class="ss-quick-options">
                    <button class="ss-btn-quick" data-msg="services">Our Services</button>
                    <button class="ss-btn-quick" data-msg="pricing">Pricing</button>
                    <button class="ss-btn-quick" data-msg="courses">Courses</button>
                    <button class="ss-btn-quick" data-msg="whatsapp">WhatsApp</button>
                </div>
            </div>
        </div>
        <div class="ss-chatbot-input-area">
            <input type="text" class="ss-chatbot-input" placeholder="Type a message..." id="ss-chat-input">
            <button class="ss-chatbot-send" id="ss-chat-send"><i class="fa-solid fa-paper-plane"></i></button>
        </div>
    `;
    document.body.appendChild(window);

    // 4. Logic
    const msgContainer = window.querySelector('#ss-chat-msgs');
    const input = window.querySelector('#ss-chat-input');
    const sendBtn = window.querySelector('#ss-chat-send');
    const closeBtn = window.querySelector('#ss-chatbot-close');

    bubble.onclick = () => {
        window.style.display = window.style.display === 'flex' ? 'none' : 'flex';
    };

    closeBtn.onclick = () => window.style.display = 'none';

    function addMessage(text, side = 'bot') {
        const msg = document.createElement('div');
        msg.className = `ss-msg ss-msg-${side}`;
        msg.innerText = text;
        msgContainer.appendChild(msg);
        msgContainer.scrollTop = msgContainer.scrollHeight;
    }

    async function handleResponse(userText) {
        userText = userText.toLowerCase();

        // Check Knowledge Base first (Saves Gemini Calls)
        let found = false;
        for (let key in knowledgeBase) {
            if (userText.includes(key)) {
                addMessage(knowledgeBase[key]);
                found = true;
                break;
            }
        }

        if (found) return;

        // Human Handover / WhatsApp Suggestion for complex queries
        if (userText.length > 50 || userText.includes("help") || userText.includes("talk")) {
            addMessage("I can help with basic questions. For detailed support, please chat with our team on WhatsApp.");
            return;
        }

        // Gemini Integration (Optional / Limited)
        // Note: For a static site, calling Gemini directly needs the key exposed (Risky)
        // Best practice: redirect to WhatsApp for complex stuff to keep the key safe.
        addMessage("I'm not sure about that. Try asking about our courses, pricing, or locations!");
    }

    sendBtn.onclick = () => {
        const val = input.value.trim();
        if (!val) return;
        addMessage(val, 'user');
        input.value = '';
        setTimeout(() => handleResponse(val), 600);
    };

    input.onkeypress = (e) => {
        if (e.key === 'Enter') sendBtn.click();
    };

    // Quick buttons
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('ss-btn-quick')) {
            const key = e.target.getAttribute('data-msg');
            addMessage(e.target.innerText, 'user');
            setTimeout(() => addMessage(knowledgeBase[key]), 600);
        }
    });

})();
