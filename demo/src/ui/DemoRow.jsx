import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        <div className='column small-8 padding-reset'>
          <div className='guide-bar' style={{ minHeight: `${this.state.codeHeight}px` }}>{this.props.children}</div>
        </div>
        <div className='column small-8 padding-reset' ref={this.setHeightOnce}>
          <div className='code-bar'>
            <pre className='padding-medium'>
              <code dangerouslySetInnerHTML={this.markupCode()} />
            </pre>
          </div>
        </div>
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
