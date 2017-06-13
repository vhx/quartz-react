import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { truncate } from '../util';

function getClass(isHover) {
  return classNames({
    inline: true,
    relative: true,
    'c-tag': true,
    'is-hover': isHover,
  });
}

function getButtonClass(isHover, isProcessing) {
  return classNames({
    'c-tag--button': true,
    'btn-teal': isHover,
    'is-hover': isHover,
    'btn-gray': !isHover,
    'is-processing': isProcessing,
  });
}

function getLinkClass(isRemoveHover) {
  return classNames({
    'c-tag--remove': true,
    'icon--center': true,
    'icon-x-white': true,
    'icon--xxsmall': true,
    'btn-red': isRemoveHover,
    'btn-teal': !isRemoveHover,
  });
}


class Tag extends Component {

  constructor() {
    super();
    this.state = {
      isHover: false,
      isRemoveHover: false,
    };
    this.setHover = this.setHover.bind(this);
    this.setRemoveHover = this.setRemoveHover.bind(this);
  }

  setHover(value) {
    return () => this.setState({ isHover: value });
  }

  setRemoveHover(value) {
    return () => this.setState({ isRemoveHover: value });
  }

  render() {
    const { label, maxLength, isProcessing, onClick, onRemove } = this.props;
    const { isHover, isRemoveHover } = this.state;
    const { setHover, setRemoveHover } = this;
    return (
      <span className={getClass(isHover)} onMouseOver={setHover(true)} onMouseOut={setHover(false)}>
        <button className={getButtonClass(isHover, isProcessing)} onClick={onClick}>
          { truncate(label, maxLength) }
        </button>
        <a
          className={getLinkClass(isRemoveHover)}
          onClick={onRemove}
          onMouseOver={setRemoveHover(true)}
          onMouseOut={setRemoveHover(false)}
        />
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
