import { ModalConfirm, ModalUtil } from 'redux-modal-viewer';
import { ModalChoiceListForm } from './choice/';
//#YO:IMPORT:MODAL

export default ModalUtil.combineModals({
	ModalChoiceListForm,
	ModalConfirm,
	//#YO:ADD:MODAL
});