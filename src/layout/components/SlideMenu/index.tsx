import React, { useEffect, useMemo, useState } from 'react';
import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import { menuRouters, Routers } from '@routers';

import Logo from './components/Logo';
import { calcOpenKeys } from './utils';

import style from './inde.less';

const SlideMenu = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [openKeys, setOpenKeys] = useState<string[]>([pathname]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    setSelectedKeys([pathname]);
    setOpenKeys(calcOpenKeys(pathname));
  }, [pathname]);

  const items = useMemo(() => {
    function getMenu(menuList: Routers[]): any {
      return menuList.map((menu) => {
        // 如果children存在
        const item = {
          label: menu.meta?.label,
          key: menu.meta?.key,
          title: menu.meta?.title,
          icon: menu.meta?.icon,
        };
        if (menu?.children?.length) {
          return { ...item, children: getMenu(menu.children) };
        }
        return item;
      });
    }

    return getMenu(menuRouters);
  }, []);

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  // 设置当前展开的 subMenu
  const onOpenChange = (openKeys: string[]) => {
    if (openKeys.length === 0 || openKeys.length === 1) {
      return setOpenKeys(openKeys);
    }
    const latestOpenKey = openKeys[openKeys.length - 1];
    if (latestOpenKey.includes(openKeys[0])) {
      return setOpenKeys(openKeys);
    }
    setOpenKeys([latestOpenKey]);
  };

  return (
    <div className={style.siderMenuContainer}>
      <Logo />
      <Menu
        className={style.siderMenu}
        items={items}
        mode="inline"
        onClick={handleMenuClick}
        onOpenChange={onOpenChange}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        theme="dark"
      />
    </div>
  );
};

export default SlideMenu;
