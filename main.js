/* DMSI site scripts. Header and footer live here so they only need editing once. */
(function () {
  var page = document.body.getAttribute('data-page') || 'home';
  var hide = "this.style.display='none'";

  var header =
    '<a class="skip" href="#main">Skip to content</a>' +
    '<header class="site-header"><div class="wrap">' +
      '<a class="brand" href="index.html" aria-label="DMSI home">' +
        '<img src="assets/dmsi-logo.png" alt="" onerror="' + hide + '">' +
        '<span class="brand-text">DMSI<small>Digital Medieval Studies Institute</small></span>' +
      '</a>' +
      '<button class="menu-toggle" aria-expanded="false" aria-controls="nav">Menu</button>' +
      '<nav class="nav" id="nav" aria-label="Main"><ul>' +
        '<li><a href="index.html" data-p="home">Home</a></li>' +
        '<li class="has-dd' + (page === 'locations' ? ' current' : '') + '">' +
          '<button class="dd-btn" aria-expanded="false" aria-haspopup="true">DMSI Locations ' +
          '<svg class="chev" viewBox="0 0 10 10" aria-hidden="true"><path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></button>' +
          '<ul class="dd-menu">' +
            '<li><a href="locations.html#us"><img src="assets/kalamazoo-logo.png" alt="" onerror="' + hide + '"><div><strong>DMSI US</strong><span>Kalamazoo, Michigan</span></div></a></li>' +
            '<li><a href="locations.html#uk"><img src="assets/leeds-logo.png" alt="" onerror="' + hide + '"><div><strong>DMSI UK</strong><span>Leeds, England</span></div></a></li>' +
          '</ul>' +
        '</li>' +
        '<li><a href="past-sessions.html" data-p="past">Past DMSI Sessions</a></li>' +
        '<li><a href="testimonials.html" data-p="testimonials">Testimonials</a></li>' +
        '<li><a href="register.html" data-p="register">Information &amp; Registration</a></li>' +
      '</ul></nav>' +
    '</div></header>';

  var footer =
    '<footer class="site-footer"><div class="wrap">' +
      '<div class="foot-grid">' +
        '<div>' +
          '<div class="foot-logos">' +
            '<img src="assets/dmsi-logo.png" alt="DMSI" onerror="' + hide + '">' +
            '<img src="assets/leeds-logo.png" alt="DMSI UK, Leeds" onerror="' + hide + '">' +
            '<img src="assets/kalamazoo-logo.png" alt="DMSI US, Kalamazoo" onerror="' + hide + '">' +
          '</div>' +
          '<p>One-day workshops in digital scholarly methods for medievalists, held alongside major medieval studies conferences in the US and UK.</p>' +
        '</div>' +
        '<div><h4>Explore</h4><ul>' +
          '<li><a href="locations.html#us">DMSI US, Kalamazoo</a></li>' +
          '<li><a href="locations.html#uk">DMSI UK, Leeds</a></li>' +
          '<li><a href="past-sessions.html">Past sessions</a></li>' +
          '<li><a href="register.html">Registration and bursaries</a></li>' +
        '</ul></div>' +
        '<div><h4>Contact</h4><ul>' +
          '<li><a href="mailto:dmsi.hello@gmail.com">dmsi.hello@gmail.com</a></li>' +
          '<li>Organised by Laura K. Morreale and N. Kıvılcım Yavuz</li>' +
          '<li>In partnership with Digital Medievalist</li>' +
        '</ul></div>' +
      '</div>' +
      '<p class="fine">&copy; <span id="yr"></span> Digital Medieval Studies Institute.</p>' +
    '</div></footer>';

  var h = document.getElementById('site-header');
  var f = document.getElementById('site-footer');
  if (h) h.innerHTML = header;
  if (f) f.innerHTML = footer;
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // current page marker
  var cur = document.querySelector('.nav a[data-p="' + page + '"]');
  if (cur) cur.setAttribute('aria-current', 'page');

  // mobile menu
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
  }

  // dropdown
  var dd = document.querySelector('.has-dd');
  if (dd) {
    var btn = dd.querySelector('.dd-btn');
    var setOpen = function (v) { dd.classList.toggle('open', v); btn.setAttribute('aria-expanded', v); };
    btn.addEventListener('click', function (e) { e.stopPropagation(); setOpen(!dd.classList.contains('open')); });
    document.addEventListener('click', function (e) { if (!dd.contains(e.target)) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { setOpen(false); btn.focus(); } });
    dd.querySelectorAll('.dd-menu a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
  }

  // tabs (one or more groups per page; #uk / #us in the URL selects a tab)
  var groups = document.querySelectorAll('[data-tabs]');
  groups.forEach(function (g) {
    var tabs = g.querySelectorAll('[role="tab"]');
    var panels = g.querySelectorAll('[role="tabpanel"]');
    function show(id, focus) {
      var found = false;
      tabs.forEach(function (t) { if (t.dataset.tab === id) found = true; });
      if (!found) return;
      tabs.forEach(function (t) {
        var on = t.dataset.tab === id;
        t.setAttribute('aria-selected', on);
        t.tabIndex = on ? 0 : -1;
        if (on && focus) t.focus();
      });
      panels.forEach(function (p) { p.hidden = p.dataset.edition !== id; });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () {
        show(t.dataset.tab);
        history.replaceState(null, '', '#' + t.dataset.tab);
      });
      t.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
        if (e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (n) { e.preventDefault(); show(n.dataset.tab, true); }
      });
    });
    function fromHash() { show(location.hash.replace('#', '') || tabs[0].dataset.tab); }
    fromHash();
    window.addEventListener('hashchange', fromHash);
  });

  // past sessions filter
  var chips = document.querySelectorAll('.chip');
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      chips.forEach(function (x) { x.setAttribute('aria-pressed', x === c); });
      var f = c.dataset.filter;
      document.querySelectorAll('.session').forEach(function (s) {
        s.hidden = !(f === 'all' || s.dataset.region === f);
      });
    });
  });
})();
