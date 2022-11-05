import React from 'react';
import { Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import style from './index.less';

const Item = Form.Item;
const Login = () => {
  return (
    <div className={style.loginContainer}>
      <div className={style.loginLogo}></div>
      <div className={style.loginForm}>
        <Form colon={false} labelAlign="right" labelCol={{ span: 4 }}>
          <Item name="userName">
            <Input placeholder="请输入用户名" prefix={<UserOutlined />} size="large" />
          </Item>
          <Item name="password">
            <Input.Password placeholder="请输入密码" prefix={<LockOutlined />} size="large" />
          </Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
