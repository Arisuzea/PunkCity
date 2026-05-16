    (function () {
      'use strict';

      var PAGES = ['home', 'perf', 'combat', 'ui', 'city', 'content', 'closet', 'stability'];

      function navigate(page) {
        if (!PAGES.includes(page)) page = 'home';

        document.querySelectorAll('.page').forEach(function (p) {
          p.classList.remove('active');
        });
        document.getElementById('page-' + page).classList.add('active');

        document.querySelectorAll('[data-page]').forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('data-page') === page);
        });

        window.scrollTo({ top: 0, behavior: 'instant' });
        history.pushState(null, '', '#' + page);
      }

      function closeMobile() {
        var hamburger = document.getElementById('hamburger');
        document.getElementById('mobileMenu').classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }

      // Expose for HTML onclick attributes
      window.navigate    = navigate;
      window.closeMobile = closeMobile;

      // Hamburger toggle
      document.getElementById('hamburger').addEventListener('click', function () {
        var open = this.classList.toggle('open');
        document.getElementById('mobileMenu').classList.toggle('open', open);
        this.setAttribute('aria-expanded', String(open));
      });

      // Block href default — navigation driven by onclick
      document.querySelectorAll('[data-page]').forEach(function (a) {
        a.addEventListener('click', function (e) { e.preventDefault(); });
      });

      // Browser back / forward
      window.addEventListener('popstate', function () {
        var hash = window.location.hash.replace('#', '');
        navigate(PAGES.includes(hash) ? hash : 'home');
      });

      // Wiki card keyboard activation (Enter / Space)
      document.querySelectorAll('.wiki-card[role="button"]').forEach(function (card) {
        card.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.click();
          }
        });
      });

      // Initial route from hash
      var hash = window.location.hash.replace('#', '');
      navigate(PAGES.includes(hash) ? hash : 'home');

    })();