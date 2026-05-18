/**
 * wiki.js
 * ─────────────────────────────────────────────────────────────
 * Wiki-specific SPA routing. Does NOT load navigation.js —
 * that file's PAGES array is scoped to index.html routes.
 *
 * Place at: Resources/js/wiki/wiki.js
 * Load after: domHelpers.js
 *
 * Exposes to window (for HTML onclick attributes):
 *   navigate(page)
 *   navigateTo(page, anchor)
 * ─────────────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  var PAGES      = ['home', 'basics', 'combat', 'ui', 'city', 'content', 'closet', 'stability'];
  var SCROLL_PAD = 28;

  var sidenav   = document.getElementById('sidenav');
  var overlay   = document.getElementById('sidenavOverlay');
  var hamburger = document.getElementById('hamburger'); // null when no navbar

  // ── Sidenav active state ────────────────────────────────────

  function syncCategoryActive(page) {
    document.querySelectorAll('.sidenav-cat[data-page]').forEach(function (el) {
      el.classList.toggle('active', el.getAttribute('data-page') === page);
    });
    var overview = document.querySelector('.sidenav-overview');
    if (overview) overview.classList.toggle('active', page === 'home');
  }

  function clearSubActive() {
    document.querySelectorAll('.sidenav-items li a').forEach(function (a) {
      a.classList.remove('active');
    });
  }

  function setSubActive(anchor) {
    clearSubActive();
    var el = document.querySelector('.sidenav-items li a[data-sub="' + anchor + '"]');
    if (el) el.classList.add('active');
  }

  // ── Mobile sidenav ──────────────────────────────────────────

  function openSidenav() {
    if (sidenav)   sidenav.classList.add('open');
    if (overlay)   overlay.classList.add('open');
    if (hamburger) { hamburger.classList.add('open'); hamburger.setAttribute('aria-expanded', 'true'); }
  }

  function closeSidenav() {
    if (sidenav)   sidenav.classList.remove('open');
    if (overlay)   overlay.classList.remove('open');
    if (hamburger) { hamburger.classList.remove('open'); hamburger.setAttribute('aria-expanded', 'false'); }
  }

  // ── Page navigation ─────────────────────────────────────────

  function navigate(page) {
    if (!PAGES.includes(page)) page = 'home';

    document.querySelectorAll('.page').forEach(function (p) {
      p.classList.remove('active');
    });
    document.getElementById('page-' + page).classList.add('active');

    syncCategoryActive(page);
    clearSubActive();
    window.scrollTo({ top: 0, behavior: 'instant' });
    history.pushState(null, '', '#' + page);
    closeSidenav();
  }

  // ── Anchor navigation ───────────────────────────────────────

  function navigateTo(page, anchor) {
    if (!PAGES.includes(page)) page = 'home';

    document.querySelectorAll('.page').forEach(function (p) {
      p.classList.remove('active');
    });
    document.getElementById('page-' + page).classList.add('active');

    syncCategoryActive(page);
    setSubActive(anchor);
    history.pushState(null, '', '#' + page);
    closeSidenav();

    requestAnimationFrame(function () {
      var target = document.getElementById(anchor);
      if (!target) return;
      // navH is 0 when no navbar present
      var navH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
      ) || 0;
      var top = target.getBoundingClientRect().top + window.scrollY - navH - SCROLL_PAD;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  }

  // ── Expose BEFORE initial route so onclick attrs work immediately ──

  window.navigate   = navigate;
  window.navigateTo = navigateTo;

  // ── Event listeners ─────────────────────────────────────────

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      sidenav.classList.contains('open') ? closeSidenav() : openSidenav();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeSidenav);
  }

  document.querySelectorAll('.sidenav-overview, .sidenav-items li a').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); });
  });

  document.querySelectorAll('.wiki-card[role="button"]').forEach(function (card) {
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
    });
  });

  window.addEventListener('popstate', function () {
    var hash = window.location.hash.replace('#', '');
    navigate(PAGES.includes(hash) ? hash : 'home');
  });

  // ── Initial route ───────────────────────────────────────────

  var hash = window.location.hash.replace('#', '');
  navigate(PAGES.includes(hash) ? hash : 'home');

})();