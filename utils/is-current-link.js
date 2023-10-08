/**
 *
 * @param {string} href  - Le href de la page à tester.
 * @returns {boolean} Vrai si la page est la page courante, faux sinon.
 */
export function isCurrentLink(href) {
  if (href === '/')
    return window.location.hash === '' || window.location.hash === '#!/'

  return window.location.hash.includes(href)
}
