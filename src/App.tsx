import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

import './App.sass';
import Menu from './Menu';
import * as routes from './routes';

const { Header, Content, Footer, Sider } = Layout;

const App: React.SFC = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          <Menu />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            Do I have anything to say in the header?
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Switch>
              <Route path={routes.home} exact>
                Home
              </Route>
              <Route path={routes.exterior}>
                Exterior
              </Route>
              <Route path={routes.interior}>
                Interior
              </Route>
              <Route path={routes.accommodations}>
                Accommodations
              </Route>
              <Route path={routes.amenities}>
                Amenities
              </Route>
              <Route path={routes.recreation}>
                Recreation
              </Route>
              <Route path={routes.availability}>
                Availability
              </Route>
              <Route path={routes.reservations}>
                Reservations
              </Route>
            </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;