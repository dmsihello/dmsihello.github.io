/* DMSI site scripts. Header and footer live here so they only need editing once.
   Apply links and gallery photos are set in js/config.js. */
(function () {
  var page = document.body.getAttribute('data-page') || 'home';
  var hide = "this.style.display='none'";
  var CFG = window.DMSI_CONFIG || {};
  var GAL = window.DMSI_GALLERIES || {};

  var chev = '<svg class="chev" viewBox="0 0 10 10" aria-hidden="true"><path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';

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
          '<button class="dd-btn" aria-expanded="false" aria-haspopup="true">Upcoming 2027 Sessions ' + chev + '</button>' +
          '<ul class="dd-menu">' +
            '<li><a href="locations.html#us"><img src="assets/kalamazoo-logo.png" alt="" onerror="' + hide + '"><div><strong>DMSI US 2027</strong><span>Kalamazoo, Michigan &middot; 12 May 2027</span></div></a></li>' +
            '<li><a href="locations.html#uk"><img src="assets/leeds-logo.png" alt="" onerror="' + hide + '"><div><strong>DMSI UK 2027</strong><span>Leeds, England &middot; 9 July 2027</span></div></a></li>' +
          '</ul>' +
        '</li>' +

        '<li class="has-dd' + ((page === 'past' || page === 'lightning') ? ' current' : '') + '">' +
          '<button class="dd-btn" aria-expanded="false" aria-haspopup="true">Past DMSI Sessions ' + chev + '</button>' +
          '<ul class="dd-menu">' +
            '<li><a href="past-sessions.html"><div><strong>Year by Year</strong><span>Every session, with photos from each year</span></div></a></li>' +
            '<li><a href="lightning-talks.html"><div><strong>Lightning Talks</strong><span>Photos and details from past lightning sessions</span></div></a></li>' +
          '</ul>' +
        '</li>' +

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
          '<p>Gentle, project-oriented, community-minded workshops in digital scholarly methods for medievalists, held alongside major medieval studies conferences in the US and UK.</p>' +
        '</div>' +
        '<div><h4>Explore</h4><ul>' +
          '<li><a href="locations.html#us">DMSI US 2027, Kalamazoo</a></li>' +
          '<li><a href="locations.html#uk">DMSI UK 2027, Leeds</a></li>' +
          '<li><a href="past-sessions.html">Past sessions: year by year</a></li>' +
          '<li><a href="lightning-talks.html">Lightning talks</a></li>' +
          '<li><a href="register.html">Registration and applications</a></li>' +
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
  document.querySelectorAll('.dd-menu a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (location.pathname.split('/').pop() === href.split('#')[0] && href.indexOf('#') === -1) a.setAttribute('aria-current', 'page');
  });

  // mobile menu
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
  }

  // dropdowns (any number)
  var dds = document.querySelectorAll('.has-dd');
  function closeAll(except) {
    dds.forEach(function (d) {
      if (d === except) return;
      d.classList.remove('open');
      d.querySelector('.dd-btn').setAttribute('aria-expanded', 'false');
    });
  }
  dds.forEach(function (dd) {
    var btn = dd.querySelector('.dd-btn');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var v = !dd.classList.contains('open');
      closeAll(dd);
      dd.classList.toggle('open', v);
      btn.setAttribute('aria-expanded', v);
    });
    dd.querySelectorAll('.dd-menu a').forEach(function (a) { a.addEventListener('click', function () { closeAll(); }); });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest || !e.target.closest('.has-dd')) closeAll();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var open = document.querySelector('.has-dd.open .dd-btn');
      closeAll();
      if (open) open.focus();
    }
  });

  // tabs (one or more groups per page; #uk / #us in the URL selects a tab)
  document.querySelectorAll('[data-tabs]').forEach(function (g) {
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

  /* ---------- Apply buttons (links set in js/config.js) ---------- */
  var forms = CFG.applyForms || {};
  function formFor(key) { return forms[key] || forms.general || ''; }
  document.querySelectorAll('[data-apply]').forEach(function (a) {
    var url = formFor(a.dataset.apply);
    if (url) {
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.removeAttribute('aria-disabled');
      a.textContent = a.dataset.label || CFG.applyLabel || 'Apply now';
    } else {
      a.removeAttribute('href');
      a.setAttribute('aria-disabled', 'true');
      a.textContent = CFG.closedLabel || 'Applications opening soon';
    }
  });
  document.querySelectorAll('[data-apply-closed]').forEach(function (el) { el.hidden = !!formFor(el.dataset.applyClosed); });
  document.querySelectorAll('[data-apply-open]').forEach(function (el) { el.hidden = !formFor(el.dataset.applyOpen); });

  /* ---------- Year-by-year page: region filter ---------- */
  var chips = document.querySelectorAll('.filters .chip[data-filter]');
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      chips.forEach(function (x) { x.setAttribute('aria-pressed', x === c); });
      var f = c.dataset.filter;
      document.querySelectorAll('.session').forEach(function (s) { s.hidden = !(f === 'all' || s.dataset.region === f); });
      document.querySelectorAll('.g-item[data-region]').forEach(function (g) { if (!g.dataset.broken) g.hidden = !(f === 'all' || g.dataset.region === f); });
      document.querySelectorAll('.year-group').forEach(function (y) {
        y.hidden = !y.querySelector('.session:not([hidden])');
      });
    });
  });

  /* ---------- Galleries with lightbox ---------- */
  var lb = null, lbItems = [], lbIndex = 0, lbOpener = null;

  function buildLightbox() {
    lb = document.createElement('div');
    lb.className = 'lb';
    lb.hidden = true;
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Photo viewer');
    lb.innerHTML =
      '<button class="lb-close" aria-label="Close photo viewer">&times;</button>' +
      '<button class="lb-nav lb-prev" aria-label="Previous photo">&#8249;</button>' +
      '<figure class="lb-fig"><img alt=""><figcaption></figcaption></figure>' +
      '<button class="lb-nav lb-next" aria-label="Next photo">&#8250;</button>';
    document.body.appendChild(lb);
    lb.querySelector('.lb-close').addEventListener('click', closeLb);
    lb.querySelector('.lb-prev').addEventListener('click', function () { stepLb(-1); });
    lb.querySelector('.lb-next').addEventListener('click', function () { stepLb(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') { e.stopPropagation(); closeLb(); }
      else if (e.key === 'ArrowLeft') stepLb(-1);
      else if (e.key === 'ArrowRight') stepLb(1);
      else if (e.key === 'Tab') {
        var f = lb.querySelectorAll('button:not([disabled])');
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }
  function showLb() {
    var it = lbItems[lbIndex];
    var img = lb.querySelector('img');
    img.src = it.src;
    img.alt = it.alt || it.caption || '';
    lb.querySelector('figcaption').textContent = it.caption || '';
    var many = lbItems.length > 1;
    lb.querySelector('.lb-prev').style.visibility = many ? 'visible' : 'hidden';
    lb.querySelector('.lb-next').style.visibility = many ? 'visible' : 'hidden';
  }
  function openLb(items, i, opener) {
    if (!lb) buildLightbox();
    lbItems = items; lbIndex = i; lbOpener = opener;
    showLb();
    lb.hidden = false;
    document.body.classList.add('lb-open');
    lb.querySelector('.lb-close').focus();
  }
  function stepLb(d) { lbIndex = (lbIndex + d + lbItems.length) % lbItems.length; showLb(); }
  function closeLb() {
    lb.hidden = true;
    document.body.classList.remove('lb-open');
    if (lbOpener) lbOpener.focus();
  }

  document.querySelectorAll('.gallery[data-gallery]').forEach(function (el) {
    var id = el.dataset.gallery;
    var items = (GAL[id] || []).filter(function (x) { return x && x.src; });
    var emptyMsg = el.dataset.empty || 'Photos will be added here.';

    if (!items.length) {
      el.innerHTML = '<div class="gallery-empty">' + emptyMsg + '</div>';
      return;
    }

    // optional year filter (lightning talks)
    var years = [];
    items.forEach(function (it) { if (it.year && years.indexOf(it.year) === -1) years.push(it.year); });
    years.sort(function (a, b) { return b - a; });
    var bar = null;
    if (el.hasAttribute('data-filterable') && years.length > 1) {
      bar = document.createElement('div');
      bar.className = 'filters';
      bar.setAttribute('role', 'group');
      bar.setAttribute('aria-label', 'Filter photos by year');
      bar.innerHTML = '<button class="chip" data-year="all" aria-pressed="true">All years</button>' +
        years.map(function (y) { return '<button class="chip" data-year="' + y + '" aria-pressed="false">' + y + '</button>'; }).join('');
      el.appendChild(bar);
    }

    var grid = document.createElement('div');
    grid.className = 'g-grid';
    el.appendChild(grid);

    function visibleItems() {
      var f = bar ? bar.querySelector('[aria-pressed="true"]').dataset.year : 'all';
      return items.filter(function (it) { return f === 'all' || String(it.year) === f; });
    }
    function render() {
      var vis = visibleItems();
      grid.innerHTML = '';
      vis.forEach(function (it, i) {
        var fig = document.createElement('figure');
        fig.className = 'g-item';
        if (it.region) fig.dataset.region = it.region;
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'g-thumb';
        b.setAttribute('aria-label', 'Open photo' + (it.caption ? ': ' + it.caption : ''));
        var img = document.createElement('img');
        img.src = it.src; img.alt = it.alt || ''; img.loading = 'lazy';
        img.addEventListener('error', function () { fig.hidden = true; fig.dataset.broken = '1'; });
        b.appendChild(img);
        b.addEventListener('click', function () {
          openLb(vis, i, b);
        });
        fig.appendChild(b);
        if (it.caption) { var c = document.createElement('figcaption'); c.textContent = it.caption; fig.appendChild(c); }
        grid.appendChild(fig);
      });
    }
    if (bar) {
      bar.querySelectorAll('.chip').forEach(function (c) {
        c.addEventListener('click', function () {
          bar.querySelectorAll('.chip').forEach(function (x) { x.setAttribute('aria-pressed', x === c); });
          render();
        });
      });
    }
    render();
  });
})();
