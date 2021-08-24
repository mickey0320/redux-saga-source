import { PUT, TAKE, FORK, CALL, CPS, ALL, CANCEL } from "./effectTypes";

const makeEffect = (type, payload) => {
  return {
    type,
    payload,
  };
};

export function take(actionType) {
  return makeEffect(TAKE, { pattern: actionType });
}

export function put(action) {
  return makeEffect(PUT, { action });
}

export function fork(fn) {
  return makeEffect(FORK, { fn });
}

export function takeEvery(actionType, saga) {
  function* takeEveryHelper() {
    while (true) {
      const result = yield take(actionType);
      yield fork(saga.bind(null, result));
    }
  }
  return fork(takeEveryHelper);
}

export function call(fn, ...args) {
  return makeEffect(CALL, { fn, args });
}

export function cps(fn, ...args) {
  return makeEffect(CPS, { fn, args });
}

export function all(effects) {
  return makeEffect(ALL, { effects });
}

export function cancel(task) {
  return makeEffect(CANCEL, { task });
}
