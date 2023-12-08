import { deleteShopList, openDatabase } from "../utils/idb"

/**
 * @description - Delete a list
 * @param {String} id - id of the list to delete
 */
export async function delList(id) {
  const listId = Number(id)
  await openDatabase()
  await deleteShopList(listId)
  document.getElementById(`list-${listId}`).remove()
}
