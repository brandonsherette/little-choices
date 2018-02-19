import React from 'react';
import PropTypes from 'prop-types';

require('./roundabout.scss');

export default class Roundabout extends React.Component {
  constructor() {
    super();

    this.state = {
      dragStart: 0,
      dragStartTime: new Date(),
      index: 0,
      lastIndex: 0,
      raContainerWidth: 0,
      raSlideWidth: 0,
      transition: false
    };
  }

  componentDidMount() {
    this.evalSlideDimensions();
  }

  componentDidUpdate() {
    this.evalSlideDimensions();
  }

  componentWillMount() {
    const { selected } = this.props;

    this.setState({
      index: selected,
      lastIndex: selected
    });
  }

  componentWillReceiveProps(nextProps) {
    const { selected } = this.props;

    if (selected !== nextProps.selected) {
      this.goToSlide(nextProps.selected);
    }
  }

  evalSlideDimensions() {
    // find dimension
    let raContainerWidth = 0;
    React.Children.forEach(this.props.children, (child) => {
      raContainerWidth += (this.refs[`slide-${child.key}`].offsetWidth);
    });

    const raSlideWidth = raContainerWidth / this.props.children.length;

    if (this.state.raContainerWidth !== raContainerWidth || this.state.raSlideWidth !== raSlideWidth) {
      // update the state
      this.setState({
        raContainerWidth,
        raSlideWidth,
      });
    }
  }

  getDragX(event, isTouch) {
    return isTouch ? event.touches[0].pageX : event.pageX;
  }

  handleDragStart(event, isTouch) {
    const x = this.getDragX(event, isTouch);

    this.setState({
      dragStart: x,
      dragStartTime: new Date(),
      transition: false,
      slideWidth: this.refs.slider.offsetWidth
    });
  }

  handleDragMove(event, isTouch) {
    const { dragStart, lastIndex, slideWidth } = this.state;
    const x = this.getDragX(event, isTouch);
    const offset = dragStart - x;
    const percentageOffset = offset / slideWidth;
    const newIndex = lastIndex + percentageOffset;
    const SCROLL_OFFSET_TO_STOP_SCROLL = 30;

    // Stop scrolling if you slide more than 30 pixels
    if (Math.abs(offset) > SCROLL_OFFSET_TO_STOP_SCROLL) {
      event.stopPropagation();
      event.preventDefault();
    }

    this.setState({
      index: newIndex
    });
  }

  handleDragEnd() {
    const { children } = this.props;
    const { dragStartTime, index, lastIndex } = this.state;

    const timeElapsed = new Date().getTime() - dragStartTime.getTime();
    const offset = lastIndex - index;
    const velocity = Math.round(offset / timeElapsed * 10000);
    const endIndex = this.getEndIndex();

    let newIndex = Math.round(index);

    if (Math.abs(velocity) > 5) {
      newIndex = velocity < 0 ? lastIndex + 1 : lastIndex - 1;
    }

    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= endIndex) {
      newIndex = endIndex;
    }

    this.setState({
      dragStart: 0,
      index: newIndex,
      lastIndex: newIndex,
      transition: true
    });
  }

  getEndIndex() {
    const { children } = this.props;
    const { slideWidth, raSlideWidth } = this.state;
    const endIndex = children.length / Math.floor(slideWidth / raSlideWidth) - 1;
    
    return endIndex;
  }

  goToSlide(index, event) {
    const { children, loop } = this.props;
    const endIndex = this.getEndIndex();

    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (index < 0) {
      index = loop ? endIndex : 0;
    } else if (index >= endIndex) {
      index = loop ? 0 : endIndex;
    }

    this.setState({
      index: index,
      lastIndex: index,
      transition: true
    });
  }

  renderNav() {
    const { children } = this.props;
    const { lastIndex } = this.state;

    const nav = children.map((slide, index) => {
      const buttonClasses = index === lastIndex ? 'Slider-navButton Slider-navButton--active' : 'Slider-navButton';

      return (
        <button key={index} className={buttonClasses} onClick={(event) => this.goToSlide(index, event)} />
      );
    });

    return (
      <div className="Slider-nav">{nav}</div>
    );
  }

  renderArrows() {
    const { children, loop, showNav } = this.props;
    const { lastIndex } = this.state;
    const arrowsClasses = showNav ? 'Slider-arrows' : 'Slider-arrows Slider-arrows--noNav';

    return (
      <div className={arrowsClasses}>
        {loop || lastIndex > 0 ?
          <button
            className="Slider-arrow Slider-arrow--left"
            onClick={(event) => this.goToSlide(lastIndex - 1, event)} /> : null}
        {loop || lastIndex < children.length - 1 ?
          <button
            className="Slider-arrow Slider-arrow--right"
            onClick={(event) => this.goToSlide(lastIndex + 1, event)} /> : null}
      </div>
    );
  }

  render() {
    const { children, showArrows, showNav } = this.props;
    const { index, raContainerWidth, raSlideWidth, slideWidth, transition } = this.state;
    const numOfViewableSlides = (slideWidth && raSlideWidth) 
      ? Math.floor(slideWidth / raSlideWidth)
      : 0;

    const slidesStyles = {
      width: `${raContainerWidth}px`,
      transform: `translate(${-1 * index * raSlideWidth * numOfViewableSlides}px)`,
    };
    const slidesClasses = transition ? 'Slider-slides Slider-slides--transition' : 'Slider-slides';

    return (
      <div className="Slider" ref="slider">
        {showArrows && this.renderArrows()}
        {showNav && this.renderNav()}
        <div
          className="Slider-inner"
          onTouchStart={(event) => this.handleDragStart(event, true)}
          onTouchMove={(event) => this.handleDragMove(event, true)}
          onTouchEnd={() => this.handleDragEnd(true)}>
          <div
            className={slidesClasses}
            style={slidesStyles}>
            {React.Children.map(this.props.children, (child) => {
              return (<div ref={`slide-${child.key}`} className="roundabout-slide">{child}</div>);
            })}
          </div>
        </div>
      </div>
    );
  }
}

Roundabout.defaultProps = {
  loop: false,
  selected: 0,
  showArrows: true,
  showNav: true
};

Roundabout.propTypes = {
  loop: PropTypes.bool,
  selected: PropTypes.number,
  showArrows: PropTypes.bool,
  showNav: PropTypes.bool,
  children: PropTypes.any
};