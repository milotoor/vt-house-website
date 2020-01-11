import React from 'react';
import { withRouter } from 'react-router-dom';
import { Menu as AntMenu } from 'antd';
import * as routes from './routes';

type TabKeyMap = { [key: string]: number };
const tabKeyByRoute: TabKeyMap = {
  [routes.home]: 1,
  [routes.exterior]: 2,
  [routes.interior]: 3,
  [routes.accommodations]: 4,
  [routes.amenities]: 5,
  [routes.recreation.base]: 6,
  [routes.reservations]: 7
};

const tabAtPageLoad = (() => {
  let pathname = window.location.pathname;

  // In case there are any sub-routes, only concern ourselves with the path name up until
  // the second slash. The first character will always be the first slash.
  let secondSlashIndex = pathname.indexOf('/', 1);
  if (secondSlashIndex !== -1) {
    pathname = pathname.slice(0, secondSlashIndex);
  }

  if (Object.keys(tabKeyByRoute).includes(pathname)) {
    return tabKeyByRoute[pathname];
  }

  // Couldn't match the current path, so assume it's the home page
  return tabKeyByRoute[routes.home];
})();

const Menu = withRouter(({ history }) =>
  <AntMenu theme="dark" defaultSelectedKeys={[tabAtPageLoad.toString()]} mode="inline">
    <AntMenu.Item key="1" onClick={() => history.push(routes.home)}>
      Home
    </AntMenu.Item>
  
    <AntMenu.Item key="2" onClick={() => history.push(routes.exterior)}>
      Exterior
    </AntMenu.Item>

    <AntMenu.Item key="3" onClick={() => history.push(routes.interior)}>
      Interiore
    </AntMenu.Item>

    <AntMenu.Item key="4" onClick={() => history.push(routes.accommodations)}>
      Accommodations
    </AntMenu.Item>

    <AntMenu.Item key="5" onClick={() => history.push(routes.amenities)}>
      Amenities
    </AntMenu.Item>

    <AntMenu.Item key="6" onClick={() => history.push(routes.recreation.outings)}>
      Recreation
    </AntMenu.Item>

    <AntMenu.Item key="7" onClick={() => history.push(routes.reservations)}>
      Reservations
    </AntMenu.Item>
  </AntMenu>
);

export default Menu;
