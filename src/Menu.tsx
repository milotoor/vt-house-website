import React from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import * as routes from './routes';

export default withRouter(({ history }) =>
  <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
    <Menu.Item key="1" onClick={() => history.push(routes.home)}>
      <Icon type="home" />
      <span>Home</span>
    </Menu.Item>
  
    <Menu.Item key="2" onClick={() => history.push(routes.exterior)}>
      <Icon type="desktop" />
      <span>Exterior</span>
    </Menu.Item>

    <Menu.Item key="3" onClick={() => history.push(routes.interior)}>
      <Icon type="file" />
      <span>Interior</span>
    </Menu.Item>

    <Menu.Item key="4" onClick={() => history.push(routes.accommodations)}>
      <Icon type="file" />
      <span>Accommodations</span>
    </Menu.Item>

    <Menu.Item key="5" onClick={() => history.push(routes.amenities)}>
      <Icon type="file" />
      <span>Amenities</span>
    </Menu.Item>

    <Menu.Item key="6" onClick={() => history.push(routes.recreation)}>
      <Icon type="file" />
      <span>Recreation</span>
    </Menu.Item>

    <Menu.Item key="7" onClick={() => history.push(routes.availability)}>
      <Icon type="file" />
      <span>Availability</span>
    </Menu.Item>

    <Menu.Item key="8" onClick={() => history.push(routes.reservations)}>
      <Icon type="file" />
      <span>Reservations</span>
    </Menu.Item>
  </Menu>
);