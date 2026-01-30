window.courseDetails = {
    title: "JavaScript Logic & DOM",
    description: "Learn to build interactive, dynamic web applications with core JavaScript concepts."
};

window.projectsData = [
    {
        id: "js-weather",
        title: "Weather App",
        level: "Intermediate",
        description: "Fetch real-time weather data using the OpenWeatherMap API and update the DOM dynamically.",
        components: ["Fetch API", "Async/Await", "DOM Manipulation"],
        wiring: "No physical wiring needed.",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: 'Arial', sans-serif; background: #282c35; color: white; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
  .card { background: linear-gradient(135deg, #74ebd5, #ACB6E5); padding: 2rem; border-radius: 20px; text-align: center; width: 300px; color: #333; box-shadow: 0 10px 20px rgba(0,0,0,0.3); }
  input { padding: 10px; border-radius: 20px; border: none; outline: none; width: 70%; margin-bottom: 20px; }
  button { padding: 10px 15px; border-radius: 50%; border: none; background: white; cursor: pointer; transition: 0.3s; }
  button:hover { background: #eee; }
  .temp { font-size: 4rem; font-weight: bold; margin: 0; }
  .city { font-size: 1.5rem; margin-top: 10px; }
  .humidity { margin-top: 20px; font-size: 0.9rem; }
  .icon { font-size: 3rem; margin: 10px 0; }
</style>
</head>
<body>

<div class="card">
  <div class="search">
    <input type="text" id="cityInput" placeholder="Enter city name" value="New York">
    <button onclick="checkWeather()"><i class="fas fa-search">Go</i></button>
  </div>
  <div class="weather">
    <div class="icon">⛅</div>
    <h1 class="temp">22°c</h1>
    <h2 class="city">New York</h2>
    <div class="humidity">Humidity: 50% | Wind: 15 km/h</div>
  </div>
</div>

<script>
  // Mock API for demonstration
  async function checkWeather() {
    const city = document.getElementById('cityInput').value;
    const btn = document.querySelector('button');
    btn.innerHTML = '...';
    
    // Simulating network request (In real app, use fetch)
    setTimeout(() => {
        // Random temperature logic
        const temp = Math.floor(Math.random() * (30 - 10) + 10);
        document.querySelector('.city').innerHTML = city;
        document.querySelector('.temp').innerHTML = temp + "°c";
        document.querySelector('.humidity').innerHTML = "Humidity: " + Math.floor(Math.random()*100) + "% | Wind: " + Math.floor(Math.random()*20) + " km/h";
        
        btn.innerHTML = 'Go';
    }, 1000);
  }
</script>
</body>
</html>`,
        steps: [
            "Step 1: Set up the HTML structure with input, button, and display areas.",
            "Step 2: Style the weather card with CSS gradients.",
            "Step 3: Write an async function to handle the search button click.",
            "Step 4: Use the fetch API to call OpenWeatherMap (simulated here for demo).",
            "Step 5: Parse the JSON response and update the innerHTML of elements."
        ],
        logic: "Understand how to interact with external APIs and handle asynchronous data."
    },
    {
        id: "js-todo",
        title: "Advanced To-Do List",
        level: "Beginner",
        description: "A persistent To-Do list that saves your tasks to the browser's Local Storage.",
        components: ["Local Storage", "JSON Parsing", "Events"],
        wiring: "No wiring needed.",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { background: #e0e5ec; display: flex; justify-content: center; padding-top: 50px; font-family: sans-serif; }
  .container { width: 400px; background: #e0e5ec; padding: 30px; border-radius: 30px; box-shadow: 9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255, 0.5); }
  h2 { color: #555; text-align: center; }
  input { width: 70%; padding: 10px; border: none; border-radius: 5px; outline: none; background: #e0e5ec; box-shadow: inset 6px 6px 10px 0 rgba(163,177,198, 0.7), inset -6px -6px 10px 0 rgba(255,255,255, 0.8); }
  button { padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; margin-left: 10px; box-shadow: 6px 6px 10px 0 rgba(163,177,198, 0.7), -6px -6px 10px 0 rgba(255,255,255, 0.8); }
  ul { padding: 0; list-style: none; margin-top: 20px; }
  li { display: flex; justify-content: space-between; padding: 10px; background: #e0e5ec; margin-bottom: 10px; border-radius: 10px; box-shadow: 6px 6px 10px 0 rgba(163,177,198, 0.7), -6px -6px 10px 0 rgba(255,255,255, 0.8); color: #555; }
  li span { cursor: pointer; }
  li.checked span { text-decoration: line-through; opacity: 0.6; }
</style>
</head>
<body>

<div class="container">
  <h2>My Tasks</h2>
  <div style="display:flex;">
    <input type="text" id="inputBox" placeholder="Add a task...">
    <button onclick="addTask()">Add</button>
  </div>
  <ul id="list-container">
    <!-- Tasks go here -->
  </ul>
</div>

<script>
  const inputBox = document.getElementById("inputBox");
  const listContainer = document.getElementById("list-container");

  function addTask(){
    if(inputBox.value === ''){
      alert("You must write something!");
    } else {
      let li = document.createElement("li");
      li.innerHTML = "<span>" + inputBox.value + "</span><span onclick='removeTask(this)'>\u00d7</span>";
      li.onclick = function(e){
         if(e.target.tagName !== 'SPAN' || e.target.innerHTML === '\u00d7') return;
         this.classList.toggle("checked");
         saveData();
      }
      listContainer.appendChild(li);
    }
    inputBox.value = "";
    saveData();
  }
  
  function removeTask(el) {
      el.parentElement.remove();
      saveData();
  }

  function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
  }
  function showTask(){
    listContainer.innerHTML = localStorage.getItem("data") || "";
    // Reattach listeners if needed (simple version stores HTML)
    document.querySelectorAll('li').forEach(li => {
        li.onclick = function(e){
             if(e.target.tagName !== 'SPAN' || e.target.innerHTML === '\u00d7') return;
             this.classList.toggle("checked");
             saveData();
        };
        li.querySelector('span:last-child').onclick = function() { removeTask(this); };
    });
  }
  showTask();
</script>
</body>
</html>`,
        steps: [
            "Step 1: Create the UI with Neumorphism style CSS.",
            "Step 2: Create an addTask function to append LI elements.",
            "Step 3: Implement toggle logic for marking tasks as done.",
            "Step 4: Use localStorage.setItem to save the list HTML.",
            "Step 5: Load data on startup with localStorage.getItem."
        ],
        logic: "Learn data persistence and CRUD operations (Create, Read, Update, Delete)."
    },
    {
        id: "js-memory",
        title: "Memory Card Game",
        level: "Advanced",
        description: "A fun concentration game where you flip cards to find matching pairs.",
        components: ["Game Logic", "CSS 3D Transforms", "Arrays"],
        wiring: "No wiring needed.",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #222; }
  .game-board { display: grid; grid-template-columns: repeat(4, 100px); gap: 10px; }
  .card { width: 100px; height: 100px; position: relative; cursor: pointer; transform-style: preserve-3d; transform: scale(1); transition: transform 0.5s; }
  .card:active { transform: scale(0.97); transition: transform 0.2s; }
  .card.flip { transform: rotateY(180deg); }
  
  .front, .back { width: 100%; height: 100%; padding: 20px; box-sizing: border-box; position: absolute; border-radius: 5px; background: #1C7CCC; backface-visibility: hidden; display: flex; justify-content: center; align-items: center; }
  .front { transform: rotateY(180deg); background: white; font-size: 3rem; }
</style>
</head>
<body>

<div class="game-board" id="gameBoard"></div>

<script>
  const emojis = ['🍕', '🍕', '🚀', '🚀', '🐱', '🐱', '🌵', '🌵', '💎', '💎', '🎵', '🎵'];
  // Shuffle
  emojis.sort(() => 0.5 - Math.random());

  const board = document.getElementById('gameBoard');
  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;

  emojis.forEach(emoji => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.innerHTML = \`<div class="front">\${emoji}</div><div class="back"></div>\`;
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });

  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;
    checkForMatch();
  }

  function checkForMatch() {
    let isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;
    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
  }

  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetBoard();
    }, 1500);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }
</script>
</body>
</html>`,
        steps: [
            "Step 1: Create a grid of cards using CSS Grid.",
            "Step 2: Add CSS 3D transforms (rotateY) for the flip effect.",
            "Step 3: Generate the card HTML using JS loop and array.",
            "Step 4: Implement the game logic: check for matches, lock board, reset.",
            "Step 5: Shuffle the array randomly each time the game loads."
        ],
        logic: "Develop algorithmic thinking and complex state management in JavaScript."
    }
];