var Tabs = (function () {
  'use strict';

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


  window.switchTab = switchTab;

  return {
    switchTab: switchTab,
  };

})();
