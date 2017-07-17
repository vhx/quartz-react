/* eslint-disable react/no-unused-prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon';
import { KEY_CODES } from '../util/constants';
import { If, connect } from '../util';
import modalModel from './modalModel';


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

class Modal extends Component {
  constructor() {
    super();
    this.el = null;
  }

  componentWillMount() {
    window.addEventListener('keyup', handleEscapeKey);
  }

  componentDidMount() {
    const margin = parseInt(this.el.outerHeight / 2, 10);
    this.el.style.marginBottom = `${margin}px`;
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', handleEscapeKey);
  }

  render() {
    const { actions, body, isOpen, size, title } = this.props;
    return (
      <div className={`c-modal ${isOpen ? 'is-open' : ''}`}>
        <div className={`c-modal-container ${actions.length !== 0 ? 'c-modal--has-actions' : ''} c-modal--${size}`} ref={(el) => { this.el = el; }}>
          <div className='c-modal--header padding-medium'>
            <span>
              <div className='h2 head-4 head secondary text-left'>{title}</div>
            </span>
          </div>
          <div className='c-modal--body padding-medium'>{body}</div>
          <If condition={actions.length !== 0}>
            <div className='c-modal--actions'>
              <div className='padding-small text-center'>
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
