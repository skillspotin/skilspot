window.courseDetails = {
    title: "CSS3 Masterclass",
    description: "Master modern layouts, animations, and responsive design with real-world projects."
};

window.projectsData = [
    {
        id: "css-flexbox",
        title: "Flexbox Pricing Table",
        level: "Beginner",
        description: "Build a responsive pricing table using Flexbox to align items perfectly.",
        components: ["Flexbox", "Buttons", "Hover Effects"],
        wiring: "No wiring needed.",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; background: #f0f2f5; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
  .container { display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; }
  .card { background: white; padding: 2rem; border-radius: 10px; width: 250px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.3s; }
  .card:hover { transform: translateY(-10px); }
  .price { font-size: 3rem; color: #333; margin: 10px 0; }
  .features { list-style: none; padding: 0; margin: 20px 0; color: #666; }
  .features li { margin: 10px 0; }
  .btn { display: inline-block; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; transition: background 0.3s; }
  .btn:hover { background: #0056b3; }
  .recommended { border: 2px solid #007bff; transform: scale(1.05); position: relative; }
  .badge { position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: #007bff; color: white; padding: 5px 15px; border-radius: 20px; font-size: 0.8rem; }
</style>
</head>
<body>

<div class="container">
  <div class="card">
    <h3>Basic</h3>
    <div class="price">$19</div>
    <ul class="features">
      <li>1 Project</li>
      <li>10GB Storage</li>
      <li>Email Support</li>
    </ul>
    <a href="#" class="btn">Choose Plan</a>
  </div>
  
  <div class="card recommended">
    <div class="badge">Most Popular</div>
    <h3>Pro</h3>
    <div class="price">$49</div>
    <ul class="features">
      <li>10 Projects</li>
      <li>50GB Storage</li>
      <li>Priority Support</li>
    </ul>
    <a href="#" class="btn">Choose Plan</a>
  </div>
  
  <div class="card">
    <h3>Enterprise</h3>
    <div class="price">$99</div>
    <ul class="features">
      <li>Unlimited Projects</li>
      <li>1TB Storage</li>
      <li>24/7 Support</li>
    </ul>
    <a href="#" class="btn">Choose Plan</a>
  </div>
</div>

</body>
</html>`,
        steps: [
            "Step 1: Set up the main container with display: flex.",
            "Step 2: Use justify-content to center the cards.",
            "Step 3: Style individual cards with padding, shadow, and radius.",
            "Step 4: Use transform: scale() to highlight the 'Recommended' plan.",
            "Step 5: Add hover effects for interactivity."
        ],
        logic: "Learn alignment, distribution, and visual hierarchy with Flexbox."
    },
    {
        id: "css-grid-gallery",
        title: "Responsive Grid Gallery",
        level: "Intermediate",
        description: "Create a masonry-style image gallery that adapts to any screen size.",
        components: ["CSS Grid", "Media Queries", "Images"],
        wiring: "No wiring needed.",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; font-family: sans-serif; background: #111; color: white; }
  h1 { text-align: center; padding: 20px; }
  .gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; padding: 20px; }
  .item { position: relative; overflow: hidden; border-radius: 8px; height: 250px; }
  .item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
  .item:hover img { transform: scale(1.1); }
  .overlay { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.7); color: white; padding: 10px; transform: translateY(100%); transition: transform 0.3s; }
  .item:hover .overlay { transform: translateY(0); }
  
  /* Feature larger items */
  @media (min-width: 768px) {
    .item:nth-child(1) { grid-column: span 2; grid-row: span 2; height: 515px; }
    .item:nth-child(4) { grid-column: span 2; }
  }
</style>
</head>
<body>

<h1>My Portfolio Gallery</h1>

<div class="gallery">
  <div class="item"><img src="https://picsum.photos/400/400?random=1"><div class="overlay">Project 1</div></div>
  <div class="item"><img src="https://picsum.photos/400/400?random=2"><div class="overlay">Project 2</div></div>
  <div class="item"><img src="https://picsum.photos/400/400?random=3"><div class="overlay">Project 3</div></div>
  <div class="item"><img src="https://picsum.photos/400/400?random=4"><div class="overlay">Project 4</div></div>
  <div class="item"><img src="https://picsum.photos/400/400?random=5"><div class="overlay">Project 5</div></div>
  <div class="item"><img src="https://picsum.photos/400/400?random=6"><div class="overlay">Project 6</div></div>
</div>

</body>
</html>`,
        steps: [
            "Step 1: Define the grid container using grid-template-columns: repeat(auto-fit).",
            "Step 2: Use minmax() to ensure items don't get too small.",
            "Step 3: Add span rules for larger feature images.",
            "Step 4: Create a hover overlay effect with absolute positioning.",
            "Step 5: Use object-fit: cover for perfect image sizing."
        ],
        logic: "Master 2D layouts and responsive behavior with CSS Grid."
    },
    {
        id: "css-animation",
        title: "Animated Login Form",
        level: "Advanced",
        description: "A slick login form with floating labels and background animations.",
        components: ["Keyframes", "Transitions", "Form Styling"],
        wiring: "No wiring needed.",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; height: 100vh; display: flex; justify-content: center; align-items: center; font-family: sans-serif; background: linear-gradient(45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab); background-size: 400% 400%; animation: gradient 15s ease infinite; }
  @keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
  
  .login-box { background: rgba(255,255,255,0.9); padding: 40px; border-radius: 10px; box-shadow: 0 15px 25px rgba(0,0,0,0.2); width: 300px; }
  h2 { margin: 0 0 30px; color: #333; text-align: center; }
  .user-box { position: relative; margin-bottom: 30px; }
  .user-box input { width: 100%; padding: 10px 0; font-size: 16px; color: #333; margin-bottom: 30px; border: none; border-bottom: 1px solid #333; outline: none; background: transparent; }
  .user-box label { position: absolute; top: 0; left: 0; padding: 10px 0; font-size: 16px; color: #666; pointer-events: none; transition: 0.5s; }
  .user-box input:focus ~ label, .user-box input:valid ~ label { top: -20px; left: 0; color: #e73c7e; font-size: 12px; }
  
  .btn { display: block; width: 100%; padding: 10px 20px; font-weight: bold; color: white; background: #e73c7e; border: none; border-radius: 5px; cursor: pointer; transition: 0.3s; letter-spacing: 2px; text-transform: uppercase; }
  .btn:hover { background: #c02b66; letter-spacing: 4px; }
</style>
</head>
<body>

<div class="login-box">
  <h2>Login</h2>
  <form>
    <div class="user-box">
      <input type="text" name="" required="">
      <label>Username</label>
    </div>
    <div class="user-box">
      <input type="password" name="" required="">
      <label>Password</label>
    </div>
    <button class="btn">Submit</button>
  </form>
</div>

</body>
</html>`,
        steps: [
            "Step 1: Create a full-screen animated gradient background.",
            "Step 2: Style the form container with glassmorphism effects.",
            "Step 3: Implement floating labels using input:focus ~ label selectors.",
            "Step 4: Add letter-spacing animation to the submit button on hover.",
            "Step 5: Ensure smooth transitions for all interactive elements."
        ],
        logic: "Create engaging user experiences with advanced CSS animations and pseudo-classes."
    }
];
