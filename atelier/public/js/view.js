function ajouterTexteAvecGras(parent, texte) {
  const morceaux = texte.split(/(\*\*[^*]+\*\*)/);
  for (const morceau of morceaux) {
    if (morceau.startsWith('**') && morceau.endsWith('**') && morceau.length > 4) {
      const fort = document.createElement('strong');
      fort.textContent = morceau.slice(2, -2);
      parent.append(fort);
    } else if (morceau !== '') {
      parent.append(document.createTextNode(morceau));
    }
  }
}

export function renderMessages(messages, container) {
  const lignes = messages.map((msg) => {
    const li = document.createElement('li');
    const etiquette = msg.role === 'user' ? 'Vous' : 'Cap Web';
    li.append(document.createTextNode(`${etiquette} : `));
    ajouterTexteAvecGras(li, msg.text);
    return li;
  });
  container.replaceChildren(...lignes);
}
