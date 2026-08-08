var p7 = Object.create;
var {
  getPrototypeOf: X7,
  defineProperty: Qr,
  getOwnPropertyNames: g7,
} = Object;
var m7 = Object.prototype.hasOwnProperty;
var Fe = (e, n, f) => {
  f = e != null ? p7(X7(e)) : {};
  let t =
    n || !e || !e.__esModule
      ? Qr(f, "default", { value: e, enumerable: !0 })
      : f;
  for (let r of g7(e))
    if (!m7.call(t, r)) Qr(t, r, { get: () => e[r], enumerable: !0 });
  return t;
};
var Nt = (e, n) => () => (n || e((n = { exports: {} }).exports, n), n.exports);
var H7 = (e, n) => {
  for (var f in n)
    Qr(e, f, {
      get: n[f],
      enumerable: !0,
      configurable: !0,
      set: (t) => (n[f] = () => t),
    });
};
var y7 = (e, n) => () => (e && (n = e((e = 0))), n);
var wn = Nt((W7) => {
  var xf = Symbol.for("react.element"),
    h7 = Symbol.for("react.portal"),
    C7 = Symbol.for("react.fragment"),
    w7 = Symbol.for("react.strict_mode"),
    x7 = Symbol.for("react.profiler"),
    T7 = Symbol.for("react.provider"),
    N7 = Symbol.for("react.context"),
    A7 = Symbol.for("react.forward_ref"),
    L7 = Symbol.for("react.suspense"),
    I7 = Symbol.for("react.memo"),
    b7 = Symbol.for("react.lazy"),
    hv = Symbol.iterator;
  function D7(e) {
    if (e === null || typeof e !== "object") return null;
    return (
      (e = (hv && e[hv]) || e["@@iterator"]),
      typeof e === "function" ? e : null
    );
  }
  var xv = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    Tv = Object.assign,
    Nv = {};
  function Kn(e, n, f) {
    ((this.props = e),
      (this.context = n),
      (this.refs = Nv),
      (this.updater = f || xv));
  }
  Kn.prototype.isReactComponent = {};
  Kn.prototype.setState = function (e, n) {
    if (typeof e !== "object" && typeof e !== "function" && e != null)
      throw Error(
        "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
      );
    this.updater.enqueueSetState(this, e, n, "setState");
  };
  Kn.prototype.forceUpdate = function (e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate");
  };
  function Av() {}
  Av.prototype = Kn.prototype;
  function $r(e, n, f) {
    ((this.props = e),
      (this.context = n),
      (this.refs = Nv),
      (this.updater = f || xv));
  }
  var el = ($r.prototype = new Av());
  el.constructor = $r;
  Tv(el, Kn.prototype);
  el.isPureReactComponent = !0;
  var Cv = Array.isArray,
    Lv = Object.prototype.hasOwnProperty,
    nl = { current: null },
    Iv = { key: !0, ref: !0, __self: !0, __source: !0 };
  function bv(e, n, f) {
    var t,
      r = {},
      l = null,
      u = null;
    if (n != null)
      for (t in (n.ref !== void 0 && (u = n.ref),
      n.key !== void 0 && (l = "" + n.key),
      n))
        Lv.call(n, t) && !Iv.hasOwnProperty(t) && (r[t] = n[t]);
    var v = arguments.length - 2;
    if (v === 1) r.children = f;
    else if (1 < v) {
      for (var i = Array(v), d = 0; d < v; d++) i[d] = arguments[d + 2];
      r.children = i;
    }
    if (e && e.defaultProps)
      for (t in ((v = e.defaultProps), v)) r[t] === void 0 && (r[t] = v[t]);
    return {
      $$typeof: xf,
      type: e,
      key: l,
      ref: u,
      props: r,
      _owner: nl.current,
    };
  }
  function O7(e, n) {
    return {
      $$typeof: xf,
      type: e.type,
      key: n,
      ref: e.ref,
      props: e.props,
      _owner: e._owner,
    };
  }
  function fl(e) {
    return typeof e === "object" && e !== null && e.$$typeof === xf;
  }
  function S7(e) {
    var n = { "=": "=0", ":": "=2" };
    return (
      "$" +
      e.replace(/[=:]/g, function (f) {
        return n[f];
      })
    );
  }
  var wv = /\/+/g;
  function _r(e, n) {
    return typeof e === "object" && e !== null && e.key != null
      ? S7("" + e.key)
      : n.toString(36);
  }
  function Lt(e, n, f, t, r) {
    var l = typeof e;
    if (l === "undefined" || l === "boolean") e = null;
    var u = !1;
    if (e === null) u = !0;
    else
      switch (l) {
        case "string":
        case "number":
          u = !0;
          break;
        case "object":
          switch (e.$$typeof) {
            case xf:
            case h7:
              u = !0;
          }
      }
    if (u)
      return (
        (u = e),
        (r = r(u)),
        (e = t === "" ? "." + _r(u, 0) : t),
        Cv(r)
          ? ((f = ""),
            e != null && (f = e.replace(wv, "$&/") + "/"),
            Lt(r, n, f, "", function (d) {
              return d;
            }))
          : r != null &&
            (fl(r) &&
              (r = O7(
                r,
                f +
                  (!r.key || (u && u.key === r.key)
                    ? ""
                    : ("" + r.key).replace(wv, "$&/") + "/") +
                  e,
              )),
            n.push(r)),
        1
      );
    if (((u = 0), (t = t === "" ? "." : t + ":"), Cv(e)))
      for (var v = 0; v < e.length; v++) {
        l = e[v];
        var i = t + _r(l, v);
        u += Lt(l, n, f, i, r);
      }
    else if (((i = D7(e)), typeof i === "function"))
      for (e = i.call(e), v = 0; !(l = e.next()).done; )
        ((l = l.value), (i = t + _r(l, v++)), (u += Lt(l, n, f, i, r)));
    else if (l === "object")
      throw (
        (n = String(e)),
        Error(
          "Objects are not valid as a React child (found: " +
            (n === "[object Object]"
              ? "object with keys {" + Object.keys(e).join(", ") + "}"
              : n) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    return u;
  }
  function At(e, n, f) {
    if (e == null) return e;
    var t = [],
      r = 0;
    return (
      Lt(e, t, "", "", function (l) {
        return n.call(f, l, r++);
      }),
      t
    );
  }
  function j7(e) {
    if (e._status === -1) {
      var n = e._result;
      ((n = n()),
        n.then(
          function (f) {
            if (e._status === 0 || e._status === -1)
              ((e._status = 1), (e._result = f));
          },
          function (f) {
            if (e._status === 0 || e._status === -1)
              ((e._status = 2), (e._result = f));
          },
        ),
        e._status === -1 && ((e._status = 0), (e._result = n)));
    }
    if (e._status === 1) return e._result.default;
    throw e._result;
  }
  var te = { current: null },
    It = { transition: null },
    Z7 = {
      ReactCurrentDispatcher: te,
      ReactCurrentBatchConfig: It,
      ReactCurrentOwner: nl,
    };
  function Dv() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  W7.Children = {
    map: At,
    forEach: function (e, n, f) {
      At(
        e,
        function () {
          n.apply(this, arguments);
        },
        f,
      );
    },
    count: function (e) {
      var n = 0;
      return (
        At(e, function () {
          n++;
        }),
        n
      );
    },
    toArray: function (e) {
      return (
        At(e, function (n) {
          return n;
        }) || []
      );
    },
    only: function (e) {
      if (!fl(e))
        throw Error(
          "React.Children.only expected to receive a single React element child.",
        );
      return e;
    },
  };
  W7.Component = Kn;
  W7.Fragment = C7;
  W7.Profiler = x7;
  W7.PureComponent = $r;
  W7.StrictMode = w7;
  W7.Suspense = L7;
  W7.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Z7;
  W7.act = Dv;
  W7.cloneElement = function (e, n, f) {
    if (e === null || e === void 0)
      throw Error(
        "React.cloneElement(...): The argument must be a React element, but you passed " +
          e +
          ".",
      );
    var t = Tv({}, e.props),
      r = e.key,
      l = e.ref,
      u = e._owner;
    if (n != null) {
      if (
        (n.ref !== void 0 && ((l = n.ref), (u = nl.current)),
        n.key !== void 0 && (r = "" + n.key),
        e.type && e.type.defaultProps)
      )
        var v = e.type.defaultProps;
      for (i in n)
        Lv.call(n, i) &&
          !Iv.hasOwnProperty(i) &&
          (t[i] = n[i] === void 0 && v !== void 0 ? v[i] : n[i]);
    }
    var i = arguments.length - 2;
    if (i === 1) t.children = f;
    else if (1 < i) {
      v = Array(i);
      for (var d = 0; d < i; d++) v[d] = arguments[d + 2];
      t.children = v;
    }
    return { $$typeof: xf, type: e.type, key: r, ref: l, props: t, _owner: u };
  };
  W7.createContext = function (e) {
    return (
      (e = {
        $$typeof: N7,
        _currentValue: e,
        _currentValue2: e,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null,
      }),
      (e.Provider = { $$typeof: T7, _context: e }),
      (e.Consumer = e)
    );
  };
  W7.createElement = bv;
  W7.createFactory = function (e) {
    var n = bv.bind(null, e);
    return ((n.type = e), n);
  };
  W7.createRef = function () {
    return { current: null };
  };
  W7.forwardRef = function (e) {
    return { $$typeof: A7, render: e };
  };
  W7.isValidElement = fl;
  W7.lazy = function (e) {
    return { $$typeof: b7, _payload: { _status: -1, _result: e }, _init: j7 };
  };
  W7.memo = function (e, n) {
    return { $$typeof: I7, type: e, compare: n === void 0 ? null : n };
  };
  W7.startTransition = function (e) {
    var n = It.transition;
    It.transition = {};
    try {
      e();
    } finally {
      It.transition = n;
    }
  };
  W7.unstable_act = Dv;
  W7.useCallback = function (e, n) {
    return te.current.useCallback(e, n);
  };
  W7.useContext = function (e) {
    return te.current.useContext(e);
  };
  W7.useDebugValue = function () {};
  W7.useDeferredValue = function (e) {
    return te.current.useDeferredValue(e);
  };
  W7.useEffect = function (e, n) {
    return te.current.useEffect(e, n);
  };
  W7.useId = function () {
    return te.current.useId();
  };
  W7.useImperativeHandle = function (e, n, f) {
    return te.current.useImperativeHandle(e, n, f);
  };
  W7.useInsertionEffect = function (e, n) {
    return te.current.useInsertionEffect(e, n);
  };
  W7.useLayoutEffect = function (e, n) {
    return te.current.useLayoutEffect(e, n);
  };
  W7.useMemo = function (e, n) {
    return te.current.useMemo(e, n);
  };
  W7.useReducer = function (e, n, f) {
    return te.current.useReducer(e, n, f);
  };
  W7.useRef = function (e) {
    return te.current.useRef(e);
  };
  W7.useState = function (e) {
    return te.current.useState(e);
  };
  W7.useSyncExternalStore = function (e, n, f) {
    return te.current.useSyncExternalStore(e, n, f);
  };
  W7.useTransition = function () {
    return te.current.useTransition();
  };
  W7.version = "18.3.1";
});
var Vv = Nt((yP) => {
  function rl(e, n) {
    var f = e.length;
    e.push(n);
    e: for (; 0 < f; ) {
      var t = (f - 1) >>> 1,
        r = e[t];
      if (0 < bt(r, n)) ((e[t] = n), (e[f] = r), (f = t));
      else break e;
    }
  }
  function Te(e) {
    return e.length === 0 ? null : e[0];
  }
  function jt(e) {
    if (e.length === 0) return null;
    var n = e[0],
      f = e.pop();
    if (f !== n) {
      e[0] = f;
      e: for (var t = 0, r = e.length, l = r >>> 1; t < l; ) {
        var u = 2 * (t + 1) - 1,
          v = e[u],
          i = u + 1,
          d = e[i];
        if (0 > bt(v, f))
          i < r && 0 > bt(d, v)
            ? ((e[t] = d), (e[i] = f), (t = i))
            : ((e[t] = v), (e[u] = f), (t = u));
        else if (i < r && 0 > bt(d, f)) ((e[t] = d), (e[i] = f), (t = i));
        else break e;
      }
    }
    return n;
  }
  function bt(e, n) {
    var f = e.sortIndex - n.sortIndex;
    return f !== 0 ? f : e.id - n.id;
  }
  if (typeof performance === "object" && typeof performance.now === "function")
    ((ll = performance),
      (yP.unstable_now = function () {
        return ll.now();
      }));
  else
    ((Dt = Date),
      (ul = Dt.now()),
      (yP.unstable_now = function () {
        return Dt.now() - ul;
      }));
  var ll,
    Dt,
    ul,
    je = [],
    nn = [],
    HP = 1,
    ge = null,
    _ = 3,
    Zt = !1,
    xn = !1,
    Nf = !1,
    Sv = typeof setTimeout === "function" ? setTimeout : null,
    jv = typeof clearTimeout === "function" ? clearTimeout : null,
    Ov = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function vl(e) {
    for (var n = Te(nn); n !== null; ) {
      if (n.callback === null) jt(nn);
      else if (n.startTime <= e)
        (jt(nn), (n.sortIndex = n.expirationTime), rl(je, n));
      else break;
      n = Te(nn);
    }
  }
  function ol(e) {
    if (((Nf = !1), vl(e), !xn))
      if (Te(je) !== null) ((xn = !0), al(Pl));
      else {
        var n = Te(nn);
        n !== null && dl(ol, n.startTime - e);
      }
  }
  function Pl(e, n) {
    ((xn = !1), Nf && ((Nf = !1), jv(Af), (Af = -1)), (Zt = !0));
    var f = _;
    try {
      vl(n);
      for (
        ge = Te(je);
        ge !== null && (!(ge.expirationTime > n) || (e && !Jv()));

      ) {
        var t = ge.callback;
        if (typeof t === "function") {
          ((ge.callback = null), (_ = ge.priorityLevel));
          var r = t(ge.expirationTime <= n);
          ((n = yP.unstable_now()),
            typeof r === "function"
              ? (ge.callback = r)
              : ge === Te(je) && jt(je),
            vl(n));
        } else jt(je);
        ge = Te(je);
      }
      if (ge !== null) var l = !0;
      else {
        var u = Te(nn);
        (u !== null && dl(ol, u.startTime - n), (l = !1));
      }
      return l;
    } finally {
      ((ge = null), (_ = f), (Zt = !1));
    }
  }
  var Wt = !1,
    Ot = null,
    Af = -1,
    Zv = 5,
    Wv = -1;
  function Jv() {
    return yP.unstable_now() - Wv < Zv ? !1 : !0;
  }
  function tl() {
    if (Ot !== null) {
      var e = yP.unstable_now();
      Wv = e;
      var n = !0;
      try {
        n = Ot(!0, e);
      } finally {
        n ? Tf() : ((Wt = !1), (Ot = null));
      }
    } else Wt = !1;
  }
  var Tf;
  if (typeof Ov === "function")
    Tf = function () {
      Ov(tl);
    };
  else if (typeof MessageChannel < "u")
    ((St = new MessageChannel()),
      (il = St.port2),
      (St.port1.onmessage = tl),
      (Tf = function () {
        il.postMessage(null);
      }));
  else
    Tf = function () {
      Sv(tl, 0);
    };
  var St, il;
  function al(e) {
    ((Ot = e), Wt || ((Wt = !0), Tf()));
  }
  function dl(e, n) {
    Af = Sv(function () {
      e(yP.unstable_now());
    }, n);
  }
  yP.unstable_IdlePriority = 5;
  yP.unstable_ImmediatePriority = 1;
  yP.unstable_LowPriority = 4;
  yP.unstable_NormalPriority = 3;
  yP.unstable_Profiling = null;
  yP.unstable_UserBlockingPriority = 2;
  yP.unstable_cancelCallback = function (e) {
    e.callback = null;
  };
  yP.unstable_continueExecution = function () {
    xn || Zt || ((xn = !0), al(Pl));
  };
  yP.unstable_forceFrameRate = function (e) {
    0 > e || 125 < e
      ? console.error(
          "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
        )
      : (Zv = 0 < e ? Math.floor(1000 / e) : 5);
  };
  yP.unstable_getCurrentPriorityLevel = function () {
    return _;
  };
  yP.unstable_getFirstCallbackNode = function () {
    return Te(je);
  };
  yP.unstable_next = function (e) {
    switch (_) {
      case 1:
      case 2:
      case 3:
        var n = 3;
        break;
      default:
        n = _;
    }
    var f = _;
    _ = n;
    try {
      return e();
    } finally {
      _ = f;
    }
  };
  yP.unstable_pauseExecution = function () {};
  yP.unstable_requestPaint = function () {};
  yP.unstable_runWithPriority = function (e, n) {
    switch (e) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        e = 3;
    }
    var f = _;
    _ = e;
    try {
      return n();
    } finally {
      _ = f;
    }
  };
  yP.unstable_scheduleCallback = function (e, n, f) {
    var t = yP.unstable_now();
    switch (
      (typeof f === "object" && f !== null
        ? ((f = f.delay), (f = typeof f === "number" && 0 < f ? t + f : t))
        : (f = t),
      e)
    ) {
      case 1:
        var r = -1;
        break;
      case 2:
        r = 250;
        break;
      case 5:
        r = 1073741823;
        break;
      case 4:
        r = 1e4;
        break;
      default:
        r = 5000;
    }
    return (
      (r = f + r),
      (e = {
        id: HP++,
        callback: n,
        priorityLevel: e,
        startTime: f,
        expirationTime: r,
        sortIndex: -1,
      }),
      f > t
        ? ((e.sortIndex = f),
          rl(nn, e),
          Te(je) === null &&
            e === Te(nn) &&
            (Nf ? (jv(Af), (Af = -1)) : (Nf = !0), dl(ol, f - t)))
        : ((e.sortIndex = r), rl(je, e), xn || Zt || ((xn = !0), al(Pl))),
      e
    );
  };
  yP.unstable_shouldYield = Jv;
  yP.unstable_wrapCallback = function (e) {
    var n = _;
    return function () {
      var f = _;
      _ = n;
      try {
        return e.apply(this, arguments);
      } finally {
        _ = f;
      }
    };
  };
});
var gv = {};
H7(gv, {
  version: () => e7,
  unstable_renderSubtreeIntoContainer: () => $9,
  unstable_batchedUpdates: () => _9,
  unmountComponentAtNode: () => Q9,
  render: () => B9,
  hydrateRoot: () => U9,
  hydrate: () => G9,
  flushSync: () => M9,
  findDOMNode: () => E9,
  createRoot: () => K9,
  createPortal: () => Y9,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: () => R9,
});
function m(e) {
  for (
    var n = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, f = 1;
    f < arguments.length;
    f++
  )
    n += "&args[]=" + encodeURIComponent(arguments[f]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    n +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
function Vn(e, n) {
  (sf(e, n), sf(e + "Capture", n));
}
function sf(e, n) {
  $f[e] = n;
  for (e = 0; e < n.length; e++) Ki.add(n[e]);
}
function qP(e) {
  if (Sl.call(qv, e)) return !0;
  if (Sl.call(kv, e)) return !1;
  if (kP.test(e)) return (qv[e] = !0);
  return ((kv[e] = !0), !1);
}
function FP(e, n, f, t) {
  if (f !== null && f.type === 0) return !1;
  switch (typeof n) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      if (t) return !1;
      if (f !== null) return !f.acceptsBooleans;
      return (
        (e = e.toLowerCase().slice(0, 5)),
        e !== "data-" && e !== "aria-"
      );
    default:
      return !1;
  }
}
function RP(e, n, f, t) {
  if (n === null || typeof n > "u" || FP(e, n, f, t)) return !0;
  if (t) return !1;
  if (f !== null)
    switch (f.type) {
      case 3:
        return !n;
      case 4:
        return n === !1;
      case 5:
        return isNaN(n);
      case 6:
        return isNaN(n) || 1 > n;
    }
  return !1;
}
function ue(e, n, f, t, r, l, u) {
  ((this.acceptsBooleans = n === 2 || n === 3 || n === 4),
    (this.attributeName = t),
    (this.attributeNamespace = r),
    (this.mustUseProperty = f),
    (this.propertyName = e),
    (this.type = n),
    (this.sanitizeURL = l),
    (this.removeEmptyString = u));
}
function Lu(e) {
  return e[1].toUpperCase();
}
function Iu(e, n, f, t) {
  var r = Q.hasOwnProperty(n) ? Q[n] : null;
  if (
    r !== null
      ? r.type !== 0
      : t ||
        !(2 < n.length) ||
        (n[0] !== "o" && n[0] !== "O") ||
        (n[1] !== "n" && n[1] !== "N")
  )
    (RP(n, f, r, t) && (f = null),
      t || r === null
        ? qP(n) &&
          (f === null ? e.removeAttribute(n) : e.setAttribute(n, "" + f))
        : r.mustUseProperty
          ? (e[r.propertyName] = f === null ? (r.type === 3 ? !1 : "") : f)
          : ((n = r.attributeName),
            (t = r.attributeNamespace),
            f === null
              ? e.removeAttribute(n)
              : ((r = r.type),
                (f = r === 3 || (r === 4 && f === !0) ? "" : "" + f),
                t ? e.setAttributeNS(t, n, f) : e.setAttribute(n, f))));
}
function Lf(e) {
  if (e === null || typeof e !== "object") return null;
  return (
    (e = (Fv && e[Fv]) || e["@@iterator"]),
    typeof e === "function" ? e : null
  );
}
function Zf(e) {
  if (cl === void 0)
    try {
      throw Error();
    } catch (f) {
      var n = f.stack.trim().match(/\n( *(at )?)/);
      cl = (n && n[1]) || "";
    }
  return (
    `
` +
    cl +
    e
  );
}
function zl(e, n) {
  if (!e || sl) return "";
  sl = !0;
  var f = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (n)
      if (
        ((n = function () {
          throw Error();
        }),
        Object.defineProperty(n.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect === "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(n, []);
        } catch (d) {
          var t = d;
        }
        Reflect.construct(e, [], n);
      } else {
        try {
          n.call();
        } catch (d) {
          t = d;
        }
        e.call(n.prototype);
      }
    else {
      try {
        throw Error();
      } catch (d) {
        t = d;
      }
      e();
    }
  } catch (d) {
    if (d && t && typeof d.stack === "string") {
      for (
        var r = d.stack.split(`
`),
          l = t.stack.split(`
`),
          u = r.length - 1,
          v = l.length - 1;
        1 <= u && 0 <= v && r[u] !== l[v];

      )
        v--;
      for (; 1 <= u && 0 <= v; u--, v--)
        if (r[u] !== l[v]) {
          if (u !== 1 || v !== 1)
            do
              if ((u--, v--, 0 > v || r[u] !== l[v])) {
                var i =
                  `
` + r[u].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    i.includes("<anonymous>") &&
                    (i = i.replace("<anonymous>", e.displayName)),
                  i
                );
              }
            while (1 <= u && 0 <= v);
          break;
        }
    }
  } finally {
    ((sl = !1), (Error.prepareStackTrace = f));
  }
  return (e = e ? e.displayName || e.name : "") ? Zf(e) : "";
}
function YP(e) {
  switch (e.tag) {
    case 5:
      return Zf(e.type);
    case 16:
      return Zf("Lazy");
    case 13:
      return Zf("Suspense");
    case 19:
      return Zf("SuspenseList");
    case 0:
    case 2:
    case 15:
      return ((e = zl(e.type, !1)), e);
    case 11:
      return ((e = zl(e.type.render, !1)), e);
    case 1:
      return ((e = zl(e.type, !0)), e);
    default:
      return "";
  }
}
function Jl(e) {
  if (e == null) return null;
  if (typeof e === "function") return e.displayName || e.name || null;
  if (typeof e === "string") return e;
  switch (e) {
    case Bn:
      return "Fragment";
    case Un:
      return "Portal";
    case jl:
      return "Profiler";
    case bu:
      return "StrictMode";
    case Zl:
      return "Suspense";
    case Wl:
      return "SuspenseList";
  }
  if (typeof e === "object")
    switch (e.$$typeof) {
      case Mi:
        return (e.displayName || "Context") + ".Consumer";
      case Ei:
        return (e._context.displayName || "Context") + ".Provider";
      case Du:
        var n = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = n.displayName || n.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case Ou:
        return (
          (n = e.displayName || null),
          n !== null ? n : Jl(e.type) || "Memo"
        );
      case tn:
        ((n = e._payload), (e = e._init));
        try {
          return Jl(e(n));
        } catch (f) {}
    }
  return null;
}
function KP(e) {
  var n = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (n.displayName || "Context") + ".Consumer";
    case 10:
      return (n._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = n.render),
        (e = e.displayName || e.name || ""),
        n.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return n;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Jl(n);
    case 8:
      return n === bu ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof n === "function") return n.displayName || n.name || null;
      if (typeof n === "string") return n;
  }
  return null;
}
function gn(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Ui(e) {
  var n = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (n === "checkbox" || n === "radio")
  );
}
function EP(e) {
  var n = Ui(e) ? "checked" : "value",
    f = Object.getOwnPropertyDescriptor(e.constructor.prototype, n),
    t = "" + e[n];
  if (
    !e.hasOwnProperty(n) &&
    typeof f < "u" &&
    typeof f.get === "function" &&
    typeof f.set === "function"
  ) {
    var { get: r, set: l } = f;
    return (
      Object.defineProperty(e, n, {
        configurable: !0,
        get: function () {
          return r.call(this);
        },
        set: function (u) {
          ((t = "" + u), l.call(this, u));
        },
      }),
      Object.defineProperty(e, n, { enumerable: f.enumerable }),
      {
        getValue: function () {
          return t;
        },
        setValue: function (u) {
          t = "" + u;
        },
        stopTracking: function () {
          ((e._valueTracker = null), delete e[n]);
        },
      }
    );
  }
}
function Vt(e) {
  e._valueTracker || (e._valueTracker = EP(e));
}
function Bi(e) {
  if (!e) return !1;
  var n = e._valueTracker;
  if (!n) return !0;
  var f = n.getValue(),
    t = "";
  return (
    e && (t = Ui(e) ? (e.checked ? "true" : "false") : e.value),
    (e = t),
    e !== f ? (n.setValue(e), !0) : !1
  );
}
function Pr(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch (n) {
    return e.body;
  }
}
function Vl(e, n) {
  var f = n.checked;
  return q({}, n, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: f != null ? f : e._wrapperState.initialChecked,
  });
}
function Rv(e, n) {
  var f = n.defaultValue == null ? "" : n.defaultValue,
    t = n.checked != null ? n.checked : n.defaultChecked;
  ((f = gn(n.value != null ? n.value : f)),
    (e._wrapperState = {
      initialChecked: t,
      initialValue: f,
      controlled:
        n.type === "checkbox" || n.type === "radio"
          ? n.checked != null
          : n.value != null,
    }));
}
function Qi(e, n) {
  ((n = n.checked), n != null && Iu(e, "checked", n, !1));
}
function kl(e, n) {
  Qi(e, n);
  var f = gn(n.value),
    t = n.type;
  if (f != null)
    if (t === "number") {
      if ((f === 0 && e.value === "") || e.value != f) e.value = "" + f;
    } else e.value !== "" + f && (e.value = "" + f);
  else if (t === "submit" || t === "reset") {
    e.removeAttribute("value");
    return;
  }
  (n.hasOwnProperty("value")
    ? ql(e, n.type, f)
    : n.hasOwnProperty("defaultValue") && ql(e, n.type, gn(n.defaultValue)),
    n.checked == null &&
      n.defaultChecked != null &&
      (e.defaultChecked = !!n.defaultChecked));
}
function Yv(e, n, f) {
  if (n.hasOwnProperty("value") || n.hasOwnProperty("defaultValue")) {
    var t = n.type;
    if (
      !(
        (t !== "submit" && t !== "reset") ||
        (n.value !== void 0 && n.value !== null)
      )
    )
      return;
    ((n = "" + e._wrapperState.initialValue),
      f || n === e.value || (e.value = n),
      (e.defaultValue = n));
  }
  ((f = e.name),
    f !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    f !== "" && (e.name = f));
}
function ql(e, n, f) {
  if (n !== "number" || Pr(e.ownerDocument) !== e)
    f == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + f && (e.defaultValue = "" + f);
}
function vf(e, n, f, t) {
  if (((e = e.options), n)) {
    n = {};
    for (var r = 0; r < f.length; r++) n["$" + f[r]] = !0;
    for (f = 0; f < e.length; f++)
      ((r = n.hasOwnProperty("$" + e[f].value)),
        e[f].selected !== r && (e[f].selected = r),
        r && t && (e[f].defaultSelected = !0));
  } else {
    ((f = "" + gn(f)), (n = null));
    for (r = 0; r < e.length; r++) {
      if (e[r].value === f) {
        ((e[r].selected = !0), t && (e[r].defaultSelected = !0));
        return;
      }
      n !== null || e[r].disabled || (n = e[r]);
    }
    n !== null && (n.selected = !0);
  }
}
function Fl(e, n) {
  if (n.dangerouslySetInnerHTML != null) throw Error(m(91));
  return q({}, n, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function Kv(e, n) {
  var f = n.value;
  if (f == null) {
    if (((f = n.children), (n = n.defaultValue), f != null)) {
      if (n != null) throw Error(m(92));
      if (Wf(f)) {
        if (1 < f.length) throw Error(m(93));
        f = f[0];
      }
      n = f;
    }
    (n == null && (n = ""), (f = n));
  }
  e._wrapperState = { initialValue: gn(f) };
}
function _i(e, n) {
  var f = gn(n.value),
    t = gn(n.defaultValue);
  (f != null &&
    ((f = "" + f),
    f !== e.value && (e.value = f),
    n.defaultValue == null && e.defaultValue !== f && (e.defaultValue = f)),
    t != null && (e.defaultValue = "" + t));
}
function Ev(e) {
  var n = e.textContent;
  n === e._wrapperState.initialValue && n !== "" && n !== null && (e.value = n);
}
function $i(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Rl(e, n) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? $i(n)
    : e === "http://www.w3.org/2000/svg" && n === "foreignObject"
      ? "http://www.w3.org/1999/xhtml"
      : e;
}
function et(e, n) {
  if (n) {
    var f = e.firstChild;
    if (f && f === e.lastChild && f.nodeType === 3) {
      f.nodeValue = n;
      return;
    }
  }
  e.textContent = n;
}
function no(e, n, f) {
  return n == null || typeof n === "boolean" || n === ""
    ? ""
    : f || typeof n !== "number" || n === 0 || (Yf.hasOwnProperty(e) && Yf[e])
      ? ("" + n).trim()
      : n + "px";
}
function fo(e, n) {
  e = e.style;
  for (var f in n)
    if (n.hasOwnProperty(f)) {
      var t = f.indexOf("--") === 0,
        r = no(f, n[f], t);
      (f === "float" && (f = "cssFloat"), t ? e.setProperty(f, r) : (e[f] = r));
    }
}
function Yl(e, n) {
  if (n) {
    if (GP[e] && (n.children != null || n.dangerouslySetInnerHTML != null))
      throw Error(m(137, e));
    if (n.dangerouslySetInnerHTML != null) {
      if (n.children != null) throw Error(m(60));
      if (
        typeof n.dangerouslySetInnerHTML !== "object" ||
        !("__html" in n.dangerouslySetInnerHTML)
      )
        throw Error(m(61));
    }
    if (n.style != null && typeof n.style !== "object") throw Error(m(62));
  }
}
function Kl(e, n) {
  if (e.indexOf("-") === -1) return typeof n.is === "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
function Su(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
function Mv(e) {
  if ((e = gt(e))) {
    if (typeof Ml !== "function") throw Error(m(280));
    var n = e.stateNode;
    n && ((n = Jr(n)), Ml(e.stateNode, e.type, n));
  }
}
function to(e) {
  of ? (Pf ? Pf.push(e) : (Pf = [e])) : (of = e);
}
function ro() {
  if (of) {
    var e = of,
      n = Pf;
    if (((Pf = of = null), Mv(e), n)) for (e = 0; e < n.length; e++) Mv(n[e]);
  }
}
function lo(e, n) {
  return e(n);
}
function uo() {}
function vo(e, n, f) {
  if (pl) return e(n, f);
  pl = !0;
  try {
    return lo(e, n, f);
  } finally {
    if (((pl = !1), of !== null || Pf !== null)) (uo(), ro());
  }
}
function nt(e, n) {
  var f = e.stateNode;
  if (f === null) return null;
  var t = Jr(f);
  if (t === null) return null;
  f = t[n];
  e: switch (n) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      ((t = !t.disabled) ||
        ((e = e.type),
        (t = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !t));
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (f && typeof f !== "function") throw Error(m(231, n, typeof f));
  return f;
}
function UP(e, n, f, t, r, l, u, v, i) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    n.apply(f, d);
  } catch (p) {
    this.onError(p);
  }
}
function QP(e, n, f, t, r, l, u, v, i) {
  ((Kf = !1), (ar = null), UP.apply(BP, arguments));
}
function _P(e, n, f, t, r, l, u, v, i) {
  if ((QP.apply(this, arguments), Kf)) {
    if (Kf) {
      var d = ar;
      ((Kf = !1), (ar = null));
    } else throw Error(m(198));
    dr || ((dr = !0), (Ul = d));
  }
}
function kn(e) {
  var n = e,
    f = e;
  if (e.alternate) for (; n.return; ) n = n.return;
  else {
    e = n;
    do ((n = e), (n.flags & 4098) !== 0 && (f = n.return), (e = n.return));
    while (e);
  }
  return n.tag === 3 ? f : null;
}
function io(e) {
  if (e.tag === 13) {
    var n = e.memoizedState;
    if (
      (n === null && ((e = e.alternate), e !== null && (n = e.memoizedState)),
      n !== null)
    )
      return n.dehydrated;
  }
  return null;
}
function Gv(e) {
  if (kn(e) !== e) throw Error(m(188));
}
function $P(e) {
  var n = e.alternate;
  if (!n) {
    if (((n = kn(e)), n === null)) throw Error(m(188));
    return n !== e ? null : e;
  }
  for (var f = e, t = n; ; ) {
    var r = f.return;
    if (r === null) break;
    var l = r.alternate;
    if (l === null) {
      if (((t = r.return), t !== null)) {
        f = t;
        continue;
      }
      break;
    }
    if (r.child === l.child) {
      for (l = r.child; l; ) {
        if (l === f) return (Gv(r), e);
        if (l === t) return (Gv(r), n);
        l = l.sibling;
      }
      throw Error(m(188));
    }
    if (f.return !== t.return) ((f = r), (t = l));
    else {
      for (var u = !1, v = r.child; v; ) {
        if (v === f) {
          ((u = !0), (f = r), (t = l));
          break;
        }
        if (v === t) {
          ((u = !0), (t = r), (f = l));
          break;
        }
        v = v.sibling;
      }
      if (!u) {
        for (v = l.child; v; ) {
          if (v === f) {
            ((u = !0), (f = l), (t = r));
            break;
          }
          if (v === t) {
            ((u = !0), (t = l), (f = r));
            break;
          }
          v = v.sibling;
        }
        if (!u) throw Error(m(189));
      }
    }
    if (f.alternate !== t) throw Error(m(190));
  }
  if (f.tag !== 3) throw Error(m(188));
  return f.stateNode.current === f ? e : n;
}
function oo(e) {
  return ((e = $P(e)), e !== null ? Po(e) : null);
}
function Po(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var n = Po(e);
    if (n !== null) return n;
    e = e.sibling;
  }
  return null;
}
function r3(e) {
  if (Ve && typeof Ve.onCommitFiberRoot === "function")
    try {
      Ve.onCommitFiberRoot(Sr, e, void 0, (e.current.flags & 128) === 128);
    } catch (n) {}
}
function v3(e) {
  return ((e >>>= 0), e === 0 ? 32 : (31 - ((l3(e) / u3) | 0)) | 0);
}
function Jf(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function sr(e, n) {
  var f = e.pendingLanes;
  if (f === 0) return 0;
  var t = 0,
    r = e.suspendedLanes,
    l = e.pingedLanes,
    u = f & 268435455;
  if (u !== 0) {
    var v = u & ~r;
    v !== 0 ? (t = Jf(v)) : ((l &= u), l !== 0 && (t = Jf(l)));
  } else ((u = f & ~r), u !== 0 ? (t = Jf(u)) : l !== 0 && (t = Jf(l)));
  if (t === 0) return 0;
  if (
    n !== 0 &&
    n !== t &&
    (n & r) === 0 &&
    ((r = t & -t), (l = n & -n), r >= l || (r === 16 && (l & 4194240) !== 0))
  )
    return n;
  if (((t & 4) !== 0 && (t |= f & 16), (n = e.entangledLanes), n !== 0))
    for (e = e.entanglements, n &= t; 0 < n; )
      ((f = 31 - be(n)), (r = 1 << f), (t |= e[f]), (n &= ~r));
  return t;
}
function i3(e, n) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return n + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return n + 5000;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function o3(e, n) {
  for (
    var {
      suspendedLanes: f,
      pingedLanes: t,
      expirationTimes: r,
      pendingLanes: l,
    } = e;
    0 < l;

  ) {
    var u = 31 - be(l),
      v = 1 << u,
      i = r[u];
    if (i === -1) {
      if ((v & f) === 0 || (v & t) !== 0) r[u] = i3(v, n);
    } else i <= n && (e.expiredLanes |= v);
    l &= ~v;
  }
}
function Bl(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function zo() {
  var e = qt;
  return ((qt <<= 1), (qt & 4194240) === 0 && (qt = 64), e);
}
function Xl(e) {
  for (var n = [], f = 0; 31 > f; f++) n.push(e);
  return n;
}
function pt(e, n, f) {
  ((e.pendingLanes |= n),
    n !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (n = 31 - be(n)),
    (e[n] = f));
}
function P3(e, n) {
  var f = e.pendingLanes & ~n;
  ((e.pendingLanes = n),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= n),
    (e.mutableReadLanes &= n),
    (e.entangledLanes &= n),
    (n = e.entanglements));
  var t = e.eventTimes;
  for (e = e.expirationTimes; 0 < f; ) {
    var r = 31 - be(f),
      l = 1 << r;
    ((n[r] = 0), (t[r] = -1), (e[r] = -1), (f &= ~l));
  }
}
function Zu(e, n) {
  var f = (e.entangledLanes |= n);
  for (e = e.entanglements; f; ) {
    var t = 31 - be(f),
      r = 1 << t;
    ((r & n) | (e[t] & n) && (e[t] |= n), (f &= ~r));
  }
}
function po(e) {
  return (
    (e &= -e),
    1 < e ? (4 < e ? ((e & 268435455) !== 0 ? 16 : 536870912) : 4) : 1
  );
}
function Bv(e, n) {
  switch (e) {
    case "focusin":
    case "focusout":
      Pn = null;
      break;
    case "dragenter":
    case "dragleave":
      an = null;
      break;
    case "mouseover":
    case "mouseout":
      dn = null;
      break;
    case "pointerover":
    case "pointerout":
      ft.delete(n.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      tt.delete(n.pointerId);
  }
}
function If(e, n, f, t, r, l) {
  if (e === null || e.nativeEvent !== l)
    return (
      (e = {
        blockedOn: n,
        domEventName: f,
        eventSystemFlags: t,
        nativeEvent: l,
        targetContainers: [r],
      }),
      n !== null && ((n = gt(n)), n !== null && Wu(n)),
      e
    );
  return (
    (e.eventSystemFlags |= t),
    (n = e.targetContainers),
    r !== null && n.indexOf(r) === -1 && n.push(r),
    e
  );
}
function d3(e, n, f, t, r) {
  switch (n) {
    case "focusin":
      return ((Pn = If(Pn, e, n, f, t, r)), !0);
    case "dragenter":
      return ((an = If(an, e, n, f, t, r)), !0);
    case "mouseover":
      return ((dn = If(dn, e, n, f, t, r)), !0);
    case "pointerover":
      var l = r.pointerId;
      return (ft.set(l, If(ft.get(l) || null, e, n, f, t, r)), !0);
    case "gotpointercapture":
      return (
        (l = r.pointerId),
        tt.set(l, If(tt.get(l) || null, e, n, f, t, r)),
        !0
      );
  }
  return !1;
}
function yo(e) {
  var n = Ln(e.target);
  if (n !== null) {
    var f = kn(n);
    if (f !== null) {
      if (((n = f.tag), n === 13)) {
        if (((n = io(f)), n !== null)) {
          ((e.blockedOn = n),
            Ho(e.priority, function () {
              go(f);
            }));
          return;
        }
      } else if (n === 3 && f.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = f.tag === 3 ? f.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function $t(e) {
  if (e.blockedOn !== null) return !1;
  for (var n = e.targetContainers; 0 < n.length; ) {
    var f = _l(e.domEventName, e.eventSystemFlags, n[0], e.nativeEvent);
    if (f === null) {
      f = e.nativeEvent;
      var t = new f.constructor(f.type, f);
      ((El = t), f.target.dispatchEvent(t), (El = null));
    } else return ((n = gt(f)), n !== null && Wu(n), (e.blockedOn = f), !1);
    n.shift();
  }
  return !0;
}
function Qv(e, n, f) {
  $t(e) && f.delete(n);
}
function c3() {
  ((Ql = !1),
    Pn !== null && $t(Pn) && (Pn = null),
    an !== null && $t(an) && (an = null),
    dn !== null && $t(dn) && (dn = null),
    ft.forEach(Qv),
    tt.forEach(Qv));
}
function bf(e, n) {
  e.blockedOn === n &&
    ((e.blockedOn = null),
    Ql ||
      ((Ql = !0), J.unstable_scheduleCallback(J.unstable_NormalPriority, c3)));
}
function rt(e) {
  function n(r) {
    return bf(r, e);
  }
  if (0 < Rt.length) {
    bf(Rt[0], e);
    for (var f = 1; f < Rt.length; f++) {
      var t = Rt[f];
      t.blockedOn === e && (t.blockedOn = null);
    }
  }
  (Pn !== null && bf(Pn, e),
    an !== null && bf(an, e),
    dn !== null && bf(dn, e),
    ft.forEach(n),
    tt.forEach(n));
  for (f = 0; f < ln.length; f++)
    ((t = ln[f]), t.blockedOn === e && (t.blockedOn = null));
  for (; 0 < ln.length && ((f = ln[0]), f.blockedOn === null); )
    (yo(f), f.blockedOn === null && ln.shift());
}
function s3(e, n, f, t) {
  var r = D,
    l = af.transition;
  af.transition = null;
  try {
    ((D = 1), Ju(e, n, f, t));
  } finally {
    ((D = r), (af.transition = l));
  }
}
function z3(e, n, f, t) {
  var r = D,
    l = af.transition;
  af.transition = null;
  try {
    ((D = 4), Ju(e, n, f, t));
  } finally {
    ((D = r), (af.transition = l));
  }
}
function Ju(e, n, f, t) {
  if (zr) {
    var r = _l(e, n, f, t);
    if (r === null) (Cl(e, n, t, pr, f), Bv(e, t));
    else if (d3(r, e, n, f, t)) t.stopPropagation();
    else if ((Bv(e, t), n & 4 && -1 < a3.indexOf(e))) {
      for (; r !== null; ) {
        var l = gt(r);
        if (
          (l !== null && Xo(l),
          (l = _l(e, n, f, t)),
          l === null && Cl(e, n, t, pr, f),
          l === r)
        )
          break;
        r = l;
      }
      r !== null && t.stopPropagation();
    } else Cl(e, n, t, null, f);
  }
}
function _l(e, n, f, t) {
  if (((pr = null), (e = Su(t)), (e = Ln(e)), e !== null))
    if (((n = kn(e)), n === null)) e = null;
    else if (((f = n.tag), f === 13)) {
      if (((e = io(n)), e !== null)) return e;
      e = null;
    } else if (f === 3) {
      if (n.stateNode.current.memoizedState.isDehydrated)
        return n.tag === 3 ? n.stateNode.containerInfo : null;
      e = null;
    } else n !== e && (e = null);
  return ((pr = e), null);
}
function ho(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (f3()) {
        case ju:
          return 1;
        case co:
          return 4;
        case cr:
        case t3:
          return 16;
        case so:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
function Co() {
  if (er) return er;
  var e,
    n = Vu,
    f = n.length,
    t,
    r = "value" in vn ? vn.value : vn.textContent,
    l = r.length;
  for (e = 0; e < f && n[e] === r[e]; e++);
  var u = f - e;
  for (t = 1; t <= u && n[f - t] === r[l - t]; t++);
  return (er = r.slice(e, 1 < t ? 1 - t : void 0));
}
function nr(e) {
  var n = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && n === 13 && (e = 13))
      : (e = n),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Yt() {
  return !0;
}
function _v() {
  return !1;
}
function pe(e) {
  function n(f, t, r, l, u) {
    ((this._reactName = f),
      (this._targetInst = r),
      (this.type = t),
      (this.nativeEvent = l),
      (this.target = u),
      (this.currentTarget = null));
    for (var v in e)
      e.hasOwnProperty(v) && ((f = e[v]), (this[v] = f ? f(l) : l[v]));
    return (
      (this.isDefaultPrevented = (
        l.defaultPrevented != null ? l.defaultPrevented : l.returnValue === !1
      )
        ? Yt
        : _v),
      (this.isPropagationStopped = _v),
      this
    );
  }
  return (
    q(n.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var f = this.nativeEvent;
        f &&
          (f.preventDefault
            ? f.preventDefault()
            : typeof f.returnValue !== "unknown" && (f.returnValue = !1),
          (this.isDefaultPrevented = Yt));
      },
      stopPropagation: function () {
        var f = this.nativeEvent;
        f &&
          (f.stopPropagation
            ? f.stopPropagation()
            : typeof f.cancelBubble !== "unknown" && (f.cancelBubble = !0),
          (this.isPropagationStopped = Yt));
      },
      persist: function () {},
      isPersistent: Yt,
    }),
    n
  );
}
function A3(e) {
  var n = this.nativeEvent;
  return n.getModifierState ? n.getModifierState(e) : (e = N3[e]) ? !!n[e] : !1;
}
function qu() {
  return A3;
}
function xo(e, n) {
  switch (e) {
    case "keyup":
      return J3.indexOf(n.keyCode) !== -1;
    case "keydown":
      return n.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function To(e) {
  return ((e = e.detail), typeof e === "object" && "data" in e ? e.data : null);
}
function k3(e, n) {
  switch (e) {
    case "compositionend":
      return To(n);
    case "keypress":
      if (n.which !== 32) return null;
      return ((ti = !0), fi);
    case "textInput":
      return ((e = n.data), e === fi && ti ? null : e);
    default:
      return null;
  }
}
function q3(e, n) {
  if (Qn)
    return e === "compositionend" || (!Fu && xo(e, n))
      ? ((e = Co()), (er = Vu = vn = null), (Qn = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(n.ctrlKey || n.altKey || n.metaKey) || (n.ctrlKey && n.altKey)) {
        if (n.char && 1 < n.char.length) return n.char;
        if (n.which) return String.fromCharCode(n.which);
      }
      return null;
    case "compositionend":
      return wo && n.locale !== "ko" ? null : n.data;
    default:
      return null;
  }
}
function ri(e) {
  var n = e && e.nodeName && e.nodeName.toLowerCase();
  return n === "input" ? !!F3[e.type] : n === "textarea" ? !0 : !1;
}
function No(e, n, f, t) {
  (to(t),
    (n = Xr(n, "onChange")),
    0 < n.length &&
      ((f = new ku("onChange", "change", null, f, t)),
      e.push({ event: f, listeners: n })));
}
function R3(e) {
  Jo(e, 0);
}
function Zr(e) {
  var n = ef(e);
  if (Bi(n)) return e;
}
function Y3(e, n) {
  if (e === "change") return n;
}
function li() {
  Mf && (Mf.detachEvent("onpropertychange", Lo), (lt = Mf = null));
}
function Lo(e) {
  if (e.propertyName === "value" && Zr(lt)) {
    var n = [];
    (No(n, lt, e, Su(e)), vo(R3, n));
  }
}
function K3(e, n, f) {
  e === "focusin"
    ? (li(), (Mf = n), (lt = f), Mf.attachEvent("onpropertychange", Lo))
    : e === "focusout" && li();
}
function E3(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Zr(lt);
}
function M3(e, n) {
  if (e === "click") return Zr(n);
}
function G3(e, n) {
  if (e === "input" || e === "change") return Zr(n);
}
function U3(e, n) {
  return (e === n && (e !== 0 || 1 / e === 1 / n)) || (e !== e && n !== n);
}
function ut(e, n) {
  if (Oe(e, n)) return !0;
  if (
    typeof e !== "object" ||
    e === null ||
    typeof n !== "object" ||
    n === null
  )
    return !1;
  var f = Object.keys(e),
    t = Object.keys(n);
  if (f.length !== t.length) return !1;
  for (t = 0; t < f.length; t++) {
    var r = f[t];
    if (!Sl.call(n, r) || !Oe(e[r], n[r])) return !1;
  }
  return !0;
}
function ui(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function vi(e, n) {
  var f = ui(e);
  e = 0;
  for (var t; f; ) {
    if (f.nodeType === 3) {
      if (((t = e + f.textContent.length), e <= n && t >= n))
        return { node: f, offset: n - e };
      e = t;
    }
    e: {
      for (; f; ) {
        if (f.nextSibling) {
          f = f.nextSibling;
          break e;
        }
        f = f.parentNode;
      }
      f = void 0;
    }
    f = ui(f);
  }
}
function Io(e, n) {
  return e && n
    ? e === n
      ? !0
      : e && e.nodeType === 3
        ? !1
        : n && n.nodeType === 3
          ? Io(e, n.parentNode)
          : "contains" in e
            ? e.contains(n)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(n) & 16)
              : !1
    : !1;
}
function bo() {
  for (var e = window, n = Pr(); n instanceof e.HTMLIFrameElement; ) {
    try {
      var f = typeof n.contentWindow.location.href === "string";
    } catch (t) {
      f = !1;
    }
    if (f) e = n.contentWindow;
    else break;
    n = Pr(e.document);
  }
  return n;
}
function Ru(e) {
  var n = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    n &&
    ((n === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      n === "textarea" ||
      e.contentEditable === "true")
  );
}
function B3(e) {
  var n = bo(),
    f = e.focusedElem,
    t = e.selectionRange;
  if (
    n !== f &&
    f &&
    f.ownerDocument &&
    Io(f.ownerDocument.documentElement, f)
  ) {
    if (t !== null && Ru(f)) {
      if (
        ((n = t.start),
        (e = t.end),
        e === void 0 && (e = n),
        "selectionStart" in f)
      )
        ((f.selectionStart = n),
          (f.selectionEnd = Math.min(e, f.value.length)));
      else if (
        ((e = ((n = f.ownerDocument || document) && n.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var r = f.textContent.length,
          l = Math.min(t.start, r);
        ((t = t.end === void 0 ? l : Math.min(t.end, r)),
          !e.extend && l > t && ((r = t), (t = l), (l = r)),
          (r = vi(f, l)));
        var u = vi(f, t);
        r &&
          u &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== r.node ||
            e.anchorOffset !== r.offset ||
            e.focusNode !== u.node ||
            e.focusOffset !== u.offset) &&
          ((n = n.createRange()),
          n.setStart(r.node, r.offset),
          e.removeAllRanges(),
          l > t
            ? (e.addRange(n), e.extend(u.node, u.offset))
            : (n.setEnd(u.node, u.offset), e.addRange(n)));
      }
    }
    n = [];
    for (e = f; (e = e.parentNode); )
      e.nodeType === 1 &&
        n.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    typeof f.focus === "function" && f.focus();
    for (f = 0; f < n.length; f++)
      ((e = n[f]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top));
  }
}
function ii(e, n, f) {
  var t = f.window === f ? f.document : f.nodeType === 9 ? f : f.ownerDocument;
  eu ||
    _n == null ||
    _n !== Pr(t) ||
    ((t = _n),
    "selectionStart" in t && Ru(t)
      ? (t = { start: t.selectionStart, end: t.selectionEnd })
      : ((t = (
          (t.ownerDocument && t.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (t = {
          anchorNode: t.anchorNode,
          anchorOffset: t.anchorOffset,
          focusNode: t.focusNode,
          focusOffset: t.focusOffset,
        })),
    (Gf && ut(Gf, t)) ||
      ((Gf = t),
      (t = Xr($l, "onSelect")),
      0 < t.length &&
        ((n = new ku("onSelect", "select", null, n, f)),
        e.push({ event: n, listeners: t }),
        (n.target = _n))));
}
function Kt(e, n) {
  var f = {};
  return (
    (f[e.toLowerCase()] = n.toLowerCase()),
    (f["Webkit" + e] = "webkit" + n),
    (f["Moz" + e] = "moz" + n),
    f
  );
}
function Wr(e) {
  if (yl[e]) return yl[e];
  if (!$n[e]) return e;
  var n = $n[e],
    f;
  for (f in n) if (n.hasOwnProperty(f) && f in Do) return (yl[e] = n[f]);
  return e;
}
function Hn(e, n) {
  (Wo.set(e, n), Vn(n, [e]));
}
function Pi(e, n, f) {
  var t = e.type || "unknown-event";
  ((e.currentTarget = f), _P(t, n, void 0, e), (e.currentTarget = null));
}
function Jo(e, n) {
  n = (n & 4) !== 0;
  for (var f = 0; f < e.length; f++) {
    var t = e[f],
      r = t.event;
    t = t.listeners;
    e: {
      var l = void 0;
      if (n)
        for (var u = t.length - 1; 0 <= u; u--) {
          var v = t[u],
            i = v.instance,
            d = v.currentTarget;
          if (((v = v.listener), i !== l && r.isPropagationStopped())) break e;
          (Pi(r, v, d), (l = i));
        }
      else
        for (u = 0; u < t.length; u++) {
          if (
            ((v = t[u]),
            (i = v.instance),
            (d = v.currentTarget),
            (v = v.listener),
            i !== l && r.isPropagationStopped())
          )
            break e;
          (Pi(r, v, d), (l = i));
        }
    }
  }
  if (dr) throw ((e = Ul), (dr = !1), (Ul = null), e);
}
function S(e, n) {
  var f = n[vu];
  f === void 0 && (f = n[vu] = new Set());
  var t = e + "__bubble";
  f.has(t) || (Vo(n, e, 2, !1), f.add(t));
}
function hl(e, n, f) {
  var t = 0;
  (n && (t |= 4), Vo(f, e, t, n));
}
function vt(e) {
  if (!e[Et]) {
    ((e[Et] = !0),
      Ki.forEach(function (f) {
        f !== "selectionchange" && (_3.has(f) || hl(f, !1, e), hl(f, !0, e));
      }));
    var n = e.nodeType === 9 ? e : e.ownerDocument;
    n === null || n[Et] || ((n[Et] = !0), hl("selectionchange", !1, n));
  }
}
function Vo(e, n, f, t) {
  switch (ho(n)) {
    case 1:
      var r = s3;
      break;
    case 4:
      r = z3;
      break;
    default:
      r = Ju;
  }
  ((f = r.bind(null, n, f, e)),
    (r = void 0),
    !Gl ||
      (n !== "touchstart" && n !== "touchmove" && n !== "wheel") ||
      (r = !0),
    t
      ? r !== void 0
        ? e.addEventListener(n, f, { capture: !0, passive: r })
        : e.addEventListener(n, f, !0)
      : r !== void 0
        ? e.addEventListener(n, f, { passive: r })
        : e.addEventListener(n, f, !1));
}
function Cl(e, n, f, t, r) {
  var l = t;
  if ((n & 1) === 0 && (n & 2) === 0 && t !== null)
    e: for (;;) {
      if (t === null) return;
      var u = t.tag;
      if (u === 3 || u === 4) {
        var v = t.stateNode.containerInfo;
        if (v === r || (v.nodeType === 8 && v.parentNode === r)) break;
        if (u === 4)
          for (u = t.return; u !== null; ) {
            var i = u.tag;
            if (i === 3 || i === 4) {
              if (
                ((i = u.stateNode.containerInfo),
                i === r || (i.nodeType === 8 && i.parentNode === r))
              )
                return;
            }
            u = u.return;
          }
        for (; v !== null; ) {
          if (((u = Ln(v)), u === null)) return;
          if (((i = u.tag), i === 5 || i === 6)) {
            t = l = u;
            continue e;
          }
          v = v.parentNode;
        }
      }
      t = t.return;
    }
  vo(function () {
    var d = l,
      p = Su(f),
      X = [];
    e: {
      var g = Wo.get(e);
      if (g !== void 0) {
        var y = ku,
          C = e;
        switch (e) {
          case "keypress":
            if (nr(f) === 0) break e;
          case "keydown":
          case "keyup":
            y = I3;
            break;
          case "focusin":
            ((C = "focus"), (y = Hl));
            break;
          case "focusout":
            ((C = "blur"), (y = Hl));
            break;
          case "beforeblur":
          case "afterblur":
            y = Hl;
            break;
          case "click":
            if (f.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            y = $v;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            y = g3;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = O3;
            break;
          case Oo:
          case So:
          case jo:
            y = y3;
            break;
          case Zo:
            y = j3;
            break;
          case "scroll":
            y = p3;
            break;
          case "wheel":
            y = W3;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = C3;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            y = ni;
        }
        var h = (n & 4) !== 0,
          Z = !h && e === "scroll",
          c = h ? (g !== null ? g + "Capture" : null) : g;
        h = [];
        for (var P = d, s; P !== null; ) {
          s = P;
          var H = s.stateNode;
          if (
            (s.tag === 5 &&
              H !== null &&
              ((s = H),
              c !== null && ((H = nt(P, c)), H != null && h.push(it(P, H, s)))),
            Z)
          )
            break;
          P = P.return;
        }
        0 < h.length &&
          ((g = new y(g, C, null, f, p)), X.push({ event: g, listeners: h }));
      }
    }
    if ((n & 7) === 0) {
      e: {
        if (
          ((g = e === "mouseover" || e === "pointerover"),
          (y = e === "mouseout" || e === "pointerout"),
          g &&
            f !== El &&
            (C = f.relatedTarget || f.fromElement) &&
            (Ln(C) || C[Ue]))
        )
          break e;
        if (y || g) {
          if (
            ((g =
              p.window === p
                ? p
                : (g = p.ownerDocument)
                  ? g.defaultView || g.parentWindow
                  : window),
            y)
          ) {
            if (
              ((C = f.relatedTarget || f.toElement),
              (y = d),
              (C = C ? Ln(C) : null),
              C !== null &&
                ((Z = kn(C)), C !== Z || (C.tag !== 5 && C.tag !== 6)))
            )
              C = null;
          } else ((y = null), (C = d));
          if (y !== C) {
            if (
              ((h = $v),
              (H = "onMouseLeave"),
              (c = "onMouseEnter"),
              (P = "mouse"),
              e === "pointerout" || e === "pointerover")
            )
              ((h = ni),
                (H = "onPointerLeave"),
                (c = "onPointerEnter"),
                (P = "pointer"));
            if (
              ((Z = y == null ? g : ef(y)),
              (s = C == null ? g : ef(C)),
              (g = new h(H, P + "leave", y, f, p)),
              (g.target = Z),
              (g.relatedTarget = s),
              (H = null),
              Ln(p) === d &&
                ((h = new h(c, P + "enter", C, f, p)),
                (h.target = s),
                (h.relatedTarget = Z),
                (H = h)),
              (Z = H),
              y && C)
            )
              n: {
                ((h = y), (c = C), (P = 0));
                for (s = h; s; s = Mn(s)) P++;
                s = 0;
                for (H = c; H; H = Mn(H)) s++;
                for (; 0 < P - s; ) ((h = Mn(h)), P--);
                for (; 0 < s - P; ) ((c = Mn(c)), s--);
                for (; P--; ) {
                  if (h === c || (c !== null && h === c.alternate)) break n;
                  ((h = Mn(h)), (c = Mn(c)));
                }
                h = null;
              }
            else h = null;
            (y !== null && ai(X, g, y, h, !1),
              C !== null && Z !== null && ai(X, Z, C, h, !0));
          }
        }
      }
      e: {
        if (
          ((g = d ? ef(d) : window),
          (y = g.nodeName && g.nodeName.toLowerCase()),
          y === "select" || (y === "input" && g.type === "file"))
        )
          var x = Y3;
        else if (ri(g))
          if (Ao) x = G3;
          else {
            x = E3;
            var T = K3;
          }
        else
          (y = g.nodeName) &&
            y.toLowerCase() === "input" &&
            (g.type === "checkbox" || g.type === "radio") &&
            (x = M3);
        if (x && (x = x(e, d))) {
          No(X, x, f, p);
          break e;
        }
        (T && T(e, g, d),
          e === "focusout" &&
            (T = g._wrapperState) &&
            T.controlled &&
            g.type === "number" &&
            ql(g, "number", g.value));
      }
      switch (((T = d ? ef(d) : window), e)) {
        case "focusin":
          if (ri(T) || T.contentEditable === "true")
            ((_n = T), ($l = d), (Gf = null));
          break;
        case "focusout":
          Gf = $l = _n = null;
          break;
        case "mousedown":
          eu = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ((eu = !1), ii(X, f, p));
          break;
        case "selectionchange":
          if (Q3) break;
        case "keydown":
        case "keyup":
          ii(X, f, p);
      }
      var N;
      if (Fu)
        e: {
          switch (e) {
            case "compositionstart":
              var z = "onCompositionStart";
              break e;
            case "compositionend":
              z = "onCompositionEnd";
              break e;
            case "compositionupdate":
              z = "onCompositionUpdate";
              break e;
          }
          z = void 0;
        }
      else
        Qn
          ? xo(e, f) && (z = "onCompositionEnd")
          : e === "keydown" && f.keyCode === 229 && (z = "onCompositionStart");
      if (
        (z &&
          (wo &&
            f.locale !== "ko" &&
            (Qn || z !== "onCompositionStart"
              ? z === "onCompositionEnd" && Qn && (N = Co())
              : ((vn = p),
                (Vu = "value" in vn ? vn.value : vn.textContent),
                (Qn = !0))),
          (T = Xr(d, z)),
          0 < T.length &&
            ((z = new ei(z, e, null, f, p)),
            X.push({ event: z, listeners: T }),
            N ? (z.data = N) : ((N = To(f)), N !== null && (z.data = N)))),
        (N = V3 ? k3(e, f) : q3(e, f)))
      )
        ((d = Xr(d, "onBeforeInput")),
          0 < d.length &&
            ((p = new ei("onBeforeInput", "beforeinput", null, f, p)),
            X.push({ event: p, listeners: d }),
            (p.data = N)));
    }
    Jo(X, n);
  });
}
function it(e, n, f) {
  return { instance: e, listener: n, currentTarget: f };
}
function Xr(e, n) {
  for (var f = n + "Capture", t = []; e !== null; ) {
    var r = e,
      l = r.stateNode;
    (r.tag === 5 &&
      l !== null &&
      ((r = l),
      (l = nt(e, f)),
      l != null && t.unshift(it(e, l, r)),
      (l = nt(e, n)),
      l != null && t.push(it(e, l, r))),
      (e = e.return));
  }
  return t;
}
function Mn(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e ? e : null;
}
function ai(e, n, f, t, r) {
  for (var l = n._reactName, u = []; f !== null && f !== t; ) {
    var v = f,
      i = v.alternate,
      d = v.stateNode;
    if (i !== null && i === t) break;
    (v.tag === 5 &&
      d !== null &&
      ((v = d),
      r
        ? ((i = nt(f, l)), i != null && u.unshift(it(f, i, v)))
        : r || ((i = nt(f, l)), i != null && u.push(it(f, i, v)))),
      (f = f.return));
  }
  u.length !== 0 && e.push({ event: n, listeners: u });
}
function di(e) {
  return (typeof e === "string" ? e : "" + e)
    .replace(
      $3,
      `
`,
    )
    .replace(ea, "");
}
function Mt(e, n, f) {
  if (((n = di(n)), di(e) !== n && f)) throw Error(m(425));
}
function gr() {}
function lu(e, n) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof n.children === "string" ||
    typeof n.children === "number" ||
    (typeof n.dangerouslySetInnerHTML === "object" &&
      n.dangerouslySetInnerHTML !== null &&
      n.dangerouslySetInnerHTML.__html != null)
  );
}
function ta(e) {
  setTimeout(function () {
    throw e;
  });
}
function wl(e, n) {
  var f = n,
    t = 0;
  do {
    var r = f.nextSibling;
    if ((e.removeChild(f), r && r.nodeType === 8))
      if (((f = r.data), f === "/$")) {
        if (t === 0) {
          (e.removeChild(r), rt(n));
          return;
        }
        t--;
      } else (f !== "$" && f !== "$?" && f !== "$!") || t++;
    f = r;
  } while (f);
  rt(n);
}
function cn(e) {
  for (; e != null; e = e.nextSibling) {
    var n = e.nodeType;
    if (n === 1 || n === 3) break;
    if (n === 8) {
      if (((n = e.data), n === "$" || n === "$!" || n === "$?")) break;
      if (n === "/$") return null;
    }
  }
  return e;
}
function si(e) {
  e = e.previousSibling;
  for (var n = 0; e; ) {
    if (e.nodeType === 8) {
      var f = e.data;
      if (f === "$" || f === "$!" || f === "$?") {
        if (n === 0) return e;
        n--;
      } else f === "/$" && n++;
    }
    e = e.previousSibling;
  }
  return null;
}
function Ln(e) {
  var n = e[Je];
  if (n) return n;
  for (var f = e.parentNode; f; ) {
    if ((n = f[Ue] || f[Je])) {
      if (
        ((f = n.alternate),
        n.child !== null || (f !== null && f.child !== null))
      )
        for (e = si(e); e !== null; ) {
          if ((f = e[Je])) return f;
          e = si(e);
        }
      return n;
    }
    ((e = f), (f = e.parentNode));
  }
  return null;
}
function gt(e) {
  return (
    (e = e[Je] || e[Ue]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function ef(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(m(33));
}
function Jr(e) {
  return e[ot] || null;
}
function yn(e) {
  return { current: e };
}
function j(e) {
  0 > nf || ((e.current = iu[nf]), (iu[nf] = null), nf--);
}
function O(e, n) {
  (nf++, (iu[nf] = e.current), (e.current = n));
}
function zf(e, n) {
  var f = e.type.contextTypes;
  if (!f) return mn;
  var t = e.stateNode;
  if (t && t.__reactInternalMemoizedUnmaskedChildContext === n)
    return t.__reactInternalMemoizedMaskedChildContext;
  var r = {},
    l;
  for (l in f) r[l] = n[l];
  return (
    t &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = n),
      (e.__reactInternalMemoizedMaskedChildContext = r)),
    r
  );
}
function ae(e) {
  return ((e = e.childContextTypes), e !== null && e !== void 0);
}
function mr() {
  (j(Pe), j(fe));
}
function zi(e, n, f) {
  if (fe.current !== mn) throw Error(m(168));
  (O(fe, n), O(Pe, f));
}
function ko(e, n, f) {
  var t = e.stateNode;
  if (((n = n.childContextTypes), typeof t.getChildContext !== "function"))
    return f;
  t = t.getChildContext();
  for (var r in t) if (!(r in n)) throw Error(m(108, KP(e) || "Unknown", r));
  return q({}, f, t);
}
function Hr(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || mn),
    (Sn = fe.current),
    O(fe, e),
    O(Pe, Pe.current),
    !0
  );
}
function pi(e, n, f) {
  var t = e.stateNode;
  if (!t) throw Error(m(169));
  (f
    ? ((e = ko(e, n, Sn)),
      (t.__reactInternalMemoizedMergedChildContext = e),
      j(Pe),
      j(fe),
      O(fe, e))
    : j(Pe),
    O(Pe, f));
}
function qo(e) {
  Ye === null ? (Ye = [e]) : Ye.push(e);
}
function ua(e) {
  ((Vr = !0), qo(e));
}
function hn() {
  if (!xl && Ye !== null) {
    xl = !0;
    var e = 0,
      n = D;
    try {
      var f = Ye;
      for (D = 1; e < f.length; e++) {
        var t = f[e];
        do t = t(!0);
        while (t !== null);
      }
      ((Ye = null), (Vr = !1));
    } catch (r) {
      throw (Ye !== null && (Ye = Ye.slice(e + 1)), ao(ju, hn), r);
    } finally {
      ((D = n), (xl = !1));
    }
  }
  return null;
}
function Nn(e, n) {
  ((ff[tf++] = hr), (ff[tf++] = yr), (yr = e), (hr = n));
}
function Fo(e, n, f) {
  ((me[He++] = Ke), (me[He++] = Ee), (me[He++] = jn), (jn = e));
  var t = Ke;
  e = Ee;
  var r = 32 - be(t) - 1;
  ((t &= ~(1 << r)), (f += 1));
  var l = 32 - be(n) + r;
  if (30 < l) {
    var u = r - (r % 5);
    ((l = (t & ((1 << u) - 1)).toString(32)),
      (t >>= u),
      (r -= u),
      (Ke = (1 << (32 - be(n) + r)) | (f << r) | t),
      (Ee = l + e));
  } else ((Ke = (1 << l) | (f << r) | t), (Ee = e));
}
function Yu(e) {
  e.return !== null && (Nn(e, 1), Fo(e, 1, 0));
}
function Ku(e) {
  for (; e === yr; )
    ((yr = ff[--tf]), (ff[tf] = null), (hr = ff[--tf]), (ff[tf] = null));
  for (; e === jn; )
    ((jn = me[--He]),
      (me[He] = null),
      (Ee = me[--He]),
      (me[He] = null),
      (Ke = me[--He]),
      (me[He] = null));
}
function Ro(e, n) {
  var f = ye(5, null, null, 0);
  ((f.elementType = "DELETED"),
    (f.stateNode = n),
    (f.return = e),
    (n = e.deletions),
    n === null ? ((e.deletions = [f]), (e.flags |= 16)) : n.push(f));
}
function Xi(e, n) {
  switch (e.tag) {
    case 5:
      var f = e.type;
      return (
        (n =
          n.nodeType !== 1 || f.toLowerCase() !== n.nodeName.toLowerCase()
            ? null
            : n),
        n !== null
          ? ((e.stateNode = n), (ze = e), (se = cn(n.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (n = e.pendingProps === "" || n.nodeType !== 3 ? null : n),
        n !== null ? ((e.stateNode = n), (ze = e), (se = null), !0) : !1
      );
    case 13:
      return (
        (n = n.nodeType !== 8 ? null : n),
        n !== null
          ? ((f = jn !== null ? { id: Ke, overflow: Ee } : null),
            (e.memoizedState = {
              dehydrated: n,
              treeContext: f,
              retryLane: 1073741824,
            }),
            (f = ye(18, null, null, 0)),
            (f.stateNode = n),
            (f.return = e),
            (e.child = f),
            (ze = e),
            (se = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function ou(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Pu(e) {
  if (W) {
    var n = se;
    if (n) {
      var f = n;
      if (!Xi(e, n)) {
        if (ou(e)) throw Error(m(418));
        n = cn(f.nextSibling);
        var t = ze;
        n && Xi(e, n)
          ? Ro(t, f)
          : ((e.flags = (e.flags & -4097) | 2), (W = !1), (ze = e));
      }
    } else {
      if (ou(e)) throw Error(m(418));
      ((e.flags = (e.flags & -4097) | 2), (W = !1), (ze = e));
    }
  }
}
function gi(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  ze = e;
}
function Gt(e) {
  if (e !== ze) return !1;
  if (!W) return (gi(e), (W = !0), !1);
  var n;
  if (
    ((n = e.tag !== 3) &&
      !(n = e.tag !== 5) &&
      ((n = e.type),
      (n = n !== "head" && n !== "body" && !lu(e.type, e.memoizedProps))),
    n && (n = se))
  ) {
    if (ou(e)) throw (Yo(), Error(m(418)));
    for (; n; ) (Ro(e, n), (n = cn(n.nextSibling)));
  }
  if ((gi(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(m(317));
    e: {
      e = e.nextSibling;
      for (n = 0; e; ) {
        if (e.nodeType === 8) {
          var f = e.data;
          if (f === "/$") {
            if (n === 0) {
              se = cn(e.nextSibling);
              break e;
            }
            n--;
          } else (f !== "$" && f !== "$!" && f !== "$?") || n++;
        }
        e = e.nextSibling;
      }
      se = null;
    }
  } else se = ze ? cn(e.stateNode.nextSibling) : null;
  return !0;
}
function Yo() {
  for (var e = se; e; ) e = cn(e.nextSibling);
}
function pf() {
  ((se = ze = null), (W = !1));
}
function Eu(e) {
  Ie === null ? (Ie = [e]) : Ie.push(e);
}
function Of(e, n, f) {
  if (
    ((e = f.ref),
    e !== null && typeof e !== "function" && typeof e !== "object")
  ) {
    if (f._owner) {
      if (((f = f._owner), f)) {
        if (f.tag !== 1) throw Error(m(309));
        var t = f.stateNode;
      }
      if (!t) throw Error(m(147, e));
      var r = t,
        l = "" + e;
      if (
        n !== null &&
        n.ref !== null &&
        typeof n.ref === "function" &&
        n.ref._stringRef === l
      )
        return n.ref;
      return (
        (n = function (u) {
          var v = r.refs;
          u === null ? delete v[l] : (v[l] = u);
        }),
        (n._stringRef = l),
        n
      );
    }
    if (typeof e !== "string") throw Error(m(284));
    if (!f._owner) throw Error(m(290, e));
  }
  return e;
}
function Ut(e, n) {
  throw (
    (e = Object.prototype.toString.call(n)),
    Error(
      m(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(n).join(", ") + "}"
          : e,
      ),
    )
  );
}
function mi(e) {
  var n = e._init;
  return n(e._payload);
}
function Ko(e) {
  function n(c, P) {
    if (e) {
      var s = c.deletions;
      s === null ? ((c.deletions = [P]), (c.flags |= 16)) : s.push(P);
    }
  }
  function f(c, P) {
    if (!e) return null;
    for (; P !== null; ) (n(c, P), (P = P.sibling));
    return null;
  }
  function t(c, P) {
    for (c = new Map(); P !== null; )
      (P.key !== null ? c.set(P.key, P) : c.set(P.index, P), (P = P.sibling));
    return c;
  }
  function r(c, P) {
    return ((c = Xn(c, P)), (c.index = 0), (c.sibling = null), c);
  }
  function l(c, P, s) {
    if (((c.index = s), !e)) return ((c.flags |= 1048576), P);
    if (((s = c.alternate), s !== null))
      return ((s = s.index), s < P ? ((c.flags |= 2), P) : s);
    return ((c.flags |= 2), P);
  }
  function u(c) {
    return (e && c.alternate === null && (c.flags |= 2), c);
  }
  function v(c, P, s, H) {
    if (P === null || P.tag !== 6)
      return ((P = Dl(s, c.mode, H)), (P.return = c), P);
    return ((P = r(P, s)), (P.return = c), P);
  }
  function i(c, P, s, H) {
    var x = s.type;
    if (x === Bn) return p(c, P, s.props.children, H, s.key);
    if (
      P !== null &&
      (P.elementType === x ||
        (typeof x === "object" &&
          x !== null &&
          x.$$typeof === tn &&
          mi(x) === P.type))
    )
      return ((H = r(P, s.props)), (H.ref = Of(c, P, s)), (H.return = c), H);
    return (
      (H = or(s.type, s.key, s.props, null, c.mode, H)),
      (H.ref = Of(c, P, s)),
      (H.return = c),
      H
    );
  }
  function d(c, P, s, H) {
    if (
      P === null ||
      P.tag !== 4 ||
      P.stateNode.containerInfo !== s.containerInfo ||
      P.stateNode.implementation !== s.implementation
    )
      return ((P = Ol(s, c.mode, H)), (P.return = c), P);
    return ((P = r(P, s.children || [])), (P.return = c), P);
  }
  function p(c, P, s, H, x) {
    if (P === null || P.tag !== 7)
      return ((P = On(s, c.mode, H, x)), (P.return = c), P);
    return ((P = r(P, s)), (P.return = c), P);
  }
  function X(c, P, s) {
    if ((typeof P === "string" && P !== "") || typeof P === "number")
      return ((P = Dl("" + P, c.mode, s)), (P.return = c), P);
    if (typeof P === "object" && P !== null) {
      switch (P.$$typeof) {
        case Jt:
          return (
            (s = or(P.type, P.key, P.props, null, c.mode, s)),
            (s.ref = Of(c, null, P)),
            (s.return = c),
            s
          );
        case Un:
          return ((P = Ol(P, c.mode, s)), (P.return = c), P);
        case tn:
          var H = P._init;
          return X(c, H(P._payload), s);
      }
      if (Wf(P) || Lf(P))
        return ((P = On(P, c.mode, s, null)), (P.return = c), P);
      Ut(c, P);
    }
    return null;
  }
  function g(c, P, s, H) {
    var x = P !== null ? P.key : null;
    if ((typeof s === "string" && s !== "") || typeof s === "number")
      return x !== null ? null : v(c, P, "" + s, H);
    if (typeof s === "object" && s !== null) {
      switch (s.$$typeof) {
        case Jt:
          return s.key === x ? i(c, P, s, H) : null;
        case Un:
          return s.key === x ? d(c, P, s, H) : null;
        case tn:
          return ((x = s._init), g(c, P, x(s._payload), H));
      }
      if (Wf(s) || Lf(s)) return x !== null ? null : p(c, P, s, H, null);
      Ut(c, s);
    }
    return null;
  }
  function y(c, P, s, H, x) {
    if ((typeof H === "string" && H !== "") || typeof H === "number")
      return ((c = c.get(s) || null), v(P, c, "" + H, x));
    if (typeof H === "object" && H !== null) {
      switch (H.$$typeof) {
        case Jt:
          return (
            (c = c.get(H.key === null ? s : H.key) || null),
            i(P, c, H, x)
          );
        case Un:
          return (
            (c = c.get(H.key === null ? s : H.key) || null),
            d(P, c, H, x)
          );
        case tn:
          var T = H._init;
          return y(c, P, s, T(H._payload), x);
      }
      if (Wf(H) || Lf(H)) return ((c = c.get(s) || null), p(P, c, H, x, null));
      Ut(P, H);
    }
    return null;
  }
  function C(c, P, s, H) {
    for (
      var x = null, T = null, N = P, z = (P = 0), A = null;
      N !== null && z < s.length;
      z++
    ) {
      N.index > z ? ((A = N), (N = null)) : (A = N.sibling);
      var L = g(c, N, s[z], H);
      if (L === null) {
        N === null && (N = A);
        break;
      }
      (e && N && L.alternate === null && n(c, N),
        (P = l(L, P, z)),
        T === null ? (x = L) : (T.sibling = L),
        (T = L),
        (N = A));
    }
    if (z === s.length) return (f(c, N), W && Nn(c, z), x);
    if (N === null) {
      for (; z < s.length; z++)
        ((N = X(c, s[z], H)),
          N !== null &&
            ((P = l(N, P, z)),
            T === null ? (x = N) : (T.sibling = N),
            (T = N)));
      return (W && Nn(c, z), x);
    }
    for (N = t(c, N); z < s.length; z++)
      ((A = y(N, c, z, s[z], H)),
        A !== null &&
          (e && A.alternate !== null && N.delete(A.key === null ? z : A.key),
          (P = l(A, P, z)),
          T === null ? (x = A) : (T.sibling = A),
          (T = A)));
    return (
      e &&
        N.forEach(function (en) {
          return n(c, en);
        }),
      W && Nn(c, z),
      x
    );
  }
  function h(c, P, s, H) {
    var x = Lf(s);
    if (typeof x !== "function") throw Error(m(150));
    if (((s = x.call(s)), s == null)) throw Error(m(151));
    for (
      var T = (x = null), N = P, z = (P = 0), A = null, L = s.next();
      N !== null && !L.done;
      z++, L = s.next()
    ) {
      N.index > z ? ((A = N), (N = null)) : (A = N.sibling);
      var en = g(c, N, L.value, H);
      if (en === null) {
        N === null && (N = A);
        break;
      }
      (e && N && en.alternate === null && n(c, N),
        (P = l(en, P, z)),
        T === null ? (x = en) : (T.sibling = en),
        (T = en),
        (N = A));
    }
    if (L.done) return (f(c, N), W && Nn(c, z), x);
    if (N === null) {
      for (; !L.done; z++, L = s.next())
        ((L = X(c, L.value, H)),
          L !== null &&
            ((P = l(L, P, z)),
            T === null ? (x = L) : (T.sibling = L),
            (T = L)));
      return (W && Nn(c, z), x);
    }
    for (N = t(c, N); !L.done; z++, L = s.next())
      ((L = y(N, c, z, L.value, H)),
        L !== null &&
          (e && L.alternate !== null && N.delete(L.key === null ? z : L.key),
          (P = l(L, P, z)),
          T === null ? (x = L) : (T.sibling = L),
          (T = L)));
    return (
      e &&
        N.forEach(function (z7) {
          return n(c, z7);
        }),
      W && Nn(c, z),
      x
    );
  }
  function Z(c, P, s, H) {
    if (
      (typeof s === "object" &&
        s !== null &&
        s.type === Bn &&
        s.key === null &&
        (s = s.props.children),
      typeof s === "object" && s !== null)
    ) {
      switch (s.$$typeof) {
        case Jt:
          e: {
            for (var x = s.key, T = P; T !== null; ) {
              if (T.key === x) {
                if (((x = s.type), x === Bn)) {
                  if (T.tag === 7) {
                    (f(c, T.sibling),
                      (P = r(T, s.props.children)),
                      (P.return = c),
                      (c = P));
                    break e;
                  }
                } else if (
                  T.elementType === x ||
                  (typeof x === "object" &&
                    x !== null &&
                    x.$$typeof === tn &&
                    mi(x) === T.type)
                ) {
                  (f(c, T.sibling),
                    (P = r(T, s.props)),
                    (P.ref = Of(c, T, s)),
                    (P.return = c),
                    (c = P));
                  break e;
                }
                f(c, T);
                break;
              } else n(c, T);
              T = T.sibling;
            }
            s.type === Bn
              ? ((P = On(s.props.children, c.mode, H, s.key)),
                (P.return = c),
                (c = P))
              : ((H = or(s.type, s.key, s.props, null, c.mode, H)),
                (H.ref = Of(c, P, s)),
                (H.return = c),
                (c = H));
          }
          return u(c);
        case Un:
          e: {
            for (T = s.key; P !== null; ) {
              if (P.key === T)
                if (
                  P.tag === 4 &&
                  P.stateNode.containerInfo === s.containerInfo &&
                  P.stateNode.implementation === s.implementation
                ) {
                  (f(c, P.sibling),
                    (P = r(P, s.children || [])),
                    (P.return = c),
                    (c = P));
                  break e;
                } else {
                  f(c, P);
                  break;
                }
              else n(c, P);
              P = P.sibling;
            }
            ((P = Ol(s, c.mode, H)), (P.return = c), (c = P));
          }
          return u(c);
        case tn:
          return ((T = s._init), Z(c, P, T(s._payload), H));
      }
      if (Wf(s)) return C(c, P, s, H);
      if (Lf(s)) return h(c, P, s, H);
      Ut(c, s);
    }
    return (typeof s === "string" && s !== "") || typeof s === "number"
      ? ((s = "" + s),
        P !== null && P.tag === 6
          ? (f(c, P.sibling), (P = r(P, s)), (P.return = c), (c = P))
          : (f(c, P), (P = Dl(s, c.mode, H)), (P.return = c), (c = P)),
        u(c))
      : f(c, P);
  }
  return Z;
}
function Gu() {
  Mu = rf = wr = null;
}
function Uu(e) {
  var n = Cr.current;
  (j(Cr), (e._currentValue = n));
}
function au(e, n, f) {
  for (; e !== null; ) {
    var t = e.alternate;
    if (
      ((e.childLanes & n) !== n
        ? ((e.childLanes |= n), t !== null && (t.childLanes |= n))
        : t !== null && (t.childLanes & n) !== n && (t.childLanes |= n),
      e === f)
    )
      break;
    e = e.return;
  }
}
function df(e, n) {
  ((wr = e),
    (Mu = rf = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      ((e.lanes & n) !== 0 && (oe = !0), (e.firstContext = null)));
}
function Ce(e) {
  var n = e._currentValue;
  if (Mu !== e)
    if (((e = { context: e, memoizedValue: n, next: null }), rf === null)) {
      if (wr === null) throw Error(m(308));
      ((rf = e), (wr.dependencies = { lanes: 0, firstContext: e }));
    } else rf = rf.next = e;
  return n;
}
function Bu(e) {
  In === null ? (In = [e]) : In.push(e);
}
function Mo(e, n, f, t) {
  var r = n.interleaved;
  return (
    r === null ? ((f.next = f), Bu(n)) : ((f.next = r.next), (r.next = f)),
    (n.interleaved = f),
    Be(e, t)
  );
}
function Be(e, n) {
  e.lanes |= n;
  var f = e.alternate;
  (f !== null && (f.lanes |= n), (f = e));
  for (e = e.return; e !== null; )
    ((e.childLanes |= n),
      (f = e.alternate),
      f !== null && (f.childLanes |= n),
      (f = e),
      (e = e.return));
  return f.tag === 3 ? f.stateNode : null;
}
function Qu(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Go(e, n) {
  ((e = e.updateQueue),
    n.updateQueue === e &&
      (n.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      }));
}
function Me(e, n) {
  return {
    eventTime: e,
    lane: n,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function sn(e, n, f) {
  var t = e.updateQueue;
  if (t === null) return null;
  if (((t = t.shared), (I & 2) !== 0)) {
    var r = t.pending;
    return (
      r === null ? (n.next = n) : ((n.next = r.next), (r.next = n)),
      (t.pending = n),
      Be(e, f)
    );
  }
  return (
    (r = t.interleaved),
    r === null ? ((n.next = n), Bu(t)) : ((n.next = r.next), (r.next = n)),
    (t.interleaved = n),
    Be(e, f)
  );
}
function tr(e, n, f) {
  if (
    ((n = n.updateQueue), n !== null && ((n = n.shared), (f & 4194240) !== 0))
  ) {
    var t = n.lanes;
    ((t &= e.pendingLanes), (f |= t), (n.lanes = f), Zu(e, f));
  }
}
function Hi(e, n) {
  var { updateQueue: f, alternate: t } = e;
  if (t !== null && ((t = t.updateQueue), f === t)) {
    var r = null,
      l = null;
    if (((f = f.firstBaseUpdate), f !== null)) {
      do {
        var u = {
          eventTime: f.eventTime,
          lane: f.lane,
          tag: f.tag,
          payload: f.payload,
          callback: f.callback,
          next: null,
        };
        (l === null ? (r = l = u) : (l = l.next = u), (f = f.next));
      } while (f !== null);
      l === null ? (r = l = n) : (l = l.next = n);
    } else r = l = n;
    ((f = {
      baseState: t.baseState,
      firstBaseUpdate: r,
      lastBaseUpdate: l,
      shared: t.shared,
      effects: t.effects,
    }),
      (e.updateQueue = f));
    return;
  }
  ((e = f.lastBaseUpdate),
    e === null ? (f.firstBaseUpdate = n) : (e.next = n),
    (f.lastBaseUpdate = n));
}
function xr(e, n, f, t) {
  var r = e.updateQueue;
  rn = !1;
  var { firstBaseUpdate: l, lastBaseUpdate: u } = r,
    v = r.shared.pending;
  if (v !== null) {
    r.shared.pending = null;
    var i = v,
      d = i.next;
    ((i.next = null), u === null ? (l = d) : (u.next = d), (u = i));
    var p = e.alternate;
    p !== null &&
      ((p = p.updateQueue),
      (v = p.lastBaseUpdate),
      v !== u &&
        (v === null ? (p.firstBaseUpdate = d) : (v.next = d),
        (p.lastBaseUpdate = i)));
  }
  if (l !== null) {
    var X = r.baseState;
    ((u = 0), (p = d = i = null), (v = l));
    do {
      var { lane: g, eventTime: y } = v;
      if ((t & g) === g) {
        p !== null &&
          (p = p.next =
            {
              eventTime: y,
              lane: 0,
              tag: v.tag,
              payload: v.payload,
              callback: v.callback,
              next: null,
            });
        e: {
          var C = e,
            h = v;
          switch (((g = n), (y = f), h.tag)) {
            case 1:
              if (((C = h.payload), typeof C === "function")) {
                X = C.call(y, X, g);
                break e;
              }
              X = C;
              break e;
            case 3:
              C.flags = (C.flags & -65537) | 128;
            case 0:
              if (
                ((C = h.payload),
                (g = typeof C === "function" ? C.call(y, X, g) : C),
                g === null || g === void 0)
              )
                break e;
              X = q({}, X, g);
              break e;
            case 2:
              rn = !0;
          }
        }
        v.callback !== null &&
          v.lane !== 0 &&
          ((e.flags |= 64),
          (g = r.effects),
          g === null ? (r.effects = [v]) : g.push(v));
      } else
        ((y = {
          eventTime: y,
          lane: g,
          tag: v.tag,
          payload: v.payload,
          callback: v.callback,
          next: null,
        }),
          p === null ? ((d = p = y), (i = X)) : (p = p.next = y),
          (u |= g));
      if (((v = v.next), v === null))
        if (((v = r.shared.pending), v === null)) break;
        else
          ((g = v),
            (v = g.next),
            (g.next = null),
            (r.lastBaseUpdate = g),
            (r.shared.pending = null));
    } while (1);
    if (
      (p === null && (i = X),
      (r.baseState = i),
      (r.firstBaseUpdate = d),
      (r.lastBaseUpdate = p),
      (n = r.shared.interleaved),
      n !== null)
    ) {
      r = n;
      do ((u |= r.lane), (r = r.next));
      while (r !== n);
    } else l === null && (r.shared.lanes = 0);
    ((Wn |= u), (e.lanes = u), (e.memoizedState = X));
  }
}
function yi(e, n, f) {
  if (((e = n.effects), (n.effects = null), e !== null))
    for (n = 0; n < e.length; n++) {
      var t = e[n],
        r = t.callback;
      if (r !== null) {
        if (((t.callback = null), (t = f), typeof r !== "function"))
          throw Error(m(191, r));
        r.call(t);
      }
    }
}
function bn(e) {
  if (e === mt) throw Error(m(174));
  return e;
}
function _u(e, n) {
  switch ((O(at, n), O(Pt, e), O(ke, mt), (e = n.nodeType), e)) {
    case 9:
    case 11:
      n = (n = n.documentElement) ? n.namespaceURI : Rl(null, "");
      break;
    default:
      ((e = e === 8 ? n.parentNode : n),
        (n = e.namespaceURI || null),
        (e = e.tagName),
        (n = Rl(n, e)));
  }
  (j(ke), O(ke, n));
}
function gf() {
  (j(ke), j(Pt), j(at));
}
function Uo(e) {
  bn(at.current);
  var n = bn(ke.current),
    f = Rl(n, e.type);
  n !== f && (O(Pt, e), O(ke, f));
}
function $u(e) {
  Pt.current === e && (j(ke), j(Pt));
}
function Tr(e) {
  for (var n = e; n !== null; ) {
    if (n.tag === 13) {
      var f = n.memoizedState;
      if (
        f !== null &&
        ((f = f.dehydrated), f === null || f.data === "$?" || f.data === "$!")
      )
        return n;
    } else if (n.tag === 19 && n.memoizedProps.revealOrder !== void 0) {
      if ((n.flags & 128) !== 0) return n;
    } else if (n.child !== null) {
      ((n.child.return = n), (n = n.child));
      continue;
    }
    if (n === e) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === e) return null;
      n = n.return;
    }
    ((n.sibling.return = n.return), (n = n.sibling));
  }
  return null;
}
function ev() {
  for (var e = 0; e < Tl.length; e++)
    Tl[e]._workInProgressVersionPrimary = null;
  Tl.length = 0;
}
function $() {
  throw Error(m(321));
}
function nv(e, n) {
  if (n === null) return !1;
  for (var f = 0; f < n.length && f < e.length; f++)
    if (!Oe(e[f], n[f])) return !1;
  return !0;
}
function fv(e, n, f, t, r, l) {
  if (
    ((Zn = l),
    (k = n),
    (n.memoizedState = null),
    (n.updateQueue = null),
    (n.lanes = 0),
    (rr.current = e === null || e.memoizedState === null ? da : ca),
    (e = f(t, r)),
    Uf)
  ) {
    l = 0;
    do {
      if (((Uf = !1), (dt = 0), 25 <= l)) throw Error(m(301));
      ((l += 1),
        (M = K = null),
        (n.updateQueue = null),
        (rr.current = sa),
        (e = f(t, r)));
    } while (Uf);
  }
  if (
    ((rr.current = Ar),
    (n = K !== null && K.next !== null),
    (Zn = 0),
    (M = K = k = null),
    (Nr = !1),
    n)
  )
    throw Error(m(300));
  return e;
}
function tv() {
  var e = dt !== 0;
  return ((dt = 0), e);
}
function We() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return (M === null ? (k.memoizedState = M = e) : (M = M.next = e), M);
}
function we() {
  if (K === null) {
    var e = k.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = K.next;
  var n = M === null ? k.memoizedState : M.next;
  if (n !== null) ((M = n), (K = e));
  else {
    if (e === null) throw Error(m(310));
    ((K = e),
      (e = {
        memoizedState: K.memoizedState,
        baseState: K.baseState,
        baseQueue: K.baseQueue,
        queue: K.queue,
        next: null,
      }),
      M === null ? (k.memoizedState = M = e) : (M = M.next = e));
  }
  return M;
}
function ct(e, n) {
  return typeof n === "function" ? n(e) : n;
}
function Al(e) {
  var n = we(),
    f = n.queue;
  if (f === null) throw Error(m(311));
  f.lastRenderedReducer = e;
  var t = K,
    r = t.baseQueue,
    l = f.pending;
  if (l !== null) {
    if (r !== null) {
      var u = r.next;
      ((r.next = l.next), (l.next = u));
    }
    ((t.baseQueue = r = l), (f.pending = null));
  }
  if (r !== null) {
    ((l = r.next), (t = t.baseState));
    var v = (u = null),
      i = null,
      d = l;
    do {
      var p = d.lane;
      if ((Zn & p) === p)
        (i !== null &&
          (i = i.next =
            {
              lane: 0,
              action: d.action,
              hasEagerState: d.hasEagerState,
              eagerState: d.eagerState,
              next: null,
            }),
          (t = d.hasEagerState ? d.eagerState : e(t, d.action)));
      else {
        var X = {
          lane: p,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null,
        };
        (i === null ? ((v = i = X), (u = t)) : (i = i.next = X),
          (k.lanes |= p),
          (Wn |= p));
      }
      d = d.next;
    } while (d !== null && d !== l);
    (i === null ? (u = t) : (i.next = v),
      Oe(t, n.memoizedState) || (oe = !0),
      (n.memoizedState = t),
      (n.baseState = u),
      (n.baseQueue = i),
      (f.lastRenderedState = t));
  }
  if (((e = f.interleaved), e !== null)) {
    r = e;
    do ((l = r.lane), (k.lanes |= l), (Wn |= l), (r = r.next));
    while (r !== e);
  } else r === null && (f.lanes = 0);
  return [n.memoizedState, f.dispatch];
}
function Ll(e) {
  var n = we(),
    f = n.queue;
  if (f === null) throw Error(m(311));
  f.lastRenderedReducer = e;
  var { dispatch: t, pending: r } = f,
    l = n.memoizedState;
  if (r !== null) {
    f.pending = null;
    var u = (r = r.next);
    do ((l = e(l, u.action)), (u = u.next));
    while (u !== r);
    (Oe(l, n.memoizedState) || (oe = !0),
      (n.memoizedState = l),
      n.baseQueue === null && (n.baseState = l),
      (f.lastRenderedState = l));
  }
  return [l, t];
}
function Bo() {}
function Qo(e, n) {
  var f = k,
    t = we(),
    r = n(),
    l = !Oe(t.memoizedState, r);
  if (
    (l && ((t.memoizedState = r), (oe = !0)),
    (t = t.queue),
    rv(e9.bind(null, f, t, e), [e]),
    t.getSnapshot !== n || l || (M !== null && M.memoizedState.tag & 1))
  ) {
    if (
      ((f.flags |= 2048),
      st(9, $o.bind(null, f, t, r, n), void 0, null),
      G === null)
    )
      throw Error(m(349));
    (Zn & 30) !== 0 || _o(f, n, r);
  }
  return r;
}
function _o(e, n, f) {
  ((e.flags |= 16384),
    (e = { getSnapshot: n, value: f }),
    (n = k.updateQueue),
    n === null
      ? ((n = { lastEffect: null, stores: null }),
        (k.updateQueue = n),
        (n.stores = [e]))
      : ((f = n.stores), f === null ? (n.stores = [e]) : f.push(e)));
}
function $o(e, n, f, t) {
  ((n.value = f), (n.getSnapshot = t), n9(n) && f9(e));
}
function e9(e, n, f) {
  return f(function () {
    n9(n) && f9(e);
  });
}
function n9(e) {
  var n = e.getSnapshot;
  e = e.value;
  try {
    var f = n();
    return !Oe(e, f);
  } catch (t) {
    return !0;
  }
}
function f9(e) {
  var n = Be(e, 1);
  n !== null && De(n, e, 1, -1);
}
function hi(e) {
  var n = We();
  return (
    typeof e === "function" && (e = e()),
    (n.memoizedState = n.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ct,
      lastRenderedState: e,
    }),
    (n.queue = e),
    (e = e.dispatch = aa.bind(null, k, e)),
    [n.memoizedState, e]
  );
}
function st(e, n, f, t) {
  return (
    (e = { tag: e, create: n, destroy: f, deps: t, next: null }),
    (n = k.updateQueue),
    n === null
      ? ((n = { lastEffect: null, stores: null }),
        (k.updateQueue = n),
        (n.lastEffect = e.next = e))
      : ((f = n.lastEffect),
        f === null
          ? (n.lastEffect = e.next = e)
          : ((t = f.next), (f.next = e), (e.next = t), (n.lastEffect = e))),
    e
  );
}
function t9() {
  return we().memoizedState;
}
function lr(e, n, f, t) {
  var r = We();
  ((k.flags |= e),
    (r.memoizedState = st(1 | n, f, void 0, t === void 0 ? null : t)));
}
function kr(e, n, f, t) {
  var r = we();
  t = t === void 0 ? null : t;
  var l = void 0;
  if (K !== null) {
    var u = K.memoizedState;
    if (((l = u.destroy), t !== null && nv(t, u.deps))) {
      r.memoizedState = st(n, f, l, t);
      return;
    }
  }
  ((k.flags |= e), (r.memoizedState = st(1 | n, f, l, t)));
}
function Ci(e, n) {
  return lr(8390656, 8, e, n);
}
function rv(e, n) {
  return kr(2048, 8, e, n);
}
function r9(e, n) {
  return kr(4, 2, e, n);
}
function l9(e, n) {
  return kr(4, 4, e, n);
}
function u9(e, n) {
  if (typeof n === "function")
    return (
      (e = e()),
      n(e),
      function () {
        n(null);
      }
    );
  if (n !== null && n !== void 0)
    return (
      (e = e()),
      (n.current = e),
      function () {
        n.current = null;
      }
    );
}
function v9(e, n, f) {
  return (
    (f = f !== null && f !== void 0 ? f.concat([e]) : null),
    kr(4, 4, u9.bind(null, n, e), f)
  );
}
function lv() {}
function i9(e, n) {
  var f = we();
  n = n === void 0 ? null : n;
  var t = f.memoizedState;
  if (t !== null && n !== null && nv(n, t[1])) return t[0];
  return ((f.memoizedState = [e, n]), e);
}
function o9(e, n) {
  var f = we();
  n = n === void 0 ? null : n;
  var t = f.memoizedState;
  if (t !== null && n !== null && nv(n, t[1])) return t[0];
  return ((e = e()), (f.memoizedState = [e, n]), e);
}
function P9(e, n, f) {
  if ((Zn & 21) === 0)
    return (
      e.baseState && ((e.baseState = !1), (oe = !0)),
      (e.memoizedState = f)
    );
  return (
    Oe(f, n) || ((f = zo()), (k.lanes |= f), (Wn |= f), (e.baseState = !0)),
    n
  );
}
function oa(e, n) {
  var f = D;
  ((D = f !== 0 && 4 > f ? f : 4), e(!0));
  var t = Nl.transition;
  Nl.transition = {};
  try {
    (e(!1), n());
  } finally {
    ((D = f), (Nl.transition = t));
  }
}
function a9() {
  return we().memoizedState;
}
function Pa(e, n, f) {
  var t = pn(e);
  if (
    ((f = {
      lane: t,
      action: f,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    d9(e))
  )
    c9(n, f);
  else if (((f = Mo(e, n, f, t)), f !== null)) {
    var r = le();
    (De(f, e, t, r), s9(f, n, t));
  }
}
function aa(e, n, f) {
  var t = pn(e),
    r = { lane: t, action: f, hasEagerState: !1, eagerState: null, next: null };
  if (d9(e)) c9(n, r);
  else {
    var l = e.alternate;
    if (
      e.lanes === 0 &&
      (l === null || l.lanes === 0) &&
      ((l = n.lastRenderedReducer), l !== null)
    )
      try {
        var u = n.lastRenderedState,
          v = l(u, f);
        if (((r.hasEagerState = !0), (r.eagerState = v), Oe(v, u))) {
          var i = n.interleaved;
          (i === null
            ? ((r.next = r), Bu(n))
            : ((r.next = i.next), (i.next = r)),
            (n.interleaved = r));
          return;
        }
      } catch (d) {
      } finally {
      }
    ((f = Mo(e, n, r, t)),
      f !== null && ((r = le()), De(f, e, t, r), s9(f, n, t)));
  }
}
function d9(e) {
  var n = e.alternate;
  return e === k || (n !== null && n === k);
}
function c9(e, n) {
  Uf = Nr = !0;
  var f = e.pending;
  (f === null ? (n.next = n) : ((n.next = f.next), (f.next = n)),
    (e.pending = n));
}
function s9(e, n, f) {
  if ((f & 4194240) !== 0) {
    var t = n.lanes;
    ((t &= e.pendingLanes), (f |= t), (n.lanes = f), Zu(e, f));
  }
}
function Ae(e, n) {
  if (e && e.defaultProps) {
    ((n = q({}, n)), (e = e.defaultProps));
    for (var f in e) n[f] === void 0 && (n[f] = e[f]);
    return n;
  }
  return n;
}
function du(e, n, f, t) {
  ((n = e.memoizedState),
    (f = f(t, n)),
    (f = f === null || f === void 0 ? n : q({}, n, f)),
    (e.memoizedState = f),
    e.lanes === 0 && (e.updateQueue.baseState = f));
}
function wi(e, n, f, t, r, l, u) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate === "function"
      ? e.shouldComponentUpdate(t, l, u)
      : n.prototype && n.prototype.isPureReactComponent
        ? !ut(f, t) || !ut(r, l)
        : !0
  );
}
function z9(e, n, f) {
  var t = !1,
    r = mn,
    l = n.contextType;
  return (
    typeof l === "object" && l !== null
      ? (l = Ce(l))
      : ((r = ae(n) ? Sn : fe.current),
        (t = n.contextTypes),
        (l = (t = t !== null && t !== void 0) ? zf(e, r) : mn)),
    (n = new n(f, l)),
    (e.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null),
    (n.updater = qr),
    (e.stateNode = n),
    (n._reactInternals = e),
    t &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = r),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    n
  );
}
function xi(e, n, f, t) {
  ((e = n.state),
    typeof n.componentWillReceiveProps === "function" &&
      n.componentWillReceiveProps(f, t),
    typeof n.UNSAFE_componentWillReceiveProps === "function" &&
      n.UNSAFE_componentWillReceiveProps(f, t),
    n.state !== e && qr.enqueueReplaceState(n, n.state, null));
}
function cu(e, n, f, t) {
  var r = e.stateNode;
  ((r.props = f), (r.state = e.memoizedState), (r.refs = {}), Qu(e));
  var l = n.contextType;
  (typeof l === "object" && l !== null
    ? (r.context = Ce(l))
    : ((l = ae(n) ? Sn : fe.current), (r.context = zf(e, l))),
    (r.state = e.memoizedState),
    (l = n.getDerivedStateFromProps),
    typeof l === "function" && (du(e, n, l, f), (r.state = e.memoizedState)),
    typeof n.getDerivedStateFromProps === "function" ||
      typeof r.getSnapshotBeforeUpdate === "function" ||
      (typeof r.UNSAFE_componentWillMount !== "function" &&
        typeof r.componentWillMount !== "function") ||
      ((n = r.state),
      typeof r.componentWillMount === "function" && r.componentWillMount(),
      typeof r.UNSAFE_componentWillMount === "function" &&
        r.UNSAFE_componentWillMount(),
      n !== r.state && qr.enqueueReplaceState(r, r.state, null),
      xr(e, f, r, t),
      (r.state = e.memoizedState)),
    typeof r.componentDidMount === "function" && (e.flags |= 4194308));
}
function mf(e, n) {
  try {
    var f = "",
      t = n;
    do ((f += YP(t)), (t = t.return));
    while (t);
    var r = f;
  } catch (l) {
    r =
      `
Error generating stack: ` +
      l.message +
      `
` +
      l.stack;
  }
  return { value: e, source: n, stack: r, digest: null };
}
function Il(e, n, f) {
  return {
    value: e,
    source: null,
    stack: f != null ? f : null,
    digest: n != null ? n : null,
  };
}
function su(e, n) {
  try {
    console.error(n.value);
  } catch (f) {
    setTimeout(function () {
      throw f;
    });
  }
}
function p9(e, n, f) {
  ((f = Me(-1, f)), (f.tag = 3), (f.payload = { element: null }));
  var t = n.value;
  return (
    (f.callback = function () {
      (Ir || ((Ir = !0), (wu = t)), su(e, n));
    }),
    f
  );
}
function X9(e, n, f) {
  ((f = Me(-1, f)), (f.tag = 3));
  var t = e.type.getDerivedStateFromError;
  if (typeof t === "function") {
    var r = n.value;
    ((f.payload = function () {
      return t(r);
    }),
      (f.callback = function () {
        su(e, n);
      }));
  }
  var l = e.stateNode;
  return (
    l !== null &&
      typeof l.componentDidCatch === "function" &&
      (f.callback = function () {
        (su(e, n),
          typeof t !== "function" &&
            (zn === null ? (zn = new Set([this])) : zn.add(this)));
        var u = n.stack;
        this.componentDidCatch(n.value, {
          componentStack: u !== null ? u : "",
        });
      }),
    f
  );
}
function Ti(e, n, f) {
  var t = e.pingCache;
  if (t === null) {
    t = e.pingCache = new za();
    var r = new Set();
    t.set(n, r);
  } else ((r = t.get(n)), r === void 0 && ((r = new Set()), t.set(n, r)));
  r.has(f) || (r.add(f), (e = La.bind(null, e, n, f)), n.then(e, e));
}
function Ni(e) {
  do {
    var n;
    if ((n = e.tag === 13))
      ((n = e.memoizedState),
        (n = n !== null ? (n.dehydrated !== null ? !0 : !1) : !0));
    if (n) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Ai(e, n, f, t, r) {
  if ((e.mode & 1) === 0)
    return (
      e === n
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (f.flags |= 131072),
          (f.flags &= -52805),
          f.tag === 1 &&
            (f.alternate === null
              ? (f.tag = 17)
              : ((n = Me(-1, 1)), (n.tag = 2), sn(f, n, 1))),
          (f.lanes |= 1)),
      e
    );
  return ((e.flags |= 65536), (e.lanes = r), e);
}
function re(e, n, f, t) {
  n.child = e === null ? Eo(n, null, f, t) : Xf(n, e.child, f, t);
}
function Li(e, n, f, t, r) {
  f = f.render;
  var l = n.ref;
  if ((df(n, r), (t = fv(e, n, f, t, l, r)), (f = tv()), e !== null && !oe))
    return (
      (n.updateQueue = e.updateQueue),
      (n.flags &= -2053),
      (e.lanes &= ~r),
      Qe(e, n, r)
    );
  return (W && f && Yu(n), (n.flags |= 1), re(e, n, t, r), n.child);
}
function Ii(e, n, f, t, r) {
  if (e === null) {
    var l = f.type;
    if (
      typeof l === "function" &&
      !cv(l) &&
      l.defaultProps === void 0 &&
      f.compare === null &&
      f.defaultProps === void 0
    )
      return ((n.tag = 15), (n.type = l), g9(e, n, l, t, r));
    return (
      (e = or(f.type, null, t, n, n.mode, r)),
      (e.ref = n.ref),
      (e.return = n),
      (n.child = e)
    );
  }
  if (((l = e.child), (e.lanes & r) === 0)) {
    var u = l.memoizedProps;
    if (
      ((f = f.compare), (f = f !== null ? f : ut), f(u, t) && e.ref === n.ref)
    )
      return Qe(e, n, r);
  }
  return (
    (n.flags |= 1),
    (e = Xn(l, t)),
    (e.ref = n.ref),
    (e.return = n),
    (n.child = e)
  );
}
function g9(e, n, f, t, r) {
  if (e !== null) {
    var l = e.memoizedProps;
    if (ut(l, t) && e.ref === n.ref)
      if (((oe = !1), (n.pendingProps = t = l), (e.lanes & r) !== 0))
        (e.flags & 131072) !== 0 && (oe = !0);
      else return ((n.lanes = e.lanes), Qe(e, n, r));
  }
  return zu(e, n, f, t, r);
}
function m9(e, n, f) {
  var t = n.pendingProps,
    r = t.children,
    l = e !== null ? e.memoizedState : null;
  if (t.mode === "hidden")
    if ((n.mode & 1) === 0)
      ((n.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        O(uf, ce),
        (ce |= f));
    else {
      if ((f & 1073741824) === 0)
        return (
          (e = l !== null ? l.baseLanes | f : f),
          (n.lanes = n.childLanes = 1073741824),
          (n.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (n.updateQueue = null),
          O(uf, ce),
          (ce |= e),
          null
        );
      ((n.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (t = l !== null ? l.baseLanes : f),
        O(uf, ce),
        (ce |= t));
    }
  else
    (l !== null ? ((t = l.baseLanes | f), (n.memoizedState = null)) : (t = f),
      O(uf, ce),
      (ce |= t));
  return (re(e, n, r, f), n.child);
}
function H9(e, n) {
  var f = n.ref;
  if ((e === null && f !== null) || (e !== null && e.ref !== f))
    ((n.flags |= 512), (n.flags |= 2097152));
}
function zu(e, n, f, t, r) {
  var l = ae(f) ? Sn : fe.current;
  if (
    ((l = zf(n, l)),
    df(n, r),
    (f = fv(e, n, f, t, l, r)),
    (t = tv()),
    e !== null && !oe)
  )
    return (
      (n.updateQueue = e.updateQueue),
      (n.flags &= -2053),
      (e.lanes &= ~r),
      Qe(e, n, r)
    );
  return (W && t && Yu(n), (n.flags |= 1), re(e, n, f, r), n.child);
}
function bi(e, n, f, t, r) {
  if (ae(f)) {
    var l = !0;
    Hr(n);
  } else l = !1;
  if ((df(n, r), n.stateNode === null))
    (ur(e, n), z9(n, f, t), cu(n, f, t, r), (t = !0));
  else if (e === null) {
    var { stateNode: u, memoizedProps: v } = n;
    u.props = v;
    var i = u.context,
      d = f.contextType;
    typeof d === "object" && d !== null
      ? (d = Ce(d))
      : ((d = ae(f) ? Sn : fe.current), (d = zf(n, d)));
    var p = f.getDerivedStateFromProps,
      X =
        typeof p === "function" ||
        typeof u.getSnapshotBeforeUpdate === "function";
    (X ||
      (typeof u.UNSAFE_componentWillReceiveProps !== "function" &&
        typeof u.componentWillReceiveProps !== "function") ||
      ((v !== t || i !== d) && xi(n, u, t, d)),
      (rn = !1));
    var g = n.memoizedState;
    ((u.state = g),
      xr(n, t, u, r),
      (i = n.memoizedState),
      v !== t || g !== i || Pe.current || rn
        ? (typeof p === "function" && (du(n, f, p, t), (i = n.memoizedState)),
          (v = rn || wi(n, f, v, t, g, i, d))
            ? (X ||
                (typeof u.UNSAFE_componentWillMount !== "function" &&
                  typeof u.componentWillMount !== "function") ||
                (typeof u.componentWillMount === "function" &&
                  u.componentWillMount(),
                typeof u.UNSAFE_componentWillMount === "function" &&
                  u.UNSAFE_componentWillMount()),
              typeof u.componentDidMount === "function" && (n.flags |= 4194308))
            : (typeof u.componentDidMount === "function" &&
                (n.flags |= 4194308),
              (n.memoizedProps = t),
              (n.memoizedState = i)),
          (u.props = t),
          (u.state = i),
          (u.context = d),
          (t = v))
        : (typeof u.componentDidMount === "function" && (n.flags |= 4194308),
          (t = !1)));
  } else {
    ((u = n.stateNode),
      Go(e, n),
      (v = n.memoizedProps),
      (d = n.type === n.elementType ? v : Ae(n.type, v)),
      (u.props = d),
      (X = n.pendingProps),
      (g = u.context),
      (i = f.contextType),
      typeof i === "object" && i !== null
        ? (i = Ce(i))
        : ((i = ae(f) ? Sn : fe.current), (i = zf(n, i))));
    var y = f.getDerivedStateFromProps;
    ((p =
      typeof y === "function" ||
      typeof u.getSnapshotBeforeUpdate === "function") ||
      (typeof u.UNSAFE_componentWillReceiveProps !== "function" &&
        typeof u.componentWillReceiveProps !== "function") ||
      ((v !== X || g !== i) && xi(n, u, t, i)),
      (rn = !1),
      (g = n.memoizedState),
      (u.state = g),
      xr(n, t, u, r));
    var C = n.memoizedState;
    v !== X || g !== C || Pe.current || rn
      ? (typeof y === "function" && (du(n, f, y, t), (C = n.memoizedState)),
        (d = rn || wi(n, f, d, t, g, C, i) || !1)
          ? (p ||
              (typeof u.UNSAFE_componentWillUpdate !== "function" &&
                typeof u.componentWillUpdate !== "function") ||
              (typeof u.componentWillUpdate === "function" &&
                u.componentWillUpdate(t, C, i),
              typeof u.UNSAFE_componentWillUpdate === "function" &&
                u.UNSAFE_componentWillUpdate(t, C, i)),
            typeof u.componentDidUpdate === "function" && (n.flags |= 4),
            typeof u.getSnapshotBeforeUpdate === "function" &&
              (n.flags |= 1024))
          : (typeof u.componentDidUpdate !== "function" ||
              (v === e.memoizedProps && g === e.memoizedState) ||
              (n.flags |= 4),
            typeof u.getSnapshotBeforeUpdate !== "function" ||
              (v === e.memoizedProps && g === e.memoizedState) ||
              (n.flags |= 1024),
            (n.memoizedProps = t),
            (n.memoizedState = C)),
        (u.props = t),
        (u.state = C),
        (u.context = i),
        (t = d))
      : (typeof u.componentDidUpdate !== "function" ||
          (v === e.memoizedProps && g === e.memoizedState) ||
          (n.flags |= 4),
        typeof u.getSnapshotBeforeUpdate !== "function" ||
          (v === e.memoizedProps && g === e.memoizedState) ||
          (n.flags |= 1024),
        (t = !1));
  }
  return pu(e, n, f, t, l, r);
}
function pu(e, n, f, t, r, l) {
  H9(e, n);
  var u = (n.flags & 128) !== 0;
  if (!t && !u) return (r && pi(n, f, !1), Qe(e, n, l));
  ((t = n.stateNode), (pa.current = n));
  var v =
    u && typeof f.getDerivedStateFromError !== "function" ? null : t.render();
  return (
    (n.flags |= 1),
    e !== null && u
      ? ((n.child = Xf(n, e.child, null, l)), (n.child = Xf(n, null, v, l)))
      : re(e, n, v, l),
    (n.memoizedState = t.state),
    r && pi(n, f, !0),
    n.child
  );
}
function y9(e) {
  var n = e.stateNode;
  (n.pendingContext
    ? zi(e, n.pendingContext, n.pendingContext !== n.context)
    : n.context && zi(e, n.context, !1),
    _u(e, n.containerInfo));
}
function Di(e, n, f, t, r) {
  return (pf(), Eu(r), (n.flags |= 256), re(e, n, f, t), n.child);
}
function gu(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function h9(e, n, f) {
  var t = n.pendingProps,
    r = V.current,
    l = !1,
    u = (n.flags & 128) !== 0,
    v;
  if (
    ((v = u) ||
      (v = e !== null && e.memoizedState === null ? !1 : (r & 2) !== 0),
    v)
  )
    ((l = !0), (n.flags &= -129));
  else if (e === null || e.memoizedState !== null) r |= 1;
  if ((O(V, r & 1), e === null)) {
    if (
      (Pu(n),
      (e = n.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null))
    )
      return (
        (n.mode & 1) === 0
          ? (n.lanes = 1)
          : e.data === "$!"
            ? (n.lanes = 8)
            : (n.lanes = 1073741824),
        null
      );
    return (
      (u = t.children),
      (e = t.fallback),
      l
        ? ((t = n.mode),
          (l = n.child),
          (u = { mode: "hidden", children: u }),
          (t & 1) === 0 && l !== null
            ? ((l.childLanes = 0), (l.pendingProps = u))
            : (l = Yr(u, t, 0, null)),
          (e = On(e, t, f, null)),
          (l.return = n),
          (e.return = n),
          (l.sibling = e),
          (n.child = l),
          (n.child.memoizedState = gu(f)),
          (n.memoizedState = Xu),
          e)
        : uv(n, u)
    );
  }
  if (((r = e.memoizedState), r !== null && ((v = r.dehydrated), v !== null)))
    return Xa(e, n, u, t, v, r, f);
  if (l) {
    ((l = t.fallback), (u = n.mode), (r = e.child), (v = r.sibling));
    var i = { mode: "hidden", children: t.children };
    return (
      (u & 1) === 0 && n.child !== r
        ? ((t = n.child),
          (t.childLanes = 0),
          (t.pendingProps = i),
          (n.deletions = null))
        : ((t = Xn(r, i)), (t.subtreeFlags = r.subtreeFlags & 14680064)),
      v !== null ? (l = Xn(v, l)) : ((l = On(l, u, f, null)), (l.flags |= 2)),
      (l.return = n),
      (t.return = n),
      (t.sibling = l),
      (n.child = t),
      (t = l),
      (l = n.child),
      (u = e.child.memoizedState),
      (u =
        u === null
          ? gu(f)
          : {
              baseLanes: u.baseLanes | f,
              cachePool: null,
              transitions: u.transitions,
            }),
      (l.memoizedState = u),
      (l.childLanes = e.childLanes & ~f),
      (n.memoizedState = Xu),
      t
    );
  }
  return (
    (l = e.child),
    (e = l.sibling),
    (t = Xn(l, { mode: "visible", children: t.children })),
    (n.mode & 1) === 0 && (t.lanes = f),
    (t.return = n),
    (t.sibling = null),
    e !== null &&
      ((f = n.deletions),
      f === null ? ((n.deletions = [e]), (n.flags |= 16)) : f.push(e)),
    (n.child = t),
    (n.memoizedState = null),
    t
  );
}
function uv(e, n) {
  return (
    (n = Yr({ mode: "visible", children: n }, e.mode, 0, null)),
    (n.return = e),
    (e.child = n)
  );
}
function Bt(e, n, f, t) {
  return (
    t !== null && Eu(t),
    Xf(n, e.child, null, f),
    (e = uv(n, n.pendingProps.children)),
    (e.flags |= 2),
    (n.memoizedState = null),
    e
  );
}
function Xa(e, n, f, t, r, l, u) {
  if (f) {
    if (n.flags & 256)
      return ((n.flags &= -257), (t = Il(Error(m(422)))), Bt(e, n, u, t));
    if (n.memoizedState !== null)
      return ((n.child = e.child), (n.flags |= 128), null);
    return (
      (l = t.fallback),
      (r = n.mode),
      (t = Yr({ mode: "visible", children: t.children }, r, 0, null)),
      (l = On(l, r, u, null)),
      (l.flags |= 2),
      (t.return = n),
      (l.return = n),
      (t.sibling = l),
      (n.child = t),
      (n.mode & 1) !== 0 && Xf(n, e.child, null, u),
      (n.child.memoizedState = gu(u)),
      (n.memoizedState = Xu),
      l
    );
  }
  if ((n.mode & 1) === 0) return Bt(e, n, u, null);
  if (r.data === "$!") {
    if (((t = r.nextSibling && r.nextSibling.dataset), t)) var v = t.dgst;
    return (
      (t = v),
      (l = Error(m(419))),
      (t = Il(l, t, void 0)),
      Bt(e, n, u, t)
    );
  }
  if (((v = (u & e.childLanes) !== 0), oe || v)) {
    if (((t = G), t !== null)) {
      switch (u & -u) {
        case 4:
          r = 2;
          break;
        case 16:
          r = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          r = 32;
          break;
        case 536870912:
          r = 268435456;
          break;
        default:
          r = 0;
      }
      ((r = (r & (t.suspendedLanes | u)) !== 0 ? 0 : r),
        r !== 0 &&
          r !== l.retryLane &&
          ((l.retryLane = r), Be(e, r), De(t, e, r, -1)));
    }
    return (dv(), (t = Il(Error(m(421)))), Bt(e, n, u, t));
  }
  if (r.data === "$?")
    return (
      (n.flags |= 128),
      (n.child = e.child),
      (n = Ia.bind(null, e)),
      (r._reactRetry = n),
      null
    );
  return (
    (e = l.treeContext),
    (se = cn(r.nextSibling)),
    (ze = n),
    (W = !0),
    (Ie = null),
    e !== null &&
      ((me[He++] = Ke),
      (me[He++] = Ee),
      (me[He++] = jn),
      (Ke = e.id),
      (Ee = e.overflow),
      (jn = n)),
    (n = uv(n, t.children)),
    (n.flags |= 4096),
    n
  );
}
function Oi(e, n, f) {
  e.lanes |= n;
  var t = e.alternate;
  (t !== null && (t.lanes |= n), au(e.return, n, f));
}
function bl(e, n, f, t, r) {
  var l = e.memoizedState;
  l === null
    ? (e.memoizedState = {
        isBackwards: n,
        rendering: null,
        renderingStartTime: 0,
        last: t,
        tail: f,
        tailMode: r,
      })
    : ((l.isBackwards = n),
      (l.rendering = null),
      (l.renderingStartTime = 0),
      (l.last = t),
      (l.tail = f),
      (l.tailMode = r));
}
function C9(e, n, f) {
  var t = n.pendingProps,
    r = t.revealOrder,
    l = t.tail;
  if ((re(e, n, t.children, f), (t = V.current), (t & 2) !== 0))
    ((t = (t & 1) | 2), (n.flags |= 128));
  else {
    if (e !== null && (e.flags & 128) !== 0)
      e: for (e = n.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Oi(e, f, n);
        else if (e.tag === 19) Oi(e, f, n);
        else if (e.child !== null) {
          ((e.child.return = e), (e = e.child));
          continue;
        }
        if (e === n) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === n) break e;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    t &= 1;
  }
  if ((O(V, t), (n.mode & 1) === 0)) n.memoizedState = null;
  else
    switch (r) {
      case "forwards":
        f = n.child;
        for (r = null; f !== null; )
          ((e = f.alternate),
            e !== null && Tr(e) === null && (r = f),
            (f = f.sibling));
        ((f = r),
          f === null
            ? ((r = n.child), (n.child = null))
            : ((r = f.sibling), (f.sibling = null)),
          bl(n, !1, r, f, l));
        break;
      case "backwards":
        ((f = null), (r = n.child));
        for (n.child = null; r !== null; ) {
          if (((e = r.alternate), e !== null && Tr(e) === null)) {
            n.child = r;
            break;
          }
          ((e = r.sibling), (r.sibling = f), (f = r), (r = e));
        }
        bl(n, !0, f, null, l);
        break;
      case "together":
        bl(n, !1, null, null, void 0);
        break;
      default:
        n.memoizedState = null;
    }
  return n.child;
}
function ur(e, n) {
  (n.mode & 1) === 0 &&
    e !== null &&
    ((e.alternate = null), (n.alternate = null), (n.flags |= 2));
}
function Qe(e, n, f) {
  if (
    (e !== null && (n.dependencies = e.dependencies),
    (Wn |= n.lanes),
    (f & n.childLanes) === 0)
  )
    return null;
  if (e !== null && n.child !== e.child) throw Error(m(153));
  if (n.child !== null) {
    ((e = n.child), (f = Xn(e, e.pendingProps)), (n.child = f));
    for (f.return = n; e.sibling !== null; )
      ((e = e.sibling),
        (f = f.sibling = Xn(e, e.pendingProps)),
        (f.return = n));
    f.sibling = null;
  }
  return n.child;
}
function ga(e, n, f) {
  switch (n.tag) {
    case 3:
      (y9(n), pf());
      break;
    case 5:
      Uo(n);
      break;
    case 1:
      ae(n.type) && Hr(n);
      break;
    case 4:
      _u(n, n.stateNode.containerInfo);
      break;
    case 10:
      var t = n.type._context,
        r = n.memoizedProps.value;
      (O(Cr, t._currentValue), (t._currentValue = r));
      break;
    case 13:
      if (((t = n.memoizedState), t !== null)) {
        if (t.dehydrated !== null)
          return (O(V, V.current & 1), (n.flags |= 128), null);
        if ((f & n.child.childLanes) !== 0) return h9(e, n, f);
        return (
          O(V, V.current & 1),
          (e = Qe(e, n, f)),
          e !== null ? e.sibling : null
        );
      }
      O(V, V.current & 1);
      break;
    case 19:
      if (((t = (f & n.childLanes) !== 0), (e.flags & 128) !== 0)) {
        if (t) return C9(e, n, f);
        n.flags |= 128;
      }
      if (
        ((r = n.memoizedState),
        r !== null &&
          ((r.rendering = null), (r.tail = null), (r.lastEffect = null)),
        O(V, V.current),
        t)
      )
        break;
      else return null;
    case 22:
    case 23:
      return ((n.lanes = 0), m9(e, n, f));
  }
  return Qe(e, n, f);
}
function Sf(e, n) {
  if (!W)
    switch (e.tailMode) {
      case "hidden":
        n = e.tail;
        for (var f = null; n !== null; )
          (n.alternate !== null && (f = n), (n = n.sibling));
        f === null ? (e.tail = null) : (f.sibling = null);
        break;
      case "collapsed":
        f = e.tail;
        for (var t = null; f !== null; )
          (f.alternate !== null && (t = f), (f = f.sibling));
        t === null
          ? n || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (t.sibling = null);
    }
}
function ee(e) {
  var n = e.alternate !== null && e.alternate.child === e.child,
    f = 0,
    t = 0;
  if (n)
    for (var r = e.child; r !== null; )
      ((f |= r.lanes | r.childLanes),
        (t |= r.subtreeFlags & 14680064),
        (t |= r.flags & 14680064),
        (r.return = e),
        (r = r.sibling));
  else
    for (r = e.child; r !== null; )
      ((f |= r.lanes | r.childLanes),
        (t |= r.subtreeFlags),
        (t |= r.flags),
        (r.return = e),
        (r = r.sibling));
  return ((e.subtreeFlags |= t), (e.childLanes = f), n);
}
function ma(e, n, f) {
  var t = n.pendingProps;
  switch ((Ku(n), n.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return (ee(n), null);
    case 1:
      return (ae(n.type) && mr(), ee(n), null);
    case 3:
      if (
        ((t = n.stateNode),
        gf(),
        j(Pe),
        j(fe),
        ev(),
        t.pendingContext &&
          ((t.context = t.pendingContext), (t.pendingContext = null)),
        e === null || e.child === null)
      )
        Gt(n)
          ? (n.flags |= 4)
          : e === null ||
            (e.memoizedState.isDehydrated && (n.flags & 256) === 0) ||
            ((n.flags |= 1024), Ie !== null && (Nu(Ie), (Ie = null)));
      return (mu(e, n), ee(n), null);
    case 5:
      $u(n);
      var r = bn(at.current);
      if (((f = n.type), e !== null && n.stateNode != null))
        (x9(e, n, f, t, r),
          e.ref !== n.ref && ((n.flags |= 512), (n.flags |= 2097152)));
      else {
        if (!t) {
          if (n.stateNode === null) throw Error(m(166));
          return (ee(n), null);
        }
        if (((e = bn(ke.current)), Gt(n))) {
          ((t = n.stateNode), (f = n.type));
          var l = n.memoizedProps;
          switch (((t[Je] = n), (t[ot] = l), (e = (n.mode & 1) !== 0), f)) {
            case "dialog":
              (S("cancel", t), S("close", t));
              break;
            case "iframe":
            case "object":
            case "embed":
              S("load", t);
              break;
            case "video":
            case "audio":
              for (r = 0; r < Rf.length; r++) S(Rf[r], t);
              break;
            case "source":
              S("error", t);
              break;
            case "img":
            case "image":
            case "link":
              (S("error", t), S("load", t));
              break;
            case "details":
              S("toggle", t);
              break;
            case "input":
              (Rv(t, l), S("invalid", t));
              break;
            case "select":
              ((t._wrapperState = { wasMultiple: !!l.multiple }),
                S("invalid", t));
              break;
            case "textarea":
              (Kv(t, l), S("invalid", t));
          }
          (Yl(f, l), (r = null));
          for (var u in l)
            if (l.hasOwnProperty(u)) {
              var v = l[u];
              u === "children"
                ? typeof v === "string"
                  ? t.textContent !== v &&
                    (l.suppressHydrationWarning !== !0 &&
                      Mt(t.textContent, v, e),
                    (r = ["children", v]))
                  : typeof v === "number" &&
                    t.textContent !== "" + v &&
                    (l.suppressHydrationWarning !== !0 &&
                      Mt(t.textContent, v, e),
                    (r = ["children", "" + v]))
                : $f.hasOwnProperty(u) &&
                  v != null &&
                  u === "onScroll" &&
                  S("scroll", t);
            }
          switch (f) {
            case "input":
              (Vt(t), Yv(t, l, !0));
              break;
            case "textarea":
              (Vt(t), Ev(t));
              break;
            case "select":
            case "option":
              break;
            default:
              typeof l.onClick === "function" && (t.onclick = gr);
          }
          ((t = r), (n.updateQueue = t), t !== null && (n.flags |= 4));
        } else {
          ((u = r.nodeType === 9 ? r : r.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = $i(f)),
            e === "http://www.w3.org/1999/xhtml"
              ? f === "script"
                ? ((e = u.createElement("div")),
                  (e.innerHTML = "<script><\/script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof t.is === "string"
                  ? (e = u.createElement(f, { is: t.is }))
                  : ((e = u.createElement(f)),
                    f === "select" &&
                      ((u = e),
                      t.multiple
                        ? (u.multiple = !0)
                        : t.size && (u.size = t.size)))
              : (e = u.createElementNS(e, f)),
            (e[Je] = n),
            (e[ot] = t),
            w9(e, n, !1, !1),
            (n.stateNode = e));
          e: {
            switch (((u = Kl(f, t)), f)) {
              case "dialog":
                (S("cancel", e), S("close", e), (r = t));
                break;
              case "iframe":
              case "object":
              case "embed":
                (S("load", e), (r = t));
                break;
              case "video":
              case "audio":
                for (r = 0; r < Rf.length; r++) S(Rf[r], e);
                r = t;
                break;
              case "source":
                (S("error", e), (r = t));
                break;
              case "img":
              case "image":
              case "link":
                (S("error", e), S("load", e), (r = t));
                break;
              case "details":
                (S("toggle", e), (r = t));
                break;
              case "input":
                (Rv(e, t), (r = Vl(e, t)), S("invalid", e));
                break;
              case "option":
                r = t;
                break;
              case "select":
                ((e._wrapperState = { wasMultiple: !!t.multiple }),
                  (r = q({}, t, { value: void 0 })),
                  S("invalid", e));
                break;
              case "textarea":
                (Kv(e, t), (r = Fl(e, t)), S("invalid", e));
                break;
              default:
                r = t;
            }
            (Yl(f, r), (v = r));
            for (l in v)
              if (v.hasOwnProperty(l)) {
                var i = v[l];
                l === "style"
                  ? fo(e, i)
                  : l === "dangerouslySetInnerHTML"
                    ? ((i = i ? i.__html : void 0), i != null && eo(e, i))
                    : l === "children"
                      ? typeof i === "string"
                        ? (f !== "textarea" || i !== "") && et(e, i)
                        : typeof i === "number" && et(e, "" + i)
                      : l !== "suppressContentEditableWarning" &&
                        l !== "suppressHydrationWarning" &&
                        l !== "autoFocus" &&
                        ($f.hasOwnProperty(l)
                          ? i != null && l === "onScroll" && S("scroll", e)
                          : i != null && Iu(e, l, i, u));
              }
            switch (f) {
              case "input":
                (Vt(e), Yv(e, t, !1));
                break;
              case "textarea":
                (Vt(e), Ev(e));
                break;
              case "option":
                t.value != null && e.setAttribute("value", "" + gn(t.value));
                break;
              case "select":
                ((e.multiple = !!t.multiple),
                  (l = t.value),
                  l != null
                    ? vf(e, !!t.multiple, l, !1)
                    : t.defaultValue != null &&
                      vf(e, !!t.multiple, t.defaultValue, !0));
                break;
              default:
                typeof r.onClick === "function" && (e.onclick = gr);
            }
            switch (f) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                t = !!t.autoFocus;
                break e;
              case "img":
                t = !0;
                break e;
              default:
                t = !1;
            }
          }
          t && (n.flags |= 4);
        }
        n.ref !== null && ((n.flags |= 512), (n.flags |= 2097152));
      }
      return (ee(n), null);
    case 6:
      if (e && n.stateNode != null) T9(e, n, e.memoizedProps, t);
      else {
        if (typeof t !== "string" && n.stateNode === null) throw Error(m(166));
        if (((f = bn(at.current)), bn(ke.current), Gt(n))) {
          if (
            ((t = n.stateNode),
            (f = n.memoizedProps),
            (t[Je] = n),
            (l = t.nodeValue !== f))
          ) {
            if (((e = ze), e !== null))
              switch (e.tag) {
                case 3:
                  Mt(t.nodeValue, f, (e.mode & 1) !== 0);
                  break;
                case 5:
                  e.memoizedProps.suppressHydrationWarning !== !0 &&
                    Mt(t.nodeValue, f, (e.mode & 1) !== 0);
              }
          }
          l && (n.flags |= 4);
        } else
          ((t = (f.nodeType === 9 ? f : f.ownerDocument).createTextNode(t)),
            (t[Je] = n),
            (n.stateNode = t));
      }
      return (ee(n), null);
    case 13:
      if (
        (j(V),
        (t = n.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (W && se !== null && (n.mode & 1) !== 0 && (n.flags & 128) === 0)
          (Yo(), pf(), (n.flags |= 98560), (l = !1));
        else if (((l = Gt(n)), t !== null && t.dehydrated !== null)) {
          if (e === null) {
            if (!l) throw Error(m(318));
            if (
              ((l = n.memoizedState),
              (l = l !== null ? l.dehydrated : null),
              !l)
            )
              throw Error(m(317));
            l[Je] = n;
          } else
            (pf(),
              (n.flags & 128) === 0 && (n.memoizedState = null),
              (n.flags |= 4));
          (ee(n), (l = !1));
        } else (Ie !== null && (Nu(Ie), (Ie = null)), (l = !0));
        if (!l) return n.flags & 65536 ? n : null;
      }
      if ((n.flags & 128) !== 0) return ((n.lanes = f), n);
      return (
        (t = t !== null),
        t !== (e !== null && e.memoizedState !== null) &&
          t &&
          ((n.child.flags |= 8192),
          (n.mode & 1) !== 0 &&
            (e === null || (V.current & 1) !== 0 ? E === 0 && (E = 3) : dv())),
        n.updateQueue !== null && (n.flags |= 4),
        ee(n),
        null
      );
    case 4:
      return (
        gf(),
        mu(e, n),
        e === null && vt(n.stateNode.containerInfo),
        ee(n),
        null
      );
    case 10:
      return (Uu(n.type._context), ee(n), null);
    case 17:
      return (ae(n.type) && mr(), ee(n), null);
    case 19:
      if ((j(V), (l = n.memoizedState), l === null)) return (ee(n), null);
      if (((t = (n.flags & 128) !== 0), (u = l.rendering), u === null))
        if (t) Sf(l, !1);
        else {
          if (E !== 0 || (e !== null && (e.flags & 128) !== 0))
            for (e = n.child; e !== null; ) {
              if (((u = Tr(e)), u !== null)) {
                ((n.flags |= 128),
                  Sf(l, !1),
                  (t = u.updateQueue),
                  t !== null && ((n.updateQueue = t), (n.flags |= 4)),
                  (n.subtreeFlags = 0),
                  (t = f));
                for (f = n.child; f !== null; )
                  ((l = f),
                    (e = t),
                    (l.flags &= 14680066),
                    (u = l.alternate),
                    u === null
                      ? ((l.childLanes = 0),
                        (l.lanes = e),
                        (l.child = null),
                        (l.subtreeFlags = 0),
                        (l.memoizedProps = null),
                        (l.memoizedState = null),
                        (l.updateQueue = null),
                        (l.dependencies = null),
                        (l.stateNode = null))
                      : ((l.childLanes = u.childLanes),
                        (l.lanes = u.lanes),
                        (l.child = u.child),
                        (l.subtreeFlags = 0),
                        (l.deletions = null),
                        (l.memoizedProps = u.memoizedProps),
                        (l.memoizedState = u.memoizedState),
                        (l.updateQueue = u.updateQueue),
                        (l.type = u.type),
                        (e = u.dependencies),
                        (l.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (f = f.sibling));
                return (O(V, (V.current & 1) | 2), n.child);
              }
              e = e.sibling;
            }
          l.tail !== null &&
            R() > Hf &&
            ((n.flags |= 128), (t = !0), Sf(l, !1), (n.lanes = 4194304));
        }
      else {
        if (!t)
          if (((e = Tr(u)), e !== null)) {
            if (
              ((n.flags |= 128),
              (t = !0),
              (f = e.updateQueue),
              f !== null && ((n.updateQueue = f), (n.flags |= 4)),
              Sf(l, !0),
              l.tail === null && l.tailMode === "hidden" && !u.alternate && !W)
            )
              return (ee(n), null);
          } else
            2 * R() - l.renderingStartTime > Hf &&
              f !== 1073741824 &&
              ((n.flags |= 128), (t = !0), Sf(l, !1), (n.lanes = 4194304));
        l.isBackwards
          ? ((u.sibling = n.child), (n.child = u))
          : ((f = l.last),
            f !== null ? (f.sibling = u) : (n.child = u),
            (l.last = u));
      }
      if (l.tail !== null)
        return (
          (n = l.tail),
          (l.rendering = n),
          (l.tail = n.sibling),
          (l.renderingStartTime = R()),
          (n.sibling = null),
          (f = V.current),
          O(V, t ? (f & 1) | 2 : f & 1),
          n
        );
      return (ee(n), null);
    case 22:
    case 23:
      return (
        av(),
        (t = n.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== t && (n.flags |= 8192),
        t && (n.mode & 1) !== 0
          ? (ce & 1073741824) !== 0 &&
            (ee(n), n.subtreeFlags & 6 && (n.flags |= 8192))
          : ee(n),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(m(156, n.tag));
}
function Ha(e, n) {
  switch ((Ku(n), n.tag)) {
    case 1:
      return (
        ae(n.type) && mr(),
        (e = n.flags),
        e & 65536 ? ((n.flags = (e & -65537) | 128), n) : null
      );
    case 3:
      return (
        gf(),
        j(Pe),
        j(fe),
        ev(),
        (e = n.flags),
        (e & 65536) !== 0 && (e & 128) === 0
          ? ((n.flags = (e & -65537) | 128), n)
          : null
      );
    case 5:
      return ($u(n), null);
    case 13:
      if ((j(V), (e = n.memoizedState), e !== null && e.dehydrated !== null)) {
        if (n.alternate === null) throw Error(m(340));
        pf();
      }
      return (
        (e = n.flags),
        e & 65536 ? ((n.flags = (e & -65537) | 128), n) : null
      );
    case 19:
      return (j(V), null);
    case 4:
      return (gf(), null);
    case 10:
      return (Uu(n.type._context), null);
    case 22:
    case 23:
      return (av(), null);
    case 24:
      return null;
    default:
      return null;
  }
}
function lf(e, n) {
  var f = e.ref;
  if (f !== null)
    if (typeof f === "function")
      try {
        f(null);
      } catch (t) {
        F(e, n, t);
      }
    else f.current = null;
}
function Hu(e, n, f) {
  try {
    f();
  } catch (t) {
    F(e, n, t);
  }
}
function ha(e, n) {
  if (((tu = zr), (e = bo()), Ru(e))) {
    if ("selectionStart" in e)
      var f = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        f = ((f = e.ownerDocument) && f.defaultView) || window;
        var t = f.getSelection && f.getSelection();
        if (t && t.rangeCount !== 0) {
          f = t.anchorNode;
          var { anchorOffset: r, focusNode: l } = t;
          t = t.focusOffset;
          try {
            (f.nodeType, l.nodeType);
          } catch (H) {
            f = null;
            break e;
          }
          var u = 0,
            v = -1,
            i = -1,
            d = 0,
            p = 0,
            X = e,
            g = null;
          n: for (;;) {
            for (var y; ; ) {
              if (
                (X !== f || (r !== 0 && X.nodeType !== 3) || (v = u + r),
                X !== l || (t !== 0 && X.nodeType !== 3) || (i = u + t),
                X.nodeType === 3 && (u += X.nodeValue.length),
                (y = X.firstChild) === null)
              )
                break;
              ((g = X), (X = y));
            }
            for (;;) {
              if (X === e) break n;
              if (
                (g === f && ++d === r && (v = u),
                g === l && ++p === t && (i = u),
                (y = X.nextSibling) !== null)
              )
                break;
              ((X = g), (g = X.parentNode));
            }
            X = y;
          }
          f = v === -1 || i === -1 ? null : { start: v, end: i };
        } else f = null;
      }
    f = f || { start: 0, end: 0 };
  } else f = null;
  ((ru = { focusedElem: e, selectionRange: f }), (zr = !1));
  for (w = n; w !== null; )
    if (((n = w), (e = n.child), (n.subtreeFlags & 1028) !== 0 && e !== null))
      ((e.return = n), (w = e));
    else
      for (; w !== null; ) {
        n = w;
        try {
          var C = n.alternate;
          if ((n.flags & 1024) !== 0)
            switch (n.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (C !== null) {
                  var { memoizedProps: h, memoizedState: Z } = C,
                    c = n.stateNode,
                    P = c.getSnapshotBeforeUpdate(
                      n.elementType === n.type ? h : Ae(n.type, h),
                      Z,
                    );
                  c.__reactInternalSnapshotBeforeUpdate = P;
                }
                break;
              case 3:
                var s = n.stateNode.containerInfo;
                s.nodeType === 1
                  ? (s.textContent = "")
                  : s.nodeType === 9 &&
                    s.documentElement &&
                    s.removeChild(s.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(m(163));
            }
        } catch (H) {
          F(n, n.return, H);
        }
        if (((e = n.sibling), e !== null)) {
          ((e.return = n.return), (w = e));
          break;
        }
        w = n.return;
      }
  return ((C = Si), (Si = !1), C);
}
function Bf(e, n, f) {
  var t = n.updateQueue;
  if (((t = t !== null ? t.lastEffect : null), t !== null)) {
    var r = (t = t.next);
    do {
      if ((r.tag & e) === e) {
        var l = r.destroy;
        ((r.destroy = void 0), l !== void 0 && Hu(n, f, l));
      }
      r = r.next;
    } while (r !== t);
  }
}
function Fr(e, n) {
  if (
    ((n = n.updateQueue), (n = n !== null ? n.lastEffect : null), n !== null)
  ) {
    var f = (n = n.next);
    do {
      if ((f.tag & e) === e) {
        var t = f.create;
        f.destroy = t();
      }
      f = f.next;
    } while (f !== n);
  }
}
function yu(e) {
  var n = e.ref;
  if (n !== null) {
    var f = e.stateNode;
    switch (e.tag) {
      case 5:
        e = f;
        break;
      default:
        e = f;
    }
    typeof n === "function" ? n(e) : (n.current = e);
  }
}
function N9(e) {
  var n = e.alternate;
  (n !== null && ((e.alternate = null), N9(n)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((n = e.stateNode),
      n !== null &&
        (delete n[Je], delete n[ot], delete n[vu], delete n[ra], delete n[la])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null));
}
function A9(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function ji(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || A9(e.return)) return null;
      e = e.return;
    }
    e.sibling.return = e.return;
    for (e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2) continue e;
      if (e.child === null || e.tag === 4) continue e;
      else ((e.child.return = e), (e = e.child));
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function hu(e, n, f) {
  var t = e.tag;
  if (t === 5 || t === 6)
    ((e = e.stateNode),
      n
        ? f.nodeType === 8
          ? f.parentNode.insertBefore(e, n)
          : f.insertBefore(e, n)
        : (f.nodeType === 8
            ? ((n = f.parentNode), n.insertBefore(e, f))
            : ((n = f), n.appendChild(e)),
          (f = f._reactRootContainer),
          (f !== null && f !== void 0) ||
            n.onclick !== null ||
            (n.onclick = gr)));
  else if (t !== 4 && ((e = e.child), e !== null))
    for (hu(e, n, f), e = e.sibling; e !== null; )
      (hu(e, n, f), (e = e.sibling));
}
function Cu(e, n, f) {
  var t = e.tag;
  if (t === 5 || t === 6)
    ((e = e.stateNode), n ? f.insertBefore(e, n) : f.appendChild(e));
  else if (t !== 4 && ((e = e.child), e !== null))
    for (Cu(e, n, f), e = e.sibling; e !== null; )
      (Cu(e, n, f), (e = e.sibling));
}
function fn(e, n, f) {
  for (f = f.child; f !== null; ) (L9(e, n, f), (f = f.sibling));
}
function L9(e, n, f) {
  if (Ve && typeof Ve.onCommitFiberUnmount === "function")
    try {
      Ve.onCommitFiberUnmount(Sr, f);
    } catch (v) {}
  switch (f.tag) {
    case 5:
      ne || lf(f, n);
    case 6:
      var t = U,
        r = Le;
      ((U = null),
        fn(e, n, f),
        (U = t),
        (Le = r),
        U !== null &&
          (Le
            ? ((e = U),
              (f = f.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(f) : e.removeChild(f))
            : U.removeChild(f.stateNode)));
      break;
    case 18:
      U !== null &&
        (Le
          ? ((e = U),
            (f = f.stateNode),
            e.nodeType === 8
              ? wl(e.parentNode, f)
              : e.nodeType === 1 && wl(e, f),
            rt(e))
          : wl(U, f.stateNode));
      break;
    case 4:
      ((t = U),
        (r = Le),
        (U = f.stateNode.containerInfo),
        (Le = !0),
        fn(e, n, f),
        (U = t),
        (Le = r));
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !ne &&
        ((t = f.updateQueue), t !== null && ((t = t.lastEffect), t !== null))
      ) {
        r = t = t.next;
        do {
          var l = r,
            u = l.destroy;
          ((l = l.tag),
            u !== void 0 &&
              ((l & 2) !== 0 ? Hu(f, n, u) : (l & 4) !== 0 && Hu(f, n, u)),
            (r = r.next));
        } while (r !== t);
      }
      fn(e, n, f);
      break;
    case 1:
      if (
        !ne &&
        (lf(f, n),
        (t = f.stateNode),
        typeof t.componentWillUnmount === "function")
      )
        try {
          ((t.props = f.memoizedProps),
            (t.state = f.memoizedState),
            t.componentWillUnmount());
        } catch (v) {
          F(f, n, v);
        }
      fn(e, n, f);
      break;
    case 21:
      fn(e, n, f);
      break;
    case 22:
      f.mode & 1
        ? ((ne = (t = ne) || f.memoizedState !== null), fn(e, n, f), (ne = t))
        : fn(e, n, f);
      break;
    default:
      fn(e, n, f);
  }
}
function Zi(e) {
  var n = e.updateQueue;
  if (n !== null) {
    e.updateQueue = null;
    var f = e.stateNode;
    (f === null && (f = e.stateNode = new ya()),
      n.forEach(function (t) {
        var r = ba.bind(null, e, t);
        f.has(t) || (f.add(t), t.then(r, r));
      }));
  }
}
function Ne(e, n) {
  var f = n.deletions;
  if (f !== null)
    for (var t = 0; t < f.length; t++) {
      var r = f[t];
      try {
        var l = e,
          u = n,
          v = u;
        e: for (; v !== null; ) {
          switch (v.tag) {
            case 5:
              ((U = v.stateNode), (Le = !1));
              break e;
            case 3:
              ((U = v.stateNode.containerInfo), (Le = !0));
              break e;
            case 4:
              ((U = v.stateNode.containerInfo), (Le = !0));
              break e;
          }
          v = v.return;
        }
        if (U === null) throw Error(m(160));
        (L9(l, u, r), (U = null), (Le = !1));
        var i = r.alternate;
        (i !== null && (i.return = null), (r.return = null));
      } catch (d) {
        F(r, n, d);
      }
    }
  if (n.subtreeFlags & 12854)
    for (n = n.child; n !== null; ) (I9(n, e), (n = n.sibling));
}
function I9(e, n) {
  var { alternate: f, flags: t } = e;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((Ne(n, e), Ze(e), t & 4)) {
        try {
          (Bf(3, e, e.return), Fr(3, e));
        } catch (h) {
          F(e, e.return, h);
        }
        try {
          Bf(5, e, e.return);
        } catch (h) {
          F(e, e.return, h);
        }
      }
      break;
    case 1:
      (Ne(n, e), Ze(e), t & 512 && f !== null && lf(f, f.return));
      break;
    case 5:
      if (
        (Ne(n, e),
        Ze(e),
        t & 512 && f !== null && lf(f, f.return),
        e.flags & 32)
      ) {
        var r = e.stateNode;
        try {
          et(r, "");
        } catch (h) {
          F(e, e.return, h);
        }
      }
      if (t & 4 && ((r = e.stateNode), r != null)) {
        var l = e.memoizedProps,
          u = f !== null ? f.memoizedProps : l,
          v = e.type,
          i = e.updateQueue;
        if (((e.updateQueue = null), i !== null))
          try {
            (v === "input" && l.type === "radio" && l.name != null && Qi(r, l),
              Kl(v, u));
            var d = Kl(v, l);
            for (u = 0; u < i.length; u += 2) {
              var p = i[u],
                X = i[u + 1];
              p === "style"
                ? fo(r, X)
                : p === "dangerouslySetInnerHTML"
                  ? eo(r, X)
                  : p === "children"
                    ? et(r, X)
                    : Iu(r, p, X, d);
            }
            switch (v) {
              case "input":
                kl(r, l);
                break;
              case "textarea":
                _i(r, l);
                break;
              case "select":
                var g = r._wrapperState.wasMultiple;
                r._wrapperState.wasMultiple = !!l.multiple;
                var y = l.value;
                y != null
                  ? vf(r, !!l.multiple, y, !1)
                  : g !== !!l.multiple &&
                    (l.defaultValue != null
                      ? vf(r, !!l.multiple, l.defaultValue, !0)
                      : vf(r, !!l.multiple, l.multiple ? [] : "", !1));
            }
            r[ot] = l;
          } catch (h) {
            F(e, e.return, h);
          }
      }
      break;
    case 6:
      if ((Ne(n, e), Ze(e), t & 4)) {
        if (e.stateNode === null) throw Error(m(162));
        ((r = e.stateNode), (l = e.memoizedProps));
        try {
          r.nodeValue = l;
        } catch (h) {
          F(e, e.return, h);
        }
      }
      break;
    case 3:
      if (
        (Ne(n, e), Ze(e), t & 4 && f !== null && f.memoizedState.isDehydrated)
      )
        try {
          rt(n.containerInfo);
        } catch (h) {
          F(e, e.return, h);
        }
      break;
    case 4:
      (Ne(n, e), Ze(e));
      break;
    case 13:
      (Ne(n, e),
        Ze(e),
        (r = e.child),
        r.flags & 8192 &&
          ((l = r.memoizedState !== null),
          (r.stateNode.isHidden = l),
          !l ||
            (r.alternate !== null && r.alternate.memoizedState !== null) ||
            (ov = R())),
        t & 4 && Zi(e));
      break;
    case 22:
      if (
        ((p = f !== null && f.memoizedState !== null),
        e.mode & 1 ? ((ne = (d = ne) || p), Ne(n, e), (ne = d)) : Ne(n, e),
        Ze(e),
        t & 8192)
      ) {
        if (
          ((d = e.memoizedState !== null),
          (e.stateNode.isHidden = d) && !p && (e.mode & 1) !== 0)
        )
          for (w = e, p = e.child; p !== null; ) {
            for (X = w = p; w !== null; ) {
              switch (((g = w), (y = g.child), g.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Bf(4, g, g.return);
                  break;
                case 1:
                  lf(g, g.return);
                  var C = g.stateNode;
                  if (typeof C.componentWillUnmount === "function") {
                    ((t = g), (f = g.return));
                    try {
                      ((n = t),
                        (C.props = n.memoizedProps),
                        (C.state = n.memoizedState),
                        C.componentWillUnmount());
                    } catch (h) {
                      F(t, f, h);
                    }
                  }
                  break;
                case 5:
                  lf(g, g.return);
                  break;
                case 22:
                  if (g.memoizedState !== null) {
                    Ji(X);
                    continue;
                  }
              }
              y !== null ? ((y.return = g), (w = y)) : Ji(X);
            }
            p = p.sibling;
          }
        e: for (p = null, X = e; ; ) {
          if (X.tag === 5) {
            if (p === null) {
              p = X;
              try {
                ((r = X.stateNode),
                  d
                    ? ((l = r.style),
                      typeof l.setProperty === "function"
                        ? l.setProperty("display", "none", "important")
                        : (l.display = "none"))
                    : ((v = X.stateNode),
                      (i = X.memoizedProps.style),
                      (u =
                        i !== void 0 &&
                        i !== null &&
                        i.hasOwnProperty("display")
                          ? i.display
                          : null),
                      (v.style.display = no("display", u))));
              } catch (h) {
                F(e, e.return, h);
              }
            }
          } else if (X.tag === 6) {
            if (p === null)
              try {
                X.stateNode.nodeValue = d ? "" : X.memoizedProps;
              } catch (h) {
                F(e, e.return, h);
              }
          } else if (
            ((X.tag !== 22 && X.tag !== 23) ||
              X.memoizedState === null ||
              X === e) &&
            X.child !== null
          ) {
            ((X.child.return = X), (X = X.child));
            continue;
          }
          if (X === e) break e;
          for (; X.sibling === null; ) {
            if (X.return === null || X.return === e) break e;
            (p === X && (p = null), (X = X.return));
          }
          (p === X && (p = null),
            (X.sibling.return = X.return),
            (X = X.sibling));
        }
      }
      break;
    case 19:
      (Ne(n, e), Ze(e), t & 4 && Zi(e));
      break;
    case 21:
      break;
    default:
      (Ne(n, e), Ze(e));
  }
}
function Ze(e) {
  var n = e.flags;
  if (n & 2) {
    try {
      e: {
        for (var f = e.return; f !== null; ) {
          if (A9(f)) {
            var t = f;
            break e;
          }
          f = f.return;
        }
        throw Error(m(160));
      }
      switch (t.tag) {
        case 5:
          var r = t.stateNode;
          t.flags & 32 && (et(r, ""), (t.flags &= -33));
          var l = ji(e);
          Cu(e, l, r);
          break;
        case 3:
        case 4:
          var u = t.stateNode.containerInfo,
            v = ji(e);
          hu(e, v, u);
          break;
        default:
          throw Error(m(161));
      }
    } catch (i) {
      F(e, e.return, i);
    }
    e.flags &= -3;
  }
  n & 4096 && (e.flags &= -4097);
}
function Ca(e, n, f) {
  ((w = e), b9(e, n, f));
}
function b9(e, n, f) {
  for (var t = (e.mode & 1) !== 0; w !== null; ) {
    var r = w,
      l = r.child;
    if (r.tag === 22 && t) {
      var u = r.memoizedState !== null || Qt;
      if (!u) {
        var v = r.alternate,
          i = (v !== null && v.memoizedState !== null) || ne;
        v = Qt;
        var d = ne;
        if (((Qt = u), (ne = i) && !d))
          for (w = r; w !== null; )
            ((u = w),
              (i = u.child),
              u.tag === 22 && u.memoizedState !== null
                ? Vi(r)
                : i !== null
                  ? ((i.return = u), (w = i))
                  : Vi(r));
        for (; l !== null; ) ((w = l), b9(l, n, f), (l = l.sibling));
        ((w = r), (Qt = v), (ne = d));
      }
      Wi(e, n, f);
    } else
      (r.subtreeFlags & 8772) !== 0 && l !== null
        ? ((l.return = r), (w = l))
        : Wi(e, n, f);
  }
}
function Wi(e) {
  for (; w !== null; ) {
    var n = w;
    if ((n.flags & 8772) !== 0) {
      var f = n.alternate;
      try {
        if ((n.flags & 8772) !== 0)
          switch (n.tag) {
            case 0:
            case 11:
            case 15:
              ne || Fr(5, n);
              break;
            case 1:
              var t = n.stateNode;
              if (n.flags & 4 && !ne)
                if (f === null) t.componentDidMount();
                else {
                  var r =
                    n.elementType === n.type
                      ? f.memoizedProps
                      : Ae(n.type, f.memoizedProps);
                  t.componentDidUpdate(
                    r,
                    f.memoizedState,
                    t.__reactInternalSnapshotBeforeUpdate,
                  );
                }
              var l = n.updateQueue;
              l !== null && yi(n, l, t);
              break;
            case 3:
              var u = n.updateQueue;
              if (u !== null) {
                if (((f = null), n.child !== null))
                  switch (n.child.tag) {
                    case 5:
                      f = n.child.stateNode;
                      break;
                    case 1:
                      f = n.child.stateNode;
                  }
                yi(n, u, f);
              }
              break;
            case 5:
              var v = n.stateNode;
              if (f === null && n.flags & 4) {
                f = v;
                var i = n.memoizedProps;
                switch (n.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    i.autoFocus && f.focus();
                    break;
                  case "img":
                    i.src && (f.src = i.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (n.memoizedState === null) {
                var d = n.alternate;
                if (d !== null) {
                  var p = d.memoizedState;
                  if (p !== null) {
                    var X = p.dehydrated;
                    X !== null && rt(X);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(m(163));
          }
        ne || (n.flags & 512 && yu(n));
      } catch (g) {
        F(n, n.return, g);
      }
    }
    if (n === e) {
      w = null;
      break;
    }
    if (((f = n.sibling), f !== null)) {
      ((f.return = n.return), (w = f));
      break;
    }
    w = n.return;
  }
}
function Ji(e) {
  for (; w !== null; ) {
    var n = w;
    if (n === e) {
      w = null;
      break;
    }
    var f = n.sibling;
    if (f !== null) {
      ((f.return = n.return), (w = f));
      break;
    }
    w = n.return;
  }
}
function Vi(e) {
  for (; w !== null; ) {
    var n = w;
    try {
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          var f = n.return;
          try {
            Fr(4, n);
          } catch (i) {
            F(n, f, i);
          }
          break;
        case 1:
          var t = n.stateNode;
          if (typeof t.componentDidMount === "function") {
            var r = n.return;
            try {
              t.componentDidMount();
            } catch (i) {
              F(n, r, i);
            }
          }
          var l = n.return;
          try {
            yu(n);
          } catch (i) {
            F(n, l, i);
          }
          break;
        case 5:
          var u = n.return;
          try {
            yu(n);
          } catch (i) {
            F(n, u, i);
          }
      }
    } catch (i) {
      F(n, n.return, i);
    }
    if (n === e) {
      w = null;
      break;
    }
    var v = n.sibling;
    if (v !== null) {
      ((v.return = n.return), (w = v));
      break;
    }
    w = n.return;
  }
}
function le() {
  return (I & 6) !== 0 ? R() : vr !== -1 ? vr : (vr = R());
}
function pn(e) {
  if ((e.mode & 1) === 0) return 1;
  if ((I & 2) !== 0 && B !== 0) return B & -B;
  if (va.transition !== null) return (ir === 0 && (ir = zo()), ir);
  if (((e = D), e !== 0)) return e;
  return ((e = window.event), (e = e === void 0 ? 16 : ho(e.type)), e);
}
function De(e, n, f, t) {
  if (50 < _f) throw ((_f = 0), (xu = null), Error(m(185)));
  if ((pt(e, f, t), (I & 2) === 0 || e !== G))
    (e === G && ((I & 2) === 0 && (Rr |= f), E === 4 && un(e, B)),
      de(e, t),
      f === 1 &&
        I === 0 &&
        (n.mode & 1) === 0 &&
        ((Hf = R() + 500), Vr && hn()));
}
function de(e, n) {
  var f = e.callbackNode;
  o3(e, n);
  var t = sr(e, e === G ? B : 0);
  if (t === 0)
    (f !== null && Uv(f), (e.callbackNode = null), (e.callbackPriority = 0));
  else if (((n = t & -t), e.callbackPriority !== n)) {
    if ((f != null && Uv(f), n === 1))
      (e.tag === 0 ? ua(ki.bind(null, e)) : qo(ki.bind(null, e)),
        fa(function () {
          (I & 6) === 0 && hn();
        }),
        (f = null));
    else {
      switch (po(t)) {
        case 1:
          f = ju;
          break;
        case 4:
          f = co;
          break;
        case 16:
          f = cr;
          break;
        case 536870912:
          f = so;
          break;
        default:
          f = cr;
      }
      f = V9(f, D9.bind(null, e));
    }
    ((e.callbackPriority = n), (e.callbackNode = f));
  }
}
function D9(e, n) {
  if (((vr = -1), (ir = 0), (I & 6) !== 0)) throw Error(m(327));
  var f = e.callbackNode;
  if (cf() && e.callbackNode !== f) return null;
  var t = sr(e, e === G ? B : 0);
  if (t === 0) return null;
  if ((t & 30) !== 0 || (t & e.expiredLanes) !== 0 || n) n = Dr(e, t);
  else {
    n = t;
    var r = I;
    I |= 2;
    var l = S9();
    if (G !== e || B !== n) ((Re = null), (Hf = R() + 500), Dn(e, n));
    do
      try {
        Na();
        break;
      } catch (v) {
        O9(e, v);
      }
    while (1);
    (Gu(),
      (Lr.current = l),
      (I = r),
      Y !== null ? (n = 0) : ((G = null), (B = 0), (n = E)));
  }
  if (n !== 0) {
    if (
      (n === 2 && ((r = Bl(e)), r !== 0 && ((t = r), (n = Tu(e, r)))), n === 1)
    )
      throw ((f = zt), Dn(e, 0), un(e, t), de(e, R()), f);
    if (n === 6) un(e, t);
    else {
      if (
        ((r = e.current.alternate),
        (t & 30) === 0 &&
          !xa(r) &&
          ((n = Dr(e, t)),
          n === 2 && ((l = Bl(e)), l !== 0 && ((t = l), (n = Tu(e, l)))),
          n === 1))
      )
        throw ((f = zt), Dn(e, 0), un(e, t), de(e, R()), f);
      switch (((e.finishedWork = r), (e.finishedLanes = t), n)) {
        case 0:
        case 1:
          throw Error(m(345));
        case 2:
          An(e, ie, Re);
          break;
        case 3:
          if (
            (un(e, t), (t & 130023424) === t && ((n = ov + 500 - R()), 10 < n))
          ) {
            if (sr(e, 0) !== 0) break;
            if (((r = e.suspendedLanes), (r & t) !== t)) {
              (le(), (e.pingedLanes |= e.suspendedLanes & r));
              break;
            }
            e.timeoutHandle = uu(An.bind(null, e, ie, Re), n);
            break;
          }
          An(e, ie, Re);
          break;
        case 4:
          if ((un(e, t), (t & 4194240) === t)) break;
          n = e.eventTimes;
          for (r = -1; 0 < t; ) {
            var u = 31 - be(t);
            ((l = 1 << u), (u = n[u]), u > r && (r = u), (t &= ~l));
          }
          if (
            ((t = r),
            (t = R() - t),
            (t =
              (120 > t
                ? 120
                : 480 > t
                  ? 480
                  : 1080 > t
                    ? 1080
                    : 1920 > t
                      ? 1920
                      : 3000 > t
                        ? 3000
                        : 4320 > t
                          ? 4320
                          : 1960 * wa(t / 1960)) - t),
            10 < t)
          ) {
            e.timeoutHandle = uu(An.bind(null, e, ie, Re), t);
            break;
          }
          An(e, ie, Re);
          break;
        case 5:
          An(e, ie, Re);
          break;
        default:
          throw Error(m(329));
      }
    }
  }
  return (de(e, R()), e.callbackNode === f ? D9.bind(null, e) : null);
}
function Tu(e, n) {
  var f = Qf;
  return (
    e.current.memoizedState.isDehydrated && (Dn(e, n).flags |= 256),
    (e = Dr(e, n)),
    e !== 2 && ((n = ie), (ie = f), n !== null && Nu(n)),
    e
  );
}
function Nu(e) {
  ie === null ? (ie = e) : ie.push.apply(ie, e);
}
function xa(e) {
  for (var n = e; ; ) {
    if (n.flags & 16384) {
      var f = n.updateQueue;
      if (f !== null && ((f = f.stores), f !== null))
        for (var t = 0; t < f.length; t++) {
          var r = f[t],
            l = r.getSnapshot;
          r = r.value;
          try {
            if (!Oe(l(), r)) return !1;
          } catch (u) {
            return !1;
          }
        }
    }
    if (((f = n.child), n.subtreeFlags & 16384 && f !== null))
      ((f.return = n), (n = f));
    else {
      if (n === e) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === e) return !0;
        n = n.return;
      }
      ((n.sibling.return = n.return), (n = n.sibling));
    }
  }
  return !0;
}
function un(e, n) {
  ((n &= ~iv), (n &= ~Rr), (e.suspendedLanes |= n), (e.pingedLanes &= ~n));
  for (e = e.expirationTimes; 0 < n; ) {
    var f = 31 - be(n),
      t = 1 << f;
    ((e[f] = -1), (n &= ~t));
  }
}
function ki(e) {
  if ((I & 6) !== 0) throw Error(m(327));
  cf();
  var n = sr(e, 0);
  if ((n & 1) === 0) return (de(e, R()), null);
  var f = Dr(e, n);
  if (e.tag !== 0 && f === 2) {
    var t = Bl(e);
    t !== 0 && ((n = t), (f = Tu(e, t)));
  }
  if (f === 1) throw ((f = zt), Dn(e, 0), un(e, n), de(e, R()), f);
  if (f === 6) throw Error(m(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = n),
    An(e, ie, Re),
    de(e, R()),
    null
  );
}
function Pv(e, n) {
  var f = I;
  I |= 1;
  try {
    return e(n);
  } finally {
    ((I = f), I === 0 && ((Hf = R() + 500), Vr && hn()));
  }
}
function Jn(e) {
  on !== null && on.tag === 0 && (I & 6) === 0 && cf();
  var n = I;
  I |= 1;
  var f = he.transition,
    t = D;
  try {
    if (((he.transition = null), (D = 1), e)) return e();
  } finally {
    ((D = t), (he.transition = f), (I = n), (I & 6) === 0 && hn());
  }
}
function av() {
  ((ce = uf.current), j(uf));
}
function Dn(e, n) {
  ((e.finishedWork = null), (e.finishedLanes = 0));
  var f = e.timeoutHandle;
  if ((f !== -1 && ((e.timeoutHandle = -1), na(f)), Y !== null))
    for (f = Y.return; f !== null; ) {
      var t = f;
      switch ((Ku(t), t.tag)) {
        case 1:
          ((t = t.type.childContextTypes), t !== null && t !== void 0 && mr());
          break;
        case 3:
          (gf(), j(Pe), j(fe), ev());
          break;
        case 5:
          $u(t);
          break;
        case 4:
          gf();
          break;
        case 13:
          j(V);
          break;
        case 19:
          j(V);
          break;
        case 10:
          Uu(t.type._context);
          break;
        case 22:
        case 23:
          av();
      }
      f = f.return;
    }
  if (
    ((G = e),
    (Y = e = Xn(e.current, null)),
    (B = ce = n),
    (E = 0),
    (zt = null),
    (iv = Rr = Wn = 0),
    (ie = Qf = null),
    In !== null)
  ) {
    for (n = 0; n < In.length; n++)
      if (((f = In[n]), (t = f.interleaved), t !== null)) {
        f.interleaved = null;
        var r = t.next,
          l = f.pending;
        if (l !== null) {
          var u = l.next;
          ((l.next = r), (t.next = u));
        }
        f.pending = t;
      }
    In = null;
  }
  return e;
}
function O9(e, n) {
  do {
    var f = Y;
    try {
      if ((Gu(), (rr.current = Ar), Nr)) {
        for (var t = k.memoizedState; t !== null; ) {
          var r = t.queue;
          (r !== null && (r.pending = null), (t = t.next));
        }
        Nr = !1;
      }
      if (
        ((Zn = 0),
        (M = K = k = null),
        (Uf = !1),
        (dt = 0),
        (vv.current = null),
        f === null || f.return === null)
      ) {
        ((E = 1), (zt = n), (Y = null));
        break;
      }
      e: {
        var l = e,
          u = f.return,
          v = f,
          i = n;
        if (
          ((n = B),
          (v.flags |= 32768),
          i !== null && typeof i === "object" && typeof i.then === "function")
        ) {
          var d = i,
            p = v,
            X = p.tag;
          if ((p.mode & 1) === 0 && (X === 0 || X === 11 || X === 15)) {
            var g = p.alternate;
            g
              ? ((p.updateQueue = g.updateQueue),
                (p.memoizedState = g.memoizedState),
                (p.lanes = g.lanes))
              : ((p.updateQueue = null), (p.memoizedState = null));
          }
          var y = Ni(u);
          if (y !== null) {
            ((y.flags &= -257),
              Ai(y, u, v, l, n),
              y.mode & 1 && Ti(l, d, n),
              (n = y),
              (i = d));
            var C = n.updateQueue;
            if (C === null) {
              var h = new Set();
              (h.add(i), (n.updateQueue = h));
            } else C.add(i);
            break e;
          } else {
            if ((n & 1) === 0) {
              (Ti(l, d, n), dv());
              break e;
            }
            i = Error(m(426));
          }
        } else if (W && v.mode & 1) {
          var Z = Ni(u);
          if (Z !== null) {
            ((Z.flags & 65536) === 0 && (Z.flags |= 256),
              Ai(Z, u, v, l, n),
              Eu(mf(i, v)));
            break e;
          }
        }
        ((l = i = mf(i, v)),
          E !== 4 && (E = 2),
          Qf === null ? (Qf = [l]) : Qf.push(l),
          (l = u));
        do {
          switch (l.tag) {
            case 3:
              ((l.flags |= 65536), (n &= -n), (l.lanes |= n));
              var c = p9(l, i, n);
              Hi(l, c);
              break e;
            case 1:
              v = i;
              var { type: P, stateNode: s } = l;
              if (
                (l.flags & 128) === 0 &&
                (typeof P.getDerivedStateFromError === "function" ||
                  (s !== null &&
                    typeof s.componentDidCatch === "function" &&
                    (zn === null || !zn.has(s))))
              ) {
                ((l.flags |= 65536), (n &= -n), (l.lanes |= n));
                var H = X9(l, v, n);
                Hi(l, H);
                break e;
              }
          }
          l = l.return;
        } while (l !== null);
      }
      Z9(f);
    } catch (x) {
      ((n = x), Y === f && f !== null && (Y = f = f.return));
      continue;
    }
    break;
  } while (1);
}
function S9() {
  var e = Lr.current;
  return ((Lr.current = Ar), e === null ? Ar : e);
}
function dv() {
  if (E === 0 || E === 3 || E === 2) E = 4;
  G === null || ((Wn & 268435455) === 0 && (Rr & 268435455) === 0) || un(G, B);
}
function Dr(e, n) {
  var f = I;
  I |= 2;
  var t = S9();
  if (G !== e || B !== n) ((Re = null), Dn(e, n));
  do
    try {
      Ta();
      break;
    } catch (r) {
      O9(e, r);
    }
  while (1);
  if ((Gu(), (I = f), (Lr.current = t), Y !== null)) throw Error(m(261));
  return ((G = null), (B = 0), E);
}
function Ta() {
  for (; Y !== null; ) j9(Y);
}
function Na() {
  for (; Y !== null && !e3(); ) j9(Y);
}
function j9(e) {
  var n = J9(e.alternate, e, ce);
  ((e.memoizedProps = e.pendingProps),
    n === null ? Z9(e) : (Y = n),
    (vv.current = null));
}
function Z9(e) {
  var n = e;
  do {
    var f = n.alternate;
    if (((e = n.return), (n.flags & 32768) === 0)) {
      if (((f = ma(f, n, ce)), f !== null)) {
        Y = f;
        return;
      }
    } else {
      if (((f = Ha(f, n)), f !== null)) {
        ((f.flags &= 32767), (Y = f));
        return;
      }
      if (e !== null)
        ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
      else {
        ((E = 6), (Y = null));
        return;
      }
    }
    if (((n = n.sibling), n !== null)) {
      Y = n;
      return;
    }
    Y = n = e;
  } while (n !== null);
  E === 0 && (E = 5);
}
function An(e, n, f) {
  var t = D,
    r = he.transition;
  try {
    ((he.transition = null), (D = 1), Aa(e, n, f, t));
  } finally {
    ((he.transition = r), (D = t));
  }
  return null;
}
function Aa(e, n, f, t) {
  do cf();
  while (on !== null);
  if ((I & 6) !== 0) throw Error(m(327));
  f = e.finishedWork;
  var r = e.finishedLanes;
  if (f === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), f === e.current))
    throw Error(m(177));
  ((e.callbackNode = null), (e.callbackPriority = 0));
  var l = f.lanes | f.childLanes;
  if (
    (P3(e, l),
    e === G && ((Y = G = null), (B = 0)),
    ((f.subtreeFlags & 2064) === 0 && (f.flags & 2064) === 0) ||
      _t ||
      ((_t = !0),
      V9(cr, function () {
        return (cf(), null);
      })),
    (l = (f.flags & 15990) !== 0),
    (f.subtreeFlags & 15990) !== 0 || l)
  ) {
    ((l = he.transition), (he.transition = null));
    var u = D;
    D = 1;
    var v = I;
    ((I |= 4),
      (vv.current = null),
      ha(e, f),
      I9(f, e),
      B3(ru),
      (zr = !!tu),
      (ru = tu = null),
      (e.current = f),
      Ca(f, e, r),
      n3(),
      (I = v),
      (D = u),
      (he.transition = l));
  } else e.current = f;
  if (
    (_t && ((_t = !1), (on = e), (br = r)),
    (l = e.pendingLanes),
    l === 0 && (zn = null),
    r3(f.stateNode, t),
    de(e, R()),
    n !== null)
  )
    for (t = e.onRecoverableError, f = 0; f < n.length; f++)
      ((r = n[f]), t(r.value, { componentStack: r.stack, digest: r.digest }));
  if (Ir) throw ((Ir = !1), (e = wu), (wu = null), e);
  return (
    (br & 1) !== 0 && e.tag !== 0 && cf(),
    (l = e.pendingLanes),
    (l & 1) !== 0 ? (e === xu ? _f++ : ((_f = 0), (xu = e))) : (_f = 0),
    hn(),
    null
  );
}
function cf() {
  if (on !== null) {
    var e = po(br),
      n = he.transition,
      f = D;
    try {
      if (((he.transition = null), (D = 16 > e ? 16 : e), on === null))
        var t = !1;
      else {
        if (((e = on), (on = null), (br = 0), (I & 6) !== 0))
          throw Error(m(331));
        var r = I;
        I |= 4;
        for (w = e.current; w !== null; ) {
          var l = w,
            u = l.child;
          if ((w.flags & 16) !== 0) {
            var v = l.deletions;
            if (v !== null) {
              for (var i = 0; i < v.length; i++) {
                var d = v[i];
                for (w = d; w !== null; ) {
                  var p = w;
                  switch (p.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Bf(8, p, l);
                  }
                  var X = p.child;
                  if (X !== null) ((X.return = p), (w = X));
                  else
                    for (; w !== null; ) {
                      p = w;
                      var { sibling: g, return: y } = p;
                      if ((N9(p), p === d)) {
                        w = null;
                        break;
                      }
                      if (g !== null) {
                        ((g.return = y), (w = g));
                        break;
                      }
                      w = y;
                    }
                }
              }
              var C = l.alternate;
              if (C !== null) {
                var h = C.child;
                if (h !== null) {
                  C.child = null;
                  do {
                    var Z = h.sibling;
                    ((h.sibling = null), (h = Z));
                  } while (h !== null);
                }
              }
              w = l;
            }
          }
          if ((l.subtreeFlags & 2064) !== 0 && u !== null)
            ((u.return = l), (w = u));
          else
            e: for (; w !== null; ) {
              if (((l = w), (l.flags & 2048) !== 0))
                switch (l.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Bf(9, l, l.return);
                }
              var c = l.sibling;
              if (c !== null) {
                ((c.return = l.return), (w = c));
                break e;
              }
              w = l.return;
            }
        }
        var P = e.current;
        for (w = P; w !== null; ) {
          u = w;
          var s = u.child;
          if ((u.subtreeFlags & 2064) !== 0 && s !== null)
            ((s.return = u), (w = s));
          else
            e: for (u = P; w !== null; ) {
              if (((v = w), (v.flags & 2048) !== 0))
                try {
                  switch (v.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Fr(9, v);
                  }
                } catch (x) {
                  F(v, v.return, x);
                }
              if (v === u) {
                w = null;
                break e;
              }
              var H = v.sibling;
              if (H !== null) {
                ((H.return = v.return), (w = H));
                break e;
              }
              w = v.return;
            }
        }
        if (
          ((I = r), hn(), Ve && typeof Ve.onPostCommitFiberRoot === "function")
        )
          try {
            Ve.onPostCommitFiberRoot(Sr, e);
          } catch (x) {}
        t = !0;
      }
      return t;
    } finally {
      ((D = f), (he.transition = n));
    }
  }
  return !1;
}
function qi(e, n, f) {
  ((n = mf(f, n)),
    (n = p9(e, n, 1)),
    (e = sn(e, n, 1)),
    (n = le()),
    e !== null && (pt(e, 1, n), de(e, n)));
}
function F(e, n, f) {
  if (e.tag === 3) qi(e, e, f);
  else
    for (; n !== null; ) {
      if (n.tag === 3) {
        qi(n, e, f);
        break;
      } else if (n.tag === 1) {
        var t = n.stateNode;
        if (
          typeof n.type.getDerivedStateFromError === "function" ||
          (typeof t.componentDidCatch === "function" &&
            (zn === null || !zn.has(t)))
        ) {
          ((e = mf(f, e)),
            (e = X9(n, e, 1)),
            (n = sn(n, e, 1)),
            (e = le()),
            n !== null && (pt(n, 1, e), de(n, e)));
          break;
        }
      }
      n = n.return;
    }
}
function La(e, n, f) {
  var t = e.pingCache;
  (t !== null && t.delete(n),
    (n = le()),
    (e.pingedLanes |= e.suspendedLanes & f),
    G === e &&
      (B & f) === f &&
      (E === 4 || (E === 3 && (B & 130023424) === B && 500 > R() - ov)
        ? Dn(e, 0)
        : (iv |= f)),
    de(e, n));
}
function W9(e, n) {
  n === 0 &&
    ((e.mode & 1) === 0
      ? (n = 1)
      : ((n = Ft), (Ft <<= 1), (Ft & 130023424) === 0 && (Ft = 4194304)));
  var f = le();
  ((e = Be(e, n)), e !== null && (pt(e, n, f), de(e, f)));
}
function Ia(e) {
  var n = e.memoizedState,
    f = 0;
  (n !== null && (f = n.retryLane), W9(e, f));
}
function ba(e, n) {
  var f = 0;
  switch (e.tag) {
    case 13:
      var { stateNode: t, memoizedState: r } = e;
      r !== null && (f = r.retryLane);
      break;
    case 19:
      t = e.stateNode;
      break;
    default:
      throw Error(m(314));
  }
  (t !== null && t.delete(n), W9(e, f));
}
function V9(e, n) {
  return ao(e, n);
}
function Da(e, n, f, t) {
  ((this.tag = e),
    (this.key = f),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = n),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = t),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null));
}
function ye(e, n, f, t) {
  return new Da(e, n, f, t);
}
function cv(e) {
  return ((e = e.prototype), !(!e || !e.isReactComponent));
}
function Oa(e) {
  if (typeof e === "function") return cv(e) ? 1 : 0;
  if (e !== void 0 && e !== null) {
    if (((e = e.$$typeof), e === Du)) return 11;
    if (e === Ou) return 14;
  }
  return 2;
}
function Xn(e, n) {
  var f = e.alternate;
  return (
    f === null
      ? ((f = ye(e.tag, n, e.key, e.mode)),
        (f.elementType = e.elementType),
        (f.type = e.type),
        (f.stateNode = e.stateNode),
        (f.alternate = e),
        (e.alternate = f))
      : ((f.pendingProps = n),
        (f.type = e.type),
        (f.flags = 0),
        (f.subtreeFlags = 0),
        (f.deletions = null)),
    (f.flags = e.flags & 14680064),
    (f.childLanes = e.childLanes),
    (f.lanes = e.lanes),
    (f.child = e.child),
    (f.memoizedProps = e.memoizedProps),
    (f.memoizedState = e.memoizedState),
    (f.updateQueue = e.updateQueue),
    (n = e.dependencies),
    (f.dependencies =
      n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }),
    (f.sibling = e.sibling),
    (f.index = e.index),
    (f.ref = e.ref),
    f
  );
}
function or(e, n, f, t, r, l) {
  var u = 2;
  if (((t = e), typeof e === "function")) cv(e) && (u = 1);
  else if (typeof e === "string") u = 5;
  else
    e: switch (e) {
      case Bn:
        return On(f.children, r, l, n);
      case bu:
        ((u = 8), (r |= 8));
        break;
      case jl:
        return (
          (e = ye(12, f, n, r | 2)),
          (e.elementType = jl),
          (e.lanes = l),
          e
        );
      case Zl:
        return ((e = ye(13, f, n, r)), (e.elementType = Zl), (e.lanes = l), e);
      case Wl:
        return ((e = ye(19, f, n, r)), (e.elementType = Wl), (e.lanes = l), e);
      case Gi:
        return Yr(f, r, l, n);
      default:
        if (typeof e === "object" && e !== null)
          switch (e.$$typeof) {
            case Ei:
              u = 10;
              break e;
            case Mi:
              u = 9;
              break e;
            case Du:
              u = 11;
              break e;
            case Ou:
              u = 14;
              break e;
            case tn:
              ((u = 16), (t = null));
              break e;
          }
        throw Error(m(130, e == null ? e : typeof e, ""));
    }
  return (
    (n = ye(u, f, n, r)),
    (n.elementType = e),
    (n.type = t),
    (n.lanes = l),
    n
  );
}
function On(e, n, f, t) {
  return ((e = ye(7, e, t, n)), (e.lanes = f), e);
}
function Yr(e, n, f, t) {
  return (
    (e = ye(22, e, t, n)),
    (e.elementType = Gi),
    (e.lanes = f),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function Dl(e, n, f) {
  return ((e = ye(6, e, null, n)), (e.lanes = f), e);
}
function Ol(e, n, f) {
  return (
    (n = ye(4, e.children !== null ? e.children : [], e.key, n)),
    (n.lanes = f),
    (n.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    n
  );
}
function Sa(e, n, f, t, r) {
  ((this.tag = n),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Xl(0)),
    (this.expirationTimes = Xl(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Xl(0)),
    (this.identifierPrefix = t),
    (this.onRecoverableError = r),
    (this.mutableSourceEagerHydrationData = null));
}
function sv(e, n, f, t, r, l, u, v, i) {
  return (
    (e = new Sa(e, n, f, v, i)),
    n === 1 ? ((n = 1), l === !0 && (n |= 8)) : (n = 0),
    (l = ye(3, null, null, n)),
    (e.current = l),
    (l.stateNode = e),
    (l.memoizedState = {
      element: t,
      isDehydrated: f,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Qu(l),
    e
  );
}
function ja(e, n, f) {
  var t = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Un,
    key: t == null ? null : "" + t,
    children: e,
    containerInfo: n,
    implementation: f,
  };
}
function k9(e) {
  if (!e) return mn;
  e = e._reactInternals;
  e: {
    if (kn(e) !== e || e.tag !== 1) throw Error(m(170));
    var n = e;
    do {
      switch (n.tag) {
        case 3:
          n = n.stateNode.context;
          break e;
        case 1:
          if (ae(n.type)) {
            n = n.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      n = n.return;
    } while (n !== null);
    throw Error(m(171));
  }
  if (e.tag === 1) {
    var f = e.type;
    if (ae(f)) return ko(e, f, n);
  }
  return n;
}
function q9(e, n, f, t, r, l, u, v, i) {
  return (
    (e = sv(f, t, !0, e, r, l, u, v, i)),
    (e.context = k9(null)),
    (f = e.current),
    (t = le()),
    (r = pn(f)),
    (l = Me(t, r)),
    (l.callback = n !== void 0 && n !== null ? n : null),
    sn(f, l, r),
    (e.current.lanes = r),
    pt(e, r, t),
    de(e, t),
    e
  );
}
function Kr(e, n, f, t) {
  var r = n.current,
    l = le(),
    u = pn(r);
  return (
    (f = k9(f)),
    n.context === null ? (n.context = f) : (n.pendingContext = f),
    (n = Me(l, u)),
    (n.payload = { element: e }),
    (t = t === void 0 ? null : t),
    t !== null && (n.callback = t),
    (e = sn(r, n, u)),
    e !== null && (De(e, r, u, l), tr(e, r, u)),
    u
  );
}
function Or(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Fi(e, n) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var f = e.retryLane;
    e.retryLane = f !== 0 && f < n ? f : n;
  }
}
function zv(e, n) {
  (Fi(e, n), (e = e.alternate) && Fi(e, n));
}
function Za() {
  return null;
}
function pv(e) {
  this._internalRoot = e;
}
function Er(e) {
  this._internalRoot = e;
}
function Xv(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function Mr(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function Ri() {}
function Wa(e, n, f, t, r) {
  if (r) {
    if (typeof t === "function") {
      var l = t;
      t = function () {
        var d = Or(u);
        l.call(d);
      };
    }
    var u = q9(n, t, e, 0, null, !1, !1, "", Ri);
    return (
      (e._reactRootContainer = u),
      (e[Ue] = u.current),
      vt(e.nodeType === 8 ? e.parentNode : e),
      Jn(),
      u
    );
  }
  for (; (r = e.lastChild); ) e.removeChild(r);
  if (typeof t === "function") {
    var v = t;
    t = function () {
      var d = Or(i);
      v.call(d);
    };
  }
  var i = sv(e, 0, !1, null, null, !1, !1, "", Ri);
  return (
    (e._reactRootContainer = i),
    (e[Ue] = i.current),
    vt(e.nodeType === 8 ? e.parentNode : e),
    Jn(function () {
      Kr(n, i, f, t);
    }),
    i
  );
}
function Gr(e, n, f, t, r) {
  var l = f._reactRootContainer;
  if (l) {
    var u = l;
    if (typeof r === "function") {
      var v = r;
      r = function () {
        var i = Or(u);
        v.call(i);
      };
    }
    Kr(n, u, e, r);
  } else u = Wa(f, n, e, r, t);
  return Or(u);
}
var Yi,
  J,
  Ki,
  $f,
  Ge,
  Sl,
  kP,
  kv,
  qv,
  Q,
  Au,
  _e,
  Jt,
  Un,
  Bn,
  bu,
  jl,
  Ei,
  Mi,
  Du,
  Zl,
  Wl,
  Ou,
  tn,
  Gi,
  Fv,
  q,
  cl,
  sl = !1,
  Wf,
  kt,
  eo,
  Yf,
  MP,
  GP,
  El = null,
  Ml = null,
  of = null,
  Pf = null,
  pl = !1,
  Gl = !1,
  Tn,
  Kf = !1,
  ar = null,
  dr = !1,
  Ul = null,
  BP,
  ao,
  Uv,
  e3,
  n3,
  R,
  f3,
  ju,
  co,
  cr,
  t3,
  so,
  Sr = null,
  Ve = null,
  be,
  l3,
  u3,
  qt = 64,
  Ft = 4194304,
  D = 0,
  Xo,
  Wu,
  go,
  mo,
  Ho,
  Ql = !1,
  Rt,
  Pn = null,
  an = null,
  dn = null,
  ft,
  tt,
  ln,
  a3,
  af,
  zr = !0,
  pr = null,
  vn = null,
  Vu = null,
  er = null,
  yf,
  ku,
  Xt,
  p3,
  gl,
  ml,
  Df,
  jr,
  $v,
  X3,
  g3,
  m3,
  Hl,
  H3,
  y3,
  h3,
  C3,
  w3,
  ei,
  x3,
  T3,
  N3,
  L3,
  I3,
  b3,
  ni,
  D3,
  O3,
  S3,
  j3,
  Z3,
  W3,
  J3,
  Fu,
  Ef = null,
  V3,
  wo,
  fi,
  ti = !1,
  Qn = !1,
  F3,
  Mf = null,
  lt = null,
  Ao = !1,
  Vf,
  kf,
  fr,
  Oe,
  Q3,
  _n = null,
  $l = null,
  Gf = null,
  eu = !1,
  $n,
  yl,
  Do,
  Oo,
  So,
  jo,
  Zo,
  Wo,
  oi,
  Ff,
  nu,
  fu,
  qf,
  Rf,
  _3,
  Et,
  $3,
  ea,
  tu = null,
  ru = null,
  uu,
  na,
  ci,
  fa,
  hf,
  Je,
  ot,
  Ue,
  vu,
  ra,
  la,
  iu,
  nf = -1,
  mn,
  fe,
  Pe,
  Sn,
  Ye = null,
  Vr = !1,
  xl = !1,
  ff,
  tf = 0,
  yr = null,
  hr = 0,
  me,
  He = 0,
  jn = null,
  Ke = 1,
  Ee = "",
  ze = null,
  se = null,
  W = !1,
  Ie = null,
  va,
  Xf,
  Eo,
  Cr,
  wr = null,
  rf = null,
  Mu = null,
  In = null,
  rn = !1,
  mt,
  ke,
  Pt,
  at,
  V,
  Tl,
  rr,
  Nl,
  Zn = 0,
  k = null,
  K = null,
  M = null,
  Nr = !1,
  Uf = !1,
  dt = 0,
  ia = 0,
  Ar,
  da,
  ca,
  sa,
  qr,
  za,
  pa,
  oe = !1,
  Xu,
  w9,
  mu,
  x9,
  T9,
  Qt = !1,
  ne = !1,
  ya,
  w = null,
  Si = !1,
  U = null,
  Le = !1,
  wa,
  Lr,
  vv,
  he,
  I = 0,
  G = null,
  Y = null,
  B = 0,
  ce = 0,
  uf,
  E = 0,
  zt = null,
  Wn = 0,
  Rr = 0,
  iv = 0,
  Qf = null,
  ie = null,
  ov = 0,
  Hf = 1 / 0,
  Re = null,
  Ir = !1,
  wu = null,
  zn = null,
  _t = !1,
  on = null,
  br = 0,
  _f = 0,
  xu = null,
  vr = -1,
  ir = 0,
  J9,
  F9,
  Ja,
  jf,
  Va,
  Gn,
  R9,
  Y9 = function (e, n) {
    var f =
      2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Xv(n)) throw Error(m(200));
    return ja(e, n, null, f);
  },
  K9 = function (e, n) {
    if (!Xv(e)) throw Error(m(299));
    var f = !1,
      t = "",
      r = F9;
    return (
      n !== null &&
        n !== void 0 &&
        (n.unstable_strictMode === !0 && (f = !0),
        n.identifierPrefix !== void 0 && (t = n.identifierPrefix),
        n.onRecoverableError !== void 0 && (r = n.onRecoverableError)),
      (n = sv(e, 1, !1, null, null, f, !1, t, r)),
      (e[Ue] = n.current),
      vt(e.nodeType === 8 ? e.parentNode : e),
      new pv(n)
    );
  },
  E9 = function (e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var n = e._reactInternals;
    if (n === void 0) {
      if (typeof e.render === "function") throw Error(m(188));
      throw ((e = Object.keys(e).join(",")), Error(m(268, e)));
    }
    return ((e = oo(n)), (e = e === null ? null : e.stateNode), e);
  },
  M9 = function (e) {
    return Jn(e);
  },
  G9 = function (e, n, f) {
    if (!Mr(n)) throw Error(m(200));
    return Gr(null, e, n, !0, f);
  },
  U9 = function (e, n, f) {
    if (!Xv(e)) throw Error(m(405));
    var t = (f != null && f.hydratedSources) || null,
      r = !1,
      l = "",
      u = F9;
    if (
      (f !== null &&
        f !== void 0 &&
        (f.unstable_strictMode === !0 && (r = !0),
        f.identifierPrefix !== void 0 && (l = f.identifierPrefix),
        f.onRecoverableError !== void 0 && (u = f.onRecoverableError)),
      (n = q9(n, null, e, 1, f != null ? f : null, r, !1, l, u)),
      (e[Ue] = n.current),
      vt(e),
      t)
    )
      for (e = 0; e < t.length; e++)
        ((f = t[e]),
          (r = f._getVersion),
          (r = r(f._source)),
          n.mutableSourceEagerHydrationData == null
            ? (n.mutableSourceEagerHydrationData = [f, r])
            : n.mutableSourceEagerHydrationData.push(f, r));
    return new Er(n);
  },
  B9 = function (e, n, f) {
    if (!Mr(n)) throw Error(m(200));
    return Gr(null, e, n, !1, f);
  },
  Q9 = function (e) {
    if (!Mr(e)) throw Error(m(40));
    return e._reactRootContainer
      ? (Jn(function () {
          Gr(null, null, e, !1, function () {
            ((e._reactRootContainer = null), (e[Ue] = null));
          });
        }),
        !0)
      : !1;
  },
  _9,
  $9 = function (e, n, f, t) {
    if (!Mr(f)) throw Error(m(200));
    if (e == null || e._reactInternals === void 0) throw Error(m(38));
    return Gr(e, n, f, !1, t);
  },
  e7 = "18.3.1-next-f1338f8080-20240426";
var n7 = y7(() => {
  ((Yi = Fe(wn(), 1)), (J = Fe(Vv(), 1)));
  ((Ki = new Set()), ($f = {}));
  ((Ge = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  )),
    (Sl = Object.prototype.hasOwnProperty),
    (kP =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/),
    (kv = {}),
    (qv = {}));
  Q = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (e) {
      Q[e] = new ue(e, 0, !1, e, null, !1, !1);
    });
  [
    ["acceptCharset", "accept-charset"],
    ["className", "class"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
  ].forEach(function (e) {
    var n = e[0];
    Q[n] = new ue(n, 1, !1, e[1], null, !1, !1);
  });
  ["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
    Q[e] = new ue(e, 2, !1, e.toLowerCase(), null, !1, !1);
  });
  [
    "autoReverse",
    "externalResourcesRequired",
    "focusable",
    "preserveAlpha",
  ].forEach(function (e) {
    Q[e] = new ue(e, 2, !1, e, null, !1, !1);
  });
  "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
    .split(" ")
    .forEach(function (e) {
      Q[e] = new ue(e, 3, !1, e.toLowerCase(), null, !1, !1);
    });
  ["checked", "multiple", "muted", "selected"].forEach(function (e) {
    Q[e] = new ue(e, 3, !0, e, null, !1, !1);
  });
  ["capture", "download"].forEach(function (e) {
    Q[e] = new ue(e, 4, !1, e, null, !1, !1);
  });
  ["cols", "rows", "size", "span"].forEach(function (e) {
    Q[e] = new ue(e, 6, !1, e, null, !1, !1);
  });
  ["rowSpan", "start"].forEach(function (e) {
    Q[e] = new ue(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
  Au = /[\-:]([a-z])/g;
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (e) {
      var n = e.replace(Au, Lu);
      Q[n] = new ue(n, 1, !1, e, null, !1, !1);
    });
  "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
    .split(" ")
    .forEach(function (e) {
      var n = e.replace(Au, Lu);
      Q[n] = new ue(n, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
    });
  ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
    var n = e.replace(Au, Lu);
    Q[n] = new ue(n, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  });
  ["tabIndex", "crossOrigin"].forEach(function (e) {
    Q[e] = new ue(e, 1, !1, e.toLowerCase(), null, !1, !1);
  });
  Q.xlinkHref = new ue(
    "xlinkHref",
    1,
    !1,
    "xlink:href",
    "http://www.w3.org/1999/xlink",
    !0,
    !1,
  );
  ["src", "href", "action", "formAction"].forEach(function (e) {
    Q[e] = new ue(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  ((_e = Yi.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED),
    (Jt = Symbol.for("react.element")),
    (Un = Symbol.for("react.portal")),
    (Bn = Symbol.for("react.fragment")),
    (bu = Symbol.for("react.strict_mode")),
    (jl = Symbol.for("react.profiler")),
    (Ei = Symbol.for("react.provider")),
    (Mi = Symbol.for("react.context")),
    (Du = Symbol.for("react.forward_ref")),
    (Zl = Symbol.for("react.suspense")),
    (Wl = Symbol.for("react.suspense_list")),
    (Ou = Symbol.for("react.memo")),
    (tn = Symbol.for("react.lazy")),
    (Gi = Symbol.for("react.offscreen")),
    (Fv = Symbol.iterator));
  q = Object.assign;
  Wf = Array.isArray;
  eo = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (n, f, t, r) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(n, f, t, r);
          });
        }
      : e;
  })(function (e, n) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = n;
    else {
      ((kt = kt || document.createElement("div")),
        (kt.innerHTML = "<svg>" + n.valueOf().toString() + "</svg>"));
      for (n = kt.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
      for (; n.firstChild; ) e.appendChild(n.firstChild);
    }
  });
  ((Yf = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  }),
    (MP = ["Webkit", "ms", "Moz", "O"]));
  Object.keys(Yf).forEach(function (e) {
    MP.forEach(function (n) {
      ((n = n + e.charAt(0).toUpperCase() + e.substring(1)), (Yf[n] = Yf[e]));
    });
  });
  GP = q(
    { menuitem: !0 },
    {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0,
    },
  );
  if (Ge)
    try {
      ((Tn = {}),
        Object.defineProperty(Tn, "passive", {
          get: function () {
            Gl = !0;
          },
        }),
        window.addEventListener("test", Tn, Tn),
        window.removeEventListener("test", Tn, Tn));
    } catch (e) {
      Gl = !1;
    }
  BP = {
    onError: function (e) {
      ((Kf = !0), (ar = e));
    },
  };
  ((ao = J.unstable_scheduleCallback),
    (Uv = J.unstable_cancelCallback),
    (e3 = J.unstable_shouldYield),
    (n3 = J.unstable_requestPaint),
    (R = J.unstable_now),
    (f3 = J.unstable_getCurrentPriorityLevel),
    (ju = J.unstable_ImmediatePriority),
    (co = J.unstable_UserBlockingPriority),
    (cr = J.unstable_NormalPriority),
    (t3 = J.unstable_LowPriority),
    (so = J.unstable_IdlePriority));
  ((be = Math.clz32 ? Math.clz32 : v3), (l3 = Math.log), (u3 = Math.LN2));
  ((Rt = []),
    (ft = new Map()),
    (tt = new Map()),
    (ln = []),
    (a3 =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
        " ",
      )));
  af = _e.ReactCurrentBatchConfig;
  ((yf = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  }),
    (ku = pe(yf)),
    (Xt = q({}, yf, { view: 0, detail: 0 })),
    (p3 = pe(Xt)),
    (jr = q({}, Xt, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: qu,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        if ("movementX" in e) return e.movementX;
        return (
          e !== Df &&
            (Df && e.type === "mousemove"
              ? ((gl = e.screenX - Df.screenX), (ml = e.screenY - Df.screenY))
              : (ml = gl = 0),
            (Df = e)),
          gl
        );
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : ml;
      },
    })),
    ($v = pe(jr)),
    (X3 = q({}, jr, { dataTransfer: 0 })),
    (g3 = pe(X3)),
    (m3 = q({}, Xt, { relatedTarget: 0 })),
    (Hl = pe(m3)),
    (H3 = q({}, yf, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })),
    (y3 = pe(H3)),
    (h3 = q({}, yf, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    })),
    (C3 = pe(h3)),
    (w3 = q({}, yf, { data: 0 })),
    (ei = pe(w3)),
    (x3 = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    }),
    (T3 = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    }),
    (N3 = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    }));
  ((L3 = q({}, Xt, {
    key: function (e) {
      if (e.key) {
        var n = x3[e.key] || e.key;
        if (n !== "Unidentified") return n;
      }
      return e.type === "keypress"
        ? ((e = nr(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
          ? T3[e.keyCode] || "Unidentified"
          : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: qu,
    charCode: function (e) {
      return e.type === "keypress" ? nr(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? nr(e)
        : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
    },
  })),
    (I3 = pe(L3)),
    (b3 = q({}, jr, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    })),
    (ni = pe(b3)),
    (D3 = q({}, Xt, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: qu,
    })),
    (O3 = pe(D3)),
    (S3 = q({}, yf, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })),
    (j3 = pe(S3)),
    (Z3 = q({}, jr, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
            ? -e.wheelDeltaX
            : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
            ? -e.wheelDeltaY
            : "wheelDelta" in e
              ? -e.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    })),
    (W3 = pe(Z3)),
    (J3 = [9, 13, 27, 32]),
    (Fu = Ge && "CompositionEvent" in window));
  Ge && "documentMode" in document && (Ef = document.documentMode);
  ((V3 = Ge && "TextEvent" in window && !Ef),
    (wo = Ge && (!Fu || (Ef && 8 < Ef && 11 >= Ef))),
    (fi = String.fromCharCode(32)));
  F3 = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  if (Ge) {
    if (Ge) {
      if (((kf = "oninput" in document), !kf))
        ((fr = document.createElement("div")),
          fr.setAttribute("oninput", "return;"),
          (kf = typeof fr.oninput === "function"));
      Vf = kf;
    } else Vf = !1;
    Ao = Vf && (!document.documentMode || 9 < document.documentMode);
  }
  Oe = typeof Object.is === "function" ? Object.is : U3;
  Q3 = Ge && "documentMode" in document && 11 >= document.documentMode;
  (($n = {
    animationend: Kt("Animation", "AnimationEnd"),
    animationiteration: Kt("Animation", "AnimationIteration"),
    animationstart: Kt("Animation", "AnimationStart"),
    transitionend: Kt("Transition", "TransitionEnd"),
  }),
    (yl = {}),
    (Do = {}));
  Ge &&
    ((Do = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete $n.animationend.animation,
      delete $n.animationiteration.animation,
      delete $n.animationstart.animation),
    "TransitionEvent" in window || delete $n.transitionend.transition);
  ((Oo = Wr("animationend")),
    (So = Wr("animationiteration")),
    (jo = Wr("animationstart")),
    (Zo = Wr("transitionend")),
    (Wo = new Map()),
    (oi =
      "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      )));
  for (qf = 0; qf < oi.length; qf++)
    ((Ff = oi[qf]),
      (nu = Ff.toLowerCase()),
      (fu = Ff[0].toUpperCase() + Ff.slice(1)),
      Hn(nu, "on" + fu));
  Hn(Oo, "onAnimationEnd");
  Hn(So, "onAnimationIteration");
  Hn(jo, "onAnimationStart");
  Hn("dblclick", "onDoubleClick");
  Hn("focusin", "onFocus");
  Hn("focusout", "onBlur");
  Hn(Zo, "onTransitionEnd");
  sf("onMouseEnter", ["mouseout", "mouseover"]);
  sf("onMouseLeave", ["mouseout", "mouseover"]);
  sf("onPointerEnter", ["pointerout", "pointerover"]);
  sf("onPointerLeave", ["pointerout", "pointerover"]);
  Vn(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(
      " ",
    ),
  );
  Vn(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " ",
    ),
  );
  Vn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
  Vn(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" "),
  );
  Vn(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" "),
  );
  Vn(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
  );
  ((Rf =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " ",
    )),
    (_3 = new Set(
      "cancel close invalid load scroll toggle".split(" ").concat(Rf),
    )));
  Et = "_reactListening" + Math.random().toString(36).slice(2);
  (($3 = /\r\n?/g), (ea = /\u0000|\uFFFD/g));
  ((uu = typeof setTimeout === "function" ? setTimeout : void 0),
    (na = typeof clearTimeout === "function" ? clearTimeout : void 0),
    (ci = typeof Promise === "function" ? Promise : void 0),
    (fa =
      typeof queueMicrotask === "function"
        ? queueMicrotask
        : typeof ci < "u"
          ? function (e) {
              return ci.resolve(null).then(e).catch(ta);
            }
          : uu));
  ((hf = Math.random().toString(36).slice(2)),
    (Je = "__reactFiber$" + hf),
    (ot = "__reactProps$" + hf),
    (Ue = "__reactContainer$" + hf),
    (vu = "__reactEvents$" + hf),
    (ra = "__reactListeners$" + hf),
    (la = "__reactHandles$" + hf));
  iu = [];
  ((mn = {}), (fe = yn(mn)), (Pe = yn(!1)), (Sn = mn));
  ((ff = []), (me = []));
  va = _e.ReactCurrentBatchConfig;
  ((Xf = Ko(!0)), (Eo = Ko(!1)), (Cr = yn(null)));
  ((mt = {}), (ke = yn(mt)), (Pt = yn(mt)), (at = yn(mt)));
  V = yn(0);
  Tl = [];
  ((rr = _e.ReactCurrentDispatcher), (Nl = _e.ReactCurrentBatchConfig));
  ((Ar = {
    readContext: Ce,
    useCallback: $,
    useContext: $,
    useEffect: $,
    useImperativeHandle: $,
    useInsertionEffect: $,
    useLayoutEffect: $,
    useMemo: $,
    useReducer: $,
    useRef: $,
    useState: $,
    useDebugValue: $,
    useDeferredValue: $,
    useTransition: $,
    useMutableSource: $,
    useSyncExternalStore: $,
    useId: $,
    unstable_isNewReconciler: !1,
  }),
    (da = {
      readContext: Ce,
      useCallback: function (e, n) {
        return ((We().memoizedState = [e, n === void 0 ? null : n]), e);
      },
      useContext: Ce,
      useEffect: Ci,
      useImperativeHandle: function (e, n, f) {
        return (
          (f = f !== null && f !== void 0 ? f.concat([e]) : null),
          lr(4194308, 4, u9.bind(null, n, e), f)
        );
      },
      useLayoutEffect: function (e, n) {
        return lr(4194308, 4, e, n);
      },
      useInsertionEffect: function (e, n) {
        return lr(4, 2, e, n);
      },
      useMemo: function (e, n) {
        var f = We();
        return (
          (n = n === void 0 ? null : n),
          (e = e()),
          (f.memoizedState = [e, n]),
          e
        );
      },
      useReducer: function (e, n, f) {
        var t = We();
        return (
          (n = f !== void 0 ? f(n) : n),
          (t.memoizedState = t.baseState = n),
          (e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: n,
          }),
          (t.queue = e),
          (e = e.dispatch = Pa.bind(null, k, e)),
          [t.memoizedState, e]
        );
      },
      useRef: function (e) {
        var n = We();
        return ((e = { current: e }), (n.memoizedState = e));
      },
      useState: hi,
      useDebugValue: lv,
      useDeferredValue: function (e) {
        return (We().memoizedState = e);
      },
      useTransition: function () {
        var e = hi(!1),
          n = e[0];
        return ((e = oa.bind(null, e[1])), (We().memoizedState = e), [n, e]);
      },
      useMutableSource: function () {},
      useSyncExternalStore: function (e, n, f) {
        var t = k,
          r = We();
        if (W) {
          if (f === void 0) throw Error(m(407));
          f = f();
        } else {
          if (((f = n()), G === null)) throw Error(m(349));
          (Zn & 30) !== 0 || _o(t, n, f);
        }
        r.memoizedState = f;
        var l = { value: f, getSnapshot: n };
        return (
          (r.queue = l),
          Ci(e9.bind(null, t, l, e), [e]),
          (t.flags |= 2048),
          st(9, $o.bind(null, t, l, f, n), void 0, null),
          f
        );
      },
      useId: function () {
        var e = We(),
          n = G.identifierPrefix;
        if (W) {
          var f = Ee,
            t = Ke;
          ((f = (t & ~(1 << (32 - be(t) - 1))).toString(32) + f),
            (n = ":" + n + "R" + f),
            (f = dt++),
            0 < f && (n += "H" + f.toString(32)),
            (n += ":"));
        } else ((f = ia++), (n = ":" + n + "r" + f.toString(32) + ":"));
        return (e.memoizedState = n);
      },
      unstable_isNewReconciler: !1,
    }),
    (ca = {
      readContext: Ce,
      useCallback: i9,
      useContext: Ce,
      useEffect: rv,
      useImperativeHandle: v9,
      useInsertionEffect: r9,
      useLayoutEffect: l9,
      useMemo: o9,
      useReducer: Al,
      useRef: t9,
      useState: function () {
        return Al(ct);
      },
      useDebugValue: lv,
      useDeferredValue: function (e) {
        var n = we();
        return P9(n, K.memoizedState, e);
      },
      useTransition: function () {
        var e = Al(ct)[0],
          n = we().memoizedState;
        return [e, n];
      },
      useMutableSource: Bo,
      useSyncExternalStore: Qo,
      useId: a9,
      unstable_isNewReconciler: !1,
    }),
    (sa = {
      readContext: Ce,
      useCallback: i9,
      useContext: Ce,
      useEffect: rv,
      useImperativeHandle: v9,
      useInsertionEffect: r9,
      useLayoutEffect: l9,
      useMemo: o9,
      useReducer: Ll,
      useRef: t9,
      useState: function () {
        return Ll(ct);
      },
      useDebugValue: lv,
      useDeferredValue: function (e) {
        var n = we();
        return K === null ? (n.memoizedState = e) : P9(n, K.memoizedState, e);
      },
      useTransition: function () {
        var e = Ll(ct)[0],
          n = we().memoizedState;
        return [e, n];
      },
      useMutableSource: Bo,
      useSyncExternalStore: Qo,
      useId: a9,
      unstable_isNewReconciler: !1,
    }));
  qr = {
    isMounted: function (e) {
      return (e = e._reactInternals) ? kn(e) === e : !1;
    },
    enqueueSetState: function (e, n, f) {
      e = e._reactInternals;
      var t = le(),
        r = pn(e),
        l = Me(t, r);
      ((l.payload = n),
        f !== void 0 && f !== null && (l.callback = f),
        (n = sn(e, l, r)),
        n !== null && (De(n, e, r, t), tr(n, e, r)));
    },
    enqueueReplaceState: function (e, n, f) {
      e = e._reactInternals;
      var t = le(),
        r = pn(e),
        l = Me(t, r);
      ((l.tag = 1),
        (l.payload = n),
        f !== void 0 && f !== null && (l.callback = f),
        (n = sn(e, l, r)),
        n !== null && (De(n, e, r, t), tr(n, e, r)));
    },
    enqueueForceUpdate: function (e, n) {
      e = e._reactInternals;
      var f = le(),
        t = pn(e),
        r = Me(f, t);
      ((r.tag = 2),
        n !== void 0 && n !== null && (r.callback = n),
        (n = sn(e, r, t)),
        n !== null && (De(n, e, t, f), tr(n, e, t)));
    },
  };
  za = typeof WeakMap === "function" ? WeakMap : Map;
  pa = _e.ReactCurrentOwner;
  Xu = { dehydrated: null, treeContext: null, retryLane: 0 };
  w9 = function (e, n) {
    for (var f = n.child; f !== null; ) {
      if (f.tag === 5 || f.tag === 6) e.appendChild(f.stateNode);
      else if (f.tag !== 4 && f.child !== null) {
        ((f.child.return = f), (f = f.child));
        continue;
      }
      if (f === n) break;
      for (; f.sibling === null; ) {
        if (f.return === null || f.return === n) return;
        f = f.return;
      }
      ((f.sibling.return = f.return), (f = f.sibling));
    }
  };
  mu = function () {};
  x9 = function (e, n, f, t) {
    var r = e.memoizedProps;
    if (r !== t) {
      ((e = n.stateNode), bn(ke.current));
      var l = null;
      switch (f) {
        case "input":
          ((r = Vl(e, r)), (t = Vl(e, t)), (l = []));
          break;
        case "select":
          ((r = q({}, r, { value: void 0 })),
            (t = q({}, t, { value: void 0 })),
            (l = []));
          break;
        case "textarea":
          ((r = Fl(e, r)), (t = Fl(e, t)), (l = []));
          break;
        default:
          typeof r.onClick !== "function" &&
            typeof t.onClick === "function" &&
            (e.onclick = gr);
      }
      Yl(f, t);
      var u;
      f = null;
      for (d in r)
        if (!t.hasOwnProperty(d) && r.hasOwnProperty(d) && r[d] != null)
          if (d === "style") {
            var v = r[d];
            for (u in v) v.hasOwnProperty(u) && (f || (f = {}), (f[u] = ""));
          } else
            d !== "dangerouslySetInnerHTML" &&
              d !== "children" &&
              d !== "suppressContentEditableWarning" &&
              d !== "suppressHydrationWarning" &&
              d !== "autoFocus" &&
              ($f.hasOwnProperty(d)
                ? l || (l = [])
                : (l = l || []).push(d, null));
      for (d in t) {
        var i = t[d];
        if (
          ((v = r != null ? r[d] : void 0),
          t.hasOwnProperty(d) && i !== v && (i != null || v != null))
        )
          if (d === "style")
            if (v) {
              for (u in v)
                !v.hasOwnProperty(u) ||
                  (i && i.hasOwnProperty(u)) ||
                  (f || (f = {}), (f[u] = ""));
              for (u in i)
                i.hasOwnProperty(u) &&
                  v[u] !== i[u] &&
                  (f || (f = {}), (f[u] = i[u]));
            } else (f || (l || (l = []), l.push(d, f)), (f = i));
          else
            d === "dangerouslySetInnerHTML"
              ? ((i = i ? i.__html : void 0),
                (v = v ? v.__html : void 0),
                i != null && v !== i && (l = l || []).push(d, i))
              : d === "children"
                ? (typeof i !== "string" && typeof i !== "number") ||
                  (l = l || []).push(d, "" + i)
                : d !== "suppressContentEditableWarning" &&
                  d !== "suppressHydrationWarning" &&
                  ($f.hasOwnProperty(d)
                    ? (i != null && d === "onScroll" && S("scroll", e),
                      l || v === i || (l = []))
                    : (l = l || []).push(d, i));
      }
      f && (l = l || []).push("style", f);
      var d = l;
      if ((n.updateQueue = d)) n.flags |= 4;
    }
  };
  T9 = function (e, n, f, t) {
    f !== t && (n.flags |= 4);
  };
  ya = typeof WeakSet === "function" ? WeakSet : Set;
  ((wa = Math.ceil),
    (Lr = _e.ReactCurrentDispatcher),
    (vv = _e.ReactCurrentOwner),
    (he = _e.ReactCurrentBatchConfig),
    (uf = yn(0)));
  J9 = function (e, n, f) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps || Pe.current) oe = !0;
      else {
        if ((e.lanes & f) === 0 && (n.flags & 128) === 0)
          return ((oe = !1), ga(e, n, f));
        oe = (e.flags & 131072) !== 0 ? !0 : !1;
      }
    else ((oe = !1), W && (n.flags & 1048576) !== 0 && Fo(n, hr, n.index));
    switch (((n.lanes = 0), n.tag)) {
      case 2:
        var t = n.type;
        (ur(e, n), (e = n.pendingProps));
        var r = zf(n, fe.current);
        (df(n, f), (r = fv(null, n, t, e, r, f)));
        var l = tv();
        return (
          (n.flags |= 1),
          typeof r === "object" &&
          r !== null &&
          typeof r.render === "function" &&
          r.$$typeof === void 0
            ? ((n.tag = 1),
              (n.memoizedState = null),
              (n.updateQueue = null),
              ae(t) ? ((l = !0), Hr(n)) : (l = !1),
              (n.memoizedState =
                r.state !== null && r.state !== void 0 ? r.state : null),
              Qu(n),
              (r.updater = qr),
              (n.stateNode = r),
              (r._reactInternals = n),
              cu(n, t, e, f),
              (n = pu(null, n, t, !0, l, f)))
            : ((n.tag = 0), W && l && Yu(n), re(null, n, r, f), (n = n.child)),
          n
        );
      case 16:
        t = n.elementType;
        e: {
          switch (
            (ur(e, n),
            (e = n.pendingProps),
            (r = t._init),
            (t = r(t._payload)),
            (n.type = t),
            (r = n.tag = Oa(t)),
            (e = Ae(t, e)),
            r)
          ) {
            case 0:
              n = zu(null, n, t, e, f);
              break e;
            case 1:
              n = bi(null, n, t, e, f);
              break e;
            case 11:
              n = Li(null, n, t, e, f);
              break e;
            case 14:
              n = Ii(null, n, t, Ae(t.type, e), f);
              break e;
          }
          throw Error(m(306, t, ""));
        }
        return n;
      case 0:
        return (
          (t = n.type),
          (r = n.pendingProps),
          (r = n.elementType === t ? r : Ae(t, r)),
          zu(e, n, t, r, f)
        );
      case 1:
        return (
          (t = n.type),
          (r = n.pendingProps),
          (r = n.elementType === t ? r : Ae(t, r)),
          bi(e, n, t, r, f)
        );
      case 3:
        e: {
          if ((y9(n), e === null)) throw Error(m(387));
          ((t = n.pendingProps),
            (l = n.memoizedState),
            (r = l.element),
            Go(e, n),
            xr(n, t, null, f));
          var u = n.memoizedState;
          if (((t = u.element), l.isDehydrated))
            if (
              ((l = {
                element: t,
                isDehydrated: !1,
                cache: u.cache,
                pendingSuspenseBoundaries: u.pendingSuspenseBoundaries,
                transitions: u.transitions,
              }),
              (n.updateQueue.baseState = l),
              (n.memoizedState = l),
              n.flags & 256)
            ) {
              ((r = mf(Error(m(423)), n)), (n = Di(e, n, t, f, r)));
              break e;
            } else if (t !== r) {
              ((r = mf(Error(m(424)), n)), (n = Di(e, n, t, f, r)));
              break e;
            } else
              for (
                se = cn(n.stateNode.containerInfo.firstChild),
                  ze = n,
                  W = !0,
                  Ie = null,
                  f = Eo(n, null, t, f),
                  n.child = f;
                f;

              )
                ((f.flags = (f.flags & -3) | 4096), (f = f.sibling));
          else {
            if ((pf(), t === r)) {
              n = Qe(e, n, f);
              break e;
            }
            re(e, n, t, f);
          }
          n = n.child;
        }
        return n;
      case 5:
        return (
          Uo(n),
          e === null && Pu(n),
          (t = n.type),
          (r = n.pendingProps),
          (l = e !== null ? e.memoizedProps : null),
          (u = r.children),
          lu(t, r) ? (u = null) : l !== null && lu(t, l) && (n.flags |= 32),
          H9(e, n),
          re(e, n, u, f),
          n.child
        );
      case 6:
        return (e === null && Pu(n), null);
      case 13:
        return h9(e, n, f);
      case 4:
        return (
          _u(n, n.stateNode.containerInfo),
          (t = n.pendingProps),
          e === null ? (n.child = Xf(n, null, t, f)) : re(e, n, t, f),
          n.child
        );
      case 11:
        return (
          (t = n.type),
          (r = n.pendingProps),
          (r = n.elementType === t ? r : Ae(t, r)),
          Li(e, n, t, r, f)
        );
      case 7:
        return (re(e, n, n.pendingProps, f), n.child);
      case 8:
        return (re(e, n, n.pendingProps.children, f), n.child);
      case 12:
        return (re(e, n, n.pendingProps.children, f), n.child);
      case 10:
        e: {
          if (
            ((t = n.type._context),
            (r = n.pendingProps),
            (l = n.memoizedProps),
            (u = r.value),
            O(Cr, t._currentValue),
            (t._currentValue = u),
            l !== null)
          )
            if (Oe(l.value, u)) {
              if (l.children === r.children && !Pe.current) {
                n = Qe(e, n, f);
                break e;
              }
            } else
              for (l = n.child, l !== null && (l.return = n); l !== null; ) {
                var v = l.dependencies;
                if (v !== null) {
                  u = l.child;
                  for (var i = v.firstContext; i !== null; ) {
                    if (i.context === t) {
                      if (l.tag === 1) {
                        ((i = Me(-1, f & -f)), (i.tag = 2));
                        var d = l.updateQueue;
                        if (d !== null) {
                          d = d.shared;
                          var p = d.pending;
                          (p === null
                            ? (i.next = i)
                            : ((i.next = p.next), (p.next = i)),
                            (d.pending = i));
                        }
                      }
                      ((l.lanes |= f),
                        (i = l.alternate),
                        i !== null && (i.lanes |= f),
                        au(l.return, f, n),
                        (v.lanes |= f));
                      break;
                    }
                    i = i.next;
                  }
                } else if (l.tag === 10) u = l.type === n.type ? null : l.child;
                else if (l.tag === 18) {
                  if (((u = l.return), u === null)) throw Error(m(341));
                  ((u.lanes |= f),
                    (v = u.alternate),
                    v !== null && (v.lanes |= f),
                    au(u, f, n),
                    (u = l.sibling));
                } else u = l.child;
                if (u !== null) u.return = l;
                else
                  for (u = l; u !== null; ) {
                    if (u === n) {
                      u = null;
                      break;
                    }
                    if (((l = u.sibling), l !== null)) {
                      ((l.return = u.return), (u = l));
                      break;
                    }
                    u = u.return;
                  }
                l = u;
              }
          (re(e, n, r.children, f), (n = n.child));
        }
        return n;
      case 9:
        return (
          (r = n.type),
          (t = n.pendingProps.children),
          df(n, f),
          (r = Ce(r)),
          (t = t(r)),
          (n.flags |= 1),
          re(e, n, t, f),
          n.child
        );
      case 14:
        return (
          (t = n.type),
          (r = Ae(t, n.pendingProps)),
          (r = Ae(t.type, r)),
          Ii(e, n, t, r, f)
        );
      case 15:
        return g9(e, n, n.type, n.pendingProps, f);
      case 17:
        return (
          (t = n.type),
          (r = n.pendingProps),
          (r = n.elementType === t ? r : Ae(t, r)),
          ur(e, n),
          (n.tag = 1),
          ae(t) ? ((e = !0), Hr(n)) : (e = !1),
          df(n, f),
          z9(n, t, r),
          cu(n, t, r, f),
          pu(null, n, t, !0, e, f)
        );
      case 19:
        return C9(e, n, f);
      case 22:
        return m9(e, n, f);
    }
    throw Error(m(156, n.tag));
  };
  F9 =
    typeof reportError === "function"
      ? reportError
      : function (e) {
          console.error(e);
        };
  Er.prototype.render = pv.prototype.render = function (e) {
    var n = this._internalRoot;
    if (n === null) throw Error(m(409));
    Kr(e, n, null, null);
  };
  Er.prototype.unmount = pv.prototype.unmount = function () {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var n = e.containerInfo;
      (Jn(function () {
        Kr(null, e, null, null);
      }),
        (n[Ue] = null));
    }
  };
  Er.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var n = mo();
      e = { blockedOn: null, target: e, priority: n };
      for (var f = 0; f < ln.length && n !== 0 && n < ln[f].priority; f++);
      (ln.splice(f, 0, e), f === 0 && yo(e));
    }
  };
  Xo = function (e) {
    switch (e.tag) {
      case 3:
        var n = e.stateNode;
        if (n.current.memoizedState.isDehydrated) {
          var f = Jf(n.pendingLanes);
          f !== 0 &&
            (Zu(n, f | 1),
            de(n, R()),
            (I & 6) === 0 && ((Hf = R() + 500), hn()));
        }
        break;
      case 13:
        (Jn(function () {
          var t = Be(e, 1);
          if (t !== null) {
            var r = le();
            De(t, e, 1, r);
          }
        }),
          zv(e, 1));
    }
  };
  Wu = function (e) {
    if (e.tag === 13) {
      var n = Be(e, 134217728);
      if (n !== null) {
        var f = le();
        De(n, e, 134217728, f);
      }
      zv(e, 134217728);
    }
  };
  go = function (e) {
    if (e.tag === 13) {
      var n = pn(e),
        f = Be(e, n);
      if (f !== null) {
        var t = le();
        De(f, e, n, t);
      }
      zv(e, n);
    }
  };
  mo = function () {
    return D;
  };
  Ho = function (e, n) {
    var f = D;
    try {
      return ((D = e), n());
    } finally {
      D = f;
    }
  };
  Ml = function (e, n, f) {
    switch (n) {
      case "input":
        if ((kl(e, f), (n = f.name), f.type === "radio" && n != null)) {
          for (f = e; f.parentNode; ) f = f.parentNode;
          f = f.querySelectorAll(
            "input[name=" + JSON.stringify("" + n) + '][type="radio"]',
          );
          for (n = 0; n < f.length; n++) {
            var t = f[n];
            if (t !== e && t.form === e.form) {
              var r = Jr(t);
              if (!r) throw Error(m(90));
              (Bi(t), kl(t, r));
            }
          }
        }
        break;
      case "textarea":
        _i(e, f);
        break;
      case "select":
        ((n = f.value), n != null && vf(e, !!f.multiple, n, !1));
    }
  };
  lo = Pv;
  uo = Jn;
  ((Ja = { usingClientEntryPoint: !1, Events: [gt, ef, Jr, to, ro, Pv] }),
    (jf = {
      findFiberByHostInstance: Ln,
      bundleType: 0,
      version: "18.3.1",
      rendererPackageName: "react-dom",
    }),
    (Va = {
      bundleType: jf.bundleType,
      version: jf.version,
      rendererPackageName: jf.rendererPackageName,
      rendererConfig: jf.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: _e.ReactCurrentDispatcher,
      findHostInstanceByFiber: function (e) {
        return ((e = oo(e)), e === null ? null : e.stateNode);
      },
      findFiberByHostInstance: jf.findFiberByHostInstance || Za,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
    }));
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    if (
      ((Gn = __REACT_DEVTOOLS_GLOBAL_HOOK__),
      !Gn.isDisabled && Gn.supportsFiber)
    )
      try {
        ((Sr = Gn.inject(Va)), (Ve = Gn));
      } catch (e) {}
  }
  ((R9 = Ja), (_9 = Pv));
});
var r7 = Nt(($a, t7) => {
  n7();
  function f7() {
    if (
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function"
    )
      return;
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f7);
    } catch (e) {
      console.error(e);
    }
  }
  (f7(), (t7.exports = gv));
});
var l7 = Nt((qa) => {
  var Ht = Fe(r7(), 1);
  ((qa.createRoot = Ht.createRoot), (qa.hydrateRoot = Ht.hydrateRoot));
  var ka;
});
var c7 = Fe(wn(), 1),
  s7 = Fe(l7(), 1);
var ve = Fe(wn(), 1);
var Br = Fe(wn(), 1);
var u7 = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  Ur = (...e) =>
    e
      .filter((n, f, t) => {
        return Boolean(n) && n.trim() !== "" && t.indexOf(n) === f;
      })
      .join(" ")
      .trim();
var yt = Fe(wn(), 1);
var v7 = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
var i7 = yt.forwardRef(
  (
    {
      color: e = "currentColor",
      size: n = 24,
      strokeWidth: f = 2,
      absoluteStrokeWidth: t,
      className: r = "",
      children: l,
      iconNode: u,
      ...v
    },
    i,
  ) => {
    return yt.createElement(
      "svg",
      {
        ref: i,
        ...v7,
        width: n,
        height: n,
        stroke: e,
        strokeWidth: t ? (Number(f) * 24) / Number(n) : f,
        className: Ur("lucide", r),
        ...v,
      },
      [
        ...u.map(([d, p]) => yt.createElement(d, p)),
        ...(Array.isArray(l) ? l : [l]),
      ],
    );
  },
);
var b = (e, n) => {
  let f = Br.forwardRef(({ className: t, ...r }, l) =>
    Br.createElement(i7, {
      ref: l,
      iconNode: n,
      className: Ur(`lucide-${u7(e)}`, t),
      ...r,
    }),
  );
  return ((f.displayName = `${e}`), f);
};
var Xe = b("ArrowRight", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }],
]);
var qn = b("Award", [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv",
    },
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }],
]);
var ht = b("Calendar", [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  [
    "rect",
    { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" },
  ],
  ["path", { d: "M3 10h18", key: "8toen8" }],
]);
var Fn = b("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
var Ct = b("ChevronDown", [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]);
var Cf = b("Clock", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }],
]);
var $e = b("Crown", [
  [
    "path",
    {
      d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
      key: "1vdc57",
    },
  ],
  ["path", { d: "M5 21h14", key: "11awu3" }],
]);
var Rn = b("MapPin", [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z",
    },
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
]);
var xe = b("Plane", [
  [
    "path",
    {
      d: "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",
      key: "1v9wt8",
    },
  ],
]);
var wt = b("Send", [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3",
    },
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }],
]);
var Se = b("Shield", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y",
    },
  ],
]);
var qe = b("Sparkles", [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx",
    },
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }],
]);
var xt = b("Users", [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }],
]);
var Tt = b("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
]);
var Yn = b("Zap", [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db",
    },
  ],
]);
var wf =
  "/.netlify/images?url=%2Fassets%2Ftexas-private-jet.a53f3c0aa8ad.webp&w=1600&q=74";
var mv =
  "/.netlify/images?url=%2Fassets%2Fluxury-jet-cabin.edbcebc19eda.webp&w=1200&q=74";
var o7 = Fe(wn(), 1),
  Fa = Symbol.for("react.element"),
  Ra = Symbol.for("react.fragment"),
  Ya = Object.prototype.hasOwnProperty,
  Ka = o7.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Ea = { key: !0, ref: !0, __self: !0, __source: !0 };
function P7(e, n, f) {
  var t,
    r = {},
    l = null,
    u = null;
  (f !== void 0 && (l = "" + f),
    n.key !== void 0 && (l = "" + n.key),
    n.ref !== void 0 && (u = n.ref));
  for (t in n) Ya.call(n, t) && !Ea.hasOwnProperty(t) && (r[t] = n[t]);
  if (e && e.defaultProps)
    for (t in ((n = e.defaultProps), n)) r[t] === void 0 && (r[t] = n[t]);
  return {
    $$typeof: Fa,
    type: e,
    key: l,
    ref: u,
    props: r,
    _owner: Ka.current,
  };
}
var Hv = Ra,
  o = P7,
  a = P7;
var Cn = "https://villiers.ai/?id=1673",
  a7 = [
    {
      pos: "30% 18%",
      alt: "Private jet Austin to Aspen - Gulfstream G650 Texas charter at sunset",
    },
    {
      pos: "50% 35%",
      alt: "Private jet Houston to Miami - luxury Texas charter Gulfstream on runway",
    },
    {
      pos: "50% 50%",
      alt: "Private jet Dallas to New York - Gulfstream G650 Texas runway",
    },
    {
      pos: "50% 12%",
      alt: "Private jet Austin to Houston - Texas intra-state shuttle Gulfstream",
    },
    {
      pos: "50% 68%",
      alt: "Private jet Houston to Las Vegas - luxury jet Texas sunset",
    },
    {
      pos: "22% 50%",
      alt: "Private jet Dallas to Aspen - Gulfstream G650 Texas charter",
    },
    {
      pos: "50% 88%",
      alt: "Private jet Austin to Cabo - Gulfstream luxury Texas to Mexico",
    },
    {
      pos: "78% 50%",
      alt: "Private jet Houston to New York - Texas transcontinental charter",
    },
  ],
  d7 = [
    {
      from: "Austin",
      fromCode: "AUS",
      to: "Aspen",
      toCode: "ASE",
      price: "$22k–$38k",
      duration: "2h 25m",
      popular: !0,
    },
    {
      from: "Houston",
      fromCode: "HOU",
      to: "Miami",
      toCode: "OPF",
      price: "$18k–$32k",
      duration: "2h 10m",
      popular: !0,
    },
    {
      from: "Dallas",
      fromCode: "DAL",
      to: "New York",
      toCode: "TEB",
      price: "$28k–$48k",
      duration: "3h 20m",
      popular: !0,
    },
    {
      from: "Austin",
      fromCode: "AUS",
      to: "Houston",
      toCode: "HOU",
      price: "$8k–$14k",
      duration: "0h 50m",
      popular: !1,
    },
    {
      from: "Houston",
      fromCode: "IAH",
      to: "Las Vegas",
      toCode: "LAS",
      price: "$24k–$40k",
      duration: "3h 05m",
      popular: !0,
    },
    {
      from: "Dallas",
      fromCode: "DAL",
      to: "Aspen",
      toCode: "ASE",
      price: "$22k–$38k",
      duration: "2h 15m",
      popular: !1,
    },
    {
      from: "Austin",
      fromCode: "AUS",
      to: "Cabo",
      toCode: "SJD",
      price: "$35k–$55k",
      duration: "3h 10m",
      popular: !0,
    },
    {
      from: "Houston",
      fromCode: "HOU",
      to: "New York",
      toCode: "HPN",
      price: "$28k–$48k",
      duration: "3h 15m",
      popular: !1,
    },
  ],
  Ma = [
    {
      aircraftType: "Citation XLS+",
      originAirport: "AUS",
      destinationAirport: "TEB",
      departureDate: "Example itinerary • Confirm availability",
      price: "$11,900",
      seatsAvailable: 8,
      operator: "Confirm on Villiers",
      discount: "Illustrative",
      thumbPos: "50% 30%",
    },
    {
      aircraftType: "Gulfstream G650",
      originAirport: "DAL",
      destinationAirport: "ASE",
      departureDate: "Example itinerary • Confirm availability",
      price: "$18,500",
      seatsAvailable: 14,
      operator: "Confirm on Villiers",
      discount: "Illustrative",
      thumbPos: "30% 50%",
    },
    {
      aircraftType: "Phenom 300",
      originAirport: "HOU",
      destinationAirport: "LAS",
      departureDate: "Example itinerary • Confirm availability",
      price: "$9,400",
      seatsAvailable: 6,
      operator: "Confirm on Villiers",
      discount: "Illustrative",
      thumbPos: "70% 50%",
    },
    {
      aircraftType: "Challenger 350",
      originAirport: "AUS",
      destinationAirport: "SJD",
      departureDate: "Example itinerary • Confirm availability",
      price: "$21,200",
      seatsAvailable: 9,
      operator: "Confirm on Villiers",
      discount: "Illustrative",
      thumbPos: "50% 85%",
    },
    {
      aircraftType: "Citation CJ4",
      originAirport: "HOU",
      destinationAirport: "MIA",
      departureDate: "Example itinerary • Confirm availability",
      price: "$7,800",
      seatsAvailable: 7,
      operator: "Confirm on Villiers",
      discount: "Illustrative",
      thumbPos: "50% 15%",
    },
    {
      aircraftType: "Legacy 600",
      originAirport: "DAL",
      destinationAirport: "CUN",
      departureDate: "Example itinerary • Confirm availability",
      price: "$16,900",
      seatsAvailable: 13,
      operator: "Confirm on Villiers",
      discount: "Illustrative",
      thumbPos: "50% 50%",
    },
  ],
  Ga = [
    {
      q: "How much is a private jet from Austin to Houston?",
      a: "Our editorial planning range for Austin to Houston is $8,000–$14,000 one-way for a light jet. This is not a live quote; open Villiers to confirm the aircraft, operator, inclusions, and current price.",
    },
    {
      q: "What is the typical Dallas to Aspen private jet investment?",
      a: "Our editorial planning range for Dallas to Aspen is $22,000–$38,000 one-way on a midsize or super-mid aircraft. Season, airport, repositioning, and availability can materially change the final Villiers quote.",
    },
    {
      q: "Are your operators FAA certified?",
      a: "TexasJetQuote does not operate aircraft or independently certify carriers. Before booking, review the operator, FAA authority, insurance, pilot qualifications, and any independent safety ratings supplied with the Villiers quote.",
    },
    {
      q: "How fast can you confirm aircraft in Texas?",
      a: "The planner gives an immediate editorial range. Current aircraft options and response times come from Villiers and vary with the itinerary, date, and operator availability.",
    },
    {
      q: "What is included in your quote?",
      a: "The planning range is illustrative and may not include every fee. The final provider quote controls; review aircraft, crew, fuel, repositioning, airport, catering, tax, cancellation, and payment terms before booking.",
    },
  ];
function Ua(e, n) {
  let f = e.toLowerCase(),
    t = n.toLowerCase(),
    r = (p) =>
      ["austin", "houston", "dallas", "aus", "hou", "dal", "iah"].some((X) =>
        p.includes(X),
      ),
    l = (p) =>
      ["miami", "fort lauderdale", "palm beach", "opf", "mia", "fll"].some(
        (X) => p.includes(X),
      ),
    u = (p) =>
      ["new york", "nyc", "teterboro", "teb", "hpn", "white plains"].some((X) =>
        p.includes(X),
      ),
    v = (p) => ["aspen", "ase"].some((X) => p.includes(X)),
    i = (p) => ["cabo", "sjd", "san jose"].some((X) => p.includes(X)),
    d = (p) => ["vegas", "las", "las vegas"].some((X) => p.includes(X));
  if (r(f) && r(t))
    return {
      low: "$8,000",
      high: "$14,000",
      lowNum: 8000,
      highNum: 14000,
      aircraft: "Phenom 300 • CJ4 • Nextant",
      duration: "45m – 1h 10m",
      note: "Texas intra-state shuttle - ideal for same-day board meetings",
    };
  if ((r(f) && l(t)) || (r(t) && l(f)))
    return {
      low: "$18,000",
      high: "$32,000",
      lowNum: 18000,
      highNum: 32000,
      aircraft: "Citation XLS • Phenom 300 • Lear 75",
      duration: "2h 10m – 2h 40m",
      note: "High demand Miami route - midsize recommended for luggage",
    };
  if ((r(f) && u(t)) || (r(t) && u(f)))
    return {
      low: "$28,000",
      high: "$48,000",
      lowNum: 28000,
      highNum: 48000,
      aircraft: "Challenger 350 • Hawker 900 • Gulfstream G200",
      duration: "3h 15m – 3h 40m",
      note: "Transcontinental - super-mid to heavy, non-stop",
    };
  if ((r(f) && v(t)) || (r(t) && v(f)))
    return {
      low: "$22,000",
      high: "$38,000",
      lowNum: 22000,
      highNum: 38000,
      aircraft: "Citation XLS+ • Challenger 300 • Sovereign",
      duration: "2h 15m – 2h 40m",
      note: "Mountain airport expertise required - ASE qualified crews only",
    };
  if ((r(f) && i(t)) || (r(t) && i(f)))
    return {
      low: "$35,000",
      high: "$55,000",
      lowNum: 35000,
      highNum: 55000,
      aircraft: "Challenger 350 • Legacy 450 • Gulfstream G280",
      duration: "3h 00m – 3h 30m",
      note: "International - overwater, catering + customs included",
    };
  if ((r(f) && d(t)) || (r(t) && d(f)))
    return {
      low: "$24,000",
      high: "$40,000",
      lowNum: 24000,
      highNum: 40000,
      aircraft: "Citation Sovereign • Hawker 800 • Phenom 300",
      duration: "2h 55m – 3h 15m",
      note: "Weekend heavy - book 72h ahead for best selection",
    };
  return {
    low: "$19,000",
    high: "$36,000",
    lowNum: 19000,
    highNum: 36000,
    aircraft: "Midsize • Super-Mid • Heavy options",
    duration: "2h 30m – 3h 45m",
    note: `Custom estimate for ${e || "your origin"} to ${n || "destination"} - Villiers network covers 9,000+ tails`,
  };
}
function yv() {
  let [e, n] = ve.useState(!1),
    [f, t] = ve.useState("collecting"),
    [r, l] = ve.useState({ from: "", to: "", pax: "3", date: "" }),
    [u, v] = ve.useState({ name: "", email: "", phone: "" }),
    [i, d] = ve.useState(null),
    [p, X] = ve.useState(0),
    [g] = ve.useState(9000),
    [C, h] = ve.useState(""),
    [Z, c] = ve.useState(""),
    P = ve.useRef(null),
    $tjqInitialScroll = ve.useRef(!0);
  ve.useEffect(() => {
    if ($tjqInitialScroll.current) {
      $tjqInitialScroll.current = !1;
      return;
    }
    P.current?.scrollIntoView({ behavior: "smooth" });
  }, [f, i]);
  let s = (z, A) => {
      (h(""),
        c(`${z} → ${A} selected • Villiers range ready in AI agent above`),
        l((L) => ({ ...L, from: z, to: A })),
        n(!0),
        t("collecting"),
        window.scrollTo({ top: 0, behavior: "smooth" }),
        setTimeout(() => {
          document
            .getElementById("inline-agent")
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 300));
    },
    H = () => {
      if (!r.from || !r.to) {
        h(
          "Enter origin and destination to see Villiers range — e.g., Austin to Aspen",
        );
        return;
      }
      (h(""),
        t("estimating"),
        setTimeout(() => {
          let z = Ua(r.from, r.to);
          (d(z), t("showing_estimate"));
        }, 1200));
    },
    x = () => {
      (h(""), t("collecting_lead"));
    },
    T = async () => {
      if (!u.name || !/\S+@\S+\.\S+/.test(u.email)) {
        h("Add your name and a valid email so we can save the request");
        return;
      }
      (h(""), t("awaiting_confirmation"));
      try {
        const z = new URLSearchParams({
            "form-name": "texas-private-jet-quote",
            name: u.name,
            email: u.email,
            phone: u.phone || "",
            origin: r.from,
            destination: r.to,
            passengers: r.pax,
            date: r.date || "",
            estimate_low: i?.low || "",
            estimate_high: i?.high || "",
            affiliate_url: Cn,
          }),
          A = await fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: z.toString(),
          });
        if (!A.ok) throw new Error("Lead submission failed");
        t("confirmed");
      } catch {
        (h(
          "We could not save your request. Continue to Villiers for current availability or email wellplayedtravel@gmail.com.",
        ),
          t("collecting_lead"));
      }
    },
    N = () => {
      (t("collecting"),
        d(null),
        h(""),
        c(""),
        l({ from: "", to: "", pax: "3", date: "" }),
        v({ name: "", email: "", phone: "" }));
    };
  return a("div", {
    className:
      "min-h-screen bg-[#FAF9F6] text-[#0F172A] selection:bg-[#C8A951]/30 overflow-x-hidden",
    children: [
      o("style", {
        children: `
        h1,h2,h3,.serif{font-family:'Cormorant Garamond', serif;}
        body{font-family:'Inter',sans-serif;}section[id]{content-visibility:auto;contain-intrinsic-size:auto 800px;}
        .gold-gradient{background: linear-gradient(135deg, #C8A951 0%, #E8D5A3 100%);}
        .charcoal-glass{background: rgba(15,23,42,0.88); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);}
        .jet-grid{background-image: radial-gradient(rgba(200,169,81,0.08) 1px, transparent 1px); background-size: 24px 24px;}
        .hero-vignette{background: linear-gradient(90deg, rgba(15,23,42,0.72) 0%, rgba(15,23,42,0.45) 55%, rgba(15,23,42,0.15) 100%);}
      `,
      }),
      o("nav", {
        className:
          "sticky top-0 z-40 bg-[#FAF9F6]/80 backdrop-blur-xl border-b border-[#0F172A]/[0.06]",
        children: a("div", {
          className:
            "mx-auto max-w-[1280px] px-6 lg:px-8 h-[72px] flex items-center justify-between",
          children: [
            a("div", {
              className: "flex items-center gap-3",
              children: [
                o("div", {
                  className:
                    "w-9 h-9 rounded-[10px] bg-[#0F172A] flex items-center justify-center",
                  children: o(xe, {
                    className: "w-5 h-5 text-[#C8A951] -rotate-12",
                  }),
                }),
                a("div", {
                  className: "leading-none",
                  children: [
                    o("div", {
                      className: "serif font-bold text-[19px] tracking-tight",
                      children: "TexasJetQuote",
                    }),
                    o("div", {
                      className:
                        "text-[10px] tracking-[0.2em] uppercase text-[#0F172A]/60 font-semibold -mt-[1px]",
                      children: ".COM • INDEPENDENT REFERRAL SITE",
                    }),
                  ],
                }),
              ],
            }),
            a("div", {
              className:
                "hidden md:flex items-center gap-8 text-[13px] font-medium text-[#0F172A]/70",
              children: [
                o("a", {
                  href: "#routes",
                  className: "hover:text-[#0F172A] transition",
                  children: "Popular Routes",
                }),
                o("a", {
                  href: "#empty-legs",
                  className: "hover:text-[#0F172A] transition",
                  children: "Empty Legs",
                }),
                o("a", {
                  href: "#how",
                  className: "hover:text-[#0F172A] transition",
                  children: "How It Works",
                }),
                o("a", {
                  href: "#faq",
                  className: "hover:text-[#0F172A] transition",
                  children: "FAQ",
                }),
              ],
            }),
            a("div", {
              className: "flex items-center gap-3",
              children: [
                a("div", {
                  className:
                    "hidden lg:flex items-center gap-2 text-[11px] font-semibold tracking-wide",
                  children: [
                    o("span", {
                      className:
                        "w-2 h-2 rounded-full bg-emerald-500 animate-pulse",
                    }),
                    a("span", {
                      className: "text-[#0F172A]/60",
                      children: [g.toLocaleString(), " AIRCRAFT LIVE"],
                    }),
                  ],
                }),
                a("a", {
                  href: Cn,
                  target: "_blank",
                  rel: "sponsored nofollow noopener",
                  className:
                    "h-10 px-5 rounded-full bg-[#0F172A] text-white text-[13px] font-semibold inline-flex items-center gap-2 hover:bg-black transition",
                  children: ["Get Quote ", o(Xe, { className: "w-4 h-4" })],
                }),
              ],
            }),
          ],
        }),
      }),
      a("section", {
        className: "relative overflow-hidden max-w-[100vw]",
        children: [
          a("div", {
            className: "absolute inset-0",
            children: [
              o("img", {
                src: wf,
                alt: "Gulfstream G650 Texas private jet charter sunset runway with TEXAS water tower - luxury private aviation",
                className: "w-full h-full object-cover object-[50%_38%]",
                loading: "eager",
                fetchPriority: "high",
                decoding: "async",
                width: 1920,
                height: 1280,
              }),
              o("div", { className: "absolute inset-0 bg-[#0F172A]/55" }),
              o("div", { className: "absolute inset-0 hero-vignette" }),
              o("div", {
                className:
                  "absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-transparent to-transparent opacity-60",
              }),
            ],
          }),
          a("div", {
            className:
              "mx-auto max-w-[1280px] px-6 lg:px-8 relative pt-14 lg:pt-24 pb-14 lg:pb-20 grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-start",
            children: [
              a("div", {
                className: "text-white",
                children: [
                  a("div", {
                    className:
                      "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur border border-white/20 shadow-sm text-[11px] font-semibold tracking-wide text-[#0F172A]",
                    children: [
                      o($e, { className: "w-3.5 h-3.5 text-[#C8A951]" }),
                      " TEXAS PRIVATE JET PLANNING • VILLIERS AFFILIATE",
                    ],
                  }),
                  a("h1", {
                    className:
                      "serif mt-6 text-[42px] lg:text-[64px] leading-[0.95] font-bold tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.4)]",
                    children: [
                      "Texas Private Jet Charter ",
                      o("span", { className: "text-[#E8D5A3]", children: "|" }),
                      " Planning Estimate in 30 Seconds",
                    ],
                  }),
                  o("p", {
                    className:
                      "mt-5 text-[18px] lg:text-[20px] leading-relaxed text-white/80 max-w-[560px]",
                    children:
                      "Plan routes from Austin, Houston, or Dallas, then use Villiers to check current aircraft, operator details, and final pricing.",
                  }),
                  a("div", {
                    className: "mt-8 flex flex-wrap gap-3",
                    children: [
                      a("div", {
                        className:
                          "flex items-center gap-2 text-[13px] font-medium px-4 h-10 rounded-full bg-white text-[#0F172A] shadow",
                        children: [
                          o(Se, { className: "w-4 h-4 text-[#0F172A]" }),
                          " Verify the FAA Operator",
                        ],
                      }),
                      a("div", {
                        className:
                          "flex items-center gap-2 text-[13px] font-medium px-4 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white",
                        children: [
                          o(qn, { className: "w-4 h-4 text-[#E8D5A3]" }),
                          " Review Independent Safety Ratings",
                        ],
                      }),
                    ],
                  }),
                  a("div", {
                    className:
                      "mt-10 grid grid-cols-3 gap-4 border-t border-white/15 pt-8 max-w-[560px]",
                    children: [
                      a("div", {
                        children: [
                          o("div", {
                            className:
                              "serif text-[22px] font-semibold leading-none text-white",
                            children: "9,000+",
                          }),
                          o("div", {
                            className:
                              "text-[11px] uppercase tracking-wide font-semibold text-white/60 mt-1",
                            children: "Aircraft Network",
                          }),
                        ],
                      }),
                      a("div", {
                        children: [
                          o("div", {
                            className:
                              "serif text-[22px] font-semibold leading-none text-white",
                            children: "30 sec",
                          }),
                          o("div", {
                            className:
                              "text-[11px] uppercase tracking-wide font-semibold text-white/60 mt-1",
                            children: "Planning Range",
                          }),
                        ],
                      }),
                      a("div", {
                        children: [
                          o("div", {
                            className:
                              "serif text-[22px] font-semibold leading-none text-white",
                            children: "24/7",
                          }),
                          o("div", {
                            className:
                              "text-[11px] uppercase tracking-wide font-semibold text-white/60 mt-1",
                            children: "Villiers Access",
                          }),
                        ],
                      }),
                    ],
                  }),
                  a("div", {
                    className:
                      "mt-8 flex items-center gap-3 text-[12px] text-white/70",
                    children: [
                      a("div", {
                        className: "flex -space-x-2",
                        children: [
                          o("div", {
                            className:
                              "w-7 h-7 rounded-full bg-[#0F172A] border-2 border-white/30 flex items-center justify-center text-[10px] text-white font-bold",
                            children: "TX",
                          }),
                          o("div", {
                            className:
                              "w-7 h-7 rounded-full bg-[#C8A951] border-2 border-white/30 flex items-center justify-center text-[10px] text-[#0F172A] font-bold",
                            children: "VJ",
                          }),
                          o("div", {
                            className:
                              "w-7 h-7 rounded-full bg-white border-2 border-white/30 flex items-center justify-center",
                            children: o(Se, {
                              className: "w-3.5 h-3.5 text-[#0F172A]",
                            }),
                          }),
                        ],
                      }),
                      o("span", {
                        children:
                          "Trusted by Texas CEOs, funds, and energy execs. Independent affiliate of Villiers Jets.",
                      }),
                    ],
                  }),
                ],
              }),
              a("div", {
                id: "inline-agent",
                className: "relative max-w-full",
                children: [
                  o("div", {
                    className:
                      "absolute -inset-4 bg-gradient-to-br from-[#C8A951]/25 to-transparent rounded-[28px] blur-[18px] pointer-events-none",
                  }),
                  a("div", {
                    className:
                      "relative rounded-[24px] bg-[#0F172A] text-white overflow-hidden shadow-[0_30px_80px_rgba(15,23,42,0.35)] border border-white/10",
                    children: [
                      a("div", {
                        className:
                          "px-6 pt-6 pb-4 flex items-center justify-between",
                        children: [
                          a("div", {
                            className: "flex items-center gap-3",
                            children: [
                              o("div", {
                                className:
                                  "w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-[#0F172A]",
                                children: o(qe, { className: "w-5 h-5" }),
                              }),
                              a("div", {
                                children: [
                                  o("div", {
                                    className:
                                      "text-[13px] font-semibold tracking-wide",
                                    children: "AI QUOTE AGENT",
                                  }),
                                  a("div", {
                                    className:
                                      "text-[11px] text-white/60 flex items-center gap-1.5",
                                    children: [
                                      o("span", {
                                        className:
                                          "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse",
                                      }),
                                      " Editorial Estimate • Check Villiers",
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          o("div", {
                            className:
                              "text-[10px] px-2.5 py-1 rounded-full bg-white/10 border border-white/10",
                            children: "30 SEC",
                          }),
                        ],
                      }),
                      o("div", {
                        className: "px-6 pb-4",
                        children: o("div", {
                          className: "flex gap-1.5",
                          children: [
                            { label: "Route", done: !!r.from && !!r.to },
                            {
                              label: "Estimate",
                              done:
                                f === "showing_estimate" ||
                                f === "collecting_lead" ||
                                f === "confirmed",
                            },
                            { label: "Confirm", done: f === "confirmed" },
                          ].map((z, A) =>
                            a(
                              "div",
                              {
                                className: "flex-1",
                                children: [
                                  o("div", {
                                    className: `h-1 rounded-full transition-all ${z.done ? "bg-[#C8A951]" : A === 0 || (A === 1 && i) ? "bg-white/30" : "bg-white/10"}`,
                                  }),
                                  o("div", {
                                    className: `mt-1.5 text-[10px] uppercase tracking-wide font-semibold ${z.done ? "text-[#C8A951]" : "text-white/40"}`,
                                    children: z.label,
                                  }),
                                ],
                              },
                              A,
                            ),
                          ),
                        }),
                      }),
                      a("div", {
                        className:
                          "px-6 pb-6 space-y-4 max-h-[560px] overflow-y-auto",
                        children: [
                          a("div", {
                            className: "flex gap-3",
                            children: [
                              o("div", {
                                className:
                                  "w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0",
                                children: o(xe, { className: "w-3.5 h-3.5" }),
                              }),
                              o("div", {
                                className:
                                  "bg-white/[0.07] border border-white/[0.08] rounded-[14px] rounded-tl-[4px] px-4 py-3 text-[13.5px] leading-relaxed max-w-[92%]",
                                children:
                                  "Texas private aviation, simplified. Tell me your route and passengers — I will show you a transparent Villiers range before collecting contact info.",
                              }),
                            ],
                          }),
                          f === "collecting" &&
                            a("div", {
                              className: "space-y-3 pt-2",
                              children: [
                                a("div", {
                                  className: "grid grid-cols-2 gap-3",
                                  children: [
                                    a("div", {
                                      className: "space-y-1.5",
                                      children: [
                                        o("label", {
                                          className:
                                            "text-[11px] uppercase tracking-wide font-semibold text-white/60",
                                          children: "From",
                                        }),
                                        a("div", {
                                          className: "relative",
                                          children: [
                                            o(Rn, {
                                              className:
                                                "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40",
                                            }),
                                            o("input", {
                                              value: r.from,
                                              onChange: (z) =>
                                                l({
                                                  ...r,
                                                  from: z.target.value,
                                                }),
                                              placeholder: "Austin, AUS",
                                              className:
                                                "w-full h-11 pl-9 pr-3 rounded-xl bg-white/[0.06] border border-white/10 text-[14px] placeholder:text-white/30 focus:outline-none focus:border-[#C8A951]/50",
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    a("div", {
                                      className: "space-y-1.5",
                                      children: [
                                        o("label", {
                                          className:
                                            "text-[11px] uppercase tracking-wide font-semibold text-white/60",
                                          children: "To",
                                        }),
                                        a("div", {
                                          className: "relative",
                                          children: [
                                            o(Rn, {
                                              className:
                                                "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40",
                                            }),
                                            o("input", {
                                              value: r.to,
                                              onChange: (z) =>
                                                l({ ...r, to: z.target.value }),
                                              placeholder: "Aspen, ASE",
                                              className:
                                                "w-full h-11 pl-9 pr-3 rounded-xl bg-white/[0.06] border border-white/10 text-[14px] placeholder:text-white/30 focus:outline-none focus:border-[#C8A951]/50",
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                a("div", {
                                  className: "grid grid-cols-2 gap-3",
                                  children: [
                                    a("div", {
                                      className: "space-y-1.5",
                                      children: [
                                        o("label", {
                                          className:
                                            "text-[11px] uppercase tracking-wide font-semibold text-white/60",
                                          children: "Passengers",
                                        }),
                                        a("div", {
                                          className: "relative",
                                          children: [
                                            o(xt, {
                                              className:
                                                "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40",
                                            }),
                                            o("select", {
                                              value: r.pax,
                                              onChange: (z) =>
                                                l({
                                                  ...r,
                                                  pax: z.target.value,
                                                }),
                                              className:
                                                "w-full h-11 pl-9 pr-3 rounded-xl bg-white/[0.06] border border-white/10 text-[14px] focus:outline-none focus:border-[#C8A951]/50",
                                              children: [
                                                1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                                                12, 14,
                                              ].map((z) =>
                                                a(
                                                  "option",
                                                  {
                                                    value: String(z),
                                                    className: "text-black",
                                                    children: [z, " pax"],
                                                  },
                                                  z,
                                                ),
                                              ),
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    a("div", {
                                      className: "space-y-1.5",
                                      children: [
                                        o("label", {
                                          className:
                                            "text-[11px] uppercase tracking-wide font-semibold text-white/60",
                                          children: "Date",
                                        }),
                                        a("div", {
                                          className: "relative",
                                          children: [
                                            o(ht, {
                                              className:
                                                "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40",
                                            }),
                                            o("input", {
                                              type: "date",
                                              value: r.date,
                                              onChange: (z) =>
                                                l({
                                                  ...r,
                                                  date: z.target.value,
                                                }),
                                              className:
                                                "w-full h-11 pl-9 pr-3 rounded-xl bg-white/[0.06] border border-white/10 text-[14px] text-white/90 focus:outline-none focus:border-[#C8A951]/50",
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                a("button", {
                                  onClick: H,
                                  className:
                                    "w-full h-[48px] rounded-xl gold-gradient text-[#0F172A] font-semibold text-[14px] inline-flex items-center justify-center gap-2 hover:brightness-[1.05] transition",
                                  children: [
                                    o(Yn, { className: "w-4 h-4" }),
                                    " Get Transparent Range",
                                  ],
                                }),
                                C &&
                                  o("div", {
                                    className:
                                      "rounded-xl bg-amber-500/15 border border-amber-500/20 px-3 py-2 text-[12px] text-amber-200",
                                    children: C,
                                  }),
                                o("div", {
                                  className:
                                    "text-[11px] text-white/40 text-center",
                                  children:
                                    "No email required to see pricing • FAA Part 135 only • Try Austin → Aspen",
                                }),
                              ],
                            }),
                          f === "estimating" &&
                            a("div", {
                              className:
                                "py-10 flex flex-col items-center gap-4",
                              children: [
                                o("div", {
                                  className:
                                    "w-14 h-14 rounded-full border border-[#C8A951]/30 border-t-[#C8A951] animate-spin",
                                }),
                                a("div", {
                                  className: "text-[13px] text-white/70",
                                  children: [
                                    "Calculating an editorial planning range for ",
                                    r.from,
                                    " → ",
                                    r.to,
                                    " • verify current pricing with Villiers",
                                  ],
                                }),
                              ],
                            }),
                          (f === "showing_estimate" ||
                            f === "collecting_lead" ||
                            f === "awaiting_confirmation" ||
                            f === "confirmed") &&
                            i &&
                            a("div", {
                              className: "space-y-4",
                              children: [
                                a("div", {
                                  className:
                                    "rounded-[16px] bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-[#C8A951]/20 p-4",
                                  children: [
                                    a("div", {
                                      className:
                                        "flex items-start justify-between",
                                      children: [
                                        a("div", {
                                          children: [
                                            o("div", {
                                              className:
                                                "text-[11px] tracking-wide uppercase font-semibold text-[#C8A951]",
                                              children:
                                                "Editorial Planning Range",
                                            }),
                                            a("div", {
                                              className:
                                                "serif text-[28px] font-bold mt-1",
                                              children: [i.low, " – ", i.high],
                                            }),
                                            a("div", {
                                              className:
                                                "text-[12px] text-white/60 mt-1",
                                              children: [
                                                i.duration,
                                                " • ",
                                                r.pax,
                                                " passengers • ",
                                                r.from,
                                                " → ",
                                                r.to,
                                              ],
                                            }),
                                          ],
                                        }),
                                        o("div", {
                                          className:
                                            "w-9 h-9 rounded-full bg-[#C8A951]/15 border border-[#C8A951]/30 flex items-center justify-center",
                                          children: o(Fn, {
                                            className: "w-4 h-4 text-[#C8A951]",
                                          }),
                                        }),
                                      ],
                                    }),
                                    a("div", {
                                      className:
                                        "mt-3 pt-3 border-t border-white/10 text-[12px] leading-relaxed text-white/70",
                                      children: [
                                        o("div", {
                                          className:
                                            "font-medium text-white/90",
                                          children: i.aircraft,
                                        }),
                                        a("div", {
                                          className: "mt-1",
                                          children: [
                                            i.note,
                                            ". This is a planning estimate, not an operator quote. Final pricing and inclusions come from Villiers.",
                                          ],
                                        }),
                                      ],
                                    }),
                                    a("div", {
                                      className: "mt-3 flex gap-2",
                                      children: [
                                        o("div", {
                                          className:
                                            "text-[10px] px-2 py-1 rounded-full bg-white/10",
                                          children: "Planning estimate",
                                        }),
                                        o("div", {
                                          className:
                                            "text-[10px] px-2 py-1 rounded-full bg-white/10",
                                          children: "Verify operator",
                                        }),
                                        o("div", {
                                          className:
                                            "text-[10px] px-2 py-1 rounded-full bg-[#C8A951]/20 text-[#E8D5A3] border border-[#C8A951]/30",
                                          children: "Subject to availability",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                f === "showing_estimate" &&
                                  a("div", {
                                    className: "space-y-3",
                                    children: [
                                      a("div", {
                                        className: "flex gap-3",
                                        children: [
                                          o("div", {
                                            className:
                                              "w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0",
                                            children: o(xe, {
                                              className: "w-3.5 h-3.5",
                                            }),
                                          }),
                                          o("div", {
                                            className:
                                              "bg-white/[0.07] border border-white/[0.08] rounded-[14px] rounded-tl-[4px] px-4 py-3 text-[13px] leading-relaxed",
                                            children:
                                              "Your planning range is ready. Save your itinerary, then continue through our Villiers affiliate link to check current aircraft options and operator pricing.",
                                          }),
                                        ],
                                      }),
                                      a("button", {
                                        onClick: x,
                                        className:
                                          "w-full h-[48px] rounded-xl bg-white text-[#0F172A] font-semibold text-[14px] inline-flex items-center justify-center gap-2 hover:bg-[#FAF9F6] transition",
                                        children: [
                                          "Save Trip & Request Current Options ",
                                          o(Xe, { className: "w-4 h-4" }),
                                        ],
                                      }),
                                    ],
                                  }),
                                f === "collecting_lead" &&
                                  a("div", {
                                    className: "space-y-3",
                                    children: [
                                      a("div", {
                                        className: "grid gap-3",
                                        children: [
                                          o("input", {
                                            value: u.name,
                                            name: "name",
                                            autoComplete: "name",
                                            onChange: (z) =>
                                              v({ ...u, name: z.target.value }),
                                            placeholder: "Full name",
                                            className:
                                              "w-full h-11 px-4 rounded-xl bg-white/[0.06] border border-white/10 text-[14px] placeholder:text-white/30 focus:outline-none focus:border-[#C8A951]/50",
                                          }),
                                          o("input", {
                                            value: u.email,
                                            name: "email",
                                            type: "email",
                                            autoComplete: "email",
                                            onChange: (z) =>
                                              v({
                                                ...u,
                                                email: z.target.value,
                                              }),
                                            placeholder: "Email",
                                            className:
                                              "w-full h-11 px-4 rounded-xl bg-white/[0.06] border border-white/10 text-[14px] placeholder:text-white/30 focus:outline-none focus:border-[#C8A951]/50",
                                          }),
                                          o("input", {
                                            value: u.phone,
                                            name: "phone",
                                            type: "tel",
                                            autoComplete: "tel",
                                            onChange: (z) =>
                                              v({
                                                ...u,
                                                phone: z.target.value,
                                              }),
                                            placeholder:
                                              "Mobile (optional, for urgent)",
                                            className:
                                              "w-full h-11 px-4 rounded-xl bg-white/[0.06] border border-white/10 text-[14px] placeholder:text-white/30 focus:outline-none focus:border-[#C8A951]/50",
                                          }),
                                        ],
                                      }),
                                      a("button", {
                                        onClick: T,
                                        className:
                                          "w-full h-[48px] rounded-xl gold-gradient text-[#0F172A] font-semibold text-[14px] inline-flex items-center justify-center gap-2",
                                        children: [
                                          o(wt, { className: "w-4 h-4" }),
                                          " Save Request",
                                        ],
                                      }),
                                      o("div", {
                                        className:
                                          "text-[11px] text-white/40 text-center",
                                        children:
                                          "TexasJetQuote saves the request. Continue to Villiers using affiliate id=1673 for current options.",
                                      }),
                                    ],
                                  }),
                                f === "awaiting_confirmation" &&
                                  a("div", {
                                    className:
                                      "py-6 flex flex-col items-center gap-3",
                                    children: [
                                      o("div", {
                                        className:
                                          "w-10 h-10 rounded-full border border-white/20 border-t-white animate-spin",
                                      }),
                                      o("div", {
                                        className: "text-[13px] text-white/70",
                                        children: "Saving your quote request…",
                                      }),
                                    ],
                                  }),
                                f === "confirmed" &&
                                  a("div", {
                                    className: "space-y-4",
                                    children: [
                                      a("div", {
                                        className:
                                          "rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-[13px] leading-relaxed",
                                        children: [
                                          a("div", {
                                            className:
                                              "font-semibold text-emerald-300 flex items-center gap-2",
                                            children: [
                                              o(Fn, { className: "w-4 h-4" }),
                                              " Quote request saved.",
                                            ],
                                          }),
                                          o("div", {
                                            className:
                                              "mt-2 text-emerald-100/80",
                                            children:
                                              "We recorded your itinerary. For current aircraft availability and operator pricing, continue to Villiers. Your affiliate tracking is active (id=1673).",
                                          }),
                                        ],
                                      }),
                                      a("a", {
                                        href: Cn,
                                        target: "_blank",
                                        rel: "sponsored nofollow noopener",
                                        className:
                                          "w-full h-[48px] rounded-xl gold-gradient text-[#0F172A] font-semibold text-[14px] inline-flex items-center justify-center gap-2",
                                        children: [
                                          "Continue to Villiers Booking ",
                                          o(Xe, { className: "w-4 h-4" }),
                                        ],
                                      }),
                                      o("button", {
                                        onClick: N,
                                        className:
                                          "w-full h-11 rounded-xl bg-white/10 border border-white/10 text-[13px] font-medium hover:bg-white/15 transition",
                                        children: "New Quote",
                                      }),
                                    ],
                                  }),
                              ],
                            }),
                          o("div", { ref: P }),
                        ],
                      }),
                      a("div", {
                        className:
                          "px-6 py-3 border-t border-white/10 bg-black/20 flex items-center justify-between text-[11px] text-white/40",
                        children: [
                          o("span", {
                            children:
                              "Independent referral site • Villiers affiliate id=1673",
                          }),
                          a("span", {
                            className: "flex items-center gap-1",
                            children: [
                              o(Se, { className: "w-3 h-3" }),
                              " Secure & Private",
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          o("div", {
            className: "border-y border-[#0F172A]/[0.07] bg-white",
            children: a("div", {
              className:
                "mx-auto max-w-[1280px] px-6 lg:px-8 min-h-[56px] py-3 flex flex-wrap items-center gap-3 lg:justify-between text-[12px] font-semibold tracking-wide uppercase text-[#0F172A]/60",
              children: [
                a("span", {
                  className: "flex items-center gap-2 shrink-0",
                  children: [
                    o(Se, { className: "w-4 h-4 text-[#0F172A]" }),
                    " FAA Certified Operators",
                  ],
                }),
                a("span", {
                  className: "flex items-center gap-2 shrink-0",
                  children: [
                    o(xe, { className: "w-4 h-4 text-[#0F172A]" }),
                    " Villiers Marketplace",
                  ],
                }),
                a("span", {
                  className: "flex items-center gap-2 shrink-0",
                  children: [
                    o(Cf, { className: "w-4 h-4 text-[#0F172A]" }),
                    " 24/7 Human Broker Backup",
                  ],
                }),
                a("span", {
                  className: "flex items-center gap-2 shrink-0",
                  children: [
                    o(qn, { className: "w-4 h-4 text-[#0F172A]" }),
                    " Review Operator Safety",
                  ],
                }),
                o("span", {
                  className: "shrink-0",
                  children: "Review Final Terms",
                }),
              ],
            }),
          }),
        ],
      }),
      a("section", {
        id: "routes",
        className:
          "py-16 lg:py-24 bg-[#FAF9F6] jet-grid relative overflow-hidden",
        children: [
          a("div", {
            className: "absolute top-0 inset-x-0 h-[420px] pointer-events-none",
            children: [
              o("img", {
                src: wf,
                alt: "",
                className:
                  "w-full h-full object-cover object-[50%_35%] opacity-[0.06]",
                loading: "lazy",
                decoding: "async",
                width: 1920,
                height: 1280,
              }),
              o("div", {
                className:
                  "absolute inset-0 bg-gradient-to-b from-[#FAF9F6]/0 to-[#FAF9F6]",
              }),
            ],
          }),
          a("div", {
            className: "mx-auto max-w-[1280px] px-6 lg:px-8 relative",
            children: [
              a("div", {
                className: "flex flex-wrap items-end justify-between gap-6",
                children: [
                  a("div", {
                    children: [
                      o("div", {
                        className:
                          "inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-[#C8A951]",
                        children: "Most Requested Texas Routes",
                      }),
                      o("h2", {
                        className:
                          "serif mt-3 text-[38px] lg:text-[52px] leading-[0.95] font-semibold tracking-tight max-w-[640px]",
                        children:
                          "Austin, Dallas, Houston to anywhere your board meets.",
                      }),
                      o("p", {
                        className:
                          "mt-4 text-[16px] leading-relaxed text-[#0F172A]/65 max-w-[560px]",
                        children:
                          "Every card shows an editorial planning range. Click a route to pre-fill the planner, then use Villiers for current operator pricing and availability.",
                      }),
                    ],
                  }),
                  a("div", {
                    className:
                      "text-[12px] font-medium text-[#0F172A]/60 bg-white border border-[#0F172A]/10 rounded-full px-4 h-9 inline-flex items-center gap-2",
                    children: [
                      o("span", {
                        className:
                          "w-2 h-2 rounded-full bg-emerald-500 animate-pulse",
                      }),
                      " Planning ranges • verify current pricing with Villiers",
                    ],
                  }),
                ],
              }),
              Z &&
                a("div", {
                  className:
                    "mt-6 rounded-full bg-[#0F172A] text-white text-[13px] font-medium px-5 py-2.5 inline-flex items-center gap-2 shadow",
                  children: [
                    o("span", {
                      className:
                        "w-2 h-2 rounded-full bg-[#C8A951] animate-pulse",
                    }),
                    " ",
                    Z,
                  ],
                }),
              o("div", {
                className: "mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5",
                children: d7.map((z, A) =>
                  a(
                    "div",
                    {
                      className:
                        "group relative rounded-[20px] bg-white border border-[#0F172A]/[0.07] overflow-hidden shadow-[0_8px_30px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)] transition-all hover:-translate-y-[2px]",
                      children: [
                        a("div", {
                          className:
                            "h-[148px] relative overflow-hidden bg-[#0F172A]",
                          children: [
                            o("img", {
                              src: wf,
                              alt:
                                a7[A]?.alt ||
                                `Private jet ${z.from} to ${z.to} - Gulfstream charter`,
                              loading: "lazy",
                              decoding: "async",
                              width: 1920,
                              height: 1280,
                              className:
                                "absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]",
                              style: {
                                objectPosition: a7[A]?.pos || "50% 50%",
                              },
                            }),
                            o("div", {
                              className:
                                "absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-[#0F172A]/20 to-transparent",
                            }),
                            a("div", {
                              className:
                                "absolute top-4 left-4 flex items-center gap-2",
                              children: [
                                a("div", {
                                  className:
                                    "px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-[10px] font-bold tracking-wide text-[#0F172A]",
                                  children: [z.fromCode, " → ", z.toCode],
                                }),
                                z.popular &&
                                  o("div", {
                                    className:
                                      "px-2.5 py-1 rounded-full gold-gradient text-[10px] font-bold tracking-wide text-[#0F172A]",
                                    children: "MOST REQUESTED",
                                  }),
                              ],
                            }),
                            a("div", {
                              className:
                                "absolute bottom-4 left-4 right-4 flex items-end justify-between",
                              children: [
                                o("div", {
                                  className:
                                    "w-10 h-10 rounded-full bg-white/15 backdrop-blur border border-white/20 flex items-center justify-center",
                                  children: o(xe, {
                                    className:
                                      "w-5 h-5 text-white/90 -rotate-12",
                                  }),
                                }),
                                a("div", {
                                  className:
                                    "text-white serif text-[12px] tracking-wide bg-black/30 backdrop-blur px-2.5 py-1 rounded-full border border-white/10",
                                  children: [z.duration, " flight"],
                                }),
                              ],
                            }),
                          ],
                        }),
                        a("div", {
                          className: "p-5",
                          children: [
                            a("div", {
                              className: "flex items-center justify-between",
                              children: [
                                a("div", {
                                  className:
                                    "serif text-[19px] font-semibold leading-none",
                                  children: [z.from, " → ", z.to],
                                }),
                                o("div", {
                                  className:
                                    "text-[11px] font-semibold px-2 py-1 rounded-full bg-[#0F172A]/5 text-[#0F172A]/70",
                                  children: z.price,
                                }),
                              ],
                            }),
                            o("div", {
                              className:
                                "mt-3 text-[12px] text-[#0F172A]/60 leading-relaxed",
                              children:
                                "Light to super-mid options • No repositioning hidden • Catering credit included",
                            }),
                            a("div", {
                              className: "mt-4 flex gap-2",
                              children: [
                                a("button", {
                                  onClick: () => s(z.from, z.to),
                                  className:
                                    "flex-1 h-10 rounded-full bg-[#0F172A] text-white text-[13px] font-semibold inline-flex items-center justify-center gap-1.5 group-hover:bg-black transition",
                                  children: [
                                    "Get Quote ",
                                    o(Xe, { className: "w-4 h-4" }),
                                  ],
                                }),
                                o("a", {
                                  href: Cn,
                                  target: "_blank",
                                  rel: "sponsored nofollow noopener",
                                  className:
                                    "h-10 w-10 rounded-full bg-white border border-[#0F172A]/10 flex items-center justify-center hover:border-[#0F172A]/20 transition",
                                  children: o($e, { className: "w-4 h-4" }),
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    },
                    `${z.from}-${z.to}`,
                  ),
                ),
              }),
            ],
          }),
        ],
      }),
      o("section", {
        id: "how",
        className: "py-16 lg:py-24 bg-white border-y border-[#0F172A]/[0.06]",
        children: a("div", {
          className: "mx-auto max-w-[1280px] px-6 lg:px-8",
          children: [
            a("div", {
              className: "max-w-[720px] mx-auto text-center",
              children: [
                o("div", {
                  className:
                    "inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-[#0F172A]/50",
                  children: "Villiers Required Flow",
                }),
                o("h2", {
                  className:
                    "serif mt-4 text-[36px] lg:text-[48px] leading-[0.95] font-semibold",
                  children: "How TexasJetQuote helps you plan",
                }),
                o("p", {
                  className: "mt-4 text-[16px] text-[#0F172A]/60",
                  children:
                    "Start with the route, review an editorial planning range, save the request, then continue to Villiers for current aircraft and operator pricing.",
                }),
              ],
            }),
            o("div", {
              className:
                "mt-12 grid lg:grid-cols-3 gap-6 max-w-[1080px] mx-auto",
              children: [
                {
                  n: "01",
                  title: "Enter Route + Passengers + Date",
                  desc: "The planner collects origin, destination, passenger count, and date. No email is needed to see the editorial range.",
                  icon: Rn,
                },
                {
                  n: "02",
                  title: "Review an Editorial Planning Range",
                  desc: "The estimate is a budget-planning aid based on route categories. It is not a live aircraft quote, hold, or promise of availability.",
                  icon: Yn,
                },
                {
                  n: "03",
                  title: "Save the Trip and Continue to Villiers",
                  desc: "You can save the itinerary for follow-up, then use affiliate id=1673 to request current aircraft options and final terms from Villiers.",
                  icon: $e,
                },
              ].map((z) =>
                a(
                  "div",
                  {
                    className:
                      "relative rounded-[20px] bg-[#FAF9F6] border border-[#0F172A]/[0.06] p-7",
                    children: [
                      a("div", {
                        className: "flex items-start justify-between",
                        children: [
                          o("div", {
                            className:
                              "w-10 h-10 rounded-full bg-[#0F172A] text-white flex items-center justify-center",
                            children: o(z.icon, {
                              className: "w-5 h-5 text-[#C8A951]",
                            }),
                          }),
                          o("div", {
                            className:
                              "serif text-[14px] font-bold tracking-wide text-[#0F172A]/20",
                            children: z.n,
                          }),
                        ],
                      }),
                      o("div", {
                        className:
                          "serif mt-5 text-[20px] font-semibold leading-tight",
                        children: z.title,
                      }),
                      o("div", {
                        className:
                          "mt-3 text-[13.5px] leading-relaxed text-[#0F172A]/65",
                        children: z.desc,
                      }),
                      a("div", {
                        className:
                          "mt-5 inline-flex items-center gap-2 text-[11px] font-semibold tracking-wide uppercase text-[#0F172A]/40",
                        children: [
                          o("div", {
                            className: "w-5 h-[1px] bg-[#0F172A]/20",
                          }),
                          " Villiers Protocol",
                        ],
                      }),
                    ],
                  },
                  z.n,
                ),
              ),
            }),
            o("div", {
              className: "mt-10 flex justify-center",
              children: a("button", {
                onClick: () => {
                  (n(!0), window.scrollTo({ top: 0, behavior: "smooth" }));
                },
                className:
                  "h-[52px] px-8 rounded-full bg-[#0F172A] text-white text-[14px] font-semibold inline-flex items-center gap-2 hover:bg-black transition",
                children: [
                  o(qe, { className: "w-4 h-4 text-[#C8A951]" }),
                  " Launch AI Quote Agent ",
                  o(Xe, { className: "w-4 h-4" }),
                ],
              }),
            }),
          ],
        }),
      }),
      a("section", {
        id: "empty-legs",
        className:
          "py-16 lg:py-24 bg-[#0F172A] text-white relative overflow-hidden",
        children: [
          a("div", {
            className: "absolute inset-0",
            children: [
              o("img", {
                src: wf,
                alt: "",
                className:
                  "w-full h-full object-cover object-[50%_30%] opacity-[0.08]",
                loading: "lazy",
                decoding: "async",
                width: 1920,
                height: 1280,
              }),
              o("div", {
                className:
                  "absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(200,169,81,0.15),transparent_60%)]",
              }),
              o("div", { className: "absolute inset-0 jet-grid opacity-20" }),
            ],
          }),
          a("div", {
            className: "relative mx-auto max-w-[1280px] px-6 lg:px-8",
            children: [
              a("div", {
                className: "flex flex-wrap items-end justify-between gap-6",
                children: [
                  a("div", {
                    children: [
                      o("div", {
                        className:
                          "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[11px] font-bold tracking-[0.16em] uppercase text-[#E8D5A3]",
                        children:
                          "Featured Empty Leg Examples • Confirm Live Availability",
                      }),
                      o("h2", {
                        className:
                          "serif mt-4 text-[36px] lg:text-[50px] leading-[0.95] font-semibold",
                        children: "Texas Empty Leg Flight Examples",
                      }),
                      o("p", {
                        className:
                          "mt-4 text-[15px] leading-relaxed text-white/60 max-w-[560px]",
                        children:
                          "Examples of repositioning flights from FAA Part 135 carriers. Availability and pricing change quickly, so request operator confirmation before making travel plans.",
                      }),
                    ],
                  }),
                  o("div", {
                    className: "text-[12px] text-white/50",
                    children:
                      "Aircraft and pricing details are confirmed directly with Villiers operators",
                  }),
                ],
              }),
              o("div", {
                className: "mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5",
                children: Ma.map((z) =>
                  a(
                    "div",
                    {
                      className:
                        "group rounded-[20px] bg-white/[0.06] border border-white/10 backdrop-blur-xl overflow-hidden hover:bg-white/[0.08] transition flex",
                      children: [
                        a("div", {
                          className:
                            "w-[80px] shrink-0 relative bg-[#0F172A] overflow-hidden",
                          children: [
                            o("img", {
                              src: wf,
                              alt: `${z.aircraftType} private jet empty leg ${z.originAirport} to ${z.destinationAirport} - luxury charter`,
                              loading: "lazy",
                              decoding: "async",
                              width: 1920,
                              height: 1280,
                              className:
                                "absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700",
                              style: {
                                objectPosition: z.thumbPos || "50% 50%",
                              },
                            }),
                            o("div", {
                              className:
                                "absolute inset-0 bg-gradient-to-r from-transparent to-[#0F172A]/20",
                            }),
                            o("div", {
                              className:
                                "absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded-full bg-black/60 backdrop-blur text-[9px] font-bold text-white border border-white/10",
                              children: z.originAirport,
                            }),
                          ],
                        }),
                        a("div", {
                          className: "p-5 flex-1 min-w-0",
                          children: [
                            a("div", {
                              className:
                                "flex items-start justify-between gap-3",
                              children: [
                                a("div", {
                                  children: [
                                    a("div", {
                                      className:
                                        "text-[11px] tracking-wide uppercase font-semibold text-[#C8A951]",
                                      children: [
                                        z.aircraftType,
                                        " • ",
                                        z.seatsAvailable,
                                        " Seats",
                                      ],
                                    }),
                                    a("div", {
                                      className:
                                        "serif mt-1 text-[20px] font-semibold leading-none",
                                      children: [
                                        z.originAirport,
                                        " → ",
                                        z.destinationAirport,
                                      ],
                                    }),
                                    a("div", {
                                      className:
                                        "mt-1.5 text-[11px] text-white/60 truncate",
                                      children: [
                                        z.departureDate,
                                        " • ",
                                        z.operator,
                                      ],
                                    }),
                                  ],
                                }),
                                o("div", {
                                  className:
                                    "px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-[11px] font-bold text-emerald-300 shrink-0",
                                  children: z.discount,
                                }),
                              ],
                            }),
                            a("div", {
                              className: "mt-4 flex items-end justify-between",
                              children: [
                                a("div", {
                                  children: [
                                    o("div", {
                                      className:
                                        "text-[11px] uppercase tracking-wide font-semibold text-white/40",
                                      children: "All-In Investment",
                                    }),
                                    o("div", {
                                      className: "serif text-[24px] font-bold",
                                      children: z.price,
                                    }),
                                    a("div", {
                                      className: "text-[11px] text-white/50",
                                      children: [
                                        "Was ~$",
                                        (
                                          parseInt(
                                            z.price.replace(/[^0-9]/g, ""),
                                          ) * 2.4
                                        ).toLocaleString(),
                                        " retail",
                                      ],
                                    }),
                                  ],
                                }),
                                a("div", {
                                  className: "flex gap-2",
                                  children: [
                                    o("button", {
                                      onClick: () =>
                                        s(
                                          z.originAirport,
                                          z.destinationAirport,
                                        ),
                                      className:
                                        "h-9 px-3 rounded-full bg-white text-[#0F172A] text-[12px] font-semibold hover:bg-[#FAF9F6] transition",
                                      children: "Hold via AI",
                                    }),
                                    o("a", {
                                      href: Cn,
                                      target: "_blank",
                                      rel: "sponsored nofollow noopener",
                                      className:
                                        "h-9 px-3 rounded-full gold-gradient text-[#0F172A] text-[12px] font-semibold inline-flex items-center justify-center",
                                      children: "Book",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    },
                    `${z.originAirport}-${z.destinationAirport}-${z.departureDate}`,
                  ),
                ),
              }),
              a("div", {
                className:
                  "mt-10 rounded-[16px] bg-white/[0.05] border border-white/10 p-4 flex flex-wrap items-center justify-between gap-4 text-[12px] text-white/60",
                children: [
                  a("span", {
                    className: "flex items-center gap-2",
                    children: [
                      o(Se, { className: "w-4 h-4 text-white/80" }),
                      " Illustrative empty-leg examples only. Confirm the operator, aircraft, price, safety details, and availability with Villiers.",
                    ],
                  }),
                  a("a", {
                    href: Cn,
                    target: "_blank",
                    rel: "sponsored nofollow noopener",
                    className:
                      "text-[#E8D5A3] hover:text-white font-semibold inline-flex items-center gap-1",
                    children: [
                      "View all live deals on Villiers ",
                      o(Xe, { className: "w-3.5 h-3.5" }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      o("section", {
        className: "py-16 lg:py-24 bg-[#FAF9F6]",
        children: o("div", {
          className: "mx-auto max-w-[1280px] px-6 lg:px-8",
          children: a("div", {
            className: "grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start",
            children: [
              a("div", {
                children: [
                  o("div", {
                    className:
                      "serif text-[38px] lg:text-[46px] leading-[0.95] font-semibold",
                    children: "Why TexasJetQuote converts where others stall.",
                  }),
                  o("p", {
                    className:
                      "mt-5 text-[16px] leading-relaxed text-[#0F172A]/65",
                    children:
                      "We are not a marketplace scraping brokers. We are a Texas-focused affiliate of Villiers Jets with a single conversion path proven for high-net-worth clients. Luxury, not cheap — because safety and speed matter more than gimmicks.",
                  }),
                  a("div", {
                    className:
                      "mt-8 rounded-[20px] overflow-hidden border border-[#0F172A]/10 shadow-[0_12px_40px_rgba(15,23,42,0.08)] lg:hidden",
                    children: [
                      o("img", {
                        src: mv,
                        alt: "Luxury private jet interior cream leather cabin with Texas ranch view - TexasJetQuote charter experience",
                        loading: "lazy",
                        decoding: "async",
                        width: 1920,
                        height: 1280,
                        className:
                          "w-full h-[240px] object-cover object-[50%_45%]",
                      }),
                      a("div", {
                        className:
                          "bg-white p-4 flex items-center justify-between",
                        children: [
                          o("div", {
                            className: "text-[12px] font-semibold",
                            children: "Gulfstream cabin • Texas ranch view",
                          }),
                          o("div", {
                            className:
                              "text-[11px] px-2 py-1 rounded-full bg-[#0F172A] text-white",
                            children: "Illustrative",
                          }),
                        ],
                      }),
                    ],
                  }),
                  o("div", {
                    className: "mt-8 grid gap-4",
                    children: [
                      {
                        t: "Verify every operator",
                        d: "Confirm the operating carrier's FAA authority, insurance, pilot qualifications, and independent safety ratings before booking. Villiers supplies the operator and final terms.",
                      },
                      {
                        t: "Review the complete quote",
                        d: "Final quotes can differ because repositioning, airport fees, schedule, catering, taxes, and aircraft availability vary. Review all terms supplied by Villiers.",
                      },
                      {
                        t: "Texas-focused planning",
                        d: "Plan a Texas trip here, then use the Villiers marketplace to confirm current aircraft and operator availability for domestic or international travel.",
                      },
                    ].map((z) =>
                      a(
                        "div",
                        {
                          className: "flex gap-4",
                          children: [
                            o("div", {
                              className:
                                "w-8 h-8 rounded-full bg-[#0F172A] text-[#C8A951] flex items-center justify-center shrink-0 mt-0.5",
                              children: o(Fn, { className: "w-4 h-4" }),
                            }),
                            a("div", {
                              children: [
                                o("div", {
                                  className: "font-semibold text-[15px]",
                                  children: z.t,
                                }),
                                o("div", {
                                  className:
                                    "mt-1 text-[13.5px] leading-relaxed text-[#0F172A]/65",
                                  children: z.d,
                                }),
                              ],
                            }),
                          ],
                        },
                        z.t,
                      ),
                    ),
                  }),
                ],
              }),
              a("div", {
                className: "relative",
                children: [
                  o("div", {
                    className:
                      "absolute -inset-4 bg-gradient-to-br from-[#C8A951]/15 to-transparent rounded-[24px] blur-[16px]",
                  }),
                  a("div", {
                    className:
                      "relative rounded-[24px] bg-white border border-[#0F172A]/[0.08] shadow-[0_20px_60px_rgba(15,23,42,0.08)] overflow-hidden",
                    children: [
                      a("div", {
                        className:
                          "relative h-[300px] overflow-hidden hidden lg:block",
                        children: [
                          o("img", {
                            src: mv,
                            alt: "Luxury private jet interior cream leather cabin with Texas ranch view - TexasJetQuote charter experience",
                            loading: "lazy",
                            decoding: "async",
                            width: 1920,
                            height: 1280,
                            className:
                              "w-full h-full object-cover object-[50%_42%] hover:scale-[1.03] transition-transform duration-700",
                          }),
                          o("div", {
                            className:
                              "absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent",
                          }),
                          a("div", {
                            className:
                              "absolute bottom-4 left-6 right-6 flex items-center justify-between",
                            children: [
                              a("div", {
                                className:
                                  "px-3 py-1.5 rounded-full bg-[#0F172A]/90 backdrop-blur text-white text-[11px] font-semibold border border-white/10 flex items-center gap-2",
                                children: [
                                  o("div", {
                                    className:
                                      "w-1.5 h-1.5 rounded-full bg-[#C8A951] animate-pulse",
                                  }),
                                  " Live Cabin • Gulfstream G650 • Texas Ranch View",
                                ],
                              }),
                              o("div", {
                                className:
                                  "w-8 h-8 rounded-full bg-white shadow flex items-center justify-center",
                                children: o($e, {
                                  className: "w-4 h-4 text-[#0F172A]",
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                      a("div", {
                        className: "p-8",
                        children: [
                          a("div", {
                            className: "flex items-center gap-3",
                            children: [
                              o("div", {
                                className:
                                  "w-10 h-10 rounded-full bg-[#0F172A] flex items-center justify-center",
                                children: o($e, {
                                  className: "w-5 h-5 text-[#C8A951]",
                                }),
                              }),
                              a("div", {
                                children: [
                                  o("div", {
                                    className:
                                      "serif text-[18px] font-semibold",
                                    children: "Texas-focused route expertise",
                                  }),
                                  o("div", {
                                    className: "text-[12px] text-[#0F172A]/60",
                                    children:
                                      "Private jet planning for Austin, Houston, Dallas, and routes worldwide",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          o("div", {
                            className: "mt-6 grid grid-cols-3 gap-3",
                            children: [
                              { k: "Domain Authority", v: "Villiers backed" },
                              { k: "Page Speed", v: "<1.2s LCP" },
                              {
                                k: "Content Depth",
                                v: "8 routes + 6 legs + FAQ",
                              },
                            ].map((z) =>
                              a(
                                "div",
                                {
                                  className:
                                    "rounded-xl bg-[#FAF9F6] border border-[#0F172A]/[0.06] p-4",
                                  children: [
                                    o("div", {
                                      className:
                                        "text-[10px] uppercase tracking-wide font-bold text-[#0F172A]/50",
                                      children: z.k,
                                    }),
                                    o("div", {
                                      className:
                                        "mt-1 text-[13px] font-semibold",
                                      children: z.v,
                                    }),
                                  ],
                                },
                                z.k,
                              ),
                            ),
                          }),
                          a("div", {
                            className:
                              "mt-6 rounded-xl bg-[#0F172A] text-white p-5 flex items-center justify-between",
                            children: [
                              a("div", {
                                children: [
                                  o("div", {
                                    className:
                                      "text-[11px] uppercase tracking-wide font-semibold text-white/50",
                                    children: "Live Affiliate Tracking",
                                  }),
                                  o("div", {
                                    className:
                                      "serif mt-1 text-[18px] font-semibold",
                                    children: "id=1673 • villiers.ai",
                                  }),
                                ],
                              }),
                              a("a", {
                                href: Cn,
                                target: "_blank",
                                rel: "sponsored nofollow noopener",
                                className:
                                  "h-10 px-5 rounded-full gold-gradient text-[#0F172A] text-[13px] font-semibold inline-flex items-center gap-2",
                                children: [
                                  "Open Booking ",
                                  o(Xe, { className: "w-4 h-4" }),
                                ],
                              }),
                            ],
                          }),
                          o("div", {
                            className: "mt-4 text-[11px] text-[#0F172A]/50",
                            children:
                              "We pre-qualify before lead capture — higher quality for Villiers, better pricing for you. That is why we convert.",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
      o("section", {
        id: "faq",
        className: "py-16 lg:py-24 bg-white border-t border-[#0F172A]/[0.06]",
        children: a("div", {
          className: "mx-auto max-w-[960px] px-6 lg:px-8",
          children: [
            a("div", {
              className: "text-center max-w-[720px] mx-auto",
              children: [
                o("div", {
                  className:
                    "inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-[#0F172A]/50",
                  children: "Texas Private Jet Charter FAQ",
                }),
                o("h2", {
                  className:
                    "serif mt-4 text-[36px] lg:text-[48px] leading-[0.95] font-semibold",
                  children: "Real questions Texas clients ask before booking",
                }),
              ],
            }),
            o("div", {
              className:
                "mt-10 divide-y divide-[#0F172A]/[0.08] border border-[#0F172A]/[0.08] rounded-[20px] overflow-hidden bg-[#FAF9F6]",
              children: Ga.map((z, A) =>
                a(
                  "div",
                  {
                    className: "bg-white",
                    children: [
                      a("button", {
                        onClick: () => X(p === A ? null : A),
                        className:
                          "w-full text-left px-6 lg:px-8 py-6 flex items-start justify-between gap-6 hover:bg-[#FAF9F6] transition",
                        children: [
                          o("span", {
                            className:
                              "serif text-[18px] font-semibold leading-tight",
                            children: z.q,
                          }),
                          o("span", {
                            className: `w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition ${p === A ? "bg-[#0F172A] text-white border-[#0F172A]" : "bg-white border-[#0F172A]/10 text-[#0F172A]/60"}`,
                            children: o(Ct, {
                              className: `w-4 h-4 transition-transform ${p === A ? "rotate-180" : ""}`,
                            }),
                          }),
                        ],
                      }),
                      p === A &&
                        o("div", {
                          className:
                            "px-6 lg:px-8 pb-6 -mt-2 text-[14px] leading-relaxed text-[#0F172A]/70 max-w-[760px]",
                          children: z.a,
                        }),
                    ],
                  },
                  A,
                ),
              ),
            }),
            o("div", {
              className: "mt-8 text-center",
              children: a("div", {
                className:
                  "inline-flex flex-wrap items-center justify-center gap-2 text-[12px]",
                children: [
                  o("span", {
                    className: "px-3 py-1.5 rounded-full bg-[#0F172A]/5",
                    children: "private jet Austin",
                  }),
                  o("span", {
                    className: "px-3 py-1.5 rounded-full bg-[#0F172A]/5",
                    children: "Houston private jet charter",
                  }),
                  o("span", {
                    className: "px-3 py-1.5 rounded-full bg-[#0F172A]/5",
                    children: "Texas private jet quote",
                  }),
                  o("span", {
                    className: "px-3 py-1.5 rounded-full bg-[#0F172A]/5",
                    children: "Dallas jet charter",
                  }),
                  o("span", {
                    className: "px-3 py-1.5 rounded-full bg-[#0F172A]/5",
                    children: "Austin to Aspen private jet",
                  }),
                  o("span", {
                    className: "px-3 py-1.5 rounded-full bg-[#0F172A]/5",
                    children: "Houston to Miami jet",
                  }),
                ],
              }),
            }),
          ],
        }),
      }),
      o("footer", {
        className: "bg-[#0F172A] text-white border-t border-white/10",
        children: a("div", {
          className: "mx-auto max-w-[1280px] px-6 lg:px-8 py-14 lg:py-16",
          children: [
            a("div", {
              className: "grid lg:grid-cols-[1.2fr_1.8fr] gap-12 lg:gap-16",
              children: [
                a("div", {
                  children: [
                    a("div", {
                      className: "flex items-center gap-3",
                      children: [
                        o("div", {
                          className:
                            "w-10 h-10 rounded-[12px] bg-white/10 border border-white/10 flex items-center justify-center",
                          children: o(xe, {
                            className: "w-5 h-5 text-[#C8A951] -rotate-12",
                          }),
                        }),
                        a("div", {
                          children: [
                            o("div", {
                              className:
                                "serif text-white font-bold text-[20px] leading-none tracking-tight",
                              children: "TexasJetQuote.com",
                            }),
                            o("div", {
                              className:
                                "text-[10px] tracking-[0.2em] uppercase font-semibold text-white/40 mt-1",
                              children: "VILLIERS AFFILIATE • TEXAS",
                            }),
                          ],
                        }),
                      ],
                    }),
                    o("p", {
                      className:
                        "mt-5 text-[13.5px] leading-relaxed text-white/60 max-w-[360px]",
                      children:
                        "Texas private jet charter specialists. Austin, Houston, Dallas to anywhere — Villiers global network, Texas roots. Luxury without membership games.",
                    }),
                    a("div", {
                      className: "mt-6 flex flex-wrap gap-2",
                      children: [
                        a("span", {
                          className:
                            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold tracking-wide text-white/70",
                          children: [
                            o(Se, { className: "w-3.5 h-3.5 text-[#C8A951]" }),
                            " FAA Part 135 Only",
                          ],
                        }),
                        a("span", {
                          className:
                            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold tracking-wide text-white/70",
                          children: [
                            o(qn, { className: "w-3.5 h-3.5 text-[#C8A951]" }),
                            " Villiers Affiliate",
                          ],
                        }),
                        a("span", {
                          className:
                            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C8A951]/15 border border-[#C8A951]/20 text-[11px] font-semibold tracking-wide text-[#E8D5A3]",
                          children: [
                            o(Cf, { className: "w-3.5 h-3.5" }),
                            " 24/7 Broker",
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                a("div", {
                  children: [
                    o("div", {
                      className:
                        "text-[11px] font-bold tracking-[0.18em] uppercase text-white/40",
                      children: "Popular Texas Routes",
                    }),
                    o("div", {
                      className:
                        "mt-5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3",
                      children: d7.map((z) =>
                        a(
                          "button",
                          {
                            onClick: () => {
                              document
                                .getElementById("routes")
                                ?.scrollIntoView({ behavior: "smooth" });
                            },
                            className:
                              "text-left group rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.07] hover:border-white/10 px-4 py-3 transition",
                            children: [
                              a("div", {
                                className:
                                  "text-[11px] font-bold tracking-wide text-[#C8A951]",
                                children: [z.fromCode, " → ", z.toCode],
                              }),
                              a("div", {
                                className:
                                  "mt-1 text-[13px] font-medium text-white group-hover:text-white transition",
                                children: [z.from, " → ", z.to],
                              }),
                              o("div", {
                                className: "mt-1 text-[11px] text-white/40",
                                children: z.price,
                              }),
                            ],
                          },
                          `footer-${z.from}-${z.to}`,
                        ),
                      ),
                    }),
                    a("div", {
                      className:
                        "mt-6 flex flex-wrap items-center gap-6 text-[12px] text-white/50",
                      children: [
                        a("span", {
                          className: "flex items-center gap-2",
                          children: [
                            o(xe, { className: "w-4 h-4 text-white/60" }),
                            " Villiers Marketplace Access",
                          ],
                        }),
                        a("span", {
                          className: "flex items-center gap-2",
                          children: [
                            o(Se, { className: "w-4 h-4 text-white/60" }),
                            " Review Operator Safety",
                          ],
                        }),
                        o("span", {
                          children: "Review Final Terms",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            a("div", {
              className:
                "mt-12 pt-8 border-t border-white/10 grid lg:grid-cols-[1.5fr_1fr] gap-6 items-start",
              children: [
                a("div", {
                  className: "text-[12px] leading-relaxed text-white/45",
                  children: [
                    "TexasJetQuote is an independent Villiers affiliate and does not operate aircraft or issue charter quotes. Affiliate ID 1673 is tracked. Planning ranges are editorial estimates; Villiers and the identified operator supply current availability, final pricing, safety information, and booking terms.",
                    o("a", {
                      href: Cn,
                      target: "_blank",
                      rel: "sponsored nofollow noopener",
                      className:
                        "text-[#E8D5A3] hover:text-white underline underline-offset-4 ml-1",
                      children: "Book on Villiers → villiers.ai/?id=1673",
                    }),
                  ],
                }),
                a("div", {
                  className:
                    "lg:text-right text-[11px] tracking-wide text-white/30",
                  children: [
                    o("div", { children: "© 2026 TexasJetQuote.com" }),
                    o("div", {
                      className: "mt-1",
                      children:
                        "Luxury private aviation • Austin • Houston • Dallas",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
      o("div", {
        className: "fixed bottom-6 right-6 z-50",
        children: !e
          ? a("button", {
              onClick: () => n(!0),
              className:
                "group h-[56px] px-6 rounded-full bg-[#0F172A] text-white shadow-[0_18px_40px_rgba(15,23,42,0.35)] border border-white/10 inline-flex items-center gap-3 hover:bg-black transition",
              children: [
                o("div", {
                  className:
                    "w-8 h-8 rounded-full gold-gradient flex items-center justify-center text-[#0F172A]",
                  children: o(xe, { className: "w-4 h-4 -rotate-12" }),
                }),
                a("div", {
                  className: "text-left leading-tight hidden sm:block",
                  children: [
                    o("div", {
                      className: "text-[13px] font-semibold",
                      children: "AI Quote Agent",
                    }),
                    o("div", {
                      className: "text-[11px] text-white/60",
                      children: "30-sec transparent range",
                    }),
                  ],
                }),
                o("div", {
                  className:
                    "w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition",
                  children: o(Xe, { className: "w-4 h-4" }),
                }),
              ],
            })
          : a("div", {
              className:
                "w-[92vw] max-w-[380px] rounded-[22px] overflow-hidden bg-[#0F172A] text-white shadow-[0_30px_80px_rgba(0,0,0,0.5)] border border-white/10",
              children: [
                a("div", {
                  className:
                    "px-5 py-4 flex items-center justify-between border-b border-white/10",
                  children: [
                    a("div", {
                      className: "flex items-center gap-2.5",
                      children: [
                        o("div", {
                          className:
                            "w-8 h-8 rounded-full gold-gradient flex items-center justify-center text-[#0F172A]",
                          children: o(qe, { className: "w-4 h-4" }),
                        }),
                        a("div", {
                          children: [
                            o("div", {
                              className:
                                "text-[12px] font-semibold tracking-wide",
                              children: "TEXASJETQUOTE AI",
                            }),
                            o("div", {
                              className: "text-[10px] text-white/60",
                              children: "Villiers affiliate • id=1673",
                            }),
                          ],
                        }),
                      ],
                    }),
                    o("button", {
                      onClick: () => n(!1),
                      className:
                        "w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/15 transition",
                      children: o(Tt, { className: "w-4 h-4" }),
                    }),
                  ],
                }),
                a("div", {
                  className: "p-5 max-h-[64vh] overflow-y-auto space-y-4",
                  children: [
                    f === "collecting" &&
                      a(Hv, {
                        children: [
                          o("div", {
                            className:
                              "text-[13px] leading-relaxed text-white/80 bg-white/[0.06] border border-white/10 rounded-[12px] p-3",
                            children:
                              "Quick route to see transparent range — no email needed yet.",
                          }),
                          C &&
                            o("div", {
                              className:
                                "rounded-xl bg-amber-500/15 border border-amber-500/20 px-3 py-2 text-[12px] text-amber-200",
                              children: C,
                            }),
                          a("div", {
                            className: "grid gap-3",
                            children: [
                              o("input", {
                                value: r.from,
                                onChange: (z) =>
                                  l({ ...r, from: z.target.value }),
                                placeholder: "From (Austin)",
                                className:
                                  "h-11 px-4 rounded-xl bg-white/[0.06] border border-white/10 text-[14px] placeholder:text-white/30 focus:outline-none focus:border-[#C8A951]/50",
                              }),
                              o("input", {
                                value: r.to,
                                onChange: (z) =>
                                  l({ ...r, to: z.target.value }),
                                placeholder: "To (Aspen)",
                                className:
                                  "h-11 px-4 rounded-xl bg-white/[0.06] border border-white/10 text-[14px] placeholder:text-white/30 focus:outline-none focus:border-[#C8A951]/50",
                              }),
                              a("div", {
                                className: "grid grid-cols-2 gap-3",
                                children: [
                                  a("select", {
                                    value: r.pax,
                                    onChange: (z) =>
                                      l({ ...r, pax: z.target.value }),
                                    className:
                                      "h-11 px-3 rounded-xl bg-white/[0.06] border border-white/10 text-[14px]",
                                    children: [
                                      o("option", {
                                        className: "text-black",
                                        value: "2",
                                        children: "2 pax",
                                      }),
                                      [1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map(
                                        (z) =>
                                          a(
                                            "option",
                                            {
                                              className: "text-black",
                                              value: String(z),
                                              children: [z, " pax"],
                                            },
                                            z,
                                          ),
                                      ),
                                    ],
                                  }),
                                  o("input", {
                                    type: "date",
                                    value: r.date,
                                    onChange: (z) =>
                                      l({ ...r, date: z.target.value }),
                                    className:
                                      "h-11 px-3 rounded-xl bg-white/[0.06] border border-white/10 text-[14px]",
                                  }),
                                ],
                              }),
                              a("button", {
                                onClick: H,
                                className:
                                  "h-11 rounded-xl gold-gradient text-[#0F172A] font-semibold text-[14px] inline-flex items-center justify-center gap-2",
                                children: [
                                  "Get Estimate ",
                                  o(Yn, { className: "w-4 h-4" }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    f === "estimating" &&
                      a("div", {
                        className: "py-12 flex flex-col items-center gap-3",
                        children: [
                          o("div", {
                            className:
                              "w-12 h-12 rounded-full border border-[#C8A951]/30 border-t-[#C8A951] animate-spin",
                          }),
                          a("div", {
                            className: "text-[13px] text-white/60 text-center",
                            children: [
                              "Calling get_jet_estimate…",
                              o("br", {}),
                              r.from,
                              " → ",
                              r.to,
                            ],
                          }),
                        ],
                      }),
                    (f === "showing_estimate" ||
                      f === "collecting_lead" ||
                      f === "awaiting_confirmation" ||
                      f === "confirmed") &&
                      i &&
                      a("div", {
                        className: "space-y-4",
                        children: [
                          a("div", {
                            className:
                              "rounded-xl bg-white/[0.07] border border-[#C8A951]/20 p-4",
                            children: [
                              o("div", {
                                className:
                                  "text-[11px] uppercase tracking-wide font-semibold text-[#C8A951]",
                                children: "Estimated Range",
                              }),
                              a("div", {
                                className: "serif text-[24px] font-bold mt-1",
                                children: [i.low, " – ", i.high],
                              }),
                              o("div", {
                                className: "text-[12px] text-white/60 mt-1",
                                children: i.aircraft,
                              }),
                            ],
                          }),
                          f === "showing_estimate" &&
                            o("button", {
                              onClick: x,
                              className:
                                "w-full h-11 rounded-xl bg-white text-[#0F172A] font-semibold text-[14px]",
                              children: "Get Confirmed Aircraft",
                            }),
                          f === "collecting_lead" &&
                            a("div", {
                              className: "space-y-3",
                              children: [
                                o("input", {
                                  value: u.name,
                                  name: "name",
                                  autoComplete: "name",
                                  onChange: (z) =>
                                    v({ ...u, name: z.target.value }),
                                  placeholder: "Full name",
                                  className:
                                    "w-full h-11 px-4 rounded-xl bg-white/[0.06] border border-white/10 text-[14px] placeholder:text-white/30 focus:outline-none focus:border-[#C8A951]/50",
                                }),
                                o("input", {
                                  value: u.email,
                                  name: "email",
                                  type: "email",
                                  autoComplete: "email",
                                  onChange: (z) =>
                                    v({ ...u, email: z.target.value }),
                                  placeholder: "Email",
                                  className:
                                    "w-full h-11 px-4 rounded-xl bg-white/[0.06] border border-white/10 text-[14px] placeholder:text-white/30 focus:outline-none focus:border-[#C8A951]/50",
                                }),
                                o("input", {
                                  value: u.phone,
                                  name: "phone",
                                  type: "tel",
                                  autoComplete: "tel",
                                  onChange: (z) =>
                                    v({ ...u, phone: z.target.value }),
                                  placeholder: "Phone (optional)",
                                  className:
                                    "w-full h-11 px-4 rounded-xl bg-white/[0.06] border border-white/10 text-[14px] placeholder:text-white/30 focus:outline-none focus:border-[#C8A951]/50",
                                }),
                                o("button", {
                                  onClick: T,
                                  className:
                                    "w-full h-11 rounded-xl gold-gradient text-[#0F172A] font-semibold text-[14px]",
                                  children: "Save Request",
                                }),
                              ],
                            }),
                          f === "awaiting_confirmation" &&
                            a("div", {
                              className:
                                "py-6 flex flex-col items-center gap-3",
                              children: [
                                o("div", {
                                  className:
                                    "w-8 h-8 rounded-full border border-white/20 border-t-white animate-spin",
                                }),
                                o("div", {
                                  className:
                                    "text-[12px] text-white/60 text-center",
                                  children: "Saving your quote request…",
                                }),
                              ],
                            }),
                          f === "confirmed" &&
                            a("div", {
                              className: "space-y-3",
                              children: [
                                o("div", {
                                  className:
                                    "rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 text-[12px] leading-relaxed text-emerald-100/90",
                                  children:
                                    "Quote request saved. Continue to Villiers for current aircraft availability, operator pricing, and final terms. Affiliate id=1673 is active.",
                                }),
                                a("a", {
                                  href: Cn,
                                  target: "_blank",
                                  rel: "sponsored nofollow noopener",
                                  className:
                                    "w-full h-11 rounded-xl gold-gradient text-[#0F172A] font-semibold text-[13px] inline-flex items-center justify-center gap-2",
                                  children: [
                                    "Continue to Villiers ",
                                    o(Xe, { className: "w-4 h-4" }),
                                  ],
                                }),
                                o("button", {
                                  onClick: N,
                                  className:
                                    "w-full h-10 rounded-xl bg-white/10 text-[13px]",
                                  children: "New Quote",
                                }),
                              ],
                            }),
                        ],
                      }),
                  ],
                }),
              ],
            }),
      }),
    ],
  });
}
s7.createRoot(document.getElementById("root")).render(
  o(c7.default.StrictMode, { children: o(yv, {}) }),
);
