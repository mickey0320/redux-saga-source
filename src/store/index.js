import createSagaMiddleware from "../redux-saga";
import { applyMiddleware, createStore } from "redux";

import reducer from "./reducer";
import mySaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
console.log(sagaMiddleware);
const store = applyMiddleware(sagaMiddleware)(createStore)(reducer);

sagaMiddleware.run(mySaga);

export default store;
