Ce fichier est le `README.md` du repository `Lkouad2/mapping-codes-apprentissage`. Il fournit un aperçu du projet, son objectif, sa structure et comment l'utiliser.

### Points clés :

#### 1. **Le projet Mapping des codes, usages et dépendances  Apprentissage**
Le projet s'intitule **"Mapping des codes, usages et dépendances Apprentissage"**, c'est-à-dire la cartographie des codes, usages et dépendances dans le domaine de l'apprentissage.

---

#### 2. **Objectif**
L'objectif du projet est de proposer une représentation visuelle des relations entre les différents codes utilisés dans le champ de l'apprentissage, tels que :
- **Les certifications**
- **Les établissements**
- **Les employeurs / branches**

Cette visualisation aide à comprendre comment les données s'articulent entre elles.

---

#### 3. **Accès à l'application**
L'interface de l'application est disponible en ligne à l'adresse suivante :
👉 [https://lkouad2.github.io/mapping-codes-apprentissage/](https://lkouad2.github.io/mapping-codes-apprentissage/)

---

#### 4. **Structure du projet**
Le repository est organisé de la manière suivante :
- **`index.html`**: L'interface principale de l'application.
- **`css/`**: Contient les styles de l'application.
- **`js/`**: Contient tous les fichiers JavaScript. Les sous-dossiers incluent :
  - `data/`: Les données (nodes, links, etc.).
  - `graph/`: La logique du graphe et ses relations.
  - `app.js`: Point d'entrée de l'application JavaScript.
- **`docs/`**: Contient la documentation supplémentaire pour comprendre et modifier le projet.

---

#### 5. **Principe de modélisation**
Le projet utilise trois objets principaux pour la modélisation de la visualisation :
- **Nodes** : Représentent les codes.
- **Links** : Représentent les relations entre les codes.
- **Fiches** : Représentent la documentation métier associée.

---

#### 6. **Documentation**
Le répertoire `docs/` fournit des fichiers supplémentaires pour comprendre et modifier le projet :
- `docs/01-comprendre-le-modele.md`: Comprendre le modèle.
- `docs/02-les-nodes.md`: Détails sur les nodes.
- `docs/03-les-relations.md`: Détails sur les relations.
- `docs/04-les-fiches.md`: Détails sur les fiches.
- `docs/05-modifier-le-graphe.md`: Guide pour modifier le graphe.

---

#### 7. **Philosophie du projet**
Ce graphe ne reconstitue pas une vérité technique. Il représente plutôt **ce qui a été exprimé en atelier**.

Cela souligne que le projet se concentre sur la représentation de la compréhension conceptuelle, et non sur une cartographie technique stricte.

---
# Mapping des codes, usages et dépendances

Ce projet permet de visualiser les relations entre les codes utilisés dans le champ apprentissage.

## Objectif

- comprendre comment les codes sont liés
- analyser l’impact d’un code
- documenter les usages
- contribuer au modèle

### Accéder à la cartographie
[![Cartographie interactive](https://img.shields.io/badge/Ouvrir-la%20cartographie-blue?style=for-the-badge)](https://lkouad2.github.io/mapping-codes-apprentissage/)

---

## Prise en main rapide

### Explorer un code

- saisir un code
- cliquer sur "Afficher impact"

![Fiche](https://github.com/Lkouad2/mapping-codes-apprentissage/blob/main/docs/Impact%20d'un%20code.gif)

---

### Filtrer le graphe

- activer/désactiver les blocs
- filtrer les relations

![Filtrer](https://github.com/Lkouad2/mapping-codes-apprentissage/blob/main/docs/filtrer.gif)

---

### Consulter une fiche

- cliquer sur un code

![Fiche](https://github.com/Lkouad2/mapping-codes-apprentissage/blob/main/docs/fiche.gif)

## Comprendre le modèle
 [![Modélisation](https://img.shields.io/badge/📘-Modélisation-blue?style=for-the-badge)](https://github.com/Lkouad2/mapping-codes-apprentissage/blob/main/docs/modelisation.md)

[![Nodes](https://img.shields.io/badge/📘-Nodes-red?style=for-the-badge)](https://github.com/Lkouad2/mapping-codes-apprentissage/blob/main/docs/nodes.md)

[![Relations](https://img.shields.io/badge/📘-Relations-purple?style=for-the-badge)](https://github.com/Lkouad2/mapping-codes-apprentissage/blob/main/docs/relations.md)

[![Blocs](https://img.shields.io/badge/📘-Blocs-green?style=for-the-badge)](https://github.com/Lkouad2/mapping-codes-apprentissage/blob/main/docs/blocs.md)

[![Fiches](https://img.shields.io/badge/📘-Fiches-grey?style=for-the-badge)](https://github.com/Lkouad2/mapping-codes-apprentissage/blob/main/docs/fiches.md)[Blocs]


---

## Contribuer

- Ajouter un node
- Ajouter une relation
- Ajouter une fiche

Voir : Contribuer
