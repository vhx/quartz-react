import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop } from '../util';
import classNames from 'classnames';

import styles from './Pagination.scss';

const MAX_VISIBLE_LINKS = 7;

const Separator = () => (
  <span className={styles.paginationSeparator}>...</span>
);


class Pagination extends Component {
  constructor() {
    super();
    this.link = this.link.bind(this);
    this.links = this.links.bind(this);
  }

  link(i) {
    const { currentIndex, onPageChange } = this.props;

    const activePaginationButton = (currentIndex, i) => {
      return classNames({
        [styles.paginationButtonActive]: currentIndex === i,
        [styles.paginationButton]: currentIndex !== i,
      })
    }
    return (
      <span className={activePaginationButton(currentIndex, i)} onClick={() => onPageChange(i)} key={`link-${i}`}>
        {i + 1}
      </span>
    );
  }

  links() {
    const { currentIndex, length } = this.props;
    const { link } = this;
    const truncateBefore = currentIndex > 3 && length > MAX_VISIBLE_LINKS;
    const truncateAfter = currentIndex < length - 4 && length > MAX_VISIBLE_LINKS;
    const links = [];
    if (truncateBefore) links.push(<Separator key='sep-0' />);
    if (truncateBefore && truncateAfter) {
      links.push(link(currentIndex - 1));
      links.push(link(currentIndex));
      links.push(link(currentIndex + 1));
    } else if (truncateBefore) {
      links.push(link(length - 5));
      links.push(link(length - 4));
      links.push(link(length - 3));
      links.push(link(length - 2));
    } else if (truncateAfter) {
      links.push(link(1));
      links.push(link(2));
      links.push(link(3));
      links.push(link(4));
    } else if (length > 1) {
      for (let i = 1; i < length - 1; i++) links.push(link(i));
    }
    if (truncateAfter) links.push(<Separator key={`sep-${currentIndex + 2}`} />);
    return links;
  }

  render() {
    const { link, links } = this;
    const { currentIndex, onPageChange, length } = this.props;

    if (length === 0) return <nav />;
    if (length === 1) return <nav className='text-center'>{link(0)}</nav>;

    // NOTE: we toggle the visibility of the "Previous"/"Next" links rather than removing those links altogether so that the layout doesn't re-center when those links disappear

    const paginationLinkClassesEnd = (currentIndex, length) => {
      const isEnd = currentIndex === length - 1;
      return classNames({
        [styles.paginationLink]: isEnd === false,
        [styles.paginationLinkInvisible]: isEnd === true,
      })
    }

    const paginationLinkClassesStart = (currentIndex, length) => {
      const afterStart = currentIndex !== 0;
      return classNames({
        [styles.paginationLink]: afterStart === true,
        [styles.paginationLinkInvisible]: afterStart === false,
      })
    }

    return (
      <nav className='text-center'>
        <span className={paginationLinkClassesStart(currentIndex, length)} onClick={() => onPageChange(currentIndex - 1) }>← Previous</span>
        { link(0) /* hard-code first pagination link */ }
        { links() /* dynamically generate range between first and last link */ }
        { link(length - 1)/* hard-code last pagination link */ }
        <span className={paginationLinkClassesEnd(currentIndex, length)} onClick={() => onPageChange(currentIndex + 1)}>Next →</span>
      </nav>
    );
  }
}


Pagination.propTypes = {
  currentIndex: PropTypes.number,
  length: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
  currentIndex: 0,
  onPageChange: noop,
};

Pagination.propDescriptions = {
  onPageChange: 'onPageChange(newIndex)',
};

export default Pagination;
