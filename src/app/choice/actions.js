// import action promises for actions that require database/localstorage interactions
import { promiseToFetch, promiseToRemove, promiseToSave } from './actions.promise';
import { Normalize } from 'redux-form-ext';

// ACTION_PREFIX allows for namespacing actions to the module
const ACTION_PREFIX = '@@choice/';
const ActionTypes = {
  FETCH_START: ACTION_PREFIX + 'FETCH_START',
  FETCH_FAIL: ACTION_PREFIX + 'FETCH_FAIL',
  FETCH_SUCCESS: ACTION_PREFIX + 'FETCH_SUCCESS',
  REMOVE_START: ACTION_PREFIX + 'REMOVE_START',
  REMOVE_FAIL: ACTION_PREFIX + 'REMOVE_FAIL',
  REMOVE_SUCCESS: ACTION_PREFIX + 'REMOVE_SUCCESS',
  SET_ACTIVE_ITEM: ACTION_PREFIX + 'SET_ACTIVE_ITEM',
  SET_EDIT_ITEM: ACTION_PREFIX + 'SET_EDIT_ITEM',
  SAVE_START: ACTION_PREFIX + 'SAVE_START',
  SAVE_FAIL: ACTION_PREFIX + 'SAVE_FAIL',
  SAVE_SUCCESS: ACTION_PREFIX + 'SAVE_SUCCESS',
};

export default ActionTypes;

/**
 * Action to remove the specified item and update the itemList.
 * @param {Object} item the item to remove. 
 */
export const remove = (item, handleDone) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.REMOVE_START });

    promiseToRemove(item).then((payload) => {
      const nextItems = [...getState().choice.itemList];
      nextItems.splice(nextItems.findIndex((mItem) => mItem.id === item.id), 1);

      dispatch({ 
        type: ActionTypes.REMOVE_SUCCESS, 
        payload: nextItems,
      });

      if (handleDone && typeof handleDone === 'function') {
        handleDone.call();
      }
    }).catch((payload) => {
      dispatch({ type: ActionTypes.REMOVE_FAIL, payload });
    });
  }
}

/**
 * Action to fetch to data list from database/storage and update the itemList.
 */
export const fetch = () => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.FETCH_START });

    promiseToFetch().then((payload) => {
      dispatch({ 
        type: ActionTypes.FETCH_SUCCESS, 
        payload: payload.map((rawData) => { 
          return _normalizeItem(rawData);
        }),
      });
    }).catch((payload) => {
      dispatch({ type: ActionTypes.FETCH_FAIL, payload });
    });
  }
}

/**
 * Action to save the specified item to the database/storage and update the itemList.
 * @param {Object} item the item data to save (id set to 0 or null to create new one).
 */
export const save = (item) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.SAVE_START });

    // make sure item is properly formatted
    const optionParts = item.options.split(',');
    item.options = optionParts.map(option => Normalize.title(option.trim()));

    promiseToSave(item).then((payload) => {
      // add newest item to first of list
      const nextItemList = [...getState().choice.itemList];
      const itemIndex = nextItemList.findIndex(mItem => mItem.id === item.id);

      if (itemIndex === -1) {
        // new item
        nextItemList.unshift(_normalizeItem(payload));
      } else {
        // existing item
        nextItemList[itemIndex] = _normalizeItem(payload);
      }
      
      dispatch({
        type: ActionTypes.SAVE_SUCCESS,
        payload: {
          item: payload,
          itemList: nextItemList,
        }
      });
    }).catch((payload) => {
      dispatch({ type: ActionTypes.SAVE_FAIL, payload });
    });
  }
}

/**
 * Sets the active item the module is working with.
 * @param {Object} item the item to set as the active item to work with.
 */
export const setActiveItem = (item) => {
  return {
    type: ActionTypes.SET_ACTIVE_ITEM,
    payload: item,
  };
};

/**
 * Sets the edit item.
 * @param {Object} item the item to set as the edit item.
 */
export const setEditItem = (item) => {
  return {
    type: ActionTypes.SET_EDIT_ITEM,
    payload: item,
  };
};

///////////////
/**
 * Normalizes the item object with the raw data from the database/storage.
 * Used to format any dates or convert to number values or whatever the item data needs to be.
 * @param {Object} rawData the raw data from the database/storage that needs to be normalized.
 */
function _normalizeItem(rawData) {
  return Object.assign({}, rawData, {
    /* reformat any raw data from fetch, such as date to a date object, and etc... */
  });
}