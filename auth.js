/* 
  SkillSpot.in - Authentication & User Management
  Handles Register, Login, and Session management.
*/

const SkillSpotAuth = {
    // 1. Session Management
    init() {
        console.log("Auth System Initialized");
        this.checkAuth();
    },

    saveUser(userData) {
        localStorage.setItem('ss_user', JSON.stringify(userData));
        // Also add to a global registry for Admin to see
        let registry = JSON.parse(localStorage.getItem('ss_user_registry') || '[]');

        // Avoid duplicates
        if (!registry.find(u => u.email === userData.email)) {
            registry.unshift({
                ...userData,
                date: new Date().toLocaleDateString(),
                status: 'Active'
            });
            localStorage.setItem('ss_user_registry', JSON.stringify(registry));
        }
    },

    getUser() {
        return JSON.parse(localStorage.getItem('ss_user'));
    },

    logout() {
        localStorage.removeItem('ss_user');
        window.location.href = 'index.html';
    },

    // 2. Registration Logic
    handleRegister(e) {
        e.preventDefault();
        const form = e.target;
        const btn = form.querySelector('button');
        const originalText = btn.innerText;

        const userData = {
            name: form.querySelector('input[type="text"]').value,
            email: form.querySelector('input[type="email"]').value,
            role: 'Student' // Default role
        };

        btn.innerText = 'Creating Account...';
        btn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            this.saveUser(userData);

            // Send Welcome Email (Simulation or EmailJS)
            if (window.emailjs) {
                emailjs.send("service_id", "welcome_template", {
                    to_name: userData.name,
                    to_email: userData.email,
                    message: "Welcome to SkillSpot! Your account has been successfully created. Explore our courses today."
                }).then(() => console.log("Welcome email sent!")).catch(err => console.error("Email failed", err));
            }

            alert(`Welcome ${userData.name}! Your account has been created.`);
            window.location.href = 'index.html'; // Redirect to home or dashboard
        }, 1500);
    },

    // 3. Login Logic
    handleLogin(e) {
        e.preventDefault();
        const form = e.target;
        const email = form.querySelector('input[type="email"]').value;
        const password = form.querySelector('input[type="password"]').value;
        const btn = form.querySelector('button');

        btn.innerText = 'Verifying...';
        btn.disabled = true;

        setTimeout(() => {
            // 🚨 MASTER ADMIN CHECK
            if (email === "admin@gmail.com" && password === "123456") {
                const adminUser = {
                    name: "Master Admin",
                    email: "admin@gmail.com",
                    role: "Admin",
                    isAdmin: true
                };
                localStorage.setItem('ss_user', JSON.stringify(adminUser));
                alert("Welcome back, Master Admin!");
                window.location.href = 'admin.html';
                return;
            }

            // Regular User Check
            const registry = JSON.parse(localStorage.getItem('ss_user_registry') || '[]');
            const user = registry.find(u => u.email === email);

            if (user) {
                localStorage.setItem('ss_user', JSON.stringify(user));
                window.location.href = 'index.html';
            } else {
                alert("Account not found. Please register first.");
                btn.innerText = 'Login';
                btn.disabled = false;
            }
        }, 1200);
    },

    // 4. Google Auth Logic
    handleGoogleResponse(response) {
        console.log("Google response received");
        const base64Url = response.credential.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const googleUser = JSON.parse(jsonPayload);

        const userData = {
            name: googleUser.name,
            email: googleUser.email,
            role: 'Student',
            provider: 'google',
            picture: googleUser.picture
        };

        this.saveUser(userData);
        alert(`Welcome ${userData.name}! Logged in via Google.`);
        window.location.href = 'index.html';
    },

    // 5. Utility: Check if logged in on protected pages
    checkAuth() {
        const user = this.getUser();
        const path = window.location.pathname;

        // If on admin or learning page without login, redirect
        if ((path.includes('admin') || path.includes('learning')) && !user) {
            window.location.href = 'login.html';
        }

        // Update Nav UI if user is logged in
        if (user && document.querySelector('.nav-right')) {
            const navRight = document.querySelector('.nav-right');
            // This is handled by navbar.js but we can add extra logic here if needed
        }
    }
};

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => SkillSpotAuth.init());
