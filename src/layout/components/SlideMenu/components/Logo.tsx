import React from 'react';

import logoImg from '@/assets/images/logo.png';
import style from './logo.less';

const Logo = () => {
  return (
    <div className={style.logoBox}>
      <img src={logoImg} />
      <h2 className={style.logoText}>Admin</h2>
    </div>
  );
};

export default Logo;
