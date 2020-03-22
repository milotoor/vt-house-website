import * as React from 'react';

import { Flex, Img } from '../util';
import * as img from './img';


const FirstFloor: React.FC = () =>
  <Flex className="floor-plan" column>
    <Img src={img.outsideTop} />
    <Flex>
      <Img src={img.outsideLeftBig} />
      <Flex column>
        <Flex>
          <Img src={img.storageRoom} />
          <Img room src={img.bunkRoomLeft} />
          <Img room src={img.bunkRoomBeds} />
          <Img src={img.bathroom} />
          <Img src={img.outsideRightTop} />
        </Flex>

        <Flex>
          <Img src={img.outsideLeft} />
          <Flex column>
            <Flex>
              <Img room src={img.bunkRoomMid} />
              <Img src={img.outsideRightBottom} />
            </Flex>

            <Flex>
              <Img room src={img.bunkRoomStairs} />
              <Img room src={img.basementBedroom} />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Img src={img.outsideRightBig} />
    </Flex>
    <Img src={img.outsideBottom} />
  </Flex>;

export default FirstFloor;
