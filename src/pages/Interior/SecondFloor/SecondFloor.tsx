import * as React from 'react';

import { Flex, Img } from '../util';
import * as img from './img';


const SecondFloor: React.FC = () =>
  <Flex className="floor-plan" column>
    <Img src={img.outsideTop} />
    <Flex>
      <Img src={img.outsideLeft} />
      <Flex column>
        <Flex>
          <Img src={img.masterBedroom} />
          <Flex column>
            <Img src={img.den} />
            <Flex>
              <Img src={img.masterBedroomSmall} />
              <Img src={img.hallwaySmall} />
            </Flex>
          </Flex>
          <Img src={img.lakesideBedroom} />
        </Flex>

        <Flex>
          <Flex column>
            <Img src={img.severalRooms} />
            <Img src={img.outsideSliver} />
          </Flex>
          <Flex column>
            <Flex>
              <Img src={img.stairsBedroomSmall} />
              <Img src={img.lakesideBedroomSmall} />
            </Flex>
            <Img src={img.stairsBedroomMid} />
            <Flex>
              <Img src={img.stairs} />
              <Img src={img.stairsBedroomBottom} />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Img src={img.outsideRight} />
    </Flex>
    <Img src={img.outsideBottom} />
  </Flex>;

export default SecondFloor;
