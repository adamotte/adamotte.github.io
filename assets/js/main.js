/* ============================================================
   adamotte.github.io — interactions
   Thème, navigation, révélation au scroll, compteur GitHub,
   rendu des écrits (writing/index.json) et des posts LinkedIn
   (data/posts.json).
   ============================================================ */
(function () {
  'use strict';

  var root = document.documentElement;
  var LANG = root.lang === 'en' ? 'en' : 'fr';
  var BASE = document.body.getAttribute('data-base') || '';

  var LABELS = {
    fr: {
      upcoming: 'À paraître',
      draft: 'En rédaction',
      published: 'Publié',
      read: 'Lire le white paper →',
      featured: 'À la une — White paper',
      featuredSoon: 'Bientôt — White paper',
      readPost: 'Lire sur LinkedIn →',
      minutes: 'min',
      emptyPosts: 'Ma sélection de posts arrive ici. En attendant, le fil complet est sur LinkedIn.',
      emptyPostsCta: 'Suivre sur LinkedIn →'
    },
    en: {
      upcoming: 'Upcoming',
      draft: 'In progress',
      published: 'Published',
      read: 'Read the white paper →',
      featured: 'Featured — White paper',
      featuredSoon: 'Coming soon — White paper',
      readPost: 'Read on LinkedIn →',
      minutes: 'min read',
      emptyPosts: 'My selection of posts will appear here. Meanwhile, the full feed is on LinkedIn.',
      emptyPostsCta: 'Follow on LinkedIn →'
    }
  };
  var L = LABELS[LANG];
  var LINKEDIN = 'https://www.linkedin.com/in/anthonydamotte/';

  /* ---------- Thème (clair par défaut, choix mémorisé) ---------- */
  var themeBtn = document.getElementById('themeBtn');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) { /* navigation privée */ }
  if (saved === 'dark' || saved === 'light') root.setAttribute('data-theme', saved);

  function currentTheme() {
    return root.getAttribute('data-theme') || (prefersDark.matches ? 'dark' : 'light');
  }
  function paintThemeBtn() {
    if (themeBtn) themeBtn.textContent = currentTheme() === 'dark' ? '☀' : '☾';
  }
  paintThemeBtn();
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
      paintThemeBtn();
    });
  }

  /* ---------- Menu mobile ---------- */
  var burger = document.getElementById('navBurger');
  var navLinks = document.getElementById('navLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        navLinks.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        navLinks.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Révélation au scroll ---------- */
  var toReveal = document.querySelectorAll('section .wrap, .hero-grid > *, .archive-head .wrap');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    toReveal.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
  }

  /* ---------- Année du footer ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Compteur GitHub (fallback : valeur statique du HTML) ---------- */
  var repoEl = document.getElementById('githubRepos');
  if (repoEl && window.fetch) {
    fetch('https://api.github.com/users/adamotte')
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) { if (d && d.public_repos) repoEl.textContent = String(d.public_repos); })
      .catch(function () { /* on garde la valeur statique */ });
  }

  /* ---------- Utilitaires de rendu ---------- */
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }
  function monthYear(iso) {
    var d = new Date(iso + 'T00:00:00');
    if (isNaN(d)) return iso;
    var s = d.toLocaleDateString(LANG === 'en' ? 'en-US' : 'fr-FR', { month: 'short', year: 'numeric' });
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  /* ---------- Écrits : liste des white papers ---------- */
  var writingList = document.querySelector('[data-writing-list]');
  var featureCard = document.querySelector('[data-feature]');
  if ((writingList || featureCard) && window.fetch) {
    fetch(BASE + 'writing/index.json', { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (!data || !data.papers || !data.papers.length) return;
        // hidden: true retire l'entrée de tout le rendu (listes, numérotation, une) ;
        // le JSON est trié du plus récent au plus ancien
        var papers = data.papers.filter(function (p) { return !p.hidden; });
        // Les entrées datées sont reclassées par date décroissante entre elles, au sein
        // de leur catégorie (principale / hors série) pour ne pas perturber la
        // numérotation de l'autre série ; les entrées sans date gardent leur position.
        var datedByCat = {};
        papers.forEach(function (p, i) {
          if (!p.date) return;
          var cat = p.serie === 'hs' ? 'hs' : 'main';
          (datedByCat[cat] = datedByCat[cat] || []).push(i);
        });
        Object.keys(datedByCat).forEach(function (cat) {
          var idx = datedByCat[cat];
          var sorted = idx.map(function (i) { return papers[i]; }).sort(function (a, b) {
            return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
          });
          idx.forEach(function (i, k) { papers[i] = sorted[k]; });
        });

        // Numérotation par catégorie : le plus ancien de chaque série porte le Nº 1.
        // serie: 'hs' = hors série ('HS Nº N') ; absent = série principale ('Nº N').
        var counts = { main: 0, hs: 0 };
        for (var i = papers.length - 1; i >= 0; i--) {
          var serie = papers[i].serie === 'hs' ? 'hs' : 'main';
          counts[serie] += 1;
          papers[i]._num = (serie === 'hs' ? 'HS Nº ' : 'Nº ') + counts[serie];
        }

        document.querySelectorAll('[data-writing-list]').forEach(function (list) {
          var filter = list.getAttribute('data-serie'); // 'main' | 'hs' | null (tout)
          var items = filter
            ? papers.filter(function (p) { return (p.serie === 'hs' ? 'hs' : 'main') === filter; })
            : papers;
          var limit = parseInt(list.getAttribute('data-limit') || '0', 10) || items.length;
          items.slice(0, limit).forEach(function (p) {
            var t = p[LANG] || p.fr;
            var published = p.status === 'published';
            // Statut custom : libellé déclaré dans data.statuses, sinon 'En rédaction'
            var statusDef = !published && data.statuses && data.statuses[p.status];
            var chipLabel = published ? L.published : (statusDef ? (statusDef[LANG] || statusDef.fr) : L.draft);
            // links : objet {fr, en} ou chaîne unique ; affiché dès que renseigné, quel que soit le statut
            var href = p.links ? (typeof p.links === 'string' ? p.links : p.links[LANG] || p.links.fr) : null;
            var row = el(href ? 'a' : 'div', 'paper');
            if (href) {
              var external = /^https?:\/\//.test(href);
              row.href = external ? href : BASE + href;
              if (external) row.rel = 'noopener';
            }

            row.appendChild(el('span', 'num', p._num));
            var body = el('div');
            body.appendChild(el('h3', null, t.title));
            body.appendChild(el('p', null, t.summary));
            var meta = el('div', 'paper-meta');
            meta.appendChild(el('span', published ? 'chip' : 'chip soon', chipLabel));
            meta.appendChild(el('span', null, p.date ? monthYear(p.date) : L.upcoming));
            if (p.date && p.minutes) meta.appendChild(el('span', null, p.minutes + ' ' + L.minutes));
            if (p.tags && p.tags.length) {
              var tagsWrap = el('span', 'tags');
              p.tags.forEach(function (tag) {
                tagsWrap.appendChild(el('span', 'tag mono', '#' + tag));
              });
              meta.appendChild(tagsWrap);
            }
            body.appendChild(meta);
            row.appendChild(body);
            list.appendChild(row);
          });
        });

        if (featureCard) {
          // featured: true désigne le paper à la une ; à défaut, le plus récent (premier du JSON)
          var p = papers.find(function (x) { return x.featured; }) || papers[0];
          var t = p[LANG] || p.fr;
          var published = p.status === 'published';
          featureCard.querySelector('.mono').textContent = published ? L.featured : L.featuredSoon;
          featureCard.querySelector('h3').textContent = t.title;
          featureCard.querySelector('p').textContent = t.summary;
          var metaEl = featureCard.querySelector('.feature-meta span');
          if (metaEl) {
            metaEl.textContent = p.date
              ? monthYear(p.date) + (p.minutes ? ' · ' + p.minutes + ' ' + L.minutes : '')
              : L.upcoming;
          }
          var readEl = featureCard.querySelector('.read');
          var featHref = p.links ? (typeof p.links === 'string' ? p.links : p.links[LANG] || p.links.fr) : null;
          var featExternal = featHref && /^https?:\/\//.test(featHref);
          var featUrl = featHref ? (featExternal ? featHref : BASE + featHref) : null;
          if (readEl) {
            if (featUrl) {
              readEl.textContent = L.read;
              readEl.href = featUrl;
              if (featExternal) readEl.rel = 'noopener';
            } else {
              readEl.remove();
            }
          }
          if (featUrl) {
            // Toute la carte est cliquable, pas seulement le lien « Lire »
            featureCard.style.cursor = 'pointer';
            featureCard.addEventListener('click', function (e) {
              if (e.target.closest('a')) return; // laisser les vrais liens se comporter normalement
              window.location.href = featUrl;
            });
          }
        }
      })
      .catch(function (err) {
        /* section laissée telle quelle, mais l'erreur (JSON invalide, réseau…) reste visible */
        if (window.console) console.error('writing/index.json — chargement ou parsing en échec :', err);
      });
  }

  /* ---------- Posts LinkedIn (sélection curée) ---------- */
  var postsHost = document.querySelector('[data-posts]');
  if (postsHost && window.fetch) {
    fetch(BASE + 'data/posts.json', { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (posts) {
        if (!Array.isArray(posts) || !posts.length) {
          var empty = el('a', 'post');
          empty.href = LINKEDIN;
          empty.rel = 'noopener';
          empty.appendChild(el('p', null, L.emptyPosts));
          empty.appendChild(el('span', 'more', L.emptyPostsCta));
          postsHost.appendChild(empty);
          return;
        }
        var limit = parseInt(postsHost.getAttribute('data-limit') || '0', 10) || posts.length;
        posts.slice(0, limit).forEach(function (post) {
          var card = el('a', 'post');
          card.href = post.url;
          card.rel = 'noopener';
          card.appendChild(el('span', 'date mono', monthYear(post.date)));
          card.appendChild(el('p', null, '« ' + post.text + ' »'));
          card.appendChild(el('span', 'more', L.readPost));
          postsHost.appendChild(card);
        });
      })
      .catch(function () { /* section laissée telle quelle */ });
  }

  /* ---------- Mesure d'audience (GoatCounter, sans cookies) ----------
     Chargé uniquement en production : les previews locales ne comptent pas. */
  if (location.hostname === 'adamotte.github.io') {
    var gc = document.createElement('script');
    gc.async = true;
    gc.src = 'https://gc.zgo.at/count.js';
    gc.setAttribute('data-goatcounter', 'https://adamotte.goatcounter.com/count');
    document.head.appendChild(gc);
  }
})();
