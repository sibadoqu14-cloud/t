import {
  require_react
} from "./chunk-WNPTCGAH.js";
import {
  __toESM
} from "./chunk-5WRI5ZAA.js";

// node_modules/jotai/esm/vanilla/internals.mjs
function hasInitialValue(atom2) {
  return "init" in atom2;
}
function isActuallyWritableAtom(atom2) {
  return !!atom2.write;
}
function isAtomStateInitialized(atomState) {
  return "v" in atomState || "e" in atomState;
}
function returnAtomValue(atomState) {
  if ("e" in atomState) {
    throw atomState.e;
  }
  if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && !("v" in atomState)) {
    throw new Error("[Bug] atom state is not initialized");
  }
  return atomState.v;
}
var promiseStateMap = /* @__PURE__ */ new WeakMap();
function isPendingPromise(value) {
  var _a;
  return isPromiseLike(value) && !!((_a = promiseStateMap.get(value)) == null ? void 0 : _a[0]);
}
function abortPromise(promise) {
  const promiseState = promiseStateMap.get(promise);
  if (promiseState == null ? void 0 : promiseState[0]) {
    promiseState[0] = false;
    promiseState[1].forEach((fn) => fn());
  }
}
function registerAbortHandler(promise, abortHandler) {
  let promiseState = promiseStateMap.get(promise);
  if (!promiseState) {
    promiseState = [true, /* @__PURE__ */ new Set()];
    promiseStateMap.set(promise, promiseState);
    const settle = () => {
      promiseState[0] = false;
    };
    promise.then(settle, settle);
  }
  promiseState[1].add(abortHandler);
}
function isPromiseLike(p) {
  return typeof (p == null ? void 0 : p.then) === "function";
}
function addPendingPromiseToDependency(atom2, promise, dependencyAtomState) {
  if (!dependencyAtomState.p.has(atom2)) {
    dependencyAtomState.p.add(atom2);
    const cleanup = () => dependencyAtomState.p.delete(atom2);
    promise.then(cleanup, cleanup);
  }
}
function getMountedOrPendingDependents(atom2, atomState, mountedMap) {
  var _a;
  const dependents = /* @__PURE__ */ new Set();
  for (const a of ((_a = mountedMap.get(atom2)) == null ? void 0 : _a.t) || []) {
    if (mountedMap.has(a)) {
      dependents.add(a);
    }
  }
  for (const atomWithPendingPromise of atomState.p) {
    dependents.add(atomWithPendingPromise);
  }
  return dependents;
}
var atomRead = (_store, atom2, ...params) => atom2.read(...params);
var atomWrite = (_store, atom2, ...params) => atom2.write(...params);
var atomOnInit = (store, atom2) => {
  var _a;
  return (_a = atom2.unstable_onInit) == null ? void 0 : _a.call(atom2, store);
};
var atomOnMount = (_store, atom2, setAtom) => {
  var _a;
  return (_a = atom2.onMount) == null ? void 0 : _a.call(atom2, setAtom);
};
var ensureAtomState = (store, atom2) => {
  const buildingBlocks = getInternalBuildingBlocks(store);
  const atomStateMap = buildingBlocks[0];
  const atomOnInit2 = buildingBlocks[9];
  if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && !atom2) {
    throw new Error("Atom is undefined or null");
  }
  let atomState = atomStateMap.get(atom2);
  if (!atomState) {
    atomState = { d: /* @__PURE__ */ new Map(), p: /* @__PURE__ */ new Set(), n: 0 };
    atomStateMap.set(atom2, atomState);
    atomOnInit2 == null ? void 0 : atomOnInit2(store, atom2);
  }
  return atomState;
};
var flushCallbacks = (store) => {
  const buildingBlocks = getInternalBuildingBlocks(store);
  const mountedMap = buildingBlocks[1];
  const changedAtoms = buildingBlocks[3];
  const mountCallbacks = buildingBlocks[4];
  const unmountCallbacks = buildingBlocks[5];
  const storeHooks = buildingBlocks[6];
  const recomputeInvalidatedAtoms2 = buildingBlocks[13];
  const errors = [];
  const call = (fn) => {
    try {
      fn();
    } catch (e) {
      errors.push(e);
    }
  };
  do {
    if (storeHooks.f) {
      call(storeHooks.f);
    }
    const callbacks = /* @__PURE__ */ new Set();
    const add = callbacks.add.bind(callbacks);
    changedAtoms.forEach((atom2) => {
      var _a;
      return (_a = mountedMap.get(atom2)) == null ? void 0 : _a.l.forEach(add);
    });
    changedAtoms.clear();
    unmountCallbacks.forEach(add);
    unmountCallbacks.clear();
    mountCallbacks.forEach(add);
    mountCallbacks.clear();
    callbacks.forEach(call);
    if (changedAtoms.size) {
      recomputeInvalidatedAtoms2(store);
    }
  } while (changedAtoms.size || unmountCallbacks.size || mountCallbacks.size);
  if (errors.length) {
    throw new AggregateError(errors);
  }
};
var recomputeInvalidatedAtoms = (store) => {
  const buildingBlocks = getInternalBuildingBlocks(store);
  const mountedMap = buildingBlocks[1];
  const invalidatedAtoms = buildingBlocks[2];
  const changedAtoms = buildingBlocks[3];
  const ensureAtomState2 = buildingBlocks[11];
  const readAtomState2 = buildingBlocks[14];
  const mountDependencies2 = buildingBlocks[17];
  const topSortedReversed = [];
  const visiting = /* @__PURE__ */ new WeakSet();
  const visited = /* @__PURE__ */ new WeakSet();
  const stack = Array.from(changedAtoms);
  while (stack.length) {
    const a = stack[stack.length - 1];
    const aState = ensureAtomState2(store, a);
    if (visited.has(a)) {
      stack.pop();
      continue;
    }
    if (visiting.has(a)) {
      if (invalidatedAtoms.get(a) === aState.n) {
        topSortedReversed.push([a, aState]);
      } else if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && invalidatedAtoms.has(a)) {
        throw new Error("[Bug] invalidated atom exists");
      }
      visited.add(a);
      stack.pop();
      continue;
    }
    visiting.add(a);
    for (const d of getMountedOrPendingDependents(a, aState, mountedMap)) {
      if (!visiting.has(d)) {
        stack.push(d);
      }
    }
  }
  for (let i = topSortedReversed.length - 1; i >= 0; --i) {
    const [a, aState] = topSortedReversed[i];
    let hasChangedDeps = false;
    for (const dep of aState.d.keys()) {
      if (dep !== a && changedAtoms.has(dep)) {
        hasChangedDeps = true;
        break;
      }
    }
    if (hasChangedDeps) {
      readAtomState2(store, a);
      mountDependencies2(store, a);
    }
    invalidatedAtoms.delete(a);
  }
};
var readAtomState = (store, atom2) => {
  var _a, _b;
  const buildingBlocks = getInternalBuildingBlocks(store);
  const mountedMap = buildingBlocks[1];
  const invalidatedAtoms = buildingBlocks[2];
  const changedAtoms = buildingBlocks[3];
  const storeHooks = buildingBlocks[6];
  const atomRead2 = buildingBlocks[7];
  const ensureAtomState2 = buildingBlocks[11];
  const flushCallbacks2 = buildingBlocks[12];
  const recomputeInvalidatedAtoms2 = buildingBlocks[13];
  const readAtomState2 = buildingBlocks[14];
  const writeAtomState2 = buildingBlocks[16];
  const mountDependencies2 = buildingBlocks[17];
  const atomState = ensureAtomState2(store, atom2);
  if (isAtomStateInitialized(atomState)) {
    if (mountedMap.has(atom2) && invalidatedAtoms.get(atom2) !== atomState.n) {
      return atomState;
    }
    if (Array.from(atomState.d).every(
      ([a, n]) => (
        // Recursively, read the atom state of the dependency, and
        // check if the atom epoch number is unchanged
        readAtomState2(store, a).n === n
      )
    )) {
      return atomState;
    }
  }
  atomState.d.clear();
  let isSync = true;
  function mountDependenciesIfAsync() {
    if (mountedMap.has(atom2)) {
      mountDependencies2(store, atom2);
      recomputeInvalidatedAtoms2(store);
      flushCallbacks2(store);
    }
  }
  function getter(a) {
    var _a2;
    if (a === atom2) {
      const aState2 = ensureAtomState2(store, a);
      if (!isAtomStateInitialized(aState2)) {
        if (hasInitialValue(a)) {
          setAtomStateValueOrPromise(store, a, a.init);
        } else {
          throw new Error("no atom init");
        }
      }
      return returnAtomValue(aState2);
    }
    const aState = readAtomState2(store, a);
    try {
      return returnAtomValue(aState);
    } finally {
      atomState.d.set(a, aState.n);
      if (isPendingPromise(atomState.v)) {
        addPendingPromiseToDependency(atom2, atomState.v, aState);
      }
      (_a2 = mountedMap.get(a)) == null ? void 0 : _a2.t.add(atom2);
      if (!isSync) {
        mountDependenciesIfAsync();
      }
    }
  }
  let controller;
  let setSelf;
  const options = {
    get signal() {
      if (!controller) {
        controller = new AbortController();
      }
      return controller.signal;
    },
    get setSelf() {
      if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && !isActuallyWritableAtom(atom2)) {
        console.warn("setSelf function cannot be used with read-only atom");
      }
      if (!setSelf && isActuallyWritableAtom(atom2)) {
        setSelf = (...args) => {
          if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && isSync) {
            console.warn("setSelf function cannot be called in sync");
          }
          if (!isSync) {
            try {
              return writeAtomState2(store, atom2, ...args);
            } finally {
              recomputeInvalidatedAtoms2(store);
              flushCallbacks2(store);
            }
          }
        };
      }
      return setSelf;
    }
  };
  const prevEpochNumber = atomState.n;
  try {
    const valueOrPromise = atomRead2(store, atom2, getter, options);
    setAtomStateValueOrPromise(store, atom2, valueOrPromise);
    if (isPromiseLike(valueOrPromise)) {
      registerAbortHandler(valueOrPromise, () => controller == null ? void 0 : controller.abort());
      valueOrPromise.then(mountDependenciesIfAsync, mountDependenciesIfAsync);
    }
    (_a = storeHooks.r) == null ? void 0 : _a.call(storeHooks, atom2);
    return atomState;
  } catch (error) {
    delete atomState.v;
    atomState.e = error;
    ++atomState.n;
    return atomState;
  } finally {
    isSync = false;
    if (prevEpochNumber !== atomState.n && invalidatedAtoms.get(atom2) === prevEpochNumber) {
      invalidatedAtoms.set(atom2, atomState.n);
      changedAtoms.add(atom2);
      (_b = storeHooks.c) == null ? void 0 : _b.call(storeHooks, atom2);
    }
  }
};
var invalidateDependents = (store, atom2) => {
  const buildingBlocks = getInternalBuildingBlocks(store);
  const mountedMap = buildingBlocks[1];
  const invalidatedAtoms = buildingBlocks[2];
  const ensureAtomState2 = buildingBlocks[11];
  const stack = [atom2];
  while (stack.length) {
    const a = stack.pop();
    const aState = ensureAtomState2(store, a);
    for (const d of getMountedOrPendingDependents(a, aState, mountedMap)) {
      const dState = ensureAtomState2(store, d);
      invalidatedAtoms.set(d, dState.n);
      stack.push(d);
    }
  }
};
var writeAtomState = (store, atom2, ...args) => {
  const buildingBlocks = getInternalBuildingBlocks(store);
  const changedAtoms = buildingBlocks[3];
  const storeHooks = buildingBlocks[6];
  const atomWrite2 = buildingBlocks[8];
  const ensureAtomState2 = buildingBlocks[11];
  const flushCallbacks2 = buildingBlocks[12];
  const recomputeInvalidatedAtoms2 = buildingBlocks[13];
  const readAtomState2 = buildingBlocks[14];
  const invalidateDependents2 = buildingBlocks[15];
  const mountDependencies2 = buildingBlocks[17];
  let isSync = true;
  const getter = (a) => returnAtomValue(readAtomState2(store, a));
  const setter = (a, ...args2) => {
    var _a;
    const aState = ensureAtomState2(store, a);
    try {
      if (a === atom2) {
        if (!hasInitialValue(a)) {
          throw new Error("atom not writable");
        }
        const prevEpochNumber = aState.n;
        const v = args2[0];
        setAtomStateValueOrPromise(store, a, v);
        mountDependencies2(store, a);
        if (prevEpochNumber !== aState.n) {
          changedAtoms.add(a);
          (_a = storeHooks.c) == null ? void 0 : _a.call(storeHooks, a);
          invalidateDependents2(store, a);
        }
        return void 0;
      } else {
        return writeAtomState(store, a, ...args2);
      }
    } finally {
      if (!isSync) {
        recomputeInvalidatedAtoms2(store);
        flushCallbacks2(store);
      }
    }
  };
  try {
    return atomWrite2(store, atom2, getter, setter, ...args);
  } finally {
    isSync = false;
  }
};
var mountDependencies = (store, atom2) => {
  var _a;
  const buildingBlocks = getInternalBuildingBlocks(store);
  const mountedMap = buildingBlocks[1];
  const changedAtoms = buildingBlocks[3];
  const storeHooks = buildingBlocks[6];
  const ensureAtomState2 = buildingBlocks[11];
  const invalidateDependents2 = buildingBlocks[15];
  const mountAtom2 = buildingBlocks[18];
  const unmountAtom2 = buildingBlocks[19];
  const atomState = ensureAtomState2(store, atom2);
  const mounted = mountedMap.get(atom2);
  if (mounted && !isPendingPromise(atomState.v)) {
    for (const [a, n] of atomState.d) {
      if (!mounted.d.has(a)) {
        const aState = ensureAtomState2(store, a);
        const aMounted = mountAtom2(store, a);
        aMounted.t.add(atom2);
        mounted.d.add(a);
        if (n !== aState.n) {
          changedAtoms.add(a);
          (_a = storeHooks.c) == null ? void 0 : _a.call(storeHooks, a);
          invalidateDependents2(store, a);
        }
      }
    }
    for (const a of mounted.d || []) {
      if (!atomState.d.has(a)) {
        mounted.d.delete(a);
        const aMounted = unmountAtom2(store, a);
        aMounted == null ? void 0 : aMounted.t.delete(atom2);
      }
    }
  }
};
var mountAtom = (store, atom2) => {
  var _a;
  const buildingBlocks = getInternalBuildingBlocks(store);
  const mountedMap = buildingBlocks[1];
  const mountCallbacks = buildingBlocks[4];
  const storeHooks = buildingBlocks[6];
  const atomOnMount2 = buildingBlocks[10];
  const ensureAtomState2 = buildingBlocks[11];
  const flushCallbacks2 = buildingBlocks[12];
  const recomputeInvalidatedAtoms2 = buildingBlocks[13];
  const readAtomState2 = buildingBlocks[14];
  const writeAtomState2 = buildingBlocks[16];
  const atomState = ensureAtomState2(store, atom2);
  let mounted = mountedMap.get(atom2);
  if (!mounted) {
    readAtomState2(store, atom2);
    for (const a of atomState.d.keys()) {
      const aMounted = mountAtom(store, a);
      aMounted.t.add(atom2);
    }
    mounted = {
      l: /* @__PURE__ */ new Set(),
      d: new Set(atomState.d.keys()),
      t: /* @__PURE__ */ new Set()
    };
    mountedMap.set(atom2, mounted);
    (_a = storeHooks.m) == null ? void 0 : _a.call(storeHooks, atom2);
    if (isActuallyWritableAtom(atom2)) {
      const processOnMount = () => {
        let isSync = true;
        const setAtom = (...args) => {
          try {
            return writeAtomState2(store, atom2, ...args);
          } finally {
            if (!isSync) {
              recomputeInvalidatedAtoms2(store);
              flushCallbacks2(store);
            }
          }
        };
        try {
          const onUnmount = atomOnMount2(store, atom2, setAtom);
          if (onUnmount) {
            mounted.u = () => {
              isSync = true;
              try {
                onUnmount();
              } finally {
                isSync = false;
              }
            };
          }
        } finally {
          isSync = false;
        }
      };
      mountCallbacks.add(processOnMount);
    }
  }
  return mounted;
};
var unmountAtom = (store, atom2) => {
  var _a;
  const buildingBlocks = getInternalBuildingBlocks(store);
  const mountedMap = buildingBlocks[1];
  const unmountCallbacks = buildingBlocks[5];
  const storeHooks = buildingBlocks[6];
  const ensureAtomState2 = buildingBlocks[11];
  const unmountAtom2 = buildingBlocks[19];
  const atomState = ensureAtomState2(store, atom2);
  let mounted = mountedMap.get(atom2);
  if (mounted && !mounted.l.size && !Array.from(mounted.t).some((a) => {
    var _a2;
    return (_a2 = mountedMap.get(a)) == null ? void 0 : _a2.d.has(atom2);
  })) {
    if (mounted.u) {
      unmountCallbacks.add(mounted.u);
    }
    mounted = void 0;
    mountedMap.delete(atom2);
    (_a = storeHooks.u) == null ? void 0 : _a.call(storeHooks, atom2);
    for (const a of atomState.d.keys()) {
      const aMounted = unmountAtom2(store, a);
      aMounted == null ? void 0 : aMounted.t.delete(atom2);
    }
    return void 0;
  }
  return mounted;
};
var setAtomStateValueOrPromise = (store, atom2, valueOrPromise) => {
  const ensureAtomState2 = getInternalBuildingBlocks(store)[11];
  const atomState = ensureAtomState2(store, atom2);
  const hasPrevValue = "v" in atomState;
  const prevValue = atomState.v;
  if (isPromiseLike(valueOrPromise)) {
    for (const a of atomState.d.keys()) {
      addPendingPromiseToDependency(
        atom2,
        valueOrPromise,
        ensureAtomState2(store, a)
      );
    }
  }
  atomState.v = valueOrPromise;
  delete atomState.e;
  if (!hasPrevValue || !Object.is(prevValue, atomState.v)) {
    ++atomState.n;
    if (isPromiseLike(prevValue)) {
      abortPromise(prevValue);
    }
  }
};
var storeGet = (store, atom2) => {
  const readAtomState2 = getInternalBuildingBlocks(store)[14];
  return returnAtomValue(readAtomState2(store, atom2));
};
var storeSet = (store, atom2, ...args) => {
  const buildingBlocks = getInternalBuildingBlocks(store);
  const flushCallbacks2 = buildingBlocks[12];
  const recomputeInvalidatedAtoms2 = buildingBlocks[13];
  const writeAtomState2 = buildingBlocks[16];
  try {
    return writeAtomState2(store, atom2, ...args);
  } finally {
    recomputeInvalidatedAtoms2(store);
    flushCallbacks2(store);
  }
};
var storeSub = (store, atom2, listener) => {
  const buildingBlocks = getInternalBuildingBlocks(store);
  const flushCallbacks2 = buildingBlocks[12];
  const mountAtom2 = buildingBlocks[18];
  const unmountAtom2 = buildingBlocks[19];
  const mounted = mountAtom2(store, atom2);
  const listeners = mounted.l;
  listeners.add(listener);
  flushCallbacks2(store);
  return () => {
    listeners.delete(listener);
    unmountAtom2(store, atom2);
    flushCallbacks2(store);
  };
};
var buildingBlockMap = /* @__PURE__ */ new WeakMap();
var getInternalBuildingBlocks = (store) => {
  const buildingBlocks = buildingBlockMap.get(store);
  if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && !buildingBlocks) {
    throw new Error(
      "Store must be created by buildStore to read its building blocks"
    );
  }
  return buildingBlocks;
};
function buildStore(...buildArgs) {
  const store = {
    get(atom2) {
      const storeGet2 = getInternalBuildingBlocks(store)[21];
      return storeGet2(store, atom2);
    },
    set(atom2, ...args) {
      const storeSet2 = getInternalBuildingBlocks(store)[22];
      return storeSet2(store, atom2, ...args);
    },
    sub(atom2, listener) {
      const storeSub2 = getInternalBuildingBlocks(store)[23];
      return storeSub2(store, atom2, listener);
    }
  };
  const buildingBlocks = [
    // store state
    /* @__PURE__ */ new WeakMap(),
    // atomStateMap
    /* @__PURE__ */ new WeakMap(),
    // mountedMap
    /* @__PURE__ */ new WeakMap(),
    // invalidatedAtoms
    /* @__PURE__ */ new Set(),
    // changedAtoms
    /* @__PURE__ */ new Set(),
    // mountCallbacks
    /* @__PURE__ */ new Set(),
    // unmountCallbacks
    {},
    // storeHooks
    // atom interceptors
    atomRead,
    atomWrite,
    atomOnInit,
    atomOnMount,
    // building-block functions
    ensureAtomState,
    flushCallbacks,
    recomputeInvalidatedAtoms,
    readAtomState,
    invalidateDependents,
    writeAtomState,
    mountDependencies,
    mountAtom,
    unmountAtom,
    setAtomStateValueOrPromise,
    storeGet,
    storeSet,
    storeSub,
    void 0
  ].map((fn, i) => buildArgs[i] || fn);
  buildingBlockMap.set(store, Object.freeze(buildingBlocks));
  return store;
}

// node_modules/jotai/esm/vanilla.mjs
var keyCount = 0;
function atom(read, write) {
  const key = `atom${++keyCount}`;
  const config = {
    toString() {
      return (import.meta.env ? import.meta.env.MODE : void 0) !== "production" && this.debugLabel ? key + ":" + this.debugLabel : key;
    }
  };
  if (typeof read === "function") {
    config.read = read;
  } else {
    config.init = read;
    config.read = defaultRead;
    config.write = defaultWrite;
  }
  if (write) {
    config.write = write;
  }
  return config;
}
function defaultRead(get) {
  return get(this);
}
function defaultWrite(get, set, arg) {
  return set(
    this,
    typeof arg === "function" ? arg(get(this)) : arg
  );
}
var overiddenCreateStore;
function INTERNAL_overrideCreateStore(fn) {
  overiddenCreateStore = fn(overiddenCreateStore);
}
function createStore() {
  if (overiddenCreateStore) {
    return overiddenCreateStore();
  }
  return buildStore();
}
var defaultStore;
function getDefaultStore() {
  if (!defaultStore) {
    defaultStore = createStore();
    if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production") {
      globalThis.__JOTAI_DEFAULT_STORE__ || (globalThis.__JOTAI_DEFAULT_STORE__ = defaultStore);
      if (globalThis.__JOTAI_DEFAULT_STORE__ !== defaultStore) {
        console.warn(
          "Detected multiple Jotai instances. It may cause unexpected behavior with the default store. https://github.com/pmndrs/jotai/discussions/2044"
        );
      }
    }
  }
  return defaultStore;
}

// node_modules/jotai/esm/react.mjs
var import_react = __toESM(require_react(), 1);
var StoreContext = (0, import_react.createContext)(
  void 0
);
function useStore(options) {
  const store = (0, import_react.useContext)(StoreContext);
  return (options == null ? void 0 : options.store) || store || getDefaultStore();
}
function Provider({
  children,
  store
}) {
  const storeRef = (0, import_react.useRef)(void 0);
  if (!store && !storeRef.current) {
    storeRef.current = createStore();
  }
  return (0, import_react.createElement)(
    StoreContext.Provider,
    {
      value: store || storeRef.current
    },
    children
  );
}
var isPromiseLike2 = (x) => typeof (x == null ? void 0 : x.then) === "function";
var attachPromiseStatus = (promise) => {
  if (!promise.status) {
    promise.status = "pending";
    promise.then(
      (v) => {
        promise.status = "fulfilled";
        promise.value = v;
      },
      (e) => {
        promise.status = "rejected";
        promise.reason = e;
      }
    );
  }
};
var use = import_react.default.use || // A shim for older React versions
((promise) => {
  if (promise.status === "pending") {
    throw promise;
  } else if (promise.status === "fulfilled") {
    return promise.value;
  } else if (promise.status === "rejected") {
    throw promise.reason;
  } else {
    attachPromiseStatus(promise);
    throw promise;
  }
});
var continuablePromiseMap = /* @__PURE__ */ new WeakMap();
var createContinuablePromise = (promise, getValue) => {
  let continuablePromise = continuablePromiseMap.get(promise);
  if (!continuablePromise) {
    continuablePromise = new Promise((resolve, reject) => {
      let curr = promise;
      const onFulfilled = (me) => (v) => {
        if (curr === me) {
          resolve(v);
        }
      };
      const onRejected = (me) => (e) => {
        if (curr === me) {
          reject(e);
        }
      };
      const onAbort = () => {
        try {
          const nextValue = getValue();
          if (isPromiseLike2(nextValue)) {
            continuablePromiseMap.set(nextValue, continuablePromise);
            curr = nextValue;
            nextValue.then(onFulfilled(nextValue), onRejected(nextValue));
            registerAbortHandler(nextValue, onAbort);
          } else {
            resolve(nextValue);
          }
        } catch (e) {
          reject(e);
        }
      };
      promise.then(onFulfilled(promise), onRejected(promise));
      registerAbortHandler(promise, onAbort);
    });
    continuablePromiseMap.set(promise, continuablePromise);
  }
  return continuablePromise;
};
function useAtomValue(atom2, options) {
  const { delay, unstable_promiseStatus: promiseStatus = !import_react.default.use } = options || {};
  const store = useStore(options);
  const [[valueFromReducer, storeFromReducer, atomFromReducer], rerender] = (0, import_react.useReducer)(
    (prev) => {
      const nextValue = store.get(atom2);
      if (Object.is(prev[0], nextValue) && prev[1] === store && prev[2] === atom2) {
        return prev;
      }
      return [nextValue, store, atom2];
    },
    void 0,
    () => [store.get(atom2), store, atom2]
  );
  let value = valueFromReducer;
  if (storeFromReducer !== store || atomFromReducer !== atom2) {
    rerender();
    value = store.get(atom2);
  }
  (0, import_react.useEffect)(() => {
    const unsub = store.sub(atom2, () => {
      if (promiseStatus) {
        try {
          const value2 = store.get(atom2);
          if (isPromiseLike2(value2)) {
            attachPromiseStatus(
              createContinuablePromise(value2, () => store.get(atom2))
            );
          }
        } catch (e) {
        }
      }
      if (typeof delay === "number") {
        setTimeout(rerender, delay);
        return;
      }
      rerender();
    });
    rerender();
    return unsub;
  }, [store, atom2, delay, promiseStatus]);
  (0, import_react.useDebugValue)(value);
  if (isPromiseLike2(value)) {
    const promise = createContinuablePromise(value, () => store.get(atom2));
    if (promiseStatus) {
      attachPromiseStatus(promise);
    }
    return use(promise);
  }
  return value;
}
function useSetAtom(atom2, options) {
  const store = useStore(options);
  const setAtom = (0, import_react.useCallback)(
    (...args) => {
      if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && !("write" in atom2)) {
        throw new Error("not writable atom");
      }
      return store.set(atom2, ...args);
    },
    [store, atom2]
  );
  return setAtom;
}
function useAtom(atom2, options) {
  return [
    useAtomValue(atom2, options),
    // We do wrong type assertion here, which results in throwing an error.
    useSetAtom(atom2, options)
  ];
}
export {
  INTERNAL_overrideCreateStore,
  Provider,
  atom,
  createStore,
  getDefaultStore,
  useAtom,
  useAtomValue,
  useSetAtom,
  useStore
};
//# sourceMappingURL=jotai.js.map
