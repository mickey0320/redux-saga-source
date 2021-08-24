import effectRunnerMap from "./effectRunnerMap";
import { CANCEL_TASK } from "./symbol";

function proc(env, iterator, cont) {
  const task = {
    cancel: () => next(CANCEL_TASK),
  };
  function next(val, isError) {
    if (val === CANCEL_TASK) {
      iterator.return(val);
    } else if (isError) {
      iterator.throw(val);
      return;
    }
    const result = iterator.next(val);
    if (!result.done) {
      runEffect(result.value, next);
    } else {
      cont?.(result.value);
    }
  }

  function runEffect(effect, next) {
    // 是一个迭代器对象
    if (effect && typeof effect[Symbol.iterator] === "function") {
      proc(env, effect, next);
    } else if (effect.then) {
      //是一个promise
      effect.then(next, (error) => {
        next(error, true);
      });
    } else {
      if (effect) {
        effectRunnerMap[effect.type](env, effect.payload, next, { runEffect });
      } else {
        next();
      }
    }
  }
  next();

  return task;
}

export default proc;
