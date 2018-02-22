import { save } from "./actions";

const LOCAL_STORAGE_KEY = 'choiceList';

/**
 * Promises to fetch the data from the database/localstorage.
 * @return {Promise} the promise to fetch the itemList.
 */
export const promiseToFetch = () => {
  return new Promise((resolve, reject) => {
    resolve(_fetchListFromStorage());
  });
};

/**
 * Promises to save the specified item.
 * @param {Object} item the item data to save.
 * @return {Promise} the promise to save the specified item.
 */
export const promiseToSave = (item) => {
  return new Promise((resolve, reject) => {
    const nextItemList = [..._fetchListFromStorage()];

    // check if item already in list
    const itemIndex = nextItemList.findIndex((mItem) => mItem.id === item.id);
    const savedItem = Object.assign({}, item, {
      id: (itemIndex === -1) ? _createId() : item.id,
    });
    
    if (itemIndex === -1) {
      // new item
      nextItemList.unshift(savedItem);
    } else {
      // update item
      nextItemList[itemIndex] = savedItem;
    }

    // save next item list to storage
    _saveToStorage(nextItemList);

    // resolve by returning the savedItem with new id if it needed it
    resolve(savedItem);
  });
}

/**
 * Promises to remove the specified item.
 * @param {Object} item the item to remove from database/storage.
 * @return {Promise} the promise to remove the specified item.
 */
export const promiseToRemove = (item) => {
  return new Promise((resolve, reject) => {
    const nextItemList = [..._fetchListFromStorage()];
    const itemIndex = nextItemList.findIndex((mItem) => mItem.id === item.id);

    if (itemIndex === -1) {
      // no item to remove so issue happened
      reject('Item Not Found');
      return;
    }

    nextItemList.splice(itemIndex, 1);

    _saveToStorage(nextItemList);
    // all good, so resolve
    resolve();
  });
}

//////////////////
/** 
 * Creates a new id.
 */
function _createId() {
  return Date.now().toString(32);
}

/**
 * Fetches the list from storage.
 */
function _fetchListFromStorage() {
  const itemList = localStorage.getItem(LOCAL_STORAGE_KEY);

  return (itemList) 
    ? JSON.parse(itemList)
    : [];
}

/**
 * Saves the specified item list to storage.
 * @param {Array} itemList the item list to save to storage.
 */
function _saveToStorage(itemList) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(itemList));
}