/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	let state = {
	    color : "red",
	    acc : 0,
	    alight : false,
	    light : {}
	};

	const get = __webpack_require__(1),
	      m   = __webpack_require__(53),

	    addLight = function() {
	        // first click
	        if(!state.light.count) {
	            state.light.count = 1;

	            return;
	        }

	        state.light.count++;
	    },

	    pulseLight = function() {
	        if(state.light.lit) {
	            return;
	        }

	        state.light.lit = {
	            idx : 0,
	            dur : 0
	        };
	    },

	    updateLight = function(delta) {
	        let dur = 300,
	            lit = 100,

	            idx;

	        if(!state.light.count || !state.light.lit) {
	            state.alight = false;

	            return;
	        }

	        // done light queue
	        if(state.light.lit.idx >= state.light.count) {
	            delete state.light.lit;
	            state.alight = false;

	            return;
	        }

	        state.light.lit.dur += delta;

	        // end of light, next
	        if(state.light.lit.dur > dur) {
	            state.alight = false;
	            state.light.lit.dur = 0;
	            state.light.lit.idx++;

	            return;
	        }

	        // check if light on or off, (waiting for next)
	        if(state.light.lit.dur < lit) {
	            state.alight = true;
	        } else {
	            state.alight = false;
	        }

	    },

	    comp = {
	        view : () => m("div", {
	            style : `background: ${state.alight ? state.color : ""}`,
	            onclick : () => {
	                addLight();
	                pulseLight();
	            }
	        }, state.content)
	    },

	    MainLoop = __webpack_require__(79),

	    update = function(delta) {
	        state.content = Math.floor(Date.now()/1000);

	        updateLight(delta);
	    },

	    draw = function() {
	        m.redraw();
	    };

	m.mount(document.body, comp);

	MainLoop.setUpdate(update).setDraw(draw).start();

	window.ML = MainLoop;
	window.state = state;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(2);

	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is returned in its place.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}

	module.exports = get;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(3),
	    isKey = __webpack_require__(51),
	    toKey = __webpack_require__(52);

	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = isKey(path, object) ? [path] : castPath(path);

	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }
	  return (index && index == length) ? object : undefined;
	}

	module.exports = baseGet;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(4),
	    stringToPath = __webpack_require__(5);

	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value) {
	  return isArray(value) ? value : stringToPath(value);
	}

	module.exports = castPath;


/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var memoizeCapped = __webpack_require__(6),
	    toString = __webpack_require__(46);

	/** Used to match property names within property paths. */
	var reLeadingDot = /^\./,
	    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoizeCapped(function(string) {
	  string = toString(string);

	  var result = [];
	  if (reLeadingDot.test(string)) {
	    result.push('');
	  }
	  string.replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});

	module.exports = stringToPath;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var memoize = __webpack_require__(7);

	/** Used as the maximum memoize cache size. */
	var MAX_MEMOIZE_SIZE = 500;

	/**
	 * A specialized version of `_.memoize` which clears the memoized function's
	 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
	 *
	 * @private
	 * @param {Function} func The function to have its output memoized.
	 * @returns {Function} Returns the new memoized function.
	 */
	function memoizeCapped(func) {
	  var result = memoize(func, function(key) {
	    if (cache.size === MAX_MEMOIZE_SIZE) {
	      cache.clear();
	    }
	    return key;
	  });

	  var cache = result.cache;
	  return result;
	}

	module.exports = memoizeCapped;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(8);

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;

	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result) || cache;
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache);
	  return memoized;
	}

	// Expose `MapCache`.
	memoize.Cache = MapCache;

	module.exports = memoize;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(9),
	    mapCacheDelete = __webpack_require__(40),
	    mapCacheGet = __webpack_require__(43),
	    mapCacheHas = __webpack_require__(44),
	    mapCacheSet = __webpack_require__(45);

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	module.exports = MapCache;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(10),
	    ListCache = __webpack_require__(31),
	    Map = __webpack_require__(39);

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}

	module.exports = mapCacheClear;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(11),
	    hashDelete = __webpack_require__(27),
	    hashGet = __webpack_require__(28),
	    hashHas = __webpack_require__(29),
	    hashSet = __webpack_require__(30);

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	module.exports = Hash;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(12);

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	  this.size = 0;
	}

	module.exports = hashClear;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(13);

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	module.exports = nativeCreate;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(14),
	    getValue = __webpack_require__(26);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(15),
	    isMasked = __webpack_require__(23),
	    isObject = __webpack_require__(22),
	    toSource = __webpack_require__(25);

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	module.exports = baseIsNative;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(16),
	    isObject = __webpack_require__(22);

	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	module.exports = isFunction;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(17),
	    getRawTag = __webpack_require__(20),
	    objectToString = __webpack_require__(21);

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  value = Object(value);
	  return (symToStringTag && symToStringTag in value)
	    ? getRawTag(value)
	    : objectToString(value);
	}

	module.exports = baseGetTag;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(18);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(19);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },
/* 19 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(17);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	module.exports = getRawTag;


/***/ },
/* 21 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	module.exports = objectToString;


/***/ },
/* 22 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(24);

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	module.exports = isMasked;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(18);

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	module.exports = coreJsData;


/***/ },
/* 25 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var funcProto = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to convert.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	module.exports = toSource;


/***/ },
/* 26 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	module.exports = getValue;


/***/ },
/* 27 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = hashDelete;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(12);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	module.exports = hashGet;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(12);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}

	module.exports = hashHas;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(12);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	module.exports = hashSet;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(32),
	    listCacheDelete = __webpack_require__(33),
	    listCacheGet = __webpack_require__(36),
	    listCacheHas = __webpack_require__(37),
	    listCacheSet = __webpack_require__(38);

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	module.exports = ListCache;


/***/ },
/* 32 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}

	module.exports = listCacheClear;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(34);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  --this.size;
	  return true;
	}

	module.exports = listCacheDelete;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(35);

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	module.exports = assocIndexOf;


/***/ },
/* 35 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(34);

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	module.exports = listCacheGet;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(34);

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	module.exports = listCacheHas;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(34);

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	module.exports = listCacheSet;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(13),
	    root = __webpack_require__(18);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.exports = Map;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(41);

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  var result = getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = mapCacheDelete;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(42);

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	module.exports = getMapData;


/***/ },
/* 42 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	module.exports = isKeyable;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(41);

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	module.exports = mapCacheGet;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(41);

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	module.exports = mapCacheHas;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(41);

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  var data = getMapData(this, key),
	      size = data.size;

	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}

	module.exports = mapCacheSet;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(47);

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}

	module.exports = toString;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(17),
	    arrayMap = __webpack_require__(48),
	    isArray = __webpack_require__(4),
	    isSymbol = __webpack_require__(49);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isArray(value)) {
	    // Recursively convert values (susceptible to call stack limits).
	    return arrayMap(value, baseToString) + '';
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = baseToString;


/***/ },
/* 48 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(16),
	    isObjectLike = __webpack_require__(50);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && baseGetTag(value) == symbolTag);
	}

	module.exports = isSymbol;


/***/ },
/* 50 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(4),
	    isSymbol = __webpack_require__(49);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (isArray(value)) {
	    return false;
	  }
	  var type = typeof value;
	  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
	      value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	    (object != null && value in Object(object));
	}

	module.exports = isKey;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(49);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */
	function toKey(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = toKey;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	var m = __webpack_require__(54)
	var requestService = __webpack_require__(59)
	var redrawService = __webpack_require__(64)

	requestService.setCompletionCallback(redrawService.publish)

	m.mount = __webpack_require__(66)
	m.route = __webpack_require__(72)
	m.withAttr = __webpack_require__(78)
	m.prop = __webpack_require__(60)
	m.render = __webpack_require__(67).render
	m.redraw = redrawService.publish
	m.request = requestService.request
	m.jsonp = requestService.jsonp
	m.parseQueryString = __webpack_require__(77)
	m.buildQueryString = __webpack_require__(63)
	m.version = "bleeding-edge"

	module.exports = m


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var hyperscript = __webpack_require__(55)

	hyperscript.trust = __webpack_require__(57)
	hyperscript.fragment = __webpack_require__(58)

	module.exports = hyperscript


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	var Vnode = __webpack_require__(56)

	var selectorParser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g
	var selectorCache = {}
	function hyperscript(selector) {
		if (selector == null || typeof selector !== "string" && selector.view == null) {
			throw Error("The selector must be either a string or a component.");
		}

		if (typeof selector === "string" && selectorCache[selector] === undefined) {
			var match, tag, classes = [], attributes = {}
			while (match = selectorParser.exec(selector)) {
				var type = match[1], value = match[2]
				if (type === "" && value !== "") tag = value
				else if (type === "#") attributes.id = value
				else if (type === ".") classes.push(value)
				else if (match[3][0] === "[") {
					var attrValue = match[6]
					if (attrValue) attrValue = attrValue.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\")
					attributes[match[4]] = attrValue || true
				}
			}
			if (classes.length > 0) attributes.className = classes.join(" ")
			selectorCache[selector] = function(attrs, children) {
				var hasAttrs = false, childList, text
				var className = attrs.className || attrs.class
				for (var key in attributes) attrs[key] = attributes[key]
				if (className !== undefined) {
					if (attrs.class !== undefined) {
						attrs.class = undefined
						attrs.className = className
					}
					if (attributes.className !== undefined) attrs.className = attributes.className + " " + className
				}
				for (var key in attrs) {
					if (key !== "key") {
						hasAttrs = true
						break
					}
				}
				if (children instanceof Array && children.length == 1 && children[0] != null && children[0].tag === "#") text = children[0].children
				else childList = children

				return Vnode(tag || "div", attrs.key, hasAttrs ? attrs : undefined, childList, text, undefined)
			}
		}
		var attrs, children, childrenIndex
		if (arguments[1] == null || typeof arguments[1] === "object" && arguments[1].tag === undefined && !(arguments[1] instanceof Array)) {
			attrs = arguments[1]
			childrenIndex = 2
		}
		else childrenIndex = 1
		if (arguments.length === childrenIndex + 1) {
			children = arguments[childrenIndex] instanceof Array ? arguments[childrenIndex] : [arguments[childrenIndex]]
		}
		else {
			children = []
			for (var i = childrenIndex; i < arguments.length; i++) children.push(arguments[i])
		}

		if (typeof selector === "string") return selectorCache[selector](attrs || {}, Vnode.normalizeChildren(children))

		return Vnode(selector, attrs && attrs.key, attrs || {}, Vnode.normalizeChildren(children), undefined, undefined)
	}

	module.exports = hyperscript


/***/ },
/* 56 */
/***/ function(module, exports) {

	function Vnode(tag, key, attrs, children, text, dom) {
		return {tag: tag, key: key, attrs: attrs, children: children, text: text, dom: dom, domSize: undefined, state: {}, events: undefined, instance: undefined, skip: false}
	}
	Vnode.normalize = function(node) {
		if (node instanceof Array) return Vnode("[", undefined, undefined, Vnode.normalizeChildren(node), undefined, undefined)
		if (node != null && typeof node !== "object") return Vnode("#", undefined, undefined, node, undefined, undefined)
		return node
	}
	Vnode.normalizeChildren = function normalizeChildren(children) {
		for (var i = 0; i < children.length; i++) {
			children[i] = Vnode.normalize(children[i])
		}
		return children
	}

	module.exports = Vnode


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	var Vnode = __webpack_require__(56)

	module.exports = function(html) {
		if (html == null) html = ""
		return Vnode("<", undefined, undefined, html, undefined, undefined)
	}


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	var Vnode = __webpack_require__(56)

	module.exports = function(attrs, children) {
		return Vnode("[", attrs.key, attrs, Vnode.normalizeChildren(children), undefined, undefined)
	}


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var Stream = __webpack_require__(60)
	module.exports = __webpack_require__(62)(window, Stream)


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(61)(console.log.bind(console))

/***/ },
/* 61 */
/***/ function(module, exports) {

	"use strict"

	module.exports = function(log) {
		var guid = 0, noop = function() {}, HALT = {}
		function createStream() {
			function stream() {
				if (arguments.length > 0 && arguments[0] !== HALT) updateStream(stream, arguments[0], undefined)
				return stream._state.value
			}
			initStream(stream)

			if (arguments.length > 0 && arguments[0] !== HALT) updateStream(stream, arguments[0], undefined)

			return stream
		}
		function initStream(stream) {
			stream.constructor = createStream
			stream._state = {id: guid++, value: undefined, error: undefined, state: 0, derive: undefined, recover: undefined, deps: {}, parents: [], errorStream: undefined, endStream: undefined}
			stream["fantasy-land/map"] = map, stream["fantasy-land/ap"] = ap, stream["fantasy-land/of"] = createStream
			stream.valueOf = valueOf, stream.toJSON = toJSON, stream.toString = valueOf
			stream.run = run, stream.catch = doCatch

			Object.defineProperties(stream, {
				error: {get: function() {
					if (!stream._state.errorStream) {
						var errorStream = function() {
							if (arguments.length > 0 && arguments[0] !== HALT) updateStream(stream, undefined, arguments[0])
							return stream._state.error
						}
						initStream(errorStream)
						initDependency(errorStream, [stream], noop, noop)
						stream._state.errorStream = errorStream
					}
					return stream._state.errorStream
				}},
				end: {get: function() {
					if (!stream._state.endStream) {
						var endStream = createStream()
						endStream["fantasy-land/map"](function(value) {
							if (value === true) unregisterStream(stream), unregisterStream(endStream)
							return value
						})
						stream._state.endStream = endStream
					}
					return stream._state.endStream
				}}
			})
		}
		function updateStream(stream, value, error) {
			updateState(stream, value, error)
			for (var id in stream._state.deps) updateDependency(stream._state.deps[id], false)
			finalize(stream)
		}
		function updateState(stream, value, error) {
			error = unwrapError(value, error)
			if (error !== undefined && typeof stream._state.recover === "function") {
				if (!resolve(stream, updateValues, true)) return
			}
			else updateValues(stream, value, error)
			stream._state.changed = true
			if (stream._state.state !== 2) stream._state.state = 1
		}
		function updateValues(stream, value, error) {
			stream._state.value = value
			stream._state.error = error
		}
		function updateDependency(stream, mustSync) {
			var state = stream._state, parents = state.parents
			if (parents.length > 0 && parents.filter(active).length === parents.length && (mustSync || parents.filter(changed).length > 0)) {
				var failed = parents.filter(errored)
				if (failed.length > 0) updateState(stream, undefined, failed[0]._state.error)
				else resolve(stream, updateState, false)
			}
		}
		function resolve(stream, update, shouldRecover) {
			try {
				var value = shouldRecover ? stream._state.recover() : stream._state.derive()
				if (value === HALT) return false
				update(stream, value, undefined)
			}
			catch (e) {
				update(stream, undefined, e.__error != null ? e.__error : e)
				if (e.__error == null) reportUncaughtError(stream, e)
			}
			return true
		}
		function unwrapError(value, error) {
			if (value != null && value.constructor === createStream) {
				if (value._state.error !== undefined) error = value._state.error
				else error = unwrapError(value._state.value, value._state.error)
			}
			return error
		}
		function finalize(stream) {
			stream._state.changed = false
			for (var id in stream._state.deps) stream._state.deps[id]._state.changed = false
		}
		function reportUncaughtError(stream, e) {
			if (Object.keys(stream._state.deps).length === 0) {
				setTimeout(function() {
					if (Object.keys(stream._state.deps).length === 0) log(e)
				}, 0)
			}
		}

		function run(fn) {
			var self = createStream(), stream = this
			return initDependency(self, [stream], function() {
				return absorb(self, fn(stream()))
			}, undefined)
		}
		function doCatch(fn) {
			var self = createStream(), stream = this
			var derive = function() {return stream._state.value}
			var recover = function() {return absorb(self, fn(stream._state.error))}
			return initDependency(self, [stream], derive, recover)
		}
		function combine(fn, streams) {
			if (streams.length > streams.filter(valid).length) throw new Error("Ensure that each item passed to m.prop.combine/m.prop.merge is a stream")
			return initDependency(createStream(), streams, function() {
				var failed = streams.filter(errored)
				if (failed.length > 0) throw {__error: failed[0]._state.error}
				return fn.apply(this, streams.concat([streams.filter(changed)]))
			}, undefined)
		}
		function absorb(stream, value) {
			if (value != null && value.constructor === createStream) {
				var absorbable = value
				var update = function() {
					updateState(stream, absorbable._state.value, absorbable._state.error)
					for (var id in stream._state.deps) updateDependency(stream._state.deps[id], false)
				}
				absorbable["fantasy-land/map"](update).catch(function(e) {
					update()
					throw {__error: e}
				})
				
				if (absorbable._state.state === 0) return HALT
				if (absorbable._state.error) throw {__error: absorbable._state.error}
				value = absorbable._state.value
			}
			return value
		}

		function initDependency(dep, streams, derive, recover) {
			var state = dep._state
			state.derive = derive
			state.recover = recover
			state.parents = streams.filter(notEnded)

			registerDependency(dep, state.parents)
			updateDependency(dep, true)

			return dep
		}
		function registerDependency(stream, parents) {
			for (var i = 0; i < parents.length; i++) {
				parents[i]._state.deps[stream._state.id] = stream
				registerDependency(stream, parents[i]._state.parents)
			}
		}
		function unregisterStream(stream) {
			for (var i = 0; i < stream._state.parents.length; i++) {
				var parent = stream._state.parents[i]
				delete parent._state.deps[stream._state.id]
			}
			for (var id in stream._state.deps) {
				var dependent = stream._state.deps[id]
				var index = dependent._state.parents.indexOf(stream)
				if (index > -1) dependent._state.parents.splice(index, 1)
			}
			stream._state.state = 2 //ended
			stream._state.deps = {}
		}

		function map(fn) {return combine(function(stream) {return fn(stream())}, [this])}
		function ap(stream) {return combine(function(s1, s2) {return s1()(s2())}, [stream, this])}
		function valueOf() {return this._state.value}
		function toJSON() {return this._state.value != null && typeof this._state.value.toJSON === "function" ? this._state.value.toJSON() : this._state.value}

		function valid(stream) {return stream._state }
		function active(stream) {return stream._state.state === 1}
		function changed(stream) {return stream._state.changed}
		function notEnded(stream) {return stream._state.state !== 2}
		function errored(stream) {return stream._state.error}

		function reject(e) {
			var stream = createStream()
			stream.error(e)
			return stream
		}

		function merge(streams) {
			return combine(function () {
				return streams.map(function(s) {return s()})
			}, streams)
		}
		createStream["fantasy-land/of"] = createStream
		createStream.merge = merge
		createStream.combine = combine
		createStream.reject = reject
		createStream.HALT = HALT

		return createStream
	}


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	var buildQueryString = __webpack_require__(63)

	module.exports = function($window, Stream) {
		var callbackCount = 0

		var oncompletion
		function setCompletionCallback(callback) {oncompletion = callback}

		function request(args, extra) {
			if(typeof args === "string"){
				var url = args

				if(typeof extra === "object")	args = extra
				else args = {}

				if(typeof args.url === "undefined") args.url = url
			}

			if(typeof args.method === "undefined") args.method = "GET"

			var stream = Stream()
			if (args.initialValue !== undefined) stream(args.initialValue)
			args.method = args.method.toUpperCase()

			var useBody = typeof args.useBody === "boolean" ? args.useBody : args.method !== "GET" && args.method !== "TRACE"

			if (typeof args.serialize !== "function") args.serialize = typeof FormData !== "undefined" && args.data instanceof FormData ? function(value) {return value} : JSON.stringify
			if (typeof args.deserialize !== "function") args.deserialize = deserialize
			if (typeof args.extract !== "function") args.extract = extract

			args.url = interpolate(args.url, args.data)
			if (useBody) args.data = args.serialize(args.data)
			else args.url = assemble(args.url, args.data)

			var xhr = new $window.XMLHttpRequest()
			xhr.open(args.method, args.url, typeof args.async === "boolean" ? args.async : true, typeof args.user === "string" ? args.user : undefined, typeof args.password === "string" ? args.password : undefined)

			if (args.serialize === JSON.stringify && useBody) {
				xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
			}
			if (args.deserialize === deserialize) {
				xhr.setRequestHeader("Accept", "application/json, text/*")
			}

			if (typeof args.config === "function") xhr = args.config(xhr, args) || xhr

			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4) {
					try {
						var response = (args.extract !== extract) ? args.extract(xhr, args) : args.deserialize(args.extract(xhr, args))
						if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
							stream(cast(args.type, response))
						}
						else {
							var error = new Error(xhr.responseText)
							for (var key in response) error[key] = response[key]
							stream.error(error)
						}
					}
					catch (e) {
						stream.error(e)
					}
					if (typeof oncompletion === "function") oncompletion()
				}
			}

			if (useBody && (args.data != null)) xhr.send(args.data)
			else xhr.send()

			return stream
		}

		function jsonp(args) {
			var stream = Stream()
			if (args.initialValue !== undefined) stream(args.initialValue)

			var callbackName = args.callbackName || "_mithril_" + Math.round(Math.random() * 1e16) + "_" + callbackCount++
			var script = $window.document.createElement("script")
			$window[callbackName] = function(data) {
				script.parentNode.removeChild(script)
				stream(cast(args.type, data))
				if (typeof oncompletion === "function") oncompletion()
				delete $window[callbackName]
			}
			script.onerror = function() {
				script.parentNode.removeChild(script)
				stream.error(new Error("JSONP request failed"))
				if (typeof oncompletion === "function") oncompletion()
				delete $window[callbackName]
			}
			if (args.data == null) args.data = {}
			args.url = interpolate(args.url, args.data)
			args.data[args.callbackKey || "callback"] = callbackName
			script.src = assemble(args.url, args.data)
			$window.document.documentElement.appendChild(script)
			return stream
		}

		function interpolate(url, data) {
			if (data == null) return url

			var tokens = url.match(/:[^\/]+/gi) || []
			for (var i = 0; i < tokens.length; i++) {
				var key = tokens[i].slice(1)
				if (data[key] != null) {
					url = url.replace(tokens[i], data[key])
					delete data[key]
				}
			}
			return url
		}

		function assemble(url, data) {
			var querystring = buildQueryString(data)
			if (querystring !== "") {
				var prefix = url.indexOf("?") < 0 ? "?" : "&"
				url += prefix + querystring
			}
			return url
		}

		function deserialize(data) {
			try {return data !== "" ? JSON.parse(data) : null}
			catch (e) {throw new Error(data)}
		}

		function extract(xhr) {return xhr.responseText}

		function cast(type, data) {
			if (typeof type === "function") {
				if (data instanceof Array) {
					for (var i = 0; i < data.length; i++) {
						data[i] = new type(data[i])
					}
				}
				else return new type(data)
			}
			return data
		}

		return {request: request, jsonp: jsonp, setCompletionCallback: setCompletionCallback}
	}


/***/ },
/* 63 */
/***/ function(module, exports) {

	"use strict"

	module.exports = function(object) {
		if (Object.prototype.toString.call(object) !== "[object Object]") return ""

		var args = []
		for (var key in object) {
			destructure(key, object[key])
		}
		return args.join("&")

		function destructure(key, value) {
			if (value instanceof Array) {
				for (var i = 0; i < value.length; i++) {
					destructure(key + "[" + i + "]", value[i])
				}
			}
			else if (Object.prototype.toString.call(value) === "[object Object]") {
				for (var i in value) {
					destructure(key + "[" + i + "]", value[i])
				}
			}
			else args.push(encodeURIComponent(key) + (value != null && value !== "" ? "=" + encodeURIComponent(value) : ""))
		}
	}


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(65)()

/***/ },
/* 65 */
/***/ function(module, exports) {

	"use strict"

	module.exports = function() {
		var callbacks = []
		function unsubscribe(callback) {
			var index = callbacks.indexOf(callback)
			if (index > -1) callbacks.splice(index, 1)
		}
	    function publish() {
	        for (var i = 0; i < callbacks.length; i++) {
	            callbacks[i].apply(this, arguments)
	        }
	    }
		return {subscribe: callbacks.push.bind(callbacks), unsubscribe: unsubscribe, publish: publish}
	}


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var renderService = __webpack_require__(67)
	var redrawService = __webpack_require__(64)

	module.exports = __webpack_require__(69)(renderService, redrawService)

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(68)(window)

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	var Vnode = __webpack_require__(56)

	module.exports = function($window) {
		var $doc = $window.document
		var $emptyFragment = $doc.createDocumentFragment()

		var onevent
		function setEventCallback(callback) {return onevent = callback}

		//create
		function createNodes(parent, vnodes, start, end, hooks, nextSibling, ns) {
			for (var i = start; i < end; i++) {
				var vnode = vnodes[i]
				if (vnode != null) {
					insertNode(parent, createNode(vnode, hooks, ns), nextSibling)
				}
			}
		}
		function createNode(vnode, hooks, ns) {
			var tag = vnode.tag
			if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks)
			if (typeof tag === "string") {
				switch (tag) {
					case "#": return createText(vnode)
					case "<": return createHTML(vnode)
					case "[": return createFragment(vnode, hooks, ns)
					default: return createElement(vnode, hooks, ns)
				}
			}
			else return createComponent(vnode, hooks, ns)
		}
		function createText(vnode) {
			return vnode.dom = $doc.createTextNode(vnode.children)
		}
		function createHTML(vnode) {
			var match = vnode.children.match(/^\s*?<(\w+)/im) || []
			var parent = {caption: "table", thead: "table", tbody: "table", tfoot: "table", tr: "tbody", th: "tr", td: "tr", colgroup: "table", col: "colgroup"}[match[1]] || "div"
			var temp = $doc.createElement(parent)

			temp.innerHTML = vnode.children
			vnode.dom = temp.firstChild
			vnode.domSize = temp.childNodes.length
			var fragment = $doc.createDocumentFragment()
			var child
			while (child = temp.firstChild) {
				fragment.appendChild(child)
			}
			return fragment
		}
		function createFragment(vnode, hooks, ns) {
			var fragment = $doc.createDocumentFragment()
			if (vnode.children != null) {
				var children = vnode.children
				createNodes(fragment, children, 0, children.length, hooks, null, ns)
			}
			vnode.dom = fragment.firstChild
			vnode.domSize = fragment.childNodes.length
			return fragment
		}
		function createElement(vnode, hooks, ns) {
			var tag = vnode.tag
			switch (vnode.tag) {
				case "svg": ns = "http://www.w3.org/2000/svg"; break
				case "math": ns = "http://www.w3.org/1998/Math/MathML"; break
			}

			var attrs = vnode.attrs
			var is = attrs && attrs.is

			var element = ns ?
				is ? $doc.createElementNS(ns, tag, {is: is}) : $doc.createElementNS(ns, tag) :
				is ? $doc.createElement(tag, {is: is}) : $doc.createElement(tag)
			vnode.dom = element

			if (attrs != null) {
				setAttrs(vnode, attrs, ns)
			}

			if (vnode.attrs != null && vnode.attrs.contenteditable != null) {
				setContentEditable(vnode)
			}
			else {
				if (vnode.text != null) {
					if (vnode.text !== "") element.textContent = vnode.text
					else vnode.children = [Vnode("#", undefined, undefined, vnode.text, undefined, undefined)]
				}
				if (vnode.children != null) {
					var children = vnode.children
					createNodes(element, children, 0, children.length, hooks, null, ns)
					setLateAttrs(vnode)
				}
			}
			return element
		}
		function createComponent(vnode, hooks, ns) {
			// For object literals since `Vnode()` always sets the `state` field.
			if (!vnode.state) vnode.state = {}
			assign(vnode.state, vnode.tag)

			var view = vnode.tag.view
			if (view.reentrantLock != null) return $emptyFragment
			view.reentrantLock = true
			initLifecycle(vnode.tag, vnode, hooks)
			vnode.instance = Vnode.normalize(view.call(vnode.state, vnode))
			view.reentrantLock = null
			if (vnode.instance != null) {
				if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as arguments")
				var element = createNode(vnode.instance, hooks, ns)
				vnode.dom = vnode.instance.dom
				vnode.domSize = vnode.dom != null ? vnode.instance.domSize : 0
				return element
			}
			else {
				vnode.domSize = 0
				return $emptyFragment
			}
		}

		//update
		function updateNodes(parent, old, vnodes, hooks, nextSibling, ns) {
			if (old === vnodes || old == null && vnodes == null) return
			else if (old == null) createNodes(parent, vnodes, 0, vnodes.length, hooks, nextSibling, undefined)
			else if (vnodes == null) removeNodes(old, 0, old.length, vnodes)
			else {
				var recycling = isRecyclable(old, vnodes)
				if (recycling) old = old.concat(old.pool)

				if (old.length === vnodes.length && vnodes[0] != null && vnodes[0].key == null) {
					for (var i = 0; i < old.length; i++) {
						if (old[i] === vnodes[i] || old[i] == null && vnodes[i] == null) continue
						else if (old[i] == null) insertNode(parent, createNode(vnodes[i], hooks, ns), getNextSibling(old, i + 1, nextSibling))
						else if (vnodes[i] == null) removeNodes(old, i, i + 1, vnodes)
						else updateNode(parent, old[i], vnodes[i], hooks, getNextSibling(old, i + 1, nextSibling), recycling, ns)
						if (recycling && old[i].tag === vnodes[i].tag) insertNode(parent, toFragment(old[i]), getNextSibling(old, i + 1, nextSibling))
					}
				}
				else {
					var oldStart = 0, start = 0, oldEnd = old.length - 1, end = vnodes.length - 1, map
					while (oldEnd >= oldStart && end >= start) {
						var o = old[oldStart], v = vnodes[start]
						if (o === v && !recycling) oldStart++, start++
						else if (o != null && v != null && o.key === v.key) {
							oldStart++, start++
							updateNode(parent, o, v, hooks, getNextSibling(old, oldStart, nextSibling), recycling, ns)
							if (recycling && o.tag === v.tag) insertNode(parent, toFragment(o), nextSibling)
						}
						else {
							var o = old[oldEnd]
							if (o === v && !recycling) oldEnd--, start++
							else if (o != null && v != null && o.key === v.key) {
								updateNode(parent, o, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), recycling, ns)
								if (recycling || start < end) insertNode(parent, toFragment(o), getNextSibling(old, oldStart, nextSibling))
								oldEnd--, start++
							}
							else break
						}
					}
					while (oldEnd >= oldStart && end >= start) {
						var o = old[oldEnd], v = vnodes[end]
						if (o === v && !recycling) oldEnd--, end--
						else if (o != null && v != null && o.key === v.key) {
							updateNode(parent, o, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), recycling, ns)
							if (recycling && o.tag === v.tag) insertNode(parent, toFragment(o), nextSibling)
							if (o.dom != null) nextSibling = o.dom
							oldEnd--, end--
						}
						else {
							if (!map) map = getKeyMap(old, oldEnd)
							if (v != null) {
								var oldIndex = map[v.key]
								if (oldIndex != null) {
									var movable = old[oldIndex]
									updateNode(parent, movable, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), recycling, ns)
									insertNode(parent, toFragment(movable), nextSibling)
									old[oldIndex].skip = true
									if (movable.dom != null) nextSibling = movable.dom
								}
								else {
									var dom = createNode(v, hooks, undefined)
									insertNode(parent, dom, nextSibling)
									nextSibling = dom
								}
							}
							end--
						}
						if (end < start) break
					}
					createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns)
					removeNodes(old, oldStart, oldEnd + 1, vnodes)
				}
			}
		}
		function updateNode(parent, old, vnode, hooks, nextSibling, recycling, ns) {
			var oldTag = old.tag, tag = vnode.tag
			if (oldTag === tag) {
				vnode.state = old.state
				vnode.events = old.events
				if (shouldUpdate(vnode, old)) return
				if (vnode.attrs != null) {
					updateLifecycle(vnode.attrs, vnode, hooks, recycling)
				}
				if (typeof oldTag === "string") {
					switch (oldTag) {
						case "#": updateText(old, vnode); break
						case "<": updateHTML(parent, old, vnode, nextSibling); break
						case "[": updateFragment(parent, old, vnode, hooks, nextSibling, ns); break
						default: updateElement(old, vnode, hooks, ns)
					}
				}
				else updateComponent(parent, old, vnode, hooks, nextSibling, recycling, ns)
			}
			else {
				removeNode(old, null)
				insertNode(parent, createNode(vnode, hooks, undefined), nextSibling)
			}
		}
		function updateText(old, vnode) {
			if (old.children.toString() !== vnode.children.toString()) {
				old.dom.nodeValue = vnode.children
			}
			vnode.dom = old.dom
		}
		function updateHTML(parent, old, vnode, nextSibling) {
			if (old.children !== vnode.children) {
				toFragment(old)
				insertNode(parent, createHTML(vnode), nextSibling)
			}
			else vnode.dom = old.dom, vnode.domSize = old.domSize
		}
		function updateFragment(parent, old, vnode, hooks, nextSibling, ns) {
			updateNodes(parent, old.children, vnode.children, hooks, nextSibling, ns)
			var domSize = 0, children = vnode.children
			vnode.dom = null
			if (children != null) {
				for (var i = 0; i < children.length; i++) {
					var child = children[i]
					if (child != null && child.dom != null) {
						if (vnode.dom == null) vnode.dom = child.dom
						domSize += child.domSize || 1
					}
				}
				if (domSize !== 1) vnode.domSize = domSize
			}
		}
		function updateElement(old, vnode, hooks, ns) {
			var element = vnode.dom = old.dom
			switch (vnode.tag) {
				case "svg": ns = "http://www.w3.org/2000/svg"; break
				case "math": ns = "http://www.w3.org/1998/Math/MathML"; break
			}
			if (vnode.tag === "textarea") {
				if (vnode.attrs == null) vnode.attrs = {}
				if (vnode.text != null) {
					vnode.attrs.value = vnode.text //FIXME handle multiple children
					vnode.text = undefined
				}
			}
			updateAttrs(vnode, old.attrs, vnode.attrs, ns)
			if (vnode.attrs != null && vnode.attrs.contenteditable != null) {
				setContentEditable(vnode)
			}
			else if (old.text != null && vnode.text != null && vnode.text !== "") {
				if (old.text.toString() !== vnode.text.toString()) old.dom.firstChild.nodeValue = vnode.text
			}
			else {
				if (old.text != null) old.children = [Vnode("#", undefined, undefined, old.text, undefined, old.dom.firstChild)]
				if (vnode.text != null) vnode.children = [Vnode("#", undefined, undefined, vnode.text, undefined, undefined)]
				updateNodes(element, old.children, vnode.children, hooks, null, ns)
			}
		}
		function updateComponent(parent, old, vnode, hooks, nextSibling, recycling, ns) {
			vnode.instance = Vnode.normalize(vnode.tag.view.call(vnode.state, vnode))
			updateLifecycle(vnode.tag, vnode, hooks, recycling)
			if (vnode.instance != null) {
				if (old.instance == null) insertNode(parent, createNode(vnode.instance, hooks, ns), nextSibling)
				else updateNode(parent, old.instance, vnode.instance, hooks, nextSibling, recycling, ns)
				vnode.dom = vnode.instance.dom
				vnode.domSize = vnode.instance.domSize
			}
			else if (old.instance != null) {
				removeNode(old.instance, null)
				vnode.dom = undefined
				vnode.domSize = 0
			}
			else {
				vnode.dom = old.dom
				vnode.domSize = old.domSize
			}
		}
		function isRecyclable(old, vnodes) {
			if (old.pool != null && Math.abs(old.pool.length - vnodes.length) <= Math.abs(old.length - vnodes.length)) {
				var oldChildrenLength = old[0] && old[0].children && old[0].children.length || 0
				var poolChildrenLength = old.pool[0] && old.pool[0].children && old.pool[0].children.length || 0
				var vnodesChildrenLength = vnodes[0] && vnodes[0].children && vnodes[0].children.length || 0
				if (Math.abs(poolChildrenLength - vnodesChildrenLength) <= Math.abs(oldChildrenLength - vnodesChildrenLength)) {
					return true
				}
			}
			return false
		}
		function getKeyMap(vnodes, end) {
			var map = {}, i = 0
			for (var i = 0; i < end; i++) {
				var vnode = vnodes[i]
				if (vnode != null) {
					var key = vnode.key
					if (key != null) map[key] = i
				}
			}
			return map
		}
		function toFragment(vnode) {
			var count = vnode.domSize
			if (count != null || vnode.dom == null) {
				var fragment = $doc.createDocumentFragment()
				if (count > 0) {
					var dom = vnode.dom
					while (--count) fragment.appendChild(dom.nextSibling)
					fragment.insertBefore(dom, fragment.firstChild)
				}
				return fragment
			}
			else return vnode.dom
		}
		function getNextSibling(vnodes, i, nextSibling) {
			for (; i < vnodes.length; i++) {
				if (vnodes[i] != null && vnodes[i].dom != null) return vnodes[i].dom
			}
			return nextSibling
		}

		function insertNode(parent, dom, nextSibling) {
			if (nextSibling && nextSibling.parentNode) parent.insertBefore(dom, nextSibling)
			else parent.appendChild(dom)
		}

		function setContentEditable(vnode) {
			var children = vnode.children
			if (children != null && children.length === 1 && children[0].tag === "<") {
				var content = children[0].children
				if (vnode.dom.innerHTML !== content) vnode.dom.innerHTML = content
			}
			else if (children != null || vnode.text != null) throw new Error("Child node of a contenteditable must be trusted")
		}

		//remove
		function removeNodes(vnodes, start, end, context) {
			for (var i = start; i < end; i++) {
				var vnode = vnodes[i]
				if (vnode != null) {
					if (vnode.skip) vnode.skip = false
					else removeNode(vnode, context)
				}
			}
		}
		function once(f) {
			var called = false
			return function() {
				if (!called) {
					called = true
					f()
				}
			}
		}
		function removeNode(vnode, context) {
			var expected = 1, called = 0
			if (vnode.attrs && vnode.attrs.onbeforeremove) {
				expected++
				vnode.attrs.onbeforeremove.call(vnode.state, vnode, once(continuation))
			}
			if (typeof vnode.tag !== "string" && vnode.tag.onbeforeremove) {
				expected++
				vnode.tag.onbeforeremove.call(vnode.state, vnode, once(continuation))
			}
			continuation()
			function continuation() {
				if (++called === expected) {
					onremove(vnode)
					if (vnode.dom) {
						var count = vnode.domSize || 1
						if (count > 1) {
							var dom = vnode.dom
							while (--count) {
								removeNodeFromDOM(dom.nextSibling)
							}
						}
						removeNodeFromDOM(vnode.dom)
						if (context != null && vnode.domSize == null && !hasIntegrationMethods(vnode.attrs) && typeof vnode.tag === "string") { //TODO test custom elements
							if (!context.pool) context.pool = [vnode]
							else context.pool.push(vnode)
						}
					}
				}
			}
		}
		function removeNodeFromDOM(node) {
			var parent = node.parentNode
			if (parent != null) parent.removeChild(node)
		}
		function onremove(vnode) {
			if (vnode.attrs && vnode.attrs.onremove) vnode.attrs.onremove.call(vnode.state, vnode)
			if (typeof vnode.tag !== "string" && vnode.tag.onremove) vnode.tag.onremove.call(vnode.state, vnode)
			if (vnode.instance != null) onremove(vnode.instance)
			else {
				var children = vnode.children
				if (children instanceof Array) {
					for (var i = 0; i < children.length; i++) {
						var child = children[i]
						if (child != null) onremove(child)
					}
				}
			}
		}

		//attrs
		function setAttrs(vnode, attrs, ns) {
			for (var key in attrs) {
				setAttr(vnode, key, null, attrs[key], ns)
			}
		}
		function setAttr(vnode, key, old, value, ns) {
			var element = vnode.dom
			if (key === "key" || (old === value && !isFormAttribute(vnode, key)) && typeof value !== "object" || typeof value === "undefined" || isLifecycleMethod(key)) return
			var nsLastIndex = key.indexOf(":")
			if (nsLastIndex > -1 && key.substr(0, nsLastIndex) === "xlink") {
				element.setAttributeNS("http://www.w3.org/1999/xlink", key.slice(nsLastIndex + 1), value)
			}
			else if (key[0] === "o" && key[1] === "n" && typeof value === "function") updateEvent(vnode, key, value)
			else if (key === "style") updateStyle(element, old, value)
			else if (key in element && !isAttribute(key) && ns === undefined) {
				//setting input[value] to same value by typing on focused element moves cursor to end in Chrome
				if (vnode.tag === "input" && key === "value" && vnode.dom.value === value && vnode.dom === $doc.activeElement) return
				element[key] = value
			}
			else {
				if (typeof value === "boolean") {
					if (value) element.setAttribute(key, "")
					else element.removeAttribute(key)
				}
				else element.setAttribute(key === "className" ? "class" : key, value)
			}
		}
		function setLateAttrs(vnode) {
			var attrs = vnode.attrs
			if (vnode.tag === "select" && attrs != null) {
				if ("value" in attrs) setAttr(vnode, "value", null, attrs.value, undefined)
				if ("selectedIndex" in attrs) setAttr(vnode, "selectedIndex", null, attrs.selectedIndex, undefined)
			}
		}
		function updateAttrs(vnode, old, attrs, ns) {
			if (attrs != null) {
				for (var key in attrs) {
					setAttr(vnode, key, old && old[key], attrs[key], ns)
				}
			}
			if (old != null) {
				for (var key in old) {
					if (attrs == null || !(key in attrs)) {
						if (key === "className") key = "class"
						if (key[0] === "o" && key[1] === "n" && !isLifecycleMethod(key)) updateEvent(vnode, key, undefined)
						else if (key !== "key") vnode.dom.removeAttribute(key)
					}
				}
			}
		}
		function isFormAttribute(vnode, attr) {
			return attr === "value" || attr === "checked" || attr === "selectedIndex" || attr === "selected" && vnode.dom === $doc.activeElement
		}
		function isLifecycleMethod(attr) {
			return attr === "oninit" || attr === "oncreate" || attr === "onupdate" || attr === "onremove" || attr === "onbeforeremove" || attr === "onbeforeupdate"
		}
		function isAttribute(attr) {
			return attr === "href" || attr === "list" || attr === "form" || attr === "width" || attr === "height"// || attr === "type"
		}
		function hasIntegrationMethods(source) {
			return source != null && (source.oncreate || source.onupdate || source.onbeforeremove || source.onremove)
		}

		//style
		function updateStyle(element, old, style) {
			if (old === style) element.style.cssText = "", old = null
			if (style == null) element.style.cssText = ""
			else if (typeof style === "string") element.style.cssText = style
			else {
				if (typeof old === "string") element.style.cssText = ""
				for (var key in style) {
					element.style[key] = style[key]
				}
				if (old != null && typeof old !== "string") {
					for (var key in old) {
						if (!(key in style)) element.style[key] = ""
					}
				}
			}
		}

		//event
		function updateEvent(vnode, key, value) {
			var element = vnode.dom
			var callback = function(e) {
				var result = value.call(element, e)
				if (typeof onevent === "function") onevent.call(element, e)
				return result
			}
			if (key in element) element[key] = typeof value === "function" ? callback : null
			else {
				var eventName = key.slice(2)
				if (vnode.events === undefined) vnode.events = {}
				if (vnode.events[key] != null) element.removeEventListener(eventName, vnode.events[key], false)
				if (typeof value === "function") {
					vnode.events[key] = callback
					element.addEventListener(eventName, vnode.events[key], false)
				}
			}
		}

		//lifecycle
		function initLifecycle(source, vnode, hooks) {
			if (typeof source.oninit === "function") source.oninit.call(vnode.state, vnode)
			if (typeof source.oncreate === "function") hooks.push(source.oncreate.bind(vnode.state, vnode))
		}
		function updateLifecycle(source, vnode, hooks, recycling) {
			if (recycling) initLifecycle(source, vnode, hooks)
			else if (typeof source.onupdate === "function") hooks.push(source.onupdate.bind(vnode.state, vnode))
		}
		function shouldUpdate(vnode, old) {
			var forceVnodeUpdate, forceComponentUpdate
			if (vnode.attrs != null && typeof vnode.attrs.onbeforeupdate === "function") forceVnodeUpdate = vnode.attrs.onbeforeupdate.call(vnode.state, vnode, old)
			if (typeof vnode.tag !== "string" && typeof vnode.tag.onbeforeupdate === "function") forceComponentUpdate = vnode.tag.onbeforeupdate.call(vnode.state, vnode, old)
			if (!(forceVnodeUpdate === undefined && forceComponentUpdate === undefined) && !forceVnodeUpdate && !forceComponentUpdate) {
				vnode.dom = old.dom
				vnode.domSize = old.domSize
				vnode.instance = old.instance
				return true
			}
			return false
		}

		function assign(target, source) {
			Object.keys(source).forEach(function(k){target[k] = source[k]})
		}

		function render(dom, vnodes) {
			if (!dom) throw new Error("Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.")
			var hooks = []
			var active = $doc.activeElement

			// First time rendering into a node clears it out
			if (dom.vnodes == null) dom.textContent = ""

			if (!(vnodes instanceof Array)) vnodes = [vnodes]
			updateNodes(dom, dom.vnodes, Vnode.normalizeChildren(vnodes), hooks, null, undefined)
			dom.vnodes = vnodes
			for (var i = 0; i < hooks.length; i++) hooks[i]()
			if ($doc.activeElement !== active) active.focus()
		}

		return {render: render, setEventCallback: setEventCallback}
	}


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	var Vnode = __webpack_require__(56)
	var autoredraw = __webpack_require__(70)

	module.exports = function(renderer, pubsub) {
		return function(root, component) {
			if (component === null) {
				renderer.render(root, [])
				pubsub.unsubscribe(root.redraw)
				delete root.redraw
				return
			}
			
			if (component.view == null) throw new Error("m.mount(element, component) expects a component, not a vnode")

			var run = autoredraw(root, renderer, pubsub, function() {
				renderer.render(root, Vnode(component, undefined, undefined, undefined, undefined, undefined))
			})

			run()
		}
	}


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	var throttle = __webpack_require__(71)

	module.exports = function(root, renderer, pubsub, callback) {
		var run = throttle(callback)
		if (renderer != null) {
			renderer.setEventCallback(function(e) {
				if (e.redraw !== false) pubsub.publish()
			})
		}

		if (pubsub != null) {
			if (root.redraw) pubsub.unsubscribe(root.redraw)
			pubsub.subscribe(run)
		}

		return root.redraw = run
	}


/***/ },
/* 71 */
/***/ function(module, exports) {

	"use strict"

	module.exports = function(callback) {
		//60fps translates to 16.6ms, round it down since setTimeout requires int
		var time = 16
		var last = 0, pending = null
		var timeout = typeof requestAnimationFrame === "function" ? requestAnimationFrame : setTimeout
		return function(synchronous) {
			var now = Date.now()
			if (synchronous === true || last === 0 || now - last >= time) {
				last = now
				callback()
			}
			else if (pending === null) {
				pending = timeout(function() {
					pending = null
					callback()
					last = Date.now()
				}, time - (now - last))
			}
		}
	}


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var mount = __webpack_require__(66)

	module.exports = __webpack_require__(73)(window, mount)

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	var Vnode = __webpack_require__(56)
	var coreRouter = __webpack_require__(74)

	module.exports = function($window, mount) {
		var router = coreRouter($window)
		var currentResolve, currentComponent, currentRender, currentArgs, currentPath

		var RouteComponent = {view: function() {
			return [currentRender(Vnode(currentComponent, null, currentArgs, undefined, undefined, undefined))]
		}}
		function defaultRender(vnode) {
			return vnode
		}
		var route = function(root, defaultRoute, routes) {
			currentComponent = "div"
			currentRender = defaultRender
			currentArgs = null

			mount(root, RouteComponent)

			router.defineRoutes(routes, function(payload, args, path) {
				var isResolver = typeof payload.view !== "function"
				var render = defaultRender

				var resolve = currentResolve = function (component) {
					if (resolve !== currentResolve) return
					currentResolve = null

					currentComponent = component != null ? component : isResolver ? "div" : payload
					currentRender = render
					currentArgs = args
					currentPath = path

					root.redraw(true)
				}
				var onmatch = function() {
					resolve()
				}
				if (isResolver) {
					if (typeof payload.render === "function") render = payload.render.bind(payload)
					if (typeof payload.onmatch === "function") onmatch = payload.onmatch
				}
			
				onmatch.call(payload, resolve, args, path)
			}, function() {
				router.setPath(defaultRoute, null, {replace: true})
			})
		}
		route.link = router.link
		route.prefix = router.setPrefix
		route.set = router.setPath
		route.get = function() {return currentPath}

		return route
	}


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate) {"use strict"

	var buildQueryString = __webpack_require__(63)
	var parseQueryString = __webpack_require__(77)

	module.exports = function($window) {
		var supportsPushState = typeof $window.history.pushState === "function"
		var callAsync = typeof setImmediate === "function" ? setImmediate : setTimeout

		var prefix = "#!"
		function setPrefix(value) {prefix = value}

		function normalize(fragment) {
			var data = $window.location[fragment].replace(/(?:%[a-f89][a-f0-9])+/gim, decodeURIComponent)
			if (fragment === "pathname" && data[0] !== "/") data = "/" + data
			return data
		}

		var asyncId
		function debounceAsync(f) {
			return function() {
				if (asyncId != null) return
				asyncId = callAsync(function() {
					asyncId = null
					f()
				})

			}
		}

		function parsePath(path, queryData, hashData) {
			var queryIndex = path.indexOf("?")
			var hashIndex = path.indexOf("#")
			var pathEnd = queryIndex > -1 ? queryIndex : hashIndex > -1 ? hashIndex : path.length
			if (queryIndex > -1) {
				var queryEnd = hashIndex > -1 ? hashIndex : path.length
				var queryParams = parseQueryString(path.slice(queryIndex + 1, queryEnd))
				for (var key in queryParams) queryData[key] = queryParams[key]
			}
			if (hashIndex > -1) {
				var hashParams = parseQueryString(path.slice(hashIndex + 1))
				for (var key in hashParams) hashData[key] = hashParams[key]
			}
			return path.slice(0, pathEnd)
		}

		function getPath() {
			var type = prefix.charAt(0)
			switch (type) {
				case "#": return normalize("hash").slice(prefix.length)
				case "?": return normalize("search").slice(prefix.length) + normalize("hash")
				default: return normalize("pathname").slice(prefix.length) + normalize("search") + normalize("hash")
			}
		}

		function setPath(path, data, options) {
			var queryData = {}, hashData = {}
			path = parsePath(path, queryData, hashData)
			if (data != null) {
				for (var key in data) queryData[key] = data[key]
				path = path.replace(/:([^\/]+)/g, function(match, token) {
					delete queryData[token]
					return data[token]
				})
			}

			var query = buildQueryString(queryData)
			if (query) path += "?" + query

			var hash = buildQueryString(hashData)
			if (hash) path += "#" + hash

			if (supportsPushState) {
				if (options && options.replace) $window.history.replaceState(null, null, prefix + path)
				else $window.history.pushState(null, null, prefix + path)
				$window.onpopstate()
			}
			else $window.location.href = prefix + path
		}

		function defineRoutes(routes, resolve, reject) {
			if (supportsPushState) $window.onpopstate = debounceAsync(resolveRoute)
			else if (prefix.charAt(0) === "#") $window.onhashchange = resolveRoute
			resolveRoute()
			
			function resolveRoute() {
				var path = getPath()
				var params = {}
				var pathname = parsePath(path, params, params)
				
				for (var route in routes) {
					var matcher = new RegExp("^" + route.replace(/:[^\/]+?\.{3}/g, "(.*?)").replace(/:[^\/]+/g, "([^\\/]+)") + "\/?$")

					if (matcher.test(pathname)) {
						pathname.replace(matcher, function() {
							var keys = route.match(/:[^\/]+/g) || []
							var values = [].slice.call(arguments, 1, -2)
							for (var i = 0; i < keys.length; i++) {
								params[keys[i].replace(/:|\./g, "")] = decodeURIComponent(values[i])
							}
							resolve(routes[route], params, path, route)
						})
						return
					}
				}

				reject(path, params)
			}
			return resolveRoute
		}

		function link(vnode) {
			vnode.dom.setAttribute("href", prefix + vnode.attrs.href)
			vnode.dom.onclick = function(e) {
				if (e.ctrlKey || e.metaKey || e.shiftKey || e.which === 2) return
				e.preventDefault()
				e.redraw = false
				var href = this.getAttribute("href")
				if (href.indexOf(prefix) === 0) href = href.slice(prefix.length)
				setPath(href, undefined, undefined)
			}
		}

		return {setPrefix: setPrefix, getPath: getPath, setPath: setPath, defineRoutes: defineRoutes, link: link}
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(75).setImmediate))

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(76).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(75).setImmediate, __webpack_require__(75).clearImmediate))

/***/ },
/* 76 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 77 */
/***/ function(module, exports) {

	"use strict"

	module.exports = function(string) {
		if (string === "" || string == null) return {}
		if (string.charAt(0) === "?") string = string.slice(1)

		var entries = string.split("&"), data = {}, counters = {}
		for (var i = 0; i < entries.length; i++) {
			var entry = entries[i].split("=")
			var key = decodeURIComponent(entry[0])
			var value = entry.length === 2 ? decodeURIComponent(entry[1]) : ""

			if (value === "true") value = true
			else if (value === "false") value = false

			var levels = key.split(/\]\[?|\[/)
			var cursor = data
			if (key.indexOf("[") > -1) levels.pop()
			for (var j = 0; j < levels.length; j++) {
				var level = levels[j], nextLevel = levels[j + 1]
				var isNumber = nextLevel == "" || !isNaN(parseInt(nextLevel, 10))
				var isValue = j === levels.length - 1
				if (level === "") {
					var key = levels.slice(0, j).join()
					if (counters[key] == null) counters[key] = 0
					level = counters[key]++
				}
				if (cursor[level] == null) {
					cursor[level] = isValue ? value : isNumber ? [] : {}
				}
				cursor = cursor[level]
			}
		}
		return data
	}


/***/ },
/* 78 */
/***/ function(module, exports) {

	"use strict"

	module.exports = function(attrName, callback, context) {
		return function(e) {
			return callback.call(context || this, attrName in e.currentTarget ? e.currentTarget[attrName] : e.currentTarget.getAttribute(attrName))
		}
	}


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * mainloop.js 1.0.3-20160320
	 *
	 * @author Isaac Sukin (http://www.isaacsukin.com/)
	 * @license MIT
	 */

	!function(a){function b(a){if(v=o(b),!(e+j>a)){for(d+=a-e,e=a,r(a,d),a>g+1e3&&(f=.25*h+.75*f,g=a,h=0),h++,i=0;d>=c;)if(s(c),d-=c,++i>=240){m=!0;break}t(d/c),u(f,m),m=!1}}var c=1e3/60,d=0,e=0,f=60,g=0,h=0,i=0,j=0,k=!1,l=!1,m=!1,n="object"==typeof window?window:a,o=n.requestAnimationFrame||function(){var a=Date.now(),b,d;return function(e){return b=Date.now(),d=Math.max(0,c-(b-a)),a=b+d,setTimeout(function(){e(b+d)},d)}}(),p=n.cancelAnimationFrame||clearTimeout,q=function(){},r=q,s=q,t=q,u=q,v;a.MainLoop={getSimulationTimestep:function(){return c},setSimulationTimestep:function(a){return c=a,this},getFPS:function(){return f},getMaxAllowedFPS:function(){return 1e3/j},setMaxAllowedFPS:function(a){return"undefined"==typeof a&&(a=1/0),0===a?this.stop():j=1e3/a,this},resetFrameDelta:function(){var a=d;return d=0,a},setBegin:function(a){return r=a||r,this},setUpdate:function(a){return s=a||s,this},setDraw:function(a){return t=a||t,this},setEnd:function(a){return u=a||u,this},start:function(){return l||(l=!0,v=o(function(a){t(1),k=!0,e=a,g=a,h=0,v=o(b)})),this},stop:function(){return k=!1,l=!1,p(v),this},isRunning:function(){return k}}, true?!(__WEBPACK_AMD_DEFINE_FACTORY__ = (a.MainLoop), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"==typeof module&&null!==module&&"object"==typeof module.exports&&(module.exports=a.MainLoop)}(this);
	//# sourceMappingURL=mainloop.min.js.map

/***/ }
/******/ ]);