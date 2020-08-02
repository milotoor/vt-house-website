import * as React from 'react';
import { Typography } from 'antd';

import PagePadder from './PagePadder';


const { Paragraph: AntdParagraph } = Typography;

export const Paragraph: React.FC = ({ children }) =>
  <PagePadder>
    <AntdParagraph className="paragraph">
      {children}
    </AntdParagraph>
  </PagePadder>;