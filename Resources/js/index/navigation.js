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

  // ── Route Registry ────────────────────────────────────────────────────────────
  // Add new page IDs here. Each entry must have a matching id="page-{name}" in HTML.

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

  // ── Core ──────────────────────────────────────────────────────────────────────

  /**
   * Navigates to a page by name. Falls back to 'home' for unknown pages.
   * Updates active classes, scroll position, and the URL hash.
   *
   * @param {string} page - Must match an entry in PAGES.
   */
  function navigate(page) {
    if (!PAGES.includes(page)) page = 'home';

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
  }

  /**
   * Closes the mobile menu and resets hamburger state.
   * Called from HTML onclick on mobile nav links.
   */
  function closeMobile() {
    var hamburger = document.getElementById('hamburger');
    document.getElementById('mobileMenu').classList.remove('open');
    hamburger.classList.remove('open');
    DOMHelpers.setAriaAttr(hamburger, 'aria-expanded', false);
  }

  // ── Routing ───────────────────────────────────────────────────────────────────

  /**
   * Reads the URL hash on load and navigates to the matching page.
   * Falls back to 'home' if the hash is absent or unrecognized.
   */
  function initRouting() {
    var hash = window.location.hash.replace('#', '');
    navigate(PAGES.includes(hash) ? hash : 'home');
  }

  // ── Event Wiring ──────────────────────────────────────────────────────────────

  /**
   * Attaches all navigation-related event listeners.
   * Called once from main.js on DOMContentLoaded.
   */
  function init() {
    // Hamburger open / close
    document.getElementById('hamburger').addEventListener('click', function () {
      var open = this.classList.toggle('open');
      document.getElementById('mobileMenu').classList.toggle('open', open);
      DOMHelpers.setAriaAttr(this, 'aria-expanded', open);
    });

    // Prevent href default on nav links
    // (Actual navigation is triggered via onclick="navigate(...)" in HTML)
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

  // Expose to window for HTML onclick compatibility
  window.navigate    = navigate;
  window.closeMobile = closeMobile;

  return {
    init:        init,
    navigate:    navigate,
    closeMobile: closeMobile,
    pages:       PAGES,
  };

})();
