var DOMHelpers = (function () {
  'use strict';

  function setActive(items, matchFn, ariaAttr) {
    items.forEach(function (el) {
      var active = matchFn(el);
      el.classList.toggle('active', active);
      if (ariaAttr) el.setAttribute(ariaAttr, String(active));
    });
  }

  function setAriaAttr(el, attr, value) {
    el.setAttribute(attr, String(value));
  }

  return {
    setActive:   setActive,
    setAriaAttr: setAriaAttr,
  };

})();
