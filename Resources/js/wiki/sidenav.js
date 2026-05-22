/**
 * sidenav.js
 * ─────────────────────────────────────────────────────────────
 * Sidenav behaviour for the wiki (href-based, no SPA routing).
 *
 * Handles:
 *   - Hamburger / overlay toggle (mobile)
 *   - Category accordion (top-level)
 *   - Subcategory accordion (nested, inside Core Features / Controls)
 *   - Auto-expand the active category + subcategory on page load
 *   - Mark the current page link as active
 * ─────────────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  var sidenav   = document.getElementById('sidenav');
  var overlay   = document.getElementById('sidenavOverlay');
  var hamburger = document.getElementById('hamburger');

  // ── Mobile open / close ─────────────────────────────────────

  function openSidenav() {
    if (sidenav)   sidenav.classList.add('open');
    if (overlay)   overlay.classList.add('open');
    if (hamburger) {
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
    }
  }

  function closeSidenav() {
    if (sidenav)   sidenav.classList.remove('open');
    if (overlay)   overlay.classList.remove('open');
    if (hamburger) {
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      sidenav.classList.contains('open') ? closeSidenav() : openSidenav();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeSidenav);
  }

  // ── Accordion helpers ───────────────────────────────────────

  function expandGroup(btn) {
    btn.setAttribute('aria-expanded', 'true');
    btn.nextElementSibling.classList.add('open');
  }

  function collapseGroup(btn) {
    btn.setAttribute('aria-expanded', 'false');
    btn.nextElementSibling.classList.remove('open');
  }

  function toggleGroup(btn) {
    btn.getAttribute('aria-expanded') === 'true'
      ? collapseGroup(btn)
      : expandGroup(btn);
  }

  // ── Top-level category accordions ──────────────────────────

  document.querySelectorAll('.sidenav-cat').forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Collapse all other cats
      document.querySelectorAll('.sidenav-cat').forEach(function (other) {
        if (other !== btn) collapseGroup(other);
      });
      toggleGroup(btn);
    });
  });

  // ── Subcategory accordions ──────────────────────────────────

  document.querySelectorAll('.sidenav-sub').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation(); // don't bubble to parent .sidenav-cat
      toggleGroup(btn);
    });
  });

  // ── Mark active link + auto-expand its parents ──────────────

  var currentFile = window.location.pathname.split('/').pop() || 'home.html';

  // Check overview link
  var overview = document.querySelector('.sidenav-overview');
  if (overview) {
    var overviewHref = overview.getAttribute('href').split('/').pop();
    if (overviewHref === currentFile) overview.classList.add('active');
  }

  // Check all leaf links
  document.querySelectorAll('.sidenav-items a, .sidenav-subitems a').forEach(function (a) {
    var linkFile = a.getAttribute('href').split('/').pop();
    if (linkFile !== currentFile) return;

    a.classList.add('active');

    // Walk up and expand any .sidenav-cat or .sidenav-sub above this link
    var node = a.parentElement;
    while (node && node !== sidenav) {
      // If this node is a .sidenav-items or .sidenav-subitems, open it
      // and set aria-expanded on the preceding button sibling
      if (
        node.classList.contains('sidenav-items') ||
        node.classList.contains('sidenav-subitems')
      ) {
        node.classList.add('open');
        var prevBtn = node.previousElementSibling;
        if (prevBtn) prevBtn.setAttribute('aria-expanded', 'true');
      }
      node = node.parentElement;
    }
  });

})();