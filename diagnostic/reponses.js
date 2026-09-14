// Diagnostic d'entrée — Inscription à un atelier.
// Complétez les deux fonctions. Fichier testé séparément avec Node.
// Ne pas ajouter d'import : gardez de simples export function.

export function estValide(texte) {
  if (typeof texte !== "string") {
    return false;
  }
  const longueur = texte.trim().length;
  return longueur >= 3 && longueur <= 40;
}

export function extraireActifs(elements) {
  if (!Array.isArray(elements)) {
    return [];
  }
  return elements
    .filter(
      (element) =>
        element &&
        typeof element === "object" &&
        element.active === true &&
        typeof element.name === "string" &&
        element.name.trim() !== ""
    )
    .map((element) => element.name.trim());
}
