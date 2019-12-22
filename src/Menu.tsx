import React from 'react';
import { withRouter, RouteProps } from 'react-router-dom';
import { Menu } from 'antd';
import * as routes from './routes';

type tabKeyMap = { [key: string]: number };
const tabKeyByRoute: tabKeyMap = {
  [routes.home]: 1,
  [routes.exterior]: 2,
  [routes.interior]: 3,
  [routes.accommodations]: 4,
  [routes.amenities]: 5,
  [routes.recreation]: 6,
  [routes.availability]: 7,
  [routes.reservations]: 8
};

const tabAtPageLoad: number = ((): number => {
  const pathname = window.location.pathname;
  if (Object.keys(tabKeyByRoute).includes(pathname)) {
    return tabKeyByRoute[pathname];
  }

  // Couldn't match the current path, so assume it's the home page
  return tabKeyByRoute[routes.home];
})();

export default withRouter(({ history }) =>
  <Menu theme="dark" defaultSelectedKeys={[tabAtPageLoad.toString()]} mode="inline">
    <Menu.Item key="1" onClick={() => history.push(routes.home)}>
      Home
    </Menu.Item>
  
    <Menu.Item key="2" onClick={() => history.push(routes.exterior)}>
      Exterior
    </Menu.Item>

    <Menu.Item key="3" onClick={() => history.push(routes.interior)}>
      Interior
    </Menu.Item>

    <Menu.Item key="4" onClick={() => history.push(routes.accommodations)}>
      Accommodations
    </Menu.Item>

    <Menu.Item key="5" onClick={() => history.push(routes.amenities)}>
      Amenities
    </Menu.Item>

    <Menu.Item key="6" onClick={() => history.push(routes.recreation)}>
      Recreation
    </Menu.Item>

    <Menu.Item key="7" onClick={() => history.push(routes.availability)}>
      Availability
    </Menu.Item>

    <Menu.Item key="8" onClick={() => history.push(routes.reservations)}>
      Reservations
    </Menu.Item>
  </Menu>
);