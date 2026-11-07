(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  function prefersReduced() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function animateIn(root) {
    if (prefersReduced()) return;
    if (typeof anime === 'undefined') return;
    root = root || document;

    var logo = root.querySelector('.nav-logo');
    if (logo) {
      anime({
        targets: logo,
        opacity: [0, 1],
        translateY: [-8, 0],
        duration: 500,
        easing: 'easeOutCubic'
      });
    }
    var heroTitle = root.querySelector('.hero-title');
    if (heroTitle) {
      anime({
        targets: heroTitle,
        opacity: [0, 1],
        translateY: [24, 0],
        duration: 700,
        easing: 'easeOutExpo',
        delay: 100
      });
    }

    var tagline = root.querySelector('.hero-tagline');
    if (tagline) {
      anime({
        targets: tagline,
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 600,
        easing: 'easeOutCubic',
        delay: 260
      });
    }

    var actions = root.querySelector('.hero-actions');
    if (actions) {
      anime({
        targets: actions.children,
        opacity: [0, 1],
        translateY: [12, 0],
        duration: 500,
        easing: 'easeOutCubic',
        delay: anime.stagger(80, { start: 420 })
      });
    }

    var reveals = root.querySelectorAll('.reveal');
    if (reveals.length && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            anime({
              targets: e.target,
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 600,
              easing: 'easeOutCubic'
            });
            io.unobserve(e.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px' });
      reveals.forEach(function (el) { io.observe(el); });
    }
  }

  ready(function () {
    animateIn(document);
  });

  window.addEventListener('hashchange', function () {
    setTimeout(function () { animateIn(document); }, 50);
  });
})();

  // Hero title glitch burst: partial decrypt on random letters + split within ~40px
(function () {
  'use strict';
  var GLY = '#%&/\\<> *01■▒▓';
  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }
  ready(function () {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var el = document.querySelector('.hero-title');
    if (!el) return;
    var RESTORE = 'Night City owes <span class="accent">nothing</span>.';
    var saved = null;
    function burst() {
      if (el.dataset.decrypted !== '1') return;
      if (saved === null) saved = el.innerHTML;
      var text = (el.textContent || '').trim();
      if (!text) return;
      // Phase 1: chromatic aberration shake on the whole title
      el.style.transform = 'translate(-3px,1px)';
      el.style.textShadow = '3px 0 var(--cyan), -3px 0 var(--red)';
      setTimeout(function () {
        el.style.transform = 'translate(3px,-1px)';
        el.style.textShadow = '-3px 0 var(--cyan), 3px 0 var(--red)';
      }, 60);
      setTimeout(function () {
        el.style.transform = 'translate(-2px,2px)';
        el.style.textShadow = '2px 0 var(--cyan), -2px 0 var(--red)';
      }, 120);
      // Phase 2: split chars + partial decrypt
      setTimeout(function () {
        var chars = text.split('');
        var html = chars.map(function (c) {
          if (c === ' ') return ' ';
          if (Math.random() > 0.62) {
            return '<span style="display:inline-block;transform:translate(' +
              (Math.random() * 80 - 40).toFixed(1) + 'px,' +
              (Math.random() * 80 - 40).toFixed(1) + 'px) rotate(' +
              (Math.random() * 24 - 12).toFixed(1) + 'deg);color:var(--cyan);text-shadow:0 0 8px var(--cyan);opacity:.9;">' +
              GLY.charAt(Math.floor(Math.random() * GLY.length)) + '</span>';
          }
          if (Math.random() < 0.45) {
            return '<span style="display:inline-block;transform:translate(' +
              (Math.random() * 80 - 40).toFixed(1) + 'px,' +
              (Math.random() * 80 - 40).toFixed(1) + 'px) rotate(' +
              (Math.random() * 16 - 8).toFixed(1) + 'deg);text-shadow:2px 0 var(--red),-2px 0 var(--cyan);">' + c + '</span>';
          }
          return c;
        }).join('');
        el.style.transform = '';
        el.style.textShadow = '2px 0 var(--cyan), -2px 0 var(--red)';
        el.innerHTML = html;
      }, 180);
      setTimeout(function () { el.innerHTML = saved || RESTORE; el.style.transform = ''; el.style.textShadow = ''; }, 480);
    }
    setInterval(burst, 5000);
    setTimeout(burst, 5200);
  });
})();

(function () {
  'use strict';
  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }
  ready(function () {
    var heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;
    function update() {
      var y = window.scrollY || window.pageYOffset || 0;
      heroBg.style.backgroundPosition = 'center ' + (y * 0.3) + 'px';
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
  });
})();
