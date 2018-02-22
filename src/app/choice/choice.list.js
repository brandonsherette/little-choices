import React, { Component } from 'react';
import PropTypes from 'prop-types';

require('./choice.list.scss');

class ChoiceList extends Component {
  render() {
    const { items, handleShowEditForm, handleViewItemDetails } = this.props;

    return (
      <div className="choice-list">
        <h3 className="text-right"><button type="button" onClick={(e) => { handleShowEditForm(null) }} className="btn btn-link"><i className="fa fa-plus"></i> Add New List</button></h3>
        {items.length === 0 && (
          <div className="alert alert-warning"><i className="fa fa-exclamation-triangle"></i>&nbsp;0 Items Found</div>
        )}
        <div className="card-list text-center">
          {items.map((item) => {
            return (
              <div className="choice-item" key={'choice-list-item-' + item.id}>
                <div role="button" className="choice-item card" onClick={() => { handleViewItemDetails(item) }}>
                  <div className="card-header">
                    <h3 role="button" onClick={() => { handleViewItemDetails(item) }}>{item.name}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  }
}

ChoiceList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleViewItemDetails: PropTypes.func.isRequired,
};

export default ChoiceList;