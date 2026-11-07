(function () {
  'use strict';
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var canvas = document.getElementById('matrix-bg');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var w = 0, h = 0;
  var fontSize = 9;
  var chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789';
  var GLY = '#%&/\<> *01■▒▓';
  var drops = [];
  var columns = 0;
  var lastW = 0, lastH = 0;
  var lastTime = 0;

  function init(force) {
    var nw = window.innerWidth;
    var nh = window.innerHeight;
    if (!force && nw === lastW && Math.abs(nh - lastH) < 150) return; // ignore mobile address-bar show/hide
    lastW = w = canvas.width = nw;
    lastH = h = canvas.height = nh;
    columns = Math.max(1, Math.floor(w / fontSize));
    drops = [];
  }
  init(true);
  window.addEventListener('resize', function () { init(false); });

  function spawn(n) {
    if (drops.length > 1800) return;
    for (var k = 0; k < n; k++) {
      var col = Math.floor(Math.random() * columns);
      var decrypt = Math.random() < 0.3;
      var target = chars.charAt(Math.floor(Math.random() * chars.length));
      drops.push({
        x: col * fontSize,
        y: -fontSize,
        speed: 0.6 + Math.random() * 1.2,
        ch: target,
        target: target,
        decrypt: decrypt,
        age: 0
      });
    }
  }

  var first = true;
  function draw(now) {
    if (!lastTime) lastTime = now;
    var dt = Math.min((now - lastTime) / 1000, 0.05); // seconds, capped low to avoid jumps
    lastTime = now;
    var scale = dt * 60; // normalize to 60fps

    if (first) { ctx.fillStyle = '#000000'; first = false; }
    else { ctx.fillStyle = 'rgba(0, 0, 0, ' + Math.min(0.5, 0.1 * scale) + ')'; }
    ctx.fillRect(0, 0, w, h);

    spawn(Math.max(1, Math.round(3 * scale)));

    ctx.font = 'bold ' + fontSize + 'px "JetBrains Mono", monospace';
    for (var i = drops.length - 1; i >= 0; i--) {
      var d = drops[i];
      d.y += d.speed * scale;
      if (d.decrypt) {
        if (d.age < 5) {
          d.ch = GLY.charAt(Math.floor(Math.random() * GLY.length));
          d.age++;
        } else {
          d.ch = d.target;
        }
      }
      var alpha = 0.55 + Math.random() * 0.4;
      ctx.fillStyle = 'rgba(255, 60, 90, ' + alpha + ')';
      ctx.fillText(d.ch, d.x, d.y);

      if (d.y > h + fontSize) {
        drops.splice(i, 1);
      }
    }

    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();
