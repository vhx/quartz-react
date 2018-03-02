/* eslint-disable react/no-unused-prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon';
import { KEY_CODES } from '../util/constants';
import { If, connect } from '../util';
import modalModel from './modalModel.jsx';

import styles from './Modal.scss';


const modalActionContainerClasses = (size) => {
  return classNames('c-modal-container', {
    [styles.smallActionModal]: size === 'small',
    [styles.mediumActionModal]: size === 'medium',
    [styles.largeActionModal]: size === 'large',
  })
}

const modalContainerClasses = (size) => {
  return classNames('c-modal-container', {
    [styles.smallModal]: size === 'small',
    [styles.mediumModal]: size === 'medium',
    [styles.largeModal]: size === 'large',
  })
}

function getActionClass({ actions, index }) {
  return classNames({
    btn: true,
    'btn--half': actions.length > 1,
    'btn--fill': actions.length <= 1,
  }, `btn-${actions[index].color || 'gray'}`);
}

function handleEscapeKey(event) {
  if (event.keyCode === KEY_CODES.ESC) {
    modalModel.close();
  }
}

// Count number of mounted <Modal /> components
// so that we can warn if more than 1 exist
let modalsInitialized = 0;

class Modal extends Component {
  constructor() {
    super();
    this.el = null;

    this.containerClasses = this.containerClasses.bind(this);
  }

  componentWillMount() {
    if (modalsInitialized !== 0) {
      console.error('<Modal /> must be mounted only once'); // eslint-disable-line no-console
    }
    modalsInitialized++;
    window.addEventListener('keyup', handleEscapeKey);
  }

  componentDidMount() {
    const margin = parseInt(this.el.outerHeight / 2, 10);
    this.el.style.marginBottom = `${margin}px`;
  }

  componentWillUnmount() {
    modalsInitialized--;
    window.removeEventListener('keyup', handleEscapeKey);
  }

  containerClasses() {
    return (this.actions === true) ? modalActionContainerClasses(this.size) : modalContainerClasses(this.size)
  }

  render() {
    const { actions, body, isOpen, size, title } = this.props;
    return (
      <div className={`c-modal ${isOpen ? 'is-open' : ''}`}>
        <div className={this.containerClasses()} ref={(el) => { this.el = el; }}>
          <div className={styles.modalHeader}>
            <span>
              <div className={styles.modalTitle}>{title}</div>
            </span>
          </div>
          <div className={styles.modalBody}>{body}</div>
          <If condition={actions.length !== 0}>
            <div className={styles.modalActionContainer}>
              <div className={styles.modalActionPosition}>
                {
                  actions.map((action, index) => (
                    <div
                      onClick={actions[index].callback}
                      key={action.label}
                      className={getActionClass({ actions, index })}
                    >
                      {actions[index].label}
                    </div>
                  ))
                }
              </div>
            </div>
          </If>
          <div className='c-modal--close' onClick={modalModel.close}>
            <Icon size='xsmall' color='white' name='x' />
          </div>
        </div>
        <div className='c-modal-bg' onClick={modalModel.close} />
      </div>
    );
  }
}

Modal.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string,
    label: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired,
  })).isRequired,
  body: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  size: PropTypes.string,
  title: PropTypes.string,
};

Modal.defaultProps = {
  size: 'medium',
  title: '',
};

export default connect(modalModel, Modal);
