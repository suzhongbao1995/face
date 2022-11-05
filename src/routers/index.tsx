import React from 'react';
import { RouteObject, useRoutes, Navigate } from 'react-router-dom';
import lazyLoad from '@routers/utils/lazyLoad';

const routers: Array<RouteObject> = [
  {
    path: '/',
    element: <Navigate to="/login" />,
  },
  {
    path: 'login',
    element: lazyLoad(React.lazy(() => import('@/pages/login'))),
  },
  {
    path: '/home',
    element: lazyLoad(React.lazy(() => import('@/pages/home'))),
  },
  {
    path: '/about',
    element: lazyLoad(React.lazy(() => import('@/pages/about'))),
  },
];

/**
 * 使用配置式路由
 */
const Routes = () => useRoutes(routers);

export default Routes;
