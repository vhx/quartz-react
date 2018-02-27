/* eslint-disable no-param-reassign */

/*
<If condition={false}><MyComponent /></If> // MyComponent will not render
<If condition={true}><MyComponent /></If> // MyComponent will render
*/
export { default as If } from './If.jsx';
export { default as componentColor } from './componentColor.jsx';

export { Model, connect } from './model.js';

/*
truncate('foo-bar-baz', 4);
=> 'foo-...'

truncate('foo', 4);
=> 'foo'
*/
export function truncate(str, maxLength) {
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
export function excludeProps(excludeList, props) {
  return Object.keys(props)
    .filter(propName => excludeList.indexOf(propName) === -1)
    .reduce((finalProps, propName) => {
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
export function multiSelect(options, id) {
  return Object.assign({}, options, { [id]: !options[id] });
}


/*
select({ foo: true, bar: false }, 'foo');
=> { foo: false, bar: false }

select({ foo: true, bar: false, baz: false }, 'bar');
=> { foo: false, bar: true, baz: false }

(The source `options` object will not be modified.)
*/
export function select(options, id) {
  const newOptions = Object.keys(options).reduce((obj, key) => {
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
export function typoPropType({ correct }) {
  return function typoPropTypeCheck(props, propName, componentName) {
    if (props[propName]) {
      console.warn(`You passed the prop \`${propName}\`, which is not supported, to the component \`${componentName}\`. Did you mean to pass \`${correct}\` instead?`); // eslint-disable-line no-console
      return false;
    }
  };
}


// given `aspectRatio` of "16:9" and width 1280
// => 720
export function getAspectRatioHeight(aspectRatio, width) {
  const [ w, h ] = aspectRatio.split(':').map(str => parseInt(str, 10));
  const height = width / (w / h);
  return Math.floor(height); // round down to prevent possible single pixel black line
}


export function immutableMerge(...args) {
  return Object.freeze(Object.assign({}, ...args));
}

export function noop() {}
