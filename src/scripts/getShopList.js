import { openDatabase, getShopListById as _getShopListById } from "../utils/idb"

/**
 *
 * @description Récupère une liste depuis la base de données locale.
 * @param {String | Number } id
 * @returns {Promise<ShopList>} - ShopList
 */
export async function getShopListById(id) {
  await openDatabase()
  const list = await _getShopListById(Number(id))
  if (!list) return
  return list
}
