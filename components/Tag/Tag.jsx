import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { truncate } from '../util';

import styles from './Tag.scss';

function getClass(isHover) {
  return classNames({
    [styles.tag]: true,
    [styles.tagHover]: isHover,
  });
}

function getButtonClass(isHover, isProcessing) {
  return classNames({
    'c-tag--button': true,
    [styles.tagButtonBlue]: isHover,
    [styles.tagButtonGray]: !isHover,
    [styles.tagProcessing]: isProcessing,
  });
}

function getLinkClass(isHover) {
  return classNames({
    [styles.hoverCloseButton]: isHover,
    [styles.closeButton]: !isHover,
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
      <span className={styles.tag} onMouseOver={setHover(true)} onMouseOut={setHover(false)}>
        <button className={styles.tagHoverButton} onClick={onClick}>
          { truncate(label, maxLength) }
        </button>
        <a
          className={getLinkClass(isHover)}
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
