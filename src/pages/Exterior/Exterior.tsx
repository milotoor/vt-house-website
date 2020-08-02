import * as React from 'react';
import { Typography } from 'antd';

import { FullWidthImage, PagePadder } from '../shared';
import * as images from './img';
import './Exterior.less';


const { Paragraph } = Typography;

/** ======================== Components ==================================== */
const Exterior: React.FC = () =>
  <div>
    <FullWidthImage {...images.backyardFallLeaves} />

    <PagePadder>
      <Paragraph>
        The house is nestled among the trees on a gently sloping hillside with expansive views of Lake Champlain
      </Paragraph>
    </PagePadder>

    <FullWidthImage {...images.outdoorTwilight} />

    <PagePadder>
      <Paragraph>
        Dusk is the best time for spotting wildlife. Deer, fox, rabbits, otters and bald eagles are regulars.
      </Paragraph>
    </PagePadder>

    <FullWidthImage {...images.lakeKayaks1} />

    <PagePadder>
      <Paragraph>
        Several kayaks, a canoe and other water toys are available for use. Motorized boats can be rented from nearby marinas and parked in the boat lift— or bring your own!
      </Paragraph>
    </PagePadder>

    <FullWidthImage {...images.snowWalk} />

    <PagePadder>
      <Paragraph>
        Snowy walks are a wonderful way to experience the quiet winter landscape. Warm yourself by the fireplace upon your return.
      </Paragraph>
    </PagePadder>

    <FullWidthImage {...images.lakeKayaks2} />
    <PagePadder>
      <Paragraph>
        A swim float is anchored offshore— the perfect perch for a rest from swimming. The shoreline is shale, not sand so water shoes are a good idea.
      </Paragraph>
    </PagePadder>

    <PagePadder>
      <Paragraph>
        A large deck off the kitchen and screened porch has ample space for relaxation, reading and sunning. A deck runs the length of the house on the second floor as well with access from all rooms on the lake side of the house. The large meadow next to the house is ideal for baseball, bocce and has even been used for a family golf putting tournament!
      </Paragraph>
    </PagePadder>
  </div>;

/** ======================== Exports ======================================= */
export default Exterior;
