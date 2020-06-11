import * as React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

import Menu from './Menu';
import * as Pages from './pages';
import * as routes from './routes';
import './App.less';


const { Content, Sider } = Layout;

const App: React.FC = () =>
  <Router>
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <Menu />
      </Sider>

      <Layout style={{ marginLeft: 200 }}>
        <Content style={{ margin: '0 16px', width: 850 }}>
          <div id="content">
            <Switch>
              <Route path={routes.exterior}>
                <Pages.Exterior />
              </Route>
              <Route path={routes.interior.base}>
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