# Suivi J1 — Cap Web

Note ton avancée après chaque TP. Reste factuel, sans données personnelles. Ce fichier te sert pour la capsule et le bilan.

## TP00 — Diagnostic

- Hypothèse : Étiquette illisible ou problème de largeur à cause d'une boîte fixe et d'un manque de box-sizing.
- Action : Remplacement par `<main>`, réordonnancement des titres, labels reliés aux champs, bouton submit natif, `box-sizing: border-box`, fonctions JS de validation codées.
- Résultat : Navigation clavier fonctionnelle, aucun débordement à 360 px, tests JS validés.
- Point non compris : Aucun.

## TP01 — Démarrer

- Hypothèse : Si le JS ne charge pas, le titre et le texte s'affichent normalement mais le statut reste vide.
- Action : `cd atelier`, vérification de Node et lancement du serveur avec `npm start`, ouverture sur `http://127.0.0.1:3000`.
- Résultat : Page affichée avec le statut « Votre point de départ est prêt. ».
- Point non compris : Aucun.

## TP02 — HTML

- Hypothèse : Si on remplace `main` par `div`, visuellement rien ne change, mais les lecteurs d'écran perdent le repère sémantique principal.
- Action : Déplacement de `h1` dans `header`, ajout d'une `section aria-labelledby="titre-chat"` avec `h2 id="titre-chat"`, `ul#messages` vide avec aria-live, `footer` avec `span#version`.
- Résultat : Arbre d'accessibilité structuré avec région principale et repères clairs.
- Point non compris : Aucun.

## TP03 — Formulaire

- Hypothèse : Dans un `textarea`, la touche Entrée insère un saut de ligne et ne soumet pas le formulaire.
- Action : Ajout du formulaire avec `label`, `textarea` requis limité à 280 caractères et bouton submit. Intégration du script `app.js`.
- Résultat : Entrée saute une ligne, Tab puis Entrée sur le bouton soumet et met à jour le statut avec « Interface prête ; les réponses arrivent au J2. ».
- Point non compris : Aucun.

## TP04 — Responsive

- Hypothèse : Sans règle de césure (`overflow-wrap`), un mot de 60 lettres fait déborder le conteneur horizontalement sur écran mobile.
- Action : `box-sizing: border-box` universel, marge du `body` à zéro, conteneurs centrés à 100% avec `max-width: 760px`, formulaire flex en colonne, styles `:focus-visible`, gestion de césure sur les messages.
- Résultat : Aucun défilement horizontal ni débordement à 360 px et 1280 px.
- Point non compris, test 360 / 1280 : Aucun.

## Commandes essayées

Note chaque commande avec son dossier de lancement et son résultat exact. Exemple d'état local, depuis la racine étudiante :

```sh
# depuis RACINE_ETUDIANT
git status
git diff
```

Mes essais :

- Dossier : atelier
- Commande et résultat : `npm start` -> serveur démarré sur http://127.0.0.1:3000.
- Commande et résultat : `npm test` -> 9/9 tests passés.
- Problème exact si blocage : Aucun.

Si Node ou Git bloque, note le message exact et continue en local sans attendre. Le double-clic sur `diagnostic/index.html` ne remplace pas le serveur pour les modules et l'envoi du TP03.

## Auto-revue finale

- Ce qui s'affiche bien : En-tête, section discussion, formulaire accessible avec focus visible, pied de page et version, mise en page fluide et centrée. (Tout quoi)
- Ce qui reste fragile au clavier ou à 360 px : Aucun problème observé, validation au clavier fonctionnelle et pas de défilement horizontal.
- Ce que je veux revoir en capsule : La gestion dynamique des messages avec `aria-live` et l'envoi au clavier avec Ctrl+Entrée sur un textarea.

## Rappel Git prudent

Git reste optionnel le matin. Vérifie l'état local, ne valide que des fichiers nommés un par un et seulement si Git est configuré. Reste en local ou en ZIP sauf si le formateur précise le circuit avec fork personnel. Aucune invitation ni demande de fusion requise le matin.

## Liens

- [README](README.md)
- [TP00](tp/00-diagnostic.md)
- [TP05](tp/05-bilan.md)
- [Aide-mémoire](ressources/aide-memoire.md)
