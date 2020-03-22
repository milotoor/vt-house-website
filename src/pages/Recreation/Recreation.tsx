import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Col, Row, Tabs } from 'antd';
import * as routes from '../../routes';
import activities from './activities';
import { PagePadder } from '../shared';
import { ActivityProps } from './types';
import './Recreation.less';


const { Meta } = Card;
const { TabPane } = Tabs;

/** ======================== Types ========================================= */
type SectionProps = {
  activities: ActivityProps[]
};

type recreationSubRouteName = 'outings' | 'restaurants' | 'markets' | 'parks';

/** ======================== Components ==================================== */
const Activity: React.FC<ActivityProps> = ({ description, href, imgSrc, name }) =>
  <Card
    style={{ width: 300 }}
    cover={imgSrc ? <img src={imgSrc} alt={name} /> : null}
    hoverable
    onClick={() => window.open(href, '_blank')}
  >
    <Meta title={name} description={description} />
  </Card>;

const Section: React.FC<SectionProps> = ({ activities }) => {
  // Split the activities into rows
  const activitiesToRender = [...activities];
  const rows = [];
  while (activitiesToRender.length) {
    // Take the first two activities from the list to include in a row
    const [first, second] = activitiesToRender.splice(0, 2);
    rows.push(
      <Row key={rows.length}>
        <Col span={12}>
          <Activity {...first} />
        </Col>

        <Col span={12}>
          {second ? <Activity {...second} /> : null }
        </Col>
      </Row>
    )
  }

  return (
    <div>
      {rows}
    </div>
  );
};

const Recreation = withRouter(( { history }) => 
  <PagePadder className="recreation-page">
    <Tabs defaultActiveKey={getDefaultActiveKey()} onChange={(tabKey) => {
      history.push(routes.recreation[tabKey as recreationSubRouteName])
    }}>
      <TabPane tab="Outings" key="outings">
        <Section activities={activities.outings} />
      </TabPane>
      <TabPane tab="Restaurants" key="restaurants">
        <Section activities={activities.restaurants} />
      </TabPane>
      <TabPane tab="Markets & Stalls" key="markets">
        <Section activities={activities.markets} />
      </TabPane>
      <TabPane tab="Nearby Parks" key="parks">
        <Section activities={activities.parks} />
      </TabPane>
    </Tabs>
  </PagePadder>
);

/** ======================== Helpers ======================================= */
const getDefaultActiveKey = (): recreationSubRouteName => {
  const pathname = window.location.pathname;
  const match = pathname.match(/\/recreation\/(?<routeName>.+)/);

  // No match? Go to the first tab. Otherwise check the capture group
  const defaultTab = 'outings';
  if (!match || !match.groups) return defaultTab;

  // Check the capture group
  const subRoute = match.groups.routeName;
  const subRoutes = ['outings', 'restaurants', 'markets', 'parks'];
  return subRoutes.includes(subRoute)
    ? subRoute as recreationSubRouteName
    : defaultTab;
};

/** ======================== Exports ======================================= */
export default Recreation;
