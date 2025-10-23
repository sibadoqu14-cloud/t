import {
  require_react_dom
} from "./chunk-HCGKX5ED.js";
import {
  require_react
} from "./chunk-WNPTCGAH.js";
import {
  __commonJS,
  __toESM
} from "./chunk-5WRI5ZAA.js";

// node_modules/lodash/isObject.js
var require_isObject = __commonJS({
  "node_modules/lodash/isObject.js"(exports, module) {
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    module.exports = isObject;
  }
});

// node_modules/lodash/_freeGlobal.js
var require_freeGlobal = __commonJS({
  "node_modules/lodash/_freeGlobal.js"(exports, module) {
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    module.exports = freeGlobal;
  }
});

// node_modules/lodash/_root.js
var require_root = __commonJS({
  "node_modules/lodash/_root.js"(exports, module) {
    var freeGlobal = require_freeGlobal();
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    module.exports = root;
  }
});

// node_modules/lodash/now.js
var require_now = __commonJS({
  "node_modules/lodash/now.js"(exports, module) {
    var root = require_root();
    var now = function() {
      return root.Date.now();
    };
    module.exports = now;
  }
});

// node_modules/lodash/_trimmedEndIndex.js
var require_trimmedEndIndex = __commonJS({
  "node_modules/lodash/_trimmedEndIndex.js"(exports, module) {
    var reWhitespace = /\s/;
    function trimmedEndIndex(string) {
      var index = string.length;
      while (index-- && reWhitespace.test(string.charAt(index))) {
      }
      return index;
    }
    module.exports = trimmedEndIndex;
  }
});

// node_modules/lodash/_baseTrim.js
var require_baseTrim = __commonJS({
  "node_modules/lodash/_baseTrim.js"(exports, module) {
    var trimmedEndIndex = require_trimmedEndIndex();
    var reTrimStart = /^\s+/;
    function baseTrim(string) {
      return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
    }
    module.exports = baseTrim;
  }
});

// node_modules/lodash/_Symbol.js
var require_Symbol = __commonJS({
  "node_modules/lodash/_Symbol.js"(exports, module) {
    var root = require_root();
    var Symbol = root.Symbol;
    module.exports = Symbol;
  }
});

// node_modules/lodash/_getRawTag.js
var require_getRawTag = __commonJS({
  "node_modules/lodash/_getRawTag.js"(exports, module) {
    var Symbol = require_Symbol();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var nativeObjectToString = objectProto.toString;
    var symToStringTag = Symbol ? Symbol.toStringTag : void 0;
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = true;
      } catch (e) {
      }
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
  }
});

// node_modules/lodash/_objectToString.js
var require_objectToString = __commonJS({
  "node_modules/lodash/_objectToString.js"(exports, module) {
    var objectProto = Object.prototype;
    var nativeObjectToString = objectProto.toString;
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    module.exports = objectToString;
  }
});

// node_modules/lodash/_baseGetTag.js
var require_baseGetTag = __commonJS({
  "node_modules/lodash/_baseGetTag.js"(exports, module) {
    var Symbol = require_Symbol();
    var getRawTag = require_getRawTag();
    var objectToString = require_objectToString();
    var nullTag = "[object Null]";
    var undefinedTag = "[object Undefined]";
    var symToStringTag = Symbol ? Symbol.toStringTag : void 0;
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    module.exports = baseGetTag;
  }
});

// node_modules/lodash/isObjectLike.js
var require_isObjectLike = __commonJS({
  "node_modules/lodash/isObjectLike.js"(exports, module) {
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    module.exports = isObjectLike;
  }
});

// node_modules/lodash/isSymbol.js
var require_isSymbol = __commonJS({
  "node_modules/lodash/isSymbol.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var symbolTag = "[object Symbol]";
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
    }
    module.exports = isSymbol;
  }
});

// node_modules/lodash/toNumber.js
var require_toNumber = __commonJS({
  "node_modules/lodash/toNumber.js"(exports, module) {
    var baseTrim = require_baseTrim();
    var isObject = require_isObject();
    var isSymbol = require_isSymbol();
    var NAN = 0 / 0;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = baseTrim(value);
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    module.exports = toNumber;
  }
});

// node_modules/lodash/debounce.js
var require_debounce = __commonJS({
  "node_modules/lodash/debounce.js"(exports, module) {
    var isObject = require_isObject();
    var now = require_now();
    var toNumber = require_toNumber();
    var FUNC_ERROR_TEXT = "Expected a function";
    var nativeMax = Math.max;
    var nativeMin = Math.min;
    function debounce2(func, wait, options) {
      var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = toNumber(wait) || 0;
      if (isObject(options)) {
        leading = !!options.leading;
        maxing = "maxWait" in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = "trailing" in options ? !!options.trailing : trailing;
      }
      function invokeFunc(time) {
        var args = lastArgs, thisArg = lastThis;
        lastArgs = lastThis = void 0;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }
      function leadingEdge(time) {
        lastInvokeTime = time;
        timerId = setTimeout(timerExpired, wait);
        return leading ? invokeFunc(time) : result;
      }
      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
        return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
      }
      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
        return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
      }
      function timerExpired() {
        var time = now();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        timerId = setTimeout(timerExpired, remainingWait(time));
      }
      function trailingEdge(time) {
        timerId = void 0;
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = void 0;
        return result;
      }
      function cancel() {
        if (timerId !== void 0) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = void 0;
      }
      function flush() {
        return timerId === void 0 ? result : trailingEdge(now());
      }
      function debounced() {
        var time = now(), isInvoking = shouldInvoke(time);
        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;
        if (isInvoking) {
          if (timerId === void 0) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            clearTimeout(timerId);
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === void 0) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }
    module.exports = debounce2;
  }
});

// node_modules/lodash/throttle.js
var require_throttle = __commonJS({
  "node_modules/lodash/throttle.js"(exports, module) {
    var debounce2 = require_debounce();
    var isObject = require_isObject();
    var FUNC_ERROR_TEXT = "Expected a function";
    function throttle2(func, wait, options) {
      var leading = true, trailing = true;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      if (isObject(options)) {
        leading = "leading" in options ? !!options.leading : leading;
        trailing = "trailing" in options ? !!options.trailing : trailing;
      }
      return debounce2(func, wait, {
        "leading": leading,
        "maxWait": wait,
        "trailing": trailing
      });
    }
    module.exports = throttle2;
  }
});

// node_modules/react-resize-detector/build/index.esm.js
var import_react = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());
var import_debounce = __toESM(require_debounce());
var import_throttle = __toESM(require_throttle());
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
var patchResizeCallback = function(resizeCallback, refreshMode, refreshRate, refreshOptions) {
  switch (refreshMode) {
    case "debounce":
      return (0, import_debounce.default)(resizeCallback, refreshRate, refreshOptions);
    case "throttle":
      return (0, import_throttle.default)(resizeCallback, refreshRate, refreshOptions);
    default:
      return resizeCallback;
  }
};
var isFunction = function(fn) {
  return typeof fn === "function";
};
var isSSR = function() {
  return typeof window === "undefined";
};
var isDOMElement = function(element) {
  return element instanceof Element || element instanceof HTMLDocument;
};
var ResizeDetector = (
  /** @class */
  function(_super) {
    __extends(ResizeDetector2, _super);
    function ResizeDetector2(props) {
      var _this = _super.call(this, props) || this;
      _this.cancelHandler = function() {
        if (_this.resizeHandler && _this.resizeHandler.cancel) {
          _this.resizeHandler.cancel();
          _this.resizeHandler = null;
        }
      };
      _this.attachObserver = function() {
        var _a2 = _this.props, targetRef = _a2.targetRef, observerOptions = _a2.observerOptions;
        if (isSSR()) {
          return;
        }
        if (targetRef && targetRef.current) {
          _this.targetRef.current = targetRef.current;
        }
        var element = _this.getElement();
        if (!element) {
          return;
        }
        if (_this.observableElement && _this.observableElement === element) {
          return;
        }
        _this.observableElement = element;
        _this.resizeObserver.observe(element, observerOptions);
      };
      _this.getElement = function() {
        var _a2 = _this.props, querySelector = _a2.querySelector, targetDomEl = _a2.targetDomEl;
        if (isSSR())
          return null;
        if (querySelector)
          return document.querySelector(querySelector);
        if (targetDomEl && isDOMElement(targetDomEl))
          return targetDomEl;
        if (_this.targetRef && isDOMElement(_this.targetRef.current))
          return _this.targetRef.current;
        var currentElement = (0, import_react_dom.findDOMNode)(_this);
        if (!currentElement)
          return null;
        var renderType = _this.getRenderType();
        switch (renderType) {
          case "renderProp":
            return currentElement;
          case "childFunction":
            return currentElement;
          case "child":
            return currentElement;
          case "childArray":
            return currentElement;
          default:
            return currentElement.parentElement;
        }
      };
      _this.createResizeHandler = function(entries) {
        var _a2 = _this.props, _b = _a2.handleWidth, handleWidth = _b === void 0 ? true : _b, _c = _a2.handleHeight, handleHeight = _c === void 0 ? true : _c, onResize = _a2.onResize;
        if (!handleWidth && !handleHeight)
          return;
        var notifyResize = function(_a3) {
          var width = _a3.width, height = _a3.height;
          if (_this.state.width === width && _this.state.height === height) {
            return;
          }
          if (_this.state.width === width && !handleHeight || _this.state.height === height && !handleWidth) {
            return;
          }
          onResize === null || onResize === void 0 ? void 0 : onResize(width, height);
          _this.setState({ width, height });
        };
        entries.forEach(function(entry) {
          var _a3 = entry && entry.contentRect || {}, width = _a3.width, height = _a3.height;
          var shouldSetSize = !_this.skipOnMount && !isSSR();
          if (shouldSetSize) {
            notifyResize({ width, height });
          }
          _this.skipOnMount = false;
        });
      };
      _this.getRenderType = function() {
        var _a2 = _this.props, render = _a2.render, children = _a2.children;
        if (isFunction(render)) {
          return "renderProp";
        }
        if (isFunction(children)) {
          return "childFunction";
        }
        if ((0, import_react.isValidElement)(children)) {
          return "child";
        }
        if (Array.isArray(children)) {
          return "childArray";
        }
        return "parent";
      };
      var skipOnMount = props.skipOnMount, refreshMode = props.refreshMode, _a = props.refreshRate, refreshRate = _a === void 0 ? 1e3 : _a, refreshOptions = props.refreshOptions;
      _this.state = {
        width: void 0,
        height: void 0
      };
      _this.sizeRef = {
        current: _this.state
      };
      _this.skipOnMount = skipOnMount;
      _this.targetRef = (0, import_react.createRef)();
      _this.observableElement = null;
      if (isSSR()) {
        return _this;
      }
      _this.resizeHandler = patchResizeCallback(_this.createResizeHandler, refreshMode, refreshRate, refreshOptions);
      _this.resizeObserver = new window.ResizeObserver(_this.resizeHandler);
      return _this;
    }
    ResizeDetector2.prototype.componentDidMount = function() {
      this.attachObserver();
    };
    ResizeDetector2.prototype.componentDidUpdate = function() {
      this.attachObserver();
      this.sizeRef.current = this.state;
    };
    ResizeDetector2.prototype.componentWillUnmount = function() {
      if (isSSR()) {
        return;
      }
      this.observableElement = null;
      this.resizeObserver.disconnect();
      this.cancelHandler();
    };
    ResizeDetector2.prototype.render = function() {
      var _a = this.props, render = _a.render, children = _a.children, _b = _a.nodeType, WrapperTag = _b === void 0 ? "div" : _b;
      var _c = this.state, width = _c.width, height = _c.height;
      var childProps = { width, height, targetRef: this.targetRef };
      var renderType = this.getRenderType();
      switch (renderType) {
        case "renderProp":
          return render === null || render === void 0 ? void 0 : render(childProps);
        case "childFunction": {
          var childFunction = children;
          return childFunction === null || childFunction === void 0 ? void 0 : childFunction(childProps);
        }
        case "child": {
          var child = children;
          if (child.type && typeof child.type === "string") {
            childProps.targetRef;
            var nativeProps = __rest(childProps, ["targetRef"]);
            return (0, import_react.cloneElement)(child, nativeProps);
          }
          return (0, import_react.cloneElement)(child, childProps);
        }
        case "childArray": {
          var childArray = children;
          return childArray.map(function(el) {
            return !!el && (0, import_react.cloneElement)(el, childProps);
          });
        }
        default:
          return import_react.default.createElement(WrapperTag, null);
      }
    };
    return ResizeDetector2;
  }(import_react.PureComponent)
);
function withResizeDetector(ComponentInner, options) {
  if (options === void 0) {
    options = {};
  }
  var ResizeDetectorHOC = (
    /** @class */
    function(_super) {
      __extends(ResizeDetectorHOC2, _super);
      function ResizeDetectorHOC2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ref = (0, import_react.createRef)();
        return _this;
      }
      ResizeDetectorHOC2.prototype.render = function() {
        var _a = this.props, forwardedRef = _a.forwardedRef, rest = __rest(_a, ["forwardedRef"]);
        var targetRef = forwardedRef !== null && forwardedRef !== void 0 ? forwardedRef : this.ref;
        return import_react.default.createElement(
          ResizeDetector,
          __assign({}, options, { targetRef }),
          import_react.default.createElement(ComponentInner, __assign({ targetRef }, rest))
        );
      };
      return ResizeDetectorHOC2;
    }(import_react.Component)
  );
  function forwardRefWrapper(props, ref) {
    return import_react.default.createElement(ResizeDetectorHOC, __assign({}, props, { forwardedRef: ref }));
  }
  var name = ComponentInner.displayName || ComponentInner.name;
  forwardRefWrapper.displayName = "withResizeDetector(".concat(name, ")");
  return (0, import_react.forwardRef)(forwardRefWrapper);
}
function useResizeDetector(_a) {
  var _b = _a === void 0 ? {} : _a, _c = _b.skipOnMount, skipOnMount = _c === void 0 ? false : _c, refreshMode = _b.refreshMode, _d = _b.refreshRate, refreshRate = _d === void 0 ? 1e3 : _d, refreshOptions = _b.refreshOptions, _e = _b.handleWidth, handleWidth = _e === void 0 ? true : _e, _f = _b.handleHeight, handleHeight = _f === void 0 ? true : _f, targetRef = _b.targetRef, observerOptions = _b.observerOptions, onResize = _b.onResize;
  var skipResize = (0, import_react.useRef)(skipOnMount);
  var _g = (0, import_react.useState)({
    width: void 0,
    height: void 0
  }), size = _g[0], setSize = _g[1];
  var _h = (0, import_react.useState)((targetRef === null || targetRef === void 0 ? void 0 : targetRef.current) || null), refElement = _h[0], setRefElement = _h[1];
  if (targetRef) {
    setTimeout(function() {
      if (targetRef.current !== refElement) {
        setRefElement(targetRef.current);
      }
    }, 0);
  }
  var onRefChange = (0, import_react.useCallback)(function(node) {
    if (node !== refElement) {
      setRefElement(node);
    }
  }, [refElement]);
  onRefChange.current = refElement;
  var shouldSetSize = (0, import_react.useCallback)(function(prevSize, nextSize) {
    if (prevSize.width === nextSize.width && prevSize.height === nextSize.height) {
      return false;
    }
    if (prevSize.width === nextSize.width && !handleHeight || prevSize.height === nextSize.height && !handleWidth) {
      return false;
    }
    return true;
  }, [handleWidth, handleHeight]);
  var resizeCallback = (0, import_react.useCallback)(function(entries) {
    if (!handleWidth && !handleHeight)
      return;
    if (skipResize.current) {
      skipResize.current = false;
      return;
    }
    entries.forEach(function(entry) {
      var _a2 = (entry === null || entry === void 0 ? void 0 : entry.contentRect) || {}, width = _a2.width, height = _a2.height;
      setSize(function(prevSize) {
        if (!shouldSetSize(prevSize, { width, height }))
          return prevSize;
        return { width, height };
      });
    });
  }, [handleWidth, handleHeight, skipResize, shouldSetSize]);
  var resizeHandler = (0, import_react.useCallback)(patchResizeCallback(resizeCallback, refreshMode, refreshRate, refreshOptions), [
    resizeCallback,
    refreshMode,
    refreshRate,
    refreshOptions
  ]);
  (0, import_react.useEffect)(function() {
    var resizeObserver;
    if (refElement) {
      resizeObserver = new window.ResizeObserver(resizeHandler);
      resizeObserver.observe(refElement, observerOptions);
    } else {
      if (size.width || size.height) {
        setSize({ width: void 0, height: void 0 });
      }
    }
    return function() {
      var _a2, _b2, _c2;
      (_a2 = resizeObserver === null || resizeObserver === void 0 ? void 0 : resizeObserver.disconnect) === null || _a2 === void 0 ? void 0 : _a2.call(resizeObserver);
      (_c2 = (_b2 = resizeHandler).cancel) === null || _c2 === void 0 ? void 0 : _c2.call(_b2);
    };
  }, [resizeHandler, refElement]);
  (0, import_react.useEffect)(function() {
    onResize === null || onResize === void 0 ? void 0 : onResize(size.width, size.height);
  }, [size]);
  return __assign({ ref: onRefChange }, size);
}
export {
  ResizeDetector as default,
  useResizeDetector,
  withResizeDetector
};
//# sourceMappingURL=react-resize-detector.js.map
