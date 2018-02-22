import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ModalAbstract } from 'redux-modal-viewer';
import { reduxForm } from 'redux-form';
import { FormComponents, Normalize } from 'redux-form-ext';
import { save } from './actions';

require('./modal.choice-list-form.scss');

const FORM_NAME = 'choiceList';

class ModalChoiceListForm extends ModalAbstract {
  getModalProps() {
    return {
      modalProps: {
        bsSize: null,
        backdrop: true
      },
      headerProps: {
        closeButton: true,
      },
      titleProps: {
        componentClass: 'div'
      },
      bodyProps: null,
      footerProps: null,
    };
  }

  renderTitle() {
    const { item } = this.props;
    const title = (item && item.id) ? 'Edit ' + item.name : 'New Choice List';

    return (
      <h4>{title}</h4>
    )
  }

  renderBody() {
    const { formValues, handleSave, handleSubmit, item } = this.props;

    return (
      <div className="modal-choice-edit-form">
        <form onSubmit={handleSubmit((values) => {handleSave(item, values)})}>
          <FormComponents.Text
            label="List Name"
            placeholder="List Name"
            name="name"
            isLabelInline={false}
            normalize={Normalize.title}
          />
          <FormComponents.Text
            label="List Options (comma separated)"
            placeholder="option1, option2, option3, etc..."
            name="options"
            isLabelInline={false}
          />
          <div className="text-center">
            <button type="submit" className="btn btn-primary"><i className="fa fa-floppy-o"></i>&nbsp;Save</button>
          </div>
        </form>
      </div>
    );
  }

  renderFooter() {
    return null;
  }
}

const Form = reduxForm({
  'form': FORM_NAME,
  'validate': (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Required';
    }

    if (!values.options) {
      errors.options = 'Required';
    }

    return errors;
  },
})(ModalChoiceListForm);

const mapStateToProps = (state) => {
  const item = state.choice.editItem;
  // replace options as a string value
  const initialValues = (!item) ? {} : Object.assign({}, item, {
    options: item.options.join(', '),
  });

  return {
    formValues: state.form[FORM_NAME],
    initialValues,
    item,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSave: (item, values) => {
      dispatch(save(Object.assign({}, item, values)));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);