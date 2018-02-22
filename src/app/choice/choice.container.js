import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetch, remove, save, setActiveItem, setEditItem } from './actions';
import ComponentLoader from 'react-component-loader';
import ChoiceList from './choice.list';
import ChoiceDetails from './choice.details';
import { closeModal, openModal } from 'redux-modal-viewer';

require('./choice.container.scss');

class Choice extends Component {
  componentDidMount() {
    this.props.handleFetch();
  }

  render() {
    const { activeItem, error, hasActiveItem, handleFetch, isLoaded, itemList } = this.props;

    return (
      <div className="choice-wrapper">
        <ComponentLoader isLoaded={isLoaded} error={error} handleReload={handleFetch}>
          { !hasActiveItem && (
            <ChoiceList {...this.props} items={itemList} />
          )}
          {hasActiveItem && (
            <ChoiceDetails {...this.props} item={activeItem} />
          )}
        </ComponentLoader>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { activeItem, error, isFetched, isLoading, itemList } = state.choice;

  return {
    activeItem,
    error,
    isLoaded: (isFetched && !isLoading),
    itemList,
    hasActiveItem: (activeItem) ? true : false,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSaveItem: (item) => {
      dispatch(save(item));
    },

    handleShowEditForm: (item) => {
      dispatch(setEditItem(item));
      dispatch(openModal('ModalChoiceListForm'));
    },

    handleFetch: () => {
      dispatch(fetch());
    },

    handleRemoveItem: (item) => {
      dispatch(openModal('ModalConfirm', {
        title: `Confirm Deletion`,
        body: (
          <div>
            <p>Are you sure you want to delete {item.name}?</p>
          </div>
        ),
        handleCancel: () => {
          dispatch(closeModal('ModalConfirm'));
        },
        handleConfirm: () => {
          dispatch(remove(item));
          dispatch(closeModal('ModalConfirm'));
        }
      }));
    },

    handleReturnToList: () => {
      dispatch(setActiveItem(null));
    },

    handleViewItemDetails: (item) => {
      dispatch(setActiveItem(item));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Choice);