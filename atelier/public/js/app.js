import { validateMessage, replyTo, isCommand, commandHelp } from './brain.js';
import { renderMessages } from './view.js';

const formulaire = document.querySelector('#chat-form');
const champ = document.querySelector('#message');
const liste = document.querySelector('#messages');
const statut = document.querySelector('#status');
const versionElt = document.querySelector('#version');
const boutonEffacer = document.querySelector('#effacer');

const CLE_HISTORIQUE = 'capweb.historique';
const historique = [];

function sauvegarder() {
  localStorage.setItem(CLE_HISTORIQUE, JSON.stringify(historique));
}

function chargerHistorique() {
  const brut = localStorage.getItem(CLE_HISTORIQUE);
  if (!brut) {
    return;
  }
  try {
    const donnees = JSON.parse(brut);
    if (Array.isArray(donnees)) {
      historique.push(...donnees);
    }
  } catch {
    statut.textContent = 'La conversation enregistrée était abîmée ; elle a été réinitialisée.';
  }
}

chargerHistorique();
renderMessages(historique, liste);

formulaire?.addEventListener('submit', (event) => {
  event.preventDefault();
  const resultat = validateMessage(champ.value);
  if (!resultat.ok) {
    statut.textContent = resultat.error;
    champ.focus();
    return;
  }
  const { value } = resultat;
  historique.push({ role: 'user', text: value });
  historique.push({ role: 'assistant', text: isCommand(value) ? handleCommand(value) : replyTo(value) });
  renderMessages(historique, liste);
  sauvegarder();
  champ.value = '';
  statut.textContent = '';
  champ.focus();
});

function handleCommand(commande) {
  const nom = commande.trim().toLowerCase();
  if (nom === '/aide') {
    return commandHelp();
  }
  if (nom === '/effacer') {
    historique.length = 0;
    localStorage.removeItem(CLE_HISTORIQUE);
    return 'Conversation effacée.';
  }
  if (nom === '/compte') {
    return `Nombre de messages : ${historique.length}.`;
  }
  return `Commande inconnue : ${commande}. Tapez /aide pour la liste.`;
}

boutonEffacer?.addEventListener('click', () => {
  if (!confirm('Effacer toute la conversation ?')) {
    return;
  }
  historique.length = 0;
  localStorage.removeItem(CLE_HISTORIQUE);
  renderMessages(historique, liste);
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
