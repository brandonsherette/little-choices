import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

require('./page.shell.scss');

const PageShell = Page => {
  return (props) => (
    <ReactCSSTransitionGroup
      className="full page container"
      transitionName="fade"
      transitionAppear={true}
      transitionAppearTimeout={800}
      transitionEnter={true}
      transitionEnterTimeout={800}
      transitionLeaveTimeout={800}
    >
      <div className="container">
        <Page {...props} />
      </div>
    </ReactCSSTransitionGroup>
  );
}

export default PageShell;