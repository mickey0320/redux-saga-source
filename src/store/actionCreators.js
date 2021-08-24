import { ADD, ASYNC_ADD } from "./actions";

export function add(payload) {
  return {
    type: ADD,
    payload,
  };
}

export function asyncAdd(payload) {
  return {
    type: ASYNC_ADD,
    payload,
  };
}
