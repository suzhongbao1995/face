import { GenerateActionInner, ReturnParams, WithOutFirstParams } from './utils';

type Effect = { [key: string]: (...args: any[]) => any | any[] };

/**
 * 获取model的action
 */
export type ModelAction<
  M extends {
    namespace: string;
    reducers: { [key: string]: (...args: any[]) => any };
    effects?: Effect;
  }
> = M['effects'] extends Effect
  ? GenerateActionInner<M['namespace'], M['reducers'], M['effects']>
  : GenerateActionInner<M['namespace'], M['reducers']>;

/**
 * 获取model中的state
 */
export type ModelState<M extends { namespace: string; state: Record<string, any> }> = M['state'];

/**
 * 获取dva的指令类型
 */
export type Commands<
  M extends {
    namespace: string;
    reducers: {
      [key: string]: (...args: any[]) => any;
    };
    effects: Effect;
  },
  O extends any[] = never[]
> = {
  call<F extends (arg: any) => any>(
    api: (params: string) => Promise<string>,
    ...arg: ReturnParams<F>
  ): any;
  put(action: GenerateActionInner<'', M['reducers'], M['effects'], O>): any;
  select<F extends (state: any, ...rest: any[]) => any>(
    selector: F,
    ...rest: WithOutFirstParams<F>
  ): any;
};

/**
 * 获取返回Promise值的类型
 */
export type Result<F extends (...arg: any) => any> = F extends (...arg: any[]) => Promise<infer R>
  ? R
  : never;
