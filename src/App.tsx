import React from 'react';
import { HashRouter, Outlet } from 'react-router-dom';
import Routes from '@/routers';

interface AppProps {
  id?: number;
}
// 根组件
const App: React.FC<AppProps> = () => {
  return (
    <HashRouter>
      <Routes />
      <Outlet />
    </HashRouter>
  );
};

export default App;
