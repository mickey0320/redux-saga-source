import createChannel from "./createChannel";
import runSaga from "./runSaga";

function createSagaMiddleware() {
  const channel = createChannel();
  let boundSaga = null;
  const middleware = function ({ dispatch, getState }) {
    boundSaga = runSaga.bind(null, { dispatch, getState, channel });
    return (next) => {
      return (action) => {
        channel.put(action);
        return next(action);
      };
    };
  };

  function run(saga) {
    boundSaga(saga);
  }

  middleware.run = run;

  return middleware;
}

export default createSagaMiddleware;
