import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';

import lazyLoad from '@utils/lazyLoad';
import BasicLayout from '@layout';

export interface Routers {
  path?: string;
  meta?: {
    key?: string;
    title?: string;
    label?: React.ReactNode;
    icon?: React.ReactNode;
  };
  element?: React.ReactNode;
  children?: Routers[];
}

export const excludeMenuRouters: Pick<Routers, 'path' | 'element'>[] = [
  {
    path: '/',
    element: <Navigate to="/login" />,
  },
  {
    path: 'login',
    element: lazyLoad(React.lazy(() => import(/* webpackChunkName: "login" */ '@pages/login'))),
  },
];

export const menuRouters: Routers[] = [
  {
    path: '/home',
    meta: {
      key: '/home',
      title: '首页',
      label: '首页',
    },
    element: (
      <BasicLayout>
        {lazyLoad(React.lazy(() => import(/* webpackChunkName: "home" */ '@/pages/home')))}
      </BasicLayout>
    ),
  },
  {
    path: '/dataScreen',
    meta: {
      key: '/dataScreen',
      title: '数据可视化',
      label: '数据可视化',
    },
    element: lazyLoad(
      React.lazy(() => import(/* webpackChunkName: "dataScreen" */ '@/pages/dataScreen'))
    ),
  },
  {
    meta: {
      key: '/menu',
      title: '菜单',
      label: '菜单',
    },
    element: <BasicLayout />,
    children: [
      {
        path: '/menu/menu1',
        meta: {
          key: '/menu/menu1',
          title: '菜单1',
          label: '菜单1',
        },
        children: [
          {
            path: '/menu/menu1/menu11',
            meta: {
              key: '/menu/menu1/menu11',
              title: '菜单1-1',
              label: '菜单1-1',
            },
            element: lazyLoad(
              React.lazy(() => import(/* webpackChunkName: "home" */ '@/pages/home'))
            ),
          },
        ],
      },
      {
        path: '/menu/menu2',
        meta: {
          key: '/menu/menu2',
          title: '菜单2',
          label: '菜单2',
        },
        element: lazyLoad(React.lazy(() => import(/* webpackChunkName: "home" */ '@/pages/home'))),
      },
      {
        path: '/menu/menu3',
        meta: {
          key: '/menu/menu3',
          title: '菜单3',
          label: '菜单3',
        },
        element: lazyLoad(React.lazy(() => import(/* webpackChunkName: "home" */ '@/pages/home'))),
      },
    ],
  },
];

/**
 * 使用配置式路由
 */
const Routes = () => useRoutes([...excludeMenuRouters, ...menuRouters]);

export default Routes;
