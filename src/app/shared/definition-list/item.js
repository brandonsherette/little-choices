import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Body from './body';
import Title from './title';

class Item extends Component {
  render() {
    const { body, className, children, title } = this.props;
    let itemClassNames = 'definition-list__item';
    if (className) {
      itemClassNames += ' ' + className;
    }

    if (body && title) {
      return (
        <div className={itemClassNames}>
          <Title>{title}</Title>
          <Body>{body}</Body>
        </div>
      );
    }

    return (
      <div className={itemClassNames}>
        {children}
      </div>
    );
  }
}

Item.propTypes = {
  body: PropTypes.any,
  title: PropTypes.any
};

export default Item;