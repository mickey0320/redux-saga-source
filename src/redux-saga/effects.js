import { PUT, TAKE } from "./effectTypes";

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
