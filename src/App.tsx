import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import './App.css';

const { Header, Content, Footer, Sider } = Layout;

const App: React.SFC = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" onClick={() => console.log('clicked home')}>
            <Icon type="home" />
            <span>Home</span>
          </Menu.Item>

          <Menu.Item key="2">
            <Icon type="desktop" />
            <span>Exterior</span>
          </Menu.Item>

          <Menu.Item key="3">
            <Icon type="file" />
            <span>Interior</span>
          </Menu.Item>

          <Menu.Item key="4">
            <Icon type="file" />
            <span>Accommodations</span>
          </Menu.Item>

          <Menu.Item key="5">
            <Icon type="file" />
            <span>Amenities</span>
          </Menu.Item>

          <Menu.Item key="6">
            <Icon type="file" />
            <span>Recreation</span>
          </Menu.Item>

          <Menu.Item key="7">
            <Icon type="file" />
            <span>Availability</span>
          </Menu.Item>

          <Menu.Item key="8">
            <Icon type="file" />
            <span>Reservations</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default App;