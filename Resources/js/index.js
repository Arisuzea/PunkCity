  const PAGES = ['home','requirements','preinstall','installation','postinstall','gameplay','updating', 'changelogs', 'issues'];
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
  
  // Installation tab switching
  function switchTab(id) {
    document.querySelectorAll('.method-tab').forEach(btn => {
      const active = btn.id === 'tab-' + id;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', String(active));
    });
    document.querySelectorAll('.method-panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === 'panel-' + id);
    });
  }

  // Slideshows
  const SS_SLIDES = [
    { src: "Screenshots/01.png", caption: "Enhanced Graphics" },
    { src: "Screenshots/02.png", caption: "An immersive experience" },
    { src: "Screenshots/03.png", caption: "Explore Night City your way" },
    { src: "Screenshots/04.png", caption: "The world reacts to your actions" },
  ];

  (function initSlideshow() {
    if (!SS_SLIDES.length) return;

    const el = {
      slideshow: document.getElementById("slideshow"),
      dots: document.getElementById("ssDots"),
      counter: document.getElementById("ssCounter"),
      bar: document.getElementById("ssProgressBar"),
      prev: document.getElementById("ssPrev"),
      next: document.getElementById("ssNext"),
    };

    const INTERVAL = 5000;
    let current = 0;
    let timer = null;
    let paused = false;

    const slides = SS_SLIDES.map((data, i) => {
      const div = document.createElement("div");
      div.className = "slide";
      div.setAttribute("role", "group");
      div.setAttribute("aria-roledescription", "slide");
      div.setAttribute("aria-label", `${i + 1} of ${SS_SLIDES.length}`);

      const img = document.createElement("img");
      img.src = data.src;
      img.alt = data.caption || `Screenshot ${i + 1}`;
      img.loading = i === 0 ? "eager" : "lazy";
      div.appendChild(img);

      if (data.caption) {
        const cap = document.createElement("p");
        cap.className = "slide-caption";
        cap.textContent = data.caption;
        div.appendChild(cap);
      }

      // Insert before the arrow buttons
      el.slideshow.insertBefore(div, el.prev);
      return div;
    });
  
    // Build Dots
    const dots = SS_SLIDES.map((_, i) => {
      const btn = document.createElement("button");
      btn.className = "slide-dot";
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-label", `Screenshot ${i + 1}`);
      btn.addEventListener("click", () => goTo(i));
      el.dots.appendChild(btn);
      return btn;
    });

    // UI Sync
    function updateUI() {
      slides.forEach((s, i) => {
        s.classList.toggle("active", i === current);
        s.setAttribute("aria-hidden", String(i !== current));
      });
      dots.forEach((d, i) => {
        d.classList.toggle("active", i === current);
        d.setAttribute("aria-selected", String(i === current));
      });
      el.counter.textContent = `${current + 1} / ${SS_SLIDES.length}`;
    }

    // Progress Bar
    function resetProgress() {
      el.bar.style.transition = "none";
      el.bar.style.width = "0%";
      void el.bar.offsetWidth; // force reflow
      el.bar.style.transition = `width ${INTERVAL}ms linear`;
      el.bar.style.width = "100%";
    }

    function pauseProgress() {
      const pct =
        (parseFloat(getComputedStyle(el.bar).width) /
          el.bar.parentElement.offsetWidth) *
        100;
      el.bar.style.transition = "none";
      el.bar.style.width = pct + "%";
    }

    function resumeProgress() {
      const pct =
        (parseFloat(getComputedStyle(el.bar).width) /
          el.bar.parentElement.offsetWidth) *
        100;
      const remaining = INTERVAL * (1 - pct / 100);
      el.bar.style.transition = `width ${remaining}ms linear`;
      el.bar.style.width = "100%";
    }

    // Slideshow Navigation
    function goTo(index) {
      current = (index + SS_SLIDES.length) % SS_SLIDES.length;
      updateUI();
      resetProgress();
      clearInterval(timer);
      if (!paused) startTimer();
    }

    function startTimer() {
      timer = setInterval(() => goTo(current + 1), INTERVAL);
    }

    // Bootstraaaaaaaaaaaap on
    updateUI();
    resetProgress();
    startTimer();

    // Heh Controls
    el.prev.addEventListener("click", () => goTo(current - 1));
    el.next.addEventListener("click", () => goTo(current + 1));

    el.slideshow.addEventListener("mouseenter", () => {
      paused = true;
      clearInterval(timer);
      pauseProgress();
    });
    el.slideshow.addEventListener("mouseleave", () => {
      paused = false;
      resumeProgress();
      startTimer();
    });

    el.slideshow.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") goTo(current - 1);
      if (e.key === "ArrowRight") goTo(current + 1);
    });

    // Swiper no swiping
    let touchStartX = 0;
    el.slideshow.addEventListener(
      "touchstart",
      (e) => (touchStartX = e.touches[0].clientX),
      { passive: true }
    );
    el.slideshow.addEventListener(
      "touchend",
      (e) => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 50) goTo(current + (dx < 0 ? 1 : -1));
      },
      { passive: true }
    );
  })();