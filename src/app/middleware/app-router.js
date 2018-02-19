import { AppUtil } from '../shared/';

const appRouter = store => next => action => {
  if (action.type === '@@router/LOCATION_CHANGE') {
    // let next action trigger before scrolling to top to get correct offset values
    next(action);
    // scroll to top of page
    AppUtil.scrollTo();
    // prevent further execution
    return;
  }

  // allow next action to pass through
  next(action);
}

export default appRouter;