
/*
<If condition={false}><MyComponent /></If> // MyComponent will not render
<If condition={true}><MyComponent /></If> // MyComponent will render
*/
export { default as If } from './If.jsx';


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

// given `aspectRatio` of "16:9" and width 1280
// => 720
export function getAspectRatioHeight(aspectRatio, width) {
  const [ w, h ] = aspectRatio.split(':').map(str => parseInt(str, 10));
  const height = width / (w / h);
  return Math.floor(height); // round down to prevent possible single pixel black line
}
