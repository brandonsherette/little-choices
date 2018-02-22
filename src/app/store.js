import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { HistoryUtil } from './shared/';
import { routerMiddleware } from 'react-router-redux';
import { 
  appRouter,
  composeEnhancers, 
  modalNoScroll,
} from './middleware/';
import { choiceMiddleware } from './choice/';

const history = HistoryUtil.getHistory();
// #LIVE
const middleware = applyMiddleware(thunk, routerMiddleware(history), modalNoScroll, appRouter, choiceMiddleware);
export default createStore(reducer, middleware);

/*const enhancer = composeEnhancers(
  applyMiddleware(thunk, routerMiddleware(history), modalNoScroll, appRouter, choiceMiddleware),
  // other store enhancers if any
);
export default createStore(reducer, enhancer);*/