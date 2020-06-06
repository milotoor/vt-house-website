import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Col, Drawer, Row, Tabs } from 'antd';

import * as routes from '../../routes';
import { PagePadder } from '../shared';
import Basement from './Basement';
import FirstFloor from './FirstFloor';
import SecondFloor from './SecondFloor';
import roomData from './rooms';
import { InteriorContext, Room } from './util';
import './Interior.less';


const { TabPane } = Tabs;

/** ======================== Types ========================================= */
type interiorSubRouteName = 'basement' | 'first_floor' | 'second_floor';

/** ======================== Components ==================================== */
const Interior = withRouter(( { history }) => {
  const [drawerRoom, setDrawerRoom] = React.useState<Room>();
  return (
    <PagePadder className="interior-page">
      <InteriorContext.Provider value={{ activeRoom: drawerRoom, showRoom: setDrawerRoom }}>
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

        <RoomDrawer />
      </InteriorContext.Provider>
    </PagePadder>
  );
});

const RoomDrawer: React.FC = () => {
  const { activeRoom, showRoom } = React.useContext(InteriorContext);
  const roomInfo = activeRoom && roomData[activeRoom];
  return (
    <Drawer
      title={roomInfo?.name}
      placement="bottom"
      closable
      visible={!!activeRoom}
      onClose={() => showRoom(undefined)}
      bodyStyle={{ flexGrow: 1, overflow: 'auto' }}
      drawerStyle={{ display: 'flex', flexDirection: 'column', height: 300 }}
      headerStyle={{ flexShrink: 0 }}
    >
      <Row>
        <Col span={8}>{roomInfo?.description}</Col>
        <Col span={16}>
          images here
        </Col>
      </Row>
    </Drawer>
  )
};

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
