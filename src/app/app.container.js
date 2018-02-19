import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header } from './header/';
import { Footer } from './footer/';
import { ModalViewer } from 'redux-modal-viewer';
import { Route, Switch } from 'react-router';
import { PageHome, PageShell } from './page/';

// combine modals 
import modalConfig from './modal.config';
// require module styles
require('redux-modal-viewer/dist/redux-modal-viewer.css');
require('redux-form-ext/dist/redux-form-ext.css');
require('react-component-loader/dist/react-component-loader.css');
require('./shared/definition-list/definition-list.scss');
// require module style overrides
require('./style-overrides/index.scss');
// require app styles
require('./app.scss');

class App extends Component {
  componentDidMount() {
    // setup page padding based on header height
    var navbarHeight = $('.app-navbar').outerHeight();
    $('.page').css({ 'margin-top': navbarHeight });
    $('.site-top').css({ "min-height": $('body').outerHeight() - $('.footer-base').outerHeight() });
  }

  render() {
    const { location } = this.props;

    return (
      <div className="app-component">
        <div className="app-top">
          <ModalViewer />
          <Header {...location} />
          <div className="app-content">
            <Switch className="full">
              <Route exact path="/" component={PageShell(PageHome)} />
            </Switch>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    location: state.router.location, /* allows for re-render since prop will change on location change */
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
