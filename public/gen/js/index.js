'use strict';

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

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/** @constructor */
var PromisePolyfill$1 = function(executor) {
	if (!(this instanceof PromisePolyfill$1)) throw new Error("Promise must be called with `new`")
	if (typeof executor !== "function") throw new TypeError("executor must be a function")

	var self = this, resolvers = [], rejectors = [], resolveCurrent = handler(resolvers, true), rejectCurrent = handler(rejectors, false);
	var instance = self._instance = {resolvers: resolvers, rejectors: rejectors};
	var callAsync = typeof setImmediate === "function" ? setImmediate : setTimeout;
	function handler(list, shouldAbsorb) {
		return function execute(value) {
			var then;
			try {
				if (shouldAbsorb && value != null && (typeof value === "object" || typeof value === "function") && typeof (then = value.then) === "function") {
					if (value === self) throw new TypeError("Promise can't be resolved w/ itself")
					executeOnce(then.bind(value));
				}
				else {
					callAsync(function() {
						if (!shouldAbsorb && list.length === 0) console.error("Possible unhandled promise rejection:", value);
						for (var i = 0; i < list.length; i++) list[i](value);
						resolvers.length = 0, rejectors.length = 0;
						instance.state = shouldAbsorb;
						instance.retry = function() {execute(value);};
					});
				}
			}
			catch (e) {
				rejectCurrent(e);
			}
		}
	}
	function executeOnce(then) {
		var runs = 0;
		function run(fn) {
			return function(value) {
				if (runs++ > 0) return
				fn(value);
			}
		}
		var onerror = run(rejectCurrent);
		try {then(run(resolveCurrent), onerror);} catch (e) {onerror(e);}
	}

	executeOnce(executor);
};
PromisePolyfill$1.prototype.then = function(onFulfilled, onRejection) {
	var self = this, instance = self._instance;
	function handle(callback, list, next, state) {
		list.push(function(value) {
			if (typeof callback !== "function") next(value);
			else try {resolveNext(callback(value));} catch (e) {if (rejectNext) rejectNext(e);}
		});
		if (typeof instance.retry === "function" && state === instance.state) instance.retry();
	}
	var resolveNext, rejectNext;
	var promise = new PromisePolyfill$1(function(resolve, reject) {resolveNext = resolve, rejectNext = reject;});
	handle(onFulfilled, instance.resolvers, resolveNext, true), handle(onRejection, instance.rejectors, rejectNext, false);
	return promise
};
PromisePolyfill$1.prototype.catch = function(onRejection) {
	return this.then(null, onRejection)
};
PromisePolyfill$1.resolve = function(value) {
	if (value instanceof PromisePolyfill$1) return value
	return new PromisePolyfill$1(function(resolve) {resolve(value);})
};
PromisePolyfill$1.reject = function(value) {
	return new PromisePolyfill$1(function(resolve, reject) {reject(value);})
};
PromisePolyfill$1.all = function(list) {
	return new PromisePolyfill$1(function(resolve, reject) {
		var total = list.length, count = 0, values = [];
		if (list.length === 0) resolve([]);
		else for (var i = 0; i < list.length; i++) {
			(function(i) {
				function consume(value) {
					count++;
					values[i] = value;
					if (count === total) resolve(values);
				}
				if (list[i] != null && (typeof list[i] === "object" || typeof list[i] === "function") && typeof list[i].then === "function") {
					list[i].then(consume, reject);
				}
				else consume(list[i]);
			})(i);
		}
	})
};
PromisePolyfill$1.race = function(list) {
	return new PromisePolyfill$1(function(resolve, reject) {
		for (var i = 0; i < list.length; i++) {
			list[i].then(resolve, reject);
		}
	})
};

if (typeof Promise === "undefined") {
	if (typeof window !== "undefined") window.Promise = PromisePolyfill$1;
	else if (typeof commonjsGlobal !== "undefined") commonjsGlobal.Promise = PromisePolyfill$1;
}

var promise = typeof Promise !== "undefined" ? Promise : PromisePolyfill$1;

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

var request$2 = function($window, Promise) {
	var callbackCount = 0;

	var count = 0;
	var oncompletion;
	function setCompletionCallback(callback) {oncompletion = callback;}
	function complete() {if (--count === 0 && typeof oncompletion === "function") oncompletion();}

	function finalize(promise) {
		var then = promise.then;
		promise.then = function() {
			count++;
			var next = then.apply(promise, arguments);
			next.then(complete, function(e) {
				complete();
				throw e
			});
			return finalize(next)
		};
		return promise
	}
	
	function request(args, extra) {
		return finalize(new Promise(function(resolve, reject) {
			if (typeof args === "string") {
				var url = args;
				args = extra || {};
				if (args.url == null) args.url = url;
			}

			if (args.method == null) args.method = "GET";
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
							resolve(cast(args.type, response));
						}
						else {
							var error = new Error(xhr.responseText);
							for (var key in response) error[key] = response[key];
							reject(error);
						}
					}
					catch (e) {
						reject(e);
					}
				}
			};

			if (useBody && (args.data != null)) xhr.send(args.data);
			else xhr.send();
		}))
	}

	function jsonp(args) {
		return finalize(new Promise(function(resolve, reject) {
			var callbackName = args.callbackName || "_mithril_" + Math.round(Math.random() * 1e16) + "_" + callbackCount++;
			var script = $window.document.createElement("script");
			$window[callbackName] = function(data) {
				script.parentNode.removeChild(script);
				resolve(cast(args.type, data));
				delete $window[callbackName];
			};
			script.onerror = function() {
				script.parentNode.removeChild(script);
				reject(new Error("JSONP request failed"));
				delete $window[callbackName];
			};
			if (args.data == null) args.data = {};
			args.url = interpolate(args.url, args.data);
			args.data[args.callbackKey || "callback"] = callbackName;
			script.src = assemble(args.url, args.data);
			$window.document.documentElement.appendChild(script);
		}))
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

var PromisePolyfill = promise;
var request = request$2(window, PromisePolyfill);

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
			insertNode(parent, createNode(vnode$$1, hooks, ns), nextSibling);
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
			//setting option[value] to same value while having select open blinks select dropdown in Chrome
			if (vnode$$1.tag === "option" && key === "value" && vnode$$1.dom.value === value) return
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

var m = hyperscript_1;
var requestService = request;
var redrawService = redraw;

requestService.setCompletionCallback(redrawService.publish);

m.mount = mount;
m.route = route;
m.withAttr = withAttr;
m.render = render.render;
m.redraw = redrawService.publish;
m.request = requestService.request;
m.jsonp = requestService.jsonp;
m.parseQueryString = parse;
m.buildQueryString = build;
m.version = "bleeding-edge";

var index = m;

var mainloop_min = createCommonjsModule(function (module) {
/**
 * mainloop.js 1.0.3-20160320
 *
 * @author Isaac Sukin (http://www.isaacsukin.com/)
 * @license MIT
 */

!function(a){function b(a){if(v=o(b),!(e+j>a)){for(d+=a-e,e=a,r(a,d),a>g+1e3&&(f=.25*h+.75*f,g=a,h=0),h++,i=0;d>=c;)if(s(c),d-=c,++i>=240){m=!0;break}t(d/c),u(f,m),m=!1;}}var c=1e3/60,d=0,e=0,f=60,g=0,h=0,i=0,j=0,k=!1,l=!1,m=!1,n="object"==typeof window?window:a,o=n.requestAnimationFrame||function(){var a=Date.now(),b,d;return function(e){return b=Date.now(),d=Math.max(0,c-(b-a)),a=b+d,setTimeout(function(){e(b+d);},d)}}(),p=n.cancelAnimationFrame||clearTimeout,q=function(){},r=q,s=q,t=q,u=q,v;a.MainLoop={getSimulationTimestep:function(){return c},setSimulationTimestep:function(a){return c=a,this},getFPS:function(){return f},getMaxAllowedFPS:function(){return 1e3/j},setMaxAllowedFPS:function(a){return"undefined"==typeof a&&(a=1/0),0===a?this.stop():j=1e3/a,this},resetFrameDelta:function(){var a=d;return d=0,a},setBegin:function(a){return r=a||r,this},setUpdate:function(a){return s=a||s,this},setDraw:function(a){return t=a||t,this},setEnd:function(a){return u=a||u,this},start:function(){return l||(l=!0,v=o(function(a){t(1),k=!0,e=a,g=a,h=0,v=o(b);})),this},stop:function(){return k=!1,l=!1,p(v),this},isRunning:function(){return k}},"function"==typeof define&&define.amd?define(a.MainLoop):"object"==typeof module&&null!==module&&"object"==typeof module.exports&&(module.exports=a.MainLoop);}(commonjsGlobal);
});

var css = {
    "ticker": "mc70832d4a_ticker"
};

var css$1 = {
    "logo": "mcd7e74f43_logo",
    "smLogo": "mcd7e74f43_smLogo"
};

var logo$$1 = {
    view : (vnode) =>
        index("h1", { class : vnode.attrs.small ? css$1.smLogo : css$1.logo }, "Game Name")
};

var css$2 = {
    "header": "mca3d60bea_header",
    "logo": "mca3d60bea_logo",
    "hMenu": "mca3d60bea_hMenu",
    "button": "mca3d60bea_button",
    "nav": "mca3d60bea_nav"
};

const nav$$1 = [{
        href : "/options",
        text : "options"
    }];

var header$$1 = {
    view : (vnode) =>
        index("header", { class : css$2.header },
            index("div", { class : css$2.logo },
                index(logo$$1, { small : true })
            ),
            index("div", { class : css$2.hMenu },
                index("button", {
                        class   : css$2.button,
                        onclick : () => console.log("do some shit")
                    },
                    "show nav"
                ),
                index("nav", { class : css$2.nav },
                    nav$$1.map((navItem) =>
                        index("a", {
                            href    : navItem.href,
                            onclick : (e) => console.log("other shit")
                        }, navItem.text)
                    )
                )
            )
        )
};

var css$3 = {
    "footer": "mc5c0b71a6_footer",
    "sides": "mc5c0b71a6_sides",
    "count": "mc5c0b71a6_sides mc5c0b71a6_count",
    "timer": "mc5c0b71a6_timer",
    "level": "mc5c0b71a6_sides mc5c0b71a6_level",
    "header": "mc5c0b71a6_header",
    "val": "mc5c0b71a6_val",
    "countHeader": "mc5c0b71a6_header mc5c0b71a6_countHeader",
    "levelHeader": "mc5c0b71a6_header mc5c0b71a6_levelHeader",
    "countVal": "mc5c0b71a6_val mc5c0b71a6_countVal",
    "levelVal": "mc5c0b71a6_val mc5c0b71a6_levelVal",
    "timerVal": "mc5c0b71a6_timerVal"
};

var footer$$1 = {
    view : (vnode) => {
        let state = vnode.attrs.state,
            gameState = state.gameState,
            timer$$1 = null;

        if(gameState) {
            timer$$1 = (gameState.userTimer.limit - gameState.userTimer.cur) /1000;

            if(timer$$1 < 0) {
                timer$$1 = 0;
            }

            timer$$1 = timer$$1.toFixed(2);
        }

        return index("footer", { class : css$3.footer },
            index("div", { class : css$3.count },
                index("h3", { class : css$3.countHeader },
                    "steps"
                ),
                index("p", { class : css$3.countVal },
                    gameState ?
                    gameState.pattern.length :
                    null
                )
            ),
            index("div", { class : css$3.timer },
                index("div", { class : css$3.timerBar }),
                index("div", { class : css$3.timerVal },
                    timer$$1
                )
            ),
            index("div", { class : css$3.level },
                index("h3", { class : css$3.levelHeader },
                    "level"
                ),
                index("p", { class : css$3.levelVal },
                    // hard coded for now
                    1
                )
            )
        );
    }
};

var css$4 = {
    "layout": "mc4df9e2fb_layout",
    "section": "mc4df9e2fb_section"
};

var layout$$1 = {
    view : (vnode) =>
        index("div", { class : css$4.layout },
            index(header$$1),
            index("section", { class : css$4.section }, vnode.children),
            index(footer$$1, vnode.attrs)
        )
};

var css$5 = {
    "pads": "mc4dd3a996_pads",
    "quad": "mc4dd3a996_quad",
    "quad_1": "mc4dd3a996_quad mc4dd3a996_quad_1",
    "quad_2": "mc4dd3a996_quad mc4dd3a996_quad_2",
    "quad_3": "mc4dd3a996_quad mc4dd3a996_quad_3",
    "quad_4": "mc4dd3a996_quad mc4dd3a996_quad_4",
    "button": "mc4dd3a996_button",
    "ripple": "mcb539df3f_ripple mc4dd3a996_ripple",
    "alight": "mc4dd3a996_alight"
};

const pads$$1 = [ 1, 2, 3, 4 ];

function clickPad(state, e) {
    let value = e.currentTarget.getAttribute("data-value"),
        rect  = e.currentTarget.getBoundingClientRect(),
        pad   = parseInt(value, 10),

        x = e.pageX - rect.left,
        y = e.pageY - rect.top;

    if(e.pageX === 0 && e.pageY === 0) {
        x = rect.width / 2;
        y = rect.height /2;
    }

    state.gameState.userPlay(pad);

    ripple$$1(state, {
        pad : pad,
        x   : x,
        y   : y
    });
}

function keyPad(state, e) {
    let button$$1;

    if(!(e.keyCode in state.keyMappings)) {
        return;
    }

    button$$1 = state.ui.buttons[state.keyMappings[e.keyCode]].dom;

    button$$1.dispatchEvent(new MouseEvent("click"));
}

function update$1(delta) {
    let dur = 800;

    state.ui.ripples = state.ui.ripples.filter((ripple$$1) => {
            return ripple$$1.dur < dur;
        })
        .map((ripple$$1) => {

            ripple$$1.dur += delta;

            return ripple$$1;
        });
}

function ripple$$1(state, opts) {
    // add to state.ui.ripple
    state.ui.ripples.push({
            pad : opts.pad,
            dur : 0,
            x   : opts.x,
            y   : opts.y
        });

    state.ui.update = update$1;
}


var pads$1 = {
    oncreate : (vnode) => {
        let state = vnode.attrs.state;
        if(state.gameState) {
            state.remove = keyPad.bind(null, state);
            window.addEventListener("keydown", state.remove);
        }
    },
    onremove : (vnode) => {
        if(state.gameState) {
            window.removeEventListener("keydown", vnode.attrs.state.remove);
        }
    },
    view : (vnode) => {
        let state  = vnode.attrs.state;

        state.ui.ripples = state.ui.ripples || [];

        return index("section", {
                class  : css$5.pads,
                oninit : (vnode) => {
                    state.ui.buttons = [];
                }
            },
            pads$$1.map((pad) => {
                let ripples = [],
                    alight$$1  = null,
                    attrs   = {
                        class        : css$5.button,
                        "data-value" : pad,
                        onclick      : (e) => e.preventDefault(),
                        oncreate     : (vnode) => {
                            // ref for hotkeys to fire click on button
                            state.ui.buttons.push(vnode);
                        }
                    };

                if(state.gameState) {
                    if(state.gameState.playback) {
                        attrs.disabled = "disabled";

                        if(state.gameState.alight === pad) {
                            alight$$1 = index("span", { class : css$5.alight });
                        }
                    }

                    ripples = state.ui.ripples.filter((ripple$$1) => ripple$$1.pad === pad);

                    attrs.onclick = clickPad.bind(null, state);
                }

                return index("div", { class : css$5[`quad_${pad}`] },
                    alight$$1, // PC light
                    // User light
                    ripples.map((ripple$$1) => index("span", {
                        class : css$5.ripple,
                        style : `left: ${ripple$$1.x}px; top: ${ripple$$1.y}px;`
                    })),
                    index("button", attrs, pad)
                );
            })
        )
    }
};

var css$6 = {
    "overlay": "mc6a145ad9_overlay"
};

var overlay$$1 = {
    view : (vnode) =>
        index("div", { class : css$6.overlay }, vnode.children)
};

var css$7 = {
    "button": "mc0023079d_button"
};

var button$2 = {
    view : (vnode) =>
        index("button",
            Object.assign({
                    class : css$7.button
                },
                vnode.attrs.attrs
            ),
            (vnode.attrs.text || "")
                .split("")
                .map((letter) => /\S/.test(letter) ? index("i", letter) : letter)
        )
};

var intro$$1 = {
    view : (vnode) =>
        index(overlay$$1,
            index(logo$$1),
            index(button$2, {
                attrs : {
                    onclick : () => {
                        vnode.attrs.state.newGame = true;
                    },
                    oncreate : (vnode) => {
                        window.addEventListener("keydown", (e) => {
                            if(e.keyCode !== 32) {
                                return;
                            }

                            vnode.dom.dispatchEvent(new MouseEvent("click"));
                        }, { once : true });
                    }
                },
                text : "play"
            })
        )
};

var lost = {
    view : (vnode) => {
        let state = vnode.attrs.state;

        return index(overlay$$1, vnode.attrs.state,
            index(button$2, {
                attrs : {
                    onclick : (vnode) => {
                        state.newGame = true;
                    }
                },
                text : "play again?"
            })
        )
    }
};

var scenes = {
    intro : {
        view : (vnode) =>
            // m(layout, vnode.attrs, [
            //     m(pads, vnode.attrs),
                index(intro$$1, vnode.attrs)
            // ])
    },
    game : {
        view : (vnode) =>
            index(layout$$1, vnode.attrs, [
                index(pads$1, vnode.attrs)
            ])
    },
    lost : {
        view : (vnode) =>
            index(layout$$1, vnode.attrs, [
                index(pads$1, vnode.attrs),
                index(lost, vnode.attrs)
            ])
    }
};

function GameState() {
    this.newGame   = true;
    this.lost      = false;
    this.pattern   = [];
    this.padsCount = 4;
    this.playback  = true;
    this.userIdx   = 0;
    this.userTimer = {
        cur   : 0,
        limit : 800
    };
    this.speed     = 5;
    // this.gameType = "rapidPattern";
}

GameState.prototype = {
    update : function(delta) {
        if(this.lost) {
            this.lost = true;

            return;
        }

        if(this.newGame) {
            this.newGame = false;
            this.updatePattern();
        }

        if(this.playback) {
            this.playSteps(delta);
        } else {
            this.updateUserTimer(delta);
        }
    },

    addToPattern : function(num) {
        num = num || 1;

        for(let i = 0; i < num; i++) {
            this.pattern.push(Math.floor(this.padsCount * Math.random()) + 1);
        }
    },

    updatePattern : function() {
        switch(this.gameType) {
            case "rapidPattern" :
                this.pattern = [];
                this.addToPattern(5);
                break;

            default :
                this.addToPattern();
        }
    },

    userPlay : function(pad) {
        this.resetUserTimer();
        // clicked wrong pad
        if(this.pattern[this.userIdx] !== pad) {
            this.lost = true;

            return;
        }

        this.userIdx++;

        // user turn over
        if(this.userIdx === this.pattern.length) {
            this.updatePattern();

            this.userIdx = 0;
            this.playback = true;
        }
    },

    updateUserTimer : function(delta) {
        this.userTimer.cur += delta;

        if(this.userTimer.cur > this.userTimer.limit) {
            this.lost = true;
            return;
        }
    },

    resetUserTimer : function() {
        this.userTimer.cur = 0;
    },

    playSteps : function(delta) {
        let period = 1000 / this.speed,
            delay  = period / 2;

        // first light
        if(!this.lit) {
            this.lit = {
                idx : 0,
                dur : 0,
                del : 300
            };

            return;
        }

        this.lit.del -= delta;

        if(this.lit.del > 0) {
            return;
        }

        this.lit.dur += delta;

        if(this.lit.dur >= delay) {
            this.alight = this.pattern[this.lit.idx];
        } else {
            this.alight = 0;
        }

        if(this.lit.dur >= period) {
            this.lit.idx++;
            this.lit.dur = 0;

            // end of lights
            if(this.lit.idx === this.pattern.length) {
                delete this.lit;
                this.alight = 0;
                this.playback = false;
            }
        }
    }
};

const debug = false;

let state$1 = {
    scenes : scenes,
    ui     : {
        update : () => null
    },
    keyMappings : {
        103 : 0,
        105 : 1,
        97  : 2,
        99  : 3
    }
};

state$1.scene = state$1.scenes.intro;

const comp = {
        view : () => [
            debug ? index("div", { class : css.ticker }, state$1.ticker) : null,
            index(state$1.scene, { state : state$1 })
        ]
    };
const update = function(delta) {
        // debug
        state$1.ticker = debug ? Math.floor(Date.now()/1000) : 0;

        // for ripples etc
        state$1.ui.update(delta);

        // not a new game and no gameState
        if(!state$1.newGame && !state$1.gameState) {
            return;
        }

        // first game or start new game
        if(state$1.newGame || (state$1.gameState && state$1.gameState.newGame)) {
            state$1.newGame = false;
            state$1.scene = state$1.scenes.game;

            state$1.gameState = new GameState();
        }

        // in game
        if(state$1.gameState) {
            // but lost
            if(state$1.gameState.lost) {
                state$1.scene = state$1.scenes.lost;
                return;
            }

            state$1.gameState.update(delta);
        }
    };

index.mount(document.body, comp);

mainloop_min.setUpdate(update).setDraw(index.redraw).start();

window.ML = mainloop_min;
window.state = state$1;

// Stop/start processing with focus
// assuming perf wins without profiling :+1:
// window.addEventListener("blur", () => {
//     MainLoop.stop();
// })

// window.addEventListener("focus", () => {
//     MainLoop.start();
// })
