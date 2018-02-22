import ActionTypes from './actions';
import { closeModal } from 'redux-modal-viewer';

const choiceMiddleware = store => next => action => {
  switch (action.type) {
    case ActionTypes.SAVE_SUCCESS: {
      next(action);

      // close save form since save action has been completed
      store.dispatch(closeModal('ModalChoiceListForm'));
      // prevent further execution since next action already has taken affect
      return;
    }

    default: {
      // must allow next action to pass through to next middleware
      next(action);
    }
  }
};

export default choiceMiddleware;