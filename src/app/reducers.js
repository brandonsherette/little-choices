import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { reducer as modalViewer } from 'redux-modal-viewer';
import { routerReducer as router } from 'react-router-redux';
import { reducer as choice } from './choice/';
//#YO:IMPORT:REDUCER

export default combineReducers({
  form,
  modalViewer,
  router,
  choice,
	//#YO:ADD:REDUCER
});
