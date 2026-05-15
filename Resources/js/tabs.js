/**
 * tabs.js
 * ─────────────────────────────────────────────────────────────
 * Handles tab group switching (e.g. installation methods).
 * Depends on: domHelpers.js
 *
 * Convention:
 *   Tab trigger element  → id="tab-{id}"    class="method-tab"
 *   Tab content element  → id="panel-{id}"  class="method-panel"
 *
 * Exposes switchTab() to window for HTML onclick compatibility.
 *   e.g.  onclick="switchTab('vortex')"
 *         onclick="switchTab('mo2')"
 * ─────────────────────────────────────────────────────────────
 */

var Tabs = (function () {
  'use strict';

  /**
   * Activates a tab and its associated panel by ID.
   * Deactivates all other tabs and panels in the same group.
   *
   * @param {string} id - Matches the suffix of 'tab-{id}' and 'panel-{id}'.
   *
   * @example
   *   switchTab('vortex');
   *   // Activates #tab-vortex and #panel-vortex
   *   // Deactivates all other .method-tab and .method-panel elements
   */
  function switchTab(id) {
    DOMHelpers.setActive(
      document.querySelectorAll('.method-tab'),
      function (el) { return el.id === 'tab-' + id; },
      'aria-selected'
    );

    DOMHelpers.setActive(
      document.querySelectorAll('.method-panel'),
      function (el) { return el.id === 'panel-' + id; }
    );
  }

  // Expose to window for HTML onclick compatibility
  window.switchTab = switchTab;

  return {
    switchTab: switchTab,
  };

})();
