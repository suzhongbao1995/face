import React, { Suspense } from 'react';
import { Spin } from 'antd';

/**
 * 懒加载组件
 */
const lazyLoad = (Component: React.LazyExoticComponent<any>) => {
  return (
    <Suspense fallback={<Spin />}>
      <Component />
    </Suspense>
  );
};

export default lazyLoad;
