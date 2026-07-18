(function () {
  'use strict';

  var sidenav   = document.getElementById('sidenav');
  var overlay   = document.getElementById('sidenavOverlay');
  var hamburger = document.getElementById('hamburger');

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


  document.querySelectorAll('.sidenav-cat').forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Collapse all other cats
      document.querySelectorAll('.sidenav-cat').forEach(function (other) {
        if (other !== btn) collapseGroup(other);
      });
      toggleGroup(btn);
    });
  });


  document.querySelectorAll('.sidenav-sub').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleGroup(btn);
    });
  });

  var currentFile = window.location.pathname.split('/').pop() || 'home.html';

  var overview = document.querySelector('.sidenav-overview');
  if (overview) {
    var overviewHref = overview.getAttribute('href').split('/').pop();
    if (overviewHref === currentFile) overview.classList.add('active');
  }

  document.querySelectorAll('.sidenav-items a, .sidenav-subitems a').forEach(function (a) {
    var linkFile = a.getAttribute('href').split('/').pop();
    if (linkFile !== currentFile) return;

    a.classList.add('active');

    var node = a.parentElement;
    while (node && node !== sidenav) {
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