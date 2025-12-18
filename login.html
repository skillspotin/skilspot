<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Advanced Course Portal</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .hidden { display: none; }
        .page-active { display: flex !important; }
        .section-active { display: block !important; }
        .animate-fade { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .loader {
            border: 3px solid #f3f3f3;
            border-top: 3px solid #4f46e5;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            animation: spin 1s linear infinite;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        /* Custom scrollbar for a cleaner look */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
    </style>
</head>
<body class="bg-slate-50 font-sans antialiased text-slate-900">

    <div id="auth-container" class="min-h-screen flex items-center justify-center p-4 bg-indigo-600 page-active">
        <div class="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md animate-fade">
            <div class="flex justify-center mb-6">
                <div class="bg-indigo-100 p-4 rounded-2xl text-indigo-600 font-black text-2xl">CP</div>
            </div>
            <h2 id="auth-title" class="text-3xl font-bold text-center text-slate-800 mb-2">Welcome</h2>
            <p id="auth-subtitle" class="text-center text-slate-500 mb-8 text-sm">Please enter your details to continue</p>
            
            <div class="space-y-4">
                <input type="text" id="reg-name" placeholder="Full Name" class="hidden w-full p-4 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
                <input type="email" id="auth-email" placeholder="Email Address" class="w-full p-4 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
                <input type="password" id="auth-pass" placeholder="Password" class="w-full p-4 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
                
                <button id="main-btn" onclick="handleAuth()" class="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition flex items-center justify-center gap-3 shadow-lg shadow-indigo-200">
                    <span id="btn-text">Login</span>
                    <div id="btn-loader" class="loader hidden"></div>
                </button>
                
                <p class="text-center text-sm text-slate-500 pt-4">
                    <span id="toggle-text">New here?</span> 
                    <button onclick="toggleAuthMode()" id="toggle-btn" class="text-indigo-600 font-bold hover:underline">Create Account</button>
                </p>
            </div>
        </div>
    </div>

    <div id="main-app" class="hidden h-screen w-full flex overflow-hidden">
        <aside class="w-72 bg-slate-900 text-white flex flex-col p-6 shrink-0">
            <div class="flex items-center gap-3 mb-10 px-2">
                <div class="bg-indigo-500 p-2 rounded-lg font-bold">CP</div>
                <h1 class="text-xl font-bold tracking-tight">COURSE<span class="text-indigo-400">PRO</span></h1>
            </div>
            
            <nav class="flex-1 space-y-1">
                <button onclick="navTo('dash')" class="nav-link w-full text-left p-3 rounded-xl hover:bg-slate-800 transition flex items-center gap-3 group">
                    <span class="group-hover:scale-110 transition">🏠</span> Dashboard
                </button>
                <button id="nav-course" onclick="navTo('lessons')" class="nav-link w-full text-left p-3 rounded-xl hover:bg-slate-800 transition flex items-center gap-3 group">
                    <span class="group-hover:scale-110 transition">📖</span> My Lessons
                </button>
                <button id="nav-admin" onclick="navTo('admin')" class="hidden nav-link w-full text-left p-3 rounded-xl hover:bg-slate-800 transition text-amber-400 flex items-center gap-3 border border-amber-400/10 mt-4 group">
                    <span class="group-hover:scale-110 transition">👥</span> Admin Panel
                </button>
            </nav>

            <div class="pt-6 border-t border-slate-800">
                <div class="flex items-center gap-3 px-2 mb-4">
                    <div class="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-sm" id="avatar-init">?</div>
                    <div class="overflow-hidden">
                        <p id="user-display-name" class="text-sm font-bold truncate">User</p>
                        <p id="user-role-tag" class="text-[10px] uppercase text-slate-500 font-black"></p>
                    </div>
                </div>
                <button onclick="logout()" class="w-full p-3 bg-red-500/10 text-red-500 rounded-xl font-bold border border-red-500/10 hover:bg-red-500 hover:text-white transition">
                    Sign Out
                </button>
            </div>
        </aside>

        <main class="flex-1 overflow-y-auto bg-slate-50">
            
            <div id="view-dash" class="view section-active p-10 animate-fade">
                <header class="mb-10">
                    <h2 class="text-4xl font-extrabold text-slate-800 tracking-tight">Welcome back!</h2>
                    <p class="text-slate-500 mt-2 text-lg">You have completed <span class="text-indigo-600 font-bold">4 of 10</span> lessons.</p>
                </header>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                        <div class="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-xl mb-4 text-green-600">✅</div>
                        <h3 class="text-slate-500 text-xs font-bold uppercase tracking-wider">Completed</h3>
                        <p class="text-2xl font-black mt-1 text-slate-800">40%</p>
                    </div>
                    <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                        <div class="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-xl mb-4 text-blue-600">⏱️</div>
                        <h3 class="text-slate-500 text-xs font-bold uppercase tracking-wider">Time Spent</h3>
                        <p class="text-2xl font-black mt-1 text-slate-800">12.5 Hours</p>
                    </div>
                    <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                        <div class="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-xl mb-4 text-amber-600">⭐</div>
                        <h3 class="text-slate-500 text-xs font-bold uppercase tracking-wider">Rank</h3>
                        <p class="text-2xl font-black mt-1 text-slate-800">Beginner</p>
                    </div>
                </div>

                <div class="mt-10 bg-indigo-900 rounded-3xl p-8 text-white flex justify-between items-center shadow-xl shadow-indigo-100">
                    <div>
                        <h3 class="text-2xl font-bold mb-2">Continue Learning</h3>
                        <p class="text-indigo-200">Next Lesson: Environmental Setup for XL Backend</p>
                    </div>
                    <button onclick="navTo('lessons')" class="bg-white text-indigo-900 px-6 py-3 rounded-2xl font-bold hover:bg-indigo-50 transition shadow-lg">Resume Course</button>
                </div>
            </div>

            <div id="view-lessons" class="view hidden h-full animate-fade">
                <div class="flex h-full">
                    <div class="flex-1 p-10 overflow-y-auto">
                        <h2 class="text-3xl font-bold mb-6 text-slate-800">Learning Module</h2>
                        <div class="aspect-video bg-slate-900 rounded-[2rem] shadow-2xl flex items-center justify-center text-white italic overflow-hidden group relative">
                            <div class="absolute inset-0 bg-indigo-600/20 group-hover:bg-transparent transition-all"></div>
                            <div class="text-center z-10">
                                <p class="text-6xl mb-4">🎬</p>
                                <p class="text-white font-bold tracking-widest uppercase text-sm">Main Course Video Player</p>
                            </div>
                        </div>
                        <div class="mt-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                            <h3 class="font-bold text-2xl mb-4 text-slate-800">Lesson 1: Introduction to Apps Script</h3>
                            <p class="text-slate-600 leading-relaxed text-lg">Learn how to build powerful web applications using Google Sheets as your primary database.</p>
                        </div>
                    </div>
                    <div class="w-80 bg-white border-l border-slate-200 p-6 overflow-y-auto">
                        <h3 class="font-bold mb-6 text-slate-500 uppercase text-xs tracking-widest">Course Roadmap</h3>
                        <div class="space-y-3">
                            <div class="p-4 bg-slate-50 rounded-2xl border border-indigo-100 flex gap-3 items-center">
                                <span class="text-indigo-600 font-bold">01</span>
                                <p class="text-sm font-bold">Introduction</p>
                            </div>
                            <div class="p-4 bg-white rounded-2xl border border-slate-100 flex gap-3 items-center opacity-60">
                                <span class="text-slate-400 font-bold">02</span>
                                <p class="text-sm font-bold">Setup</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="view-admin" class="view hidden p-10 animate-fade">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h2 class="text-3xl font-black text-slate-800 italic uppercase tracking-tighter">Admin Control</h2>
                        <p class="text-slate-500">Manage your student database</p>
                    </div>
                    <div class="flex gap-2 w-full md:w-auto">
                        <input type="text" id="admin-search" onkeyup="filterUsers()" placeholder="Search students..." class="px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-64 text-sm shadow-sm">
                        <button onclick="fetchAdminUsers()" class="bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-100">🔄</button>
                    </div>
                </div>
                
                <div class="bg-white rounded-3xl shadow-sm overflow-hidden border border-slate-200">
                    <table class="w-full text-left" id="user-table">
                        <thead class="bg-slate-50 border-b text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">
                            <tr>
                                <th class="p-6">Name</th>
                                <th class="p-6">Email Address</th>
                                <th class="p-6 text-center">Role</th>
                            </tr>
                        </thead>
                        <tbody id="admin-table-body" class="divide-y divide-slate-100"></tbody>
                    </table>
                </div>
            </div>
        </main>
    </div>

    <script>
        const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyndzHLKPDa-L5Bg8k12l4RCIaHt1ejVIsB8w8QHrmCvsgNd5A7knHYwXFzZjnjNRU4/exec";
        let isSignupMode = false;
        let cachedUsers = [];

        // INITIAL CHECK FOR SESSION
        window.onload = () => {
            const savedUser = localStorage.getItem('cp_user');
            if(savedUser) {
                const user = JSON.parse(savedUser);
                loginToUI(user);
            }
        };

        function toggleAuthMode() {
            isSignupMode = !isSignupMode;
            document.getElementById('auth-title').innerText = isSignupMode ? 'Create Account' : 'Welcome';
            document.getElementById('auth-subtitle').innerText = isSignupMode ? 'Start your learning journey' : 'Please enter your details to continue';
            document.getElementById('btn-text').innerText = isSignupMode ? 'Register' : 'Login';
            document.getElementById('reg-name').classList.toggle('hidden', !isSignupMode);
            document.getElementById('toggle-text').innerText = isSignupMode ? 'Already a member?' : 'New here?';
            document.getElementById('toggle-btn').innerText = isSignupMode ? 'Login' : 'Create Account';
        }

        async function handleAuth() {
            const action = isSignupMode ? 'signup' : 'login';
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('auth-email').value;
            const pass = document.getElementById('auth-pass').value;

            if (!email || !pass) return alert("All fields are required.");

            toggleLoading(true);
            const url = `${SCRIPT_URL}?action=${action}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(pass)}`;

            try {
                const res = await fetch(url);
                const data = await res.json();

                if (data.status === 'success') {
                    if (isSignupMode) {
                        alert("Account created! You can now log in.");
                        toggleAuthMode();
                    } else {
                        localStorage.setItem('cp_user', JSON.stringify(data));
                        loginToUI(data);
                    }
                } else {
                    alert(data.message || "Invalid credentials.");
                }
            } catch (err) {
                alert("Error connecting to server. Check script deployment.");
            } finally {
                toggleLoading(false);
            }
        }

        function loginToUI(user) {
            document.getElementById('auth-container').classList.remove('page-active');
            document.getElementById('auth-container').classList.add('hidden');
            document.getElementById('main-app').classList.add('page-active');
            
            document.getElementById('user-display-name').innerText = user.name;
            document.getElementById('avatar-init').innerText = user.name.charAt(0);
            document.getElementById('user-role-tag').innerText = user.role;

            if (user.role.toLowerCase() === 'admin') {
                document.getElementById('nav-admin').classList.remove('hidden');
            }
        }

        function logout() {
            localStorage.removeItem('cp_user');
            location.reload();
        }

        function toggleLoading(isLoading) {
            document.getElementById('btn-text').classList.toggle('hidden', isLoading);
            document.getElementById('btn-loader').classList.toggle('hidden', !isLoading);
            document.getElementById('main-btn').disabled = isLoading;
        }

        function navTo(view) {
            document.querySelectorAll('.view').forEach(v => {
                v.classList.add('hidden');
                v.classList.remove('section-active');
            });
            document.getElementById('view-' + view).classList.add('section-active');
            if (view === 'admin') fetchAdminUsers();
        }

        async function fetchAdminUsers() {
            const tbody = document.getElementById('admin-table-body');
            tbody.innerHTML = '<tr><td colspan="3" class="p-10 text-center"><div class="loader mx-auto"></div></td></tr>';
            
            try {
                const res = await fetch(SCRIPT_URL);
                cachedUsers = await res.json();
                renderUsers(cachedUsers);
            } catch (err) {
                tbody.innerHTML = '<tr><td colspan="3" class="p-10 text-center text-red-500">Failed to load.</td></tr>';
            }
        }

        function renderUsers(users) {
            const tbody = document.getElementById('admin-table-body');
            tbody.innerHTML = users.map(u => `
                <tr class="hover:bg-slate-50 transition border-b border-slate-50 last:border-0">
                    <td class="p-6 font-bold text-slate-700">${u.name}</td>
                    <td class="p-6 text-slate-500">${u.email}</td>
                    <td class="p-6 text-center">
                        <span class="px-3 py-1 ${u.role === 'admin' ? 'bg-amber-100 text-amber-700' : 'bg-indigo-50 text-indigo-700'} rounded-full text-[10px] font-black uppercase tracking-widest">
                            ${u.role}
                        </span>
                    </td>
                </tr>
            `).join('');
        }

        function filterUsers() {
            const term = document.getElementById('admin-search').value.toLowerCase();
            const filtered = cachedUsers.filter(u => u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term));
            renderUsers(filtered);
        }
    </script>
</body>
</html>
