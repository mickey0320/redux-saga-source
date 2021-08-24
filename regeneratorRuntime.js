class Context {
  done = false;
  next = 0;
  stop() {
    this.done = true;
  }
}

exports.marked = (fn) => fn;

exports.wrap = function (innerFn, outerFn) {
  const iterator = Object.create(outerFn.prototype);
  const context = new Context();
  return {
    next(arg) {
      context.sent = arg;
      const value = innerFn(context);

      return {
        done: context.done,
        value,
      };
    },
  };
};
