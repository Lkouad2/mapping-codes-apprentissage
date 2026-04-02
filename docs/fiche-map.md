# Fiches (`fiche-map`)

Les fiches permettent d’associer une documentation à chaque node.
Elles sont affichées lorsqu’un utilisateur clique sur un code dans le graphe.

---

## Principe

Chaque node peut être associé à une fiche documentaire externe.

Le mapping est défini dans :

```bash id="sxx828"
js/data/fiche-map.js
```



---

## Où rédiger les fiches

La documentation ne se fait pas dans le code, mais dans des outils collaboratifs.

Elle est rédigée et maintenue dans :

* HedgeDoc via
  [https://pad.numerique.gouv.fr/](https://pad.numerique.gouv.fr/)
  (fork de [https://github.com/hedgedoc/hedgedoc](https://github.com/hedgedoc/hedgedoc))

* ou Docs via
  [https://lasuite.numerique.gouv.fr/produits/docs](https://lasuite.numerique.gouv.fr/produits/docs)
  ([https://github.com/suitenumerique/docs](https://github.com/suitenumerique/docs))

Ces outils permettent :

* l’édition collaborative en temps réel
* la contribution de plusieurs acteurs (État, opérateurs, partenaires)
* une mise à jour continue de la connaissance

---

## Rôle du `fiche-map`

Le fichier `fiche-map.js` ne contient pas la documentation.

Il sert uniquement à :

* faire le lien entre un node et une fiche
* référencer l’URL de la documentation
* afficher la fiche dans l’interface

---

## Structure

Chaque entrée est indexée par l’`id` du node :

```js id="f7aod8"
{
  RNCP: {
    url: "https://...",
    title: "Fiche RNCP"
  }
}
```

---

## Champs

### `url`

Lien vers la documentation collaborative.

Peut pointer vers :

* une page HedgeDoc
* une page Docs (Suite Numérique)
* une autre ressource validée

Exemple :

```json id="tejitw"
"url": "https://pad.numerique.gouv.fr/..."
```

---

### `title`

Titre affiché dans la fiche.

Exemple :

```json id="wtwldw"
"title": "Fiche RNCP"
```

---

## Exemple réel

```js id="68o9ku"
RNCP: {
  url: "https://docs.numerique.gouv.fr/docs/74fd8dc7-8332-4604-a9e1-d60fa67471e2/",
  title: "Fiche RNCP"
}
```



---

## Ajouter une fiche

1. Créer ou identifier une fiche dans :

* [https://pad.numerique.gouv.fr/](https://pad.numerique.gouv.fr/)
* ou [https://lasuite.numerique.gouv.fr/produits/docs](https://lasuite.numerique.gouv.fr/produits/docs)

2. Copier l’URL de la fiche

3. Ajouter l’entrée dans :

```bash id="01um5b"
js/data/fiche-map.js
```

```js id="rjxcw1"
NOUVEAU_CODE: {
  url: "https://mon-doc-collaboratif",
  title: "Fiche Nouveau Code"
}
```

4. Vérifier :

* que l’`id` correspond à un node existant
* que la fiche est accessible
* que le titre est explicite

---

## Modifier une fiche

Modifier directement l’URL ou le titre :

```js id="s4rt9p"
RNCP: {
  url: "https://nouvelle-url",
  title: "Fiche RNCP mise à jour"
}
```

---

## Supprimer une fiche

Supprimer l’entrée dans `fiche-map.js`.

Effet :

* la fiche ne sera plus affichée
* un message indiquera qu’aucune fiche n’est disponible

---

## Règles de modélisation

* une fiche correspond à un node existant
* la clé doit être strictement l’`id` du node
* une seule fiche par node
* la documentation est externalisée (non stockée dans le projet)

---

## Bonnes pratiques

* privilégier les outils collaboratifs (HedgeDoc ou Docs)
* utiliser des URLs stables et partageables
* nommer les fiches de manière homogène
* documenter en priorité les nodes pivots
* maintenir la cohérence entre graphe et documentation

---

## Dépendances techniques

* mapping : `fiche-map.js` 
* affichage : `fiche.js` 
* interaction : `graph.js` 

---

## Objectif

Ce dispositif permet :

* d’ouvrir la documentation à la contribution
* de dissocier code et contenu
* de construire une base de connaissance partagée
* d’inscrire la cartographie dans une logique de commun numérique

---

## Formulation de référence

Une fiche associe un node à une documentation collaborative externe.
Le projet référence les fiches sans les héberger, afin de permettre une contribution ouverte et continue.

---
