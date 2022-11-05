import { create } from 'dva-core-ts';
import createLoading from 'dva-loading-ts';
import models from '@models';

/**
 * 创建dva实例
 */
const app = create();
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
