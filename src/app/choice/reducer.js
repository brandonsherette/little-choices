import ActionTypes from './actions';

const initialState = {
  activeItem: null,
  editItem: null,
  error: '',
  errorSaving: '',
  isLoading: false,
  isFetched: false,
  isSaving: false,
  itemList: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    // module start actions
    case ActionTypes.FETCH_START:
    case ActionTypes.REMOVE_START: {
      return Object.assign({}, state, {
        error: '',
        isLoading: true,
      });
    }

    case ActionTypes.SAVE_START: {
      return Object.assign({}, state, {
        errorSaving: '',
        isSaving: true,
      });
    }

    // module fail actions
    case ActionTypes.FETCH_FAIL:
    case ActionTypes.REMOVE_FAIL: {
      return Object.assign({}, state, {
        error: action.payload,
        isLoading: false,
      });
    }

    case ActionTypes.SAVE_FAIL: {
      return Object.assign({}, state, {
        errorSaving: action.payload,
        isSaving: false,
      });
    }

    // module success actions
    case ActionTypes.FETCH_SUCCESS: {
      return Object.assign({}, state, {
        editItem: null,
        isFetched: true,
        isLoading: false,
        itemList: action.payload,
      });
    }

    case ActionTypes.SAVE_SUCCESS: {
      return Object.assign({}, state, {
        activeItem: action.payload.item,
        editItem: null,
        isSaving: false,
        itemList: action.payload.itemList,
      });
    }

    case ActionTypes.REMOVE_SUCCESS: {
      return Object.assign({}, state, {
        activeItem: null,
        editItem: null,
        isLoading: false,
        itemList: action.payload,
      });
    }

    case ActionTypes.SET_EDIT_ITEM: {
      return Object.assign({}, state, {
        editItem: action.payload,
      });
    }

    case ActionTypes.SET_ACTIVE_ITEM: {
      return Object.assign({}, state, {
        activeItem: action.payload,
      });
    }

    default: {
      return state;
    }
  }
}