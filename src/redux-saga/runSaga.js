import proc from "./proc";

function runSaga(env, saga) {
  const it = saga();
  proc(env, it);
}

export default runSaga;
