function convert() {
  var institution = document.getElementById('institution').value;
  var cgpa = parseFloat(document.getElementById('cgpa').value);
  var result = document.getElementById('result');
  var note = document.getElementById('note');

  if (isNaN(cgpa) || cgpa < 0 || cgpa > 10) {
    result.innerText = "Please enter a valid CGPA between 0 and 10.";
    note.innerText = "";
    return;
  }

  var percentage;
  if (institution === "private") {
    if (cgpa >= 7) {
      percentage = (cgpa * 7.4 + 12).toFixed(2);
      note.innerText = "Formula used: (CGPA × 7.4) + 12";
    } else {
      percentage = (7.1 * cgpa + 12).toFixed(2);
      note.innerText = "Formula used: (7.1 × CGPA) + 12";
    }
  } else if (institution === "mumbai") {
    percentage = (7.1 * cgpa + 11).toFixed(2);
    note.innerText = "Formula used: (7.1 × CGPA) + 11";
  }

  result.innerText = "Your Percentage: " + percentage + "%";
}

window.addEventListener('DOMContentLoaded', function() {
// Cursor Effect
var cursorDots = [];
var maxDots = 4;
var mouseHistory = [];
var isOverCard = false;
var lastMouseX = 0, lastMouseY = 0;

for (var i = 0; i < maxDots; i++) {
  var dot = document.createElement('div');
  dot.className = 'cursor-follow-dot';
  dot.style.opacity = '0';
  document.body.appendChild(dot);
  cursorDots.push(dot);
}

document.addEventListener('mousemove', function(e) {
  var mouseX = e.clientX;
  var mouseY = e.clientY;
  
  var speed = Math.sqrt(Math.pow(mouseX - lastMouseX, 2) + Math.pow(mouseY - lastMouseY, 2));
  lastMouseX = mouseX;
  lastMouseY = mouseY;
  
  var cardElements = document.querySelectorAll('.converter-card, .info-card, .faq-section');
  isOverCard = false;
  
  cardElements.forEach(function(card) {
    var rect = card.getBoundingClientRect();
    if (mouseX >= rect.left && mouseX <= rect.right && 
        mouseY >= rect.top && mouseY <= rect.bottom) {
      isOverCard = true;
    }
  });
  
  if (isOverCard) {

    cursorDots.forEach(function(dot) {
      dot.style.opacity = '0';
    });
    document.body.style.cursor = 'default';
  } else {

    document.body.style.cursor = 'none';
    

    mouseHistory.unshift({x: mouseX, y: mouseY});
    
    if (mouseHistory.length > 20) {
      mouseHistory = mouseHistory.slice(0, 20);
    }
    
    for (var i = 0; i < cursorDots.length; i++) {
      var dot = cursorDots[i];
      var delay = i * 2;
      
      if (mouseHistory[delay]) {
        var targetX = mouseHistory[delay].x;
        var targetY = mouseHistory[delay].y;
        
        var currentX = parseFloat(dot.style.left) || targetX;
        var currentY = parseFloat(dot.style.top) || targetY;
        
        var newX = currentX + (targetX - currentX) * 0.9;
        var newY = currentY + (targetY - currentY) * 0.9;
        
        dot.style.left = newX + 'px';
        dot.style.top = newY + 'px';
        
        
        var opacity = 1 - (i * 0.2);
        dot.style.opacity = opacity;
        
        
        var size = Math.max(6, 8 - i * 0.5);
        dot.style.width = size + 'px';
        dot.style.height = size + 'px';
      }
    }
  }
});

document.addEventListener('mouseleave', function() {
  cursorDots.forEach(function(dot) {
    dot.style.opacity = '0';
  });
});


document.addEventListener('mouseenter', function() {
  if (!isOverCard) {
    cursorDots.forEach(function(dot) {
      dot.style.opacity = '1';
    });
  }
});

function add3DEffect(selector) {
  var el = document.querySelector(selector);
  if (el) {
    el.addEventListener('mousemove', function(e) {
      var rect = el.getBoundingClientRect();
      var px = (e.clientX - rect.left) / rect.width;
      var py = (e.clientY - rect.top) / rect.height;
      var tiltX = (py - 0.5) * -24;
      var tiltY = (px - 0.5) * 24;
      el.style.transform = 'rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg) scale(1.03)';
      el.classList.add('active');

    });
    el.addEventListener('mouseleave', function() {
      el.style.transform = '';
      el.classList.remove('active');
    });
  }
}
add3DEffect('.converter-card');
add3DEffect('.info-card');
add3DEffect('.faq-section');

var bg = document.getElementById('bg-animated');
if (bg && bg.getContext) {
  var ctx = bg.getContext('2d');
  var w = window.innerWidth, h = window.innerHeight;
  bg.width = w; bg.height = h;
  var mouseX = w / 2, mouseY = h / 2;
  var isMouseOverCard = false;
  var points = [];
  
  for (let i = 0; i < 24; i++) {
    var point = {
      x: Math.random() * w,
      y: Math.random() * h,
      dx: -0.7 + Math.random() * 1.4,
      dy: -0.7 + Math.random() * 1.4,
      r: 1.5 + Math.random() * 2.5,
      c: Math.random() > 0.5 ? '#00e6d0' : '#a259ff'
    };
    point.originalX = point.x;
    point.originalY = point.y;
    point.originalDx = point.dx;
    point.originalDy = point.dy;
    points.push(point);
  }
  
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    var cardElements = document.querySelectorAll('.converter-card, .info-card, .faq-section');
    isMouseOverCard = false;
    
    cardElements.forEach(function(card) {
      var rect = card.getBoundingClientRect();
      if (mouseX >= rect.left && mouseX <= rect.right && 
          mouseY >= rect.top && mouseY <= rect.bottom) {
        isMouseOverCard = true;
      }
    });
  });
  
  function animateBG() {
    ctx.clearRect(0, 0, w, h);
    
    for (var i = 0; i < points.length; i++) {
      var p = points[i];
      
      if (isMouseOverCard) {
        var randomForce = 0.3;
        p.dx += (Math.random() - 0.5) * randomForce;
        p.dy += (Math.random() - 0.5) * randomForce;       
        p.dx *= 0.98;
        p.dy *= 0.98;
      } else {
        var distToMouse = Math.sqrt(Math.pow(mouseX - p.x, 2) + Math.pow(mouseY - p.y, 2));
        var attractionRange = 200;
        
        if (distToMouse < attractionRange) {
          var force = (attractionRange - distToMouse) / attractionRange;
          var attractionStrength = 0.5;
          
          var attractionX = (mouseX - p.x) * force * attractionStrength * 0.01;
          var attractionY = (mouseY - p.y) * force * attractionStrength * 0.01;
          
          p.dx += attractionX;
          p.dy += attractionY;
        }
        
        p.dx = Math.max(-3, Math.min(3, p.dx));
        p.dy = Math.max(-3, Math.min(3, p.dy));
      }
      

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx.fillStyle = p.c;
      ctx.globalAlpha = 0.13;
      ctx.shadowColor = p.c;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.globalAlpha = 1;
      p.x += p.dx;
      p.y += p.dy;
      
      // Bounce on wall
      if (p.x < 0 || p.x > w) {
        p.dx *= -0.8;
        p.x = Math.max(0, Math.min(w, p.x));
      }
      if (p.y < 0 || p.y > h) {
        p.dy *= -0.8;
        p.y = Math.max(0, Math.min(h, p.y));
      }
    }
    
    ctx.shadowBlur = 0;
    requestAnimationFrame(animateBG);
  }
  
  animateBG();
  
  window.addEventListener('resize', function() {
    w = window.innerWidth;
    h = window.innerHeight;
    bg.width = w;
    bg.height = h;
    
    points.forEach(function(p) {
      p.originalX = Math.random() * w;
      p.originalY = Math.random() * h;
    });
  });
}

var result = document.getElementById('result');
if (result) {
  var origConvert = window.convert;
  window.convert = function() {
    origConvert();
    result.classList.remove('show');
    void result.offsetWidth;
    result.classList.add('show');
  }
}

});
