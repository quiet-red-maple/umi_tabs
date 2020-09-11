import React, { useEffect, useState, useRef } from 'react';
import { history } from 'umi';
import { Form, Input, Button, Row, Col } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import { ForgetPasswordData } from '../user';
import { LoginData } from '../user';
import './forget.less';

const ForgetPassword: React.FC<{}> = props => {
  const [time, setTime] = useState(60);

  const [form] = Form.useForm();

  const timer = useRef<any>();

  useEffect(() => {
    if (time <= 0) {
      clearInterval(timer.current);
      timer.current = undefined;
      setTime(60);
    }
  }, [time]);

  useEffect(() => {
    return () => clearInterval(timer.current);
  }, [])

  const onFinish = (values: ForgetPasswordData) => {
    console.log('Success:', values);

  };


  const getCaptcha = () => {

    if (timer.current) {
      return
    }

    form.validateFields(['phone'])
    .then(
      res => {
        timer.current = setInterval(() => {
          setTime(time => time - 1)
        }, 1000)

      }
    )
  }

  const gotoRegister = () => {
    history.push('/user/register');
  };

  const gotoLogin = () => {
    history.push('/user/login');
  };

  return (
    <div className="forget_style">
      <h2>重置密码</h2>
      <Form
        className="login_form"
        form={form}
        name="login"
        initialValues={{ }}
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

        <Form.Item>
          <Row gutter={8}>
            <Col span={14}>
              <Form.Item
                name="captcha"
                noStyle
                rules={[{ required: true, message: '请输入验证码!' }]}
              >
                <Input
                  prefix={<SafetyCertificateOutlined />}
                  placeholder="验证码"
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Button
                style={{ width: '100%' }}
                onClick={getCaptcha}
                disabled={time === 60 ? false : true}
              >
                {time === 60 ? '获取验证码' : `${time}s`}
              </Button>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="6 - 16位密码，区分大小写"
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '请再次输入密码!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('两次输入密码不一致!');
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="确认密码"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit_button">
            重置
          </Button>
        </Form.Item>

        <Form.Item className="no_input">
          <div className="forget_register">
            <a onClick={gotoLogin}>去登录</a>
            <a onClick={gotoRegister}>免费注册</a>
          </div>
        </Form.Item>

      </Form>
    </div>
  );
};

export default ForgetPassword;
