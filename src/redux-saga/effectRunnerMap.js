import { CALL, CPS, FORK, PUT, TAKE } from "./effectTypes";
import proc from "./proc";

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

const effectRunnerMap = {
  [PUT]: runPutEffect,
  [TAKE]: runTakeEffect,
  [FORK]: runForkEffect,
  [CALL]: runCallEffect,
  [CPS]: runCpsEffect,
};

export default effectRunnerMap;
