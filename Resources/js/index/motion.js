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
