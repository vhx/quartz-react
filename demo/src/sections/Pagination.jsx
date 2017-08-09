import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from '../../../index.js';
import {
  DemoRow,
  Details,
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

StatefulPagination.propTypes = {
  length: PropTypes.number.isRequired,
};

const PaginatorDemo = () => (
  <div>
    {
      [1, 2, 7, 8, 9].map(i => (
        <div key={i}>
          <Subtitle>Demo page count: {i}</Subtitle>
          <StatefulPagination length={i} />
        </div>
      ))
    }
  </div>
);

const paginatorCode = `
// A stateful implementation:
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
    const i = this.state.selectedIndex;
    const length = this.props.length;
    return (
      <Pagination currentIndex={i} length={length} onChange={this.updateIndex} />
    );
  }
}
`;


// Main exported demo
// -----------------------------------------

const Paginators = ({ title }) => (
  <div>
    <DemoRow>
      <Title>{title}</Title>
      <Details>
        The <code>Pagination</code> component displays up to 7 page links and a
        possible "Previous" or "Next" link when appropriate. It will also call
        an <code>onChange</code> callback with the index of the new selected
        link whenever one of the links (or "Previous"/"Next") is clicked.
      </Details>
    </DemoRow>
    <DemoRow code={paginatorCode}><PaginatorDemo /></DemoRow>
  </div>
);

Paginators.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Paginators;
