import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

// include styles
require('./header.scss');

const links = [
  {
    label: 'Home',
    key: 'home',
    url: '/',
  },
]

class Header extends Component {
  render() {
    return (
      <header className="app-header">
        <nav className="app-navbar navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
          <div className="container">
            <div className="navbar-spread">
              <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#siteNav" aria-controls="sideNavContent"
                aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
              <Link to="/" className="navbar-brand">Little Choices</Link>
              <div className="collapse navbar-collapse" id="siteNav">
                <ul className="navbar-nav">
                  {links.map((link) => {
                    return this.renderLink(link);
                  })}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }

  renderLink({key, label, url}) {
    const { pathname } = this.props;

    const linkClassNames = classNames('nav-item', {
      active: (url === pathname),
    });

    return (
      <li key={key} className={linkClassNames}>
        <Link to={url} className="nav-link">{label}</Link>
      </li>
    );
  }
}

Header.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default Header;
