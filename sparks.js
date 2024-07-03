
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
var particles = [];
var colors = ['#FFFFE4', '#f58c14', '#FDFBF3', '#FFEF3F', '#FFB800'];
var gravity = .3;
canvas.addEventListener("click", sparks)
function sparks(){
function initParticles() {
    for (var i = 0; i < 120; i++) {
      setTimeout(createParticle, i, i);
    }
  }

function createParticle(i) {
  // initial position in middle of canvas
  var x = width*0.5;
  var y = height*0.5;
  // randomize the vx and vy a little - but we still want them flying 'up' and 'out'
  var vx = -5+Math.random()*10;
  var vy = Math.random()*-10;
  // randomize size and opacity a little & pick a color from our color palette
  var size = Math.random()*4;
  var color = colors[i%colors.length];
  var opacity =  0.5 + Math.random()*0.5;
  var p = new Particle(x, y, vx, vy, size, color, opacity);
  particles.push(p);
}
function restart(){
  delete vx;
  delete vy;
}
function Particle(x, y, vx, vy, size, color, opacity) {
  
  function reset() {
    x = width*0.5;
    y = height*0.5;
    opacity = 0.5 + Math.random()*0.5;
    vx = -2+Math.random()*4;
    vy = Math.random()*-3;
  }
  
  this.update = function() {

    
    // add gravity to vy
    vy += gravity;
    x += vx;
    y += vy;
  }
  
  this.reset = function() {
    this.vx = -2 + Math.random() * 4;
    this.vy = Math.random() * -3;
  };

  this.draw = function() {
    ctx.globalAlpha = opacity;
    ctx.beginPath();
    ctx.arc(x, y, size, size, Math.PI * 2, false);
    ctx.fillStyle = color;
    ctx.fill();
  } 
}

function render() {
  ctx.clearRect(0, 0, width, height);
  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }
  requestAnimationFrame(render);
}


// resize
window.addEventListener('resize', resize);
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

function restartParticles() {
  particles.forEach(function(particle) {
    particle.reset(); // Reset vx and vy
  });
}
function restart() {
  restartParticles();
  // Optionally, reset other necessary variables or states here
}


// init
initParticles();

render();

restartParticles()
particles.splice(0, particles.length);

console.log(gravity);
console.log(particles);

}



