import * as React from 'react';

import { Flex, Img } from '../util';
import { floorplan } from './img';


const Basement: React.FC = () =>
  <Flex className="floor-plan" column>
    <Img src={floorplan.outsideTop} />
    <Flex>
      <Img src={floorplan.outsideLeftBig} />
      <Flex column>
        <Flex>
          <Img src={floorplan.storageRoom} />
          <Img room="bunk" src={floorplan.bunkRoomLeft} />
          <Img room="bunk" src={floorplan.bunkRoomBeds} />
          <Img src={floorplan.bathroom} />
          <Img src={floorplan.outsideRightTop} />
        </Flex>

        <Flex>
          <Img src={floorplan.outsideLeft} />
          <Flex column>
            <Flex>
              <Img room="bunk" src={floorplan.bunkRoomMid} />
              <Img src={floorplan.outsideRightBottom} />
            </Flex>

            <Flex>
              <Img room="bunk" src={floorplan.bunkRoomStairs} />
              <Img room="bed_basement" src={floorplan.basementBedroom} />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Img src={floorplan.outsideRightBig} />
    </Flex>
    <Img src={floorplan.outsideBottom} />
  </Flex>;

export default Basement;
