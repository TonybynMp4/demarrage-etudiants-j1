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

export function replyTo(message) {
  const texte = message.trim().toLowerCase();
  if (texte === 'salut' || texte === 'bonjour') {
    return 'Salut ! Comment puis-je vous aider ?';
  }
  if (texte === 'aide') {
    return 'Je connais « salut », « bonjour », « aide » et « test ».';
  }
  if (texte === 'test') {
    return 'Test reçu, tout fonctionne.';
  }
  return "Je n'ai pas de réponse toute faite pour ça, mais je vous lis.";
}
