/**
 * 1、创建状态、创建promise的结果, 通过try catch处理异常
 * 2、构造器创建回调函数且两个参数为resolve reject
 * 3、实现then方法，判断当前PromiseState，如果微pending将回调放入任务对列中，
 *    如果当Promise状态更改后执行对用的回调，并执行回调队列中状态前为pending的任务
 * 4、依据Promise A+规范处理不同场景，
 */

class MyPromise {
  static PENDING = 'pending';
  static FULFILLED = 'fulfilled';
  static REJECTED = 'rejected';
  static resolve(value) {
    return new MyPromise((resolve) => {
      return resolve(value);
    });
  }
  static reject(reason) {
    return new MyPromise((_, reject) => {
      reject(reason);
    });
  }
  static retry(fn, { delay, count = 3 }) {
    const delayExec = () => new MyPromise((resolve) => setTimeout(resolve, delay));
    return new MyPromise(async (resolve, reject) => {
      while (count-- > 0) {
        try {
          const result = await fn();
          resolve(result);
          break;
        } catch (reason) {
          if (delay) {
            await delayExec();
          }
          if (count === 0) {
            return reject(reason);
          }
        }
      }
    });
  }
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      for (const promise of promises) {
        MyPromise.resolve(promise).then(
          (result) => {
            resolve(result);
          },
          (err) => {
            return reject(err);
          }
        );
      }
    });
  }
  static all(promises) {
    const length = promises.length;
    let count = 0;
    let results = [];
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < length; i++) {
        const promise = promises[i];
        MyPromise.resolve(promise).then(
          (res) => {
            results[i] = res;
            if (++count === length) {
              resolve(results);
            }
          },
          (err) => {
            return reject(err);
          }
        );
      }
    });
  }
  constructor(executor) {
    // promise 的状态
    this.PromiseState = MyPromise.PENDING;
    // promise 返回的结果
    this.PromiseResult = null;
    // 存储成功的回调
    this.onFulfilledCallbacks = [];
    // 存储失败的回调
    this.onRejectedCallbacks = [];
    try {
      executor(this.resolve, this.reject);
    } catch (reason) {
      this.reject(reason);
    }
  }
  resolve = (result) => {
    if (this.PromiseState === MyPromise.PENDING) {
      this.PromiseState = MyPromise.FULFILLED;
      this.PromiseResult = result;
      while (this.onFulfilledCallbacks.length) {
        this.onFulfilledCallbacks.shift()(result);
      }
    }
  };
  reject = (reason) => {
    if (this.PromiseState === MyPromise.PENDING) {
      this.PromiseState = MyPromise.REJECTED;
      this.PromiseResult = reason;
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(reason);
      }
    }
  };
  // .then 方法
  then(onFulfilled, onRejected) {
    // onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    // // 判断回调函数是其他类型的时候
    // onRejected =
    //   typeof onRejected === 'function'
    //     ? onRejected
    //     : (reason) => {
    //         throw reason;
    //       };
    // then 必须返回新的promise
    const _resolvePromise = (promise, x, resolve, reject) => {
      if (x === promise) {
        throw new Error('不能返回相同的promise');
      }
      if (x instanceof MyPromise) {
        try {
          x.then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        } catch (reason) {
          reject(reason);
        }
      } else {
        resolve(x);
      }
    };
    const promise = new MyPromise((resolve, reject) => {
      if (this.PromiseState === MyPromise.FULFILLED) {
        setTimeout(() => {
          try {
            if (typeof onFulfilled !== 'function') {
              resolve(this.PromiseResult);
            } else {
              const x = onFulfilled(this.PromiseResult);
              _resolvePromise(promise, x, resolve, reject);
            }
          } catch (reason) {
            reject(reason);
          }
        });
      } else if (this.PromiseState === MyPromise.REJECTED) {
        setTimeout(() => {
          try {
            if (typeof onRejected !== 'function') {
              reject(this.PromiseResult);
            } else {
              const x = onRejected(this.PromiseResult);
              _resolvePromise(promise, x, resolve, reject);
            }
          } catch (reason) {
            reject(reason);
          }
        });
      } else if (this.PromiseState === MyPromise.PENDING) {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              if (typeof onFulfilled !== 'function') {
                resolve(this.PromiseResult);
              } else {
                const x = onFulfilled(this.PromiseResult);
                _resolvePromise(promise, x, resolve, reject);
              }
            } catch (reason) {
              reject(reason);
            }
          });
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              if (typeof onRejected !== 'function') {
                reject(this.PromiseResult);
              } else {
                const x = onRejected(this.PromiseResult);
                _resolvePromise(promise, x, resolve, reject);
              }
            } catch (reason) {
              reject(reason);
            }
          });
        });
      }
    });
    return promise;
  }
  catch(onRejected) {
    this.then(null, onRejected);
  }
  finally(fn) {
    return this.then(
      (value) => {
        fn();
        return value;
      },
      (reason) => {
        fn();
        throw reason;
      }
    );
  }
}

export default MyPromise;
