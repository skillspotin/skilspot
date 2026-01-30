window.courseDetails = {
    title: "HTML5 Masterclass",
    description: "Build 5 real-world projects to master HTML5 semantic structure, forms, and modern web standards."
};

window.projectsData = [
    {
        id: "html-calc",
        title: "HTML5 Calculator",
        level: "Beginner",
        description: "A beautiful, functional calculator interface using HTML Grid layout and modern inputs.",
        components: ["HTML5", "CSS Grid", "Basic JS"],
        wiring: "No physical wiring needed. This is a software project.",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  .calculator {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    max-width: 300px;
    margin: 20px auto;
    padding: 20px;
    background: #f3f4f6;
    border-radius: 10px;
  }
  .display {
    grid-column: span 4;
    padding: 20px;
    background: #fff;
    text-align: right;
    font-size: 2rem;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  button {
    padding: 15px;
    font-size: 1.2rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background: #fff;
    transition: 0.2s;
  }
  button:hover { background: #e5e7eb; }
  .operator { background: #6366f1; color: white; }
  .operator:hover { background: #4f46e5; }
  .equals { background: #10b981; color: white; grid-column: span 2; }
</style>
</head>
<body>

<div class="calculator">
  <div class="display" id="display">0</div>
  
  <button onclick="clearDisplay()">C</button>
  <button onclick="append('/')">/</button>
  <button onclick="append('*')">×</button>
  <button onclick="deleteLast()">DEL</button>
  
  <button onclick="append('7')">7</button>
  <button onclick="append('8')">8</button>
  <button onclick="append('9')">9</button>
  <button class="operator" onclick="append('-')">-</button>
  
  <button onclick="append('4')">4</button>
  <button onclick="append('5')">5</button>
  <button onclick="append('6')">6</button>
  <button class="operator" onclick="append('+')">+</button>
  
  <button onclick="append('1')">1</button>
  <button onclick="append('2')">2</button>
  <button onclick="append('3')">3</button>
  <button class="equals" onclick="calculate()">=</button>
  <button onclick="append('0')">0</button>
  <button onclick="append('.')">.</button>
</div>

<script>
  let current = '';
  function append(val) {
    current += val;
    document.getElementById('display').innerText = current;
  }
  function clearDisplay() {
    current = '';
    document.getElementById('display').innerText = '0';
  }
  function calculate() {
    try {
      current = eval(current);
      document.getElementById('display').innerText = current;
    } catch {
      document.getElementById('display').innerText = 'Error';
    }
  }
</script>
</body>
</html>`,
        steps: [
            "Step 1: Create the HTML structure using a main container div.",
            "Step 2: Use CSS Grid to organize the buttons into a 4-column layout.",
            "Step 3: Style the display area to look like a digital screen.",
            "Step 4: Add specific classes for operators and special buttons.",
            "Step 5: Write simple JavaScript functions to handle clicks and perform math."
        ],
        logic: "Learn how to structure complex layouts with HTML/CSS Grid and handle user events."
    },
    {
        id: "html-todo",
        title: "HTML5 To-Do App",
        level: "Beginner",
        description: "A clean and accessible task manager using HTML5 forms and local storage.",
        components: ["HTML Forms", "Local Storage", "DOM Manipulation"],
        wiring: "No physical wiring needed.",
        code: `<!DOCTYPE html>
<html>
<body>
<div style="max-width: 400px; margin: 20px auto; font-family: sans-serif;">
  <h2>My Tasks</h2>
  
  <div style="display: flex; gap: 10px; margin-bottom: 20px;">
    <input type="text" id="taskInput" placeholder="Add a new task..." 
      style="flex-grow: 1; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
    <button onclick="addTask()" 
      style="padding: 10px 20px; background: #6366f1; color: white; border: none; border-radius: 4px; cursor: pointer;">
      Add
    </button>
  </div>

  <ul id="taskList" style="list-style: none; padding: 0;">
    <!-- Tasks will appear here -->
  </ul>

</div>

<script>
  function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    
    if (text) {
      const ul = document.getElementById('taskList');
      const li = document.createElement('li');
      li.style.cssText = 'padding: 10px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between;';
      
      li.innerHTML = \`
        <span>\${text}</span>
        <button onclick="this.parentElement.remove()" style="color: red; background: none; border: none; cursor: pointer;">Delete</button>
      \`;
      
      ul.appendChild(li);
      input.value = '';
    }
  }
</script>
</body>
</html>`,
        steps: [
            "Step 1: Build the input form using semantic HTML input tags.",
            "Step 2: Create a container (ul) to hold the list of tasks.",
            "Step 3: Style the input and button to be side-by-side using Flexbox.",
            "Step 4: Write a JS function to read the input value and create new list items.",
            "Step 5: Add a delete button to each task item for removal."
        ],
        logic: "Practice form handling, dynamic HTML generation, and list management."
    },
    {
        id: "html-portfolio",
        title: "Portfolio Site",
        level: "Intermediate",
        description: "A professional personal website using semantic tags like <header>, <nav>, <section>, and <footer>.",
        components: ["Semantic HTML", "CSS Flexbox", "Responsive Design"],
        wiring: "No wiring needed.",
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<style>
  body { font-family: 'Segoe UI', sans-serif; margin: 0; line-height: 1.6; }
  header { background: #1e293b; color: white; padding: 2rem; text-align: center; }
  nav { background: #334155; padding: 1rem; text-align: center; }
  nav a { color: white; text-decoration: none; margin: 0 1rem; }
  
  .container { max-width: 800px; margin: 2rem auto; padding: 0 1rem; }
  
  .project-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; }
  .project-card { border: 1px solid #ddd; padding: 1rem; border-radius: 8px; }
  
  footer { background: #f1f5f9; text-align: center; padding: 2rem; margin-top: 2rem; }
</style>
</head>
<body>

<header>
  <h1>Jane Developer</h1>
  <p>Web Designer & Developer</p>
</header>

<nav>
  <a href="#about">About</a>
  <a href="#projects">Projects</a>
  <a href="#contact">Contact</a>
</nav>

<main class="container">
  <section id="about">
    <h2>About Me</h2>
    <p>I build accessible, pixel-perfect, and performant web applications.</p>
  </section>

  <section id="projects">
    <h2>My Work</h2>
    <div class="project-grid">
      <article class="project-card">
        <h3>E-Commerce App</h3>
        <p>A full-stack shopping platform.</p>
      </article>
      <article class="project-card">
        <h3>Weather Dashboard</h3>
        <p>Real-time weather tracking.</p>
      </article>
    </div>
  </section>
</main>

<footer>
  <p>&copy; 2024 Jane Developer. Built with HTML5.</p>
</footer>

</body>
</html>`,
        steps: [
            "Step 1: Plan the layout using semantic regions: Header, Nav, Main, Footer.",
            "Step 2: Create the Navigation bar with anchor links to page sections.",
            "Step 3: Design the 'Hero' section in the header with a title and bio.",
            "Step 4: Use CSS Grid to create a responsive gallery for your projects.",
            "Step 5: Add a footer with copyright information."
        ],
        logic: "Master semantic HTML structure to create accessibility-friendly and SEO-optimized websites."
    },
    {
        id: "html-weather",
        title: "Weather Widget",
        level: "Intermediate",
        description: "A stylish weather card displaying temperature and conditions with icons.",
        components: ["HTML Structure", "CSS Styling", "API Concepts"],
        wiring: "No wiring needed.",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  .weather-card {
    background: linear-gradient(135deg, #00b4db, #0083b0);
    color: white;
    padding: 2rem;
    border-radius: 20px;
    max-width: 300px;
    margin: 20px auto;
    text-align: center;
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    font-family: sans-serif;
  }
  .temp { font-size: 3.5rem; font-weight: bold; margin: 10px 0; }
  .city { font-size: 1.5rem; opacity: 0.9; }
  .condition { font-size: 1.2rem; background: rgba(255,255,255,0.2); padding: 5px 15px; border-radius: 20px; display: inline-block; }
</style>
</head>
<body>

<div class="weather-card">
  <div class="city">New York</div>
  <div class="temp">72°</div>
  <div class="condition">Sunny</div>
  
  <div style="margin-top: 20px; display: flex; justify-content: space-between;">
    <div>
      <span>Humidity</span><br>
      <strong>45%</strong>
    </div>
    <div>
      <span>Wind</span><br>
      <strong>12 mph</strong>
    </div>
  </div>
</div>

</body>
</html>`,
        steps: [
            "Step 1: Create a container div for the card.",
            "Step 2: Use a linear-gradient background for a modern look.",
            "Step 3: Typography is key - make the temperature large and bold.",
            "Step 4: Use transparency (rgba) for secondary elements like the condition pill.",
            "Step 5: Layout the bottom details (humidity/wind) using Flexbox."
        ],
        logic: "Focus on component-based design and advanced CSS styling within HTML structures."
    },
    {
        id: "html-quiz",
        title: "Interactive Quiz",
        level: "Advanced",
        description: "A multiple-choice quiz application that tracks score.",
        components: ["Forms", "Radio Inputs", "Logic"],
        wiring: "No wiring needed.",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  .quiz-container { max-width: 500px; margin: 20px auto; font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
  .question { margin-bottom: 20px; font-weight: bold; }
  .options label { display: block; padding: 10px; background: #f8fafc; margin-bottom: 5px; cursor: pointer; border-radius: 4px; }
  .options label:hover { background: #e2e8f0; }
  .submit-btn { width: 100%; padding: 12px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem; }
</style>
</head>
<body>

<div class="quiz-container">
  <h3>HTML5 Knowledge Check</h3>
  
  <div class="question">1. What does HTML stand for?</div>
  <div class="options">
    <label><input type="radio" name="q1" value="w"> Home Tool Markup Language</label>
    <label><input type="radio" name="q1" value="c"> Hyper Text Markup Language</label>
    <label><input type="radio" name="q1" value="w"> Hyperlinks and Text Markup Language</label>
  </div>
  
  <button class="submit-btn" onclick="checkAnswer()">Submit Answer</button>
  <p id="result" style="text-align: center; margin-top: 15px; font-weight: bold;"></p>
</div>

<script>
  function checkAnswer() {
    const selected = document.querySelector('input[name="q1"]:checked');
    const result = document.getElementById('result');
    
    if (!selected) {
      result.innerText = "Please select an answer!";
      result.style.color = "orange";
      return;
    }
    
    if (selected.value === 'c') {
      result.innerText = "Correct! Great job.";
      result.style.color = "green";
    } else {
      result.innerText = "Incorrect. Try again!";
      result.style.color = "red";
    }
  }
</script>
</body>
</html>`,
        steps: [
            "Step 1: Use a Fieldset or simple Div to group the question and answers.",
            "Step 2: Use Input Type='radio' for multiple choice options (ensure same 'name' attribute).",
            "Step 3: Style labels to look like clickable cards for better UX.",
            "Step 4: Create a button to trigger the check function.",
            "Step 5: Simple JS validation to check the value of the selected radio button."
        ],
        logic: "Learn to handle user input validation and interactive feedback."
    }
];