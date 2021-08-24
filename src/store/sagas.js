import { put, take } from "../redux-saga/effects";
import { add } from "./actionCreators";
import { ASYNC_ADD } from "./actions";

function wait(time, payload) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(payload);
    }, time);
  });
}

// function* async(action) {
//   const count = yield call(wait, 1000, action.payload);
//   yield put(add(count));
// }
function* mySaga() {
  for (let i = 0; i < 3; i++) {
    const xx = yield take(ASYNC_ADD);
    console.log(xx)
    yield put(add(1));
  }
}

export default mySaga;
