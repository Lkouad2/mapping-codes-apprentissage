# Mapping des codes, usages et dépendances – Apprentissage

## Objectif

Ce projet propose une représentation visuelle des relations entre les codes utilisés dans le champ de l’apprentissage :

* certifications
* établissements
* employeurs / branches

Il permet de comprendre comment les données s’articulent entre elles.

## Accès à l’application

👉 https://lkouad2.github.io/mapping-codes-apprentissage/

## Structure du projet

```
index.html → interface
css/ → styles
js/
  ├── data/ → données (nodes, links…)
  ├── graph/ → logique du graphe
  └── app.js → point d’entrée
docs/ → documentation
```

## Principe de modélisation

Le modèle repose sur 3 objets simples :

* **nodes** → les codes
* **links** → les relations entre codes
* **fiches** → la documentation métier associée

## Documentation

* Comprendre le modèle → docs/01-comprendre-le-modele.md
* Nodes → docs/02-les-nodes.md
* Relations → docs/03-les-relations.md
* Fiches → docs/04-les-fiches.md
* Modifier le graphe → docs/05-modifier-le-graphe.md

## Philosophie

Le graphe ne reconstruit pas une vérité technique.

Il représente **ce qui a été exprimé en atelier**.
