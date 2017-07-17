/* eslint-disable react/no-unused-prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import { If } from '../util';
import modalModel from './modalModel';


function getActionClass({ actions, index }) {
  return classNames({
    btn: true,
    'btn--half': actions.length > 1,
    'btn--fill': actions.length <= 1,
  }, `btn-${actions[index].color || 'gray'}`);
}

function handleEscapeKey(event) {
  const ESC_KEYCODE = 27;
  if (event.keyCode === ESC_KEYCODE) {
    modalModel.close();
  }
}

class Modal extends Component {
  constructor() {
    super();
    this.state = modalModel.state;
    this.el = null;
    this.update = this.update.bind(this);
  }

  componentWillMount() {
    window.addEventListener('keyup', handleEscapeKey);
    modalModel.subscribe(this.update);
  }

  componentDidMount() {
    const margin = parseInt(this.el.outerHeight / 2, 10);
    this.el.style.marginBottom = `${margin}px`;
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', handleEscapeKey);
    modalModel.unsubscribe(this.update);
  }

  update(state) {
    this.setState(state);
  }

  render() {
    const { actions, body, isOpen, size, title } = this.state;
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

Modal.close = modalModel.close;
Modal.open = modalModel.open;

export default Modal;
