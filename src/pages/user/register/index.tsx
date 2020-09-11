import React, { useState, useEffect, useRef } from 'react';
import { history } from 'umi';
import { Form, Input, Button, Checkbox, Select, Row, Col, Tooltip } from 'antd';
import {
  ApiOutlined,
  CodeOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import { RegisterData } from '../user';
import './register.less';
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox';

const { Option } = Select;

interface Props {
  history: History;
}

const Reighster: React.FC<Props> = props => {
  const [time, setTime] = useState(60);

  const [visible, setVisible] = useState(false);

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
  }, []);

  const onFinish = (values: RegisterData) => {
    console.log('Success:', values);
    const { agree } = values;
    if (!agree) {
      if (!agree) {
        setVisible(true);
      }
    }
  };

  const gotoLogin = () => {
    history.push('/user/login');
  };

  const getCaptcha = () => {
    if (timer.current) {
      return;
    }

    form.validateFields(['phone']).then(res => {
      timer.current = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
    });
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const changeAgree = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setVisible(false);
    }
  };

  return (
    <div className="register_style">
      <h2>注 册</h2>
      <Form
        className="register_form"
        form={form}
        name="register"
        initialValues={{ prefix: '86' }}
        onFinish={onFinish}
      >
        <Form.Item
          name="enterprise"
          // rules={[{ required: true, message: '请输入邀请码!' }]}
        >
          <Input
            placeholder="关联企业"
            disabled={true}
            prefix={<ApiOutlined className="site-form-item-icon" />}
          />
        </Form.Item>

        <Form.Item
          name="invitationCode"
          rules={[{ required: true, message: '请输入邀请码!' }]}
        >
          <Input prefix={<CodeOutlined />} placeholder="邀请码" />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[{ required: true, message: '请输入手机号' }]}
        >
          <Input addonBefore={prefixSelector} placeholder="11位手机号" />
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

        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit_button">
            注册
          </Button>
          <a className="go_login" onClick={gotoLogin}>
            使用已有账户登录
          </a>
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
              <a>《注册协议》</a>
              <a>《风险提示书》</a>
            </div>
          </Form.Item>
        </Tooltip>
      </Form>
    </div>
  );
};

export default Reighster;
