# Relations (links)

Cette section décrit la manière dont les relations entre codes sont représentées dans la cartographie.

Les relations sont définies dans :

```bash
js/data/links.js
```

Elles relient les nodes entre eux et matérialisent les dépendances fonctionnelles.

---

## Principe

Les relations sont représentées sous forme d’objets simples entre codes.

Chaque relation :

* relie deux nodes existants
* porte un type de relation explicite
* peut être enrichie par des attributs complémentaires

---

## Structure d’une relation

```js
{
  source: "NSF",
  target: "RNCP",
  relation: "indexe"
}
```

---

## Champs

### `source`

Code d’origine.

Doit correspondre à un `id` existant dans `nodes.js`.

---

### `target`

Code cible.

Doit correspondre à un `id` existant dans `nodes.js`.

---

### `relation`

Type de lien entre les deux codes.

Les libellés sont définis dans :

```bash
js/data/relation-labels.js
```



Relations actuellement utilisées dans le code :

* `indexe`
* `qualifie`
* `relie`
* `alimente`
* `correspondance_partielle`

---

### `style` (optionnel)

Permet d’adapter le rendu graphique.

Exemple :

```js
style: "dashed"
```

Utilisé pour :

* `correspondance_partielle`

---

### `context` (optionnel)

Permet de préciser le contexte métier de la relation.

Exemple :

```js
{
  source: "SIRET",
  target: "RNCP",
  relation: "relie",
  context: "certificateur"
}
```

---

## Exemple réel

```js
{
  source: "ROME",
  target: "RNCP",
  relation: "indexe"
}
```

Lecture :

ROME → RNCP (indexe)

---

## Exemple issu du code

```js
{
  source: "CFD",
  target: "RNCP",
  relation: "correspondance_partielle",
  style: "dashed"
}
```



---

## Ajouter une relation

1. Ouvrir le fichier :

```bash
js/data/links.js
```

2. Ajouter un objet dans le tableau :

```js
{
  source: "CODE_SOURCE",
  target: "CODE_CIBLE",
  relation: "TYPE_RELATION"
}
```

3. Vérifier :

* que les deux codes existent dans `nodes.js`
* que le type de relation existe dans `relation-labels.js`
* que le sens de la relation est correct

---

## Modifier une relation

Modifier directement l’objet dans `links.js`.

Exemple :

```js
{
  source: "SIRET",
  target: "NDA",
  relation: "relie"
}
```

Points de vigilance :

* ne pas inverser le sens sans validation métier
* conserver un type de relation cohérent
* vérifier l’impact sur la lecture du graphe

---

## Supprimer une relation

Supprimer l’objet dans :

```bash
js/data/links.js
```

Aucun autre impact technique direct, mais vérifier :

* la cohérence globale du graphe
* les dépendances visibles

---

## Règles de modélisation

### 1. Une relation = un objet

Chaque lien est défini indépendamment :

```js
{ source: "...", target: "...", relation: "..." }
```

---

### 2. Relations entre codes uniquement

Les relations doivent relier uniquement des nodes existants.

Valide :

```js
{ source: "SIRET", target: "NDA", relation: "relie" }
```

Invalide :

```js
{ source: "SIRET", target: "QuiForme", relation: "alimente" }
```

---

### 3. Sens de la relation

Le sens est structurant :

```text
source → target
```

Exemple :

```js
{ source: "IDCC", target: "CRIS", relation: "alimente" }
```

---

### 4. Pas d’interprétation

Une relation est ajoutée uniquement si elle est :

* observée dans les travaux de l’atelier
* compréhensible métier
* explicitement documentée

---

### 5. Cohérence avec les nodes

Chaque relation dépend des nodes :

* un node supprimé implique de supprimer les relations associées
* un changement d’`id` nécessite une mise à jour des relations

---

## Bonnes pratiques

* éviter les doublons (même source, target, relation)
* utiliser un vocabulaire de relation homogène
* limiter les relations implicites ou ambiguës
* utiliser `context` pour préciser les cas particuliers
* utiliser `correspondance_partielle` uniquement si nécessaire

---

## Lecture du graphe

Une relation se lit :

```text
code source → code cible → type de relation
```

Exemple :

```text
ROME → RNCP → indexe
```

---

## Dépendances techniques

Les relations sont utilisées dans :

* `links.js` : définition des relations 
* `relation-labels.js` : libellés 
* `graph.js` : rendu graphique et interactions 

---

## Objectif

Les relations permettent de :

* représenter les dépendances entre référentiels
* comprendre les usages réels des codes
* analyser les impacts
* structurer la lecture de l’écosystème

---

## Formulation de référence

Une relation relie deux codes.
Elle est définie par un code source, un code cible et un type de relation, éventuellement enrichi d’attributs complémentaires.

