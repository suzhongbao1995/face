import React, { Suspense, lazy } from 'react';
import { Spin } from 'antd';

/**
 * 懒加载组件
 */
const lazyLoad = (module: string) => {
  const Component: React.LazyExoticComponent<any> = lazy(() => import(`@pages/${module}`));
  return (
    <Suspense fallback={<Spin />}>
      <Component />
    </Suspense>
  );
};

export default lazyLoad;
