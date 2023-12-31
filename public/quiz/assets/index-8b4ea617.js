(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
  new MutationObserver((s) => {
    for (const i of s)
      if (i.type === "childList")
        for (const o of i.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && r(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(s) {
    const i = {};
    return (
      s.integrity && (i.integrity = s.integrity),
      s.referrerPolicy && (i.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : s.crossOrigin === "anonymous"
        ? (i.credentials = "omit")
        : (i.credentials = "same-origin"),
      i
    );
  }
  function r(s) {
    if (s.ep) return;
    s.ep = !0;
    const i = n(s);
    fetch(s.href, i);
  }
})();
function Sr(e, t) {
  const n = Object.create(null),
    r = e.split(",");
  for (let s = 0; s < r.length; s++) n[r[s]] = !0;
  return t ? (s) => !!n[s.toLowerCase()] : (s) => !!n[s];
}
const ce = {},
  rn = [],
  rt = () => {},
  Ta = () => !1,
  Sa = /^on[^a-z]/,
  Kn = (e) => Sa.test(e),
  Os = (e) => e.startsWith("onUpdate:"),
  me = Object.assign,
  Is = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  Ma = Object.prototype.hasOwnProperty,
  oe = (e, t) => Ma.call(e, t),
  V = Array.isArray,
  sn = (e) => bn(e) === "[object Map]",
  Xt = (e) => bn(e) === "[object Set]",
  vi = (e) => bn(e) === "[object Date]",
  Pa = (e) => bn(e) === "[object RegExp]",
  X = (e) => typeof e == "function",
  ve = (e) => typeof e == "string",
  un = (e) => typeof e == "symbol",
  fe = (e) => e !== null && typeof e == "object",
  Ls = (e) => (fe(e) || X(e)) && X(e.then) && X(e.catch),
  Po = Object.prototype.toString,
  bn = (e) => Po.call(e),
  xa = (e) => bn(e).slice(8, -1),
  xo = (e) => bn(e) === "[object Object]",
  Ds = (e) =>
    ve(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Mn = Sr(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  Mr = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  Ha = /-(\w)/g,
  $e = Mr((e) => e.replace(Ha, (t, n) => (n ? n.toUpperCase() : ""))),
  Oa = /\B([A-Z])/g,
  Ye = Mr((e) => e.replace(Oa, "-$1").toLowerCase()),
  Qn = Mr((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Pn = Mr((e) => (e ? `on${Qn(e)}` : "")),
  xt = (e, t) => !Object.is(e, t),
  on = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  mr = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  vr = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  },
  br = (e) => {
    const t = ve(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  };
let bi;
const us = () =>
    bi ||
    (bi =
      typeof globalThis < "u"
        ? globalThis
        : typeof self < "u"
        ? self
        : typeof window < "u"
        ? window
        : typeof global < "u"
        ? global
        : {}),
  Ia =
    "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console",
  La = Sr(Ia);
function We(e) {
  if (V(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        s = ve(r) ? $a(r) : We(r);
      if (s) for (const i in s) t[i] = s[i];
    }
    return t;
  } else if (ve(e) || fe(e)) return e;
}
const Da = /;(?![^(]*\))/g,
  Na = /:([^]+)/,
  Ba = /\/\*[^]*?\*\//g;
function $a(e) {
  const t = {};
  return (
    e
      .replace(Ba, "")
      .split(Da)
      .forEach((n) => {
        if (n) {
          const r = n.split(Na);
          r.length > 1 && (t[r[0].trim()] = r[1].trim());
        }
      }),
    t
  );
}
function Nt(e) {
  let t = "";
  if (ve(e)) t = e;
  else if (V(e))
    for (let n = 0; n < e.length; n++) {
      const r = Nt(e[n]);
      r && (t += r + " ");
    }
  else if (fe(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
function Fa(e) {
  if (!e) return null;
  let { class: t, style: n } = e;
  return t && !ve(t) && (e.class = Nt(t)), n && (e.style = We(n)), e;
}
const za =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  ja = Sr(za);
function Ho(e) {
  return !!e || e === "";
}
function Ua(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let r = 0; n && r < e.length; r++) n = Ht(e[r], t[r]);
  return n;
}
function Ht(e, t) {
  if (e === t) return !0;
  let n = vi(e),
    r = vi(t);
  if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
  if (((n = un(e)), (r = un(t)), n || r)) return e === t;
  if (((n = V(e)), (r = V(t)), n || r)) return n && r ? Ua(e, t) : !1;
  if (((n = fe(e)), (r = fe(t)), n || r)) {
    if (!n || !r) return !1;
    const s = Object.keys(e).length,
      i = Object.keys(t).length;
    if (s !== i) return !1;
    for (const o in e) {
      const a = e.hasOwnProperty(o),
        l = t.hasOwnProperty(o);
      if ((a && !l) || (!a && l) || !Ht(e[o], t[o])) return !1;
    }
  }
  return String(e) === String(t);
}
function Pr(e, t) {
  return e.findIndex((n) => Ht(n, t));
}
const cs = (e) =>
    ve(e)
      ? e
      : e == null
      ? ""
      : V(e) || (fe(e) && (e.toString === Po || !X(e.toString)))
      ? JSON.stringify(e, Oo, 2)
      : String(e),
  Oo = (e, t) =>
    t && t.__v_isRef
      ? Oo(e, t.value)
      : sn(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [r, s]) => ((n[`${r} =>`] = s), n),
            {}
          ),
        }
      : Xt(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : fe(t) && !V(t) && !xo(t)
      ? String(t)
      : t;
let Ue;
class Ns {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Ue),
      !t && Ue && (this.index = (Ue.scopes || (Ue.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = Ue;
      try {
        return (Ue = this), t();
      } finally {
        Ue = n;
      }
    }
  }
  on() {
    Ue = this;
  }
  off() {
    Ue = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s &&
          s !== this &&
          ((this.parent.scopes[this.index] = s), (s.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function Va(e) {
  return new Ns(e);
}
function Io(e, t = Ue) {
  t && t.active && t.effects.push(e);
}
function Lo() {
  return Ue;
}
function qa(e) {
  Ue && Ue.cleanups.push(e);
}
const Bs = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  Do = (e) => (e.w & Ot) > 0,
  No = (e) => (e.n & Ot) > 0,
  Wa = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Ot;
  },
  Ka = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let r = 0; r < t.length; r++) {
        const s = t[r];
        Do(s) && !No(s) ? s.delete(e) : (t[n++] = s),
          (s.w &= ~Ot),
          (s.n &= ~Ot);
      }
      t.length = n;
    }
  },
  _r = new WeakMap();
let kn = 0,
  Ot = 1;
const fs = 30;
let tt;
const Ut = Symbol(""),
  ds = Symbol("");
class cn {
  constructor(t, n = null, r) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      Io(this, r);
  }
  run() {
    if (!this.active) return this.fn();
    let t = tt,
      n = St;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = tt),
        (tt = this),
        (St = !0),
        (Ot = 1 << ++kn),
        kn <= fs ? Wa(this) : _i(this),
        this.fn()
      );
    } finally {
      kn <= fs && Ka(this),
        (Ot = 1 << --kn),
        (tt = this.parent),
        (St = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    tt === this
      ? (this.deferStop = !0)
      : this.active &&
        (_i(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function _i(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
function Qa(e, t) {
  e.effect instanceof cn && (e = e.effect.fn);
  const n = new cn(e);
  t && (me(n, t), t.scope && Io(n, t.scope)), (!t || !t.lazy) && n.run();
  const r = n.run.bind(n);
  return (r.effect = n), r;
}
function Ya(e) {
  e.effect.stop();
}
let St = !0;
const Bo = [];
function _n() {
  Bo.push(St), (St = !1);
}
function yn() {
  const e = Bo.pop();
  St = e === void 0 ? !0 : e;
}
function Fe(e, t, n) {
  if (St && tt) {
    let r = _r.get(e);
    r || _r.set(e, (r = new Map()));
    let s = r.get(n);
    s || r.set(n, (s = Bs())), $o(s);
  }
}
function $o(e, t) {
  let n = !1;
  kn <= fs ? No(e) || ((e.n |= Ot), (n = !Do(e))) : (n = !e.has(tt)),
    n && (e.add(tt), tt.deps.push(e));
}
function gt(e, t, n, r, s, i) {
  const o = _r.get(e);
  if (!o) return;
  let a = [];
  if (t === "clear") a = [...o.values()];
  else if (n === "length" && V(e)) {
    const l = Number(r);
    o.forEach((u, c) => {
      (c === "length" || (!un(c) && c >= l)) && a.push(u);
    });
  } else
    switch ((n !== void 0 && a.push(o.get(n)), t)) {
      case "add":
        V(e)
          ? Ds(n) && a.push(o.get("length"))
          : (a.push(o.get(Ut)), sn(e) && a.push(o.get(ds)));
        break;
      case "delete":
        V(e) || (a.push(o.get(Ut)), sn(e) && a.push(o.get(ds)));
        break;
      case "set":
        sn(e) && a.push(o.get(Ut));
        break;
    }
  if (a.length === 1) a[0] && hs(a[0]);
  else {
    const l = [];
    for (const u of a) u && l.push(...u);
    hs(Bs(l));
  }
}
function hs(e, t) {
  const n = V(e) ? e : [...e];
  for (const r of n) r.computed && yi(r);
  for (const r of n) r.computed || yi(r);
}
function yi(e, t) {
  (e !== tt || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
function Ja(e, t) {
  var n;
  return (n = _r.get(e)) == null ? void 0 : n.get(t);
}
const Xa = Sr("__proto__,__v_isRef,__isVue"),
  Fo = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(un)
  ),
  wi = Ga();
function Ga() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const r = ie(this);
        for (let i = 0, o = this.length; i < o; i++) Fe(r, "get", i + "");
        const s = r[t](...n);
        return s === -1 || s === !1 ? r[t](...n.map(ie)) : s;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        _n();
        const r = ie(this)[t].apply(this, n);
        return yn(), r;
      };
    }),
    e
  );
}
function Za(e) {
  const t = ie(this);
  return Fe(t, "has", e), t.hasOwnProperty(e);
}
class zo {
  constructor(t = !1, n = !1) {
    (this._isReadonly = t), (this._shallow = n);
  }
  get(t, n, r) {
    const s = this._isReadonly,
      i = this._shallow;
    if (n === "__v_isReactive") return !s;
    if (n === "__v_isReadonly") return s;
    if (n === "__v_isShallow") return i;
    if (n === "__v_raw" && r === (s ? (i ? Ko : Wo) : i ? qo : Vo).get(t))
      return t;
    const o = V(t);
    if (!s) {
      if (o && oe(wi, n)) return Reflect.get(wi, n, r);
      if (n === "hasOwnProperty") return Za;
    }
    const a = Reflect.get(t, n, r);
    return (un(n) ? Fo.has(n) : Xa(n)) || (s || Fe(t, "get", n), i)
      ? a
      : Re(a)
      ? o && Ds(n)
        ? a
        : a.value
      : fe(a)
      ? s
        ? zs(a)
        : Yn(a)
      : a;
  }
}
class jo extends zo {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, s) {
    let i = t[n];
    if (Kt(i) && Re(i) && !Re(r)) return !1;
    if (
      !this._shallow &&
      (!Bn(r) && !Kt(r) && ((i = ie(i)), (r = ie(r))), !V(t) && Re(i) && !Re(r))
    )
      return (i.value = r), !0;
    const o = V(t) && Ds(n) ? Number(n) < t.length : oe(t, n),
      a = Reflect.set(t, n, r, s);
    return (
      t === ie(s) && (o ? xt(r, i) && gt(t, "set", n, r) : gt(t, "add", n, r)),
      a
    );
  }
  deleteProperty(t, n) {
    const r = oe(t, n);
    t[n];
    const s = Reflect.deleteProperty(t, n);
    return s && r && gt(t, "delete", n, void 0), s;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!un(n) || !Fo.has(n)) && Fe(t, "has", n), r;
  }
  ownKeys(t) {
    return Fe(t, "iterate", V(t) ? "length" : Ut), Reflect.ownKeys(t);
  }
}
class Uo extends zo {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const eu = new jo(),
  tu = new Uo(),
  nu = new jo(!0),
  ru = new Uo(!0),
  $s = (e) => e,
  xr = (e) => Reflect.getPrototypeOf(e);
function nr(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const s = ie(e),
    i = ie(t);
  n || (xt(t, i) && Fe(s, "get", t), Fe(s, "get", i));
  const { has: o } = xr(s),
    a = r ? $s : n ? Vs : $n;
  if (o.call(s, t)) return a(e.get(t));
  if (o.call(s, i)) return a(e.get(i));
  e !== s && e.get(t);
}
function rr(e, t = !1) {
  const n = this.__v_raw,
    r = ie(n),
    s = ie(e);
  return (
    t || (xt(e, s) && Fe(r, "has", e), Fe(r, "has", s)),
    e === s ? n.has(e) : n.has(e) || n.has(s)
  );
}
function sr(e, t = !1) {
  return (
    (e = e.__v_raw), !t && Fe(ie(e), "iterate", Ut), Reflect.get(e, "size", e)
  );
}
function Ei(e) {
  e = ie(e);
  const t = ie(this);
  return xr(t).has.call(t, e) || (t.add(e), gt(t, "add", e, e)), this;
}
function Ci(e, t) {
  t = ie(t);
  const n = ie(this),
    { has: r, get: s } = xr(n);
  let i = r.call(n, e);
  i || ((e = ie(e)), (i = r.call(n, e)));
  const o = s.call(n, e);
  return (
    n.set(e, t), i ? xt(t, o) && gt(n, "set", e, t) : gt(n, "add", e, t), this
  );
}
function Ri(e) {
  const t = ie(this),
    { has: n, get: r } = xr(t);
  let s = n.call(t, e);
  s || ((e = ie(e)), (s = n.call(t, e))), r && r.call(t, e);
  const i = t.delete(e);
  return s && gt(t, "delete", e, void 0), i;
}
function Ai() {
  const e = ie(this),
    t = e.size !== 0,
    n = e.clear();
  return t && gt(e, "clear", void 0, void 0), n;
}
function ir(e, t) {
  return function (r, s) {
    const i = this,
      o = i.__v_raw,
      a = ie(o),
      l = t ? $s : e ? Vs : $n;
    return (
      !e && Fe(a, "iterate", Ut), o.forEach((u, c) => r.call(s, l(u), l(c), i))
    );
  };
}
function or(e, t, n) {
  return function (...r) {
    const s = this.__v_raw,
      i = ie(s),
      o = sn(i),
      a = e === "entries" || (e === Symbol.iterator && o),
      l = e === "keys" && o,
      u = s[e](...r),
      c = n ? $s : t ? Vs : $n;
    return (
      !t && Fe(i, "iterate", l ? ds : Ut),
      {
        next() {
          const { value: f, done: h } = u.next();
          return h
            ? { value: f, done: h }
            : { value: a ? [c(f[0]), c(f[1])] : c(f), done: h };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function yt(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function su() {
  const e = {
      get(i) {
        return nr(this, i);
      },
      get size() {
        return sr(this);
      },
      has: rr,
      add: Ei,
      set: Ci,
      delete: Ri,
      clear: Ai,
      forEach: ir(!1, !1),
    },
    t = {
      get(i) {
        return nr(this, i, !1, !0);
      },
      get size() {
        return sr(this);
      },
      has: rr,
      add: Ei,
      set: Ci,
      delete: Ri,
      clear: Ai,
      forEach: ir(!1, !0),
    },
    n = {
      get(i) {
        return nr(this, i, !0);
      },
      get size() {
        return sr(this, !0);
      },
      has(i) {
        return rr.call(this, i, !0);
      },
      add: yt("add"),
      set: yt("set"),
      delete: yt("delete"),
      clear: yt("clear"),
      forEach: ir(!0, !1),
    },
    r = {
      get(i) {
        return nr(this, i, !0, !0);
      },
      get size() {
        return sr(this, !0);
      },
      has(i) {
        return rr.call(this, i, !0);
      },
      add: yt("add"),
      set: yt("set"),
      delete: yt("delete"),
      clear: yt("clear"),
      forEach: ir(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
      (e[i] = or(i, !1, !1)),
        (n[i] = or(i, !0, !1)),
        (t[i] = or(i, !1, !0)),
        (r[i] = or(i, !0, !0));
    }),
    [e, n, t, r]
  );
}
const [iu, ou, lu, au] = su();
function Hr(e, t) {
  const n = t ? (e ? au : lu) : e ? ou : iu;
  return (r, s, i) =>
    s === "__v_isReactive"
      ? !e
      : s === "__v_isReadonly"
      ? e
      : s === "__v_raw"
      ? r
      : Reflect.get(oe(n, s) && s in r ? n : r, s, i);
}
const uu = { get: Hr(!1, !1) },
  cu = { get: Hr(!1, !0) },
  fu = { get: Hr(!0, !1) },
  du = { get: Hr(!0, !0) },
  Vo = new WeakMap(),
  qo = new WeakMap(),
  Wo = new WeakMap(),
  Ko = new WeakMap();
function hu(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function pu(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : hu(xa(e));
}
function Yn(e) {
  return Kt(e) ? e : Or(e, !1, eu, uu, Vo);
}
function Fs(e) {
  return Or(e, !1, nu, cu, qo);
}
function zs(e) {
  return Or(e, !0, tu, fu, Wo);
}
function gu(e) {
  return Or(e, !0, ru, du, Ko);
}
function Or(e, t, n, r, s) {
  if (!fe(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const i = s.get(e);
  if (i) return i;
  const o = pu(e);
  if (o === 0) return e;
  const a = new Proxy(e, o === 2 ? r : n);
  return s.set(e, a), a;
}
function Vt(e) {
  return Kt(e) ? Vt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Kt(e) {
  return !!(e && e.__v_isReadonly);
}
function Bn(e) {
  return !!(e && e.__v_isShallow);
}
function js(e) {
  return Vt(e) || Kt(e);
}
function ie(e) {
  const t = e && e.__v_raw;
  return t ? ie(t) : e;
}
function Us(e) {
  return mr(e, "__v_skip", !0), e;
}
const $n = (e) => (fe(e) ? Yn(e) : e),
  Vs = (e) => (fe(e) ? zs(e) : e);
function qs(e) {
  St && tt && ((e = ie(e)), $o(e.dep || (e.dep = Bs())));
}
function Ir(e, t) {
  e = ie(e);
  const n = e.dep;
  n && hs(n);
}
function Re(e) {
  return !!(e && e.__v_isRef === !0);
}
function st(e) {
  return Yo(e, !1);
}
function Qo(e) {
  return Yo(e, !0);
}
function Yo(e, t) {
  return Re(e) ? e : new mu(e, t);
}
class mu {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : ie(t)),
      (this._value = n ? t : $n(t));
  }
  get value() {
    return qs(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Bn(t) || Kt(t);
    (t = n ? t : ie(t)),
      xt(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : $n(t)), Ir(this));
  }
}
function vu(e) {
  Ir(e);
}
function mt(e) {
  return Re(e) ? e.value : e;
}
function bu(e) {
  return X(e) ? e() : mt(e);
}
const _u = {
  get: (e, t, n) => mt(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const s = e[t];
    return Re(s) && !Re(n) ? ((s.value = n), !0) : Reflect.set(e, t, n, r);
  },
};
function Ws(e) {
  return Vt(e) ? e : new Proxy(e, _u);
}
class yu {
  constructor(t) {
    (this.dep = void 0), (this.__v_isRef = !0);
    const { get: n, set: r } = t(
      () => qs(this),
      () => Ir(this)
    );
    (this._get = n), (this._set = r);
  }
  get value() {
    return this._get();
  }
  set value(t) {
    this._set(t);
  }
}
function wu(e) {
  return new yu(e);
}
function Eu(e) {
  const t = V(e) ? new Array(e.length) : {};
  for (const n in e) t[n] = Jo(e, n);
  return t;
}
class Cu {
  constructor(t, n, r) {
    (this._object = t),
      (this._key = n),
      (this._defaultValue = r),
      (this.__v_isRef = !0);
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return Ja(ie(this._object), this._key);
  }
}
class Ru {
  constructor(t) {
    (this._getter = t), (this.__v_isRef = !0), (this.__v_isReadonly = !0);
  }
  get value() {
    return this._getter();
  }
}
function Au(e, t, n) {
  return Re(e)
    ? e
    : X(e)
    ? new Ru(e)
    : fe(e) && arguments.length > 1
    ? Jo(e, t, n)
    : st(e);
}
function Jo(e, t, n) {
  const r = e[t];
  return Re(r) ? r : new Cu(e, t, n);
}
class ku {
  constructor(t, n, r, s) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this._dirty = !0),
      (this.effect = new cn(t, () => {
        this._dirty || ((this._dirty = !0), Ir(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !s),
      (this.__v_isReadonly = r);
  }
  get value() {
    const t = ie(this);
    return (
      qs(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function Tu(e, t, n = !1) {
  let r, s;
  const i = X(e);
  return (
    i ? ((r = e), (s = rt)) : ((r = e.get), (s = e.set)),
    new ku(r, s, i || !s, n)
  );
}
function Su(e, ...t) {}
function Mu(e, t) {}
function vt(e, t, n, r) {
  let s;
  try {
    s = r ? e(...r) : e();
  } catch (i) {
    Gt(i, t, n);
  }
  return s;
}
function qe(e, t, n, r) {
  if (X(e)) {
    const i = vt(e, t, n, r);
    return (
      i &&
        Ls(i) &&
        i.catch((o) => {
          Gt(o, t, n);
        }),
      i
    );
  }
  const s = [];
  for (let i = 0; i < e.length; i++) s.push(qe(e[i], t, n, r));
  return s;
}
function Gt(e, t, n, r = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let i = t.parent;
    const o = t.proxy,
      a = n;
    for (; i; ) {
      const u = i.ec;
      if (u) {
        for (let c = 0; c < u.length; c++) if (u[c](e, o, a) === !1) return;
      }
      i = i.parent;
    }
    const l = t.appContext.config.errorHandler;
    if (l) {
      vt(l, null, 10, [e, o, a]);
      return;
    }
  }
  Pu(e, n, s, r);
}
function Pu(e, t, n, r = !0) {
  console.error(e);
}
let Fn = !1,
  ps = !1;
const Oe = [];
let at = 0;
const ln = [];
let ht = null,
  Ft = 0;
const Xo = Promise.resolve();
let Ks = null;
function Lr(e) {
  const t = Ks || Xo;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function xu(e) {
  let t = at + 1,
    n = Oe.length;
  for (; t < n; ) {
    const r = (t + n) >>> 1,
      s = Oe[r],
      i = zn(s);
    i < e || (i === e && s.pre) ? (t = r + 1) : (n = r);
  }
  return t;
}
function Dr(e) {
  (!Oe.length || !Oe.includes(e, Fn && e.allowRecurse ? at + 1 : at)) &&
    (e.id == null ? Oe.push(e) : Oe.splice(xu(e.id), 0, e), Go());
}
function Go() {
  !Fn && !ps && ((ps = !0), (Ks = Xo.then(Zo)));
}
function Hu(e) {
  const t = Oe.indexOf(e);
  t > at && Oe.splice(t, 1);
}
function yr(e) {
  V(e)
    ? ln.push(...e)
    : (!ht || !ht.includes(e, e.allowRecurse ? Ft + 1 : Ft)) && ln.push(e),
    Go();
}
function ki(e, t = Fn ? at + 1 : 0) {
  for (; t < Oe.length; t++) {
    const n = Oe[t];
    n && n.pre && (Oe.splice(t, 1), t--, n());
  }
}
function wr(e) {
  if (ln.length) {
    const t = [...new Set(ln)];
    if (((ln.length = 0), ht)) {
      ht.push(...t);
      return;
    }
    for (ht = t, ht.sort((n, r) => zn(n) - zn(r)), Ft = 0; Ft < ht.length; Ft++)
      ht[Ft]();
    (ht = null), (Ft = 0);
  }
}
const zn = (e) => (e.id == null ? 1 / 0 : e.id),
  Ou = (e, t) => {
    const n = zn(e) - zn(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function Zo(e) {
  (ps = !1), (Fn = !0), Oe.sort(Ou);
  const t = rt;
  try {
    for (at = 0; at < Oe.length; at++) {
      const n = Oe[at];
      n && n.active !== !1 && vt(n, null, 14);
    }
  } finally {
    (at = 0),
      (Oe.length = 0),
      wr(),
      (Fn = !1),
      (Ks = null),
      (Oe.length || ln.length) && Zo();
  }
}
let tn,
  lr = [];
function el(e, t) {
  var n, r;
  (tn = e),
    tn
      ? ((tn.enabled = !0),
        lr.forEach(({ event: s, args: i }) => tn.emit(s, ...i)),
        (lr = []))
      : typeof window < "u" &&
        window.HTMLElement &&
        !(
          (r = (n = window.navigator) == null ? void 0 : n.userAgent) != null &&
          r.includes("jsdom")
        )
      ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ =
          t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((i) => {
          el(i, t);
        }),
        setTimeout(() => {
          tn || ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null), (lr = []));
        }, 3e3))
      : (lr = []);
}
function Iu(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || ce;
  let s = n;
  const i = t.startsWith("update:"),
    o = i && t.slice(7);
  if (o && o in r) {
    const c = `${o === "modelValue" ? "model" : o}Modifiers`,
      { number: f, trim: h } = r[c] || ce;
    h && (s = n.map((_) => (ve(_) ? _.trim() : _))), f && (s = n.map(vr));
  }
  let a,
    l = r[(a = Pn(t))] || r[(a = Pn($e(t)))];
  !l && i && (l = r[(a = Pn(Ye(t)))]), l && qe(l, e, 6, s);
  const u = r[a + "Once"];
  if (u) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[a]) return;
    (e.emitted[a] = !0), qe(u, e, 6, s);
  }
}
function tl(e, t, n = !1) {
  const r = t.emitsCache,
    s = r.get(e);
  if (s !== void 0) return s;
  const i = e.emits;
  let o = {},
    a = !1;
  if (!X(e)) {
    const l = (u) => {
      const c = tl(u, t, !0);
      c && ((a = !0), me(o, c));
    };
    !n && t.mixins.length && t.mixins.forEach(l),
      e.extends && l(e.extends),
      e.mixins && e.mixins.forEach(l);
  }
  return !i && !a
    ? (fe(e) && r.set(e, null), null)
    : (V(i) ? i.forEach((l) => (o[l] = null)) : me(o, i),
      fe(e) && r.set(e, o),
      o);
}
function Nr(e, t) {
  return !e || !Kn(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      oe(e, t[0].toLowerCase() + t.slice(1)) || oe(e, Ye(t)) || oe(e, t));
}
let Te = null,
  Br = null;
function jn(e) {
  const t = Te;
  return (Te = e), (Br = (e && e.type.__scopeId) || null), t;
}
function Jn(e) {
  Br = e;
}
function Xn() {
  Br = null;
}
const Lu = (e) => ye;
function ye(e, t = Te, n) {
  if (!t || e._n) return e;
  const r = (...s) => {
    r._d && ws(-1);
    const i = jn(t);
    let o;
    try {
      o = e(...s);
    } finally {
      jn(i), r._d && ws(1);
    }
    return o;
  };
  return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function pr(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: s,
    props: i,
    propsOptions: [o],
    slots: a,
    attrs: l,
    emit: u,
    render: c,
    renderCache: f,
    data: h,
    setupState: _,
    ctx: v,
    inheritAttrs: w,
  } = e;
  let S, A;
  const y = jn(e);
  try {
    if (n.shapeFlag & 4) {
      const g = s || r;
      (S = Ve(c.call(g, g, f, i, _, h, v))), (A = l);
    } else {
      const g = t;
      (S = Ve(
        g.length > 1 ? g(i, { attrs: l, slots: a, emit: u }) : g(i, null)
      )),
        (A = t.props ? l : Nu(l));
    }
  } catch (g) {
    (In.length = 0), Gt(g, e, 1), (S = ee(Ie));
  }
  let m = S;
  if (A && w !== !1) {
    const g = Object.keys(A),
      { shapeFlag: k } = m;
    g.length && k & 7 && (o && g.some(Os) && (A = Bu(A, o)), (m = ct(m, A)));
  }
  return (
    n.dirs && ((m = ct(m)), (m.dirs = m.dirs ? m.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (m.transition = n.transition),
    (S = m),
    jn(y),
    S
  );
}
function Du(e) {
  let t;
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    if (It(r)) {
      if (r.type !== Ie || r.children === "v-if") {
        if (t) return;
        t = r;
      }
    } else return;
  }
  return t;
}
const Nu = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || Kn(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  Bu = (e, t) => {
    const n = {};
    for (const r in e) (!Os(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n;
  };
function $u(e, t, n) {
  const { props: r, children: s, component: i } = e,
    { props: o, children: a, patchFlag: l } = t,
    u = i.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && l >= 0) {
    if (l & 1024) return !0;
    if (l & 16) return r ? Ti(r, o, u) : !!o;
    if (l & 8) {
      const c = t.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        const h = c[f];
        if (o[h] !== r[h] && !Nr(u, h)) return !0;
      }
    }
  } else
    return (s || a) && (!a || !a.$stable)
      ? !0
      : r === o
      ? !1
      : r
      ? o
        ? Ti(r, o, u)
        : !0
      : !!o;
  return !1;
}
function Ti(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let s = 0; s < r.length; s++) {
    const i = r[s];
    if (t[i] !== e[i] && !Nr(n, i)) return !0;
  }
  return !1;
}
function Qs({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const nl = (e) => e.__isSuspense,
  Fu = {
    name: "Suspense",
    __isSuspense: !0,
    process(e, t, n, r, s, i, o, a, l, u) {
      e == null ? ju(t, n, r, s, i, o, a, l, u) : Uu(e, t, n, r, s, o, a, l, u);
    },
    hydrate: Vu,
    create: Ys,
    normalize: qu,
  },
  zu = Fu;
function Un(e, t) {
  const n = e.props && e.props[t];
  X(n) && n();
}
function ju(e, t, n, r, s, i, o, a, l) {
  const {
      p: u,
      o: { createElement: c },
    } = l,
    f = c("div"),
    h = (e.suspense = Ys(e, s, r, t, f, n, i, o, a, l));
  u(null, (h.pendingBranch = e.ssContent), f, null, r, h, i, o),
    h.deps > 0
      ? (Un(e, "onPending"),
        Un(e, "onFallback"),
        u(null, e.ssFallback, t, n, r, null, i, o),
        an(h, e.ssFallback))
      : h.resolve(!1, !0);
}
function Uu(e, t, n, r, s, i, o, a, { p: l, um: u, o: { createElement: c } }) {
  const f = (t.suspense = e.suspense);
  (f.vnode = t), (t.el = e.el);
  const h = t.ssContent,
    _ = t.ssFallback,
    { activeBranch: v, pendingBranch: w, isInFallback: S, isHydrating: A } = f;
  if (w)
    (f.pendingBranch = h),
      nt(h, w)
        ? (l(w, h, f.hiddenContainer, null, s, f, i, o, a),
          f.deps <= 0
            ? f.resolve()
            : S && (l(v, _, n, r, s, null, i, o, a), an(f, _)))
        : (f.pendingId++,
          A ? ((f.isHydrating = !1), (f.activeBranch = w)) : u(w, s, f),
          (f.deps = 0),
          (f.effects.length = 0),
          (f.hiddenContainer = c("div")),
          S
            ? (l(null, h, f.hiddenContainer, null, s, f, i, o, a),
              f.deps <= 0
                ? f.resolve()
                : (l(v, _, n, r, s, null, i, o, a), an(f, _)))
            : v && nt(h, v)
            ? (l(v, h, n, r, s, f, i, o, a), f.resolve(!0))
            : (l(null, h, f.hiddenContainer, null, s, f, i, o, a),
              f.deps <= 0 && f.resolve()));
  else if (v && nt(h, v)) l(v, h, n, r, s, f, i, o, a), an(f, h);
  else if (
    (Un(t, "onPending"),
    (f.pendingBranch = h),
    f.pendingId++,
    l(null, h, f.hiddenContainer, null, s, f, i, o, a),
    f.deps <= 0)
  )
    f.resolve();
  else {
    const { timeout: y, pendingId: m } = f;
    y > 0
      ? setTimeout(() => {
          f.pendingId === m && f.fallback(_);
        }, y)
      : y === 0 && f.fallback(_);
  }
}
function Ys(e, t, n, r, s, i, o, a, l, u, c = !1) {
  const {
    p: f,
    m: h,
    um: _,
    n: v,
    o: { parentNode: w, remove: S },
  } = u;
  let A;
  const y = Wu(e);
  y && t != null && t.pendingBranch && ((A = t.pendingId), t.deps++);
  const m = e.props ? br(e.props.timeout) : void 0,
    g = {
      vnode: e,
      parent: t,
      parentComponent: n,
      isSVG: o,
      container: r,
      hiddenContainer: s,
      anchor: i,
      deps: 0,
      pendingId: 0,
      timeout: typeof m == "number" ? m : -1,
      activeBranch: null,
      pendingBranch: null,
      isInFallback: !0,
      isHydrating: c,
      isUnmounted: !1,
      effects: [],
      resolve(k = !1, B = !1) {
        const {
          vnode: L,
          activeBranch: P,
          pendingBranch: F,
          pendingId: O,
          effects: z,
          parentComponent: D,
          container: K,
        } = g;
        let re = !1;
        if (g.isHydrating) g.isHydrating = !1;
        else if (!k) {
          (re = P && F.transition && F.transition.mode === "out-in"),
            re &&
              (P.transition.afterLeave = () => {
                O === g.pendingId && (h(F, K, U, 0), yr(z));
              });
          let { anchor: U } = g;
          P && ((U = v(P)), _(P, D, g, !0)), re || h(F, K, U, 0);
        }
        an(g, F), (g.pendingBranch = null), (g.isInFallback = !1);
        let G = g.parent,
          j = !1;
        for (; G; ) {
          if (G.pendingBranch) {
            G.effects.push(...z), (j = !0);
            break;
          }
          G = G.parent;
        }
        !j && !re && yr(z),
          (g.effects = []),
          y &&
            t &&
            t.pendingBranch &&
            A === t.pendingId &&
            (t.deps--, t.deps === 0 && !B && t.resolve()),
          Un(L, "onResolve");
      },
      fallback(k) {
        if (!g.pendingBranch) return;
        const {
          vnode: B,
          activeBranch: L,
          parentComponent: P,
          container: F,
          isSVG: O,
        } = g;
        Un(B, "onFallback");
        const z = v(L),
          D = () => {
            g.isInFallback && (f(null, k, F, z, P, null, O, a, l), an(g, k));
          },
          K = k.transition && k.transition.mode === "out-in";
        K && (L.transition.afterLeave = D),
          (g.isInFallback = !0),
          _(L, P, null, !0),
          K || D();
      },
      move(k, B, L) {
        g.activeBranch && h(g.activeBranch, k, B, L), (g.container = k);
      },
      next() {
        return g.activeBranch && v(g.activeBranch);
      },
      registerDep(k, B) {
        const L = !!g.pendingBranch;
        L && g.deps++;
        const P = k.vnode.el;
        k.asyncDep
          .catch((F) => {
            Gt(F, k, 0);
          })
          .then((F) => {
            if (k.isUnmounted || g.isUnmounted || g.pendingId !== k.suspenseId)
              return;
            k.asyncResolved = !0;
            const { vnode: O } = k;
            Es(k, F, !1), P && (O.el = P);
            const z = !P && k.subTree.el;
            B(k, O, w(P || k.subTree.el), P ? null : v(k.subTree), g, o, l),
              z && S(z),
              Qs(k, O.el),
              L && --g.deps === 0 && g.resolve();
          });
      },
      unmount(k, B) {
        (g.isUnmounted = !0),
          g.activeBranch && _(g.activeBranch, n, k, B),
          g.pendingBranch && _(g.pendingBranch, n, k, B);
      },
    };
  return g;
}
function Vu(e, t, n, r, s, i, o, a, l) {
  const u = (t.suspense = Ys(
      t,
      r,
      n,
      e.parentNode,
      document.createElement("div"),
      null,
      s,
      i,
      o,
      a,
      !0
    )),
    c = l(e, (u.pendingBranch = t.ssContent), n, u, i, o);
  return u.deps === 0 && u.resolve(!1, !0), c;
}
function qu(e) {
  const { shapeFlag: t, children: n } = e,
    r = t & 32;
  (e.ssContent = Si(r ? n.default : n)),
    (e.ssFallback = r ? Si(n.fallback) : ee(Ie));
}
function Si(e) {
  let t;
  if (X(e)) {
    const n = Jt && e._c;
    n && ((e._d = !1), ne()), (e = e()), n && ((e._d = !0), (t = Be), Ol());
  }
  return (
    V(e) && (e = Du(e)),
    (e = Ve(e)),
    t && !e.dynamicChildren && (e.dynamicChildren = t.filter((n) => n !== e)),
    e
  );
}
function rl(e, t) {
  t && t.pendingBranch
    ? V(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : yr(e);
}
function an(e, t) {
  e.activeBranch = t;
  const { vnode: n, parentComponent: r } = e,
    s = (n.el = t.el);
  r && r.subTree === n && ((r.vnode.el = s), Qs(r, s));
}
function Wu(e) {
  var t;
  return (
    ((t = e.props) == null ? void 0 : t.suspensible) != null &&
    e.props.suspensible !== !1
  );
}
function Ku(e, t) {
  return Gn(e, null, t);
}
function sl(e, t) {
  return Gn(e, null, { flush: "post" });
}
function Qu(e, t) {
  return Gn(e, null, { flush: "sync" });
}
const ar = {};
function Mt(e, t, n) {
  return Gn(e, t, n);
}
function Gn(
  e,
  t,
  { immediate: n, deep: r, flush: s, onTrack: i, onTrigger: o } = ce
) {
  var a;
  const l = Lo() === ((a = Ce) == null ? void 0 : a.scope) ? Ce : null;
  let u,
    c = !1,
    f = !1;
  if (
    (Re(e)
      ? ((u = () => e.value), (c = Bn(e)))
      : Vt(e)
      ? ((u = () => e), (r = !0))
      : V(e)
      ? ((f = !0),
        (c = e.some((g) => Vt(g) || Bn(g))),
        (u = () =>
          e.map((g) => {
            if (Re(g)) return g.value;
            if (Vt(g)) return jt(g);
            if (X(g)) return vt(g, l, 2);
          })))
      : X(e)
      ? t
        ? (u = () => vt(e, l, 2))
        : (u = () => {
            if (!(l && l.isUnmounted)) return h && h(), qe(e, l, 3, [_]);
          })
      : (u = rt),
    t && r)
  ) {
    const g = u;
    u = () => jt(g());
  }
  let h,
    _ = (g) => {
      h = y.onStop = () => {
        vt(g, l, 4);
      };
    },
    v;
  if (hn)
    if (
      ((_ = rt),
      t ? n && qe(t, l, 3, [u(), f ? [] : void 0, _]) : u(),
      s === "sync")
    ) {
      const g = ql();
      v = g.__watcherHandles || (g.__watcherHandles = []);
    } else return rt;
  let w = f ? new Array(e.length).fill(ar) : ar;
  const S = () => {
    if (y.active)
      if (t) {
        const g = y.run();
        (r || c || (f ? g.some((k, B) => xt(k, w[B])) : xt(g, w))) &&
          (h && h(),
          qe(t, l, 3, [g, w === ar ? void 0 : f && w[0] === ar ? [] : w, _]),
          (w = g));
      } else y.run();
  };
  S.allowRecurse = !!t;
  let A;
  s === "sync"
    ? (A = S)
    : s === "post"
    ? (A = () => Pe(S, l && l.suspense))
    : ((S.pre = !0), l && (S.id = l.uid), (A = () => Dr(S)));
  const y = new cn(u, A);
  t
    ? n
      ? S()
      : (w = y.run())
    : s === "post"
    ? Pe(y.run.bind(y), l && l.suspense)
    : y.run();
  const m = () => {
    y.stop(), l && l.scope && Is(l.scope.effects, y);
  };
  return v && v.push(m), m;
}
function Yu(e, t, n) {
  const r = this.proxy,
    s = ve(e) ? (e.includes(".") ? il(r, e) : () => r[e]) : e.bind(r, r);
  let i;
  X(t) ? (i = t) : ((i = t.handler), (n = t));
  const o = Ce;
  Lt(this);
  const a = Gn(s, i.bind(r), n);
  return o ? Lt(o) : Pt(), a;
}
function il(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let s = 0; s < n.length && r; s++) r = r[n[s]];
    return r;
  };
}
function jt(e, t) {
  if (!fe(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), Re(e))) jt(e.value, t);
  else if (V(e)) for (let n = 0; n < e.length; n++) jt(e[n], t);
  else if (Xt(e) || sn(e))
    e.forEach((n) => {
      jt(n, t);
    });
  else if (xo(e)) for (const n in e) jt(e[n], t);
  return e;
}
function Ju(e, t) {
  const n = Te;
  if (n === null) return e;
  const r = Wr(n) || n.proxy,
    s = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [o, a, l, u = ce] = t[i];
    o &&
      (X(o) && (o = { mounted: o, updated: o }),
      o.deep && jt(a),
      s.push({
        dir: o,
        instance: r,
        value: a,
        oldValue: void 0,
        arg: l,
        modifiers: u,
      }));
  }
  return e;
}
function lt(e, t, n, r) {
  const s = e.dirs,
    i = t && t.dirs;
  for (let o = 0; o < s.length; o++) {
    const a = s[o];
    i && (a.oldValue = i[o].value);
    let l = a.dir[r];
    l && (_n(), qe(l, n, 8, [e.el, a, e, t]), yn());
  }
}
const At = Symbol("_leaveCb"),
  ur = Symbol("_enterCb");
function Js() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    tr(() => {
      e.isMounted = !0;
    }),
    jr(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const Ke = [Function, Array],
  Xs = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: Ke,
    onEnter: Ke,
    onAfterEnter: Ke,
    onEnterCancelled: Ke,
    onBeforeLeave: Ke,
    onLeave: Ke,
    onAfterLeave: Ke,
    onLeaveCancelled: Ke,
    onBeforeAppear: Ke,
    onAppear: Ke,
    onAfterAppear: Ke,
    onAppearCancelled: Ke,
  },
  Xu = {
    name: "BaseTransition",
    props: Xs,
    setup(e, { slots: t }) {
      const n = _t(),
        r = Js();
      let s;
      return () => {
        const i = t.default && $r(t.default(), !0);
        if (!i || !i.length) return;
        let o = i[0];
        if (i.length > 1) {
          for (const w of i)
            if (w.type !== Ie) {
              o = w;
              break;
            }
        }
        const a = ie(e),
          { mode: l } = a;
        if (r.isLeaving) return Xr(o);
        const u = Mi(o);
        if (!u) return Xr(o);
        const c = fn(u, a, r, n);
        Qt(u, c);
        const f = n.subTree,
          h = f && Mi(f);
        let _ = !1;
        const { getTransitionKey: v } = u.type;
        if (v) {
          const w = v();
          s === void 0 ? (s = w) : w !== s && ((s = w), (_ = !0));
        }
        if (h && h.type !== Ie && (!nt(u, h) || _)) {
          const w = fn(h, a, r, n);
          if ((Qt(h, w), l === "out-in"))
            return (
              (r.isLeaving = !0),
              (w.afterLeave = () => {
                (r.isLeaving = !1), n.update.active !== !1 && n.update();
              }),
              Xr(o)
            );
          l === "in-out" &&
            u.type !== Ie &&
            (w.delayLeave = (S, A, y) => {
              const m = ll(r, h);
              (m[String(h.key)] = h),
                (S[At] = () => {
                  A(), (S[At] = void 0), delete c.delayedLeave;
                }),
                (c.delayedLeave = y);
            });
        }
        return o;
      };
    },
  },
  ol = Xu;
function ll(e, t) {
  const { leavingVNodes: n } = e;
  let r = n.get(t.type);
  return r || ((r = Object.create(null)), n.set(t.type, r)), r;
}
function fn(e, t, n, r) {
  const {
      appear: s,
      mode: i,
      persisted: o = !1,
      onBeforeEnter: a,
      onEnter: l,
      onAfterEnter: u,
      onEnterCancelled: c,
      onBeforeLeave: f,
      onLeave: h,
      onAfterLeave: _,
      onLeaveCancelled: v,
      onBeforeAppear: w,
      onAppear: S,
      onAfterAppear: A,
      onAppearCancelled: y,
    } = t,
    m = String(e.key),
    g = ll(n, e),
    k = (P, F) => {
      P && qe(P, r, 9, F);
    },
    B = (P, F) => {
      const O = F[1];
      k(P, F),
        V(P) ? P.every((z) => z.length <= 1) && O() : P.length <= 1 && O();
    },
    L = {
      mode: i,
      persisted: o,
      beforeEnter(P) {
        let F = a;
        if (!n.isMounted)
          if (s) F = w || a;
          else return;
        P[At] && P[At](!0);
        const O = g[m];
        O && nt(e, O) && O.el[At] && O.el[At](), k(F, [P]);
      },
      enter(P) {
        let F = l,
          O = u,
          z = c;
        if (!n.isMounted)
          if (s) (F = S || l), (O = A || u), (z = y || c);
          else return;
        let D = !1;
        const K = (P[ur] = (re) => {
          D ||
            ((D = !0),
            re ? k(z, [P]) : k(O, [P]),
            L.delayedLeave && L.delayedLeave(),
            (P[ur] = void 0));
        });
        F ? B(F, [P, K]) : K();
      },
      leave(P, F) {
        const O = String(e.key);
        if ((P[ur] && P[ur](!0), n.isUnmounting)) return F();
        k(f, [P]);
        let z = !1;
        const D = (P[At] = (K) => {
          z ||
            ((z = !0),
            F(),
            K ? k(v, [P]) : k(_, [P]),
            (P[At] = void 0),
            g[O] === e && delete g[O]);
        });
        (g[O] = e), h ? B(h, [P, D]) : D();
      },
      clone(P) {
        return fn(P, t, n, r);
      },
    };
  return L;
}
function Xr(e) {
  if (er(e)) return (e = ct(e)), (e.children = null), e;
}
function Mi(e) {
  return er(e) ? (e.children ? e.children[0] : void 0) : e;
}
function Qt(e, t) {
  e.shapeFlag & 6 && e.component
    ? Qt(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t);
}
function $r(e, t = !1, n) {
  let r = [],
    s = 0;
  for (let i = 0; i < e.length; i++) {
    let o = e[i];
    const a = n == null ? o.key : String(n) + String(o.key != null ? o.key : i);
    o.type === _e
      ? (o.patchFlag & 128 && s++, (r = r.concat($r(o.children, t, a))))
      : (t || o.type !== Ie) && r.push(a != null ? ct(o, { key: a }) : o);
  }
  if (s > 1) for (let i = 0; i < r.length; i++) r[i].patchFlag = -2;
  return r;
}
/*! #__NO_SIDE_EFFECTS__ */ function Zn(e, t) {
  return X(e) ? (() => me({ name: e.name }, t, { setup: e }))() : e;
}
const qt = (e) => !!e.type.__asyncLoader;
/*! #__NO_SIDE_EFFECTS__ */ function Gu(e) {
  X(e) && (e = { loader: e });
  const {
    loader: t,
    loadingComponent: n,
    errorComponent: r,
    delay: s = 200,
    timeout: i,
    suspensible: o = !0,
    onError: a,
  } = e;
  let l = null,
    u,
    c = 0;
  const f = () => (c++, (l = null), h()),
    h = () => {
      let _;
      return (
        l ||
        (_ = l =
          t()
            .catch((v) => {
              if (((v = v instanceof Error ? v : new Error(String(v))), a))
                return new Promise((w, S) => {
                  a(
                    v,
                    () => w(f()),
                    () => S(v),
                    c + 1
                  );
                });
              throw v;
            })
            .then((v) =>
              _ !== l && l
                ? l
                : (v &&
                    (v.__esModule || v[Symbol.toStringTag] === "Module") &&
                    (v = v.default),
                  (u = v),
                  v)
            ))
      );
    };
  return Zn({
    name: "AsyncComponentWrapper",
    __asyncLoader: h,
    get __asyncResolved() {
      return u;
    },
    setup() {
      const _ = Ce;
      if (u) return () => Gr(u, _);
      const v = (y) => {
        (l = null), Gt(y, _, 13, !r);
      };
      if ((o && _.suspense) || hn)
        return h()
          .then((y) => () => Gr(y, _))
          .catch((y) => (v(y), () => (r ? ee(r, { error: y }) : null)));
      const w = st(!1),
        S = st(),
        A = st(!!s);
      return (
        s &&
          setTimeout(() => {
            A.value = !1;
          }, s),
        i != null &&
          setTimeout(() => {
            if (!w.value && !S.value) {
              const y = new Error(`Async component timed out after ${i}ms.`);
              v(y), (S.value = y);
            }
          }, i),
        h()
          .then(() => {
            (w.value = !0),
              _.parent && er(_.parent.vnode) && Dr(_.parent.update);
          })
          .catch((y) => {
            v(y), (S.value = y);
          }),
        () => {
          if (w.value && u) return Gr(u, _);
          if (S.value && r) return ee(r, { error: S.value });
          if (n && !A.value) return ee(n);
        }
      );
    },
  });
}
function Gr(e, t) {
  const { ref: n, props: r, children: s, ce: i } = t.vnode,
    o = ee(e, r, s);
  return (o.ref = n), (o.ce = i), delete t.vnode.ce, o;
}
const er = (e) => e.type.__isKeepAlive,
  Zu = {
    name: "KeepAlive",
    __isKeepAlive: !0,
    props: {
      include: [String, RegExp, Array],
      exclude: [String, RegExp, Array],
      max: [String, Number],
    },
    setup(e, { slots: t }) {
      const n = _t(),
        r = n.ctx;
      if (!r.renderer)
        return () => {
          const y = t.default && t.default();
          return y && y.length === 1 ? y[0] : y;
        };
      const s = new Map(),
        i = new Set();
      let o = null;
      const a = n.suspense,
        {
          renderer: {
            p: l,
            m: u,
            um: c,
            o: { createElement: f },
          },
        } = r,
        h = f("div");
      (r.activate = (y, m, g, k, B) => {
        const L = y.component;
        u(y, m, g, 0, a),
          l(L.vnode, y, m, g, L, a, k, y.slotScopeIds, B),
          Pe(() => {
            (L.isDeactivated = !1), L.a && on(L.a);
            const P = y.props && y.props.onVnodeMounted;
            P && Ne(P, L.parent, y);
          }, a);
      }),
        (r.deactivate = (y) => {
          const m = y.component;
          u(y, h, null, 1, a),
            Pe(() => {
              m.da && on(m.da);
              const g = y.props && y.props.onVnodeUnmounted;
              g && Ne(g, m.parent, y), (m.isDeactivated = !0);
            }, a);
        });
      function _(y) {
        Zr(y), c(y, n, a, !0);
      }
      function v(y) {
        s.forEach((m, g) => {
          const k = Rs(m.type);
          k && (!y || !y(k)) && w(g);
        });
      }
      function w(y) {
        const m = s.get(y);
        !o || !nt(m, o) ? _(m) : o && Zr(o), s.delete(y), i.delete(y);
      }
      Mt(
        () => [e.include, e.exclude],
        ([y, m]) => {
          y && v((g) => Tn(y, g)), m && v((g) => !Tn(m, g));
        },
        { flush: "post", deep: !0 }
      );
      let S = null;
      const A = () => {
        S != null && s.set(S, es(n.subTree));
      };
      return (
        tr(A),
        zr(A),
        jr(() => {
          s.forEach((y) => {
            const { subTree: m, suspense: g } = n,
              k = es(m);
            if (y.type === k.type && y.key === k.key) {
              Zr(k);
              const B = k.component.da;
              B && Pe(B, g);
              return;
            }
            _(y);
          });
        }),
        () => {
          if (((S = null), !t.default)) return null;
          const y = t.default(),
            m = y[0];
          if (y.length > 1) return (o = null), y;
          if (!It(m) || (!(m.shapeFlag & 4) && !(m.shapeFlag & 128)))
            return (o = null), m;
          let g = es(m);
          const k = g.type,
            B = Rs(qt(g) ? g.type.__asyncResolved || {} : k),
            { include: L, exclude: P, max: F } = e;
          if ((L && (!B || !Tn(L, B))) || (P && B && Tn(P, B)))
            return (o = g), m;
          const O = g.key == null ? k : g.key,
            z = s.get(O);
          return (
            g.el && ((g = ct(g)), m.shapeFlag & 128 && (m.ssContent = g)),
            (S = O),
            z
              ? ((g.el = z.el),
                (g.component = z.component),
                g.transition && Qt(g, g.transition),
                (g.shapeFlag |= 512),
                i.delete(O),
                i.add(O))
              : (i.add(O),
                F && i.size > parseInt(F, 10) && w(i.values().next().value)),
            (g.shapeFlag |= 256),
            (o = g),
            nl(m.type) ? m : g
          );
        }
      );
    },
  },
  ec = Zu;
function Tn(e, t) {
  return V(e)
    ? e.some((n) => Tn(n, t))
    : ve(e)
    ? e.split(",").includes(t)
    : Pa(e)
    ? e.test(t)
    : !1;
}
function al(e, t) {
  cl(e, "a", t);
}
function ul(e, t) {
  cl(e, "da", t);
}
function cl(e, t, n = Ce) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let s = n;
      for (; s; ) {
        if (s.isDeactivated) return;
        s = s.parent;
      }
      return e();
    });
  if ((Fr(t, r, n), n)) {
    let s = n.parent;
    for (; s && s.parent; )
      er(s.parent.vnode) && tc(r, t, n, s), (s = s.parent);
  }
}
function tc(e, t, n, r) {
  const s = Fr(t, e, r, !0);
  Ur(() => {
    Is(r[t], s);
  }, n);
}
function Zr(e) {
  (e.shapeFlag &= -257), (e.shapeFlag &= -513);
}
function es(e) {
  return e.shapeFlag & 128 ? e.ssContent : e;
}
function Fr(e, t, n = Ce, r = !1) {
  if (n) {
    const s = n[e] || (n[e] = []),
      i =
        t.__weh ||
        (t.__weh = (...o) => {
          if (n.isUnmounted) return;
          _n(), Lt(n);
          const a = qe(t, n, e, o);
          return Pt(), yn(), a;
        });
    return r ? s.unshift(i) : s.push(i), i;
  }
}
const bt =
    (e) =>
    (t, n = Ce) =>
      (!hn || e === "sp") && Fr(e, (...r) => t(...r), n),
  fl = bt("bm"),
  tr = bt("m"),
  dl = bt("bu"),
  zr = bt("u"),
  jr = bt("bum"),
  Ur = bt("um"),
  hl = bt("sp"),
  pl = bt("rtg"),
  gl = bt("rtc");
function ml(e, t = Ce) {
  Fr("ec", e, t);
}
const Gs = "components",
  nc = "directives";
function Vr(e, t) {
  return Zs(Gs, e, !0, t) || e;
}
const vl = Symbol.for("v-ndc");
function bl(e) {
  return ve(e) ? Zs(Gs, e, !1) || e : e || vl;
}
function rc(e) {
  return Zs(nc, e);
}
function Zs(e, t, n = !0, r = !1) {
  const s = Te || Ce;
  if (s) {
    const i = s.type;
    if (e === Gs) {
      const a = Rs(i, !1);
      if (a && (a === t || a === $e(t) || a === Qn($e(t)))) return i;
    }
    const o = Pi(s[e] || i[e], t) || Pi(s.appContext[e], t);
    return !o && r ? i : o;
  }
}
function Pi(e, t) {
  return e && (e[t] || e[$e(t)] || e[Qn($e(t))]);
}
function dn(e, t, n, r) {
  let s;
  const i = n && n[r];
  if (V(e) || ve(e)) {
    s = new Array(e.length);
    for (let o = 0, a = e.length; o < a; o++)
      s[o] = t(e[o], o, void 0, i && i[o]);
  } else if (typeof e == "number") {
    s = new Array(e);
    for (let o = 0; o < e; o++) s[o] = t(o + 1, o, void 0, i && i[o]);
  } else if (fe(e))
    if (e[Symbol.iterator])
      s = Array.from(e, (o, a) => t(o, a, void 0, i && i[a]));
    else {
      const o = Object.keys(e);
      s = new Array(o.length);
      for (let a = 0, l = o.length; a < l; a++) {
        const u = o[a];
        s[a] = t(e[u], u, a, i && i[a]);
      }
    }
  else s = [];
  return n && (n[r] = s), s;
}
function sc(e, t) {
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    if (V(r)) for (let s = 0; s < r.length; s++) e[r[s].name] = r[s].fn;
    else
      r &&
        (e[r.name] = r.key
          ? (...s) => {
              const i = r.fn(...s);
              return i && (i.key = r.key), i;
            }
          : r.fn);
  }
  return e;
}
function ic(e, t, n = {}, r, s) {
  if (Te.isCE || (Te.parent && qt(Te.parent) && Te.parent.isCE))
    return t !== "default" && (n.name = t), ee("slot", n, r && r());
  let i = e[t];
  i && i._c && (i._d = !1), ne();
  const o = i && _l(i(n)),
    a = Je(
      _e,
      { key: n.key || (o && o.key) || `_${t}` },
      o || (r ? r() : []),
      o && e._ === 1 ? 64 : -2
    );
  return (
    !s && a.scopeId && (a.slotScopeIds = [a.scopeId + "-s"]),
    i && i._c && (i._d = !0),
    a
  );
}
function _l(e) {
  return e.some((t) =>
    It(t) ? !(t.type === Ie || (t.type === _e && !_l(t.children))) : !0
  )
    ? e
    : null;
}
function oc(e, t) {
  const n = {};
  for (const r in e) n[t && /[A-Z]/.test(r) ? `on:${r}` : Pn(r)] = e[r];
  return n;
}
const gs = (e) => (e ? (Fl(e) ? Wr(e) || e.proxy : gs(e.parent)) : null),
  xn = me(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => gs(e.parent),
    $root: (e) => gs(e.root),
    $emit: (e) => e.emit,
    $options: (e) => ei(e),
    $forceUpdate: (e) => e.f || (e.f = () => Dr(e.update)),
    $nextTick: (e) => e.n || (e.n = Lr.bind(e.proxy)),
    $watch: (e) => Yu.bind(e),
  }),
  ts = (e, t) => e !== ce && !e.__isScriptSetup && oe(e, t),
  ms = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: r,
        data: s,
        props: i,
        accessCache: o,
        type: a,
        appContext: l,
      } = e;
      let u;
      if (t[0] !== "$") {
        const _ = o[t];
        if (_ !== void 0)
          switch (_) {
            case 1:
              return r[t];
            case 2:
              return s[t];
            case 4:
              return n[t];
            case 3:
              return i[t];
          }
        else {
          if (ts(r, t)) return (o[t] = 1), r[t];
          if (s !== ce && oe(s, t)) return (o[t] = 2), s[t];
          if ((u = e.propsOptions[0]) && oe(u, t)) return (o[t] = 3), i[t];
          if (n !== ce && oe(n, t)) return (o[t] = 4), n[t];
          vs && (o[t] = 0);
        }
      }
      const c = xn[t];
      let f, h;
      if (c) return t === "$attrs" && Fe(e, "get", t), c(e);
      if ((f = a.__cssModules) && (f = f[t])) return f;
      if (n !== ce && oe(n, t)) return (o[t] = 4), n[t];
      if (((h = l.config.globalProperties), oe(h, t))) return h[t];
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: s, ctx: i } = e;
      return ts(s, t)
        ? ((s[t] = n), !0)
        : r !== ce && oe(r, t)
        ? ((r[t] = n), !0)
        : oe(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((i[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: r,
          appContext: s,
          propsOptions: i,
        },
      },
      o
    ) {
      let a;
      return (
        !!n[o] ||
        (e !== ce && oe(e, o)) ||
        ts(t, o) ||
        ((a = i[0]) && oe(a, o)) ||
        oe(r, o) ||
        oe(xn, o) ||
        oe(s.config.globalProperties, o)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : oe(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  },
  lc = me({}, ms, {
    get(e, t) {
      if (t !== Symbol.unscopables) return ms.get(e, t, e);
    },
    has(e, t) {
      return t[0] !== "_" && !La(t);
    },
  });
function ac() {
  return null;
}
function uc() {
  return null;
}
function cc(e) {}
function fc(e) {}
function dc() {
  return null;
}
function hc() {}
function pc(e, t) {
  return null;
}
function gc() {
  return yl().slots;
}
function mc() {
  return yl().attrs;
}
function vc(e, t, n) {
  const r = _t();
  if (n && n.local) {
    const s = st(e[t]);
    return (
      Mt(
        () => e[t],
        (i) => (s.value = i)
      ),
      Mt(s, (i) => {
        i !== e[t] && r.emit(`update:${t}`, i);
      }),
      s
    );
  } else
    return {
      __v_isRef: !0,
      get value() {
        return e[t];
      },
      set value(s) {
        r.emit(`update:${t}`, s);
      },
    };
}
function yl() {
  const e = _t();
  return e.setupContext || (e.setupContext = Ul(e));
}
function Vn(e) {
  return V(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
function bc(e, t) {
  const n = Vn(e);
  for (const r in t) {
    if (r.startsWith("__skip")) continue;
    let s = n[r];
    s
      ? V(s) || X(s)
        ? (s = n[r] = { type: s, default: t[r] })
        : (s.default = t[r])
      : s === null && (s = n[r] = { default: t[r] }),
      s && t[`__skip_${r}`] && (s.skipFactory = !0);
  }
  return n;
}
function _c(e, t) {
  return !e || !t ? e || t : V(e) && V(t) ? e.concat(t) : me({}, Vn(e), Vn(t));
}
function yc(e, t) {
  const n = {};
  for (const r in e)
    t.includes(r) ||
      Object.defineProperty(n, r, { enumerable: !0, get: () => e[r] });
  return n;
}
function wc(e) {
  const t = _t();
  let n = e();
  return (
    Pt(),
    Ls(n) &&
      (n = n.catch((r) => {
        throw (Lt(t), r);
      })),
    [n, () => Lt(t)]
  );
}
let vs = !0;
function Ec(e) {
  const t = ei(e),
    n = e.proxy,
    r = e.ctx;
  (vs = !1), t.beforeCreate && xi(t.beforeCreate, e, "bc");
  const {
    data: s,
    computed: i,
    methods: o,
    watch: a,
    provide: l,
    inject: u,
    created: c,
    beforeMount: f,
    mounted: h,
    beforeUpdate: _,
    updated: v,
    activated: w,
    deactivated: S,
    beforeDestroy: A,
    beforeUnmount: y,
    destroyed: m,
    unmounted: g,
    render: k,
    renderTracked: B,
    renderTriggered: L,
    errorCaptured: P,
    serverPrefetch: F,
    expose: O,
    inheritAttrs: z,
    components: D,
    directives: K,
    filters: re,
  } = t;
  if ((u && Cc(u, r, null), o))
    for (const U in o) {
      const W = o[U];
      X(W) && (r[U] = W.bind(n));
    }
  if (s) {
    const U = s.call(n, n);
    fe(U) && (e.data = Yn(U));
  }
  if (((vs = !0), i))
    for (const U in i) {
      const W = i[U],
        Ae = X(W) ? W.bind(n, n) : X(W.get) ? W.get.bind(n, n) : rt,
        ke = !X(W) && X(W.set) ? W.set.bind(n) : rt,
        pe = Xe({ get: Ae, set: ke });
      Object.defineProperty(r, U, {
        enumerable: !0,
        configurable: !0,
        get: () => pe.value,
        set: (ae) => (pe.value = ae),
      });
    }
  if (a) for (const U in a) wl(a[U], r, n, U);
  if (l) {
    const U = X(l) ? l.call(n) : l;
    Reflect.ownKeys(U).forEach((W) => {
      Hn(W, U[W]);
    });
  }
  c && xi(c, e, "c");
  function j(U, W) {
    V(W) ? W.forEach((Ae) => U(Ae.bind(n))) : W && U(W.bind(n));
  }
  if (
    (j(fl, f),
    j(tr, h),
    j(dl, _),
    j(zr, v),
    j(al, w),
    j(ul, S),
    j(ml, P),
    j(gl, B),
    j(pl, L),
    j(jr, y),
    j(Ur, g),
    j(hl, F),
    V(O))
  )
    if (O.length) {
      const U = e.exposed || (e.exposed = {});
      O.forEach((W) => {
        Object.defineProperty(U, W, {
          get: () => n[W],
          set: (Ae) => (n[W] = Ae),
        });
      });
    } else e.exposed || (e.exposed = {});
  k && e.render === rt && (e.render = k),
    z != null && (e.inheritAttrs = z),
    D && (e.components = D),
    K && (e.directives = K);
}
function Cc(e, t, n = rt) {
  V(e) && (e = bs(e));
  for (const r in e) {
    const s = e[r];
    let i;
    fe(s)
      ? "default" in s
        ? (i = ut(s.from || r, s.default, !0))
        : (i = ut(s.from || r))
      : (i = ut(s)),
      Re(i)
        ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: (o) => (i.value = o),
          })
        : (t[r] = i);
  }
}
function xi(e, t, n) {
  qe(V(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function wl(e, t, n, r) {
  const s = r.includes(".") ? il(n, r) : () => n[r];
  if (ve(e)) {
    const i = t[e];
    X(i) && Mt(s, i);
  } else if (X(e)) Mt(s, e.bind(n));
  else if (fe(e))
    if (V(e)) e.forEach((i) => wl(i, t, n, r));
    else {
      const i = X(e.handler) ? e.handler.bind(n) : t[e.handler];
      X(i) && Mt(s, i, e);
    }
}
function ei(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: s,
      optionsCache: i,
      config: { optionMergeStrategies: o },
    } = e.appContext,
    a = i.get(t);
  let l;
  return (
    a
      ? (l = a)
      : !s.length && !n && !r
      ? (l = t)
      : ((l = {}), s.length && s.forEach((u) => Er(l, u, o, !0)), Er(l, t, o)),
    fe(t) && i.set(t, l),
    l
  );
}
function Er(e, t, n, r = !1) {
  const { mixins: s, extends: i } = t;
  i && Er(e, i, n, !0), s && s.forEach((o) => Er(e, o, n, !0));
  for (const o in t)
    if (!(r && o === "expose")) {
      const a = Rc[o] || (n && n[o]);
      e[o] = a ? a(e[o], t[o]) : t[o];
    }
  return e;
}
const Rc = {
  data: Hi,
  props: Oi,
  emits: Oi,
  methods: Sn,
  computed: Sn,
  beforeCreate: Le,
  created: Le,
  beforeMount: Le,
  mounted: Le,
  beforeUpdate: Le,
  updated: Le,
  beforeDestroy: Le,
  beforeUnmount: Le,
  destroyed: Le,
  unmounted: Le,
  activated: Le,
  deactivated: Le,
  errorCaptured: Le,
  serverPrefetch: Le,
  components: Sn,
  directives: Sn,
  watch: kc,
  provide: Hi,
  inject: Ac,
};
function Hi(e, t) {
  return t
    ? e
      ? function () {
          return me(
            X(e) ? e.call(this, this) : e,
            X(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function Ac(e, t) {
  return Sn(bs(e), bs(t));
}
function bs(e) {
  if (V(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Le(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Sn(e, t) {
  return e ? me(Object.create(null), e, t) : t;
}
function Oi(e, t) {
  return e
    ? V(e) && V(t)
      ? [...new Set([...e, ...t])]
      : me(Object.create(null), Vn(e), Vn(t ?? {}))
    : t;
}
function kc(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = me(Object.create(null), e);
  for (const r in t) n[r] = Le(e[r], t[r]);
  return n;
}
function El() {
  return {
    app: null,
    config: {
      isNativeTag: Ta,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let Tc = 0;
function Sc(e, t) {
  return function (r, s = null) {
    X(r) || (r = me({}, r)), s != null && !fe(s) && (s = null);
    const i = El(),
      o = new WeakSet();
    let a = !1;
    const l = (i.app = {
      _uid: Tc++,
      _component: r,
      _props: s,
      _container: null,
      _context: i,
      _instance: null,
      version: Kl,
      get config() {
        return i.config;
      },
      set config(u) {},
      use(u, ...c) {
        return (
          o.has(u) ||
            (u && X(u.install)
              ? (o.add(u), u.install(l, ...c))
              : X(u) && (o.add(u), u(l, ...c))),
          l
        );
      },
      mixin(u) {
        return i.mixins.includes(u) || i.mixins.push(u), l;
      },
      component(u, c) {
        return c ? ((i.components[u] = c), l) : i.components[u];
      },
      directive(u, c) {
        return c ? ((i.directives[u] = c), l) : i.directives[u];
      },
      mount(u, c, f) {
        if (!a) {
          const h = ee(r, s);
          return (
            (h.appContext = i),
            c && t ? t(h, u) : e(h, u, f),
            (a = !0),
            (l._container = u),
            (u.__vue_app__ = l),
            Wr(h.component) || h.component.proxy
          );
        }
      },
      unmount() {
        a && (e(null, l._container), delete l._container.__vue_app__);
      },
      provide(u, c) {
        return (i.provides[u] = c), l;
      },
      runWithContext(u) {
        qn = l;
        try {
          return u();
        } finally {
          qn = null;
        }
      },
    });
    return l;
  };
}
let qn = null;
function Hn(e, t) {
  if (Ce) {
    let n = Ce.provides;
    const r = Ce.parent && Ce.parent.provides;
    r === n && (n = Ce.provides = Object.create(r)), (n[e] = t);
  }
}
function ut(e, t, n = !1) {
  const r = Ce || Te;
  if (r || qn) {
    const s = r
      ? r.parent == null
        ? r.vnode.appContext && r.vnode.appContext.provides
        : r.parent.provides
      : qn._context.provides;
    if (s && e in s) return s[e];
    if (arguments.length > 1) return n && X(t) ? t.call(r && r.proxy) : t;
  }
}
function Mc() {
  return !!(Ce || Te || qn);
}
function Pc(e, t, n, r = !1) {
  const s = {},
    i = {};
  mr(i, qr, 1), (e.propsDefaults = Object.create(null)), Cl(e, t, s, i);
  for (const o in e.propsOptions[0]) o in s || (s[o] = void 0);
  n ? (e.props = r ? s : Fs(s)) : e.type.props ? (e.props = s) : (e.props = i),
    (e.attrs = i);
}
function xc(e, t, n, r) {
  const {
      props: s,
      attrs: i,
      vnode: { patchFlag: o },
    } = e,
    a = ie(s),
    [l] = e.propsOptions;
  let u = !1;
  if ((r || o > 0) && !(o & 16)) {
    if (o & 8) {
      const c = e.vnode.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        let h = c[f];
        if (Nr(e.emitsOptions, h)) continue;
        const _ = t[h];
        if (l)
          if (oe(i, h)) _ !== i[h] && ((i[h] = _), (u = !0));
          else {
            const v = $e(h);
            s[v] = _s(l, a, v, _, e, !1);
          }
        else _ !== i[h] && ((i[h] = _), (u = !0));
      }
    }
  } else {
    Cl(e, t, s, i) && (u = !0);
    let c;
    for (const f in a)
      (!t || (!oe(t, f) && ((c = Ye(f)) === f || !oe(t, c)))) &&
        (l
          ? n &&
            (n[f] !== void 0 || n[c] !== void 0) &&
            (s[f] = _s(l, a, f, void 0, e, !0))
          : delete s[f]);
    if (i !== a)
      for (const f in i) (!t || !oe(t, f)) && (delete i[f], (u = !0));
  }
  u && gt(e, "set", "$attrs");
}
function Cl(e, t, n, r) {
  const [s, i] = e.propsOptions;
  let o = !1,
    a;
  if (t)
    for (let l in t) {
      if (Mn(l)) continue;
      const u = t[l];
      let c;
      s && oe(s, (c = $e(l)))
        ? !i || !i.includes(c)
          ? (n[c] = u)
          : ((a || (a = {}))[c] = u)
        : Nr(e.emitsOptions, l) ||
          ((!(l in r) || u !== r[l]) && ((r[l] = u), (o = !0)));
    }
  if (i) {
    const l = ie(n),
      u = a || ce;
    for (let c = 0; c < i.length; c++) {
      const f = i[c];
      n[f] = _s(s, l, f, u[f], e, !oe(u, f));
    }
  }
  return o;
}
function _s(e, t, n, r, s, i) {
  const o = e[n];
  if (o != null) {
    const a = oe(o, "default");
    if (a && r === void 0) {
      const l = o.default;
      if (o.type !== Function && !o.skipFactory && X(l)) {
        const { propsDefaults: u } = s;
        n in u ? (r = u[n]) : (Lt(s), (r = u[n] = l.call(null, t)), Pt());
      } else r = l;
    }
    o[0] &&
      (i && !a ? (r = !1) : o[1] && (r === "" || r === Ye(n)) && (r = !0));
  }
  return r;
}
function Rl(e, t, n = !1) {
  const r = t.propsCache,
    s = r.get(e);
  if (s) return s;
  const i = e.props,
    o = {},
    a = [];
  let l = !1;
  if (!X(e)) {
    const c = (f) => {
      l = !0;
      const [h, _] = Rl(f, t, !0);
      me(o, h), _ && a.push(..._);
    };
    !n && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c);
  }
  if (!i && !l) return fe(e) && r.set(e, rn), rn;
  if (V(i))
    for (let c = 0; c < i.length; c++) {
      const f = $e(i[c]);
      Ii(f) && (o[f] = ce);
    }
  else if (i)
    for (const c in i) {
      const f = $e(c);
      if (Ii(f)) {
        const h = i[c],
          _ = (o[f] = V(h) || X(h) ? { type: h } : me({}, h));
        if (_) {
          const v = Ni(Boolean, _.type),
            w = Ni(String, _.type);
          (_[0] = v > -1),
            (_[1] = w < 0 || v < w),
            (v > -1 || oe(_, "default")) && a.push(f);
        }
      }
    }
  const u = [o, a];
  return fe(e) && r.set(e, u), u;
}
function Ii(e) {
  return e[0] !== "$";
}
function Li(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function Di(e, t) {
  return Li(e) === Li(t);
}
function Ni(e, t) {
  return V(t) ? t.findIndex((n) => Di(n, e)) : X(t) && Di(t, e) ? 0 : -1;
}
const Al = (e) => e[0] === "_" || e === "$stable",
  ti = (e) => (V(e) ? e.map(Ve) : [Ve(e)]),
  Hc = (e, t, n) => {
    if (t._n) return t;
    const r = ye((...s) => ti(t(...s)), n);
    return (r._c = !1), r;
  },
  kl = (e, t, n) => {
    const r = e._ctx;
    for (const s in e) {
      if (Al(s)) continue;
      const i = e[s];
      if (X(i)) t[s] = Hc(s, i, r);
      else if (i != null) {
        const o = ti(i);
        t[s] = () => o;
      }
    }
  },
  Tl = (e, t) => {
    const n = ti(t);
    e.slots.default = () => n;
  },
  Oc = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = ie(t)), mr(t, "_", n)) : kl(t, (e.slots = {}));
    } else (e.slots = {}), t && Tl(e, t);
    mr(e.slots, qr, 1);
  },
  Ic = (e, t, n) => {
    const { vnode: r, slots: s } = e;
    let i = !0,
      o = ce;
    if (r.shapeFlag & 32) {
      const a = t._;
      a
        ? n && a === 1
          ? (i = !1)
          : (me(s, t), !n && a === 1 && delete s._)
        : ((i = !t.$stable), kl(t, s)),
        (o = t);
    } else t && (Tl(e, t), (o = { default: 1 }));
    if (i) for (const a in s) !Al(a) && o[a] == null && delete s[a];
  };
function Cr(e, t, n, r, s = !1) {
  if (V(e)) {
    e.forEach((h, _) => Cr(h, t && (V(t) ? t[_] : t), n, r, s));
    return;
  }
  if (qt(r) && !s) return;
  const i = r.shapeFlag & 4 ? Wr(r.component) || r.component.proxy : r.el,
    o = s ? null : i,
    { i: a, r: l } = e,
    u = t && t.r,
    c = a.refs === ce ? (a.refs = {}) : a.refs,
    f = a.setupState;
  if (
    (u != null &&
      u !== l &&
      (ve(u)
        ? ((c[u] = null), oe(f, u) && (f[u] = null))
        : Re(u) && (u.value = null)),
    X(l))
  )
    vt(l, a, 12, [o, c]);
  else {
    const h = ve(l),
      _ = Re(l);
    if (h || _) {
      const v = () => {
        if (e.f) {
          const w = h ? (oe(f, l) ? f[l] : c[l]) : l.value;
          s
            ? V(w) && Is(w, i)
            : V(w)
            ? w.includes(i) || w.push(i)
            : h
            ? ((c[l] = [i]), oe(f, l) && (f[l] = c[l]))
            : ((l.value = [i]), e.k && (c[e.k] = l.value));
        } else
          h
            ? ((c[l] = o), oe(f, l) && (f[l] = o))
            : _ && ((l.value = o), e.k && (c[e.k] = o));
      };
      o ? ((v.id = -1), Pe(v, n)) : v();
    }
  }
}
let wt = !1;
const cr = (e) => /svg/.test(e.namespaceURI) && e.tagName !== "foreignObject",
  fr = (e) => e.nodeType === 8;
function Lc(e) {
  const {
      mt: t,
      p: n,
      o: {
        patchProp: r,
        createText: s,
        nextSibling: i,
        parentNode: o,
        remove: a,
        insert: l,
        createComment: u,
      },
    } = e,
    c = (m, g) => {
      if (!g.hasChildNodes()) {
        n(null, m, g), wr(), (g._vnode = m);
        return;
      }
      (wt = !1),
        f(g.firstChild, m, null, null, null),
        wr(),
        (g._vnode = m),
        wt && console.error("Hydration completed but contains mismatches.");
    },
    f = (m, g, k, B, L, P = !1) => {
      const F = fr(m) && m.data === "[",
        O = () => w(m, g, k, B, L, F),
        { type: z, ref: D, shapeFlag: K, patchFlag: re } = g;
      let G = m.nodeType;
      (g.el = m), re === -2 && ((P = !1), (g.dynamicChildren = null));
      let j = null;
      switch (z) {
        case Yt:
          G !== 3
            ? g.children === ""
              ? (l((g.el = s("")), o(m), m), (j = m))
              : (j = O())
            : (m.data !== g.children && ((wt = !0), (m.data = g.children)),
              (j = i(m)));
          break;
        case Ie:
          if (G !== 8 || F)
            if (m.tagName.toLowerCase() === "template") {
              const U = g.el.content.firstChild;
              A(U, m, k), (g.el = m = U), (j = i(m));
            } else j = O();
          else j = i(m);
          break;
        case Wt:
          if ((F && ((m = i(m)), (G = m.nodeType)), G === 1 || G === 3)) {
            j = m;
            const U = !g.children.length;
            for (let W = 0; W < g.staticCount; W++)
              U && (g.children += j.nodeType === 1 ? j.outerHTML : j.data),
                W === g.staticCount - 1 && (g.anchor = j),
                (j = i(j));
            return F ? i(j) : j;
          } else O();
          break;
        case _e:
          F ? (j = v(m, g, k, B, L, P)) : (j = O());
          break;
        default:
          if (K & 1)
            (G !== 1 || g.type.toLowerCase() !== m.tagName.toLowerCase()) &&
            !y(m)
              ? (j = O())
              : (j = h(m, g, k, B, L, P));
          else if (K & 6) {
            g.slotScopeIds = L;
            const U = o(m);
            if (
              (F
                ? (j = S(m))
                : fr(m) && m.data === "teleport start"
                ? (j = S(m, m.data, "teleport end"))
                : (j = i(m)),
              t(g, U, null, k, B, cr(U), P),
              qt(g))
            ) {
              let W;
              F
                ? ((W = ee(_e)),
                  (W.anchor = j ? j.previousSibling : U.lastChild))
                : (W = m.nodeType === 3 ? ri("") : ee("div")),
                (W.el = m),
                (g.component.subTree = W);
            }
          } else
            K & 64
              ? G !== 8
                ? (j = O())
                : (j = g.type.hydrate(m, g, k, B, L, P, e, _))
              : K & 128 &&
                (j = g.type.hydrate(m, g, k, B, cr(o(m)), L, P, e, f));
      }
      return D != null && Cr(D, null, B, g), j;
    },
    h = (m, g, k, B, L, P) => {
      P = P || !!g.dynamicChildren;
      const {
          type: F,
          props: O,
          patchFlag: z,
          shapeFlag: D,
          dirs: K,
          transition: re,
        } = g,
        G = (F === "input" && K) || F === "option";
      if (G || z !== -1) {
        if ((K && lt(g, null, k, "created"), O))
          if (G || !P || z & 48)
            for (const W in O)
              ((G && W.endsWith("value")) || (Kn(W) && !Mn(W))) &&
                r(m, W, null, O[W], !1, void 0, k);
          else O.onClick && r(m, "onClick", null, O.onClick, !1, void 0, k);
        let j;
        (j = O && O.onVnodeBeforeMount) && Ne(j, k, g);
        let U = !1;
        if (y(m)) {
          U = xl(B, re) && k && k.vnode.props && k.vnode.props.appear;
          const W = m.content.firstChild;
          U && re.beforeEnter(W), A(W, m, k), (g.el = m = W);
        }
        if (
          (K && lt(g, null, k, "beforeMount"),
          ((j = O && O.onVnodeMounted) || K || U) &&
            rl(() => {
              j && Ne(j, k, g),
                U && re.enter(m),
                K && lt(g, null, k, "mounted");
            }, B),
          D & 16 && !(O && (O.innerHTML || O.textContent)))
        ) {
          let W = _(m.firstChild, g, m, k, B, L, P);
          for (; W; ) {
            wt = !0;
            const Ae = W;
            (W = W.nextSibling), a(Ae);
          }
        } else
          D & 8 &&
            m.textContent !== g.children &&
            ((wt = !0), (m.textContent = g.children));
      }
      return m.nextSibling;
    },
    _ = (m, g, k, B, L, P, F) => {
      F = F || !!g.dynamicChildren;
      const O = g.children,
        z = O.length;
      for (let D = 0; D < z; D++) {
        const K = F ? O[D] : (O[D] = Ve(O[D]));
        if (m) m = f(m, K, B, L, P, F);
        else {
          if (K.type === Yt && !K.children) continue;
          (wt = !0), n(null, K, k, null, B, L, cr(k), P);
        }
      }
      return m;
    },
    v = (m, g, k, B, L, P) => {
      const { slotScopeIds: F } = g;
      F && (L = L ? L.concat(F) : F);
      const O = o(m),
        z = _(i(m), g, O, k, B, L, P);
      return z && fr(z) && z.data === "]"
        ? i((g.anchor = z))
        : ((wt = !0), l((g.anchor = u("]")), O, z), z);
    },
    w = (m, g, k, B, L, P) => {
      if (((wt = !0), (g.el = null), P)) {
        const z = S(m);
        for (;;) {
          const D = i(m);
          if (D && D !== z) a(D);
          else break;
        }
      }
      const F = i(m),
        O = o(m);
      return a(m), n(null, g, O, F, k, B, cr(O), L), F;
    },
    S = (m, g = "[", k = "]") => {
      let B = 0;
      for (; m; )
        if (((m = i(m)), m && fr(m) && (m.data === g && B++, m.data === k))) {
          if (B === 0) return i(m);
          B--;
        }
      return m;
    },
    A = (m, g, k) => {
      const B = g.parentNode;
      B && B.replaceChild(m, g);
      let L = k;
      for (; L; )
        L.vnode.el === g && ((L.vnode.el = m), (L.subTree.el = m)),
          (L = L.parent);
    },
    y = (m) => m.nodeType === 1 && m.tagName.toLowerCase() === "template";
  return [c, f];
}
const Pe = rl;
function Sl(e) {
  return Pl(e);
}
function Ml(e) {
  return Pl(e, Lc);
}
function Pl(e, t) {
  const n = us();
  n.__VUE__ = !0;
  const {
      insert: r,
      remove: s,
      patchProp: i,
      createElement: o,
      createText: a,
      createComment: l,
      setText: u,
      setElementText: c,
      parentNode: f,
      nextSibling: h,
      setScopeId: _ = rt,
      insertStaticContent: v,
    } = e,
    w = (
      d,
      p,
      b,
      R = null,
      T = null,
      C = null,
      x = !1,
      M = null,
      I = !!p.dynamicChildren
    ) => {
      if (d === p) return;
      d && !nt(d, p) && ((R = E(d)), ae(d, T, C, !0), (d = null)),
        p.patchFlag === -2 && ((I = !1), (p.dynamicChildren = null));
      const { type: H, ref: Y, shapeFlag: Q } = p;
      switch (H) {
        case Yt:
          S(d, p, b, R);
          break;
        case Ie:
          A(d, p, b, R);
          break;
        case Wt:
          d == null && y(p, b, R, x);
          break;
        case _e:
          D(d, p, b, R, T, C, x, M, I);
          break;
        default:
          Q & 1
            ? k(d, p, b, R, T, C, x, M, I)
            : Q & 6
            ? K(d, p, b, R, T, C, x, M, I)
            : (Q & 64 || Q & 128) && H.process(d, p, b, R, T, C, x, M, I, N);
      }
      Y != null && T && Cr(Y, d && d.ref, C, p || d, !p);
    },
    S = (d, p, b, R) => {
      if (d == null) r((p.el = a(p.children)), b, R);
      else {
        const T = (p.el = d.el);
        p.children !== d.children && u(T, p.children);
      }
    },
    A = (d, p, b, R) => {
      d == null ? r((p.el = l(p.children || "")), b, R) : (p.el = d.el);
    },
    y = (d, p, b, R) => {
      [d.el, d.anchor] = v(d.children, p, b, R, d.el, d.anchor);
    },
    m = ({ el: d, anchor: p }, b, R) => {
      let T;
      for (; d && d !== p; ) (T = h(d)), r(d, b, R), (d = T);
      r(p, b, R);
    },
    g = ({ el: d, anchor: p }) => {
      let b;
      for (; d && d !== p; ) (b = h(d)), s(d), (d = b);
      s(p);
    },
    k = (d, p, b, R, T, C, x, M, I) => {
      (x = x || p.type === "svg"),
        d == null ? B(p, b, R, T, C, x, M, I) : F(d, p, T, C, x, M, I);
    },
    B = (d, p, b, R, T, C, x, M) => {
      let I, H;
      const { type: Y, props: Q, shapeFlag: J, transition: Z, dirs: se } = d;
      if (
        ((I = d.el = o(d.type, C, Q && Q.is, Q)),
        J & 8
          ? c(I, d.children)
          : J & 16 &&
            P(d.children, I, null, R, T, C && Y !== "foreignObject", x, M),
        se && lt(d, null, R, "created"),
        L(I, d, d.scopeId, x, R),
        Q)
      ) {
        for (const ue in Q)
          ue !== "value" &&
            !Mn(ue) &&
            i(I, ue, null, Q[ue], C, d.children, R, T, be);
        "value" in Q && i(I, "value", null, Q.value),
          (H = Q.onVnodeBeforeMount) && Ne(H, R, d);
      }
      se && lt(d, null, R, "beforeMount");
      const de = xl(T, Z);
      de && Z.beforeEnter(I),
        r(I, p, b),
        ((H = Q && Q.onVnodeMounted) || de || se) &&
          Pe(() => {
            H && Ne(H, R, d), de && Z.enter(I), se && lt(d, null, R, "mounted");
          }, T);
    },
    L = (d, p, b, R, T) => {
      if ((b && _(d, b), R)) for (let C = 0; C < R.length; C++) _(d, R[C]);
      if (T) {
        let C = T.subTree;
        if (p === C) {
          const x = T.vnode;
          L(d, x, x.scopeId, x.slotScopeIds, T.parent);
        }
      }
    },
    P = (d, p, b, R, T, C, x, M, I = 0) => {
      for (let H = I; H < d.length; H++) {
        const Y = (d[H] = M ? kt(d[H]) : Ve(d[H]));
        w(null, Y, p, b, R, T, C, x, M);
      }
    },
    F = (d, p, b, R, T, C, x) => {
      const M = (p.el = d.el);
      let { patchFlag: I, dynamicChildren: H, dirs: Y } = p;
      I |= d.patchFlag & 16;
      const Q = d.props || ce,
        J = p.props || ce;
      let Z;
      b && Bt(b, !1),
        (Z = J.onVnodeBeforeUpdate) && Ne(Z, b, p, d),
        Y && lt(p, d, b, "beforeUpdate"),
        b && Bt(b, !0);
      const se = T && p.type !== "foreignObject";
      if (
        (H
          ? O(d.dynamicChildren, H, M, b, R, se, C)
          : x || W(d, p, M, null, b, R, se, C, !1),
        I > 0)
      ) {
        if (I & 16) z(M, p, Q, J, b, R, T);
        else if (
          (I & 2 && Q.class !== J.class && i(M, "class", null, J.class, T),
          I & 4 && i(M, "style", Q.style, J.style, T),
          I & 8)
        ) {
          const de = p.dynamicProps;
          for (let ue = 0; ue < de.length; ue++) {
            const we = de[ue],
              et = Q[we],
              Zt = J[we];
            (Zt !== et || we === "value") &&
              i(M, we, et, Zt, T, d.children, b, R, be);
          }
        }
        I & 1 && d.children !== p.children && c(M, p.children);
      } else !x && H == null && z(M, p, Q, J, b, R, T);
      ((Z = J.onVnodeUpdated) || Y) &&
        Pe(() => {
          Z && Ne(Z, b, p, d), Y && lt(p, d, b, "updated");
        }, R);
    },
    O = (d, p, b, R, T, C, x) => {
      for (let M = 0; M < p.length; M++) {
        const I = d[M],
          H = p[M],
          Y =
            I.el && (I.type === _e || !nt(I, H) || I.shapeFlag & 70)
              ? f(I.el)
              : b;
        w(I, H, Y, null, R, T, C, x, !0);
      }
    },
    z = (d, p, b, R, T, C, x) => {
      if (b !== R) {
        if (b !== ce)
          for (const M in b)
            !Mn(M) && !(M in R) && i(d, M, b[M], null, x, p.children, T, C, be);
        for (const M in R) {
          if (Mn(M)) continue;
          const I = R[M],
            H = b[M];
          I !== H && M !== "value" && i(d, M, H, I, x, p.children, T, C, be);
        }
        "value" in R && i(d, "value", b.value, R.value);
      }
    },
    D = (d, p, b, R, T, C, x, M, I) => {
      const H = (p.el = d ? d.el : a("")),
        Y = (p.anchor = d ? d.anchor : a(""));
      let { patchFlag: Q, dynamicChildren: J, slotScopeIds: Z } = p;
      Z && (M = M ? M.concat(Z) : Z),
        d == null
          ? (r(H, b, R), r(Y, b, R), P(p.children, b, Y, T, C, x, M, I))
          : Q > 0 && Q & 64 && J && d.dynamicChildren
          ? (O(d.dynamicChildren, J, b, T, C, x, M),
            (p.key != null || (T && p === T.subTree)) && ni(d, p, !0))
          : W(d, p, b, Y, T, C, x, M, I);
    },
    K = (d, p, b, R, T, C, x, M, I) => {
      (p.slotScopeIds = M),
        d == null
          ? p.shapeFlag & 512
            ? T.ctx.activate(p, b, R, x, I)
            : re(p, b, R, T, C, x, I)
          : G(d, p, I);
    },
    re = (d, p, b, R, T, C, x) => {
      const M = (d.component = $l(d, R, T));
      if ((er(d) && (M.ctx.renderer = N), zl(M), M.asyncDep)) {
        if ((T && T.registerDep(M, j), !d.el)) {
          const I = (M.subTree = ee(Ie));
          A(null, I, p, b);
        }
        return;
      }
      j(M, d, p, b, T, C, x);
    },
    G = (d, p, b) => {
      const R = (p.component = d.component);
      if ($u(d, p, b))
        if (R.asyncDep && !R.asyncResolved) {
          U(R, p, b);
          return;
        } else (R.next = p), Hu(R.update), R.update();
      else (p.el = d.el), (R.vnode = p);
    },
    j = (d, p, b, R, T, C, x) => {
      const M = () => {
          if (d.isMounted) {
            let { next: Y, bu: Q, u: J, parent: Z, vnode: se } = d,
              de = Y,
              ue;
            Bt(d, !1),
              Y ? ((Y.el = se.el), U(d, Y, x)) : (Y = se),
              Q && on(Q),
              (ue = Y.props && Y.props.onVnodeBeforeUpdate) && Ne(ue, Z, Y, se),
              Bt(d, !0);
            const we = pr(d),
              et = d.subTree;
            (d.subTree = we),
              w(et, we, f(et.el), E(et), d, T, C),
              (Y.el = we.el),
              de === null && Qs(d, we.el),
              J && Pe(J, T),
              (ue = Y.props && Y.props.onVnodeUpdated) &&
                Pe(() => Ne(ue, Z, Y, se), T);
          } else {
            let Y;
            const { el: Q, props: J } = p,
              { bm: Z, m: se, parent: de } = d,
              ue = qt(p);
            if (
              (Bt(d, !1),
              Z && on(Z),
              !ue && (Y = J && J.onVnodeBeforeMount) && Ne(Y, de, p),
              Bt(d, !0),
              Q && te)
            ) {
              const we = () => {
                (d.subTree = pr(d)), te(Q, d.subTree, d, T, null);
              };
              ue
                ? p.type.__asyncLoader().then(() => !d.isUnmounted && we())
                : we();
            } else {
              const we = (d.subTree = pr(d));
              w(null, we, b, R, d, T, C), (p.el = we.el);
            }
            if ((se && Pe(se, T), !ue && (Y = J && J.onVnodeMounted))) {
              const we = p;
              Pe(() => Ne(Y, de, we), T);
            }
            (p.shapeFlag & 256 ||
              (de && qt(de.vnode) && de.vnode.shapeFlag & 256)) &&
              d.a &&
              Pe(d.a, T),
              (d.isMounted = !0),
              (p = b = R = null);
          }
        },
        I = (d.effect = new cn(M, () => Dr(H), d.scope)),
        H = (d.update = () => I.run());
      (H.id = d.uid), Bt(d, !0), H();
    },
    U = (d, p, b) => {
      p.component = d;
      const R = d.vnode.props;
      (d.vnode = p),
        (d.next = null),
        xc(d, p.props, R, b),
        Ic(d, p.children, b),
        _n(),
        ki(),
        yn();
    },
    W = (d, p, b, R, T, C, x, M, I = !1) => {
      const H = d && d.children,
        Y = d ? d.shapeFlag : 0,
        Q = p.children,
        { patchFlag: J, shapeFlag: Z } = p;
      if (J > 0) {
        if (J & 128) {
          ke(H, Q, b, R, T, C, x, M, I);
          return;
        } else if (J & 256) {
          Ae(H, Q, b, R, T, C, x, M, I);
          return;
        }
      }
      Z & 8
        ? (Y & 16 && be(H, T, C), Q !== H && c(b, Q))
        : Y & 16
        ? Z & 16
          ? ke(H, Q, b, R, T, C, x, M, I)
          : be(H, T, C, !0)
        : (Y & 8 && c(b, ""), Z & 16 && P(Q, b, R, T, C, x, M, I));
    },
    Ae = (d, p, b, R, T, C, x, M, I) => {
      (d = d || rn), (p = p || rn);
      const H = d.length,
        Y = p.length,
        Q = Math.min(H, Y);
      let J;
      for (J = 0; J < Q; J++) {
        const Z = (p[J] = I ? kt(p[J]) : Ve(p[J]));
        w(d[J], Z, b, null, T, C, x, M, I);
      }
      H > Y ? be(d, T, C, !0, !1, Q) : P(p, b, R, T, C, x, M, I, Q);
    },
    ke = (d, p, b, R, T, C, x, M, I) => {
      let H = 0;
      const Y = p.length;
      let Q = d.length - 1,
        J = Y - 1;
      for (; H <= Q && H <= J; ) {
        const Z = d[H],
          se = (p[H] = I ? kt(p[H]) : Ve(p[H]));
        if (nt(Z, se)) w(Z, se, b, null, T, C, x, M, I);
        else break;
        H++;
      }
      for (; H <= Q && H <= J; ) {
        const Z = d[Q],
          se = (p[J] = I ? kt(p[J]) : Ve(p[J]));
        if (nt(Z, se)) w(Z, se, b, null, T, C, x, M, I);
        else break;
        Q--, J--;
      }
      if (H > Q) {
        if (H <= J) {
          const Z = J + 1,
            se = Z < Y ? p[Z].el : R;
          for (; H <= J; )
            w(null, (p[H] = I ? kt(p[H]) : Ve(p[H])), b, se, T, C, x, M, I),
              H++;
        }
      } else if (H > J) for (; H <= Q; ) ae(d[H], T, C, !0), H++;
      else {
        const Z = H,
          se = H,
          de = new Map();
        for (H = se; H <= J; H++) {
          const je = (p[H] = I ? kt(p[H]) : Ve(p[H]));
          je.key != null && de.set(je.key, H);
        }
        let ue,
          we = 0;
        const et = J - se + 1;
        let Zt = !1,
          pi = 0;
        const En = new Array(et);
        for (H = 0; H < et; H++) En[H] = 0;
        for (H = Z; H <= Q; H++) {
          const je = d[H];
          if (we >= et) {
            ae(je, T, C, !0);
            continue;
          }
          let ot;
          if (je.key != null) ot = de.get(je.key);
          else
            for (ue = se; ue <= J; ue++)
              if (En[ue - se] === 0 && nt(je, p[ue])) {
                ot = ue;
                break;
              }
          ot === void 0
            ? ae(je, T, C, !0)
            : ((En[ot - se] = H + 1),
              ot >= pi ? (pi = ot) : (Zt = !0),
              w(je, p[ot], b, null, T, C, x, M, I),
              we++);
        }
        const gi = Zt ? Dc(En) : rn;
        for (ue = gi.length - 1, H = et - 1; H >= 0; H--) {
          const je = se + H,
            ot = p[je],
            mi = je + 1 < Y ? p[je + 1].el : R;
          En[H] === 0
            ? w(null, ot, b, mi, T, C, x, M, I)
            : Zt && (ue < 0 || H !== gi[ue] ? pe(ot, b, mi, 2) : ue--);
        }
      }
    },
    pe = (d, p, b, R, T = null) => {
      const { el: C, type: x, transition: M, children: I, shapeFlag: H } = d;
      if (H & 6) {
        pe(d.component.subTree, p, b, R);
        return;
      }
      if (H & 128) {
        d.suspense.move(p, b, R);
        return;
      }
      if (H & 64) {
        x.move(d, p, b, N);
        return;
      }
      if (x === _e) {
        r(C, p, b);
        for (let Q = 0; Q < I.length; Q++) pe(I[Q], p, b, R);
        r(d.anchor, p, b);
        return;
      }
      if (x === Wt) {
        m(d, p, b);
        return;
      }
      if (R !== 2 && H & 1 && M)
        if (R === 0) M.beforeEnter(C), r(C, p, b), Pe(() => M.enter(C), T);
        else {
          const { leave: Q, delayLeave: J, afterLeave: Z } = M,
            se = () => r(C, p, b),
            de = () => {
              Q(C, () => {
                se(), Z && Z();
              });
            };
          J ? J(C, se, de) : de();
        }
      else r(C, p, b);
    },
    ae = (d, p, b, R = !1, T = !1) => {
      const {
        type: C,
        props: x,
        ref: M,
        children: I,
        dynamicChildren: H,
        shapeFlag: Y,
        patchFlag: Q,
        dirs: J,
      } = d;
      if ((M != null && Cr(M, null, b, d, !0), Y & 256)) {
        p.ctx.deactivate(d);
        return;
      }
      const Z = Y & 1 && J,
        se = !qt(d);
      let de;
      if ((se && (de = x && x.onVnodeBeforeUnmount) && Ne(de, p, d), Y & 6))
        ze(d.component, b, R);
      else {
        if (Y & 128) {
          d.suspense.unmount(b, R);
          return;
        }
        Z && lt(d, null, p, "beforeUnmount"),
          Y & 64
            ? d.type.remove(d, p, b, T, N, R)
            : H && (C !== _e || (Q > 0 && Q & 64))
            ? be(H, p, b, !1, !0)
            : ((C === _e && Q & 384) || (!T && Y & 16)) && be(I, p, b),
          R && De(d);
      }
      ((se && (de = x && x.onVnodeUnmounted)) || Z) &&
        Pe(() => {
          de && Ne(de, p, d), Z && lt(d, null, p, "unmounted");
        }, b);
    },
    De = (d) => {
      const { type: p, el: b, anchor: R, transition: T } = d;
      if (p === _e) {
        He(b, R);
        return;
      }
      if (p === Wt) {
        g(d);
        return;
      }
      const C = () => {
        s(b), T && !T.persisted && T.afterLeave && T.afterLeave();
      };
      if (d.shapeFlag & 1 && T && !T.persisted) {
        const { leave: x, delayLeave: M } = T,
          I = () => x(b, C);
        M ? M(d.el, C, I) : I();
      } else C();
    },
    He = (d, p) => {
      let b;
      for (; d !== p; ) (b = h(d)), s(d), (d = b);
      s(p);
    },
    ze = (d, p, b) => {
      const { bum: R, scope: T, update: C, subTree: x, um: M } = d;
      R && on(R),
        T.stop(),
        C && ((C.active = !1), ae(x, d, p, b)),
        M && Pe(M, p),
        Pe(() => {
          d.isUnmounted = !0;
        }, p),
        p &&
          p.pendingBranch &&
          !p.isUnmounted &&
          d.asyncDep &&
          !d.asyncResolved &&
          d.suspenseId === p.pendingId &&
          (p.deps--, p.deps === 0 && p.resolve());
    },
    be = (d, p, b, R = !1, T = !1, C = 0) => {
      for (let x = C; x < d.length; x++) ae(d[x], p, b, R, T);
    },
    E = (d) =>
      d.shapeFlag & 6
        ? E(d.component.subTree)
        : d.shapeFlag & 128
        ? d.suspense.next()
        : h(d.anchor || d.el),
    $ = (d, p, b) => {
      d == null
        ? p._vnode && ae(p._vnode, null, null, !0)
        : w(p._vnode || null, d, p, null, null, null, b),
        ki(),
        wr(),
        (p._vnode = d);
    },
    N = {
      p: w,
      um: ae,
      m: pe,
      r: De,
      mt: re,
      mc: P,
      pc: W,
      pbc: O,
      n: E,
      o: e,
    };
  let q, te;
  return t && ([q, te] = t(N)), { render: $, hydrate: q, createApp: Sc($, q) };
}
function Bt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function xl(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
}
function ni(e, t, n = !1) {
  const r = e.children,
    s = t.children;
  if (V(r) && V(s))
    for (let i = 0; i < r.length; i++) {
      const o = r[i];
      let a = s[i];
      a.shapeFlag & 1 &&
        !a.dynamicChildren &&
        ((a.patchFlag <= 0 || a.patchFlag === 32) &&
          ((a = s[i] = kt(s[i])), (a.el = o.el)),
        n || ni(o, a)),
        a.type === Yt && (a.el = o.el);
    }
}
function Dc(e) {
  const t = e.slice(),
    n = [0];
  let r, s, i, o, a;
  const l = e.length;
  for (r = 0; r < l; r++) {
    const u = e[r];
    if (u !== 0) {
      if (((s = n[n.length - 1]), e[s] < u)) {
        (t[r] = s), n.push(r);
        continue;
      }
      for (i = 0, o = n.length - 1; i < o; )
        (a = (i + o) >> 1), e[n[a]] < u ? (i = a + 1) : (o = a);
      u < e[n[i]] && (i > 0 && (t[r] = n[i - 1]), (n[i] = r));
    }
  }
  for (i = n.length, o = n[i - 1]; i-- > 0; ) (n[i] = o), (o = t[o]);
  return n;
}
const Nc = (e) => e.__isTeleport,
  On = (e) => e && (e.disabled || e.disabled === ""),
  Bi = (e) => typeof SVGElement < "u" && e instanceof SVGElement,
  ys = (e, t) => {
    const n = e && e.to;
    return ve(n) ? (t ? t(n) : null) : n;
  },
  Bc = {
    __isTeleport: !0,
    process(e, t, n, r, s, i, o, a, l, u) {
      const {
          mc: c,
          pc: f,
          pbc: h,
          o: { insert: _, querySelector: v, createText: w, createComment: S },
        } = u,
        A = On(t.props);
      let { shapeFlag: y, children: m, dynamicChildren: g } = t;
      if (e == null) {
        const k = (t.el = w("")),
          B = (t.anchor = w(""));
        _(k, n, r), _(B, n, r);
        const L = (t.target = ys(t.props, v)),
          P = (t.targetAnchor = w(""));
        L && (_(P, L), (o = o || Bi(L)));
        const F = (O, z) => {
          y & 16 && c(m, O, z, s, i, o, a, l);
        };
        A ? F(n, B) : L && F(L, P);
      } else {
        t.el = e.el;
        const k = (t.anchor = e.anchor),
          B = (t.target = e.target),
          L = (t.targetAnchor = e.targetAnchor),
          P = On(e.props),
          F = P ? n : B,
          O = P ? k : L;
        if (
          ((o = o || Bi(B)),
          g
            ? (h(e.dynamicChildren, g, F, s, i, o, a), ni(e, t, !0))
            : l || f(e, t, F, O, s, i, o, a, !1),
          A)
        )
          P
            ? t.props &&
              e.props &&
              t.props.to !== e.props.to &&
              (t.props.to = e.props.to)
            : dr(t, n, k, u, 1);
        else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
          const z = (t.target = ys(t.props, v));
          z && dr(t, z, null, u, 0);
        } else P && dr(t, B, L, u, 1);
      }
      Hl(t);
    },
    remove(e, t, n, r, { um: s, o: { remove: i } }, o) {
      const {
        shapeFlag: a,
        children: l,
        anchor: u,
        targetAnchor: c,
        target: f,
        props: h,
      } = e;
      if ((f && i(c), o && i(u), a & 16)) {
        const _ = o || !On(h);
        for (let v = 0; v < l.length; v++) {
          const w = l[v];
          s(w, t, n, _, !!w.dynamicChildren);
        }
      }
    },
    move: dr,
    hydrate: $c,
  };
function dr(e, t, n, { o: { insert: r }, m: s }, i = 2) {
  i === 0 && r(e.targetAnchor, t, n);
  const { el: o, anchor: a, shapeFlag: l, children: u, props: c } = e,
    f = i === 2;
  if ((f && r(o, t, n), (!f || On(c)) && l & 16))
    for (let h = 0; h < u.length; h++) s(u[h], t, n, 2);
  f && r(a, t, n);
}
function $c(
  e,
  t,
  n,
  r,
  s,
  i,
  { o: { nextSibling: o, parentNode: a, querySelector: l } },
  u
) {
  const c = (t.target = ys(t.props, l));
  if (c) {
    const f = c._lpa || c.firstChild;
    if (t.shapeFlag & 16)
      if (On(t.props))
        (t.anchor = u(o(e), t, a(e), n, r, s, i)), (t.targetAnchor = f);
      else {
        t.anchor = o(e);
        let h = f;
        for (; h; )
          if (
            ((h = o(h)), h && h.nodeType === 8 && h.data === "teleport anchor")
          ) {
            (t.targetAnchor = h),
              (c._lpa = t.targetAnchor && o(t.targetAnchor));
            break;
          }
        u(f, t, c, n, r, s, i);
      }
    Hl(t);
  }
  return t.anchor && o(t.anchor);
}
const Fc = Bc;
function Hl(e) {
  const t = e.ctx;
  if (t && t.ut) {
    let n = e.children[0].el;
    for (; n && n !== e.targetAnchor; )
      n.nodeType === 1 && n.setAttribute("data-v-owner", t.uid),
        (n = n.nextSibling);
    t.ut();
  }
}
const _e = Symbol.for("v-fgt"),
  Yt = Symbol.for("v-txt"),
  Ie = Symbol.for("v-cmt"),
  Wt = Symbol.for("v-stc"),
  In = [];
let Be = null;
function ne(e = !1) {
  In.push((Be = e ? null : []));
}
function Ol() {
  In.pop(), (Be = In[In.length - 1] || null);
}
let Jt = 1;
function ws(e) {
  Jt += e;
}
function Il(e) {
  return (
    (e.dynamicChildren = Jt > 0 ? Be || rn : null),
    Ol(),
    Jt > 0 && Be && Be.push(e),
    e
  );
}
function he(e, t, n, r, s, i) {
  return Il(ge(e, t, n, r, s, i, !0));
}
function Je(e, t, n, r, s) {
  return Il(ee(e, t, n, r, s, !0));
}
function It(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function nt(e, t) {
  return e.type === t.type && e.key === t.key;
}
function zc(e) {}
const qr = "__vInternal",
  Ll = ({ key: e }) => e ?? null,
  gr = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? ve(e) || Re(e) || X(e)
        ? { i: Te, r: e, k: t, f: !!n }
        : e
      : null
  );
function ge(
  e,
  t = null,
  n = null,
  r = 0,
  s = null,
  i = e === _e ? 0 : 1,
  o = !1,
  a = !1
) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Ll(t),
    ref: t && gr(t),
    scopeId: Br,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: Te,
  };
  return (
    a
      ? (si(l, n), i & 128 && e.normalize(l))
      : n && (l.shapeFlag |= ve(n) ? 8 : 16),
    Jt > 0 &&
      !o &&
      Be &&
      (l.patchFlag > 0 || i & 6) &&
      l.patchFlag !== 32 &&
      Be.push(l),
    l
  );
}
const ee = jc;
function jc(e, t = null, n = null, r = 0, s = null, i = !1) {
  if (((!e || e === vl) && (e = Ie), It(e))) {
    const a = ct(e, t, !0);
    return (
      n && si(a, n),
      Jt > 0 &&
        !i &&
        Be &&
        (a.shapeFlag & 6 ? (Be[Be.indexOf(e)] = a) : Be.push(a)),
      (a.patchFlag |= -2),
      a
    );
  }
  if ((Yc(e) && (e = e.__vccOpts), t)) {
    t = Dl(t);
    let { class: a, style: l } = t;
    a && !ve(a) && (t.class = Nt(a)),
      fe(l) && (js(l) && !V(l) && (l = me({}, l)), (t.style = We(l)));
  }
  const o = ve(e) ? 1 : nl(e) ? 128 : Nc(e) ? 64 : fe(e) ? 4 : X(e) ? 2 : 0;
  return ge(e, t, n, r, s, o, i, !0);
}
function Dl(e) {
  return e ? (js(e) || qr in e ? me({}, e) : e) : null;
}
function ct(e, t, n = !1) {
  const { props: r, ref: s, patchFlag: i, children: o } = e,
    a = t ? Bl(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: a,
    key: a && Ll(a),
    ref:
      t && t.ref ? (n && s ? (V(s) ? s.concat(gr(t)) : [s, gr(t)]) : gr(t)) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: o,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== _e ? (i === -1 ? 16 : i | 16) : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && ct(e.ssContent),
    ssFallback: e.ssFallback && ct(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  };
}
function ri(e = " ", t = 0) {
  return ee(Yt, null, e, t);
}
function Nl(e, t) {
  const n = ee(Wt, null, e);
  return (n.staticCount = t), n;
}
function xe(e = "", t = !1) {
  return t ? (ne(), Je(Ie, null, e)) : ee(Ie, null, e);
}
function Ve(e) {
  return e == null || typeof e == "boolean"
    ? ee(Ie)
    : V(e)
    ? ee(_e, null, e.slice())
    : typeof e == "object"
    ? kt(e)
    : ee(Yt, null, String(e));
}
function kt(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : ct(e);
}
function si(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (V(t)) n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), si(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !(qr in t)
        ? (t._ctx = Te)
        : s === 3 &&
          Te &&
          (Te.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    X(t)
      ? ((t = { default: t, _ctx: Te }), (n = 32))
      : ((t = String(t)), r & 64 ? ((n = 16), (t = [ri(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function Bl(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const s in r)
      if (s === "class")
        t.class !== r.class && (t.class = Nt([t.class, r.class]));
      else if (s === "style") t.style = We([t.style, r.style]);
      else if (Kn(s)) {
        const i = t[s],
          o = r[s];
        o &&
          i !== o &&
          !(V(i) && i.includes(o)) &&
          (t[s] = i ? [].concat(i, o) : o);
      } else s !== "" && (t[s] = r[s]);
  }
  return t;
}
function Ne(e, t, n, r = null) {
  qe(e, t, 7, [n, r]);
}
const Uc = El();
let Vc = 0;
function $l(e, t, n) {
  const r = e.type,
    s = (t ? t.appContext : e.appContext) || Uc,
    i = {
      uid: Vc++,
      vnode: e,
      type: r,
      parent: t,
      appContext: s,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Ns(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(s.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Rl(r, s),
      emitsOptions: tl(r, s),
      emit: null,
      emitted: null,
      propsDefaults: ce,
      inheritAttrs: r.inheritAttrs,
      ctx: ce,
      data: ce,
      props: ce,
      attrs: ce,
      slots: ce,
      refs: ce,
      setupState: ce,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (i.ctx = { _: i }),
    (i.root = t ? t.root : i),
    (i.emit = Iu.bind(null, i)),
    e.ce && e.ce(i),
    i
  );
}
let Ce = null;
const _t = () => Ce || Te;
let ii,
  en,
  $i = "__VUE_INSTANCE_SETTERS__";
(en = us()[$i]) || (en = us()[$i] = []),
  en.push((e) => (Ce = e)),
  (ii = (e) => {
    en.length > 1 ? en.forEach((t) => t(e)) : en[0](e);
  });
const Lt = (e) => {
    ii(e), e.scope.on();
  },
  Pt = () => {
    Ce && Ce.scope.off(), ii(null);
  };
function Fl(e) {
  return e.vnode.shapeFlag & 4;
}
let hn = !1;
function zl(e, t = !1) {
  hn = t;
  const { props: n, children: r } = e.vnode,
    s = Fl(e);
  Pc(e, n, s, t), Oc(e, r);
  const i = s ? qc(e, t) : void 0;
  return (hn = !1), i;
}
function qc(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = Us(new Proxy(e.ctx, ms)));
  const { setup: r } = n;
  if (r) {
    const s = (e.setupContext = r.length > 1 ? Ul(e) : null);
    Lt(e), _n();
    const i = vt(r, e, 0, [e.props, s]);
    if ((yn(), Pt(), Ls(i))) {
      if ((i.then(Pt, Pt), t))
        return i
          .then((o) => {
            Es(e, o, t);
          })
          .catch((o) => {
            Gt(o, e, 0);
          });
      e.asyncDep = i;
    } else Es(e, i, t);
  } else jl(e, t);
}
function Es(e, t, n) {
  X(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : fe(t) && (e.setupState = Ws(t)),
    jl(e, n);
}
let Rr, Cs;
function Wc(e) {
  (Rr = e),
    (Cs = (t) => {
      t.render._rc && (t.withProxy = new Proxy(t.ctx, lc));
    });
}
const Kc = () => !Rr;
function jl(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && Rr && !r.render) {
      const s = r.template || ei(e).template;
      if (s) {
        const { isCustomElement: i, compilerOptions: o } = e.appContext.config,
          { delimiters: a, compilerOptions: l } = r,
          u = me(me({ isCustomElement: i, delimiters: a }, o), l);
        r.render = Rr(s, u);
      }
    }
    (e.render = r.render || rt), Cs && Cs(e);
  }
  {
    Lt(e), _n();
    try {
      Ec(e);
    } finally {
      yn(), Pt();
    }
  }
}
function Qc(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return Fe(e, "get", "$attrs"), t[n];
      },
    }))
  );
}
function Ul(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return Qc(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function Wr(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(Ws(Us(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in xn) return xn[n](e);
        },
        has(t, n) {
          return n in t || n in xn;
        },
      }))
    );
}
function Rs(e, t = !0) {
  return X(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function Yc(e) {
  return X(e) && "__vccOpts" in e;
}
const Xe = (e, t) => Tu(e, t, hn);
function Kr(e, t, n) {
  const r = arguments.length;
  return r === 2
    ? fe(t) && !V(t)
      ? It(t)
        ? ee(e, null, [t])
        : ee(e, t)
      : ee(e, null, t)
    : (r > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : r === 3 && It(n) && (n = [n]),
      ee(e, t, n));
}
const Vl = Symbol.for("v-scx"),
  ql = () => ut(Vl);
function Jc() {}
function Xc(e, t, n, r) {
  const s = n[r];
  if (s && Wl(s, e)) return s;
  const i = t();
  return (i.memo = e.slice()), (n[r] = i);
}
function Wl(e, t) {
  const n = e.memo;
  if (n.length != t.length) return !1;
  for (let r = 0; r < n.length; r++) if (xt(n[r], t[r])) return !1;
  return Jt > 0 && Be && Be.push(e), !0;
}
const Kl = "3.3.7",
  Gc = {
    createComponentInstance: $l,
    setupComponent: zl,
    renderComponentRoot: pr,
    setCurrentRenderingInstance: jn,
    isVNode: It,
    normalizeVNode: Ve,
  },
  Zc = Gc,
  ef = null,
  tf = null,
  nf = "http://www.w3.org/2000/svg",
  zt = typeof document < "u" ? document : null,
  Fi = zt && zt.createElement("template"),
  rf = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, r) => {
      const s = t
        ? zt.createElementNS(nf, e)
        : zt.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          r &&
          r.multiple != null &&
          s.setAttribute("multiple", r.multiple),
        s
      );
    },
    createText: (e) => zt.createTextNode(e),
    createComment: (e) => zt.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => zt.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, r, s, i) {
      const o = n ? n.previousSibling : t.lastChild;
      if (s && (s === i || s.nextSibling))
        for (
          ;
          t.insertBefore(s.cloneNode(!0), n),
            !(s === i || !(s = s.nextSibling));

        );
      else {
        Fi.innerHTML = r ? `<svg>${e}</svg>` : e;
        const a = Fi.content;
        if (r) {
          const l = a.firstChild;
          for (; l.firstChild; ) a.appendChild(l.firstChild);
          a.removeChild(l);
        }
        t.insertBefore(a, n);
      }
      return [
        o ? o.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  },
  Et = "transition",
  Cn = "animation",
  pn = Symbol("_vtc"),
  Ee = (e, { slots: t }) => Kr(ol, Yl(e), t);
Ee.displayName = "Transition";
const Ql = {
    name: String,
    type: String,
    css: { type: Boolean, default: !0 },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String,
  },
  sf = (Ee.props = me({}, Xs, Ql)),
  $t = (e, t = []) => {
    V(e) ? e.forEach((n) => n(...t)) : e && e(...t);
  },
  zi = (e) => (e ? (V(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function Yl(e) {
  const t = {};
  for (const D in e) D in Ql || (t[D] = e[D]);
  if (e.css === !1) return t;
  const {
      name: n = "v",
      type: r,
      duration: s,
      enterFromClass: i = `${n}-enter-from`,
      enterActiveClass: o = `${n}-enter-active`,
      enterToClass: a = `${n}-enter-to`,
      appearFromClass: l = i,
      appearActiveClass: u = o,
      appearToClass: c = a,
      leaveFromClass: f = `${n}-leave-from`,
      leaveActiveClass: h = `${n}-leave-active`,
      leaveToClass: _ = `${n}-leave-to`,
    } = e,
    v = of(s),
    w = v && v[0],
    S = v && v[1],
    {
      onBeforeEnter: A,
      onEnter: y,
      onEnterCancelled: m,
      onLeave: g,
      onLeaveCancelled: k,
      onBeforeAppear: B = A,
      onAppear: L = y,
      onAppearCancelled: P = m,
    } = t,
    F = (D, K, re) => {
      Rt(D, K ? c : a), Rt(D, K ? u : o), re && re();
    },
    O = (D, K) => {
      (D._isLeaving = !1), Rt(D, f), Rt(D, _), Rt(D, h), K && K();
    },
    z = (D) => (K, re) => {
      const G = D ? L : y,
        j = () => F(K, D, re);
      $t(G, [K, j]),
        ji(() => {
          Rt(K, D ? l : i), dt(K, D ? c : a), zi(G) || Ui(K, r, w, j);
        });
    };
  return me(t, {
    onBeforeEnter(D) {
      $t(A, [D]), dt(D, i), dt(D, o);
    },
    onBeforeAppear(D) {
      $t(B, [D]), dt(D, l), dt(D, u);
    },
    onEnter: z(!1),
    onAppear: z(!0),
    onLeave(D, K) {
      D._isLeaving = !0;
      const re = () => O(D, K);
      dt(D, f),
        Xl(),
        dt(D, h),
        ji(() => {
          D._isLeaving && (Rt(D, f), dt(D, _), zi(g) || Ui(D, r, S, re));
        }),
        $t(g, [D, re]);
    },
    onEnterCancelled(D) {
      F(D, !1), $t(m, [D]);
    },
    onAppearCancelled(D) {
      F(D, !0), $t(P, [D]);
    },
    onLeaveCancelled(D) {
      O(D), $t(k, [D]);
    },
  });
}
function of(e) {
  if (e == null) return null;
  if (fe(e)) return [ns(e.enter), ns(e.leave)];
  {
    const t = ns(e);
    return [t, t];
  }
}
function ns(e) {
  return br(e);
}
function dt(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)),
    (e[pn] || (e[pn] = new Set())).add(t);
}
function Rt(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.remove(r));
  const n = e[pn];
  n && (n.delete(t), n.size || (e[pn] = void 0));
}
function ji(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let lf = 0;
function Ui(e, t, n, r) {
  const s = (e._endId = ++lf),
    i = () => {
      s === e._endId && r();
    };
  if (n) return setTimeout(i, n);
  const { type: o, timeout: a, propCount: l } = Jl(e, t);
  if (!o) return r();
  const u = o + "end";
  let c = 0;
  const f = () => {
      e.removeEventListener(u, h), i();
    },
    h = (_) => {
      _.target === e && ++c >= l && f();
    };
  setTimeout(() => {
    c < l && f();
  }, a + 1),
    e.addEventListener(u, h);
}
function Jl(e, t) {
  const n = window.getComputedStyle(e),
    r = (v) => (n[v] || "").split(", "),
    s = r(`${Et}Delay`),
    i = r(`${Et}Duration`),
    o = Vi(s, i),
    a = r(`${Cn}Delay`),
    l = r(`${Cn}Duration`),
    u = Vi(a, l);
  let c = null,
    f = 0,
    h = 0;
  t === Et
    ? o > 0 && ((c = Et), (f = o), (h = i.length))
    : t === Cn
    ? u > 0 && ((c = Cn), (f = u), (h = l.length))
    : ((f = Math.max(o, u)),
      (c = f > 0 ? (o > u ? Et : Cn) : null),
      (h = c ? (c === Et ? i.length : l.length) : 0));
  const _ =
    c === Et && /\b(transform|all)(,|$)/.test(r(`${Et}Property`).toString());
  return { type: c, timeout: f, propCount: h, hasTransform: _ };
}
function Vi(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((n, r) => qi(n) + qi(e[r])));
}
function qi(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Xl() {
  return document.body.offsetHeight;
}
function af(e, t, n) {
  const r = e[pn];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
const oi = Symbol("_vod"),
  Gl = {
    beforeMount(e, { value: t }, { transition: n }) {
      (e[oi] = e.style.display === "none" ? "" : e.style.display),
        n && t ? n.beforeEnter(e) : Rn(e, t);
    },
    mounted(e, { value: t }, { transition: n }) {
      n && t && n.enter(e);
    },
    updated(e, { value: t, oldValue: n }, { transition: r }) {
      !t != !n &&
        (r
          ? t
            ? (r.beforeEnter(e), Rn(e, !0), r.enter(e))
            : r.leave(e, () => {
                Rn(e, !1);
              })
          : Rn(e, t));
    },
    beforeUnmount(e, { value: t }) {
      Rn(e, t);
    },
  };
function Rn(e, t) {
  e.style.display = t ? e[oi] : "none";
}
function uf() {
  Gl.getSSRProps = ({ value: e }) => {
    if (!e) return { style: { display: "none" } };
  };
}
function cf(e, t, n) {
  const r = e.style,
    s = ve(n);
  if (n && !s) {
    if (t && !ve(t)) for (const i in t) n[i] == null && As(r, i, "");
    for (const i in n) As(r, i, n[i]);
  } else {
    const i = r.display;
    s ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"),
      oi in e && (r.display = i);
  }
}
const Wi = /\s*!important$/;
function As(e, t, n) {
  if (V(n)) n.forEach((r) => As(e, t, r));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const r = ff(e, t);
    Wi.test(n)
      ? e.setProperty(Ye(r), n.replace(Wi, ""), "important")
      : (e[r] = n);
  }
}
const Ki = ["Webkit", "Moz", "ms"],
  rs = {};
function ff(e, t) {
  const n = rs[t];
  if (n) return n;
  let r = $e(t);
  if (r !== "filter" && r in e) return (rs[t] = r);
  r = Qn(r);
  for (let s = 0; s < Ki.length; s++) {
    const i = Ki[s] + r;
    if (i in e) return (rs[t] = i);
  }
  return t;
}
const Qi = "http://www.w3.org/1999/xlink";
function df(e, t, n, r, s) {
  if (r && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(Qi, t.slice(6, t.length))
      : e.setAttributeNS(Qi, t, n);
  else {
    const i = ja(t);
    n == null || (i && !Ho(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, i ? "" : n);
  }
}
function hf(e, t, n, r, s, i, o) {
  if (t === "innerHTML" || t === "textContent") {
    r && o(r, s, i), (e[t] = n ?? "");
    return;
  }
  const a = e.tagName;
  if (t === "value" && a !== "PROGRESS" && !a.includes("-")) {
    e._value = n;
    const u = a === "OPTION" ? e.getAttribute("value") : e.value,
      c = n ?? "";
    u !== c && (e.value = c), n == null && e.removeAttribute(t);
    return;
  }
  let l = !1;
  if (n === "" || n == null) {
    const u = typeof e[t];
    u === "boolean"
      ? (n = Ho(n))
      : n == null && u === "string"
      ? ((n = ""), (l = !0))
      : u === "number" && ((n = 0), (l = !0));
  }
  try {
    e[t] = n;
  } catch {}
  l && e.removeAttribute(t);
}
function pt(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function pf(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const Yi = Symbol("_vei");
function gf(e, t, n, r, s = null) {
  const i = e[Yi] || (e[Yi] = {}),
    o = i[t];
  if (r && o) o.value = r;
  else {
    const [a, l] = mf(t);
    if (r) {
      const u = (i[t] = _f(r, s));
      pt(e, a, u, l);
    } else o && (pf(e, a, o, l), (i[t] = void 0));
  }
}
const Ji = /(?:Once|Passive|Capture)$/;
function mf(e) {
  let t;
  if (Ji.test(e)) {
    t = {};
    let r;
    for (; (r = e.match(Ji)); )
      (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : Ye(e.slice(2)), t];
}
let ss = 0;
const vf = Promise.resolve(),
  bf = () => ss || (vf.then(() => (ss = 0)), (ss = Date.now()));
function _f(e, t) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= n.attached) return;
    qe(yf(r, n.value), t, 5, [r]);
  };
  return (n.value = e), (n.attached = bf()), n;
}
function yf(e, t) {
  if (V(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((r) => (s) => !s._stopped && r && r(s))
    );
  } else return t;
}
const Xi = /^on[a-z]/,
  wf = (e, t, n, r, s = !1, i, o, a, l) => {
    t === "class"
      ? af(e, r, s)
      : t === "style"
      ? cf(e, n, r)
      : Kn(t)
      ? Os(t) || gf(e, t, n, r, o)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : Ef(e, t, r, s)
        )
      ? hf(e, t, r, i, o, a, l)
      : (t === "true-value"
          ? (e._trueValue = r)
          : t === "false-value" && (e._falseValue = r),
        df(e, t, r, s));
  };
function Ef(e, t, n, r) {
  return r
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && Xi.test(t) && X(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (Xi.test(t) && ve(n))
    ? !1
    : t in e;
}
/*! #__NO_SIDE_EFFECTS__ */ function Zl(e, t) {
  const n = Zn(e);
  class r extends Qr {
    constructor(i) {
      super(n, i, t);
    }
  }
  return (r.def = n), r;
}
/*! #__NO_SIDE_EFFECTS__ */ const Cf = (e) => Zl(e, ca),
  Rf = typeof HTMLElement < "u" ? HTMLElement : class {};
class Qr extends Rf {
  constructor(t, n = {}, r) {
    super(),
      (this._def = t),
      (this._props = n),
      (this._instance = null),
      (this._connected = !1),
      (this._resolved = !1),
      (this._numberProps = null),
      (this._ob = null),
      this.shadowRoot && r
        ? r(this._createVNode(), this.shadowRoot)
        : (this.attachShadow({ mode: "open" }),
          this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    (this._connected = !0),
      this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    (this._connected = !1),
      this._ob && (this._ob.disconnect(), (this._ob = null)),
      Lr(() => {
        this._connected || (Ss(null, this.shadowRoot), (this._instance = null));
      });
  }
  _resolveDef() {
    this._resolved = !0;
    for (let r = 0; r < this.attributes.length; r++)
      this._setAttr(this.attributes[r].name);
    (this._ob = new MutationObserver((r) => {
      for (const s of r) this._setAttr(s.attributeName);
    })),
      this._ob.observe(this, { attributes: !0 });
    const t = (r, s = !1) => {
        const { props: i, styles: o } = r;
        let a;
        if (i && !V(i))
          for (const l in i) {
            const u = i[l];
            (u === Number || (u && u.type === Number)) &&
              (l in this._props && (this._props[l] = br(this._props[l])),
              ((a || (a = Object.create(null)))[$e(l)] = !0));
          }
        (this._numberProps = a),
          s && this._resolveProps(r),
          this._applyStyles(o),
          this._update();
      },
      n = this._def.__asyncLoader;
    n ? n().then((r) => t(r, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: n } = t,
      r = V(n) ? n : Object.keys(n || {});
    for (const s of Object.keys(this))
      s[0] !== "_" && r.includes(s) && this._setProp(s, this[s], !0, !1);
    for (const s of r.map($e))
      Object.defineProperty(this, s, {
        get() {
          return this._getProp(s);
        },
        set(i) {
          this._setProp(s, i);
        },
      });
  }
  _setAttr(t) {
    let n = this.getAttribute(t);
    const r = $e(t);
    this._numberProps && this._numberProps[r] && (n = br(n)),
      this._setProp(r, n, !1);
  }
  _getProp(t) {
    return this._props[t];
  }
  _setProp(t, n, r = !0, s = !0) {
    n !== this._props[t] &&
      ((this._props[t] = n),
      s && this._instance && this._update(),
      r &&
        (n === !0
          ? this.setAttribute(Ye(t), "")
          : typeof n == "string" || typeof n == "number"
          ? this.setAttribute(Ye(t), n + "")
          : n || this.removeAttribute(Ye(t))));
  }
  _update() {
    Ss(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = ee(this._def, me({}, this._props));
    return (
      this._instance ||
        (t.ce = (n) => {
          (this._instance = n), (n.isCE = !0);
          const r = (i, o) => {
            this.dispatchEvent(new CustomEvent(i, { detail: o }));
          };
          n.emit = (i, ...o) => {
            r(i, o), Ye(i) !== i && r(Ye(i), o);
          };
          let s = this;
          for (; (s = s && (s.parentNode || s.host)); )
            if (s instanceof Qr) {
              (n.parent = s._instance), (n.provides = s._instance.provides);
              break;
            }
        }),
      t
    );
  }
  _applyStyles(t) {
    t &&
      t.forEach((n) => {
        const r = document.createElement("style");
        (r.textContent = n), this.shadowRoot.appendChild(r);
      });
  }
}
function Af(e = "$style") {
  {
    const t = _t();
    if (!t) return ce;
    const n = t.type.__cssModules;
    if (!n) return ce;
    const r = n[e];
    return r || ce;
  }
}
function kf(e) {
  const t = _t();
  if (!t) return;
  const n = (t.ut = (s = e(t.proxy)) => {
      Array.from(
        document.querySelectorAll(`[data-v-owner="${t.uid}"]`)
      ).forEach((i) => Ts(i, s));
    }),
    r = () => {
      const s = e(t.proxy);
      ks(t.subTree, s), n(s);
    };
  sl(r),
    tr(() => {
      const s = new MutationObserver(r);
      s.observe(t.subTree.el.parentNode, { childList: !0 }),
        Ur(() => s.disconnect());
    });
}
function ks(e, t) {
  if (e.shapeFlag & 128) {
    const n = e.suspense;
    (e = n.activeBranch),
      n.pendingBranch &&
        !n.isHydrating &&
        n.effects.push(() => {
          ks(n.activeBranch, t);
        });
  }
  for (; e.component; ) e = e.component.subTree;
  if (e.shapeFlag & 1 && e.el) Ts(e.el, t);
  else if (e.type === _e) e.children.forEach((n) => ks(n, t));
  else if (e.type === Wt) {
    let { el: n, anchor: r } = e;
    for (; n && (Ts(n, t), n !== r); ) n = n.nextSibling;
  }
}
function Ts(e, t) {
  if (e.nodeType === 1) {
    const n = e.style;
    for (const r in t) n.setProperty(`--${r}`, t[r]);
  }
}
const ea = new WeakMap(),
  ta = new WeakMap(),
  Ar = Symbol("_moveCb"),
  Gi = Symbol("_enterCb"),
  na = {
    name: "TransitionGroup",
    props: me({}, sf, { tag: String, moveClass: String }),
    setup(e, { slots: t }) {
      const n = _t(),
        r = Js();
      let s, i;
      return (
        zr(() => {
          if (!s.length) return;
          const o = e.moveClass || `${e.name || "v"}-move`;
          if (!Hf(s[0].el, n.vnode.el, o)) return;
          s.forEach(Mf), s.forEach(Pf);
          const a = s.filter(xf);
          Xl(),
            a.forEach((l) => {
              const u = l.el,
                c = u.style;
              dt(u, o),
                (c.transform = c.webkitTransform = c.transitionDuration = "");
              const f = (u[Ar] = (h) => {
                (h && h.target !== u) ||
                  ((!h || /transform$/.test(h.propertyName)) &&
                    (u.removeEventListener("transitionend", f),
                    (u[Ar] = null),
                    Rt(u, o)));
              });
              u.addEventListener("transitionend", f);
            });
        }),
        () => {
          const o = ie(e),
            a = Yl(o);
          let l = o.tag || _e;
          (s = i), (i = t.default ? $r(t.default()) : []);
          for (let u = 0; u < i.length; u++) {
            const c = i[u];
            c.key != null && Qt(c, fn(c, a, r, n));
          }
          if (s)
            for (let u = 0; u < s.length; u++) {
              const c = s[u];
              Qt(c, fn(c, a, r, n)), ea.set(c, c.el.getBoundingClientRect());
            }
          return ee(l, null, i);
        }
      );
    },
  },
  Tf = (e) => delete e.mode;
na.props;
const Sf = na;
function Mf(e) {
  const t = e.el;
  t[Ar] && t[Ar](), t[Gi] && t[Gi]();
}
function Pf(e) {
  ta.set(e, e.el.getBoundingClientRect());
}
function xf(e) {
  const t = ea.get(e),
    n = ta.get(e),
    r = t.left - n.left,
    s = t.top - n.top;
  if (r || s) {
    const i = e.el.style;
    return (
      (i.transform = i.webkitTransform = `translate(${r}px,${s}px)`),
      (i.transitionDuration = "0s"),
      e
    );
  }
}
function Hf(e, t, n) {
  const r = e.cloneNode(),
    s = e[pn];
  s &&
    s.forEach((a) => {
      a.split(/\s+/).forEach((l) => l && r.classList.remove(l));
    }),
    n.split(/\s+/).forEach((a) => a && r.classList.add(a)),
    (r.style.display = "none");
  const i = t.nodeType === 1 ? t : t.parentNode;
  i.appendChild(r);
  const { hasTransform: o } = Jl(r);
  return i.removeChild(r), o;
}
const Dt = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return V(t) ? (n) => on(t, n) : t;
};
function Of(e) {
  e.target.composing = !0;
}
function Zi(e) {
  const t = e.target;
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event("input")));
}
const Ze = Symbol("_assign"),
  kr = {
    created(e, { modifiers: { lazy: t, trim: n, number: r } }, s) {
      e[Ze] = Dt(s);
      const i = r || (s.props && s.props.type === "number");
      pt(e, t ? "change" : "input", (o) => {
        if (o.target.composing) return;
        let a = e.value;
        n && (a = a.trim()), i && (a = vr(a)), e[Ze](a);
      }),
        n &&
          pt(e, "change", () => {
            e.value = e.value.trim();
          }),
        t ||
          (pt(e, "compositionstart", Of),
          pt(e, "compositionend", Zi),
          pt(e, "change", Zi));
    },
    mounted(e, { value: t }) {
      e.value = t ?? "";
    },
    beforeUpdate(
      e,
      { value: t, modifiers: { lazy: n, trim: r, number: s } },
      i
    ) {
      if (
        ((e[Ze] = Dt(i)),
        e.composing ||
          (document.activeElement === e &&
            e.type !== "range" &&
            (n ||
              (r && e.value.trim() === t) ||
              ((s || e.type === "number") && vr(e.value) === t))))
      )
        return;
      const o = t ?? "";
      e.value !== o && (e.value = o);
    },
  },
  li = {
    deep: !0,
    created(e, t, n) {
      (e[Ze] = Dt(n)),
        pt(e, "change", () => {
          const r = e._modelValue,
            s = gn(e),
            i = e.checked,
            o = e[Ze];
          if (V(r)) {
            const a = Pr(r, s),
              l = a !== -1;
            if (i && !l) o(r.concat(s));
            else if (!i && l) {
              const u = [...r];
              u.splice(a, 1), o(u);
            }
          } else if (Xt(r)) {
            const a = new Set(r);
            i ? a.add(s) : a.delete(s), o(a);
          } else o(sa(e, i));
        });
    },
    mounted: eo,
    beforeUpdate(e, t, n) {
      (e[Ze] = Dt(n)), eo(e, t, n);
    },
  };
function eo(e, { value: t, oldValue: n }, r) {
  (e._modelValue = t),
    V(t)
      ? (e.checked = Pr(t, r.props.value) > -1)
      : Xt(t)
      ? (e.checked = t.has(r.props.value))
      : t !== n && (e.checked = Ht(t, sa(e, !0)));
}
const ai = {
    created(e, { value: t }, n) {
      (e.checked = Ht(t, n.props.value)),
        (e[Ze] = Dt(n)),
        pt(e, "change", () => {
          e[Ze](gn(e));
        });
    },
    beforeUpdate(e, { value: t, oldValue: n }, r) {
      (e[Ze] = Dt(r)), t !== n && (e.checked = Ht(t, r.props.value));
    },
  },
  ra = {
    deep: !0,
    created(e, { value: t, modifiers: { number: n } }, r) {
      const s = Xt(t);
      pt(e, "change", () => {
        const i = Array.prototype.filter
          .call(e.options, (o) => o.selected)
          .map((o) => (n ? vr(gn(o)) : gn(o)));
        e[Ze](e.multiple ? (s ? new Set(i) : i) : i[0]);
      }),
        (e[Ze] = Dt(r));
    },
    mounted(e, { value: t }) {
      to(e, t);
    },
    beforeUpdate(e, t, n) {
      e[Ze] = Dt(n);
    },
    updated(e, { value: t }) {
      to(e, t);
    },
  };
function to(e, t) {
  const n = e.multiple;
  if (!(n && !V(t) && !Xt(t))) {
    for (let r = 0, s = e.options.length; r < s; r++) {
      const i = e.options[r],
        o = gn(i);
      if (n) V(t) ? (i.selected = Pr(t, o) > -1) : (i.selected = t.has(o));
      else if (Ht(gn(i), t)) {
        e.selectedIndex !== r && (e.selectedIndex = r);
        return;
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function gn(e) {
  return "_value" in e ? e._value : e.value;
}
function sa(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
const ia = {
  created(e, t, n) {
    hr(e, t, n, null, "created");
  },
  mounted(e, t, n) {
    hr(e, t, n, null, "mounted");
  },
  beforeUpdate(e, t, n, r) {
    hr(e, t, n, r, "beforeUpdate");
  },
  updated(e, t, n, r) {
    hr(e, t, n, r, "updated");
  },
};
function oa(e, t) {
  switch (e) {
    case "SELECT":
      return ra;
    case "TEXTAREA":
      return kr;
    default:
      switch (t) {
        case "checkbox":
          return li;
        case "radio":
          return ai;
        default:
          return kr;
      }
  }
}
function hr(e, t, n, r, s) {
  const o = oa(e.tagName, n.props && n.props.type)[s];
  o && o(e, t, n, r);
}
function If() {
  (kr.getSSRProps = ({ value: e }) => ({ value: e })),
    (ai.getSSRProps = ({ value: e }, t) => {
      if (t.props && Ht(t.props.value, e)) return { checked: !0 };
    }),
    (li.getSSRProps = ({ value: e }, t) => {
      if (V(e)) {
        if (t.props && Pr(e, t.props.value) > -1) return { checked: !0 };
      } else if (Xt(e)) {
        if (t.props && e.has(t.props.value)) return { checked: !0 };
      } else if (e) return { checked: !0 };
    }),
    (ia.getSSRProps = (e, t) => {
      if (typeof t.type != "string") return;
      const n = oa(t.type.toUpperCase(), t.props && t.props.type);
      if (n.getSSRProps) return n.getSSRProps(e, t);
    });
}
const Lf = ["ctrl", "shift", "alt", "meta"],
  Df = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => "button" in e && e.button !== 0,
    middle: (e) => "button" in e && e.button !== 1,
    right: (e) => "button" in e && e.button !== 2,
    exact: (e, t) => Lf.some((n) => e[`${n}Key`] && !t.includes(n)),
  },
  Nf =
    (e, t) =>
    (n, ...r) => {
      for (let s = 0; s < t.length; s++) {
        const i = Df[t[s]];
        if (i && i(n, t)) return;
      }
      return e(n, ...r);
    },
  Bf = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace",
  },
  $f = (e, t) => (n) => {
    if (!("key" in n)) return;
    const r = Ye(n.key);
    if (t.some((s) => s === r || Bf[s] === r)) return e(n);
  },
  la = me({ patchProp: wf }, rf);
let Ln,
  no = !1;
function aa() {
  return Ln || (Ln = Sl(la));
}
function ua() {
  return (Ln = no ? Ln : Ml(la)), (no = !0), Ln;
}
const Ss = (...e) => {
    aa().render(...e);
  },
  ca = (...e) => {
    ua().hydrate(...e);
  },
  fa = (...e) => {
    const t = aa().createApp(...e),
      { mount: n } = t;
    return (
      (t.mount = (r) => {
        const s = da(r);
        if (!s) return;
        const i = t._component;
        !X(i) && !i.render && !i.template && (i.template = s.innerHTML),
          (s.innerHTML = "");
        const o = n(s, !1, s instanceof SVGElement);
        return (
          s instanceof Element &&
            (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")),
          o
        );
      }),
      t
    );
  },
  Ff = (...e) => {
    const t = ua().createApp(...e),
      { mount: n } = t;
    return (
      (t.mount = (r) => {
        const s = da(r);
        if (s) return n(s, !0, s instanceof SVGElement);
      }),
      t
    );
  };
function da(e) {
  return ve(e) ? document.querySelector(e) : e;
}
let ro = !1;
const zf = () => {
    ro || ((ro = !0), If(), uf());
  },
  jf = () => {},
  Uf = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        BaseTransition: ol,
        BaseTransitionPropsValidators: Xs,
        Comment: Ie,
        EffectScope: Ns,
        Fragment: _e,
        KeepAlive: ec,
        ReactiveEffect: cn,
        Static: Wt,
        Suspense: zu,
        Teleport: Fc,
        Text: Yt,
        Transition: Ee,
        TransitionGroup: Sf,
        VueElement: Qr,
        assertNumber: Mu,
        callWithAsyncErrorHandling: qe,
        callWithErrorHandling: vt,
        camelize: $e,
        capitalize: Qn,
        cloneVNode: ct,
        compatUtils: tf,
        compile: jf,
        computed: Xe,
        createApp: fa,
        createBlock: Je,
        createCommentVNode: xe,
        createElementBlock: he,
        createElementVNode: ge,
        createHydrationRenderer: Ml,
        createPropsRestProxy: yc,
        createRenderer: Sl,
        createSSRApp: Ff,
        createSlots: sc,
        createStaticVNode: Nl,
        createTextVNode: ri,
        createVNode: ee,
        customRef: wu,
        defineAsyncComponent: Gu,
        defineComponent: Zn,
        defineCustomElement: Zl,
        defineEmits: uc,
        defineExpose: cc,
        defineModel: hc,
        defineOptions: fc,
        defineProps: ac,
        defineSSRCustomElement: Cf,
        defineSlots: dc,
        get devtools() {
          return tn;
        },
        effect: Qa,
        effectScope: Va,
        getCurrentInstance: _t,
        getCurrentScope: Lo,
        getTransitionRawChildren: $r,
        guardReactiveProps: Dl,
        h: Kr,
        handleError: Gt,
        hasInjectionContext: Mc,
        hydrate: ca,
        initCustomFormatter: Jc,
        initDirectivesForSSR: zf,
        inject: ut,
        isMemoSame: Wl,
        isProxy: js,
        isReactive: Vt,
        isReadonly: Kt,
        isRef: Re,
        isRuntimeOnly: Kc,
        isShallow: Bn,
        isVNode: It,
        markRaw: Us,
        mergeDefaults: bc,
        mergeModels: _c,
        mergeProps: Bl,
        nextTick: Lr,
        normalizeClass: Nt,
        normalizeProps: Fa,
        normalizeStyle: We,
        onActivated: al,
        onBeforeMount: fl,
        onBeforeUnmount: jr,
        onBeforeUpdate: dl,
        onDeactivated: ul,
        onErrorCaptured: ml,
        onMounted: tr,
        onRenderTracked: gl,
        onRenderTriggered: pl,
        onScopeDispose: qa,
        onServerPrefetch: hl,
        onUnmounted: Ur,
        onUpdated: zr,
        openBlock: ne,
        popScopeId: Xn,
        provide: Hn,
        proxyRefs: Ws,
        pushScopeId: Jn,
        queuePostFlushCb: yr,
        reactive: Yn,
        readonly: zs,
        ref: st,
        registerRuntimeCompiler: Wc,
        render: Ss,
        renderList: dn,
        renderSlot: ic,
        resolveComponent: Vr,
        resolveDirective: rc,
        resolveDynamicComponent: bl,
        resolveFilter: ef,
        resolveTransitionHooks: fn,
        setBlockTracking: ws,
        setDevtoolsHook: el,
        setTransitionHooks: Qt,
        shallowReactive: Fs,
        shallowReadonly: gu,
        shallowRef: Qo,
        ssrContextKey: Vl,
        ssrUtils: Zc,
        stop: Ya,
        toDisplayString: cs,
        toHandlerKey: Pn,
        toHandlers: oc,
        toRaw: ie,
        toRef: Au,
        toRefs: Eu,
        toValue: bu,
        transformVNodeArgs: zc,
        triggerRef: vu,
        unref: mt,
        useAttrs: mc,
        useCssModule: Af,
        useCssVars: kf,
        useModel: vc,
        useSSRContext: ql,
        useSlots: gc,
        useTransitionState: Js,
        vModelCheckbox: li,
        vModelDynamic: ia,
        vModelRadio: ai,
        vModelSelect: ra,
        vModelText: kr,
        vShow: Gl,
        version: Kl,
        warn: Su,
        watch: Mt,
        watchEffect: Ku,
        watchPostEffect: sl,
        watchSyncEffect: Qu,
        withAsyncContext: wc,
        withCtx: ye,
        withDefaults: pc,
        withDirectives: Ju,
        withKeys: $f,
        withMemo: Xc,
        withModifiers: Nf,
        withScopeId: Lu,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
/*!
 * vue-router v4.2.5
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ const nn = typeof window < "u";
function Vf(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const le = Object.assign;
function is(e, t) {
  const n = {};
  for (const r in t) {
    const s = t[r];
    n[r] = it(s) ? s.map(e) : e(s);
  }
  return n;
}
const Dn = () => {},
  it = Array.isArray,
  qf = /\/$/,
  Wf = (e) => e.replace(qf, "");
function os(e, t, n = "/") {
  let r,
    s = {},
    i = "",
    o = "";
  const a = t.indexOf("#");
  let l = t.indexOf("?");
  return (
    a < l && a >= 0 && (l = -1),
    l > -1 &&
      ((r = t.slice(0, l)),
      (i = t.slice(l + 1, a > -1 ? a : t.length)),
      (s = e(i))),
    a > -1 && ((r = r || t.slice(0, a)), (o = t.slice(a, t.length))),
    (r = Jf(r ?? t, n)),
    { fullPath: r + (i && "?") + i + o, path: r, query: s, hash: o }
  );
}
function Kf(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function so(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || "/";
}
function Qf(e, t, n) {
  const r = t.matched.length - 1,
    s = n.matched.length - 1;
  return (
    r > -1 &&
    r === s &&
    mn(t.matched[r], n.matched[s]) &&
    ha(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  );
}
function mn(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function ha(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (!Yf(e[n], t[n])) return !1;
  return !0;
}
function Yf(e, t) {
  return it(e) ? io(e, t) : it(t) ? io(t, e) : e === t;
}
function io(e, t) {
  return it(t)
    ? e.length === t.length && e.every((n, r) => n === t[r])
    : e.length === 1 && e[0] === t;
}
function Jf(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const n = t.split("/"),
    r = e.split("/"),
    s = r[r.length - 1];
  (s === ".." || s === ".") && r.push("");
  let i = n.length - 1,
    o,
    a;
  for (o = 0; o < r.length; o++)
    if (((a = r[o]), a !== "."))
      if (a === "..") i > 1 && i--;
      else break;
  return (
    n.slice(0, i).join("/") +
    "/" +
    r.slice(o - (o === r.length ? 1 : 0)).join("/")
  );
}
var Wn;
(function (e) {
  (e.pop = "pop"), (e.push = "push");
})(Wn || (Wn = {}));
var Nn;
(function (e) {
  (e.back = "back"), (e.forward = "forward"), (e.unknown = "");
})(Nn || (Nn = {}));
function Xf(e) {
  if (!e)
    if (nn) {
      const t = document.querySelector("base");
      (e = (t && t.getAttribute("href")) || "/"),
        (e = e.replace(/^\w+:\/\/[^\/]+/, ""));
    } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Wf(e);
}
const Gf = /^[^#]+#/;
function Zf(e, t) {
  return e.replace(Gf, "#") + t;
}
function ed(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    r = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: r.left - n.left - (t.left || 0),
    top: r.top - n.top - (t.top || 0),
  };
}
const Yr = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function td(e) {
  let t;
  if ("el" in e) {
    const n = e.el,
      r = typeof n == "string" && n.startsWith("#"),
      s =
        typeof n == "string"
          ? r
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n;
    if (!s) return;
    t = ed(s, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.pageXOffset,
        t.top != null ? t.top : window.pageYOffset
      );
}
function oo(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Ms = new Map();
function nd(e, t) {
  Ms.set(e, t);
}
function rd(e) {
  const t = Ms.get(e);
  return Ms.delete(e), t;
}
let sd = () => location.protocol + "//" + location.host;
function pa(e, t) {
  const { pathname: n, search: r, hash: s } = t,
    i = e.indexOf("#");
  if (i > -1) {
    let a = s.includes(e.slice(i)) ? e.slice(i).length : 1,
      l = s.slice(a);
    return l[0] !== "/" && (l = "/" + l), so(l, "");
  }
  return so(n, e) + r + s;
}
function id(e, t, n, r) {
  let s = [],
    i = [],
    o = null;
  const a = ({ state: h }) => {
    const _ = pa(e, location),
      v = n.value,
      w = t.value;
    let S = 0;
    if (h) {
      if (((n.value = _), (t.value = h), o && o === v)) {
        o = null;
        return;
      }
      S = w ? h.position - w.position : 0;
    } else r(_);
    s.forEach((A) => {
      A(n.value, v, {
        delta: S,
        type: Wn.pop,
        direction: S ? (S > 0 ? Nn.forward : Nn.back) : Nn.unknown,
      });
    });
  };
  function l() {
    o = n.value;
  }
  function u(h) {
    s.push(h);
    const _ = () => {
      const v = s.indexOf(h);
      v > -1 && s.splice(v, 1);
    };
    return i.push(_), _;
  }
  function c() {
    const { history: h } = window;
    h.state && h.replaceState(le({}, h.state, { scroll: Yr() }), "");
  }
  function f() {
    for (const h of i) h();
    (i = []),
      window.removeEventListener("popstate", a),
      window.removeEventListener("beforeunload", c);
  }
  return (
    window.addEventListener("popstate", a),
    window.addEventListener("beforeunload", c, { passive: !0 }),
    { pauseListeners: l, listen: u, destroy: f }
  );
}
function lo(e, t, n, r = !1, s = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: r,
    position: window.history.length,
    scroll: s ? Yr() : null,
  };
}
function od(e) {
  const { history: t, location: n } = window,
    r = { value: pa(e, n) },
    s = { value: t.state };
  s.value ||
    i(
      r.value,
      {
        back: null,
        current: r.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0
    );
  function i(l, u, c) {
    const f = e.indexOf("#"),
      h =
        f > -1
          ? (n.host && document.querySelector("base") ? e : e.slice(f)) + l
          : sd() + e + l;
    try {
      t[c ? "replaceState" : "pushState"](u, "", h), (s.value = u);
    } catch (_) {
      console.error(_), n[c ? "replace" : "assign"](h);
    }
  }
  function o(l, u) {
    const c = le({}, t.state, lo(s.value.back, l, s.value.forward, !0), u, {
      position: s.value.position,
    });
    i(l, c, !0), (r.value = l);
  }
  function a(l, u) {
    const c = le({}, s.value, t.state, { forward: l, scroll: Yr() });
    i(c.current, c, !0);
    const f = le({}, lo(r.value, l, null), { position: c.position + 1 }, u);
    i(l, f, !1), (r.value = l);
  }
  return { location: r, state: s, push: a, replace: o };
}
function ld(e) {
  e = Xf(e);
  const t = od(e),
    n = id(e, t.state, t.location, t.replace);
  function r(i, o = !0) {
    o || n.pauseListeners(), history.go(i);
  }
  const s = le(
    { location: "", base: e, go: r, createHref: Zf.bind(null, e) },
    t,
    n
  );
  return (
    Object.defineProperty(s, "location", {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(s, "state", {
      enumerable: !0,
      get: () => t.state.value,
    }),
    s
  );
}
function ad(e) {
  return typeof e == "string" || (e && typeof e == "object");
}
function ga(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const Ct = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  ma = Symbol("");
var ao;
(function (e) {
  (e[(e.aborted = 4)] = "aborted"),
    (e[(e.cancelled = 8)] = "cancelled"),
    (e[(e.duplicated = 16)] = "duplicated");
})(ao || (ao = {}));
function vn(e, t) {
  return le(new Error(), { type: e, [ma]: !0 }, t);
}
function ft(e, t) {
  return e instanceof Error && ma in e && (t == null || !!(e.type & t));
}
const uo = "[^/]+?",
  ud = { sensitive: !1, strict: !1, start: !0, end: !0 },
  cd = /[.+*?^${}()[\]/\\]/g;
function fd(e, t) {
  const n = le({}, ud, t),
    r = [];
  let s = n.start ? "^" : "";
  const i = [];
  for (const u of e) {
    const c = u.length ? [] : [90];
    n.strict && !u.length && (s += "/");
    for (let f = 0; f < u.length; f++) {
      const h = u[f];
      let _ = 40 + (n.sensitive ? 0.25 : 0);
      if (h.type === 0)
        f || (s += "/"), (s += h.value.replace(cd, "\\$&")), (_ += 40);
      else if (h.type === 1) {
        const { value: v, repeatable: w, optional: S, regexp: A } = h;
        i.push({ name: v, repeatable: w, optional: S });
        const y = A || uo;
        if (y !== uo) {
          _ += 10;
          try {
            new RegExp(`(${y})`);
          } catch (g) {
            throw new Error(
              `Invalid custom RegExp for param "${v}" (${y}): ` + g.message
            );
          }
        }
        let m = w ? `((?:${y})(?:/(?:${y}))*)` : `(${y})`;
        f || (m = S && u.length < 2 ? `(?:/${m})` : "/" + m),
          S && (m += "?"),
          (s += m),
          (_ += 20),
          S && (_ += -8),
          w && (_ += -20),
          y === ".*" && (_ += -50);
      }
      c.push(_);
    }
    r.push(c);
  }
  if (n.strict && n.end) {
    const u = r.length - 1;
    r[u][r[u].length - 1] += 0.7000000000000001;
  }
  n.strict || (s += "/?"), n.end ? (s += "$") : n.strict && (s += "(?:/|$)");
  const o = new RegExp(s, n.sensitive ? "" : "i");
  function a(u) {
    const c = u.match(o),
      f = {};
    if (!c) return null;
    for (let h = 1; h < c.length; h++) {
      const _ = c[h] || "",
        v = i[h - 1];
      f[v.name] = _ && v.repeatable ? _.split("/") : _;
    }
    return f;
  }
  function l(u) {
    let c = "",
      f = !1;
    for (const h of e) {
      (!f || !c.endsWith("/")) && (c += "/"), (f = !1);
      for (const _ of h)
        if (_.type === 0) c += _.value;
        else if (_.type === 1) {
          const { value: v, repeatable: w, optional: S } = _,
            A = v in u ? u[v] : "";
          if (it(A) && !w)
            throw new Error(
              `Provided param "${v}" is an array but it is not repeatable (* or + modifiers)`
            );
          const y = it(A) ? A.join("/") : A;
          if (!y)
            if (S)
              h.length < 2 &&
                (c.endsWith("/") ? (c = c.slice(0, -1)) : (f = !0));
            else throw new Error(`Missing required param "${v}"`);
          c += y;
        }
    }
    return c || "/";
  }
  return { re: o, score: r, keys: i, parse: a, stringify: l };
}
function dd(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const r = t[n] - e[n];
    if (r) return r;
    n++;
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 40 + 40
      ? -1
      : 1
    : e.length > t.length
    ? t.length === 1 && t[0] === 40 + 40
      ? 1
      : -1
    : 0;
}
function hd(e, t) {
  let n = 0;
  const r = e.score,
    s = t.score;
  for (; n < r.length && n < s.length; ) {
    const i = dd(r[n], s[n]);
    if (i) return i;
    n++;
  }
  if (Math.abs(s.length - r.length) === 1) {
    if (co(r)) return 1;
    if (co(s)) return -1;
  }
  return s.length - r.length;
}
function co(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const pd = { type: 0, value: "" },
  gd = /[a-zA-Z0-9_]/;
function md(e) {
  if (!e) return [[]];
  if (e === "/") return [[pd]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(_) {
    throw new Error(`ERR (${n})/"${u}": ${_}`);
  }
  let n = 0,
    r = n;
  const s = [];
  let i;
  function o() {
    i && s.push(i), (i = []);
  }
  let a = 0,
    l,
    u = "",
    c = "";
  function f() {
    u &&
      (n === 0
        ? i.push({ type: 0, value: u })
        : n === 1 || n === 2 || n === 3
        ? (i.length > 1 &&
            (l === "*" || l === "+") &&
            t(
              `A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`
            ),
          i.push({
            type: 1,
            value: u,
            regexp: c,
            repeatable: l === "*" || l === "+",
            optional: l === "*" || l === "?",
          }))
        : t("Invalid state to consume buffer"),
      (u = ""));
  }
  function h() {
    u += l;
  }
  for (; a < e.length; ) {
    if (((l = e[a++]), l === "\\" && n !== 2)) {
      (r = n), (n = 4);
      continue;
    }
    switch (n) {
      case 0:
        l === "/" ? (u && f(), o()) : l === ":" ? (f(), (n = 1)) : h();
        break;
      case 4:
        h(), (n = r);
        break;
      case 1:
        l === "("
          ? (n = 2)
          : gd.test(l)
          ? h()
          : (f(), (n = 0), l !== "*" && l !== "?" && l !== "+" && a--);
        break;
      case 2:
        l === ")"
          ? c[c.length - 1] == "\\"
            ? (c = c.slice(0, -1) + l)
            : (n = 3)
          : (c += l);
        break;
      case 3:
        f(), (n = 0), l !== "*" && l !== "?" && l !== "+" && a--, (c = "");
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${u}"`), f(), o(), s;
}
function vd(e, t, n) {
  const r = fd(md(e.path), n),
    s = le(r, { record: e, parent: t, children: [], alias: [] });
  return t && !s.record.aliasOf == !t.record.aliasOf && t.children.push(s), s;
}
function bd(e, t) {
  const n = [],
    r = new Map();
  t = po({ strict: !1, end: !0, sensitive: !1 }, t);
  function s(c) {
    return r.get(c);
  }
  function i(c, f, h) {
    const _ = !h,
      v = _d(c);
    v.aliasOf = h && h.record;
    const w = po(t, c),
      S = [v];
    if ("alias" in c) {
      const m = typeof c.alias == "string" ? [c.alias] : c.alias;
      for (const g of m)
        S.push(
          le({}, v, {
            components: h ? h.record.components : v.components,
            path: g,
            aliasOf: h ? h.record : v,
          })
        );
    }
    let A, y;
    for (const m of S) {
      const { path: g } = m;
      if (f && g[0] !== "/") {
        const k = f.record.path,
          B = k[k.length - 1] === "/" ? "" : "/";
        m.path = f.record.path + (g && B + g);
      }
      if (
        ((A = vd(m, f, w)),
        h
          ? h.alias.push(A)
          : ((y = y || A),
            y !== A && y.alias.push(A),
            _ && c.name && !ho(A) && o(c.name)),
        v.children)
      ) {
        const k = v.children;
        for (let B = 0; B < k.length; B++) i(k[B], A, h && h.children[B]);
      }
      (h = h || A),
        ((A.record.components && Object.keys(A.record.components).length) ||
          A.record.name ||
          A.record.redirect) &&
          l(A);
    }
    return y
      ? () => {
          o(y);
        }
      : Dn;
  }
  function o(c) {
    if (ga(c)) {
      const f = r.get(c);
      f &&
        (r.delete(c),
        n.splice(n.indexOf(f), 1),
        f.children.forEach(o),
        f.alias.forEach(o));
    } else {
      const f = n.indexOf(c);
      f > -1 &&
        (n.splice(f, 1),
        c.record.name && r.delete(c.record.name),
        c.children.forEach(o),
        c.alias.forEach(o));
    }
  }
  function a() {
    return n;
  }
  function l(c) {
    let f = 0;
    for (
      ;
      f < n.length &&
      hd(c, n[f]) >= 0 &&
      (c.record.path !== n[f].record.path || !va(c, n[f]));

    )
      f++;
    n.splice(f, 0, c), c.record.name && !ho(c) && r.set(c.record.name, c);
  }
  function u(c, f) {
    let h,
      _ = {},
      v,
      w;
    if ("name" in c && c.name) {
      if (((h = r.get(c.name)), !h)) throw vn(1, { location: c });
      (w = h.record.name),
        (_ = le(
          fo(
            f.params,
            h.keys.filter((y) => !y.optional).map((y) => y.name)
          ),
          c.params &&
            fo(
              c.params,
              h.keys.map((y) => y.name)
            )
        )),
        (v = h.stringify(_));
    } else if ("path" in c)
      (v = c.path),
        (h = n.find((y) => y.re.test(v))),
        h && ((_ = h.parse(v)), (w = h.record.name));
    else {
      if (((h = f.name ? r.get(f.name) : n.find((y) => y.re.test(f.path))), !h))
        throw vn(1, { location: c, currentLocation: f });
      (w = h.record.name),
        (_ = le({}, f.params, c.params)),
        (v = h.stringify(_));
    }
    const S = [];
    let A = h;
    for (; A; ) S.unshift(A.record), (A = A.parent);
    return { name: w, path: v, params: _, matched: S, meta: wd(S) };
  }
  return (
    e.forEach((c) => i(c)),
    {
      addRoute: i,
      resolve: u,
      removeRoute: o,
      getRoutes: a,
      getRecordMatcher: s,
    }
  );
}
function fo(e, t) {
  const n = {};
  for (const r of t) r in e && (n[r] = e[r]);
  return n;
}
function _d(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: yd(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      "components" in e
        ? e.components || null
        : e.component && { default: e.component },
  };
}
function yd(e) {
  const t = {},
    n = e.props || !1;
  if ("component" in e) t.default = n;
  else for (const r in e.components) t[r] = typeof n == "object" ? n[r] : n;
  return t;
}
function ho(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function wd(e) {
  return e.reduce((t, n) => le(t, n.meta), {});
}
function po(e, t) {
  const n = {};
  for (const r in e) n[r] = r in t ? t[r] : e[r];
  return n;
}
function va(e, t) {
  return t.children.some((n) => n === e || va(e, n));
}
const ba = /#/g,
  Ed = /&/g,
  Cd = /\//g,
  Rd = /=/g,
  Ad = /\?/g,
  _a = /\+/g,
  kd = /%5B/g,
  Td = /%5D/g,
  ya = /%5E/g,
  Sd = /%60/g,
  wa = /%7B/g,
  Md = /%7C/g,
  Ea = /%7D/g,
  Pd = /%20/g;
function ui(e) {
  return encodeURI("" + e)
    .replace(Md, "|")
    .replace(kd, "[")
    .replace(Td, "]");
}
function xd(e) {
  return ui(e).replace(wa, "{").replace(Ea, "}").replace(ya, "^");
}
function Ps(e) {
  return ui(e)
    .replace(_a, "%2B")
    .replace(Pd, "+")
    .replace(ba, "%23")
    .replace(Ed, "%26")
    .replace(Sd, "`")
    .replace(wa, "{")
    .replace(Ea, "}")
    .replace(ya, "^");
}
function Hd(e) {
  return Ps(e).replace(Rd, "%3D");
}
function Od(e) {
  return ui(e).replace(ba, "%23").replace(Ad, "%3F");
}
function Id(e) {
  return e == null ? "" : Od(e).replace(Cd, "%2F");
}
function Tr(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {}
  return "" + e;
}
function Ld(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const r = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let s = 0; s < r.length; ++s) {
    const i = r[s].replace(_a, " "),
      o = i.indexOf("="),
      a = Tr(o < 0 ? i : i.slice(0, o)),
      l = o < 0 ? null : Tr(i.slice(o + 1));
    if (a in t) {
      let u = t[a];
      it(u) || (u = t[a] = [u]), u.push(l);
    } else t[a] = l;
  }
  return t;
}
function go(e) {
  let t = "";
  for (let n in e) {
    const r = e[n];
    if (((n = Hd(n)), r == null)) {
      r !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (it(r) ? r.map((i) => i && Ps(i)) : [r && Ps(r)]).forEach((i) => {
      i !== void 0 &&
        ((t += (t.length ? "&" : "") + n), i != null && (t += "=" + i));
    });
  }
  return t;
}
function Dd(e) {
  const t = {};
  for (const n in e) {
    const r = e[n];
    r !== void 0 &&
      (t[n] = it(r)
        ? r.map((s) => (s == null ? null : "" + s))
        : r == null
        ? r
        : "" + r);
  }
  return t;
}
const Nd = Symbol(""),
  mo = Symbol(""),
  ci = Symbol(""),
  Ca = Symbol(""),
  xs = Symbol("");
function An() {
  let e = [];
  function t(r) {
    return (
      e.push(r),
      () => {
        const s = e.indexOf(r);
        s > -1 && e.splice(s, 1);
      }
    );
  }
  function n() {
    e = [];
  }
  return { add: t, list: () => e.slice(), reset: n };
}
function Tt(e, t, n, r, s) {
  const i = r && (r.enterCallbacks[s] = r.enterCallbacks[s] || []);
  return () =>
    new Promise((o, a) => {
      const l = (f) => {
          f === !1
            ? a(vn(4, { from: n, to: t }))
            : f instanceof Error
            ? a(f)
            : ad(f)
            ? a(vn(2, { from: t, to: f }))
            : (i &&
                r.enterCallbacks[s] === i &&
                typeof f == "function" &&
                i.push(f),
              o());
        },
        u = e.call(r && r.instances[s], t, n, l);
      let c = Promise.resolve(u);
      e.length < 3 && (c = c.then(l)), c.catch((f) => a(f));
    });
}
function ls(e, t, n, r) {
  const s = [];
  for (const i of e)
    for (const o in i.components) {
      let a = i.components[o];
      if (!(t !== "beforeRouteEnter" && !i.instances[o]))
        if (Bd(a)) {
          const u = (a.__vccOpts || a)[t];
          u && s.push(Tt(u, n, r, i, o));
        } else {
          let l = a();
          s.push(() =>
            l.then((u) => {
              if (!u)
                return Promise.reject(
                  new Error(`Couldn't resolve component "${o}" at "${i.path}"`)
                );
              const c = Vf(u) ? u.default : u;
              i.components[o] = c;
              const h = (c.__vccOpts || c)[t];
              return h && Tt(h, n, r, i, o)();
            })
          );
        }
    }
  return s;
}
function Bd(e) {
  return (
    typeof e == "object" ||
    "displayName" in e ||
    "props" in e ||
    "__vccOpts" in e
  );
}
function vo(e) {
  const t = ut(ci),
    n = ut(Ca),
    r = Xe(() => t.resolve(mt(e.to))),
    s = Xe(() => {
      const { matched: l } = r.value,
        { length: u } = l,
        c = l[u - 1],
        f = n.matched;
      if (!c || !f.length) return -1;
      const h = f.findIndex(mn.bind(null, c));
      if (h > -1) return h;
      const _ = bo(l[u - 2]);
      return u > 1 && bo(c) === _ && f[f.length - 1].path !== _
        ? f.findIndex(mn.bind(null, l[u - 2]))
        : h;
    }),
    i = Xe(() => s.value > -1 && jd(n.params, r.value.params)),
    o = Xe(
      () =>
        s.value > -1 &&
        s.value === n.matched.length - 1 &&
        ha(n.params, r.value.params)
    );
  function a(l = {}) {
    return zd(l)
      ? t[mt(e.replace) ? "replace" : "push"](mt(e.to)).catch(Dn)
      : Promise.resolve();
  }
  return {
    route: r,
    href: Xe(() => r.value.href),
    isActive: i,
    isExactActive: o,
    navigate: a,
  };
}
const $d = Zn({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: "page" },
    },
    useLink: vo,
    setup(e, { slots: t }) {
      const n = Yn(vo(e)),
        { options: r } = ut(ci),
        s = Xe(() => ({
          [_o(e.activeClass, r.linkActiveClass, "router-link-active")]:
            n.isActive,
          [_o(
            e.exactActiveClass,
            r.linkExactActiveClass,
            "router-link-exact-active"
          )]: n.isExactActive,
        }));
      return () => {
        const i = t.default && t.default(n);
        return e.custom
          ? i
          : Kr(
              "a",
              {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: s.value,
              },
              i
            );
      };
    },
  }),
  Fd = $d;
function zd(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function jd(e, t) {
  for (const n in t) {
    const r = t[n],
      s = e[n];
    if (typeof r == "string") {
      if (r !== s) return !1;
    } else if (!it(s) || s.length !== r.length || r.some((i, o) => i !== s[o]))
      return !1;
  }
  return !0;
}
function bo(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const _o = (e, t, n) => e ?? t ?? n,
  Ud = Zn({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const r = ut(xs),
        s = Xe(() => e.route || r.value),
        i = ut(mo, 0),
        o = Xe(() => {
          let u = mt(i);
          const { matched: c } = s.value;
          let f;
          for (; (f = c[u]) && !f.components; ) u++;
          return u;
        }),
        a = Xe(() => s.value.matched[o.value]);
      Hn(
        mo,
        Xe(() => o.value + 1)
      ),
        Hn(Nd, a),
        Hn(xs, s);
      const l = st();
      return (
        Mt(
          () => [l.value, a.value, e.name],
          ([u, c, f], [h, _, v]) => {
            c &&
              ((c.instances[f] = u),
              _ &&
                _ !== c &&
                u &&
                u === h &&
                (c.leaveGuards.size || (c.leaveGuards = _.leaveGuards),
                c.updateGuards.size || (c.updateGuards = _.updateGuards))),
              u &&
                c &&
                (!_ || !mn(c, _) || !h) &&
                (c.enterCallbacks[f] || []).forEach((w) => w(u));
          },
          { flush: "post" }
        ),
        () => {
          const u = s.value,
            c = e.name,
            f = a.value,
            h = f && f.components[c];
          if (!h) return yo(n.default, { Component: h, route: u });
          const _ = f.props[c],
            v = _
              ? _ === !0
                ? u.params
                : typeof _ == "function"
                ? _(u)
                : _
              : null,
            S = Kr(
              h,
              le({}, v, t, {
                onVnodeUnmounted: (A) => {
                  A.component.isUnmounted && (f.instances[c] = null);
                },
                ref: l,
              })
            );
          return yo(n.default, { Component: S, route: u }) || S;
        }
      );
    },
  });
function yo(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const Ra = Ud;
function Vd(e) {
  const t = bd(e.routes, e),
    n = e.parseQuery || Ld,
    r = e.stringifyQuery || go,
    s = e.history,
    i = An(),
    o = An(),
    a = An(),
    l = Qo(Ct);
  let u = Ct;
  nn &&
    e.scrollBehavior &&
    "scrollRestoration" in history &&
    (history.scrollRestoration = "manual");
  const c = is.bind(null, (E) => "" + E),
    f = is.bind(null, Id),
    h = is.bind(null, Tr);
  function _(E, $) {
    let N, q;
    return (
      ga(E) ? ((N = t.getRecordMatcher(E)), (q = $)) : (q = E), t.addRoute(q, N)
    );
  }
  function v(E) {
    const $ = t.getRecordMatcher(E);
    $ && t.removeRoute($);
  }
  function w() {
    return t.getRoutes().map((E) => E.record);
  }
  function S(E) {
    return !!t.getRecordMatcher(E);
  }
  function A(E, $) {
    if ((($ = le({}, $ || l.value)), typeof E == "string")) {
      const b = os(n, E, $.path),
        R = t.resolve({ path: b.path }, $),
        T = s.createHref(b.fullPath);
      return le(b, R, {
        params: h(R.params),
        hash: Tr(b.hash),
        redirectedFrom: void 0,
        href: T,
      });
    }
    let N;
    if ("path" in E) N = le({}, E, { path: os(n, E.path, $.path).path });
    else {
      const b = le({}, E.params);
      for (const R in b) b[R] == null && delete b[R];
      (N = le({}, E, { params: f(b) })), ($.params = f($.params));
    }
    const q = t.resolve(N, $),
      te = E.hash || "";
    q.params = c(h(q.params));
    const d = Kf(r, le({}, E, { hash: xd(te), path: q.path })),
      p = s.createHref(d);
    return le(
      { fullPath: d, hash: te, query: r === go ? Dd(E.query) : E.query || {} },
      q,
      { redirectedFrom: void 0, href: p }
    );
  }
  function y(E) {
    return typeof E == "string" ? os(n, E, l.value.path) : le({}, E);
  }
  function m(E, $) {
    if (u !== E) return vn(8, { from: $, to: E });
  }
  function g(E) {
    return L(E);
  }
  function k(E) {
    return g(le(y(E), { replace: !0 }));
  }
  function B(E) {
    const $ = E.matched[E.matched.length - 1];
    if ($ && $.redirect) {
      const { redirect: N } = $;
      let q = typeof N == "function" ? N(E) : N;
      return (
        typeof q == "string" &&
          ((q = q.includes("?") || q.includes("#") ? (q = y(q)) : { path: q }),
          (q.params = {})),
        le(
          { query: E.query, hash: E.hash, params: "path" in q ? {} : E.params },
          q
        )
      );
    }
  }
  function L(E, $) {
    const N = (u = A(E)),
      q = l.value,
      te = E.state,
      d = E.force,
      p = E.replace === !0,
      b = B(N);
    if (b)
      return L(
        le(y(b), {
          state: typeof b == "object" ? le({}, te, b.state) : te,
          force: d,
          replace: p,
        }),
        $ || N
      );
    const R = N;
    R.redirectedFrom = $;
    let T;
    return (
      !d && Qf(r, q, N) && ((T = vn(16, { to: R, from: q })), pe(q, q, !0, !1)),
      (T ? Promise.resolve(T) : O(R, q))
        .catch((C) => (ft(C) ? (ft(C, 2) ? C : ke(C)) : W(C, R, q)))
        .then((C) => {
          if (C) {
            if (ft(C, 2))
              return L(
                le({ replace: p }, y(C.to), {
                  state: typeof C.to == "object" ? le({}, te, C.to.state) : te,
                  force: d,
                }),
                $ || R
              );
          } else C = D(R, q, !0, p, te);
          return z(R, q, C), C;
        })
    );
  }
  function P(E, $) {
    const N = m(E, $);
    return N ? Promise.reject(N) : Promise.resolve();
  }
  function F(E) {
    const $ = He.values().next().value;
    return $ && typeof $.runWithContext == "function"
      ? $.runWithContext(E)
      : E();
  }
  function O(E, $) {
    let N;
    const [q, te, d] = qd(E, $);
    N = ls(q.reverse(), "beforeRouteLeave", E, $);
    for (const b of q)
      b.leaveGuards.forEach((R) => {
        N.push(Tt(R, E, $));
      });
    const p = P.bind(null, E, $);
    return (
      N.push(p),
      be(N)
        .then(() => {
          N = [];
          for (const b of i.list()) N.push(Tt(b, E, $));
          return N.push(p), be(N);
        })
        .then(() => {
          N = ls(te, "beforeRouteUpdate", E, $);
          for (const b of te)
            b.updateGuards.forEach((R) => {
              N.push(Tt(R, E, $));
            });
          return N.push(p), be(N);
        })
        .then(() => {
          N = [];
          for (const b of d)
            if (b.beforeEnter)
              if (it(b.beforeEnter))
                for (const R of b.beforeEnter) N.push(Tt(R, E, $));
              else N.push(Tt(b.beforeEnter, E, $));
          return N.push(p), be(N);
        })
        .then(
          () => (
            E.matched.forEach((b) => (b.enterCallbacks = {})),
            (N = ls(d, "beforeRouteEnter", E, $)),
            N.push(p),
            be(N)
          )
        )
        .then(() => {
          N = [];
          for (const b of o.list()) N.push(Tt(b, E, $));
          return N.push(p), be(N);
        })
        .catch((b) => (ft(b, 8) ? b : Promise.reject(b)))
    );
  }
  function z(E, $, N) {
    a.list().forEach((q) => F(() => q(E, $, N)));
  }
  function D(E, $, N, q, te) {
    const d = m(E, $);
    if (d) return d;
    const p = $ === Ct,
      b = nn ? history.state : {};
    N &&
      (q || p
        ? s.replace(E.fullPath, le({ scroll: p && b && b.scroll }, te))
        : s.push(E.fullPath, te)),
      (l.value = E),
      pe(E, $, N, p),
      ke();
  }
  let K;
  function re() {
    K ||
      (K = s.listen((E, $, N) => {
        if (!ze.listening) return;
        const q = A(E),
          te = B(q);
        if (te) {
          L(le(te, { replace: !0 }), q).catch(Dn);
          return;
        }
        u = q;
        const d = l.value;
        nn && nd(oo(d.fullPath, N.delta), Yr()),
          O(q, d)
            .catch((p) =>
              ft(p, 12)
                ? p
                : ft(p, 2)
                ? (L(p.to, q)
                    .then((b) => {
                      ft(b, 20) &&
                        !N.delta &&
                        N.type === Wn.pop &&
                        s.go(-1, !1);
                    })
                    .catch(Dn),
                  Promise.reject())
                : (N.delta && s.go(-N.delta, !1), W(p, q, d))
            )
            .then((p) => {
              (p = p || D(q, d, !1)),
                p &&
                  (N.delta && !ft(p, 8)
                    ? s.go(-N.delta, !1)
                    : N.type === Wn.pop && ft(p, 20) && s.go(-1, !1)),
                z(q, d, p);
            })
            .catch(Dn);
      }));
  }
  let G = An(),
    j = An(),
    U;
  function W(E, $, N) {
    ke(E);
    const q = j.list();
    return (
      q.length ? q.forEach((te) => te(E, $, N)) : console.error(E),
      Promise.reject(E)
    );
  }
  function Ae() {
    return U && l.value !== Ct
      ? Promise.resolve()
      : new Promise((E, $) => {
          G.add([E, $]);
        });
  }
  function ke(E) {
    return (
      U ||
        ((U = !E),
        re(),
        G.list().forEach(([$, N]) => (E ? N(E) : $())),
        G.reset()),
      E
    );
  }
  function pe(E, $, N, q) {
    const { scrollBehavior: te } = e;
    if (!nn || !te) return Promise.resolve();
    const d =
      (!N && rd(oo(E.fullPath, 0))) ||
      ((q || !N) && history.state && history.state.scroll) ||
      null;
    return Lr()
      .then(() => te(E, $, d))
      .then((p) => p && td(p))
      .catch((p) => W(p, E, $));
  }
  const ae = (E) => s.go(E);
  let De;
  const He = new Set(),
    ze = {
      currentRoute: l,
      listening: !0,
      addRoute: _,
      removeRoute: v,
      hasRoute: S,
      getRoutes: w,
      resolve: A,
      options: e,
      push: g,
      replace: k,
      go: ae,
      back: () => ae(-1),
      forward: () => ae(1),
      beforeEach: i.add,
      beforeResolve: o.add,
      afterEach: a.add,
      onError: j.add,
      isReady: Ae,
      install(E) {
        const $ = this;
        E.component("RouterLink", Fd),
          E.component("RouterView", Ra),
          (E.config.globalProperties.$router = $),
          Object.defineProperty(E.config.globalProperties, "$route", {
            enumerable: !0,
            get: () => mt(l),
          }),
          nn &&
            !De &&
            l.value === Ct &&
            ((De = !0), g(s.location).catch((te) => {}));
        const N = {};
        for (const te in Ct)
          Object.defineProperty(N, te, {
            get: () => l.value[te],
            enumerable: !0,
          });
        E.provide(ci, $), E.provide(Ca, Fs(N)), E.provide(xs, l);
        const q = E.unmount;
        He.add(E),
          (E.unmount = function () {
            He.delete(E),
              He.size < 1 &&
                ((u = Ct),
                K && K(),
                (K = null),
                (l.value = Ct),
                (De = !1),
                (U = !1)),
              q();
          });
      },
    };
  function be(E) {
    return E.reduce(($, N) => $.then(() => F(N)), Promise.resolve());
  }
  return ze;
}
function qd(e, t) {
  const n = [],
    r = [],
    s = [],
    i = Math.max(t.matched.length, e.matched.length);
  for (let o = 0; o < i; o++) {
    const a = t.matched[o];
    a && (e.matched.find((u) => mn(u, a)) ? r.push(a) : n.push(a));
    const l = e.matched[o];
    l && (t.matched.find((u) => mn(u, l)) || s.push(l));
  }
  return [n, r, s];
}
const Wd = { class: "container" },
  Kd = {
    mounted: function () {
      console.log("mounted");
    },
    data() {
      return {};
    },
    methods: {
      startQuiz() {
        console.log("start quiz"), this.$router.push("/quiz");
      },
      restart() {
        console.log("quiz ended"), this.$router.push("/");
      },
      goHome() {
        window.location.href = "/quizNew";
      },
    },
  },
  Qd = Object.assign(Kd, {
    __name: "App",
    setup(e) {
      return (t, n) => (
        ne(),
        he("div", Wd, [
          ge("div", {
            class: "home",
            onClick: n[0] || (n[0] = (...r) => t.goHome && t.goHome(...r)),
          }),
          ee(
            mt(Ra),
            { onIntroEnded: t.startQuiz, onQuizEnded: t.restart },
            {
              default: ye(({ Component: r }) => [
                ee(
                  Ee,
                  null,
                  { default: ye(() => [(ne(), Je(bl(r)))]), _: 2 },
                  1024
                ),
              ]),
              _: 1,
            },
            8,
            ["onIntroEnded", "onQuizEnded"]
          ),
        ])
      );
    },
  }),
  Yd = "/quiz/video/home.mp4",
  Jd = "/quiz/video/intro.mp4";
const wn = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [r, s] of t) n[r] = s;
    return n;
  },
  Xd = {
    mounted: function () {
      const e = new Image();
      (e.src = "buttons/btn_start_hover.png"), this.$refs.bg.play();
    },
    data: function () {
      return { started: !1 };
    },
    methods: {
      start: function () {
        var e = this;
        this.$refs.start.classList.add("active"),
          (e.started = !0),
          setTimeout(function () {
            e.$refs.introvid.play();
          }, 1e3);
      },
      introEnded: function () {
        this.$emit("introEnded");
      },
    },
  },
  Gd = { class: "container" },
  Zd = { key: 0, class: "demo", ref: "demo" },
  eh = { src: Yd, class: "bg", muted: "", ref: "bg", loop: "true" },
  th = { key: 0, class: "intro", ref: "intro", style: {} };
function nh(e, t, n, r, s, i) {
  return (
    ne(),
    he("div", Gd, [
      ee(Ee, null, {
        default: ye(() => [
          e.started
            ? xe("", !0)
            : (ne(),
              he(
                "div",
                Zd,
                [
                  ge("video", eh, null, 512),
                  ge(
                    "div",
                    {
                      class: "btn-start",
                      onClick:
                        t[0] || (t[0] = (...o) => i.start && i.start(...o)),
                      ref: "start",
                    },
                    null,
                    512
                  ),
                ],
                512
              )),
        ]),
        _: 1,
      }),
      ee(Ee, null, {
        default: ye(() => [
          e.started
            ? (ne(),
              he(
                "div",
                th,
                [
                  ge(
                    "video",
                    {
                      src: Jd,
                      class: "bg",
                      muted: "",
                      ref: "introvid",
                      onEnded:
                        t[1] ||
                        (t[1] = (...o) => i.introEnded && i.introEnded(...o)),
                    },
                    null,
                    544
                  ),
                ],
                512
              ))
            : xe("", !0),
        ]),
        _: 1,
      }),
    ])
  );
}
const rh = wn(Xd, [
    ["render", nh],
    ["__scopeId", "data-v-d9f32065"],
  ]),
  wo = "/quiz/assets/memory_1-409106de.png",
  Qe = "/quiz/assets/memory_shirt-ac84c188.png",
  Eo = "/quiz/assets/memory_2-7c0b1b1d.png",
  Co = "/quiz/assets/memory_3-36ba6e50.png",
  Ro = "/quiz/assets/memory_4-f4f0adb7.png",
  Ao = "/quiz/assets/memory_5-dc1baf9f.png",
  ko = "/quiz/assets/memory_6-28b8113f.png";
const sh = {
    setup() {
      return { count: st(0) };
    },
    data: function () {
      return {
        hasFlippedCard: !1,
        lockBoard: !1,
        firstCard: null,
        secondCard: null,
        cards: document.querySelectorAll(".memory-card"),
        matched: 0,
        started: !1,
      };
    },
    mounted: function () {
      var e = this;
      this.shuffle(),
        document
          .querySelectorAll(".memory-card")
          .forEach((t) => t.addEventListener("click", e.flipCard));
    },
    methods: {
      flipCard(e) {
        if (!this.lockBoard && e.currentTarget !== this.firstCard) {
          if ((e.currentTarget.classList.add("flip"), !this.hasFlippedCard)) {
            (this.hasFlippedCard = !0), (this.firstCard = e.currentTarget);
            return;
          }
          (this.secondCard = e.currentTarget), this.checkForMatch();
        }
      },
      checkForMatch() {
        let e =
          this.firstCard.dataset.framework ===
          this.secondCard.dataset.framework;
        e ? this.disableCards() : this.unflipCards(),
          e && this.matched++,
          this.matched == 6 && this.$emit("completed");
      },
      disableCards() {
        this.firstCard.removeEventListener("click", this.flipCard),
          this.secondCard.removeEventListener("click", this.flipCard),
          this.resetBoard();
      },
      unflipCards() {
        this.lockBoard = !0;
        var e = this;
        setTimeout(() => {
          e.firstCard.classList.remove("flip"),
            e.secondCard.classList.remove("flip"),
            e.resetBoard();
        }, 1500);
      },
      resetBoard() {
        ([this.hasFlippedCard, this.lockBoard] = [!1, !1]),
          ([this.firstCard, this.secondCard] = [null, null]);
      },
      shuffle() {
        document.querySelectorAll(".memory-card").forEach((e) => {
          let t = Math.floor(Math.random() * 12);
          e.style.order = t;
        });
      },
    },
  },
  ih = (e) => (Jn("data-v-8a97bc49"), (e = e()), Xn(), e),
  oh = { class: "container" },
  lh = Nl(
    '<div class="memoryContainer" data-v-8a97bc49><section class="memory-game" data-v-8a97bc49><div class="memory-card" data-framework="aurelia" data-v-8a97bc49><img class="front-face" src="' +
      wo +
      '" alt="Aurelia" data-v-8a97bc49><img class="back-face" src="' +
      Qe +
      '" alt="JS Badge" data-v-8a97bc49></div><div class="memory-card" data-framework="aurelia" data-v-8a97bc49><img class="front-face" src="' +
      wo +
      '" alt="Aurelia" data-v-8a97bc49><img class="back-face" src="' +
      Qe +
      '" alt="JS Badge" data-v-8a97bc49></div><div class="memory-card" data-framework="vue" data-v-8a97bc49><img class="front-face" src="' +
      Eo +
      '" alt="Vue" data-v-8a97bc49><img class="back-face" src="' +
      Qe +
      '" alt="JS Badge" data-v-8a97bc49></div><div class="memory-card" data-framework="vue" data-v-8a97bc49><img class="front-face" src="' +
      Eo +
      '" alt="Vue" data-v-8a97bc49><img class="back-face" src="' +
      Qe +
      '" alt="JS Badge" data-v-8a97bc49></div><div class="memory-card" data-framework="angular" data-v-8a97bc49><img class="front-face" src="' +
      Co +
      '" alt="Angular" data-v-8a97bc49><img class="back-face" src="' +
      Qe +
      '" alt="JS Badge" data-v-8a97bc49></div><div class="memory-card" data-framework="angular" data-v-8a97bc49><img class="front-face" src="' +
      Co +
      '" alt="Angular" data-v-8a97bc49><img class="back-face" src="' +
      Qe +
      '" alt="JS Badge" data-v-8a97bc49></div><div class="memory-card" data-framework="ember" data-v-8a97bc49><img class="front-face" src="' +
      Ro +
      '" alt="Ember" data-v-8a97bc49><img class="back-face" src="' +
      Qe +
      '" alt="JS Badge" data-v-8a97bc49></div><div class="memory-card" data-framework="ember" data-v-8a97bc49><img class="front-face" src="' +
      Ro +
      '" alt="Ember" data-v-8a97bc49><img class="back-face" src="' +
      Qe +
      '" alt="JS Badge" data-v-8a97bc49></div><div class="memory-card" data-framework="backbone" data-v-8a97bc49><img class="front-face" src="' +
      Ao +
      '" alt="Backbone" data-v-8a97bc49><img class="back-face" src="' +
      Qe +
      '" alt="JS Badge" data-v-8a97bc49></div><div class="memory-card" data-framework="backbone" data-v-8a97bc49><img class="front-face" src="' +
      Ao +
      '" alt="Backbone" data-v-8a97bc49><img class="back-face" src="' +
      Qe +
      '" alt="JS Badge" data-v-8a97bc49></div><div class="memory-card" data-framework="react" data-v-8a97bc49><img class="front-face" src="' +
      ko +
      '" alt="React" data-v-8a97bc49><img class="back-face" src="' +
      Qe +
      '" alt="JS Badge" data-v-8a97bc49></div><div class="memory-card" data-framework="react" data-v-8a97bc49><img class="front-face" src="' +
      ko +
      '" alt="React" data-v-8a97bc49><img class="back-face" src="' +
      Qe +
      '" alt="JS Badge" data-v-8a97bc49></div></section></div>',
    1
  ),
  ah = { key: 0, class: "memoryStart" },
  uh = ih(() => ge("div", { class: "desc" }, null, -1));
function ch(e, t, n, r, s, i) {
  return (
    ne(),
    he("div", oh, [
      lh,
      ee(Ee, null, {
        default: ye(() => [
          e.started
            ? xe("", !0)
            : (ne(),
              he("div", ah, [
                uh,
                ge("div", {
                  class: "start",
                  onClick: t[0] || (t[0] = (o) => (e.started = !0)),
                }),
              ])),
        ]),
        _: 1,
      }),
    ])
  );
}
const fh = wn(sh, [
  ["render", ch],
  ["__scopeId", "data-v-8a97bc49"],
]);
var Ge =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
    ? window
    : typeof global < "u"
    ? global
    : typeof self < "u"
    ? self
    : {};
function dh(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
function hh(e) {
  if (e.__esModule) return e;
  var t = e.default;
  if (typeof t == "function") {
    var n = function r() {
      return this instanceof r
        ? Reflect.construct(t, arguments, this.constructor)
        : t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else n = {};
  return (
    Object.defineProperty(n, "__esModule", { value: !0 }),
    Object.keys(e).forEach(function (r) {
      var s = Object.getOwnPropertyDescriptor(e, r);
      Object.defineProperty(
        n,
        r,
        s.get
          ? s
          : {
              enumerable: !0,
              get: function () {
                return e[r];
              },
            }
      );
    }),
    n
  );
}
var Aa = {},
  as = {};
const fi = hh(Uf);
var Se = {},
  Me = {},
  To;
function di() {
  if (To) return Me;
  To = 1;
  var e =
    (Ge && Ge.__assign) ||
    function () {
      return (
        (e =
          Object.assign ||
          function (a) {
            for (var l, u = 1, c = arguments.length; u < c; u++) {
              l = arguments[u];
              for (var f in l)
                Object.prototype.hasOwnProperty.call(l, f) && (a[f] = l[f]);
            }
            return a;
          }),
        e.apply(this, arguments)
      );
    };
  (Me.__esModule = !0),
    (Me.getReferenceLineMap =
      Me.getId =
      Me.filterHandles =
      Me.removeEvent =
      Me.addEvent =
      Me.getElSize =
      Me.IDENTITY =
        void 0);
  var t = ka();
  Me.IDENTITY = Symbol("Vue3DraggableResizable");
  function n(a) {
    var l = window.getComputedStyle(a);
    return {
      width: parseFloat(l.getPropertyValue("width")),
      height: parseFloat(l.getPropertyValue("height")),
    };
  }
  Me.getElSize = n;
  function r(a) {
    return function (l, u, c) {
      l &&
        (typeof u == "string" && (u = [u]),
        u.forEach(function (f) {
          return l[a](f, c, { passive: !1 });
        }));
    };
  }
  (Me.addEvent = r("addEventListener")),
    (Me.removeEvent = r("removeEventListener"));
  function s(a) {
    if (a && a.length > 0) {
      var l = [];
      return (
        a.forEach(function (u) {
          t.ALL_HANDLES.includes(u) && !l.includes(u) && l.push(u);
        }),
        l
      );
    } else return [];
  }
  Me.filterHandles = s;
  function i() {
    return String(Math.random()).substr(2) + String(Date.now());
  }
  Me.getId = i;
  function o(a, l, u) {
    var c, f;
    if (a.disabled.value) return null;
    var h = { row: [], col: [] },
      _ = l.parentWidth,
      v = l.parentHeight;
    (c = h.row).push.apply(c, a.adsorbRows),
      (f = h.col).push.apply(f, a.adsorbCols),
      a.adsorbParent.value &&
        (h.row.push(0, v.value, v.value / 2),
        h.col.push(0, _.value, _.value / 2));
    var w = a.getPositionStore(u);
    Object.values(w).forEach(function (A) {
      var y = A.x,
        m = A.y,
        g = A.w,
        k = A.h;
      h.row.push(m, m + k, m + k / 2), h.col.push(y, y + g, y + g / 2);
    });
    var S = {
      row: h.row.reduce(function (A, y) {
        var m;
        return e(
          e({}, A),
          ((m = {}), (m[y] = { min: y - 5, max: y + 5, value: y }), m)
        );
      }, {}),
      col: h.col.reduce(function (A, y) {
        var m;
        return e(
          e({}, A),
          ((m = {}), (m[y] = { min: y - 5, max: y + 5, value: y }), m)
        );
      }, {}),
    };
    return S;
  }
  return (Me.getReferenceLineMap = o), Me;
}
var So;
function ph() {
  if (So) return Se;
  So = 1;
  var e =
    (Ge && Ge.__assign) ||
    function () {
      return (
        (e =
          Object.assign ||
          function (v) {
            for (var w, S = 1, A = arguments.length; S < A; S++) {
              w = arguments[S];
              for (var y in w)
                Object.prototype.hasOwnProperty.call(w, y) && (v[y] = w[y]);
            }
            return v;
          }),
        e.apply(this, arguments)
      );
    };
  (Se.__esModule = !0),
    (Se.watchProps =
      Se.initResizeHandle =
      Se.initDraggableContainer =
      Se.initLimitSizeAndMethods =
      Se.initParent =
      Se.initState =
      Se.useState =
        void 0);
  var t = fi,
    n = di();
  function r(v) {
    var w = t.ref(v),
      S = function (A) {
        return (w.value = A), A;
      };
    return [w, S];
  }
  Se.useState = r;
  function s(v, w) {
    var S = r(v.initW),
      A = S[0],
      y = S[1],
      m = r(v.initH),
      g = m[0],
      k = m[1],
      B = r(v.x),
      L = B[0],
      P = B[1],
      F = r(v.y),
      O = F[0],
      z = F[1],
      D = r(v.active),
      K = D[0],
      re = D[1],
      G = r(!1),
      j = G[0],
      U = G[1],
      W = r(!1),
      Ae = W[0],
      ke = W[1],
      pe = r(""),
      ae = pe[0],
      De = pe[1],
      He = r(1 / 0),
      ze = He[0],
      be = He[1],
      E = r(1 / 0),
      $ = E[0],
      N = E[1],
      q = r(v.minW),
      te = q[0],
      d = q[1],
      p = r(v.minH),
      b = p[0],
      R = p[1],
      T = t.computed(function () {
        return g.value / A.value;
      });
    return (
      t.watch(
        A,
        function (C) {
          w("update:w", C);
        },
        { immediate: !0 }
      ),
      t.watch(
        g,
        function (C) {
          w("update:h", C);
        },
        { immediate: !0 }
      ),
      t.watch(O, function (C) {
        w("update:y", C);
      }),
      t.watch(L, function (C) {
        w("update:x", C);
      }),
      t.watch(K, function (C, x) {
        w("update:active", C),
          !x && C ? w("activated") : x && !C && w("deactivated");
      }),
      t.watch(
        function () {
          return v.active;
        },
        function (C) {
          re(C);
        }
      ),
      {
        id: n.getId(),
        width: A,
        height: g,
        top: O,
        left: L,
        enable: K,
        dragging: j,
        resizing: Ae,
        resizingHandle: ae,
        resizingMaxHeight: $,
        resizingMaxWidth: ze,
        resizingMinWidth: te,
        resizingMinHeight: b,
        aspectRatio: T,
        setEnable: re,
        setDragging: U,
        setResizing: ke,
        setResizingHandle: De,
        setResizingMaxHeight: N,
        setResizingMaxWidth: be,
        setResizingMinWidth: d,
        setResizingMinHeight: R,
        setWidth: function (C) {
          return y(Math.floor(C));
        },
        setHeight: function (C) {
          return k(Math.floor(C));
        },
        setTop: function (C) {
          return z(Math.floor(C));
        },
        setLeft: function (C) {
          return P(Math.floor(C));
        },
      }
    );
  }
  Se.initState = s;
  function i(v) {
    var w = t.ref(0),
      S = t.ref(0);
    return (
      t.onMounted(function () {
        if (v.value && v.value.parentElement) {
          var A = n.getElSize(v.value.parentElement),
            y = A.width,
            m = A.height;
          (w.value = y), (S.value = m);
        }
      }),
      { parentWidth: w, parentHeight: S }
    );
  }
  Se.initParent = i;
  function o(v, w, S) {
    var A = S.width,
      y = S.height,
      m = S.left,
      g = S.top,
      k = S.resizingMaxWidth,
      B = S.resizingMaxHeight,
      L = S.resizingMinWidth,
      P = S.resizingMinHeight,
      F = S.setWidth,
      O = S.setHeight,
      z = S.setTop,
      D = S.setLeft,
      K = w.parentWidth,
      re = w.parentHeight,
      G = {
        minWidth: t.computed(function () {
          return L.value;
        }),
        minHeight: t.computed(function () {
          return P.value;
        }),
        maxWidth: t.computed(function () {
          var U = 1 / 0;
          return v.parent && (U = Math.min(K.value, k.value)), U;
        }),
        maxHeight: t.computed(function () {
          var U = 1 / 0;
          return v.parent && (U = Math.min(re.value, B.value)), U;
        }),
        minLeft: t.computed(function () {
          return v.parent ? 0 : -1 / 0;
        }),
        minTop: t.computed(function () {
          return v.parent ? 0 : -1 / 0;
        }),
        maxLeft: t.computed(function () {
          return v.parent ? K.value - A.value : 1 / 0;
        }),
        maxTop: t.computed(function () {
          return v.parent ? re.value - y.value : 1 / 0;
        }),
      },
      j = {
        setWidth: function (U) {
          return v.disabledW
            ? A.value
            : F(Math.min(G.maxWidth.value, Math.max(G.minWidth.value, U)));
        },
        setHeight: function (U) {
          return v.disabledH
            ? y.value
            : O(Math.min(G.maxHeight.value, Math.max(G.minHeight.value, U)));
        },
        setTop: function (U) {
          return v.disabledY
            ? g.value
            : z(Math.min(G.maxTop.value, Math.max(G.minTop.value, U)));
        },
        setLeft: function (U) {
          return v.disabledX
            ? m.value
            : D(Math.min(G.maxLeft.value, Math.max(G.minLeft.value, U)));
        },
      };
    return e(e({}, G), j);
  }
  Se.initLimitSizeAndMethods = o;
  var a = ["mousedown", "touchstart"],
    l = ["mouseup", "touchend"],
    u = ["mousemove", "touchmove"];
  function c(v) {
    return "touches" in v
      ? [v.touches[0].pageX, v.touches[0].pageY]
      : [v.pageX, v.pageY];
  }
  function f(v, w, S, A, y, m, g) {
    var k = w.left,
      B = w.top,
      L = w.width,
      P = w.height,
      F = w.dragging,
      O = w.id,
      z = w.setDragging,
      D = w.setEnable,
      K = w.setResizing,
      re = w.setResizingHandle,
      G = S.setTop,
      j = S.setLeft,
      U = 0,
      W = 0,
      Ae = 0,
      ke = 0,
      pe = null,
      ae = document.documentElement,
      De = function (E) {
        var $,
          N = E.target;
        (!(($ = v.value) === null || $ === void 0) && $.contains(N)) ||
          (D(!1), z(!1), K(!1), re(""));
      },
      He = function () {
        z(!1),
          n.removeEvent(ae, l, He),
          n.removeEvent(ae, u, ze),
          (pe = null),
          m &&
            (m.updatePosition(O, {
              x: k.value,
              y: B.value,
              w: L.value,
              h: P.value,
            }),
            m.setMatchedLine(null));
      },
      ze = function (E) {
        if ((E.preventDefault(), !!(F.value && v.value))) {
          var $ = c(E),
            N = $[0],
            q = $[1],
            te = N - Ae,
            d = q - ke,
            p = U + te,
            b = W + d;
          if (pe !== null) {
            var R = {
                col: [p, p + L.value / 2, p + L.value],
                row: [b, b + P.value / 2, b + P.value],
              },
              T = {
                row: R.row
                  .map(function (C, x) {
                    var M = null;
                    return (
                      Object.values(pe.row).forEach(function (I) {
                        C >= I.min && C <= I.max && (M = I.value);
                      }),
                      M !== null &&
                        (x === 0
                          ? (b = M)
                          : x === 1
                          ? (b = Math.floor(M - P.value / 2))
                          : x === 2 && (b = Math.floor(M - P.value))),
                      M
                    );
                  })
                  .filter(function (C) {
                    return C !== null;
                  }),
                col: R.col
                  .map(function (C, x) {
                    var M = null;
                    return (
                      Object.values(pe.col).forEach(function (I) {
                        C >= I.min && C <= I.max && (M = I.value);
                      }),
                      M !== null &&
                        (x === 0
                          ? (p = M)
                          : x === 1
                          ? (p = Math.floor(M - L.value / 2))
                          : x === 2 && (p = Math.floor(M - L.value))),
                      M
                    );
                  })
                  .filter(function (C) {
                    return C !== null;
                  }),
              };
            m.setMatchedLine(T);
          }
          y("dragging", { x: j(p), y: G(b) });
        }
      },
      be = function (E) {
        A.value &&
          (z(!0),
          (U = k.value),
          (W = B.value),
          (Ae = c(E)[0]),
          (ke = c(E)[1]),
          n.addEvent(ae, u, ze),
          n.addEvent(ae, l, He),
          m && !m.disabled.value && (pe = n.getReferenceLineMap(m, g, O)));
      };
    return (
      t.watch(F, function (E, $) {
        !$ && E
          ? (y("drag-start", { x: k.value, y: B.value }), D(!0), z(!0))
          : (y("drag-end", { x: k.value, y: B.value }), z(!1));
      }),
      t.onMounted(function () {
        var E = v.value;
        E &&
          ((E.style.left = k + "px"),
          (E.style.top = B + "px"),
          n.addEvent(ae, a, De),
          n.addEvent(E, a, be));
      }),
      t.onUnmounted(function () {
        v.value &&
          (n.removeEvent(ae, a, De),
          n.removeEvent(ae, l, He),
          n.removeEvent(ae, u, ze));
      }),
      { containerRef: v }
    );
  }
  Se.initDraggableContainer = f;
  function h(v, w, S, A, y) {
    var m = w.setWidth,
      g = w.setHeight,
      k = w.setLeft,
      B = w.setTop,
      L = v.width,
      P = v.height,
      F = v.left,
      O = v.top,
      z = v.aspectRatio,
      D = v.setResizing,
      K = v.setResizingHandle,
      re = v.setResizingMaxWidth,
      G = v.setResizingMaxHeight,
      j = v.setResizingMinWidth,
      U = v.setResizingMinHeight,
      W = S.parentWidth,
      Ae = S.parentHeight,
      ke = 0,
      pe = 0,
      ae = 0,
      De = 0,
      He = 0,
      ze = 0,
      be = 1,
      E = "",
      $ = "",
      N = document.documentElement,
      q = function (b) {
        b.preventDefault();
        var R = c(b),
          T = R[0],
          C = R[1],
          x = T - He,
          M = C - ze,
          I = x,
          H = M;
        A.lockAspectRatio &&
          ((x = Math.abs(x)),
          (M = x * be),
          (I < 0 || ($ === "m" && H < 0)) && ((x = -x), (M = -M))),
          E === "t"
            ? (g(pe - M), B(De - (P.value - pe)))
            : E === "b" && g(pe + M),
          $ === "l"
            ? (m(ke - x), k(ae - (L.value - ke)))
            : $ === "r" && m(ke + x),
          y("resizing", { x: F.value, y: O.value, w: L.value, h: P.value });
      },
      te = function () {
        y("resize-end", { x: F.value, y: O.value, w: L.value, h: P.value }),
          K(""),
          D(!1),
          re(1 / 0),
          G(1 / 0),
          j(A.minW),
          U(A.minH),
          n.removeEvent(N, u, q),
          n.removeEvent(N, l, te);
      },
      d = function (b, R) {
        if (A.resizable) {
          b.stopPropagation(),
            K(R),
            D(!0),
            (E = R[0]),
            ($ = R[1]),
            A.lockAspectRatio &&
              (["tl", "tm", "ml", "bl"].includes(R)
                ? ((E = "t"), ($ = "l"))
                : ((E = "b"), ($ = "r")));
          var T = A.minH,
            C = A.minW;
          if (
            (A.lockAspectRatio &&
              (T / C > z.value ? (C = T / z.value) : (T = C * z.value)),
            j(C),
            U(T),
            A.parent)
          ) {
            var x = E === "t" ? O.value + P.value : Ae.value - O.value,
              M = $ === "l" ? F.value + L.value : W.value - F.value;
            A.lockAspectRatio &&
              (x / M < z.value ? (M = x / z.value) : (x = M * z.value)),
              G(x),
              re(M);
          }
          (ke = L.value), (pe = P.value), (ae = F.value), (De = O.value);
          var I = c(b);
          (He = I[0]),
            (ze = I[1]),
            (be = z.value),
            y("resize-start", {
              x: F.value,
              y: O.value,
              w: L.value,
              h: P.value,
            }),
            n.addEvent(N, u, q),
            n.addEvent(N, l, te);
        }
      };
    t.onUnmounted(function () {
      n.removeEvent(N, l, te), n.removeEvent(N, u, q);
    });
    var p = t.computed(function () {
      return A.resizable ? n.filterHandles(A.handles) : [];
    });
    return { handlesFiltered: p, resizeHandleDown: d };
  }
  Se.initResizeHandle = h;
  function _(v, w) {
    var S = w.setWidth,
      A = w.setHeight,
      y = w.setLeft,
      m = w.setTop;
    t.watch(
      function () {
        return v.w;
      },
      function (g) {
        S(g);
      }
    ),
      t.watch(
        function () {
          return v.h;
        },
        function (g) {
          A(g);
        }
      ),
      t.watch(
        function () {
          return v.x;
        },
        function (g) {
          y(g);
        }
      ),
      t.watch(
        function () {
          return v.y;
        },
        function (g) {
          m(g);
        }
      );
  }
  return (Se.watchProps = _), Se;
}
var Mo;
function ka() {
  return (
    Mo ||
      ((Mo = 1),
      (function (e) {
        var t =
            (Ge && Ge.__assign) ||
            function () {
              return (
                (t =
                  Object.assign ||
                  function (u) {
                    for (var c, f = 1, h = arguments.length; f < h; f++) {
                      c = arguments[f];
                      for (var _ in c)
                        Object.prototype.hasOwnProperty.call(c, _) &&
                          (u[_] = c[_]);
                    }
                    return u;
                  }),
                t.apply(this, arguments)
              );
            },
          n =
            (Ge && Ge.__spreadArrays) ||
            function () {
              for (var u = 0, c = 0, f = arguments.length; c < f; c++)
                u += arguments[c].length;
              for (var h = Array(u), _ = 0, c = 0; c < f; c++)
                for (var v = arguments[c], w = 0, S = v.length; w < S; w++, _++)
                  h[_] = v[w];
              return h;
            };
        (e.__esModule = !0), (e.ALL_HANDLES = void 0);
        var r = fi,
          s = ph(),
          i = di();
        e.ALL_HANDLES = ["tl", "tm", "tr", "ml", "mr", "bl", "bm", "br"];
        var o = {
            initW: { type: Number, default: null },
            initH: { type: Number, default: null },
            w: { type: Number, default: 0 },
            h: { type: Number, default: 0 },
            x: { type: Number, default: 0 },
            y: { type: Number, default: 0 },
            draggable: { type: Boolean, default: !0 },
            resizable: { type: Boolean, default: !0 },
            disabledX: { type: Boolean, default: !1 },
            disabledY: { type: Boolean, default: !1 },
            disabledW: { type: Boolean, default: !1 },
            disabledH: { type: Boolean, default: !1 },
            minW: { type: Number, default: 20 },
            minH: { type: Number, default: 20 },
            active: { type: Boolean, default: !1 },
            parent: { type: Boolean, default: !1 },
            handles: {
              type: Array,
              default: e.ALL_HANDLES,
              validator: function (u) {
                return i.filterHandles(u).length === u.length;
              },
            },
            classNameDraggable: { type: String, default: "draggable" },
            classNameResizable: { type: String, default: "resizable" },
            classNameDragging: { type: String, default: "dragging" },
            classNameResizing: { type: String, default: "resizing" },
            classNameActive: { type: String, default: "active" },
            classNameHandle: { type: String, default: "handle" },
            lockAspectRatio: { type: Boolean, default: !1 },
          },
          a = [
            "activated",
            "deactivated",
            "drag-start",
            "resize-start",
            "dragging",
            "resizing",
            "drag-end",
            "resize-end",
            "update:w",
            "update:h",
            "update:x",
            "update:y",
            "update:active",
          ],
          l = r.defineComponent({
            name: "Vue3DraggableResizable",
            props: o,
            emits: a,
            setup: function (u, c) {
              var f = c.emit,
                h = s.initState(u, f),
                _ = r.inject("identity", Symbol()),
                v = null;
              _ === i.IDENTITY &&
                (v = {
                  updatePosition: r.inject("updatePosition"),
                  getPositionStore: r.inject("getPositionStore"),
                  disabled: r.inject("disabled"),
                  adsorbParent: r.inject("adsorbParent"),
                  adsorbCols: r.inject("adsorbCols"),
                  adsorbRows: r.inject("adsorbRows"),
                  setMatchedLine: r.inject("setMatchedLine"),
                });
              var w = r.ref(),
                S = s.initParent(w),
                A = s.initLimitSizeAndMethods(u, S, h);
              s.initDraggableContainer(
                w,
                h,
                A,
                r.toRef(u, "draggable"),
                f,
                v,
                S
              );
              var y = s.initResizeHandle(h, A, S, u, f);
              return (
                s.watchProps(u, A),
                t(
                  t(t(t({ containerRef: w, containerProvider: v }, h), S), A),
                  y
                )
              );
            },
            computed: {
              style: function () {
                return {
                  width: this.width + "px",
                  height: this.height + "px",
                  top: this.top + "px",
                  left: this.left + "px",
                };
              },
              klass: function () {
                var u;
                return (
                  (u = {}),
                  (u[this.classNameActive] = this.enable),
                  (u[this.classNameDragging] = this.dragging),
                  (u[this.classNameResizing] = this.resizing),
                  (u[this.classNameDraggable] = this.draggable),
                  (u[this.classNameResizable] = this.resizable),
                  u
                );
              },
            },
            mounted: function () {
              if (this.containerRef) {
                this.containerRef.ondragstart = function () {
                  return !1;
                };
                var u = i.getElSize(this.containerRef),
                  c = u.width,
                  f = u.height;
                this.setWidth(this.initW === null ? this.w || c : this.initW),
                  this.setHeight(
                    this.initH === null ? this.h || f : this.initH
                  ),
                  this.containerProvider &&
                    this.containerProvider.updatePosition(this.id, {
                      x: this.left,
                      y: this.top,
                      w: this.width,
                      h: this.height,
                    });
              }
            },
            render: function () {
              var u = this;
              return r.h(
                "div",
                {
                  ref: "containerRef",
                  class: ["vdr-container", this.klass],
                  style: this.style,
                },
                n(
                  [this.$slots.default && this.$slots.default()],
                  this.handlesFiltered.map(function (c) {
                    return r.h("div", {
                      class: [
                        "vdr-handle",
                        "vdr-handle-" + c,
                        u.classNameHandle,
                        u.classNameHandle + "-" + c,
                      ],
                      style: { display: u.enable ? "block" : "none" },
                      onMousedown: function (f) {
                        return u.resizeHandleDown(f, c);
                      },
                      onTouchstart: function (f) {
                        return u.resizeHandleDown(f, c);
                      },
                    });
                  })
                )
              );
            },
          });
        e.default = l;
      })(as)),
    as
  );
}
var Hs = {};
(function (e) {
  var t =
    (Ge && Ge.__spreadArrays) ||
    function () {
      for (var s = 0, i = 0, o = arguments.length; i < o; i++)
        s += arguments[i].length;
      for (var a = Array(s), l = 0, i = 0; i < o; i++)
        for (var u = arguments[i], c = 0, f = u.length; c < f; c++, l++)
          a[l] = u[c];
      return a;
    };
  e.__esModule = !0;
  var n = fi,
    r = di();
  e.default = n.defineComponent({
    name: "DraggableContainer",
    props: {
      disabled: { type: Boolean, default: !1 },
      adsorbParent: { type: Boolean, default: !0 },
      adsorbCols: { type: Array, default: null },
      adsorbRows: { type: Array, default: null },
      referenceLineVisible: { type: Boolean, default: !0 },
      referenceLineColor: { type: String, default: "#f00" },
    },
    setup: function (s) {
      var i = n.reactive({}),
        o = function (h, _) {
          i[h] = _;
        },
        a = function (h) {
          var _ = Object.assign({}, i);
          return h && delete _[h], _;
        },
        l = n.reactive({ matchedLine: null }),
        u = n.computed(function () {
          return (l.matchedLine && l.matchedLine.row) || [];
        }),
        c = n.computed(function () {
          return (l.matchedLine && l.matchedLine.col) || [];
        }),
        f = function (h) {
          l.matchedLine = h;
        };
      return (
        n.provide("identity", r.IDENTITY),
        n.provide("updatePosition", o),
        n.provide("getPositionStore", a),
        n.provide("setMatchedLine", f),
        n.provide("disabled", n.toRef(s, "disabled")),
        n.provide("adsorbParent", n.toRef(s, "adsorbParent")),
        n.provide("adsorbCols", s.adsorbCols || []),
        n.provide("adsorbRows", s.adsorbRows || []),
        { matchedRows: u, matchedCols: c }
      );
    },
    methods: {
      renderReferenceLine: function () {
        var s = this;
        return this.referenceLineVisible
          ? t(
              this.matchedCols.map(function (i) {
                return n.h("div", {
                  style: {
                    width: "0",
                    height: "100%",
                    top: "0",
                    left: i + "px",
                    borderLeft: "1px dashed " + s.referenceLineColor,
                    position: "absolute",
                  },
                });
              }),
              this.matchedRows.map(function (i) {
                return n.h("div", {
                  style: {
                    width: "100%",
                    height: "0",
                    left: "0",
                    top: i + "px",
                    borderTop: "1px dashed " + s.referenceLineColor,
                    position: "absolute",
                  },
                });
              })
            )
          : [];
      },
    },
    render: function () {
      return n.h(
        "div",
        { style: { width: "100%", height: "100%", position: "relative" } },
        t(
          [this.$slots.default && this.$slots.default()],
          this.renderReferenceLine()
        )
      );
    },
  });
})(Hs);
(function (e) {
  var t =
    (Ge && Ge.__createBinding) ||
    (Object.create
      ? function (i, o, a, l) {
          l === void 0 && (l = a),
            Object.defineProperty(i, l, {
              enumerable: !0,
              get: function () {
                return o[a];
              },
            });
        }
      : function (i, o, a, l) {
          l === void 0 && (l = a), (i[l] = o[a]);
        });
  e.__esModule = !0;
  var n = ka(),
    r = Hs;
  n.default.install = function (i) {
    return (
      i.component(n.default.name, n.default),
      i.component(r.default.name, r.default),
      i
    );
  };
  var s = Hs;
  t(e, s, "default", "DraggableContainer"), (e.default = n.default);
})(Aa);
const Jr = dh(Aa);
const gh = {
    setup() {
      return { count: st(0) };
    },
    components: { Vue3DraggableResizable: Jr },
    data: function () {
      return {
        started: !1,
        stage: 0,
        drags: [
          {
            w: 0,
            h: 0,
            x: 200,
            y: 60,
            active: !1,
            hover: !1,
            dragged: !1,
            bg: "hdd/file_1.png",
          },
          {
            w: 0,
            h: 0,
            x: 200,
            y: 440,
            active: !1,
            hover: !1,
            dragged: !1,
            bg: "hdd/file_2.png",
          },
          {
            w: 0,
            h: 0,
            x: 200,
            y: 780,
            active: !1,
            hover: !1,
            dragged: !1,
            bg: "hdd/file_3.png",
          },
          {
            w: 0,
            h: 0,
            x: 600,
            y: 60,
            active: !1,
            hover: !1,
            dragged: !1,
            bg: "hdd/file_4.png",
          },
          {
            w: 0,
            h: 0,
            x: 600,
            y: 440,
            active: !1,
            hover: !1,
            dragged: !1,
            bg: "hdd/file_5.png",
          },
          {
            w: 0,
            h: 0,
            x: 600,
            y: 780,
            active: !1,
            hover: !1,
            dragged: !1,
            bg: "hdd/file_6.png",
          },
        ],
        targets: [
          {
            backgrounds: [
              "hdd/hdd.png",
              "hdd/hdd_1.png",
              "hdd/hdd_2.png",
              "hdd/hdd_3.png",
              "hdd/hdd_4.png",
              "hdd/hdd_5.png",
              "hdd/hdd_6.png",
            ],
          },
        ],
      };
    },
    mounted: function () {},
    methods: {
      print(e) {
        console.log(e);
      },
      onDragDragging(e, t) {
        var n = !1;
        e.x > 1073 && e.y > 220 && e.x < 1240 && e.y < 600 && (n = !0),
          n ? (this.drags[t].hover = !0) : (this.drags[t].hover = !1);
      },
      onDragEnd(e, t) {
        if (
          (this.drags[t].hover && ((this.drags[t].dragged = !0), this.stage++),
          this.stage == this.drags.length)
        ) {
          var n = this;
          setTimeout(function () {
            n.$emit("completed");
          }, 500);
        }
      },
    },
  },
  mh = (e) => (Jn("data-v-9b6381d7"), (e = e()), Xn(), e),
  vh = { class: "container" },
  bh = { class: "gameContainer" },
  _h = { key: 0, class: "gameStart" },
  yh = mh(() => ge("div", { class: "desc" }, null, -1));
function wh(e, t, n, r, s, i) {
  const o = Vr("Vue3DraggableResizable");
  return (
    ne(),
    he("div", vh, [
      ge("div", bh, [
        (ne(!0),
        he(
          _e,
          null,
          dn(
            e.drags,
            (a, l) => (
              ne(),
              Je(
                o,
                {
                  dragId: l,
                  class: Nt({
                    drag: !0,
                    hover: e.drags[l].hover,
                    dragged: e.drags[l].dragged,
                  }),
                  initW: 240,
                  initH: 240,
                  x: e.drags[l].x,
                  "onUpdate:x": (u) => (e.drags[l].x = u),
                  y: e.drags[l].y,
                  "onUpdate:y": (u) => (e.drags[l].y = u),
                  active: e.drags[l].active,
                  "onUpdate:active": (u) => (e.drags[l].active = u),
                  draggable: !0,
                  resizable: !1,
                  onDragEnd: (u) => i.onDragEnd(u, l),
                  onDragging: (u) => i.onDragDragging(u, l),
                  style: We({ backgroundImage: "url(" + a.bg + ")" }),
                },
                null,
                8,
                [
                  "dragId",
                  "class",
                  "x",
                  "onUpdate:x",
                  "y",
                  "onUpdate:y",
                  "active",
                  "onUpdate:active",
                  "onDragEnd",
                  "onDragging",
                  "style",
                ]
              )
            )
          ),
          256
        )),
        ge(
          "div",
          {
            class: "target",
            style: We({
              backgroundImage: "url(" + e.targets[0].backgrounds[e.stage] + ")",
            }),
          },
          null,
          4
        ),
      ]),
      ee(Ee, null, {
        default: ye(() => [
          e.started
            ? xe("", !0)
            : (ne(),
              he("div", _h, [
                yh,
                ge("div", {
                  class: "start",
                  onClick: t[0] || (t[0] = (a) => (e.started = !0)),
                }),
              ])),
        ]),
        _: 1,
      }),
    ])
  );
}
const Eh = wn(gh, [
  ["render", wh],
  ["__scopeId", "data-v-9b6381d7"],
]);
const Ch = {
    setup() {
      return { count: st(0) };
    },
    components: { Vue3DraggableResizable: Jr },
    data: function () {
      return {
        started: !1,
        stage: 0,
        drags: [
          {
            w: 377,
            h: 112,
            x: 200,
            y: 60,
            active: !1,
            hover: !1,
            dragged: !1,
            bg: "battery/drag_1.png",
          },
          {
            w: 387,
            h: 100,
            x: 200,
            y: 440,
            active: !1,
            hover: !1,
            dragged: !1,
            bg: "battery/drag_2.png",
          },
          {
            w: 177,
            h: 181,
            x: 280,
            y: 780,
            active: !1,
            hover: !1,
            dragged: !1,
            bg: "battery/drag_3.png",
          },
        ],
        targets: [
          {
            backgrounds: [
              "battery/target.png",
              "battery/target_1.png",
              "battery/target_2.png",
              "battery/target_3.png",
            ],
          },
        ],
      };
    },
    mounted: function () {},
    methods: {
      onDragDragging(e, t) {
        var n = !1;
        e.x > 1060 && e.y > 275 && e.x < 1410 && e.y < 625 && (n = !0),
          n ? (this.drags[t].hover = !0) : (this.drags[t].hover = !1);
      },
      onDragEnd(e, t) {
        if (
          (this.drags[t].hover && ((this.drags[t].dragged = !0), this.stage++),
          this.stage == this.drags.length)
        ) {
          var n = this;
          setTimeout(function () {
            n.$emit("completed");
          }, 500);
        }
      },
    },
  },
  Rh = (e) => (Jn("data-v-4e8647b9"), (e = e()), Xn(), e),
  Ah = { class: "container" },
  kh = { class: "gameContainer" },
  Th = { key: 0, class: "gameStart" },
  Sh = Rh(() => ge("div", { class: "desc" }, null, -1));
function Mh(e, t, n, r, s, i) {
  const o = Vr("Vue3DraggableResizable");
  return (
    ne(),
    he("div", Ah, [
      ge("div", kh, [
        (ne(!0),
        he(
          _e,
          null,
          dn(
            e.drags,
            (a, l) => (
              ne(),
              Je(
                o,
                {
                  dragId: l,
                  class: Nt({
                    drag: !0,
                    hover: e.drags[l].hover,
                    dragged: e.drags[l].dragged,
                  }),
                  initW: e.drags[l].w,
                  initH: e.drags[l].h,
                  x: e.drags[l].x,
                  "onUpdate:x": (u) => (e.drags[l].x = u),
                  y: e.drags[l].y,
                  "onUpdate:y": (u) => (e.drags[l].y = u),
                  active: e.drags[l].active,
                  "onUpdate:active": (u) => (e.drags[l].active = u),
                  draggable: !0,
                  resizable: !1,
                  onDragEnd: (u) => i.onDragEnd(u, l),
                  onDragging: (u) => i.onDragDragging(u, l),
                  style: We({ backgroundImage: "url(" + a.bg + ")" }),
                },
                null,
                8,
                [
                  "dragId",
                  "class",
                  "initW",
                  "initH",
                  "x",
                  "onUpdate:x",
                  "y",
                  "onUpdate:y",
                  "active",
                  "onUpdate:active",
                  "onDragEnd",
                  "onDragging",
                  "style",
                ]
              )
            )
          ),
          256
        )),
        ge(
          "div",
          {
            class: "target",
            style: We({
              backgroundImage: "url(" + e.targets[0].backgrounds[e.stage] + ")",
            }),
          },
          null,
          4
        ),
      ]),
      ee(Ee, null, {
        default: ye(() => [
          e.started
            ? xe("", !0)
            : (ne(),
              he("div", Th, [
                Sh,
                ge("div", {
                  class: "start",
                  onClick: t[0] || (t[0] = (a) => (e.started = !0)),
                }),
              ])),
        ]),
        _: 1,
      }),
    ])
  );
}
const Ph = wn(Ch, [
  ["render", Mh],
  ["__scopeId", "data-v-4e8647b9"],
]);
const xh = {
    setup() {
      return { count: st(0) };
    },
    components: { Vue3DraggableResizable: Jr },
    data: function () {
      return {
        started: !1,
        stage: 0,
        drags: [
          {
            w: 177,
            h: 172,
            x: 294,
            y: 60,
            active: !1,
            hover: !1,
            dragged: !1,
            bg: "keyboard/drag_1.png",
          },
          {
            w: 359,
            h: 78,
            x: 200,
            y: 440,
            active: !1,
            hover: !1,
            dragged: !1,
            bg: "keyboard/drag_2.png",
          },
          {
            w: 259,
            h: 169,
            x: 246,
            y: 780,
            active: !1,
            hover: !1,
            dragged: !1,
            bg: "keyboard/drag_3.png",
          },
        ],
        targets: [
          {
            backgrounds: [
              "keyboard/target.png",
              "keyboard/target_1.png",
              "keyboard/target_2.png",
              "keyboard/target_3.png",
            ],
          },
        ],
      };
    },
    mounted: function () {},
    methods: {
      onDragDragging(e, t) {
        var n = !1;
        e.x > 950 && e.y > 140 && e.x < 1290 && e.y < 890 && (n = !0),
          n ? (this.drags[t].hover = !0) : (this.drags[t].hover = !1);
      },
      onDragEnd(e, t) {
        if (
          (this.drags[t].hover && ((this.drags[t].dragged = !0), this.stage++),
          this.stage == this.drags.length)
        ) {
          var n = this;
          setTimeout(function () {
            n.$emit("completed");
          }, 500);
        }
      },
    },
  },
  Hh = (e) => (Jn("data-v-bf9ddc14"), (e = e()), Xn(), e),
  Oh = { class: "container" },
  Ih = { class: "gameContainer" },
  Lh = { key: 0, class: "gameStart" },
  Dh = Hh(() => ge("div", { class: "desc" }, null, -1));
function Nh(e, t, n, r, s, i) {
  const o = Vr("Vue3DraggableResizable");
  return (
    ne(),
    he("div", Oh, [
      ge("div", Ih, [
        (ne(!0),
        he(
          _e,
          null,
          dn(
            e.drags,
            (a, l) => (
              ne(),
              Je(
                o,
                {
                  dragId: l,
                  class: Nt({
                    drag: !0,
                    hover: e.drags[l].hover,
                    dragged: e.drags[l].dragged,
                  }),
                  initW: e.drags[l].w,
                  initH: e.drags[l].h,
                  x: e.drags[l].x,
                  "onUpdate:x": (u) => (e.drags[l].x = u),
                  y: e.drags[l].y,
                  "onUpdate:y": (u) => (e.drags[l].y = u),
                  active: e.drags[l].active,
                  "onUpdate:active": (u) => (e.drags[l].active = u),
                  draggable: !0,
                  resizable: !1,
                  onDragEnd: (u) => i.onDragEnd(u, l),
                  onDragging: (u) => i.onDragDragging(u, l),
                  style: We({ backgroundImage: "url(" + a.bg + ")" }),
                },
                null,
                8,
                [
                  "dragId",
                  "class",
                  "initW",
                  "initH",
                  "x",
                  "onUpdate:x",
                  "y",
                  "onUpdate:y",
                  "active",
                  "onUpdate:active",
                  "onDragEnd",
                  "onDragging",
                  "style",
                ]
              )
            )
          ),
          256
        )),
        ge(
          "div",
          {
            class: "target",
            style: We({
              backgroundImage: "url(" + e.targets[0].backgrounds[e.stage] + ")",
            }),
          },
          null,
          4
        ),
      ]),
      ee(Ee, null, {
        default: ye(() => [
          e.started
            ? xe("", !0)
            : (ne(),
              he("div", Lh, [
                Dh,
                ge("div", {
                  class: "start",
                  onClick: t[0] || (t[0] = (a) => (e.started = !0)),
                }),
              ])),
        ]),
        _: 1,
      }),
    ])
  );
}
const Bh = wn(xh, [
  ["render", Nh],
  ["__scopeId", "data-v-bf9ddc14"],
]);
const $h = { key: 0, class: "container", ref: "container" },
  Fh = ["src"],
  zh = { key: 0, class: "answers" },
  jh = ["answerId", "onClick"],
  Uh = ["src"],
  Vh = { key: 0, class: "continueAnswer" },
  qh = { class: "levels" },
  Wh = ["levId", "onClick"],
  Kh = {
    mounted: function () {
      var e = this;
      this.$refs.questionBg.play(),
        setTimeout(function () {
          e.$refs.container.classList.add("active");
        }, 500);
    },
    data: function () {
      return {
        currentQuestion: 0,
        questionEnded: !1,
        answerClicked: !1,
        onQuestionTransition: !1,
        currentAnswerClicked: null,
        firstAnswerClicked: !1,
        rightAnswerClicked: !1,
        continueBtnClicked: !1,
        answerSwipe: "pop",
        isShowGame: !1,
        questions: [
          {
            title: "RND",
            questionVideo: "video/rnd.mp4",
            type: "scene",
            answers: [
              {
                button: "buttons/rnd_cool.png",
                buttonHover: "buttons/rnd_cool_hover.png",
                video: "video/rnd_cool.mp4",
              },
              {
                button: "buttons/rnd_danger.png",
                buttonHover: "buttons/rnd_danger_hover.png",
                video: "video/rnd_danger.mp4",
              },
            ],
          },
          {
            title: "motherboard",
            questionVideo: "video/motherboard.mp4",
            type: "question",
            button: "buttons/motherboard_continue.png",
            buttonHover: "buttons/motherboard_continue_hover.png",
            continueVideo: "video/motherboard_continue.mp4",
            answers: [
              {
                button: "buttons/motherboard_1.png",
                buttonHover: "buttons/motherboard_1_hover.png",
                video: "video/motherboard_1.mp4",
                right: !1,
              },
              {
                button: "buttons/motherboard_2.png",
                buttonHover: "buttons/motherboard_2_hover.png",
                video: "video/motherboard_2.mp4",
                right: !1,
              },
              {
                button: "buttons/motherboard_3.png",
                buttonHover: "buttons/motherboard_3_hover.png",
                video: "video/motherboard_3.mp4",
                right: !0,
              },
            ],
          },
          {
            title: "processor",
            questionVideo: "video/processor.mp4",
            type: "question",
            button: "buttons/processor_continue.png",
            buttonHover: "buttons/processor_continue_hover.png",
            continueVideo: "video/processor_continue.mp4",
            answers: [
              {
                button: "buttons/processor_1.png",
                buttonHover: "buttons/processor_1_hover.png",
                video: "video/processor_1.mp4",
                right: !1,
              },
              {
                button: "buttons/processor_2.png",
                buttonHover: "buttons/processor_2_hover.png",
                video: "video/processor_2.mp4",
                right: !1,
              },
              {
                button: "buttons/processor_3.png",
                buttonHover: "buttons/processor_3_hover.png",
                video: "video/processor_3.mp4",
                right: !0,
              },
            ],
          },
          {
            title: "cooler",
            questionVideo: "video/cooler.mp4",
            type: "question",
            button: "buttons/cooler_continue.png",
            buttonHover: "buttons/cooler_continue_hover.png",
            continueVideo: "video/cooler_continue.mp4",
            answers: [
              {
                button: "buttons/cooler_1.png",
                buttonHover: "buttons/cooler_1_hover.png",
                video: "video/cooler_1.mp4",
                right: !0,
              },
              {
                button: "buttons/cooler_2.png",
                buttonHover: "buttons/cooler_2_hover.png",
                video: "video/cooler_2.mp4",
                right: !1,
              },
            ],
          },
          {
            title: "ram",
            questionVideo: "video/ram.mp4",
            type: "game",
            button: "buttons/ram_continue.png",
            buttonHover: "buttons/ram_continue_hover.png",
            continueVideo: "video/ram_continue.mp4",
            answers: [
              {
                button: "buttons/ram_1.png",
                buttonHover: "buttons/ram_1_hover.png",
                video: "video/ram_1.mp4",
                right: !1,
              },
              {
                button: "buttons/ram_2.png",
                buttonHover: "buttons/ram_2_hover.png",
                video: "video/ram_2.mp4",
                right: !0,
              },
            ],
          },
          {
            title: "hdd",
            questionVideo: "video/hdd.mp4",
            type: "game",
            button: "buttons/hdd_continue.png",
            buttonHover: "buttons/hdd_continue_hover.png",
            continueVideo: "video/hdd_continue.mp4",
            answers: [
              {
                button: "buttons/hdd_1.png",
                buttonHover: "buttons/hdd_1_hover.png",
                video: "video/hdd_1.mp4",
                right: !1,
              },
              {
                button: "buttons/hdd_2.png",
                buttonHover: "buttons/hdd_2_hover.png",
                video: "video/hdd_2.mp4",
                right: !1,
              },
              {
                button: "buttons/hdd_3.png",
                buttonHover: "buttons/hdd_3_hover.png",
                video: "video/hdd_3.mp4",
                right: !0,
              },
            ],
          },
          {
            title: "battery",
            questionVideo: "video/battery.mp4",
            type: "game",
            button: "buttons/battery_continue.png",
            buttonHover: "buttons/battery_continue_hover.png",
            continueVideo: "video/battery_continue.mp4",
            answers: [
              {
                button: "buttons/battery_1.png",
                buttonHover: "buttons/battery_1_hover.png",
                video: "video/battery_1.mp4",
                right: !0,
              },
              {
                button: "buttons/battery_2.png",
                buttonHover: "buttons/battery_2_hover.png",
                video: "video/battery_2.mp4",
                right: !1,
              },
              {
                button: "buttons/battery_3.png",
                buttonHover: "buttons/battery_3_hover.png",
                video: "video/battery_3.mp4",
                right: !1,
              },
            ],
          },
          {
            title: "keyboard",
            questionVideo: "video/keyboard.mp4",
            type: "game",
            button: "buttons/keyboard_continue.png",
            buttonHover: "buttons/keyboard_continue_hover.png",
            continueVideo: "video/keyboard_continue.mp4",
            answers: [
              {
                button: "buttons/keyboard_1.png",
                buttonHover: "buttons/keyboard_1_hover.png",
                video: "video/keyboard_1.mp4",
                right: !1,
              },
              {
                button: "buttons/keyboard_2.png",
                buttonHover: "buttons/keyboard_2_hover.png",
                video: "video/keyboard_2.mp4",
                right: !1,
              },
              {
                button: "buttons/keyboard_3.png",
                buttonHover: "buttons/keyboard_3_hover.png",
                video: "video/keyboard_3.mp4",
                right: !0,
              },
            ],
          },
          {
            title: "display",
            questionVideo: "video/display.mp4",
            type: "question",
            button: "buttons/display_continue.png",
            buttonHover: "buttons/display_continue_hover.png",
            continueVideo: "video/display_continue.mp4",
            answers: [
              {
                button: "buttons/display_1.png",
                buttonHover: "buttons/display_1_hover.png",
                video: "video/display_1.mp4",
                right: !0,
              },
              {
                button: "buttons/display_2.png",
                buttonHover: "buttons/display_2_hover.png",
                video: "video/display_2.mp4",
                right: !1,
              },
              {
                button: "buttons/display_3.png",
                buttonHover: "buttons/display_3_hover.png",
                video: "video/display_3.mp4",
                right: !1,
              },
            ],
          },
          {
            title: "final",
            questionVideo: "video/final.mp4",
            type: "scene",
            answers: [],
          },
        ],
      };
    },
    methods: {
      onAnswerClick(e, t) {
        var n = this;
        this.firstAnswerClicked || (this.firstAnswerClicked = !0),
          (this.currentAnswerClicked = t),
          (this.questions[this.currentQuestion].answers[t].button =
            this.questions[this.currentQuestion].answers[t].buttonHover),
          setTimeout(function () {
            (n.answerClicked = !0),
              setTimeout(function () {
                n.showAnswer(t);
              }, 100);
          }, 100);
      },
      showAnswer(e) {
        var t = this;
        this.answerSwipe == "push"
          ? ((this.answerSwipe = "pop"),
            setTimeout(function () {
              (t.$refs.answerBgPop.src =
                t.questions[t.currentQuestion].answers[e].video),
                t.$refs.answerBgPop.play();
            }, 100))
          : this.answerSwipe == "pop" &&
            ((this.answerSwipe = "push"),
            (this.$refs.answerBgPush.src =
              t.questions[t.currentQuestion].answers[e].video),
            setTimeout(function () {
              t.$refs.answerBgPush.play();
            }, 200));
      },
      onAnswerVideoEnd() {
        this.questions[this.currentQuestion].type == "scene"
          ? this.nextQuestion()
          : this.questions[this.currentQuestion].answers[
              this.currentAnswerClicked
            ].right
          ? (this.rightAnswerClicked = !0)
          : (this.answerClicked = !1);
      },
      onContinueClick(e) {
        var t = this;
        (this.questions[this.currentQuestion].button =
          this.questions[this.currentQuestion].buttonHover),
          this.questions[this.currentQuestion].type == "game" &&
            setTimeout(function () {
              t.isShowGame = !0;
            }, 300),
          this.questions[this.currentQuestion].type == "question" &&
            ((t.rightAnswerClicked = !1),
            (t.continueBtnClicked = !0),
            setTimeout(function () {
              t.$refs.continueBg.play();
            }, 100));
      },
      nextQuestion() {
        var e = this;
        (this.onQuestionTransition = !0),
          setTimeout(function () {
            e.currentQuestion++,
              (e.questionEnded = !1),
              (e.answerClicked = !1),
              (e.onQuestionTransition = !1),
              (e.currentAnswerClicked = null),
              (e.firstAnswerClicked = !1),
              (e.rightAnswerClicked = !1),
              (e.continueBtnClicked = !1),
              (e.isShowGame = !1),
              (e.answerSwipe = "pop"),
              setTimeout(function () {
                e.$refs.questionBg && e.$refs.questionBg.play();
              }, 100);
          }, 500);
      },
      onQuestionEnded() {
        this.currentQuestion == this.questions.length - 1
          ? this.$emit("quizEnded")
          : (this.questionEnded = !0);
      },
      onLevelClick(e, t) {
        (this.currentQuestion = t - 1), this.nextQuestion();
      },
      onGameEnd() {
        var e = this;
        (e.isShowGame = !1),
          (e.rightAnswerClicked = !1),
          (e.continueBtnClicked = !0),
          setTimeout(function () {
            e.$refs.continueBg.play();
          }, 100);
      },
    },
  },
  Qh = Object.assign(Kh, {
    __name: "QuizView",
    setup(e) {
      return (t, n) => (
        ne(),
        Je(Ee, null, {
          default: ye(() => [
            t.onQuestionTransition
              ? xe("", !0)
              : (ne(),
                he(
                  "div",
                  $h,
                  [
                    ge(
                      "video",
                      {
                        src: t.questions[t.currentQuestion].questionVideo,
                        class: "bg",
                        muted: "",
                        ref: "questionBg",
                        onEnded:
                          n[0] ||
                          (n[0] = (...r) =>
                            t.onQuestionEnded && t.onQuestionEnded(...r)),
                      },
                      null,
                      40,
                      Fh
                    ),
                    ee(
                      Ee,
                      { name: "ans" },
                      {
                        default: ye(() => [
                          t.firstAnswerClicked
                            ? (ne(),
                              he(
                                "video",
                                {
                                  key: 0,
                                  class: "bg",
                                  muted: "",
                                  id: "answerBgPush",
                                  ref: "answerBgPush",
                                  onEnded:
                                    n[1] ||
                                    (n[1] = (...r) =>
                                      t.onAnswerVideoEnd &&
                                      t.onAnswerVideoEnd(...r)),
                                },
                                null,
                                544
                              ))
                            : xe("", !0),
                        ]),
                        _: 1,
                      }
                    ),
                    ee(
                      Ee,
                      { name: "ans" },
                      {
                        default: ye(() => [
                          t.firstAnswerClicked && t.answerSwipe == "pop"
                            ? (ne(),
                              he(
                                "video",
                                {
                                  key: 0,
                                  class: "bg",
                                  muted: "",
                                  id: "answerBgPop",
                                  ref: "answerBgPop",
                                  onEnded:
                                    n[2] ||
                                    (n[2] = (...r) =>
                                      t.onAnswerVideoEnd &&
                                      t.onAnswerVideoEnd(...r)),
                                },
                                null,
                                544
                              ))
                            : xe("", !0),
                        ]),
                        _: 1,
                      }
                    ),
                    ee(Ee, null, {
                      default: ye(() => [
                        t.questionEnded && !t.answerClicked
                          ? (ne(),
                            he("div", zh, [
                              (ne(!0),
                              he(
                                _e,
                                null,
                                dn(
                                  t.questions[t.currentQuestion].answers,
                                  (r, s) => (
                                    ne(),
                                    he(
                                      "div",
                                      {
                                        class: "answer",
                                        answerId: s,
                                        onClick: (i) => t.onAnswerClick(i, s),
                                        style: We({
                                          backgroundImage:
                                            "url(" + r.button + ")",
                                        }),
                                      },
                                      null,
                                      12,
                                      jh
                                    )
                                  )
                                ),
                                256
                              )),
                            ]))
                          : xe("", !0),
                      ]),
                      _: 1,
                    }),
                    ee(
                      Ee,
                      { name: "ans" },
                      {
                        default: ye(() => [
                          t.continueBtnClicked
                            ? (ne(),
                              he(
                                "video",
                                {
                                  key: 0,
                                  src: t.questions[t.currentQuestion]
                                    .continueVideo,
                                  class: "bg",
                                  muted: "",
                                  id: "continueBg",
                                  ref: "continueBg",
                                  onEnded:
                                    n[3] ||
                                    (n[3] = (...r) =>
                                      t.nextQuestion && t.nextQuestion(...r)),
                                },
                                null,
                                40,
                                Uh
                              ))
                            : xe("", !0),
                        ]),
                        _: 1,
                      }
                    ),
                    ee(Ee, null, {
                      default: ye(() => [
                        t.rightAnswerClicked
                          ? (ne(),
                            he("div", Vh, [
                              ge(
                                "div",
                                {
                                  class: "answer",
                                  onClick:
                                    n[4] ||
                                    (n[4] = (r) => t.onContinueClick(r)),
                                  style: We({
                                    backgroundImage:
                                      "url(" +
                                      t.questions[t.currentQuestion].button +
                                      ")",
                                  }),
                                },
                                null,
                                4
                              ),
                            ]))
                          : xe("", !0),
                      ]),
                      _: 1,
                    }),
                    ee(Ee, null, {
                      default: ye(() => [
                        t.currentQuestion == 4 && t.isShowGame
                          ? (ne(),
                            Je(
                              fh,
                              { key: 0, onCompleted: t.onGameEnd },
                              null,
                              8,
                              ["onCompleted"]
                            ))
                          : xe("", !0),
                      ]),
                      _: 1,
                    }),
                    ee(Ee, null, {
                      default: ye(() => [
                        t.currentQuestion == 5 && t.isShowGame
                          ? (ne(),
                            Je(
                              Eh,
                              { key: 0, onCompleted: t.onGameEnd },
                              null,
                              8,
                              ["onCompleted"]
                            ))
                          : xe("", !0),
                      ]),
                      _: 1,
                    }),
                    ee(Ee, null, {
                      default: ye(() => [
                        t.currentQuestion == 6 && t.isShowGame
                          ? (ne(),
                            Je(
                              Ph,
                              { key: 0, onCompleted: t.onGameEnd },
                              null,
                              8,
                              ["onCompleted"]
                            ))
                          : xe("", !0),
                      ]),
                      _: 1,
                    }),
                    ee(Ee, null, {
                      default: ye(() => [
                        t.currentQuestion == 7 && t.isShowGame
                          ? (ne(),
                            Je(
                              Bh,
                              { key: 0, onCompleted: t.onGameEnd },
                              null,
                              8,
                              ["onCompleted"]
                            ))
                          : xe("", !0),
                      ]),
                      _: 1,
                    }),
                    ge("div", qh, [
                      (ne(!0),
                      he(
                        _e,
                        null,
                        dn(
                          t.questions,
                          (r, s) => (
                            ne(),
                            he(
                              "div",
                              {
                                class: "level",
                                levId: s,
                                onClick: (i) => t.onLevelClick(i, s),
                              },
                              cs(s) + ". " + cs(r.title),
                              9,
                              Wh
                            )
                          )
                        ),
                        256
                      )),
                    ]),
                  ],
                  512
                )),
          ]),
          _: 1,
        })
      );
    },
  }),
  Yh = wn(Qh, [["__scopeId", "data-v-0d425784"]]),
  Jh = Vd({
    history: ld("/quiz/"),
    routes: [
      { path: "/", name: "home", component: rh },
      { path: "/quiz", name: "quiz", component: Yh },
    ],
  }),
  hi = fa(Qd);
hi.use(Jh);
hi.use(Jr);
hi.mount("#app");
