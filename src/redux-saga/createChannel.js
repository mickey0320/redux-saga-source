function createChannel() {
  let takers = [];
  function take(taker, matcher) {
    taker["Matcher"] = matcher;
    taker.cancel = () => {
      takers = takers.filter((t) => t !== taker);
    };
    takers.push(taker);
  }

  function put(action) {
    takers.forEach((taker) => {
      if (taker["Matcher"](action)) {
        taker.cancel();
        taker(action);
      }
    });
  }

  return {
    take,
    put,
  };
}

export default createChannel;
