# Générateur de cartes de série LinkedIn

Gabarit HTML aux couleurs du site (fond sombre, Newsreader, accent `#96A7FF`),
format **1200×1500** (portrait). Une carte = une URL :

```
https://adamotte.github.io/tools/cartes/gabarit.html?serie=À budget <em>égal</em>&ep=Épisode 1/4&sub=Économiser est une erreur stratégique
```

Paramètres (query string) :

| Param | Rôle | Exemple |
|---|---|---|
| `serie` | Titre (balise `<em>` = italique accent) | `Agentic <em>Factory</em>` |
| `ep` | Indicateur | `Épisode 2/4`, `Nº 5`, `HS Nº 2` |
| `sub` | Sous-titre de l'épisode | `Le dividende agentique` |
| `kicker` | Kicker haut droite (défaut : `White paper · Série`) | `White paper · Hors série` |

Conventions : séries → kicker par défaut + `Épisode X/N` ; posts uniques → kicker
`White paper` + numéro du paper sur le site (`Nº 5`) ; hors-série → `White paper · Hors série`
+ `HS Nº N`. Les titres longs sont réduits automatiquement.

**Export** : ouvrir l'URL dans un navigateur avec une fenêtre de 1200×1500 et capturer
le viewport (ou via Playwright : `page.setViewportSize({width:1200, height:1500})` puis
`page.screenshot()`). Les PNG produits ne sont pas versionnés ici.

Page en `noindex`, absente du sitemap.
