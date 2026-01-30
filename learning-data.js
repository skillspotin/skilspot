const courseData = {
    "html": {
        title: "HTML5",
        icon: "fa-brands fa-html5",
        color: "#E34F26",
        sections: [
            {
                module: "Module 1: Introduction",
                title: "HTML Introduction",
                type: "doc",
                content: `<h2 style="color:var(--text-main);">What is HTML?</h2>
                          <p>HTML stands for Hyper Text Markup Language. It is the standard markup language for creating Web pages.</p>
                          <ul style="margin-left:20px; margin-bottom:20px; line-height:1.6;">
                              <li>HTML describes the structure of a Web page</li>
                              <li>HTML consists of a series of elements</li>
                              <li>HTML elements tell the browser how to display the content</li>
                          </ul>
                          <h3>A Simple HTML Document</h3>
                          <div class="w3-code">&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;Page Title&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;h1&gt;My First Heading&lt;/h1&gt;
&lt;p&gt;My first paragraph.&lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;</div>
                          <p>The <code>&lt;!DOCTYPE html&gt;</code> declaration defines that this document is an HTML5 document. The <code>&lt;html&gt;</code> element is the root element of an HTML page.</p>`,
                steps: ["Document Structure", "Tags vs Elements", "Doctype Declaration", "Page Title"],
                quiz: [
                    { q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"], a: 0 },
                    { q: "Who is making the Web standards?", options: ["Google", "Microsoft", "The World Wide Web Consortium"], a: 2 }
                ]
            },
            {
                module: "Module 1: Introduction",
                title: "HTML Editors",
                type: "doc",
                content: `<h2 style="color:var(--text-main);">Write HTML Using Notepad or TextEdit</h2>
                          <p>Web pages can be created and modified by using professional HTML editors. However, for learning HTML we recommend a simple text editor like Notepad (PC) or TextEdit (Mac).</p>
                          <h3>Step 1: Open Notepad (PC)</h3>
                          <p>Open <strong>Start</strong> > <strong>Programs</strong> > <strong>Accessories</strong> > <strong>Notepad</strong></p>
                          <h3>Step 2: Write Some HTML</h3>
                          <div class="w3-code">&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;body&gt;

&lt;h1&gt;My First Heading&lt;/h1&gt;
&lt;p&gt;My first paragraph.&lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;</div>
                          <h3>Step 3: Save the HTML Page</h3>
                          <p>Save the file on your computer. Select <strong>File > Save as</strong> in the Notepad menu. Name the file <strong>"index.htm"</strong> and set the encoding to <strong>UTF-8</strong>.</p>`,
                steps: ["Using Notepad", "Saving .html files", "Viewing in Browser", "VS Code (Recommended)"],
                quiz: [
                    { q: "What is the recommended file extension for HTML files?", options: [".ht", ".xml", ".html"], a: 2 },
                    { q: "Can you write HTML in Microsoft Word?", options: ["Yes, it works perfectly", "No, use a text editor", "Only for headings"], a: 1 }
                ]
            },
            {
                module: "Module 2: Elements",
                title: "HTML Elements",
                type: "doc",
                content: `<h2 style="color:var(--text-main);">HTML Elements</h2>
                          <p>An HTML element is defined by a start tag, some content, and an end tag.</p>
                          <div class="w3-code">&lt;tagname&gt; Content goes here... &lt;/tagname&gt;</div>
                          <p>The HTML <strong>element</strong> is everything from the start tag to the end tag:</p>
                          <div class="w3-code">&lt;p&gt;My first paragraph.&lt;/p&gt;</div>
                          <h3>Nested HTML Elements</h3>
                          <p>HTML elements can be nested (this means that elements can contain other elements). All HTML documents consist of nested HTML elements.</p>`,
                steps: ["Start & End Tags", "Empty Elements", "Nested Elements", "Case Sensitivity"],
                quiz: [
                    { q: "Which character is used to indicate an end tag?", options: ["<", "/", "*"], a: 1 },
                    { q: "Do all HTML elements need an end tag?", options: ["Yes, always", "No, some are empty elements", "Only in headings"], a: 1 }
                ]
            },
            {
                module: "Module 2: Elements",
                title: "HTML Attributes",
                type: "doc",
                content: `<h2 style="color:var(--text-main);">HTML Attributes</h2>
                          <p>Attributes provide additional information about HTML elements.</p>
                          <ul style="margin-left:20px; line-height:1.6;">
                              <li>All HTML elements can have <b>attributes</b></li>
                              <li>Attributes provide <b>additional information</b> about elements</li>
                              <li>Attributes are always specified in the <b>start tag</b></li>
                              <li>Attributes usually come in name/value pairs like: <b>name="value"</b></li>
                          </ul>
                          <h3>The href Attribute</h3>
                          <p>The <code>&lt;a&gt;</code> tag defines a hyperlink. The <code>href</code> attribute specifies the URL of the page the link goes to:</p>
                          <div class="w3-code">&lt;a href="https://www.w3schools.com"&gt;Visit W3Schools&lt;/a&gt;</div>`,
                steps: ["The href Attribute", "The src Attribute", "Width and Height", "The alt Attribute"],
                quiz: [
                    { q: "Where are attributes specified?", options: ["The end tag", "The start tag", "The content"], a: 1 },
                    { q: "What is the correct format?", options: ["name='value'", "name:value", "name(value)"], a: 0 }
                ]
            },
            {
                module: "Module 3: Media",
                title: "HTML Images",
                type: "doc",
                content: `<h2 style="color:var(--text-main);">HTML Images Syntax</h2>
                          <p>The HTML <code>&lt;img&gt;</code> tag is used to embed an image in a web page.</p>
                          <p>Images are not technically inserted into a web page; images are linked to web pages. The <code>&lt;img&gt;</code> tag creates a holding space for the referenced image.</p>
                          <p>The <code>&lt;img&gt;</code> tag is empty, it contains attributes only, and does not have a closing tag.</p>
                          <div class="w3-code">&lt;img src="url" alt="alternatetext"&gt;</div>
                          <h3>The src Attribute</h3>
                          <p>The required <code>src</code> attribute specifies the path (URL) to the image.</p>
                          <h3>The alt Attribute</h3>
                          <p>The required <code>alt</code> attribute provides an alternate text for an image, if the user for some reason cannot view it (because of slow connection, an error in the src attribute, or if the user uses a screen reader).</p>`,
                steps: ["Image Syntax", "The src Attribute", "The alt Attribute", "Image Width/Height"],
                quiz: [
                    { q: "Which attribute specifies the image URL?", options: ["link", "href", "src"], a: 2 },
                    { q: "Is the <img> tag empty?", options: ["Yes", "No"], a: 0 }
                ]
            },
            {
                module: "Module 3: Media",
                title: "HTML Tables",
                type: "doc",
                content: `<h2 style="color:var(--text-main);">HTML Tables</h2>
                          <p>HTML tables allow web developers to arrange data into rows and columns.</p>
                          <h3>Define an HTML Table</h3>
                          <p>The <code>&lt;table&gt;</code> tag defines an HTML table.</p>
                          <p>Each table row is defined with a <code>&lt;tr&gt;</code> tag. Each table header is defined with a <code>&lt;th&gt;</code> tag. Each table data/cell is defined with a <code>&lt;td&gt;</code> tag.</p>
                          <div class="w3-code">&lt;table&gt;
  &lt;tr&gt;
    &lt;th&gt;Person 1&lt;/th&gt;
    &lt;th&gt;Person 2&lt;/th&gt;
    &lt;th&gt;Person 3&lt;/th&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;Emil&lt;/td&gt;
    &lt;td&gt;Tobias&lt;/td&gt;
    &lt;td&gt;Linus&lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;</div>`,
                steps: ["Table Rows", "Table Headers", "Table Data", "Borders"],
                quiz: [
                    { q: "Which tag defines a table row?", options: ["<td>", "<th>", "<tr>"], a: 2 },
                    { q: "Which tag defines a table header?", options: ["<thead>", "<th>", "<header>"], a: 1 }
                ]
            },
            {
                module: "Module 4: Lists",
                title: "HTML Lists",
                type: "doc",
                content: `<h2 style="color:var(--text-main);">HTML Lists</h2>
                          <p>HTML lists allow web developers to group a set of related items in lists.</p>
                          <h3>Unordered HTML List</h3>
                          <p>An unordered list starts with the <code>&lt;ul&gt;</code> tag. Each list item starts with the <code>&lt;li&gt;</code> tag.</p>
                          <div class="w3-code">&lt;ul&gt;
  &lt;li&gt;Coffee&lt;/li&gt;
  &lt;li&gt;Tea&lt;/li&gt;
  &lt;li&gt;Milk&lt;/li&gt;
&lt;/ul&gt;</div>
                          <h3>Ordered HTML List</h3>
                          <p>An ordered list starts with the <code>&lt;ol&gt;</code> tag.</p>`,
                steps: ["Unordered Lists", "Ordered Lists", "Description Lists", "List Markers"],
                quiz: [
                    { q: "Which tag creates a bulleted list?", options: ["<ol>", "<ul>", "<dl>"], a: 1 },
                    { q: "Which tag creates a numbered list?", options: ["<ol>", "<ul>", "<list>"], a: 0 }
                ]
            },
            {
                module: "Module 5: Project",
                title: "HTML5 Starter",
                type: "project",
                content: `<h2 style="color:var(--text-main);">Build a Portfolio Layout</h2>
                          <p>Use all the concepts you have learned to build a simple personal portfolio page.</p>
                          <ul style="margin-left:20px; line-height:1.6;">
                            <li>Use an <code>&lt;h1&gt;</code> for your name.</li>
                            <li>Use an <code>&lt;img&gt;</code> for your photo.</li>
                            <li>Use a <code>&lt;ul&gt;</code> for your skills.</li>
                            <li>Use a <code>&lt;table&gt;</code> for your experience.</li>
                          </ul>
                          <p>Good luck!</p>`,
                steps: ["Setup Structure", "Add Header", "Add Image", "Create Lists"],
                quiz: []
            }
        ]
    },
    "css": {
        title: "CSS3",
        icon: "fa-brands fa-css3-alt",
        color: "#1572B6",
        sections: [
            {
                module: "Module 1: Fundamentals",
                title: "Select & Style",
                type: "doc",
                content: "CSS (Cascading Style Sheets) describes how HTML elements are to be displayed.",
                steps: ["Element Selector", "Class (.) Selector", "ID (#) Selector", "Grouping Selectors"],
                quiz: [
                    { q: "Which selector matches elements with class 'box'?", options: ["#box", ".box", "*box"], a: 1 },
                    { q: "How do you select an element with id 'header'?", options: [".header", "#header", "header"], a: 1 }
                ]
            },
            {
                module: "Module 2: Layout",
                title: "The Box Model",
                type: "doc",
                content: "In CSS, the term 'box model' is used when talking about design and layout. It consists of: margins, borders, padding, and the actual content.",
                steps: ["Content Area", "Padding (Inner)", "Border (Edge)", "Margin (Outer)"],
                quiz: [
                    { q: "Which property is outside the border?", options: ["Padding", "Margin", "Content"], a: 1 },
                    { q: "Which property adds space inside the border?", options: ["Margin", "Padding", "Outline"], a: 1 }
                ]
            },
            {
                module: "Module 2: Layout",
                title: "Flexbox",
                type: "doc",
                content: "The Flexible Box Layout Module, makes it easier to design flexible responsive layout structure without using float or positioning.",
                steps: ["display: flex", "flex-direction", "justify-content", "align-items"],
                quiz: [
                    { q: "Which property defines the direction the container wants to stack items?", options: ["flex-flow", "flex-direction", "justify-content"], a: 1 },
                    { q: "Default value of flex-direction?", options: ["row", "column", "row-reverse"], a: 0 }
                ]
            }
        ]
    },
    "javascript": {
        title: "JavaScript",
        icon: "fa-brands fa-js",
        color: "#F7DF1E",
        sections: [
            {
                module: "Module 1: Core",
                title: "Variables & Data",
                type: "doc",
                content: "JavaScript is a programming language that adds interactivity to your website.",
                steps: ["var, let, const", "String, Number, Boolean", "Arrays and Objects", "Undefined vs Null"],
                quiz: [
                    { q: "Which keyword defines a constant?", options: ["var", "let", "const"], a: 2 },
                    { q: "What is the type of 'Hello'?", options: ["number", "string", "boolean"], a: 1 }
                ]
            },
            {
                module: "Module 2: Logic",
                title: "Functions",
                type: "doc",
                content: "A JavaScript function is a block of code designed to perform a particular task.",
                steps: ["Function Declaration", "Parameters & Arguments", "Return Statement", "Arrow Functions"],
                quiz: [
                    { q: "How do you call a function named 'myFunc'?", options: ["call myFunc", "myFunc()", "call function myFunc"], a: 1 },
                    { q: "What is the modern syntax for functions?", options: ["function()", "=>", "func:"], a: 1 }
                ]
            },
            {
                module: "Module 3: DOM",
                title: "DOM Manipulation",
                type: "doc",
                content: "The DOM is a platform and language-neutral interface that allows programs and scripts to dynamically access and update the content, structure, and style of a document.",
                steps: ["getElementById", "querySelector", "innerHTML vs TextContent", "addEventListener"],
                quiz: [
                    { q: "Which method selects the first matching element?", options: ["querySelectorAll", "querySelector", "getElement"], a: 1 },
                    { q: "How to listen for a click?", options: ["onclick=", "addEventListener('click', ...)", "Both"], a: 2 }
                ]
            }
        ]
    },
    "python": {
        title: "Python",
        icon: "fa-brands fa-python",
        color: "#3776AB",
        sections: [
            {
                module: "Module 1: Intro",
                title: "Python Syntax",
                type: "doc",
                content: "Python is a popular programming language. It is created by Guido van Rossum, and released in 1991.",
                steps: ["Indentation", "Comments (#)", "Variables (no declaration needed)", "print() function"],
                quiz: [
                    { q: "How do you output text in Python?", options: ["echo()", "print()", "console.log()"], a: 1 },
                    { q: "What indicates a code block in Python?", options: ["Brackets {}", "Indentation", "Semicolons"], a: 1 }
                ]
            },
            {
                module: "Module 2: Structures",
                title: "Lists & Loops",
                type: "doc",
                content: "Lists are used to store multiple items in a single variable.",
                steps: ["Creating Lists []", "Accessing Items", "For Loops", "While Loops"],
                quiz: [
                    { q: "How do you create a list?", options: ["(1,2)", "{1,2}", "[1,2]"], a: 2 },
                    { q: "Which loop is best for iterating over a list?", options: ["while", "for", "do-while"], a: 1 }
                ]
            }
        ]
    },
    "react": {
        title: "React",
        icon: "fa-brands fa-react",
        color: "#61DAFB",
        sections: [
            {
                module: "Module 1: Basics",
                title: "Components",
                type: "doc",
                content: "React is a JavaScript library for building user interfaces. React is used to build single-page applications.",
                steps: ["JSX Syntax", "Functional Components", "Rendering to DOM", "Import/Export"],
                quiz: [
                    { q: "What is JSX?", options: ["JSON XML", "JavaScript XML", "Java Syntax Extension"], a: 1 },
                    { q: "Components must return:", options: ["One root element", "Multiple elements", "Nothing"], a: 0 }
                ]
            },
            {
                module: "Module 1: Basics",
                title: "Props & State",
                type: "doc",
                content: "Props are arguments passed into React components. State is a built-in React object that is used to contain data or information about the component.",
                steps: ["Passing Props", "Destructuring Props", "useState Hook", "Handling Events"],
                quiz: [
                    { q: "Props are:", options: ["Mutable", "Read-Only", "Static"], a: 1 },
                    { q: "Which hook adds state to components?", options: ["useEffect", "useReducer", "useState"], a: 2 }
                ]
            }
        ]
    },
    // Extended Catalog (Locked)
    "robotics": { title: "Robotics", icon: "fa-solid fa-robot", color: "#FF5722", locked: true, sections: [] },
    "ai": { title: "AI & ML", icon: "fa-solid fa-brain", color: "#FF6F00", locked: true, sections: [] },
    "datascience": { title: "Data Science", icon: "fa-solid fa-chart-line", color: "#F08080", locked: true, sections: [] },
    "cyber": { title: "Cybersecurity", icon: "fa-solid fa-user-secret", color: "#D11C23", locked: true, sections: [] },
    "angular": { title: "Angular", icon: "fa-brands fa-angular", color: "#DD0031", locked: true, sections: [] },
    "vue": { title: "Vue.js", icon: "fa-brands fa-vuejs", color: "#4FC08D", locked: true, sections: [] },
    "node": { title: "Node.js", icon: "fa-brands fa-node", color: "#339933", locked: true, sections: [] },
    "mern": { title: "MERN Stack", icon: "fa-brands fa-js", color: "#000000", locked: true, sections: [] },
    "django": { title: "Django", icon: "fa-brands fa-python", color: "#092E20", locked: true, sections: [] },
    "aws": { title: "AWS Cloud", icon: "fa-brands fa-aws", color: "#FF9900", locked: true, sections: [] },
    "google": { title: "GenAI", icon: "fa-brands fa-google", color: "#4285F4", locked: true, sections: [] },
    "bootstrap": { title: "Bootstrap", icon: "fa-brands fa-bootstrap", color: "#7952B3", locked: true, sections: [] },
    "sass": { title: "Sass", icon: "fa-brands fa-sass", color: "#CF649A", locked: true, sections: [] },
    "git": { title: "Git & GitHub", icon: "fa-brands fa-git-alt", color: "#F05032", locked: true, sections: [] },
    "sql": { title: "SQL Database", icon: "fa-solid fa-database", color: "#003B57", locked: true, sections: [] },
    "mongodb": { title: "MongoDB", icon: "fa-solid fa-database", color: "#47A248", locked: true, sections: [] },
    "mysql": { title: "MySQL", icon: "fa-solid fa-database", color: "#00758F", locked: true, sections: [] },
    "postgresql": { title: "PostgreSQL", icon: "fa-solid fa-database", color: "#336791", locked: true, sections: [] },
    "java": { title: "Java", icon: "fa-brands fa-java", color: "#007396", locked: true, sections: [] },
    "c": { title: "C Programming", icon: "fa-solid fa-c", color: "#A8B9CC", locked: true, sections: [] },
    "cpp": { title: "C++", icon: "fa-solid fa-code", color: "#00599C", locked: true, sections: [] },
    "csharp": { title: "C#", icon: "fa-brands fa-microsoft", color: "#239120", locked: true, sections: [] },
    "php": { title: "PHP", icon: "fa-brands fa-php", color: "#777BB4", locked: true, sections: [] },
    "swift": { title: "Swift", icon: "fa-brands fa-swift", color: "#F05138", locked: true, sections: [] },
    "kotlin": { title: "Kotlin", icon: "fa-brands fa-android", color: "#7F52FF", locked: true, sections: [] },
    "go": { title: "Go (Golang)", icon: "fa-brands fa-golang", color: "#00ADD8", locked: true, sections: [] },
    "rust": { title: "Rust", icon: "fa-solid fa-gears", color: "#000000", locked: true, sections: [] },
    "bash": { title: "Bash/Shell", icon: "fa-solid fa-terminal", color: "#4EAA25", locked: true, sections: [] },
    "docker": { title: "Docker", icon: "fa-brands fa-docker", color: "#2496ED", locked: true, sections: [] },
    "excel": { title: "Excel", icon: "fa-solid fa-file-excel", color: "#217346", locked: true, sections: [] }
};

const currentProjects = [
    { title: 'Portfolio Website', description: 'Create a personal portfolio site using semantic HTML and CSS Grid.', level: 'Beginner', code: "<h1>My Portfolio</h1>\n<p>Welcome to my work.</p>", steps: ["Create a header", "Add an 'About Me' section", "Create a gallery grid", "Add a contact form"] },
    { title: 'Interactive Quiz', description: 'Build a quiz app with JavaScript that tracks score.', level: 'Intermediate', code: "const questions = [];\n// Your implementation", steps: ["Define data structure", "Render questions", "Handle click events", "Show score"] },
    { title: 'Task Manager', description: 'A detailed To-Do list with drag-and-drop features.', level: 'Advanced', code: "// Task Manager App", steps: ["Setup DOM elements", "Add task function", "Delete task logic", "Local Storage"] }
];
