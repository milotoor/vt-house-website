import React from 'react';
import { withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import * as routes from './routes';

export default withRouter(({ history }) =>
  <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
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