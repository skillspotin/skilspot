const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'project-data');

if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
}

const topics = {
    'robotics': {
        title: 'Robotics', projects: [
            { title: 'Line Follower Robot', desc: 'A robot that follows a black line on a white surface using IR sensors.' },
            { title: 'Obstacle Avoider', desc: 'Robot that detects obstacles using ultrasonic sensors and changes direction.' },
            { title: 'Bluetooth Controlled Car', desc: 'Control your robot car using a smartphone app via Bluetooth.' },
            { title: 'Robotic Arm', desc: '3-DOF robotic arm controlled by potentiometers.' },
            { title: 'Self-Balancing Robot', desc: 'A two-wheeled robot that uses a gyro to stay upright.' }
        ]
    },
    'html5': {
        title: 'HTML5', projects: [
            { title: 'Personal Portfolio', desc: 'A semantic HTML5 portfolio website with sections for about, skills, and contact.' },
            { title: 'Restaurant Menu', desc: 'A structured menu page using semantic tags like article, section, and details.' },
            { title: 'Event Landing Page', desc: 'A marketing page for a conference with registration forms and video embedding.' },
            { title: 'Interactive Form', desc: 'A survey form utilizing new HTML5 input types and validation.' },
            { title: 'Blog Post Template', desc: 'A standard typographic layout for articles using header, footer, main, and aside.' }
        ]
    },
    'css3': {
        title: 'CSS3', projects: [
            { title: 'Flexbox Photo Gallery', desc: 'A responsive image gallery using CSS Flexbox.' },
            { title: 'Grid Dashboard Layout', desc: 'A complex dashboard layout using CSS Grid areas.' },
            { title: 'CSS Animation Loader', desc: 'Creative loading spinners created purely with CSS keyframes.' },
            { title: 'Pricing Cards', desc: 'Responsive pricing tables with hover effects and transitions.' },
            { title: 'Parallax Landing Page', desc: 'A website with smooth parallax scrolling effects.' }
        ]
    },
    'javascript': {
        title: 'JavaScript', projects: [
            { title: 'To-Do List App', desc: 'Add, remove, and mark tasks as complete with local storage persistence.' },
            { title: 'Weather App', desc: 'Fetch weather data from an API and display it dynamically.' },
            { title: 'Calculator', desc: 'A functional calculator with basic arithmetic operations.' },
            { title: 'Digital Clock', desc: 'Real-time clock with date and time formatting.' },
            { title: 'Memory Matching Game', desc: 'A card flipping game to test memory skills.' }
        ]
    },
    'python': {
        title: 'Python', projects: [
            { title: 'Number Guessing Game', desc: 'A CLI game where the user guesses a random number.' },
            { title: 'Web Scraper', desc: 'Extract headlines from a news website using BeautifulSoup.' },
            { title: 'Currency Converter', desc: 'Convert currencies using real-time exchange rates.' },
            { title: 'Simple Chatbot', desc: 'A terminal-based chatbot with predefined responses.' },
            { title: 'File Organizer', desc: 'Script to sort files in a directory by extension.' }
        ]
    },
    'sql': {
        title: 'SQL', projects: [
            { title: 'Library Management System', desc: 'Database schema for books, members, and borrowing records.' },
            { title: 'Employee Database', desc: 'Queries to manage employee details, salaries, and departments.' },
            { title: 'Inventory System', desc: 'Track stock levels, orders, and suppliers.' },
            { title: 'Student Records', desc: 'Database for student grades, attendance, and courses.' },
            { title: 'E-commerce Schema', desc: 'Tables for users, products, orders, and reviews.' }
        ]
    },
    // Add defaults for others
};

// List of all slugs
const allSlugs = [
    'robotics', 'html5', 'css3', 'javascript', 'python', 'sql',
    'java', 'php', 'c', 'cpp', 'csharp', 'bootstrap', 'react', 'mysql', 'jquery', 'excel', 'xml', 'django', 'numpy', 'pandas', 'nodejs', 'dsa',
    'typescript', 'angular', 'git', 'postgresql', 'mongodb', 'ai', 'r', 'kotlin', 'swift', 'sass', 'vue', 'genai', 'aws', 'cybersecurity', 'datascience',
    'w3css', 'aspnet', 'go', 'scipy', 'intro-programming', 'intro-html-css', 'bash', 'rust'
];

allSlugs.forEach(slug => {
    let data = topics[slug];
    if (!data) {
        // Generate generic data
        const niceTitle = slug.charAt(0).toUpperCase() + slug.slice(1);
        data = {
            title: niceTitle,
            projects: [
                { title: `${niceTitle} Hello World`, desc: `Your first program in ${niceTitle}. Setup and basic syntax.` },
                { title: `Calculator in ${niceTitle}`, desc: `Building a basic calculator logic using ${niceTitle}.` },
                { title: `${niceTitle} Data Structures`, desc: `Implementing arrays, lists, or maps in ${niceTitle}.` },
                { title: `File I/O with ${niceTitle}`, desc: `Reading and writing files using ${niceTitle}.` },
                { title: `${niceTitle} Miniproject`, desc: `A small capstone project combining concepts.` }
            ]
        };
    }

    const fileContent = `window.courseDetails = {
    title: "${data.title} Projects",
    description: "Master ${data.title} with these hands-on projects."
};

window.projectsData = [
    ${data.projects.map((p, i) => `{
        id: ${i + 1},
        title: "${p.title}",
        level: "${['beginner', 'beginner', 'intermediate', 'intermediate', 'advanced'][i]}",
        description: "${p.desc}",
        components: ["Software", "Editor"],
        code: "// Code for ${p.title} coming soon...",
        steps: ["Step 1: Setup environment", "Step 2: Write code", "Step 3: Run and test"],
        logic: "Practice core concepts of ${data.title}."
    }`).join(',\n    ')}
];`;

    fs.writeFileSync(path.join(baseDir, `${slug}.js`), fileContent);
    console.log(`Generated ${slug}.js`);
});
