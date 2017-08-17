import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { util } from '../../index.js';

const { If } = util;

class DemoRow extends Component {
  constructor() {
    super();
    this.state = { codeHeight: null };
    this.markupCode = this.markupCode.bind(this);
    this.setHeightOnce = this.setHeightOnce.bind(this);
  }

  setHeightOnce(el) {
    if (el && this.state.codeHeight === null) {
      this.setState({ codeHeight: el.clientHeight });
    }
  }

  markupCode() {
    return { __html: window.Prism.highlight(this.props.code, window.Prism.languages.jsx) };
  }

  render() {
    return (
      <div className='row'>
        <div className='column small-16 medium-16 large-16 xlarge-10 padding-reset'>
          <div className='guide-bar' style={{ minHeight: `${this.state.codeHeight}px` }}>{this.props.children}</div>
        </div>
        <If condition={Boolean(this.props.code)}>
          <div className='column small-0 medium-0 large-0 xlarge-6 padding-reset' ref={this.setHeightOnce}>
            <div className='code-bar'>
              <pre className='padding-medium'>
                <code dangerouslySetInnerHTML={this.markupCode()} />
              </pre>
            </div>
          </div>
        </If>
      </div>
    );
  }
}
DemoRow.propTypes = {
  children: PropTypes.node.isRequired,
  code: PropTypes.string,
};

DemoRow.defaultProps = {
  code: '',
};

export default DemoRow;
