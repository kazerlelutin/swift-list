// Libs externes
import m from 'mithril'

// Constante -------------------------------------------------------------------
let idb
const subscribers = []
const IDB_NAME = 'sl_db'
const IDB_VERSION = 1
const STORES = {
  ITEMS: {
    NAME: 'items',
    INDEXES: {
      NAME: 'name',
      SECTION: 'section',
      REAL_NAME: 'realName',
    },
  },
  SHOP_LISTS: {
    NAME: 'shopLists',
    INDEXES: {
      NAME: 'name',
      CREATED_AT: 'createdAt',
    },
    FIELDS: {
      STATE: 'state',
      ITEMS: 'items',
    },
  },
}

// INITIALISATION --------------------------------------------------------------

/**
 * @description  Permet à un composant de s'abonner pour être notifié des changements dans la base de données.
 * @param {Function} callback - La fonction à appeler lorsqu'un changement est détecté.
 * @returns {Function} Une fonction pour se désabonner et arrêter de recevoir des notifications.
 */
export function subscribe(callback) {
  if (!subscribers.includes(callback)) {
    subscribers.push(callback)
  }

  return () => {
    const index = subscribers.indexOf(callback)
    if (index !== -1) subscribers.splice(index, 1)
  }
}

/**
 * @description Notifie tous les abonnés des changements dans la base de données.
 * Appelle chaque fonction callback des abonnés et force une nouvelle dessin de la vue Mithril.
 */
export async function notifySubscribers(payload) {
  // Attendre que toutes les callbacks soient appelées, fonctionne même pour les callbacks synchrones
  await Promise.all(
    subscribers.map((callback) => {
      const result = callback(payload)
      return result instanceof Promise ? result : Promise.resolve(result)
    })
  )
  m.redraw() // Appeler m.redraw après chaque callback
}

/**
 * @description Ouvre la base de données et la met à niveau si nécessaire.
 */
export async function openDatabase() {
  const openRequest = indexedDB.open(IDB_NAME, IDB_VERSION)

  return new Promise((resolve, reject) => {
    openRequest.onupgradeneeded = (event) => {
      idb = event.target.result

      Object.keys(STORES).forEach((storeKey) => {
        const storeName = STORES[storeKey].NAME
        const store = idb.createObjectStore(storeName, {
          keyPath: 'id',
          autoIncrement: true,
        })

        const indexes = STORES[storeKey].INDEXES
        Object.keys(indexes).forEach((indexKey) => {
          store.createIndex(indexes[indexKey], indexes[indexKey], {
            unique: indexKey === 'NAME',
          })
        })
      })
    }

    openRequest.onsuccess = (event) => {
      idb = event.target.result
      resolve(idb)
    }

    openRequest.onerror = (event) => {
      reject(
        "Erreur lors de l'ouverture de la base de données : " +
          event.target.errorCode
      )
    }
  })
}

// SHOP LISTS ------------------------------------------------------------------

/**
 * @description Ajoute une nouvelle liste à la base de données.
 * @param {Object} shopList - La liste à ajouter.
 * @returns {Promise<IDBValidKey>} La clé de la liste ajoutée.
 */
export async function addShopList(shopList) {
  const transaction = idb.transaction([STORES.SHOP_LISTS.NAME], 'readwrite')
  const store = transaction.objectStore(STORES.SHOP_LISTS.NAME)
  const request = store.add(shopList)

  const result = await new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = (e) => reject("Erreur lors de l'ajout de la liste.", e)
  })

  notifySubscribers()
  return result
}

/**
 * @description Récupère toutes les listes
 * @returns {Promise<Object>} La liste récupérée.
 */
export async function getShopLists() {
  const transaction = idb.transaction([STORES.SHOP_LISTS.NAME], 'readonly')
  const store = transaction.objectStore(STORES.SHOP_LISTS.NAME)
  const request = store.getAll()

  return await new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () =>
      reject('Erreur lors de la récupération de la liste.')
  })
}

/**
 * @description Récupère une liste par son ID.
 * @param {IDBValidKey} id - L'ID de la liste à récupérer.
 * @returns {Promise<Object>} La liste récupérée.
 */
export async function getShopListById(id) {
  const transaction = idb.transaction([STORES.SHOP_LISTS.NAME], 'readonly')
  const store = transaction.objectStore(STORES.SHOP_LISTS.NAME)
  const request = store.get(id)

  return await new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () =>
      reject('Erreur lors de la récupération de la liste.')
  })
}

/**
 * @description Met à jour une liste existante.
 * @param {Object} shopList - La liste mise à jour.
 * @returns {Promise<void>}
 */
export async function updateShopList(shopList, type = 'update') {
  const transaction = idb.transaction([STORES.SHOP_LISTS.NAME], 'readwrite')
  const store = transaction.objectStore(STORES.SHOP_LISTS.NAME)
  const request = store.put(shopList)

  await new Promise((resolve, reject) => {
    request.onsuccess = () => resolve()
    request.onerror = () => reject('Erreur lors de la mise à jour de la liste.')
  })

  notifySubscribers({
    type,
    model: 'shopList',
    shopList,
  })
}

/**
 * @description Supprime une liste par son ID.
 * @param {IDBValidKey} id - L'ID de la liste à supprimer.
 * @returns {Promise<void>}
 */
export async function deleteShopList(id) {
  const transaction = idb.transaction([STORES.SHOP_LISTS.NAME], 'readwrite')
  const store = transaction.objectStore(STORES.SHOP_LISTS.NAME)
  const request = store.delete(id)

  await new Promise((resolve, reject) => {
    request.onsuccess = () => resolve()
    request.onerror = () => reject('Erreur lors de la suppression de la liste.')
  })

  notifySubscribers({
    type: 'delete',
    model: 'shopList',
  })
}

// ITEMS -----------------------------------------------------------------------

/**
 * @description Ajoute un nouvel article à la base de données.
 * @param {Object} item - L'article à ajouter.
 * @returns {Promise<IDBValidKey>} La clé de l'article ajouté.
 */
export async function addItem(item) {
  const transaction = idb.transaction([STORES.ITEMS.NAME], 'readwrite')
  const store = transaction.objectStore(STORES.ITEMS.NAME)
  const nameIndex = store.index('name') // Utilisez l'index "name" pour la vérification
  const existingItem = await nameIndex.get(item.name)
  if (existingItem || !existingItem?.section) return existingItem
  const request = store.add(item)

  const result = await new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject("Erreur lors de l'ajout de l'article.")
  })

  notifySubscribers()
  return result
}

function getItemFromIndex(nameIndex, itemName) {
  return new Promise((resolve, reject) => {
    const request = nameIndex.get(itemName)
    request.onsuccess = function (event) {
      resolve(event.target.result)
    }
    request.onerror = function (event) {
      reject(event.target.error)
    }
  })
}

export async function addItems(items) {
  const transaction = idb.transaction([STORES.ITEMS.NAME], 'readwrite')
  const store = transaction.objectStore(STORES.ITEMS.NAME)
  const nameIndex = store.index('name') // Utilisez l'index "name" pour la vérification

  for (const item of items) {
    // Vérifiez si l'élément existe déjà en utilisant l'index "name"
    const existingItem = await getItemFromIndex(nameIndex, item.name)
    if (!existingItem) {
      // Si l'élément n'existe pas, ajoutez-le
      store.add(item)
    }
  }

  await new Promise((resolve, reject) => {
    transaction.oncomplete = resolve
    transaction.onerror = () => reject("Erreur lors de l'ajout des articles.")
  })

  notifySubscribers()
}

/**
 * @description Récupère un article par son ID.
 * @param {IDBValidKey} id - L'ID de l'article à récupérer.
 * @returns {Promise<Object>} L'article récupéré.
 */
export async function getItemById(id) {
  const transaction = idb.transaction([STORES.ITEMS.NAME], 'readonly')
  const store = transaction.objectStore(STORES.ITEMS.NAME)
  const request = store.get(id)

  return await new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () =>
      reject("Erreur lors de la récupération de l'article.")
  })
}

export async function getItemByRealName(realName) {
  const transaction = idb.transaction([STORES.ITEMS.NAME], 'readonly')
  const store = transaction.objectStore(STORES.ITEMS.NAME)
  const nameIndex = store.index('realName')
  return await getItemFromIndex(nameIndex, realName)
}

/**
 * @description Met à jour un article existant.
 * @param {Object} item - L'article mis à jour.
 * @returns {Promise<void>}
 */
export async function updateItem(item) {
  const transaction = idb.transaction([STORES.ITEMS.NAME], 'readwrite')
  const store = transaction.objectStore(STORES.ITEMS.NAME)
  const request = store.put(item)

  await new Promise((resolve, reject) => {
    request.onsuccess = () => resolve()
    request.onerror = () =>
      reject("Erreur lors de la mise à jour de l'article.")
  })

  notifySubscribers()
}

/**
 * @description Supprime un article par son ID.
 * @param {IDBValidKey} id - L'ID de l'article à supprimer.
 * @returns {Promise<void>}
 */
export async function deleteItem(id) {
  const transaction = idb.transaction([STORES.ITEMS.NAME], 'readwrite')
  const store = transaction.objectStore(STORES.ITEMS.NAME)
  const request = store.delete(id)

  await new Promise((resolve, reject) => {
    request.onsuccess = () => resolve()
    request.onerror = () =>
      reject("Erreur lors de la suppression de l'article.")
  })

  notifySubscribers()
}
