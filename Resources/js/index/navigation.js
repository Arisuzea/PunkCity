/**
 * navigation.js
 * ─────────────────────────────────────────────────────────────
 * Handles hash-based page routing and the mobile hamburger menu.
 * Depends on: domHelpers.js
 *
 * Exposes navigate() and closeMobile() to window so existing
 * HTML onclick attributes continue to work without changes.
 *   e.g.  onclick="navigate('requirements')"
 *         onclick="closeMobile()"
 *
 * To add a new page (e.g. 'wiki'), add its ID to PAGES below.
 * The corresponding HTML element must have id="page-wiki"
 * and nav links must have data-page="wiki".
 * ─────────────────────────────────────────────────────────────
 */

var Navigation = (function () {
  'use strict';

  var PAGES = [
    'home',
    'requirements',
    'preinstall',
    'installation',
    'postinstall',
    'gameplay',
    'updating',
    'changelogs',
    'issues',
  ];

  var currentPage = 'home';
  var initialLoad = true;

  function navigate(page) {
    if (!PAGES.includes(page)) page = 'home';

    var reduced = (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    var gate = document.getElementById('pageGate');
    if (!gate) {
      gate = document.createElement('div');
      gate.id = 'pageGate';
      gate.className = 'page-transition';
      gate.innerHTML = '<div class="block"></div><div class="block"></div><div class="block"></div><div class="block"></div>';
      document.body.appendChild(gate);
    }

    function doSwap() {
      DOMHelpers.setActive(
        document.querySelectorAll('.page'),
        function (el) { return el.id === 'page-' + page; }
      );
      DOMHelpers.setActive(
        document.querySelectorAll('[data-page]'),
        function (el) { return el.getAttribute('data-page') === page; }
      );
      window.scrollTo({ top: 0, behavior: 'instant' });
      history.pushState(null, '', '#' + page);
      currentPage = page;
      if (!reduced && typeof anime !== 'undefined') {
        var reveals = document.querySelectorAll('.page.active .reveal:not(.in)');
        if (reveals.length) {
          anime({
            targets: reveals,
            opacity: [0, 1],
            translateY: [18, 0],
            duration: 600,
            easing: 'easeOutCubic',
            delay: anime.stagger(60)
          });
          reveals.forEach(function (el) { el.classList.add('in'); });
        }
      }
    }

    if (reduced) { doSwap(); if (window.resetDecrypt) window.resetDecrypt(document.querySelector('.page.active')); initialLoad = false; return; }

    gate.classList.add('active');
    setTimeout(function () {
      doSwap();
      var finish = function () {
        gate.classList.remove('active');
        // Play decrypt only after the loading overlay is gone
        if (window.resetDecrypt) window.resetDecrypt(document.querySelector('.page.active'));
        initialLoad = false;
      };
      if (initialLoad) {
        if (document.readyState === 'complete') {
          setTimeout(finish, 300);
        } else {
          var done = false;
          var onLoad = function () { if (done) return; done = true; clearTimeout(fallback); setTimeout(finish, 300); };
          var fallback = setTimeout(function () { if (done) return; done = true; window.removeEventListener('load', onLoad); setTimeout(finish, 300); }, 4000);
          window.addEventListener('load', onLoad, { once: true });
        }
      } else {
        setTimeout(finish, 300);
      }
    }, 350);
  }

  function closeMobile() {
    var hamburger = document.getElementById('hamburger');
    document.getElementById('mobileMenu').classList.remove('open');
    hamburger.classList.remove('open');
    DOMHelpers.setAriaAttr(hamburger, 'aria-expanded', false);
  }

  function initRouting() {
    var hash = window.location.hash.replace('#', '');
    navigate(PAGES.includes(hash) ? hash : 'home');
  }

  function init() {
    // Hamburger open / close
    document.getElementById('hamburger').addEventListener('click', function () {
      var open = this.classList.toggle('open');
      document.getElementById('mobileMenu').classList.toggle('open', open);
      DOMHelpers.setAriaAttr(this, 'aria-expanded', open);
    });
    
    document.querySelectorAll('[data-page]').forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); });
    });

    // Browser back / forward button support
    window.addEventListener('popstate', function () {
      var hash = window.location.hash.replace('#', '');
      navigate(PAGES.includes(hash) ? hash : 'home');
    });

    initRouting();
  }

  window.navigate    = navigate;
  window.closeMobile = closeMobile;

  return {
    init:        init,
    navigate:    navigate,
    closeMobile: closeMobile,
    pages:       PAGES,
  };

})();
