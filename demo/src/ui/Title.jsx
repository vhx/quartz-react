import React from 'react';
import PropTypes from 'prop-types';
import { Text, util } from '../../../index.js';
import { slug } from '../util';

const Title = ({ children, tag }) => (
  <div className='padding-top-large' id={slug(children)}>
    <Text h3 className='text--bold'>{children}</Text>
    <util.If inline condition={Boolean(tag)}>
      <span className='bg-gray-1 border border--radius padding-vert-xsmall padding-horz-small margin-left-medium text--gray'>{tag}</span>
    </util.If>
  </div>
);

Title.propTypes = {
  children: PropTypes.string.isRequired,
  tag: PropTypes.string,
};

Title.defaultProps = {
  tag: '',
};

export default Title;
