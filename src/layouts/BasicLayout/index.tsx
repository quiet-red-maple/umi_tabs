/**
 * 默认中台模版 登录后layout
 */

import React, { useState } from 'react';
import { history, Dispatch, KeepAliveLayout } from 'umi';
import { connect } from 'dva';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import Authorized from '@/components/Authorized';
import TabsMenu from '@/components/TabsMenu';
import Footer from '@/components/Footer';
import { LayoutStateType } from '@/models/layout';
import './basicLayout.less';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

interface Props {
  children: React.ReactNode;
  layout: LayoutStateType;
  dispatch: Dispatch;
  pageProps: any;
}

const mapStateToProps = ({ layout }: any) => ({ layout });

const SiderDemo: React.FC<Props> = props => {
  const { children, layout, dispatch, pageProps } = props;

  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const headerMenu = (event: {
    key: React.Key;
    keyPath: React.Key[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement>;
  }) => {
    const { key } = event;

    if (key === 'logout') {
      history.push('/user/login');
    }
  };

  return (
    <Layout className="layout_page">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Authorized dispatch={dispatch} />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: toggle,
            },
          )}
          <Menu mode="horizontal" className="right_user" onClick={headerMenu}>
            <SubMenu title="1573594251">
              <Menu.Item key="logout" icon={<LogoutOutlined />}>
                退出登录
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Header>

        <Content
          style={{
            margin: '4px 0px',
            minHeight: 280,
          }}
        >
          {/*
            需要多标签展示页面带有状态保存
            */}
          <TabsMenu layoutData={layout} dispatch={dispatch}>
            <KeepAliveLayout {...pageProps}>{children}</KeepAliveLayout>
          </TabsMenu>
          {/*
            不需要多标签展示页面带有状态保存
            <KeepAliveLayout {...pageProps}>{children}</KeepAliveLayout>
            不需要多标签展示页面没有状态保存
            {children}
            */}
        </Content>

        <Footer />
      </Layout>
    </Layout>
  );
};

export default connect(mapStateToProps)(SiderDemo);
