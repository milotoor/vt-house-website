import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Menu as AntMenu } from 'antd';
import * as routes from './routes';

/** ======================== Types ========================================= */
type TabKeyMap = { [key: string]: number };
type MenuProps = {
  closeDrawer?: () => void;
};

/** ======================== Constants ===================================== */
const tabKeyByRoute: TabKeyMap = {
  [routes.home]: 1,
  [routes.exterior]: 2,
  [routes.interior.base]: 3,
  [routes.accommodations]: 4,
  [routes.amenities]: 5,
  [routes.recreation.base]: 6,
  [routes.reservations]: 7
};

const tabAtPageLoad = (() => {
  let { hash } = window.location;

  // In case there are any sub-routes, only concern ourselves with the path name up until
  // the second slash. The first character will always be the first slash.
  const hashRegex = /#(?<pageTopRoute>\/[^/]*)/;
  const match = hash.match(hashRegex);
  const pageName = match?.groups?.pageTopRoute;

  if (pageName && Object.keys(tabKeyByRoute).includes(pageName)) {
    return tabKeyByRoute[pageName];
  }

  // Couldn't match the current path, so assume it's the home page
  return tabKeyByRoute[routes.home];
})();

/** ======================== Components ==================================== */
const Menu: React.FC<MenuProps> = ({ closeDrawer }) => {
  const history = useHistory();
  return (
    <AntMenu
      className="nav-menu"
      defaultSelectedKeys={[tabAtPageLoad.toString()]}
      mode="inline"
      theme="dark"
    >
      <AntMenu.Item onClick={goTo(routes.home)}>Home</AntMenu.Item>
      <AntMenu.Item key="2" onClick={goTo(routes.exterior)}>Exterior</AntMenu.Item>
      <AntMenu.Item key="3" onClick={goTo(routes.interior.first_floor)}>Interior</AntMenu.Item>
      <AntMenu.Item key="4" onClick={goTo(routes.accommodations)}>Accommodations</AntMenu.Item>
      <AntMenu.Item key="5" onClick={goTo(routes.amenities)}>Amenities</AntMenu.Item>
      <AntMenu.Item key="6" onClick={goTo(routes.recreation.outings)}>Recreation</AntMenu.Item>
      <AntMenu.Item key="7" onClick={goTo(routes.reservations)}>Reservations</AntMenu.Item>
    </AntMenu>
  );
  
  function goTo (page: string) {
    return () => {
      if (closeDrawer) {
        closeDrawer();
      }
      history.push(page);
    };
  }
};

export default Menu;
