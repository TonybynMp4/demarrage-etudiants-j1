import { validateMessage, replyTo } from './brain.js';

const formulaire = document.querySelector('#chat-form');
const champ = document.querySelector('#message');
const liste = document.querySelector('#messages');
const statut = document.querySelector('#status');
const versionElt = document.querySelector('#version');

formulaire?.addEventListener('submit', (event) => {
  event.preventDefault();
  const resultat = validateMessage(champ.value);
  if (!resultat.ok) {
    statut.textContent = resultat.error;
    champ.focus();
    return;
  }
  const { value } = resultat;
  const messageUtilisateur = document.createElement('li');
  messageUtilisateur.textContent = `Vous : ${value}`;
  liste.append(messageUtilisateur);
  const messageAssistant = document.createElement('li');
  messageAssistant.textContent = `Cap Web : ${replyTo(value)}`;
  liste.append(messageAssistant);
  champ.value = '';
  statut.textContent = '';
  champ.focus();
});

// Version du serveur local, échec discret si indisponible.
fetch('/version.json', { headers: { accept: 'application/json' } })
  .then((reponse) => (reponse.ok ? reponse.json() : null))
  .then((donnees) => {
    if (donnees && typeof donnees.version === 'string' && versionElt) {
      versionElt.textContent = `version ${donnees.version}`;
    }
  })
  .catch(() => {});
