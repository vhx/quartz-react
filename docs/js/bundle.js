(function (React,ReactDOM) {
'use strict';

function __$$styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var React__default = 'default' in React ? React['default'] : React;
ReactDOM = 'default' in ReactDOM ? ReactDOM['default'] : ReactDOM;

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

var emptyFunction_1 = emptyFunction;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

var validateFormat = function validateFormat(format) {};

if (undefined !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

var invariant_1 = invariant;

var warning = emptyFunction_1;

if (undefined !== 'production') {
  (function () {
    var printWarning = function printWarning(format) {
      var arguments$1 = arguments;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments$1[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      var arguments$1 = arguments;

      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments$1[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  })();
}

var warning_1 = warning;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret;

if (undefined !== 'production') {
  var invariant$1 = invariant_1;
  var warning$1 = warning_1;
  var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (undefined !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant$1(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
        } catch (ex) {
          error = ex;
        }
        warning$1(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning$1(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

var checkPropTypes_1 = checkPropTypes;

var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (undefined !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret_1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant_1(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (undefined !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning_1(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction_1.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      undefined !== 'production' ? warning_1(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction_1.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      undefined !== 'production' ? warning_1(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction_1.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning_1(
          false,
          'Invalid argument supplid to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction_1.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes_1;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret_1) {
      // It is still safe when called from React.
      return;
    }
    invariant_1(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  }
  shim.isRequired = shim;
  function getShim() {
    return shim;
  }
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction_1;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var index = createCommonjsModule(function (module) {
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (undefined !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = factoryWithTypeCheckers(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = factoryWithThrowingShims();
}
});

var Block = function (ref) {
  var children = ref.children;
  var dark = ref.dark;
  var inline = ref.inline;

  var className = [
    'padding-xsmall',
    dark ? 'bg-gray-7' : '',
    inline ? 'inline' : '' ].join(' ');
  return (
    React__default.createElement( 'div', { className: className }, children)
  );
};

Block.propTypes = {
  children: index.node.isRequired,
  dark: index.bool,
  inline: index.bool,
};

Block.defaultProps = {
  dark: false,
  inline: false,
};

var If$1 = function (ref) {
  var condition = ref.condition;
  var children = ref.children;
  var inline = ref.inline;

  return (condition ? React__default.createElement( 'span', { className: inline ? '' : 'block' }, children) : React__default.createElement( 'span', null ));
};

If$1.propTypes = {
  condition: index.bool.isRequired,
  children: index.node.isRequired,
  inline: index.bool,
};

If$1.defaultProps = {
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
  var ComponentWithMethods = Object.assign(connectComponent(Component$$1), model); // this makes all fields of the model available as statics on the component
  model.subscribe(function (nextState) { ComponentWithMethods.state = nextState; }); // this is required since `state` is immutable, so without it only the initial state would be a static property on the component
  return ComponentWithMethods;
}

/* eslint-disable no-param-reassign */

/*
<If condition={false}><MyComponent /></If> // MyComponent will not render
<If condition={true}><MyComponent /></If> // MyComponent will render
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

function noop() {}


var utilities = Object.freeze({
	truncate: truncate,
	excludeProps: excludeProps,
	multiSelect: multiSelect,
	select: select,
	typoPropType: typoPropType,
	getAspectRatioHeight: getAspectRatioHeight,
	immutableMerge: immutableMerge,
	noop: noop,
	If: If$1,
	Model: Model$$1,
	connect: connect$$1
});

var css = "/* .....................................\n  Vimeo Colors\n..................................... */\n/* .....................................\n  Grayscale\n..................................... */\n/* .....................................\n  Blues\n..................................... */\n/* .....................................\n  Greens\n..................................... */\n/* .....................................\n  Reds\n..................................... */\n/* .....................................\n  Interaction Colors\n..................................... */\n/* .....................................\n  Vimeo Legacy Colors\n..................................... */\n/* .....................................\n  Default Text\n..................................... */\n/* .....................................\n  Default Sizing\n..................................... */\n/* .....................................\n  Vimeo Colors\n..................................... */\n/* .....................................\n  Grayscale\n..................................... */\n/* .....................................\n  Blues\n..................................... */\n/* .....................................\n  Greens\n..................................... */\n/* .....................................\n  Reds\n..................................... */\n/* .....................................\n  Interaction Colors\n..................................... */\n/* .....................................\n  Vimeo Legacy Colors\n..................................... */\n/* .....................................\n  Default Text\n..................................... */\n/* .....................................\n  Default Sizing\n..................................... */\n/*.....................................\n  VIMEO FONT MIXINS\n......................................*/\n/* .....................................\n  Vimeo Colors\n..................................... */\n/* .....................................\n  Grayscale\n..................................... */\n/* .....................................\n  Blues\n..................................... */\n/* .....................................\n  Greens\n..................................... */\n/* .....................................\n  Reds\n..................................... */\n/* .....................................\n  Interaction Colors\n..................................... */\n/* .....................................\n  Vimeo Legacy Colors\n..................................... */\n/* .....................................\n  Default Text\n..................................... */\n/* .....................................\n  Default Sizing\n..................................... */\n/* .....................................\n  Vimeo Colors\n..................................... */\n/* .....................................\n  Grayscale\n..................................... */\n/* .....................................\n  Blues\n..................................... */\n/* .....................................\n  Greens\n..................................... */\n/* .....................................\n  Reds\n..................................... */\n/* .....................................\n  Interaction Colors\n..................................... */\n/* .....................................\n  Vimeo Legacy Colors\n..................................... */\n/* .....................................\n  Default Text\n..................................... */\n/* .....................................\n  Default Sizing\n..................................... */\n/* .....................................\n  Vimeo Specific Fonts\n..................................... */\n/* .....................................\n  Vimeo Specific Widths\n..................................... */\n/* .....................................\n  Vimeo Media Query Breakpoints\n..................................... */\n.Avatar_defaultAvatarXsmall__1F3aJ,\n.Avatar_defaultAvatarSmall__2Qaih,\n.Avatar_defaultAvatarMedium__3KWZI,\n.Avatar_defaultAvatarLarge__1hfuE,\n.Avatar_defaultAvatarXlarge__6Ag2X,\n.Avatar_defaultAvatarXxlarge__2b9Tp {\n  background-color: #00adef;\n  background-size: cover;\n  border-radius: 50%;\n  display: inline-block;\n  position: relative;\n  overflow: hidden; }\n  .Avatar_defaultAvatarXsmall__1F3aJ:before,\n  .Avatar_defaultAvatarSmall__2Qaih:before,\n  .Avatar_defaultAvatarMedium__3KWZI:before,\n  .Avatar_defaultAvatarLarge__1hfuE:before,\n  .Avatar_defaultAvatarXlarge__6Ag2X:before,\n  .Avatar_defaultAvatarXxlarge__2b9Tp:before {\n    color: #fff;\n    content: ' ';\n    display: block;\n    -webkit-background-clip: padding-box;\n    background-clip: padding-box;\n    width: 100%;\n    height: 100%;\n    background-image: url('data:image/svg+xml;charset=US-ASCII,<svg%20xmlns%3D\"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\"%20width%3D\"23\"%20height%3D\"23\"%20viewBox%3D\"0%200%2023%2023\"><g%20fill%3D\"%23ffffff\"><path%20d%3D\"M7.1%2011c1.8%200%201.8-2.8%200-2.8S5.3%2011%207.1%2011zM15.9%2011c1.8%200%201.8-2.8%200-2.8s-1.8%202.8%200%202.8z\"%20fill%3D\"%23ffffff\"><%2Fpath><path%20d%3D\"M4.2%2012.9c.3%200%20.5.2.5.5v1.4h13.6v-1.4c0-.3.2-.5.5-.5h3.8V4.6c0-.4-.3-.8-.8-.8H1.2c-.4%200-.8.4-.8.8v8.3h3.8zm11.7-5.7c3.1%200%203.1%204.8%200%204.8s-3.1-4.8%200-4.8zm-8.8%200c3.1%200%203.1%204.8%200%204.8S4%207.2%207.1%207.2z\"%20fill%3D\"%23ffffff\"><%2Fpath><path%20d%3D\"M19.3%2013.9v1.4c0%20.3-.2.5-.5.5H4.2c-.3%200-.5-.2-.5-.5v-1.4H.4v4.5c0%20.4.3.8.8.8h20.7c.4%200%20.8-.4.8-.8v-4.5h-3.4z\"%20fill%3D\"%23ffffff\"><%2Fpath><%2Fg><path%20d%3D\"M7.1%208.2c-1.8%200-1.8%202.8%200%202.8s1.8-2.8%200-2.8zM15.9%208.2c-1.8%200-1.8%202.8%200%202.8s1.8-2.8%200-2.8z\"%20fill%3D\"%23ffffff\"><%2Fpath><%2Fsvg>');\n    background-repeat: no-repeat;\n    background-position: 50% 50%;\n    background-size: 50%; }\n\n.Avatar_default-avatar-xsmall__1dZPQ {\n  width: 25px;\n  height: 25px; }\n\n.Avatar_defaultAvatarSmall__2Qaih {\n  height: 35px;\n  width: 35px; }\n\n.Avatar_defaultAvatarMedium__3KWZI {\n  width: 45px;\n  height: 45px; }\n\n.Avatar_defaultAvatarLarge__1hfuE {\n  height: 60px;\n  width: 60px; }\n\n.Avatar_default-avatar-xlarge__3XpS2 {\n  height: 80px;\n  width: 80px; }\n\n.Avatar_defaultAvatarXxlarge__2b9Tp {\n  width: 100px;\n  height: 100px; }\n\n.Avatar_avatarImage__3y074 {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-size: cover; }\n";
var styles = {"defaultAvatarXsmall":"Avatar_defaultAvatarXsmall__1F3aJ","defaultAvatarSmall":"Avatar_defaultAvatarSmall__2Qaih","defaultAvatarMedium":"Avatar_defaultAvatarMedium__3KWZI","defaultAvatarLarge":"Avatar_defaultAvatarLarge__1hfuE","defaultAvatarXlarge":"Avatar_defaultAvatarXlarge__6Ag2X","defaultAvatarXxlarge":"Avatar_defaultAvatarXxlarge__2b9Tp","default-avatar-xsmall":"Avatar_default-avatar-xsmall__1dZPQ","default-avatar-xlarge":"Avatar_default-avatar-xlarge__3XpS2","avatarImage":"Avatar_avatarImage__3y074"};
__$$styleInject(css);

var index$1 = createCommonjsModule(function (module) {
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var arguments$1 = arguments;

		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments$1[i];
			if (!arg) { continue; }

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ('object' !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (typeof undefined === 'function' && typeof undefined.amd === 'object' && undefined.amd) {
		// register as 'classnames', consistent with npm package name
		undefined('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());
});

/* eslint-disable react/no-unused-prop-types */

var setClass = function (props) {
  return index$1(( obj = {}, obj[styles.defaultAvatarXsmall] = props.size === 'xsmall', obj[styles.defaultAvatarSmall] = props.size === 'small', obj[styles.defaultAvatarMedium] = props.size === 'medium', obj[styles.defaultAvatarLarge] = props.size === 'large', obj[styles.defaultAvatarXlarge] = props.size === 'xlarge', obj[styles.defaultAvatarXxlarge] = props.size === 'xxlarge', obj ))
  var obj;
};


var Avatar$1 = function (props) {
  return (
    React__default.createElement( 'span', { className: setClass(props), style: { zIndex: 1 } },
      React__default.createElement( 'span', {
        className: styles.avatarImage, style: {
          backgroundImage: ("url('" + (props.image) + "')"),
        } })
    )
  );
};

var sizes = [ 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge' ];

Avatar$1.propTypes = {
  size: index.oneOf(sizes),
  image: index.string,
};

Avatar$1.defaultProps = {
  size: 'medium',
  image: '',
};

Avatar$1.propDescriptions = {
  size: ("One of: [\"" + (sizes.join('", "')) + "\"]"),
};

var css$1 = "/* .....................................\n  Vimeo Colors\n..................................... */\n/* .....................................\n  Grayscale\n..................................... */\n/* .....................................\n  Blues\n..................................... */\n/* .....................................\n  Greens\n..................................... */\n/* .....................................\n  Reds\n..................................... */\n/* .....................................\n  Interaction Colors\n..................................... */\n/* .....................................\n  Vimeo Legacy Colors\n..................................... */\n/* .....................................\n  Default Text\n..................................... */\n/* .....................................\n  Default Sizing\n..................................... */\n/* .....................................\n  Vimeo Colors\n..................................... */\n/* .....................................\n  Grayscale\n..................................... */\n/* .....................................\n  Blues\n..................................... */\n/* .....................................\n  Greens\n..................................... */\n/* .....................................\n  Reds\n..................................... */\n/* .....................................\n  Interaction Colors\n..................................... */\n/* .....................................\n  Vimeo Legacy Colors\n..................................... */\n/* .....................................\n  Default Text\n..................................... */\n/* .....................................\n  Default Sizing\n..................................... */\n/*.....................................\n  VIMEO FONT MIXINS\n......................................*/\n/* .....................................\n  Vimeo Colors\n..................................... */\n/* .....................................\n  Grayscale\n..................................... */\n/* .....................................\n  Blues\n..................................... */\n/* .....................................\n  Greens\n..................................... */\n/* .....................................\n  Reds\n..................................... */\n/* .....................................\n  Interaction Colors\n..................................... */\n/* .....................................\n  Vimeo Legacy Colors\n..................................... */\n/* .....................................\n  Default Text\n..................................... */\n/* .....................................\n  Default Sizing\n..................................... */\n/* .....................................\n  Vimeo Colors\n..................................... */\n/* .....................................\n  Grayscale\n..................................... */\n/* .....................................\n  Blues\n..................................... */\n/* .....................................\n  Greens\n..................................... */\n/* .....................................\n  Reds\n..................................... */\n/* .....................................\n  Interaction Colors\n..................................... */\n/* .....................................\n  Vimeo Legacy Colors\n..................................... */\n/* .....................................\n  Default Text\n..................................... */\n/* .....................................\n  Default Sizing\n..................................... */\n/* .....................................\n  Vimeo Specific Fonts\n..................................... */\n/* .....................................\n  Vimeo Specific Widths\n..................................... */\n/* .....................................\n  Vimeo Media Query Breakpoints\n..................................... */\n/* .....................................\n  Vimeo Colors\n..................................... */\n/* .....................................\n  Grayscale\n..................................... */\n/* .....................................\n  Blues\n..................................... */\n/* .....................................\n  Greens\n..................................... */\n/* .....................................\n  Reds\n..................................... */\n/* .....................................\n  Interaction Colors\n..................................... */\n/* .....................................\n  Vimeo Legacy Colors\n..................................... */\n/* .....................................\n  Default Text\n..................................... */\n/* .....................................\n  Default Sizing\n..................................... */\n.Button_smallButton__29nyN {\n  -webkit-transition: \"background-color\" 500ms ease-out;\n  -moz-transition: \"background-color\" 500ms ease-out;\n  -ms-transition: \"background-color\" 500ms ease-out;\n  -o-transition: \"background-color\" 500ms ease-out;\n  transition: \"background-color\" 500ms ease-out;\n  padding: 0 10px;\n  margin: 0;\n  line-height: 28px;\n  height: 30px;\n  font-size: 12px;\n  background-size: 13px 13px; }\n\n.Button_mediumButton__3YSpx {\n  -webkit-transition: \"background-color\" 500ms ease-out;\n  -moz-transition: \"background-color\" 500ms ease-out;\n  -ms-transition: \"background-color\" 500ms ease-out;\n  -o-transition: \"background-color\" 500ms ease-out;\n  transition: \"background-color\" 500ms ease-out;\n  padding: 0 20px;\n  margin: 0;\n  line-height: 38px;\n  height: 40px;\n  font-size: 14px;\n  background-size: 15px 15px; }\n\n.Button_largeButton__1XOsT {\n  -webkit-transition: \"background-color\" 500ms ease-out;\n  -moz-transition: \"background-color\" 500ms ease-out;\n  -ms-transition: \"background-color\" 500ms ease-out;\n  -o-transition: \"background-color\" 500ms ease-out;\n  transition: \"background-color\" 500ms ease-out;\n  padding: 0 30px;\n  margin: 0;\n  line-height: 58px;\n  height: 60px;\n  font-size: 20px;\n  letter-spacing: 1px;\n  background-size: 23px 23px; }\n\n.Button_fillButton__2P5X7 {\n  -webkit-transition: \"background-color\" 500ms ease-out;\n  -moz-transition: \"background-color\" 500ms ease-out;\n  -ms-transition: \"background-color\" 500ms ease-out;\n  -o-transition: \"background-color\" 500ms ease-out;\n  transition: \"background-color\" 500ms ease-out;\n  box-sizing: border-box;\n  width: 100%; }\n\n.Button_halfButton__3LMse {\n  -webkit-transition: \"background-color\" 500ms ease-out;\n  -moz-transition: \"background-color\" 500ms ease-out;\n  -ms-transition: \"background-color\" 500ms ease-out;\n  -o-transition: \"background-color\" 500ms ease-out;\n  transition: \"background-color\" 500ms ease-out;\n  box-sizing: border-box;\n  width: 48%;\n  margin: 0 0.5%; }\n\n.Button_grayButton__2UJIP {\n  background-color: #e3e8e9;\n  border: 1px solid #e3e8e9;\n  color: #1a2e3b;\n  outline: none;\n  border-radius: 5px; }\n  .Button_grayButton__2UJIP:active, .Button_grayButton__2UJIP:hover, .Button_grayButton__2UJIP:focus {\n    background-color: #c6d1d3;\n    border: 1px solid #c6d1d3;\n    color: #1a2e3b;\n    text-decoration: none; }\n  .Button_grayButton__2UJIP:link, .Button_grayButton__2UJIP:visited {\n    background-color: #e3e8e9;\n    border: 1px solid #e3e8e9;\n    color: #1a2e3b;\n    text-decoration: none; }\n\n.Button_whiteButton__1RjUf {\n  background-color: #fff;\n  border: 1px solid #e3e8e9;\n  color: #1a2e3b;\n  outline: none;\n  border-radius: 5px; }\n  .Button_whiteButton__1RjUf:active, .Button_whiteButton__1RjUf:hover, .Button_whiteButton__1RjUf:focus {\n    background-color: #e3e8e9;\n    border: 1px solid #c6d1d3;\n    color: #1a2e3b;\n    text-decoration: none; }\n  .Button_whiteButton__1RjUf:link, .Button_whiteButton__1RjUf:visited {\n    background-color: #fff;\n    border: 1px solid #e3e8e9;\n    color: #1a2e3b;\n    text-decoration: none; }\n\n.Button_redButton__3EzjL {\n  background-color: #ff4d4d;\n  border: 1px solid #ff4d4d;\n  color: #fff;\n  outline: none;\n  border-radius: 5px; }\n  .Button_redButton__3EzjL:active, .Button_redButton__3EzjL:hover, .Button_redButton__3EzjL:focus {\n    background-color: #ff1a1a;\n    border: 1px solid #ff1a1a;\n    color: #fff;\n    text-decoration: none; }\n  .Button_redButton__3EzjL:link, .Button_redButton__3EzjL:visited {\n    background-color: #ff4d4d;\n    border: 1px solid #ff4d4d;\n    color: #fff;\n    text-decoration: none; }\n\n.Button_vimeoAlt__1rtNL {\n  background-color: #1a2e3b;\n  border: 1px solid #1a2e3b;\n  color: #fff;\n  outline: none;\n  border-radius: 5px; }\n  .Button_vimeoAlt__1rtNL:active, .Button_vimeoAlt__1rtNL:hover, .Button_vimeoAlt__1rtNL:focus {\n    background-color: #0a1218;\n    border: 1px solid #0a1218;\n    color: #fff;\n    text-decoration: none; }\n  .Button_vimeoAlt__1rtNL:link, .Button_vimeoAlt__1rtNL:visited {\n    background-color: #1a2e3b;\n    border: 1px solid #1a2e3b;\n    color: #fff;\n    text-decoration: none; }\n\n.Button_vimeoBlue__2YD1S {\n  background-color: #00adef;\n  border: 1px solid #00adef;\n  color: #fff;\n  outline: none;\n  border-radius: 5px; }\n  .Button_vimeoBlue__2YD1S:active, .Button_vimeoBlue__2YD1S:hover, .Button_vimeoBlue__2YD1S:focus {\n    background-color: #0088bc;\n    border: 1px solid #0088bc;\n    color: #fff;\n    text-decoration: none; }\n  .Button_vimeoBlue__2YD1S:link, .Button_vimeoBlue__2YD1S:visited {\n    background-color: #00adef;\n    border: 1px solid #00adef;\n    color: #fff;\n    text-decoration: none; }\n\n.Button_vimeoSecondary__2krAP {\n  background-color: #e3e8e9;\n  border: 1px solid #e3e8e9;\n  color: #1a2e3b;\n  outline: none;\n  border-radius: 5px; }\n  .Button_vimeoSecondary__2krAP:active, .Button_vimeoSecondary__2krAP:hover, .Button_vimeoSecondary__2krAP:focus {\n    background-color: #c6d1d3;\n    border: 1px solid #c6d1d3;\n    color: #1a2e3b;\n    text-decoration: none; }\n  .Button_vimeoSecondary__2krAP:link, .Button_vimeoSecondary__2krAP:visited {\n    background-color: #e3e8e9;\n    border: 1px solid #e3e8e9;\n    color: #1a2e3b;\n    text-decoration: none; }\n\n.Button_vimeoSecondaryOutline__3oRZP {\n  background-color: #fff;\n  border: 1px solid #b3bfc8;\n  color: #b3bfc8;\n  outline: none;\n  border-radius: 5px; }\n  .Button_vimeoSecondaryOutline__3oRZP:active, .Button_vimeoSecondaryOutline__3oRZP:hover, .Button_vimeoSecondaryOutline__3oRZP:focus {\n    background-color: #e3e8e9;\n    border: 1px solid #e3e8e9;\n    color: #1a2e3b;\n    text-decoration: none; }\n  .Button_vimeoSecondaryOutline__3oRZP:link, .Button_vimeoSecondaryOutline__3oRZP:visited {\n    background-color: #fff;\n    border: 1px solid #b3bfc8;\n    color: #b3bfc8;\n    text-decoration: none; }\n\n.Button_transparentButton__KbkGC {\n  background-color: rgba(255, 255, 255, 0.5);\n  border: 1px solid transparent;\n  color: #fff;\n  outline: none;\n  border-radius: 5px; }\n  .Button_transparentButton__KbkGC:active, .Button_transparentButton__KbkGC:hover, .Button_transparentButton__KbkGC:focus {\n    background-color: rgba(255, 255, 255, 0.7);\n    border: 1px solid transparent;\n    color: #fff;\n    text-decoration: none; }\n  .Button_transparentButton__KbkGC:link, .Button_transparentButton__KbkGC:visited {\n    background-color: rgba(255, 255, 255, 0.5);\n    border: 1px solid transparent;\n    color: #fff;\n    text-decoration: none; }\n\n.Button_twitterButton__mrD3A {\n  background-color: #55ACEE;\n  border: 1px solid #2795e9;\n  color: #fff;\n  outline: none;\n  border-radius: 5px; }\n  .Button_twitterButton__mrD3A:active, .Button_twitterButton__mrD3A:hover, .Button_twitterButton__mrD3A:focus {\n    background-color: #2795e9;\n    border: 1px solid #147bc9;\n    color: #fff;\n    text-decoration: none; }\n  .Button_twitterButton__mrD3A:link, .Button_twitterButton__mrD3A:visited {\n    background-color: #55ACEE;\n    border: 1px solid #2795e9;\n    color: #fff;\n    text-decoration: none; }\n\n.Button_facebookButton__3F_3c {\n  background-color: #3B5999;\n  border: 1px solid #2d4474;\n  color: #fff;\n  outline: none;\n  border-radius: 5px; }\n  .Button_facebookButton__3F_3c:active, .Button_facebookButton__3F_3c:hover, .Button_facebookButton__3F_3c:focus {\n    background-color: #2d4474;\n    border: 1px solid #1f2e4f;\n    color: #fff;\n    text-decoration: none; }\n  .Button_facebookButton__3F_3c:link, .Button_facebookButton__3F_3c:visited {\n    background-color: #3B5999;\n    border: 1px solid #2d4474;\n    color: #fff;\n    text-decoration: none; }\n\n.Button_tumblrButton__1D5Po {\n  background-color: #34465D;\n  border: 1px solid #222d3c;\n  color: #fff;\n  outline: none;\n  border-radius: 5px; }\n  .Button_tumblrButton__1D5Po:active, .Button_tumblrButton__1D5Po:hover, .Button_tumblrButton__1D5Po:focus {\n    background-color: #222d3c;\n    border: 1px solid #10151b;\n    color: #fff;\n    text-decoration: none; }\n  .Button_tumblrButton__1D5Po:link, .Button_tumblrButton__1D5Po:visited {\n    background-color: #34465D;\n    border: 1px solid #222d3c;\n    color: #fff;\n    text-decoration: none; }\n\n.Button_paypalButton__1prW9 {\n  background-color: #00457C;\n  border: 1px solid #002949;\n  color: #fff;\n  outline: none;\n  border-radius: 5px; }\n  .Button_paypalButton__1prW9:active, .Button_paypalButton__1prW9:hover, .Button_paypalButton__1prW9:focus {\n    background-color: #002949;\n    border: 1px solid #000c16;\n    color: #fff;\n    text-decoration: none; }\n  .Button_paypalButton__1prW9:link, .Button_paypalButton__1prW9:visited {\n    background-color: #00457C;\n    border: 1px solid #002949;\n    color: #fff;\n    text-decoration: none; }\n\n.Button_rokuButton__2z2Pp {\n  background-color: #662C91;\n  border: 1px solid #4a206a;\n  color: #fff;\n  outline: none;\n  border-radius: 5px; }\n  .Button_rokuButton__2z2Pp:active, .Button_rokuButton__2z2Pp:hover, .Button_rokuButton__2z2Pp:focus {\n    background-color: #4a206a;\n    border: 1px solid #2f1443;\n    color: #fff;\n    text-decoration: none; }\n  .Button_rokuButton__2z2Pp:link, .Button_rokuButton__2z2Pp:visited {\n    background-color: #662C91;\n    border: 1px solid #4a206a;\n    color: #fff;\n    text-decoration: none; }\n\n.Button_isProcessing__3TuVR {\n  width: 23px;\n  height: 23px;\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%0D%0A%20%20viewBox%3D%220%200%2040%2040%22%20xml%3Aspace%3D%22preserve%22%3E%0D%0A%3Cpath%20opacity%3D%220.2%22%20fill%3D%22%23233741%22%20d%3D%22M20.201%2C5.169c-8.254%2C0-14.946%2C6.692-14.946%2C14.946c0%2C8.255%2C6.692%2C14.946%2C14.946%2C14.946%0D%0A%20%20s14.946-6.691%2C14.946-14.946C35.146%2C11.861%2C28.455%2C5.169%2C20.201%2C5.169z%20M20.201%2C31.749c-6.425%2C0-11.634-5.208-11.634-11.634%0D%0A%20%20c0-6.425%2C5.209-11.634%2C11.634-11.634c6.425%2C0%2C11.633%2C5.209%2C11.633%2C11.634C31.834%2C26.541%2C26.626%2C31.749%2C20.201%2C31.749z%22%2F%3E%0D%0A%3Cpath%20fill%3D%22%23233741%22%20d%3D%22M26.013%2C10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0%0D%0A%20%20C22.32%2C8.481%2C24.301%2C9.057%2C26.013%2C10.047z%22%3E%0D%0A%20%20%3CanimateTransform%20attributeType%3D%22xml%22%0D%0A%20%20%20%20attributeName%3D%22transform%22%0D%0A%20%20%20%20type%3D%22rotate%22%0D%0A%20%20%20%20from%3D%220%2020%2020%22%0D%0A%20%20%20%20to%3D%22360%2020%2020%22%0D%0A%20%20%20%20dur%3D%220.5s%22%0D%0A%20%20%20%20repeatCount%3D%22indefinite%22%2F%3E%0D%0A%20%20%3C%2Fpath%3E%0D%0A%3C%2Fsvg%3E\");\n  background-position: center center;\n  color: transparent;\n  background-repeat: no-repeat; }\n";
var styles$1 = {"smallButton":"Button_smallButton__29nyN","mediumButton":"Button_mediumButton__3YSpx","largeButton":"Button_largeButton__1XOsT","fillButton":"Button_fillButton__2P5X7","halfButton":"Button_halfButton__3LMse","grayButton":"Button_grayButton__2UJIP","whiteButton":"Button_whiteButton__1RjUf","redButton":"Button_redButton__3EzjL","vimeoAlt":"Button_vimeoAlt__1rtNL","vimeoBlue":"Button_vimeoBlue__2YD1S","vimeoSecondary":"Button_vimeoSecondary__2krAP","vimeoSecondaryOutline":"Button_vimeoSecondaryOutline__3oRZP","transparentButton":"Button_transparentButton__KbkGC","twitterButton":"Button_twitterButton__mrD3A","facebookButton":"Button_facebookButton__3F_3c","tumblrButton":"Button_tumblrButton__1D5Po","paypalButton":"Button_paypalButton__1prW9","rokuButton":"Button_rokuButton__2z2Pp","isProcessing":"Button_isProcessing__3TuVR"};
__$$styleInject(css$1);

/* eslint-disable react/no-unused-prop-types */

function getClassName(ref) {
  var className = ref.className;
  var color = ref.color;
  var size = ref.size;
  var typeface = ref.typeface;
  var processing = ref.processing;

  return index$1('btn', className, ( obj = {}, obj[styles$1.grayButton] = color === 'gray', obj[styles$1.whiteButton] = color === 'white', obj[styles$1.redButton] = color === 'red', obj[styles$1.vimeoAlt] = color === 'vimeo-alt', obj[styles$1.vimeoBlue] = color === 'vimeo-blue', obj[styles$1.vimeoSecondary] = color === 'vimeo-secondary', obj[styles$1.vimeoSecondaryOutline] = color === 'vimeo-secondary-outline', obj[styles$1.transparentButton] = color === 'transparent', obj[styles$1.twitterButton] = color === 'twitter', obj[styles$1.facebookButton] = color === 'facebook', obj[styles$1.tumblrButton] = color === 'tumblr', obj[styles$1.paypalButton] = color === 'paypal', obj[styles$1.rokuButton] = color === 'roku', obj[styles$1.smallButton] = size === 'small', obj[styles$1.mediumButton] = size === 'medium', obj[styles$1.largeButton] = size === 'large', obj[styles$1.halfButton] = size === 'half', obj[styles$1.fillButton] = size === 'fill', obj[styles$1.isProcessing] = processing === true, obj ));
  var obj;
}

var Button$1 = function (props) {
  var cl = getClassName(props);
  return (
    React__default.createElement( 'button', Object.assign({}, { className: cl }, excludeProps([ 'className', 'children', 'color', 'processing', 'size', 'typeface' ], props)), props.children)
  );
};

var colors = [ 'gray', 'white', 'red', 'transparent', 'vimeo-blue', 'vimeo-secondary', 'vimeo-secondary-outline', 'vimeo-alt', 'twitter', 'facebook', 'tumblr', 'paypal', 'roku' ];
var sizes$1 = [ 'small', 'medium', 'large', 'half', 'fill' ];

Button$1.propTypes = {
  children: index.node,
  className: index.string,
  color: index.oneOf(colors),
  processing: index.bool,
  onClick: index.func,
  size: index.oneOf(sizes$1),
};

Button$1.defaultProps = {
  className: '',
  color: 'gray',
  onClick: null,
  processing: false,
  size: 'medium',
};

Button$1.propDescriptions = {
  color: ("One of: [\"" + (colors.join('", "')) + "\"]"),
  processing: 'Displays loading indicator',
  size: ("One of: [\"" + (sizes$1.join('", "')) + "\"]"),
};

var iconList = [ 'activity', 'add-member', 'alert', 'align', 'amex-card', 'android-workmark', 'android', 'angle-down', 'angle-left', 'angle-up', 'angle-right', 'api', 'apple', 'apps', 'arrow-down', 'arrow-left', 'arrow-right', 'arrow-up', 'audio', 'ban', 'bell', 'briefcase', 'calendar', 'camera', 'card', 'caret-down', 'caret-left', 'caret-right', 'caret-up', 'cassette-frown', 'cassette', 'chevron-down', 'check', 'chevron-left', 'chevron-right', 'chevron-up', 'chrome', 'clapboard', 'clock', 'code', 'cog', 'collection', 'comment', 'comments', 'currency', 'desktop', 'diners-card', 'csv', 'discover-card', 'doc', 'download-alt', 'download', 'dropbox', 'edit', 'ellipsis-vertical', 'ellipsis', 'envelope-sealed', 'envelope', 'external-link', 'eye', 'facebook', 'followers', 'gift', 'globe', 'grid', 'help', 'hi', 'home', 'instagram', 'invoice', 'ios', 'jcb-card', 'justify', 'key', 'link', 'list', 'lock', 'marker', 'mastercard-card', 'media', 'member', 'money-card', 'money-circle', 'money', 'paypal-card', 'pic', 'play-outline', 'play', 'plus-thin', 'plus', 'popular', 'power', 'printer', 'product', 'question', 'random', 'referral', 'refresh', 'revert', 'roku-wordmark', 'reply', 'roku', 'search', 'sliders', 'star-outline', 'star', 'tag', 'tags', 'todo', 'trash', 'transaction', 'tumblr', 'tv', 'tvos', 'twitter', 'upload-alt', 'upload', 'vhs', 'vhx', 'vimeovhx-dark', 'vimeovhx-light', 'visa-card', 'window', 'x', 'xmas-tree' ];

var css$2 = "/* .....................................\n  Vimeo Colors\n..................................... */\n/* .....................................\n  Grayscale\n..................................... */\n/* .....................................\n  Blues\n..................................... */\n/* .....................................\n  Greens\n..................................... */\n/* .....................................\n  Reds\n..................................... */\n/* .....................................\n  Interaction Colors\n..................................... */\n/* .....................................\n  Vimeo Legacy Colors\n..................................... */\n/* .....................................\n  Default Text\n..................................... */\n/* .....................................\n  Default Sizing\n..................................... */\n/* .....................................\n  Vimeo Colors\n..................................... */\n/* .....................................\n  Grayscale\n..................................... */\n/* .....................................\n  Blues\n..................................... */\n/* .....................................\n  Greens\n..................................... */\n/* .....................................\n  Reds\n..................................... */\n/* .....................................\n  Interaction Colors\n..................................... */\n/* .....................................\n  Vimeo Legacy Colors\n..................................... */\n/* .....................................\n  Default Text\n..................................... */\n/* .....................................\n  Default Sizing\n..................................... */\n/*.....................................\n  VIMEO FONT MIXINS\n......................................*/\n/* .....................................\n  Vimeo Colors\n..................................... */\n/* .....................................\n  Grayscale\n..................................... */\n/* .....................................\n  Blues\n..................................... */\n/* .....................................\n  Greens\n..................................... */\n/* .....................................\n  Reds\n..................................... */\n/* .....................................\n  Interaction Colors\n..................................... */\n/* .....................................\n  Vimeo Legacy Colors\n..................................... */\n/* .....................................\n  Default Text\n..................................... */\n/* .....................................\n  Default Sizing\n..................................... */\n/* .....................................\n  Vimeo Colors\n..................................... */\n/* .....................................\n  Grayscale\n..................................... */\n/* .....................................\n  Blues\n..................................... */\n/* .....................................\n  Greens\n..................................... */\n/* .....................................\n  Reds\n..................................... */\n/* .....................................\n  Interaction Colors\n..................................... */\n/* .....................................\n  Vimeo Legacy Colors\n..................................... */\n/* .....................................\n  Default Text\n..................................... */\n/* .....................................\n  Default Sizing\n..................................... */\n/* .....................................\n  Vimeo Specific Fonts\n..................................... */\n/* .....................................\n  Vimeo Specific Widths\n..................................... */\n/* .....................................\n  Vimeo Media Query Breakpoints\n..................................... */\n.Icon_icon__1SIxy {\n  display: inline-block;\n  background-position: 50% 50%;\n  background-size: contain;\n  text-indent: -9999px; }\n";
var styles$2 = {"icon":"Icon_icon__1SIxy"};
__$$styleInject(css$2);

/* eslint-disable react/no-unused-prop-types */
var iconSize = function (props) {
  if (props.size == 'xxsmall') {
    return '15px';
  }

  if (props.size == 'xsmall') {
    return '15px';
  }

  if (props.size == 'small') {
    return '25px';
  }

  if (props.size == 'medium') {
    return '35px';
  }

  if (props.size == 'large') {
    return '45px';
  }

  if (props.size == 'xlarge') {
    return '55px';
  }

  if (props.size == 'xxlarge') {
    return '65px';
  }

  return '25px';
};

// note, if more colors are needed, they may be re-added
var iconColor = function (props) {
  if (props.color === 'white') {
    return '#ffffff';
  }

  if (props.color === 'VimeoBlue') {
    return '#00adef';
  }

  if (props.color === 'SunsetOrange') {
    return '#ff4d4d';
  }

  if (props.color === 'Porcelain') {
    return '#e3e8e9';
  }

  if (props.color === 'AstroGranite') {
    return '#1a2e3b';
  }

  return null;
};

var Icon$1 = function (props) {
  var iconStyles = {
    backgroundColor: iconColor(props),
    width: iconSize(props),
    height: iconSize(props),
    backgroundImage: ("url(" + (props.src) + ")"),
  };
  return (
    React__default.createElement( 'div', {
      className: styles$2.icon, style: iconStyles })
  );
};

var colors$1 = [ '', 'VimeoBlue', 'SunsetOrange', 'white',  'Porcelain', 'AstroGranite' ];
var sizes$2 = [ 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge' ];

Icon$1.propTypes = {
  color: index.oneOf(colors$1),
  size: index.oneOf(sizes$2),
  src: index.string,
};

Icon$1.defaultProps = {
  color: null,
  size: 'small',
  src: '',
};

Icon$1.propDescriptions = {
  color: ("One of: [\"" + (colors$1.join('", "')) + "\"]"),
  src: 'String: an image hosted locally in your repository',
  size: ("One of: [\"" + (sizes$2.join('", "')) + "\"]"),
};

/* eslint-disable import/prefer-default-export */

var KEY_CODES = Object.freeze({
  ESC: 27,
  LEFT: 37,
  RIGHT: 39,
});

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

function getZIndex(topSlideIndex, bgSlideIndex, currentIndex) {
  if (currentIndex === topSlideIndex) { return '1'; }
  if (currentIndex === bgSlideIndex) { return '0'; }
  return '-1';
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

  Carousel.prototype.goToSlide = function goToSlide (i, overrideDirection, eventType) {
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

    this.props.onSlideChange({ slideIndex: i, eventType: eventType });
  };

  Carousel.prototype.next = function next () {
    var nextSlide = calcNext(this.props.slides.length, this.state.topSlideIndex);
    this.goToSlide(nextSlide, 'TO_LEFT', 'carousel_next');
  };

  Carousel.prototype.prev = function prev () {
    var prevSlide = calcPrev(this.props.slides.length, this.state.topSlideIndex);
    this.goToSlide(prevSlide, 'TO_RIGHT', 'carousel_prev');
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
        key: i, className: isCurrent ? 'coin active' : 'coin', disabled: isCurrent || isAnimating, onClick: function () { return this$1.goToSlide(i, '', 'carousel_coin'); } })
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
                key: id, animationDuration: animationDuration, enter: (bgSlideIndex === i || topSlideIndex === i) && !(isFresh && i === 1), enterDirection: enterDirection, exitDirection: topSlideIndex === i ? exitDirection : '', height: height, isMobile: isMobile, width: width, zIndex: getZIndex(topSlideIndex, bgSlideIndex, i) })
            );
    })
        ),
        React__default.createElement( If$1, { condition: slides.length > 1 },
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

aspectRatioPropType.isRequired = false;

Carousel$1.propTypes = {
  animationDuration: index.number,
  aspectRatio: aspectRatioPropType,
  maxHeight: index.number,
  minHeight: index.number,
  onSlideChange: index.func,
  slides: index.arrayOf(index.shape({
    Slide: index.func.isRequired,
    id: index.string.isRequired,
  }).isRequired).isRequired,
};

Carousel$1.defaultProps = {
  animationDuration: 600, // ms
  aspectRatio: '16:6',
  maxHeight: 640, // px
  minHeight: 368, // px
  onSlideChange: noop,
};

Carousel$1.propDescriptions = {
  animationDuration: 'Milliseconds',
  aspectRatio: 'String of two integers separated by ":"',
  slides: 'Array of objects: { Slide: Component, id: String }',
};

var css$3 = "/* .....................................\n  Vimeo Colors\n..................................... */\n/* .....................................\n  Grayscale\n..................................... */\n/* .....................................\n  Blues\n..................................... */\n/* .....................................\n  Greens\n..................................... */\n/* .....................................\n  Reds\n..................................... */\n/* .....................................\n  Interaction Colors\n..................................... */\n/* .....................................\n  Vimeo Legacy Colors\n..................................... */\n/* .....................................\n  Default Text\n..................................... */\n/* .....................................\n  Default Sizing\n..................................... */\n/* .....................................\n  Vimeo Colors\n..................................... */\n/* .....................................\n  Grayscale\n..................................... */\n/* .....................................\n  Blues\n..................................... */\n/* .....................................\n  Greens\n..................................... */\n/* .....................................\n  Reds\n..................................... */\n/* .....................................\n  Interaction Colors\n..................................... */\n/* .....................................\n  Vimeo Legacy Colors\n..................................... */\n/* .....................................\n  Default Text\n..................................... */\n/* .....................................\n  Default Sizing\n..................................... */\n/*.....................................\n  VIMEO FONT MIXINS\n......................................*/\n/* .....................................\n  Vimeo Colors\n..................................... */\n/* .....................................\n  Grayscale\n..................................... */\n/* .....................................\n  Blues\n..................................... */\n/* .....................................\n  Greens\n..................................... */\n/* .....................................\n  Reds\n..................................... */\n/* .....................................\n  Interaction Colors\n..................................... */\n/* .....................................\n  Vimeo Legacy Colors\n..................................... */\n/* .....................................\n  Default Text\n..................................... */\n/* .....................................\n  Default Sizing\n..................................... */\n/* .....................................\n  Vimeo Colors\n..................................... */\n/* .....................................\n  Grayscale\n..................................... */\n/* .....................................\n  Blues\n..................................... */\n/* .....................................\n  Greens\n..................................... */\n/* .....................................\n  Reds\n..................................... */\n/* .....................................\n  Interaction Colors\n..................................... */\n/* .....................................\n  Vimeo Legacy Colors\n..................................... */\n/* .....................................\n  Default Text\n..................................... */\n/* .....................................\n  Default Sizing\n..................................... */\n/* .....................................\n  Vimeo Specific Fonts\n..................................... */\n/* .....................................\n  Vimeo Specific Widths\n..................................... */\n/* .....................................\n  Vimeo Media Query Breakpoints\n..................................... */\n.Checkbox_checkbox__qoIPk {\n  transition: border 400ms ease-out;\n  border: 1px solid #e3e8e9;\n  background-image: none; }\n\n.Checkbox_checkboxSmall__1YcL5 {\n  min-height: 13.33333px; }\n\n.Checkbox_checkboxContain__1MT0X {\n  min-height: 20px;\n  width: 100%;\n  display: block; }\n\n.Checkbox_checkboxCircle__3EVZy {\n  left: 0;\n  top: -2px;\n  width: 18px;\n  height: 18px;\n  transition: opacity 0.2s ease;\n  overflow: hidden;\n  position: absolute;\n  top: 0;\n  left: 0; }\n\n.Checkbox_circleTop__2rtHY {\n  height: 9px;\n  transition: opacity 0.2s ease;\n  overflow: hidden;\n  position: absolute;\n  top: 0;\n  left: 0; }\n\n.Checkbox_circleBottom__3xDHJ {\n  height: 9px;\n  transition: opacity 0.2s ease;\n  overflow: hidden;\n  position: absolute;\n  bottom: 0;\n  left: 0; }\n\n.Checkbox_checkboxAnimate__3PyrG,\n.Checkbox_toggle__18A4M,\n.Checkbox_alt__me0qn {\n  display: block; }\n\n.Checkbox_checkboxIcon__1FiGu,\n.Checkbox_checkboxIconSmall__24eJE,\n.Checkbox_checkboxIconMedium__xUUoF,\n.Checkbox_checkboxIconLarge__22UXG {\n  margin-right: 10px;\n  transition: border 400ms ease-out;\n  border: 1px solid #e3e8e9;\n  background-image: none;\n  display: inline-block;\n  float: left;\n  background-color: #fff;\n  background-position: 50% 50%;\n  background-size: 75%;\n  position: relative;\n  box-shadow: none;\n  border-radius: 3px; }\n\n.Checkbox_checkboxIconSmall__24eJE {\n  width: 13.33333px;\n  height: 13.33333px; }\n\n.Checkbox_checkboxIconMedium__xUUoF,\n.Checkbox_checkboxIcon__1FiGu {\n  width: 20px;\n  height: 20px; }\n\n.Checkbox_checkboxIconLarge__22UXG {\n  width: 40px;\n  height: 40px; }\n\n.Checkbox_checkboxLabel__2RlSe,\n.Checkbox_checkboxLabelSmall__CSn2t,\n.Checkbox_checkboxLabelMedium__t62Y4 {\n  margin-left: 10px;\n  position: absolute;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: block;\n  float: left; }\n\n.Checkbox_checkboxLabelSmall__CSn2t {\n  min-height: 13.33333px;\n  line-height: 13.33333px;\n  width: calc(100% - 18.33333px);\n  left: 18.33333px; }\n\n.Checkbox_checkboxLabelMedium__t62Y4,\n.Checkbox_checkboxLabel__2RlSe {\n  min-height: 20px;\n  line-height: 20px;\n  width: calc(100% - 25px);\n  left: 25px; }\n\n.Checkbox_checkboxLabelLarge__2jmXW {\n  margin-left: 5px;\n  min-height: 40px;\n  line-height: 40px;\n  float: left; }\n\n.Checkbox_checkboxLabel__2RlSe:after,\n.Checkbox_checkboxContain__1MT0X:after {\n  content: \"\";\n  display: table;\n  clear: both; }\n";
var styles$3 = {"checkbox":"Checkbox_checkbox__qoIPk","checkboxSmall":"Checkbox_checkboxSmall__1YcL5","checkboxContain":"Checkbox_checkboxContain__1MT0X","checkboxCircle":"Checkbox_checkboxCircle__3EVZy","circleTop":"Checkbox_circleTop__2rtHY","circleBottom":"Checkbox_circleBottom__3xDHJ","checkboxAnimate":"Checkbox_checkboxAnimate__3PyrG","toggle":"Checkbox_toggle__18A4M","alt":"Checkbox_alt__me0qn","checkboxIcon":"Checkbox_checkboxIcon__1FiGu","checkboxIconSmall":"Checkbox_checkboxIconSmall__24eJE","checkboxIconMedium":"Checkbox_checkboxIconMedium__xUUoF","checkboxIconLarge":"Checkbox_checkboxIconLarge__22UXG","checkboxLabel":"Checkbox_checkboxLabel__2RlSe","checkboxLabelSmall":"Checkbox_checkboxLabelSmall__CSn2t","checkboxLabelMedium":"Checkbox_checkboxLabelMedium__t62Y4","checkboxLabelLarge":"Checkbox_checkboxLabelLarge__2jmXW"};
__$$styleInject(css$3);

/* eslint-disable react/no-unused-prop-types */

var getClassName$1 = function (ref) {
  var type = ref.type;
  var size = ref.size;

  return index$1('checkbox', size, { alt: type === 'toggle' });
};

var StandardCheckbox = function () { return (
  React__default.createElement( 'span', { className: styles$3.checkboxIcon },
    React__default.createElement( 'span', { className: styles$3.checkboxAnimate })
  )
); };


var ToggleCheckbox = function () { return (
  React__default.createElement( 'span', null,
    React__default.createElement( 'span', { className: styles$3.checkboxIcon }),
    React__default.createElement( 'span', { className: styles$3.checkboxCircle },
      React__default.createElement( 'i', { className: 'circle-top' }, React__default.createElement( 'span', null )),
      React__default.createElement( 'i', { className: 'circle-bottom' }, React__default.createElement( 'span', null ))
    )
  )
); };


// NOTE: .form does not affect styles in any way, but is required for proper checkbox
// styling since quartz/components.css nests .checkbox under .form. This limitation can
// probably very easily be removed by changing https://github.com/vhx/quartz/blob/master/quartz-js/components/checkbox/styles/checkbox.scss
// to have .checkbox not be required to be a descendent of .form
var Checkbox$1 = function (props) {
  return (
    React__default.createElement( 'div', { className: 'form' },
      React__default.createElement( 'fieldset', { className: getClassName$1(props) },
        React__default.createElement( 'input', Object.assign({}, excludeProps([ 'label', 'uniqueId', 'size', 'type' ], props), { type: 'checkbox', name: props.uniqueId, id: props.uniqueId })),
        React__default.createElement( 'label', { htmlFor: props.uniqueId },
          React__default.createElement( 'span', { className: styles$3.checkboxContain },
            props.type === 'toggle' ? React__default.createElement( ToggleCheckbox, null ) : React__default.createElement( StandardCheckbox, null ),
            React__default.createElement( 'span', { className: styles$3.checkboxLabel }, props.label)
          )
        )
      )
    )
  );
};



var sizes$3 = [ 'small', 'medium', 'large' ];
var types = [ 'standard', 'toggle' ];

Checkbox$1.propTypes = {
  checked: index.bool,
  label: index.string,
  onChange: index.func,
  size: index.oneOf(sizes$3),
  type: index.oneOf(types),
  uniqueId: index.string.isRequired,
  value: index.string,
};

Checkbox$1.defaultProps = {
  checked: false,
  label: '',
  onChange: null,
  size: 'medium',
  type: 'standard',
  value: '',
};

Checkbox$1.propDescriptions = {
  size: ("One of: [\"" + (sizes$3.join('", "')) + "\"]"),
  type: ("One of: [\"" + (types.join('", "')) + "\"]"),
  uniqueId: 'Must be globally unique—this sets the checkbox element\'s id attribute.',
};

var css$4 = "/* .....................................\n  Vimeo Colors\n..................................... */\n/* .....................................\n  Grayscale\n..................................... */\n/* .....................................\n  Blues\n..................................... */\n/* .....................................\n  Greens\n..................................... */\n/* .....................................\n  Reds\n..................................... */\n/* .....................................\n  Interaction Colors\n..................................... */\n/* .....................................\n  Vimeo Legacy Colors\n..................................... */\n/* .....................................\n  Default Text\n..................................... */\n/* .....................................\n  Default Sizing\n..................................... */\n/* .....................................\n  Vimeo Colors\n..................................... */\n/* .....................................\n  Grayscale\n..................................... */\n/* .....................................\n  Blues\n..................................... */\n/* .....................................\n  Greens\n..................................... */\n/* .....................................\n  Reds\n..................................... */\n/* .....................................\n  Interaction Colors\n..................................... */\n/* .....................................\n  Vimeo Legacy Colors\n..................................... */\n/* .....................................\n  Default Text\n..................................... */\n/* .....................................\n  Default Sizing\n..................................... */\n/*.....................................\n  VIMEO FONT MIXINS\n......................................*/\n/* .....................................\n  Vimeo Colors\n..................................... */\n/* .....................................\n  Grayscale\n..................................... */\n/* .....................................\n  Blues\n..................................... */\n/* .....................................\n  Greens\n..................................... */\n/* .....................................\n  Reds\n..................................... */\n/* .....................................\n  Interaction Colors\n..................................... */\n/* .....................................\n  Vimeo Legacy Colors\n..................................... */\n/* .....................................\n  Default Text\n..................................... */\n/* .....................................\n  Default Sizing\n..................................... */\n/* .....................................\n  Vimeo Colors\n..................................... */\n/* .....................................\n  Grayscale\n..................................... */\n/* .....................................\n  Blues\n..................................... */\n/* .....................................\n  Greens\n..................................... */\n/* .....................................\n  Reds\n..................................... */\n/* .....................................\n  Interaction Colors\n..................................... */\n/* .....................................\n  Vimeo Legacy Colors\n..................................... */\n/* .....................................\n  Default Text\n..................................... */\n/* .....................................\n  Default Sizing\n..................................... */\n/* .....................................\n  Vimeo Specific Fonts\n..................................... */\n/* .....................................\n  Vimeo Specific Widths\n..................................... */\n/* .....................................\n  Vimeo Media Query Breakpoints\n..................................... */\n/* .....................................\n  Vimeo Colors\n..................................... */\n/* .....................................\n  Grayscale\n..................................... */\n/* .....................................\n  Blues\n..................................... */\n/* .....................................\n  Greens\n..................................... */\n/* .....................................\n  Reds\n..................................... */\n/* .....................................\n  Interaction Colors\n..................................... */\n/* .....................................\n  Vimeo Legacy Colors\n..................................... */\n/* .....................................\n  Default Text\n..................................... */\n/* .....................................\n  Default Sizing\n..................................... */\n.Header_headerContainer__yilsM {\n  margin: 0 -0.46868rem 0 -0.46868rem;\n  padding-bottom: 20px;\n  width: auto;\n  max-width: none; }\n\n.Header_headerContainerBorder__2UAc2 {\n  margin: 0 -0.46868rem 0 -0.46868rem;\n  padding-bottom: 20px;\n  border-bottom: 1px solid #e3e8e9;\n  border-radius: 0;\n  width: auto;\n  max-width: none; }\n  .Header_headerContainerBorder__2UAc2:after {\n    content: \"\";\n    display: table;\n    clear: both; }\n\n.Header_mediaColumnWrapper__2Dbms,\n.Header_headerColumnOptionsWrapper__2ehws {\n  padding-left: 0.46875rem;\n  padding-right: 0.46875rem;\n  position: relative;\n  width: 62.5%;\n  float: left; }\n\n.Header_mediaColumnWrapper__2Dbms {\n  width: 62.5%; }\n\n.Header_headerColumnOptionsWrapper__2ehws {\n  width: 37.5%;\n  text-align: right; }\n\n.Header_media__2FMow {\n  display: flex;\n  width: 100%;\n  justify-content: flex-start; }\n\n.Header_mediaIconUnit__aH-82,\n.Header_mediaTextUnit__489Dn {\n  display: inline-block; }\n\n.Header_mediaTextUnit__489Dn {\n  padding-left: 20px; }\n\n.Header_headerTitle__1yjzS {\n  font-family: \"brandon-grotesque-n1\", \"brandon-grotesque\", \"BrandonMedium\", sans-serif;\n  color: #1a2e3b;\n  font-weight: 400;\n  font-size: 22px;\n  line-height: 1.2;\n  letter-spacing: 1px;\n  text-transform: uppercase; }\n\n.Header_headerDescription__2Gcvk {\n  font-family: Helvetica, Arial, sans-serif;\n  color: #8699a6;\n  font-weight: 400;\n  font-size: 14px;\n  line-height: 1.2; }\n\n@media screen and (min-device-width: 768px) and (max-width: 1024px) {\n  .Header_mediaColumnWrapper__2Dbms,\n  .Header_headerColumnOptionsWrapper__2ehws {\n    width: 50%; } }\n\n@media screen and (min-device-width: 320px) and (max-width: 667px) {\n  .Header_mediaColumnWrapper__2Dbms,\n  .Header_headerColumnOptionsWrapper__2ehws {\n    width: 100%; } }\n";
var styles$4 = {"headerContainer":"Header_headerContainer__yilsM","headerContainerBorder":"Header_headerContainerBorder__2UAc2","mediaColumnWrapper":"Header_mediaColumnWrapper__2Dbms","headerColumnOptionsWrapper":"Header_headerColumnOptionsWrapper__2ehws","media":"Header_media__2FMow","mediaIconUnit":"Header_mediaIconUnit__aH-82","mediaTextUnit":"Header_mediaTextUnit__489Dn","headerTitle":"Header_headerTitle__1yjzS","headerDescription":"Header_headerDescription__2Gcvk"};
__$$styleInject(css$4);

var containerClasses = function (border) {
  return index$1(( obj = {}, obj[styles$4.headerContainer] = border === false || border === undefined, obj[styles$4.headerContainerBorder] = border === true, obj ));
  var obj;
};

var Header$1 = function (ref) {
  var border = ref.border;
  var children = ref.children;
  var Description = ref.Description;
  var icon = ref.icon;
  var title = ref.title;

  return (
    React__default.createElement( 'div', { className: containerClasses(border) },
      React__default.createElement( 'div', { className: styles$4.mediaColumnWrapper },
        React__default.createElement( 'div', { className: styles$4.media },
          React__default.createElement( 'div', { className: styles$4.mediaIconUnit },
            React__default.createElement( Icon$1, { name: icon, size: 'large' })
          ),
          React__default.createElement( 'div', { className: styles$4.mediaTextUnit },
            React__default.createElement( 'h2', { className: styles$4.headerTitle }, title),
            React__default.createElement( 'div', { className: styles$4.headerDescription }, typeof Description === 'string' ? Description : React__default.createElement( Description, null )
            )
          )
        )
      ),
      React__default.createElement( 'div', { className: styles$4.headerColumnOptionsWrapper }, children)
    )
  );
};

Header$1.propTypes = {
  border: index.bool,
  children: index.node,
  Description: index.oneOfType([ index.string, index.func ]), // can be a string or component
  icon: index.oneOf(iconList).isRequired,
  title: index.string.isRequired,
};

Header$1.defaultProps = {
  border: true,
  children: null,
  Description: '',
};

Header$1.propDescriptions = {
  Description: 'Either a string or component',
  icon: 'String: One of any of the valid icon names',
};

/* eslint-disable react/no-unused-prop-types */

function getClass(ref) {
  var className = ref.className;
  var error = ref.error;
  var search = ref.search;
  var small = ref.small;

  return index$1(className, {
    small: small,
    'is-error': error,
    'c-select--search': search,
    'padding-right-large': search,
    'icon-search-black': search,
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
  autoFocus: index.bool,
  className: index.string,
  disabled: index.bool,
  error: index.bool,
  id: index.string,
  name: index.string,
  onBlur: index.func,
  onChange: index.func,
  onFocus: index.func,
  onKeyDown: index.func,
  onKeyUp: index.func,
  onKeyPress: index.func,
  onInput: index.func,
  placeholder: index.string,
  search: index.bool,
  small: index.bool,
  style: index.object, // eslint-disable-line react/forbid-prop-types
  type: index.string,
  value: index.string.isRequired,
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
  var index$$1 = ref.index;

  return index$1({
    btn: true,
    'btn--half': actions.length > 1,
    'btn--fill': actions.length <= 1,
  }, ("btn-" + (actions[index$$1].color || 'gray')));
}

function handleEscapeKey(event) {
  if (event.keyCode === KEY_CODES.ESC) {
    modalModel.close();
  }
}

// Count number of mounted <Modal /> components
// so that we can warn if more than 1 exist
var modalsInitialized = 0;

var Modal$1 = (function (Component$$1) {
  function Modal() {
    Component$$1.call(this);
    this.el = null;
  }

  if ( Component$$1 ) Modal.__proto__ = Component$$1;
  Modal.prototype = Object.create( Component$$1 && Component$$1.prototype );
  Modal.prototype.constructor = Modal;

  Modal.prototype.componentWillMount = function componentWillMount () {
    if (modalsInitialized !== 0) {
      console.error('<Modal /> must be mounted only once'); // eslint-disable-line no-console
    }
    modalsInitialized++;
    window.addEventListener('keyup', handleEscapeKey);
  };

  Modal.prototype.componentDidMount = function componentDidMount () {
    var margin = parseInt(this.el.outerHeight / 2, 10);
    this.el.style.marginBottom = margin + "px";
  };

  Modal.prototype.componentWillUnmount = function componentWillUnmount () {
    modalsInitialized--;
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
          React__default.createElement( If$1, { condition: actions.length !== 0 },
            React__default.createElement( 'div', { className: 'c-modal--actions' },
              React__default.createElement( 'div', { className: 'padding-small text-center' },
                actions.map(function (action, index$$1) { return (
                    React__default.createElement( 'div', {
                      onClick: actions[index$$1].callback, key: action.label, className: getActionClass({ actions: actions, index: index$$1 }) },
                      actions[index$$1].label
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
  actions: index.arrayOf(index.shape({
    color: index.string,
    label: index.string.isRequired,
    callback: index.func.isRequired,
  })).isRequired,
  body: index.node.isRequired,
  isOpen: index.bool.isRequired,
  size: index.string,
  title: index.string,
};

Modal$1.defaultProps = {
  size: 'medium',
  title: '',
};

var Modal$2 = connect$$1(modalModel, Modal$1);

var MAX_VISIBLE_LINKS = 7;

var Separator = function () { return (
  React__default.createElement( 'span', { className: 'padding-small text--bold pagination-default' }, "...")
); };


var Pagination$1 = (function (Component$$1) {
  function Pagination() {
    Component$$1.call(this);
    this.link = this.link.bind(this);
    this.links = this.links.bind(this);
  }

  if ( Component$$1 ) Pagination.__proto__ = Component$$1;
  Pagination.prototype = Object.create( Component$$1 && Component$$1.prototype );
  Pagination.prototype.constructor = Pagination;

  Pagination.prototype.link = function link (i) {
    var ref = this.props;
    var currentIndex = ref.currentIndex;
    var onPageChange = ref.onPageChange;
    return (
      React__default.createElement( 'span', { className: ("pagination-button text--bold padding-vert-xsmall padding-horz-small radius " + (currentIndex === i ? 'active bg-gray-5 text--white' : '')), onClick: function () { return onPageChange(i); }, key: ("link-" + i) },
        i + 1
      )
    );
  };

  Pagination.prototype.links = function links () {
    var ref = this.props;
    var currentIndex = ref.currentIndex;
    var length = ref.length;
    var ref$1 = this;
    var link = ref$1.link;
    var truncateBefore = currentIndex > 3 && length > MAX_VISIBLE_LINKS;
    var truncateAfter = currentIndex < length - 4 && length > MAX_VISIBLE_LINKS;
    var links = [];
    if (truncateBefore) { links.push(React__default.createElement( Separator, { key: 'sep-0' })); }
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
      for (var i = 1; i < length - 1; i++) { links.push(link(i)); }
    }
    if (truncateAfter) { links.push(React__default.createElement( Separator, { key: ("sep-" + (currentIndex + 2)) })); }
    return links;
  };

  Pagination.prototype.render = function render () {
    var ref = this;
    var link = ref.link;
    var links = ref.links;
    var ref$1 = this.props;
    var currentIndex = ref$1.currentIndex;
    var onPageChange = ref$1.onPageChange;
    var length = ref$1.length;

    if (length === 0) { return React__default.createElement( 'nav', null ); }
    if (length === 1) { return React__default.createElement( 'nav', { className: 'text-center' }, link(0)); }

    // NOTE: we toggle the visibility of the "Previous"/"Next" links rather than removing those links altogether so that the layout doesn't re-center when those links disappear
    return (
      React__default.createElement( 'nav', { className: 'text-center' },
        React__default.createElement( 'span', { className: ("pagination-link text--bold padding-small text--teal " + (currentIndex === 0 ? 'invisible' : '')), onClick: function () { return onPageChange(currentIndex - 1); } }, "← Previous"),
        link(0),
        links(),
        link(length - 1),
        React__default.createElement( 'span', { className: ("pagination-link text--bold padding-small text--teal " + (currentIndex === length - 1 ? 'invisible' : '')), onClick: function () { return onPageChange(currentIndex + 1); } }, "Next →")
      )
    );
  };

  return Pagination;
}(React.Component));


Pagination$1.propTypes = {
  currentIndex: index.number,
  length: index.number.isRequired,
  onPageChange: index.func,
};

Pagination$1.defaultProps = {
  currentIndex: 0,
  onPageChange: noop,
};

Pagination$1.propDescriptions = {
  onPageChange: 'onPageChange(newIndex)',
};

var RadioIcon = function () { return (
  React__default.createElement( 'span', { className: 'radio--icon' },
    React__default.createElement( 'i', { className: 'circle-top' }, React__default.createElement( 'span', null )),
    React__default.createElement( 'i', { className: 'circle-bottom' }, React__default.createElement( 'span', null ))
  )
); };

var Radio = function (ref) {
  var checked = ref.checked;
  var index$$1 = ref.index;
  var label = ref.label;
  var onCheck = ref.onCheck;

  return (
  React__default.createElement( 'li', null,
    React__default.createElement( 'input', {
      type: 'radio', checked: checked, onChange: function (event) { return onCheck(event, index$$1); } }),
    React__default.createElement( 'label', { onClick: function (event) { return onCheck(event, index$$1); } },
      React__default.createElement( RadioIcon, null ),
      React__default.createElement( 'span', { className: 'radio--label text-left' }, label)
    )
  )
);
};

Radio.propTypes = {
  checked: index.bool.isRequired,
  index: index.number.isRequired,
  label: index.string.isRequired,
  onCheck: index.func.isRequired,
};

function getDescriptionClassName(checked) {
  return index$1({
    'text--white': checked,
    'text-4': true,
  });
}

function getClassName$3(checked) {
  return index$1({
    'btn-teal': checked,
    'btn-gray': !checked,
    'btn--fill': true,
    'btn-radio': true,
    'margin-bottom-medium': true,
  });
}

function getTitleClassName(checked) {
  return index$1({
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
  var index$$1 = ref.index;
  var label = ref.label;
  var onCheck = ref.onCheck;

  return (
  React__default.createElement( 'li', null,
    React__default.createElement( 'input', {
      type: 'radio', checked: checked, onChange: function (event) { return onCheck(event, index$$1); } }),
    React__default.createElement( 'label', { className: getClassName$3(checked), onClick: function (event) { return onCheck(event, index$$1); } },
      React__default.createElement( RadioIcon, null ),
      React__default.createElement( 'span', { className: 'radio--label text-left padding-left-small', style: getStyle(description) },
        React__default.createElement( 'strong', { className: getTitleClassName(checked) }, label),
        React__default.createElement( If$1, { condition: Boolean(description) },
          React__default.createElement( 'p', { className: getDescriptionClassName(checked) }, description)
        )
      )
    )
  )
);
};

RadioButton.propTypes = {
  checked: index.bool.isRequired,
  description: index.string,
  index: index.number.isRequired,
  label: index.string.isRequired,
  onCheck: index.func.isRequired,
};

RadioButton.defaultProps = {
  description: '',
};

function getClassName$2(ref) {
  var buttons = ref.buttons;
  var color = ref.color;
  var stacked = ref.stacked;

  return index$1({
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
    React__default.createElement( 'ul', { className: getClassName$2({ buttons: buttons, color: color, stacked: stacked }) },
      items.map(getRadioComponent({ buttons: buttons, onCheck: onCheck, selectedIndex: selectedIndex }))
    )
  )
);
};

var colors$2 = [ 'teal', 'gray' ];

var radioItemPropType = index.shape({
  label: index.string.isRequired,
  uniqueId: index.string.isRequired,
});

RadioGroup$1.propTypes = {
  buttons: index.bool,
  color: index.oneOf(colors$2),
  items: index.arrayOf(radioItemPropType).isRequired,
  onCheck: index.func,
  selectedIndex: index.number,
  stacked: index.bool,
};

RadioGroup$1.defaultProps = {
  buttons: false,
  color: 'teal',
  onCheck: noop,
  selectedIndex: -1,
  stacked: false,
};

RadioGroup$1.propDescriptions = {
  color: ("One of: [\"" + (colors$2.join('", "')) + "\"]"),
  items: 'Array of { label: String, uniqueId: String }, where uniqueId will be used as they key and need only be unique among the items in the radioGroup, not globally unique.',
  onCheck: 'onCheck(event, itemIndex)',
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

var sidebarsInitialized = 0;

var Sidebar$1 = (function (Component$$1) {
  function Sidebar () {
    Component$$1.apply(this, arguments);
  }

  if ( Component$$1 ) Sidebar.__proto__ = Component$$1;
  Sidebar.prototype = Object.create( Component$$1 && Component$$1.prototype );
  Sidebar.prototype.constructor = Sidebar;

  Sidebar.prototype.componentWillMount = function componentWillMount () {
    if (sidebarsInitialized !== 0) {
      throw Error('<Sidebar /> must be mounted only once');
    }
    sidebarsInitialized++;
  };
  Sidebar.prototype.componentWillUnmount = function componentWillUnmount () {
    sidebarsInitialized--;
  };
  Sidebar.prototype.render = function render () {
    var ref = this.props;
    var isOpen = ref.isOpen;
    var Contents = ref.Contents;
    return (
      React__default.createElement( 'div', { className: ("sidebar c-sidebar bg-white shadow--gray " + (isOpen ? 'sidebar--open' : '')) },
        React__default.createElement( 'span', { className: 'c-sidebar--close icon-circle icon-x-black icon--xsmall', style: { cursor: 'pointer' }, onClick: function () { return sidebarModel.close(); } }),
        React__default.createElement( 'div', null, React__default.createElement( Contents, null ) )
      )
    );
  };

  return Sidebar;
}(React.Component));


Sidebar$1.propTypes = {
  isOpen: index.bool.isRequired,
  Contents: index.func.isRequired,
};

var Sidebar$2 = connect$$1(sidebarModel, Sidebar$1);

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
    var children = ref$1.children;
    var img = ref$1.img;
    var mobileImg = ref$1.mobileImg;
    var isWide = ref$1.isWide;
    var display = zIndex === '-1' ? 'none' : 'block';
    return (
      React__default.createElement( 'div', { className: ("slide " + exitDirection + " " + (enter ? ("ENTER_" + enterDirection) : '')), style: { animationDuration: (animationDuration + "ms"), display: display, zIndex: zIndex } },
        React__default.createElement( 'div', { className: isMobile ? 'slide-bg slide-bg--mobile' : 'slide-bg' },
          React__default.createElement( 'div', { className: isWide ? 'slide-layout-wide' : 'slide-layout-container' },
            React__default.createElement( 'img', { className: 'slide-bg-img', src: isMobile ? mobileImg : img, alt: 'Slide image', style: { height: ((this.getImgHeight()) + "px") } })
          )
        ),
        React__default.createElement( 'div', { className: 'slide-layout-container' },
          React__default.createElement( 'div', { className: isMobile ? 'slide-content slide-content--mobile' : 'slide-content' },
            children
          )
        )
      )
    );
  };

  return Slide;
}(React.Component));

Slide$1.propTypes = {
  dynamicProps: index.shape({
    animationDuration: index.number.isRequired,
    enter: index.bool.isRequired,
    enterDirection: index.oneOf([ 'TO_LEFT', 'TO_RIGHT' ]).isRequired,
    exitDirection: index.oneOf([ '', 'TO_LEFT', 'TO_RIGHT' ]).isRequired,
    isMobile: index.bool.isRequired,
    height: index.number.isRequired,
    width: index.number.isRequired,
    zIndex: index.string.isRequired,
  }).isRequired,
  children: index.node.isRequired,
  img: index.string.isRequired,
  mobileImg: index.string.isRequired,
  isWide: index.bool,
};

Slide$1.defaultProps = {
  isWide: false,
};

function getClass$1(isHover) {
  return index$1({
    inline: true,
    relative: true,
    'c-tag': true,
    'is-hover': isHover,
  });
}

function getButtonClass(isHover, isProcessing) {
  return index$1({
    'c-tag--button': true,
    'btn-teal': isHover,
    'is-hover': isHover,
    'btn-gray': !isHover,
    'is-processing': isProcessing,
  });
}

function getLinkClass(isRemoveHover) {
  return index$1({
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
  label: index.string.isRequired,
  maxLength: index.number,
  isProcessing: index.bool,
  onClick: index.func,
  onRemove: index.func,
};

Tag$1.defaultProps = {
  maxLength: Infinity,
  isProcessing: false,
  onClick: null,
  onRemove: null,
};

/* eslint-disable react/no-unused-prop-types */

function getClassName$4(props) {
  return index$1(props.className, {
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
    'text--vimeo-blue': props.color === 'vimeo-blue',
    'text--sunset-orange': props.color === 'sunset-orange',
    'text--regent-gray': props.color === 'regent-gray',
    'text--astro-granite': props.color === 'astro-granite',
  });
}

var Text$1 = function (props) { return (
  React__default.createElement( 'span', { className: getClassName$4(props) }, props.children)
); };

var colors$3 = [ 'navy', 'gray', 'teal', 'white', 'vimeo-blue', 'sunset-orange', 'regent-gray', 'astro-granite' ];

Text$1.propTypes = {
  block: index.bool,
  children: index.node.isRequired,
  h1: index.bool,
  h2: index.bool,
  h3: index.bool,
  h4: index.bool,
  h5: index.bool,
  className: index.string,
  color: index.oneOf(colors$3),
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

Text$1.propDescriptions = {
  block: 'Set to true to make block-level text. Otherwise defaults to inline.',
  color: ("One of: [\"" + (colors$3.join('", "')) + "\"]"),
};

var If$3 = If$1;

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
        React__default.createElement( If$3, { condition: Boolean(search) },
          React__default.createElement( 'div', { className: 'c-select--input-container padding-medium absolute bg-white fill-width radius' },
            React__default.createElement( Input$1, { placeholder: 'Search', onInput: function (event) { return search(event.target.value); }, value: searchValue, autoFocus: true, search: true })
          )
        ),
        React__default.createElement( 'ul', { className: ("c-select--options margin-left-reset loader-slate loader--transparent " + (isLoading ? 'is-loading' : '')) },
          React__default.createElement( If$3, { condition: options.length === 0 },
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
    dropdownPosition: index.oneOf([ 'above', 'below' ]).isRequired,
    isLoading: index.bool,
    maxLabelLength: index.number.isRequired, // only currently used in MediaSelect, but there's no reason not to allow it in standard Select as well
    multiSelect: index.bool.isRequired,
    multiselect: typoPropType({ correct: 'multiSelect' }), // eslint-disable-line react/require-default-props, react/no-unused-prop-types
    onOpenToggle: index.func.isRequired,
    onSelectionToggle: index.func.isRequired,
    options: index.arrayOf(index.shape({
      description: index.string,
      label: index.string.isRequired,
      uniqueId: index.string.isRequired,
    })).isRequired,
    processingOptions: index.arrayOf(index.string).isRequired,
    selectedOptions: index.objectOf(index.bool).isRequired,
    search: index.func,
    searchValue: index.string,
  };

  SelectDropdown.defaultProps = {
    isLoading: false,
    search: null,
    searchValue: '',
  };

  return SelectDropdown;
}

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
    React__default.createElement( If$1, { condition: isSelected },
      React__default.createElement( Icon$1, { name: 'check', color: 'navy', size: 'xsmall', className: 'right margin-top-xsmall margin-left-small' })
    ),
    React__default.createElement( 'span', { className: 'c-select--item-label text--navy' }, label),
    React__default.createElement( 'span', { className: 'right text--gray' }, description)
  )
);
};

SelectDropdownOption.propTypes = {
  description: index.string,
  isLoading: index.bool.isRequired,
  isSelected: index.bool.isRequired,
  label: index.string.isRequired,
  onOptionToggle: index.func.isRequired,
  uniqueId: index.string.isRequired,
};

SelectDropdownOption.defaultProps = {
  description: '',
};

var SelectDropdown = SelectDropdownHOC({ Option: SelectDropdownOption });

function getTriggerClass(ref) {
  var color = ref.color;

  return index$1({
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
  React__default.createElement( 'a', {
    href: '#', role: 'button', className: getTriggerClass({ color: color }), onClick: function (event) {
      event.preventDefault();
      onOpenToggle(!isOpen);
    } },
    triggerLabel || triggerPlaceholder
  )
);
};

Trigger.propTypes = {
  color: index.oneOf([ 'gray', 'white', 'teal' ]).isRequired,
  isOpen: index.bool.isRequired,
  onOpenToggle: index.func.isRequired,
  triggerLabel: index.string.isRequired,
  triggerPlaceholder: index.string.isRequired,
};

/* eslint-disable react/no-unused-prop-types */

function getClass$2(props, type) {
  var caretAlign = props.caretAlign;
  var dropdownPosition = props.dropdownPosition;
  var inline = props.inline;
  var search = props.search;
  return index$1({
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
          React__default.createElement( If$1, { condition: this.props.isOpen },
            React__default.createElement( Dropdown, this.props)
          )
        )
      );
    };

    return Select;
  }(React.Component));

  var caretAligns = [ 'left', 'center', 'right' ];
  var colors = [ 'gray', 'white', 'teal' ];
  var dropdownPositions = [ 'above', 'below' ];

  Select.propTypes = {
    caretAlign: index.oneOf(caretAligns),
    color: index.oneOf(colors),
    dropdownPosition: index.oneOf(dropdownPositions),
    inline: index.bool,
    isOpen: index.bool,
    maxLabelLength: index.number,
    multiSelect: index.bool,
    onOpenToggle: index.func.isRequired,
    onSelectionToggle: index.func.isRequired,
    options: index.arrayOf(index.shape({
      // NOTE: any additional keys are also allowed, so you can store as much data in the `option` as you would like
      label: index.string.isRequired,
      uniqueId: index.string.isRequired,
      description: index.string,
    })).isRequired,
    processingOptions: index.arrayOf(index.string),
    selectedOptions: index.objectOf(index.bool).isRequired,
    search: index.func,
    Trigger: index.func, // this allows passing in a custom Trigger as prop, so it's not necessary to import the HOC
    triggerLabel: index.string,
    triggerPlaceholder: index.string,
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

  Select.propDescriptions = {
    caretAlign: ("One of: [\"" + (caretAligns.join('", "')) + "\"]"),
    color: ("One of: [\"" + (colors.join('", "')) + "\"]"),
    dropdownPosition: ("One of: [\"" + (dropdownPositions.join('", "')) + "\"]"),
    options: 'Array of: { label: String, uniqueId: String, description: String? }',
    selectedOptions: 'Object of booleans',
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
    React__default.createElement( If$1, { condition: multiSelect$$1 },
      React__default.createElement( 'div', { className: 'c-media-item--action clearfix right' },
        getButton(isProcessingItem, isSelected)
      )
    )
  )
);
};

MediaSelectDropdownOption.propTypes = {
  description: index.string,
  imageUrl: index.string.isRequired,
  isLoading: index.bool.isRequired,
  isProcessingItem: index.bool,
  isSelected: index.bool.isRequired,
  label: index.string.isRequired,
  maxLabelLength: index.number.isRequired,
  multiSelect: index.bool.isRequired,
  onOptionToggle: index.func.isRequired,
  uniqueId: index.string.isRequired,
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
  isOpen: index.bool,
  onOpenToggle: index.func,
  onSelectionToggle: index.func,
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
  isOpen: index.bool,
  onOpenToggle: index.func,
  onSelectionToggle: index.func,
};

StatefulMediaSelect.defaultProps = {
  isOpen: false,
  onOpenToggle: function () {},
  onSelectionToggle: function () {},
};

var util = utilities;

var If = util.If;

var DemoRow = (function (Component$$1) {
  function DemoRow() {
    Component$$1.call(this);
    this.state = { codeHeight: null };
    this.markupCode = this.markupCode.bind(this);
    this.setHeightOnce = this.setHeightOnce.bind(this);
  }

  if ( Component$$1 ) DemoRow.__proto__ = Component$$1;
  DemoRow.prototype = Object.create( Component$$1 && Component$$1.prototype );
  DemoRow.prototype.constructor = DemoRow;

  DemoRow.prototype.setHeightOnce = function setHeightOnce (el) {
    if (el && this.state.codeHeight === null) {
      this.setState({ codeHeight: el.clientHeight });
    }
  };

  DemoRow.prototype.markupCode = function markupCode () {
    return { __html: window.Prism.highlight(this.props.code, window.Prism.languages.jsx) };
  };

  DemoRow.prototype.render = function render () {
    return (
      React__default.createElement( 'div', { className: 'row' },
        React__default.createElement( 'div', { className: 'column small-16 medium-16 large-16 xlarge-10 padding-reset' },
          React__default.createElement( 'div', { className: 'guide-bar', style: { minHeight: ((this.state.codeHeight) + "px") } }, this.props.children)
        ),
        React__default.createElement( If, { condition: Boolean(this.props.code) },
          React__default.createElement( 'div', { className: 'column small-0 medium-0 large-0 xlarge-6 padding-reset', ref: this.setHeightOnce },
            React__default.createElement( 'div', { className: 'code-bar' },
              React__default.createElement( 'pre', { className: 'padding-medium' },
                React__default.createElement( 'code', { dangerouslySetInnerHTML: this.markupCode() })
              )
            )
          )
        )
      )
    );
  };

  return DemoRow;
}(React.Component));
DemoRow.propTypes = {
  children: index.node.isRequired,
  code: index.string,
};

DemoRow.defaultProps = {
  code: '',
};

var Details = function (ref) {
  var children = ref.children;
  var withDemo = ref.withDemo;

  return (
  React__default.createElement( 'div', { className: ("text--gray details " + (withDemo ? 'padding-vert-medium' : 'padding-top-large')) }, children)
);
};

Details.propTypes = {
  children: index.node.isRequired,
  withDemo: index.bool,
};

Details.defaultProps = {
  withDemo: false,
};

var Hr = function () { return (
  React__default.createElement( 'div', { className: 'border-bottom border--gray-light margin-vert-small' })
); };

var NavLink = function (ref) {
  var slug = ref.slug;
  var title = ref.title;

  return (
  React__default.createElement( 'li', null,
    React__default.createElement( 'a', { href: ("#" + slug), className: 'text--gray block' }, title)
  )
);
};

NavLink.propTypes = {
  slug: index.string.isRequired,
  title: index.string.isRequired,
};


var Nav = function (ref) {
  var sections = ref.sections;

  return (
  React__default.createElement( 'nav', { className: 'nav-primary' },
    React__default.createElement( 'h1', { className: 'head-4 head--teal text-left padding-top-medium' },
      React__default.createElement( Icon$1, { name: 'vhx', size: 'xlarge', className: 'margin-right-small' }, "VHX"),
      React__default.createElement( 'span', null, "Quartz" )
    ),
    React__default.createElement( 'h2', { className: 'head-5 head--gray margin-top-large padding-bottom-medium' }, "Components"),
    React__default.createElement( 'ul', { className: 'no-bullet' },
      sections.map(function (ref) {
        var slug = ref.slug;
        var title = ref.title;

        return React__default.createElement( NavLink, { key: slug, title: title, slug: slug });
  })
    )
  )
);
};

Nav.propTypes = {
  sections: index.arrayOf(index.shape({
    Section: index.func.isRequired,
    slug: index.string.isRequired,
    title: index.string.isRequired,
  }).isRequired).isRequired,
};

var Subtitle = function (ref) {
  var children = ref.children;

  return (
  React__default.createElement( Block, null, React__default.createElement( Text$1, { block: true, className: 'margin-bottom-medium padding-bottom-small border-bottom border--gray-light text--bold text--gray' }, children) )
);
};

Subtitle.propTypes = {
  children: index.node.isRequired,
};

var propTypeList = Object.keys(index);

function lookupType(propType) {
  return propTypeList.reduce(function (current, next) {
    return (propType === index[next] || propType === index[next].isRequired) ? next : current;
  }, 'other');
}

function stringify(prop) {
  if (typeof prop === 'string') { return ("\"" + prop + "\""); }
  if (typeof prop === 'function') { return prop.name || '[Function]'; }
  if (String(prop) === '[object Object]') { return JSON.stringify(prop); }
  return String(prop);
}

var PropTypeTable = (function (PureComponent$$1) {
  function PropTypeTable(props) {
    PureComponent$$1.call(this, props);
    var componentPropTypes = props.component.propTypes || {};
    var componentDefaultProps = props.component.defaultProps || {};
    var componentPropDescriptions = props.component.propDescriptions || {};
    this.propList = Object.keys(componentPropTypes).map(function (prop) { return ({
      prop: prop,
      type: lookupType(componentPropTypes[prop]),
      defaultValue: stringify(componentDefaultProps[prop]),
      description: componentPropDescriptions[prop],
      isRequired: componentPropTypes[prop].isRequired === undefined,
    }); });
  }

  if ( PureComponent$$1 ) PropTypeTable.__proto__ = PureComponent$$1;
  PropTypeTable.prototype = Object.create( PureComponent$$1 && PureComponent$$1.prototype );
  PropTypeTable.prototype.constructor = PropTypeTable;
  PropTypeTable.prototype.render = function render () {
    return (
      React__default.createElement( 'div', null,
        React__default.createElement( Subtitle, null, "PropTypes" ),
        React__default.createElement( 'table', { className: 'table table--ticks table--striped margin-bottom-large' },
          React__default.createElement( 'thead', null,
            React__default.createElement( 'tr', null,
              React__default.createElement( 'th', { className: 'small-3', title: 'Prop' }, "Prop"),
              React__default.createElement( 'th', { className: 'small-2', title: 'Type' }, "Type"),
              React__default.createElement( 'th', { className: 'small-2', title: 'Required' }, "Required"),
              React__default.createElement( 'th', { className: 'small-3', title: 'Default value' }, "Default value"),
              React__default.createElement( 'th', { title: 'Description' }, "Description")
            )
          ),
          React__default.createElement( 'tbody', null,
            this.propList.map(function (ref) {
                var prop = ref.prop;
                var type = ref.type;
                var defaultValue = ref.defaultValue;
                var description = ref.description;
                var isRequired = ref.isRequired;

                return (
                React__default.createElement( 'tr', { key: prop },
                  React__default.createElement( 'td', { className: 'truncate text--bold', title: prop }, prop),
                  React__default.createElement( 'td', { title: type }, type),
                  React__default.createElement( 'td', { className: isRequired ? 'text--bold' : '' }, isRequired ? 'yes' : 'no'),
                  React__default.createElement( 'td', { title: defaultValue }, React__default.createElement( 'code', null, defaultValue )),
                  React__default.createElement( 'td', { title: description }, description)
                )
              );
    })
          )
        )
      )
    );
  };

  return PropTypeTable;
}(React.PureComponent));

PropTypeTable.propTypes = {
  component: index.func.isRequired,
};

var Title = function (ref) {
  var children = ref.children;

  return (
  React__default.createElement( 'div', { className: 'padding-top-large' },
    React__default.createElement( Text$1, { h3: true, className: 'text--bold' }, children)
  )
);
};

Title.propTypes = {
  children: index.string.isRequired,
};

var AvatarDemo = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Headings" ),
    React__default.createElement( Block, { inline: true }, React__default.createElement( Avatar$1, null )),
    React__default.createElement( Block, { inline: true }, React__default.createElement( Avatar$1, {
      image: 'https://vhx.imgix.net/assets/1f843fdc-34da-4302-bd4f-06e5bd7ef2c3/IMG_7891.GIF', size: 'xsmall' })),
    React__default.createElement( Block, { inline: true }, React__default.createElement( Avatar$1, {
      image: 'https://secure.gravatar.com/avatar/74b978ed4f10e05a6c2898c4f5516189.png', size: 'small' })),
    React__default.createElement( Block, { inline: true }, React__default.createElement( Avatar$1, {
      image: 'https://secure.gravatar.com/avatar/74b978ed4f10e05a6c2898c4f5516189.png', size: 'medium' })),
    React__default.createElement( Block, { inline: true }, React__default.createElement( Avatar$1, {
      image: 'https://secure.gravatar.com/avatar/460c13d4904dc7f889f00d2cd4c3e6e8.png', size: 'large' })),
    React__default.createElement( Block, { inline: true }, React__default.createElement( Avatar$1, {
      image: 'https://vhx.imgix.net/assets/1f843fdc-34da-4302-bd4f-06e5bd7ef2c3/IMG_7891.GIF', size: 'xlarge' })),
    React__default.createElement( Block, { inline: true }, React__default.createElement( Avatar$1, {
      image: 'https://vhx.imgix.net/assets/1f843fdc-34da-4302-bd4f-06e5bd7ef2c3/IMG_7891.GIF', size: 'xxlarge' }))
  )
); };

var avatarCode = "\n<Avatar />\n<Avatar\n  image='/path/to/avatar.png'\n  size='xlarge'\n/>\n";


// Main exported demo
// -----------------------------------------

var Avatars = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( DemoRow, null, React__default.createElement( Title, null, "Avatar" ) ),
    React__default.createElement( DemoRow, { code: avatarCode }, React__default.createElement( AvatarDemo, null )),
    React__default.createElement( DemoRow, null, React__default.createElement( PropTypeTable, { component: Avatar$1 }) )
  )
); };

var colors$4 = [
  'gray',
  'vimeo-blue',
  'vimeo-secondary',
  'vimeo-secondary-outline',
  'vimeo-alt',
  'white',
  'red',
  'twitter',
  'facebook',
  'tumblr',
  'paypal',
  'roku' ];

var ButtonColors = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Colors" ),
    React__default.createElement( 'div', null,
      colors$4.map(function (color) { return (
        React__default.createElement( Block, { key: color, inline: true },
          React__default.createElement( Button$1, { color: color }, color)
        )
      ); })
    ),
    React__default.createElement( Block, { dark: true }, React__default.createElement( Button$1, { color: 'transparent' }, "transparent"))
  )
); };

var buttonColorsCode = "\n<Button>Click me</Button>\n<Button color='teal'>Click me</Button>\n<Button color='transparent'>Click me</Button>\n<Button color='roku'>Click me</Button>\n";


// Processing demo
// -----------------------------------------

var ButtonProcessing = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Processing State" ),
    React__default.createElement( Block, { inline: true },
      React__default.createElement( Button$1, { processing: true })
    ),
    React__default.createElement( Block, { inline: true },
      React__default.createElement( Button$1, { color: 'vimeo-blue', processing: true })
    ),
    React__default.createElement( Block, { inline: true },
      React__default.createElement( Button$1, { color: 'white', processing: true })
    ),
    React__default.createElement( Block, { inline: true },
      React__default.createElement( Button$1, { color: 'red', processing: true })
    )
  )
); };

var buttonProcessingCode = "\n<Button processing>Click me</Button>\n";


// Sizes demo
// -----------------------------------------

var ButtonSizes = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Sizes" ),
    React__default.createElement( Block, null, React__default.createElement( Button$1, { size: 'small' }, "small") ),
    React__default.createElement( Block, null, React__default.createElement( Button$1, { size: 'medium' }, "medium") ),
    React__default.createElement( Block, null, React__default.createElement( Button$1, { size: 'large' }, "large") ),
    React__default.createElement( Block, null, React__default.createElement( Button$1, { size: 'half' }, "half") ),
    React__default.createElement( Block, null, React__default.createElement( Button$1, { size: 'fill' }, "fill") )
  )
); };

var buttonSizesCode = "\n<Button size='small'>small</Button>\n<Button size='medium'>medium</Button>\n<Button size='large'>large</Button>\n<Button size='half'>half</Button>\n<Button size='fill'>fill</Button>\n";


// Icons demo
// -----------------------------------------

var ButtonIcons = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Icons" ),
    React__default.createElement( Block, null, React__default.createElement( Button$1, null, React__default.createElement( Icon$1, { name: 'product', left: true, button: true }), "Icon left" ) ),
    React__default.createElement( Block, null, React__default.createElement( Button$1, null, React__default.createElement( Icon$1, { name: 'product', right: true, button: true }, "Icon right") ) ),
    React__default.createElement( Block, null, React__default.createElement( Button$1, null, React__default.createElement( Icon$1, { name: 'product', left: true, button: true }), React__default.createElement( Icon$1, { name: 'product', right: true, button: true }, "Icon both") ) )
  )
); };

var buttonIconsCode = "\n<Button>\n  <Icon name='product' left button />\n  Icon left\n</Button>\n\n<Button>\n  <Icon name='product' right button />\n  Icon right\n</Button>\n\n<Button>\n  <Icon name='product' left button />\n  <Icon name='product' right button>Icon both</Icon>\n</Button>\n";


// Main exported demo
// -----------------------------------------

var Buttons = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( DemoRow, null, React__default.createElement( Title, null, "Buttons" ) ),
    React__default.createElement( DemoRow, { code: buttonColorsCode }, React__default.createElement( ButtonColors, null )),
    React__default.createElement( DemoRow, { code: buttonProcessingCode }, React__default.createElement( ButtonProcessing, null )),
    React__default.createElement( DemoRow, { code: buttonSizesCode }, React__default.createElement( ButtonSizes, null )),
    React__default.createElement( DemoRow, { code: buttonIconsCode }, React__default.createElement( ButtonIcons, null )),
    React__default.createElement( DemoRow, null, React__default.createElement( PropTypeTable, { component: Button$1 }) )
  )
); };

var MAX_TITLE_LENGTH = 50; // characters
var lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';

var BrowsePageSlide = function (ref) {
  var title = ref.title;
  var subtitle = ref.subtitle;
  var description = ref.description;
  var buttonClass = ref.buttonClass;
  var links = ref.links;

  return (
  React__default.createElement( 'div', null,
    React__default.createElement( 'div', { className: 'slide-title' }, util.truncate(title, MAX_TITLE_LENGTH)),
    React__default.createElement( 'div', { className: 'slide-subtitle' }, subtitle),
    React__default.createElement( 'div', { className: 'slide-description' }, description),
    React__default.createElement( 'div', { className: 'slide-buttons' },
      React__default.createElement( 'a', { className: ("btn btn-gray btn-site-primary slide-button " + buttonClass), href: links.item },
        React__default.createElement( Icon$1, { name: 'play', color: 'white', size: 'xxsmall' }),
        React__default.createElement( 'span', { className: 'slide-button-text' }, "Watch now")
      ),
      React__default.createElement( util.If, { condition: Boolean(links.trailer), inline: true },
        React__default.createElement( 'a', { className: 'btn btn-transparent slide-button slide-button--alt', href: links.trailer },
          React__default.createElement( Icon$1, { name: 'play', color: 'white', size: 'xxsmall' }),
          React__default.createElement( 'span', { className: 'slide-button-text' }, "Trailer")
        )
      )
    )
  )
);
};

var Slide1 = {
  Slide: function (props) { return (
    React__default.createElement( Slide$1, {
      dynamicProps: props, img: 'images/16-6-A.png', mobileImg: 'images/16-6-A-mob.png', isWide: true },
      React__default.createElement( BrowsePageSlide, {
        title: 'Slide 1 title', subtitle: '3 Seasons', description: lorem, buttonClass: '', links: {
          item: '#',
          trailer: '#',
        } })
    )
  ); },
  id: 's1',
};

var Slide2 = {
  Slide: function (props) { return (
    React__default.createElement( Slide$1, {
      dynamicProps: props, img: 'images/16-9-B.png', mobileImg: 'images/16-9-B-mob.png', isWide: true },
      React__default.createElement( BrowsePageSlide, {
        title: 'Slide 2 title is a very long title with many words', subtitle: '3 Seasons', description: lorem, buttonClass: '', links: {
          item: '#',
          trailer: '#',
        } })
    )
  ); },
  id: 's2',
};

var Slide3 = {
  Slide: function (props) { return (
    React__default.createElement( Slide$1, {
      dynamicProps: props, img: 'images/16-9-A.png', mobileImg: 'images/16-9-A-mob.png', isWide: false },
      React__default.createElement( BrowsePageSlide, {
        title: 'Slide 3 has a custom button class', subtitle: '3 Seasons', description: lorem, buttonClass: 'btn-teal', links: {
          item: '#',
          trailer: '#',
        } })
    )
  ); },
  id: 's3',
};

var Slide4 = {
  Slide: function (props) { return (
    React__default.createElement( Slide$1, {
      dynamicProps: props, img: 'images/16-9-B.png', mobileImg: 'images/16-9-B-mob.png', isWide: false },
      React__default.createElement( BrowsePageSlide, {
        title: 'Slide 4', subtitle: '3 Seasons', description: lorem, links: {
          item: '#',
          trailer: '#',
        } })
    )
  ); },
  id: 's4',
};

var Slide5 = {
  Slide: function (props) { return (
    React__default.createElement( Slide$1, {
      dynamicProps: props, img: 'images/16-6-B.png', mobileImg: 'images/16-6-B-mob.png', isWide: true },
      React__default.createElement( BrowsePageSlide, {
        title: 'Slide 5 has no trailer and is 16:6 with a very long title containing many words. 100 characters long', subtitle: '3 Seasons', description: lorem, buttonClass: 'btn-teal', links: {
          item: '#',
          trailer: '#',
        } })
    )
  ); },
  id: 's5',
};

var loadTestSlides = Array(50).fill(true).map(function (x, i) { return ({
  Slide: function (props) { return (
    React__default.createElement( Slide$1, {
      dynamicProps: props, img: ("http://lorempizza.com/1600/600/" + i), mobileImg: ("http://lorempizza.com/1600/900/" + i), isWide: true },
      React__default.createElement( BrowsePageSlide, {
        title: ("Slide " + i), subtitle: '(Load-test slide)', description: lorem, links: { item: '#' } })
    )
  ); },
  id: ("slide" + i),
}); });

var CarouselDemo = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Single-Slide Carousel" ),
    React__default.createElement( Carousel$1, { slides: [ Slide1 ] }),
    React__default.createElement( 'br', null ),
    React__default.createElement( Subtitle, null, "Multi-Slide Carousel" ),
    React__default.createElement( Carousel$1, { slides: [ Slide1, Slide2, Slide3, Slide4, Slide5 ] }),
    React__default.createElement( 'br', null ),
    React__default.createElement( Subtitle, null, "Carousel Performance Load Test (50 Slides)" ),
    React__default.createElement( Carousel$1, { slides: loadTestSlides })
  )
); };

var carouselCode = "\nconst Slide1 = {\n  Slide: props => (\n    <Slide\n      dynamicProps={props}\n      img='images/16-6-A.png'\n      mobileImg='images/16-6-A-mob.png'\n      isWide={true}\n    >\n      <div>Any slide contents can go here!</div>\n    </Slide>\n  ),\n  id: 's1',\n};\n\n<Carousel slides={[ Slide1 ]} />\n";


// Main exported demo
// -----------------------------------------

var Carousels = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( DemoRow, null,
      React__default.createElement( Title, null, "Carousels" ),
      React__default.createElement( Details, null, "Carousels are composed of three components. There is the base ", React__default.createElement( 'code', null, "Carousel" ), "component which handles the navigation ui and aspect ratio sizing. Then there is the ", React__default.createElement( 'code', null, "Slide" ), " which handles the background images animations between slide changes. Finally, there are the children passed into the ", React__default.createElement( 'code', null, "Slide" ), "component, which can be any arbitrary components." ),
      React__default.createElement( Details, null, "The only required prop that a Carousel component requires is an array of objects of the following form: ", React__default.createElement( 'pre', { className: 'code' },
          "{\n  Slide: ReactComponent,\n  id: String,\n}"
        ), "The ", React__default.createElement( 'code', null, "id" ), " property will be used as a ", React__default.createElement( 'code', null, "key" ), " within the carousel, so it does not need to be globally unique—just unique among the slides." ),
      React__default.createElement( Details, null, "The ", React__default.createElement( 'code', null, "Carousel" ), " component may also be passed an ", React__default.createElement( 'code', null, "aspectRatio" ), "prop which is a string formatted like ", React__default.createElement( 'code', null, "16:9" ), ". If not provided, the default is ", React__default.createElement( 'code', null, "16:6" ), "." ),
      React__default.createElement( Details, null, "The ", React__default.createElement( 'code', null, "Carousel" ), " accepts an ", React__default.createElement( 'code', null, "onSlideChange" ), " prop that is a function which gets called whenever the slide changes. The function will be passed an object of the following form: ", React__default.createElement( 'pre', { className: 'code' },
          "{\n  eventType: String, // either 'next', 'prev', or 'coin'\n  slideIndex: Number,\n}"
        )
      )
    ),
    React__default.createElement( DemoRow, { code: carouselCode }, React__default.createElement( CarouselDemo, null )),
    React__default.createElement( DemoRow, null, React__default.createElement( PropTypeTable, { component: Carousel$1 }) )
  )
); };

var handler = function () { return alert('Hi!'); };
var StatelessCheckboxes = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Checked / unchecked" ),
    React__default.createElement( Block, null, React__default.createElement( Checkbox$1, { uniqueId: 'c1', label: 'Foo', onChange: handler }) ),
    React__default.createElement( Block, null, React__default.createElement( Checkbox$1, { uniqueId: 'c2', label: 'Bar', onChange: handler, checked: true }) )
  )
); };

var statelessCheckboxCode = "\nconst handler = (event) => alert('Hi!');\n<Checkbox uniqueId='c1' label='Foo' onChange={handler} />\n<Checkbox uniqueId='c2' label='Bar' onChange={handler} checked />\n";


// Sizes demo
// -----------------------------------------

var StatelessCheckboxSizes = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Sizes" )
    /* readOnly prop only added to stop react warnings from polluting the console */,
    React__default.createElement( Block, null, React__default.createElement( Checkbox$1, { uniqueId: 'c3', label: 'Foo', size: 'small', readOnly: true }) ),
    React__default.createElement( Block, null, React__default.createElement( Checkbox$1, { uniqueId: 'c4', label: 'Bar', size: 'medium', readOnly: true }) ),
    React__default.createElement( Block, null, React__default.createElement( Checkbox$1, { uniqueId: 'c5', label: 'Baz', size: 'large', readOnly: true }) ),
    React__default.createElement( Block, null, React__default.createElement( Checkbox$1, { uniqueId: 'c6', label: 'Foo', size: 'small', checked: true, readOnly: true }) ),
    React__default.createElement( Block, null, React__default.createElement( Checkbox$1, { uniqueId: 'c7', label: 'Bar', size: 'medium', checked: true, readOnly: true }) ),
    React__default.createElement( Block, null, React__default.createElement( Checkbox$1, { uniqueId: 'c8', label: 'Baz', size: 'large', checked: true, readOnly: true }) )
  )
); };

var statelessCheckboxSizesCode = "\n<Checkbox uniqueId='c3' label='Foo' size='small' />\n<Checkbox uniqueId='c4' label='Bar' size='medium' />\n<Checkbox uniqueId='c5' label='Baz' size='large' />\n<Checkbox uniqueId='c6' label='Foo' size='small' checked />\n<Checkbox uniqueId='c7' label='Bar' size='medium' checked />\n<Checkbox uniqueId='c8' label='Baz' size='large' checked />\n";


// Toggles demo
// -----------------------------------------

var StatelessCheckboxToggles = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Toggles" )
    /* readOnly prop only added to stop react warnings from polluting the console */,
    React__default.createElement( Block, null, React__default.createElement( Checkbox$1, { uniqueId: 'c9', type: 'toggle', size: 'small', readOnly: true }) ),
    React__default.createElement( Block, null, React__default.createElement( Checkbox$1, { uniqueId: 'c10', type: 'toggle', size: 'small', checked: true, readOnly: true }) )
  )
); };

var statelessCheckboxTogglesCode = "\n// Can use all the same sizes\n// that default checkboxes accept\n<Checkbox uniqueId='c9' type='toggle' size='small' />\n<Checkbox uniqueId='c10' type='toggle' size='small' checked />\n";


// Stateful demo
// -----------------------------------------

var StatefulCheckbox = (function (Component$$1) {
  function StatefulCheckbox() {
    Component$$1.call(this);
    this.state = { checked: true };
  }

  if ( Component$$1 ) StatefulCheckbox.__proto__ = Component$$1;
  StatefulCheckbox.prototype = Object.create( Component$$1 && Component$$1.prototype );
  StatefulCheckbox.prototype.constructor = StatefulCheckbox;
  StatefulCheckbox.prototype.render = function render () {
    var this$1 = this;

    var ref = this;
    var props = ref.props;
    var state = ref.state;
    var checked = state.checked;
    var toggle = function () { return this$1.setState({ checked: !checked }); };
    return React__default.createElement( Checkbox$1, Object.assign({}, props, { checked: checked, onChange: toggle }));
  };

  return StatefulCheckbox;
}(React.Component));

StatefulCheckbox.propTypes = Checkbox$1.propTypes;
StatefulCheckbox.defaultProps = Checkbox$1.defaultProps;


var StatefulCheckboxDemo = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Stateful Checkbox Demo" ),
    React__default.createElement( Block, null, React__default.createElement( StatefulCheckbox, { uniqueId: 'c11', size: 'large' }) ),
    React__default.createElement( Block, null, React__default.createElement( StatefulCheckbox, { uniqueId: 'c12', type: 'toggle', size: 'large' }) )
  )
); };

var statefulCheckboxCode = "\n// An example stateful checkbox implementation\nclass StatefulCheckbox extends Component {\n  constructor() {\n    super();\n    this.state = { checked: true };\n  }\n  render() {\n    const { props, state } = this;\n    const { checked } = state;\n    const toggle = () => this.setState({ checked: !checked });\n    return <Checkbox { ...props } checked={checked} onChange={toggle} />;\n  }\n}\n\n// Usage of the stateful component\n<StatefulCheckbox uniqueId='c11' size='large' />\n<StatefulCheckbox uniqueId='c12' type='toggle' size='large' />\n";


// Main exported demo
// -----------------------------------------

var Checkboxes = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( DemoRow, null,
      React__default.createElement( Title, null, "Checkboxes" ),
      React__default.createElement( Details, null, "Checkboxes are strictly presentational, so in order to enable interactivity you must place them within a stateful component that reacts to their ", React__default.createElement( 'code', null, "onChange" ), " method. Note that in the ", React__default.createElement( 'code', null, "onChange" ), " method, ", React__default.createElement( 'code', null, "event.target" ), "will be the native ", React__default.createElement( 'code', null, "input[type=checkbox]" ), " element." ),
      React__default.createElement( Details, null, "The required ", React__default.createElement( 'code', null, "uniqueId" ), " prop will be used as the checkbox element’s ", React__default.createElement( 'code', null, "id" ), " and therefore must be globally unique. No other element on the page can have that ID!" )
    ),
    React__default.createElement( DemoRow, { code: statelessCheckboxCode }, React__default.createElement( StatelessCheckboxes, null )),
    React__default.createElement( DemoRow, { code: statelessCheckboxSizesCode }, React__default.createElement( StatelessCheckboxSizes, null )),
    React__default.createElement( DemoRow, { code: statelessCheckboxTogglesCode }, React__default.createElement( StatelessCheckboxToggles, null )),
    React__default.createElement( DemoRow, { code: statefulCheckboxCode }, React__default.createElement( StatefulCheckboxDemo, null )),
    React__default.createElement( DemoRow, null, React__default.createElement( PropTypeTable, { component: Checkbox$1 }) )
  )
); };

var DefaultDemo = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Default" ),
    React__default.createElement( Header$1, { icon: 'product', title: 'Hello World', Description: 'Optional description' })
  )
); };

var defaultDemoCode = "\n<Header\n  icon='product'\n  title='Hello World'\n  Description='Optional description'\n/>\n";

// Header with all options/props
// -----------------------------------------

var HeaderDescription = function () { return (
  React__default.createElement( 'div', { className: 'text--teal' }, "Foo")
); };

var FullDemo = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Header with All Options" ),
    React__default.createElement( Header$1, { icon: 'product', title: 'Hello World', Description: HeaderDescription, border: false },
      React__default.createElement( Button$1, null, "Click me" )
    )
  )
); };

var fullDemoCode = "\n// `Description` can be a component or a string\nconst HeaderDescription = () => (\n  <div className='text--teal'>Foo</div>\n);\n\n// Children can optionally be passed to the <Header>\n<Header icon='product' title='Hello World' Description={HeaderDescription} border={false}>\n  <Button>Click me</Button>\n</Header>\n";


// Main exported demo
// -----------------------------------------

var Headers = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( DemoRow, null, React__default.createElement( Title, null, "Headers" ) ),
    React__default.createElement( DemoRow, { code: defaultDemoCode }, React__default.createElement( DefaultDemo, null )),
    React__default.createElement( DemoRow, { code: fullDemoCode }, React__default.createElement( FullDemo, null )),
    React__default.createElement( DemoRow, null, React__default.createElement( PropTypeTable, { component: Header$1 }) )
  )
); };

var testImage = '../demo/sections/upload.svg';

// Icon sizes demo
// -----------------------------------------

var IconSizes = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Sizes" ),
    React__default.createElement( Block, { inline: true },
      React__default.createElement( Icon$1, {
        size: 'xsmall', src: testImage })
    ),
    React__default.createElement( Block, { inline: true },
      React__default.createElement( Icon$1, {
        size: 'small', src: testImage })
    ),
    React__default.createElement( Block, { inline: true },
      React__default.createElement( Icon$1, {
        size: 'medium', src: testImage })
    ),
    React__default.createElement( Block, { inline: true },
      React__default.createElement( Icon$1, {
        size: 'large', src: testImage })
    ),
    React__default.createElement( Block, { inline: true },
      React__default.createElement( Icon$1, {
        size: 'xlarge', src: testImage })
    ),
    React__default.createElement( Block, { inline: true },
      React__default.createElement( Icon$1, {
        size: 'xxlarge', src: testImage })
    )
  )
); };

var iconSizesCode = "\n  <Icon size='xxsmall' src={testImage} />\n  <Icon size='xsmall' src={testImage} />\n  <Icon size='small' src={testImage} />\n  <Icon size='medium' src={testImage} />\n  <Icon size='large' src={testImage} />\n  <Icon size='xlarge' src={testImage} />\n  <Icon size='xxlarge' src={testImage} />\n";


// Icon colors demo
// -----------------------------------------

var IconColors = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Colors" ),
    React__default.createElement( Block, { inline: true },
      React__default.createElement( Icon$1, {
        size: 'medium', src: testImage, color: 'white' })
    ),
    React__default.createElement( Block, { inline: true },
      React__default.createElement( Icon$1, {
        size: 'medium', src: testImage, color: 'VimeoBlue' })
    ),
    React__default.createElement( Block, { inline: true },
      React__default.createElement( Icon$1, {
        size: 'medium', src: testImage, color: 'SunsetOrange' })
    ),
    React__default.createElement( Block, { inline: true },
      React__default.createElement( Icon$1, {
        size: 'medium', src: testImage, color: 'Porcelain' })
    ),
    React__default.createElement( Block, { inline: true },
      React__default.createElement( Icon$1, {
        size: 'medium', src: testImage, color: 'AstroGranite' })
    )
  )
); };

var iconColorsCode = "\n  <Icon name='product' size='medium' src={testImage} color='AstroGranite' />\n";


// Main exported demo
// -----------------------------------------

var Icons = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( DemoRow, null, React__default.createElement( Title, null, "Icons" ) ),
    React__default.createElement( DemoRow, { code: iconSizesCode }, React__default.createElement( IconSizes, null )),
    React__default.createElement( DemoRow, { code: iconColorsCode }, React__default.createElement( IconColors, null )),
    React__default.createElement( DemoRow, null, React__default.createElement( PropTypeTable, { component: Icon$1 }) )
  )
); };

var InputDemo = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Default input" ),
    React__default.createElement( Block, null, React__default.createElement( Input$1, { value: 'A normal input', readOnly: true }) ),
    React__default.createElement( Block, null, React__default.createElement( Input$1, { value: '', placeholder: 'An input with a placeholder', readOnly: true }) ),
    React__default.createElement( Block, null, React__default.createElement( Input$1, { value: 'A disabled input', disabled: true, readOnly: true }) ),
    React__default.createElement( Block, null, React__default.createElement( Input$1, { value: 'An input with an error', error: true, readOnly: true }) ),
    React__default.createElement( Block, null, React__default.createElement( Input$1, { value: 'A small input', small: true, readOnly: true }) ),
    React__default.createElement( Block, null, React__default.createElement( Input$1, { value: 'A search input', search: true, readOnly: true }) ),
    React__default.createElement( Block, null, React__default.createElement( Input$1, { value: 'A password input', type: 'password', readOnly: true }) )
  )
); };

var inputDemoCode = "\n\n<Input value='A normal input' />\n<Input value='' placeholder='An input with a placeholder' />\n<Input value='A disabled input' disabled />\n<Input value='An input with an error' error />\n<Input value='A small input' small />\n<Input value='A search input' search />\n<Input value='A password input' type='password' />\n";


// Labeled inputs
// -----------------------------------------

var InputLabel = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Labeled input" ),
    React__default.createElement( 'label', { htmlFor: 'password123' }, "Password"),
    React__default.createElement( Input$1, {
      id: 'password123', type: 'password', value: '1234', readOnly: true })
  )
); };

var inputLabelCode = "\n<label htmlFor='password123'>Password</label>\n<Input\n  id='password123'\n  type='password'\n  value='1234'\n/>\n";


// Stateful demo
// -----------------------------------------

var StatefulInput = (function (Component$$1) {
  function StatefulInput() {
    Component$$1.call(this);
    this.state = { value: '' };
  }

  if ( Component$$1 ) StatefulInput.__proto__ = Component$$1;
  StatefulInput.prototype = Object.create( Component$$1 && Component$$1.prototype );
  StatefulInput.prototype.constructor = StatefulInput;
  StatefulInput.prototype.render = function render () {
    var this$1 = this;

    var ref = this;
    var props = ref.props;
    var state = ref.state;
    var handleInput = function (event) { return (
      this$1.setState({
        value: event.target.value,
      })
    ); };
    return React__default.createElement( Input$1, Object.assign({}, props, { value: state.value, onInput: handleInput }));
  };

  return StatefulInput;
}(React.Component));

var StatefulInputDemo = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Stateful Input Demo" ),
    React__default.createElement( Block, null, React__default.createElement( StatefulInput, { type: 'password' }) )
  )
); };

var statefulInputCode = "\n// An example stateful input implementation\nclass StatefulInput extends Component {\n  constructor() {\n    super();\n    this.state = { value: '' };\n  }\n  render() {\n    const { props, state } = this;\n    const handleInput = (event) => (\n      this.setState({\n        value: event.target.value\n      })\n    );\n    return <Input { ...props } value={state.value} onInput={handleInput} />;\n  }\n}\n\n// Usage of the stateful component:\n// (Notice that it can still receive\n// props because of { ...props } in\n// the implementation)\n<StatefulInput type='password' />\n";


// Main exported demo
// -----------------------------------------

var Inputs = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( DemoRow, null,
      React__default.createElement( Title, null, "Inputs" ),
      React__default.createElement( Details, null, "Inputs are strictly presentational, so in order to enable interactivity you must place them within a stateful component that reacts to one or more of the following methods: ", React__default.createElement( 'ul', { className: 'demo-list' },
          React__default.createElement( 'li', null, React__default.createElement( 'code', null, "onChange" ) ),
          React__default.createElement( 'li', null, React__default.createElement( 'code', null, "onInput" ) ),
          React__default.createElement( 'li', null, React__default.createElement( 'code', null, "onKeyDown" ) ),
          React__default.createElement( 'li', null, React__default.createElement( 'code', null, "onKeyPress" ) ),
          React__default.createElement( 'li', null, React__default.createElement( 'code', null, "onKeyUp" ) )
        ), "Note that in any of these methods, ", React__default.createElement( 'code', null, "event.target" ), "will be the native ", React__default.createElement( 'code', null, "input" ), " element." ),
      React__default.createElement( Details, null, "Any valid HTML attributes that can be applied to an ", React__default.createElement( 'code', null, "input" ), " element, such as ", React__default.createElement( 'code', null, "id" ), " or ", React__default.createElement( 'code', null, "onBlur" ), ", can be passed to this component as props." )
    ),
    React__default.createElement( DemoRow, { code: inputDemoCode }, React__default.createElement( InputDemo, null )),
    React__default.createElement( DemoRow, { code: inputLabelCode }, React__default.createElement( InputLabel, null )),
    React__default.createElement( DemoRow, { code: statefulInputCode }, React__default.createElement( StatefulInputDemo, null )),
    React__default.createElement( DemoRow, null, React__default.createElement( PropTypeTable, { component: Input$1 }) )
  )
); };

var MyModalContents = function () { return React__default.createElement( 'div', null, "Hello!" ); };

var actions = [
  { label: 'Cancel', callback: function () { return Modal$2.close(); }, color: 'gray' },
  { label: 'Sign up', callback: function () { return alert('hi'); }, color: 'teal' } ];


// Modals
// -----------------------------------------

var Modals = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Modals" ),
    React__default.createElement( Button$1, { onClick: function () { return Modal$2.open({ actions: actions, Children: MyModalContents, title: 'Hello' }); } }, "Default Modal")
  )
); };

var modalDemoCode = "\nconst MyModalContents = () => <div>Hello!</div>;\n\nconst actions = [\n  { label: 'Cancel', callback: () => Modal.close(), color: 'gray' },\n  { label: 'Sign up', callback: () => alert('hi'), color: 'teal' },\n];\n\nconst modalContents = {\n  actions,\n  Children: MyModalContents,\n  title: 'Hello'\n};\n\n<Button onClick={() => Modal.open(modalContents)}>\n  Default Modal\n</Button>\n";


// Modal sizes
// -----------------------------------------

var ModalSizes = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Sizes" ),
    React__default.createElement( Block, { inline: true }, React__default.createElement( Button$1, { onClick: function () { return Modal$2.open({ title: 'Hello', Children: MyModalContents, actions: actions, size: 'small' }); } }, "Small")),
    React__default.createElement( Block, { inline: true }, React__default.createElement( Button$1, { onClick: function () { return Modal$2.open({ title: 'Hello', Children: MyModalContents, actions: actions, size: 'medium' }); } }, "Medium")),
    React__default.createElement( Block, { inline: true }, React__default.createElement( Button$1, { onClick: function () { return Modal$2.open({ title: 'Hello', Children: MyModalContents, actions: actions, size: 'large' }); } }, "Large"))
  )
); };

var modalSizesCode = "\n<Button\n  onClick={() => Modal.open({\n    actions,\n    Children: MyModalContents,\n    size: 'small',\n    title: 'Hello',\n  })}>\n  Small\n</Button>\n\n<Button\n  onClick={() => Modal.open({\n    actions,\n    Children: MyModalContents,\n    size: 'medium',\n    title: 'Hello',\n  })}>\n  Medium\n</Button>\n\n<Button\n  onClick={() => Modal.open({\n    actions,\n    Children: MyModalContents,\n    size: 'large',\n    title: 'Hello',\n  })}>\n  Large\n</Button>\n";


// Modal actions
// -----------------------------------------

var singleAction = [
  { label: 'Cancel', callback: function () { return Modal$2.close(); } } ];

var doubleAction = [
  { label: 'Cancel', callback: function () { return Modal$2.close(); }, color: 'gray' },
  { label: 'Sign up', callback: function () { return alert('hi'); }, color: 'teal' } ];

var ModalActions = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Actions" ),
    React__default.createElement( Block, { inline: true }, React__default.createElement( Button$1, { onClick: function () { return Modal$2.open({ title: 'Hello', Children: MyModalContents, actions: singleAction }); } }, "Single action")),
    React__default.createElement( Block, { inline: true }, React__default.createElement( Button$1, { onClick: function () { return Modal$2.open({ title: 'Hello', Children: MyModalContents, actions: doubleAction }); } }, "Double action"))
  )
); };

var modalActionsCode = "\nconst singleAction = [\n  { label: 'Cancel', callback: () => Modal.close() },\n];\n\n<Button\n  onClick={() => Modal.open({\n    title: 'Hello',\n    Children: MyModalContents,\n    actions: singleAction,\n  })}>\n  Single action\n</Button>\n\n\nconst doubleAction = [\n  { label: 'Cancel', callback: () => Modal.close(), color: 'gray' },\n  { label: 'Sign up', callback: () => alert('hi'), color: 'teal' },\n];\n\n<Button\n  onClick={() => Modal.open({\n    title: 'Hello',\n    Children: MyModalContents,\n    actions: doubleAction,\n  })}>\n  Double action\n</Button>\n";


// Main exported demo
// -----------------------------------------

var ModalDemo = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( DemoRow, null,
      React__default.createElement( Title, null, "Modals" ),
      React__default.createElement( Details, null,
        React__default.createElement( 'strong', null, "Important:" ), " You probably do not want to use the Modal as a component! Use its static methods instead: ", React__default.createElement( 'pre', { className: 'code' },
          "Modal.open({\n  actions: Array<Object>,\n  Children: ReactComponent,\n  size: String,\n  title: String\n});\nModal.close();"
        )
      ),
      React__default.createElement( Details, null, "The ", React__default.createElement( 'code', null, "<Modal />" ), " component accepts no props or children and should be initialized only ", React__default.createElement( 'strong', null, "once" ), " in the root component of your app. After this initialization, it will manage itself and respond only to updates through its static method calls." ),
      React__default.createElement( Details, null, "The ", React__default.createElement( 'code', null, "actions" ), " array consists of objects of the following shape: ", React__default.createElement( 'pre', { className: 'code' },
          "{\n  color: String (optional),\n  label: String,\n  callback: Function,\n}"
        )
      )
    ),
    React__default.createElement( DemoRow, { code: modalDemoCode }, React__default.createElement( Modals, null )),
    React__default.createElement( DemoRow, { code: modalSizesCode }, React__default.createElement( ModalSizes, null )),
    React__default.createElement( DemoRow, { code: modalActionsCode }, React__default.createElement( ModalActions, null ))
  )
); };

var StatefulPagination = (function (Component$$1) {
  function StatefulPagination() {
    Component$$1.call(this);
    this.state = { selectedIndex: 0 };
    this.updateIndex = this.updateIndex.bind(this);
  }

  if ( Component$$1 ) StatefulPagination.__proto__ = Component$$1;
  StatefulPagination.prototype = Object.create( Component$$1 && Component$$1.prototype );
  StatefulPagination.prototype.constructor = StatefulPagination;

  StatefulPagination.prototype.updateIndex = function updateIndex (selectedIndex) {
    this.setState({ selectedIndex: selectedIndex });
  };

  StatefulPagination.prototype.render = function render () {
    return (
      React__default.createElement( Pagination$1, { currentIndex: this.state.selectedIndex, length: this.props.length, onPageChange: this.updateIndex })
    );
  };

  return StatefulPagination;
}(React.Component));

StatefulPagination.propTypes = {
  length: index.number.isRequired,
};

var PaginatorDemo = function () { return (
  React__default.createElement( 'div', null,
    [ 1, 2, 7, 8, 9 ].map(function (i) { return (
        React__default.createElement( 'div', { key: i },
          React__default.createElement( Subtitle, null, "Demo page count: ", i ),
          React__default.createElement( StatefulPagination, { length: i })
        )
      ); })
  )
); };

var paginatorCode = "\n// A stateful implementation:\nclass StatefulPagination extends Component {\n  constructor() {\n    super();\n    this.state = { selectedIndex: 0 };\n    this.updateIndex = this.updateIndex.bind(this);\n  }\n\n  updateIndex(selectedIndex) {\n    this.setState({ selectedIndex });\n  }\n\n  render() {\n    const i = this.state.selectedIndex;\n    const length = this.props.length;\n    return (\n      <Pagination currentIndex={i} length={length} onPageChange={this.updateIndex} />\n    );\n  }\n}\n";


// Main exported demo
// -----------------------------------------

var Paginators = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( DemoRow, null,
      React__default.createElement( Title, null, "Pagination" ),
      React__default.createElement( Details, null, "The ", React__default.createElement( 'code', null, "Pagination" ), " component displays up to 7 page links and a possible \"Previous\" or \"Next\" link when appropriate. It will also call an ", React__default.createElement( 'code', null, "onPageChange" ), " callback with the index of the new selected link whenever one of the links (or \"Previous\"/\"Next\") is clicked." )
    ),
    React__default.createElement( DemoRow, { code: paginatorCode }, React__default.createElement( PaginatorDemo, null )),
    React__default.createElement( DemoRow, null, React__default.createElement( PropTypeTable, { component: Pagination$1 }) )
  )
); };

var items = [
  { label: '#1', uniqueId: 'opt-1', description: 'Foo' },
  { label: '#2', uniqueId: 'opt-2', description: 'Bar' },
  { label: '#3', uniqueId: 'opt-3', description: 'Baz' } ];

var handler$1 = function (event, index$$1) { return alert(index$$1); };

var introCode = "\n\n\n\nconst items = [\n  { label: '#1', uniqueId: 'opt-1', description: 'Foo' },\n  { label: '#2', uniqueId: 'opt-2', description: 'Bar' },\n  { label: '#3', uniqueId: 'opt-3', description: 'Baz' },\n];\n\nconst handler = (event, index) => alert(index);\n";

// Default demo
// -----------------------------------------

var StatelessRadio = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Standard" ),
    React__default.createElement( Block, null, React__default.createElement( RadioGroup$1, { items: items, selectedIndex: 0, onCheck: handler$1 }) )
  )
); };

var statelessRadioCode = "\n<RadioGroup\n  items={items}\n  selectedIndex={0}\n  onCheck={handler}\n/>\n";

// Colors
// -----------------------------------------

var RadioColors = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Color variants" ),
    React__default.createElement( Block, null, React__default.createElement( RadioGroup$1, { items: items, selectedIndex: 0, color: 'gray' }) ),
    React__default.createElement( Block, null, React__default.createElement( RadioGroup$1, { items: items, selectedIndex: 0, color: 'teal' }) )
  )
); };

var radioColorsCode = "\n<RadioGroup\n  items={items}\n  selectedIndex={0}\n  color='gray'\n/>\n\n<RadioGroup\n  items={items}\n  selectedIndex={0}\n  color='teal'\n/>\n";


// Stacked
// -----------------------------------------

var StackedRadio = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Stacked" ),
    React__default.createElement( Block, null, React__default.createElement( RadioGroup$1, { items: items, selectedIndex: 0, stacked: true }) )
  )
); };

var stackedRadioCode = "\n<RadioGroup\n  items={items}\n  selectedIndex={0}\n  stacked\n/>\n";


// Buttons
// -----------------------------------------

var RadioButtons = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Radio Buttons" ),
    React__default.createElement( Block, null, React__default.createElement( RadioGroup$1, { items: items, selectedIndex: 0, buttons: true }) )
  )
); };

var radioButtonsCode = "\n<RadioGroup\n  items={items}\n  selectedIndex={0}\n  buttons\n/>\n";


// Stateful demo
// -----------------------------------------

var StatefulRadio = (function (Component$$1) {
  function StatefulRadio() {
    Component$$1.call(this);
    this.state = { selectedIndex: 0 };
  }

  if ( Component$$1 ) StatefulRadio.__proto__ = Component$$1;
  StatefulRadio.prototype = Object.create( Component$$1 && Component$$1.prototype );
  StatefulRadio.prototype.constructor = StatefulRadio;
  StatefulRadio.prototype.render = function render () {
    var this$1 = this;

    var ref = this;
    var state = ref.state;
    var props = ref.props;
    var setIndex = function (event, selectedIndex) { return (
      this$1.setState({ selectedIndex: selectedIndex })
    ); };
    return (
      React__default.createElement( RadioGroup$1, Object.assign({},
        { selectedIndex: state.selectedIndex, onCheck: setIndex }, props))
    );
  };

  return StatefulRadio;
}(React.Component));

var StatefulDemo = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Stateful RadioGroup Demo" ),
    React__default.createElement( Block, null, React__default.createElement( StatefulRadio, { items: items, buttons: true }) )
  )
); };

// indentation wtf? TODO: figure this out -sebastian
var statefulDemoCode = "\n// An example stateful checkbox implementation\nclass StatefulRadio extends Component {\n  constructor() {\n    super();\n    this.state = { selectedIndex: 0 };\n  }\n  render() {\n    const { state, props } = this;\n    const setIndex = (event, selectedIndex) => (\n      this.setState({ selectedIndex })\n    );\n    return (\n      <RadioGroup\n  selectedIndex={state.selectedIndex}\n  onCheck={setIndex}\n  {...props}\n/>\n    );\n  }\n}\n\n// Usage of the stateful component\n<StatefulRadio items={items} buttons />\n";


// Main exported demo
// -----------------------------------------

var Radios = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( DemoRow, { code: introCode },
      React__default.createElement( Title, null, "Radio Groups" ),
      React__default.createElement( Details, null, "Radio groups are strictly presentational, so in order to enable interactivity you must place them within a stateful component that reacts to their ", React__default.createElement( 'code', null, "onCheck" ), " method. Note that in the ", React__default.createElement( 'code', null, "onCheck" ), " method, ", React__default.createElement( 'code', null, "event.target" ), "will be the native ", React__default.createElement( 'code', null, "input[type=radio]" ), " element. The second argument to the ", React__default.createElement( 'code', null, "onCheck" ), " handler is the index of the new selected item in the ", React__default.createElement( 'code', null, "items" ), " array." ),
      React__default.createElement( Details, null, "The required ", React__default.createElement( 'code', null, "uniqueId" ), " property in objects within the ", React__default.createElement( 'code', null, "items" ), " array will be used as a ", React__default.createElement( 'code', null, "key" ), ", so it does not need to be globally unique—just unique among the items in the radio group." ),
      React__default.createElement( Details, null, "The objects in the ", React__default.createElement( 'code', null, "items" ), " array can contain a ", React__default.createElement( 'code', null, "description" ), " property that will be displayed if the radio group has the ", React__default.createElement( 'code', null, "buttons" ), " prop enabled." )
    ),
    React__default.createElement( DemoRow, { code: statelessRadioCode }, React__default.createElement( StatelessRadio, null )),
    React__default.createElement( DemoRow, { code: radioColorsCode }, React__default.createElement( RadioColors, null )),
    React__default.createElement( DemoRow, { code: stackedRadioCode }, React__default.createElement( StackedRadio, null )),
    React__default.createElement( DemoRow, { code: radioButtonsCode }, React__default.createElement( RadioButtons, null )),
    React__default.createElement( DemoRow, { code: statefulDemoCode }, React__default.createElement( StatefulDemo, null )),
    React__default.createElement( DemoRow, null, React__default.createElement( PropTypeTable, { component: RadioGroup$1 }) )
  )
); };

var options = [
  {
    label: 'One',
    uniqueId: 'opt-1',
    description: 'Foo',
    imageUrl: 'images/1.jpg',
  },
  {
    label: 'Two',
    uniqueId: 'opt-2',
    description: 'Bar',
    imageUrl: 'images/2.jpg',
  },
  {
    label: 'Three',
    uniqueId: 'opt-3',
    description: 'Baz',
    imageUrl: 'images/3.jpg',
  } ];

var selection = {
  'opt-1': false,
  'opt-2': true,
  'opt-3': true,
};


var introCode$1 = "\n\n\nconst options = [\n  {\n    label: 'One',\n    uniqueId: 'opt-1',\n    description: 'Foo',\n    imageUrl: 'images/1.jpg',\n  },\n  {\n    label: 'Two',\n    uniqueId: 'opt-2',\n    description: 'Bar',\n    imageUrl: 'images/2.jpg',\n  },\n  {\n    label: 'Three',\n    uniqueId: 'opt-3',\n    description: 'Baz',\n    imageUrl: 'images/3.jpg',\n  },\n];\n\n\nconst selection = {\n  'opt-1': false,\n  'opt-2': true,\n  'opt-3': true\n};\n";


// Default demo
// -----------------------------------------

function handleOpenToggle(isOpen) {
  // The select dropdown was either opened or closed
}
function handleSelectionToggle(selection, computedLabel, option) {
  // An option was selected
  // \`selection\` is a new object of the form \`{ 'opt-1': true, 'opt-2': false }\`
  // \`computedLabel\` is a string you can use to replace the trigger label with the selection's label
  // \`option\` is the object that was selected from the \`options\` array
}

var SelectDemo = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Default" ),
    React__default.createElement( Select, {
      options: options, onOpenToggle: handleOpenToggle, selectedOptions: selection, onSelectionToggle: handleSelectionToggle, isOpen: true, multiSelect: true })
  )
); };

var selectDemoCode = "\n\nfunction handleOpenToggle(isOpen) {\n  // The select dropdown was either opened or closed\n}\nfunction handleSelectionToggle(selection, computedLabel, option) {\n  // An option was selected\n  // `selection` is a new object of the form `{ 'opt-1': true, 'opt-2': false }`\n  // `computedLabel` is a string you can use to replace the trigger label with the selection's label\n  // `option` is the object that was selected from the `options` array\n}\n\n<Select\n  options={options}\n  onOpenToggle={handleOpenToggle}\n  selectedOptions={selection}\n  onSelectionToggle={handleSelectionToggle}\n  isOpen\n  multiSelect\n/>\n";


// Media demo
// -----------------------------------------

var MediaDemo = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Media Select" ),
    React__default.createElement( MediaSelect, {
      options: options, onOpenToggle: handleOpenToggle, selectedOptions: selection, onSelectionToggle: handleSelectionToggle, isOpen: true, multiSelect: true })
  )
); };

var mediaDemoCode = "\n<MediaSelect\n  options={options}\n  onOpenToggle={handleOpenToggle}\n  selectedOptions={selection}\n  onSelectionToggle={handleSelectionToggle}\n  isOpen\n  multiSelect\n/>\n\n\n\n\n";

// Minimal stateful demo
// -----------------------------------------

var SelectMinimal = (function (Component$$1) {
  function SelectMinimal(props) {
    Component$$1.call(this, props);
    this.state = {
      isOpen: false,
      selectedOptions: {},
      label: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  if ( Component$$1 ) SelectMinimal.__proto__ = Component$$1;
  SelectMinimal.prototype = Object.create( Component$$1 && Component$$1.prototype );
  SelectMinimal.prototype.constructor = SelectMinimal;
  SelectMinimal.prototype.handleChange = function handleChange (selectedOptions, label /* , optionToggled, optionWillBeChecked */) {
    this.setState({ selectedOptions: selectedOptions, label: label });
  };
  SelectMinimal.prototype.render = function render () {
    var this$1 = this;

    var setOpen = function (isOpen) { return this$1.setState({ isOpen: isOpen }); };
    return (
      React__default.createElement( Select, Object.assign({},
        this.props, { isOpen: this.state.isOpen, selectedOptions: this.state.selectedOptions, onSelectionToggle: this.handleChange, onOpenToggle: setOpen, triggerLabel: this.state.label }))
    );
  };

  return SelectMinimal;
}(React.Component));

var MinimalDemo = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Minimal Stateful Select" ),
    React__default.createElement( SelectMinimal, { options: options })
  )
); };

var minimalDemoCode = "\n// An example stateful select implementation\nclass SelectMinimal extends Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      isOpen: false,\n      selectedOptions: {},\n      label: '',\n    };\n    this.handleChange = this.handleChange.bind(this);\n  }\n  handleChange(selectedOptions, label /*, optionToggled, optionWillBeChecked */) {\n    this.setState({ selectedOptions, label });\n  }\n  render() {\n    const setOpen = isOpen => this.setState({ isOpen });\n    return (\n      <Select\n        {...this.props}\n        isOpen={this.state.isOpen}\n        selectedOptions={this.state.selectedOptions}\n        onSelectionToggle={this.handleChange}\n        onOpenToggle={setOpen}\n        triggerLabel={this.state.label}\n      />\n    );\n  }\n}\n\n// Usage of the stateful component\n<SelectMinimal options={options} />\n";


// Complete stateful media component
// -----------------------------------------

var MediaSelectDemo = (function (Component$$1) {
  function MediaSelectDemo(props) {
    Component$$1.call(this, props);
    this.state = {
      isLoading: false,
      isOpen: false,
      selectedOptions: {},
      label: '',
      filteredOptions: props.options,
      searchValue: '',
      processingOptions: [],
    };
    this.setOpen = this.setOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
  }

  if ( Component$$1 ) MediaSelectDemo.__proto__ = Component$$1;
  MediaSelectDemo.prototype = Object.create( Component$$1 && Component$$1.prototype );
  MediaSelectDemo.prototype.constructor = MediaSelectDemo;

  MediaSelectDemo.prototype.setOpen = function setOpen (isOpen) {
    this.setState({ isOpen: isOpen });
  };

  MediaSelectDemo.prototype.handleChange = function handleChange (selectedOptions, label, option /* , optionWillBeChecked */) {
    var this$1 = this;

    var ref = this.state;
    var processingOptions = ref.processingOptions;
    this.setState({ processingOptions: processingOptions.concat(option.uniqueId) });
    // (setTimeout to simulate delay due to ajax request)
    setTimeout(function () {
      var optionIndex = processingOptions.indexOf(option.uniqueId);
      if (optionIndex !== -1) { processingOptions.splice(optionIndex, 1); }
      this$1.setState({
        selectedOptions: selectedOptions,
        label: label,
        processingOptions: processingOptions,
      });
    }, 300);
  };

  MediaSelectDemo.prototype.search = function search (query) {
    var this$1 = this;

    var opts = this.props.options;
    this.setState({ searchValue: query, isLoading: true });
    // (setTimeout to simulate delay due to ajax request)
    setTimeout(function () {
      var filteredOptions = opts.filter(function (opt) { return opt.label.indexOf(query) !== -1; });
      this$1.setState({ filteredOptions: filteredOptions, isLoading: false });
    }, 300);
  };

  MediaSelectDemo.prototype.render = function render () {
    return (
      React__default.createElement( MediaSelect, Object.assign({},
        this.props, { isOpen: this.state.isOpen, isLoading: this.state.isLoading, selectedOptions: this.state.selectedOptions, onSelectionToggle: this.handleChange, onOpenToggle: this.setOpen, triggerLabel: this.state.label, search: this.search, searchValue: this.state.searchValue, options: this.state.filteredOptions, processingOptions: this.state.processingOptions }))
    );
  };

  return MediaSelectDemo;
}(React.Component));


var CompleteDemo = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Stateful Media Multi-Select with Search and Processing State" ),
    React__default.createElement( MediaSelectDemo, { options: options, multiSelect: true })
  )
); };

var completeDemoCode = "\n// An example stateful media select implementation.\n// There's a lot of code here, but if you don't want\n// all of this flexibility skip ahead to the section\n// on default stateful select components.\nclass StatefulMediaSelect extends Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      isLoading: false,\n      isOpen: false,\n      selectedOptions: {},\n      label: '',\n      filteredOptions: props.options,\n      searchValue: '',\n      processingOptions: [],\n    };\n    this.setOpen = this.setOpen.bind(this);\n    this.handleChange = this.handleChange.bind(this);\n    this.search = this.search.bind(this);\n  }\n\n  setOpen(isOpen) {\n    this.setState({ isOpen });\n  }\n\n  handleChange(selectedOptions, label, option /* , optionWillBeChecked */) {\n    const { processingOptions } = this.state;\n    this.setState({ processingOptions: processingOptions.concat(option.uniqueId) });\n    // (setTimeout to simulate delay due to ajax request)\n    setTimeout(() => {\n      const optionIndex = processingOptions.indexOf(option.uniqueId);\n      if (optionIndex !== -1) { processingOptions.splice(optionIndex, 1); }\n      this.setState({\n        selectedOptions,\n        label,\n        processingOptions,\n      });\n    }, 300);\n  }\n\n  search(query) {\n    const opts = this.props.options;\n    this.setState({ searchValue: query, isLoading: true });\n    // (setTimeout to simulate delay due to ajax request)\n    setTimeout(() => {\n      const filteredOptions = opts.filter(opt => opt.label.indexOf(query) !== -1);\n      this.setState({ filteredOptions, isLoading: false });\n    }, 300);\n  }\n\n  render() {\n    return (\n      <MediaSelect\n        {...this.props}\n        isOpen={this.state.isOpen}\n        isLoading={this.state.isLoading}\n        selectedOptions={this.state.selectedOptions}\n        onSelectionToggle={this.handleChange}\n        onOpenToggle={this.setOpen}\n        triggerLabel={this.state.label}\n        search={this.search}\n        searchValue={this.state.searchValue}\n        options={this.state.filteredOptions}\n        processingOptions={this.state.processingOptions}\n      />\n    );\n  }\n}\n\n// Usage of the stateful component\n<StatefulMediaSelect options={options} multiSelect />\n";

var StatefulDemo$1 = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Default Stateful Select" ),
    React__default.createElement( Details, { withDemo: true }, "The ", React__default.createElement( 'code', null, "Select" ), " component that is provided by default is stateless and provides low-level control over the component. This is great if you want to customize a lot of the functionality, but in case you want a ready-to-go stateful component with minimal boilerplate there is also one provided."),
    React__default.createElement( StatefulSelect, { options: options })
  )
); };

var statefulDemoCode$1 = "\nimport { StatefulSelect } from '@vhx/quartz-react';\n\n<StatefulSelect options={options} />\n";


// Stateful colors demo
// -----------------------------------------

var StatefulColorsDemo = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Colors" ),
    React__default.createElement( StatefulSelect, { options: options, color: 'gray' }),
    React__default.createElement( StatefulSelect, { options: options, color: 'white' }),
    React__default.createElement( StatefulSelect, { options: options, color: 'teal' })
  )
); };

var statefulColorsDemoCode = "\n<StatefulSelect options={options} color='gray' />\n<StatefulSelect options={options} color='white' />\n<StatefulSelect options={options} color='teal' />\n";


// Stateful carets demo
// -----------------------------------------

var StatefulCaretsDemo = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Caret positions" ),
    React__default.createElement( Block, null, React__default.createElement( StatefulSelect, { options: options, triggerPlaceholder: 'Above and left', dropdownPosition: 'above', caretAlign: 'left' }) ),
    React__default.createElement( Block, null, React__default.createElement( StatefulSelect, { options: options, triggerPlaceholder: 'Above and center', dropdownPosition: 'above', caretAlign: 'center' }) ),
    React__default.createElement( Block, null, React__default.createElement( StatefulSelect, { options: options, triggerPlaceholder: 'Above and right', dropdownPosition: 'above', caretAlign: 'right' }) ),
    React__default.createElement( Block, null, React__default.createElement( StatefulSelect, { options: options, triggerPlaceholder: 'Below and left', caretAlign: 'left' }) ),
    React__default.createElement( Block, null, React__default.createElement( StatefulSelect, { options: options, triggerPlaceholder: 'Below and center', caretAlign: 'center' }) ),
    React__default.createElement( Block, null, React__default.createElement( StatefulSelect, { options: options, triggerPlaceholder: 'Below and right', caretAlign: 'right' }) )
  )
); };

var statefulCaretsDemoCode = "\n<StatefulSelect options={options} triggerPlaceholder='Above and left' dropdownPosition='above' caretAlign='left' />\n<StatefulSelect options={options} triggerPlaceholder='Above and center' dropdownPosition='above' caretAlign='center' />\n<StatefulSelect options={options} triggerPlaceholder='Above and right' dropdownPosition='above' caretAlign='right' />\n<StatefulSelect options={options} triggerPlaceholder='Below and left' caretAlign='left' />\n<StatefulSelect options={options} triggerPlaceholder='Below and center' caretAlign='center' />\n<StatefulSelect options={options} triggerPlaceholder='Below and right' caretAlign='right' />\n";


// Multi-select demo
// -----------------------------------------

var StatefulMultiSelectDemo = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "MultiSelect" ),
    React__default.createElement( Block, null, React__default.createElement( StatefulSelect, { options: options, multiSelect: true }) )
  )
); };

var statefulMultiSelectDemoCode = "\n<StatefulSelect options={options} multiSelect />\n";


// Custom trigger demo
// -----------------------------------------
var MyTrigger = function (ref) {
  var isOpen = ref.isOpen;
  var onOpenToggle = ref.onOpenToggle;

  return (
  React__default.createElement( 'button', { onClick: function () { return onOpenToggle(!isOpen); } }, "Choose something (", isOpen ? 'close' : 'open', ")")
);
};

MyTrigger.propTypes = {
  isOpen: index.bool.isRequired,
  onOpenToggle: index.func.isRequired,
};

var CustomTriggerDemo = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Custom Trigger" ),
    React__default.createElement( Details, { withDemo: true }, "A custom trigger component can be passed to the ", React__default.createElement( 'code', null, "Select" ), ". It will be passed the ", React__default.createElement( 'code', null, "isOpen" ), " and ", React__default.createElement( 'code', null, "onOpenToggle" ), "props from the parent ", React__default.createElement( 'code', null, "Select" ), " component."),
    React__default.createElement( Block, null, React__default.createElement( StatefulSelect, { options: options, Trigger: MyTrigger, inline: true }) )
  )
); };

var customTriggerDemoCode = "\nconst MyTrigger = ({ isOpen, onOpenToggle }) => (\n  <button onClick={() => onOpenToggle(!isOpen)}>\n    Choose something ({isOpen ? 'close' : 'open'})\n  </button>\n);\n\n<StatefulSelect options={options} Trigger={MyTrigger} inline />\n";


// Default Stateful Media Select Demo
// -----------------------------------------

var StatefulMediaSelectDemo = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Default Stateful Media Select" ),
    React__default.createElement( Details, { withDemo: true }, "A stateful variant of the ", React__default.createElement( 'code', null, "MediaSelect" ), " is available for use as well, when full customization is not needed."),
    React__default.createElement( Block, null, React__default.createElement( StatefulMediaSelect, { options: options, multiSelect: true }) )
  )
); };

var statefulMediaSelectDemoCode = "\nimport { StatefulMediaSelect } from '@vhx/quartz-react';\n\n<StatefulMediaSelect options={options} multiSelect />\n";


// Main exported demo
// -----------------------------------------

var Selects = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( DemoRow, { code: introCode$1 },
      React__default.createElement( Title, null, "Selects" ),
      React__default.createElement( Details, null, "Selects are, by default, strictly presentational, so in order to enable interactivity you must place them within a stateful component that reacts to their ", React__default.createElement( 'code', null, "onOpenToggle" ), " and ", React__default.createElement( 'code', null, "onSelectionToggle" ), " methods. For convenience, you can import the ", React__default.createElement( 'code', null, "StatefulSelect" ), " instead which reduces some of the boilerplate at the price of reduced flexibility. Examples are provided below, both for implementing your own stateful select and for using the default stateful select." ),
      React__default.createElement( Details, null, "The set of options passed to the select must be an array of objects of the following form: ", React__default.createElement( 'pre', { className: 'code' },
          "{\n  uniqueId: String,\n  label: String,\n  description: String?,\n  imageUrl: String?\n}"
        ), "The ", React__default.createElement( 'code', null, "uniqueId" ), " property will be used as a ", React__default.createElement( 'code', null, "key" ), ", so it does not need to be globally unique—just unique among the options." ),
      React__default.createElement( Details, null, "The select also accepts a ", React__default.createElement( 'code', null, "selectedOptions" ), " prop used to specify which of those options are selected. ", React__default.createElement( 'pre', { className: 'code' },
          "{\n  'opt-1': false,\n  'opt-2': true,\n  'opt-3': true\n}"
        ), "In this example the last two options will be selected. For convenience, ", React__default.createElement( 'code', null, "undefined" ), " options will also be treated as false, so the following is equivalent: ", React__default.createElement( 'pre', { className: 'code' },
          "{\n  'opt-2': true,\n  'opt-3': true\n}"
        )
      ),
      React__default.createElement( Details, null, "In addition, the ", React__default.createElement( 'code', null, "MediaSelect" ), " can accept an array of ids corresponding to the options that are in a ", React__default.createElement( 'code', null, "processing" ), "state. Those options will have a spinner icon displayed in the dropdown. An example of this is available in the section labeled ", React__default.createElement( 'q', null, "Stateful Media Multi-Select with Search and Processing State" ), "." )
    ),
    React__default.createElement( DemoRow, { code: selectDemoCode }, React__default.createElement( SelectDemo, null )),
    React__default.createElement( DemoRow, { code: mediaDemoCode }, React__default.createElement( MediaDemo, null )),
    React__default.createElement( DemoRow, { code: minimalDemoCode }, React__default.createElement( MinimalDemo, null )),
    React__default.createElement( DemoRow, { code: completeDemoCode }, React__default.createElement( CompleteDemo, null )),
    React__default.createElement( DemoRow, { code: statefulDemoCode$1 }, React__default.createElement( StatefulDemo$1, null )),
    React__default.createElement( DemoRow, { code: statefulColorsDemoCode }, React__default.createElement( StatefulColorsDemo, null )),
    React__default.createElement( DemoRow, { code: statefulCaretsDemoCode }, React__default.createElement( StatefulCaretsDemo, null )),
    React__default.createElement( DemoRow, { code: statefulMultiSelectDemoCode }, React__default.createElement( StatefulMultiSelectDemo, null )),
    React__default.createElement( DemoRow, { code: customTriggerDemoCode }, React__default.createElement( CustomTriggerDemo, null )),
    React__default.createElement( DemoRow, { code: statefulMediaSelectDemoCode }, React__default.createElement( StatefulMediaSelectDemo, null )),
    React__default.createElement( DemoRow, null, React__default.createElement( PropTypeTable, { component: Select }) )
  )
); };

var SidebarChildren = function () { return React__default.createElement( 'div', null, "Sidebar children go here" ); };

var OtherSidebarChildren = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( 'div', null, "Here is some different content for the sidebar" ),
    React__default.createElement( 'img', { src: 'images/1.jpg', alt: 'yum' })
  )
); };

var SidebarDemo = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Sidebar Demo" ),
    React__default.createElement( Block, null, React__default.createElement( Button$1, { onClick: function () { return Sidebar$2.open(SidebarChildren); } }, "Open sidebar 1") ),
    React__default.createElement( Block, null, React__default.createElement( Button$1, { onClick: function () { return Sidebar$2.toggle(SidebarChildren); } }, "Toggle sidebar 1") ),
    React__default.createElement( Hr, null ),
    React__default.createElement( Block, null, React__default.createElement( Button$1, { onClick: function () { return Sidebar$2.open(OtherSidebarChildren); } }, "Open sidebar 2") ),
    React__default.createElement( Block, null, React__default.createElement( Button$1, { onClick: function () { return Sidebar$2.toggle(OtherSidebarChildren); } }, "Toggle sidebar 2") ),
    React__default.createElement( Hr, null ),
    React__default.createElement( Block, null, React__default.createElement( Button$1, { onClick: function () { return Sidebar$2.close(); } }, "Close all sidebars") ),
    React__default.createElement( Block, null, React__default.createElement( Button$1, { onClick: function () { return Sidebar$2.open(); } }, "Reopen most recent sidebar") ),
    React__default.createElement( Block, null, React__default.createElement( Button$1, { onClick: function () { return Sidebar$2.toggle(); } }, "Toggle most recent sidebar") )
  )
); };

var sidebarCode = "\nconst Children = () => (\n  <div>Sidebar children go here</div>\n);\n\n<Button onClick={() => Sidebar.open(Children)}>\n  Open sidebar\n</Button>\n\n<Button onClick={() => Sidebar.close()}>\n  Close sidebar\n</Button>\n\n<Button onClick={() => Sidebar.toggle(Children)}>\n  Toggle sidebar\n</Button>\n\n<Button onClick={() => Sidebar.open()}>\n  Reopen most recent sidebar\n</Button>\n\n<Button onClick={() => Sidebar.toggle()}>\n  Toggle most recent sidebar\n</Button>\n";


// Main exported demo
// -----------------------------------------

var Sidebars = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( DemoRow, null,
      React__default.createElement( Title, null, "Sidebars" ),
      React__default.createElement( Details, null,
        React__default.createElement( 'strong', null, "Important:" ), " You probably do not want to use the ", React__default.createElement( 'code', null, "Sidebar" ), " as a component! Use its static methods: ", React__default.createElement( 'pre', { className: 'code' },
          "Sidebar.open(ChildComponent);\nSidebar.close();\nSidebar.toggle(ChildComponent);"
        ), "If you do intend to use the component (ie. you are adding a sidebar to an application that does not yet have any sidebars) then read on." ),
      React__default.createElement( Details, null, "The ", React__default.createElement( 'code', null, "<Sidebar />" ), " component accepts no props or children and should be initialized only ", React__default.createElement( 'strong', null, "once" ), " in the root component of your app. After this initialization, it will manage itself and respond only to updates through its static method calls." ),
      React__default.createElement( Details, null, "Calling ", React__default.createElement( 'code', null, "Sidebar.open()" ), " or ", React__default.createElement( 'code', null, "Sidebar.toggle()" ), " without any arguments will reopen or toggle the sidebar with the most recently used children." )
    ),
    React__default.createElement( DemoRow, { code: sidebarCode }, React__default.createElement( SidebarDemo, null ))
  )
); };

var TagsDemo = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Tags with Two Callbacks" ),
    React__default.createElement( Block, null, React__default.createElement( Tag$1, { label: 'Default tag', onClick: function () { return alert('Success'); }, onRemove: function () { return alert('Removed'); } }) )
  )
); };

var tagsDemoCode = "\n<Tag\n  label='Default tag'\n  onClick={(event) => alert('Success')}\n  onRemove={(event) => alert('Removed')}\n/>\n";

// Truncated demo
// -----------------------------------------

var TruncatedDemo = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Truncated Tags" ),
    React__default.createElement( Block, null, React__default.createElement( Tag$1, { label: 'Truncated tag', maxLength: 6 }) )
  )
); };

var truncatedDemoCode = "\n<Tag\n  label='Truncated tag'\n  maxLength={6}\n/>\n";

// Processing demo
// -----------------------------------------

var ProcessingDemo = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Processing" ),
    React__default.createElement( Block, null, React__default.createElement( Tag$1, { label: 'Foo', isProcessing: true }) )
  )
); };

var processingDemoCode = "\n<Tag label='Foo' isProcessing />\n";


// Main exported demo
// -----------------------------------------

var Tags = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( DemoRow, null, React__default.createElement( Title, null, "Tags" ) ),
    React__default.createElement( DemoRow, { code: tagsDemoCode }, React__default.createElement( TagsDemo, null )),
    React__default.createElement( DemoRow, { code: truncatedDemoCode }, React__default.createElement( TruncatedDemo, null )),
    React__default.createElement( DemoRow, { code: processingDemoCode }, React__default.createElement( ProcessingDemo, null )),
    React__default.createElement( DemoRow, null, React__default.createElement( PropTypeTable, { component: Tag$1 }) )
  )
); };

var TextHeadings = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Headings" ),
    React__default.createElement( Block, null, React__default.createElement( Text$1, { h1: true }, "Heading 1") ),
    React__default.createElement( Block, null, React__default.createElement( Text$1, { h2: true }, "Heading 2") ),
    React__default.createElement( Block, null, React__default.createElement( Text$1, { h3: true }, "Heading 3") ),
    React__default.createElement( Block, null, React__default.createElement( Text$1, { h4: true }, "Heading 4") ),
    React__default.createElement( Block, null, React__default.createElement( Text$1, { h5: true }, "Heading 5") )
  )
); };

var textHeadingCode = "\n<Text h1>Heading 1</Text>\n<Text h2>Heading 2</Text>\n<Text h3>Heading 3</Text>\n<Text h4>Heading 4</Text>\n<Text h5>Heading 5</Text>\n";


// Text colors
// -----------------------------------------

var TextColors = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Subtitle, null, "Colors" ),
    React__default.createElement( Block, null, React__default.createElement( Text$1, null, "Default" ) ),
    React__default.createElement( Block, null, React__default.createElement( Text$1, { color: 'navy' }, "navy") ),
    React__default.createElement( Block, null, React__default.createElement( Text$1, { color: 'teal' }, "teal") ),
    React__default.createElement( Block, null, React__default.createElement( Text$1, { color: 'gray' }, "gray") ),
    React__default.createElement( Block, null, React__default.createElement( Text$1, { color: 'vimeo-blue' }, "Vimeo blue") ),
    React__default.createElement( Block, null, React__default.createElement( Text$1, { color: 'sunset-orange' }, "Sunset Orange") ),
    React__default.createElement( Block, null, React__default.createElement( Text$1, { color: 'regent-gray' }, "Regent Gray") ),
    React__default.createElement( Block, null, React__default.createElement( Text$1, { color: 'astro-granite' }, "Astrogranite") ),
    React__default.createElement( Block, { dark: true, inline: true }, React__default.createElement( Text$1, { color: 'white' }, "white"))
  )
); };

var textColorsCode = "\n<Text>Default</Text>\n<Text color='navy'>navy</Text>\n<Text color='teal'>teal</Text>\n<Text color='gray'>gray</Text>\n<Text color='white'>white</Text>\n";


// Main exported demo
// -----------------------------------------

var TextDemo = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( DemoRow, null, React__default.createElement( Title, null, "Text" ) ),
    React__default.createElement( DemoRow, { code: textHeadingCode }, React__default.createElement( TextHeadings, null )),
    React__default.createElement( DemoRow, { code: textColorsCode }, React__default.createElement( TextColors, null )),
    React__default.createElement( DemoRow, null, React__default.createElement( PropTypeTable, { component: Text$1 }) )
  )
); };

var sections = [
  { Section: Avatars,     slug: 'avatars',      title: 'Avatars' },
  { Section: Buttons,     slug: 'buttons',      title: 'Buttons' },
  { Section: Carousels,   slug: 'carousels',    title: 'Carousels' },
  { Section: Checkboxes,  slug: 'checkboxes',   title: 'Checkboxes' },
  { Section: Headers,     slug: 'headers',      title: 'Headers' },
  { Section: Icons,       slug: 'icons',        title: 'Icons' },
  { Section: Inputs,      slug: 'inputs',       title: 'Inputs' },
  { Section: ModalDemo,      slug: 'modals',       title: 'Modals' },
  { Section: Paginators,  slug: 'pagination',   title: 'Pagination' },
  { Section: Radios,      slug: 'radiogroups',  title: 'Radio Groups' },
  { Section: Selects,     slug: 'selects',      title: 'Selects' },
  { Section: Sidebars,    slug: 'sidebars',     title: 'Sidebars' },
  { Section: Tags,        slug: 'tags',         title: 'Tags' },
  { Section: TextDemo,        slug: 'text',         title: 'Text' } ];
/* eslint-enable no-multi-spaces */

var AllComponents = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Nav, { sections: sections }),
    React__default.createElement( 'div', { className: 'stage' },
      sections.map(function (ref) {
          var Section = ref.Section;
          var slug = ref.slug;

          return (
          React__default.createElement( 'div', { id: slug, key: slug },
            React__default.createElement( Section, { title: 'foo' })
          )
        );
  })
    ),
    React__default.createElement( Sidebar$2, null ),
    React__default.createElement( Modal$2, null )
  )
); };

var mountNode = document.getElementById('app');
ReactDOM.render(React__default.createElement( AllComponents, null ), mountNode);

}(React,ReactDOM));
