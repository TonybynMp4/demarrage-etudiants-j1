const LONGUEUR_MAX = 280;

export function validateMessage(raw) {
  if (typeof raw !== 'string') {
    return { ok: false, error: 'Le message doit être du texte' };
  }
  const value = raw.trim();
  if (value === '') {
    return { ok: false, error: 'Le message ne doit pas être vide' };
  }
  if (value.length > LONGUEUR_MAX) {
    return { ok: false, error: `Le message dépasse ${LONGUEUR_MAX} caractères` };
  }
  return { ok: true, value };
}

const SALUTATIONS = ['salut', 'bonjour', 'coucou', 'hello'];
const MOTS_AIDE = ['aide', 'help'];
const MOTS_TEST = ['test'];

function contientMot(texte, mots) {
  return mots.some((mot) => new RegExp(`\\b${mot}\\b`, 'iu').test(texte));
}

export function replyTo(message) {
  const texte = message.trim().toLowerCase();
  if (contientMot(texte, SALUTATIONS)) {
    return 'Salut ! Comment puis-je vous aider ?';
  }
  if (contientMot(texte, MOTS_AIDE)) {
    return 'Je connais « salut », « bonjour », « aide » et « test ». Tapez /aide pour les commandes.';
  }
  if (contientMot(texte, MOTS_TEST)) {
    return 'Test reçu, tout fonctionne.';
  }
  return "Je n'ai pas de réponse toute faite pour ça, mais je vous lis.";
}

export function isCommand(text) {
  return text.trim().startsWith('/');
}

export function commandHelp() {
  return 'Commandes disponibles : /aide (cette liste), /effacer (vider la conversation), /compte (nombre de messages).';
}
