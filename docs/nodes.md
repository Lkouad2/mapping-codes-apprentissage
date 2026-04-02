# Nodes

Les `nodes` fixent le vocabulaire commun de la cartographie.
Ils définissent quels codes existent, comment ils sont nommés, dans quels blocs ils interviennent, et lesquels jouent un rôle structurant.

Chaque node représente un **code ou un identifiant**.

La structure est définie dans `js/data/nodes.js` 

---

## Structure d’un node

```js
{
  id: "RNCP",
  label: "Code RNCP",
  type: "code",
  blocs: ["certification"],
  pivot: true
}
```

---

## Attributs

### `id`

Identifiant technique unique du node.

* utilisé dans les relations (`links.js`)
* utilisé dans les filtres et la recherche
* doit être stable et sans ambiguïté

Exemple :

```json
"id": "RNCP"
```

---

### `label`

Nom lisible affiché dans l’interface.

Exemple :

```json
"label": "Code RNCP"
```

---

### `type`

Nature du node.

Deux types sont utilisés :

* `code` : nomenclature ou classification
  Exemples : RNCP, NSF, ROME, Formacode, IDCC, NAF/APE, NPEC

* `identifiant` : identifiant administratif
  Exemples : SIRET, UAI, NDA

Exemple :

```json
"type": "code"
```

---

### `blocs`

Domaines métier dans lesquels le code intervient.

Valeurs possibles :

* `certification`
* `etablissement`
* `employeur`

Un node peut appartenir à plusieurs blocs.

Exemples :

```json
"blocs": ["certification"]
```

```json
"blocs": ["etablissement", "employeur"]
```

---

### `pivot`

Indique un rôle structurant dans le graphe.

Un pivot est un code :

* central dans les relations
* fortement connecté
* structurant pour la lecture

Exemple :

```json
"pivot": true
```

---

## Règles de modélisation

Un node représente uniquement :

* un code
* ou un identifiant

Ne doivent pas être modélisés comme nodes :

* systèmes d’information
* jeux de données
* API
* tables de correspondance

Exemples exclus :

* Certif Info
* Kit apprentissage
* QuiForme
* Liste OF
* table UAI/SIRET

Ces objets utilisent les codes mais ne sont pas des unités d’interopérabilité.

---

## Ajouter un node

1. Ouvrir le fichier :

```bash
js/data/nodes.js
```

2. Ajouter un objet dans le tableau `nodes` :

```js
{
  id: "NOUVEAU_CODE",
  label: "Code Nouveau",
  type: "code",
  blocs: ["certification"],
  pivot: false
}
```

3. Vérifier :

* que `id` est unique
* que le node sera utilisé dans `links.js` si nécessaire
* que le bloc est cohérent

---

## Modifier un node

Modifier directement l’objet dans `nodes.js`.

Exemple :

```js
{
  id: "NPEC",
  label: "Code NPEC modifié",
  type: "code",
  blocs: ["certification", "employeur"]
}
```

Points de vigilance :

* ne pas modifier `id` sans mettre à jour toutes les relations (`links.js`)
* conserver la cohérence des blocs
* vérifier l’impact sur les filtres et la recherche

---

## Supprimer un node

1. Supprimer le node dans `nodes.js`

2. Supprimer ou adapter toutes les relations associées dans :

```bash
js/data/links.js
```

Sinon :

* le graphe peut devenir incohérent
* certaines relations ne seront plus affichées

---

## Bonnes pratiques

* utiliser des identifiants courts et standards (RNCP, SIRET, etc.)
* éviter les doublons
* préférer un node multi-blocs plutôt que plusieurs nodes identiques
* définir `pivot: true` uniquement pour les codes réellement structurants
* vérifier systématiquement les relations associées

---

## Dépendances techniques

Les nodes sont utilisés dans :

* `nodes.js` : définition
* `links.js` : relations entre nodes
* `app.js` : recherche (Fuse.js) 
* `graph.js` : rendu et interactions 

---

## Formulation de référence

Un node représente un code ou un identifiant.
Il est décrit par un identifiant technique, un libellé, un type, un ou plusieurs blocs métier, et un indicateur de pivot.

