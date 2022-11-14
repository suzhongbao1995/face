import React from 'react';
import { HashRouter } from 'react-router-dom';

import Routes from '@/routers';

// 根组件
const App = () => (
  <HashRouter>
    <Routes />
  </HashRouter>
);

export default App;
