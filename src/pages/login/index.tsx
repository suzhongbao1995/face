import React from 'react';
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined, CloseCircleOutlined } from '@ant-design/icons';

import loginLeftImg from '@/assets/images/login_left.png';
import loginImg from '@/assets/images/logo.png';
import style from './index.less';

const Item = Form.Item;
const Login = () => {
  // TODO: 登陆逻辑
  return (
    <div className={style.loginContainer}>
      <div className={style.loginBox}>
        <div className={style.loginLogo}>
          <img className={style.loginImg} src={loginLeftImg} />
        </div>
        <div className={style.loginForm}>
          <div className={style.loginTitle}>
            <img alt="" className={style.loginLogoImg} src={loginImg} />
            <span className={style.loginText}>React Hooks</span>
          </div>
          <Form colon={false} labelAlign="right" labelCol={{ span: 4 }}>
            <Item name="userName">
              <Input placeholder="请输入用户名" prefix={<UserOutlined />} size="large" />
            </Item>
            <Item name="password">
              <Input.Password placeholder="请输入密码" prefix={<LockOutlined />} size="large" />
            </Item>
            <Item className={style.loginBtn}>
              <Button icon={<CloseCircleOutlined />}>重置</Button>
              <Button icon={<UserOutlined />} type="primary">
                登陆
              </Button>
            </Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
