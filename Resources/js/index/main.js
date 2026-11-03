(function () {
  'use strict';

  // Slideshow paths
  var CREDIT = '@unilluminatedsideofthesun on Instagram';

  var SS_SLIDES = [
    { src: '/static/screenshots/01.png', caption: 'Enhanced Graphics'              },
    { src: '/static/screenshots/02.png', caption: 'An immersive experience'         },
    { src: '/static/screenshots/03.png', caption: 'Explore Night City your way'     },
    { src: '/static/screenshots/04.png', caption: 'The world reacts to your actions'},
    { src: '/static/screenshots/05.jpg', caption: 'Deep connections in a shallow city — ' + CREDIT },
    { src: '/static/screenshots/06.jpg', caption: 'Night City, breathing and bleeding — ' + CREDIT },
    { src: '/static/screenshots/07.jpg', caption: 'Prime merc work: messy, loud, and lucrative — ' + CREDIT },
    { src: '/static/screenshots/08.jpg', caption: 'Brutal takedowns have never felt this good — ' + CREDIT },
    { src: '/static/screenshots/09.jpg', caption: "MaxTac isn't your only problem anymore — " + CREDIT },
    { src: '/static/screenshots/10.jpg', caption: 'Total narrative freedom. Your V, your rules — ' + CREDIT },
    { src: '/static/screenshots/11.jpg', caption: 'Build your squad. Survive together — ' + CREDIT },
    { src: '/static/screenshots/12.jpg', caption: 'Beauty in the decay. — ' + CREDIT },
    { src: '/static/screenshots/13.jpg', caption: "Some gigs are just pest control. Jotaro's reign ends tonight — " + CREDIT },
    { src: '/static/screenshots/14.jpg', caption: "What you can't see will kill you — " + CREDIT },
    { src: '/static/screenshots/15.jpg', caption: 'Night City is yours for the taking — ' + CREDIT },
  ];


  Navigation.init();
  Slideshow.init('slideshow', SS_SLIDES);

  // Scroll-reveal: add .reveal to sections, observe
  if ('IntersectionObserver' in window) {
    document.querySelectorAll('section, .callout, .stat-pill').forEach(function (el) {
      el.classList.add('reveal');
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  // Decrypt scramble effect for .decrypt elements
  window.runDecrypt = function (root) {
    root = root || document;
    var GLY = '#%&/\\<> *01■▒▓';
    var els = root.querySelectorAll('.decrypt');
    if (!els.length) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    els.forEach(function (el) {
      var target = el.getAttribute('data-decrypt') || el.textContent;
      el.setAttribute('data-decrypt', target);
      el.textContent = target; // reset
      var i = 0;
      var iv = setInterval(function () {
        el.textContent = target.split('').map(function (c, j) {
          if (j < i) return c;
          if (c === ' ' || c === '·' || c === '?') return c;
          return GLY.charAt(Math.floor(Math.random() * GLY.length));
        }).join('');
        i++;
        if (i > target.length) { clearInterval(iv); el.textContent = target; }
      }, 34);
    });
  };
  window.runDecrypt(document);
})();
