import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

import './App.less';
import Menu from './Menu';
import * as Pages from './pages';
import * as routes from './routes';

const { Header, Content, Footer, Sider } = Layout;

const App = () =>
  <Router>
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <Menu />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          Do I have anything to say in the header?
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Switch>
            <Route path={routes.exterior}>
              <Pages.Exterior />
            </Route>
            <Route path={routes.interior}>
              <Pages.Interior />
            </Route>
            <Route path={routes.accommodations}>
              <Pages.Accommodations />
            </Route>
            <Route path={routes.amenities}>
              <Pages.Amenities />
            </Route>
            <Route path={routes.recreation}>
              <Pages.Recreation />
            </Route>
            <Route path={routes.reservations}>
              <Pages.Reservations />
            </Route>
            <Route path={routes.home}>
              <Pages.Home />
            </Route>
          </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  </Router>;

export default App;