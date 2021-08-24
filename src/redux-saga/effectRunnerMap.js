import { PUT, TAKE } from "./effectTypes";

const runPutEffect = (env, effect, next) => {
  const { dispatch } = env;
  const { payload } = effect;
  dispatch({
    type: payload.action.type,
    payload: payload.action.payload,
  });
  next();
};

const runTakeEffect = (env, effect, next) => {
  const { channel } = env;
  const matcher = (action) => action.type === effect.payload.pattern;
  channel.take(next, matcher);
};

const effectRunnerMap = {
  [PUT]: runPutEffect,
  [TAKE]: runTakeEffect,
};

export default effectRunnerMap;
