import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { If } from '../util';
    // index: {index}
    // <br />
    // index2: {index2}
    // <br />
    // zIndex: {zIndex}

class Slide extends Component {
  render() {
    const { animationDuration, children, enter, enterDirection, exitDirection, zIndex } = this.props;
    return (
      <div className={`slide ${exitDirection} ${enter ? `ENTER_${enterDirection}` : ''}`} style={{ zIndex, animationDuration: `${animationDuration}ms` }}>
        {children}
      </div>
    );
  }
}

Slide.propTypes = {
  animationDuration: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  enter: PropTypes.bool.isRequired,
  enterDirection: PropTypes.oneOf([ 'TO_LEFT', 'TO_RIGHT' ]).isRequired,
  exitDirection: PropTypes.oneOf([ '', 'TO_LEFT', 'TO_RIGHT' ]),
  zIndex: PropTypes.string.isRequired,
};

Slide.defaultProps = {
  exitDirection: '',
};

// function getClass({ isActive, isExitingLeft, isExitingRight }) {
//   return classNames({
//     slide: true,
//     isActive,
//     isExitingLeft,
//     isExitingRight,
//     // isGoingPrev,
//     // isGoingNext,
//   });
// }

// const Slide = props => (
//   <div className={getClass(props)}>
//     <div className='slide-background-wrap'>
//       <div className='slide-background'>
//         <span className='slide-background-gradient--left' />
//         <img className='slide-background-img' src='http://lorempizza.com/1600/900/2' alt='foo' />
//         <div className='slide-background-gradient--frame' />
//       </div>
//     </div>
//   </div>
// );

// Slide.propTypes = {
//   // img: PropTypes.string.isRequired,
//   currentSlide: PropTypes.number.isRequired,
//   isActive: PropTypes.bool.isRequired,
//   isExitingLeft: PropTypes.bool.isRequired,
//   isExitingRight: PropTypes.bool.isRequired,
// };

export default Slide;
