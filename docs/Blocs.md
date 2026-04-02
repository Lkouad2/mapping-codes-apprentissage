# Blocs

Les blocs structurent la lecture de la cartographie.

Ils permettent de regrouper les nodes par grands domaines métier, sans créer de silos.

---

## Principe

Chaque node est rattaché à un ou plusieurs blocs via la propriété `blocs` définie dans :

```bash
js/data/nodes.js
```



Exemple :

```js
{
  id: "SIRET",
  label: "Code SIRET",
  type: "identifiant",
  blocs: ["etablissement", "employeur"],
  pivot: true
}
```

---

## Liste des blocs

Trois blocs sont utilisés dans la cartographie :

### `certification`

Regroupe les codes décrivant les formations et certifications.

Exemples :

* RNCP
* ROME
* NSF
* Formacode
* CEC
* NPEC

---

### `etablissement`

Regroupe les identifiants des structures de formation.

Exemples :

* SIRET
* UAI
* NDA

---

### `employeur`

Regroupe les codes liés aux entreprises, branches et classifications économiques.

Exemples :

* SIRET
* IDCC
* NAF / APE
* CRIS

---

## Règles d’usage

### 1. Un node peut appartenir à plusieurs blocs

Exemple :

```js
{
  id: "SIRET",
  blocs: ["etablissement", "employeur"]
}
```

Cela permet de refléter les usages transverses d’un même code.

---

### 2. Ne pas dupliquer les nodes

Un même code ne doit apparaître qu’une seule fois dans `nodes.js`.

La multi-appartenance se gère uniquement via `blocs`.

---

### 3. Les blocs ne sont pas des silos

Les blocs :

* structurent la visualisation (zones, couleurs)
* facilitent les filtres
* n’empêchent pas les relations entre blocs

Exemple :

```text
ROME → RNCP → SIRET
```

---

### 4. Les blocs sont contrôlés

Les valeurs possibles sont limitées à :

```js
["certification", "etablissement", "employeur"]
```

Toute nouvelle valeur doit être justifiée et cohérente avec le modèle global.

---

## Rôle dans l’application

Les blocs sont utilisés pour :

* la coloration des nodes
* la structuration visuelle du graphe
* les filtres utilisateurs

Implémentation :

* filtres : `app.js` 
* affichage : `graph.js` 

---

## Ajouter ou modifier un bloc

### Modifier le bloc d’un node

Dans :

```bash
js/data/nodes.js
```

Modifier la propriété `blocs` :

```js
{
  id: "NPEC",
  blocs: ["certification", "employeur"]
}
```

---

### Ajouter un nouveau bloc (cas exceptionnel)

1. Ajouter la valeur dans les nodes concernés
2. Ajouter la couleur dans :

```bash
css/styles.css
```



3. Adapter :

* les filtres (`app.js`)
* les zones visuelles (`graph.js`)

Ce cas doit rester exceptionnel pour préserver la lisibilité.

---

## Bonnes pratiques

* utiliser le nombre minimal de blocs nécessaires
* privilégier la multi-appartenance plutôt que la duplication
* vérifier la cohérence métier
* éviter les blocs trop spécifiques ou techniques

---

## Lecture

Les blocs permettent une lecture structurée :

* à gauche : certification
* au centre : établissement
* à droite : employeur

Ils facilitent la compréhension globale sans contraindre les relations.

---

## Formulation de référence

Les blocs sont des catégories métier permettant de structurer la lecture du graphe.
Chaque node est rattaché à un ou plusieurs blocs, sans duplication, afin de refléter les usages transverses des codes.
