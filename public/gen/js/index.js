'use strict';

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
var isArray$1 = Array.isArray;

var isArray_1 = isArray$1;

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/** Detect free variable `global` from Node.js. */
var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal$1;

var freeGlobal = _freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$1 = freeGlobal || freeSelf || Function('return this')();

var _root = root$1;

var root = _root;

/** Built-in value references. */
var Symbol$1 = root.Symbol;

var _Symbol = Symbol$1;

var Symbol$2 = _Symbol;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$1.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag$1(value) {
  var isOwn = hasOwnProperty$1.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

var _getRawTag = getRawTag$1;

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$2.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString$1(value) {
  return nativeObjectToString$1.call(value);
}

var _objectToString = objectToString$1;

var Symbol = _Symbol;
var getRawTag = _getRawTag;
var objectToString = _objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]';
var undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag$1(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  value = Object(value);
  return (symToStringTag && symToStringTag in value)
    ? getRawTag(value)
    : objectToString(value);
}

var _baseGetTag = baseGetTag$1;

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
function isObject$2(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject$2;

var baseGetTag = _baseGetTag;
var isObject$1 = isObject_1;

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]';
var funcTag = '[object Function]';
var genTag = '[object GeneratorFunction]';
var proxyTag = '[object Proxy]';

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
function isFunction$1(value) {
  if (!isObject$1(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

var isFunction_1 = isFunction$1;

var root$2 = _root;

/** Used to detect overreaching core-js shims. */
var coreJsData$1 = root$2['__core-js_shared__'];

var _coreJsData = coreJsData$1;

var coreJsData = _coreJsData;

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
function isMasked$1(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

var _isMasked = isMasked$1;

/** Used for built-in method references. */
var funcProto$1 = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource$1(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

var _toSource = toSource$1;

var isFunction = isFunction_1;
var isMasked = _isMasked;
var isObject = isObject_1;
var toSource = _toSource;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype;
var objectProto = Object.prototype;

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
function baseIsNative$1(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

var _baseIsNative = baseIsNative$1;

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue$1(object, key) {
  return object == null ? undefined : object[key];
}

var _getValue = getValue$1;

var baseIsNative = _baseIsNative;
var getValue = _getValue;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative$1(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

var _getNative = getNative$1;

var getNative = _getNative;

/* Built-in method references that are verified to be native. */
var nativeCreate$1 = getNative(Object, 'create');

var _nativeCreate = nativeCreate$1;

var nativeCreate = _nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear$1() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

var _hashClear = hashClear$1;

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
function hashDelete$1(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

var _hashDelete = hashDelete$1;

var nativeCreate$2 = _nativeCreate;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet$1(key) {
  var data = this.__data__;
  if (nativeCreate$2) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet$1;

var nativeCreate$3 = _nativeCreate;

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas$1(key) {
  var data = this.__data__;
  return nativeCreate$3 ? data[key] !== undefined : hasOwnProperty$3.call(data, key);
}

var _hashHas = hashHas$1;

var nativeCreate$4 = _nativeCreate;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

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
function hashSet$1(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate$4 && value === undefined) ? HASH_UNDEFINED$1 : value;
  return this;
}

var _hashSet = hashSet$1;

var hashClear = _hashClear;
var hashDelete = _hashDelete;
var hashGet = _hashGet;
var hashHas = _hashHas;
var hashSet = _hashSet;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash$1(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash$1.prototype.clear = hashClear;
Hash$1.prototype['delete'] = hashDelete;
Hash$1.prototype.get = hashGet;
Hash$1.prototype.has = hashHas;
Hash$1.prototype.set = hashSet;

var _Hash = Hash$1;

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear$1() {
  this.__data__ = [];
  this.size = 0;
}

var _listCacheClear = listCacheClear$1;

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
function eq$1(value, other) {
  return value === other || (value !== value && other !== other);
}

var eq_1 = eq$1;

var eq = eq_1;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf$1(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

var _assocIndexOf = assocIndexOf$1;

var assocIndexOf = _assocIndexOf;

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
function listCacheDelete$1(key) {
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

var _listCacheDelete = listCacheDelete$1;

var assocIndexOf$2 = _assocIndexOf;

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet$1(key) {
  var data = this.__data__,
      index = assocIndexOf$2(data, key);

  return index < 0 ? undefined : data[index][1];
}

var _listCacheGet = listCacheGet$1;

var assocIndexOf$3 = _assocIndexOf;

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas$1(key) {
  return assocIndexOf$3(this.__data__, key) > -1;
}

var _listCacheHas = listCacheHas$1;

var assocIndexOf$4 = _assocIndexOf;

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
function listCacheSet$1(key, value) {
  var data = this.__data__,
      index = assocIndexOf$4(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

var _listCacheSet = listCacheSet$1;

var listCacheClear = _listCacheClear;
var listCacheDelete = _listCacheDelete;
var listCacheGet = _listCacheGet;
var listCacheHas = _listCacheHas;
var listCacheSet = _listCacheSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache$1(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache$1.prototype.clear = listCacheClear;
ListCache$1.prototype['delete'] = listCacheDelete;
ListCache$1.prototype.get = listCacheGet;
ListCache$1.prototype.has = listCacheHas;
ListCache$1.prototype.set = listCacheSet;

var _ListCache = ListCache$1;

var getNative$2 = _getNative;
var root$3 = _root;

/* Built-in method references that are verified to be native. */
var Map$1 = getNative$2(root$3, 'Map');

var _Map = Map$1;

var Hash = _Hash;
var ListCache = _ListCache;
var Map = _Map;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear$1() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

var _mapCacheClear = mapCacheClear$1;

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable$1(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

var _isKeyable = isKeyable$1;

var isKeyable = _isKeyable;

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData$1(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

var _getMapData = getMapData$1;

var getMapData = _getMapData;

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete$1(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

var _mapCacheDelete = mapCacheDelete$1;

var getMapData$2 = _getMapData;

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet$1(key) {
  return getMapData$2(this, key).get(key);
}

var _mapCacheGet = mapCacheGet$1;

var getMapData$3 = _getMapData;

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas$1(key) {
  return getMapData$3(this, key).has(key);
}

var _mapCacheHas = mapCacheHas$1;

var getMapData$4 = _getMapData;

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
function mapCacheSet$1(key, value) {
  var data = getMapData$4(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

var _mapCacheSet = mapCacheSet$1;

var mapCacheClear = _mapCacheClear;
var mapCacheDelete = _mapCacheDelete;
var mapCacheGet = _mapCacheGet;
var mapCacheHas = _mapCacheHas;
var mapCacheSet = _mapCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache$1(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache$1.prototype.clear = mapCacheClear;
MapCache$1.prototype['delete'] = mapCacheDelete;
MapCache$1.prototype.get = mapCacheGet;
MapCache$1.prototype.has = mapCacheHas;
MapCache$1.prototype.set = mapCacheSet;

var _MapCache = MapCache$1;

var MapCache = _MapCache;

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
function memoize$1(func, resolver) {
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
  memoized.cache = new (memoize$1.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize$1.Cache = MapCache;

var memoize_1 = memoize$1;

var memoize = memoize_1;

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
function memoizeCapped$1(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

var _memoizeCapped = memoizeCapped$1;

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap$1(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

var _arrayMap = arrayMap$1;

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
function isObjectLike$1(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike$1;

var baseGetTag$2 = _baseGetTag;
var isObjectLike = isObjectLike_1;

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
function isSymbol$1(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag$2(value) == symbolTag);
}

var isSymbol_1 = isSymbol$1;

var Symbol$3 = _Symbol;
var arrayMap = _arrayMap;
var isArray$2 = isArray_1;
var isSymbol = isSymbol_1;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol$3 ? Symbol$3.prototype : undefined;
var symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString$1(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray$2(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString$1) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

var _baseToString = baseToString$1;

var baseToString = _baseToString;

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
function toString$1(value) {
  return value == null ? '' : baseToString(value);
}

var toString_1 = toString$1;

var memoizeCapped = _memoizeCapped;
var toString = toString_1;

/** Used to match property names within property paths. */
var reLeadingDot = /^\./;
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath$1 = memoizeCapped(function(string) {
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

var _stringToPath = stringToPath$1;

var isArray = isArray_1;
var stringToPath = _stringToPath;

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath$1(value) {
  return isArray(value) ? value : stringToPath(value);
}

var _castPath = castPath$1;

var isArray$3 = isArray_1;
var isSymbol$2 = isSymbol_1;

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey$1(value, object) {
  if (isArray$3(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol$2(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

var _isKey = isKey$1;

var isSymbol$3 = isSymbol_1;

/** Used as references for various `Number` constants. */
var INFINITY$1 = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey$1(value) {
  if (typeof value == 'string' || isSymbol$3(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
}

var _toKey = toKey$1;

var castPath = _castPath;
var isKey = _isKey;
var toKey = _toKey;

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet$1(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

var _baseGet = baseGet$1;

var baseGet = _baseGet;

function Vnode$1(tag, key, attrs, children, text, dom) {
	return {tag: tag, key: key, attrs: attrs, children: children, text: text, dom: dom, domSize: undefined, state: {}, events: undefined, instance: undefined, skip: false}
}
Vnode$1.normalize = function(node) {
	if (node instanceof Array) return Vnode$1("[", undefined, undefined, Vnode$1.normalizeChildren(node), undefined, undefined)
	if (node != null && typeof node !== "object") return Vnode$1("#", undefined, undefined, node, undefined, undefined)
	return node
};
Vnode$1.normalizeChildren = function normalizeChildren(children) {
	for (var i = 0; i < children.length; i++) {
		children[i] = Vnode$1.normalize(children[i]);
	}
	return children
};

var vnode = Vnode$1;

var Vnode = vnode;

var selectorParser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g;
var selectorCache = {};
function hyperscript$1(selector) {
	if (selector == null || typeof selector !== "string" && selector.view == null) {
		throw Error("The selector must be either a string or a component.");
	}

	if (typeof selector === "string" && selectorCache[selector] === undefined) {
		var match, tag, classes = [], attributes = {};
		while (match = selectorParser.exec(selector)) {
			var type = match[1], value = match[2];
			if (type === "" && value !== "") tag = value;
			else if (type === "#") attributes.id = value;
			else if (type === ".") classes.push(value);
			else if (match[3][0] === "[") {
				var attrValue = match[6];
				if (attrValue) attrValue = attrValue.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\");
				attributes[match[4]] = attrValue || true;
			}
		}
		if (classes.length > 0) attributes.className = classes.join(" ");
		selectorCache[selector] = function(attrs, children) {
			var hasAttrs = false, childList, text;
			var className = attrs.className || attrs.class;
			for (var key in attributes) attrs[key] = attributes[key];
			if (className !== undefined) {
				if (attrs.class !== undefined) {
					attrs.class = undefined;
					attrs.className = className;
				}
				if (attributes.className !== undefined) attrs.className = attributes.className + " " + className;
			}
			for (var key in attrs) {
				if (key !== "key") {
					hasAttrs = true;
					break
				}
			}
			if (children instanceof Array && children.length == 1 && children[0] != null && children[0].tag === "#") text = children[0].children;
			else childList = children;

			return Vnode(tag || "div", attrs.key, hasAttrs ? attrs : undefined, childList, text, undefined)
		};
	}
	var attrs, children, childrenIndex;
	if (arguments[1] == null || typeof arguments[1] === "object" && arguments[1].tag === undefined && !(arguments[1] instanceof Array)) {
		attrs = arguments[1];
		childrenIndex = 2;
	}
	else childrenIndex = 1;
	if (arguments.length === childrenIndex + 1) {
		children = arguments[childrenIndex] instanceof Array ? arguments[childrenIndex] : [arguments[childrenIndex]];
	}
	else {
		children = [];
		for (var i = childrenIndex; i < arguments.length; i++) children.push(arguments[i]);
	}

	if (typeof selector === "string") return selectorCache[selector](attrs || {}, Vnode.normalizeChildren(children))

	return Vnode(selector, attrs && attrs.key, attrs || {}, Vnode.normalizeChildren(children), undefined, undefined)
}

var hyperscript_1$2 = hyperscript$1;

var Vnode$2 = vnode;

var trust = function(html) {
	if (html == null) html = "";
	return Vnode$2("<", undefined, undefined, html, undefined, undefined)
};

var Vnode$3 = vnode;

var fragment = function(attrs, children) {
	return Vnode$3("[", attrs.key, attrs, Vnode$3.normalizeChildren(children), undefined, undefined)
};

var hyperscript = hyperscript_1$2;

hyperscript.trust = trust;
hyperscript.fragment = fragment;

var hyperscript_1 = hyperscript;

var stream$2 = function(log) {
	var guid = 0, noop = function() {}, HALT = {};
	function createStream() {
		function stream() {
			if (arguments.length > 0 && arguments[0] !== HALT) updateStream(stream, arguments[0], undefined);
			return stream._state.value
		}
		initStream(stream);

		if (arguments.length > 0 && arguments[0] !== HALT) updateStream(stream, arguments[0], undefined);

		return stream
	}
	function initStream(stream) {
		stream.constructor = createStream;
		stream._state = {id: guid++, value: undefined, error: undefined, state: 0, derive: undefined, recover: undefined, deps: {}, parents: [], errorStream: undefined, endStream: undefined};
		stream["fantasy-land/map"] = map, stream["fantasy-land/ap"] = ap, stream["fantasy-land/of"] = createStream;
		stream.valueOf = valueOf, stream.toJSON = toJSON, stream.toString = valueOf;
		stream.run = run, stream.catch = doCatch;

		Object.defineProperties(stream, {
			error: {get: function() {
				if (!stream._state.errorStream) {
					var errorStream = function() {
						if (arguments.length > 0 && arguments[0] !== HALT) updateStream(stream, undefined, arguments[0]);
						return stream._state.error
					};
					initStream(errorStream);
					initDependency(errorStream, [stream], noop, noop);
					stream._state.errorStream = errorStream;
				}
				return stream._state.errorStream
			}},
			end: {get: function() {
				if (!stream._state.endStream) {
					var endStream = createStream();
					endStream["fantasy-land/map"](function(value) {
						if (value === true) unregisterStream(stream), unregisterStream(endStream);
						return value
					});
					stream._state.endStream = endStream;
				}
				return stream._state.endStream
			}}
		});
	}
	function updateStream(stream, value, error) {
		updateState(stream, value, error);
		for (var id in stream._state.deps) updateDependency(stream._state.deps[id], false);
		finalize(stream);
	}
	function updateState(stream, value, error) {
		error = unwrapError(value, error);
		if (error !== undefined && typeof stream._state.recover === "function") {
			if (!resolve(stream, updateValues, true)) return
		}
		else updateValues(stream, value, error);
		stream._state.changed = true;
		if (stream._state.state !== 2) stream._state.state = 1;
	}
	function updateValues(stream, value, error) {
		stream._state.value = value;
		stream._state.error = error;
	}
	function updateDependency(stream, mustSync) {
		var state = stream._state, parents = state.parents;
		if (parents.length > 0 && parents.filter(active).length === parents.length && (mustSync || parents.filter(changed).length > 0)) {
			var failed = parents.filter(errored);
			if (failed.length > 0) updateState(stream, undefined, failed[0]._state.error);
			else resolve(stream, updateState, false);
		}
	}
	function resolve(stream, update, shouldRecover) {
		try {
			var value = shouldRecover ? stream._state.recover() : stream._state.derive();
			if (value === HALT) return false
			update(stream, value, undefined);
		}
		catch (e) {
			update(stream, undefined, e.__error != null ? e.__error : e);
			if (e.__error == null) reportUncaughtError(stream, e);
		}
		return true
	}
	function unwrapError(value, error) {
		if (value != null && value.constructor === createStream) {
			if (value._state.error !== undefined) error = value._state.error;
			else error = unwrapError(value._state.value, value._state.error);
		}
		return error
	}
	function finalize(stream) {
		stream._state.changed = false;
		for (var id in stream._state.deps) stream._state.deps[id]._state.changed = false;
	}
	function reportUncaughtError(stream, e) {
		if (Object.keys(stream._state.deps).length === 0) {
			setTimeout(function() {
				if (Object.keys(stream._state.deps).length === 0) log(e);
			}, 0);
		}
	}

	function run(fn) {
		var self = createStream(), stream = this;
		return initDependency(self, [stream], function() {
			return absorb(self, fn(stream()))
		}, undefined)
	}
	function doCatch(fn) {
		var self = createStream(), stream = this;
		var derive = function() {return stream._state.value};
		var recover = function() {return absorb(self, fn(stream._state.error))};
		return initDependency(self, [stream], derive, recover)
	}
	function combine(fn, streams) {
		if (streams.length > streams.filter(valid).length) throw new Error("Ensure that each item passed to m.prop.combine/m.prop.merge is a stream")
		return initDependency(createStream(), streams, function() {
			var failed = streams.filter(errored);
			if (failed.length > 0) throw {__error: failed[0]._state.error}
			return fn.apply(this, streams.concat([streams.filter(changed)]))
		}, undefined)
	}
	function absorb(stream, value) {
		if (value != null && value.constructor === createStream) {
			var absorbable = value;
			var update = function() {
				updateState(stream, absorbable._state.value, absorbable._state.error);
				for (var id in stream._state.deps) updateDependency(stream._state.deps[id], false);
			};
			absorbable["fantasy-land/map"](update).catch(function(e) {
				update();
				throw {__error: e}
			});
			
			if (absorbable._state.state === 0) return HALT
			if (absorbable._state.error) throw {__error: absorbable._state.error}
			value = absorbable._state.value;
		}
		return value
	}

	function initDependency(dep, streams, derive, recover) {
		var state = dep._state;
		state.derive = derive;
		state.recover = recover;
		state.parents = streams.filter(notEnded);

		registerDependency(dep, state.parents);
		updateDependency(dep, true);

		return dep
	}
	function registerDependency(stream, parents) {
		for (var i = 0; i < parents.length; i++) {
			parents[i]._state.deps[stream._state.id] = stream;
			registerDependency(stream, parents[i]._state.parents);
		}
	}
	function unregisterStream(stream) {
		for (var i = 0; i < stream._state.parents.length; i++) {
			var parent = stream._state.parents[i];
			delete parent._state.deps[stream._state.id];
		}
		for (var id in stream._state.deps) {
			var dependent = stream._state.deps[id];
			var index = dependent._state.parents.indexOf(stream);
			if (index > -1) dependent._state.parents.splice(index, 1);
		}
		stream._state.state = 2; //ended
		stream._state.deps = {};
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
		var stream = createStream();
		stream.error(e);
		return stream
	}

	function merge(streams) {
		return combine(function () {
			return streams.map(function(s) {return s()})
		}, streams)
	}
	createStream["fantasy-land/of"] = createStream;
	createStream.merge = merge;
	createStream.combine = combine;
	createStream.reject = reject;
	createStream.HALT = HALT;

	return createStream
};

var stream = stream$2(console.log.bind(console));

var build = function(object) {
	if (Object.prototype.toString.call(object) !== "[object Object]") return ""

	var args = [];
	for (var key in object) {
		destructure(key, object[key]);
	}
	return args.join("&")

	function destructure(key, value) {
		if (value instanceof Array) {
			for (var i = 0; i < value.length; i++) {
				destructure(key + "[" + i + "]", value[i]);
			}
		}
		else if (Object.prototype.toString.call(value) === "[object Object]") {
			for (var i in value) {
				destructure(key + "[" + i + "]", value[i]);
			}
		}
		else args.push(encodeURIComponent(key) + (value != null && value !== "" ? "=" + encodeURIComponent(value) : ""));
	}
};

var buildQueryString = build;

var request$2 = function($window, Stream) {
	var callbackCount = 0;

	var oncompletion;
	function setCompletionCallback(callback) {oncompletion = callback;}

	function request(args, extra) {
		if(typeof args === "string"){
			var url = args;

			if(typeof extra === "object")	args = extra;
			else args = {};

			if(typeof args.url === "undefined") args.url = url;
		}

		if(typeof args.method === "undefined") args.method = "GET";

		var stream = Stream();
		if (args.initialValue !== undefined) stream(args.initialValue);
		args.method = args.method.toUpperCase();

		var useBody = typeof args.useBody === "boolean" ? args.useBody : args.method !== "GET" && args.method !== "TRACE";

		if (typeof args.serialize !== "function") args.serialize = typeof FormData !== "undefined" && args.data instanceof FormData ? function(value) {return value} : JSON.stringify;
		if (typeof args.deserialize !== "function") args.deserialize = deserialize;
		if (typeof args.extract !== "function") args.extract = extract;

		args.url = interpolate(args.url, args.data);
		if (useBody) args.data = args.serialize(args.data);
		else args.url = assemble(args.url, args.data);

		var xhr = new $window.XMLHttpRequest();
		xhr.open(args.method, args.url, typeof args.async === "boolean" ? args.async : true, typeof args.user === "string" ? args.user : undefined, typeof args.password === "string" ? args.password : undefined);

		if (args.serialize === JSON.stringify && useBody) {
			xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
		}
		if (args.deserialize === deserialize) {
			xhr.setRequestHeader("Accept", "application/json, text/*");
		}

		if (typeof args.config === "function") xhr = args.config(xhr, args) || xhr;

		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				try {
					var response = (args.extract !== extract) ? args.extract(xhr, args) : args.deserialize(args.extract(xhr, args));
					if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
						stream(cast(args.type, response));
					}
					else {
						var error = new Error(xhr.responseText);
						for (var key in response) error[key] = response[key];
						stream.error(error);
					}
				}
				catch (e) {
					stream.error(e);
				}
				if (typeof oncompletion === "function") oncompletion();
			}
		};

		if (useBody && (args.data != null)) xhr.send(args.data);
		else xhr.send();

		return stream
	}

	function jsonp(args) {
		var stream = Stream();
		if (args.initialValue !== undefined) stream(args.initialValue);

		var callbackName = args.callbackName || "_mithril_" + Math.round(Math.random() * 1e16) + "_" + callbackCount++;
		var script = $window.document.createElement("script");
		$window[callbackName] = function(data) {
			script.parentNode.removeChild(script);
			stream(cast(args.type, data));
			if (typeof oncompletion === "function") oncompletion();
			delete $window[callbackName];
		};
		script.onerror = function() {
			script.parentNode.removeChild(script);
			stream.error(new Error("JSONP request failed"));
			if (typeof oncompletion === "function") oncompletion();
			delete $window[callbackName];
		};
		if (args.data == null) args.data = {};
		args.url = interpolate(args.url, args.data);
		args.data[args.callbackKey || "callback"] = callbackName;
		script.src = assemble(args.url, args.data);
		$window.document.documentElement.appendChild(script);
		return stream
	}

	function interpolate(url, data) {
		if (data == null) return url

		var tokens = url.match(/:[^\/]+/gi) || [];
		for (var i = 0; i < tokens.length; i++) {
			var key = tokens[i].slice(1);
			if (data[key] != null) {
				url = url.replace(tokens[i], data[key]);
				delete data[key];
			}
		}
		return url
	}

	function assemble(url, data) {
		var querystring = buildQueryString(data);
		if (querystring !== "") {
			var prefix = url.indexOf("?") < 0 ? "?" : "&";
			url += prefix + querystring;
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
					data[i] = new type(data[i]);
				}
			}
			else return new type(data)
		}
		return data
	}

	return {request: request, jsonp: jsonp, setCompletionCallback: setCompletionCallback}
};

var Stream = stream;
var request = request$2(window, Stream);

var pubsub = function() {
	var callbacks = [];
	function unsubscribe(callback) {
		var index = callbacks.indexOf(callback);
		if (index > -1) callbacks.splice(index, 1);
	}
    function publish() {
        for (var i = 0; i < callbacks.length; i++) {
            callbacks[i].apply(this, arguments);
        }
    }
	return {subscribe: callbacks.push.bind(callbacks), unsubscribe: unsubscribe, publish: publish}
};

var redraw = pubsub();

var Vnode$4 = vnode;

var render$2 = function($window) {
	var $doc = $window.document;
	var $emptyFragment = $doc.createDocumentFragment();

	var onevent;
	function setEventCallback(callback) {return onevent = callback}

	//create
	function createNodes(parent, vnodes, start, end, hooks, nextSibling, ns) {
		for (var i = start; i < end; i++) {
			var vnode$$1 = vnodes[i];
			if (vnode$$1 != null) {
				insertNode(parent, createNode(vnode$$1, hooks, ns), nextSibling);
			}
		}
	}
	function createNode(vnode$$1, hooks, ns) {
		var tag = vnode$$1.tag;
		if (vnode$$1.attrs != null) initLifecycle(vnode$$1.attrs, vnode$$1, hooks);
		if (typeof tag === "string") {
			switch (tag) {
				case "#": return createText(vnode$$1)
				case "<": return createHTML(vnode$$1)
				case "[": return createFragment(vnode$$1, hooks, ns)
				default: return createElement(vnode$$1, hooks, ns)
			}
		}
		else return createComponent(vnode$$1, hooks, ns)
	}
	function createText(vnode$$1) {
		return vnode$$1.dom = $doc.createTextNode(vnode$$1.children)
	}
	function createHTML(vnode$$1) {
		var match = vnode$$1.children.match(/^\s*?<(\w+)/im) || [];
		var parent = {caption: "table", thead: "table", tbody: "table", tfoot: "table", tr: "tbody", th: "tr", td: "tr", colgroup: "table", col: "colgroup"}[match[1]] || "div";
		var temp = $doc.createElement(parent);

		temp.innerHTML = vnode$$1.children;
		vnode$$1.dom = temp.firstChild;
		vnode$$1.domSize = temp.childNodes.length;
		var fragment = $doc.createDocumentFragment();
		var child;
		while (child = temp.firstChild) {
			fragment.appendChild(child);
		}
		return fragment
	}
	function createFragment(vnode$$1, hooks, ns) {
		var fragment = $doc.createDocumentFragment();
		if (vnode$$1.children != null) {
			var children = vnode$$1.children;
			createNodes(fragment, children, 0, children.length, hooks, null, ns);
		}
		vnode$$1.dom = fragment.firstChild;
		vnode$$1.domSize = fragment.childNodes.length;
		return fragment
	}
	function createElement(vnode$$1, hooks, ns) {
		var tag = vnode$$1.tag;
		switch (vnode$$1.tag) {
			case "svg": ns = "http://www.w3.org/2000/svg"; break
			case "math": ns = "http://www.w3.org/1998/Math/MathML"; break
		}

		var attrs = vnode$$1.attrs;
		var is = attrs && attrs.is;

		var element = ns ?
			is ? $doc.createElementNS(ns, tag, {is: is}) : $doc.createElementNS(ns, tag) :
			is ? $doc.createElement(tag, {is: is}) : $doc.createElement(tag);
		vnode$$1.dom = element;

		if (attrs != null) {
			setAttrs(vnode$$1, attrs, ns);
		}

		if (vnode$$1.attrs != null && vnode$$1.attrs.contenteditable != null) {
			setContentEditable(vnode$$1);
		}
		else {
			if (vnode$$1.text != null) {
				if (vnode$$1.text !== "") element.textContent = vnode$$1.text;
				else vnode$$1.children = [Vnode$4("#", undefined, undefined, vnode$$1.text, undefined, undefined)];
			}
			if (vnode$$1.children != null) {
				var children = vnode$$1.children;
				createNodes(element, children, 0, children.length, hooks, null, ns);
				setLateAttrs(vnode$$1);
			}
		}
		return element
	}
	function createComponent(vnode$$1, hooks, ns) {
		// For object literals since `Vnode()` always sets the `state` field.
		if (!vnode$$1.state) vnode$$1.state = {};
		assign(vnode$$1.state, vnode$$1.tag);

		var view = vnode$$1.tag.view;
		if (view.reentrantLock != null) return $emptyFragment
		view.reentrantLock = true;
		initLifecycle(vnode$$1.tag, vnode$$1, hooks);
		vnode$$1.instance = Vnode$4.normalize(view.call(vnode$$1.state, vnode$$1));
		view.reentrantLock = null;
		if (vnode$$1.instance != null) {
			if (vnode$$1.instance === vnode$$1) throw Error("A view cannot return the vnode it received as arguments")
			var element = createNode(vnode$$1.instance, hooks, ns);
			vnode$$1.dom = vnode$$1.instance.dom;
			vnode$$1.domSize = vnode$$1.dom != null ? vnode$$1.instance.domSize : 0;
			return element
		}
		else {
			vnode$$1.domSize = 0;
			return $emptyFragment
		}
	}

	//update
	function updateNodes(parent, old, vnodes, hooks, nextSibling, ns) {
		if (old === vnodes || old == null && vnodes == null) return
		else if (old == null) createNodes(parent, vnodes, 0, vnodes.length, hooks, nextSibling, undefined);
		else if (vnodes == null) removeNodes(old, 0, old.length, vnodes);
		else {
			var recycling = isRecyclable(old, vnodes);
			if (recycling) old = old.concat(old.pool);

			if (old.length === vnodes.length && vnodes[0] != null && vnodes[0].key == null) {
				for (var i = 0; i < old.length; i++) {
					if (old[i] === vnodes[i] || old[i] == null && vnodes[i] == null) continue
					else if (old[i] == null) insertNode(parent, createNode(vnodes[i], hooks, ns), getNextSibling(old, i + 1, nextSibling));
					else if (vnodes[i] == null) removeNodes(old, i, i + 1, vnodes);
					else updateNode(parent, old[i], vnodes[i], hooks, getNextSibling(old, i + 1, nextSibling), recycling, ns);
					if (recycling && old[i].tag === vnodes[i].tag) insertNode(parent, toFragment(old[i]), getNextSibling(old, i + 1, nextSibling));
				}
			}
			else {
				var oldStart = 0, start = 0, oldEnd = old.length - 1, end = vnodes.length - 1, map;
				while (oldEnd >= oldStart && end >= start) {
					var o = old[oldStart], v = vnodes[start];
					if (o === v && !recycling) oldStart++, start++;
					else if (o != null && v != null && o.key === v.key) {
						oldStart++, start++;
						updateNode(parent, o, v, hooks, getNextSibling(old, oldStart, nextSibling), recycling, ns);
						if (recycling && o.tag === v.tag) insertNode(parent, toFragment(o), nextSibling);
					}
					else {
						var o = old[oldEnd];
						if (o === v && !recycling) oldEnd--, start++;
						else if (o != null && v != null && o.key === v.key) {
							updateNode(parent, o, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), recycling, ns);
							if (recycling || start < end) insertNode(parent, toFragment(o), getNextSibling(old, oldStart, nextSibling));
							oldEnd--, start++;
						}
						else break
					}
				}
				while (oldEnd >= oldStart && end >= start) {
					var o = old[oldEnd], v = vnodes[end];
					if (o === v && !recycling) oldEnd--, end--;
					else if (o != null && v != null && o.key === v.key) {
						updateNode(parent, o, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), recycling, ns);
						if (recycling && o.tag === v.tag) insertNode(parent, toFragment(o), nextSibling);
						if (o.dom != null) nextSibling = o.dom;
						oldEnd--, end--;
					}
					else {
						if (!map) map = getKeyMap(old, oldEnd);
						if (v != null) {
							var oldIndex = map[v.key];
							if (oldIndex != null) {
								var movable = old[oldIndex];
								updateNode(parent, movable, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), recycling, ns);
								insertNode(parent, toFragment(movable), nextSibling);
								old[oldIndex].skip = true;
								if (movable.dom != null) nextSibling = movable.dom;
							}
							else {
								var dom = createNode(v, hooks, undefined);
								insertNode(parent, dom, nextSibling);
								nextSibling = dom;
							}
						}
						end--;
					}
					if (end < start) break
				}
				createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns);
				removeNodes(old, oldStart, oldEnd + 1, vnodes);
			}
		}
	}
	function updateNode(parent, old, vnode$$1, hooks, nextSibling, recycling, ns) {
		var oldTag = old.tag, tag = vnode$$1.tag;
		if (oldTag === tag) {
			vnode$$1.state = old.state;
			vnode$$1.events = old.events;
			if (shouldUpdate(vnode$$1, old)) return
			if (vnode$$1.attrs != null) {
				updateLifecycle(vnode$$1.attrs, vnode$$1, hooks, recycling);
			}
			if (typeof oldTag === "string") {
				switch (oldTag) {
					case "#": updateText(old, vnode$$1); break
					case "<": updateHTML(parent, old, vnode$$1, nextSibling); break
					case "[": updateFragment(parent, old, vnode$$1, hooks, nextSibling, ns); break
					default: updateElement(old, vnode$$1, hooks, ns);
				}
			}
			else updateComponent(parent, old, vnode$$1, hooks, nextSibling, recycling, ns);
		}
		else {
			removeNode(old, null);
			insertNode(parent, createNode(vnode$$1, hooks, undefined), nextSibling);
		}
	}
	function updateText(old, vnode$$1) {
		if (old.children.toString() !== vnode$$1.children.toString()) {
			old.dom.nodeValue = vnode$$1.children;
		}
		vnode$$1.dom = old.dom;
	}
	function updateHTML(parent, old, vnode$$1, nextSibling) {
		if (old.children !== vnode$$1.children) {
			toFragment(old);
			insertNode(parent, createHTML(vnode$$1), nextSibling);
		}
		else vnode$$1.dom = old.dom, vnode$$1.domSize = old.domSize;
	}
	function updateFragment(parent, old, vnode$$1, hooks, nextSibling, ns) {
		updateNodes(parent, old.children, vnode$$1.children, hooks, nextSibling, ns);
		var domSize = 0, children = vnode$$1.children;
		vnode$$1.dom = null;
		if (children != null) {
			for (var i = 0; i < children.length; i++) {
				var child = children[i];
				if (child != null && child.dom != null) {
					if (vnode$$1.dom == null) vnode$$1.dom = child.dom;
					domSize += child.domSize || 1;
				}
			}
			if (domSize !== 1) vnode$$1.domSize = domSize;
		}
	}
	function updateElement(old, vnode$$1, hooks, ns) {
		var element = vnode$$1.dom = old.dom;
		switch (vnode$$1.tag) {
			case "svg": ns = "http://www.w3.org/2000/svg"; break
			case "math": ns = "http://www.w3.org/1998/Math/MathML"; break
		}
		if (vnode$$1.tag === "textarea") {
			if (vnode$$1.attrs == null) vnode$$1.attrs = {};
			if (vnode$$1.text != null) {
				vnode$$1.attrs.value = vnode$$1.text; //FIXME handle multiple children
				vnode$$1.text = undefined;
			}
		}
		updateAttrs(vnode$$1, old.attrs, vnode$$1.attrs, ns);
		if (vnode$$1.attrs != null && vnode$$1.attrs.contenteditable != null) {
			setContentEditable(vnode$$1);
		}
		else if (old.text != null && vnode$$1.text != null && vnode$$1.text !== "") {
			if (old.text.toString() !== vnode$$1.text.toString()) old.dom.firstChild.nodeValue = vnode$$1.text;
		}
		else {
			if (old.text != null) old.children = [Vnode$4("#", undefined, undefined, old.text, undefined, old.dom.firstChild)];
			if (vnode$$1.text != null) vnode$$1.children = [Vnode$4("#", undefined, undefined, vnode$$1.text, undefined, undefined)];
			updateNodes(element, old.children, vnode$$1.children, hooks, null, ns);
		}
	}
	function updateComponent(parent, old, vnode$$1, hooks, nextSibling, recycling, ns) {
		vnode$$1.instance = Vnode$4.normalize(vnode$$1.tag.view.call(vnode$$1.state, vnode$$1));
		updateLifecycle(vnode$$1.tag, vnode$$1, hooks, recycling);
		if (vnode$$1.instance != null) {
			if (old.instance == null) insertNode(parent, createNode(vnode$$1.instance, hooks, ns), nextSibling);
			else updateNode(parent, old.instance, vnode$$1.instance, hooks, nextSibling, recycling, ns);
			vnode$$1.dom = vnode$$1.instance.dom;
			vnode$$1.domSize = vnode$$1.instance.domSize;
		}
		else if (old.instance != null) {
			removeNode(old.instance, null);
			vnode$$1.dom = undefined;
			vnode$$1.domSize = 0;
		}
		else {
			vnode$$1.dom = old.dom;
			vnode$$1.domSize = old.domSize;
		}
	}
	function isRecyclable(old, vnodes) {
		if (old.pool != null && Math.abs(old.pool.length - vnodes.length) <= Math.abs(old.length - vnodes.length)) {
			var oldChildrenLength = old[0] && old[0].children && old[0].children.length || 0;
			var poolChildrenLength = old.pool[0] && old.pool[0].children && old.pool[0].children.length || 0;
			var vnodesChildrenLength = vnodes[0] && vnodes[0].children && vnodes[0].children.length || 0;
			if (Math.abs(poolChildrenLength - vnodesChildrenLength) <= Math.abs(oldChildrenLength - vnodesChildrenLength)) {
				return true
			}
		}
		return false
	}
	function getKeyMap(vnodes, end) {
		var map = {}, i = 0;
		for (var i = 0; i < end; i++) {
			var vnode$$1 = vnodes[i];
			if (vnode$$1 != null) {
				var key = vnode$$1.key;
				if (key != null) map[key] = i;
			}
		}
		return map
	}
	function toFragment(vnode$$1) {
		var count = vnode$$1.domSize;
		if (count != null || vnode$$1.dom == null) {
			var fragment = $doc.createDocumentFragment();
			if (count > 0) {
				var dom = vnode$$1.dom;
				while (--count) fragment.appendChild(dom.nextSibling);
				fragment.insertBefore(dom, fragment.firstChild);
			}
			return fragment
		}
		else return vnode$$1.dom
	}
	function getNextSibling(vnodes, i, nextSibling) {
		for (; i < vnodes.length; i++) {
			if (vnodes[i] != null && vnodes[i].dom != null) return vnodes[i].dom
		}
		return nextSibling
	}

	function insertNode(parent, dom, nextSibling) {
		if (nextSibling && nextSibling.parentNode) parent.insertBefore(dom, nextSibling);
		else parent.appendChild(dom);
	}

	function setContentEditable(vnode$$1) {
		var children = vnode$$1.children;
		if (children != null && children.length === 1 && children[0].tag === "<") {
			var content = children[0].children;
			if (vnode$$1.dom.innerHTML !== content) vnode$$1.dom.innerHTML = content;
		}
		else if (children != null || vnode$$1.text != null) throw new Error("Child node of a contenteditable must be trusted")
	}

	//remove
	function removeNodes(vnodes, start, end, context) {
		for (var i = start; i < end; i++) {
			var vnode$$1 = vnodes[i];
			if (vnode$$1 != null) {
				if (vnode$$1.skip) vnode$$1.skip = false;
				else removeNode(vnode$$1, context);
			}
		}
	}
	function once(f) {
		var called = false;
		return function() {
			if (!called) {
				called = true;
				f();
			}
		}
	}
	function removeNode(vnode$$1, context) {
		var expected = 1, called = 0;
		if (vnode$$1.attrs && vnode$$1.attrs.onbeforeremove) {
			expected++;
			vnode$$1.attrs.onbeforeremove.call(vnode$$1.state, vnode$$1, once(continuation));
		}
		if (typeof vnode$$1.tag !== "string" && vnode$$1.tag.onbeforeremove) {
			expected++;
			vnode$$1.tag.onbeforeremove.call(vnode$$1.state, vnode$$1, once(continuation));
		}
		continuation();
		function continuation() {
			if (++called === expected) {
				onremove(vnode$$1);
				if (vnode$$1.dom) {
					var count = vnode$$1.domSize || 1;
					if (count > 1) {
						var dom = vnode$$1.dom;
						while (--count) {
							removeNodeFromDOM(dom.nextSibling);
						}
					}
					removeNodeFromDOM(vnode$$1.dom);
					if (context != null && vnode$$1.domSize == null && !hasIntegrationMethods(vnode$$1.attrs) && typeof vnode$$1.tag === "string") { //TODO test custom elements
						if (!context.pool) context.pool = [vnode$$1];
						else context.pool.push(vnode$$1);
					}
				}
			}
		}
	}
	function removeNodeFromDOM(node) {
		var parent = node.parentNode;
		if (parent != null) parent.removeChild(node);
	}
	function onremove(vnode$$1) {
		if (vnode$$1.attrs && vnode$$1.attrs.onremove) vnode$$1.attrs.onremove.call(vnode$$1.state, vnode$$1);
		if (typeof vnode$$1.tag !== "string" && vnode$$1.tag.onremove) vnode$$1.tag.onremove.call(vnode$$1.state, vnode$$1);
		if (vnode$$1.instance != null) onremove(vnode$$1.instance);
		else {
			var children = vnode$$1.children;
			if (children instanceof Array) {
				for (var i = 0; i < children.length; i++) {
					var child = children[i];
					if (child != null) onremove(child);
				}
			}
		}
	}

	//attrs
	function setAttrs(vnode$$1, attrs, ns) {
		for (var key in attrs) {
			setAttr(vnode$$1, key, null, attrs[key], ns);
		}
	}
	function setAttr(vnode$$1, key, old, value, ns) {
		var element = vnode$$1.dom;
		if (key === "key" || (old === value && !isFormAttribute(vnode$$1, key)) && typeof value !== "object" || typeof value === "undefined" || isLifecycleMethod(key)) return
		var nsLastIndex = key.indexOf(":");
		if (nsLastIndex > -1 && key.substr(0, nsLastIndex) === "xlink") {
			element.setAttributeNS("http://www.w3.org/1999/xlink", key.slice(nsLastIndex + 1), value);
		}
		else if (key[0] === "o" && key[1] === "n" && typeof value === "function") updateEvent(vnode$$1, key, value);
		else if (key === "style") updateStyle(element, old, value);
		else if (key in element && !isAttribute(key) && ns === undefined) {
			//setting input[value] to same value by typing on focused element moves cursor to end in Chrome
			if (vnode$$1.tag === "input" && key === "value" && vnode$$1.dom.value === value && vnode$$1.dom === $doc.activeElement) return
			element[key] = value;
		}
		else {
			if (typeof value === "boolean") {
				if (value) element.setAttribute(key, "");
				else element.removeAttribute(key);
			}
			else element.setAttribute(key === "className" ? "class" : key, value);
		}
	}
	function setLateAttrs(vnode$$1) {
		var attrs = vnode$$1.attrs;
		if (vnode$$1.tag === "select" && attrs != null) {
			if ("value" in attrs) setAttr(vnode$$1, "value", null, attrs.value, undefined);
			if ("selectedIndex" in attrs) setAttr(vnode$$1, "selectedIndex", null, attrs.selectedIndex, undefined);
		}
	}
	function updateAttrs(vnode$$1, old, attrs, ns) {
		if (attrs != null) {
			for (var key in attrs) {
				setAttr(vnode$$1, key, old && old[key], attrs[key], ns);
			}
		}
		if (old != null) {
			for (var key in old) {
				if (attrs == null || !(key in attrs)) {
					if (key === "className") key = "class";
					if (key[0] === "o" && key[1] === "n" && !isLifecycleMethod(key)) updateEvent(vnode$$1, key, undefined);
					else if (key !== "key") vnode$$1.dom.removeAttribute(key);
				}
			}
		}
	}
	function isFormAttribute(vnode$$1, attr) {
		return attr === "value" || attr === "checked" || attr === "selectedIndex" || attr === "selected" && vnode$$1.dom === $doc.activeElement
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
		if (old === style) element.style.cssText = "", old = null;
		if (style == null) element.style.cssText = "";
		else if (typeof style === "string") element.style.cssText = style;
		else {
			if (typeof old === "string") element.style.cssText = "";
			for (var key in style) {
				element.style[key] = style[key];
			}
			if (old != null && typeof old !== "string") {
				for (var key in old) {
					if (!(key in style)) element.style[key] = "";
				}
			}
		}
	}

	//event
	function updateEvent(vnode$$1, key, value) {
		var element = vnode$$1.dom;
		var callback = function(e) {
			var result = value.call(element, e);
			if (typeof onevent === "function") onevent.call(element, e);
			return result
		};
		if (key in element) element[key] = typeof value === "function" ? callback : null;
		else {
			var eventName = key.slice(2);
			if (vnode$$1.events === undefined) vnode$$1.events = {};
			if (vnode$$1.events[key] != null) element.removeEventListener(eventName, vnode$$1.events[key], false);
			if (typeof value === "function") {
				vnode$$1.events[key] = callback;
				element.addEventListener(eventName, vnode$$1.events[key], false);
			}
		}
	}

	//lifecycle
	function initLifecycle(source, vnode$$1, hooks) {
		if (typeof source.oninit === "function") source.oninit.call(vnode$$1.state, vnode$$1);
		if (typeof source.oncreate === "function") hooks.push(source.oncreate.bind(vnode$$1.state, vnode$$1));
	}
	function updateLifecycle(source, vnode$$1, hooks, recycling) {
		if (recycling) initLifecycle(source, vnode$$1, hooks);
		else if (typeof source.onupdate === "function") hooks.push(source.onupdate.bind(vnode$$1.state, vnode$$1));
	}
	function shouldUpdate(vnode$$1, old) {
		var forceVnodeUpdate, forceComponentUpdate;
		if (vnode$$1.attrs != null && typeof vnode$$1.attrs.onbeforeupdate === "function") forceVnodeUpdate = vnode$$1.attrs.onbeforeupdate.call(vnode$$1.state, vnode$$1, old);
		if (typeof vnode$$1.tag !== "string" && typeof vnode$$1.tag.onbeforeupdate === "function") forceComponentUpdate = vnode$$1.tag.onbeforeupdate.call(vnode$$1.state, vnode$$1, old);
		if (!(forceVnodeUpdate === undefined && forceComponentUpdate === undefined) && !forceVnodeUpdate && !forceComponentUpdate) {
			vnode$$1.dom = old.dom;
			vnode$$1.domSize = old.domSize;
			vnode$$1.instance = old.instance;
			return true
		}
		return false
	}

	function assign(target, source) {
		Object.keys(source).forEach(function(k){target[k] = source[k];});
	}

	function render(dom, vnodes) {
		if (!dom) throw new Error("Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.")
		var hooks = [];
		var active = $doc.activeElement;

		// First time rendering into a node clears it out
		if (dom.vnodes == null) dom.textContent = "";

		if (!(vnodes instanceof Array)) vnodes = [vnodes];
		updateNodes(dom, dom.vnodes, Vnode$4.normalizeChildren(vnodes), hooks, null, undefined);
		dom.vnodes = vnodes;
		for (var i = 0; i < hooks.length; i++) hooks[i]();
		if ($doc.activeElement !== active) active.focus();
	}

	return {render: render, setEventCallback: setEventCallback}
};

var render = render$2(window);

var throttle$1 = function(callback) {
	//60fps translates to 16.6ms, round it down since setTimeout requires int
	var time = 16;
	var last = 0, pending = null;
	var timeout = typeof requestAnimationFrame === "function" ? requestAnimationFrame : setTimeout;
	return function(synchronous) {
		var now = Date.now();
		if (synchronous === true || last === 0 || now - last >= time) {
			last = now;
			callback();
		}
		else if (pending === null) {
			pending = timeout(function() {
				pending = null;
				callback();
				last = Date.now();
			}, time - (now - last));
		}
	}
};

var throttle = throttle$1;

var autoredraw$1 = function(root, renderer, pubsub, callback) {
	var run = throttle(callback);
	if (renderer != null) {
		renderer.setEventCallback(function(e) {
			if (e.redraw !== false) pubsub.publish();
		});
	}

	if (pubsub != null) {
		if (root.redraw) pubsub.unsubscribe(root.redraw);
		pubsub.subscribe(run);
	}

	return root.redraw = run
};

var Vnode$5 = vnode;
var autoredraw = autoredraw$1;

var mount$2 = function(renderer, pubsub) {
	return function(root, component) {
		if (component === null) {
			renderer.render(root, []);
			pubsub.unsubscribe(root.redraw);
			delete root.redraw;
			return
		}
		
		if (component.view == null) throw new Error("m.mount(element, component) expects a component, not a vnode")

		var run = autoredraw(root, renderer, pubsub, function() {
			renderer.render(root, Vnode$5(component, undefined, undefined, undefined, undefined, undefined));
		});

		run();
	}
};

var renderService = render;
var redrawService$1 = redraw;

var mount = mount$2(renderService, redrawService$1);

var parse = function(string) {
	if (string === "" || string == null) return {}
	if (string.charAt(0) === "?") string = string.slice(1);

	var entries = string.split("&"), data = {}, counters = {};
	for (var i = 0; i < entries.length; i++) {
		var entry = entries[i].split("=");
		var key = decodeURIComponent(entry[0]);
		var value = entry.length === 2 ? decodeURIComponent(entry[1]) : "";

		if (value === "true") value = true;
		else if (value === "false") value = false;

		var levels = key.split(/\]\[?|\[/);
		var cursor = data;
		if (key.indexOf("[") > -1) levels.pop();
		for (var j = 0; j < levels.length; j++) {
			var level = levels[j], nextLevel = levels[j + 1];
			var isNumber = nextLevel == "" || !isNaN(parseInt(nextLevel, 10));
			var isValue = j === levels.length - 1;
			if (level === "") {
				var key = levels.slice(0, j).join();
				if (counters[key] == null) counters[key] = 0;
				level = counters[key]++;
			}
			if (cursor[level] == null) {
				cursor[level] = isValue ? value : isNumber ? [] : {};
			}
			cursor = cursor[level];
		}
	}
	return data
};

var buildQueryString$1 = build;
var parseQueryString = parse;

var router$2 = function($window) {
	var supportsPushState = typeof $window.history.pushState === "function";
	var callAsync = typeof setImmediate === "function" ? setImmediate : setTimeout;

	var prefix = "#!";
	function setPrefix(value) {prefix = value;}

	function normalize(fragment) {
		var data = $window.location[fragment].replace(/(?:%[a-f89][a-f0-9])+/gim, decodeURIComponent);
		if (fragment === "pathname" && data[0] !== "/") data = "/" + data;
		return data
	}

	var asyncId;
	function debounceAsync(f) {
		return function() {
			if (asyncId != null) return
			asyncId = callAsync(function() {
				asyncId = null;
				f();
			});

		}
	}

	function parsePath(path, queryData, hashData) {
		var queryIndex = path.indexOf("?");
		var hashIndex = path.indexOf("#");
		var pathEnd = queryIndex > -1 ? queryIndex : hashIndex > -1 ? hashIndex : path.length;
		if (queryIndex > -1) {
			var queryEnd = hashIndex > -1 ? hashIndex : path.length;
			var queryParams = parseQueryString(path.slice(queryIndex + 1, queryEnd));
			for (var key in queryParams) queryData[key] = queryParams[key];
		}
		if (hashIndex > -1) {
			var hashParams = parseQueryString(path.slice(hashIndex + 1));
			for (var key in hashParams) hashData[key] = hashParams[key];
		}
		return path.slice(0, pathEnd)
	}

	function getPath() {
		var type = prefix.charAt(0);
		switch (type) {
			case "#": return normalize("hash").slice(prefix.length)
			case "?": return normalize("search").slice(prefix.length) + normalize("hash")
			default: return normalize("pathname").slice(prefix.length) + normalize("search") + normalize("hash")
		}
	}

	function setPath(path, data, options) {
		var queryData = {}, hashData = {};
		path = parsePath(path, queryData, hashData);
		if (data != null) {
			for (var key in data) queryData[key] = data[key];
			path = path.replace(/:([^\/]+)/g, function(match, token) {
				delete queryData[token];
				return data[token]
			});
		}

		var query = buildQueryString$1(queryData);
		if (query) path += "?" + query;

		var hash = buildQueryString$1(hashData);
		if (hash) path += "#" + hash;

		if (supportsPushState) {
			if (options && options.replace) $window.history.replaceState(null, null, prefix + path);
			else $window.history.pushState(null, null, prefix + path);
			$window.onpopstate();
		}
		else $window.location.href = prefix + path;
	}

	function defineRoutes(routes, resolve, reject) {
		if (supportsPushState) $window.onpopstate = debounceAsync(resolveRoute);
		else if (prefix.charAt(0) === "#") $window.onhashchange = resolveRoute;
		resolveRoute();
		
		function resolveRoute() {
			var path = getPath();
			var params = {};
			var pathname = parsePath(path, params, params);
			
			for (var route in routes) {
				var matcher = new RegExp("^" + route.replace(/:[^\/]+?\.{3}/g, "(.*?)").replace(/:[^\/]+/g, "([^\\/]+)") + "\/?$");

				if (matcher.test(pathname)) {
					pathname.replace(matcher, function() {
						var keys = route.match(/:[^\/]+/g) || [];
						var values = [].slice.call(arguments, 1, -2);
						for (var i = 0; i < keys.length; i++) {
							params[keys[i].replace(/:|\./g, "")] = decodeURIComponent(values[i]);
						}
						resolve(routes[route], params, path, route);
					});
					return
				}
			}

			reject(path, params);
		}
		return resolveRoute
	}

	function link(vnode) {
		vnode.dom.setAttribute("href", prefix + vnode.attrs.href);
		vnode.dom.onclick = function(e) {
			if (e.ctrlKey || e.metaKey || e.shiftKey || e.which === 2) return
			e.preventDefault();
			e.redraw = false;
			var href = this.getAttribute("href");
			if (href.indexOf(prefix) === 0) href = href.slice(prefix.length);
			setPath(href, undefined, undefined);
		};
	}

	return {setPrefix: setPrefix, getPath: getPath, setPath: setPath, defineRoutes: defineRoutes, link: link}
};

var Vnode$6 = vnode;
var coreRouter = router$2;

var router = function($window, mount) {
	var router = coreRouter($window);
	var currentResolve, currentComponent, currentRender, currentArgs, currentPath;

	var RouteComponent = {view: function() {
		return [currentRender(Vnode$6(currentComponent, null, currentArgs, undefined, undefined, undefined))]
	}};
	function defaultRender(vnode$$1) {
		return vnode$$1
	}
	var route = function(root, defaultRoute, routes) {
		currentComponent = "div";
		currentRender = defaultRender;
		currentArgs = null;

		mount(root, RouteComponent);

		router.defineRoutes(routes, function(payload, args, path) {
			var isResolver = typeof payload.view !== "function";
			var render = defaultRender;

			var resolve = currentResolve = function (component) {
				if (resolve !== currentResolve) return
				currentResolve = null;

				currentComponent = component != null ? component : isResolver ? "div" : payload;
				currentRender = render;
				currentArgs = args;
				currentPath = path;

				root.redraw(true);
			};
			var onmatch = function() {
				resolve();
			};
			if (isResolver) {
				if (typeof payload.render === "function") render = payload.render.bind(payload);
				if (typeof payload.onmatch === "function") onmatch = payload.onmatch;
			}
		
			onmatch.call(payload, resolve, args, path);
		}, function() {
			router.setPath(defaultRoute, null, {replace: true});
		});
	};
	route.link = router.link;
	route.prefix = router.setPrefix;
	route.set = router.setPath;
	route.get = function() {return currentPath};

	return route
};

var mount$4 = mount;

var route = router(window, mount$4);

var withAttr = function(attrName, callback, context) {
	return function(e) {
		return callback.call(context || this, attrName in e.currentTarget ? e.currentTarget[attrName] : e.currentTarget.getAttribute(attrName))
	}
};

var m$1 = hyperscript_1;
var requestService = request;
var redrawService = redraw;

requestService.setCompletionCallback(redrawService.publish);

m$1.mount = mount;
m$1.route = route;
m$1.withAttr = withAttr;
m$1.prop = stream;
m$1.render = render.render;
m$1.redraw = redrawService.publish;
m$1.request = requestService.request;
m$1.jsonp = requestService.jsonp;
m$1.parseQueryString = parse;
m$1.buildQueryString = build;
m$1.version = "bleeding-edge";

var index$2 = m$1;

var mainloop_min = createCommonjsModule(function (module) {
/**
 * mainloop.js 1.0.3-20160320
 *
 * @author Isaac Sukin (http://www.isaacsukin.com/)
 * @license MIT
 */

!function(a){function b(a){if(v=o(b),!(e+j>a)){for(d+=a-e,e=a,r(a,d),a>g+1e3&&(f=.25*h+.75*f,g=a,h=0),h++,i=0;d>=c;)if(s(c),d-=c,++i>=240){m=!0;break}t(d/c),u(f,m),m=!1;}}var c=1e3/60,d=0,e=0,f=60,g=0,h=0,i=0,j=0,k=!1,l=!1,m=!1,n="object"==typeof window?window:a,o=n.requestAnimationFrame||function(){var a=Date.now(),b,d;return function(e){return b=Date.now(),d=Math.max(0,c-(b-a)),a=b+d,setTimeout(function(){e(b+d);},d)}}(),p=n.cancelAnimationFrame||clearTimeout,q=function(){},r=q,s=q,t=q,u=q,v;a.MainLoop={getSimulationTimestep:function(){return c},setSimulationTimestep:function(a){return c=a,this},getFPS:function(){return f},getMaxAllowedFPS:function(){return 1e3/j},setMaxAllowedFPS:function(a){return"undefined"==typeof a&&(a=1/0),0===a?this.stop():j=1e3/a,this},resetFrameDelta:function(){var a=d;return d=0,a},setBegin:function(a){return r=a||r,this},setUpdate:function(a){return s=a||s,this},setDraw:function(a){return t=a||t,this},setEnd:function(a){return u=a||u,this},start:function(){return l||(l=!0,v=o(function(a){t(1),k=!0,e=a,g=a,h=0,v=o(b);})),this},stop:function(){return k=!1,l=!1,p(v),this},isRunning:function(){return k}},"function"==typeof define&&define.amd?define(a.MainLoop):"object"==typeof module&&null!==module&&"object"==typeof module.exports&&(module.exports=a.MainLoop);}(commonjsGlobal);
});

let state = {
    color  : "red",
    acc    : 0,
    alight : false,
    light  : {}
};

const m   = index$2;
const addLight = function() {
        // first click
        if(!state.light.count) {
            state.light.count = 1;

            return;
        }

        state.light.count++;
    };
const pulseLight = function() {
        if(state.light.lit) {
            return;
        }

        state.light.lit = {
            idx : 0,
            dur : 0
        };
    };
const updateLight = function(delta) {
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

    };
const comp = {
        view : () => m("div", {
            style : `background: ${state.alight ? state.color : ""}`,
            onclick : () => {
                addLight();
                pulseLight();
            }
        }, state.content)
    };
const MainLoop = mainloop_min;
const update = function(delta) {
        state.content = Math.floor(Date.now()/1000);

        updateLight(delta);
    };
const draw = function() {
        m.redraw();
    };

m.mount(document.body, comp);

MainLoop.setUpdate(update).setDraw(draw).start();

window.ML = MainLoop;
window.state = state;

var index = {

};

module.exports = index;
