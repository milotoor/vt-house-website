import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

import './App.less';
import Menu from './Menu';
import * as Pages from './pages';
import * as routes from './routes';


const { Content, Sider } = Layout;

const App: React.FC = () =>
  <Router>
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <Menu />
      </Sider>

      <Layout>
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
            <Route path={routes.recreation.base}>
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
      </Layout>
    </Layout>
  </Router>;

export default App;