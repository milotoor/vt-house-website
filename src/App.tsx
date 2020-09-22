import * as React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Affix, Col, Row } from 'antd';
import MobileMenu from 'rc-drawer';
import 'rc-drawer/assets/index.css'

import Menu from './Menu';
import * as Pages from './pages';
import * as routes from './routes';
import './App.less';


/** ======================== Types ========================================= */
type AppState = {
  drawerOpen: boolean;
  isMobile: boolean;
};

/** ======================== Constants ===================================== */
const RESPONSIVE_MOBILE = 768;

/** ======================== Components ==================================== */
const MainContent: React.FC = () =>
  <div id="content">
    <Switch>
      <Route path={routes.exterior} component={Pages.Exterior} />
      <Route path={routes.interior.base} component={Pages.Interior} />
      <Route path={routes.accommodations} component={Pages.Accommodations} />
      <Route path={routes.amenities} component={Pages.Amenities} />
      <Route path={routes.recreation.base} component={Pages.Recreation} />
      <Route path={routes.reservations} component={Pages.Reservations} />
      <Route path={routes.admin} component={Pages.Admin} />
      <Route path={routes.home} component={Pages.Home} />
    </Switch>
  </div>;

export class App extends React.Component<{}, AppState> {
  state = {
    drawerOpen: false,
    isMobile: checkIfMobile()
  };

  componentDidMount () {
    window.addEventListener('resize', this.updateMobileMode);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateMobileMode);
  }

  updateMobileMode = () => {
    const { isMobile } = this.state;
    const newIsMobile = checkIfMobile();
    if (isMobile !== newIsMobile) {
      this.setState({
        isMobile: newIsMobile,
      });
    }
  };

  render () {
    const { drawerOpen, isMobile } = this.state;
    const closeDrawer = () => this.setState({ drawerOpen: false });
    return (
      <Router>
        <Row>
          {isMobile ? (
            <MobileMenu
              handler={
                <div
                  onClick={() => this.setState({ drawerOpen: !drawerOpen })}
                  className="drawer-handle"
                >
                  <i className="drawer-handle-icon" />
                </div>
              }
              onClose={closeDrawer}
              open={drawerOpen}
              wrapperClassName="drawer-wrapper"
            >
              <Menu closeDrawer={closeDrawer} />
            </MobileMenu>
          ) : (
            <Col xxl={4} xl={5} lg={6} md={6} sm={24} xs={24} className="main-menu">
              <Affix>
                <Menu />
              </Affix>
            </Col>
          )}

          <Col xxl={20} xl={19} lg={18} md={18} sm={24} xs={24}>
            <MainContent />
          </Col>
        </Row>
      </Router>
    );
  }
}

function checkIfMobile () {
  return window.innerWidth < RESPONSIVE_MOBILE;
}
