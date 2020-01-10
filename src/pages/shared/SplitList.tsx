import React from 'react';
import { Col, Row } from 'antd';


interface SplitListProps {
  listItems: string[]
}

/**
 * Renders a list of items in two columns
 */
const SplitList: React.FC<SplitListProps> = ({ listItems }) => {
  const halfwayIndex = Math.ceil(listItems.length / 2)
  const firstColumn = listItems.slice(0, halfwayIndex);
  const secondColumn = listItems.slice(halfwayIndex);

  return (
    <Row>
      <Col span={12}>
        <ul>
          {firstColumn.map(item => <li key={item}>{item}</li>)}
        </ul>
      </Col>

      <Col span={12}>
        <ul>
          {secondColumn.map(item => <li key={item}>{item}</li>)}
        </ul>
      </Col>
    </Row>
  );
};

export default SplitList;
