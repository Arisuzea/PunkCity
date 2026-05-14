  const PAGES = ['home','requirements','preinstall','installation','postinstall','gameplay','updating','issues'];
  let current = 'home';

  function navigate(page) {
    if (!PAGES.includes(page)) page = 'home';

    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    // Show target
    document.getElementById('page-' + page).classList.add('active');

    // Update nav links
    document.querySelectorAll('[data-page]').forEach(a => {
      a.classList.toggle('active', a.getAttribute('data-page') === page);
    });

    // Scroll top
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Update hash
    history.pushState(null, '', '#' + page);
    current = page;
  }

  function closeMobile() {
    document.getElementById('mobileMenu').classList.remove('open');
    document.getElementById('hamburger').classList.remove('open');
    document.getElementById('hamburger').setAttribute('aria-expanded', 'false');
  }

  // Hamburger toggle
  document.getElementById('hamburger').addEventListener('click', function() {
    const open = this.classList.toggle('open');
    document.getElementById('mobileMenu').classList.toggle('open', open);
    this.setAttribute('aria-expanded', String(open));
  });

  // Handle hash on load
  (function() {
    const hash = window.location.hash.replace('#', '');
    if (PAGES.includes(hash)) navigate(hash);
    else navigate('home');
  })();

  // Handle browser back/forward
  window.addEventListener('popstate', function() {
    const hash = window.location.hash.replace('#', '');
    if (PAGES.includes(hash)) navigate(hash);
    else navigate('home');
  });

  // Prevent default link behavior for internal nav links
  document.querySelectorAll('[data-page]').forEach(a => {
    a.addEventListener('click', function(e) { e.preventDefault(); });
  });