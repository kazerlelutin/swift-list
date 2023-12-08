export function titleToId(title) {
  return title
    .toLowerCase() // Convertir en minuscules
    .replace(/[^a-z0-9 -]/g, "") // Enlever les caractères spéciaux
    .replace(/\s+/g, "-") // Remplacer les espaces par des tirets
    .replace(/-+/g, "-") // Éviter les tirets multiples consécutifs
}
