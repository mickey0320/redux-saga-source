import effectRunnerMap from "./effectRunnerMap";

function proc(env, itertor) {
  function next(val) {
    const effect = itertor.next(val);
    if (!effect.done) {
      runEffect(effect.value);
    } else {
      //
    }
  }

  function runEffect(effect) {
    if (effect) {
      effectRunnerMap[effect.type](env, effect, next);
    } else {
      next();
    }
  }
  next();
}

export default proc;
