import { Commands, Result } from '@/utils/dva-types';
export interface Model {
  namespace: 't';
  state: {
    t: null | string;
  };
  reducers: {
    change: (state: Model['state'], actions: { payload: string }) => Model['state'];
  };
  effects: {
    getT: (action: { payload: string }, commands: Commands<Model>) => void;
  };
}

const model: Model = {
  namespace: 't',
  state: {
    t: null,
  },
  reducers: {
    change(state, { payload }) {
      return {
        ...state,
        t: payload,
      };
    },
  },
  effects: {
    *getT({ payload }, { call, put }) {
      const fetchT: (params: string) => Promise<string> = (params) =>
        new Promise((resolve) => setTimeout(resolve, 3000, params));
      const res: Result<typeof fetchT> = yield call(fetchT, payload);
      yield put({
        type: 'change',
        payload: res,
      });
    },
  },
};

export default model;
