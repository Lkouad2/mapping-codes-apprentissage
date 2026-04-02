# Modélisation du graphe

## Principe

Le graphe repose sur un choix structurant :

> Le niveau de modélisation retenu est le code.

Chaque nœud représente un code ou un identifiant effectivement utilisé dans les systèmes d’information et dans les échanges de données.

Ce choix permet de représenter les dépendances réelles entre référentiels, indépendamment des systèmes qui les implémentent.

---

## Nœuds

Un nœud correspond à une unité d’interopérabilité.

Il s’agit :

* soit d’un code (ex : RNCP, ROME, NSF, Formacode)
* soit d’un identifiant (ex : SIRET, UAI, NDA)

La structure d’un nœud est définie dans `js/data/nodes.js`  :

```js
{
  id: "RNCP",
  label: "Code RNCP",
  type: "code",              // "code" ou "identifiant"
  blocs: ["certification"], // un ou plusieurs blocs fonctionnels
  pivot: true               // optionnel : indique un nœud structurant
}
```

### Propriétés

* `id` : identifiant unique du nœud (clé de jointure dans le graphe)
* `label` : libellé affiché
* `type` :

  * `code` → cercle
  * `identifiant` → rectangle arrondi
* `blocs` : rattachement fonctionnel (certification, établissement, employeur)
* `pivot` : permet de signaler un nœud central dans les dépendances

---

## Relations

Une relation représente un lien fonctionnel entre deux codes.

Les relations sont définies dans `js/data/links.js`  :

```js
{
  source: "ROME",
  target: "RNCP",
  relation: "indexe"
}
```

### Types de relations

Les types disponibles sont définis dans `js/data/relation-labels.js` :

* `indexe`
* `qualifie`
* `relie`
* `alimente`
* `correspondance_partielle`

Une relation peut comporter des attributs supplémentaires :

```js
{
  source: "SIRET",
  target: "RNCP",
  relation: "relie",
  context: "certificateur"
}
```

### Représentation graphique

* trait plein : relation standard
* trait pointillé : `correspondance_partielle`

---

## Périmètre de modélisation

Le graphe modélise uniquement :

* les codes
* les identifiants
* leurs relations

Les éléments suivants ne sont pas représentés comme nœuds :

* systèmes d’information
* API
* jeux de données
* tables de correspondance

Ces éléments peuvent utiliser les codes, mais ne constituent pas des unités d’interopérabilité stables.

---

## Organisation fonctionnelle

Les nœuds sont organisés en blocs :

* certification
* établissement
* employeur / branche

Ces blocs sont définis dans la propriété `blocs` des nœuds et utilisés pour :

* la coloration
* le filtrage
* la structuration visuelle

Un nœud peut appartenir à plusieurs blocs.

---

## Logique du modèle

Le modèle vise à :

* représenter les dépendances entre référentiels
* identifier les codes pivots (ex : RNCP, SIRET)
* permettre l’analyse d’impact d’un code
* maintenir une indépendance vis-à-vis des systèmes

Le graphe ne décrit pas une architecture technique, mais une structure d’interopérabilité.

---

## Mise à jour des données

### Ajouter ou modifier un nœud

Fichier :

```
js/data/nodes.js
```

---

### Ajouter ou modifier une relation

Fichier :

```
js/data/links.js
```

---

### Modifier un libellé de relation

Fichier :

```
js/data/relation-labels.js
```

---

### Ajouter ou modifier une fiche documentaire

Fichier :

```
js/data/fiche-map.js
```

Exemple :

```js
RNCP: {
  url: "https://...",
  title: "Fiche RNCP"
}
```

---

## Lecture du graphe

* cercle : code
* rectangle arrondi : identifiant
* lien : relation entre codes
* clic sur un nœud : ouverture de la fiche associée

---
