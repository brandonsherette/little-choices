import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

require('./choice.details.scss');

class ChoiceDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeOptionIndex: null,
      isPickingOption: false,
    };

    this.intervalId = null;
    this.PICKING_INTERVAL_SPEED = 300;
  }

  componentWillUnmount() {
    // make sure to clear up the interval if component is going to unmount
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }
  }

  handlePickOption() {
    // ignore picking an option if already in the picking process
    if (this.state.isPickingOption) {
      return;
    }

    this.setState({
      activeOptionIndex: (this.state.activeOptionIndex) ? this.state.activeOptionIndex : 0,
      isPickingOption: true,
    });

    const { item: { options } } = this.props;
    // randomly choose an option
    const targetIndex = Math.floor(Math.random() * (options.length));
    const minNumOfIterations = options.length;
    let curIteration = 0;
    
    // simulate randomly choosing
    this.intervalId = window.setInterval(() => {
      const { activeOptionIndex } = this.state;

      if (curIteration >= minNumOfIterations && targetIndex === activeOptionIndex) {
        // found correct match and have simulated the transition long enough
        // clear the interval since we are done
        window.clearInterval(this.intervalId);
        this.setState({
          isPickingOption: false,
        });

        // since we are done finding the target option, prevent further execution
        return;
      }

      this.setState({
        activeOptionIndex: (activeOptionIndex < options.length -1) ? activeOptionIndex + 1 : 0,
      });

      curIteration += 1;
    }, this.PICKING_INTERVAL_SPEED);
  }

  render() {
    const { handleShowEditForm, handleRemoveItem, handleReturnToList, item } = this.props;
    const { activeOptionIndex, isPickingOption } = this.state;
    // need to give handlePickOption the "this" context so it can call the instance methods correctly
    const handlePickOption = this.handlePickOption.bind(this);

    return (
      <div className="choice-details">
        <p><button type="button" onClick={handleReturnToList} className="btn btn-link"><small><i className="fa fa-caret-left"></i>&nbsp;return</small></button></p>
        <div className="ele-group">
          <h3 className="font-primary">{item.name}</h3>
          <button type="button" className="btn btn-link" onClick={e => handleShowEditForm(item)}><i className="fa fa-pencil"></i>&nbsp;Edit</button>
          <button type="button" className="btn btn-link text-danger" onClick={e => handleRemoveItem(item)}><i className="fa fa-times-circle"></i>&nbsp;Delete</button>
        </div>
        <div className="choice-options py-2">
          <h5>Choice Options</h5>
          {item.options.map((option, index) => {
            const optionStyles = classNames('card choice-option text-center', {
              'passing': (isPickingOption && activeOptionIndex === index),
              'active': (!isPickingOption && activeOptionIndex === index),
            });

            return (
              <div className={optionStyles} key={'choice-option-' + option}>
                <div className="card-header">{option}</div>
              </div>
            );
          })}
        </div>
        <div className="py-2 text-center">
          <button type="button" disabled={isPickingOption} className="btn btn-lg btn-primary" onClick={handlePickOption}>Pick Option</button>
        </div>
      </div>
    );
  }
}

ChoiceDetails.propTypes = {
  handleReturnToList: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired, /* define however the item model is suppose to look like */
};

export default ChoiceDetails;