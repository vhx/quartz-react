'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var classNames = _interopDefault(require('classnames'));

var If = function (ref) {
  var condition = ref.condition;
  var children = ref.children;
  var inline = ref.inline;

  return (condition ? React__default.createElement( 'span', { className: inline ? '' : 'block' }, children) : React__default.createElement( 'span', null ));
};

If.propTypes = {
  condition: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  inline: PropTypes.bool,
};

If.defaultProps = {
  inline: false,
};

var toStr = Object.prototype.toString;

function Model$$1(ref) {
  var initialState = ref.initialState;
  var methods = ref.methods;

  var listeners = [];
  var notifyListeners = function (nextState) { return listeners.forEach(function (fn) { return fn(nextState); }); };

  var model = {
    state: Object.freeze(initialState),
    subscribe: function (fn) { return listeners.push(fn); },
    unsubscribe: function (fn) { return listeners.splice(listeners.indexOf(fn), 1); },
  };

  Object.keys(methods).forEach(function (method) {
    model[method] = function () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var updates = methods[method].apply(model, args);
      if (updates && toStr.call(updates) === '[object Object]') {
        model.state = immutableMerge(model.state, updates);
        notifyListeners(model.state);
      }
    };
  });

  return model;
}

function connect$$1(model, Component$$1) {
  function connectComponent(Component$$1) { // eslint-disable-line no-shadow
    return (function (superclass) {
      function ConnectedComponent() {
        superclass.call(this);
        this.update = this.update.bind(this);
      }

      if ( superclass ) ConnectedComponent.__proto__ = superclass;
      ConnectedComponent.prototype = Object.create( superclass && superclass.prototype );
      ConnectedComponent.prototype.constructor = ConnectedComponent;
      ConnectedComponent.prototype.componentWillMount = function componentWillMount () {
        model.subscribe(this.update);
      };
      ConnectedComponent.prototype.componentWillUnmount = function componentWillUnmount () {
        model.unsubscribe(this.update);
      };
      ConnectedComponent.prototype.shouldComponentUpdate = function shouldComponentUpdate () {
        return false;
      };
      ConnectedComponent.prototype.update = function update () {
        this.forceUpdate();
      };
      ConnectedComponent.prototype.render = function render () {
        return React__default.createElement(Component$$1, model.state);
      };

      return ConnectedComponent;
    }(React__default.PureComponent));
  }

  if (!Component$$1) { return connectComponent; } // this curries the function so you can also use it as a decorator
  return connectComponent(Component$$1);
}

/* eslint-disable no-param-reassign */

/*
<If condition={false}><MyComponent /></If> // MyComponent will not render
<If condition={true}><MyComponent /></If> // MyComponent will render
*/
/*
truncate('foo-bar-baz', 4);
=> 'foo-...'

truncate('foo', 4);
=> 'foo'
*/
function truncate(str, maxLength) {
  return str.length > maxLength ? str.slice(0, maxLength).concat('...') : str;
}


/*
excludeProps(['foo', 'baz'], {
  foo: 123,
  bar: 456,
  baz: 789,
  qux: 111
});
=> { bar: 456, qux: 012 }

This is useful when you want to pass all but a few props to an element. For instance:
<div {...props}>{props.children}</div> // NO! This is bad because `children` is not a valid html attribute.

For this case, you will want to exclude that prop:
<div {...excludeProps(['children'], props)}>{props.children}</div> // Much better
*/
function excludeProps(excludeList, props) {
  return Object.keys(props)
    .filter(function (propName) { return excludeList.indexOf(propName) === -1; })
    .reduce(function (finalProps, propName) {
      finalProps[propName] = props[propName]; // eslint-disable-line no-param-reassign
      return finalProps;
    }, {});
}


/*
multiSelect({ foo: true, bar: false }, 'foo');
=> { foo: false, bar: false }

multiSelect({ foo: true, bar: false, baz: false }, 'bar');
=> { foo: true, bar: true, baz: false }

(The source `options` object will not be modified.)
*/
function multiSelect(options, id) {
  return Object.assign({}, options, ( obj = {}, obj[id] = !options[id], obj ));
  var obj;
}


/*
select({ foo: true, bar: false }, 'foo');
=> { foo: false, bar: false }

select({ foo: true, bar: false, baz: false }, 'bar');
=> { foo: false, bar: true, baz: false }

(The source `options` object will not be modified.)
*/
function select(options, id) {
  var newOptions = Object.keys(options).reduce(function (obj, key) {
    obj[key] = false;
    obj[key] = key === id ? !options[key] : false; // either the option is the one that was just clicked to trigger this event, and we toggle it, or it's some other option and we set it to false
    return obj;
  }, {});
  newOptions[id] = !options[id];
  return newOptions;
}


/*
If there is a common misspelling of a prop, you can help developers out by using this propType. Usage:

MyComponent.propTypes = {
  autoFocus: PropTypes.bool,
  autofocus: typoPropType({ correct: 'autoFocus' })
}
*/
function typoPropType(ref) {
  var correct = ref.correct;

  return function typoPropTypeCheck(props, propName, componentName) {
    if (props[propName]) {
      console.warn(("You passed the prop `" + propName + "`, which is not supported, to the component `" + componentName + "`. Did you mean to pass `" + correct + "` instead?")); // eslint-disable-line no-console
      return false;
    }
  };
}


// given `aspectRatio` of "16:9" and width 1280
// => 720
function getAspectRatioHeight(aspectRatio, width) {
  var ref = aspectRatio.split(':').map(function (str) { return parseInt(str, 10); });
  var w = ref[0];
  var h = ref[1];
  var height = width / (w / h);
  return Math.floor(height); // round down to prevent possible single pixel black line
}


function immutableMerge() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return Object.freeze(Object.assign.apply(Object, [ {} ].concat( args )));
}


var utilities = Object.freeze({
	truncate: truncate,
	excludeProps: excludeProps,
	multiSelect: multiSelect,
	select: select,
	typoPropType: typoPropType,
	getAspectRatioHeight: getAspectRatioHeight,
	immutableMerge: immutableMerge,
	If: If,
	Model: Model$$1,
	connect: connect$$1
});

/* eslint-disable react/no-unused-prop-types */

var Avatar$1 = function (props) { return (
  React__default.createElement( 'span', { className: ("avatar color-teal avatar--" + (props.size)) },
    React__default.createElement( 'span', { className: "avatar-user user-avatar", style: {
      'backgroundImage': ("url('" + (props.image) + "')")    
    } })
    
  )
); };

Avatar$1.propTypes = {
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']),
  image: PropTypes.string
};

Avatar$1.defaultProps = {
  size: 'medium',
  image: ''
};

/* eslint-disable react/no-unused-prop-types */

function getClassName(ref) {
  var className = ref.className;
  var color = ref.color;
  var size = ref.size;
  var typeface = ref.typeface;
  var processing = ref.processing;

  return classNames('btn', className, {
    // core colors
    'btn-gray': color === 'gray',
    'btn-teal': color === 'teal',
    'btn-white': color === 'white',
    'btn-red': color === 'red',
    // alternate colors
    'btn-purple': color === 'purple',
    'btn-green': color === 'green',
    'btn-slate': color === 'slate',
    'btn-black': color === 'black',
    'btn-yellow': color === 'yellow',
    'btn-transparent': color === 'transparent',
    // brand colors
    'btn-twitter': color === 'twitter',
    'btn-facebook': color === 'facebook',
    'btn-tumblr': color === 'tumblr',
    'btn-paypal': color === 'paypal',
    'btn-roku': color === 'roku',
    // sizes
    'btn--small': size === 'small',
    'btn--medium': size === 'medium',
    'btn--large': size === 'large',
    'btn--half': size === 'half',
    'btn--fill': size === 'fill',
    // typefaces
    'btn--brandon': typeface === 'brandon',
    // button states
    'is-processing': processing === true,
  });
}

var Button$1 = function (props) {
  var cl = getClassName(props);
  return (
    React__default.createElement( 'button', Object.assign({}, { className: cl }, excludeProps([ 'className', 'children', 'color', 'processing', 'size', 'typeface' ], props)), props.children)
  );
};


Button$1.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf([ 'gray', 'teal', 'white', 'red', 'purple', 'green', 'slate', 'black', 'yellow', 'transparent', 'twitter', 'facebook', 'tumblr', 'paypal', 'roku' ]),
  processing: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.oneOf([ 'small', 'medium', 'large', 'half', 'fill' ]),
  typeface: PropTypes.oneOf([ 'brandon', '' ]),
};

Button$1.defaultProps = {
  className: '',
  color: 'gray',
  onClick: null,
  processing: false,
  size: 'medium',
  typeface: '',
};

var iconList = [ 'activity', 'add-member', 'alert', 'align', 'amex-card', 'android-workmark', 'android', 'angle-down', 'angle-left', 'angle-up', 'angle-right', 'api', 'apple', 'apps', 'arrow-down', 'arrow-left', 'arrow-right', 'arrow-up', 'audio', 'ban', 'bell', 'briefcase', 'calendar', 'camera', 'card', 'caret-down', 'caret-left', 'caret-right', 'caret-up', 'cassette-frown', 'cassette', 'chevron-down', 'check', 'chevron-left', 'chevron-right', 'chevron-up', 'chrome', 'clapboard', 'clock', 'code', 'cog', 'collection', 'comment', 'comments', 'currency', 'desktop', 'diners-card', 'csv', 'discover-card', 'doc', 'download-alt', 'download', 'dropbox', 'edit', 'ellipsis-vertical', 'ellipsis', 'envelope-sealed', 'envelope', 'external-link', 'eye', 'facebook', 'followers', 'gift', 'globe', 'grid', 'help', 'hi', 'home', 'instagram', 'invoice', 'ios', 'jcb-card', 'justify', 'key', 'link', 'list', 'lock', 'marker', 'mastercard-card', 'media', 'member', 'money-card', 'money-circle', 'money', 'paypal-card', 'pic', 'play-outline', 'play', 'plus-thin', 'plus', 'popular', 'power', 'printer', 'product', 'question', 'random', 'referral', 'refresh', 'revert', 'roku-wordmark', 'reply', 'roku', 'search', 'sliders', 'star-outline', 'star', 'tag', 'tags', 'todo', 'trash', 'transaction', 'tumblr', 'tv', 'tvos', 'twitter', 'upload-alt', 'upload', 'vhs', 'vhx', 'vimeovhx-dark', 'vimeovhx-light', 'visa-card', 'window', 'x', 'xmas-tree' ];

/* eslint-disable react/no-unused-prop-types */

function getClassName$1(ref) {
  var button = ref.button;
  var circle = ref.circle;
  var className = ref.className;
  var left = ref.left;
  var color = ref.color;
  var name = ref.name;
  var right = ref.right;
  var size = ref.size;

  return classNames(className, ( obj = {
    icon: !button,
    'icon-circle': circle,
    'icon--left': left,
    'icon--right': right,
    'icon--xxsmall': size === 'xxsmall',
    'icon--xsmall': size === 'xsmall',
    'icon--small': size === 'small',
    'icon--medium': size === 'medium',
    'icon--large': size === 'large',
    'icon--xlarge': size === 'xlarge',
    'icon--xxlarge': size === 'xxlarge',
  }, obj[("icon-" + name)] = !color, obj[("icon-" + name + "-" + color)] = !!color, obj ));
  var obj;
}

var Icon$1 = function (props) { return (
  React__default.createElement( 'span', { className: getClassName$1(props) }, props.children)
); };

Icon$1.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  circle: PropTypes.bool,
  color: PropTypes.oneOf([ '', 'navy', 'teal', 'white', 'gray' ]),
  name: PropTypes.oneOf(iconList).isRequired,
  left: PropTypes.bool,
  right: PropTypes.bool,
  size: PropTypes.oneOf([ 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge' ]),
};

Icon$1.defaultProps = {
  children: '',
  className: '',
  circle: false,
  color: null,
  left: false,
  right: false,
  size: 'xsmall',
};

/* eslint-disable import/prefer-default-export */

var KEY_CODES = Object.freeze({
  ESC: 27,
  LEFT: 37,
  RIGHT: 39,
});

// calcNext(3, 0) => 1
// calcNext(3, 1) => 2
// calcNext(3, 2) => 0 // <- it wraps around to the first slide
function calcNext(length, current) {
  return (current + 1) % length;
}

// calcPrev(3, 2) => 1
// calcPrev(3, 1) => 0
// calcPrev(3, 0) => 2 // <- it wraps around to the last slide
function calcPrev(length, current) {
  return (current - 1) < 0 ? (length - 1) : (current - 1);
}

function containValue(max, min, value) {
  if (value > max) { return max; }
  if (value < min) { return min; }
  return value;
}


var Carousel$1 = (function (Component$$1) {
  function Carousel(props) {
    Component$$1.call(this, props);
    this.state = {
      bgSlideIndex: 1,
      topSlideIndex: 0,
      enterDirection: 'TO_LEFT',
      exitDirection: '',
      isFresh: true, // `isFresh` just means no slide change has been triggered yet. it's a hack used to allow a custom `enter` value on the first bgSlide. would like to find a better alternative to this...
      isAnimating: false,
      isMobile: false, // passed down to <Slide>
      height: 0, // passed down to <Slide> so it can reuse the h/w calculations
      width: 0, // passed down to <Slide> so it can reuse the h/w calculations
    };
    this.el = null;
    this.setProportionalHeight = this.setProportionalHeight.bind(this);
    this.keyboardNavigate = this.keyboardNavigate.bind(this);
    this.generateCoin = this.generateCoin.bind(this);
    this.goToSlide = this.goToSlide.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }

  if ( Component$$1 ) Carousel.__proto__ = Component$$1;
  Carousel.prototype = Object.create( Component$$1 && Component$$1.prototype );
  Carousel.prototype.constructor = Carousel;

  Carousel.prototype.componentDidMount = function componentDidMount () {
    this.setProportionalHeight();
    window.addEventListener('resize', this.setProportionalHeight);
    // NOTE: if keyboard navigation ends up being an issue because of <input> elements on the page,
    // maybe bind the event to `this.el` instead of `window`.
    window.addEventListener('keyup', this.keyboardNavigate);
  };

  Carousel.prototype.componentWillUnmount = function componentWillUnmount () {
    window.removeEventListener('resize', this.setProportionalHeight);
    window.removeEventListener('keyup', this.keyboardNavigate);
  };

  Carousel.prototype.setProportionalHeight = function setProportionalHeight () {
    if (this.el) {
      var MOBILE_PADDING_BOTTOM = 0;
      var ref = this.props;
      var aspectRatio = ref.aspectRatio;
      var maxHeight = ref.maxHeight;
      var minHeight = ref.minHeight;
      var width = this.el.clientWidth;
      var aspectHeight = getAspectRatioHeight(aspectRatio, width);
      var height = containValue(maxHeight, minHeight, aspectHeight);
      var isMobile = height > getAspectRatioHeight('16:9', width);
      this.setState({ height: height, isMobile: isMobile, width: width });
      this.el.style.height = (height + (isMobile ? MOBILE_PADDING_BOTTOM : 0)) + "px";
    }
  };

  Carousel.prototype.keyboardNavigate = function keyboardNavigate (event) {
    if (this.state.isAnimating || this.props.slides.length <= 1) { return; }
    var key = event.keyCode || event.which;
    if (key === KEY_CODES.LEFT) { this.prev(); }
    if (key === KEY_CODES.RIGHT) { this.next(); }
  };

  Carousel.prototype.goToSlide = function goToSlide (i, overrideDirection) {
    var this$1 = this;
    if ( overrideDirection === void 0 ) overrideDirection = '';

    var direction = i > this.state.topSlideIndex ? (overrideDirection || 'TO_LEFT') : (overrideDirection || 'TO_RIGHT');
    this.setState({
      bgSlideIndex: i,
      enterDirection: direction,
      exitDirection: direction,
      isAnimating: true,
      isFresh: false,
    });

    setTimeout(function () {
      this$1.setState({
        bgSlideIndex: i, // This is very odd. bgSlideIndex *should* be assumed to be the result of calcNext(). In some cases, that leads to wrong animations. But for some reason this works.
        enterDirection: this$1.state.exitDirection,
        exitDirection: '',
        isAnimating: false,
        topSlideIndex: this$1.state.bgSlideIndex, // === i
      });
    }, this.props.animationDuration);
  };

  Carousel.prototype.next = function next () {
    var nextSlide = calcNext(this.props.slides.length, this.state.topSlideIndex);
    this.goToSlide(nextSlide, 'TO_LEFT');
  };

  Carousel.prototype.prev = function prev () {
    var prevSlide = calcPrev(this.props.slides.length, this.state.topSlideIndex);
    this.goToSlide(prevSlide, 'TO_RIGHT');
  };

  Carousel.prototype.generateCoin = function generateCoin (Slide, i) {
    var this$1 = this;

    var ref = this.state;
    var isAnimating = ref.isAnimating;
    var bgSlideIndex = ref.bgSlideIndex;
    var topSlideIndex = ref.topSlideIndex;
    var isCurrent = isAnimating ? bgSlideIndex === i : topSlideIndex === i;
    return (
      React__default.createElement( 'button', {
        key: i, className: isCurrent ? 'coin active' : 'coin', disabled: isCurrent || isAnimating, onClick: function () { return this$1.goToSlide(i); } })
    );
  };

  Carousel.prototype.render = function render () {
    var this$1 = this;

    var ref = this.state;
    var topSlideIndex = ref.topSlideIndex;
    var bgSlideIndex = ref.bgSlideIndex;
    var enterDirection = ref.enterDirection;
    var exitDirection = ref.exitDirection;
    var isAnimating = ref.isAnimating;
    var isFresh = ref.isFresh;
    var isMobile = ref.isMobile;
    var height = ref.height;
    var width = ref.width;
    var ref$1 = this.props;
    var animationDuration = ref$1.animationDuration;
    var slides = ref$1.slides;
    return (
      React__default.createElement( 'div', { className: ("carousel " + (isMobile ? 'carousel--mobile' : '')), ref: function (el) { this$1.el = el; } },
        React__default.createElement( 'div', { className: 'carousel-slides' },
          slides.map(function (ref, i) {
              var Slide = ref.Slide;
              var id = ref.id;

              return (
              React__default.createElement( Slide, {
                key: id, animationDuration: animationDuration, enter: (bgSlideIndex === i || topSlideIndex === i) && !(isFresh && i === 1), enterDirection: enterDirection, exitDirection: topSlideIndex === i ? exitDirection : '', height: height, isMobile: isMobile, width: width, zIndex: topSlideIndex === i ? '1' : bgSlideIndex === i ? '0' : '-1' })
            );
    })
        ),
        React__default.createElement( If, { condition: slides.length > 1 },
          React__default.createElement( 'div', { className: 'carousel-layout-container', style: { height: (height + "px") } },
            React__default.createElement( 'div', { className: 'coins' }, slides.map(this.generateCoin)),
            React__default.createElement( 'button', { disabled: isAnimating, onClick: this.prev, className: 'carousel-arrow carousel-arrow--left' }, React__default.createElement( Icon$1, { name: 'angle-left', color: 'white', size: isMobile ? 'xsmall' : 'small' })),
            React__default.createElement( 'button', { disabled: isAnimating, onClick: this.next, className: 'carousel-arrow carousel-arrow--right' }, React__default.createElement( Icon$1, { name: 'angle-right', color: 'white', size: isMobile ? 'xsmall' : 'small' }))
          )
        )
      )
    );
  };

  return Carousel;
}(React.Component));

function aspectRatioPropType(props) {
  if (typeof props.aspectRatio !== 'string') {
    throw new Error('Aspect ratio must be a string of the form: "16:9"');
  }
  var ref = props.aspectRatio.split(':').map(function (str) { return parseInt(str, 10); });
  var width = ref[0];
  var height = ref[1];
  if (isNaN(width) || isNaN(height)) {
    throw new Error('Invalid aspect ratio. Must be a string of the form: "16:9"');
  }
}

Carousel$1.propTypes = {
  animationDuration: PropTypes.number,
  aspectRatio: aspectRatioPropType,
  maxHeight: PropTypes.number,
  minHeight: PropTypes.number,
  slides: PropTypes.arrayOf(PropTypes.shape({
    Slide: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

Carousel$1.defaultProps = {
  animationDuration: 600, // ms
  aspectRatio: '16:6',
  maxHeight: 640, // px
  minHeight: 368, //px
};

/* eslint-disable react/no-unused-prop-types */

var getClassName$2 = function (ref) {
  var type = ref.type;
  var size = ref.size;

  return classNames('checkbox', size, { alt: type === 'toggle' });
};


var StandardCheckbox = function () { return (
  React__default.createElement( 'span', { className: 'checkbox--icon' },
    React__default.createElement( 'span', { className: 'checkbox--animate' })
  )
); };


var ToggleCheckbox = function () { return (
  React__default.createElement( 'span', null,
    React__default.createElement( 'span', { className: 'checkbox--icon' }),
    React__default.createElement( 'span', { className: 'checkbox--circle' },
      React__default.createElement( 'i', { className: 'circle-top' }, React__default.createElement( 'span', null )),
      React__default.createElement( 'i', { className: 'circle-bottom' }, React__default.createElement( 'span', null ))
    )
  )
); };


// NOTE: .form does not affect styles in any way, but is required for proper checkbox
// styling since quartz/components.css nests .checkbox under .form. This limitation can
// probably very easily be removed by changing https://github.com/vhx/quartz/blob/master/quartz-js/components/checkbox/styles/checkbox.scss
// to have .checkbox not be required to be a descendent of .form
var Checkbox$1 = function (props) { return (
  React__default.createElement( 'div', { className: 'form' },
    React__default.createElement( 'fieldset', { className: getClassName$2(props) },
      React__default.createElement( 'input', Object.assign({}, excludeProps([ 'label', 'uniqueId', 'size', 'type' ], props), { type: 'checkbox', name: props.uniqueId, id: props.uniqueId })),
      React__default.createElement( 'label', { htmlFor: props.uniqueId },
        React__default.createElement( 'span', { className: 'checkbox--contain' },
          props.type === 'toggle' ? React__default.createElement( ToggleCheckbox, null ) : React__default.createElement( StandardCheckbox, null ),
          React__default.createElement( 'span', { className: 'checkbox--label' }, props.label)
        )
      )
    )
  )
); };


Checkbox$1.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string,
  uniqueId: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  size: PropTypes.oneOf([ 'small', 'medium', 'large' ]),
  type: PropTypes.oneOf([ 'standard', 'toggle' ]),
  value: PropTypes.string,
};

Checkbox$1.defaultProps = {
  checked: false,
  label: '',
  onChange: null,
  size: 'medium',
  type: 'standard',
  value: '',
};

var Header$1 = function (ref) {
  var border = ref.border;
  var children = ref.children;
  var Description = ref.Description;
  var icon = ref.icon;
  var title = ref.title;

  return (
  React__default.createElement( 'div', { className: ("header row padding-bottom-medium " + (border ? 'border-bottom' : '')) },
    React__default.createElement( 'div', { className: 'column small-16 medium-8 large-10' },
      React__default.createElement( 'div', { className: 'media' },
        React__default.createElement( 'div', { className: 'media-unit text-top' }, React__default.createElement( Icon$1, { name: icon, size: 'large' })),
        React__default.createElement( 'div', { className: 'media-unit media-fill padding-left-medium' },
          React__default.createElement( 'h2', { className: 'head-3' }, title),
          React__default.createElement( 'div', { className: 'text text--gray' }, typeof Description === 'string' ? Description : React__default.createElement( Description, null ))
        )
      )
    ),
    React__default.createElement( 'div', { className: 'column small-16 medium-8 large-6 text-right' }, children)
  )
);
};

Header$1.propTypes = {
  border: PropTypes.bool,
  children: PropTypes.node,
  Description: PropTypes.oneOfType([ PropTypes.string, PropTypes.func ]), // can be a string or component
  icon: PropTypes.oneOf(iconList).isRequired,
  title: PropTypes.string.isRequired,
};

Header$1.defaultProps = {
  border: true,
  children: null,
  Description: '',
};

/* eslint-disable react/no-unused-prop-types */

function getClass(ref) {
  var className = ref.className;
  var error = ref.error;
  var search = ref.search;
  var small = ref.small;

  return classNames(className, {
    small: small,
    'is-error': error,
    'c-select--search': search,
    'padding-right-large': search,
    'icon-search-navy': search,
    'icon--xsmall': search,
  });
}

// NOTE: like in the Checkbox component, the `form` class does not
// do anything here except allow the css selector `.form input` to apply styles.
// We should consider refactoring the css to remove this requirement.
var Input$1 = function (props) { return (
  React__default.createElement( 'div', { className: 'form' },
    React__default.createElement( 'input', Object.assign({},
      excludeProps([ 'className', 'error', 'search', 'small' ], props), { className: getClass({
        className: props.className,
        error: props.error,
        search: props.search,
        small: props.small,
      }) }))
  )
); };

Input$1.propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onKeyPress: PropTypes.func,
  onInput: PropTypes.func,
  placeholder: PropTypes.string,
  search: PropTypes.bool,
  small: PropTypes.bool,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
};

Input$1.defaultProps = {
  autoFocus: false,
  className: '',
  disabled: false,
  error: false,
  id: '',
  name: '',
  onBlur: null,
  onChange: null,
  onFocus: null,
  onKeyDown: null,
  onKeyUp: null,
  onKeyPress: null,
  onInput: null,
  placeholder: '',
  search: false,
  small: false,
  style: {},
  type: 'text',
};

var EmptyComponent = function () { return React__default.createElement( 'div', null ); };

var modalModel = Model$$1({
  initialState: {
    actions: [],
    body: React__default.createElement( EmptyComponent, null ),
    isOpen: false,
    size: 'medium',
    title: '',
  },
  methods: {
    close: function close() {
      return {
        actions: [],
        body: React__default.createElement( EmptyComponent, null ),
        isOpen: false,
        size: 'medium',
        title: '',
      };
    },
    open: function open(ref) {
      var actions = ref.actions;
      var Children = ref.Children;
      var size = ref.size;
      var title = ref.title;

      return {
        actions: actions,
        body: React__default.createElement( Children, null ),
        isOpen: true,
        size: size,
        title: title,
      };
    },
  },
});

/* eslint-disable react/no-unused-prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */

function getActionClass(ref) {
  var actions = ref.actions;
  var index = ref.index;

  return classNames({
    btn: true,
    'btn--half': actions.length > 1,
    'btn--fill': actions.length <= 1,
  }, ("btn-" + (actions[index].color || 'gray')));
}

function handleEscapeKey(event) {
  if (event.keyCode === KEY_CODES.ESC) {
    modalModel.close();
  }
}

var Modal$1 = (function (Component$$1) {
  function Modal() {
    Component$$1.call(this);
    this.el = null;
  }

  if ( Component$$1 ) Modal.__proto__ = Component$$1;
  Modal.prototype = Object.create( Component$$1 && Component$$1.prototype );
  Modal.prototype.constructor = Modal;

  Modal.prototype.componentWillMount = function componentWillMount () {
    window.addEventListener('keyup', handleEscapeKey);
  };

  Modal.prototype.componentDidMount = function componentDidMount () {
    var margin = parseInt(this.el.outerHeight / 2, 10);
    this.el.style.marginBottom = margin + "px";
  };

  Modal.prototype.componentWillUnmount = function componentWillUnmount () {
    window.removeEventListener('keyup', handleEscapeKey);
  };

  Modal.prototype.render = function render () {
    var this$1 = this;

    var ref = this.props;
    var actions = ref.actions;
    var body = ref.body;
    var isOpen = ref.isOpen;
    var size = ref.size;
    var title = ref.title;
    return (
      React__default.createElement( 'div', { className: ("c-modal " + (isOpen ? 'is-open' : '')) },
        React__default.createElement( 'div', { className: ("c-modal-container " + (actions.length !== 0 ? 'c-modal--has-actions' : '') + " c-modal--" + size), ref: function (el) { this$1.el = el; } },
          React__default.createElement( 'div', { className: 'c-modal--header padding-medium' },
            React__default.createElement( 'span', null,
              React__default.createElement( 'div', { className: 'h2 head-4 head secondary text-left' }, title)
            )
          ),
          React__default.createElement( 'div', { className: 'c-modal--body padding-medium' }, body),
          React__default.createElement( If, { condition: actions.length !== 0 },
            React__default.createElement( 'div', { className: 'c-modal--actions' },
              React__default.createElement( 'div', { className: 'padding-small text-center' },
                actions.map(function (action, index) { return (
                    React__default.createElement( 'div', {
                      onClick: actions[index].callback, key: action.label, className: getActionClass({ actions: actions, index: index }) },
                      actions[index].label
                    )
                  ); })
              )
            )
          ),
          React__default.createElement( 'div', { className: 'c-modal--close', onClick: modalModel.close },
            React__default.createElement( Icon$1, { size: 'xsmall', color: 'white', name: 'x' })
          )
        ),
        React__default.createElement( 'div', { className: 'c-modal-bg', onClick: modalModel.close })
      )
    );
  };

  return Modal;
}(React.Component));

Modal$1.propTypes = {
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

Modal$1.defaultProps = {
  size: 'medium',
  title: '',
};


var Modal$2 = connect$$1(modalModel, Modal$1);

var RadioIcon = function () { return (
  React__default.createElement( 'span', { className: 'radio--icon' },
    React__default.createElement( 'i', { className: 'circle-top' }, React__default.createElement( 'span', null )),
    React__default.createElement( 'i', { className: 'circle-bottom' }, React__default.createElement( 'span', null ))
  )
); };

var Radio = function (ref) {
  var checked = ref.checked;
  var index = ref.index;
  var label = ref.label;
  var onCheck = ref.onCheck;

  return (
  React__default.createElement( 'li', null,
    React__default.createElement( 'input', {
      type: 'radio', checked: checked, onChange: function (event) { return onCheck(event, index); } }),
    React__default.createElement( 'label', { onClick: function (event) { return onCheck(event, index); } },
      React__default.createElement( RadioIcon, null ),
      React__default.createElement( 'span', { className: 'radio--label text-left' }, label)
    )
  )
);
};

Radio.propTypes = {
  checked: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  onCheck: PropTypes.func.isRequired,
};

function getDescriptionClassName(checked) {
  return classNames({
    'text--white': checked,
    'text-4': true,
  });
}

function getClassName$4(checked) {
  return classNames({
    'btn-teal': checked,
    'btn-gray': !checked,
    'btn--fill': true,
    'btn-radio': true,
    'margin-bottom-medium': true,
  });
}

function getTitleClassName(checked) {
  return classNames({
    'text--white': checked,
    'text--navy': !checked,
    'text-2': true,
  });
}

function getStyle(description) {
  return { marginTop: description ? '0px' : '8px' };
}

var RadioButton = function (ref) {
  var checked = ref.checked;
  var description = ref.description;
  var index = ref.index;
  var label = ref.label;
  var onCheck = ref.onCheck;

  return (
  React__default.createElement( 'li', null,
    React__default.createElement( 'input', {
      type: 'radio', checked: checked, onChange: function (event) { return onCheck(event, index); } }),
    React__default.createElement( 'label', { className: getClassName$4(checked), onClick: function (event) { return onCheck(event, index); } },
      React__default.createElement( RadioIcon, null ),
      React__default.createElement( 'span', { className: 'radio--label text-left padding-left-small', style: getStyle(description) },
        React__default.createElement( 'strong', { className: getTitleClassName(checked) }, label),
        React__default.createElement( If, { condition: Boolean(description) },
          React__default.createElement( 'p', { className: getDescriptionClassName(checked) }, description)
        )
      )
    )
  )
);
};

RadioButton.propTypes = {
  checked: PropTypes.bool.isRequired,
  description: PropTypes.string,
  index: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  onCheck: PropTypes.func.isRequired,
};

RadioButton.defaultProps = {
  description: '',
};

function getClassName$3(ref) {
  var buttons = ref.buttons;
  var color = ref.color;
  var stacked = ref.stacked;

  return classNames({
    'radio-teal': color === 'teal',
    'radio-gray': color === 'gray',
    'radio--buttons': buttons,
    'radio--stacked': stacked,
  });
}

function getRadioComponent(ref) {
  var buttons = ref.buttons;
  var onCheck = ref.onCheck;
  var selectedIndex = ref.selectedIndex;

  return buttons ?
    function (item, i) { return React__default.createElement( RadioButton, Object.assign({}, { onCheck: onCheck, index: i, key: item.uniqueId, checked: selectedIndex === i }, item)); } :
    function (item, i) { return React__default.createElement( Radio, Object.assign({}, { onCheck: onCheck, index: i, key: item.uniqueId, checked: selectedIndex === i }, item)); };
}

var RadioGroup$1 = function (ref) {
  var buttons = ref.buttons;
  var color = ref.color;
  var items = ref.items;
  var onCheck = ref.onCheck;
  var selectedIndex = ref.selectedIndex;
  var stacked = ref.stacked;

  return (
  React__default.createElement( 'div', { className: 'form' },
    React__default.createElement( 'ul', { className: getClassName$3({ buttons: buttons, color: color, stacked: stacked }) },
      items.map(getRadioComponent({ buttons: buttons, onCheck: onCheck, selectedIndex: selectedIndex }))
    )
  )
);
};

var radioItemPropType = PropTypes.shape({
  label: PropTypes.string.isRequired,
  uniqueId: PropTypes.string.isRequired,
});

RadioGroup$1.propTypes = {
  buttons: PropTypes.bool,
  color: PropTypes.oneOf([ 'teal', 'gray' ]),
  items: PropTypes.arrayOf(radioItemPropType).isRequired,
  onCheck: PropTypes.func,
  selectedIndex: PropTypes.number,
  stacked: PropTypes.bool,
};

RadioGroup$1.defaultProps = {
  buttons: false,
  color: 'teal',
  onCheck: function () {},
  selectedIndex: -1,
  stacked: false,
};

var EmptyComponent$1 = function () { return React__default.createElement( 'span', null ); };

// this would go in its own file, so it could imported and used anywhere
var sidebarModel = Model$$1({
  initialState: {
    isOpen: false,
    Contents: EmptyComponent$1,
  },
  methods: {
    close: function close() {
      return { isOpen: false };
    },
    open: function open(Contents) {
      return Contents ?
        { isOpen: true, Contents: Contents } :
        { isOpen: true };
    },
    toggle: function toggle(Contents) {
      if (this.state.isOpen) {
        this.close();
      } else {
        this.open(Contents);
      }
    },
  },
});

var sidebarIsInitialized = false;

var Sidebar$1 = (function (Component$$1) {
  function Sidebar () {
    Component$$1.apply(this, arguments);
  }

  if ( Component$$1 ) Sidebar.__proto__ = Component$$1;
  Sidebar.prototype = Object.create( Component$$1 && Component$$1.prototype );
  Sidebar.prototype.constructor = Sidebar;

  Sidebar.prototype.componentWillMount = function componentWillMount () {
    if (sidebarIsInitialized) {
      throw Error('<Sidebar /> must be mounted only once');
    }
    sidebarIsInitialized = true;
  };
  Sidebar.prototype.componentWillUnmount = function componentWillUnmount () {
    sidebarIsInitialized = false;
  };
  Sidebar.prototype.render = function render () {
    var ref = this.props;
    var isOpen = ref.isOpen;
    var Contents = ref.Contents;
    return (
      React__default.createElement( 'div', { className: ("sidebar c-sidebar bg-white shadow--gray " + (isOpen ? 'sidebar--open' : '')) },
        React__default.createElement( 'a', { className: 'c-sidebar--close icon-circle icon-x-navy icon--xsmall', onClick: function () { return sidebarModel.close(); } }),
        React__default.createElement( 'div', null, React__default.createElement( Contents, null ) )
      )
    );
  };

  return Sidebar;
}(React.Component));


Sidebar$1.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  Contents: PropTypes.func.isRequired,
};

var Sidebar$2 = connect$$1(sidebarModel, Sidebar$1);

var MAX_TITLE_LENGTH = 50; // characters

var Slide$1 = (function (Component$$1) {
  function Slide() {
    Component$$1.call(this);
    this.getImgHeight = this.getImgHeight.bind(this);
  }

  if ( Component$$1 ) Slide.__proto__ = Component$$1;
  Slide.prototype = Object.create( Component$$1 && Component$$1.prototype );
  Slide.prototype.constructor = Slide;

  Slide.prototype.getImgHeight = function getImgHeight () {
    var ref = this.props;
    var isWide = ref.isWide;
    var ref$1 = this.props.dynamicProps;
    var isMobile = ref$1.isMobile;
    var height = ref$1.height;
    var width = ref$1.width;
    if (isWide) {
      if (isMobile) { return getAspectRatioHeight('16:9', width); }
      var isNarrow = getAspectRatioHeight('16:6', width) < height;
      return isNarrow ? height : getAspectRatioHeight('16:6', width);
    }
    if (isMobile) { return getAspectRatioHeight('16:9', width); }
    return height;
  };

  Slide.prototype.render = function render () {
    var ref = this.props.dynamicProps;
    var animationDuration = ref.animationDuration;
    var enter = ref.enter;
    var enterDirection = ref.enterDirection;
    var exitDirection = ref.exitDirection;
    var isMobile = ref.isMobile;
    var zIndex = ref.zIndex;
    var ref$1 = this.props;
    var buttonClass = ref$1.buttonClass;
    var title = ref$1.title;
    var subtitle = ref$1.subtitle;
    var description = ref$1.description;
    var img = ref$1.img;
    var mobileImg = ref$1.mobileImg;
    var trailer = ref$1.trailer;
    var isWide = ref$1.isWide;
    return (
      React__default.createElement( 'div', { className: ("slide " + exitDirection + " " + (enter ? ("ENTER_" + enterDirection) : '')), style: { zIndex: zIndex, animationDuration: (animationDuration + "ms") } },
        React__default.createElement( 'div', { className: isMobile ? 'slide-bg slide-bg--mobile' : 'slide-bg' },
          React__default.createElement( 'div', { className: isWide ? 'slide-layout-wide' : 'slide-layout-container' },
            React__default.createElement( 'img', { className: 'slide-bg-img', src: isMobile ? mobileImg : img, alt: title, style: { height: ((this.getImgHeight()) + "px") } })
          )
        ),
        React__default.createElement( 'div', { className: 'slide-layout-container' },
          React__default.createElement( 'div', { className: isMobile ? 'slide-content slide-content--mobile' : 'slide-content' },
            React__default.createElement( 'div', { className: 'slide-title' }, truncate(title, MAX_TITLE_LENGTH)),
            React__default.createElement( 'div', { className: 'slide-subtitle' }, subtitle),
            React__default.createElement( 'div', { className: 'slide-description' }, description),
            React__default.createElement( 'div', { className: 'slide-buttons' },
              React__default.createElement( 'button', { className: ("slide-button " + buttonClass) },
                React__default.createElement( Icon$1, { name: 'play', color: 'white', size: 'xxsmall' }),
                React__default.createElement( 'span', { className: 'slide-button-text' }, "Watch now")
              ),
              React__default.createElement( If, { condition: Boolean(trailer), inline: true },
                React__default.createElement( 'button', { className: 'slide-button slide-button--alt' },
                  React__default.createElement( Icon$1, { name: 'play', color: 'white', size: 'xxsmall' }),
                  React__default.createElement( 'span', { className: 'slide-button-text' }, "Trailer")
                )
              )
            )
          )
        )
      )
    );
  };

  return Slide;
}(React.Component));

Slide$1.propTypes = {
  dynamicProps: PropTypes.shape({
    animationDuration: PropTypes.number.isRequired,
    enter: PropTypes.bool.isRequired,
    enterDirection: PropTypes.oneOf([ 'TO_LEFT', 'TO_RIGHT' ]).isRequired,
    exitDirection: PropTypes.oneOf([ '', 'TO_LEFT', 'TO_RIGHT' ]).isRequired,
    isMobile: PropTypes.bool.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    zIndex: PropTypes.string.isRequired,
  }).isRequired,
  buttonClass: PropTypes.string,
  description: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  mobileImg: PropTypes.string.isRequired,
  isWide: PropTypes.bool,
  title: PropTypes.string.isRequired,
  trailer: PropTypes.string, // probably a URL or id
  subtitle: PropTypes.string,
};

Slide$1.defaultProps = {
  buttonClass: 'slide-button--default',
  isWide: false,
  subtitle: '',
  trailer: null,
};

function getClass$1(isHover) {
  return classNames({
    inline: true,
    relative: true,
    'c-tag': true,
    'is-hover': isHover,
  });
}

function getButtonClass(isHover, isProcessing) {
  return classNames({
    'c-tag--button': true,
    'btn-teal': isHover,
    'is-hover': isHover,
    'btn-gray': !isHover,
    'is-processing': isProcessing,
  });
}

function getLinkClass(isRemoveHover) {
  return classNames({
    'c-tag--remove': true,
    'icon--center': true,
    'icon-x-white': true,
    'icon--xxsmall': true,
    'btn-red': isRemoveHover,
    'btn-teal': !isRemoveHover,
  });
}


var Tag$1 = (function (Component$$1) {
  function Tag() {
    Component$$1.call(this);
    this.state = {
      isHover: false,
      isRemoveHover: false,
    };
    this.setHover = this.setHover.bind(this);
    this.setRemoveHover = this.setRemoveHover.bind(this);
  }

  if ( Component$$1 ) Tag.__proto__ = Component$$1;
  Tag.prototype = Object.create( Component$$1 && Component$$1.prototype );
  Tag.prototype.constructor = Tag;

  Tag.prototype.setHover = function setHover (value) {
    var this$1 = this;

    return function () { return this$1.setState({ isHover: value }); };
  };

  Tag.prototype.setRemoveHover = function setRemoveHover (value) {
    var this$1 = this;

    return function () { return this$1.setState({ isRemoveHover: value }); };
  };

  Tag.prototype.render = function render () {
    var ref = this.props;
    var label = ref.label;
    var maxLength = ref.maxLength;
    var isProcessing = ref.isProcessing;
    var onClick = ref.onClick;
    var onRemove = ref.onRemove;
    var ref$1 = this.state;
    var isHover = ref$1.isHover;
    var isRemoveHover = ref$1.isRemoveHover;
    var ref$2 = this;
    var setHover = ref$2.setHover;
    var setRemoveHover = ref$2.setRemoveHover;
    return (
      React__default.createElement( 'span', { className: getClass$1(isHover), onMouseOver: setHover(true), onMouseOut: setHover(false) },
        React__default.createElement( 'button', { className: getButtonClass(isHover, isProcessing), onClick: onClick },
          truncate(label, maxLength)
        ),
        React__default.createElement( 'a', {
          className: getLinkClass(isRemoveHover), onClick: onRemove, onMouseOver: setRemoveHover(true), onMouseOut: setRemoveHover(false) })
      )
    );
  };

  return Tag;
}(React.Component));


Tag$1.propTypes = {
  label: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  isProcessing: PropTypes.bool,
  onClick: PropTypes.func,
  onRemove: PropTypes.func,
};

Tag$1.defaultProps = {
  maxLength: Infinity,
  isProcessing: false,
  onClick: null,
  onRemove: null,
};

/* eslint-disable react/no-unused-prop-types */

function getClassName$5(props) {
  return classNames(props.className, {
    block: Boolean(props.block),
    'head-1': Boolean(props.h1),
    'head-2': Boolean(props.h2),
    'head-3': Boolean(props.h3),
    'head-4': Boolean(props.h4),
    'head-5': Boolean(props.h5),
    'text--navy': props.color === 'navy',
    'text--gray': props.color === 'gray',
    'text--teal': props.color === 'teal',
    'text--white': props.color === 'white',
  });
}

var Text$1 = function (props) { return (
  React__default.createElement( 'span', { className: getClassName$5(props) }, props.children)
); };

Text$1.propTypes = {
  block: PropTypes.bool,
  children: PropTypes.node.isRequired,
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  h4: PropTypes.bool,
  h5: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.oneOf([ 'navy', 'gray', 'teal', 'white' ]),
};

Text$1.defaultProps = {
  block: false,
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  h5: false,
  className: '',
  color: 'navy',
};

var If$2 = If;

var VERTICAL_OFFSET = 10;


function manualOffsetV(shouldReposition, offset) {
  return function (el) {
    if (el && shouldReposition) {
      el.style.top = "-" + (el.offsetHeight + offset) + "px"; // eslint-disable-line no-param-reassign
    }
  };
}

/*
Given selectedOptions like: { foo: true, bar: false, baz: false }
and given an optionsList like: [{ uniqueId: 'foo', label: 'Item 1'}, { uniqueId: 'bar', label: 'Item 2' }, { uniqueId: 'baz', label: 'Item 3'}]
=> 'Item 1' // returns the label of the selected option
*/
function generateLabel(selectedOptions, optionsList) {
  var selectedKeys = Object.keys(selectedOptions).filter(function (key) { return Boolean(selectedOptions[key]); });
  if (selectedKeys.length === 0) { return ''; }
  if (selectedKeys.length === 1) {
    var selectedItemKey = selectedKeys[0];
    var selectedItem = optionsList.filter(function (option) { return option.uniqueId === selectedItemKey; })[0];
    return selectedItem.label;
  }
  return 'Multiple items selected';
}

function SelectDropdownHOC(ref) {
  var Option = ref.Option;

  var SelectDropdown = function (ref) {
    var dropdownPosition = ref.dropdownPosition;
    var isLoading = ref.isLoading;
    var maxLabelLength = ref.maxLabelLength;
    var multiSelect$$1 = ref.multiSelect;
    var onOpenToggle = ref.onOpenToggle;
    var onSelectionToggle = ref.onSelectionToggle;
    var options = ref.options;
    var processingOptions = ref.processingOptions;
    var search = ref.search;
    var searchValue = ref.searchValue;
    var selectedOptions = ref.selectedOptions;

    // If the `multiSelect` prop is available, toggle by way of `util.multiSelect`. No need to hide the dropdown.
    // If it is not, toggle by way of `util.select` and hide the dropdown
    var chooseOption = multiSelect$$1 ? multiSelect : function (_options, id) {
      onOpenToggle(false); // this hides the dropdown
      return select(selectedOptions, id);
    };

    var generateOption = function (item) {
      var onToggle = function (id) {
        var newSelection = chooseOption(selectedOptions, id);
        var label = generateLabel(newSelection, options);
        var noItemsWereSelected = label === '';
        if (noItemsWereSelected && !multiSelect$$1) {
          onOpenToggle(false);
          return;
        }
        onSelectionToggle(newSelection, label, item, newSelection[item.uniqueId]);
      };
      return (
        React__default.createElement( Option, Object.assign({},
          { key: item.uniqueId, isProcessingItem: processingOptions.indexOf(item.uniqueId) !== -1, maxLabelLength: maxLabelLength, multiSelect: multiSelect$$1, onOptionToggle: onToggle, isLoading: isLoading, isSelected: Boolean(selectedOptions[item.uniqueId]) }, item))
      );
    };

    return (
      React__default.createElement( 'div', { className: 'c-select--dropdown bg-white border radius fill-width is-open', ref: manualOffsetV(dropdownPosition === 'above', VERTICAL_OFFSET) },
        React__default.createElement( If$2, { condition: Boolean(search) },
          React__default.createElement( 'div', { className: 'c-select--input-container padding-medium absolute bg-white fill-width radius' },
            React__default.createElement( Input$1, { placeholder: 'Search', onInput: function (event) { return search(event.target.value); }, value: searchValue, autoFocus: true, search: true })
          )
        ),
        React__default.createElement( 'ul', { className: ("c-select--options margin-left-reset loader-slate loader--transparent " + (isLoading ? 'is-loading' : '')) },
          React__default.createElement( If$2, { condition: options.length === 0 },
            React__default.createElement( 'li', { className: 'padding-horz-large padding-top-small padding-bottom-medium text--gray text-center' })
          ),
          React__default.createElement( 'div', null,
            options.map(generateOption)
          )
        )
      )
    );
  };

  SelectDropdown.propTypes = {
    dropdownPosition: PropTypes.oneOf([ 'above', 'below' ]).isRequired,
    isLoading: PropTypes.bool,
    maxLabelLength: PropTypes.number.isRequired, // only currently used in MediaSelect, but there's no reason not to allow it in standard Select as well
    multiSelect: PropTypes.bool.isRequired,
    multiselect: typoPropType({ correct: 'multiSelect' }), // eslint-disable-line react/require-default-props, react/no-unused-prop-types
    onOpenToggle: PropTypes.func.isRequired,
    onSelectionToggle: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      description: PropTypes.string,
      label: PropTypes.string.isRequired,
      uniqueId: PropTypes.string.isRequired,
    })).isRequired,
    processingOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedOptions: PropTypes.objectOf(PropTypes.bool).isRequired,
    search: PropTypes.func,
    searchValue: PropTypes.string,
  };

  SelectDropdown.defaultProps = {
    isLoading: false,
    search: null,
    searchValue: '',
  };

  return SelectDropdown;
}

// TODO: this is a hack, we should have this in css if possible to make a PR to Quartz css
// (This fixes wrapping issues in `inline` select dropdowns)
var listStyle = { whiteSpace: 'nowrap' };

var SelectDropdownOption = function (ref) {
  var description = ref.description;
  var isLoading = ref.isLoading;
  var isSelected = ref.isSelected;
  var label = ref.label;
  var onOptionToggle = ref.onOptionToggle;
  var uniqueId = ref.uniqueId;

  return (
  React__default.createElement( 'li', { className: ("c-select--option padding-horz-medium " + (isSelected ? 'is-selected' : '')), onClick: function () { return !isLoading && onOptionToggle(uniqueId); }, style: listStyle },
    React__default.createElement( If, { condition: isSelected },
      React__default.createElement( Icon$1, { name: 'check', color: 'navy', size: 'xsmall', className: 'right margin-top-xsmall margin-left-small' })
    ),
    React__default.createElement( 'span', { className: 'c-select--item-label text--navy' }, label),
    React__default.createElement( 'span', { className: 'right text--gray' }, description)
  )
);
};

SelectDropdownOption.propTypes = {
  description: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onOptionToggle: PropTypes.func.isRequired,
  uniqueId: PropTypes.string.isRequired,
};

SelectDropdownOption.defaultProps = {
  description: '',
};

var SelectDropdown = SelectDropdownHOC({ Option: SelectDropdownOption });

function getTriggerClass(ref) {
  var color = ref.color;

  return classNames({
    truncate: true,
    'btn--fill': true,
    'btn-dropdown-gray':  color === 'gray',
    'btn-dropdown-white': color === 'white',
    'btn-dropdown-teal':  color === 'teal',
    'c-select--trigger': true,
  });
}

var Trigger = function (ref) {
  var color = ref.color;
  var isOpen = ref.isOpen;
  var onOpenToggle = ref.onOpenToggle;
  var triggerLabel = ref.triggerLabel;
  var triggerPlaceholder = ref.triggerPlaceholder;

  return (
  React__default.createElement( 'span', { className: getTriggerClass({ color: color }), onClick: function () { return onOpenToggle(!isOpen); } }, triggerLabel || triggerPlaceholder)
);
};

Trigger.propTypes = {
  color: PropTypes.oneOf([ 'gray', 'white', 'teal' ]).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onOpenToggle: PropTypes.func.isRequired,
  triggerLabel: PropTypes.string.isRequired,
  triggerPlaceholder: PropTypes.string.isRequired,
};

/* eslint-disable react/no-unused-prop-types */

function getClass$2(props, type) {
  var caretAlign = props.caretAlign;
  var dropdownPosition = props.dropdownPosition;
  var inline = props.inline;
  var search = props.search;
  return classNames({
    inline: inline,
    form: true,
    relative: true,
    'c-select--container': true,
    'has-search': Boolean(search),
    'has-media': type === 'media',
    'caret--top-right':     dropdownPosition === 'below' && caretAlign === 'right',
    'caret--top-left':      dropdownPosition === 'below' && caretAlign === 'left',
    'caret--top-center':    dropdownPosition === 'below' && caretAlign === 'center',
    'caret--bottom-right':  dropdownPosition === 'above' && caretAlign === 'right',
    'caret--bottom-left':   dropdownPosition === 'above' && caretAlign === 'left',
    'caret--bottom-center': dropdownPosition === 'above' && caretAlign === 'center',
  });
}

function SelectHOC(ref) {
  var Dropdown = ref.Dropdown;
  var type = ref.type;

  var Select = (function (Component$$1) {
    function Select(props) {
      Component$$1.call(this, props);
      this.element = null;
      this.handleGlobalClick = this.handleGlobalClick.bind(this);
    }

    if ( Component$$1 ) Select.__proto__ = Component$$1;
    Select.prototype = Object.create( Component$$1 && Component$$1.prototype );
    Select.prototype.constructor = Select;

    Select.prototype.componentWillMount = function componentWillMount () {
      document.addEventListener('click', this.handleGlobalClick);
    };

    Select.prototype.componentWillUnmount = function componentWillUnmount () {
      document.removeEventListener('click', this.handleGlobalClick);
    };

    // If user clicks anywhere but the <Select>, then close it.
    Select.prototype.handleGlobalClick = function handleGlobalClick (event) {
      if (!this.element) { return; }
      if (event.target !== this.element && !this.element.contains(event.target)) {
        this.props.onOpenToggle(false);
      }
    };

    Select.prototype.render = function render () {
      var this$1 = this;

      var Trigger$$1 = this.props.Trigger || Trigger;
      return (
        React__default.createElement( 'div', { className: getClass$2(this.props, type), ref: (function (el) { this$1.element = el; }) },
          React__default.createElement( Trigger$$1, this.props),
          React__default.createElement( If, { condition: this.props.isOpen },
            React__default.createElement( Dropdown, this.props)
          )
        )
      );
    };

    return Select;
  }(React.Component));

  Select.propTypes = {
    caretAlign: PropTypes.oneOf([ 'left', 'center', 'right' ]),
    color: PropTypes.oneOf([ 'gray', 'white', 'teal' ]),
    dropdownPosition: PropTypes.oneOf([ 'above', 'below' ]),
    inline: PropTypes.bool,
    isOpen: PropTypes.bool,
    maxLabelLength: PropTypes.number,
    multiSelect: PropTypes.bool,
    onOpenToggle: PropTypes.func.isRequired,
    onSelectionToggle: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      // NOTE: any additional keys are also allowed, so you can store as much data in the `option` as you would like
      label: PropTypes.string.isRequired,
      uniqueId: PropTypes.string.isRequired,
      description: PropTypes.string,
    })).isRequired,
    processingOptions: PropTypes.arrayOf(PropTypes.string),
    selectedOptions: PropTypes.objectOf(PropTypes.bool).isRequired,
    search: PropTypes.func,
    Trigger: PropTypes.func, // this allows passing in a custom Trigger as prop, so it's not necessary to import the HOC
    triggerLabel: PropTypes.string,
    triggerPlaceholder: PropTypes.string,
  };

  Select.defaultProps = {
    caretAlign: 'right',
    color: 'gray',
    dropdownPosition: 'below',
    inline: false,
    isOpen: false,
    maxLabelLength: Infinity,
    multiSelect: false,
    processingOptions: [],
    search: null,
    Trigger: null,
    triggerLabel: '',
    triggerPlaceholder: 'Select an option',
  };

  return Select;
}

var Select = SelectHOC({
  Dropdown: SelectDropdown,
  type: 'standard', // NOTE: 'standard' isn't used anywhere, just specifying that it's not 'media'
});

var imgStyle = function (url) { return ({
  backgroundImage: ("url(" + url + ")"),
  height: '40px',
  width: '70px',
}); };

function getButton(isProcessing, isSelected) {
  if (isProcessing) {
    return React__default.createElement( 'div', { className: 'c-item-toggle loader-white loader--small' });
  }
  if (isSelected) {
    return React__default.createElement( 'div', { className: 'c-item-toggle icon-check-navy icon--xsmall border is-selected' });
  }
  return React__default.createElement( 'div', { className: 'c-item-toggle icon-plus-thin-white icon--xsmall border' });
}

var MediaSelectDropdownOption = function (ref) {
  var description = ref.description;
  var imageUrl = ref.imageUrl;
  var isLoading = ref.isLoading;
  var isProcessingItem = ref.isProcessingItem;
  var isSelected = ref.isSelected;
  var label = ref.label;
  var maxLabelLength = ref.maxLabelLength;
  var multiSelect$$1 = ref.multiSelect;
  var onOptionToggle = ref.onOptionToggle;
  var uniqueId = ref.uniqueId;

  return (
  React__default.createElement( 'li', { className: ("c-media-item--container padding-horz-medium padding-vert-small clearfix " + (isSelected ? 'is-selected' : '')), onClick: function () { return !isLoading && onOptionToggle(uniqueId); } },
    React__default.createElement( 'div', { className: 'c-media-item--image-container left' },
      React__default.createElement( 'div', { className: 'c-media-item--image radius margin-right-medium img', style: imgStyle(imageUrl) })
    ),
    React__default.createElement( 'div', { className: 'c-media-item--image-content clearfix left' },
      React__default.createElement( 'p', { className: 'text--navy line-medium truncate block' }, truncate(label, maxLabelLength)),
      React__default.createElement( 'p', { className: 'text--gray line-medium truncate block' }, description)
    ),
    React__default.createElement( If, { condition: multiSelect$$1 },
      React__default.createElement( 'div', { className: 'c-media-item--action clearfix right' },
        getButton(isProcessingItem, isSelected)
      )
    )
  )
);
};

MediaSelectDropdownOption.propTypes = {
  description: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isProcessingItem: PropTypes.bool,
  isSelected: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  maxLabelLength: PropTypes.number.isRequired,
  multiSelect: PropTypes.bool.isRequired,
  onOptionToggle: PropTypes.func.isRequired,
  uniqueId: PropTypes.string.isRequired,
};

MediaSelectDropdownOption.defaultProps = {
  description: '',
  isProcessingItem: false,
};

var MediaSelectDropdown = SelectDropdownHOC({ Option: MediaSelectDropdownOption });

var MediaSelect = SelectHOC({
  Dropdown: MediaSelectDropdown,
  type: 'media',
});

var StatefulSelect = (function (Component$$1) {
  function StatefulSelect(props) {
    Component$$1.call(this, props);
    this.state = {
      isOpen: props.isOpen || false,
      selectedOptions: {},
      label: '',
    };
    this.setOpen = this.setOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  if ( Component$$1 ) StatefulSelect.__proto__ = Component$$1;
  StatefulSelect.prototype = Object.create( Component$$1 && Component$$1.prototype );
  StatefulSelect.prototype.constructor = StatefulSelect;

  StatefulSelect.prototype.setOpen = function setOpen (isOpen) {
    this.setState({ isOpen: isOpen });
    this.props.onOpenToggle(isOpen);
  };

  StatefulSelect.prototype.handleChange = function handleChange (selectedOptions, label, itemToggled, itemWillBeChecked) {
    this.setState({ selectedOptions: selectedOptions, label: label });
    this.props.onSelectionToggle(selectedOptions, label, itemToggled, itemWillBeChecked);
  };

  StatefulSelect.prototype.render = function render () {
    return (
      React__default.createElement( Select, Object.assign({},
        this.props, { isOpen: this.state.isOpen, selectedOptions: this.state.selectedOptions, onSelectionToggle: this.handleChange, onOpenToggle: this.setOpen, triggerLabel: this.state.label }))
    );
  };

  return StatefulSelect;
}(React.Component));

StatefulSelect.propTypes = {
  isOpen: PropTypes.bool,
  onOpenToggle: PropTypes.func,
  onSelectionToggle: PropTypes.func,
};

StatefulSelect.defaultProps = {
  isOpen: false,
  onOpenToggle: function () {},
  onSelectionToggle: function () {},
};

var StatefulMediaSelect = (function (Component$$1) {
  function StatefulMediaSelect(props) {
    Component$$1.call(this, props);
    this.state = {
      isOpen: props.isOpen || false,
      selectedOptions: {},
      label: '',
    };
    this.setOpen = this.setOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  if ( Component$$1 ) StatefulMediaSelect.__proto__ = Component$$1;
  StatefulMediaSelect.prototype = Object.create( Component$$1 && Component$$1.prototype );
  StatefulMediaSelect.prototype.constructor = StatefulMediaSelect;

  StatefulMediaSelect.prototype.setOpen = function setOpen (isOpen) {
    this.setState({ isOpen: isOpen });
    this.props.onOpenToggle(isOpen);
  };

  StatefulMediaSelect.prototype.handleChange = function handleChange (selectedOptions, label, itemToggled, itemWillBeChecked) {
    this.setState({ selectedOptions: selectedOptions, label: label });
    this.props.onSelectionToggle(selectedOptions, label, itemToggled, itemWillBeChecked);
  };

  StatefulMediaSelect.prototype.render = function render () {
    return (
      React__default.createElement( MediaSelect, Object.assign({},
        this.props, { isOpen: this.state.isOpen, selectedOptions: this.state.selectedOptions, onSelectionToggle: this.handleChange, onOpenToggle: this.setOpen, triggerLabel: this.state.label }))
    );
  };

  return StatefulMediaSelect;
}(React.Component));

StatefulMediaSelect.propTypes = {
  isOpen: PropTypes.bool,
  onOpenToggle: PropTypes.func,
  onSelectionToggle: PropTypes.func,
};

StatefulMediaSelect.defaultProps = {
  isOpen: false,
  onOpenToggle: function () {},
  onSelectionToggle: function () {},
};

var util = utilities;

exports.util = util;
exports.Avatar = Avatar$1;
exports.Button = Button$1;
exports.Carousel = Carousel$1;
exports.Checkbox = Checkbox$1;
exports.Header = Header$1;
exports.Icon = Icon$1;
exports.Input = Input$1;
exports.Modal = Modal$2;
exports.modalModel = modalModel;
exports.RadioGroup = RadioGroup$1;
exports.Sidebar = Sidebar$2;
exports.sidebarModel = sidebarModel;
exports.Slide = Slide$1;
exports.Tag = Tag$1;
exports.Text = Text$1;
exports.Select = Select;
exports.MediaSelect = MediaSelect;
exports.StatefulSelect = StatefulSelect;
exports.StatefulMediaSelect = StatefulMediaSelect;
