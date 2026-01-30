window.projectsData = [
    {
        id: 1,
        title: "E-Commerce API",
        level: "intermediate",
        components: ["Node.js", "Express", "MongoDB", "JWT"],
        description: "Build a RESTful API for an e-commerce platform with user authentication and product management.",
        wiring: "N/A - Software Project",
        steps: [
            "Step 1: Initialize Node.js project (npm init -y)",
            "Step 2: Install dependencies (express, mongoose, dotenv, jsonwebtoken)",
            "Step 3: Connect to MongoDB Atlas",
            "Step 4: Create User and Product models",
            "Step 5: Implement Auth routes (Register/Login)",
            "Step 6: Implement Product CRUD routes"
        ],
        code: `const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Connect DB
mongoose.connect(process.env.MONGO_URI);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));

app.listen(5000, () => console.log('Server running on port 5000'));`,
        logic: "Backend architecture - Learn how to structure a scalable API and handle database operations securely.",
        timeEstimate: "2-3 hours",
        linesOfCode: 150
    },
    {
        id: 2,
        title: "Social Media Dashboard",
        level: "advanced",
        components: ["React", "Redux", "Node.js", "Socket.io"],
        description: "Real-time dashboard showing social media metrics and live notifications.",
        wiring: "N/A - Software Project",
        steps: [
            "Step 1: Set up React frontend with Vite",
            "Step 2: Configure Redux Toolkit for state management",
            "Step 3: Build Node.js backend with Socket.io",
            "Step 4: Implement real-time event listeners",
            "Step 5: Visualize data with Chart.js"
        ],
        code: `import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("http://localhost:5000");

function Dashboard() {
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    socket.on("update_metrics", (data) => {
      setMetrics(data);
    });
  }, []);

  return <div>Live Users: {metrics.activeUsers}</div>;
}`,
        logic: "Real-time communication - Master WebSockets for instant data updates without page refreshes.",
        timeEstimate: "4-5 hours",
        linesOfCode: 300
    },
    {
        id: 3,
        title: "Task Management App",
        level: "beginner",
        components: ["React", "Hooks", "CSS Modules"],
        description: "Simple To-Do list with drag-and-drop functionality.",
        wiring: "N/A - Software Project",
        steps: [
            "Step 1: Create React components (Task, Column)",
            "Step 2: Manage state with useState and useReducer",
            "Step 3: Implement Drag and Drop API",
            "Step 4: Persist data to LocalStorage"
        ],
        code: `function TaskApp() {
  const [tasks, setTasks] = useState([]);

  const addTask = (text) => {
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  };

  return (
    <div>
      <input type="text" onKeyDown={(e) => e.key === 'Enter' && addTask(e.target.value)} />
      {tasks.map(t => <div key={t.id}>{t.text}</div>)}
    </div>
  );
}`,
        logic: "Frontend State Management - Understand prop drilling, hooks, and local persistence.",
        timeEstimate: "1-2 hours",
        linesOfCode: 80
    }
];

window.courseDetails = {
    title: "Fullstack MERN Projects",
    icon: "fa-code",
    theme: "mern"
};
