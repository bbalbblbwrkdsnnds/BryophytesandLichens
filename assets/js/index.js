
function scrollToCenter() {

  const gridContainer = document.querySelector('.grid-container');


  const centerX = gridContainer.offsetWidth / 2;
  const centerY = gridContainer.offsetHeight / 2;


  window.scrollTo({
    left: centerX,
    top: centerY,
    behavior: 'smooth'
  });
}

window.addEventListener('load', scrollToCenter);



// Call the scrollToCenter function when the page loads
// window.onload = scrollToCenter;

// const scrollToCenterButton = document.getElementById('scrollToCenterButton');

// // Add a click event listener to the button
// scrollToCenterButton.addEventListener('click', () => {
//   // Calculate the vertical position to scroll to (center of the page)
//   const windowHeight = window.innerHeight;
//   const targetY = windowHeight / 2;

//   // Use smooth scrolling behavior
//   window.scrollTo({
//     top: targetY,
//     behavior: 'smooth',
//   });
// });



// function randomizeListPositions() {
//   const listItems = document.querySelectorAll('#random-list li');
//   const canvasWidth = window.innerWidth;
//   const canvasHeight = window.innerHeight;

//   listItems.forEach((item) => {
//       const randomX = Math.random() * (canvasWidth - item.offsetWidth);
//       const randomY = Math.random() * (canvasHeight - item.offsetHeight);

//       item.style.position = 'absolute';
//       item.style.left = randomX + 'px';
//       item.style.top = randomY + 'px';
//   });
// }

// window.onload = randomizeListPositions;



var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');

ctx.strokeStyle = "yellow";
ctx.lineWidth = random;
ctx.lineCap = '';
ctx.lineJoin = 'round';

var settings = {
  num_particles: 100,
  max_hist: 20,
  particleRadius: 20, // Specify the radius of the particles
}

function Particle() {
  this.h = []; // History of positions
  this.init = function () {
    // Initialize particles at the center of the canvas
    this.h = [];
    this.h.push([canvas.width / 2, canvas.height / 2]);
  }
  this.init();
  this.move_part = function move_part() {
    if (this.h.length >= settings.max_hist) {
      this.h.shift();
    }

    // Update the particle position to move outwards from the center
    var angle = Math.random() * 10 * Math.PI;
    var distance = Math.random() * 20; // Adjust the distance as needed
    var newX = this.h[this.h.length - 1][0] + distance * Math.cos(angle);
    var newY = this.h[this.h.length - 1][1] + distance * Math.sin(angle);

    this.h.push([newX, newY]);

    // Reset particle if it goes outside the canvas
    if (newX >= canvas.width || newY >= canvas.height || newX < 0 || newY < 0) {
      this.init();
    }
  }
  this.draw_part = function draw_part() {
    for (var i = this.h.length - 6, j = 0; i > 0; i--, j++) {
      ctx.beginPath();
      ctx.globalAlpha = 0.8 - j / settings.max_hist / 100;
      ctx.arc(this.h[i][0], this.h[i][1], settings.particleRadius, 0, Math.PI * 2); // Draw a circle
      ctx.fillStyle = "green"; // Set the fill color
      ctx.fill();
    }
  }
}

// var parts = [];
// for (var i = 0; i < settings.num_particles; i++) {
//   parts.push(new Particle());
// }
// parts[0].move_part();

// setInterval(function () {
//   // Erase canvas
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   for (var i = 0; i < settings.num_particles; i++) {
//     parts[i].move_part();
//     parts[i].draw_part();
//   }
// }, 30);
// const textElement = document.querySelector('.animated-text');
// let fontWeight = 300;

// function animateFont() {
//   fontWeight = fontWeight === 300 ? 700 : 300; // Toggle font weight
//   textElement.style.fontVariationSettings = `"wght" ${fontWeight}`;
// }

// setInterval(animateFont, 3000); // Change font weight every 3 seconds


// Get a reference to the button element
