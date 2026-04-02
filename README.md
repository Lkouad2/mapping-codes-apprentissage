# Mapping des codes, usages et dépendances — Apprentissage

Ce dépôt contient une version découpée et maintenable de la visualisation D3 du mapping des codes, usages et dépendances du champ apprentissage.

## Structure

- `index.html` : structure de la page
- `css/` : styles séparés par responsabilité
- `js/data/` : données du modèle (`nodes`, `links`, `relationLabels`, `ficheMap`)
- `js/graph/` : logique graphique, interactions et panneau fiche
- `docs/` : documentation pédagogique et règles de modélisation

## Mise à jour des données

### Ajouter ou modifier un code
Modifier `js/data/nodes.js`

### Ajouter ou modifier une relation
Modifier `js/data/links.js`

### Renommer un libellé de relation
Modifier `js/data/relation-labels.js`

### Ajouter ou modifier une fiche
Modifier `js/data/fiche-map.js`

## Lancer localement

Ouvrir `index.html` dans un navigateur moderne.

Pour un meilleur confort dans VS Code, utiliser l’extension **Live Server**.

## Publication GitHub Pages

Le dépôt est compatible avec GitHub Pages :
- fichier `index.html` à la racine
- projet 100 % statique
- publication possible depuis la branche `main`
