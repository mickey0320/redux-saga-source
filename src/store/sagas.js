import { call, put, take, takeEvery } from "../redux-saga/effects";
import { add } from "./actionCreators";
import { ASYNC_ADD } from "./actions";

function wait(time, payload) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(payload);
    }, time);
  });
}

function* task(action) {
  // const res = yield wait(1000, "ok");
  const res = yield call(wait, 1000, 'ok')
  console.log(res);
  yield put(add(1));
}
function* mySaga() {
  yield takeEvery(ASYNC_ADD, task);
  console.log("after");
}

export default mySaga;
