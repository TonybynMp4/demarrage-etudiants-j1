# Suivi — après-midi J1

**Noté. Un fichier par étudiant, écrit avec vos mots.** Une phrase honnête (« j'ai essayé X, j'ai vu Y, je ne comprends pas pourquoi ») rapporte plus qu'une phrase parfaite recopiée.

- Nom : Antony
- Binôme : Jules Parents
- Atelier utilisé (le mien, celui du binôme, la reprise) : le mien (tp5 du matin, déjà le plus avancé du binôme)
- Sujet A6 : révisions réseaux — TCP/IP, DNS et HTTP expliqués simplement, avec des quiz

## Pour chaque TP abordé

Recopiez ce bloc autant de fois que nécessaire.

### TP06 — Départ du binôme

- J'ai prédit : qu'il faudrait remplacer `app.js` par la version de `fournitures/formulaire/` parce que celui de départ ne gère pas la soumission.
- Nous avons fait : on a comparé les deux `atelier/` (le mien issu de tp5, celui du binôme) et vérifié le contenu de `app.js`.
- J'ai observé : mon `app.js` (celui du matin, tp5) contenait déjà `addEventListener('submit', ...)` — la condition de remplacement du TP06 était donc fausse.
- J'ai compris : le TP06 est une vérification conditionnelle, pas une étape obligatoire ; il ne faut remplacer le fichier que si la condition est vraie.
- Je n'ai pas compris : —
- Réponse à la question « Dans le suivi » du TP : mon atelier était le plus avancé, aucun fichier n'a été remplacé.

### TP07 — Afficher le message

- J'ai prédit : qu'il fallait lire la valeur du `textarea`, la vérifier, puis l'ajouter à la liste `#messages`.
- Nous avons fait : ajout de la lecture du champ, d'un contrôle « message vide », et de la création d'un `<li>` via `document.createElement` + `textContent`.
- J'ai observé : le formulaire affichait désormais chaque message envoyé dans la liste, sans rechargement de page.
- J'ai compris : `event.preventDefault()` empêche le rechargement, et `textContent` insère le texte sans risque d'injection HTML.
- Je n'ai pas compris : —
- Réponse à la question « Dans le suivi » du TP : `textContent` échappe le contenu automatiquement, contrairement à `innerHTML`.

### TP08 — Un cerveau à règles

- J'ai prédit : qu'il fallait un module séparé pour la logique de réponse, testable sans DOM.
- Nous avons fait : création de `brain.js` avec `validateMessage` et `replyTo`, purement fonctions (pas de `document`), et ajout de son chemin dans la liste blanche du serveur (`FICHIERS`/`TYPES`).
- J'ai observé : oublier d'ajouter le fichier à la liste blanche du serveur donne une 404 même si le fichier existe sur disque.
- J'ai compris : séparer la logique (testable) de l'affichage (DOM) rend le code plus facile à vérifier.
- Je n'ai pas compris : —
- Réponse à la question « Dans le suivi » du TP : la liste blanche du serveur est volontairement stricte, pour ne jamais servir un fichier non prévu.

### TP09 — Ranger en modules

- J'ai prédit : qu'il fallait sortir l'affichage dans son propre module, `view.js`.
- Nous avons fait : création de `view.js` avec `renderMessages`, introduction d'un tableau `historique` dans `app.js`, ajout de `view.js` à la liste blanche du serveur.
- J'ai observé : `app.js` devient un simple chef d'orchestre (événements + appels), toute la logique et tout l'affichage vivent ailleurs.
- J'ai compris : trois fichiers aux responsabilités distinctes (`app.js`, `brain.js`, `view.js`) sont plus faciles à lire et à tester qu'un seul gros fichier.
- Je n'ai pas compris : —
- Réponse à la question « Dans le suivi » du TP : parce que chaque fichier peut être compris, testé et modifié indépendamment des autres.

### TP10 — Mémoire et effacer

- J'ai prédit : qu'il fallait sauvegarder `historique` dans `localStorage` après chaque message, et le recharger au démarrage.
- Nous avons fait : ajout de `sauvegarder()` (avec `JSON.stringify`) et `chargerHistorique()` (avec `JSON.parse` dans un `try/catch`), plus un bouton « Effacer la conversation » avec confirmation.
- J'ai observé : sans le `try/catch`, une valeur corrompue dans `localStorage` fait planter toute la page au chargement.
- J'ai compris : `localStorage` ne stocke que du texte, il faut donc sérialiser/désérialiser, et toujours prévoir le cas où les données stockées sont invalides.
- Je n'ai pas compris : —
- Réponse à la question « Dans le suivi » du TP : le `try/catch` protège contre des données corrompues ou d'un format ancien.

### TP11 — Premier test automatique

- J'ai prédit : qu'on pouvait tester `brain.js` directement, sans navigateur, puisqu'il n'utilise pas `document`.
- Nous avons fait : écriture de `tests/brain.test.js` avec `node:test` et `node:assert/strict`, couvrant `validateMessage` et `replyTo`.
- J'ai observé : les tests s'exécutent sans navigateur ni serveur, en quelques millisecondes.
- J'ai compris : séparer la logique pure du DOM (fait au TP09) est ce qui rend ces tests possibles.
- Je n'ai pas compris : —
- Réponse à la question « Dans le suivi » du TP : parce que `brain.js` ne dépend d'aucune API navigateur, Node peut l'exécuter directement.

### TP13 — Défis (commandes, correspondance souple, gras sans danger, test navigateur)

- J'ai prédit : que les commandes (`/aide`, `/effacer`, `/compte`) devaient être traitées avant `replyTo`, et qu'un `\b` en regex éviterait de confondre « test » et « tester ».
- Nous avons fait : ajout de `isCommand`/`commandHelp` dans `brain.js`, d'un `handleCommand` dans `app.js` pour `/aide`, `/effacer`, `/compte` ; correspondance par mot (`\btest\b`) plutôt que par égalité stricte, pour reconnaître un mot dans une phrase ; rendu du `**gras**` sans `innerHTML` dans `view.js` (découpage du texte et création de `<strong>` avec `textContent`) ; écriture de `browser/chat.spec.js`.
- J'ai observé : `\btest\b` ne matche pas à l'intérieur de « tester », parce que la frontière de mot n'existe qu'entre un caractère de mot et un caractère qui n'en est pas un.
- J'ai compris : on peut construire du HTML riche (du gras) sans jamais passer par `innerHTML`, en construisant les nœuds à la main et en gardant le texte brut dans `textContent`.
- Je n'ai pas compris : —
- Réponse à la question « Dans le suivi » du TP : le test navigateur (`chat.spec.js`) n'a pas pu être exécuté dans cet environnement (pas de Node.js/npm disponible ici) ; à lancer avec `npm ci && npx playwright install chromium && npm run test:browser` sur une machine équipée.

## Épreuve de l'explication (TP12)

- Ce que je n'ai pas su expliquer : —
- Ce que mon binôme n'a pas su expliquer : —

## Trois questions

1. Pourquoi `textContent` et pas `innerHTML` ? — `textContent` insère du texte brut, jamais interprété comme HTML : un message contenant `<script>` ou des balises reste inoffensif. `innerHTML` interpréterait ce texte comme du HTML, ouvrant la porte à une injection.
2. Pourquoi trois fichiers plutôt qu'un seul ? — `brain.js` (logique pure, testable sans navigateur), `view.js` (affichage DOM) et `app.js` (orchestration des événements) ont chacun une seule responsabilité ; c'est plus facile à lire, à tester et à faire évoluer séparément.
3. Si demain une IA écrit une partie du code, comment saurai-je qu'il est correct ? — En le lisant ligne par ligne comme à l'épreuve de l'explication, en le faisant passer par les tests automatiques existants, et en vérifiant qu'il respecte les mêmes règles (pas d'`innerHTML` sur du contenu utilisateur, liste blanche du serveur à jour, etc.).

## Aides utilisées

- Indices, aide-mémoire, voisins : `ressources/aide-memoire-js.md`, comparaison avec l'atelier de départ (`origin/tp5`) pour vérifier l'état réel avant de continuer.
- Ce que j'ai demandé à une IA, et comment j'ai vérifié sa réponse : vérification de la structure de branches (`tp0`…`tp5` fusionnées dans `main`) avant de continuer les TP, pour ne pas repartir d'un atelier moins avancé que celui déjà obtenu le matin ; vérifié en comparant le contenu réel des fichiers (`git show`, `git diff --stat`) plutôt qu'en faisant confiance à une hypothèse.
