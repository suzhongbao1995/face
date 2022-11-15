import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import { cloneDeep } from 'lodash';
import { DesktopOutlined, FundProjectionScreenOutlined, MenuOutlined } from '@ant-design/icons';
import lazyLoad from '@utils/lazyLoad';
import BasicLayout from '@layout';

export interface Routers {
  path?: string;
  meta: {
    key: string;
    title: string;
    label: React.ReactNode;
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
      icon: <DesktopOutlined />,
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
      icon: <FundProjectionScreenOutlined />,
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
      icon: <MenuOutlined />,
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

export interface MenuNode extends Routers {
  completeKey?: string;
  parentKey?: string;
  disabledLink?: boolean;
}

export const flatMenuRouters = () => {
  let menuMap: Map<string, MenuNode> = new Map([]);
  let stack: MenuNode[] = cloneDeep(menuRouters);
  let parentKey = '';
  while (stack.length) {
    // 去除后面的一个
    let node = stack.shift();
    if (node) {
      const key = node?.completeKey ?? node.meta.key;
      node.disabledLink = !node.path;
      menuMap.set(key, node);
      let children = node?.children ?? [];
      if (children.length) {
        parentKey = node?.completeKey ?? node.meta.key;
        children.map((child) => {
          return {
            ...child,
            completePath: parentKey + child.path,
            parentKey,
          };
        });
        stack.unshift(...children);
      }
    }
  }
  return menuMap;
};

/**
 * 使用配置式路由
 */
const Routes = () => useRoutes([...excludeMenuRouters, ...menuRouters]);

export default Routes;
