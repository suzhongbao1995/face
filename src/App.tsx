import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from '@/routers';

// 根组件
const App = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);

export default App;
