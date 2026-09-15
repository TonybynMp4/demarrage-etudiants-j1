import test from 'node:test';
import assert from 'node:assert/strict';
import { validateMessage, replyTo } from '../public/js/brain.js';

test('validateMessage refuse un message vide', () => {
  const resultat = validateMessage('   ');
  assert.equal(resultat.ok, false);
  assert.match(resultat.error, /vide/);
});

test('validateMessage refuse un message trop long', () => {
  const resultat = validateMessage('a'.repeat(281));
  assert.equal(resultat.ok, false);
  assert.match(resultat.error, /280/);
});

test('validateMessage accepte et nettoie un message valide', () => {
  const resultat = validateMessage('  bonjour  ');
  assert.equal(resultat.ok, true);
  assert.equal(resultat.value, 'bonjour');
});

test('replyTo répond à une salutation', () => {
  assert.equal(replyTo('salut'), 'Salut ! Comment puis-je vous aider ?');
  assert.equal(replyTo('Bonjour'), 'Salut ! Comment puis-je vous aider ?');
});

test('replyTo répond à la demande d\'aide', () => {
  assert.equal(replyTo('aide'), 'Je connais « salut », « bonjour », « aide » et « test ».');
});

test('replyTo répond à test', () => {
  assert.equal(replyTo('test'), 'Test reçu, tout fonctionne.');
});

test('replyTo donne une réponse par défaut sinon', () => {
  assert.equal(replyTo('quelque chose d\'inconnu'), "Je n'ai pas de réponse toute faite pour ça, mais je vous lis.");
});
