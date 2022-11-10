import { create } from 'dva-core-ts';
import { StoreEnhancer } from 'redux';
import createLoading from 'dva-loading-ts';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import models from '@models';

// 数据持久化配置
const persistConfig = {
  key: 'redux-state',
  storage,
};
const presistEnhancer: StoreEnhancer = (next) => (reducer) => {
  const store = next(persistReducer(persistConfig, reducer));
  const persist = persistStore(store);
  return { ...store, persist };
};

/**
 * 创建dva实例
 */
const app = create({ extraEnhancers: [presistEnhancer] });

/**
 * 注入models
 */
if (Array.isArray(models)) {
  models.forEach((m: any) => app.model(m));
}
/**
 * 使用loading插件
 */
app.use(createLoading());
app.start();

export default app._store;
