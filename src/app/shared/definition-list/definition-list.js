import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Item from './item';
import Title from './title';
import Body from './body';

// require styles
require('./definition-list.scss');

class DefinitionList extends Component {
  render() {
    const { body, className, children, title } = this.props;

    if (title && body) {
      return (
        <div className={`definition-list ${className || ''}`}>
          <Item>
            <Title>{title}</Title>
            <Body>{body}</Body>
          </Item>
        </div>
      );
    }

    return (
      <div className={`definition-list ${className || ''}`}>{children}</div>
    );
  }
}

DefinitionList.propTypes= {
  title: PropTypes.any,
  body: PropTypes.any,
};
DefinitionList.Item = Item;
DefinitionList.Title = Title;
DefinitionList.Body = Body;

export default DefinitionList;