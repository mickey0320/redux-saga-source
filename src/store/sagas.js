import { call, put, take, takeEvery, all } from "../redux-saga/effects";
import { add } from "./actionCreators";
import { ADD, ASYNC_ADD } from "./actions";

function wait(time, payload) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(payload);
    }, time);
  });
}

function* task(action) {
  // const res = yield call(wait, 1000, 'ok')
  // console.log(res);
  yield put(add(1));
}
// function* mySaga() {
//   yield takeEvery(ASYNC_ADD, task);
//   console.log("after");
// }

function* watch1() {
  for (let i = 0; i < 3; i++) {
    yield take(ASYNC_ADD);
    yield put(add(1));
  }
  return 1;
}

function* watch2() {
  for (let i = 0; i < 3; i++) {
    yield take(ASYNC_ADD);
    yield put(add(1));
  }
  return 2;
}

function* mySaga() {
  const values = yield all([watch1(), watch2()]);
  console.log(values);
}

export default mySaga;
