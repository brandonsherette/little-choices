import { ActionTypes } from 'redux-modal-viewer';
const $ = window.jQuery;
let _scrollPosY = 0;

const modalNoScroll = store => next => action => {
  // let action trigger before doing any action
  next(action);

  // only apply the no scroll tactic if mobile
  const isMobile = /iPhone|iPad|iPod|Android|BlackBerry|Mobile|Tablet/i.test(navigator.userAgent);
  if (isMobile) {
    // OPEN ACTION
    if (action.type === ActionTypes.MODAL_VIEWER_OPEN_MODAL) {
      // need to get the current scroll position of the body and add the correct styling to
      // prevent mobile scrolling
      _scrollPosY = $('body').scrollTop();
      $('body').css({"overflow": "hidden", "position": "fixed"});
    }

    // CLOSE ACTION
    if (
      action.type === ActionTypes.MODAL_VIEWER_CLOSE_MODAL ||
      action.type === ActionTypes.MODAL_VIEWER_CLOSE_ALL_MODALS
    ) {
      // CLOSE ACTION
      // need to replace the scrolling postion of the body to its proper location
      // need to wait for next pass to allow for time to override bootstraps detault styles
      window.setTimeout(function() {
        $('body').css({"overflow": "auto", "position": "relative"}).scrollTop(_scrollPosY);
      }, 100);
    }
  }
};

export default modalNoScroll;