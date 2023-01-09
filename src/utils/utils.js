function debunce(fn, time) {
  let timer = null;
  return function (...arg) {
    if (timer) {
      clearTimeout(time);
    } else {
      setTimeout(() => {
        fn.apply(this, ...arg);
      }, time);
    }
  };
}
function throttle1(fn, time) {
  let start = Date.now();
  return function (...arg) {
    const current = Date.now();
    if (current - start > time) {
      fn.call(this, ...arg);
      start = current;
    }
  };
}
function throttle2(fn, time) {
  let timer = null;
  return function (...arg) {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      fn.call(this, ...arg);
    }, time);
  };
}
