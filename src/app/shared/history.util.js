import createHistory from 'history/createHashHistory';

let _history = null;

const HistoryUtil = {
  getHistory
};

export default HistoryUtil;

function getHistory() {
  if (!_history) {
    _history = createHistory();
  }

  return _history;
}