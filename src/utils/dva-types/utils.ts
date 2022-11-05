/**
 * 获取函数的第一个参数
 */
export type FirstPayload<F> = F extends (first: infer R, second: never) => any
  ? R extends never
    ? never
    : R extends { payload: any }
    ? R['payload']
    : never
  : never;

/**
 * 获取函数的第二个参数
 */
export type SecondPayload<F> = F extends (first: never, second: infer R) => any
  ? R extends never
    ? never
    : R extends { payload: any }
    ? R['payload']
    : never
  : never;

/**
 * 过滤never类型
 */
export type WithOutNever<T> = Pick<T, { [P in keyof T]: T[P] extends never ? never : P }[keyof T]>;

/**
 * 获取函数参数类型
 */
export type ReturnParams<F> = F extends (...args: infer P) => any ? P : never;

/**
 * 去掉函数第一个参数类型
 */
export type WithOutFirstParams<F> = F extends (first: any, ...rest: infer R) => any ? R : never;

/**
 * 生成当前model需要的action 用于model内部类型限定
 */
export type GenerateActionInner<
  Namespace extends string,
  Reducers extends { [key: string]: (...args: any[]) => any },
  Effects extends { [key: string]: (...args: any[]) => any } = Record<string, never>,
  OuterActions extends any[] = never[]
> =
  | {
      [R in keyof Reducers]: WithOutNever<{
        type: Namespace extends '' ? R : `${Namespace}/${string & R}`;
        payload: SecondPayload<Reducers[R]>;
      }>;
    }[keyof Reducers]
  | {
      [E in keyof Effects]: WithOutNever<{
        type: Namespace extends '' ? E : `${Namespace}/${string & E}`;
        payload: FirstPayload<Effects[E]>;
      }>;
    }[keyof Effects]
  | OuterActions[number];
