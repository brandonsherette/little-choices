import React from 'react';

require('./footer.scss');

const YEAR = new Date().getFullYear();

const Footer = () => (
  <div className="app-footer">
    <div className="container">
        <ul className="list-unstyled text-center pt-3">
          <li><a href="#" target="_blank"><i className="fa fa-facebook-square fa-2x"></i></a></li>
          <li><a href="#" target="_blank"><i className="fa fa-twitter-square fa-2x"></i></a></li>
        </ul>
      <p className="text-center">&copy; {YEAR} Little Choices</p>
    </div>
  </div>
);

export default Footer;