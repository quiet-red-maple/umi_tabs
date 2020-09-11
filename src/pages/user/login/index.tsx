import React, { useState } from 'react';
import { history } from 'umi';
import { Form, Input, Button, Checkbox, Tooltip } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { LoginData } from '../user';
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox';
import './login.less';

const Login: React.FC<{}> = props => {
  const [visible, setVisible] = useState(false);

  const onFinish = (values: LoginData) => {
    console.log('Success:', values);
    const { agree } = values;
    if (!agree) {
      setVisible(true);
      return
    }
    history.push('/')
  };

  const gotoRegister = () => {
    history.push('/user/register');
  };

  const gotoForgetPassword = () => {
    history.push('/user/forgetPassword');
  };

  const changeAgree = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setVisible(false);
    }
  };

  return (
    <div className="login_style">
      <h2>登 录</h2>
      <Form
        className="login_form"
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="phone"
          rules={[{ required: true, message: '请输入手机号!' }]}
        >
          <Input
            placeholder="手机号"
            prefix={<UserOutlined className="site-form-item-icon" />}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="密码"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit_button">
            登录
          </Button>
        </Form.Item>

        <Tooltip
          title="请勾选协议"
          color={'yellow'}
          key={'yellow'}
          placement="left"
          visible={visible}
        >
          <Form.Item name="agree" valuePropName="checked" className="no_input">
            <div>
              <Checkbox className="agree" onChange={changeAgree}>
                我已阅读并同意{' '}
              </Checkbox>
              <a>《平台会员服务协议》</a>
            </div>
          </Form.Item>
        </Tooltip>

        <Form.Item className="no_input">
          <div className="forget_register">
            <a onClick={gotoForgetPassword}>忘记密码</a>
            <a onClick={gotoRegister}>免费注册</a>
          </div>
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" className="no_input">
          <Checkbox className="remember">自动登录</Checkbox>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
