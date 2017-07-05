(function (React,ReactDOM) {
'use strict';

var React__default = 'default' in React ? React['default'] : React;
ReactDOM = 'default' in ReactDOM ? ReactDOM['default'] : ReactDOM;

var iconList = [ 'activity', 'add-member', 'alert', 'align', 'amex-card', 'android-workmark', 'android', 'angle-down', 'angle-left', 'angle-up', 'angle-right', 'api', 'apple', 'apps', 'arrow-down', 'arrow-left', 'arrow-right', 'arrow-up', 'audio', 'ban', 'bell', 'briefcase', 'calendar', 'camera', 'card', 'caret-down', 'caret-left', 'caret-right', 'caret-up', 'cassette-frown', 'cassette', 'chevron-down', 'check', 'chevron-left', 'chevron-right', 'chevron-up', 'chrome', 'clapboard', 'clock', 'code', 'cog', 'collection', 'comment', 'comments', 'currency', 'desktop', 'diners-card', 'csv', 'discover-card', 'doc', 'download-alt', 'download', 'dropbox', 'edit', 'ellipsis-vertical', 'ellipsis', 'envelope-sealed', 'envelope', 'external-link', 'eye', 'facebook', 'followers', 'gift', 'globe', 'grid', 'help', 'hi', 'home', 'instagram', 'invoice', 'ios', 'jcb-card', 'justify', 'key', 'link', 'list', 'lock', 'marker', 'mastercard-card', 'media', 'member', 'money-card', 'money-circle', 'money', 'paypal-card', 'pic', 'play-outline', 'play', 'plus-thin', 'plus', 'popular', 'power', 'printer', 'product', 'question', 'random', 'referral', 'refresh', 'revert', 'roku-wordmark', 'reply', 'roku', 'search', 'sliders', 'star-outline', 'star', 'tag', 'tags', 'todo', 'trash', 'transaction', 'tumblr', 'tv', 'tvos', 'twitter', 'upload-alt', 'upload', 'vhs', 'vhx', 'vimeovhx-dark', 'vimeovhx-light', 'visa-card', 'window', 'x', 'xmas-tree' ];

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

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

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
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

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

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

var If = function (ref) {
  var condition = ref.condition;
  var children = ref.children;
  var inline = ref.inline;

  var el = inline ? React__default.createFactory('span') : React__default.createFactory('div');
  return (condition ? el(null, children) : React__default.createElement( 'span', null ));
};

If.propTypes = {
  condition: index.bool.isRequired,
  children: index.node.isRequired,
  inline: index.bool,
};

If.defaultProps = {
  inline: false,
};

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

// given `aspectRatio` of "16:9" and width 1280
// => 720
function getAspectRatioHeight(aspectRatio, width) {
  var ref = aspectRatio.split(':').map(function (str) { return parseInt(str, 10); });
  var w = ref[0];
  var h = ref[1];
  var height = width / (w / h);
  return Math.floor(height); // round down to prevent possible single pixel black line
}

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

function getClassName(ref) {
  var className = ref.className;
  var color = ref.color;
  var size = ref.size;
  var typeface = ref.typeface;
  var processing = ref.processing;

  return index$1('btn', className, {
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
  children: index.node.isRequired,
  className: index.string,
  color: index.oneOf([ 'gray', 'teal', 'white', 'red', 'purple', 'green', 'slate', 'black', 'yellow', 'transparent', 'twitter', 'facebook', 'tumblr', 'paypal', 'roku' ]),
  processing: index.bool,
  onClick: index.func,
  size: index.oneOf([ 'small', 'medium', 'large', 'half', 'fill' ]),
  typeface: index.oneOf([ 'brandon', '' ]),
};

Button$1.defaultProps = {
  className: '',
  color: 'gray',
  onClick: null,
  processing: false,
  size: 'medium',
  typeface: '',
};

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

  return index$1(className, ( obj = {
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
  children: index.node,
  className: index.string,
  circle: index.bool,
  color: index.oneOf([ '', 'navy', 'teal', 'white', 'gray' ]),
  name: index.oneOf(iconList).isRequired,
  left: index.bool,
  right: index.bool,
  size: index.oneOf([ 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge' ]),
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
    var ref = [ 37, 39 ];
    var LEFT = ref[0];
    var RIGHT = ref[1];
    var key = event.keyCode || event.which;
    if (key === LEFT) { this.prev(); }
    if (key === RIGHT) { this.next(); }
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
          React__default.createElement( 'div', { className: 'coins' }, slides.map(this.generateCoin)),
          React__default.createElement( 'button', { disabled: isAnimating, onClick: this.prev, className: 'carousel-arrow carousel-arrow--left' }, React__default.createElement( Icon$1, { name: 'angle-left', color: 'white', size: isMobile ? 'xsmall' : 'small' })),
          React__default.createElement( 'button', { disabled: isAnimating, onClick: this.next, className: 'carousel-arrow carousel-arrow--right' }, React__default.createElement( Icon$1, { name: 'angle-right', color: 'white', size: isMobile ? 'xsmall' : 'small' }))
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
  animationDuration: index.number,
  aspectRatio: aspectRatioPropType,
  maxHeight: index.number,
  minHeight: index.number,
  slides: index.arrayOf(index.shape({
    Slide: index.func.isRequired,
    id: index.string.isRequired,
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

  return index$1('checkbox', size, { alt: type === 'toggle' });
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
      React__default.createElement( 'input', { type: 'checkbox', checked: props.checked, name: props.uniqueId, value: props.value, onChange: props.onChange, id: props.uniqueId }),
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
  checked: index.bool,
  label: index.string,
  uniqueId: index.string.isRequired,
  onChange: index.func,
  size: index.oneOf([ 'small', 'medium', 'large' ]),
  type: index.oneOf([ 'standard', 'toggle' ]),
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

function getClassName$4(checked) {
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
    React__default.createElement( 'label', { className: getClassName$4(checked), onClick: function (event) { return onCheck(event, index$$1); } },
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
  checked: index.bool.isRequired,
  description: index.string,
  index: index.number.isRequired,
  label: index.string.isRequired,
  onCheck: index.func.isRequired,
};

RadioButton.defaultProps = {
  description: '',
};

function getClassName$3(ref) {
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
    React__default.createElement( 'ul', { className: getClassName$3({ buttons: buttons, color: color, stacked: stacked }) },
      items.map(getRadioComponent({ buttons: buttons, onCheck: onCheck, selectedIndex: selectedIndex }))
    )
  )
);
};

var radioItemPropType = index.shape({
  label: index.string.isRequired,
  uniqueId: index.string.isRequired,
});

RadioGroup$1.propTypes = {
  buttons: index.bool,
  color: index.oneOf([ 'teal', 'gray' ]),
  items: index.arrayOf(radioItemPropType).isRequired,
  onCheck: index.func,
  selectedIndex: index.number,
  stacked: index.bool,
};

RadioGroup$1.defaultProps = {
  buttons: false,
  color: 'teal',
  onCheck: function () {},
  selectedIndex: -1,
  stacked: false,
};

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
  buttonClass: index.string,
  description: index.string.isRequired,
  img: index.string.isRequired,
  mobileImg: index.string.isRequired,
  isWide: index.bool,
  title: index.string.isRequired,
  trailer: index.string, // probably a URL or id
  subtitle: index.string,
};

Slide$1.defaultProps = {
  buttonClass: 'slide-button--default',
  isWide: false,
  subtitle: '',
  trailer: null,
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

function getClassName$5(props) {
  return index$1({
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
  block: index.bool,
  children: index.node.isRequired,
  h1: index.bool,
  h2: index.bool,
  h3: index.bool,
  h4: index.bool,
  h5: index.bool,
  color: index.oneOf([ 'navy', 'gray', 'teal', 'white' ]),
};

Text$1.defaultProps = {
  block: false,
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  h5: false,
  color: 'navy',
};

var Section = function (ref) {
  var children = ref.children;
  var title = ref.title;

  return (
  React__default.createElement( 'div', { className: 'padding-large border-bottom' },
    React__default.createElement( 'div', { className: 'padding-bottom-medium' },
      React__default.createElement( Text$1, { h3: true }, title)
    ),
    React__default.createElement( 'div', null, children )
  )
);
};

Section.propTypes = {
  children: index.node.isRequired,
  title: index.string.isRequired,
};

var Block = function (ref) {
  var children = ref.children;
  var dark = ref.dark;
  var inline = ref.inline;

  var className = [
    'padding-small',
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

var Subtitle = function (ref) {
  var children = ref.children;

  return (
  React__default.createElement( Block, null, React__default.createElement( Text$1, { h5: true }, children) )
);
};

Subtitle.propTypes = {
  children: index.node.isRequired,
};

var CheckboxDemo = (function (Component$$1) {
  function CheckboxDemo() {
    Component$$1.call(this);
    this.state = { checked: true };
    this.toggle = this.toggle.bind(this);
  }

  if ( Component$$1 ) CheckboxDemo.__proto__ = Component$$1;
  CheckboxDemo.prototype = Object.create( Component$$1 && Component$$1.prototype );
  CheckboxDemo.prototype.constructor = CheckboxDemo;

  CheckboxDemo.prototype.toggle = function toggle () {
    this.setState({ checked: !this.state.checked });
  };

  CheckboxDemo.prototype.render = function render () {
    return React__default.createElement( Checkbox$1, Object.assign({}, this.props, { checked: this.state.checked, onChange: this.toggle }));
  };

  return CheckboxDemo;
}(React.Component));

CheckboxDemo.propTypes = Checkbox$1.propTypes;
CheckboxDemo.defaultProps = Checkbox$1.defaultProps;

var StatefulRadio = (function (Component$$1) {
  function StatefulRadio() {
    Component$$1.call(this);
    this.state = { selectedIndex: 0 };
    this.setIndex = this.setIndex.bind(this);
  }

  if ( Component$$1 ) StatefulRadio.__proto__ = Component$$1;
  StatefulRadio.prototype = Object.create( Component$$1 && Component$$1.prototype );
  StatefulRadio.prototype.constructor = StatefulRadio;

  StatefulRadio.prototype.setIndex = function setIndex (event, selectedIndex) {
    this.setState({ selectedIndex: selectedIndex });
  };

  StatefulRadio.prototype.render = function render () {
    return (
      React__default.createElement( RadioGroup$1, Object.assign({},
        { selectedIndex: this.state.selectedIndex, onCheck: this.setIndex }, this.props))
    );
  };

  return StatefulRadio;
}(React.Component));

var StatefulInput = (function (Component$$1) {
  function StatefulInput() {
    Component$$1.call(this);
    this.state = { value: '' };
    this.setValue = this.setValue.bind(this);
  }

  if ( Component$$1 ) StatefulInput.__proto__ = Component$$1;
  StatefulInput.prototype = Object.create( Component$$1 && Component$$1.prototype );
  StatefulInput.prototype.constructor = StatefulInput;

  StatefulInput.prototype.setValue = function setValue (event) {
    this.setState({ value: event.target.value });
  };

  StatefulInput.prototype.render = function render () {
    return (
      React__default.createElement( Input$1, Object.assign({},
        this.props, { onInput: this.setValue, value: this.state.value }))
    );
  };

  return StatefulInput;
}(React.Component));

var lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';

var Slide1 = {
  Slide: function (props) { return (
    React__default.createElement( Slide$1, {
      dynamicProps: props, title: 'Slide 1 title', subtitle: '3 Seasons', description: lorem, img: '/images/16-6-A.png', mobileImg: '/images/16-6-A-mob.png', isWide: true, trailer: '123' })
  ); },
  id: 's1',
};

var Slide2 = {
  Slide: function (props) { return (
    React__default.createElement( Slide$1, {
      dynamicProps: props, title: 'Slide 2 title is a very long title with many words', subtitle: '3 Seasons', description: lorem, img: '/images/16-9-B.png', mobileImg: '/images/16-9-B-mob.png', isWide: false, trailer: '123' })
  ); },
  id: 's2',
};

var Slide3 = {
  Slide: function (props) { return (
    React__default.createElement( Slide$1, {
      dynamicProps: props, buttonClass: 'btn-teal', title: 'Slide 3 has a custom button class', subtitle: '3 Seasons', description: lorem, img: '/images/16-9-A.png', mobileImg: '/images/16-9-A-mob.png', isWide: false, trailer: '123' })
  ); },
  id: 's3',
};

var Slide4 = {
  Slide: function (props) { return (
    React__default.createElement( Slide$1, {
      dynamicProps: props, title: 'Slide 4 has no trailer', subtitle: '3 Seasons', description: lorem, img: '/images/16-9-B.png', mobileImg: '/images/16-9-B-mob.png', isWide: false })
  ); },
  id: 's4',
};

var Slide5 = {
  Slide: function (props) { return (
    React__default.createElement( Slide$1, {
      dynamicProps: props, title: 'Slide 5 has no trailer and is 16:6 with a very long title containing many words. 100 characters long', subtitle: '3 Seasons', description: lorem, img: '/images/16-6-B.png', mobileImg: '/images/16-6-B-mob.png', isWide: true })
  ); },
  id: 's5',
};


var AllComponents = function () { return (
  React__default.createElement( 'div', null,
    React__default.createElement( Section, { title: 'Buttons' },
      React__default.createElement( Subtitle, null, "Colors" ),
      React__default.createElement( Block, { inline: true },
        React__default.createElement( Button$1, null, "default" ),
        React__default.createElement( Button$1, { color: 'gray' }, "gray"),
        React__default.createElement( Button$1, { color: 'teal' }, "teal"),
        React__default.createElement( Button$1, { color: 'white' }, "white"),
        React__default.createElement( Button$1, { color: 'red' }, "red"),
        React__default.createElement( Button$1, { color: 'purple' }, "purple"),
        React__default.createElement( Button$1, { color: 'green' }, "green"),
        React__default.createElement( Button$1, { color: 'slate' }, "slate"),
        React__default.createElement( Button$1, { color: 'black' }, "black"),
        React__default.createElement( Button$1, { color: 'yellow' }, "yellow")
      ),
      React__default.createElement( Block, { dark: true, inline: true },
        React__default.createElement( Button$1, { color: 'transparent' }, "transparent")
      ),
      React__default.createElement( Block, null,
        React__default.createElement( Button$1, { color: 'twitter' }, "twitter"),
        React__default.createElement( Button$1, { color: 'facebook' }, "facebook"),
        React__default.createElement( Button$1, { color: 'tumblr' }, "tumblr"),
        React__default.createElement( Button$1, { color: 'paypal' }, "paypal"),
        React__default.createElement( Button$1, { color: 'roku' }, "roku")
      ),
      React__default.createElement( Subtitle, null, "Processing State" ),
      React__default.createElement( Block, null,
        React__default.createElement( Button$1, { processing: true }, "processing"),
        React__default.createElement( Button$1, { color: 'teal', processing: true }, "processing"),
        React__default.createElement( Button$1, { color: 'white', processing: true }, "processing"),
        React__default.createElement( Button$1, { color: 'red', processing: true }, "processing")
      ),
      React__default.createElement( Subtitle, null, "Sizes" ),
      React__default.createElement( Block, null,
        React__default.createElement( Button$1, null, "default" ),
        React__default.createElement( Button$1, { size: 'small' }, "small"),
        React__default.createElement( Button$1, { size: 'medium' }, "medium"),
        React__default.createElement( Button$1, { size: 'large' }, "large"),
        React__default.createElement( Button$1, { size: 'half' }, "half"),
        React__default.createElement( Button$1, { size: 'fill' }, "fill")
      ),
      React__default.createElement( Subtitle, null, "Typefaces" ),
      React__default.createElement( Block, null,
        React__default.createElement( Button$1, null, "default" ),
        React__default.createElement( Button$1, { typeface: 'brandon' }, "brandon")
      ),
      React__default.createElement( Subtitle, null, "Icons" ),
      React__default.createElement( Block, null
         /* NOTE: icon--right can only be used if accompanying text is nested? */ ,
        React__default.createElement( Button$1, null, React__default.createElement( Icon$1, { name: 'product', left: true, button: true }), "Icon left" ),
        React__default.createElement( Button$1, null, React__default.createElement( Icon$1, { name: 'product', right: true, button: true }, "Icon right") ),
        React__default.createElement( Button$1, null, React__default.createElement( Icon$1, { name: 'product', left: true, button: true }), React__default.createElement( Icon$1, { name: 'product', right: true, button: true }, "Icon both") )
      )
    ),
    React__default.createElement( Section, { title: 'Carousel' },
      React__default.createElement( Subtitle, null, "Single slide" ),
      React__default.createElement( Carousel$1, { slides: [ Slide1 ] }),
      React__default.createElement( Subtitle, null, "Multiple slides" ),
      React__default.createElement( Carousel$1, { slides: [ Slide1, Slide2, Slide3, Slide4, Slide5 ] }),
      React__default.createElement( Subtitle, null, "Custom aspect ratio" ),
      React__default.createElement( Carousel$1, { slides: [ Slide1, Slide2, Slide3, Slide4, Slide5 ], aspectRatio: '16:9' })
    ),
    React__default.createElement( Section, { title: 'Checkboxes' },
      React__default.createElement( CheckboxDemo, { uniqueId: 'checkbox-demo1', size: 'small', label: 'Small' }),
      React__default.createElement( CheckboxDemo, { uniqueId: 'checkbox-demo2', size: 'medium', label: 'Medium' }),
      React__default.createElement( CheckboxDemo, { uniqueId: 'checkbox-demo3', size: 'large', label: 'Large' }),
      React__default.createElement( CheckboxDemo, { uniqueId: 'checkbox-demo4', size: 'small', type: 'toggle' }),
      React__default.createElement( CheckboxDemo, { uniqueId: 'checkbox-demo5', size: 'medium', type: 'toggle' }),
      React__default.createElement( CheckboxDemo, { uniqueId: 'checkbox-demo6', size: 'large', type: 'toggle' })
    ),
    React__default.createElement( Section, { title: 'Icons' },
      React__default.createElement( Subtitle, null, "Sizes" ),
      React__default.createElement( Icon$1, { name: 'product', size: 'xsmall' }),
      React__default.createElement( Icon$1, { name: 'product', size: 'small' }),
      React__default.createElement( Icon$1, { name: 'product', size: 'medium' }),
      React__default.createElement( Icon$1, { name: 'product', size: 'large' }),
      React__default.createElement( Icon$1, { name: 'product', size: 'xlarge' }),
      React__default.createElement( Icon$1, { name: 'product', size: 'xxlarge' }),
      React__default.createElement( Subtitle, null, "Circles" ),
      React__default.createElement( Icon$1, { circle: true, name: 'product', size: 'xsmall' }),
      React__default.createElement( Icon$1, { circle: true, name: 'product', size: 'small' }),
      React__default.createElement( Icon$1, { circle: true, name: 'product', size: 'medium' }),
      React__default.createElement( Icon$1, { circle: true, name: 'product', size: 'large' }),
      React__default.createElement( Icon$1, { circle: true, name: 'product', size: 'xlarge' }),
      React__default.createElement( Icon$1, { circle: true, name: 'product', size: 'xxlarge' }),
      React__default.createElement( Subtitle, null, "Colors" ),
      React__default.createElement( Icon$1, { name: 'product', size: 'medium' }),
      React__default.createElement( Icon$1, { name: 'product', size: 'medium', color: 'navy' }),
      React__default.createElement( Icon$1, { name: 'product', size: 'medium', color: 'teal' }),
      React__default.createElement( Icon$1, { name: 'product', size: 'medium', color: 'gray' }),
      React__default.createElement( Block, { inline: true, dark: true }, React__default.createElement( Icon$1, { name: 'product', size: 'medium', color: 'white' })),
      React__default.createElement( Subtitle, null, "All icons" ),
      React__default.createElement( 'ul', { className: 'small-block-grid-6 text-center' },
        iconList.map(function (icon) { return (
            React__default.createElement( 'li', { key: icon },
              React__default.createElement( Block, null, React__default.createElement( Text$1, { color: 'gray', className: 'padding-bottom-small' }, icon) ),
              React__default.createElement( Icon$1, { name: icon, size: 'small' })
            )
          ); })
      )
    ),
    React__default.createElement( Section, { title: 'Inputs' },
      React__default.createElement( Subtitle, null, "Default input" ),
      React__default.createElement( StatefulInput, null ),
      React__default.createElement( Subtitle, null, "disabled input" ),
      React__default.createElement( StatefulInput, { disabled: true }),
      React__default.createElement( Subtitle, null, "Error input" ),
      React__default.createElement( StatefulInput, { error: true }),
      React__default.createElement( Subtitle, null, "Input with placeholder" ),
      React__default.createElement( StatefulInput, { placeholder: 'With placeholder' }),
      React__default.createElement( Subtitle, null, "Error input with placeholder" ),
      React__default.createElement( StatefulInput, { error: true, placeholder: 'With placeholder' }),
      React__default.createElement( Subtitle, null, "Password input" ),
      React__default.createElement( StatefulInput, { type: 'password' }),
      React__default.createElement( Subtitle, null, "Password input with error" ),
      React__default.createElement( StatefulInput, { type: 'password', error: true }),
      React__default.createElement( Subtitle, null, "Search input" ),
      React__default.createElement( StatefulInput, { placeholder: 'Search', search: true }),
      React__default.createElement( Subtitle, null, "Labeled inputs" )
       /* by making <Input> a child of <label> we remove the need to create a unique ID */ ,
      React__default.createElement( 'label', null,
        React__default.createElement( 'p', null, "Username" ),
        React__default.createElement( StatefulInput, null )
      )
       /* the standard usage of <label> will still work if you do not mind making an ID: */ ,
      React__default.createElement( 'label', { htmlFor: 'password1' }, "Password"),
      React__default.createElement( StatefulInput, { type: 'password', id: 'password1' })
    ),
    React__default.createElement( Section, { title: 'Radios' },
      React__default.createElement( Subtitle, null, "Default" ),
      React__default.createElement( StatefulRadio, { items: [{ label: 'Option 1', uniqueId: 'opt1' }, { label: 'Option 2', uniqueId: 'opt2' }] }),
      React__default.createElement( Subtitle, null, "Default gray" ),
      React__default.createElement( StatefulRadio, { color: 'gray', items: [{ label: 'Option 1', uniqueId: 'opt1' }, { label: 'Option 2', uniqueId: 'opt2' }] }),
      React__default.createElement( Subtitle, null, "Stacked" ),
      React__default.createElement( StatefulRadio, { stacked: true, items: [{ label: 'Option 1', uniqueId: 'opt1' }, { label: 'Option 2', uniqueId: 'opt2' }] }),
      React__default.createElement( Subtitle, null, "Stacked gray" ),
      React__default.createElement( StatefulRadio, { stacked: true, color: 'gray', items: [{ label: 'Option 1', uniqueId: 'opt1' }, { label: 'Option 2', uniqueId: 'opt2' }] }),
      React__default.createElement( Subtitle, null, "Radio buttons" ),
      React__default.createElement( StatefulRadio, { buttons: true, items: [{ label: 'Option 1', uniqueId: 'opt1' }, { label: 'Option 2', uniqueId: 'opt2' }] }),
      React__default.createElement( Subtitle, null, "Radio buttons with descriptions" ),
      React__default.createElement( StatefulRadio, { buttons: true, items: [{ label: 'Option 1', description: 'Description 1 goes here', uniqueId: 'opt1' }, { label: 'Option 2', description: 'Description 2 goes here', uniqueId: 'opt2' }] })
    ),
    React__default.createElement( Section, { title: 'Tags' },
      React__default.createElement( Block, null, React__default.createElement( Tag$1, { label: 'Tag with hover state', onClick: function () { return alert('Success'); }, onRemove: function () { return alert('Removed'); } }) ),
      React__default.createElement( Block, null, React__default.createElement( Tag$1, { label: 'Truncated tag', maxLength: 12, onClick: function () { return alert('Success'); }, onRemove: function () { return alert('Removed'); } }) )
    ),
    React__default.createElement( Section, { title: 'Text' },
      React__default.createElement( Subtitle, null, "Headings" ),
      React__default.createElement( Block, null, React__default.createElement( Text$1, { h1: true }, "h1") ),
      React__default.createElement( Block, null, React__default.createElement( Text$1, { h2: true }, "h2") ),
      React__default.createElement( Block, null, React__default.createElement( Text$1, { h3: true }, "h3") ),
      React__default.createElement( Block, null, React__default.createElement( Text$1, { h4: true }, "h4") ),
      React__default.createElement( Block, null, React__default.createElement( Text$1, { h5: true }, "h5") ),
      React__default.createElement( Subtitle, null, "Colors" ),
      React__default.createElement( Block, null, React__default.createElement( Text$1, null, "Default" ) ),
      React__default.createElement( Block, null, React__default.createElement( Text$1, { color: 'navy' }, "navy") ),
      React__default.createElement( Block, null, React__default.createElement( Text$1, { color: 'teal' }, "teal") ),
      React__default.createElement( Block, null, React__default.createElement( Text$1, { color: 'gray' }, "gray") ),
      React__default.createElement( Block, { dark: true, inline: true }, React__default.createElement( Text$1, { color: 'white' }, "white"))
    )
  )
); };

var mountNode = document.getElementById('app');
ReactDOM.render(React__default.createElement( AllComponents, null ), mountNode);

}(React,ReactDOM));
