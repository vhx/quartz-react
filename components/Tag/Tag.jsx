import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon';
import { truncate } from '../util';


function getButtonClass(isProcessing, isHovering, isLeft) {
  return classNames({
    'is-processing': isProcessing,
    'btn-teal': isHovering,
    'btn-gray': !isHovering,
    'tagLeft':isLeft,
    'tagRight': !isLeft
  });
}


class Tag extends Component {

  constructor() {
    super();

    this.state = {
      isHovering:false,
      isHoveringOverX:false
    }

    this.handleRemove = this.handleRemove.bind(this);
    this.getXColor = this.getXColor.bind(this);
  }

  handleRemove (event) {

    console.log('click')
    if(this.props.onRemove) {
      this.props.onRemove();
    }
  }

  getXColor (isHovering, isHoveringOverX) {
    if(isHoveringOverX) {
      return null;
    } else if(isHovering){
      return 'white';
    } else {
      return 'gray';
    }
  }

  render() {
    const { label, maxLength, isProcessing, onClick, onRemove } = this.props;

    return (
      <span onMouseOver={() => this.setState({isHovering:true})} onMouseOut={() => this.setState({isHovering:false})}>
        <button onClick={onClick} className={getButtonClass(isProcessing, this.state.isHovering,true)}>
          { truncate(label, maxLength) }
        </button>
        <button
          onClick={this.handleRemove}
          className={getButtonClass(false, this.state.isHovering,false)}
          onMouseOver={() => this.setState({isHoveringOverX:true})}
          onMouseOut={() => this.setState({isHoveringOverX:false})}>

          <Icon name='x' color={this.getXColor(this.state.isHovering,this.state.isHoveringOverX)} size='xxsmall'></Icon>
        </button>
      </span>
    );
  }

}


Tag.propTypes = {
  label: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  isProcessing: PropTypes.bool,
  onClick: PropTypes.func,
  onRemove: PropTypes.func,
};

Tag.defaultProps = {
  maxLength: Infinity,
  isProcessing: false,
  onClick: null,
  onRemove: null,
};

export default Tag;
