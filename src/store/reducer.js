import { ADD, ASYNC_ADD } from "./actions";

const defaultState = {
  num: 0,
};
export function reducer(state = defaultState, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + action.payload,
      };
    default:
      return state;
  }
}

export default reducer;
