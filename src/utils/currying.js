// sum(1)(2, 5)(3) ==> 11
function sum(...args) {
  // const _sum = Array.from(args).reduce((p, n) => p + n);
  // const add = (...newArgs) => sum(_sum, ...newArgs);
  // add.valueOf = () => _sum;
  // return add;
  const _sum = Array.from(args).reduce((prev, next) => prev + next);
  const add = (...newArg) => sum(_sum, ...newArg);
  add.valueOf = () => _sum;
  return add;
}

function sumDeep(array) {
  return array.reduce((prev, next) => {
    return prev + (Array.isArray(next) ? sumDeep(next) : next);
  }, 0);
}

// 递归求数组和
function sum(array) {
  function _sum(i) {
    if (i >= array.length) {
      return 0;
    }
    return array[i] + _sum(++i);
  }
  return _sum(0);
}

let obj = {
  name: 'su',
  age: 29,
};

Object.defineProperty(obj);
