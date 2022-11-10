import React from 'react';
import { Button } from 'antd';

import style from './index.less';

const Home = () => {
  return (
    <div className={style.red}>
      <Button type="primary">Primary Button</Button>
    </div>
  );
};

export default Home;
