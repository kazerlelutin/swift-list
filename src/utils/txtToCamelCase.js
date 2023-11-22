export function txtToCamelCase(txt) {
  return txt
    .split("-")
    .map((word, index) => {
      if (index === 0) return word
      return word[0].toUpperCase() + word.slice(1)
    })
    .join("")
}
