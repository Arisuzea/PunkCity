(function () {
  'use strict';
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var canvas = document.getElementById('blackwall-bg');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var w = 0, h = 0;
  var vLines = [];
  var drops = [];
  var columns = 0;
  var fontSize = 11;
  var chars = 'PUNKCITY0123456789#%&@';

  function init() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    vLines = [];
    var spacing = 24;
    for (var x = 0; x < w; x += spacing) {
      vLines.push({ x: x, height: h * (0.18 + Math.random() * 0.62), alpha: 0.12 + Math.random() * 0.38 });
    }
    columns = Math.floor(w / fontSize);
    drops = [];
    for (var i = 0; i < columns; i++) {
      drops[i] = Math.random() * -h / fontSize;
    }
  }
  init();
  window.addEventListener('resize', init);

  var t = 0;
  var first = true;
  function draw() {
    if (first) { ctx.fillStyle = '#000000'; first = false; }
    else { ctx.fillStyle = 'rgba(0, 0, 0, 0.14)'; }
    ctx.fillRect(0, 0, w, h);

    // horizontal grid
    ctx.strokeStyle = 'rgba(120, 0, 40, 0.16)';
    ctx.lineWidth = 1;
    var hStep = 38;
    for (var y = 0; y < h; y += hStep) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // vertical lines with varying height/opacity
    for (var i = 0; i < vLines.length; i++) {
      var v = vLines[i];
      ctx.strokeStyle = 'rgba(200, 20, 70, ' + v.alpha + ')';
      ctx.beginPath();
      ctx.moveTo(v.x, h);
      ctx.lineTo(v.x, h - v.height);
      ctx.stroke();
    }

    // matrix rain (voluminous)
    ctx.font = 'bold ' + fontSize + 'px "JetBrains Mono", monospace';
    for (var j = 0; j < drops.length; j++) {
      var text = chars.charAt(Math.floor(Math.random() * chars.length));
      var alpha = 0.55 + Math.random() * 0.4;
      ctx.fillStyle = 'rgba(255, 60, 90, ' + alpha + ')';
      ctx.fillText(text, j * fontSize, drops[j] * fontSize);
      if (drops[j] * fontSize > h && Math.random() > 0.965) {
        drops[j] = 0;
      }
      drops[j] += 0.5;
    }

    // scanning light band
    t += 0.004;
    var scanY = h * 0.62 + Math.sin(t) * h * 0.05;
    var grad = ctx.createLinearGradient(0, scanY - 50, 0, scanY + 50);
    grad.addColorStop(0, 'rgba(255, 60, 120, 0)');
    grad.addColorStop(0.5, 'rgba(255, 140, 190, 0.85)');
    grad.addColorStop(1, 'rgba(255, 60, 120, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, scanY - 50, w, 100);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, scanY);
    ctx.lineTo(w, scanY);
    ctx.stroke();

    requestAnimationFrame(draw);
  }
  draw();
})();
