import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from '../../../index.js';
import {
  Block,
  DemoRow,
  Subtitle,
  Title,
} from '../ui';

class StatefulPagination extends Component {
  constructor() {
    super();
    this.state = { selectedIndex: 0 };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }

  render() {
    return (
      <Pagination currentIndex={this.state.selectedIndex} length={this.props.length} onChange={this.updateIndex} />
    );
  }
}

const PaginatorDemo = () => (
  <div>
    {
      Array(9).fill(true).map((_, i) => (
        <div key={i}>
          <Subtitle>Page count: {i + 1}</Subtitle>
          <StatefulPagination length={i + 1} />
        </div>
      ))
    }
  </div>
);

const paginatorCode = `
(test)
`;


// Main exported demo
// -----------------------------------------

const Paginators = ({ title }) => (
  <div>
    <DemoRow><Title>{title}</Title></DemoRow>
    <DemoRow code={paginatorCode}><PaginatorDemo /></DemoRow>
  </div>
);

Paginators.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Paginators;
