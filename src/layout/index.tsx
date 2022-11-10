import React from 'react';
import { Layout as L } from 'antd';
import classNames from 'classnames';
import { Outlet } from 'react-router-dom';
import Head from './components/Header';
import SlideMenu from './components/SlideMenu';

import style from './index.less';

const { Header, Sider, Content, Footer } = L;

/**
 *系统结构
 */
const BasicLayout = ({ children }: React.PropsWithChildren<any>) => {
  return (
    <section className={style.container}>
      <Sider theme="dark">
        <SlideMenu />
      </Sider>
      <L>
        <Header className={classNames(style.layoutBackground)}>
          <Head />
        </Header>
        <Content className={classNames([style.layoutBackground, style.content])}>
          {children}
          <Outlet></Outlet>
        </Content>
        <Footer className={classNames(style.layoutBackground)}>footer</Footer>
      </L>
    </section>
  );
};

export default React.memo(BasicLayout);
