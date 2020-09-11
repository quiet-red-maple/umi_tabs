/**
 * 该文件用来设置多标签页切换
 */
import React from 'react';
import { history, Dispatch } from 'umi';
import { Layout, Tabs } from 'antd';
import { LayoutStateType } from '@/models/layout';
import './tabsMenu.less';

const { Content } = Layout;

const { TabPane } = Tabs;

interface Props {
  layoutData: LayoutStateType;
  dispatch: Dispatch;
}

const TabsMenu: React.FC<Props> = props => {
  const { children, layoutData, dispatch } = props;

  const { tabMenuList } = layoutData;

  const callback = (key: string) => {
    if (key === 'index') {
      key = '';
    }
    history.push(`/${key}`);
  };

  const onEdit = (
    targetKey:
      | string
      | React.MouseEvent<Element, MouseEvent>
      | React.KeyboardEvent<Element>,
    action: 'add' | 'remove',
  ) => {
    // [action](targetKey); 因为只有删除功能就直接调用了
    remove(targetKey);
  };

  const remove = (
    targetKey:
      | string
      | React.MouseEvent<Element, MouseEvent>
      | React.KeyboardEvent<Element>,
  ) => {
    dispatch({
      type: 'layout/removeTabsMenuList',
      payload: targetKey,
    });
  };

  const TabPaneList = tabMenuList.map((item, index) => {
    let key = item.parent ? `${item.parent}/${item.id}` : item.id;
    return (
      <TabPane
        key={key}
        tab={
          <span>
            {item.icon}
            {item.name}
          </span>
        }
      >
        <Content className="tabsMenu_content">{children}</Content>
      </TabPane>
    );
  });

  let defaultActiveKey = history.location.pathname.substr(1);

  defaultActiveKey = defaultActiveKey ? defaultActiveKey : 'index';

  return (
    <Tabs
      defaultActiveKey={defaultActiveKey}
      activeKey={defaultActiveKey}
      onChange={callback}
      onEdit={onEdit}
      type={tabMenuList.length === 1 ? 'card' : 'editable-card'}
      hideAdd={true}
      animated={true}
      className="tabs_menu"
    >
      {TabPaneList}
    </Tabs>
  );
};

export default TabsMenu;
