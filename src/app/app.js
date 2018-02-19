import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './app.container';
import store from './store';
import { ConnectedRouter } from 'react-router-redux';
import { HistoryUtil } from './shared/';

// get instance of history for connected router to tie into
const history = HistoryUtil.getHistory();

const appRoot = document.getElementById('app-root');

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
), appRoot);
