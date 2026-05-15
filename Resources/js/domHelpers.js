/**
 * domHelpers.js
 * ─────────────────────────────────────────────────────────────
 * Shared DOM utility functions used across all modules.
 * No dependencies. Must be loaded first.
 *
 * Load order:
 *   1. domHelpers.js  ← this file
 *   2. navigation.js
 *   3. tabs.js
 *   4. slideshow.js
 *   5. main.js
 *
 * In HTML (before </body>):
 *   <script src="Resources/js/domHelpers.js"></script>  ← first
 * ─────────────────────────────────────────────────────────────
 */

var DOMHelpers = (function () {
  'use strict';

  /**
   * Marks one item in a collection as active and all others as inactive.
   * Optionally syncs a boolean aria attribute (e.g. 'aria-selected').
   *
   * @param {NodeList|Element[]} items   - Collection to iterate over.
   * @param {function(Element): boolean} matchFn - Returns true for the item to activate.
   * @param {string}             [ariaAttr]      - Aria attribute to sync (optional).
   *
   * @example
   *   // Activate the clicked tab, deactivate the rest
   *   DOMHelpers.setActive(
   *     document.querySelectorAll('.tab'),
   *     function(el) { return el.id === 'tab-' + id; },
   *     'aria-selected'
   *   );
   */
  function setActive(items, matchFn, ariaAttr) {
    items.forEach(function (el) {
      var active = matchFn(el);
      el.classList.toggle('active', active);
      if (ariaAttr) el.setAttribute(ariaAttr, String(active));
    });
  }

  /**
   * Sets an aria attribute with automatic boolean-to-string coercion.
   * Avoids the easy mistake of passing a raw boolean to setAttribute.
   *
   * @param {Element} el
   * @param {string}  attr  - e.g. 'aria-expanded', 'aria-hidden'
   * @param {boolean} value
   *
   * @example
   *   DOMHelpers.setAriaAttr(hamburger, 'aria-expanded', true);
   *   // → hamburger.setAttribute('aria-expanded', 'true')
   */
  function setAriaAttr(el, attr, value) {
    el.setAttribute(attr, String(value));
  }

  return {
    setActive:   setActive,
    setAriaAttr: setAriaAttr,
  };

})();
