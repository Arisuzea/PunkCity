/**
 * main.js
 * ─────────────────────────────────────────────────────────────
 * Entry point. Owns page-specific data and boots all modules.
 * Depends on: domHelpers.js, navigation.js, tabs.js, slideshow.js
 *
 * ── Script load order in HTML (before </body>) ────────────────
 *   <script src="Resources/js/domHelpers.js"></script>
 *   <script src="Resources/js/navigation.js"></script>
 *   <script src="Resources/js/tabs.js"></script>
 *   <script src="Resources/js/slideshow.js"></script>
 *   <script src="Resources/js/main.js"></script>
 *
 * ── Adding a wiki page later ──────────────────────────────────
 *   1. Add 'wiki' to PAGES in navigation.js
 *   2. Add a wiki-specific slide array here (or in wiki.js)
 *   3. Call Slideshow.init('wiki-slideshow', WIKI_SLIDES, { selectors: {...} })
 * ─────────────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  // ── Slideshow Data ────────────────────────────────────────────────────────────
  // Slide content lives here, not inside the engine.
  // To update screenshots: edit this array only. slideshow.js never changes.

  var SS_SLIDES = [
    { src: 'Screenshots/01.png', caption: 'Enhanced Graphics'              },
    { src: 'Screenshots/02.png', caption: 'An immersive experience'         },
    { src: 'Screenshots/03.png', caption: 'Explore Night City your way'     },
    { src: 'Screenshots/04.png', caption: 'The world reacts to your actions'},
  ];

  // ── Boot ──────────────────────────────────────────────────────────────────────

  Navigation.init();
  Slideshow.init('slideshow', SS_SLIDES);

  // Tabs has no init — switchTab() is triggered directly from HTML onclick

})();
