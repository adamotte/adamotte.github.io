# adamotte.github.io

Site personnel d'Anthony Damotte — Agentic Solutions Architect.

Site statique bilingue (HTML/CSS/JS, sans build) hébergé sur GitHub Pages.
Design éditorial : Newsreader / Instrument Sans / Fragment Mono, thème clair
par défaut avec bascule sombre.

## Structure

- `index.html` — accueil (FR) · `en/index.html` — accueil (EN)
- `ecrits/index.html` — archive des écrits (FR) · `en/writing/index.html` — (EN)
- `writing/index.json` — **source unique des white papers** (alimente la home et l'archive)
- `writing/template.html` — template pour publier un nouveau white paper
- `data/posts.json` — sélection curée de posts LinkedIn (voir `data/posts.sample.json`)
- `assets/` — styles et scripts · `images/` — photos, image Open Graph
- `404.html`, `robots.txt`, `sitemap.xml`, `llms.txt` — SEO et lisibilité machine

## Publier un white paper

1. Copier `writing/template.html` vers `ecrits/<slug>/index.html` (et `en/writing/<slug>/index.html` pour l'anglais), remplacer les `{{PLACEHOLDERS}}`.
2. Dans `writing/index.json` : passer `status` à `"published"`, renseigner `date` et `links`.
3. Ajouter l'URL dans `sitemap.xml` et `llms.txt`.

Convention des versions : `index.html` = version prose éditoriale (indexée) ;
`technique.html` = version structurée (encadrés, chiffres, tableaux), en `noindex`.

## Ajouter un post LinkedIn

Ajouter une entrée en tête de `data/posts.json` (format dans `data/posts.sample.json`).
La home affiche les 3 plus récents, l'archive les affiche tous.

## Déploiement

Pousser sur la branche par défaut : GitHub Pages sert automatiquement le contenu.

## Licence

Contenu et code sous [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/), sauf mention contraire.
