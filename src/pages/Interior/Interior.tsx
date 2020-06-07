import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Tabs } from 'antd';

import * as routes from '../../routes';
import { PagePadder } from '../shared';
import Basement from './Basement';
import FirstFloor from './FirstFloor';
import SecondFloor from './SecondFloor';
import './Interior.less';


const { TabPane } = Tabs;

/** ======================== Types ========================================= */
type interiorSubRouteName = 'basement' | 'first_floor' | 'second_floor';

/** ======================== Components ==================================== */
const Interior = withRouter(({ history }) => (
  <PagePadder className="interior-page">
    <Tabs animated={false} defaultActiveKey={getDefaultActiveKey()} onChange={(tabKey) => {
      history.push(routes.interior[tabKey as interiorSubRouteName])
    }}>
      <TabPane tab="Basement" key="basement">
        <Basement />
      </TabPane>
      <TabPane tab="First Floor" key="first_floor">
        <FirstFloor />
      </TabPane>
      <TabPane tab="Second Floor" key="second_floor">
        <SecondFloor />
      </TabPane>
    </Tabs>
  </PagePadder>
));

/** ======================== Helpers ======================================= */
const getDefaultActiveKey = (): interiorSubRouteName => {
  const pathname = window.location.pathname;
  const match = pathname.match(/\/interior\/(?<routeName>.+)/);

  // No match? Go to the first floor. Otherwise check the capture group
  const defaultTab = 'first_floor';
  if (!match || !match.groups) return defaultTab;

  // Check the capture group
  const subRoute = match.groups.routeName;
  const subRoutes = ['basement', 'first_floor', 'second_floor'];
  return subRoutes.includes(subRoute)
    ? subRoute as interiorSubRouteName
    : defaultTab;
};

/** ======================== Exports ======================================= */
export default Interior;
