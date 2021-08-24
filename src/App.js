import React from "react";
import { Provider, connect } from "react-redux";

import store from "./store";
import { add, asyncAdd } from "./store/actionCreators";

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Count />
      </div>
    </Provider>
  );
}

function _Count(props) {
  return (
    <>
      <p>{props.num}</p>
      <div>
        <button onClick={() => props.dispatch(add(1))}>同步+1</button>
        <button onClick={() => props.dispatch(asyncAdd(1))}>异步+1</button>
      </div>
    </>
  );
}

const mapState = (state) => ({
  num: state.num,
});

const Count = connect(mapState)(_Count);
export default App;
