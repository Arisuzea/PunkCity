/**
 * slideshow.js
 * ─────────────────────────────────────────────────────────────
 * Reusable auto-advancing slideshow engine.
 * Features: dot navigation, progress bar, keyboard, touch swipe.
 * Depends on: domHelpers.js
 *
 * ── Basic Usage ───────────────────────────────────────────────
 *   Slideshow.init('slideshow', MY_SLIDES_ARRAY);
 *
 * ── With Options ─────────────────────────────────────────────
 *   Slideshow.init('wiki-slideshow', WIKI_SLIDES, {
 *     interval: 7000,
 *     selectors: {
 *       dots:    '#wikiDots',
 *       counter: '#wikiCounter',
 *       bar:     '#wikiProgressBar',
 *       prev:    '#wikiPrev',
 *       next:    '#wikiNext',
 *     }
 *   });
 *
 * ── Required HTML inside the container ───────────────────────
 *   <div id="ssDots"        role="tablist"></div>
 *   <span id="ssCounter"    aria-live="polite"></span>
 *   <div id="ssProgressBar" aria-hidden="true"></div>
 *   <button id="ssPrev"     aria-label="Previous slide">&#8249;</button>
 *   <button id="ssNext"     aria-label="Next slide">&#8250;</button>
 *
 *   Slides are injected automatically before #ssPrev.
 *   Pass custom selectors via options.selectors for multi-slideshow pages.
 * ─────────────────────────────────────────────────────────────
 */

var Slideshow = (function () {
  'use strict';

  /**
   * Initializes a slideshow instance inside a container element.
   *
   * @param {string}   containerId       - ID of the slideshow root element.
   * @param {Array<{src: string, caption?: string}>} slides - Slide data.
   * @param {Object}   [options]
   * @param {number}   [options.interval=5000]   - Auto-advance interval in ms.
   * @param {Object}   [options.selectors]       - Override default element selectors.
   * @param {string}   [options.selectors.dots]
   * @param {string}   [options.selectors.counter]
   * @param {string}   [options.selectors.bar]
   * @param {string}   [options.selectors.prev]
   * @param {string}   [options.selectors.next]
   */
  function init(containerId, slides, options) {
    if (!slides || !slides.length) return;
    options = options || {};

    var container = document.getElementById(containerId);
    if (!container) return;

    var INTERVAL = options.interval || 5000;

    // Default selectors match the original HTML IDs.
    // Pass options.selectors to support multiple slideshows on one page.
    var sel = Object.assign({
      dots:    '#ssDots',
      counter: '#ssCounter',
      bar:     '#ssProgressBar',
      prev:    '#ssPrev',
      next:    '#ssNext',
    }, options.selectors || {});

    var el = {
      dots:    document.querySelector(sel.dots),
      counter: document.querySelector(sel.counter),
      bar:     document.querySelector(sel.bar),
      prev:    document.querySelector(sel.prev),
      next:    document.querySelector(sel.next),
    };

    var current = 0;
    var timer   = null;
    var paused  = false;

    // ── Build Slide Elements ───────────────────────────────────────────────────

    var slideEls = slides.map(function (data, i) {
      var div = document.createElement('div');
      div.className = 'slide';
      div.setAttribute('role',              'group');
      div.setAttribute('aria-roledescription', 'slide');
      div.setAttribute('aria-label',        (i + 1) + ' of ' + slides.length);

      var img    = document.createElement('img');
      img.src    = data.src;
      img.alt    = data.caption || ('Screenshot ' + (i + 1));
      img.loading = i === 0 ? 'eager' : 'lazy';
      div.appendChild(img);

      if (data.caption) {
        var cap        = document.createElement('p');
        cap.className  = 'slide-caption';
        cap.textContent = data.caption;
        div.appendChild(cap);
      }

      // Insert before the prev arrow so slides appear in DOM order
      container.insertBefore(div, el.prev);
      return div;
    });

    // ── Build Dot Navigation ───────────────────────────────────────────────────

    var dotEls = slides.map(function (_, i) {
      var btn = document.createElement('button');
      btn.className = 'slide-dot';
      btn.setAttribute('role',       'tab');
      btn.setAttribute('aria-label', 'Screenshot ' + (i + 1));
      btn.addEventListener('click', function () { goTo(i); });
      el.dots.appendChild(btn);
      return btn;
    });

    // ── UI Sync ────────────────────────────────────────────────────────────────

    function updateUI() {
      // Match by element reference — avoids index capture issues
      DOMHelpers.setActive(slideEls, function (s) { return s === slideEls[current]; });
      DOMHelpers.setActive(dotEls,   function (d) { return d === dotEls[current]; }, 'aria-selected');

      // aria-hidden is the inverse of active — handled separately
      slideEls.forEach(function (s, i) {
        s.setAttribute('aria-hidden', String(i !== current));
      });

      el.counter.textContent = (current + 1) + ' / ' + slides.length;
    }

    // ── Progress Bar ───────────────────────────────────────────────────────────

    function resetProgress() {
      el.bar.style.transition = 'none';
      el.bar.style.width      = '0%';
      void el.bar.offsetWidth;                               // force reflow
      el.bar.style.transition = 'width ' + INTERVAL + 'ms linear';
      el.bar.style.width      = '100%';
    }

    function pauseProgress() {
      var pct = (parseFloat(getComputedStyle(el.bar).width) / el.bar.parentElement.offsetWidth) * 100;
      el.bar.style.transition = 'none';
      el.bar.style.width      = pct + '%';
    }

    function resumeProgress() {
      var pct       = (parseFloat(getComputedStyle(el.bar).width) / el.bar.parentElement.offsetWidth) * 100;
      var remaining = INTERVAL * (1 - pct / 100);
      el.bar.style.transition = 'width ' + remaining + 'ms linear';
      el.bar.style.width      = '100%';
    }

    // ── Slide Navigation ───────────────────────────────────────────────────────

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      updateUI();
      resetProgress();
      clearInterval(timer);
      if (!paused) startTimer();
    }

    function startTimer() {
      timer = setInterval(function () { goTo(current + 1); }, INTERVAL);
    }

    // ── Bootstrap ──────────────────────────────────────────────────────────────

    updateUI();
    resetProgress();
    startTimer();

    // ── Event Listeners ────────────────────────────────────────────────────────

    el.prev.addEventListener('click', function () { goTo(current - 1); });
    el.next.addEventListener('click', function () { goTo(current + 1); });

    container.addEventListener('mouseenter', function () {
      paused = true;
      clearInterval(timer);
      pauseProgress();
    });

    container.addEventListener('mouseleave', function () {
      paused = false;
      resumeProgress();
      startTimer();
    });

    container.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft')  goTo(current - 1);
      if (e.key === 'ArrowRight') goTo(current + 1);
    });

    // Touch swipe support
    var touchStartX = 0;

    container.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    container.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) goTo(current + (dx < 0 ? 1 : -1));
    }, { passive: true });
  }

  return { init: init };

})();
