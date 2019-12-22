import React from 'react';
import { Typography } from 'antd';

const { Paragraph, Text, Title } = Typography;

export default () => 
  <Typography>
    <Title level={3}>Thank you for your interest!</Title>
    <Paragraph>
      To make a reservation, please e-mail us at <a href="mailto:reservations@champlainhaven.com">reservations@champlainhaven.com</a>.
    </Paragraph>

    <Paragraph>
      <div><Text strong>Thank you,</Text></div>
      <div><Text strong>John & Margaret Toor</Text></div>
    </Paragraph>
  </Typography>