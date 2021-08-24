const regeneratorRuntime = require("./regeneratorRuntime");

const marked = regeneratorRuntime.marked(generator);

function generator() {
  return regeneratorRuntime.wrap(function wrap(context) {
    var a, b, c;
    switch (context.next) {
      case 0:
        context.next = 3;
        return 1;
      case 3:
        a = context.sent;
        console.log(a);
        context.next = 5;
        return 2;
      case 5:
        b = context.sent;
        console.log(b);
        context.next = 7;
        return 3;
      case 7:
      case "end":
        c = context.sent;
        console.log(c);
        context.done = true;
        return;
      default:
        break;
    }
  }, marked);
}

const iterator = generator();
console.log(iterator.next('a'));
console.log(iterator.next('b'));
console.log(iterator.next('c'));
console.log(iterator.next('d'));

function* _generator() {
  const a = yield 1;
  console.log(a);
  const b = yield 2;
  console.log(b);
  const c = yield 3;
  console.log(c);
}
