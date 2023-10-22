function scrollToTopLeft() {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: 'smooth'
  });
}

window.addEventListener('load', function () {
  document.documentElement.style.height = '100%';
  document.body.style.height = '100%';
  scrollToTopLeft();
  
  const scrollToTopButton = document.getElementById("scrollToTopButton");
  scrollToTopButton.style.display = "none"; // Hide the button initially
  
  scrollToTopButton.addEventListener("click", function () {
    scrollToTopLeft();
  });
  
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) { // Adjust the threshold as needed
      scrollToTopButton.style.display = "block"; // Show the button when scrolling down
    } else {
      scrollToTopButton.style.display = "none"; // Hide the button when at the top
    }
  });
});

var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');

ctx.strokeStyle = 'solid';
ctx.lineWidth = 2;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

var settings = {
  num_particles: 200,
  max_hist: 30,
  particleRadius: 2 * 4, // Increase the particle size by 20%
}

function Particle() {
  this.h = [];
  this.init = function () {
    this.h = [];
    this.h.push([Math.random() * canvas.width, Math.random() * canvas.height]);
  }
  this.init();
  this.move_part = function move_part() {
    if (this.h.length >= settings.max_hist) {
      this.h.shift();
    }

    // Update the particle position to move more extremely
    var angle = Math.random() * 2 * Math.PI;
    var distance = Math.random() * 5; // Increase the distance for more extreme movement
    var newX = this.h[this.h.length - 1][0] + distance * Math.cos(angle);
    var newY = this.h[this.h.length - 1][1] + distance * Math.sin(angle);

    this.h.push([newX, newY]);

    // Reset particle if it goes outside the canvas
    if (newX >= canvas.width || newY >= canvas.height || newX < 0 || newY < 0) {
      this.init();
    }
  }
  this.draw_part = function draw_part() {
    for (var i = this.h.length - 1, j = 0; i > 0; i--, j++) {
      ctx.beginPath();
      ctx.globalAlpha = 0.8 - j / settings.max_hist / 400;
      ctx.arc(this.h[i][0], this.h[i][1], settings.particleRadius, 0, Math.PI * 2);
      ctx.fillStyle = "grey";
      ctx.fill();
    }
  }
}

var parts = [];
for (var i = 0; i < settings.num_particles; i++) {
  parts.push(new Particle());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < settings.num_particles; i++) {
    parts[i].move_part();
    parts[i].draw_part();
  }

  requestAnimationFrame(animate);
}

animate();
;

