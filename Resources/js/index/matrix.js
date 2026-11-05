(function () {
  'use strict';
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var canvas = document.getElementById('matrix-bg');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var w = 0, h = 0;
  var drops = [];
  var columns = 0;
  var fontSize = 9;
  var chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789';

  function init() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    columns = Math.floor(w / fontSize);
    drops = [];
    for (var i = 0; i < columns; i++) {
      drops[i] = Math.random() * -h / fontSize;
    }
  }
  init();
  window.addEventListener('resize', init);

  var first = true;
  function draw() {
    if (first) { ctx.fillStyle = '#000000'; first = false; }
    else { ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'; }
    ctx.fillRect(0, 0, w, h);

    ctx.font = 'bold ' + fontSize + 'px "JetBrains Mono", monospace';
    for (var i = 0; i < drops.length; i++) {
      var text = chars.charAt(Math.floor(Math.random() * chars.length));
      var alpha = 0.6 + Math.random() * 0.4;
      ctx.fillStyle = 'rgba(255, 60, 90, ' + alpha + ')';
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > h && Math.random() > 0.965) {
        drops[i] = 0;
      }
      drops[i] += 0.5;
    }
    requestAnimationFrame(draw);
  }
  draw();
})();
