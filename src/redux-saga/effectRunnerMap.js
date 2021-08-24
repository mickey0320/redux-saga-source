import { CALL, CPS, FORK, PUT, TAKE, ALL } from "./effectTypes";
import proc from "./proc";
import { createAllStyleChildCallbacks } from "./utils";

const runPutEffect = (env, payload, next) => {
  const { dispatch } = env;
  dispatch({
    type: payload.action.type,
    payload: payload.action.payload,
  });
  next();
};

const runTakeEffect = (env, payload, next) => {
  const { channel } = env;
  const matcher = (action) => action.type === payload.pattern;
  channel.take(next, matcher);
};

const runForkEffect = (env, payload, next) => {
  proc(env, payload.fn());
  next();
};

const runCallEffect = (env, payload, next) => {
  const { fn, args } = payload;
  fn(...args).then(next);
};

const runCpsEffect = (env, payload, next) => {
  const { fn, args } = payload;
  fn(...args, (err, result) => {
    if (err) {
      next(err, true);
    } else {
      next(result);
    }
  });
};

const runAllEffect = (env, payload, next, { runEffect }) => {
  const { effects } = payload;
  if (effects.length === 0) {
    next([]);
    return;
  }
  const callbacks = createAllStyleChildCallbacks(effects, next);
  effects.forEach((effect, i) => {
    runEffect(effect, callbacks[i]);
  });
};

const effectRunnerMap = {
  [PUT]: runPutEffect,
  [TAKE]: runTakeEffect,
  [FORK]: runForkEffect,
  [CALL]: runCallEffect,
  [CPS]: runCpsEffect,
  [ALL]: runAllEffect,
};

export default effectRunnerMap;
