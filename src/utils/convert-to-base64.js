export function convertTxtToBase64(txt) {
  return btoa(encodeURIComponent(txt))
}

export function convertBase64ToTxt(base64) {
  return decodeURIComponent(atob(base64))
}
